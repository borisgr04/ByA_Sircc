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
    var gridCon = '#jqxgridSol';
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

        $('#BtnUpload').click(function () {
            _Upload();
        });
        $('#BtnUpdBandeja').click(function () {
            _UpdBandeja();
        });
        $('#BtnAsociar').click(function () {
            _Asociar();
        });

        $(".radio1").change(function () {
            _createGridCon();
        });

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
        alert(Pag.getCod_Con);
        if (!CodCon || !IdeInf) {
            $(msgPpal).msgBox({ titulo: "CONTRATOS", mensaje: "no se especificó ningun contrato", tipo: false });
            return false;
        } else {
            $("#InfoPanel").html("Contrato N° " + CodCon + ", Informe N°" + IdeInf);
            $("#txtCodCon").val(CodCon);
            $("#txtIdeInf").val(IdeInf);
            _AbrirCon();
            tema = Pag.config.theme;
            var sourceFil = byaPage.getSource(urlToTipDoc);
            $("#txtTIPDOC").byaCombo({ DataSource: sourceFil, placeHolder: "Seleccione el tipo de documento...", Value: "COD_TIP", Display: "DES_TIP" });
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
        var sw = false;
        var parametrosJSON = { "CodCon": CodCon };
        $.ajax({
            type: "POST",
            url: urlToAbrirCon,
            data: byaPage.JSONtoString(parametrosJSON),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                //$(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "Abriendo Contrato.... ", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e.Numero == 0) {
                    $(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "CONTRATO N° " + CodCon + " no encontrada...!!!", tipo: "warning" });
                }
                else {
                    $("#txtObjCon").val(e.Objeto);
                    $("#txtValTot").byaSetDecimal(e.Valor_Contrato);
                    $("#TxtDepSol").val(e.DependenciaNec);
                    $("#TxtEstado").val(e.Estado);
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
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
        return sw;
    };


    //crea GridTipos
    var _createGridCon = function () {
        var urlws;
        var jsondata;
        if ($('.radio1:checked').val() == 'da') {
            urlws = urlToGridConD;
            jsondata = { CodCon: "'" + Pag.getCod_Con() + "'", Id_info: "'" + Pag.getIde_Inf() + "'" };
            alert(JSON.stringify(jsondata));
            $('#BtnAsociar').byaSetHabilitar(false);
        } else {
            urlws = urlToGridCon;
            jsondata = {};
            $('#BtnAsociar').byaSetHabilitar(true);
        }
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
        Cod_Con:null,
        config: {
            theme: null
        },
        getIde_Inf: function () {
            return $.getUrlVar("ide_inf").replace("#", "");
        },
        setCod_Con: function (value) {
           this.Cod_Con=value;
        },
        setIde_Inf: function (value) {
            this.Ide_Inf=value;
        },
        getCod_Con: function () {
            return $.getUrlVar("cod_con");
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
    alert("Hola..");
    Pag.config.theme = byaSite.tema;
    Pag.setCod_Con("2012020024");
    Pag.setIde_Inf(33);
    Pag.init();
});


