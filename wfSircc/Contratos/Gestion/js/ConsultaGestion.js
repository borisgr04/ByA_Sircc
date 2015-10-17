var Consulta = (function () {
    "use strict";
    var grid = '#jqxgridGestion';

    var urlToGridCon = "/Servicios/wsContratosGestionS.asmx/GetConsultaContratos";    
    var urlToFiltro = '/Servicios/wsContratosGestionS.asmx/GetDepContratos';
    var urlToDetContratos = "Gestion.aspx";
    var Cod_Con;
    var byaRpta;
    var msgPpal = "#LbMsg";
    var _addHandlers = function () {
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });     
        $('#BtndetallesGestion').click(function () {
            _Detalle();
        });
        $('#CboFil').change(function () {
            _createGrid();
            $('#BtndetallesGestion').byaSetHabilitar(true);
        });
        $(grid).on('rowdoubleclick', function (event) {
            _Detalle();
        });

    };
    var _Detalle = function () {
        var dataRecord = Consulta.getRecord();
        if (dataRecord != null) {
            byaPage.AbrirPagina(urlToDetContratos + "?cod_con=" + dataRecord.Numero);
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }
    }    
    var _createElements = function () {
        $('#BtndetallesGestion').byaSetHabilitar(false);         
        var sourceFil = byaPage.getSource(urlToFiltro);
        $("#CboFil").byaCombo({ DataSource: sourceFil, Value: "COD_DEP", Display: "NOM_DEP" });
    };
    var getDataAdapter = function () {
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
            data: { 'Dep_Nec': dep_nec, 'Vig_Con': Consulta.Vigencia() }
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
        return dataAdapter;
    };
    var _createGrid = function () {
       

        // initialize jqxGrid
        $(grid).jqxGrid(
                    {
                        width: '100%',
                        source: getDataAdapter(),
                        theme: Consulta.config.theme,
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
                        { text: 'Fecha_Suscripcion', datafield: 'Fecha_Suscripcion', columntype: 'datetimeinput', cellsformat: 'd', width: 150 },
                        { text: 'Dependencia Solicitante', datafield: 'DependenciaNec', width: 150 },
                        { text: 'Dependencia Delegada', datafield: 'DependenciaDel', width: 150 },
                        { text: 'Estado', datafield: 'Estado', width: 150 }
                        ]
                    });

    }
  
 


    return {
        id_ep: null,
        fnresultado: null,
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        Vigencia: function () {
            return byaSite.getVigencia();
        },
        getRecord: function () {
            var selectedrowindex = $(grid).jqxGrid('getselectedrowindex');
            var dataRecord = $(grid).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        refresh: function () {
            $(grid).jqxGrid({ source: getDataAdapter() });
        },
        init: function () {
            _addHandlers();           
            _createElements();

            //   _HabilitarE();
        }
    };

}());




$(function () {
    byaSite.SetModuloP({ TituloForm: "ConsultaGestion", Modulo: "Contratos", urlToPanelModulo: "#", Cod_Mod: "CONT4", Rol: "CT_CON" });
   
    Consulta.config.theme = byaSite.tema
    Consulta.init();

});