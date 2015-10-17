var Acta = (function () {
    var tema;
    var codCon;
    var IdActa;
    var Estado = "02";

    var urlModulo     = "/ControlPagos/Tesoreria/Panel.aspx";
    var TituloModulo  = "Tesoreria";
    var TituloForm    = "Registro de Egresos <small > Tesoreria</small>";
    var urlToGridCon = "/Servicios/wsTrasladosDoc.asmx/GetDocPorTram";
    var urlToGridCon2 = "/Servicios/wsFinanciero.asmx/GetRpOpLoadEgr";
    var urlToGridCon3 = "/Servicios/wsControlPagosC.asmx/GetRpOp";
    var urlToTrasladarR = "/Servicios/wsTrasladosDoc.asmx/UpdateTrasladosR";
    var gridCon = '#jqxgridSol';
    var gridDet = '#jqxgridDet';
    
    var urlToTraIndiv = "/Servicios/wsControlPagosC.asmx/UpdateRpOpEg";
    
    var msgPpal = "#LbMsg";
    var byaRpta;
    var jsonData;
    var ejecutar;
    var dataAdapter;
    //Adding event listeners
    var _addHandlers = function () {
        $("#chkTodos").change(function () {
            var rows = $(gridCon).jqxGrid('getrows');
            var valor=$(this).is(':checked');
            $.each(rows, function (index, item) {
                item.IS_TRAS = valor;
                var value = $(gridCon).jqxGrid('updaterow', item.uid, item);
            });
        });
        
        $("#BtnTramitar").click(function (event) {
            if(confirm("Implementar solo si esta integrado")){
                var rows = $(gridCon).jqxGrid('getboundrows');
                alert(JSON.stringify(rows));
            }
            //_guardar();
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

       $("#BtnTramitar").byaSetHabilitar(byaPage.IntegradoSIF);
       $("#chkTodos").byaSetHabilitar(byaPage.IntegradoSIF);
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
            data: {etapa:"'TS'"}
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
                        { name: 'EST_EGR' },
                        { name: 'ID_DC' }
                        
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
            // initialize jqxGrid  selectionmode:'singlecell',
            
            $(grid).jqxGrid(
                        {
                            width: '100%',
                            source: dataAdapter,
                            theme: Acta.config.theme,
                            localization: byaPage.getLocalization(),
                            sortable: true,
                            altrows: true,
                            enabletooltips: true,
                            editable: true,
                            editmode: byaPage.editGrid,
                            columns: [
                            { text: 'Documento',columngroup: 'Details',editable: false,  datafield: 'DOC_SOP', width: 90 },
                            { text: 'N° RP ', columngroup: 'Details', editable: false, datafield: 'NRO_RP', width: 50 },
                            { text: 'Fecha RP', columngroup: 'Details',editable: false,  datafield: 'FEC_RP', width: 80, columntype: 'datetimeinput', cellsformat: 'd' },
                            { text: 'Valor RP',editable: false,  columngroup: 'Details', datafield: 'VAL_RP', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2' },
                            { text: 'N° OP',editable: false,  columngroup: 'Details', datafield: 'NRO_OP', cellclassname: cellclass, width: 150 },
                            { text: 'Fecha OP',editable: false,  columngroup: 'Details', datafield: 'FEC_OP', width: 100, columntype: 'datetimeinput', cellsformat: 'd', cellclassname: cellclass },
                            { text: 'Valor OP',editable: false,  columngroup: 'Details', datafield: 'VAL_OP', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', cellclassname: cellclass },
                            { text: 'N° Egreso',editable: !byaPage.IntegradoSIF,  columngroup: 'Details',  datafield: 'NRO_EGR', cellclassname: cellclass, width: 100 },
                            { text: 'Fecha Egreso',editable: !byaPage.IntegradoSIF,  columngroup: 'Details', datafield: 'FEC_EGR', width: 150, columntype: 'datetimeinput', cellsformat: 'd', cellclassname: cellclass }
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
                        editable: true,
                        editmode: byaPage.editGrid,
                        columns: [
                         { text: '', datafield: 'IS_TRAS', width: 50, columntype: 'checkbox'},
                         { text: 'ID', datafield: 'ID', width: 70, editable: false },
                         { text: 'IDACTA', datafield: 'IDACTA', width: 70, editable: false },
                         { text: 'CONTRATO N°', datafield: 'COD_CON', width: 100, editable: false},
                         { text: 'DOCUMENTO', datafield: 'NOM_ACTA', width: 200, editable: false},
                         { text: 'CONTRATISTA', datafield: 'CONTRATISTA', width: 200, editable: false},
                         { text: 'VALOR', datafield: 'VAL_PAGO', width: 200, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', editable: false },
                         { text: '', datafield: 'Edit',width: 100 ,columntype: 'button', cellsrenderer: function () {
                                return "Guardar";
                         }, buttonclick: function (row) {
                             var dataRecord = $(gridCon).jqxGrid('getrowdata', row);                             //_createGridDet(gridDet, dataRecord.IDACTA);
                             var rows = $(gridDet).jqxGrid('getboundrows');
                             //alert(dataRecord.ID + "registro" + JSON.stringify(rows));

                             jsonData = "{'lst':" + JSON.stringify(rows) + ",id_ctrdoc:" + dataRecord.ID + "}";

                             byaPage.POST_Sync(urlToTraIndiv, jsonData, function (result) {
                                 byaRpta = byaPage.retObj(result.d);
                                 if (!byaRpta.Error) {
                                     $(msgPpal).msgBox({ titulo: "Registro de Egresos", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
                                     //Acta.editedRows.splice(0, Acta.editedRows.length);
                                     Abrir();
                                 } else {
                                     $(msgPpal).msgBox({ titulo: "Registro de Egresos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                                 }
                             });

                            }
                        }
                        ]
                    });
        $(gridCon).on('rowselect', function (event) {
            //alert(event.args.row.IDACTA);
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

