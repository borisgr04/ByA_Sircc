var Pag = (function () {
    "use strict";
    //varables privadas
    var tema;
    var CodCon;
    var IdeInf;
    var Id;
    var Estado;

    var gridCon = '#jqxgridSol';
    var gridConDA = '#jqxgridDA';
    var msgPpal = "#LbMsg";
    var dataAdapter;
    var urlToGridCon = "/Servicios/wsGD_Documentos.asmx/GetBandeja";
    var urlToGridConD = "/Servicios/wsContratosGestionC.asmx/GetDocumentos";
    var sourceFil;

    var urlToTipDoc = "/Servicios/wsDatosBasicos.asmx/GetTIPOSDOC";
    var urlToInsert0 = "/Servicios/wsContratosGestionC.asmx/InsDocActa";
    var urlToInsert = "/Servicios/wsContratosGestionC.asmx/InsLstDocActa";
    var urlToUpdate = "/Servicios/wsContratosGestionC.asmx/UpdDocActa";
    var urlToAbrirCon = "/Servicios/wsContratosGestionS.asmx/GetDetContratos";

    var urlToInf = "GesDetContratos.aspx?cod_con=";
    var urlToSS = "GesSSContratos.aspx?cod_con=";
    var oper = "";
    var ejecutar;
    //enlazar eventos
    var _addHandlers = function () {

        $('#BtnUpload').click(function () {
            _Upload();
        });
        $('#BtnUpdBandeja').click(function () {
            _UpdBandeja();
        });
        $('#BtnAsociarD').click(function () {
            _Asociar();
            _createGridConDocAso();
         });
     
        $(gridCon).on('rowselect', function (event) {
            var row = args.rowindex;
            $("#selectrowindex").text(event.args.rowindex);
            // @param bound index. Bound index is the row's index in the array returned by the "getboundrows" method.
            var rowid = $(gridCon).jqxGrid('getrowid', row);
            // @param row id
            var data = $(gridCon).jqxGrid('getrowdatabyid', rowid);

            SeleccionarDoc(data);
            
        });
        $('#hrefInf').click(function (e) {
            _ShowInformes();
        });
        $('#hrefSS').click(function (e) {
            _ShowSS();
        });
        $(gridConDA).on('rowselect', function (event) {
            var row = args.rowindex;
            $("#selectrowindex").text(event.args.rowindex);
            // @param bound index. Bound index is the row's index in the array returned by the "getboundrows" method.
            var rowid = $(gridConDA).jqxGrid('getrowid', row);
            // @param row id
            var data = $(gridConDA).jqxGrid('getrowdatabyid', rowid);

            SeleccionarDocDA(data);

        });

    };
    var _ShowInformes = function () {
        byaSite.AbrirPagina(urlToInf + CodCon + "&ide_inf=" + IdeInf);
    };
    var _ShowSS = function () {
        byaSite.AbrirPagina(urlToSS + CodCon + "&ide_inf=" + IdeInf);
    };
    //crear elementos
    var _createElements = function () {
        CodCon = Pag.getCod_Con();
        IdeInf = Pag.getIde_Inf();
        if (!CodCon || !IdeInf) {
            $(msgPpal).msgBox({ titulo: "CONTRATOS", mensaje: "no se especificó ningun contrato", tipo: false });
            return false;
        } else {
            $("#InfoPanel").html("Contrato N° " + CodCon + ", Informe N°" + IdeInf);
            $("#txtCodCon").val(CodCon);
            $("#txtIdeInf").val(IdeInf);
            _AbrirCon();
            _createGridConDocAso();
            tema = Pag.config.theme;
            sourceFil = byaPage.getSource(urlToTipDoc);
        }

    };
    var _UpdBandeja = function () {
        _createGridCon();
    };

    var SeleccionarDoc = function (data) {
        $("#modalDetDoc").modal('show');
        $("#InfoFile").html("Archivo: <b> " + data.NOMBRE + "</b> [ Tamaño:" + (data.LONGITUD/1000) + " Kb ] -  Tipo de Contenido: [" + data.TYPE+"] ");
        $('#dvdemb').html(mostrarPDF(data.ID));
    };
    var SeleccionarDocDA = function (data) {
        $("#modalDetDoc").modal('show');
        $("#InfoFile").html("Tipo Doc: <b> " + data.NOMBRE + "</b> Archivo: <b> " + data.ARCHIVO + "</b> [ Tamaño:" + (data.LONGITUD / 1000) + " Kb ] -  Tipo de Contenido: [" + data.TYPE + "] ");
        $('#dvdemb').html(mostrarPDF(data.ID));
    };

    var _Upload = function () {
        window.open("/jqfileupload/index.html", "mywindow", "width=1200,height=600");
    };
    var _Asociar = function () {
        _guardarNuevo();
    };
    var _getDatosForm0 = function () {
        var Reg = {};

        var dataRecord = Pag.getRecord();
        if (dataRecord != null) {
            
            Reg.ID_DOC = dataRecord.ID;
            Reg.TIP_DOC = $("#txtTIPDOC").val();
            Reg.COD_CON = CodCon;
            Reg.ID_INF = IdeInf;

            alert(JSON.stringify(Reg));
        }
        return Reg;
    };

    var _getDatosForm = function () {
        var Reg = new Array();
        
        var rows = $(gridCon).jqxGrid('getboundrows');

        $.each(rows, function (index, value) {
            var item = {};
            if (value.COD_TIP != null) {
                item.ID_DOC = value.ID;
                item.TIP_DOC = value.COD_TIP;
                item.COD_CON = CodCon;
                item.ID_INF = IdeInf;
                Reg.push(item);
            }
        });

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

        var jsonData = "{'Reg':" + JSON.stringify(_getDatosForm()) + ",COD_CON:'" + CodCon + "'}";
        
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje);

            _createGridCon();
            _createGridConDocAso();
            _ocultarVentana();
        });
        
    };
    var _guardarModificacion = function () {
        var jsonData = "{'Reg':" + JSON.stringify(_getDatosFormMod()) + "}";

        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje+" - id "+byaRpta.id);

            _createGridCon();
            _ocultarVentana();
        });
    };
    

    var _AbrirCon = function () {
        var sw = false;
        CodCon = Pag.getCod_Con();
        IdeInf = Pag.getIde_Inf();
        if (CodCon == "") {
            $(msgPpal).msgBox({ titulo: "CONTRATOS", mensaje: "no se especificó ningun contrato", tipo: false });
            return false;
        }
        var e = ContratosDAO.GetPk(CodCon);
        if (e.Numero == 0) {
            $(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "CONTRATO N° " + CodCon + " no encontrada...!!!", tipo: "warning" });
        }
        else {
            var Titulo = "INFORMACION DETALLADA DEL CONTRATO";

            $('#DetContrato').DetailsJSON(e, ContratosDAO.GetDataFields(), Titulo);

            if (e.Cod_Act == "00") {
                $(msgPpal).msgBox({ titulo: "Gestión", mensaje: "El contrato no se ha Legalizado", tipo: "warning" });
                $("#BtnNuevo").byaSetHabilitar(false);
                $("#BtnEditar").byaSetHabilitar(false);

            }
            if (e.Cod_Act == "07") {
                $(msgPpal).msgBox({ titulo: "Gestión", mensaje: "El contrato esta Anulado", tipo: "warning" });
                $("#BtnNuevo").byaSetHabilitar(false);
                $("#BtnEditar").byaSetHabilitar(false);

            }
            _createGridCon();
            sw = true;
            if (e.Numero != null) {
                //$(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "No se puede editar la solicitud, esta asociada a un Estudio Previo", tipo: "info" });
                //$("#editarButton").byaSetHabilitar(false);
            } else {
                $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "Presione editar para modificar la solicitud", tipo: "info" });
                $("#editarButton").byaSetHabilitar(true);
            }
        }

        return sw;
    };

    var _createGridConDocAso = function () {
        var urlws;
        var jsondata;
        
        urlws = urlToGridConD;
        jsondata = { CodCon: "'" + Pag.getCod_Con() + "'", Id_info: "'" + Pag.getIde_Inf() + "'" };
        sourceFil = byaPage.getSource(urlToTipDoc);
        var TipDocSource =
        {
            datatype: "array",
            datafields: [
                { name: 'COD_TIP', type: 'string' },
                { name: 'DES_TIP', type: 'string' }
            ],
            localdata: sourceFil
        };

        var TipDocAdapter = new $.jqx.dataAdapter(TipDocSource, {
            autoBind: true
        });

        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID' },
                    { name: 'NOMBRE' },
                    { name: 'ARCHIVO' },
                    { name: 'LONGITUD', type: 'number' },
                    { name: 'NOM_TIP', value: 'COD_TIP', values: { source: TipDocAdapter.records, value: 'COD_TIP', name: 'NOM_TIP' } },
                    { name: 'TYPE' }
            ],
            updaterow: function (rowid, rowdata, commit) {
                var rowindex = $(gridConDA).jqxGrid('getrowboundindexbyid', rowid);
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


        //byaPage.editGrid
        $(gridConDA).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: Pag.config.theme,
                        localization: byaPage.getLocalization(),
                        sortable: true,
                        altrows: false,
                        enabletooltips: true,
                        autoheight: true,
                        editable: false,
                        editmode: 'click',
                        columnsresize: true,
                        columns: [
                        { text: 'Nombre del Documento', datafield: 'NOMBRE', editable: false}
                        ]
                    });
                    /*  
                    { text: 'Nombre del Archivo', datafield: 'ARCHIVO', editable: false },
                    { text: 'LONGITUD', datafield: 'LONGITUD', width: 100, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'n2', cellclassname: cellclass, editable: Pag.editarOp },
                    { text: 'TYPE', datafield: 'TYPE', width: 80, editable: false },
                    { text: 'FEC_REG', datafield: 'FEC_REG', width: 150, columntype: 'datetimeinput', cellsformat: 'd', cellclassname: cellclass, editable: Pag.editarOp }
                    */
    };
    //crea GridTipos
    var _createGridCon = function () {
        var urlws ;
        var jsondata ;
        if ($('.radio1:checked').val() == 'da') {
            urlws = urlToGridConD;
            jsondata = { CodCon: "'" + Pag.getCod_Con() + "'", Id_info: "'" + Pag.getIde_Inf() + "'" };
            $('#BtnAsociar').byaSetHabilitar(false);
        } else {
            urlws = urlToGridCon;
            jsondata = {};
            $('#BtnAsociar').byaSetHabilitar(true);
        }
        sourceFil = byaPage.getSource(urlToTipDoc);
        var TipDocSource =
        {
            datatype: "array",
            datafields: [
                { name: 'COD_TIP', type: 'string' },
                { name: 'DES_TIP', type: 'string' }
            ],
            localdata: sourceFil
        };

        var TipDocAdapter = new $.jqx.dataAdapter(TipDocSource, {
            autoBind: true
        });

        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID' },
                    { name: 'NOMBRE' },
                    { name: 'LONGITUD', type: 'number' },
                    { name: 'NOM_TIP', value: 'COD_TIP', values: { source: TipDocAdapter.records, value: 'COD_TIP', name: 'NOM_TIP' } },
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

        
        //byaPage.editGrid
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
                        editmode: 'click',
                        columnsresize: true,
                        columns: [
                        { text: 'Nombre del Documento', datafield: 'NOMBRE', editable: false, width: 400 },
                        
                        {
                            text: 'Tipo de documentos', columngroup: 'seguimiento', datafield: 'COD_TIP',  cellclassname: cellclass, displayfield: 'NOM_TIP', columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({ source: TipDocAdapter, placeHolder: 'Seleccione:', displayMember: 'DES_TIP', valueMember: 'COD_TIP' });
                            }
                        },
                        ]
                    });
        //$(gridCon).jqxListBox({ source: dataAdapter, displayMember: "NOMBRE", valueMember: "ID", width: 200, height: 250 });
        //{ text: 'LONGITUD', datafield: 'LONGITUD', width: 100, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'n2', cellclassname: cellclass, editable: Pag.editarOp },
        //{ text: 'FEC_REG', datafield: 'FEC_REG', width: 150, columntype: 'datetimeinput', cellsformat: 'd', cellclassname: cellclass, editable: Pag.editarOp }
        //{ text: 'TYPE', datafield: 'TYPE', width: 80, editable: false },
    };

    var mostrarPDF = function (i) {
        //http://localhost:1476
        var url = '/ashx/ashxDoc.ashx?id=' + i + '#toolbar=1';
        var doc = "<embed src='" + url + "' width='100%' height='400'>";
        return doc;
    };
    //opcion del return objeto anonimo publico
    return {
        editedRows: null,
        editarOp: false,
      
        config: {
            theme: null
        },
        getIde_Inf: function () {
            return $.getUrlVar("ide_inf").replace("#", "");
        },
        getCod_Con: function () {
            return $.getUrlVar("cod_con");
        },
        getRecord : function () {
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
} ());

$(function () {

    byaSite.SetModuloP({ TituloForm: "Documentos de Soporte ", Modulo: "Gestión de Contratista", urlToPanelModulo: "GesContratos.aspx", Cod_Mod: "SPRV", Rol: "SP_CTIST" });


    Pag.config.theme = byaSite.tema;
    Pag.init();
    
});


