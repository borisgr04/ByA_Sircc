var Contratos = (function () {
    "use strict";
    var tema;
    var filasxPagina=20;
    var urlModulo = "/ContratosGestion/Contratista/GesContratos.aspx";
    var TituloModulo = "Contratista";
    var TituloForm = "Gestión de Contratos <small > Contratista</small>";
    var gridCon = '#jqxgridSol';

    var urlToGridCon = "/Servicios/wsContratosGestionC.asmx/GetConsultaContratos";
    var urlToDetContratos = "GesDetContratos.aspx";
    var urlToFiltro = '/Servicios/wsContratosGestionC.asmx/GetDepContratos';
    var urlToInfContratos = "GesDetContratos.aspx";
    
    var _addHandlers = function () {
        
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $('#BtnConsulta').click(function () {
            _createGridCon();
        });
        $('.detalle').click(function () {
            _Detalle();
        });
        $('#BtnDetalle').click(function () {
            _Detalle();
        });
        $('#BtnInformes').click(function () {
            _Informes();
        });
        
        $(gridCon).on('rowdoubleclick', function (event) {
            _Detalle();
            
        });
    };
    
    var _Informes = function () {
        var dataRecord = Contratos.getRecord();
        if (dataRecord != null) {
            byaPage.AbrirPagina(urlToInfContratos + "?cod_con=" + dataRecord.Numero);
        }
        else {
            byaMsgBox.alert("No ha seleccionado ningún Contrato");
        }
    }
    var _Detalle = function () {
        var dataRecord = Contratos.getRecord();
        if (dataRecord != null) {
            var Titulo = "INFORMACION DETALLADA DEL CONTRATO";
            $('#DetContrato').DetailsJSON(dataRecord, ContratosDAO.GetDataFields(), Titulo);
            $('#modalDetalle').modal('show');
        }
        else {
            byaMsgBox.alert("No ha seleccionado ningun Contrato");
        }
    };
    
    var _createElements = function () {
        $("#HeadRutaModulo").html("<a href='" + urlModulo + "'><i class='icon-dashboard'></i>" + TituloModulo + "</a>");
        $("#HeadRutaPagina").html("<i class='icon-file-alt'></i>" + TituloForm);
        $("#TituloForm").html(TituloForm);
        tema = Contratos.config.theme;
        var sourceFil = byaPage.getSource(urlToFiltro);
        $("#CboFil").byaCombo({ DataSource: sourceFil, Value: "COD_DEP", Display: "NOM_DEP" });
    };
    //crea GridTipos
    var _createGridCon = function () {
        var dep_nec = "'" + $("#CboFil").val() + "'";

        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'Numero' },
                    { name: 'Tipo' },
                    { name: 'Objeto' },
                    { name: 'Fecha_Suscripcion', type: 'date' },
                    { name: 'Valor_Contrato', type: 'number' },
                    { name: 'DependenciaNec' },
                    { name: 'DependenciaDel' },
                    { name: 'Contratista' },
                    { name: 'Estado' }
            ],
            pagesize: filasxPagina,
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'Dep_Nec': dep_nec, 'Vig_Con': Contratos.Vigencia() }
        };
        //, 
        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }
        var linkrenderer = function (row, column, value) {
            return '<a  class="btn btn-default" href="GesDetContratos.aspx?cod_con=' + value + '" target=_blank>' + value + "</a> ";
            /*var format = { target: '"_blank"' };
            var html = $.jqx.dataFormat.formatlink(value, format);
            return html;*/
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        // initialize jqxGrid
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: Contratos.config.theme,
                        localization: byaPage.getLocalization(),
                        
                        height: 400,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Numero ', datafield: 'Numero', width: 150 },
                        { text: 'Tipo', datafield: 'Tipo', width: 150 },
                        { text: 'Objeto', datafield: 'Objeto', width: 150 },
                        { text: 'Valor a Contratar', datafield: 'Valor_Contrato', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2' },
                        { text: 'Fecha_Suscripcion', datafield: 'Fecha_Suscripcion', columntype: 'datetimeinput', cellsformat: 'd', width: 150 },
                        { text: 'DependenciaNec', datafield: 'DependenciaNec', width: 150 },
                        { text: 'DependenciaDel', datafield: 'DependenciaDel', width: 150 },
                        { text: 'Estado', datafield: 'Estado', width: 150 }
                        ]
                    });
    };
    return {
        editedRows: null,
        config: {
            theme: null
        },
        Vigencia: function () {
            return byaSite.getVigencia();
        },
        getRecord : function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        init: function () {
            _createElements();
            _addHandlers();
            _createGridCon();
        }
    };
} ());

$(function () {

    byaSite.SetModuloP({ TituloForm: "Panel de Gestión de Contratistas", Modulo: "Gestión de Contratista", urlToPanelModulo: "", Cod_Mod: "", Rol: "" });

    Contratos.config.theme = byaSite.tema;
    Contratos.init();
});