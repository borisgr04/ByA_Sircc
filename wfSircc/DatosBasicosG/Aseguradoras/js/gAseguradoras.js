var objgestion = (function () {
    "use strict";
    var TituloForm = "Aseguradoras";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/DatosBasicosG/wsAseguradoras.asmx/Gets";
    var urlToNueva = "Aseguradoras.aspx";

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            window.location.href = urlToNueva;
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?idObj=" + objPAA.COD_ASE;
            else $("#LbMsg").msgBox({ titulo: "Aseguradoras", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_ASE', type: 'string' },
                    { name: 'NOM_ASE', type: 'string' },
                    { name: 'ESTADO', type: 'string' }
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
                        { text: 'Código', datafield: 'COD_ASE', width: 100, filtertype: 'textbox' },
                        { text: 'Nombre', datafield: 'NOM_ASE', width: 300, filtertype: 'textbox' },
                        { text: 'Estado', datafield: 'ESTADO', width: 180, filtertype: 'textbox' }
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
    byaSite.SetModuloP({ TituloForm: "Aseguradoras", Modulo: "Gestion", urlToPanelModulo: "gAseguradoras.aspx", Cod_Mod: "DTBS4", Rol: "DBES4Aseguradoras" });
    objgestion.config.theme = byaSite.tema
    objgestion.init();
});