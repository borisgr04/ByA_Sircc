var objgestion = (function () {
    "use strict";
    var TituloForm = "Modalidades";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/DatosBasicosG/wsConsecutivoPorModalidad.asmx/Gets";
    var urlToNueva = "ConsecutivoPorModalidad.aspx";

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            window.location.href = urlToNueva;
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?VIGENCIA=" + objPAA.VIGENCIA + "&DEPENDENCIA=" + objPAA.DEP_DEL + "&MODALIDAD=" + objPAA.TIP_PROC;
            else $("#LbMsg").msgBox({ titulo: "Consecutivo por Modalidad", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'VIGENCIA', type: 'string' },
                    { name: 'NOMBRE_DEP_DEP', type: 'string' },
                    { name: 'ABR_NOM_DEP', type: 'string' },
                    { name: 'NOMBRE_TIP_PROC', type: 'string' },
                    { name: 'ABR_NOM_TIP_PROC', type: 'string' },
                    { name: 'INICIAL', type: 'string' },
                    { name: 'SIGUIENTE', type: 'string' },
                    { name: 'DEP_DEL', type: 'string' },
                    { name: 'TIP_PROC', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon,
            data: {
                Vigencia: "'" + byaSite.getVigencia() + "'"
            }
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
                        { text: 'Vigencia', datafield: 'VIGENCIA', width: 70, filtertype: 'textbox' },
                        { text: 'Dependencia', datafield: 'NOMBRE_DEP_DEP', width: 200, filtertype: 'checkedlist' },
                        { text: 'Abreviatura Dep.', datafield: 'ABR_NOM_DEP', width: 150, filtertype: 'textbox' },
                        { text: 'Modalidad', datafield: 'NOMBRE_TIP_PROC', width: 300, filtertype: 'checkedlist' },
                        { text: 'Abreviatura Mod.', datafield: 'ABR_NOM_TIP_PROC', width: 150, filtertype: 'textbox' },
                        { text: 'Inicial', datafield: 'INICIAL', width: 70 },
                        { text: 'Siguiente', datafield: 'SIGUIENTE', width: 70 }
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
    byaSite.SetModuloP({ TituloForm: "Consecutivo Por Modalidad", Modulo: "Gestion", urlToPanelModulo: "gConsecutivoPorModalidad.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4ConMod" });
    objgestion.config.theme = byaSite.tema
    objgestion.init();
});