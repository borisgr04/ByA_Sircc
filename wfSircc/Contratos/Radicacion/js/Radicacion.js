var Radicacion = (function () {
    "use strict"
    //seccion de URL
    var urlSourceEst = '/servicios/wsDatosBasicos.asmx/GetvEP_ESTADOS';

    var urlModalTerceros = "/DatosBasicosG/Terceros/Tercerosh.html";
    var urlSourceDep     = '/servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAT';
    var urlSourceDepS    = '/servicios/wsDatosBasicos.asmx/GetvDEPENDENCIA';
    var urlSourceDepD    = '/servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD';
    var urlSourceTip     = '/servicios/wsDatosBasicos.asmx/GetvTIPOSCONT';
    var urlSourceMod     = '/servicios/wsDatosBasicos.asmx/GetvModalidad';
    var urlSourcePla     = '/servicios/wsDatosBasicos.asmx/GetvTIPO_PLAZOS';
    var urlSourcePlazos2 = '/servicios/wsDatosBasicos.asmx/GetvTIPO_PLAZOS2';
    var urlSourceTer     = "/Servicios/wsDatosBasicos.asmx/GetNomTercerosPk";
    var urlSourceSubTip  = '/servicios/wsDatosBasicos.asmx/GetvSUBTIPOS';
    var urlGetEstPrev = "/Servicios/CT_Radicacion/ws_ct_radicacion.asmx/GetEstPrev";
    var urlGetContratos = "/Servicios/CT_Radicacion/ws_ct_radicacion.asmx/GetContratos";
    var urlGetUltimos = "/Servicios/CT_Radicacion/ws_ct_radicacion.asmx/GetUltimos";

    
    var urlToInsert = "/Servicios/CT_Radicacion/ws_ct_radicacion.asmx/Insert";
    var urlToUpdate = "/Servicios/CT_Radicacion/ws_ct_radicacion.asmx/Update";
    var urlToCompletarContrato = "/Servicios/CT_Radicacion/ws_ct_radicacion.asmx/CompletarContrato";
    
    var sourceUltimos;
    
    
    var editarButton = $("#editarButton");
    var nuevoButton = $("#nuevoButton");
    var abrirButton = $("#abrirButton");
    var guardarButton = $("#guardarButton");
    var cancelarButton = $("#cancelarButton");
    var imprimirButton = $("#imprimirButton");
    var diligenciarButton = $("#diligenciarButton");

    var itsSave = false;
    var dtoEstPrev = {};
    var byaRpta;
    var Tip_Rad;
    var theme;
    var tema;
    var msgPpal = "#LbMsg";
    var _genAnticipo = function () {
        var dataRecord = null;
        var porc = $("#txtAnti_Porc").byaGetDecimal();
        var ValTot = $("#txtValTot").byaGetDecimal();
        if (porc > 0) {
            var Cond = $("#txtCondGenFP").val();
            var valor = parseFloat(ValTot);
            var anticipo = valor * porc / 100;
            $("#txtAnti_Val").byaSetDecimal(anticipo);
            var dataRecord;
            dataRecord = new Object();
            dataRecord.ORD_FPAG = 1;
            dataRecord.CAN_PAG = 1;
            dataRecord.TIP_FPAG = "AN";
            dataRecord.NOM_TIP_FPAG = "ANTICIPO";
            dataRecord.VAL_FPAG = anticipo.toFixed(2);
            dataRecord.POR_FPAG = parseFloat(porc).toFixed(2);
            dataRecord.CON_FPAG = Cond;
            dataRecord.PGEN_FPAG = "S";
            dataRecord.ES_NUEVO = true;
            dataRecord.ES_ANULAR = false;
        }
        return dataRecord;
    };
    var _genFP = function () {
        var tp = $("#cboFPagoTipo").val();
        if (tp == "PM") {
            $("#btnAgregarFP").byaSetHabilitar(false);
            _generarPagoMensual();
            $("#btnAbrirGenFP").byaSetHabilitar(true);
        }
        if (tp == "PU") {
            $("#btnAgregarFP").byaSetHabilitar(false);
            _generarPagoUnico();
            $("#btnAbrirGenFP").byaSetHabilitar(true);
        }
        if (tp == "PP") {
            $("#btnAgregarFP").byaSetHabilitar(true);
            _generarParcial();
            $("#btnAbrirGenFP").byaSetHabilitar(false);
        }
    };
    var _generarParcial = function () {
        var dsFormPago;
        var valor = $("#txtValTot").byaGetDecimal();
        dsFormPago = new Array();
        var i = 0;
        var dataRecord;
        dataRecord = _genAnticipo();
        if (dataRecord != null) {
            dsFormPago[i] = dataRecord;
            i = i + 1;
            valor = valor - dataRecord.VAL_FPAG;
        }
        Radicacion.setFORMAPAGO(dsFormPago);
        admFP.setDATOS(dtoEstPrev.l_EP_FORMA_PAGO);
    };
    var _generarPagoUnico = function (i) {
        var dsFormPago;
        var valor = $("#txtValTot").byaGetDecimal();
        dsFormPago = new Array();
        var i = 0;
        var dataRecord;
        dataRecord = _genAnticipo();
        var porc = 100;
        if (dataRecord != null) {
            dsFormPago[i] = dataRecord;
            i = i + 1;
            //valor = valor - dataRecord.VAL_FPAG;
            //porc = porc - dataRecord.POR_FPAG;
        }
        //generar pago único
        dataRecord = new Object();
        var Cond = $("#txtCondGenFP").val();
        var valor = parseFloat(valor);
        dataRecord.ORD_FPAG = 1;
        dataRecord.CAN_PAG = 1;
        dataRecord.TIP_FPAG = "PU";
        dataRecord.NOM_TIP_FPAG = "PAGO ÚNICO";
        dataRecord.VAL_FPAG = valor.toFixed(2);
        dataRecord.POR_FPAG = porc.toFixed(2);
        dataRecord.CON_FPAG = Cond;
        dataRecord.PGEN_FPAG = "S";
        dataRecord.ES_NUEVO = true;
        dataRecord.ES_ANULAR = false;
        dsFormPago[i] = dataRecord;
        Radicacion.setFORMAPAGO(dsFormPago);
        admFP.setDATOS(dtoEstPrev.l_EP_FORMA_PAGO);
    };
    var _generarPagoMensual = function (i) {
        var dsFormPago;
        var valor = $("#txtValTot").byaGetDecimal();
        var valorTotal = $("#txtValTot").byaGetDecimal();
        dsFormPago = new Array();
        var i = 0;
        var dataRecord;
        dataRecord = _genAnticipo();
        var porc = 100;
        if (dataRecord != null) {
            dsFormPago[i] = dataRecord;
            i = i + 1;
            //valor = valor - dataRecord.VAL_FPAG;
            //porc = porc - dataRecord.POR_FPAG;
        }        
        dtoEstPrev.PLAZ1_EP = $("#TxtPlazo1").val();
        dtoEstPrev.TPLA1_EP = $("#CboTPlazo1").val();
        dtoEstPrev.PLAZ2_EP = $("#TxtPlazo2").val();
        dtoEstPrev.TPLA2_EP = $("#CboTPlazo2").val();
        var dias = 0;
        if (dtoEstPrev.TPLA1_EP == "A") {
            dias = (parseFloat(dtoEstPrev.PLAZ1_EP) * 360);
            if (dtoEstPrev.TPLA2_EP == "M") {
                dias = dias + (parseFloat(dtoEstPrev.PLAZ2_EP) * 30);
            }
            if (dtoEstPrev.TPLA2_EP == "D") {
                dias = dias + (parseFloat(dtoEstPrev.PLAZ2_EP));
            }
        }
        if (dtoEstPrev.TPLA1_EP == "M") {
            dias = parseFloat(dtoEstPrev.PLAZ1_EP * 30)
            if (dtoEstPrev.TPLA2_EP == "D") {
                dias = dias + (parseFloat(dtoEstPrev.PLAZ2_EP));
            }
        }
        if (dtoEstPrev.TPLA1_EP == "D") {
            dias = dtoEstPrev.PLAZ1_EP;
        }
        $("#result").html('Cantidad Dias:<b/>' + dias + '</b><br>');
        var valordia = parseFloat(valor) / dias;
        $("#result").append('   -  Valor Dia:<b>' + valordia.toFixed(2) + '</b>');
        var valormes = valordia * 30;
        $("#result").append('   -  Valor Mes:<b>' + valormes.toFixed(2) + '</b>');

        //alert('Cantidad Dias:<b/>' + dias + '</b><br>' + '   -  Valor Dia:<b>' + valordia.toFixed(2) + '</b>' + '   -  Valor Mes:<b>' + valormes.toFixed(2) + '</b>');

        dataRecord = new Object();
        var Cond = $("#txtCondGenFP").val();

        //var can_mes = parseFloat(dtoEstPrev.PLAZ1_EP);

        var can_mes = (dias / 30).toFixed();
        var dias_restantes = dias - (can_mes * 30);        
        /// valor
        var porc_mes = 0;
        if (can_mes > 0) {
            porc_mes = (valormes * can_mes) / valorTotal * 100;
            dataRecord.ORD_FPAG = 1;
            dataRecord.CAN_PAG = can_mes;
            dataRecord.TIP_FPAG = "PM";
            dataRecord.NOM_TIP_FPAG = "PAGOS MENSUALES";
            dataRecord.VAL_FPAG = valormes.toFixed(2);
            dataRecord.POR_FPAG = porc_mes.toFixed(2);
            dataRecord.CON_FPAG = Cond;
            dataRecord.PGEN_FPAG = "S";
            dataRecord.ES_ANULAR = false;
            dataRecord.ES_NUEVO = true;
            dsFormPago[i] = dataRecord;
        }

        if (dias_restantes > 0) {
            var pagoFinal = parseFloat(dias_restantes) * valordia;
            var pagoD = " Un Pago Final de " + pagoFinal;
            dataRecord = new Object();
            dataRecord.CAN_PAG = 1;
            dataRecord.ORD_FPAG = 2;
            dataRecord.TIP_FPAG = "PF";
            dataRecord.NOM_TIP_FPAG = "PAGO FINAL";
            dataRecord.VAL_FPAG = pagoFinal.toFixed(2);
            dataRecord.POR_FPAG = (100 - porc_mes).toFixed(2);
            dataRecord.CON_FPAG = Cond;
            dataRecord.PGEN_FPAG = "S";
            dataRecord.ES_ANULAR = false;
            dataRecord.ES_NUEVO = true;
            i = i + 1;
            dsFormPago[i] = dataRecord;
        }
        Radicacion.setFORMAPAGO(dsFormPago);
        admFP.setDATOS(dtoEstPrev.l_EP_FORMA_PAGO);
    };
    var _addHandlers = function () {
        $("#btnCompletado").click(function () {
            GuardarCompletado();
        });
        $("#BtnBuscCon").click(function () {
            $.get(urlModalTerceros, function (data) {
                $("#secBsqTerceros").html(data);
                mTerceros.showWindow(function (item) {
                    $("#TxtIdeCon").val(item.IDE_TER);
                    $("#TxtNomCon").val(item.NOMBRE);
                    if (item.TIP_PER == "PN") {
                        $("#TxtIdeRep").val(item.IDE_TER);
                        $("#TxtNomRep").val(item.NOMBRE);
                    }
                });
            });
        });
        $("#BtnBuscRep").click(function () {
            $.get(urlModalTerceros, function (data) {
                $("#secBsqTerceros").html(data);
                mTerceros.showWindow(function (item) {
                    $("#TxtIdeRep").val(item.IDE_TER);
                    $("#TxtNomRep").val(item.NOMBRE);
                });
            });
        });
        $("#cboFPagoTipo").change(function () {
            if ($("#cboFPagoTipo").val() == 'PP') {
                $("#btnAgregarFP").byaSetHabilitar(true);
            }
            else {
                $("#btnAgregarFP").byaSetHabilitar(false);
            }
            _genFP();

        });
        $("#TxtPlazo1").change(function () {
            _genFP();
        });
        $("#TxtPlazo2").change(function () {
            _genFP();
        });
        $("#txtAnti_Porc").blur(function () {
            if ($("#txtAnti_Porc").byaGetDecimal() <= 100) {
                _genFP();
                $('.currency').formatCurrency();
            } else {
                alert("El porcentaje de anticipo no puede ser mayor a 100");
                $("#txtAnti_Porc").byaSetDecimal(0);
                $("#txtAnti_Porc").focus();
            }
        });
        $("#BtnGenFP").click(function (event) {
            $("#modalGenFP").modal("hide");
            _genFP();
        });

        $("#txtAnti_Val").blur(function () {
            if ($("#txtAnti_Val").byaGetDecimal() <= $("#txtValTot").byaGetDecimal()) {
                var value = $("#txtAnti_Val").byaGetDecimal() / $("#txtValTot").byaGetDecimal() * 100;
                $("#txtAnti_Porc").val(value);
                _genFP();
                $('.currency').formatCurrency();
            } else {
                alert("El anticipo no puede ser mayor al valor del contrato");
                $("#txtAnti_Val").byaSetDecimal(0);
                $("#txtAnti_Val").focus();
            }
        });





        //inicio handlers
        $("#txtNumero").blur(function (event) {
            var l=$("#txtNumero").val().length;
            if(l>=1 && l<=4){
                var nro=parseInt($("#txtNumero").val());
                $("#txtNumero").val(byaSite.getVigencia() + $("#CboTip").val() + nro.padLeft(4, "0"));
            }
            if($("#txtNumero").val().length==10){
                AbrirCTO();
            }
            //AbrirEP();
            
        });
        editarButton.click(function (event) {
            if (Tip_Rad == 'M')  {
                if (dtoEstPrev.EST_CON != '00') Editar();
                else $(msgPpal).msgBox({ titulo: "Radicación de Contratos", mensaje: "El contrato ya se ha completado y no puede ser modificado", tipo: false });
            }
            else $(msgPpal).msgBox({ titulo: "Radicación de Contratos", mensaje: "El contrato no puede ser modificado, ya que se creo de manera automatica", tipo: false });
        });
        nuevoButton.click(function (event) {
            itsSave = false;
            nuevo();
        });
        abrirButton.click(function (event) {
            itsSave = false;
            AbrirCTO();
            //AbrirEP();
        });
        $("#BtnAbrirdeEP").click(function () {
            AbrirEP();
        });
        $("#btnGuardarN").click(function () {
            GuardarNuevo();
        });
        $("#btnGuardarP").click(function () {
            GuardarPlantilla();
        });
        $("#btnAbrirP").click(function () {
            $('#modalPlantilla').modal('show');
        });

        var verTerceros = function () {
            $('#modalTerceros').modal('show');
        };


        guardarButton.click(function (event) {

        

            byaMsgBox.confirm("Desea guardar los Cambios?", function (result) {
                if (result) {
                    if (_esValidoContrato()) {
                        if (Radicacion.config.oper == 'editar') {
                            GuardarMod();
                        } else {

                            GuardarNuevo();
                        }
                    }
                }
            });
            

            //AbrirEP();
            //Radicacion.ValidarEL();
        });
        cancelarButton.click(function (event) {
            Radicacion.config.oper = 'cancelar';
            if (confirm("Desea cancelar la operación?")) {
                /*
                nuevoButton.byaSetHabilitar(true);
                abrirButton.byaSetHabilitar(true);
                editarButton.byaSetHabilitar(false);

                guardarButton.byaSetHabilitar(false);
                cancelarButton.byaSetHabilitar(false);
                imprimirButton.byaSetHabilitar(false);

                $('#form1')[0].reset();
                Radicacion.Deshabilitar();
                Radicacion.Limpiar();
                
                $("#CboTip").val('02');
                Radicacion.RefreshCboSubTip();
                showUltimos();

                $('#form1').jqxValidator('hide');
                $('#form1').jqxValidator();
                */
                window.location.reload();
            }
        });
        imprimirButton.click(function (event) {
            alert("Imprimir");
            byaSite.AbrirPagina("/ashx/descEP.ashx?id_ep=" + Radicacion.TxtID.val());
        });
        //fin handlers

        $('.currency').byaSetDecimal(0);
        ////que todos los que tengan formato currency
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });

        //Manejo de Modal Popup
        $("#btnBuscarC").click(function () {

            ModTer.showWindow(function (ter) {
                $("#TxtNomFun").val(ter.NOMBRE);
                $("#TxtIdeFun").val(ter.IDE_TER);
            });

        });

        $("#btnBuscarR").click(function () {

            ModTer.showWindow(function (ter) {
                $("#TxtNomRes").val(ter.NOMBRE);
                $("#TxtIdeRes").val(ter.IDE_TER);
            });

        });


        $('#CboTPlazo1').change(function (event) {
            var args = event.args;
            var item = $('#CboTPlazo1').val();
            if (item != null) {
                Radicacion.RefreshCboTPlazo2($('#CboTPlazo1').val());
            }
            _genFP();
        });
        $("#CboTPlazo2").change(function () {
            _genFP();
        });

        //Al seleccionar
        $('#CboTip').change(function (event) {
            Radicacion.RefreshCboSubTip();
            showUltimos();
        });

        $('#TxtIdeFun').blur(function () {

            Radicacion.BuscarTercero($('#TxtIdeFun'), $('#TxtNomFun'));
        });

        $('#TxtIdeRes').blur(function () {
            Radicacion.BuscarTercero($('#TxtIdeRes'), $('#TxtNomRes'));
        });

        $('#TxtIdeCon').blur(function () {
            Radicacion.BuscarTercero($('#TxtIdeCon'), $('#TxtNomCon'));
        });
        $('#TxtIdeRep').blur(function () {
            Radicacion.BuscarTercero($('#TxtIdeRep'), $('#TxtNomRep'));
        });


        $('#TxtIdeApoTec').blur(function () {
            Radicacion.BuscarTercero($('#TxtIdeApoTec'), $('#TxtNomApoTec'));
        });

        $('#txtValTot').change(function () {
            $('#txtValProp').val($('#txtValTot').byaGetDecimal());
            $('#txtValOtros').val(0);
            _genFP();
        });
        $('#txtValProp').change(function () {
            var tot = $('#txtValTot').byaGetDecimal();
            var prop = $('#txtValProp').byaGetDecimal()
            if (prop <= tot) {
                $('#txtValOtros').val(tot - prop)
            }
            else {
                $('#txtValProp').val(0);
            }
            _genFP();
        });

        
    };
    var CompletarContrato = function () {
        var respu = byaPage.getSource(urlToCompletarContrato, { cod_con: "'" + dtoEstPrev.COD_CON + "'" });
        alert(JSON.stringify(respu));
    };
    var showUltimos = function () {
        sourceUltimos = byaPage.getSource(urlGetUltimos, { vigencia: byaSite.getVigencia(), tip_con: "'" + $("#CboTip").val() + "'" });
        if (sourceUltimos != null) {
            var fecha = byaPage.converJSONDate(sourceUltimos.FEC_SUS_CON);
            $("#dvdUltRad").html("<b>" + sourceUltimos.COD_CON + " del " + fecha + "</b>");
            $("#TxtFecSus").val(fecha);
        } else {
            $("#dvdUltRad").html("No ha Iniciado Radicación de este Tipo de documento.");
            $("#TxtFecSus").val(byaSite.getVigencia() + "-01-01");
        }
    };
    var getUltimaFecha = function () {
        if (sourceUltimos != null) {
            return byaPage.converJSONDate(sourceUltimos.FEC_SUS_CON);
        } else {
            return byaSite.getVigencia() + "-01-01";
        }
    };
    var _iniElements = function () {

        //Inicializar Usuario
        var user = Radicacion.getUser();
        $("#TxtIdeFun").val(user);
        Radicacion.BuscarTercero($("#TxtIdeFun"), $("#TxtNomFun"));
        Radicacion.RefreshCboSubTip("00");
        Radicacion.RefreshCboTPlazo2("M");
    };
    var _createElements = function () {
        tema = Radicacion.config.theme;
        //var sourceEst = byaPage.getSource(urlSourceEst);
        //$("#CboEstEP").byaCombo({ DataSource: sourceEst, Value: "COD_EST", Display: "NOM_EST" });

        //public vCONTRATOS_ULT GetUltimos(short vigencia, string tip_con) {

        //$("#CboDepSup").byaFormatInput("0123456789");

        var sourceDep = byaPage.getSource(urlSourceDep);
        $("#CboDepSup").byaCombo({ DataSource: sourceDep, Value: "COD_DEP", Display: "NOM_DEP" });

        var sourceDepS = byaPage.getSource(urlSourceDepS);
        $("#CboDepSol").byaCombo({ DataSource: sourceDepS, Value: "COD_DEP", Display: "NOM_DEP" });

        var sourceDepD = byaPage.getSource(urlSourceDepD);
        $("#CboDepDel").byaCombo({ DataSource: sourceDepD, Value: "COD_DEP", Display: "NOM_DEP" });

        var sourceTip = byaPage.getSource(urlSourceTip);
        $("#CboTip").byaCombo({ DataSource: sourceTip, Value: "COD_TIP", Display: "NOMC_TIP" });

        var sourcePla = byaPage.getSource(urlSourcePla);
        $("#CboTPlazo1").byaCombo({ DataSource: sourcePla, Value: "COD_TPLA", Display: "NOM_PLA" });

        var sourceMod = byaPage.getSource(urlSourceMod);
        $("#CboMod").byaCombo({ DataSource: sourceMod, Value: "COD_TPROC", Display: "NOM_TPROC" });


        
        admProy.init();
        admCDP.init();
        admFP.init();
        admPol.init();
        admRub.init();
        admRubros.init();
        ModTer.init();
    };    
    var GuardarNuevo = function () {
        var jsonData = "{'Reg':" + JSON.stringify(Radicacion.GetDatos()) + "}";
        
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Radicación de Contratos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                itsSave = true;
                Radicacion.SetID(byaRpta.id);
                AbrirCTO();
                //$("#txtNumero").val(byaRpta.id);
                //AbrirEP();
                //Editar();
            }
        });

    };
    var GuardarMod = function () {
        byaRpta = {};
        var jsonData = "{'Reg':" + JSON.stringify(Radicacion.GetDatos()) + "}";
        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {            
            byaRpta = byaPage.retObj(result.d);
            if (!byaRpta.Error) {
                itsSave = true;
                AbrirCTO();
            }
            $(msgPpal).msgBox({ titulo: "Radicación de Contratos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
        });
    };
    var GuardarCompletado = function () {
        if (itsSave) {
            byaRpta = {};
            var obj = Radicacion.GetDatos();
            obj.EST_CON = "00";
            var jsonData = "{'Reg':" + JSON.stringify(obj) + "}";
            byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                if (!byaRpta.Error) {
                    AbrirCTO();
                    $(msgPpal).msgBox({ titulo: "Radicación de Contratos", mensaje: byaRpta.Mensaje + "<br/>Se ha <strong>completado</strong> la radicación del contrato", tipo: !byaRpta.Error });
                }
                else {
                    $(msgPpal).msgBox({ titulo: "Radicación de Contratos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                }
            });
        }
        else {
            $(msgPpal).msgBox({ titulo: "Radicación de Contratos", mensaje: "No ha guardado la información, primero pulse <strong>Guardar</strong> y luego <strong>Completar</strong>", tipo: false });
        }
    };
    var nuevo = function () {
        nuevoButton.byaSetHabilitar(false);
        abrirButton.byaSetHabilitar(false);
        editarButton.byaSetHabilitar(false);

        guardarButton.byaSetHabilitar(true);
        cancelarButton.byaSetHabilitar(true);
        imprimirButton.byaSetHabilitar(true);
        Radicacion.config.oper = 'nuevo';
        Radicacion.Nuevo();
        Tip_Rad = "M";
        
        
        admProy.setDATOS();
        admCDP.setDATOS(new Array());
        admFP.setDATOS(new Array());
        admPol.setDATOS();
        
        
    };
    var AbrirCTO = function () {
        Radicacion.config.oper = 'abrir';
        if (Radicacion.AbrirCTO()) {
            editarButton.byaSetHabilitar(true);
            nuevoButton.byaSetHabilitar(false);
            abrirButton.byaSetHabilitar(true);
            editarButton.byaSetHabilitar(true);
            guardarButton.byaSetHabilitar(false);
            cancelarButton.byaSetHabilitar(true);
            imprimirButton.byaSetHabilitar(true);           

            //Radicacion.va
            //Solicitudes.NuevoFromEP(_guardarNuevo);
            $(msgPpal).msgBox({ titulo: "Radicación de Contratos", mensaje: "Listo...!!! Si desea modificar debe presionar el boton Editar, realizar los cambios y presione el Botón Guardar.", tipo: "info" });
        }
    };
    var AbrirEP = function () {
        Radicacion.config.oper = 'abrir';
        if (Radicacion.AbrirEP()) {
            editarButton.byaSetHabilitar(false);
            nuevoButton.byaSetHabilitar(false);
            abrirButton.byaSetHabilitar(false);
            editarButton.byaSetHabilitar(false);
            guardarButton.byaSetHabilitar(true);
            cancelarButton.byaSetHabilitar(true);
            imprimirButton.byaSetHabilitar(true);
            Tip_Rad = "A";
            
            admProy.setDATOS();
            admCDP.setDATOS();
            admFP.setDATOS();
            admPol.setDATOS();
            
            
            //Radicacion.va
            //Solicitudes.NuevoFromEP(_guardarNuevo);
            $(msgPpal).msgBox({ titulo: "Radicación de Contratos", mensaje: "Listo...!!! Si desea modificar debe presionar el boton Editar, realizar los cambios y presione el Botón Guardar.", tipo: "info" });
        }
    };
    var Editar = function () {
        Radicacion.config.oper = 'editar';
        Radicacion.HabilitarE();
        $("#TxtFecSus").byaSetHabilitar(false);
        Radicacion.disabled = false;

        nuevoButton.byaSetHabilitar(false);
        abrirButton.byaSetHabilitar(false);
        editarButton.byaSetHabilitar(false);

        guardarButton.byaSetHabilitar(true);
        cancelarButton.byaSetHabilitar(true);
        imprimirButton.byaSetHabilitar(true);
        diligenciarButton.byaSetHabilitar(true);
        Radicacion.TxtID.byaSetHabilitar(false);

        $("#btnGuardarCDP").byaSetHabilitar(false);
        $("#btnNuevoCDP").byaSetHabilitar(true);
        $("#btnGuardarRubro").byaSetHabilitar(false);
        $("#btnNuevoRubro").byaSetHabilitar(false);
        $("#txtCodRub").byaSetHabilitar(false);
        $("#txtDesRub").byaSetHabilitar(false);
        $("#txtValRub").byaSetHabilitar(false);

        if (byaSite.getIntegradoCDP()) {
            admCDP.dhBotonesModificacion(false);
            admCDP.dhBotonesDelete(true);
            $("#txtNroCDP").byaSetHabilitar(false);
            $("#txtFecCDP").byaSetHabilitar(false);
            $("#txtValCDP").byaSetHabilitar(false);
            $("#cboVigFut").byaSetHabilitar(false);
        } else {
            admCDP.dhBotonesModificacion(true);
        }
        admProy.dhEdicionProyectos(true);

        $(".inputHab").byaSetHabilitar(true);
        admPol.dhEnabled(true);
    };
    var GetDatosPlantilla = function () {
        var ep = {};
        ep.ID = dtoEstPrev.ID;
        ep.NOM_PLA_EP = $("#txtNOM_PLA_EP").val();
        return ep;
    };
    var _esValidoContrato = function () {
        var error = false;
        var cadenaCampos = "";
        //
        if ($("#CboSubTip").val() == "") {
            $("#dvdSubTip").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Identificación del contrato";
            error = true;
        } else {
            $("#dvdSubTip").removeClass("has-error");
        }
        //
        if ($("#TxtFecSus").val() == "") {
            $("#dvdFecSus").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Fecha de suscripción";
            error = true;
        } else {
            $("#dvdFecSus").removeClass("has-error");
        }
        //
        if ($("#TxtIdeCon").val() == "") {
            $("#dvdIdeCon").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Contratista";
            error = true;
        } else {
            $("#dvdIdeCon").removeClass("has-error");
        }
        //
        if ($("#TxtIdeRep").val() == "") {
            $("#dvdIdeRep").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Representante Legal";
            error = true;
        } else {
            $("#dvdIdeRep").removeClass("has-error");
        }
        //
        if ($("#CboDepSol").val() == "") {
            $("#dvdDepSol").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Dependencia solicitante";
            error = true;
        } else {
            $("#dvdDepSol").removeClass("has-error");
        }
        //
        if ($("#TxtObjCon").val() == "") {
            $("#dvdObjCon").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Objeto a Contratar";
            error = true;
        } else {
            $("#dvdObjCon").removeClass("has-error");
        } 
        //
        if ($("#CboMod").val() == "") {
            $("#dvdMod").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Modalidad de Selección";
            error = true;
        } else {
            $("#dvdMod").removeClass("has-error");
        }
        //
        if ($("#TxtNroPro").val() == "") {
            $("#dvdNroPro").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - N° de Proceso";
            error = true;
        } else {
            $("#dvdNroPro").removeClass("has-error");
        }
        //
        if ($("#CboDepDel").val() == "") {
            $("#dvdDepDel").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Dependencia delegada";
            error = true;
        } else {
            $("#dvdDepDel").removeClass("has-error");
        } 
        //
        if ($("#CboDepSup").val() == "") {
            $("#dvdDepSup").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Dependencia Supervisión";
            error = true;
        } else {
            $("#dvdDepSup").removeClass("has-error");
        }
        if (error) {
            $("#dvdMsg").addClass("alert alert-danger");
            $("#lbMsg").html("Los siguientes campos no pueden estar vacios: " + cadenaCampos);
        } else {
            $("#dvdMsg").removeClass("alert alert-danger");
            $("#lbMsg").html("");
        }
        return !error;
    };



    return {
        disabled: true,
        TxtID: null,
        config: {
            dragArea: null,
            theme: null,
            oper: null
        },
        getIntFin: function () {
            return false;
        },
        getEstPrev: function () {
            return dtoEstPrev;
        },
        setCDP: function (value) {
            dtoEstPrev.l_EP_CDP = value;
        },
        getCDP: function () {
            return dtoEstPrev.l_EP_CDP;
        },
        setFORMAPAGO: function (value) {
            dtoEstPrev.l_EP_FORMA_PAGO = value;
        },
        getFORMAPAGO: function () {
            return dtoEstPrev.l_EP_FORMA_PAGO;
        },
        getProyectos: function () {
            return dtoEstPrev.l_EP_PROYECTOS;
        },
        setProyectos: function (value) {
            dtoEstPrev.l_EP_PROYECTOS = value;
        },
        getPol: function () {
            return dtoEstPrev.l_EP_POLIZAS2;
        },
        setPol: function (value) {
            dtoEstPrev.l_EP_POLIZAS2 = value;
        },
        getDoc: function () {
            return dtoEstPrev.l_EP_CLAUSULAS;
        },
        setDoc: function (value) {
            dtoEstPrev.l_EP_CLAUSULAS = value;
        },
        getUser: function () {
            return byaSite.getUsuario();
        },
        RefreshCboTPlazo2: function (cod) {
            var sourcePlazos2 = byaPage.getSource(urlSourcePlazos2, { cod_tpla: "'" + cod + "'" });
            $("#CboTPlazo2").byaCombo({ DataSource: sourcePlazos2, Value: "COD_TPLA", Display: "NOM_PLA" });
            if (cod == "A") $("#CboTPlazo2").val("M");
            if (cod == "M") $("#CboTPlazo2").val("D");
        },
        loadPageTabs: function (tabIndex) {
            //content11: "admFPago.htm",
            var pagTab = {
                content4: "admProy.htm",
                content5: "admEspTec.htm",
                content7: "admObligC.htm",
                content8: "admObligE.htm",
                content10: "admCDP.htm",

                content13: "admCapJur.htm",
                content15: "admPol.htm",
                content16: "admMun.htm"
            };

            var pajAjax = pagTab['content' + tabIndex];

            if (typeof (pajAjax) === "undefined") {

            } else {
                $.get(pajAjax, function (data) {
                    $('#content' + tabIndex).html(data);
                });
            }
        },
        ValidarEL: function () {
            $('#form1').jqxValidator('validate');
        },
        _createValidacionEL: function (fnOk) {
            //$('#FrmEstPrev').jqxValidator(
            //{
            //    onSuccess: fnOk,
            //    onError: function () { $(msgPpal).html('Los datos no son válidos!!!'); },
            //    rules: [
            //        { input: '#TxtFecElab', message: 'Fecha de Elaboración requerida 1/1/1900 and 1/1/2013.', action: 'valuechanged', rule: function (input, commit) {
            //            var date = $('#TxtFecElab').val();
            //            /*
            //            var result = date.getFullYear() >= 1900 && date.getFullYear() <= 2013;
            //            return result;
            //            */
            //            return true;
            //        }
            //        },
            //        { input: '#TxtIdeFun', message: 'Debe especificar un responsable del Estudio Previo!', action: 'keyup, blur', rule: 'length=3,12' },
            //		{ input: '#CboTip', message: 'Debe Identificar el tipo de contrato', action: 'select', rule: function (input) {
            //		    var val = $("#CboTip").val();
            //		    return (val != "");
            //		}
            //		}
            //        ]
            //});
        },
        BuscarTercero: function (txtIde, txtNom) {
            var ide_ter = txtIde.val();
            if (ide_ter != "") {
                var source = byaPage.getSource(urlSourceTer, { ide_ter: "'" + ide_ter + "'" });
                if (source == "0") {
                    txtNom.val("");
                }
                else {
                    txtNom.val(source);
                }
            }
        },
        GetID: function () {
            return $(Radicacion.TxtID).val();
        },
        SetID: function (value) {
            $(Radicacion.TxtID).val(value);
        },
        GetGrupos: function () {
            return $("#TxtGrupos").val();
        },
        GetValProp: function () {
            return $("#txtValProp").val();
        },
        GetValOtros: function () {
            return $("#txtValOtros").val();
        },
        RefreshCboSubTip: function () {
            var cod_tip = $('#CboTip').val();
            var source = byaPage.getSource(urlSourceSubTip, { cod_tip: "'" + cod_tip + "'" });
            $("#CboSubTip").byaCombo({ DataSource: source, Value: "COD_STIP", Display: "NOMC_STIP" });
        },
        init: function () {
            this.TxtID = $("#txtNumero");
            _createElements();
            _iniElements();
            _addHandlers();
            //this.validate();
            var EP = $.getUrlVar('ep');

            if (EP) {
                Radicacion.TxtID.val(EP);
                AbrirEP();
            }
            this.Deshabilitar();
            $("#CboTip").byaSetHabilitar(true);
            $("#CboTip").val('02');


            showUltimos();
            $('#nuevoButton').byaSetHabilitar(true);
            $('#BtnDwnAbrir').byaSetHabilitar(true);
            $('#editarButton').byaSetHabilitar(false);
            $('#guardarButton').byaSetHabilitar(false);
            $('#cancelarButton').byaSetHabilitar(false);
            $('#diligenciarButton').byaSetHabilitar(false);
        },
        validar: function () {
            alert("Debe Guardar los Datos Iniciales del Estudio Previo para continuar....");
        },
        Deshabilitar: function () {
            //Deshabilita todos los controles
            $('.inputHab').byaSetHabilitar(false);
            $("#txtNumero").byaSetHabilitar(true);
            $("#CboDepSup").byaSetHabilitar(false);
            $("#CboDepSol").byaSetHabilitar(false);
          //  $("#CboTip").byaSetHabilitar(false);
            $("#CboSubTip").byaSetHabilitar(false);
            $("#TxtFecElab").byaSetHabilitar(false);
            $("#CboMod").byaSetHabilitar(false);
            $('#txtValOtros').byaSetHabilitar(false);
            $("#CboTPlazo1").byaSetHabilitar(false);
            $("#CboTPlazo2").byaSetHabilitar(false);
            $("#CboDepDel").byaSetHabilitar(false);
            $('#TxtObjCon').byaSetHabilitar(false);
            $('#TxtLugar').byaSetHabilitar(false);
            $('#txtObligE').byaSetHabilitar(false);
            $('#txtObligC').byaSetHabilitar(false);
            $('#TxtNomRep').byaSetHabilitar(false);
            $('#TxtNomCon').byaSetHabilitar(false);

            $('#txtObligC').byaSetHabilitar(false);

            $('#txtObligE').byaSetHabilitar(false);
            this.disabled = true;
        },
        Limpiar: function () {
            $('.currency').byaSetDecimal(0);
            $('#form1 :input').attr('value', '');
            $('#TxtPlazo2').val(0);
            $('#TxtPlazo1').val(0);
            $('#TxtPlazoLiq').val(4);

            $("#TxtPlazo1").val(0);
            $("#CboTPlazo1").val('M');
            $("#TxtPlazo2").val(0);
            $("#CboTPlazo2").val('D');
            $("#txtAnti_Val").val(0)

            $("#txtAnti_Porc").val(0);


            $('#txtObligC').byaSetHabilitar(true);
            
            $('#txtObligE').byaSetHabilitar(true);
            

            /*
            $("#CboDepSup").val('');
            $("#CboDepSol").val('');
            $("#CboTip").val('');
            $("#CboSubTip").val('');
            $("#CboMod").val('');
            $("#CboTPlazo1").val('');
            $("#CboTPlazo2").val('');
            $("#CboDepDel").val('');
           */
        },
        HabilitarN: function () {
            $('.inputHab').byaSetHabilitar(true);
            //$('#TxtNomFun').byaSetHabilitar(false);
            //$('#TxtIdeFun').byaSetHabilitar(false);

            //$('#TxtNomRes').byaSetHabilitar(false);
            $('#txtValOtros').byaSetHabilitar(false);

            $("#CboDepSup").byaSetHabilitar(true);
            $("#CboDepSol").byaSetHabilitar(true);
            $("#CboTip").byaSetHabilitar(true);
            $("#CboSubTip").byaSetHabilitar(true);
            $("#TxtFecElab").byaSetHabilitar(true);
            $("#CboMod").byaSetHabilitar(true);
            //$("#TxtGrupos").byaSetHabilitar(true);
            //$("#TxtNEmpleos").byaSetHabilitar(true);
            $("#CboTPlazo1").byaSetHabilitar(true);
            $("#CboTPlazo2").byaSetHabilitar(true);
            $("#TxtPlazo1").byaSetHabilitar(true);
            $("#TxtPlazo2").byaSetHabilitar(true);

            $("#CboDepDel").byaSetHabilitar(true);
            $(".intCDP").byaSetHabilitar(!Radicacion.getIntFin());
        },
        HabilitarE: function () {
            //cambiar
            $('#form1 :input').attr('disabled', false);

            $('#TxtNomFun').attr('disabled', true);
            $('#TxtIdeFun').attr('disabled', true);
            $('#TxtNomRes').attr('disabled', true);
            $('#txtValOtros').attr('disabled', true);

            $("#CboDepSup").byaSetHabilitar(true);
            $("#CboDepSol").byaSetHabilitar(true);
            //$("#CboTip").byaSetHabilitar(true);
            $("#CboSubTip").byaSetHabilitar(true);
            $("#TxtFecElab").byaSetHabilitar(true);
            $("#CboMod").byaSetHabilitar(true);
            $("#TxtGrupos").byaSetHabilitar(true);
            $("#TxtNEmpleos").byaSetHabilitar(true);

            $("#CboTPlazo1").byaSetHabilitar(true);
            $("#CboTPlazo2").byaSetHabilitar(true);

            $("#TxtPlazo1").byaSetHabilitar(true);
            $("#TxtPlazo2").byaSetHabilitar(true);

            $("#CboDepDel").byaSetHabilitar(true);
            $(".intCDP").byaSetHabilitar(!Radicacion.getIntFin());
            this.disabled = false;
            $("#TxtFecSus").byaSetHabilitar(true);
            //MostrarTab(TabActual);
            //Radicacion.loadPageTabs($("#jqxTabs").jqxTabs('val') + 1);
        },
        imprimir: function () {
            byaSite.AbrirPagina("../ashx/descEP.ashx?id_ep=" + Radicacion.TxtID.val());
        },
        Nuevo: function (GuardarNuevo) {
            Radicacion.Limpiar(); //Limpiar los input
            Radicacion.HabilitarN(); //Habilitar para nuevo
            Radicacion.TxtID.byaSetHabilitar(false);
            Radicacion.RefreshCboSubTip();
            //Radicacion._createValidacionEL(GuardarNuevo); //Configurar el Validador
            Radicacion.RefreshCboTPlazo2("M");
            //Colocar en Valores Por Defecto
            var user = Radicacion.getUser();
            //$("#TxtIdeFun").val(user);
            //Radicacion.BuscarTercero($("#TxtIdeFun"), $("#TxtNomFun"));
            Radicacion.SetID(0);
            Radicacion.config.oper = 'nuevo';
            Tip_Rad = "M";
            $("#txtValProp").byaGetDecimal(0);
            $("#txtValTot").byaGetDecimal(0);
            $("#TxtFecSus").val(getUltimaFecha());
            $("#TxtFecSus").focus();
        },
        AbrirEP: function () {
            var msgPpal = "#LbMsg";
            var sw = false;
            var tip;
            /*
            var tip = $.getUrlVar('tip');
            if (!tip)
            {
                alert("No se ha especificado el rol");
                return;
            }*/
            if (Radicacion.GetID() == "") {
                //$(msgPpal).msgBox({ titulo: "Radicación de Contratos...", mensaje: "Por favor Digite un Número de Estudio Previo...!!!", tipo: false });
                //Radicacion.TxtID.focus();
                //Radicacion.disabled = true;
                return false;
            }
            tip = 'EL';// tip.replace('#', '');
            var parametrosJSON = {
                "num_proc": Radicacion.GetID()
            };
            //byaPage.msgJson(parametrosJSON);

            $.ajax({
                type: "POST",
                url: urlGetEstPrev,
                data: byaPage.JSONtoString(parametrosJSON),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                beforeSend: function () {
                    $("#LbMsg").html("Procesando.. espere por favor...!!!");
                },
                success: function (result) {
                    var ep = byaPage.retObj(result.d);

                    if (ep.ID == 0) {
                        $(msgPpal).msgBox({ titulo: "Radicación de Contratos...", mensaje: "Estudio Previo N° " + Radicacion.GetID() + " no encontrado...!!!", tipo: false });
                    }
                    else {
                        dtoEstPrev = ep;
                        
                        $('#TxtObjCon').val(ep.OBJE_EP);
                        $('#TxtLugar').val(ep.LUGE_EP);
                        $('#TxtPlazoLiq').val(ep.PLIQ_EP);
                        $("#CboEstEP").val(ep.EST_EP);
                        //$("#TxtFecSus").val(byaPage.converJSONDate(ep.FEC_ELA_EP));
                        //Quien Diligencia
                        
                        
                        $("#TxtIdeCon").val(ep.IDE_CON_EP);
                        Radicacion.BuscarTercero($("#TxtIdeCon"), $("#TxtNomCon"));

                        $("#TxtIdeRep").val(ep.IDE_REP_EP);
                        Radicacion.BuscarTercero($("#TxtIdeRep"), $("#TxtNomRep"));

                        $("#CboDepSup").val(ep.DEP_SUP_EP);
                        $("#CboDepSol").val(ep.DEP_NEC_EP);
                        $("#CboTip").val(ep.TIP_CON_EP);
                        Radicacion.RefreshCboSubTip();
                        $("#CboSubTip").val(ep.STIP_CON_EP);
                        $("#CboMod").val(ep.MOD_SEL_EP);
                        $("#TxtPlazo1").val(ep.PLAZ1_EP);
                        $("#CboTPlazo1").val(ep.TPLA1_EP);
                        $("#TxtPlazo2").val(ep.PLAZ2_EP);
                        $("#CboTPlazo2").val(ep.TPLA2_EP);
                        $("#CboDepSup").val(ep.DEP_SUP_EP);
                        $("#CboDepDel").val(ep.DEP_DEL_EP);
                        $("#txtValTot").byaSetDecimal(ep.VAL_ENT_EP + ep.VAL_OTR_EP);
                        $("#txtValProp").byaSetDecimal(ep.VAL_ENT_EP);
                        $("#txtValOtros").byaSetDecimal(ep.VAL_OTR_EP);

                        $("#cboFPagoTipo").val(ep.TIPO_FP);
                        $("#txtAnti_Porc").val(ep.ANTI_PORC);
                        $("#cboApoyo").val(ep.PERSONA_APOYO);

                        $("#txtObligC").val(ep.OBLIGC);
                        $("#txtObligE").val(ep.OBLIGE);

                        $("#txtNOM_PLA_EP").val(ep.NOM_PLA_EP);
                        $("#cboENPLANC_EP").val(ep.ENPLANC_EP);
                        $("#TxtNroPro").val($("#txtNumero").val());
                        Tip_Rad = "A";
                        //$(msgPpal).msgBox({ titulo: "Radicación de Contratos...", mensaje: "Listo...!!!", tipo: true });
                        $(msgPpal).html('');
                        sw = true;
                    }
                },
                error: function (jqXHR, status, error) {
                    alert(error + "-" + jqXHR.responseText);
                }
            });
            return sw;
        },
        AbrirCTO: function () {
            var msgPpal = "#LbMsg";
            var sw = false;
            var tip;
            if (Radicacion.GetID() == "") {
                return false;
            }
            var parametrosJSON = {
                "cod_con": "'" + Radicacion.GetID() + "'"
            };
            $.ajax({
                type: "GET",
                url: urlGetContratos,
                data: parametrosJSON,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                beforeSend: function () {
                    $("#LbMsg").html("Procesando.. espere por favor...!!!");
                },
                success: function (result) {
                    var cto = byaPage.retObj(result.d);

                    if (cto.ID == 0) {
                        $(msgPpal).msgBox({ titulo: "Radicación de Contratos...", mensaje: "Estudio Previo N° " + Radicacion.GetID() + " no encontrado...!!!", tipo: false });
                    }
                    else {
                        dtoEstPrev = cto;
                        //alert(JSON.stringify(dtoEstPrev));
                        //alert(JSON.stringify(cto));
                        $('#TxtNroPro').val(cto.NUM_PROC);
                        $('#TxtObjCon').val(cto.OBJ_CON);
                        $("#TxtPlazo1").val(cto.PLA_EJE_CON);
                        $("#CboTPlazo1").val(cto.TIPO_PLAZO);
                        $("#TxtPlazo2").val(cto.PLAZO2_EJE_CON);
                        $("#CboTPlazo2").val(cto.TIPO_PLAZO2);
                        $('#TxtLugar').val(cto.LUG_EJE);
                        $("#txtValProp").byaSetDecimal(cto.VAL_APO_GOB);
                        $("#txtValTot").byaSetDecimal(cto.VAL_CON);
                        $("#CboTip").val(cto.TIP_CON);
                        Radicacion.RefreshCboSubTip();
                        $("#CboSubTip").val(cto.STIP_CON);
                        $('#TxtFecSus').val(byaPage.converJSONDate(cto.FEC_SUS_CON));
                        $("#CboDepSup").val(cto.INTERVENTORIA);
                        $("#CboDepSol").val(cto.DEP_CON);
                        $("#CboMod").val(cto.COD_TPRO);
                        $("#CboDepDel").val(cto.DEP_PCON);
                        $("#cboApoyo").val(cto.PER_APO);
                        $("#TxtIdeCon").val(cto.IDE_CON);
                        $("#TxtIdeRep").val(cto.IDE_REP);
                         
                        $("#cboFPagoTipo").val(cto.TIPO_FP);
                        $("#txtAnti_Porc").val(cto.ANTI_PORC);
                        

                        $("#cboFPagoTipo").val(cto.TIPO_FP);
                        $("#txtAnti_Porc").val(cto.ANTI_PORC);
                        $("#txtObligC").val(cto.OBLIGC);
                        $("#txtObligE").val(cto.OBLIGE);
                        $('#TxtPlazoLiq').val(cto.PLIQ_EP);
                        $("#TxtIdeCon").val(cto.IDE_CON);
                        $("#TxtIdeRep").val(cto.IDE_REP);

                        $(".inputHab").byaSetHabilitar(false);                        

                        Tip_Rad = cto.TIP_RADICACION;

                        if (cto.EST_CON == "00") $("#btnCompletado").byaSetHabilitar(false);

                        if (cto.l_EP_CDP == null) cto.l_EP_CDP = [];
                        if (cto.l_EP_FORMA_PAGO == null) cto.l_EP_FORMA_PAGO = [];

                        admProy.setDatosTablaProyectos();
                        admCDP.setDATOS(cto.l_EP_CDP);
                        admFP.setDATOS(cto.l_EP_FORMA_PAGO);
                        admPol.setDATOS();

                        admFP.dhBotonesEditarFP(false);
                        admPol.dhEnabled(false);
                        $(msgPpal).html('');



                        sw = true;
                    }
                },
                error: function (jqXHR, status, error) {
                    alert(error + "-" + jqXHR.responseText);
                }
            });
            return sw;
        },
        GetDatos: function () {
            var cto = {};
            if (dtoEstPrev != null) {
                cto.ID = dtoEstPrev.ID;
            } else {
                cto.ID = 0;
            }
            
            cto.COD_CON = $('#txtNumero').val();
            cto.TIP_RADICACION = Tip_Rad;
            cto.NUM_PROC =$('#TxtNroPro').val();
            cto.OBJ_CON = $('#TxtObjCon').val();
            cto.PLA_EJE_CON = $("#TxtPlazo1").val();
            cto.TIPO_PLAZO = $("#CboTPlazo1").val();
            cto.PLAZO2_EJE_CON = $("#TxtPlazo2").val();
            cto.TIPO_PLAZO2 = $("#CboTPlazo2").val();
            cto.LUG_EJE = $('#TxtLugar').val();
            cto.VAL_APO_GOB = $("#txtValProp").byaGetDecimal();
            cto.VAL_CON = $("#txtValTot").byaGetDecimal();
            cto.STIP_CON = $("#CboSubTip").val();
            cto.TIP_CON = $("#CboTip").val();
            cto.FEC_SUS_CON = $('#TxtFecSus').val();
            cto.INTERVENTORIA = $("#CboDepSup").val();
            cto.DEP_CON = $("#CboDepSol").val();
            cto.VIG_CON = byaSite.getVigencia();
            cto.NEMPLEOS = 0;
            cto.COD_TPRO = $("#CboMod").val();
            cto.DEP_PCON = $("#CboDepDel").val();
            cto.PER_APO = $("#cboApoyo").val();
            cto.IDE_CON = $("#TxtIdeCon").val();
            cto.IDE_REP = $("#TxtIdeRep").val() ;
            //ep.PERSONA_APOYO = $("#cboApoyo").val();
            cto.TIPO_FP = $("#cboFPagoTipo").val();
            cto.ANTI_PORC = $("#txtAnti_Porc").val();
            cto.ANTI_PORC = $("#txtAnti_Porc").val();
            cto.OBLIGE = $("#txtObligE").val();
            cto.OBLIGC = $("#txtObligC").val();
            //ep.ENPLANC_EP = $("#cboENPLANC_EP").val();
            cto.IDE_CON = $("#TxtIdeCon").val();
            cto.IDE_REP = $("#TxtIdeRep").val();
            cto.PLIQ_EP=$('#TxtPlazoLiq').val();
            
            //enlazar lista
            
            cto.l_EP_PROYECTOS = admProy.getDATOS();
            cto.l_EP_CDP = admCDP.getDATOS();
            cto.l_EP_FORMA_PAGO = admFP.getDATOS();
            cto.l_EP_POLIZAS2 = admPol.getDATOS();
            
            
            return cto;
        }
    };
}());

