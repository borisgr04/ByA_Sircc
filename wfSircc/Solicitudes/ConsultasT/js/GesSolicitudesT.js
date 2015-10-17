var Solicitudes = (function () {
    "use strict";
    var tema;

    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/ProcConsultas/wsProcesosT.asmx/GetSolicitudes";
    var urlToFiltro = '/Servicios/ProcConsultas/wsProcesosT.asmx/GetCategoriasFiltro';
    var urlToNextNum = '/Servicios/wsMisSolicitudes.asmx/GetProximoNumxMod';
    var urlDetSolicitud = "/Solicitudes/DetSolicitud2.html";

    var _addHandlers = function () {
        $('#BtnExcel').click(function () {
            $(gridCon).jqxGrid('exportdata', 'xls', 'Procesos');
        });
        $('#BtnFullScreen').click(function () {
            byaSite.launchFullScreen(document.getElementById("jqxgridSol"));
            $(gridCon).jqxGrid({ height: 600 });
        });
        $('#BtnFullScreenP').click(function () {
            byaSite.launchFullScreen(document.documentElement);
            $(gridCon).jqxGrid({ height: 600 });
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

    var _mostrarVentana = function () {
        $('#modalDetalle').modal('show');
    };
    var _ocultarVentana = function () {
        $('#modalDetalle').modal('hide');
    }
    var _Detalle = function () {
        $.get(urlDetSolicitud, function (data) {
            $("#secDetalle").html(data);
        });
    };
    var _createElements = function () {
        tema = Solicitudes.config.theme;
        var sourceFil = byaPage.getSource(urlToFiltro);
        $("#CboFil").byaCombo({DataSource: sourceFil, Value: "Key", Display: "Value" });
        $("#CboFil").val(Solicitudes.getEstado());
        
    };
    //crea GridTipos
    var _createGridCon = function () {
        var filtro = "'" + $("#CboFil").val() + "'";

        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_SOL' },
                    { name: 'OBJ_SOL', type:'string' },
                    { name: 'COD_TPRO_NOM' },
                    { name: 'CLASE' },
                    { name: 'DEP_SOL_NOM' },
                    { name: 'DEP_PSOL_NOM' },
                    { name: 'NOM_ABOG_ENC' },
                    { name: 'NOM_EST_SOL' },
                    { name: 'EST_REC' },
                    { name: 'VAL_CON', type: 'number' },
                    { name: 'OBS_REC' },
                    { name: 'OBS_REV' },
                    { name: 'ID_HREV' },
                    { name: 'FECHA_REVISADO', type: 'date' },
                    { name: 'FECHA_ASIGNADO', type: 'date' },
                    { name: 'FEC_RECIBIDO', type: 'date' },
                    { name: 'FEC_REC_ABOG', type: 'date' },
                    { name: 'IDE_CON' },
                    { name: 'NOM_CON' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon,
            data: { 'estado': filtro, vigencia: byaSite.getVigencia() }
        };
        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }

        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        // initialize jqxGrid

        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: Solicitudes.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columnsresize: true,
                        columns: [
                        { text: 'Código ', datafield: 'COD_SOL', width: 150 },
                        { text: 'Modalidad', datafield: 'COD_TPRO_NOM', width: 150 },
                        { text: 'Objeto', datafield: 'OBJ_SOL', width: 150 },
                        { text: 'Nombre Contratista', datafield: 'NOM_CON', width: 150 },
                        { text: 'Encargado', datafield: 'NOM_ABOG_ENC', width: 150 },
                        { text: 'Observación Recibido', datafield: 'OBS_REC', width: 150 },
                        { text: 'Observación Revisado', datafield: 'OBS_REV', width: 150 },
                        { text: 'Fecha Radicado', datafield: 'FEC_RECIBIDO', width: 150, columntype: 'datetimeinput', cellsalign: 'right', cellsformat: 'd' },
                        { text: 'Fecha Asignado', datafield: 'FECHA_ASIGNADO', width: 150, columntype: 'datetimeinput', cellsalign: 'right', cellsformat: 'd' },
                        { text: 'Fecha Recibido Abogado', datafield: 'FEC_REC_ABOG', width: 150, columntype: 'datetimeinput', cellsalign: 'right', cellsformat: 'd' },
                        { text: 'Fecha Revisado', datafield: 'FECHA_REVISADO', width: 150, columntype: 'datetimeinput', cellsalign: 'right', cellsformat: 'd' },
                        { text: 'Valor a Contratar', datafield: 'VAL_CON', width: 150, cellsformat: 'F2', cellsalign: 'right' },
                        { text: 'Clase', datafield: 'CLASE', width: 150 },
                        { text: 'Dependencia Solicitante', datafield: 'DEP_SOL_NOM', width: 150 },
                        { text: 'Dependencia Delegada', datafield: 'DEP_PSOL_NOM', width: 150 },
                        { text: 'Recibido?', datafield: 'EST_REC', width: 150 },
                        { text: 'Estado', datafield: 'NOM_EST_SOL', width: 150 }
                        ]
                    });

    }
    return {
        ID_HREV: null,
        editedRows: null,
        config: {
            theme: null
        },
        getEstado: function () {
            return $.getUrlVar("estado");
        }
        ,
        getRecord: function () {
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
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: " Consulta de Procesos", Modulo: "MAC - Monitoreo Actividades de Contratación ", urlToPanelModulo: "PanelConsT.aspx", Cod_Mod: "SOLI4", Rol: "PR_CONS" });
    Solicitudes.config.theme = byaSite.tema;
    Solicitudes.init();
});