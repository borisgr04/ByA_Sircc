var objgestion = (function () {
    "use strict";
    var TituloForm = "Modalidades";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/DatosBasicosG/wsModalidades.asmx/Gets";
    var urlToNueva = "Modalidades.aspx";

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            window.location.href = urlToNueva;
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?idObj=" + objPAA.COD_TPROC;
            else $("#LbMsg").msgBox({ titulo: "Modalidades", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_TPROC', type: 'string' },
                    { name: 'NOM_TPROC' },
                    { name: 'ABRE_TPROC'},
                    { name: 'ESTA_TPROC', type: 'string' },
                    { name: 'COD_CTR' },
                    { name: 'CTR_F20_1A' }
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
                        { text: 'Código', datafield: 'COD_TPROC', width: 100, filtertype: 'textbox' },
                        { text: 'Nombre', datafield: 'NOM_TPROC', width: 420, filtertype: 'textbox' },
                        { text: 'Abreviatura', datafield: 'ABRE_TPROC', width: 100, filtertype: 'textbox' },
                        { text: 'Estado', datafield: 'ESTA_TPROC', width: 70 },
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
    byaSite.SetModuloP({ TituloForm: "Modalidades", Modulo: "Gestion", urlToPanelModulo: "gModalidades.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4Modalidades" });
    objgestion.config.theme = byaSite.tema
    objgestion.init();
});