var admProy = (function () {
    var grid = "#jqxgridProy";
    var msgPpal = "#msgProy";
    var oper;
    var editrow = -1;
    var divBtnGrid = "#divBtnGridProy";
    var gridCon = '#jqxgridConProy';
    var urlToGridCon = "/servicios/wsDatosBasicos.asmx/GetProyectos";
    var urlToProy = "wfRgEstPrev.aspx/GetProyecto";
    var lProyectos;
    var tableProy;

    var _addHandlers = function () {
        $("#btnBsqPAA").byaSetHabilitar(false);
        $("#addButtonProy").click(function () {
            _verVentana();
        });
        $(gridCon).bind('rowselect', function (event) {
            var selectedRowIndex = event.args.rowindex;
            var cod, nom;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'Nro_Proyecto');
            cod = cell.value;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'Nombre_Proyecto');
            nom = cell.value;

            var ban = true;
            $.each(tableProy.getSource(), function (index, item) {
                if (item.COD_PRO == cod) ban = false;
            });
            if (ban) {
                agregarProyecto(cod, nom);
                $('#modalPry').modal('hide');
                //traerProyecto(cod);
            }
            else alert("Ya se a agregado este proyecto");
        });
        $("#cboENPLANC_EP").change(function () {
            if ($(this).val() == "S") $("#btnBsqPAA").byaSetHabilitar(true);
            else $("#btnBsqPAA").byaSetHabilitar(false);
        });
    };


    var agregarProyecto = function (cod, nom) {
        var e = {};
        e.COD_PRO = cod;
        e.NOMBRE_PROYECTO = nom;
        e.ES_NUEVO = true;
        tableProy.addItem(e);
        lProyectos = tableProy.getSource();
        CargarTabla();
        tableProy.setEnabled(true);
    };
    var _verVentana = function () {
        //$(ventana).jqxWindow('open');
        $('#modalPry').modal('show');
        _createGridCon();
    }
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'Nro_Proyecto', type: 'string' },
                    { name: 'Nombre_Proyecto', type: 'string' }
            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { filtro: "''" }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        // initialize jqxGrid
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: admProy.config.theme,
                        height: 350,
                        sortable: true,
                        altrows: true,
                        localization: byaPage.getLocalization(),
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                      { text: 'Código', datafield: 'Nro_Proyecto', width: 150, filtertype: 'textbox' },
                      { text: 'Descripción', datafield: 'Nombre_Proyecto', filtertype: 'textbox' }
                        ]
                    });
    };

    var CargarTabla = function () {
        var dat = lProyectos;
        if (dat == null) dat = new Array();
        var config = {
            Id: '#lProyectos',
            Source: dat,
            lEliminar: true,
            lEditar: false,
            lSeleccionar: false,
            Display: 'Nombre_Proyecto',
            Value: 'Nro_Proyecto',
            Enabled: true,
            fnFormatItem: function (item, index) {
                var Eliminar = '<span class="glyphicon glyphicon-remove clsslProyectosDelete" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var colomnBound = '<td>' + item.COD_PRO + "</td><td>" + item.NOMBRE_PROYECTO + "</td>";
                var Botones = '<td>' + Eliminar + ' </td>';
                return colomnBound + Botones;
            }
        };
        tableProy = new byaTablaG();
        tableProy.init(config);
        tableProy.setEnabled(false);
    };
    var traerProyecto = function (codPro) {
        var parametrosJSON = { "filtro": "'" + codPro + "'" };
        $.ajax({
            type: "GET",
            url: urlToProy,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var pro = byaPage.retObj(result.d);
                if (pro != null) {
                    if (pro.NECESIDAD != null) {
                        var necesidad = $("#txtNecesidadContratar").html();
                        necesidad = necesidad + "  " + pro.NECESIDAD;
                        $("#txtNecesidadContratar").html(necesidad);
                    }
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };

    return {
        disabled: null,
        id_ep: null,
        editedRows: null,
        config: {
            theme: null
        },
        setDATOS: function () {

        },
        getDATOS: function () {
            return tableProy.getSource();
        },
        setDatosTablaProyectos: function () {
            lProyectos = Radicacion.getProyectos();
            CargarTabla();
        },
        init: function () {
            this.config.theme = Radicacion.config.theme;
            CargarTabla();
            _createGridCon();
            _addHandlers();
        },
        dhEdicionProyectos: function (value) {
            tableProy.setEnabled(value);
        }
    };
}());

var admCDP = (function () {
    var oper;
    var editrow = -1;
    var uid_cdp = -1;
    var urlGetCDPsExt = "/Servicios/wsFinanciero.asmx/GetCDPs";
    var operacionEjecutar;
    var lCDPs = new Array();
    var activarValidar = true;
    var objCDPActual;
    var indexEditado;
    var integrado;
    var _addHandlers = function () {        
        $("#btnNuevoCDP").click(function () {
            Nuevo();
        });
        $("#btnGuardarCDP").click(function () {
            if (operacionEjecutar == "Nuevo") GuardarCDP();
            else GuardarCDPModificado();
        });
        $("#txtNroCDP").blur(function () {
            //alert(byaSite.getIntegradoCDP());
            if (byaSite.getIntegradoCDP()) VerificarSiExisteCDPExtreno();
        });
    };
    var _createElements = function () {
        $("#btnGuardarCDP").byaSetHabilitar(false);
        $("#txtNroCDP").byaSetHabilitar(false);
        $("#txtFecCDP").byaSetHabilitar(false);
        $("#txtValCDP").byaSetHabilitar(false);
        $("#cboVigFut").byaSetHabilitar(false);
        crearTablaCDP();
        integrado = byaSite.getIntegradoCDP();
        if (integrado) $("#cdpTip").text("Integrado");
        else $("#cdpTip").text("Sin Integrar");
    };
    var _limpiar = function () {
        $("#txtNroCDP").val('');
        $("#txtFecCDP").val('');
        $("#txtValCDP").byaSetDecimal(0);
        $("#cboVigFut").val('NO');
        $("#txtNroCDP").byaSetHabilitar(true);
        oper = 'add';
    };
    var _getDatos = function () {
        var e = {};

        if (operacionEjecutar == "Editar") {
            e.ID = objCDPActual.ID;
            e.ID_EP = objCDPActual.ID_EP;
            e.NRO_CDP = objCDPActual.NRO_CDP;
        }

        e.EP_RUBROS_CDP = admRub.getDATOS();
        e.NRO_CDP = $("#txtNroCDP").val();
        e.FEC_CDP = $("#txtFecCDP").val();
        e.VAL_CDP = $("#txtValCDP").byaGetDecimal();
        e.VIG_FUT = $("#cboVigFut").val();

        return e;
    };
    var _esValido = function () {
        var error = false;
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
            if (error) {
                $("#LbMsg").html("Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ");
            } else {
                $("#LbMsg").html("");
            }
        };
        if (activarValidar) {
            _ValidarEmpty("txt", "NroCDP");
            _ValidarEmpty("txt", "FecCDP");
            _ValidarEmpty("txt", "ValCDP");
            _ValidarEmpty("cbo", "VigFut");
            _MensajeFinalValidacion();
        }
        return !error;
    };
    var tblCdp;
    var crearTablaCDP = function () {
        var config = {
            Id: '#tblCdp',
            Source: lCDPs,
            fn_Editar: Editar,
            fn_Seleccionar: VerDetallesCDP,
            lEliminar: true,
            lEditar: true,
            lSeleccionar: true,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: true,
            fnFormatItem: function (item, index) {
                //alert(index);
                var Consultar = '<span class="glyphicon glyphicon-search clsstblCdpSelect" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var Editar = '<span class="glyphicon glyphicon-edit clsstblCdpEdit" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var Eliminar = '<span class="glyphicon glyphicon-remove clsstblCdpDelete" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                //var Eliminar = '<span id="' + index + '" class="glyphicon glyphicon-remove codigos clsstblCodigosDelete" aria-hidden="true"></span>';

                var colomnBound = '<td>' + item.NRO_CDP + "</td><td>" + item.FEC_CDP + "</td><td class='text-right'>" + byaPage.formatNumber.new(item.VAL_CDP, "$") + "</td><td>" + item.VIG_FUT + "</td>";
                var Botones = '<td>' + Consultar + ' </td><td>' + Editar + ' </td><td>' + Eliminar + ' </td>';
                return colomnBound + Botones;

            }
        };
        tblCdp = new byaTablaG();
        tblCdp.init(config);
        tblCdp.setEnabled(false);
    };
    var DibujarCDPs = function () {
        crearTablaCDP();
    };
    var Nuevo = function () {
        operacionEjecutar = "Nuevo";
        _limpiar();
        $("#btnGuardarCDP").byaSetHabilitar(true);
        if (!integrado) {
            $("#txtNroCDP").byaSetHabilitar(true);
            $("#txtFecCDP").byaSetHabilitar(true);
            $("#txtValCDP").byaSetHabilitar(true);
            $("#cboVigFut").byaSetHabilitar(true);
        } else {
            $("#txtNroCDP").byaSetHabilitar(true);
            $("#txtFecCDP").byaSetHabilitar(false);
            $("#txtValCDP").byaSetHabilitar(false);
            $("#cboVigFut").byaSetHabilitar(false);
        }

        $("#btnGuardarRubro").byaSetHabilitar(false);
        $("#btnNuevoRubro").byaSetHabilitar(true);

        admRub.dhBotonesModificacion(true);
        admRub.setDATOS(new Array());
    };
    var GuardarCDP = function () {
        if (_esValido()) {
            var o = _getDatos();
            o.ES_NUEVO = true;
            o.ES_MODIF = false;
            tblCdp.addItem(o);
            //lCDPs.push(_getDatos());
            DibujarCDPs();
            _limpiar();
            admCDP.dhBotonesModificacion(true);
            $("#btnGuardarCDP").byaSetHabilitar(false);
            $("#btnGuardarRubro").byaSetHabilitar(false);
            $("#btnNuevoRubro").byaSetHabilitar(false);
            admRub.dhBotonesModificacion(false);
            $("#lstRubros").html("");


            $("#txtNroCDP").byaSetHabilitar(false);
            $("#txtFecCDP").byaSetHabilitar(false);
            $("#txtValCDP").byaSetHabilitar(false);
            $("#cboVigFut").byaSetHabilitar(false);
        }
    };
    var GuardarCDPModificado = function () {
        if (_esValido()) {
            var o = _getDatos();
            if (tblCdp.getSource()[indexEditado].ES_NUEVO != true) o.ES_MODIF = true;
            else o.ES_NUEVO = true;
            tblCdp.getSource()[indexEditado] = o;
            //lCDPs[indexEditado] = _getDatos();
            DibujarCDPs();
            _limpiar();
            $("#btnGuardarCDP").byaSetHabilitar(false);
            $("#btnGuardarRubro").byaSetHabilitar(false);
            $("#btnNuevoRubro").byaSetHabilitar(false);
            admRub.dhBotonesModificacion(false);
            $("#lstRubros").html("");

            $("#txtNroCDP").byaSetHabilitar(false);
            $("#txtFecCDP").byaSetHabilitar(false);
            $("#txtValCDP").byaSetHabilitar(false);
            $("#cboVigFut").byaSetHabilitar(false);
        }
    };
    var VerDetallesCDP = function (item, index) {
        $("#btnGuardarCDP").byaSetHabilitar(false);
        $("#txtNroCDP").val(item.NRO_CDP);
        $("#txtFecCDP").val(item.FEC_CDP);
        $("#txtValCDP").byaSetDecimal(item.VAL_CDP);
        $("#cboVigFut").val(item.VIG_FUT);
        $("#txtNroCDP").byaSetHabilitar(false);
        $("#txtFecCDP").byaSetHabilitar(false);
        $("#txtValCDP").byaSetHabilitar(false);
        $("#cboVigFut").byaSetHabilitar(false);

        $("#btnGuardarRubro").byaSetHabilitar(false);
        $("#btnNuevoRubro").byaSetHabilitar(false);
        $("#txtCodRub").byaSetHabilitar(false);
        $("#txtDesRub").byaSetHabilitar(false);
        $("#txtValRub").byaSetHabilitar(false);

        admRub.setDATOS(item.EP_RUBROS_CDP, index);
        admRub.dhBotonesModificacion(false);
    };
    var VerDetallesCDP0 = function (index) {
        $("#btnGuardarCDP").byaSetHabilitar(false);
        $("#txtNroCDP").val(lCDPs[index].NRO_CDP);
        $("#txtFecCDP").val(lCDPs[index].FEC_CDP);
        $("#txtValCDP").byaSetDecimal(lCDPs[index].VAL_CDP);
        $("#cboVigFut").val(lCDPs[index].VIG_FUT);
        $("#txtNroCDP").byaSetHabilitar(false);
        $("#txtFecCDP").byaSetHabilitar(false);
        $("#txtValCDP").byaSetHabilitar(false);
        $("#cboVigFut").byaSetHabilitar(false);

        $("#btnGuardarRubro").byaSetHabilitar(false);
        $("#btnNuevoRubro").byaSetHabilitar(false);
        $("#txtCodRub").byaSetHabilitar(false);
        $("#txtDesRub").byaSetHabilitar(false);
        $("#txtValRub").byaSetHabilitar(false);

        admRub.setDATOS(lCDPs[index].EP_RUBROS_CDP, index);
        admRub.dhBotonesModificacion(false);
    };
    var Editar = function (item, index) {
        indexEditado = index;
        VerDetallesCDP(item);
        operacionEjecutar = "Editar";
        $("#btnGuardarCDP").byaSetHabilitar(true);
        $("#txtNroCDP").byaSetHabilitar(false);
        $("#txtFecCDP").byaSetHabilitar(true);
        $("#txtValCDP").byaSetHabilitar(true);
        $("#cboVigFut").byaSetHabilitar(true);
        objCDPActual = item;

        $("#btnGuardarRubro").byaSetHabilitar(false);
        $("#btnNuevoRubro").byaSetHabilitar(true);
        admRub.dhBotonesModificacion(true);
    };
    var VerificarSiExisteCDPExtreno = function () {
        var idcdp = $("#txtNroCDP").val();
        var parametro = {
            NRO_CDP: "'" + idcdp + "'"
        }
        $.ajax({
            type: "GET",
            url: urlGetCDPsExt,
            data: parametro,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                var cdps = byaPage.retObj(result.d);
                if (cdps != null) {
                    var confirmacion = confirm("Existe un CDP con este número ¿Desea cargarlo?");
                    if (confirmacion) {
                        $("#txtNroCDP").val(cdps[0].NRO_CDP);
                        $("#txtFecCDP").val(byaPage.converJSONDate(cdps[0].FEC_CDP));
                        $("#txtValCDP").byaSetDecimal(cdps[0].VAL_CDP);
                        $("#cboVigFut").val(cdps[0].VIG_FUT);
                        admRub.setDATOS(cdps[0].EP_RUBROS_CDP);
                        $("#btnNuevoRubro").byaSetHabilitar(false);
                    }
                }
                else {
                    alert("No existe ningun CDP con este numero, por favor digite un numero valido");
                    $("#txtNroCDP").val("");
                    $("#txtNroCDP").focus();
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };

    return {
        disabled: null,
        id_ep: null,
        editedRows: null,
        config: {
            theme: null
        },
        setDATOS: function (lnewCDP) {
            $.each(lnewCDP, function (index, item) {
                item.FEC_CDP = byaPage.converJSONDate(item.FEC_CDP);
                $.each(item.EP_RUBROS_CDP, function (index2, item2) {
                    item2.FEC_REG = byaPage.converJSONDate(item2.FEC_REG);
                });
            });
            lCDPs = lnewCDP;
            DibujarCDPs();
        },
        getDATOS: function () {
            return tblCdp.getSource();
        },
        getRubros: function () {
            //alert(uid_cdp);
            if (uid_cdp >= 0) { return Radicacion.getCDP()[uid_cdp].EP_RUBROS_CDP; }
            return null;
        },
        setEditable: function (value) {

        },
        init: function () {

            this.config.theme = Radicacion.config.theme;
            _createElements();
            _addHandlers();
        },
        VerDetallesCDP: function (index) {
            VerDetallesCDP(index);
        },
        BorrarCDP: function (index) {
            BorrarCDP(index);
        },
        EditarCDP: function (index) {
            Editar(index);
        },
        dhBotonesModificacion: function (value) {
            tblCdp.setEnabled(value);
        },
        dhBotonesDelete: function (value) {
            tblCdp.setEnabledDelete(value);
        }
    };
}());

var admRub = (function () {
    var operacionEjecutar;
    var objRubroEditar;
    var activarValidar;
    var indexCdpActual;
    var indexEditado;

    var lRubros = new Array();
    var _addHandlers = function () {
        
        $("#btnNuevoRubro").click(function () {
            Nuevo();
        });
        $("#btnGuardarRubro").click(function () {
            if (operacionEjecutar == "Nuevo") GuardarRubro();
            else GuardarRubroModificado();
        });
    };
    var _createElements = function () {
        $("#btnGuardarRubro").byaSetHabilitar(false);
        $("#btnNuevoRubro").byaSetHabilitar(false);

        $("#btnBsqRubro").byaSetHabilitar(false);

        $("#txtCodRub").byaSetHabilitar(false);
        $("#txtDesRub").byaSetHabilitar(false);
        $("#txtValRub").byaSetHabilitar(false);
        crearTabla();
    };
    var _limpiar = function () {
        $("#txtCodRub").val("");
        $("#txtDesRub").val("");
        $("#txtValRub").val("0");
        $('.currency').formatCurrency();
    };
    var _esValido = function () {
        var error = false;
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
            if (error) {
                $("#LbMsg").html("Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ");
            } else {
                $("#LbMsg").html("");
            }
        };
        if (activarValidar) {
            _ValidarEmpty("txt", "CodRub");
            _ValidarEmpty("txt", "DesRub");
            _ValidarEmpty("txt", "ValRub");
            _MensajeFinalValidacion();
        }
        return !error;
    };

    var tblRubros;
    var crearTabla = function () {
        var config = {
            Id: '#tblRubros',
            Source: lRubros,
            fn_Editar: Editar,
            fn_Seleccionar: VerDetalles,
            lEliminar: true,
            lEditar: true,
            lSeleccionar: true,
            Display: 'COD_RUB',
            Value: 'COD_RUB',
            Enabled: true,
            fnFormatItem: function (item, index) {
                //alert(index);
                var Consultar = '<span class="glyphicon glyphicon-search clsstblRubrosSelect" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var Editar = '<span class="glyphicon glyphicon-edit clsstblRubrosEdit" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var Eliminar = '<span class="glyphicon glyphicon-remove clsstblRubrosDelete" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';

                var colomnBound = '<td>' + item.COD_RUB + "</td><td>" + item.NOM_RUB + "</td><td class='text-right'>" + byaPage.formatNumber.new(item.VALOR, "$") + "</td>";
                var Botones = '<td>' + Consultar + ' </td><td>' + Editar + ' </td><td>' + Eliminar + ' </td>';
                return colomnBound + Botones;

            }
        };
        tblRubros = new byaTablaG();
        tblRubros.init(config);
        tblRubros.setEnabled(false);
    };
    var DibujarRubros = function () {
        crearTabla();
        /*
            $("#lstRubros").html("");
            $.each(lRubros, function (index, item) {
                var CadenaHtml = '<div style="margin:5px; background:#d9edf7" class="list-group-item list-group-item-success">' +
                                            '<div class="row">' +
                                                '<div class="col-lg-6">' +
                                                    '<strong>' + item.COD_RUB + " : " + item.NOM_RUB + '</strong>' +
                                                '</div>' +
                                                //'<div class="col-lg-4 text-justify">' +
                                                //    '<strong>' + item.DESCRIPCION + '</strong>' +
                                                //'</div>' +
                                                '<div class="col-lg-2">' +
                                                    '<strong>' + byaPage.formatNumber.new(item.VALOR, "$") + '</strong>' +
                                                '</div>' +
                                                '<div class="col-lg-2">' +
                                                    '<span class="glyphicon glyphicon-search" id="' + index + '" onclick="admRub.VerDetallesRubro(id)" aria-hidden="true" style="margin-right:20px"></span>' +
                                                    '<span class="glyphicon glyphicon-edit" id="' + index + '" onclick="admRub.bEditarRubro(id)" aria-hidden="true" style="margin-right:20px"></span>' +
                                                    '<span class="glyphicon glyphicon-remove" id="' + index + '" onclick="admRub.bBorrarRubro(id)" aria-hidden="true" style="margin-right:20px"></span>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';
                $("#lstRubros").append(CadenaHtml);
            });
        */
    };
    var Nuevo = function () {
        operacionEjecutar = "Nuevo";
        _limpiar();
        $("#btnGuardarRubro").byaSetHabilitar(true);
        $("#txtCodRub").byaSetHabilitar(false);
        $("#txtDesRub").byaSetHabilitar(false);
        $("#txtValRub").byaSetHabilitar(true);
        $("#btnBsqRubro").byaSetHabilitar(true);
    };
    var GuardarRubro = function () {
        if (_esValido()) {
            var o = _getDatos();
            o.ES_NUEVO = true;
            o.ES_MODIF = false;
            tblRubros.addItem(o);
            //lRubros.push(o);
            DibujarRubros();

            _limpiar();
            $("#txtCodRub").byaSetHabilitar(false);
            $("#txtDesRub").byaSetHabilitar(false);
            $("#txtValRub").byaSetHabilitar(false);

            $("#btnGuardarRubro").byaSetHabilitar(false);
            $("#btnBsqRubro").byaSetHabilitar(false);
        }
    };
    var GuardarRubroModificado = function () {
        if (_esValido()) {
            var o = _getDatos();
            //alert(JSON.stringify(tblRubros.getSource()[indexEditado]));
            if (tblRubros.getSource()[indexEditado].ES_NUEVO != true) o.ES_MODIF = true;
            else o.ES_NUEVO = true;
            //lRubros[indexEditado] = o;
            tblRubros.getSource[indexEditado] = o;
            DibujarRubros();

            _limpiar();
            $("#txtCodRub").byaSetHabilitar(false);
            $("#txtDesRub").byaSetHabilitar(false);
            $("#txtValRub").byaSetHabilitar(false);

            $("#btnGuardarRubro").byaSetHabilitar(false);
            $("#btnBsqRubro").byaSetHabilitar(false);
        }
    };
    var VerDetalles = function (item, index) {
        $("#txtCodRub").byaSetHabilitar(false);
        $("#txtDesRub").byaSetHabilitar(false);
        $("#txtValRub").byaSetHabilitar(false);

        $("#btnBsqRubro").byaSetHabilitar(false);
        //alert(JSON.stringify(lRubros[index]));
        $("#txtCodRub").val(item.COD_RUB);
        $("#txtDesRub").val(item.NOM_RUB);
        $("#txtValRub").byaSetDecimal(item.VALOR);

        $("#btnGuardarRubro").byaSetHabilitar(false);
    };
    var _getDatos = function () {
        var e = {};

        if (operacionEjecutar == "Editar") {
            e.ID = objRubroEditar.ID;
            e.ID_EP = objRubroEditar.ID_EP;
            e.COD_RUB = objRubroEditar.COD_RUB;
            e.NRO_CDP = objRubroEditar.NRO_CDP;
            e.ID_EP_CDP = objRubroEditar.ID_EP_CDP;
        }

        e.VIG_CDP = byaSite.getVigencia();
        e.COD_RUB = $("#txtCodRub").val();
        e.NOM_RUB = $("#txtDesRub").val();
        e.VALOR = $("#txtValRub").byaGetDecimal();
        return e;
    };
    var Editar = function (item, index) {
        operacionEjecutar = "Editar";
        indexEditado = index;
        objRubroEditar = item;
        $("#txtCodRub").byaSetHabilitar(false);
        $("#txtDesRub").byaSetHabilitar(false);
        $("#txtValRub").byaSetHabilitar(true);
        $("#btnBsqRubro").byaSetHabilitar(false);

        $("#txtCodRub").val(item.COD_RUB);
        $("#txtDesRub").val(item.NOM_RUB);
        $("#txtValRub").byaSetDecimal(item.VALOR);

        $("#btnGuardarRubro").byaSetHabilitar(true);
        $("#btnNuevoRubro").byaSetHabilitar(true);
    };
    var NoAccionesM = function () {
        alert("Debe selecionar 'Editar' primero...");
    };

    return {
        disabled: null,
        id_ep: null,
        id_ep_cdp: null,
        Grupo: null,
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        setDATOS: function (lNewRubros, indexCDP) {
            lRubros = lNewRubros;
            indexCdpActual = indexCDP;
            DibujarRubros();
        },
        getDATOS: function () {
            return tblRubros.getSource();
        },
        init: function () {
            _addHandlers();
            _createElements();
        },
        VerDetallesRubro: function (index) {
            VerDetallesRubro(index);
        },
        bEditarRubro: function (index) {
            EditarRubro(index);
        },
        bBorrarRubro: function (index) {
            BorrarRubro(index);
        },
        dhBotonesModificacion: function (value) {
            tblRubros.setEnabled(value);
        }

    };
}());

var admFP = (function () {
    var grid = "#jqxgridFP";
    var oper;
    var editrow = -1;
    var lFPs;
    var val_aux = 0;
    var GuardarNuevo = function () {
        var dataRecord = {};
        dataRecord.CAN_PAG = $("#txtCantidadPagos").val();
        dataRecord.ORD_FPAG = 1;
        dataRecord.TIP_FPAG = $("#CboTipPag").val();
        dataRecord.VAL_FPAG = $("#txtValPag").byaGetDecimal();
        dataRecord.POR_FPAG = $("#txtPorc").byaGetDecimal();
        dataRecord.CON_FPAG = $("#txtCond").val();
        dataRecord.PGEN_FPAG = $("#ChkApoEnt").is(':checked') == true ? "S" : "N";
        dataRecord.NOM_TIP_FPAG = $("#CboTipPag option:selected").text();
        dataRecord.ES_NUEVO = true;
        var commit = $(grid).jqxGrid('addrow', null, dataRecord);
        $("#lbMsg").msgBox({ titulo: "", mensaje: "Se agregó el item de la forma de pago", tipo: true });
        getTotalGrid();
    };
    var GuardarNuevoTBL = function () {
        var por = parseFloat($("#txtSaldoP").val());
        $("#txtSaldoP").val(por - $("#txtPorc").byaGetDecimal());

        var val = $("#txtSaldoV").byaGetDecimal();
        $("#txtSaldoV").byaSetDecimal(val - $("#txtValPag").byaGetDecimal());


        var dataRecord = {};
        dataRecord.CAN_PAG = $("#txtCantidadPagos").val();
        dataRecord.ORD_FPAG = 1;
        dataRecord.TIP_FPAG = $("#CboTipPag").val();
        dataRecord.VAL_FPAG = parseFloat($("#txtValPag").byaGetDecimal()).toFixed(2);
        dataRecord.POR_FPAG = parseFloat($("#txtPorc").val()).toFixed(2);
        dataRecord.CON_FPAG = $("#txtCond").val();
        dataRecord.PGEN_FPAG = $("#CboApoEnt").val();
        dataRecord.NOM_TIP_FPAG = $("#CboTipPag option:selected").text();
        dataRecord.ES_NUEVO = true;
        tblFP.addItem(dataRecord);
        lFP = tblFP.getSource();
        _dibujarTabla();
        tblFP.setEnabled(true);
        $("#lbMsg").msgBox({ titulo: "", mensaje: "Se agregó el item de la forma de pago", tipo: true });
    };
    var GuardarMod = function () {
        if (editrow >= 0) {
            var rowID = $(grid).jqxGrid('getrowid', editrow);
            var dataRecord = $(grid).jqxGrid('getrowdata', editrow);
            dataRecord.CAN_PAG = $("#txtCantidadPagos").val();
            dataRecord.ORD_FPAG = $("#txtOrden").val();
            dataRecord.TIP_FPAG = $("#CboTipPag").val();
            dataRecord.VAL_FPAG = $("#txtValPag").byaGetDecimal();
            dataRecord.POR_FPAG = $("#txtPorc").byaGetDecimal();
            dataRecord.CON_FPAG = $("#txtCond").val();
            dataRecord.PGEN_FPAG = $("#ChkApoEnt").is(':checked') == true ? "S" : "N";
            var commit = $(grid).jqxGrid('updaterow', rowID, dataRecord);
            $("#lbMsg").msgBox({ titulo: "", mensaje: "Se actualizo el item de la forma de pago", tipo: true });
            getTotalGrid();
        }
    };
    var GuardarModTBL = function () {
        var dataRecord = tblFP.getSource()[indexEditado];
        dataRecord.CAN_PAG = $("#txtCantidadPagos").val();
        dataRecord.TIP_FPAG = $("#CboTipPag").val();
        dataRecord.VAL_FPAG = $("#txtValPag").byaGetDecimal();
        dataRecord.POR_FPAG = $("#txtPorc").byaGetDecimal();
        dataRecord.CON_FPAG = $("#txtCond").val();
        dataRecord.PGEN_FPAG = $("#ChkApoEnt").is(':checked') == true ? "S" : "N";
        dataRecord.ES_MODIF = true;
        tblFP.getSource()[indexEditado] = dataRecord;
        _dibujarTabla();
        tblFP.setEnabled(true);
        $("#lbMsg").msgBox({ titulo: "", mensaje: "Se actualizo el item de la forma de pago", tipo: true });
    };

    var ControlCaptura = function () {
        activarValidar = false;
        getTotalGrid();
        //
    }


    $("#modalFP").on('shown.bs.modal', function () {
        $(this).find("[autofocus]:first").focus();
    });

    $("input[name=CboVP]").click(function () {
        ControlCaptura();
    });
    $("#CboVP").change(function () {
        ControlCaptura();
    });
    $("#btnAbrirGenFP").click(function () {
        $("#txtCondGenFP").val("");
        if ($("#CboTPlazo2").val() != "") verGenerar();
        else alert("Debe completar el plazo de ejecución");
    });
    $("#btnAgregarFP").click(function () {
        $("#CboTipPag").val("PM");
        var lActual = tblFP.getSource();
        var val_act = 0;
        var por_act = 0;
        $.each(lActual, function (index, item) {
            if (item.TIP_FPAG != "AN") {
                val_act = val_act + item.VAL_FPAG;
                por_act = por_act + item.POR_FPAG;
            }
        });        

        $("#txtSaldoP").val((100 - por_act).toFixed(2));
        $("#txtSaldoV").byaSetDecimal(($("#txtValTot").byaGetDecimal() - val_act).toFixed(2));

        oper = "add";
        $("#txtCond").val("");
        $("#lbMsg").html("");
        verVentana();

        $("#txtCantidadPagos").val(1);
        $("#CboTipPag").val("PM");
        $("#txtValPag").byaGetDecimal(0);
        $("#txtPorc").val(0);
        $("#txtCond").val("");
    });
    var verGenerar = function () {
        $('#modalGenFP').modal('show');
    };

    var verVentana = function () {
        ControlCaptura();
        $('#modalFP').modal('show');
    };

    var _esValidoFP = function () {

    };
    var activarValidar;

    $(".validar").change(function () {
        _esValido();
    });
    $(".validar").blur(function () {
        _esValido();
    });

    var _esValido = function () {
        if (activarValidar) {
            var error = false;
            var ErrorInVal = false;
            if ($("#CboTipPag").val() == "") {
                $("#dvdTipPag").addClass("has-error");
                error = true;
            } else {
                $("#dvdTipPag").removeClass("has-error");
            }
            if ($("#txtValPag").byaGetDecimal() <= 0) {
                $("#dvdValPag").addClass("has-error");
                error = true;
            } else {
                $("#dvdValPag").removeClass("has-error");
            }

            if ($("#txtPorc").val() <= 0 || $("#txtPorc").val() > 100) {
                $("#dvdPorc").addClass("has-error");
                error = true;
            } else {
                $("#dvdPorc").removeClass("has-error");
            }
            //if ($("#txtCond").val() == "") {
            //    $("#dvdCond").addClass("has-error");
            //    error = true;
            //} else {
            //    $("#dvdCond").removeClass("has-error");
            //}            
            if (error) {
                $("#dvdMsg").addClass("alert alert-danger");
                $("#lbMsg").html("Por favor diligencie los datos resaltos en Rojo. Son Obligatorios");
            } else {
                $("#dvdMsg").removeClass("alert alert-danger");
                $("#lbMsg").html("");
            }
        }
        return !error;
    };
    var _esValidoValorNuevo = function () {
        var error = false;
        if ($("#txtValPag").byaGetDecimal() > $("#txtSaldoV").byaGetDecimal()) {
            $("#dvdValPag").addClass("has-error");
            $("#dvdPorc").addClass("has-error");
            error = true;
        } else {
            $("#dvdValPag").removeClass("has-error");
            $("#dvdPorc").removeClass("has-error");
        }
        if (error) {
            $("#dvdMsg").addClass("alert alert-danger");
            $("#lbMsg").html("El valor de este pago no puede se mayor a el Saldo en Valor");
        } else {
            $("#dvdMsg").removeClass("alert alert-danger");
            $("#lbMsg").html("");
        }
        return !error;
    };
    var _esValidoValorModificado = function () {
        var error = false;
        if ($("#txtValPag").byaGetDecimal() > ($("#txtSaldoV").byaGetDecimal() + val_aux)) {
            $("#dvdValPag").addClass("has-error");
            $("#dvdPorc").addClass("has-error");
            error = true;
        } else {
            $("#dvdValPag").removeClass("has-error");
            $("#dvdPorc").removeClass("has-error");
        }
        if (error) {
            $("#dvdMsg").addClass("alert alert-danger");
            $("#lbMsg").html("El valor de este pago no puede se mayor a el Saldo en Valor");
        } else {
            $("#dvdMsg").removeClass("alert alert-danger");
            $("#lbMsg").html("");
        }
        return !error;
    };
    $("#BtnFPGuardar").click(function () {
        activarValidar = true;
        if (_esValido()) {
            if (oper == "add") {
                if (_esValidoValorNuevo()) {
                    GuardarNuevoTBL();
                }
            }
            if (oper == "edit") {
                if (_esValidoValorModificado()) {
                    GuardarModTBL();
                }
            }
        }

    });

    $("#txtValPag").blur(function () {
        _calPor();
    });

    $("#txtPorc").blur(function () {
        _calVal();
    });

    var _calPor = function () {
        var por = $("#txtValPag").byaGetDecimal() / admFP.getValTotal() * 100;
        if (por < 0 || por > 100) {
            alert("El valor no es válido, fuera del rango de 1 a 100%");
            $("#txtPorc").val(0);
        } else {
            $("#txtPorc").val(por.toFixed(2));
        }
    };
    var _calVal = function () {
        var por = $("#txtPorc").val();
        if (por < 0 || por > 100) {
            alert("El valor no es válido, fuera del rango de 1 a 100%");
            $("#txtPorc").val(0);
        } else {
            var val = parseFloat($("#txtPorc").val()) * admFP.getValTotal() / 100;
            $("#txtValPag").byaSetDecimal(val);
        }
    };

    var getTotalGrid = function () {
        //var datosGrid = $(grid).jqxGrid('getboundrows');
        //var acumV = 0;
        //var acumP = 0;
        //$.each(datosGrid, function (index, item) {
        //    acumP = acumP + item.POR_FPAG;
        //    acumV = acumV + item.VAL_FPAG;
        //});
        //var SaldoP = 100 - acumP;
        //var SaldoV = admFP.getValTotal() - acumV;

        //$("#txtSaldoP").val(SaldoP);
        //$("#txtSaldoV").byaSetDecimal(SaldoV);
    };
    //Creating all page elements which are jqxWidgets
    var _createElements = function () {
        var sourceTIPPAG = byaPage.getSource('/EstPrev/Elaborar/wfRgEstPrev.aspx/GetTIPO_PAGO')
        $("#CboTipPag").byaCombo({ DataSource: sourceTIPPAG, Value: "ID_PAGO", Display: "DES_PAGO" });
        _createGrid();
    };
    var tblFP;
    var lFP = new Array();
    var _dibujarTabla = function () {
        var config = {
            Id: '#tblFP',
            Source: lFP,
            fn_Editar: EditarFPs,
            fn_Seleccionar: null,
            lEliminar: true,
            lEditar: true,
            lSeleccionar: false,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: true,
            fnFormatItem: function (item, index) {
                if (item != null) {
                    var Editar = '<span class="glyphicon glyphicon-edit clsstblFPEdit" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                    var Eliminar = '<span class="glyphicon glyphicon-remove clsstblFPDelete" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                    //var Eliminar = '<span id="' + index + '" class="glyphicon glyphicon-remove codigos clsstblCodigosDelete" aria-hidden="true"></span>';

                    var colomnBound = '<td>' + item.ORD_FPAG + "</td><td>" + item.CAN_PAG + "</td><td>" + item.NOM_TIP_FPAG + "</td><td class='text-right'>" + byaPage.formatNumber.new(item.VAL_FPAG, "$") + "</td><td class='text-right'>" + item.POR_FPAG + "</td><td>" + item.PGEN_FPAG + "</td><td>" + item.CON_FPAG + "</td>";
                    var Botones = '<td>' + Editar + ' </td><td>' + Eliminar + ' </td>';
                    return colomnBound + Botones;
                }
            }
        };
        tblFP = new byaTablaG();
        tblFP.init(config);
    };
    var indexEditado;
    var EditarFPs = function (item, index) {      
        val_aux = item.VAL_FPAG;
        oper = "edit";
        indexEditado = index;
        VerDetallesFPs(item);
        verVentana();
    };
    var VerDetallesFPs = function (item, index) {
        $("#LbMsg").html("");
        var lActual = tblFP.getSource();
        var val_act = 0;
        var por_act = 0;
        $.each(lActual, function (index, item) {
            if (item.TIP_FPAG != "AN") {
                val_act = val_act + item.VAL_FPAG;
                por_act = por_act + item.POR_FPAG;
            }
        });
        
        $("#txtSaldoP").val((100 - por_act).toFixed(2));
        $("#txtSaldoV").byaSetDecimal(($("#txtValTot").byaGetDecimal() - val_act).toFixed(2));

        if ($("#txtSaldoP").val() == "NaN") $("#txtSaldoP").val(0);
        if ($("#txtSaldoV").val() == "NaN") $("#txtSaldoV").byaSetDecimal(0);

        $("#txtSaldoP").val(parseFloat($("#txtSaldoP").val()) + item.POR_FPAG);
        $("#txtSaldoV").byaSetDecimal(parseFloat(($("#txtSaldoV").byaGetDecimal() + parseFloat(item.VAL_FPAG))).toFixed(2));

        $("#txtCantidadPagos").val(item.CAN_PAG);
        $("#txtOrden").val(item.ORD_FPAG);
        $("#CboTipPag").val(item.TIP_FPAG);
        $("#txtValPag").byaSetDecimal(item.VAL_FPAG);
        $("#txtPorc").val(item.POR_FPAG);
        $("#txtCond").val(item.CON_FPAG);
        $("#ChkApoEnt").val("S");
    };
    //crea Grid

    var _getdataAdapter = function () {
        _dibujarTabla();
        data = Radicacion.getFORMAPAGO();
        var source = {
            datatype: "local",
            localdata: data,
            datafields: [
                { name: 'ID_EP' },
                { name: 'ID' },
                { name: 'ORD_FPAG', type: 'number' },
                { name: 'TIP_FPAG', type: 'string' },
                { name: 'VAL_FPAG', type: 'float' },
                { name: 'POR_FPAG', type: 'number' },
                { name: 'CON_FPAG', type: 'string' },
                { name: 'PGEN_FPAG', type: 'string' },
                { name: 'NOM_TIP_FPAG', type: 'string' },
                { name: 'ES_NUEVO', type: 'bool' },
                { name: 'ES_MODIF', type: 'bool' },
                { name: 'ES_ANULAR', type: 'bool' },
                { name: 'CAN_PAG', type: 'number' }


            ]
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        return dataAdapter;
    };

    var _createGrid = function () {
        var cellclass = function (row, datafield, value, rowdata) {
            for (var i = 0; i < admFP.editedRows.length; i++) {
                if (admFP.editedRows[i].index == row) {
                    return "editedRow";
                }
            }
        }
        // initialize jqxGrid
        //autorowheight: true,
        $(grid).jqxGrid(
            {
                width: '100%',
                source: _getdataAdapter(),
                theme: admFP.config.theme,
                altrows: true,
                editable: true,
                enabletooltips: true,
                showaggregates: true,
                showstatusbar: true,
                autoheight: true,
                autorowheight: true,
                localization: byaPage.getLocalization(),
                columns: [
                  { text: 'Orden', datafield: 'ORD_FPAG', width: 50, cellclassname: cellclass },
                  { text: 'Cantidad', datafield: 'CAN_PAG', width: 100, cellclassname: cellclass, editable: false },
                  { text: 'Tipo ', datafield: 'NOM_TIP_FPAG', width: 120, cellclassname: cellclass, editable: false },
                  { text: 'Valor', datafield: 'VAL_FPAG', width: 150, cellsalign: 'right', cellsformat: 'f2', columntype: 'numberinput', cellclassname: cellclass, editable: false },
                  { text: '%', datafield: 'POR_FPAG', width: 70, columntype: 'numberinput', cellsalign: 'right', cellsformat: "p2", cellclassname: cellclass, editable: false },
                  { text: 'Aporte Entidad', datafield: 'PGEN_FPAG', width: 120, cellclassname: cellclass, editable: false },
                  { text: 'Condición', datafield: 'CON_FPAG', cellclassname: cellclass },
                  { text: 'Anular', datafield: 'ES_ANULAR', width: 50, align: 'center', columntype: 'checkbox', editable: true, hidden: false },
                  { text: 'Nuevo', datafield: 'ES_NUEVO', width: 50, align: 'center', columntype: 'checkbox', editable: true, hidden: true },
                   {
                       text: 'Edit', datafield: 'Edit', columntype: 'button', width: 120, cellsrenderer: function () {
                           return "Editar";
                       }, buttonclick: function (row) {
                           oper = "edit";
                           editrow = row;
                           var dataRecord = $(grid).jqxGrid('getrowdata', editrow);
                           $("#txtOrden").val(dataRecord.ORD_FPAG);
                           $("#CboTipPag").val(dataRecord.TIP_FPAG);
                           $("#txtValPag").byaSetDecimal(dataRecord.VAL_FPAG);
                           $("#txtPorPag").byaSetDecimal(dataRecord.POR_FPAG);
                           $("#txtCond").val(dataRecord.CON_FPAG);
                           $("#ChkApoEnt").attr('checked', dataRecord.PGEN_FPAG == "S" ? true : false);
                           //$("#CboApoEnt").val(dataRecord.PGEN_FPAG);
                           verVentana();
                       }
                   }

                ]
            });
    }

    return {
        disabled: null,
        valOtros: null,
        valProp: null,
        id_ep: null,
        Grupo: null,
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        setDATOS: function (lFPSm) {
            $.each(lFPSm, function (index, item) {
                if (item != null) {                    
                    item.FEC_REG = byaPage.converJSONDate(item.FEC_REG);
                }
            });
            lFP = lFPSm;
            //return $(grid).jqxGrid({ source: _getdataAdapter() });
            _dibujarTabla();
        },
        getDATOS: function () {
            return tblFP.getSource();
        },
        getValTotal: function () {
            return $("#txtValTot").byaGetDecimal();
        },
        init: function () {
            this.editedRows = new Array();
            this.config.theme = Radicacion.config.theme;
            _createElements();

        },
        dhBotonesEditarFP: function (value) {
            tblFP.setEnabled(value);
        }
    };
}());

var admPol = (function () {
    var CboCodPol = {};
    var oper = 'add';
    var editrow = -1;
    var grid = "#jqxgridPol";

    $("#CboCodPol").change(function () {
        var Amparo = CboCodPol.getSeleccionado();
        $("#txtDescPol").val(Amparo.DESCRIPCION);
    });
    $('#btnCancelarPol').click(function () {
        _cancelar();
    });
    $('#btnAgregarPol').click(function () {
        if (oper == 'edit') {
            _guardarMod();
            guardarModficadoTblPol();
        } else {
            _guardarNuevo();
            guardarNuevoTblPol();
        }
    });
    var _cancelar = function () {

        $("#CboCodPol").byaSetHabilitar(true);
        $("#CboCodPol").val('');
        $("#txtDescPol").val('');

        //Eliminar();

    };
    var Eliminar = function () {
        var selectedrowindex = $(grid).jqxGrid('getselectedrowindex');
        var rowscount = $(grid).jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            var id = $(grid).jqxGrid('getrowid', selectedrowindex);
            var commit = $(grid).jqxGrid('deleterow', id);
        }
    };
    var _guardarMod = function () {
        if (editrow >= 0) {
            var rowID = $(grid).jqxGrid('getrowid', editrow);
            var dataRecord = $(grid).jqxGrid('getrowdata', editrow);

            dataRecord.COD_POL = $("#CboCodPol").val();
            dataRecord.NOM_POL = $("#CboCodPol option:selected").text();
            dataRecord.DES_POL = $("#txtDescPol").val();
            dataRecord.ES_MODIF = true;

            var commit = $(grid).jqxGrid('updaterow', rowID, dataRecord);
            //$("#CboCodPol").val('');
            //$("#txtDescPol").val('');
            //$("#CboCodPol").byaSetHabilitar(true);
            //oper = 'add';
        }
    };
    var _guardarNuevo = function () {
        var dataRecord = {};
        dataRecord.COD_POL = $("#CboCodPol").val();
        dataRecord.NOM_POL = $("#CboCodPol option:selected").text();
        dataRecord.DES_POL = $("#txtDescPol").val();
        dataRecord.ES_NUEVO = true;
        var commit = $(grid).jqxGrid('addrow', null, dataRecord);

    };
    var _getdataAdapter = function () {
        data = Radicacion.getPol();
        var source = {
            datatype: "local",
            localdata: data,
            datafields: [
                { name: 'ID_EP' },
                { name: 'ID' },
                { name: 'COD_POL', type: 'string' },
                { name: 'NOM_POL', type: 'string' },
                { name: 'DES_POL', type: 'string' },
                { name: 'ES_MODIF', type: 'bool' },
                { name: 'ES_ANULAR', type: 'bool' },
                { name: 'ES_NUEVO', type: 'bool' },
                { name: 'GRUPO', type: 'number' }
            ],
            deleterow: function (rowid, commit) {
                // synchronize with the server - send delete command
                // call commit with parameter true if the synchronization with the server is successful 
                //and with parameter false if the synchronization failed.
                commit(true);
            }
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        return dataAdapter;
    };
    var _createGrid = function () {
        $(grid).jqxGrid(
            {
                width: '100%',
                source: _getdataAdapter(),
                theme: admPol.config.theme,
                altrows: true,
                editable: true,
                autoheight: true,
                autorowheight: true,
                editable: true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columns: [
                  { text: 'Amparo', datafield: 'NOM_POL', editable: false },
                  { text: 'Descripción', datafield: 'DES_POL', editable: !Radicacion.disabled },
                  { text: 'Anular', datafield: 'ES_ANULAR', width: 50, align: 'center', columntype: 'checkbox', editable: true },
                   {
                       text: 'Eliminar', datafield: 'Delete', columntype: 'button', width: 70, editable: true, cellsrenderer: function () {
                           return "Eliminar";
                       }, buttonclick: function (row) {

                           var selectedrowindex = $(grid).jqxGrid('getselectedrowindex');
                           var rowscount = $(grid).jqxGrid('getdatainformation').rowscount;
                           if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                               var id = $(grid).jqxGrid('getrowid', selectedrowindex);
                               var commit = $(grid).jqxGrid('deleterow', id);
                           }

                       }
                   },
                   {
                       text: 'Edit', datafield: 'Edit', columntype: 'button', width: 70, editable: true, cellsrenderer: function () {
                           return "Editar";
                       }, buttonclick: function (row) {
                           oper = "edit";
                           editrow = row;
                           var dataRecord = $(grid).jqxGrid('getrowdata', editrow);
                           $("#CboCodPol").byaSetHabilitar(false);
                           $("#CboCodPol").val(dataRecord.COD_POL);
                           $("#txtDescPol").val(dataRecord.DES_POL);

                       }
                   }
                ]
            });
    };


    // Convercion en la nueva tabla ... Carlos Tirado
    var tblPol;
    var lPol = new Array();
    var indexEditado;
    var _dibujarTabla = function () {
        var config = {
            Id: '#tblPol',
            Source: lPol,
            fn_Editar: EditarPol,
            fn_Seleccionar: VerDetallesPol,
            lEliminar: true,
            lEditar: true,
            lSeleccionar: false,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: true,
            fnFormatItem: function (item, index) {
                //alert(index);
                var Editar = '<span class="glyphicon glyphicon-edit clsstblPolEdit" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var Eliminar = '<span class="glyphicon glyphicon-remove clsstblPolDelete" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                //var Eliminar = '<span id="' + index + '" class="glyphicon glyphicon-remove codigos clsstblCodigosDelete" aria-hidden="true"></span>';

                var colomnBound = '<td>' + item.NOM_POL + "</td><td>" + item.DES_POL + "</td></td>";
                var Botones = '<td>' + Editar + ' </td><td>' + Eliminar + ' </td>';
                return colomnBound + Botones;
            }
        };
        tblPol = new byaTablaG();
        tblPol.init(config);
    };
    var EditarPol = function (item, index) {
        oper = "edit";
        indexEditado = index;
        VerDetallesPol(item);
    };
    var VerDetallesPol = function (item, index) {
        $("#CboCodPol").byaSetHabilitar(false);
        $("#CboCodPol").val(item.COD_POL);
        $("#txtDescPol").val(item.DES_POL);
    };
    var guardarNuevoTblPol = function () {
        var dataRecord = {};
        dataRecord.COD_POL = $("#CboCodPol").val();
        dataRecord.NOM_POL = $("#CboCodPol option:selected").text();
        dataRecord.DES_POL = $("#txtDescPol").val();
        dataRecord.ES_NUEVO = true;
        tblPol.addItem(dataRecord);
        lPol = tblPol.getSource();
        _dibujarTabla();
        $("#CboCodPol").val('');
        $("#txtDescPol").val('');
    };
    var guardarModficadoTblPol = function () {
        tblPol.getSource()[indexEditado].COD_POL = $("#CboCodPol").val();
        tblPol.getSource()[indexEditado].NOM_POL = $("#CboCodPol option:selected").text();
        tblPol.getSource()[indexEditado].DES_POL = $("#txtDescPol").val();
        tblPol.getSource()[indexEditado].ES_MODIF = true;
        lPol = tblPol.getSource();
        _dibujarTabla();
        $("#CboCodPol").val('');
        $("#txtDescPol").val('');
        $("#CboCodPol").byaSetHabilitar(true);
        oper = 'add';
    };

    return {
        disabled: null,
        editedRows: null,
        config: {
            theme: null
        },
        setDATOS: function () {
            lPol = Radicacion.getPol();
            if (lPol == null) lPol = new Array();
            _dibujarTabla();
        },
        getDATOS: function () {
            return tblPol.getSource();
        },
        init: function () {
            this.config.theme = Radicacion.config.theme;
            var sourceAmparos = byaPage.getSource('/EstPrev/Elaborar/wfRgEstPrev.aspx/GetPOLIZAS');
            CboCodPol = new byaComboBox();
            CboCodPol.init({ Id: "#CboCodPol", Source: sourceAmparos, Value: "COD_POL", Display: "NOM_POL" });
            _createGrid();
        },
        dhEnabled: function (value) {
            tblPol.setEnabled(value);
        }
    };
}());

var admRubros = (function () {
    var oper;
    var editrow = -1;
    var gridCon = '#jqxgridConRubros';
    var urlToGridCon = "../../Servicios/wsRubros.asmx/Gets";
    var urlToInsertRubro = "../../Servicios/wsRubros.asmx/Insert";
    var activarValidar = true;

    var _addHandlers = function () {
        $("#btnBsqRubro").click(function () {
            _verVentana();
        });
        $(gridCon).bind('rowselect', function (event) {
            var selectedRowIndex = event.args.rowindex;
            var cod, nom;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'COD_RUB');
            cod = cell.value;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'DES_RUB');
            nom = cell.value;
            $("#txtCodRub").val(cod);
            $("#txtDesRub").val(nom);
            $('#modalRubros').modal('hide');
        });
        $("#btnRegistrarNuevoRubro").click(function () {
            $('#modalRubros').modal('hide');
            $("#modalNuevoRubro").modal("show");
            admRubros.Limpiar();
        });
        $("#btnGuardarNuevoRubro").click(function () {
            GuargarNuevoRubro();
        });
    }
    var _verVentana = function () {
        //$(ventana).jqxWindow('open');
        $('#modalRubros').modal('show');
        _createGridCon();
    };
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_RUB', type: 'string' },
                    { name: 'DES_RUB', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon + "?filtro=" + byaSite.getVigencia(),
            data: {}
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });


        $(gridCon).jqxGrid(
                   {
                       width: '100%',
                       source: dataAdapter,
                       theme: admProy.config.theme,
                       localization: byaPage.getLocalization(),
                       height: 350,
                       sortable: true,
                       altrows: true,
                       showfilterrow: true,
                       filterable: true,
                       pageable: true,
                       enabletooltips: true,
                       columns: [
                       { text: 'Código', datafield: 'COD_RUB', width: 150, filtertype: 'textbox' },
                       { text: 'Descripción', datafield: 'DES_RUB', filtertype: 'textbox' }
                       ]
                   });
    };
    var _getDatos = function () {
        var e = {}
        e.COD_RUB = $("#txtCodigoRubroNuevo").val();
        e.DES_RUB = $("#txtDescripcionRubroNuevo").val();
        e.COD_UNIDAD = $("#txtCodigoUnidadRubroNuevo").val();
        e.COD_RECURSO = $("#txtCodigoRecursoRubroNuevo").val();
        e.CLASE = $("#txtClaseRubroNuevo").val();
        e.VIGENCIA = byaSite.getVigencia();
        return e;
    };
    var GuargarNuevoRubro = function () {
        if (_esValido()) {
            var jsonData = "{'Reg':" + JSON.stringify(_getDatos()) + "}";
            byaPage.POST_Sync(urlToInsertRubro, jsonData, function (result) {
                var res = byaPage.retObj(result.d);
                if (res.Error == false) {
                    $("#txtCodRub").val($("#txtCodigoRubroNuevo").val());
                    $("#txtDesRub").val($("#txtDescripcionRubroNuevo").val());
                }
                $("#modalNuevoRubro").modal("hide");
            });
        }
    };
    var _esValido = function () {
        var error = false;
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
            if (error) {
                $("#LbMsg").html("Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ");
            } else {
                $("#LbMsg").html("");
            }
        };
        if (activarValidar) {
            _ValidarEmpty("txt", "CodigoRubroNuevo");
            _ValidarEmpty("txt", "DescripcionRubroNuevo");
            _ValidarEmpty("txt", "CodigoUnidadRubroNuevo");
            _ValidarEmpty("txt", "CodigoRecursoRubroNuevo");
            _ValidarEmpty("txt", "ClaseRubroNuevo");
            _MensajeFinalValidacion();
        }
        return !error;
    };
    return {
        disabled: null,
        id_ep: null,
        editedRows: null,
        config: {
            theme: null
        },
        setDATOS: function () {
            return $(grid).jqxGrid({ source: _getdataAdapter() });
        },
        getDATOS: function () {
            return $(grid).jqxGrid('getboundrows');
        },
        init: function () {
            this.config.theme = Radicacion.config.theme;
            _addHandlers();
            _createGridCon();
        },
        Limpiar: function () {
            $("#txtCodigoRubroNuevo").val("");
            $("#txtDescripcionRubroNuevo").val("");
            $("#txtCodigoUnidadRubroNuevo").val("");
            $("#txtCodigoRecursoRubroNuevo").val("");
            $("#txtClaseRubroNuevo").val("");
        }
    };
}());

