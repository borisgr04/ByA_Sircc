﻿var objregistro = (function () {

    var urlToAbrir = "/Servicios/DatosBasicosG/wsSubTiposContratos.asmx/Get";
    var urlToGuardarNuevo = "/Servicios/DatosBasicosG/wsSubTiposContratos.asmx/Insert";
    var urlToGuardarMod = "/Servicios/DatosBasicosG/wsSubTiposContratos.asmx/Update";
    var activarValidar = true;
    var ejecutar;
    var idObj;
    var nombreTipoContrato;
    var msgPpal = "#LbMsg";

    var idTipoContrato;

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
        
        $("#txtCLA_CON_DEP").blur(function () {
            var value = $(this).val();
            if (value.length > 3) {
                alert("La Clase de Contrato Contraloria Departamental solo puede tener tres (3) caracteres");
                $(this).val("");
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
                $("#LbMsg").msgBox({ titulo: "Subtipos de contratos", mensaje: mensaje, tipo: false });
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
                $(msgPpal).msgBox({ titulo: "Subtipos de contratos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
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
        $("#cboYEAR_VIG").byaSetHabilitar(false);

        $(msgPpal).msgBox({ titulo: "Subtipos de contratos", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        ejecutar = _guardarMod;
    };
    var _Abrir = function () {
        if (idObj == "") {
            $(msgPpal).msgBox({ titulo: "Subtipos de contratos", mensaje: "Debe especificar el año", tipo: false });
            return false;
        }
        var parametrosJSON = { "ID": "'" + idObj + "'" };
        $.ajax({
            type: "GET",
            url: urlToAbrir,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                $(msgPpal).msgBox({ titulo: "Subtipos de contratos", mensaje: "Procesando.. espere por favor...!!!", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e == null) {
                    $(msgPpal).msgBox({ titulo: "Subtipos de contratos", mensaje: "El N° Identificación no se encuentra registrado...!!!", tipo: "warning" });
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
                    $(msgPpal).msgBox({ titulo: "Subtipos de contratos", mensaje: "Se cargaron los datos", tipo: "info" });
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
            idTipoContrato = $.getUrlVar('idTipoContrato');
            nombreTipoContrato = "" + $.getUrlVar('NombreTipoContrato') + "";
            nombreTipoContrato = nombreTipoContrato.replace("%20", " ");
            nombreTipoContrato = nombreTipoContrato.replace("%20", " ");
            nombreTipoContrato = nombreTipoContrato.replace("%20", " ");
            nombreTipoContrato = nombreTipoContrato.replace("%20", " ");
            $("#txtCOD_TIP").val(idTipoContrato);
            $("#txtNombreTipoContrato").val(nombreTipoContrato);
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
        },
        Limpiar: function () {
            $(".limpiar").val("");
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Subtipos de contratos", Modulo: "Gestión", urlToPanelModulo: "gSubTiposContratos.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4SubTiposCon" });
    objregistro.init();
});
