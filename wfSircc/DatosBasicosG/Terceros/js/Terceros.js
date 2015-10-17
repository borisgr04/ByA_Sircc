var admTercero = (function () {

   
    var urlToAbrirTer = "/Servicios/DatosBasicosG/wsTerceros.asmx/GetTercerosxId";
    var urlToGuardarNuevo = "/Servicios/DatosBasicosG/wsTerceros.asmx/Insert";
    var urlToGuardarMod = "/Servicios/DatosBasicosG/wsTerceros.asmx/Update";
    var urlModalTerceros = "Tercerosh.html";
    
    var msgPpal = "#LbMsg";


    var _addHandlers = function () {
        $('#BtnDwnAbrir').click(function (event) {
            _AbrirTercero($("#txtNumero").val());
        });
        $("#btnPrueba").click(function () {
            $.get(urlModalTerceros, function (data) {
                $("#secBsqTerceros").html(data);
                mTerceros.showWindow(function (item) {
                    alert(JSON.stringify(item));
                });
            });
        });
        $('#CboTipNro').change(function () {
            var tp = $('#CboTipNro').val();
            if (tp == "NI ") {
                $('#txtRazSoc').byaSetHabilitar(true);

                $('#txtPrimApe').byaSetHabilitar(false);
                $('#txtSegApe').byaSetHabilitar(false);
                $('#txtPrimNom').byaSetHabilitar(false);
                $('#txtSegNom').byaSetHabilitar(false);
            } else {
                $('#txtRazSoc').byaSetHabilitar(false);

                $('#txtPrimApe').byaSetHabilitar(true);
                $('#txtSegApe').byaSetHabilitar(true);
                $('#txtPrimNom').byaSetHabilitar(true);
                $('#txtSegNom').byaSetHabilitar(true);
            }
        });
        $("#guardarButton").click(function (event) {
            
            if  (admTercero.config.oper=='Editar'){
                _CaomposVaciosEditar();
            }
            else {
                _CaomposVacios();
            }
        });

        $("#editarButton").click(function (event) {
            Editar();
        });
        $("#cancelarButton").click(function (event) {
            _cancelar();
        });
        $("#nuevoButton").click(function (event) {
            Nuevo();
        });

    };
    var controladoresAdicionales;

    var _CaomposVacios = function () {
        if ($("#CboTipNro").val() == "") {
            $("#CboTipNro").focus().val()
            alert("Debe seleccionar al tipo de Documento de la Lista...!")
        }
        else {
            if ($("#txtNroDoc").val() == "") {
                $("#txtNroDoc").focus().val()
                alert("Campo N° de Identificacion vacio...!");
            } else {
                if ($("#txtPrimApe").val() == "") {
                    $("#txtPrimApe").focus().val()
                    alert("Campo Primer Apellido Vacio...!");
                } else {
                    if ($("#txtSegApe").val() == "") {
                        $("#txtSegApe").focus().val()
                        alert("Campo Segundo Apellido Vacio...!");
                    } else {
                        if ($("#txtPrimNom").val() == "") {
                            $("#txtPrimNom").focus().val()
                            alert("Campo Primer Nombre Vacio...!");
                        } else {
                            if ($("#txtSegNom").val() == "") {
                                $("#txtSegNom").focus().val()
                                alert("Campo Segundo Nombre vacion..!");
                            } else {
                                if ($("#txtFecNac").val() == "") {
                                    $("#txtFecNac").focus().val()
                                    alert("No ha seleccionado Ninguna fecha de nacimineto..!");
                                } else {
                                        if ($("#txtcargo").val() == "") {
                                            $("#txtcargo").focus().val()
                                            alert("Campo Cargo Vacio...!");
                                        } else { _guardarNuevo(); }
                                    
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var _CaomposVaciosEditar = function () {
        if ($("#CboTipNro").val() == "") {
            $("#CboTipNro").focus().val()
            alert("Debe seleccionar al tipo de Documento de la Lista...!")
        }
        else {
            if ($("#txtNroDoc").val() == "") {
                $("#txtNroDoc").focus().val()
                alert("Campo N° de Identificacion vacio...!");
            } else {
                if ($("#txtPrimApe").val() == "") {
                    $("#txtPrimApe").focus().val()
                    alert("Campo Primer Apellido Vacio...!");
                } else {
                    if ($("#txtSegApe").val() == "") {
                        $("#txtSegApe").focus().val()
                        alert("Campo Segundo Apellido Vacio...!");
                    } else {
                        if ($("#txtPrimNom").val() == "") {
                            $("#txtPrimNom").focus().val()
                            alert("Campo Primer Nombre Vacio...!");
                        } else {
                            if ($("#txtSegNom").val() == "") {
                                $("#txtSegNom").focus().val()
                                alert("Campo Segundo Nombre vacion..!");
                            } else {
                                if ($("#txtFecNac").val() == "") {
                                    $("#txtFecNac").focus().val()
                                    alert("No ha seleccionado Ninguna fecha de nacimineto..!");
                                } else {
                                    
                                        if ($("#txtcargo").val() == "") {
                                            $("#txtcargo").focus().val()
                                            alert("Campo Cargo Vacio...!");
                                        } else { GuardarMod(); }
                                    
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var _crearElements = function () {

        var sourceDep = [
        { "NOM_DOC": "NIT", "COD_DOC": "NI " },
        { "NOM_DOC": "CÉDULA DE CIUDADANÍA", "COD_DOC": "CC " },
        { "NOM_DOC": "CÉDULA DE EXTRANJERÍA", "COD_DOC": "CE " },
        { "NOM_DOC": "PASAPORTE", "COD_DOC": "PA" }
        ];
        $('#CboTipNro').byaCombo({
            DataSource: sourceDep, placeHolder: 'Seleccione el tipo de Doc', Display: "NOM_DOC", Value: "COD_DOC"
        });
        
        var sourceDep = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIA');
        $("#CboDepNec").byaCombo({
            DataSource: sourceDep, placeHolder: 'Dependencia Contratante:', Display: "NOM_DEP", Value: "COD_DEP"
        });

        var sourceDep = [
        { "NOM_TIP": "NINGUNO", "COD_TIP": "NI" },
        { "NOM_TIP": "UNICA PERSONA", "COD_TIP": "PU" },
        { "NOM_TIP": "CONSORCIO", "COD_TIP": "CS" },
        { "NOM_TIP": "UNIÓN TEMPORAL", "COD_TIP": "UT" }
        ];
        $('#CboTpTer').byaCombo({
            DataSource: sourceDep, placeHolder: 'Tipo de Tercero', Display: "NOM_TIP", Value: "COD_TIP"
        });
        var sourceDep = [
               { "NOM_EST": "ACTIVO", "COD_EST": "AC" },
               { "NOM_EST": "INACTIVO", "COD_EST": "IN" }  
        ];
        $('#cbotEst').byaCombo({
            DataSource: sourceDep, placeHolder: 'Estado del Tercero', Display: "NOM_EST", Value: "COD_EST"
        });

        var sourceDep = [
             { "NOM_CLA": "PERSONA NATURAL", "COD_CLA": "PN" },
             { "NOM_CLA": "PERSONA JURIDICA", "COD_CLA": "PJ" }
        ];
        $('#CboClasf').byaCombo({
            DataSource: sourceDep, placeHolder: 'Seleccione...', Display: "NOM_CLA", Value: "COD_CLA"
        });
    };

    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                admTercero.config.oper = 'cancelar';
                _reset();
            }
        });
    };
    var _reset = function () {
        $("#nuevoButton").byaSetHabilitar(true);
        $("#guardarButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#cancelarButton").byaSetHabilitar(false);
        $("#abrirButton").byaSetHabilitar(false);
        $("#txtNumero").byaSetHabilitar(true);
        $("#BtnDwnAbrir").byaSetHabilitar(true);
        admTercero.Deshabilitar();
        admTercero.Limpiar();
       // $(Solicitudes.formulario).jqxValidator('hide');
    }

    var getDatos = function () {
        var e = {};
        var tp = $('#CboTipNro').val();
        if (tp == "NI ") {
            e.APE1_TER = $('#txtRazSoc').val();
            e.RAZ_SOC = $('#txtRazSoc').val();
        } else {
            e.RAZ_SOC = $('#txtPrimApe').val() + " " + $('#txtSegApe').val() + " " + $('#txtPrimNom').val() + " " + $('#txtSegNom').val();
            e.APE1_TER = $('#txtPrimApe').val();
            e.APE2_TER = $('#txtSegApe').val();
            e.NOM1_TER = $('#txtPrimNom').val();
            e.NOM2_TER = $('#txtSegNom').val();
        }
        e.TIP_IDE = $('#CboTipNro').val();
        e.IDE_TER = $('#txtNroDoc').val();
        e.EXP_IDE = $('#txtLugExp').val();
        e.DV_TER = $('#TxtDV').val(); 
        e.FEC_NAC = $('#txtFecNac').val();
        e.DIR_TER = $('#txtDir').val();
        e.TEL_TER = $('#txtTel').val();
        e.EMA_TER = $('#txtEma').val();
        e.CAR_FUN = $('#txtcargo').val();
        e.DEP_NEC = $('#CboDepNec').val();
        e.ESTADO = $('#cbotEst').val();
        e.TIPO = $('#CboTpTer').val();
        e.OBS_TER = $('#txtObs').val();
        e.TIP_PER = $('#CboClasf').val();
        var now = new Date();
        e.FEC_MOD = byaPage.FechaShortX(now);
        if (admTercero.config.oper='Nuevo'){
            e.FEC_REG = byaPage.FechaShortX(now);
        }
        return e;
    };

    var _guardarNuevo = function () {
        jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            
            $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
             //   $("#txtNSol").val(byaRpta.id);
             
                $("#nuevoButton").byaSetHabilitar(true);
                $("#editarButton").byaSetHabilitar(false);
                $("#guardarButton").byaSetHabilitar(false);
                $("#cancelarButton").byaSetHabilitar(false);
                $("#BtnDwnAbrir").byaSetHabilitar(true);
                $("#txtNumero").byaSetHabilitar(true);
            }
        });
    };
    
    var GuardarMod = function () {
        var byaRpta = {};
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            admTercero.Limpiar();
            $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
        });
        $("#nuevoButton").byaSetHabilitar(true);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(false);
        $("#cancelarButton").byaSetHabilitar(false);
        $("#BtnDwnAbrir").byaSetHabilitar(true);
        $("#txtNumero").byaSetHabilitar(true);
        
    };

    var Nuevo = function () {
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#abrirButton").byaSetHabilitar(false);
        $("#txtNumero").prop('disabled',false);
        $("#BtnDwnAbrir").byaSetHabilitar(false);
        admTercero.config.oper = 'Nuevo';
        admTercero.Limpiar();
        admTercero.Habilitar();
       
        // Solicitudes.Nuevo(_guardarNuevo);
      
       
       //modalMsgBox.show("Hola");
    };
    
    var Editar = function () {
        admTercero.config.oper = 'Editar';
        admTercero.Habilitar();
        $("#txtNumero").byaSetHabilitar(false);
        admTercero.disabled = false;
        //Solicitudes._createValidacionEL(GuardarMod);
        $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });

        var tp = $('#CboTipNro').val();
        if (tp == "NI ") {
            $('#txtRazSoc').byaSetHabilitar(true);

            $('#txtPrimApe').byaSetHabilitar(false);
            $('#txtSegApe').byaSetHabilitar(false);
            $('#txtPrimNom').byaSetHabilitar(false);
            $('#txtSegNom').byaSetHabilitar(false);
        } else {
            $('#txtRazSoc').byaSetHabilitar(false);

            $('#txtPrimApe').byaSetHabilitar(true);
            $('#txtSegApe').byaSetHabilitar(true);
            $('#txtPrimNom').byaSetHabilitar(true);
            $('#txtSegNom').byaSetHabilitar(true);
        }
    };

    var _AbrirTercero = function (ideTer) {
        var parametrosJSON = { "IdTer": ideTer };
        
        
        $.ajax({
            type: "GET",
            url: urlToAbrirTer,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
               $(msgPpal).msgBox({ titulo: "Tercero", mensaje: "Procesando.. espere por favor...!!!", tipo: "info" });
            },
            success: function (result) {
                var ter = byaPage.retObj(result.d);
                
                if (ter.IDE_TER == 0) {
                   $(msgPpal).msgBox({ titulo: "Tercero", mensaje: "El tercero con N° Identificación  " + nep + " no se encuentra registrado...!!!", tipo: "warning" });
                   
                }
                else {
                    $('.input').attr('disabled', false);
                    //alert(ter.TIP_IDE);
                    //$('#CboTipNro').val('CC');
                    $('#CboTipNro').val(ter.TIP_IDE);
                    $('#txtNroDoc').val(ter.IDE_TER);
                    $('#txtLugExp').val(ter.EXP_IDE);
                    $('#TxtDV').val(ter.DV_TER);
                    $('#txtPrimApe').val(ter.APE1_TER);
                    $('#txtSegApe').val(ter.APE2_TER);
                    $('#txtPrimNom').val(ter.NOM1_TER);
                    $('#txtSegNom').val(ter.NOM2_TER);
                    $('#txtRazSoc').val(ter.RAZ_SOC);
                    $('#txtFecNac').val(byaPage.converJSONDate(ter.FEC_NAC));
                    $('#txtDir').val(ter.DIR_TER);
                    $('#txtTel').val(ter.TEL_TER);
                    $('#txtEma').val(ter.EMA_TER);
                    $('#txtcargo').val(ter.CAR_FUN);
                    $('#CboDepNec').val(ter.DEP_NEC);
                    $('#cbotEst').val(ter.ESTADO);
                    $('#CboTpTer').val(ter.TIPO);
                    $('#txtObs').val(ter.OBS_TER);
                    $('#CboClasf').val(ter.TIP_PER);
                    
                    admTercero.Deshabilitar();
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#nuevoButton").byaSetHabilitar(false);
                    $("#BtnDwnAbrir").byaSetHabilitar(false);
                    $("#editarButton").byaSetHabilitar(true);
                    $("#cancelarButton").byaSetHabilitar(true);
                    $("#txtNumero").byaSetHabilitar(false);
                    $("#BtnDwnAbrir").byaSetHabilitar(false);
                   
                    
                    $(msgPpal).msgBox({ titulo: "Tercero", mensaje: "Se cargaron los datos del Tercero", tipo: "info" });
                    sw = true;

                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
        return sw;
    };
   
    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        init: function () {
            var idterce = $.getUrlVar('ideter');
            _addHandlers();
            _crearElements();
            if (idterce == null) Nuevo();
            else {
                _AbrirTercero(idterce);
                Editar();
            }
        },

        Deshabilitar: function () {
            //Deshabilita todos los controles
            $('input').prop('disabled', true);
            $('#txtObs').prop('disabled', true);
            var value = false;
            $('#CboTipNro').byaSetHabilitar(value);
            $('#CboDepNec').byaSetHabilitar(value);
            $('#cbotEst').byaSetHabilitar(value);
            $('#CboTpTer').byaSetHabilitar(value);
            $('#CboClasf').byaSetHabilitar(value);
            this.disabled = true;
        },

        Habilitar: function () {
            //Deshabilita todos los controles
            $('input').prop('disabled', false);
            $('#txtObs').prop('disabled', false);
            var value = true;
            $('#CboTipNro').byaSetHabilitar(value);
            $('#CboDepNec').byaSetHabilitar(value);
            $('#cbotEst').byaSetHabilitar(value);
            $('#CboTpTer').byaSetHabilitar(value);
            $('#CboClasf').byaSetHabilitar(value);
            $("#nuevoButton").byaSetHabilitar(false);
            $("#abrirButton").byaSetHabilitar(false);
            $("#editarButton").byaSetHabilitar(false);
            $("#guardarButton").byaSetHabilitar(true);
            $("#cancelarButton").byaSetHabilitar(true);
            this.disabled = false;
        },
     
        Limpiar: function () {
            //Colocar Valores Por Defecto
            $('#form1')[0].reset();
            byaPage.msgLimpiar($("#LbMsg"));
        },
    }




}());


$(function () {
    byaSite.SetModuloP({ TituloForm: " Terceros", Modulo: "Datos Básicos", urlToPanelModulo: "", Cod_Mod: "DTBS4", Rol: "DTBS4Terceros" });
    admTercero.config.theme = byaSite.tema;
    admTercero.init();
    //GesCronograma.init();
});
