var MiembrosProponentes = (function () {
    
    var urlToAbrir = "../../Servicios/wsProponentes.asmx/GetMiembro";
    var urlToGuardarNuevo = "../../Servicios/wsProponentes.asmx/InsertMiembro";
    var urlToGuardarMod = "../../Servicios/wsProponentes.asmx/UpdateMiembro";
    var urlModalTerceros = "../../DatosBasicosG/Terceros/Tercerosh.html";
    var activarValidar = true;
    var ejecutarOperacion;
    var idTerc;
    var idProp;
    var idMiem;

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
            // definir
            if (ejecutarOperacion == "N") _guardarNuevo();
            if (ejecutarOperacion == "E") _guardarMod();
        });
        $("#cancelarButton").click(function () {
            _cancelar();
        });
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#btnBsqMiembro").click(function () {
            $.get(urlModalTerceros, function (data) {
                $("#secBsqTerceros").html(data);
                mTerceros.showWindow(function (item) {
                    $("#txtID_MIEMBROS").val(item.IDE_TER);
                    $("#txtNOMBRE").val(item.NOMBRE);
                });
            });
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

        var _ValidarValorTotalEstimado = function () {
            var valTotal = $("#txtValorEstimado").byaGetDecimal();
            var valEstimado = $("#txtValorEstimadoVigenciaActual").byaGetDecimal();

            if (valTotal < valEstimado) {
                $("#dvdValorEstimado").addClass("has-error");
                $("#dvdValorEstimadoVigenciaActual").addClass("has-error");
                errorValoresEstimados = true;
            }
            else {
                $("#dvdValorEstimado").removeClass("has-error");
                $("#dvdValorEstimadoVigenciaActual").removeClass("has-error");
            }
        };

        var _MensajeFinalValidacion = function () {
            if (error) {
                $(msgPpal).msgBox({ titulo: "Registro Miembros Proponentes: ", mensaje: "Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ", tipo: false });
            } else {
                $("#LbMsg").html("");
            }

        };

        if (activarValidar) {
            _ValidarEmpty("txt", "ID_PROP");
            _ValidarEmpty("txt", "ID_MIEMBROS");
            _ValidarEmpty("cbo", "ID_ESTADO");
            _ValidarEmpty("txt", "PORC_PART");
            _MensajeFinalValidacion();

        }
        return !error;
    };
    var _crearElements = function () {

    };
    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                MiembrosProponentes.config.oper = 'cancelar';
                _reset();
            }
        });
    };
    var _reset = function () {
        $("#nuevoButton").byaSetHabilitar(true);
        $("#guardarButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#cancelarButton").byaSetHabilitar(false);
        MiembrosProponentes.DesOrhabilitar(false);
        MiembrosProponentes.Limpiar();
        $(msgPpal).html("");
    };
    var _guardarNuevo = function () {
        if (_esValido()) {
            var jsonData = "{'Reg':" + JSON.stringify(byaPage._getDatosCampos("datMiembroProponente")) + "}";
            byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Miembros Proponentes", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(true);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    MiembrosProponentes.DesOrhabilitar(false);
                    idMiem = $("#txtID_MIEMBROS").val();
                    history.back();
                }
            });
        }
    };
    var _guardarMod = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("datMiembroProponente");
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Miembros Proponentes", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(true);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    MiembrosProponentes.DesOrhabilitar(false);
                    history.back();
                }
            });
        }
    };
    var Nuevo = function () {
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#btnBsqMiembro").byaSetHabilitar(true);
        MiembrosProponentes.config.oper = 'Nuevo';
        MiembrosProponentes.Limpiar();
        MiembrosProponentes.DesOrhabilitar(true);
        ejecutarOperacion = "N";
    };
    var Editar = function () {
        MiembrosProponentes.config.oper = 'Editar';
        MiembrosProponentes.DesOrhabilitar(true);
        MiembrosProponentes.disabled = false;
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#btnBsqMiembro").byaSetHabilitar(false);
        $(msgPpal).msgBox({ titulo: "Miembros", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        ejecutarOperacion = "E";
        _Abrir(idProp, idMiem);
    };
    var _Abrir = function (idProponente, idMiembro) {
        var parametrosJSON = {
            "IDE_PROP": idProponente,
            "ID_MIEMBROS":idMiembro
        };
        $.ajax({
            type: "GET",
            url: urlToAbrir,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                $(msgPpal).msgBox({ titulo: "Miembros Proponentes", mensaje: "Procesando.. espere por favor...!!!", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e == null) {
                    $(msgPpal).msgBox({ titulo: "Miembro", mensaje: "El miembro con ese numero de identificación no se encuentra registrado...!!!", tipo: "warning" });
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                }
                else {
                    $(msgPpal).msgBox({ titulo: "Miembro", mensaje: "Modifique los datos y pulse guardar...!!!", tipo: "info" });
                    byaPage._setDatosCampos("datMiembroProponente", e);
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
            idTerc = $.getUrlVar('idTerc');
            idMiem = $.getUrlVar('idMiem');
            idProp = $.getUrlVar('idProp');

            $("#txtID_PROP").val(idProp);
            $("#txtIDE_TER").val(idTerc);

            if (idMiem == null) {
                Nuevo();                
            } else {
                Editar();
                $("#txtID_MIEMBROS").val(idMiem);
            }
        },
        DesOrhabilitar: function (value) {
            $(".camDesh").byaSetHabilitar(value);
        },
        Limpiar: function () {
            $(".camLimp").val("");
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Gestión", Modulo: "Miembros Proponentes", urlToPanelModulo: "gMiembrosProponentes.aspx", Cod_Mod: "ADMIN", Rol: "ADM_TERC" });
    MiembrosProponentes.init();
});