//var ModTer = (function () {
//    "use strict";
//    var msgPopup = "#msgTer";
//    var gridCon = '#jqxgridTer';
//    var urlToGridCon = "/Servicios/wsDatosBasicos.asmx/GetTerceros";

//    //crea GridTipos
//    var _createGridCon = function () {
//        var source = {
//            datatype: "xml",
//            datafields: [
//	                { name: 'IDE_TER', type: 'number' },
//                    { name: 'NOMBRE' }
//            ],
//            async: true,
//            record: 'Table',
//            url: urlToGridCon
//        };
//        var cellsrendererNOM = function (row, column, value) {
//            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
//        }
//        var cellsrendererIDE = function (row, column, value) {
//            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
//        }
//        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

//        $(gridCon).jqxGrid(
//                    {
//                        width: '100%',
//                        source: dataAdapter,
//                        theme: ModTer.config.theme,
//                        localization: byaPage.getLocalization(),
//                        height: 350,
//                        sortable: true,
//                        altrows: true,
//                        showfilterrow: true,
//                        filterable: true,
//                        pageable: true,
//                        enabletooltips: true,
//                        columns: [
//                          { text: 'Identificación', datafield: 'IDE_TER', width: 150, cellsformat: 'd', cellsalign: 'right' },
//                          { text: 'Apellidos y Nombre', datafield: 'NOMBRE', cellsrenderer: cellsrendererNOM }
//                        ]
//                    });

