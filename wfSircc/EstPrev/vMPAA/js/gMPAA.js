var gPAA = (function () {
    "use strict";
    var TituloForm = "PLAN ANUAL DE ADQUISICIÓN (PAA)";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/wsMPAA.asmx/Gets";
    var urlToGridCon2 = "/Servicios/wsPAA.asmx/GetXML";
    var urlDetSolicitud = "/Solicitudes/DetSolicitud2.html";
    var urlAsigSolicitud = "Asignar.html";
    var urlSourceDepS = '../Elaborar/wfRgEstPrev.aspx/GetvDEPENDENCIA';

    var urlToNuevaSol = "RegSolicitudes.aspx";
    var urlToGetvDEPENDENCIAD = '/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD';
    var id;
    var idEP;

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            window.location.href = "MPAA.aspx";
        });
        $('#BtnEditar').click(function () {
            var objPAA = gPAA.getRecord();
            window.location.href = "vMPAA.aspx?idObjMPAA=" + objPAA.ID;
        });
        $("#btnAgregarPlanesCompra").click(function () {
            var objPAA = gPAA.getRecord();
            window.location.href = "/EstPrev/vPAA/gvPAA.aspx?IdMPaa=" + objPAA.ID;
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID', type: 'string' },
                    { name: 'VIGENCIA', type: 'string' },
                    { name: 'OBSERV', type: 'string' },
                    { name: 'FEC_INI', type: 'string' },
                    { name: 'FEC_FIN' },
                    { name: 'ESTADO' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon + "?Vigencia=" + byaSite.getVigencia(),
            data: {}
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        return dataAdapter;
    };
    var _createGridCon = function () {
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: getDataAdapter(),
                        theme: gPAA.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Id', datafield: 'ID', width: 60, filtertype: 'textbox' },
                        { text: 'Vigencia', datafield: 'VIGENCIA', width: 80, filtertype: 'textbox' },
                        { text: 'Observacion', datafield: 'OBSERV', width: 200, filtertype: 'textbox' },
                        { text: 'Fch. Inicio', datafield: 'FEC_INI', width: 200 },
                        { text: 'Fch. Final', datafield: 'FEC_FIN', width: 200 },
                        { text: 'Estado', datafield: 'ESTADO', width: 100 },
                        ]
                    });

    };
    return {
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
        refresh: function () {
            $(gridCon).jqxGrid({ source: getDataAdapter() });
        },
        init: function () {
            _createElements();
            _addHandlers();
            _createGridCon();
        }
    };
}());


$(function () {
    byaSite.SetModuloP({ TituloForm: "Plan Anual de Adquisiciones", Modulo: "Gestion", urlToPanelModulo: "gMPAA.aspx", Cod_Mod: "SOLI4", Rol: "PR_RECEP" });
    gPAA.config.theme = byaSite.tema
    gPAA.init();
});