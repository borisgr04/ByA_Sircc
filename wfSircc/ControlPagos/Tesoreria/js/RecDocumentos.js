var Acta = (function () {
    var tema;
    var codCon;
    var IdActa;
    var Estado = "02";

    var urlModulo     = "/ControlPagos/Tesoreria/Panel.aspx";
    var TituloModulo  = "Tesoreria";
    var TituloForm    = "Recepción de Cuentas <small > Tesoreria</small>";
    var urlToGridCon = "/Servicios/wsTrasladosDoc.asmx/GetRecTrasladoByID";
    var urlToGridCon2 = "/Servicios/wsControlPagosC.asmx/GetRpOp";
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
        $("#chkTodos").change(function () {
            var rows = $(gridCon).jqxGrid('getrows');
            var valor = $(this).is(':checked');
            
            $.each(rows, function (index, item) {
                if (item.EST_TRA != "RE") {
                    item.IS_TRAS = valor;
                    var value = $(gridCon).jqxGrid('updaterow', item.uid, item);
                }
            });
        });
        $("#BtnSelTodo").click(function (event) {
            var rows = $(gridCon).jqxGrid('getrows');
            $.each(rows, function (index, item) {
                item.IS_TRAS = true;
                var value = $(gridCon).jqxGrid('updaterow', item.uid, item);
            });
        });
        $("#BtnNinguno").click(function (event) {
            var rows = $(gridCon).jqxGrid('getrows');
            $.each(rows, function (index, item) {
                item.IS_TRAS = false;
                var value = $(gridCon).jqxGrid('updaterow', item.uid, item);
            });
        });
        
        $("#BtnTrasladar").click(function (event) {
            var rows = $(gridCon).jqxGrid('getboundrows');
            alert(JSON.stringify(rows));
            _guardar();
        });

        $('#BtnRevisar').click(function () {
            _mostrarRevisar();
        });

        $(gridCon).on('cellvaluechanged', function (event) {
            var column = args.datafield; var row = args.rowindex;
            var value = args.newvalue; var oldvalue = args.oldvalue;
            // @param bound index. Bound index is the row's index in the array returned by the "getboundrows" method.
            var rowid = $(gridCon).jqxGrid('getrowid', row);
            // @param row id
            var data = $(gridCon).jqxGrid('getrowdatabyid', rowid);
            
            var value = $(gridCon).jqxGrid('updaterow', rowid, data);
            
        });
    };
   
    var _mostrarRevisar = function () {
        
        $('#modalRecibir').modal('show');
        
    };
    var _guardar = function () {
        var rows = $(gridCon).jqxGrid('getboundrows');
        jsonData = "{'lst':"+JSON.stringify(rows)+"}";
        
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
            updaterow: function (rowid, rowdata, commit) {
                var rowindex = $(gridCon).jqxGrid('getrowboundindexbyid', rowid);
                Acta.editedRows.push({ index: rowindex, data: rowdata });
                commit(true);
            },
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'idtras': Acta.getIdTras() }
        };
        var cellclass = function (row, datafield, value, rowdata) {
            for (var i = 0; i < Acta.editedRows.length; i++) {
                if (Acta.editedRows[i].index == row) {
                    return "editedRow";
                }
            }
        };
        var cellbeginedit = function (row, datafield, columntype, value) {
            //alert(row);
            var rowid = $(gridCon).jqxGrid('getrowid', row);
            // @param row id
            var data = $(gridCon).jqxGrid('getrowdatabyid', rowid);

            if (data.EST_TRA == "RE") return false;
        }

        dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        // initialize jqxGrid  selectionmode:'singlecell',

        var initrowdetails = function (index, parentElement, gridElement, record) {
            //console.log(record.IDACTA);
            var grid = $($(parentElement).children()[0]);
            _createGridDet(grid, record.IDACTA);
        };

        var _createGridDet = function (grid, IdActa) {
            var source = {
                datatype: "xml",
                datafields: [
                        { name: 'NRO_RP' },
                        { name: 'COD_CON' },
                        { name: 'FEC_RP', type: 'date' },
                        { name: 'VIGENCIA' },
                        { name: 'DOC_SOP' },
                        { name: 'VAL_RP', type: 'number' },
                        { name: 'VAL_PAGO' },
                        { name: 'VIG_CDP' },
                        { name: 'NRO_CDP' },
                        { name: 'VIG_OP' },
                        { name: 'NRO_OP' },
                        { name: 'FEC_OP', type: 'date' },
                        { name: 'VAL_OP', type: 'number' },
                        { name: 'NRO_EGR', type: 'number' },
                        { name: 'FEC_EGR', type: 'date' },
                        { name: 'EST_EGR' }
                ],
                async: false,
                record: 'Table',
                url: urlToGridCon2,
                data: { 'IdActa': IdActa }
            };
            var cellclass = function (row, datafield, value, rowdata) {
                for (var i = 0; i < Acta.editedRows.length; i++) {
                    if (Acta.editedRows[i].index == row) {
                        return "editedRow";
                    }
                }
            };
            dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
            
            $(grid).jqxGrid(
                       {
                           width: '100%',
                           source: dataAdapter,
                           theme: Acta.config.theme,
                           localization: byaPage.getLocalization(),
                           sortable: true,
                           altrows: true,
                           enabletooltips: true,
                           editmode: byaPage.editGrid,
                           columns: [
                           { text: 'Documento', columngroup: 'Details', datafield: 'DOC_SOP', width: 90 },
                           { text: 'N° RP ', columngroup: 'Details', datafield: 'NRO_RP', width: 50 },
                           { text: 'Fecha RP', columngroup: 'Details', datafield: 'FEC_RP', width: 80, columntype: 'datetimeinput', cellsformat: 'd' },
                           { text: 'Valor RP', columngroup: 'Details', datafield: 'VAL_RP', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2' },
                           { text: 'N° OP', columngroup: 'Details', datafield: 'NRO_OP', cellclassname: cellclass, width: 150 },
                           { text: 'Fecha OP', columngroup: 'Details', datafield: 'FEC_OP', width: 100, columntype: 'datetimeinput', cellsformat: 'd', cellclassname: cellclass },
                           { text: 'Valor OP', columngroup: 'Details', datafield: 'VAL_OP', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', cellclassname: cellclass },
                           { text: 'N° Egreso', columngroup: 'Details', datafield: 'NRO_EGR', cellclassname: cellclass, width: 100 },
                           { text: 'Fecha Egreso', columngroup: 'Details', datafield: 'FEC_EGR', width: 150, columntype: 'datetimeinput', cellsformat: 'd', cellclassname: cellclass }
                           ],
                           columngroups:
                           [
                             { text: '<b>Ordenes de Pago Relacionadas</b>', align: 'center', name: 'Details' },
                           ]
                       });
        };

        $(gridCon).jqxGrid(
                     {
                         width: '100%',
                         source: dataAdapter,
                         theme: Acta.config.theme,
                         localization: byaPage.getLocalization(),
                         sortable: true,
                         altrows: true,
                         height: 200,
                         filterable: true,
                         enabletooltips: true,
                         editmode: byaPage.editGrid,
                         //rowdetails: true,
                         editable: true,
                         //initrowdetails: initrowdetails,
                         //rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 100, rowdetailshidden: true },
                         ready: function () {
                             // called when the Grid is loaded. Call methods or set properties here.         
                         },
                         columns: [
                         { text: 'IS_TRAS', datafield: 'IS_TRAS', width: 100, columntype: 'checkbox', cellbeginedit: cellbeginedit },
                         { text: 'ID', datafield: 'ID', width: 100, editable: false, cellbeginedit: cellbeginedit, },
                         { text: 'IDACTA', datafield: 'IDACTA', width: 100, editable: false, cellbeginedit: cellbeginedit },
                         { text: 'CONTRATO N°', datafield: 'COD_CON', width: 100, editable: false, cellbeginedit: cellbeginedit },
                         { text: 'DOCUMENTO', datafield: 'NOM_ACTA', width: 200, editable: false, cellbeginedit: cellbeginedit },
                         { text: 'CONTRATISTA', datafield: 'CONTRATISTA', width: 200, editable: false, cellbeginedit: cellbeginedit },
                         { text: 'VALOR', datafield: 'VAL_PAGO', width: 200, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', editable: false, cellbeginedit: cellbeginedit }

                         ]
                     });
        $(gridCon).on('rowselect', function (event) {
            //alert(JSON.stringify(event.args.row));
            _createGridDet(gridDet, event.args.row.IDACTA);
        });
        $(gridCon).jqxGrid('selectrow', 0);

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
       init: function () {
           this.editedRows = new Array();
           _createElements();
           _addHandlers();
           _iniElements();
       }
   }
} ());


$(document).ready(function () {
    Acta.config.theme = byaSite.tema;
    Acta.init();
});

