var ActaInicio = (function () {
    "use strict";
    var tema;
    var codCon;
    var IdActa;
    var Estado = "01";
    var TituloForm = "Gestión de Contratos <small > Actas de Inicio</small>";
    var urlToGuardarNuevo = "/Servicios/wsContratosGestionS.asmx/InsertActaInicio";

    var urlToGuardarMod = "/Servicios/wsContratosGestionS.asmx/UpdatePSolicitud";
    var urlToAbrir = "/Servicios/wsContratosGestionS.asmx/GetSolicitud"
    var msgPpal = "#LbMsg";

    var urlPrintActa = "/ashx/generarActa.ashx?idacta=";

    var byaRpta;
    var jsonData;
    //Adding event listeners
    var _addHandlers = function () {
        $("#guardarButton").click(function (event) {
            ActaInicio.ValidarEL();
        });
        $("#cancelarButton").click(function (event) {
            alert("Cancelar");
            //_cancelar();
        });
        $("#imprimirButton").click(function (event) {
            _imprimir();
        });
    };
    //METODOS PRIVADOS
    var _imprimir = function () {
        byaSite.AbrirPagina(urlPrintActa + IdActa);
    };
    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                ActaInicio.config.oper = 'cancelar';
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
        ActaInicio.Deshabilitar();
        ActaInicio.Limpiar();
        $(ActaInicio.formulario).jqxValidator('hide');
    }
    var AbrirSol = function () {
        if (_AbrirSol($("#txtNumero").val())) {
            //$("#LbMsg").html("Listo...!!! Si desea modificar debe presionar el boton Editar, realizar los cambios y presione el Botón Guardar.");
            $("#cancelarButton").byaSetHabilitar(false);
            $("#guardarButton").byaSetHabilitar(false);
            $("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(true);
            $("#abrirButton").byaSetHabilitar(false);
            $("#txtNumero").byaSetHabilitar(false);
            $("#BtnDwnAbrir").byaSetHabilitar(false);
            ActaInicio.Deshabilitar();
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
    var Editar = function () {
        $("#nuevoButton").byaSetHabilitar(false);
        $("#abrirButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#txtNumero").byaSetHabilitar(false);
        ActaInicio.config.oper = 'editar';
        ActaInicio.HabilitarE();
        ActaInicio.disabled = false;
        ActaInicio._createValidacionEL(_guardarMod);
        $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        
    };
    var _guardarNuevo = function () {
        jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                $("#txtNSol").val(byaRpta.id);
                ActaInicio.Deshabilitar();
                $("#nuevoButton").byaSetHabilitar(true);
                $("#editarButton").byaSetHabilitar(false);
                $("#guardarButton").byaSetHabilitar(false);
                $("#cancelarButton").byaSetHabilitar(false);
                $("#abrirButton").byaSetHabilitar(true);
                $("#txtNumero").byaSetHabilitar(true);
            }
        });
    };
    var _guardarMod =function () {
        var byaRpta = {};
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: byaRpta.Mensaje , tipo: !byaRpta.Error });
        });

    };
    var _Nuevo = function () {
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#abrirButton").byaSetHabilitar(false);
        $("#txtNumero").byaSetHabilitar(false);
        $("#txtNSol").byaSetHabilitar(false);
        $("#BtnDwnAbrir").byaSetHabilitar(false);
        ActaInicio.Nuevo(_guardarNuevo);
        var now = new Date();
        $("#txtFecRec").val(byaPage.FechaShortX(now));
        //modalMsgBox.show("Hola");
    };
    var getDatos = function () {
        var e = {};
        //e.FEC_FIN
        //e.ID
        e.COD_CON = ActaInicio.getCodCon();
        //e.EST_INI =//LO CALCULA EL SISTEMA
        e.EST_FIN = Estado;
        e.FEC_ACT = $("#txtFecAct").val();
        e.FEC_FIN = $("#txtFecFin").val();
        e.OBS_EST = $("#txtObjCon").val();

        //e.ESTADO 
        //e.NRO_DOC
        //NOM_ACTA 
        //USUARIO 
        //FEC_REG 
        //VAL_PAGO
        //JSON.stringify(e);
        return e;
    };
   var _iniElements = function () {
       var user = ActaInicio.getUser();
       codCon = ActaInicio.getCodCon();
       IdActa = ActaInicio.getIdActa();
       if (codCon != null && IdActa!=null) {
           //$("#txtNumero").val(codCon);
            //AbrirSol();
         }
    };
   var _createElements = function () {
         $("#TituloForm").html(TituloForm);
        //Crea Tabs y Botones de Control
        tema = ActaInicio.config.theme;
   };
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
           url: urlToAbrir,
           data: byaPage.JSONtoString(parametrosJSON),
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           async: false,
           beforeSend: function () {
               $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "Abriendo Solicitud.... ", tipo: "info" });
           },
           success: function (result) {
               var e = byaPage.retObj(result.d);
               if (e.NUM_SOL == 0) {
                   $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "Solicitud N° " + nep + " no encontrada...!!!", tipo: "warning" });
               }
               else {
                   $("#txtIDEP").val(e.COD_EP);
                   $("#txtNSol").val(e.COD_SOL);
                   $("#txtObjCon").val(e.OBJ_SOL);
                        
                   //$("#txtFecRec").val(byaPage.JSONFechaShortX(e.FEC_RECIBIDO));
                   //console.log("Valor TEXTO:" + byaPage.JSONFechaShortX(e.FEC_RECIBIDO));
                   //e.FEC_RECIBIDO =$('#txtFecRec').jqxDateTimeInput('value');
                   $("#CboDepSol").val(e.DEP_SOL);
                   $("#CboDepSup").val(e.DEP_SUP);
                   $("#CboTip").val(e.TIP_CON);
                   $("#CboMod").val(e.COD_TPRO);

                   $("#txtNSol").val(e.COD_SOL);
                   $("#CboSubTip").val(e.STIP_CON);
                   //e.VIG_SOL = 2013;  //$("#CboVig").val();
                   $("#CboDepDel").val(e.DEP_PSOL);
                   $("#txtValTot").byaSetDecimal(e.VAL_CON);
                   //$("#txtFun").val(e.NOM_ABOG_ENC);
                   sw = true;
                   if (e.COD_EP != null) {
                       $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "No se puede editar la solicitud, esta asociada a un Estudio Previo", tipo: "info" });
                       $("#editarButton").byaSetHabilitar(false);
                       
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
 
   return {
       formulario: '#form1',
       config: {
           theme: null,
           oper: null
       },
       getCodCon: function () {
           return $.getUrlVar('cod_con');
       },
       getIdActa: function () {
           return $.getUrlVar('idacta');
       },
       getUser: function () {
           return byaSite.getUsuario();
       },
       ValidarEL: function () {
           $(this.formulario).jqxValidator('validate');
       },
       _createValidacionEL: function (fnOk) {
           $(this.formulario).jqxValidator(
           {
               onSuccess: fnOk,
               hintType: 'label',
               onError: function () {
                   $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Los datos no son válidos!!!", tipo: false });
               },
               rules: [
                   { input: '#txtObjCon', message: 'Debe especificar el objeto!', action: 'keyup, blur', rule: 'required' }
               ]
           });
       },
       init: function () {
           _createElements();
           _addHandlers();
           //_reset();
          ActaInicio.Nuevo();
           _iniElements();
       },
       validar: function () {
           alert("Debe Guardar los Datos Iniciales del Estudio Previo para continuar....");
       },
       Deshabilitar: function () {
           //Deshabilita todos los controles
           //$('.formC :input').attr('disabled', true);
           //var value = false;
           //$("#CboDepDel").byaSetHabilitar(value);
       },
       Limpiar: function () {
           //Colocar Valores Por Defecto
           $('#form1')[0].reset();
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
       Nuevo: function () {
           ActaInicio.config.oper = 'nuevo';
           //ActaInicio.HabilitarN(); 
           //ActaInicio.Limpiar(); 
           ActaInicio._createValidacionEL(_guardarNuevo);
           alert("Se activo el nuevo");
       }
       
   }
} ());


$(document).ready(function () {
    ActaInicio.config.theme = byaSite.tema;
    ActaInicio.init();
});
