var objregistro = (function () {

    var urlToAbrir = "/Servicios/DatosBasicosG/wsModalidades.asmx/Get";
    var urlToGuardarNuevo = "/Servicios/DatosBasicosG/wsModalidades.asmx/Insert";
    var urlToGuardarMod = "/Servicios/DatosBasicosG/wsModalidades.asmx/Update";
    var activarValidar = true;
    var ejecutar;
    var idObj;
    var msgPpal = "#LbMsg";

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
        $("#txtABRE_TPROC").blur(function () {
            var abreviatura = $(this).val();
            if (abreviatura.length > 4) {
                alert("La abreviatura solo puede tener cuatro (4) caracteres");
                $(this).focus();
            }
        });
        $("#txtCOD_CTR").blur(function () {
            var abreviatura = $(this).val();
            if (abreviatura.length > 2) {
                alert("El codigo de la Contraloría solo puede tener cuatro (2) caracteres");
                $(this).focus();
            }
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
                $("#LbMsg").msgBox({ titulo: "Modalidades", mensaje: mensaje, tipo: false });
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
        ////Carga de los años
        //$("#cboYEAR_VIG").byaCombo({
        //    DataSource: byaPage.generarAños(2000), placeHolder: 'Seleccione', Display: "Año", Value: "Año"
        //});

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
        objregistro.DesOrhabilitar(false);
        objregistro.Limpiar();
        $(msgPpal).html("");
    };
    var _guardarNuevo = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("datos");
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Modalidades", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(true);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    objregistro.DesOrhabilitar(false);
                }
            });
        }
    };
    var _guardarMod = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("datos");
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
    };
    var Editar = function () {
        objregistro.config.oper = 'Editar';
        objregistro.DesOrhabilitar(true);
        objregistro.disabled = false;
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);

        $(msgPpal).msgBox({ titulo: "Modalidades", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        ejecutar = _guardarMod;
    };
    var _Abrir = function () {
        if (idObj == "") {
            $(msgPpal).msgBox({ titulo: "Modalidades", mensaje: "Debe especificar el año", tipo: false });
            return false;
        }
        var parametrosJSON = { "ID": "'" + idObj + "'"};
        $.ajax({
            type: "GET",
            url: urlToAbrir,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                $(msgPpal).msgBox({ titulo: "Modalidades", mensaje: "Procesando.. espere por favor...!!!", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e == null) {
                    $(msgPpal).msgBox({ titulo: "Modalidades", mensaje: "El N° Identificación no se encuentra registrado...!!!", tipo: "warning" });
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
                    $(msgPpal).msgBox({ titulo: "Modalidades", mensaje: "Se cargaron los datos", tipo: "info" });
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
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
                $("#txtCOD_TPROC").val(idObj);
                _Abrir();
                Editar();
            } else {
                Nuevo();
            }
        },
        DesOrhabilitar: function (value) {
            $(".habilitar").byaSetHabilitar(value);
        },
        Limpiar: function () {
            $(".limpiar").val("");
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Modalidades", Modulo: "Gestión", urlToPanelModulo: "gModalidades.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4Modalidades" });
    objregistro.init();
});
