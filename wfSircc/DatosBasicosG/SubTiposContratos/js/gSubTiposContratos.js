var objgestion = (function () {
    "use strict";
    var TituloForm = "SUBTIPOS DE CONTRATOS";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/DatosBasicosG/wsSubTiposContratos.asmx/Gets";
    var urlToTiposContratos = "/Servicios/DatosBasicosG/wsTiposContratos.asmx/GetsActivos";
    var urlToNueva = "SubTiposContratos.aspx";
    var idTiposContrato = "";
    var sourceTiposContratos;
    var NombreTipoContrato

    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            if (idTiposContrato != "") window.location.href = urlToNueva + "?idTipoContrato=" + idTiposContrato + "&NombreTipoContrato=" + NombreTipoContrato;
            else $("#LbMsg").msgBox({ titulo: "Subtipos de Contratos", mensaje: "Debe seleccionar un Tipo de Contrato", tipo: false });
        });
        $('#BtnEditar').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?idTipoContrato=" + idTiposContrato + "&NombreTipoContrato=" + NombreTipoContrato + "&idObj=" + objPAA.COD_STIP;
            else $("#LbMsg").msgBox({ titulo: "Subtipos de Contratos", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
        });

        $("#cboTiposContratos").change(function () {
            idTiposContrato = $(this).val();
            $.each(sourceTiposContratos, function (index, item) {
                if (item.COD_TIP == idTiposContrato) NombreTipoContrato = item.NOM_TIP;
            });
            _createGridCon();
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);


        sourceTiposContratos = byaPage.getSource(urlToTiposContratos);
        $("#cboTiposContratos").byaCombo({ DataSource: sourceTiposContratos, Value: "COD_TIP", Display: "NOM_TIP" });
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_STIP', type: 'string' },
                    { name: 'NOM_STIP', type: 'string' },
                    { name: 'COD_TIP', type: 'string'},
                    { name: 'ESTADO', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon + "?COD_TIP='" + idTiposContrato + "'",
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
                        { text: 'Codigo', datafield: 'COD_STIP', width: 100, filtertype: 'textbox' },
                        { text: 'Nombre', datafield: 'NOM_STIP', width: 200, filtertype: 'textbox' },
                        { text: 'Tipo', datafield: 'COD_TIP', width: 100, filtertype: 'textbox' },
                        { text: 'Estado', datafield: 'ESTADO', width: 100, filtertype: 'textbox' }
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
    byaSite.SetModuloP({ TituloForm: "Subtipos de contratos", Modulo: "Gestion", urlToPanelModulo: "gSubTiposContratos.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4SubTiposCon" });
    objgestion.config.theme = byaSite.tema
    objgestion.init();
});