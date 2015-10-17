var Solicitudes = (function () {
    "use strict";
    var TituloForm = "Recepción de Solicitudes <small > por Delegación</small>";
    var gridCon = '#jqxgridSol';
    //var urlToGridCon = "/Servicios/wsSolicitudes.asmx/GetSolicitudes";
    var urlToGridCon = "/Servicios/wsSolicitudes.asmx/GetSolicitudesxEstxDD";
    
    
    var urlDetSolicitud = "/Solicitudes/DetSolicitud2.html";
    var urlAsigSolicitud = "Asignar.html";

    var urlToNuevaSol = "RegSolicitudes.aspx";
    var urlToGetvDEPENDENCIAD = '/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD';
    var id;
    var idEP;

    var lstEstado = {};
    var getDataSourceEstados = function () {
        var urlToSolxEstados = "/Servicios/wsSolicitudes.asmx/getSolxEstados";
        var depdel = "'" + $("#CboDepDel").val() + "'";
        var jsonParam = { DepDel: depdel, Vigencia: byaSite.getVigencia() };
        var sourceSol = byaPage.getSource(urlToSolxEstados, jsonParam);
        return sourceSol;
    };
    var createLista = function () {
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
    }
    
    var _Detalle = function () {
        
        $.get(urlDetSolicitud, function (data) {
            $("#secDetalle").html(data);
        });
        
    };
    var _addHandlers = function () {
        createLista();

        $("#CboDepDel").change(function () {
            lstEstado.setSource(getDataSourceEstados());
        });

        $('.detalle').click(function () {
            _Detalle();
        });
        $("#CboDepDel").change(function () {
            $(gridCon).jqxGrid({ source: getDataAdapter() });
        });
        $('#BtnConsulta').click(function () {
            _createGridCon();
        });
        $('#BtnNuevo').click(function () {
            byaPage.AbrirPagina(urlToNuevaSol);
        });
        $('#BtnEditar').click(function () {
            var dataRecord = Solicitudes.getRecord();
            if (!(dataRecord.NOM_EST_SOL == "A" || dataRecord.NOM_EST_SOL == "R")) {
                if (dataRecord != null) {
                    byaPage.AbrirPagina(urlToNuevaSol + "?cod_sol=" + dataRecord.COD_SOL);
                }
                else {
                    byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
                }
            }
            else {
                byaMsgBox.alert("La Solicitud no se puede editar");
            }
        });
        $('#BtnAsignar').click(function () {
            _asignar();
        });
    };
   
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
        var sourceDep = byaPage.getSource(urlToGetvDEPENDENCIAD);
        $("#CboDepDel").byaCombo({ DataSource: sourceDep, Value: "COD_DEP", Display: "NOM_DEP", placeHolder: "Seleccione Dependencia" });
    };
    var _asignar = function () {
        $.get(urlAsigSolicitud, function (data) {
            $("#secDetalle").html(data);
        });
    };
    var getDataAdapter = function () {
        var dep_sol = "'" + $("#CboDepDel").val() + "'";
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_SOL', type: "STRING" },
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
                    { name: 'DEP_SOL', type: "STRING" },
                    { name: 'DEP_PSOL', type: "STRING" },
                    { name: 'ID_ABOG_ENC', type: "STRING" },
                    { name: 'NOM_CONTRATISTA', type: "STRING" }
                    
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon,
            data: { 'Dep_Del': dep_sol, 'Vigencia': Solicitudes.Vigencia(),'Estado':'"' + lstEstado.getSeleccionado() + '"' }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        return dataAdapter;
    };
    //crea GridTipos
    var _createGridCon = function () {
        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        };
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: getDataAdapter(),
                        theme: Solicitudes.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 500,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,pagesize:20,
                        columns: [
                        { text: 'Código ', datafield: 'COD_SOL', width: 150 },
                        { text: 'Objeto', datafield: 'OBJ_SOL', width: 150 },
                        { text: 'Contratista(F)', datafield: 'NOM_CONTRATISTA', width: 150 },
                        { text: 'Encargado', datafield: 'NOM_ABOG_ENC', width: 150 },
                        { text: 'Recibido?', datafield: 'EST_REC', width: 150 },
                        { text: 'Estado', datafield: 'NOM_EST_SOL', width: 150 },
                        { text: 'Modalidad', datafield: 'COD_TPRO_NOM', width: 150 },
                        { text: 'Clase', datafield: 'CLASE', width: 150 },
                        { text: 'Dependencia Solicitante', datafield: 'DEP_SOL_NOM', width: 150 },
                        
                        ]
                    });
        createLista();
    };
    return {
        id_ep: null,
        fnresultado: null,
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        Vigencia: function () {
            return byaSite.getVigencia();
        },
        getRecord: function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            //alert(JSON.stringify(dataRecord));
            return dataRecord;
        },
        refresh:function(){
            $(gridCon).jqxGrid({ source: getDataAdapter() });
            createLista();
        },
        init: function () {
            _createElements();
            _addHandlers();
            _createGridCon();
         //   _HabilitarE();
        }
    };
} ());


$(function () {
    byaSite.SetModuloP({ TituloForm: "Panel de Solicitudes", Modulo: "Procesos Precontractuales", urlToPanelModulo: "GesSolicitudes.aspx", Cod_Mod: "SOLI4", Rol: "PR_RECEP" });
    Solicitudes.config.theme = byaSite.tema
    Solicitudes.init();
});