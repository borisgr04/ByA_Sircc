var objgestion = (function () {
    "use strict";
    var TituloForm = "PLANTILLAS";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/wsPlantillas.asmx/Gets";
    var urlToNueva = "Plantillas.aspx";

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            window.location.href = urlToNueva;
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?idObj=" + objPAA.ID;
            else $("#LbMsg").msgBox({ titulo: "Plantillas", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
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
                    { name: 'TITULO', type: 'string' },
                    { name: 'NOM_COD_TIP', type: 'string' },
                    { name: 'FEC_REV', type: 'string' },
                    { name: 'NRO_REV', type: 'string' },
                    { name: 'EST_PLA', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon,
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
                        theme: objgestion.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Id', datafield: 'ID', width: 100, filtertype: 'textbox' },
                        { text: 'Titulo', datafield: 'TITULO', width: 300, filtertype: 'textbox' },
                        { text: 'Tipo', datafield: 'NOM_COD_TIP', width: 180, filtertype: 'textbox' },
                        { text: 'Fecha de revisión', datafield: 'FEC_REV', width: 200 },
                        { text: 'Nro. Revisión', datafield: 'NRO_REV', width: 100 },
                        { text: 'Estado', datafield: 'EST_PLA', width: 100 }
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
    byaSite.SetModuloP({ TituloForm: "Plantillas", Modulo: "Gestion", urlToPanelModulo: "gPlantillas.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4Plantillas" });
    objgestion.config.theme = byaSite.tema;
    objgestion.init();
});