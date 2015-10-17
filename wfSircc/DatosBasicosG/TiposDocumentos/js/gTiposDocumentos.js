var objgestion = (function () {
    "use strict";
    var TituloForm = "TIPOS DOCUMENTOS";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/DatosBasicosG/wsTiposDocumentos.asmx/Gets";
    var urlToNueva = "TiposDocumentos.aspx";

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            window.location.href = urlToNueva;
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?idObj=" + objPAA.COD_TIP;
            else $("#LbMsg").msgBox({ titulo: "Tipos Documentos", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_TIP', type: 'string' },
                    { name: 'DES_TIP', type: 'string' },
                    { name: 'NOM_EST', type: 'string' },
                    { name: 'NOM_ETAPA', type: 'string' },
                    { name: 'NOM_ORIGEN', type: 'string' }
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
                        { text: 'Código', datafield: 'COD_TIP', width: 70, filtertype: 'textbox' },
                        { text: 'Nombre', datafield: 'DES_TIP', width: 250, filtertype: 'textbox' },
                        { text: 'Estado', datafield: 'NOM_EST', width: 150, filtertype: 'textbox' },
                        { text: 'Etapa', datafield: 'NOM_ETAPA', width: 180, filtertype: 'textbox' },
                        { text: 'Origen', datafield: 'NOM_ORIGEN', width: 150, filtertype: 'textbox' }
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
    byaSite.SetModuloP({ TituloForm: "Tipos de Documentos", Modulo: "Gestión", urlToPanelModulo: "gTiposDocumentos.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4TipDocumento" });
    objgestion.config.theme = byaSite.tema
    objgestion.init();
});