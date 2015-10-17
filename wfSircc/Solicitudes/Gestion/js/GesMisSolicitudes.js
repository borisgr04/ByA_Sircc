var Solicitudes = (function () {
    "use strict";
    var tema;

    //var TituloForm = "Gestión de Solicitudes ";
    //var Modulo = "Procesos Precontractuales";
    //var urlToPanelModulo = "PanelMiGestion.aspx";
    
    
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/wsMisSolicitudes.asmx/GetMisSolicitudesxEstxDD";
    var urlToRecibir = "/Servicios/wsMisSolicitudes.asmx/Recibir";
    var urlToRevisar = "/Servicios/wsMisSolicitudes.asmx/Revisar";
    var urlToFiltro = '/Servicios/wsMisSolicitudes.asmx/GetCategoriasFiltro';
    var urlToNextNum = '/Servicios/wsMisSolicitudes.asmx/GetProximoNumxMod';
    var urlDetSolicitud = "/Solicitudes/DetSolicitud2.html";
    var urlToGetvDEPENDENCIAD = '/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD';
    
    var lstEstado = {};

    var getDataSourceEstados = function () {
        var urlToSolxEstados = "/Servicios/wsProcesos.asmx/getSolxEstados";
        var depdel = "'" + $("#CboDepDel").val() + "'";
        var jsonParam = { DepDel: depdel, Vigencia: byaSite.getVigencia() };
        var sourceSol = byaPage.getSource(urlToSolxEstados, jsonParam);
        return sourceSol;
    };

    var _addHandlers = function () {

        var config = {
            Id: '#dvdEstado',
            ClassItem: 'lstestsol',
            Source: getDataSourceEstados(),
            fn_callback: _createGridCon,
            Display: 'NOM_EST',
            Value: 'COD_EST',
            Count: 'CANT'
        };
        lstEstado = new byaLista();
        lstEstado.init(config);
        
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $('#BtnConsulta').click(function () {
            _createGridCon();
        });
        $('#BtnRecGuardar').click(function () {
            _recibirGuardar();
        });
        $('#BtnRevGuardar').click(function () {
            _revisarGuardar();
        });
        $('#BtnRecibir').click(function () {
            _recibir();
        });
        $('#BtnRevisar').click(function () {
            _revisar();
        });
        $('.detalle').click(function () {
            _Detalle();
        });
        $('#BtnDetalle').click(function () {
            _Detalle();
        });
        $(gridCon).on('rowdoubleclick', function (event) {
            _Detalle();
        });

        $("#CboDepDel").change(function () {
            lstEstado.setSource(getDataSourceEstados());
        });
    };

    var _mostrarVentana = function () {
        $('#modalDetalle').modal('show');
    };
    var _ocultarVentana = function () {
        $('#modalDetalle').modal('hide');
    }
    var _mostrarRevisar = function () {
        $('#modalRevisar').modal('show');
    };
    var _ocultarRevisar = function () {
        $('#modalRevisar').modal('hide');
    }
    var _mostrarRecibir = function () {
        $('#modalRecibir').modal('show');
    };
    var _ocultarRecibir = function () {
        $('#modalRecibir').modal('hide');
    };
    var _recibirGuardar = function () {
        var hr = {};
        hr.IDE = Solicitudes.ID_HREV;
        hr.OBS_RECIBIDO_ABOG = $("#txtObsRc").val();
        var jsonData = "{'hr':" + JSON.stringify(hr) + "}";

        byaPage.POST_Sync(urlToRecibir, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje);

            _createGridCon();
            lstEstado.setSource(getDataSourceEstados());
            _ocultarRecibir();
        });
    };
    var _revisarGuardar = function () {
        var hr = {};
        hr.CONCEPTO_REVISADO = $("#cboConceptoRv").val();
        hr.OBS_REVISADO = $("#txtObsRv").val();
        hr.IDE = Solicitudes.ID_HREV;
        var jsonData = "{'hr':" + JSON.stringify(hr) + "}";

        byaPage.POST_Sync(urlToRevisar, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje);

            _createGridCon();
            lstEstado.setSource(getDataSourceEstados());
            _ocultarRevisar();
        });
    };
    var _recibir = function () {
        var dataRecord = Solicitudes.getRecord();
        if (dataRecord != null) {
            var now = new Date();
            Solicitudes.ID_HREV = dataRecord.ID_HREV;
            $("#txtEstadoRc").val(dataRecord.NOM_EST_SOL);
            $("#txtNSolRc").val(dataRecord.COD_SOL);
            $("#txtObjConRc").val(dataRecord.OBJ_SOL);
            $("#txtObsRc").val(dataRecord.OBS_REC);
            $("#txtFecRecRc").val(byaSite.FechaShort(now));
            _mostrarRecibir();
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }

    };
    var _revisar = function () {
        var dataRecord = Solicitudes.getRecord();

        if (dataRecord != null) {
            
            Solicitudes.ID_HREV = dataRecord.ID_HREV;
            $("#txtEstadoRv").val(dataRecord.NOM_EST_SOL);
            $("#txtNSolRv").val(dataRecord.COD_SOL);
            $("#txtObjConRv").val(dataRecord.OBJ_SOL);
            $("#txtObsRv").val(dataRecord.OBS_REV);
            //alert(dataRecord.FEC_RECIBIDO);
            //$("#txtFecRecRv").val(byaSite.FechaShort(dataRecord.FEC_RECIBIDO));
            var now = new Date();
            $("#txtFecRevRv").val(byaSite.FechaShort(now));
            
            
            var NextNum = byaPage.getSource(urlToNextNum, { codsol: "'" + dataRecord.COD_SOL + "'" });
            $("#txtNumPro").text(NextNum);
            

            _mostrarRevisar();
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }


    };
    var _Detalle = function () {
        $.get(urlDetSolicitud, function (data) {
            $("#secDetalle").html(data);
        });
    };
    var x_Detalle = function () {
        var dataRecord = Solicitudes.getRecord();
        $("#txtEstado").val(dataRecord.NOM_EST_SOL);
        $("#txtNSol").val(dataRecord.COD_SOL);
        $("#txtDepSol").val(dataRecord.DEP_SOL_NOM);
        $("#txtPDepSol").val(dataRecord.DEP_PSOL_NOM);
        $("#txtObjCon").val(dataRecord.OBJ_SOL);
        $("#txtMod").val(dataRecord.COD_TPRO_NOM);
        $("#txtClase").val(dataRecord.CLASE);
        $("#txtValTot").byaSetDecimal(dataRecord.VAL_CON);
        //_asignarDecimal("#txtValTot", dataRecord.VAL_CON);
        $("#txtFecRec").val(dataRecord.FEC_RECIBIDO);
        $("#txtFun").val(dataRecord.NOM_ABOG_ENC);
        //$('#BtnGuardar').attr('disabled', '-1');
        _mostrarVentana();
    }
    var _createElements = function () {
        
        //$("#dvdModulo").html('<a href="' + urlToPanelModulo + '">' + Modulo + '</a>');
        //$("#dvdPagina").html(TituloForm);
        //byaSite.setModuloActual("SOLI4");

        tema = Solicitudes.config.theme;
        //var sourceFil = byaPage.getSource(urlToFiltro);

        //$("#CboFil").byaCombo({ DataSource: sourceFil, Value: "Key", Display: "Value" });

        //$("#CboFil").val(Solicitudes.getEstado());
        var sourceDep = byaPage.getSource(urlToGetvDEPENDENCIAD);
        $("#CboDepDel").byaCombo({ DataSource: sourceDep, Value: "COD_DEP", Display: "NOM_DEP", placeHolder: "Seleccione Dependencia" });
        
    };

    var getdataAdapter = function () {
        var filtro = "'" + lstEstado.getSeleccionado() + "'";// "'" + $("#CboFil").val() + "'";
        var depdel="'"+ $("#CboDepDel").val() +"'";
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_SOL', type:"STRING" },
                    { name: 'OBJ_SOL', type: "STRING" },
                    { name: 'COD_TPRO_NOM', type: "STRING" },
                    { name: 'CLASE', type: "STRING" },
                    { name: 'DEP_SOL_NOM', type: "STRING" },
                    { name: 'DEP_PSOL_NOM', type: "STRING" },
                    { name: 'NOM_ABOG_ENC', type: "STRING" },
                    { name: 'NOM_EST_SOL', type: "STRING" },
                    { name: 'EST_REC', type: "STRING" },
                    { name: 'VAL_CON', type: 'number' },
                    { name: 'OBS_REC', type: "STRING" },
                    { name: 'OBS_REV', type: "STRING" },
                    { name: 'ID_HREV', type: "STRING" },
                    { name: 'FEC_RECIBIDO', type: 'date' },
                    { name: 'FECHA_REVISADO', type: 'date' },
                    { name: 'IDE_CON', type: "STRING" },
                    { name: 'NOM_CONTRATISTA', type: "STRING" }
            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'estado': filtro, vigencia: byaSite.getVigencia(), 'Dep_Del': depdel }
        };
        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }

        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        return dataAdapter;

    };

    //crea GridTipos
    var _createGridCon=function () {
        // initialize jqxGrid
        
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: getdataAdapter(),
                        theme: Solicitudes.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Código ', datafield: 'COD_SOL', width: 150 },
                        { text: 'Modalidad', datafield: 'COD_TPRO_NOM', width: 150 },
                        { text: 'Objeto', datafield: 'OBJ_SOL', width: 150 },
                        { text: 'Contratista(F)', datafield: 'NOM_CONTRATISTA', width: 150 },
                        { text: 'Valor a Contratar', datafield: 'VAL_CON', width: 150, cellsformat: 'F2', cellsalign: 'right' },
                        { text: 'Recibido?', datafield: 'EST_REC', width: 150 },
                        { text: 'Estado', datafield: 'NOM_EST_SOL', width: 150 },
                        { text: 'Clase',  datafield: 'CLASE', width: 150 },
                        { text: 'Dependencia Solicitante', datafield: 'DEP_SOL_NOM', width: 150 },
                        { text: 'Dependencia Delegada', datafield: 'DEP_PSOL_NOM', width: 150 },
                        { text: 'Encargado', datafield: 'NOM_ABOG_ENC', width: 150 }
                        
                        ]
                    });

    }
    return {
        ID_HREV:null,
        editedRows: null,
        config: {
            theme: null
        },
        getEstado: function () {
            return $.getUrlVar("estado");
        }
        ,
        getDepDel: function () {
            return $.getUrlVar("depdel");
        },
        getRecord : function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            //alert(JSON.stringify(dataRecord));
            //alert(dataRecord.IDE_CON);
            if (dataRecord != null) {
                if (dataRecord.EST_REC == 'N') {
                    $('#BtnRecGuardar').byaSetHabilitar(true);
                    $('#BtnRevGuardar').byaSetHabilitar(false);
                } else {
                    if (dataRecord.NOM_EST_SOL == "SIN REVISAR") {
                        $('#BtnRecGuardar').byaSetHabilitar(false);
                        $('#BtnRevGuardar').byaSetHabilitar(true);
                    }
                    if (dataRecord.NOM_EST_SOL == "ACEPTADO" || dataRecord.NOM_EST_SOL == "RECHAZADO") {
                        $('#BtnRevGuardar').byaSetHabilitar(false);
                        $('#BtnRecGuardar').byaSetHabilitar(false);
                    }
                }
            }
            return dataRecord;
        },
        init: function () {
            _createElements();
            _addHandlers();
            _createGridCon();
            $("#CboDepDel").val(this.getDepDel());
            //lstEstado.setSeleccionado(this.getEstado());
            lstEstado.setSource(getDataSourceEstados());
            lstEstado.setSeleccionado(this.getEstado());
            
        }
    };
} ());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Mi Gestión - Solicitudes ", Modulo: "Procesos Precontractuales", urlToPanelModulo: "PanelMiGestion.aspx", Cod_Mod: "SOLI4", Rol: "PR_GEST" });
    Solicitudes.config.theme = byaSite.tema;
    Solicitudes.init();
});