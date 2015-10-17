var Solicitudes = (function () {
    "use strict";
    var tema;
    var codSol;
    var dataRecord = {};
    var urlToGuardarNuevo = "/Servicios/wsSolicitudes.asmx/InsertPSolicitud";
    var urlToGuardarMod = "/Servicios/wsSolicitudes.asmx/UpdatePSolicitud";
    var urlToAbrirEP = "/Servicios/EstPrev/wsGesEstPrev.asmx/GetEstPrev";
    var urlToAbrirSol = "/Servicios/wsSolicitudes.asmx/GetSolicitud";
    var urlAsigSolicitud = "Asignar.html";
    var urlSourceTer = "/Servicios/wsDatosBasicos.asmx/GetNomTercerosPk";

    var msgPpal = "#LbMsg";
    var byaRpta;
    var jsonData;
    var operacion = "nuevo";
    //Adding event listeners
    var _addHandlers = function () {
        var verTerceros = function () {
            $('#modalTer').modal('show');
        };
        $("#btnAtras").click(function () {
            history.back();
        });
        $("#btnBuscarFun").click(function () {
            
            ModTer.showWindow(function (ter) {
                $("#TxtIdeCon").val(ter.IDE_TER);
                $("#TxtNomCon").val(ter.NOMBRE);
            });

        });

        $('#CboTip').change(function (event) {
            Solicitudes.RefreshCboSubTip();
        });
        $('#BtnAsignar').click(function () {
            _asignar();
        });
        //que todos los que tengan formato currency
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        //Manejo de Barra
        $('#BtnAbrirdeEP').click(function () {
            AbrirEstPrev();
        });
        $("#editarButton").click(function (event) {
            Editar();
        });
        $("#nuevoButton").click(function (event) {
            Nuevo();
        });
        $("#abrirButton").click(function (event) {
            AbrirSol();
        });
        $("#txtNumero").blur(function (event) {
            //AbrirSol();
        });
        $("#guardarButton").click(function (event) {
            if (operacion == "nuevo") _guardarNuevo();
            else GuardarMod();
            //Solicitudes.ValidarEL();
        });
        $("#cancelarButton").click(function (event) {
            _cancelar();
        });
    };

    ////LIMPIAR DATOS
    var _Limpiar = function () {
        $("#txtNSol").val("");
        $("#txtIDEP").val("");
        $("#txtFecRec").val("");
        $("CboDepDel").val("");

      }
    var _createElements = function () {
        tema = Solicitudes.config.theme;
        // $("#txtFecRec").jqxDateTimeInput({ width: '150px', height: '25px', theme: tema, culture: 'es-CO' });
        var sourceDep = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIA');
        $("#CboDepSol").byaCombo({
            DataSource: sourceDep, placeHolder: 'Dependencia Solicitante:', Display: "NOM_DEP", Value: "COD_DEP"
        });
        var sourceDep = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD');
        $("#CboDepDel").byaCombo({
            DataSource: sourceDep, placeHolder: 'Dependencia Delegada:', Display: "NOM_DEP", Value: "COD_DEP"
        });
        var sourceTip = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvTIPOSCONT');
        $("#CboTip").byaCombo({
            DataSource: sourceTip, placeHolder: 'Seleccione Tipo:', Display: "NOMC_TIP", Value: "COD_TIP"
        });
        var sourceMod = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvModalidad');
        $("#CboMod").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione Tipo:', Display: "NOM_TPROC", Value: "COD_TPROC"
        });
        
         //var sourceFun = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvFuncionariosP', { cod_dep: "'06'" });
         //$("#CboFun").byaCombo({
         //    DataSource: sourceFun, placeHolder: 'Seleccione Funcionario:', Display: "NOMBRE", Value: "IDE_TER"
         //});
         
        //Inicializar elementos marcados como currency
        $('.currency').byaSetDecimal(0);
        
        ModTer.init();
        
    };
    //METODOS PRIVADOS
    var _asignar = function () {
        $.get(urlAsigSolicitud, function (data) {
            $("#secDetalle").html(data);
        });
    };
    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                Solicitudes.config.oper = 'cancelar';
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
        $("#txtNumero").byaSetHabilitar(true);
        $("#BtnDwnAbrir").byaSetHabilitar(true);
        Solicitudes.Deshabilitar();
        Solicitudes.Limpiar();
        //$(Solicitudes.formulario).jqxValidator('hide');
    }
    var AbrirSol = function () {
        if (_AbrirSol($("#txtNumero").val())) {
            //$("#LbMsg").html("Listo...!!! Si desea modificar debe presionar el boton Editar, realizar los cambios y presione el Botón Guardar.");
            $("#cancelarButton").byaSetHabilitar(false);
            $("#guardarButton").byaSetHabilitar(false);
            $("#nuevoButton").byaSetHabilitar(true);
            //$("#editarButton").byaSetHabilitar(true);
            $("#abrirButton").byaSetHabilitar(false);
            $("#txtNumero").byaSetHabilitar(false);
            $("#BtnDwnAbrir").byaSetHabilitar(false);
            Solicitudes.Deshabilitar();
        } else {
            $("#cancelarButton").byaSetHabilitar(false);
            $("#guardarButton").byaSetHabilitar(false);
            $("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(false);
            $("#abrirButton").byaSetHabilitar(true);
            $("#txtNumero").byaSetHabilitar(true);
            $("#txtNumero").byaSetHabilitar(true);
            $("#BtnDwnAbrir").byaSetHabilitar(true);
        }

    };
    var AbrirEstPrev = function () {
        if (_AbrirEP($("#txtNumero").val())) {
            $("#cancelarButton").byaSetHabilitar(true);
            $("#guardarButton").byaSetHabilitar(true);
            $("#nuevoButton").byaSetHabilitar(false);
            $("#editarButton").byaSetHabilitar(false);
            $("#abrirButton").byaSetHabilitar(false);
            $("#txtNumero").byaSetHabilitar(false);
            $("#BtnDwnAbrir").byaSetHabilitar(false);
            Solicitudes.NuevoFromEP(_guardarNuevo);
        }
    };
    var Editar = function () {
        $("#nuevoButton").byaSetHabilitar(false);
        $("#abrirButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#txtNumero").byaSetHabilitar(false);
        $("#btnBuscarFun").attr("disabled", false)
        Solicitudes.config.oper = 'editar';
        Solicitudes.HabilitarE();
        Solicitudes.disabled = false;
        //Solicitudes._createValidacionEL(GuardarMod);
        $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        
    };
    var _guardarNuevo = function () {
        jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                $("#txtNSol").val(byaRpta.id);
                Solicitudes.Deshabilitar();
                _getDataRecord(byaRpta.id);
                //alert(JSON.stringify(dataRecord));
                $("#nuevoButton").byaSetHabilitar(true);
                $("#editarButton").byaSetHabilitar(false);
                $("#guardarButton").byaSetHabilitar(false);
                $("#cancelarButton").byaSetHabilitar(false);
                $("#abrirButton").byaSetHabilitar(true);
                $("#txtNumero").byaSetHabilitar(true);
            }
        });
    };
    var GuardarMod = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: byaRpta.Mensaje , tipo: !byaRpta.Error });
        });
        Limpiar();
      };
    var Nuevo = function () {
        operacion = "nuevo";
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#abrirButton").byaSetHabilitar(false);
        $("#txtNumero").byaSetHabilitar(false);
        $("#txtNSol").byaSetHabilitar(false);
        $("#BtnDwnAbrir").byaSetHabilitar(false);
        $("#btnBuscarFun").byaSetHabilitar(true);
        Solicitudes.Nuevo(_guardarNuevo);
        var now = new Date();
        $("#txtFecRec").val(byaPage.FechaShortX(now));
        //modalMsgBox.show("Hola");
    };
   var getDatos = function () {
        var e = {};
        e.COD_SOL = $("#txtNSol").val();
        e.COD_EP = $("#txtIDEP").val();
        e.OBJ_SOL = $("#txtObjCon").val();
        //e.FEC_RECIBIDO = $('#txtFecRec').jqxDateTimeInput('value');
        e.DEP_SOL = $("#CboDepSol").val();
        e.TIP_CON = $("#CboTip").val();
        e.COD_TPRO = $("#CboMod").val();
        e.STIP_CON = $("#CboSubTip").val();
        e.VIG_SOL = byaSite.getVigencia();
        e.DEP_PSOL = $("#CboDepDel").val();
        e.VAL_CON = $("#txtValTot").byaGetDecimal();
        e.IDE_CON = $("#TxtIdeCon").val();
        return e;
    };
   var _iniElements = function () {
       //Inicializa combo de subtipos
         Solicitudes.RefreshCboSubTip("00");
       //Lee parametro de URL
         codSol = $.getUrlVar('cod_sol');
       //codSol = codSol.replace("#", "");
         operacion = "nuevo";
         if (codSol != null) {
             $("#txtNumero").val(codSol);
            AbrirSol();
         }
   };
    ///abrir sol
   var _getDataRecord = function (nep) {
       var parametrosJSON = { "codsol": nep };
       $.ajax({
           type: "POST",
           url: urlToAbrirSol,
           data: byaPage.JSONtoString(parametrosJSON),
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           async: false,
           success: function (result) {
               dataRecord = byaPage.retObj(result.d);
           },
           error: function (jqXHR, status, error) {
               alert(error + "-" + jqXHR.responseText);
           }
       });
       return dataRecord;
   };
   ////abrir solicitud
   var _AbrirSol= function (nep) {
       var sw = false;
       if (nep == "") {
           $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Por favor Digite un Número de Solicitud...!!!", tipo: false });
           $("#txtNumero").focus();
           return false;
       }
       var parametrosJSON = {"codsol": nep};
       $.ajax({
           type: "POST",
           url: urlToAbrirSol,
           data: byaPage.JSONtoString(parametrosJSON),
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           async: false,
           beforeSend: function () {
               $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "Abriendo Solicitud.... ", tipo: "info" });
           },
           success: function (result) {
               var e = byaPage.retObj(result.d);
               dataRecord = e;
               if (e.NUM_SOL == 0) {
                   $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "Solicitud N° " + nep + " no encontrada...!!!", tipo: "warning" });
               }
               else {       
                   $("#txtIDEP").val(e.COD_EP);
                   $("#txtNSol").val(e.COD_SOL);
                   $("#txtObjCon").val(e.OBJ_SOL);
                    //$("#txtFecRec").val(byaPage.JSONFechaShortX(e.FEC_RECIBIDO));
                    $("#txtFecRec").val(byaPage.converJSONDate(e.FEC_RECIBIDO));
                   $("#CboDepSol").val(e.DEP_SOL);
                   $("#CboDepSup").val(e.DEP_SUP);
                   $("#CboTip").val(e.TIP_CON);
                   $("#CboMod").val(e.COD_TPRO);
                   Solicitudes.RefreshCboSubTip(e.TIP_CON_EP);
                   $("#txtNSol").val(e.COD_SOL);
                   $("#CboSubTip").val(e.STIP_CON);
                   //e.VIG_SOL = 2013;  //$("#CboVig").val();
                   $("#CboDepDel").val(e.DEP_PSOL);
                   $("#txtValTot").byaSetDecimal(e.VAL_CON);
                   $("#txtFun").val(e.NOM_ABOG_ENC);
                   $("#TxtIdeCon").val(e.IDE_CON);
                   $("#TxtNomCon").val(e.NOM_CON);
                   //alert(e.IDE_CON + e.NOM_CON);
                   sw = true;
                   if (e.COD_EP != null) {
                       $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "No se puede editar la solicitud, esta asociada a un Estudio Previo", tipo: "info" });
                       $("#editarButton").byaSetHabilitar(false);
                       
                   } else {
                       $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "Presione editar para modificar la solicitud", tipo: "info" });
                       $("#editarButton").byaSetHabilitar(true);
                   }
                   if (e.NOM_EST_SOL == "A" || e.NOM_EST_SOL == "R") {
                       $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "No se puede editar la Solicitud, Ya fue Revisada Estado ["+e.NOM_EST_SOL+"]", tipo: "warning" });
                       $("#editarButton").byaSetHabilitar(false);
                   }
                   operacion = "editar";
               }
           },
           error: function (jqXHR, status, error) {
               alert(error + "-" + jqXHR.responseText);
           }
       });
       return sw;
   };
    //////////estudio previo
   var _AbrirEP= function (nep) {
        var sw = false;
        if (nep == "") {
            $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Debe especificar un número de estudio previo", tipo: false });
            $("#txtNumero").focus();
            return false;
        }
        var parametrosJSON = { "codigo_ep":nep , "tipo": 'CN' };
        $.ajax({
            type: "POST",
            url: urlToAbrirEP,
            data: byaPage.JSONtoString(parametrosJSON),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Procesando.. espere por favor...!!!", tipo: "info" });
            },
            success: function (result) {
                var ep = byaPage.retObj(result.d);
                if (ep.ID == 0) {
                    $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Estudio Previo N° " + nep + " no encontrado...!!!", tipo: "warning" });
                }
                else {
                    //alert(ep.EST_FLU_EP);
                    //alert(ep.EST_EP);
                    //alert(JSON.stringify(ep));
                    if (ep.EST_EP == "AP") {
                        $("#txtIDEP").val(ep.CODIGO_EP);
                        $("#txtNSol").val("");
                        $("#txtObjCon").val(ep.OBJE_EP);
                        $("#CboDepSup").val(ep.DEP_SUP_EP);
                        $("#CboDepSol").val(ep.DEP_NEC_EP);
                        $("#CboTip").val(ep.TIP_CON_EP);
                        Solicitudes.RefreshCboSubTip(ep.TIP_CON_EP);
                        $("#CboSubTip").val(ep.STIP_CON_EP);
                        $("#CboMod").val(ep.MOD_SEL_EP);
                        $("#CboDepDel").val(ep.DEP_DEL_EP);
                        $("#txtValTot").byaSetDecimal(ep.VAL_ENT_EP + ep.VAL_OTR_EP);
                        $("#TxtIdeCon").val(ep.IDE_CON_EP);
                        //alert(ep.IDE_CON_EP);
                        Solicitudes.BuscarTercero($('#TxtIdeCon'), $('#TxtNomCon'));
                        //$("#TxtNomCon").val(ter.NOMBRE);
                        var now = new Date();
                        $("#txtFecRec").val(byaPage.FechaShortX(now));
                        Solicitudes.isEP = nep;
                        $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Se cargaron los datos del estudio previo, para confirmar la recepción de la solicitud debe presionar el botón Guardar sino Cancelar", tipo: "info" });
                        sw = true;
                    } else {
                        $(msgPpal).msgBox({ titulo: "Nueva Solicitud Apartir de Estudio Previo", mensaje: "El Estudio Previo debe estar en estado aprobado", tipo: "warning" });
                    }
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
        return sw;
    };
   return {
       //formulario: '#form1',
       disabled: true,
       isEP: null,
       config: {
           theme: null,
           oper: null
       },
       getUser: function () {
           return byaSite.getUsuario();
       },
       //ValidarEL: function () {
       //    $(this.formulario).jqxValidator('validate');
       //},
       //_createValidacionEL: function (fnOk) {
       //    $(this.formulario).jqxValidator(
       //    {
       //        onSuccess: fnOk,
       //        hintType: 'label',
       //        onError: function () {
       //            $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Los datos no son válidos!!!", tipo: false });
       //        },
       //        rules: [
       //            { input: '#txtObjCon', message: 'Debe especificar el objeto!', action: 'keyup, blur', rule: 'required' },
       //            {
       //                input: '#CboTip', message: 'Debe Identificar el tipo de contrato', action: 'select', rule: function (input) {
       //                    var val = $("#CboTip").val();
       //                    return (val != "");
       //                }
       //            }
       //        ]
       //    });
       //},
       BuscarTercero: function (txtIde, txtNom) {
           var ide_ter = txtIde.val();
           if (ide_ter != "") {
               var source = byaPage.getSource(urlSourceTer, { ide_ter: "'" + ide_ter + "'" });
               if (source == "0") {
                   txtNom.val("");
               }
               else{
                   txtNom.val(source);
               }
           }
       },
       RefreshCboSubTip: function () {
           var cod_tip = $('#CboTip').val();
           var source = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvSUBTIPOS', { cod_tip: "'" + cod_tip + "'" });
           $("#CboSubTip").byaCombo({
               DataSource: source, placeHolder: 'Seleccione Sub Tipo:', Display: "NOMC_STIP", Value: "COD_STIP"
           });
       },
       init: function () {
           _createElements();
           _addHandlers();
           _reset();
           _iniElements();
       },
       validar: function () {
           alert("Debe Guardar los Datos Iniciales del Estudio Previo para continuar....");
       },
       getRecord: function () {
           return dataRecord;
       },
       refresh: function () {
           if (dataRecord != null) {
               $("#txtNumero").val(dataRecord.COD_SOL);
               AbrirSol();
           }
       },
       Deshabilitar: function () {
           //Deshabilita todos los controles
           $('.formC :input').attr('disabled', true);
           var value = false;
           $("#CboDepDel").byaSetHabilitar(value);
           $("#CboDepSol").byaSetHabilitar(value);
           $("#CboTip").byaSetHabilitar(value);
           $("#CboSubTip").byaSetHabilitar(value);
           $("#CboMod").byaSetHabilitar(value);
           $("#txtObjCon").byaSetHabilitar(value);
           $("#BtnAbrirEP").byaSetHabilitar(value);
           $("#btnBuscarFun").byaSetHabilitar(false);
           $("#txtValTot").byaSetHabilitar(value);
           //$("#CboFun").byaSetHabilitar(false);
           $("#txtNSol").byaSetHabilitar(false);
           $("#txtIDEP").byaSetHabilitar(false);
           $("#txtFecRec").byaSetHabilitar(value);

           //$("#TxtFecElab").jqxDateTimeInput({ disabled: true });

           //$("#txtFecRec").jqxDateTimeInput({ disabled: true });

           this.disabled = true;
       },

       Limpiar: function () {
           //Colocar Valores Por Defecto
           //$('#form1')[0].reset();
           //$('#FrmEstPrev :input').attr('value', '');
           //$("#CboDepSup").jqxDropDownList({ selectedIndex: -1 });
           //$("#CboDepSol").jqxDropDownList({ selectedIndex: -1 });
           //$("#CboTip").jqxDropDownList({ selectedIndex: -1 });
           //$("#CboSubTip").jqxDropDownList({ selectedIndex: -1 });
           //$("#CboMod").jqxDropDownList({ selectedIndex: -1 });
           //$("#CboDepDel").jqxDropDownList({ selectedIndex: -1 });
           byaPage.msgLimpiar($("#LbMsg"));
       },
       HabilitarN: function () {
           $('.formC :input').attr('disabled', false);
           var value = true;
           $("#CboDepDel").byaSetHabilitar(value);
           $("#CboDepSol").byaSetHabilitar(value);
           $("#CboTip").byaSetHabilitar(value);
           $("#CboSubTip").byaSetHabilitar(value);
           $("#CboMod").byaSetHabilitar(value);
           $("#txtObjCon").byaSetHabilitar(value);
           $("#BtnAbrirEP").byaSetHabilitar(value);
           $("#txtIDEP").byaSetHabilitar(value);
           $("#txtValTot").byaSetHabilitar(value);
           //$("#CboFun").byaSetHabilitar(false);
           $("#txtNSol").byaSetHabilitar(false);
           $("#txtIDEP").byaSetHabilitar(false);
           //$("#txtFecRec").byaSetHabilitar(value);
           //$("#txtFecRec").jqxDateTimeInput({ disabled: !value });
           //$("#TxtFecElab").jqxDateTimeInput({ disabled: false });

       },
       HabilitarE: function () {
           $('.formC :input').attr('disabled', false);

           var value = true;
           $("#CboDepDel").byaSetHabilitar(value);
           $("#CboDepSol").byaSetHabilitar(value);
           $("#CboTip").byaSetHabilitar(value);
           $("#CboSubTip").byaSetHabilitar(value);
           $("#CboMod").byaSetHabilitar(value);
           $("#txtObjCon").byaSetHabilitar(value);
           $("#txtValTot").byaSetHabilitar(value);
           $("#txtFecRec").byaSetHabilitar(value);
           //$("#txtFecRec").jqxDateTimeInput({ disabled: !value });
           $("#txtNSol").byaSetHabilitar(false);
           $("#txtIDEP").byaSetHabilitar(false);
           //$("#TxtFecElab").jqxDateTimeInput({ disabled: false });
           this.disabled = false;
       },
       Nuevo: function (_guardarNuevo) {
           Solicitudes.config.oper = 'nuevo';
           Solicitudes.HabilitarN(); //Habilitar para nuevo
           Solicitudes.Limpiar(); //Limpiar los input
           //Solicitudes._createValidacionEL(_guardarNuevo); //Configurar el Validador
           Solicitudes.RefreshCboSubTip("00");
           var user = Solicitudes.getUser();
       },
       NuevoFromEP: function (_guardarNuevo) {
           Solicitudes.config.oper = 'nuevo';
           Solicitudes.Deshabilitar();
           //Solicitudes._createValidacionEL(_guardarNuevo); //Configurar el Validador
           var user = Solicitudes.getUser();
       }
       
   }
}());

$(document).ready(function () {
    byaSite.SetModuloP({ TituloForm: "Registro de Solicitudes", Modulo: "Procesos Precontractuales", urlToPanelModulo: "GesSolicitudes.aspx", Cod_Mod: "SOLI4", Rol: "PR_RECEP" });
    Solicitudes.config.theme = byaSite.tema;
    Solicitudes.init();
});
