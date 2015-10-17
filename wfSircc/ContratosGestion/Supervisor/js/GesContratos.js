var Contratos = (function () {
    "use strict";
    var tema;
    var urlModulo = "/ContratosGestion/Supervisor/GesContratos.aspx";
    var TituloModulo = "Supervisor";
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
        $('#BtnGestion').click(function () {
            _Gestion();
        });
        $(gridCon).on('rowdoubleclick', function (event) {
            _Detalle();
        });
    };

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
    
    var _Gestion = function () {
        var dataRecord = Contratos.getRecord();
        if (dataRecord != null) {
            byaPage.AbrirPagina(urlToDetContratos + "?cod_con=" + dataRecord.Numero);
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }
    }
    
    var _createElements = function () {
        $("#HeadRutaModulo").html("<a href='"+ urlModulo +"'><i class='icon-dashboard'></i>" +TituloModulo+ "</a>");
        $("#HeadRutaPagina").html("<i class='icon-file-alt'></i>"+TituloForm);
        
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
                    { name: 'Fecha_Suscripción', type: 'date' },
                    { name: 'Valor_Contrato', type: 'number' },
                    { name: 'DependenciaNec' },
                    { name: 'DependenciaDel' },
                    { name: 'Contratista' },
                    { name: 'Ide_Contratista' },
                    { name: 'Nom_Interventor' },
                    { name: 'Ide_Interventor' },
                    { name: 'NroProceso' },
                    { name: 'Nom_Modalidad' },
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
                        { text: 'Numero ', datafield: 'Numero', width: 90 },
                        { text: 'Contratista ', datafield: 'Contratista', width: 200 },
                        { text: 'Objeto', datafield: 'Objeto', width: 150 },
                        { text: 'Valor a Contratar', datafield: 'Valor_Contrato', width: 130, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2' },
                        { text: 'Tipo', datafield: 'Tipo', width: 150 },
                        { text: 'Fecha_Suscripcion', datafield: 'Fecha_Suscripcion', columntype: 'datetimeinput', cellsformat: 'd', width: 130 },
                        { text: 'Dependencia Solicitante', datafield: 'DependenciaNec', width: 150 },
                        { text: 'Dependencia Delegada', datafield: 'DependenciaDel', width: 150 },
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

    byaSite.SetModuloP({ TituloForm: "Panel de Gestión de Contratos por Dependencia", Modulo: "Supervisión", urlToPanelModulo: "GesContratos.aspx", Cod_Mod: "SUPV4", Rol: "SP_SUPER" });

    Contratos.config.theme = byaSite.tema;
    Contratos.init();
});