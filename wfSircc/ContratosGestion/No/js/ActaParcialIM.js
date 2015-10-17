var Acta = (function () {
    "use strict";
    var tema;
    var codCon;
    var IdActa;
    var Estado = "02";
    var TituloForm = "Gestión de Contratos <small > Actas de Inicio</small>";
    var urlToGuardarNuevo = "/Servicios/wsContratosGestionS.asmx/InsertActaParcialIM";

    var urlToGuardarMod = "/Servicios/wsContratosGestionS.asmx/UpdatePSolicitud";
    var urlToAbrir = "/Servicios/wsContratosGestionS.asmx/GetSolicitud";
    var urlGetInfoCon = "/Servicios/wsContratosGestionS.asmx/GetInfoCon";
    var urlPrintActa = "/ashx/generarActa.ashx?idacta=";
    var msgPpal = "#LbMsg";
    var dtInfoCon = {};
    var byaRpta;
    var jsonData;
    //Adding event listeners
    var _addHandlers = function () {
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#guardarButton").click(function (event) {
            Acta.ValidarEL();
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
                Acta.config.oper = 'cancelar';
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
        
        $("#txtIdActa").byaSetHabilitar(true);
        
        Acta.Deshabilitar();
        Acta.Limpiar();
        $(Acta.formulario).jqxValidator('hide');
    }
    var AbrirSol = function () {
        if (_AbrirSol($("#txtIdActa").val())) {
            //$("#LbMsg").html("Listo...!!! Si desea modificar debe presionar el boton Editar, realizar los cambios y presione el Botón Guardar.");
            $("#cancelarButton").byaSetHabilitar(false);
            $("#guardarButton").byaSetHabilitar(false);
            $("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(true);
            $("#abrirButton").byaSetHabilitar(false);

            $("#txtIdActa").byaSetHabilitar(false);
            
            Acta.Deshabilitar();
        } else {
            $("#cancelarButton").byaSetHabilitar(false);
            $("#guardarButton").byaSetHabilitar(false);
            $("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(false);
            $("#abrirButton").byaSetHabilitar(true);
            
            $("#txtIdActa").byaSetHabilitar(false);
            
        }

    };
    var Editar = function () {
        /*$("#nuevoButton").byaSetHabilitar(false);
        $("#abrirButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#txtNumero").byaSetHabilitar(false);
        Acta.config.oper = 'editar';
        Acta.HabilitarE();
        Acta.disabled = false;
        Acta._createValidacionEL(_guardarMod);
        $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        */
    };
    var _guardarNuevo = function () {
        jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                IdActa = byaRpta.id;
                txtIdActa.val(byaRpta.id);
                //$("#txtNSol").val(byaRpta.id);
                Acta.Deshabilitar();
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

    var _nuevo = function () {
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#imprimirButton").byaSetHabilitar(false);
        var now = new Date();
        $("#txtFecAct").val(byaPage.FechaShortX(now));
        Acta._createValidacionEL(_guardarNuevo);
    };
    var getDatos = function () {
        var e = {};
        //e.FEC_FIN
        //e.ID
        e.COD_CON = Acta.getCodCon();
        //e.EST_INI =//LO CALCULA EL SISTEMA
        e.EST_FIN = Estado;

        //e.ID_ACTA = $("#txtIdActa").val();
        e.FEC_ACT = $("#txtFecAct").val();

        e.FEC_PINI = $("#txtFecIni").val();
        e.FEC_PFIN = $("#txtFecFin").val();

        e.OBS_EST = $("#txtObjAct").val();

        e.AUT_PAG = $("#CboAutPag").val();

        e.VAL_PAGO = $("#txtValPago").byaGetDecimal();

        e.IDE_INF = $("#cboInfoCon").val();
        //e.NRO_DOC
        
        return e;
    };
   var _iniElements = function () {
       var user = Acta.getUser();
       codCon = Acta.getCodCon();
       IdActa = Acta.getIdActa();
       if (codCon != null){
           if (IdActa != null) {
               alert("editar");
               //Abrir y editar
           }
           else {
               //alert("nuevo");
               _nuevo();
           }
           //$("#tabACTAS").tab();
           
           dtInfoCon = byaPage.getSource(urlGetInfoCon, { cod_con: codCon });

           $("#cboInfoCon").byaCombo({
               DataSource: dtInfoCon, placeHolder: 'Seleccione...', Display: "ID_PERIODO", Value: "ID"
           });
           
         }
   };
   $("#cboInfoCon").change(function () {
       var item = _getItem($("#cboInfoCon").val());
       if (item != null) {
           $("#txtFecIni").val(byaPage.converJSONDate(item.FEC_INI));
           $("#txtFecFin").val(byaPage.converJSONDate(item.FEC_FIN));
           $("#txtValPago").byaSetDecimal(item.VAL_PAG);
           $("#txtDES_INF").val(item.DES_INF);
           var ap = item.VAL_PAG > 0 ? "SI" : "NO";
           $("#CboAutPag").val(ap);
       }
       else {
           $("#txtFecIni").val('');
           $("#txtFecFin").val('');
           $("#txtValPago").byaSetDecimal(0);
           $("#CboAutPag").val("NO");
           $("#txtDES_INF").val('');
       }

   });
   var _getItem = function (key) {
       var found = null;
       $.each(dtInfoCon, function (index, item) {
           if (item.ID == key) {
               found = item;
               return;
           }
       });
       return found;
   };
   var _createElements = function () {
         $("#TituloForm").html(TituloForm);
        tema = Acta.config.theme;
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
       getIdActa:   function () {
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
                   { input: '#txtObjAct', message: 'Debe especificar el objeto!', action: 'keyup, blur', rule: 'required' }
               ]
           });
       },
       init: function () {
           _createElements();
           _addHandlers();
           //_reset();
           _iniElements();
       }
     
   }
} ());


$(document).ready(function () {
    Acta.config.theme = byaSite.tema;
    Acta.init();
});