//        //rowselect
//        $(gridCon).bind('rowdoubleclick', function (event) {
//            var selectedRowIndex = event.args.rowindex;
//            var datarow = {};
//            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'IDE_TER');
//            datarow["IDE_TER"] = cell.value;
//            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'NOMBRE');
//            datarow["NOMBRE"] = cell.value;
//            ModTer.fnresultado(datarow);
//            _cerrarVentana();
//        });

//    };
//    var _cerrarVentana = function () {

//        $('#modalTerceros').modal('hide');
//        //_createGridCon();
//    };
//    var _verVentana = function () {

//        $('#modalTerceros').modal('show');
//        //_createGridCon();
//    };
//    return {
//        fnresultado: null,
//        config: {
//            theme: null
//        },
//        init: function () {
//            this.config.theme = byaSite.tema;
//            _createGridCon();
//        },
//        showWindow: function (fnresultado) {
//            this.fnresultado = fnresultado;
//            _verVentana();
//        }
//    };
//}());

$(document).ready(function () {

    byaSite.SetModuloP({ TituloForm: "Contratos", Modulo: "Radicación", urlToPanelModulo: "#", Cod_Mod: "CONT4", Rol: "CT_RAD" });

    $.data(document.body, 'theme', 'arctic');
    theme = getDemoTheme();

    Radicacion.config.theme = theme;
    Radicacion.init();
});

