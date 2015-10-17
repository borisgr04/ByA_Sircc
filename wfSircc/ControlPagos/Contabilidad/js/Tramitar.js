var Acta = (function () {
    "use strict";

    var integrado="NO"
    var tema;
    var codCon;
    var IdActa;
    var Estado = "02";

    var urlModulo     = "/ControlPagos/Contabilidad/Panel.aspx";
    var TituloModulo  = "Contabilidad";
    var TituloForm    = "Tramitar Cuenta <small > Contabilidad</small>";
    var urlToGridCon = "/Servicios/wsControlPagosC.asmx/GetRpOp";
    var urlToUpdateRpOp = "/Servicios/wsControlPagosC.asmx/UpdateRpOp";

    var gridCon = '#jqxgridSol';

    var urlToSfOp = "/Servicios/wsFinanciero.asmx/GetOp";

    //var urlToGuardarNuevo = "/Servicios/wsContratosGestionS.asmx/InsertActaParcialIM";
    //var urlToGuardarMod = "/Servicios/wsContratosGestionS.asmx/UpdatePSolicitud";
    
    var msgPpal = "#LbMsg";
    
    var byaRpta;
    var jsonData;
    var ejecutar;
    var dataAdapter;
    //Adding event listeners
    var _addHandlers = function () {
        $("#BtnTramitar").click(function (event) {
            _guardarTramitar();
        });
        $(gridCon).on('cellvaluechanged', function (event) {

            var column = args.datafield; var row = args.rowindex;
            var value = args.newvalue; var oldvalue = args.oldvalue;
            
            // @param bound index. Bound index is the row's index in the array returned by the "getboundrows" method.
            var rowid = $(gridCon).jqxGrid('getrowid', row);
            // @param row id
            if (integrado == "SI") {
                var data = $(gridCon).jqxGrid('getrowdatabyid', rowid);
                var Source = byaPage.retObj(byaPage.getSource(urlToSfOp, { nro_op: value, vigencia: byaSite.getVigencia() }));
                if (Source != null) {
                    data.VAL_OP = Source.VAL_TOTAL;
                    data.FEC_OP = byaPage.converJSONDate(Source.FEC_APROBACION);
                    var value = $(gridCon).jqxGrid('updaterow', rowid, data);
                }
                Acta.editarOp = false;
            }
            else {
                Acta.editarOp = true;
            }
            
        });
};
    
    var _guardarTramitar = function () {
        var rows = $(gridCon).jqxGrid('getboundrows');
        jsonData = "{'lst':"+JSON.stringify(rows)+",id_ctrdoc:"+ Acta.getIdCtrDoc()+"}";
        byaPage.POST_Sync(urlToUpdateRpOp, jsonData, function (result) {
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
       var user = Acta.getUser();
       codCon = Acta.getCodCon();
       IdActa = Acta.getIdActa();
       if (IdActa != null) {
           _createGridCon();
       }
   };
    var _createElements = function () {
       codCon = Acta.getCodCon();
       $("#HeadRutaModulo").html("<a href='" + urlModulo + codCon + "'><i class='icon-dashboard'></i>" + TituloModulo + "</a>");
       $("#HeadRutaPagina").html("<i class='icon-file-alt'></i>" + TituloForm);
       $("#TituloForm").html(TituloForm);
       tema = Acta.config.theme;
    };
  
var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'NRO_RP' },
                    { name: 'COD_CON' },
                    { name: 'FEC_RP', type:'date' },
                    { name: 'VIGENCIA' },
                    { name: 'DOC_SOP' },
                    { name: 'VAL_RP', type: 'number' },
                    { name: 'VAL_PAGO' },
                    { name: 'VIG_CDP' },
                    { name: 'NRO_CDP' },
                    { name: 'VIG_OP' },
                    { name: 'NRO_OP' },
                    { name: 'FEC_OP', type: 'date' },
                    { name: 'VAL_OP', type: 'number' }
            ],
            updaterow: function (rowid, rowdata, commit) {
                var rowindex = $(gridCon).jqxGrid('getrowboundindexbyid', rowid);
                Acta.editedRows.push({ index: rowindex, data: rowdata });
                commit(true);
            },
            async: false,
            record: 'Table',
            url: urlToGridCon,
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

        
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: Acta.config.theme,
                        localization: byaPage.getLocalization(),
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        enabletooltips: true,
                        editable: true,
                        showaggregates: true,
                        showstatusbar: true,
                        editmode: byaPage.editGrid,
                        columns: [
                        { text: 'Documento', datafield: 'DOC_SOP', width: 90, editable: false },
                        { text: 'N° RP ', datafield: 'NRO_RP', width: 50, editable: false },
                        { text: 'Fecha RP', datafield: 'FEC_RP', width: 80, columntype: 'datetimeinput', cellsformat: 'd', editable: false },
                        { text: 'Valor RP', datafield: 'VAL_RP', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', editable: false, aggregates: ['sum']  },
                        { text: 'N° OP', datafield: 'NRO_OP', cellclassname: cellclass, width: 150 },
                        { text: 'Fecha OP', datafield: 'FEC_OP', width: 150, columntype: 'datetimeinput', cellsformat: 'd', cellclassname: cellclass, editable: Acta.editarOp },
                        { text: 'Valor OP', datafield: 'VAL_OP', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', cellclassname: cellclass, editable: Acta.editarOp, aggregates: ['sum']  }
                        ]
                    });
    }
   return {
       formulario: '#form1',
       editedRows: null,
       editarOp:true,
       config: {
           theme: null,
           oper: null
       },
       getCodCon: function () {
           return $.getUrlVar('cod_con');
       },
       getIdActa:   function () {
           return $.getUrlVar('idacta');
       },
       getIdCtrDoc:   function () {
           return $.getUrlVar('id_ctrdoc');
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
