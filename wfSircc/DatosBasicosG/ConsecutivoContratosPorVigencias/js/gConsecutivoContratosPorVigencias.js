var objgestion = (function () {
    "use strict";
    var TituloForm = "CONSECUTIVO DE CONTRATOS POR VIGENCIA";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/DatosBasicosG/wsConsecutivoContratoPorVigencia.asmx/Gets";
    var urlToNueva = "ConsecutivoContratosPorVigencias.aspx";

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            window.location.href = urlToNueva;
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?YEAR_VIG=" + objPAA.YEAR_VIG + "&COD_TIP=" + objPAA.COD_TIP;
            else $("#LbMsg").msgBox({ titulo: "Consecutivo de contratos por vigencias", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'YEAR_VIG', type: 'string' },
                    { name: 'COD_TIP', type: 'string' },
                    { name: 'NOM_COD_TIP', type: 'string' },
                    { name: 'NRO_INI_CON', type: 'string' },
                    { name: 'NRO_ACT_CON', type: 'string' },
                    { name: 'POR_ADI_VIG', type: 'string' }
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
                        { text: 'Año', datafield: 'YEAR_VIG', width: 100, filtertype: 'textbox' },
                        { text: 'Tipo Contrato', datafield: 'NOM_COD_TIP', width: 180, filtertype: 'textbox' },
                        { text: 'Número Inicial', datafield: 'NRO_INI_CON', width: 100, filtertype: 'textbox' },
                        { text: 'Número Actual', datafield: 'NRO_ACT_CON', width: 100 },
                        { text: 'Porcentaje de adición', datafield: 'POR_ADI_VIG', width: 150 }
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
    byaSite.SetModuloP({ TituloForm: "Consecutivo de contratos por vigencias", Modulo: "Gestión", urlToPanelModulo: "gConsecutivoContratoPorVigencias.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4ConConVig" });
    objgestion.config.theme = byaSite.tema
    objgestion.init();
});