var PAA = (function () {

    var urlToAbrir = "/Servicios/wsPAA.asmx/Get";
    var urlToGuardarNuevo = "/Servicios/wsPAA.asmx/Insert";
    var urlToGuardarMod = "/Servicios/wsPAA.asmx/Update";
    var urlSourceMod = '../Elaborar/wfRgEstPrev.aspx/GetvModalidad';
    var urlSourcePla = '../Elaborar/wfRgEstPrev.aspx/GetvTIPO_PLAZOS';
    var urlSourcePlazos2 = '../Elaborar/wfRgEstPrev.aspx/GetvTIPO_PLAZOS2';
    var urlSourceDepS = '../Elaborar/wfRgEstPrev.aspx/GetAllDEPENDENCIA';
    var urlModalCodigosUNSPSC = "../CodigosUNSPSC/CodigoUNSPSC.html";
    var activarValidar = true;
    var ejecutar;
    var idObjPAA;
    var lCodigosPAA = new Array();
    var idmpaa;

    var msgPpal = "#LbMsg";

    var _addHandlers = function () {
        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });
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
        $("#BtnDwnAbrir").click(function () {
            var idPAABsq = $("#txtNumero").val();
            idObjPAA = idPAABsq;
            PAA.DesOrhabilitar(false);
            PAA.Limpiar();
            _Abrir(idPAABsq, "Detalles");
        });
        $('#cboTIP1_PLA').change(function (event) {
            var args = event.args;
            var item = $('#cboTIP1_PLA').val();
            if (item != null) {
                PAA.RefreshCboT2($('#cboTIP1_PLA').val());
            }
        });
        $("#btnBuscarCodigoUNSPSC").click(function () {
            $.get(urlModalCodigosUNSPSC, function (data) {
                $("#secBsqCodigoUNSPSC").html(data);
                //$("#modalCodigos").modal('show');
                oCodigosUNSPSC.showWindow(function (item) {
                    agregarCodigo(item.codigoUNSPSC[0], item.NombreProducto);
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

        if (activarValidar) {
            _ValidarEmpty("txt", "Descripcion");
            _ValidarEmpty("txt", "FEC_EST_INI");
            //_ValidarEmpty("txt", "PLA1_EJE");
            //_ValidarEmpty("cbo", "TIP1_PLA");
            //_ValidarEmpty("txt", "PLA2_EJE");
            //_ValidarEmpty("cbo", "TIP2_PLA");
            _ValidarEmpty("cbo", "Modalidad");
            _ValidarEmpty("cbo", "Fuente");
            _ValidarEmpty("txt", "ValorEstimado");
            _ValidarEmpty("txt", "ValorEstimadoVigenciaActual");
            _ValidarEmpty("cbo", "SeRequierenVigenciasF");
            _ValidarEmpty("cbo", "EstadoSolicitudVigenciasFuturas");
            _ValidarEmpty("txt", "DatosContactoResponsable");
            _ValidarEmpty("cbo", "DependenciaNecesidad");
            _ValidarValorTotalEstimado();

            _MensajeFinalValidacion();

        }
        if ((error == false) && (errorValoresEstimados == false)) return true;
        else return false;
    };
    var _guardar = function () {
        activarValidar = true;
        if (_esValido()) {
            ejecutar();
        }
    };
    var _crearElements = function () {
        var sourceMod = byaPage.getSource(urlSourceMod);
        $("#cboModalidad").byaCombo({ DataSource: sourceMod, Value: "COD_TPROC", Display: "NOM_TPROC" });

        $("#txtVigencia").val(byaSite.getVigencia());

        var sourcePla = byaPage.getSource(urlSourcePla);
        $("#cboTIP1_PLA").byaCombo({ DataSource: sourcePla, Value: "COD_TPLA", Display: "NOM_PLA" });

        var sourceDepS = byaPage.getSource(urlSourceDepS);
        $("#cboDependenciaNecesidad").byaCombo({ DataSource: sourceDepS, Value: "COD_DEP", Display: "NOM_DEP" });

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
    var _getDatos = function () {
        var e = {};
        e.ID_EP_MPAA = $("#txtIdMPAA").val();
        e.ID = 0;
        e.VIGENCIA = byaSite.getVigencia();
        e.DESCRIPCION = $("#txtDescripcion").val();
        e.FEC_EST_INI = $("#txtFEC_EST_INI").val();
        e.PLA1_EJE = $("#txtPLA1_EJE").val();
        e.TIP1_PLA = $("#cboTIP1_PLA").val();
        e.PLA2_EJE = $("#txtPLA2_EJE").val();
        e.TIP2_PLA = $("#cboTIP2_PLA").val();
        e.MOD_SEL = $("#cboModalidad").val();
        e.FUE_SEL = $("#cboFuente").val();
        e.VAL_TOT_EST = $("#txtValorEstimado").byaGetDecimal();
        e.VAL_VIG_EST = $("#txtValorEstimadoVigenciaActual").byaGetDecimal();
        e.VIG_FUT = $("#cboSeRequierenVigenciasF").val();
        e.EST_SOL_VF = $("#cboEstadoSolicitudVigenciasFuturas").val();
        e.DAT_RESPONSABLE = $("#txtDatosContactoResponsable").val(); 
        e.COD_DEP = $("#cboDependenciaNecesidad").val();
        e.lCODIGOS_UNSPSC = lCodigosPAA;
        return e;
    };
    var _guardarNuevo = function () {
        if (_esValido()) {
            var jsonData = "{'Reg':" + JSON.stringify(_getDatos()) + "}";
            byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                idObjPAA = byaRpta.id;
                $(msgPpal).msgBox({ titulo: "Registro de Nuevo Item del Plan Anual de Adquisicion", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(true);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    PAA.DesOrhabilitar(false);
                    PAA.BorrarCodigo = NoBorrarCodigos();
                }
            });
        }
    };
    var _guardarMod = function () {
        if (_esValido()) {
            var byaRpta = {};
            var datos = _getDatos();
            datos.ID = idObjPAA;
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d); 
                $(msgPpal).msgBox({ titulo: "Se Modificó de Nuevo Item del Plan Anual de Adquisicion", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    PAA.DesOrhabilitar(false);
                    PAA.BorrarCodigo = NoBorrarCodigos;
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
        PAA.BorrarCodigo = BorrarCodigos;
    };
    var Editar = function () {
        PAA.config.oper = 'Editar';
        PAA.DesOrhabilitar(true);
        PAA.disabled = false;
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $(msgPpal).msgBox({ titulo: "Plan Anual de Adquisicion", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        ejecutar = _guardarMod;
        PAA.BorrarCodigo = BorrarCodigos;
    };
    var _Abrir = function (idePAA, opcionVista) {
        if (idePAA == "") {
            $(msgPpal).msgBox({ titulo: "Plan Anual de Adquisicion", mensaje: "Debe especificar un número de Identificación", tipo: false });
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
                $(msgPpal).msgBox({ titulo: "Plan Anual de Adquisicion", mensaje: "Procesando.. espere por favor...!!!", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e == null) {
                    $(msgPpal).msgBox({ titulo: "Tercero", mensaje: "El tercero con N° Identificación  " + nep + " no se encuentra registrado...!!!", tipo: "warning" });
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                }
                else {
                    $("#txtUNSPSC").val(e.UNSPSC);
                    $("#txtDescripcion").val(e.DESCRIPCION);
                    $("#txtFEC_EST_INI").val(byaPage.converJSONDate(e.FEC_EST_INI));

                    $("#txtPLA1_EJE").val(e.PLA1_EJE);
                    $("#cboTIP1_PLA").val(e.TIP1_PLA);
                    PAA.RefreshCboT2(e.TIP1_PLA);
                    $("#txtPLA2_EJE").val(e.PLA2_EJE);
                    $("#cboTIP2_PLA").val(e.TIP2_PLA);


                    $("#cboModalidad").val(e.MOD_SEL);
                    $("#cboFuente").val(e.FUE_SEL);
                    $("#cboDependenciaNecesidad").val(e.COD_DEP);
                    $("#txtValorEstimado").val(e.VAL_TOT_EST);
                    $("#txtValorEstimadoVigenciaActual").val(e.VAL_VIG_EST);
                    $("#cboSeRequierenVigenciasF").val(e.VIG_FUT);
                    $("#cboEstadoSolicitudVigenciasFuturas").val(e.EST_SOL_VF);
                    $("#txtDatosContactoResponsable").val(e.DAT_RESPONSABLE);
                    $("#txtIdMPAA").val(e.ID_EP_MPAA);
                    lCodigosPAA = e.lCODIGOS_UNSPSC;
                    _dibujarCodigos();
                    $('.currency').formatCurrency();
                    if (opcionVista == "Editar") {
                        $("#guardarButton").byaSetHabilitar(true);
                        $("#nuevoButton").byaSetHabilitar(false);
                        $("#editarButton").byaSetHabilitar(false);
                        $("#cancelarButton").byaSetHabilitar(true);
                        PAA.DesOrhabilitar(true);
                        Editar();
                    } else {
                        $("#guardarButton").byaSetHabilitar(false);
                        $("#nuevoButton").byaSetHabilitar(true);
                        $("#editarButton").byaSetHabilitar(true);
                        $("#cancelarButton").byaSetHabilitar(false);
                        PAA.DesOrhabilitar(false);
                        PAA.BorrarCodigo = NoBorrarCodigos;
                    }
                    $(msgPpal).msgBox({ titulo: "Plan Anual de Adquisicion", mensaje: "Se cargaron los datos", tipo: "info" });                    
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var agregarCodigo = function (cod, nom) {
        if (_esValidoCodigo(cod)) {
            oCodigosUNSPSC.HideModal();
            var e = {};
            e.UNSPSC = cod;
            e.NombreCodigo = nom;
            lCodigosPAA.push(e);
            $("#txtUNSPSC").val("");
            $("#txtNombreProductoUNSPSC").val("");
            _dibujarCodigos();
        } else alert("El producto " + cod + " - " + nom + ", ya se encuentra agregado...");
    };
    var _esValidoCodigo = function (cod) {
        var ban = true;
        $.each(lCodigosPAA, function (index, item) {
            if (item.UNSPSC == cod) {
                ban = false;
            }
        });
        return ban;
    };
    var _dibujarCodigos = function () {
        $("#lstCodigos").html("");
        $.each(lCodigosPAA, function (index, item) {
            $("#lstCodigos").append('<a class="list-group-item list-group-item-info" style="background:#d9edf7"><span id="' + index + '" onclick="PAA.BorrarCodigo(id)" class="glyphicon glyphicon-remove codigos" aria-hidden="true"></span> ' + item.UNSPSC + ' - ' + item.NombreCodigo + '</a>');
        });
    };
    var NoBorrarCodigos = function (id) {
    };
    var BorrarCodigos = function (index) {
        delete lCodigosPAA[index];
        lCodigosPAA.splice(index, 1);
        _dibujarCodigos();
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
            idObjPAA = $.getUrlVar('idObjPAA');
            var op = $.getUrlVar('op');
            idmpaa = $.getUrlVar('idmpaa');
            $("#txtIdMPAA").val(idmpaa);
            if (idObjPAA != null) {
                $("#txtId").val(idObjPAA);
                if (op == "E") _Abrir(idObjPAA, "Editar");
                else _Abrir(idObjPAA, "Detalles");
            } else {
                Nuevo();
            }
        },
        DesOrhabilitar: function (value) {
            //$("#txtUNSPSC").byaSetHabilitar(value);
            $("#txtDescripcion").byaSetHabilitar(value);
            $("#txtFEC_EST_INI").byaSetHabilitar(value);
            $("#txtPLA1_EJE").byaSetHabilitar(value);
            $("#cboTIP1_PLA").byaSetHabilitar(value);
            $("#txtPLA2_EJE").byaSetHabilitar(value);
            $("#cboTIP2_PLA").byaSetHabilitar(value);
            $("#cboModalidad").byaSetHabilitar(value);
            $("#cboFuente").byaSetHabilitar(value);
            $("#txtValorEstimado").byaSetHabilitar(value);
            $("#txtValorEstimadoVigenciaActual").byaSetHabilitar(value);
            $("#cboSeRequierenVigenciasF").byaSetHabilitar(value);
            $("#cboEstadoSolicitudVigenciasFuturas").byaSetHabilitar(value);
            $("#cboDependenciaNecesidad").byaSetHabilitar(value);
            $("#txtDatosContactoResponsable").byaSetHabilitar(value);
            $(".codigos").byaSetHabilitar(value);
            $("#btnAgregarCodigo").byaSetHabilitar(value);
            $("#btnBuscarCodigoUNSPSC").byaSetHabilitar(value);
        },
        Limpiar: function () {
            $("#txtUNSPSC").val("");
            $("#txtDescripcion").val("");
            $("#txtFEC_EST_INI").val("");
            $("#txtPLA1_EJE").val("");
            $("#txtPLA2_EJE").val("");
            $("#cboTIP1_PLA").val("A");
            $("#cboModalidad").val("");
            $("#cboFuente").val("");
            $("#txtValorEstimado").val("0");
            $("#txtValorEstimadoVigenciaActual").val("0");
            $("#cboSeRequierenVigenciasF").val("");
            $("#cboEstadoSolicitudVigenciasFuturas").val("");
            $("#cboDependenciaNecesidad").val("");
            $("#txtDatosContactoResponsable").val("");
            $('.currency').formatCurrency();
            $("#lstCodigos").html("");
            $("#txtNombreProductoUNSPSC").val("");
            $("#txtUNSPSC").val("");
            lCodigosPAA = new Array();
            PAA.RefreshCboT2("A");
        },
        RefreshCboT2: function (cod) {
            var sourcePlazos2 = byaPage.getSource(urlSourcePlazos2, { cod_tpla: "'" + cod + "'" });
            $("#cboTIP2_PLA").byaCombo({ DataSource: sourcePlazos2, Value: "COD_TPLA", Display: "NOM_PLA" });
        },
        BorrarCodigo: function (index) {
            BorrarCodigos(index);
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Registro Plan Anual de Adquisicion", Modulo: "Gestión PAA", urlToPanelModulo: "gPAA.aspx", Cod_Mod: "ADMIN", Rol: "ADM_TERC" });
    PAA.init();
});
