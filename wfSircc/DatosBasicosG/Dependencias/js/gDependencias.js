var objgestion = (function () {
    "use strict";
    var TituloForm = "DEPENDENCIAS";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/DatosBasicosG/wsDependencias.asmx/Gets";
    var urlToNueva = "Dependencias.aspx";

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            window.location.href = urlToNueva;
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?idObj=" + objPAA.COD_DEP;
            else $("#LbMsg").msgBox({ titulo: "Dependencias", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_DEP', type: 'string' },
                    { name: 'NOM_DEP', type: 'string' },
                    { name: 'NOM_DEP_DEL', type: 'string'},
                    { name: 'DEP_ABR', type: 'string' },
                    { name: 'IDE_TER', type: 'string'},
                    { name: 'NORMA_DEL', type: 'string' },
                    { name: 'NOM_ESTADO', type: 'string' },
                    { name: 'EMAIL', type: 'string' },
                    { name: 'CARGO_ENC', type: 'string' },
                    { name: 'NOM_INT_PRO', type: 'string' }
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
                        { text: 'Codigo', datafield: 'COD_DEP', width: 70, filtertype: 'textbox' },
                        { text: 'Nombre', datafield: 'NOM_DEP', width: 400, filtertype: 'textbox' },
                        { text: 'Abreviatura', datafield: 'DEP_ABR', width: 100, filtertype: 'textbox' },
                        { text: 'Id. Tercero', datafield: 'IDE_TER', width: 100, filtertype: 'textbox' },
                        { text: 'Estado', datafield: 'NOM_ESTADO', width: 100, filtertype: 'textbox' },
                        { text: 'Email', datafield: 'EMAIL', width: 230, filtertype: 'textbox' },
                        { text: 'Cargo Encargado', datafield: 'CARGO_ENC', width: 250, filtertype: 'textbox' },
                        { text: 'Integrado con Procesos y Cronograma', datafield: 'NOM_INT_PRO', width: 100, filtertype: 'textbox' },
                        { text: 'Dependencia delegada?', datafield: 'NOM_DEP_DEL', width: 150, filtertype: 'textbox' },
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
    byaSite.SetModuloP({ TituloForm: "Dependencias", Modulo: "Gestion", urlToPanelModulo: "gDependencias.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4Dependencias" });
    objgestion.config.theme = byaSite.tema
    objgestion.init();
});