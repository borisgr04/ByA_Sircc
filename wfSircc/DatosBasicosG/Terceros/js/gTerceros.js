var gTerceros = (function () {
    "use strict";
    var TituloForm = "Gestion de Terceros";
    var gridCon = '#jqxgridTerceros';
    var urlToGridCon = "../../Servicios/DatosBasicosG/wsTerceros.asmx/GetsFiltro";
    var Filtro = "";
    var ValorFiltro = "";

    var _addHandlers = function () {
        $("#BtnNuevo").click(function () {
            window.location.href = "Terceros.aspx";
        });
        $("#BtnEditar").click(function () {
            var obj = gTerceros.getRecord();
            window.location.href = "Terceros.aspx" + "?ideter=" + obj.IDE_TER;
        });
        $("#btnAgregarMiembros").click(function () {
            var item = gTerceros.getRecord();
            if ((item.TIPO == "UT") || (item.TIPO == "CS")) {
                if ((item.TIP_PER == "") || (item.RAZ_SOC == "") || (item.EXP_IDE == "")) {
                    alert("Los campos Tipo de persona, Razon Social y Expedicion son necesarios.\nPor Favor vaya a Editar y complete estos campos...");
                } else {
                    window.location.href = "gMiembros.aspx?ideTer=" + item.IDE_TER;
                }                
            }            
        });
        $("#btnBsqIdTer").click(function () {
            Filtro = "IDE_TER";
            ValorFiltro = $("#txtIdeTer").val();
            cargarGridNew();
        });
        $("#btnBsqNomTer").click(function () {
            Filtro = "NOMBRE";
            ValorFiltro = $("#txtNomTer").val();
            cargarGridNew();
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'TIP_IDE', type: 'string' },
                    { name: 'IDE_TER', type: 'string' },
                    { name: 'EXP_IDE', type: 'string' },
                    { name: 'NOM1_TER', type: 'string' },
                    { name: 'NOM2_TER', type: 'string' },
                    { name: 'APE1_TER', type: 'string' },
                    { name: 'APE2_TER', type: 'string' },
                    { name: 'TIPO', type: 'string' },
                    { name: 'TIP_PER', type: 'string' },
                    { name: 'CAR_FUN', type: 'string' },
                    { name: 'RAZ_SOC', type: 'string' },
                    { name: 'DIR_TER', type: 'string' },
                    { name: 'TEL_TER', type: 'string' },
                    { name: 'EMA_TER', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon + "?Filtro=" + "'" + Filtro + "'&Valor=" + "'" + ValorFiltro + "'",
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
                        theme: gTerceros.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Tipo Identificacion', datafield: 'TIP_IDE', width: 70, filtertype: 'textbox' },
                        { text: 'Identificacion', datafield: 'IDE_TER', width: 150, filtertype: 'textbox' },
                        { text: 'Expedida', datafield: 'EXP_IDE', width: 150, filtertype: 'textbox' },
                        { text: 'Primer Nombre', datafield: 'NOM1_TER', width: 150, filtertype: 'textbox' },
                        { text: 'Segundo Nombre', datafield: 'NOM2_TER', width: 150, filtertype: 'textbox' },
                        { text: 'Primer Apellido', datafield: 'APE1_TER', width: 150, filtertype: 'textbox' },
                        { text: 'Segundo Apellido', datafield: 'APE2_TER', width: 150, filtertype: 'textbox' },
                        { text: 'Tipo', datafield: 'TIPO', width: 100, filtertype: 'textbox' },
                        { text: 'Tipo Persona', datafield: 'TIP_PER', width: 100, filtertype: 'textbox' },
                        { text: 'Cargo', datafield: 'CAR_FUN', width: 150, filtertype: 'textbox' },
                        { text: 'Razon Social', datafield: 'RAZ_SOC', width: 150, filtertype: 'textbox' },
                        { text: 'Direccion', datafield: 'DIR_TER', width: 150, filtertype: 'textbox' },
                        { text: 'Telefono', datafield: 'TEL_TER', width: 150, filtertype: 'textbox' },
                        { text: 'Email', datafield: 'EMA_TER', width: 150, filtertype: 'textbox' }
                        ]
                    });

    };
    var cargarGridNew = function () {
        $(gridCon).jqxGrid({ source: getDataAdapter() });
    };
    return {
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
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
    byaSite.SetModuloP({ TituloForm: "Terceros", Modulo: "Gestion", urlToPanelModulo: "gTerceros.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4Terceros" });
    gTerceros.config.theme = byaSite.tema
    gTerceros.init();
});