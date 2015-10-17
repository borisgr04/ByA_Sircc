var objregistro = (function () {

    var urlToAbrir = "/Servicios/wsPlantillas.asmx/Get";
    var urlToGuardarNuevo = "/Servicios/wsPlantillas.asmx/Insert";
    var urlToGuardarMod = "/Servicios/wsPlantillas.asmx/Update";

    var urlToTiposPlantilla = "/Servicios/wsTiposPlantillas.asmx/Gets";

    var activarValidar = true;
    var ejecutar;
    var idObj;
    var msgPpal = "#LbMsg";
    var tblSecciones;
    var camposDoc;

    var indexSeleccionado;

    var lSecciones = new Array();

    var _addHandlers = function () {
        $("#btnVolverAtras").click(function () {
            history.back();
        });
        $("#nuevoButton").click(function () {
            Nuevo();
        });
        $("#editarButton").click(function () {
            Editar();
        });
        $("#guardarButton").click(function () {
            ejecutar();
        });
        $("#cancelarButton").click(function () {
            _cancelar();
        });
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });
        $("#btnNuevaSeccion").click(function () {
            CrearNuevaSeccion();
        });
        $("#cboSecciones").change(function () {
            VerDetallesSeccion($(this).val());
        });
        $("#txtSeccion").blur(function () {           
            lSecciones[indexSeleccionado].HTML = $(this).html();
        });
        $("#btnEliminarSeccion").click(function () {
            EliminarSeccion();
        });
        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });
        $("#cboCOD_TIP").change(function () {
            var value = $("#cboCOD_TIP option:selected").html();
            $("#txtTITULO").val(value);
        });
        camposDoc = byaSite.getCamposHtml();
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
                "fontSize",
                "insertHtml"
            ],insertHtml:camposDoc
            //"insertImage",
            //"insertFile",
            //
            //"foreColor",
            //"backColor"
            //"createLink",
            //"unlink",
        });
    };
    var _esValido = function () {
        var error = false;
        var errorValoresEstimados = false;
        var _ValidarEmpty = function (Tipo, Control) {
            if ($("#" + Tipo + Control).val() == "") {
                $("#dvd" + Control).addClass("has-error");
                error = true;
            }
            else {
                $("#dvd" + Control).removeClass("has-error");
            }
        };
        
        var _MensajeFinalValidacion = function () {
            var mensaje;
            if (error) {
                mensaje = "Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ";
                $("#LbMsg").msgBox({ titulo: "Vigencias", mensaje: mensaje, tipo: false });
            } else {
                $("#LbMsg").html("");
            }
        };

        var _traerCamposValidar = function () {
            var e = new Array();
            $(".validar").each(function (index) {
                var id = "" + $(this).attr("id") + "";
                e.push(id);
            });
            return e;
        };

        if (activarValidar) {
            var campos = _traerCamposValidar();
            $.each(campos, function (index, item) {
                var id = "" + item + "";
                _ValidarEmpty(id.substr(0, 3),id.substr(3,id.length));
            });
            _MensajeFinalValidacion();
        }
        return !error;
    };    
    var _crearElements = function () {
        var sourceTiposPlantilla = byaPage.getSource(urlToTiposPlantilla);
        $("#cboCOD_TIP").byaCombo({
            DataSource: sourceTiposPlantilla, placeHolder: 'Seleccione', Display: "NOM_TIP", Value: "COD_TIP"
        });
        CargarSecciones();
    };
    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                objregistro.config.oper = 'cancelar';
                _reset();
            }
        });
    };
    var _reset = function () {
        $("#nuevoButton").byaSetHabilitar(true);
        $("#guardarButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#cancelarButton").byaSetHabilitar(false);
        lSecciones = new Array();
        CargarSecciones();
        objregistro.DesOrhabilitar(false);
        objregistro.Limpiar();
        $(msgPpal).html("");
    };
    var _guardarNuevo = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("datos");
            datos.ID = 0;
            datos.lSecciones = lSecciones;
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Plantillas", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(true);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    objregistro.DesOrhabilitar(false);
                    $("#txtID").val(byaRpta.id);
                }
            });
        }
    };
    var _guardarMod = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("datos");
            datos.lSecciones = lSecciones;
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Se Modifico el Item", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    objregistro.DesOrhabilitar(false);
                }
            });
            $("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(true);
            $("#guardarButton").byaSetHabilitar(false);
            $("#cancelarButton").byaSetHabilitar(false);
        }
    };
    var Nuevo = function () {
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        objregistro.config.oper = 'Nuevo';
        objregistro.Limpiar();
        objregistro.DesOrhabilitar(true);
        ejecutar = _guardarNuevo;
        CrearNuevaSeccion();
    };
    var Editar = function () {
        objregistro.config.oper = 'Editar';
        objregistro.DesOrhabilitar(true);
        objregistro.disabled = false;
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#cboYEAR_VIG").byaSetHabilitar(false);

        $(msgPpal).msgBox({ titulo: "Plantillas", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        ejecutar = _guardarMod;
    };
    var _Abrir = function () {
        if (idObj == "") {
            $(msgPpal).msgBox({ titulo: "Plantillas", mensaje: "Debe especificar el año", tipo: false });
            return false;
        }
        var parametrosJSON = { "ID": idObj };
        $.ajax({
            type: "GET",
            url: urlToAbrir,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                $(msgPpal).msgBox({ titulo: "Plantillas", mensaje: "Procesando.. espere por favor...!!!", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e == null) {
                    $(msgPpal).msgBox({ titulo: "Plantillas", mensaje: "El N° Identificación no se encuentra registrado...!!!", tipo: "warning" });
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                }
                else {                    
                    $("#guardarButton").byaSetHabilitar(true);
                    $("#nuevoButton").byaSetHabilitar(false);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(true);
                    byaPage._setDatosCampos("datos", e);
                    lSecciones = e.lSecciones;
                    CargarSecciones();
                    $(msgPpal).msgBox({ titulo: "Plantillas", mensaje: "Se cargaron los datos", tipo: "info" });
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var CargarSecciones = function () {
        $.each(lSecciones, function (index, item) {
            item.NOM_SEC = "Sección " + (index + 1) + "";
        });
        $("#cboSecciones").byaCombo({
            DataSource: lSecciones, placeHolder: null, Display: "NOM_SEC", Value: "ID"
        });
        
        if (lSecciones.length > 0) {
            $("#cboSecciones").val(lSecciones[0].ID);
            VerDetallesSeccion(lSecciones[0].ID);
        }
    };
    var VerDetallesSeccion = function (ID) {
        //alert(JSON.stringify(lSecciones));
        $.each(lSecciones, function (index, item) {
            if (item.ID == ID) {
                $("#txtSeccion").html(item.HTML);
                indexSeleccionado = index;
                $("#txtSeccion").focus();
            }
        });
    };
    var EliminarSeccion = function () {
        if (indexSeleccionado != null) {
            if (confirm("Seguro que desea eliminar esta sección?")) {
                var indexEliminar = indexSeleccionado;
                var numeroSecciones = lSecciones.length;
                //alert(indexEliminar + " - " + numeroSecciones);
                for (indexEliminar; indexEliminar < numeroSecciones; indexEliminar++) {
                    if (indexEliminar == numeroSecciones - 1) {
                        delete lSecciones[indexEliminar];
                        lSecciones.splice(indexEliminar, 1);
                    } else {
                        lSecciones[indexEliminar] = lSecciones[indexEliminar + 1];
                        lSecciones[indexEliminar].ID = indexEliminar + 1;
                    }
                }
                $("#txtSeccion").html("");
                alert("Se ha eliminado la sección");
                indexSeleccionado = null;
                CargarSecciones();
            }
        } else alert("Debe seleccionar una sección");
    };
    var CrearNuevaSeccion = function () {
        var num = lSecciones.length;

        
        var Text;
        if (num == 0) Text = "<strong>En este espacio usted escribirá el contenido de cada sección de la plantilla.</strong> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.";
        else Text = "";


        var e = {};
        e.ID = num + 1;
        e.ID_PLA = idObj;
        e.HTML = Text;
        e.ES_NUEVO = true;

        lSecciones.push(e);
        CargarSecciones();
        //byaPage.alert(e.ID);
        //byaPage.alert($("#cboSecciones").html());
        $("#cboSecciones").val(e.ID);
        $("#txtSeccion").html(e.HTML);
        $("#txtSeccion").focus();
        indexSeleccionado = num;
        
    };
    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        init: function () {
            _addHandlers();
            _crearElements();
            idObj = $.getUrlVar('idObj');
            if (idObj != null) {
                _Abrir();
                Editar();
            } else {
                Nuevo();
            }
        },
        DesOrhabilitar: function (value) {
            $(".habilitar").byaSetHabilitar(value);
            $("#txtSeccion").attr("contenteditable", value);
        },
        Limpiar: function () {
            $("#txtSeccion").html("");
            $(".limpiar").val("");
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Plantillas", Modulo: "Gestión", urlToPanelModulo: "gPlantillas.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4Plantillas" });
    objregistro.init();
});
