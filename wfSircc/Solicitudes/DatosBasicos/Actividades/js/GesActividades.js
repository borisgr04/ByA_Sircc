var GesActividades = (function () {
    "use strict";
    var TituloForm = "Recepción de Actividades <small > por Delegación</small>";
    var gridCon = '#jqxgridAct';
    var urlToGridCon = "/Servicios/ProcesosDB/wsActividades.asmx/GetActividades";
    var urlToNuevaActivida = "admActividades.aspx";
    var urlToGetvVigencias = "/Servicios/wsDatosBasicos.asmx/GetvVigencias"
    var urlToGetvModalidades = "/Servicios/wsDatosBasicos.asmx/GetvModalidad"
    
    
    var _addHandlers = function () {
       
        $("#CboDepDel").change(function () {
            $(gridCon).jqxGrid({ source: getDataAdapter() });
        });
        $('#BtnConsulta').click(function () {
            _createGridCon();
        });
        $('#BtnNuevo').click(function () {
            byaPage.AbrirPagina(urlToNuevaActivida);
        });
        $('#BtnConsulta').click(function () {
            _createGridCon();
        });
        $('#BtnEditar').click(function () {
            var dataRecord = GesActividades.getRecord();           
            if (dataRecord != null) {
                byaPage.AbrirPagina(urlToNuevaActivida + "?COD_ACT=" + dataRecord.COD_ACT + "&COD_TPRO=" + dataRecord.COD_TPRO + "&VIGENCIA=" + dataRecord.VIGENCIA);
                }
                else {
                    byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
                }
            
           
        });
       
    };
   
    var _createElements = function () {
       
        $("#TituloForm").html(TituloForm);
        var sourceVig = byaPage.getSource(urlToGetvVigencias);
        $("#CboVig").byaCombo({ DataSource: sourceVig, Value: "YEAR_VIG", Display: "YEAR_VIG", placeHolder: "Seleccione La Vigencia:" });
        var sourceModal = byaPage.getSource(urlToGetvModalidades);
        $("#CboModal").byaCombo({ DataSource: sourceModal, Value: "COD_TPROC", Display: "NOM_TPROC", placeHolder: "Seleccione La Modalidad:" });
    };   
    var getDataAdapter = function () {
        
        var VIG = "'" + $("#CboVig").val() + "'";
        var TPRO = "'" + $("#CboModal").val() + "'";       
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'COD_ACT' },
                    { name: 'NOM_ACT' },
                    { name: 'COD_TPRO' },
                    { name: 'VIGENCIA' },
                    { name: 'ORDEN' },
                    { name: 'OCUPADO' },
                    { name: 'EST_PROC' },
                    { name: 'ESTADO' },
                    { name: 'OBLIGATORIO' },
                    { name: 'DIA_NOHABIL' },
                    { name: 'NOTIFICAR' }
                  
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon,
            data: { 'VIG': VIG, 'TPRO': TPRO }
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
                        theme: GesActividades.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Código', datafield: 'COD_ACT', width: 100 },                          
                        { text: 'Vigencia', datafield: 'VIGENCIA', width: 100 },
                        { text: 'Tipo de Proceso', datafield: 'COD_TPRO', width: 150 },
                        { text: 'Nombre de la Actividad', datafield: 'NOM_ACT', width: 250 },
                        { text: 'Estado del Proceso', datafield: 'EST_PROC', width: 100 },
                        { text: 'Orden', datafield: 'ORDEN', width: 100 },
                        { text: 'Estado', datafield: 'ESTADO', width: 100 },
                        { text: 'Obligatorio', datafield: 'OBLIGATORIO', width: 100 },
                        { text: 'Ocupado', datafield: 'OCUPADO', width: 100 },
                        { text: 'Dia no Hábil', datafield: 'DIA_NOHABIL', width: 100 },
                        { text: 'Notificar', datafield: 'NOTIFICAR', width: 100 }
                        ]
                    });

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
            return dataRecord;
        },
        refresh:function(){
            $(gridCon).jqxGrid({ source: getDataAdapter() });
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
    GesActividades.config.theme = byaSite.tema
    GesActividades.init();
});