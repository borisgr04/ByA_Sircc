var Pag = (function () {
    "use strict";
    //varables privadas
    var tema;
    var CodCon;
    var IdeInf;
    var Id;
    var Estado;
    var urlModulo = "/ContratosGestion/Contratista/GesContratos.aspx";
    var TituloModulo = "Contratista";
    var TituloForm = "Documentos del Informe <small> Contratista</small>";
    var gridCon = '#jqxgridGD';
    var msgPpal = "#LbMsg";
    var dataAdapter;
    var urlToGridCon = "/Servicios/wsGD_Documentos.asmx/GetBandeja";
    var urlToGridConD = "/Servicios/wsContratosGestionC.asmx/GetDocumentos";


    var urlToTipDoc = "/Servicios/wsDatosBasicos.asmx/GetTIPOSDOC";

    var urlToInsert = "/Servicios/wsContratosGestionC.asmx/InsDocActa";
    var urlToUpdate = "/Servicios/wsContratosGestionC.asmx/UpdDocActa";

    var urlToAbrirCon = "/Servicios/wsContratosGestionS.asmx/GetDetContratos";

    var oper = "";
    var ejecutar;
    //enlazar eventos
    var _addHandlers = function () {

        $(gridCon).on('rowselect', function (event) {
            var row = args.rowindex;
            $("#selectrowindex").text(event.args.rowindex);
            // @param bound index. Bound index is the row's index in the array returned by the "getboundrows" method.
            var rowid = $(gridCon).jqxGrid('getrowid', row);
            // @param row id
            var data = $(gridCon).jqxGrid('getrowdatabyid', rowid);
            _cambiarPDF(data.ID);
            $("#InfoFile").html("<b>" + data.NOMBRE + "</b> <br/>Tamaño:" + data.LONGITUD + " <br/>Tipo de Contenido:" + data.TYPE);
        });
    };

    //crear elementos
    var _createElements = function () {
        //$("#HeadRutaModulo").html("<a href='" + urlModulo + "'><i class='icon-dashboard'></i>" + TituloModulo + "</a>");
        //$("#HeadRutaPagina").html("<i class='icon-file-alt'></i>" + TituloForm);
        CodCon = Pag.getCod_Con();
        IdeInf = Pag.getIde_Inf();
        
        if (!CodCon || !IdeInf) {
            $(msgPpal).msgBox({ titulo: "CONTRATOS", mensaje: "no se especificó ningun contrato", tipo: false });
            return false;
        } else {
            _AbrirCon();
            tema = Pag.config.theme;
           
        }

    };
    var _UpdBandeja = function () {
        _createGridCon();
    };

    var _Upload = function () {
        window.open("/jqfileupload/index.html", "mywindow", "width=1000,height=600");
    };
    var _Asociar = function () {
        _guardarNuevo();
    };
    var _getDatosForm = function () {
        var Reg = {};
        var dataRecord = Pag.getRecord();
        if (dataRecord != null) {
            Reg.ID_DOC = dataRecord.ID;
            Reg.TIP_DOC = $("#txtTIPDOC").val();
            Reg.COD_CON = $("#txtCodCon").val();
            Reg.ID_INF = $("#txtIdeInf").val();
            //alert(JSON.stringify(Reg));
        }
        return Reg;
    };
    var _getDatosFormMod = function () {
        var dataRecord = {};
        return dataRecord;
    };
    var _guardar = function () {
        ejecutar();
    };
    var _guardarNuevo = function () {

        var jsonData = "{'Reg':" + JSON.stringify(_getDatosForm()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje);

            _createGridCon();
            _ocultarVentana();
        });
    };
    var _guardarModificacion = function () {
        var jsonData = "{'Reg':" + JSON.stringify(_getDatosFormMod()) + "}";
        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje + " - id " + byaRpta.id);

            _createGridCon();
            _ocultarVentana();
        });
    };
    var _Imprimir = function () {
        //var dataRecord = Contratos.getRecord();
        //byaSite.AbrirPagina(urlGenActa + dataRecord.ID );
        alert("Falta Implementar");
    };
    var _AbrirCon = function () {
        _createGridCon();
    };


    //crea GridTipos
    var _createGridCon = function () {
        var urlws;
        var jsondata;
        
            urlws = urlToGridConD;
            jsondata = { CodCon: "'" + Pag.getCod_Con() + "'", Id_info: "'" + Pag.getIde_Inf() + "'" };
        //var jsondata = {};
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID' },
                    { name: 'NOMBRE' },
                    { name: 'LONGITUD', type: 'number' },
                    { name: 'TYPE' }
            ],
            updaterow: function (rowid, rowdata, commit) {
                var rowindex = $(gridCon).jqxGrid('getrowboundindexbyid', rowid);
                Pag.editedRows.push({ index: rowindex, data: rowdata });
                commit(true);
            },
            pagesize: 20,
            async: false,
            record: 'Table',
            url: urlws,
            data: jsondata
        };
        //data: { 'IdGD': IdGD }
        var cellclass = function (row, datafield, value, rowdata) {
            for (var i = 0; i < Pag.editedRows.length; i++) {
                if (Pag.editedRows[i].index == row) {
                    return "editedRow";
                }
            }
        };
        dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        // initialize jqxGrid  selectionmode:'singlecell',

        //
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: Pag.config.theme,
                        localization: byaPage.getLocalization(),
                        sortable: true,
                        altrows: false,
                        enabletooltips: true,

                        autoheight: true,
                        editable: true,
                        editmode: byaPage.editGrid,
                        columnsresize: true,
                        columns: [
                        { text: 'Nombre del Documento', datafield: 'NOMBRE', editable: false }
                        ]
                    });

        //$(gridCon).jqxListBox({ source: dataAdapter, displayMember: "NOMBRE", valueMember: "ID", width: 200, height: 250 });
        //{ text: 'LONGITUD', datafield: 'LONGITUD', width: 100, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'n2', cellclassname: cellclass, editable: Pag.editarOp },
        //{ text: 'FEC_REG', datafield: 'FEC_REG', width: 150, columntype: 'datetimeinput', cellsformat: 'd', cellclassname: cellclass, editable: Pag.editarOp }
        //{ text: 'TYPE', datafield: 'TYPE', width: 80, editable: false },
    };
    var _cambiarPDF = function (i) {
        var url = 'http://localhost:1476/ashx/ashxDoc.ashx?id=' + i + '#toolbar=1';
        var doc = "<embed src='" + url + "' width='100%' height='600'>";
        $('#dvdemb').html(doc);
    };
    //opcion del return objeto anonimo publico
    return {
        editedRows: null,
        editarOp: false,
        Ide_Inf: null,
        Cod_Con: null,
        config: {
            theme: null
        },
        getIde_Inf: function () {
            return this.Ide_Inf;
        },
        getCod_Con: function () {
            return this.Cod_Con;
        },
        setCod_Con: function (value) {
            this.Cod_Con = value;
        },
        setIde_Inf: function (value) {
            this.Ide_Inf = value;
        },
        getRecord: function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        init: function () {
            //_loadDetContratos();
            this.editedRows = new Array();
            _createElements();
            _addHandlers();


            //_createGridCon();
        }
    };
}());

$(function () {
    
    Pag.config.theme = byaSite.tema;
    //Pag.setCod_Con("2012020024");
    //Pag.setIde_Inf(33);
    //Pag.init();
});

