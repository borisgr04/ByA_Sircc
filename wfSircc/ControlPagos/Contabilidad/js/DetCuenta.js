var Acta = (function () {
    "use strict";
    var tema;
    var codCon;
    var IdActa;
    var Estado = "02";

    var urlModulo = "/ControlPagos/Contabilidad/Panel.aspx";
    var urlToTramitar = "/ControlPagos/Contabilidad/Tramitar.aspx"

    var TituloModulo  = "Contabilidad";
    var TituloForm    = "Gestión de Cuentas <small > Contabilidad</small>";
    var urlToAbrir    = "/Servicios/wsControlPagosC.asmx/GetActa";
    var urlToAbrirCon = "/Servicios/wsControlPagosC.asmx/GetContrato";
    var urlToGridCon = "/Servicios/wsControlPagosC.asmx/GetRpOp";

    var urlToRevisar = "/Servicios/wsControlPagosC.asmx/Revisar";
    var urlToRecibir = "/Servicios/wsControlPagosC.asmx/Recibir";
    var urlDetActa = "/ControlPagos/GDDocumentos/GDDocumentos.html";
    var gridCon = '#jqxgridSol';

    
    var urlPrintActa = "/ashx/generarActa.ashx?idacta=";

    var msgPpal = "#LbMsg";
    var dtInfoCon = {};
    var e = {};
    var byaRpta;
    var jsonData;
    var ejecutar;
    //Adding event listeners
    var _addHandlers = function () {

        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });

        $("#modalRecibir").on('shown.bs.modal', function () {
            $(this).find("[autofocus]:first").focus();
        });

        $('#BtnRecibir').click(function () {
            _mostrarRecibir();
        });
        $('#BtnRevisar').click(function () {
            _mostrarRevisar();
        });
        $('#BtnEnviar').click(function () {
            _mostrarEnviar();
        });
       
        
        $("#txtIdActa").blur(function (event) {
            _buscarActas();
        });
        $("#BtnBuscar").click(function (event) {
            _buscarActas();
        });
        $("#BtnGuardar").click(function (event) {
            ejecutar();
        });

        $("#BtnTramitar").click(function (event) {
            _tramitar();
        });

        
        
    };
    //METODOS PRIVADOS
    var _Detalle = function () {
        $.get(urlDetActa, function (data) {
            $("#secDetalle").html(data);
            Pag.config.theme = byaSite.tema;
            Pag.setIde_Inf(33);
            Pag.setCod_Con("2012020024");
            Pag.init();
        });
    };
    var _tramitar = function () {
        byaPage.AbrirPagina(urlToTramitar + "?idacta=" + $("#txtIdActa1").val() + "&id_ctrdoc=" + e.INT_CONTROL_DOC1.ID);
    };


    var _mostrarEnviar = function () {
        $("#BtnGuardar").text("Enviar");
        $('#modalRecibir').modal('show');
    };
    var _mostrarRevisar = function () {
        $("#BtnGuardar").text("Revisar");
        $('#modalRecibir').modal('show');
        if (e.INT_CONTROL_DOC1 != null) {
            $("#txtIdRecCD").val(e.INT_CONTROL_DOC1.ID);
            if (e.INT_CONTROL_DOC1.EST_DOC == "AC" || e.INT_CONTROL_DOC1.EST_DOC == "DE") {//ya se reviso
                $("#txtFec").val(byaPage.converJSONDate(e.INT_CONTROL_DOC1.FEC_REV));
                $("#txtEstCD").val(e.INT_CONTROL_DOC1.EST_DOC);
                $("#txtObs").val(e.INT_CONTROL_DOC1.OBS_REV);

                $("#BtnGuardar").byaSetHabilitar(false);
                HabilitarCaptura(false);
                
            } else {
                $("#BtnGuardar").byaSetHabilitar(true);
                HabilitarCaptura(true);
                ejecutar = _guardarRevisar;
                MostrarFechaHoy();
            }
        }
    };
    var _ocultarRevisar = function () {
        $('#modalRecibir').modal('hide');
    }
    var _mostrarRecibir = function () {
        $("#BtnGuardar").text("Recibir");

        if (e.INT_CONTROL_DOC1 != null) {
            $("#BtnGuardar").byaSetHabilitar(false);
            HabilitarCaptura(false);
            $("#txtIdRecCD").val(e.INT_CONTROL_DOC1.ID);
            $("#txtFec").val(byaPage.converJSONDate(e.INT_CONTROL_DOC1.FEC_REC));
            $("#txtEstCD").val(e.INT_CONTROL_DOC1.EST_DOC);
            $("#txtObs").val(e.INT_CONTROL_DOC1.OBS_REC);
        } else {
            $("#txtIdRecCD").val('');
            $("#txtFecRecCD").val('');
            $("#txtEstCD").val('');
            $("#txtObsCD").val('');
            ejecutar = _guardarRecibir;
            HabilitarCaptura(true);
            MostrarFechaHoy();
        }

        
        $('#modalRecibir').modal('show');

    };
    var MostrarFechaHoy = function () {
        var now = new Date();
        var f = byaPage.FechaShortX(now);
        $("#txtFec").val(f);
    };

    var HabilitarCaptura = function (v) {
        
        $("#BtnGuardar").byaSetHabilitar(v);
        $("#txtObs").byaSetHabilitar(v);
        $("#txtFec").byaSetHabilitar(v);
    };
    var _ocultarRecibir = function () {
        $('#modalRecibir').modal('hide');
    };
    var _buscarActas = function () {
        

        Abrir();
        
        _Detalle();
    };
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
        
        
        Acta.Limpiar();
        $(Acta.formulario).jqxValidator('hide');
    }
    var Abrir = function () {
        if (_Abrir()) {
            _AbrirCon();
            _createGridCon();
            
        }
    };
    var Editar = function () {
        /*
        Acta._createValidacionEL(_guardarMod);
        $(msgPpal).msgBox({ titulo: "Registro de Nueva Solicitud", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        */
    };

    
    var _guardarRecibir = function () {
        jsonData = "{'Reg':" + JSON.stringify(getDatosRecibir()) + "}";
        byaPage.POST_Sync(urlToRecibir, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            
            if (!byaRpta.Error) {
                $(msgPpal).msgBox({ titulo: "Recepción de Documentos", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
            } else {
                $(msgPpal).msgBox({ titulo: "Recepción de Documentos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                
            }
            _ocultarRecibir();
            Abrir();
        });
    };
    var _guardarRevisar =function () {
        var byaRpta = {};
        var jsonData = "{'Reg':" + JSON.stringify(getDatosRevisar()) + "}";
        byaPage.POST_Sync(urlToRevisar, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Devolución de Documentos", mensaje: byaRpta.Mensaje , tipo: !byaRpta.Error });
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
    var getDatosRecibir = function () {
        var oDto = {};
        oDto.IDACTA = $("#txtIdActa").val();
        oDto.FEC_REC = $("#txtFec").val();
        oDto.OBS_REC = $("#txtObs").val();
        return oDto;
    };
    var getDatosRevisar = function () {
        var oDto = {};
        oDto.IDACTA = $("#txtIdActa").val();
        oDto.ID = $("#txtIdRecCD").val();
        oDto.FEC_REV = $("#txtFec").val();
        oDto.OBS_REV = $("#txtObs").val();
        return oDto;
    };
    var _iniElements = function () {
       var user = Acta.getUser();
       codCon = Acta.getCodCon();
       IdActa = Acta.getIdActa();
       if (codCon != null){
           if (IdActa != null) {
               alert("editar");
           }
           else {
               _nuevo();
           }
         }
   };
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
        
        var idacta = Acta.getIdActa();
        if (idacta!=null) {
            $("#txtIdActa").val(idacta);
            _buscarActas();
        }
        
       $("#HeadRutaModulo").html("<a href='" + urlModulo + codCon + "'><i class='icon-dashboard'></i>" + TituloModulo + "</a>");
       $("#HeadRutaPagina").html("<i class='icon-file-alt'></i>" + TituloForm);
       $("#TituloForm").html(TituloForm);
        tema = Acta.config.theme;
   };
    var _Abrir= function () {
       var sw = false;
       IdActa = $("#txtIdActa").val();
       if (IdActa == "") {
           $(msgPpal).msgBox({ titulo: "Recepción de Cuentas", mensaje: "Por favor Digite un Número de Acta o Autorización de Pago...!!!", tipo: false });
           $("#txtIdActa").focus();
           return false;
       }
       var parametrosJSON = { IdActa: IdActa };
       $.ajax({
           type: "POST",
           url: urlToAbrir,
           data: byaPage.JSONtoString(parametrosJSON),
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           async: false,
           beforeSend: function () {
               //$(msgPpal).msgBox({ titulo: "Abrir Autorización de Pagos", mensaje: "Abriendo .... ", tipo: "info" });
           },
           success: function (result) {
               e= byaPage.retObj(result.d);
               if (e.ID == 0) {
                   $(msgPpal).msgBox({ titulo: "Control de Documentos", mensaje: "Documento N° " + IdActa + " no encontrada...!!!", tipo: "warning" });
               }
               else {
                   //por defecto estan deshabilitado
                   $("#BtnRevisar").byaSetHabilitar(false);
                   $("#BtnTramitar").byaSetHabilitar(false);
                   $("#BtnRecibar").byaSetHabilitar(true);

                   $("#txtIdActa1").val(e.ID);
                   $("#txtFecAct").val(byaPage.converJSONDate(e.FEC_ACT));
                   //alert("Falta refactorizar autorizar pago");
                   $("#txtDoc").val(e.NOM_ACTA);
                   $("#txtAutPag").val("SI");
                   $("#txtValPago").byaSetDecimal(e.VAL_PAGO);
                   sw = true;
                   if (e.INT_CONTROL_DOC1 != null) {
                       if (e.INT_CONTROL_DOC1.EST_DOC == "DE") {//ya se reviso
                           $("#BtnRevisar").byaSetHabilitar(true);
                       } else if (e.INT_CONTROL_DOC1.EST_DOC == "AC") {//ya se reviso
                           $(msgPpal).msgBox({ titulo: "Control Documentos", mensaje: " puede Realizar una devolución o continuar con el tramite ", tipo: "info" });
                            $("#BtnTramitar").byaSetHabilitar(true);
                       }
                       else {
                           $(msgPpal).msgBox({ titulo: "Control Documentos", mensaje: " puede Realizar una devolución o continuar con el tramite ", tipo: "info" });
                           $("#BtnRevisar").byaSetHabilitar(true);
                           $("#BtnTramitar").byaSetHabilitar(true);
                       }
                   } else {
                       $(msgPpal).msgBox({ titulo: "Control Documentos", mensaje: " Debe Recepcionar el documento " , tipo: "info" });
                       $("#BtnRevisar").byaSetHabilitar(false);
                       $("#BtnTramitar").byaSetHabilitar(false);
                   }
               }
           },
           error: function (jqXHR, status, error) {
               alert(error + "-" + jqXHR.responseText);
           }
       });
       return sw;
   };
    var _AbrirCon = function () {
       var sw = false;
       IdActa = $("#txtIdActa").val();
       if (IdActa == "") {
           $(msgPpal).msgBox({ titulo: "Consulta de Contratos", mensaje: "no se especificó ningun ID  de documento", tipo: false });
           return false;
       }
       var parametrosJSON = { "IdActa": IdActa };
       $.ajax({
           type: "POST",
           url: urlToAbrirCon,
           data: byaPage.JSONtoString(parametrosJSON),
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           async: false,
           beforeSend: function () {
               //$(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "Abriendo Contrato.... ", tipo: "info" });
           },
           success: function (result) {
               var e = byaPage.retObj(result.d);
               //alert(JSON.stringify(e));
               if (e.Numero == 0) {
                   $(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "No encontró Contrato relacionado a Documento N° [" + IdActa + "] ...!!!", tipo: "warning" });
               }
               else {
                   $("#txtCodCon").val(e.Numero);
                   $("#txtObjCon").val(e.Objeto);
                   $("#txtValTot").byaSetDecimal(e.Valor_Contrato);
                   $("#txtDepSol").val(e.DependenciaNec);
                   $("#txtEstado").val(e.Estado);
                   $("#txtContratista").val(e.Ide_Contratista + "-" + e.Contratista);
                   $("#txtSupervisor").val(e.Ide_Interventor + "-" + e.Nom_Interventor);
               }
           },
           error: function (jqXHR, status, error) {
               alert(error + "-" + jqXHR.responseText);
           }
       });
       return sw;
    };

    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'NRO_RP' },
                    { name: 'COD_CON' },
                    { name: 'FEC_RP', type:'date' },
                    { name: 'VIGENCIA' },
                    { name: 'DOC_SOP' },
                    { name: 'VAL_RP' },
                    { name: 'VAL_PAGO' },
                    { name: 'VIG_CDP' },
                    { name: 'NRO_CDP' },
                    { name: 'VIG_OP' },
                    { name: 'NRO_OP' }
            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'IdActa': IdActa }
        };
        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }

        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        // initialize jqxGrid

        
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: Acta.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'NRO_RP ', datafield: 'NRO_RP', width: 150 },
                        { text: 'FEC_RP', datafield: 'FEC_RP', width: 150 },
                        { text: 'VIGENCIA', datafield: 'VIGENCIA', width: 150 },
                        { text: 'DOC_SOP', datafield: 'DOC_SOP', width: 150 },
                        { text: 'VAL_RP', datafield: 'VAL_RP', width: 150 },
                        { text: 'VIG_CDP', datafield: 'VIG_CDP', width: 150 },
                        { text: 'NRO_CDP', datafield: 'NRO_CDP', width: 150 },
                        { text: 'VIG_OP', datafield: 'VIG_OP', width: 150 },
                        { text: 'NRO_OP', datafield: 'NRO_OP', width: 150 }
                        ]
                    });
    }
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
       getId:   function () {
           return $.getUrlVar('id');
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
