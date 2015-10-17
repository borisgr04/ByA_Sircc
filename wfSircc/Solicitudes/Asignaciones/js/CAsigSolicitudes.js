var Solicitudes = (function () {
    "use strict";
    var TituloForm = "Asignación de Solicitudes <small > por Delegación</small>";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/wsSolicitudes.asmx/GetSolicitudes";
    var urlToInsert = "/Servicios/wsSolicitudes.asmx/AsignarFuncionario";
    var urlToGetvDEPENDENCIAD = '/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD';
    var urlToGetvFuncionariosP = '/Servicios/wsDatosBasicos.asmx/GetvFuncionariosP';
    var urlDetSolicitud = "/Solicitudes/DetSolicitud2.html";


    var id;
    var idEP;

    var _addHandlers = function () {
        $("#CboDepDel").change(function () {
            _refreshCombo();
        });
        $('#BtnGuardar').click(function () {
            _asignarGuardar();
        });
        $('#BtnConsulta').click(function () {
            _createGridCon();
        });
        $('#BtnDetalle').click(function () {
            _Detalle();
        });
        $('#BtnAsignar').click(function () {
            _asignar();
        });
        //enlace a jqxwidget
        $(gridCon).on('rowdoubleclick', function (event) {
            _Detalle();
        });
    };
    var _refreshCombo = function () {
        var sourceMod = byaPage.getSource(urlToGetvFuncionariosP, { cod_dep: "'" + $("#CboDepDel").val() + "'" });
        $("#cboFun").byaCombo({ DataSource: sourceMod, Display: "NOMBRE", Value: "IDE_TER", placeHolder: "Seleccione el Funcionario..." });
    };
    var _asignarGuardar = function () {
        var hr = {};
        hr.COD_SOL = $("#txtNSolAs").val();
        hr.NIT_ABOG_RECIBE = $("#cboFun").val();
        var jsonData = "{'hr':" + JSON.stringify(hr) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {

            var byaRpta = byaPage.retObj(result.d);
            if (!byaRpta.Error) {
                _ocultarVentana();
                byaMsgBox.alert("Se Asignó/Reasignó la Solicitud");
            }
            else {
                byaMsgBox.alert(byaRpta.Mensaje);
            }
            _createGridCon();

        });
    };
    var _Detalle = function () {
        $.get(urlDetSolicitud, function (data) {
            $("#secDetalle").html(data);
        });
    };
    var _asignar= function(){
        var dataRecord = Solicitudes.getRecord();
        //Solicitudes.ID_HREV = dataRecord.ID_HREV;
        $("#txtEstadoAs").val(dataRecord.NOM_EST_SOL);
        $("#txtNSolAs").val(dataRecord.COD_SOL);
        $("#txtObjConAs").val(dataRecord.OBJ_SOL);
        $("#txtObsAs").val(dataRecord.OBS_REV);
        $("#txtFecRecAs").val(dataRecord.FEC_RECIBIDO);
        //alert(dataRecord.ID_ABOG_ENC);
        $("#cboFun").val(dataRecord.ID_ABOG_ENC);
        _mostrarVentana();
    }
    var _mostrarVentana = function () {
        $('#myModal').modal('show');
        //$(ventana).jqxWindow('open');
    };
    var _ocultarVentana = function () {
        $('#myModal').modal('hide');
        //$(ventana).jqxWindow('open');
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
        var sourceDep = byaPage.getSource(urlToGetvDEPENDENCIAD);

        $("#CboDepDel").byaCombo({ DataSource: sourceDep, Display: "NOM_DEP", Value: "COD_DEP" });

        var sourceMod = byaPage.getSource(urlToGetvFuncionariosP, { cod_dep: "" });
        $("#cboFun").byaCombo({ DataSource: sourceMod, Display: "NOMBRE", Value: "IDE_TER", placeHolder: "Seleccione el Funcionario..." });

    };
    //crea GridTipos
    var dataSourceGrid = function () {
        //alert($("#CboDepDel").val());
        var dep_sol = "'" + $("#CboDepDel").val() + "'";
        var source = {
            datatype: "xml",
            datafields: [
                        { name: 'COD_SOL' },
                        { name: 'OBJ_SOL' },
                        { name: 'COD_TPRO_NOM' },
                        { name: 'CLASE' },
                        { name: 'DEP_SOL_NOM' },
                        { name: 'DEP_PSOL_NOM' },
                        { name: 'NOM_ABOG_ENC' },
                        { name: 'NOM_EST_SOL' },
                        { name: 'EST_REC' },
                        { name: 'VAL_CON' },
                        { name: 'OBS_REC' },
                        { name: 'OBS_REV' },
                        { name: 'ID_HREV' },
                        { name: 'ID_ABOG_ENC' }
            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'dep_psol': dep_sol, 'Vig_Sol': Solicitudes.Vigencia }
        };
        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }

        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        // initialize jqxGrid
        return dataAdapter;
    }
    var _createGridCon = function () {
            $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataSourceGrid(),
                        theme: Solicitudes.config.theme,
                        localization: byaPage.getLocalization(),
                        height: '100%',
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Código ', datafield: 'COD_SOL', width: 150 },
                        { text: 'Objeto', datafield: 'OBJ_SOL', width: 150 },
                        { text: 'Encargado', datafield: 'NOM_ABOG_ENC', width: 150 },
                        { text: 'Recibido?', datafield: 'EST_REC', width: 150 },
                        { text: 'Estado', datafield: 'NOM_EST_SOL', width: 150 },
                        { text: 'Modalidad',  datafield: 'COD_TPRO_NOM', width: 150 },
                        { text: 'Clase',  datafield: 'CLASE', width: 150 },
                        { text: 'Dependencia Solicitante', datafield: 'DEP_SOL_NOM', width: 150 }
                        
                    ]
                    });
            

    }
    return {
        ID_HREV:null,
        id_ep: null,
        fnresultado: null,
        editedRows: null,
        config: {
            theme: null
        },
        Vigencia: function () {
            return byaSite.getVigencia();
        },
        getRecord: function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        init: function () {
            _createElements();
            _addHandlers();
            _createGridCon();
        }
    };
} ());
$(function () {
    Solicitudes.config.theme = byaSite.tema;
    Solicitudes.init();
});