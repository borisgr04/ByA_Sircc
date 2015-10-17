var PAA = (function () {

    var urlToAbrir = "/Servicios/wsMPAA.asmx/Get";
    var urlToGuardarNuevo = "/Servicios/wsMPAA.asmx/Insert";
    var urlToGuardarMod = "/Servicios/wsMPAA.asmx/Update";
    var activarValidar = true;
    var ejecutar;
    var idObjPAA;

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
                $("#LbMsg").msgBox({ titulo: "Plan Anual de Adquisiciones", mensaje: mensaje, tipo: false });
            } else {
                $("#LbMsg").html("");
            }

            if (errorValoresEstimados) {
                mensaje = mensaje + " El 'valor total estimado' no puede ser menor a el 'valor estimado en la vigencia actual'";
                $("#LbMsg").msgBox({ titulo: "Plan Anual de Adquisiciones", mensaje: mensaje, tipo: false });
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
        $("#txtVIGENCIA").val(byaSite.getVigencia());
    };
    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                PAA.config.oper = 'cancelar';
                _reset();
            }
        });
    };
    var _reset = function () {
        $("#nuevoButton").byaSetHabilitar(true);
        $("#guardarButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#cancelarButton").byaSetHabilitar(false);
        PAA.DesOrhabilitar(false);
        PAA.Limpiar();
        $(msgPpal).html("");
    };
    var _guardarNuevo = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("mpaadatos");
            datos.ID = "0";
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                idObjPAA = byaRpta.id;
                $(msgPpal).msgBox({ titulo: "MPAA", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(true);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    PAA.DesOrhabilitar(false);
                }
            });
        }
    };
    var _guardarMod = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("mpaadatos");
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Se Modifico el Item", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    PAA.DesOrhabilitar(false);
                }
            });
            $("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(true);
            $("#guardarButton").byaSetHabilitar(false);
            $("#cancelarButton").byaSetHabilitar(false);
            $("#BtnDwnAbrir").byaSetHabilitar(true);
            $("#txtNumero").byaSetHabilitar(true);
        }
    };
    var Nuevo = function () {
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        PAA.config.oper = 'Nuevo';
        PAA.Limpiar();
        PAA.DesOrhabilitar(true);
        ejecutar = _guardarNuevo;
    };
    var Editar = function () {
        PAA.config.oper = 'Editar';
        PAA.DesOrhabilitar(true);
        PAA.disabled = false;
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $(msgPpal).msgBox({ titulo: "MPAA", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        ejecutar = _guardarMod;
    };
    var _Abrir = function (idePAA) {
        if (idePAA == "") {
            $(msgPpal).msgBox({ titulo: "MPAA", mensaje: "Debe especificar un número de Identificación", tipo: false });
            return false;
        }
        var parametrosJSON = { "ID": idePAA };
        $.ajax({
            type: "GET",
            url: urlToAbrir,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                $(msgPpal).msgBox({ titulo: "MPAA", mensaje: "Procesando.. espere por favor...!!!", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e == null) {
                    $(msgPpal).msgBox({ titulo: "MPAA", mensaje: "El N° Identificación no se encuentra registrado...!!!", tipo: "warning" });
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

                    byaPage._setDatosCampos("mpaadatos", e);


                    $(msgPpal).msgBox({ titulo: "MPAA", mensaje: "Se cargaron los datos", tipo: "info" });
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
            idObjPAA = $.getUrlVar('idObjMPAA');
            if (idObjPAA != null) {
                $("#txtID").val(idObjPAA);
                _Abrir(idObjPAA);
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
    byaSite.SetModuloP({ TituloForm: "MPAA", Modulo: "Gestión", urlToPanelModulo: "gMPAA.aspx", Cod_Mod: "ADMIN", Rol: "ADM_TERC" });
    PAA.init();
});
