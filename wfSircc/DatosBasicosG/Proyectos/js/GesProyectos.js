var ProyectosList = (function () {
    "use strict";
    var grid = '#jqxgridHisto';
    var urlToGridProyectos = "/Servicios/DatosBasicosG/wsProyectos.asmx/GetProyectos";
    var urlToAnular = "/Servicios/DatosBasicosG/wsProyectos.asmx/Delete";
    var byaRpta;
    var msgPpal = "#LbMsg";
    var urlToNuevo = "Proyectos.aspx"
    var _addHandlers = function () {        
        $("#nuevoButton").click(function () {
            byaPage.AbrirPagina(urlToNuevo);
        });
        $("#editarButton").click(function () {

            var dataRecord = ProyectosList.getRecord();
            if (dataRecord != undefined) {
                var target = urlToNuevo + "?idProyecto=" + dataRecord.PROYECTO;
                               byaPage.AbrirPagina(target);
            } else { alert("Debe Selecionar una fila de la tabla"); }
        });
        $("#anularButton").click(function () {
            var dataRecord = ProyectosList.getRecord();
            byaMsgBox.confirm("¿Desea anular el proyecto " + dataRecord.PROYECTO + " ?", function (result) {
                if (result) {
                    Anular();
                }
            });
        });


    };
    var Anular = function () {
        var dataRecord = ProyectosList.getRecord();
        if (dataRecord == undefined) {
            alert("Debe Selecionar Una Fila");
        }
        else {
            var jsonData = "{'Reg':" + JSON.stringify(dataRecord) + "}";
            byaPage.POST_Sync(urlToAnular, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                _createGrid();
                $(msgPpal).msgBox({ titulo: "Anulación de Proyectos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {

                }

            });
        }
    }
    var _createElements = function () {
        _createGrid();
    };
    var getDataAdapter = function () {
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'PROYECTO', type: "String" },
                    { name: 'VIGENCIA', type: "String" },
                    { name: 'NOMBRE_PROYECTO', type: "String" },
                    { name: 'FECHA_RAD', type: "date" },
                    { name: 'COMITE', type: "String" },
                    { name: 'ESTADO', type: "String" },
                    { name: 'VALOR', type: "String" },
                    { name: 'BPIN', type: "String" },
                    { name: 'TIP_PRO', type: "String" }
            ],
            async: true,
            record: 'Table',
            url: urlToGridProyectos,
            data: {
                filtro: "'" + byaSite.getVigencia() + "'"
            }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        return dataAdapter;
    };
    var _createGrid = function () {
        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        };

        $(grid).jqxGrid(
            {
                width: '100%',
                source: getDataAdapter(),
                theme: ProyectosList.config.theme,
                altrows: true,
                height: 200,
                editable: false,
                sortable: true,
                showfilterrow: true,
                autoheight: true,
                autorowheight: true,
                filterable: true,
                pageable: true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columns: [
                  { text: 'PROYECTO N°', datafield: 'PROYECTO', width: 150 },
                  { text: 'TIPO', datafield: 'TIP_PRO', width: 60 },
                  { text: 'BPIN', datafield: 'BPIN', width: 150 },
                  { text: 'VIGENCIA', datafield: 'VIGENCIA', width: 100 },
                  { text: 'NOMBRE_PROYECTO', datafield: 'NOMBRE_PROYECTO', width: 600 },
                  { text: 'FECHA RADICACIóN', datafield: 'FECHA_RAD',columntype: 'datetimeinput', cellsformat: 'd', width: 150 },
                  { text: 'COMITE', datafield: 'COMITE', width: 150 },
                  { text: 'ESTADO', datafield: 'ESTADO', width: 150 },
                  { text: 'VALOR', datafield: 'VALOR', width: 150 }

                ]
            });

    };
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


        }
    };

}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Registro de Proyectos", Modulo: "Datos Basicos", urlToPanelModulo: "GesProyectos.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4Proyectos" });
    ProyectosList.config.theme = byaSite.tema
    ProyectosList.init();

});
