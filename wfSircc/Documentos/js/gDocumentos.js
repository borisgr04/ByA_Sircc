var objgestion = (function () {
    "use strict";
    var TituloForm = "DOCUMENTOS";
    var gridCon = '#jqxgridSol';
    var gridConPantillas = "#jqxgridPlantillas";
    var urlToGridCon = "/Servicios/wsDocumentos.asmx/Gets";
    var urlToGridConFiltro = "/Servicios/wsDocumentos.asmx/GetsFiltro";
    var urlToGridConPlantillas = "/Servicios/wsPlantillas.asmx/GetsActivas"; 
    var urlToSourcePlantillas = "/Servicios/wsTiposPlantillas.asmx/GetsActivasJson";
    var urlToGuardarNuevo = "/Servicios/wsDocumentos.asmx/Insert";
    var urlToNueva = "Documentos.aspx";
    var objPlantilla;
    var NUM_PROC;

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            //window.location.href = urlToNueva;
            $("#modalPlantillas").modal("show");
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?idObj=" + objPAA.ID;
            else $("#LbMsg").msgBox({ titulo: "Documentos", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
        });
        $("#btnCrearDocumento").click(function () {
            var selectedrowindex = $(gridConPantillas).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridConPantillas).jqxGrid('getrowdata', selectedrowindex);
            if (confirm("Desea crear un documento con la plantilla " + dataRecord.TITULO + "?"))
            {
                NuevoDocumento(dataRecord.ID);
            }
        });
        $("#cboTiposPlantillas").change(function () {
            _createGridConFiltro();
        });
    };
    var NuevoDocumento = function (ID_PLA) {
        var jsonData = "{'ID_PLA': '" + ID_PLA + "', 'NUM_PROC':'" + NUM_PROC + "'}";
        byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            if (byaRpta.Error == false) window.location.href = urlToNueva + "?idObj=" + byaRpta.id;
            else alert(byaRpta.Mensaje);
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);

        var sourceTiposPlantilla = byaPage.getSource(urlToSourcePlantillas);
        $("#cboTiposPlantillas").byaCombo({
            DataSource: sourceTiposPlantilla, placeHolder: 'Seleccione', Display: "NOM_TIP", Value: "COD_TIP"
        });

        CargarPlantillas();
    };
    var CargarPlantillas = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID', type: 'string' },
                    { name: 'TITULO', type: 'string' },
                    { name: 'NOM_COD_TIP', type: 'string' },
                    { name: 'FEC_REV', type: 'date' },
                    { name: 'NRO_REV', type: 'string' },
                    { name: 'EST_PLA', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridConPlantillas,
            data: {
            }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        $(gridConPantillas).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
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
                        { text: 'Id', datafield: 'ID', width: 50, filtertype: 'textbox' },
                        { text: 'Titulo', datafield: 'TITULO', width: 300, filtertype: 'textbox' },
                        { text: 'Tipo', datafield: 'NOM_COD_TIP', width: 100, filtertype: 'textbox' },
                        { text: 'Fecha de revisión', datafield: 'FEC_REV', width: 200 },
                        { text: 'Nro. Revisión', datafield: 'NRO_REV', width: 100 }
                        ]
                    });

        
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID', type: 'string' },
                    { name: 'NRO_DOC', type: 'string' },
                    { name: 'TITULO', type: 'string' },
                    { name: 'NOM_COD_TIP', type: 'string' },
                    { name: 'FEC_REV', type: 'date' },
                    { name: 'NRO_REV', type: 'string' },
                    { name: 'EST_DOC', type: 'string' }, 
                    { name: 'FEC_DOC', type: 'date' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon,
            data: {
                NUM_PROC : "'" + NUM_PROC + "'"
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
                        { text: 'Nro. Documento', datafield: 'NRO_DOC', width: 150, filtertype: 'textbox' },
                        { text: 'Titulo', datafield: 'TITULO', width: 300, filtertype: 'textbox' },
                        { text: 'Fecha de revisión', datafield: 'FEC_REV', width: 200 },
                        { text: 'Nro. Revisión', datafield: 'NRO_REV', width: 100 },
                        { text: 'Estado', datafield: 'EST_DOC', width: 100 },
                        { text: 'Fecha del Documento', datafield: 'FEC_DOC', width: 200 }
                        ]
                    });

    };

    var getDataAdapterFiltro = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID', type: 'string' },
                    { name: 'NRO_DOC', type: 'string' },
                    { name: 'TITULO', type: 'string' },
                    { name: 'NOM_COD_TIP', type: 'string' },
                    { name: 'FEC_REV', type: 'date' },
                    { name: 'NRO_REV', type: 'string' },
                    { name: 'EST_DOC', type: 'string' },
                    { name: 'FEC_DOC', type: 'date' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridConFiltro,
            data: {
                NUM_PROC: "'" + NUM_PROC + "'",
                TIP_PLA: "'" + $("#cboTiposPlantillas").val() + "'"
            }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        return dataAdapter;
    };
    var _createGridConFiltro = function () {
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: getDataAdapterFiltro(),
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
                        { text: 'Nro. Documento', datafield: 'NRO_DOC', width: 150, filtertype: 'textbox' },
                        { text: 'Titulo', datafield: 'TITULO', width: 300, filtertype: 'textbox' },
                        { text: 'Fecha de revisión', datafield: 'FEC_REV', width: 200 },
                        { text: 'Nro. Revisión', datafield: 'NRO_REV', width: 100 },
                        { text: 'Estado', datafield: 'EST_DOC', width: 100 },
                        { text: 'Fecha del Documento', datafield: 'FEC_DOC', width: 200 }
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
            NUM_PROC = $.getUrlVar("NUM_PROC");
            _createElements();
            _addHandlers();
            _createGridCon();
        }
    };
}());


$(function () {
    byaSite.SetModuloP({ TituloForm: "Documentos", Modulo: "Gestion", urlToPanelModulo: "gDocumentos.aspx", Cod_Mod: "SOLI4", Rol: "PR_RECEP" });
    objgestion.config.theme = byaSite.tema;
    objgestion.init();
});