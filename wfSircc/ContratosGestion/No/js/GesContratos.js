var Contratos = (function () {
    "use strict";
    var tema;
    var TituloForm = "Gestión de Contratos <small > por Supervisor</small>";
    var gridCon = '#jqxgridSol';

    var urlToGridCon = "/Servicios/wsContratosGestionS.asmx/GetConsultaContratos";
    var urlToDetContratos = "GesDetContratos.aspx";
    var urlToFiltro = '/Servicios/wsContratosGestionS.asmx/GetDepContratos';

    
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
        $(gridCon).on('rowdoubleclick', function (event) {
            _Detalle();
        });
    };

    
    var _Detalle = function () {
        var dataRecord = Contratos.getRecord();
        if (dataRecord != null) {
            byaPage.AbrirPagina(urlToDetContratos + "?cod_con=" + dataRecord.Numero);
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }
    }
    
    var _createElements = function () {
        
        $("#TituloForm").html(TituloForm);
        tema = Contratos.config.theme;
        var sourceFil = byaPage.getSource(urlToFiltro);
        $("#CboFil").byaCombo({ DataSource: sourceFil, Value: "COD_DEP", Display: "NOM_DEP" });
    };
    //crea GridTipos
    var _createGridCon=function () {
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
                        height: 350,
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
                        { text: 'Fecha_Suscripcion', datafield: 'Fecha_Suscripcion', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right' },
                        { text: 'DependenciaNec', datafield: 'DependenciaNec', width: 150 },
                        { text: 'DependenciaDel', datafield: 'DependenciaDel', width: 150 },
                        { text: 'Estado',  datafield: 'Estado', width: 150 }
                    ]
                    });

    }
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
    Contratos.config.theme = byaSite.tema;
    Contratos.init();
});