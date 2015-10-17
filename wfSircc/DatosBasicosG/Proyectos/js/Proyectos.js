var Proyectos = (function () {
    "use strict";
    var urlToInsert = "/Servicios/DatosBasicosG/wsProyectos.asmx/Insert";
    var urlToUpdate = "/Servicios/DatosBasicosG/wsProyectos.asmx/Update";
    var urlToAbrir2 = "/Servicios/DatosBasicosG/wsProyectos.asmx/GetProyectos2";
    var urlModalTerceros = "/DatosBasicosG/Terceros/Tercerosh.html";
    var byaRpta;
    var idProyecto;
    var msgPpal = "#LbMsg";
    var Editar = "No";
    var _addHandlers = function () {
        $("#btnVolverAtras").click(function () {
            history.back();
        });
        $("#nuevoButton").click(function () {
            $("#guardarButton").byaSetHabilitar(true);
            Controls();
        });
        $("#guardarButton").click(function () {
            if (Editar == "No") {
                Insert();
            } else { Update() }
        });
        $("#cancelarButton").click(function () {
            byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
                if (result) {
                    $("#guardarButton").byaSetHabilitar(false);
                    limpiar();
                }
            });

        });
        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });
        $("#btnBsqMiembro").click(function () {
            $.get(urlModalTerceros, function (data) {
                $("#secBsqTerceros").html(data);
                mTerceros.showWindow(function (item) {
                    $("#txtIdAportante").val(item.IDE_TER);
                    $("#txtNombreAportante").val(item.NOMBRE);
                });
            });
        });
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#TextValor").blur(function () {
            $("#txtAportesPropios").val($(this).val());
            $('.currency').formatCurrency();
        });
        $(".editorHtml").kendoEditor({            
            tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "insertUnorderedList",
                "insertOrderedList",
                "indent",
                "outdent",



                "formatting",
                "cleanFormatting",
                "subscript",
                "superscript",
                "createTable",
                    "addColumnLeft",
                    "addColumnRight",
                    "addRowAbove",
                    "addRowBelow",
                    "deleteRow",
                    "deleteColumn",
                "viewHtml",
                "formatting",
                "cleanFormatting",
                "fontName",
                "fontSize"


            ]
            //"insertImage",
            //"insertFile",
            //"insertHtml",
            //"foreColor",
            //"backColor"
            //"createLink",
            //"unlink",
        });

    };
    var Update = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Actualizar Proyecto", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {

            }
        });
    }
    var _Validaciones = function () {

    };
    var MultiplesAjax = function () {

    }
    var _createElements = function () {
        $("#TextProyecto").byaFormatInput('0123456789-');
        ActualizarDataPicker();
    };
    var ActualizarDataPicker = function () {
        var f = new Date();

        $("#TextFecRad").datepicker({
            weekStart: 1,
            endDate: (f.getMonth() + 1) + "/" + f.getDate() + "/" + f.getFullYear(),
            todayHighlight: true,
            autoclose: true,
            format: 'mm/dd/yyyy',
        });
  
    };
    var _Abrir = function (idProyecto) {


        var parametrosJSON = { "idProyecto": "'"+idProyecto+"'" };
        $.ajax({
            type: "GET",
            url: urlToAbrir2,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {

                var pro = byaPage.retObj(result.d);
                if (pro != undefined) {
                   
                    $('#TextProyecto').val(pro.PROYECTO);
                    $('#TextVigencia').val(pro.VIGENCIA);
                    $('#TextNom').val(pro.NOMBRE_PROYECTO);
                    $('#TextFecRad').val(byaPage.converJSONDateMDY(pro.FECHA_RAD));
                    $('#TextComite').val(pro.COMITE);
                    $('#TextEstado').val(pro.ESTADO);
                    $('#TextValor').byaSetDecimal(pro.VALOR);
                    $("#txtAportesPropios").byaSetDecimal(pro.APORTES_PROPIOS);
                    $("#txtNombreMunicipio").val(pro.NOM_MUN);
                    $("#txtNombreDepartamento").val(pro.DEP_NOM);
                    $("#txtTipoProyecto").val(pro.TIP_PRO);
                    $("#txtIdAportante").val(pro.IDE_APORTANTE);
                    $("#txtNecesidad").html(pro.NECESIDAD);
                    $("#txtBPIN").val(pro.BPIN);
                    $("#guardarButton").byaSetHabilitar(true);
                    Editar = "Si";
                } else {
                    Editar = "No";
                }

            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });

    };
    var getDatos = function () {
        var Pro = {};
        Pro.PROYECTO = $('#TextProyecto').val();
        Pro.VIGENCIA = $('#TextVigencia').val();
        Pro.NOMBRE_PROYECTO = $("#TextNom").val();
        Pro.FECHA_RAD = $('#TextFecRad').val();
        Pro.COMITE = $('#TextComite').val();
        Pro.ESTADO = $("#TextEstado").val();
        Pro.VALOR = $("#TextValor").byaGetDecimal();

        Pro.APORTES_PROPIOS = $("#txtAportesPropios").byaGetDecimal();
        Pro.NOM_MUN = $("#txtNombreMunicipio").val();
        Pro.DEP_NOM = $("#txtNombreDepartamento").val();
        Pro.TIP_PRO = $("#txtTipoProyecto").val();
        Pro.IDE_APORTANTE = $("#txtIdAportante").val();
        Pro.NECESIDAD = $("#txtNecesidad").html();
        Pro.BPIN = $("#txtBPIN").val();
        return Pro;
    }
    var Insert = function () {

        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registrar Proyectos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {

            }
        });


    }
    var Controls = function () {
        $(msgPpal).html("");
        $("#TextProyecto").byaSetHabilitar(true);
        $("#TextVigencia").byaSetHabilitar(true);
        $("#TextNom").byaSetHabilitar(true);
        $("#TextFecRad").byaSetHabilitar(true);
        $("#TextComite").byaSetHabilitar(true);
        $("#TextEstado").byaSetHabilitar(true);
        $("#TextValor").byaSetHabilitar(true);
        $("#txtAportesPropios").byaSetHabilitar(true);
        $("#txtNombreMunicipio").byaSetHabilitar(true);
        $("#txtNombreDepartamento").byaSetHabilitar(true);
        $("#txtTipoProyecto").byaSetHabilitar(true);
        $("#txtNecesidad").byaSetHabilitar(true);
        $("#txtBPIN").byaSetHabilitar(true);


        $("#TextProyecto").val("");
        $("#TextVigencia").val("");
        $("#TextNom").val("");
        $("#TextFecRad").val("");
        $("#TextComite").val("");
        $("#TextEstado").val("");
        $("#TextValor").val("");
        $("#txtAportesPropios").byaSetDecimal(0);
        $("#txtNombreMunicipio").val("");
        $("#txtNombreDepartamento").val("");
        $("#txtIdAportante").val("");
        $("#txtNecesidad").html("");
        $("#txtBPIN").val("");

        Editar = "No";

    };
    var limpiar = function () {
        $("#TextProyecto").val("");
        $("#TextVigencia").val("");
        $("#TextNom").val("");
        $("#TextFecRad").val("");
        $("#TextComite").val("");
        $("#TextEstado").val("");
        $("#TextValor").val("");
        $("#txtAportesPropios").byaSetDecimal(0);
        $("#txtNombreMunicipio").val("");
        $("#txtNombreDepartamento").val("");
        $("#txtIdAportante").val("");
        $("#txtNecesidad").html("");
        $("#txtBPIN").val("");
        Editar = "No";
    }

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
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        init: function () {
            _addHandlers();
            _Validaciones();
            _createElements();
            idProyecto = $.getUrlVar('idProyecto');
            if (idProyecto != null) {
                _Abrir(idProyecto);
            } else {
                $("#nuevoButton").byaSetHabilitar(false);
                $("#guardarButton").byaSetHabilitar(true);
                $("#cancelarButton").byaSetHabilitar(true);
                limpiar();
                Controls();
            }

        }
    };
}());




$(function () {
    byaSite.SetModuloP({ TituloForm: "Proyectos", Modulo: "Consulta Proyectos", urlToPanelModulo: "GesProyectos.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4Proyectos" });
    Proyectos.config.theme = byaSite.tema
    Proyectos.init();


});
