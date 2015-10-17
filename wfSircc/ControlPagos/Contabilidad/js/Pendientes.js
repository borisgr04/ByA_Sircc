var Acta = (function () {
    var tema;
    var codCon;
    var IdActa;
    var Estado = "02";

    var urlModulo = "/ControlPagos/Tesoreria/Panel.aspx";
    var TituloModulo = "Tesoreria";
    var TituloForm = "Recepción de Cuentas <small > Tesoreria</small>";
    var urlToGridCon = "/Servicios/wsTrasladosDoc.asmx/GetPendiente";
    var urlToRevisar = "DetCuenta.aspx?idacta=";
    var urlToTrasladarR = "/Servicios/wsTrasladosDoc.asmx/UpdateTrasladosR";
    var gridCon = '#jqxgridSol';
    var gridDet = '#jqxgridDet';

    var msgPpal = "#LbMsg";
    var byaRpta;
    var jsonData;
    var ejecutar;
    var dataAdapter;
    //Adding event listeners
    var _addHandlers = function () {
        
        $("#BtnRevisar").click(function (event) {
            _revisar();
        });
        
        
        $(gridCon).on('rowselect', function (event) {
            var column = args.datafield; var row = args.rowindex;
            var value = args.newvalue; var oldvalue = args.oldvalue;
            // @param bound index. Bound index is the row's index in the array returned by the "getboundrows" method.
            var rowid = $(gridCon).jqxGrid('getrowid', row);
            // @param row id
            var data = $(gridCon).jqxGrid('getrowdatabyid', rowid);
           // byaPage.AbriPagina("DetCuenta.aspx?id=" + data.ID);
            //alert(JSON.stringify(data));
        });
        
    };
    var _revisar = function () {
        var dataRecord = Acta.getRecord();
        if (dataRecord != null) {
            byaSite.AbrirPagina(urlToRevisar + dataRecord.IDACTA);
        }
    };
    var _mostrarRevisar = function () {
        
        $('#modalRecibir').modal('show');
        
    };
    var _guardar = function () {
        var rows = $(gridCon).jqxGrid('getboundrows');
        jsonData = "{'lst':" + JSON.stringify(rows) + "}";

        byaPage.POST_Sync(urlToTrasladarR, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            if (!byaRpta.Error) {
                $(msgPpal).msgBox({ titulo: "Recepción de Documentos", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
                Acta.editedRows.splice(0, Acta.editedRows.length);
                Abrir();
            } else {
                $(msgPpal).msgBox({ titulo: "Recepción de Documentos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            }
        });
    };

    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                Acta.config.oper = 'cancelar';
                _reset();
            }
        });
    };
    var Abrir = function () {
        _createGridCon();
    };
    var _iniElements = function () {
        //MOSTRAR LAS ACTAS PENDIENTES POR TRASLADAR
        _createGridCon();
    };
    var _createElements = function () {
        $("#HeadRutaModulo").html("<a href='" + urlModulo + codCon + "'><i class='icon-dashboard'></i>" + TituloModulo + "</a>");
        $("#HeadRutaPagina").html("<i class='icon-file-alt'></i>" + TituloForm);
        $("#TituloForm").html(TituloForm);
        tema = Acta.config.theme;
    };

    var _createGridCon = function () {
        
        var source = {
            datatype: "xml",
            datafields: [
                    { name: 'IS_TRAS', type: 'bool' },
                    { name: 'EST_TRA' },
	                { name: 'ID' },
                    { name: 'IDACTA' },
                    { name: 'COD_CON' },
                    { name: 'CONTRATISTA' },
                    { name: 'NOM_ACTA' },
                    { name: 'VAL_PAGO', type: 'number' }

            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'etapa': "'CT'" }
        };
        var cellclass = function (row, datafield, value, rowdata) {
            for (var i = 0; i < Acta.editedRows.length; i++) {
                if (Acta.editedRows[i].index == row) {
                    return "editedRow";
                }
            }
        };
       

        dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        // initialize jqxGrid  selectionmode:'singlecell',

        var cellclass = function (row, columnfield, value) {

            return 'filasGrid';
        };
        var linkrenderer = function (row, column, value) {
            if (value.indexOf('#') != -1) {
                value = value.substring(0, value.indexOf('#'));
            }
            var html = "<a  href='DetCuenta.aspx?id=" + value + "'><span class='glyphicon glyphicon-star'></span>" + value + "</a>";
            return html;
        };
        $(gridCon).jqxGrid(
                     {
                         width: '100%',
                         source: dataAdapter,
                         theme: Acta.config.theme,
                         localization: byaPage.getLocalization(),
                         altrows: true,
                         sortable: true,
                         autoheight: false,
                         height: 400,
                         pageable: false,
                         filterable: true,
                         enabletooltips: true,
                         rowsheight: 30,
                         columnsresize: true,
                         columns: [
                         { text: 'ID', datafield: 'ID',  cellsalign: 'center'},
                         { text: 'IDACTA', datafield: 'IDACTA', width: 100, editable: false,  cellclassname: cellclass },
                         { text: 'CONTRATO N°', datafield: 'COD_CON', width: 150, editable: false, cellclassname: cellclass },
                         { text: 'DOCUMENTO', datafield: 'NOM_ACTA', width: 200, editable: false, cellclassname: cellclass },
                         { text: 'VALOR', datafield: 'VAL_PAGO', width: 100, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', cellclassname: cellclass },
                         { text: 'CONTRATISTA', datafield: 'CONTRATISTA',  editable: false, cellclassname: cellclass }
                         ]
                     });
        $(gridCon).on('rowselect', function (event) {
            //_createGridDet(gridDet, event.args.row.IDACTA);
        });
        //$(gridCon).jqxGrid('selectrow', 0);

    };
    return {
        formulario: '#form1',
        editedRows: null,
        editarOp: false,
        getIdTras: function () {
            return $.getUrlVar('idtras');
        },
        config: {
            theme: null,
            oper: null
        },
        getUser: function () {
            return byaSite.getUsuario();
        },
        getRecord: function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        init: function () {
            this.editedRows = new Array();
            _createElements();
            _addHandlers();
            _iniElements();
        }
    }
}());


$(document).ready(function () {
    Acta.config.theme = byaSite.tema;
    Acta.init();
});

