var objgestion = (function () {
    "use strict";
    var TituloForm = "VIGENCIAS";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/DatosBasicosG/wsVigencias.asmx/Gets";
    var urlToNueva = "Vigencias.aspx";

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            window.location.href = urlToNueva;
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?idObj=" + objPAA.YEAR_VIG;
            else $("#LbMsg").msgBox({ titulo: "Vigencias", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
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
                    { name: 'FEC_INI_VIG' },
                    { name: 'FEC_FIN_VIG'},
                    { name: 'POR_ADI_VIG', type: 'string' },
                    { name: 'EST_VIG' },
                    { name: 'RAD_AUT' }
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
                        { text: 'Fecha de inicio', datafield: 'FEC_INI_VIG', width: 180, filtertype: 'textbox' },
                        { text: 'Fecha de fin', datafield: 'FEC_FIN_VIG', width: 180, filtertype: 'textbox' },
                        { text: 'Porcentaje de adición', datafield: 'POR_ADI_VIG', width: 150 },
                        { text: 'Estado', datafield: 'EST_VIG', width: 100 },
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
    byaSite.SetModuloP({ TituloForm: "Vigencias", Modulo: "Gestion", urlToPanelModulo: "gVigencias.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4Vigencias" });
    objgestion.config.theme = byaSite.tema
    objgestion.init();
});