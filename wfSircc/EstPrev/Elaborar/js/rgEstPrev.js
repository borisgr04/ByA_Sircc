var wizard = (function () {
    "use strict"
    var lstDoc;
    var lstCodigos;
    //seccion de URL
    var urlSourceEst = 'wfRgEstPrev.aspx/GetvEP_ESTADOS';
    var urlSourceCargo = 'wfRgEstPrev.aspx/GetvEP_CARGO';
    var urlSourceDep = 'wfRgEstPrev.aspx/GetvDEPENDENCIAT';
    var urlSourceDepS = 'wfRgEstPrev.aspx/GetvDEPENDENCIA';
    var urlSourceDepD = 'wfRgEstPrev.aspx/GetvDEPENDENCIAD';
    var urlSourceTip = 'wfRgEstPrev.aspx/GetvTIPOSCONT';
    var urlSourceMod = 'wfRgEstPrev.aspx/GetvModalidad';
    var urlSourcePla = 'wfRgEstPrev.aspx/GetvTIPO_PLAZOS';
    var urlSourcePlazos2 = 'wfRgEstPrev.aspx/GetvTIPO_PLAZOS2';

    var urlSourceTer = "/Servicios/wsDatosBasicos.asmx/GetNomTercerosPk";
    var urlSourceSubTip = 'wfRgEstPrev.aspx/GetvSUBTIPOS';
    var urlGetEstPrev = "/Servicios/EstPrev/wsGesEstPrev.asmx/GetEstPrev";
    var urlToUpdateESTPREV = "/Servicios/EstPrev/wsGesEstPrev.asmx/updateESTPREV";
    var urlToCreatePlantilla = "/Servicios/EstPrev/wsGesEstPrev.asmx/CreatePlantilla";
    var urlToInsertEstPrev = "/Servicios/EstPrev/wsGesEstPrev.asmx/insertESTPREV";
    var urlToDiligenciar = "EdEstPrev.html";
    var urlGetCodigosPAA = "/Servicios/wsPAA.asmx/GetProductos";

    var urlModalCodigosUNSPSC = "../CodigosUNSPSC/CodigoUNSPSC.html";

    var urlSourcePlantillas = "/Servicios/EstPrev/wsGesEstPrev.asmx/GetPlantillas";
    var NuevoDePlantilla = false;
    var lCodigosPAA = new Array();
    
    
    var editarButton = $("#editarButton");
    var nuevoButton = $("#nuevoButton");
    var abrirButton = $("#abrirButton");
    var guardarButton = $("#guardarButton");
    var cancelarButton = $("#cancelarButton");
    var imprimirButton = $("#imprimirButton");
    var diligenciarButton = $("#diligenciarButton");

    var dtoEstPrev = {};
    var byaRpta;
    
    var theme;
    var tema;
    var msgPpal = "#LbMsg";
    //Adding event listeners
   
    //Elaboración
    
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
            dataRecord.VAL_FPAG = anticipo;
            dataRecord.POR_FPAG = porc;
            dataRecord.CON_FPAG = Cond;
            dataRecord.PGEN_FPAG = "S";
            dataRecord.ES_NUEVO = true;
            dataRecord.ES_ANULAR = false;
        }
        return dataRecord;
    };
    var _genFP=function(){
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
        wizard.setFORMAPAGO(dsFormPago);
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
            valor = valor - dataRecord.VAL_FPAG;
            porc = porc - dataRecord.POR_FPAG;
        }
        //generar pago único
        dataRecord = new Object();
        var Cond = $("#txtCondGenFP").val();
        var valor = parseFloat(valor);
        dataRecord.ORD_FPAG = 1;
        dataRecord.CAN_PAG = 1;
        dataRecord.TIP_FPAG = "PU";
        dataRecord.NOM_TIP_FPAG = "PAGO ÚNICO";
        dataRecord.VAL_FPAG = valor;
        dataRecord.POR_FPAG = porc;
        dataRecord.CON_FPAG = Cond;
        dataRecord.PGEN_FPAG = "S";
        dataRecord.ES_NUEVO = true;
        dataRecord.ES_ANULAR = false;
        dsFormPago[i] = dataRecord;
        wizard.setFORMAPAGO(dsFormPago);
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
            valor = valor - dataRecord.VAL_FPAG;
            porc = porc - dataRecord.POR_FPAG;
        }

        dtoEstPrev.PLAZ1_EP = $("#TxtPlazo1").val();
        dtoEstPrev.TPLA1_EP = $("#CboTPlazo1").val();
        dtoEstPrev.PLAZ2_EP = $("#TxtPlazo2").val();
        dtoEstPrev.TPLA2_EP = $("#CboTPlazo2").val();
        var dias = 0;
        if (dtoEstPrev.TPLA1_EP == "M") {
            dias = parseFloat(dtoEstPrev.PLAZ1_EP * 30) + parseFloat(dtoEstPrev.PLAZ2_EP);
        }
        if (dtoEstPrev.TPLA1_EP == "D") {
            dias = dtoEstPrev.PLAZ1_EP;
        }
        $("#result").html('Cantidad Dias:<b/>' + dias + '</b><br>');
        var valordia = parseFloat(valor) / dias;
        $("#result").append('   -  Valor Dia:<b>' + valordia.toFixed(2) + '</b>');
        var valormes = valordia * 30;
        $("#result").append('   -  Valor Mes:<b>' + valormes.toFixed(2) + '</b>');

        dataRecord = new Object();
        var Cond = $("#txtCondGenFP").val();

        var can_mes = parseFloat(dtoEstPrev.PLAZ1_EP);
        /// valor
        var porc_mes = (valormes * can_mes) / valorTotal*100;
        dataRecord.ORD_FPAG = 1;
        dataRecord.CAN_PAG = can_mes;
        dataRecord.TIP_FPAG = "PM";
        dataRecord.NOM_TIP_FPAG = "PAGOS MENSUALES";
        dataRecord.VAL_FPAG = valormes;
        dataRecord.POR_FPAG = porc_mes;
        dataRecord.CON_FPAG = Cond;
        dataRecord.PGEN_FPAG = "S";
        dataRecord.ES_ANULAR = false;
        dataRecord.ES_NUEVO = true;
        dsFormPago[i] = dataRecord;

        if (parseFloat(dtoEstPrev.PLAZ2_EP) > 0) {
            var pagoFinal = parseFloat(dtoEstPrev.PLAZ2_EP) * valordia;
            var pagoD = " Un Pago Final de " + pagoFinal;
            dataRecord = new Object();
            dataRecord.CAN_PAG = 1;
            dataRecord.ORD_FPAG = 2;
            dataRecord.TIP_FPAG = "PF";
            dataRecord.NOM_TIP_FPAG = "PAGO FINAL";
            dataRecord.VAL_FPAG = pagoFinal;
            dataRecord.POR_FPAG = 1;
            dataRecord.CON_FPAG = Cond;
            dataRecord.PGEN_FPAG = "S";
            dataRecord.ES_ANULAR = false;
            dataRecord.ES_NUEVO = true;
            i = i + 1;
            dsFormPago[i] = dataRecord;
        }

        wizard.setFORMAPAGO(dsFormPago);
        admFP.setDATOS(dtoEstPrev.l_EP_FORMA_PAGO);
    };

    var _addHandlers = function () {

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
            _genAnticipo();
        });
        $("#BtnGenFP").click(function (event) {
            _genFP();
        });
            //inicio handlers
            $("#txtNumero").blur(function (event) {
                AbrirEP();
                
            });
            editarButton.click(function (event) {
                Editar();
            });
            nuevoButton.click(function (event) {
                nuevo();
            });
            abrirButton.click(function (event) {
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

                if (wizard.config.oper == 'editar') {
                    GuardarMod();
                } else {

                    GuardarNuevo();
                }
                
                //AbrirEP();
                //wizard.ValidarEL();
            });
            cancelarButton.click(function (event) {
                wizard.config.oper = 'cancelar';
                if (confirm("Desea cancelar el proceso?")) {

                    nuevoButton.byaSetHabilitar(true);
                    abrirButton.byaSetHabilitar(true);
                    editarButton.byaSetHabilitar(false);

                    guardarButton.byaSetHabilitar(false);
                    cancelarButton.byaSetHabilitar(false);
                    imprimirButton.byaSetHabilitar(false);
                    $("#lbEstado").html("");
                    $("#lbEstado").removeClass("alert alert-danger");
                    $("#lbEstado").removeClass("alert alert-warning");
                    $("#lbEstado").removeClass("alert alert-success");
                    $(msgPpal).html("");
                    wizard.Deshabilitar();
                    DesabilitarCamposAdicionales();
                    admRiesgos.DesabilitarOpcionesRiesgos();
                    wizard.Limpiar();
                    
                    wizard.BorrarCodigo = NoBorrarCodigos;
                    lstCodigos.setEnabled(false);
                    admCDP.setDATOS(new Array());
                    admCDP.dhBotonesModificacion(false);
                    admProy.dhEdicionProyectos(false);

                    $('#form1').jqxValidator('hide');
                    $('#form1').jqxValidator();

                    
                }
            });
            imprimirButton.click(function (event) {
                
                //byaSite.AbrirPagina("../PrintEP.html?id_ep=" + wizard.TxtID.val());
                
                var url = "../ashx/ashxEP.ashx?id_ep=" + dtoEstPrev.ID ;
                //var url = "../ashx/ashxEP.ashx?id_ep=" + dtoEstPrev.ID + '&tipo=doc';
                //SI la quieren en Word
                //
                window.open(url);
                
            });
            $('#printMatrizR').click(function (event) {
                var url = 'MatrizRiesgos.html?idEstPrev=' + wizard.TxtID.val();
                window.open(url);
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

        $("#BtnBuscCon").click(function () {

            ModTer.showWindow(function (ter) {
                $("#TxtNomCon").val(ter.NOMBRE);
                $("#TxtIdeCon").val(ter.IDE_TER);
            });

        });

        $("#btnBusqSupervisor").click(function () {

            ModTer.showWindow(function (ter) {
                $("#txtNombreSupervisor").val(ter.NOMBRE);
                $("#txtIdSupervisor").val(ter.IDE_TER);
            });

        });



        $("#BtnBuscRep").click(function () {

            ModTer.showWindow(function (ter) {
                $("#TxtNomRep").val(ter.NOMBRE);
                $("#TxtIdeRep").val(ter.IDE_TER);
            });

        });

        $('#CboTPlazo1').change(function (event) {
            var args = event.args;
            var item = $('#CboTPlazo1').val();
            if (item != null) {
                wizard.RefreshCboTPlazo2($('#CboTPlazo1').val());
            }
        });

        //Al seleccionar
        $('#CboTip').change(function (event) {
            wizard.RefreshCboSubTip();
        });
        $('#TxtIdeFun').blur(function () {
            
            wizard.BuscarTercero($('#TxtIdeFun'), $('#TxtNomFun'));
        });

        $('#TxtIdeRes').blur(function () {
            wizard.BuscarTercero($('#TxtIdeRes'), $('#TxtNomRes'));
        });

        $('#TxtIdeCon').blur(function () {
            wizard.BuscarTercero($('#TxtIdeCon'), $('#TxtNomCon'));
        });
        $('#TxtIdeRep').blur(function () {
            wizard.BuscarTercero($('#TxtIdeRep'), $('#TxtNomRep'));
        });
        $('#txtIdSupervisor').blur(function () {
            wizard.BuscarTercero($('#txtIdSupervisor'), $('#txtNombreSupervisor'));
        });
        

        $('#TxtIdeApoTec').blur(function () {
            wizard.BuscarTercero($('#TxtIdeApoTec'), $('#TxtNomApoTec'));
        });
        
        $('#txtValTot').change( function () {
            $('#txtValProp').val($('#txtValTot').byaGetDecimal());
            $('#txtValOtros').val(0);
            _genFP();
        });
        $('#txtValProp').change(function () {
            var tot = $('#txtValTot').byaGetDecimal();
            var prop = $('#txtValProp').byaGetDecimal()
            if (prop <= tot) {
                $('#txtValOtros').byaSetDecimal(tot - prop);
            }
            else {
                alert("Los aportes de la entidad no pueden superar el valor total a contratar");
                $('#txtValProp').byaSetDecimal(tot);
                $('#txtValOtros').byaSetDecimal(0);
                $('#txtValProp').focus();
            }
            _genFP();
        });


        //// Carlos, Codigos UNSPSC 
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
    var _iniElements = function () {

        //Inicializar Usuario
        var user = wizard.getUser();
        $("#TxtIdeFun").val(user);
        wizard.BuscarTercero($("#TxtIdeFun"), $("#TxtNomFun"));
        wizard.RefreshCboSubTip("00");
        wizard.RefreshCboTPlazo2("M");
    };
    var _createElements = function () {
        tema = wizard.config.theme;
        var sourceEst = byaPage.getSource(urlSourceEst);
        //$("#CboEstEP").byaCombo({ DataSource: sourceEst, Value: "COD_EST", Display: "NOM_EST" });
        //var sourceCargo = byaPage.getSource(urlSourceCargo);
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

       
        DesabilitarCamposAdicionales();

        ActListaPlanilla();
        
        admProy.init();
        admCDP.init();
        admRub.init();
        admFP.init();
        admPol.init();
        admDoc.init();
        ModTer.init();
        admPAA.init();
        admRubros.init();
        admRiesgos.init();
        crearEditoresHTML();
        wizard.hdCodigos(false);
    };

    var crearEditoresHTML = function () {
        crearEditorNecesidad();
    };
    var crearEditorNecesidad = function () {
        
        //#txtNecesidadContratar
        $(".editorHtml").kendoEditor({
            tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "insertUnorderedList",
                "insertOrderedList",
                "indent",
                "outdent",

                
                
                "formatting",
                "cleanFormatting",
                "subscript",
                "superscript",
                "createTable",
                    "addColumnLeft",
                    "addColumnRight",
                    "addRowAbove",
                    "addRowBelow",
                    "deleteRow",
                    "deleteColumn",
                "viewHtml",
                "formatting",
                "cleanFormatting",
                "fontName",
                "fontSize"
                
        
            ]
            //"insertImage",
            //"insertFile",
            //"insertHtml",
            //"foreColor",
            //"backColor"
            //"createLink",
                //"unlink",
        });

    };

    
    var DesabilitarCamposAdicionales = function () {
        
        $('.editorHtml').attr('contenteditable', 'false');
        /*$("#txtNecesidadContratar").byaSetHabilitar(false);
        $("#txtObligacionesGeneralesContratista").byaSetHabilitar(false);
        $("#txtObligacionesGeneralesContrante").byaSetHabilitar(false);
        $("#txtJustificacionValorContrato").byaSetHabilitar(false);
        $("#txtCapacidadJuridica").byaSetHabilitar(false);
        $("#txtCapacidadFinanciera").byaSetHabilitar(false);
        $("#txtCapacidadResidual").byaSetHabilitar(false);
        $("#txtPerspectivaLegal").byaSetHabilitar(false);
        $("#txtPerspectivaOrganizacional").byaSetHabilitar(false);
        $("#txtNecesidadContratarInterventor").byaSetHabilitar(false);
        $("#txtSometimientoAcuerdoComercial").byaSetHabilitar(false);
        $("#txtExperiencia").byaSetHabilitar(false);
        $("#txtConstanciaCumplimiento").byaSetHabilitar(false);
        */
        //$("#txtClasificacionUNSPSC").byaSetHabilitar(false);
        //$("#txtDescripcionUNSPSC").byaSetHabilitar(false);
        $("#txtIdSupervisor").byaSetHabilitar(false);
        $("#txtNombreSupervisor").byaSetHabilitar(false);
        $("#txtCargoSupervisor").byaSetHabilitar(false);
    };

    var HabilitarCamposAdicionales = function () {
        $('.editorHtml').attr('contenteditable', 'true');

        /*$("#txtNecesidadContratar").byaSetHabilitar(true);
        $("#txtObligacionesGeneralesContratista").byaSetHabilitar(true);
        $("#txtObligacionesGeneralesContrante").byaSetHabilitar(true);
        $("#txtJustificacionValorContrato").byaSetHabilitar(true);
        $("#txtCapacidadJuridica").byaSetHabilitar(true);
        $("#txtCapacidadFinanciera").byaSetHabilitar(true);
        $("#txtCapacidadResidual").byaSetHabilitar(true);
        $("#txtPerspectivaLegal").byaSetHabilitar(true);
        $("#txtPerspectivaOrganizacional").byaSetHabilitar(true);
        $("#txtNecesidadContratarInterventor").byaSetHabilitar(true);
        $("#txtSometimientoAcuerdoComercial").byaSetHabilitar(true);
        $("#txtExperiencia").byaSetHabilitar(true);
        $("#txtConstanciaCumplimiento").byaSetHabilitar(true);
        */

        //$("#txtClasificacionUNSPSC").byaSetHabilitar(true);
        //$("#txtDescripcionUNSPSC").byaSetHabilitar(true);
        $("#txtIdSupervisor").byaSetHabilitar(true);
        $("#txtNombreSupervisor").byaSetHabilitar(false);
        $("#txtCargoSupervisor").byaSetHabilitar(true);
    };
    //elaboracion
    var ActListaPlanilla = function ()
    {
        var sourcePlan = byaPage.getSource(urlSourcePlantillas, { Vigencia: byaSite.getVigencia() });
        //alert(JSON.stringify(sourcePlan));

        var config = {
            Id: '#dvdPlantillas',
            Source: sourcePlan,
            fn_callback: function (item) {
                //alert(JSON.stringify(item.CODIGO_EP));
                $("#txtNumero").val(item.CODIGO_EP);
                if ($("#TxtFecElaboracion").val() != "") {
                    byaMsgBox.confirm("Se creará el Estudio Previo con Fecha " + $("#TxtFecElaboracion").val() + ", Si Desea Continuar Presione el Botón Ok, Sino Presione el Botón Cancelar", function (result) {
                        if (result) {
                            NuevoDePlantilla = true;
                            AbrirEP();
                            $("#TxtIdeFun").val(wizard.getUser());
                            wizard.BuscarTercero($("#TxtIdeFun"), $("#TxtNomFun"));
                            GuardarNuevo();
                            NuevoDePlantilla = false;
                            $('#modalNuevoEP').modal('hide');
                        }
                    });
                } else {
                    byaMsgBox.alert("No ha establecido la fecha del estudio Previo");
                }
            },
            Display: 'NOM_PLA_EP',
            Value: 'CODIGO_EP',
            fnFormatItem: function (item) {
                //alert(JSON.stringify(item));
                return '<h4 class="list-group-item-heading">' + item.NOM_PLA_EP + '</h4>';
                ;
            }
        };
        lstDoc = new byaListaG();
        lstDoc.init(config);
    };
    var GuardarNuevo = function () {
        
        var jsonData = "{'Reg':" + JSON.stringify(wizard.GetDatosEP()) + "}";
        byaPage.POST_Sync(urlToInsertEstPrev, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                wizard.SetID(byaRpta.id);
                AbrirEP();
                //Editar();
            }
        });

    };
    var _esValidoC = function () {
        var Mensaje = "";
        var permiso = true;
        var RequierePoliza = $("#txtRequierePoliza").is(':checked') == true ? true : false;
        var RequiereCDP = $("#txtRequiereCDP").is(':checked') == true ? true : false;
        if (!RequiereCDP) {
            if ($("#txtObservacionesACDP").html() == "") {
                Mensaje = "<p>Ya que no se requiere CDP para este Estudio Previo, debe especificar el campo ‘Observaciones a CDP’</p>";
                permiso = false;
            }
        }
        if (!RequierePoliza) {
            if ($("#txtObservacionesAPolizas").html() == "") {
                Mensaje = Mensaje + "<p>Ya que no se requiere Póliza para este Estudio Previo, debe especificar el campo ‘Observaciones a Pólizas’</p>";
                permiso = false;
            }
        }
        if (!permiso) {
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: Mensaje, tipo: false });
        }
        return permiso;
    };

    var GuardarMod = function () {
        if (_esValidoC()) {
            //alert(JSON.stringify(wizard.GetDatosEP()));
            byaRpta = {};
            var jsonData = "{'Reg':" + JSON.stringify(wizard.GetDatosEP()) + "}";

            byaPage.POST_Sync(urlToUpdateESTPREV, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                //alert(byaRpta.Mensaje);

                if (!byaRpta.Error) {
                    wizard.AbrirEP();
                }
                $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            });
        }
    };

    var GuardarPlantilla = function () {

        //alert(JSON.stringify(wizard.GetDatosEP()));
        byaRpta = {};
        var jsonData = "{'Reg':" + JSON.stringify(GetDatosPlantilla()) + "}";

        byaPage.POST_Sync(urlToCreatePlantilla, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            //alert(byaRpta.Mensaje);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
        });
        ActListaPlanilla();
        $('#modalPlantilla').modal('hide');
        
    };


    var nuevo = function () {
        $('#modalNuevoEP').modal('show');
        /*
        nuevoButton.byaSetHabilitar(false);
        abrirButton.byaSetHabilitar(false);
        editarButton.byaSetHabilitar(false);

        guardarButton.byaSetHabilitar(true);
        cancelarButton.byaSetHabilitar(true);
        imprimirButton.byaSetHabilitar(true);
        wizard.config.oper = 'nuevo';
        wizard.Nuevo();
        admProy.setDATOS();
        admCDP.setDATOS();
        admFP.setDATOS();
        admPol.setDATOS();
        admDoc.setDATOS();
        */
    };

    var AbrirEP = function () {
        wizard.config.oper = 'abrir';
        wizard.AbrirEP();                   
    };

    var Editar = function () {        
        wizard.config.oper = 'editar';
        wizard.HabilitarE();
        wizard.disabled = false;
        wizard.BorrarCodigo = BorrarCodigos;

        //alert(JSON.stringify(lstCodigos.getSource()));

        lstCodigos.setEnabled(true);
        
        HabilitarCamposAdicionales();

        nuevoButton.byaSetHabilitar(false);
        abrirButton.byaSetHabilitar(false);
        editarButton.byaSetHabilitar(false);

        guardarButton.byaSetHabilitar(true);
        cancelarButton.byaSetHabilitar(true);
        imprimirButton.byaSetHabilitar(true);
        diligenciarButton.byaSetHabilitar(true);
        wizard.TxtID.byaSetHabilitar(false);

        admCDP.setEditable(true);
        admRiesgos.HabilitarOpcionesRiesgos();
        wizard.BorrarCodigo = BorrarCodigos;
        wizard.hdCodigos(true);
        
        admProy.dhEdicionProyectos(true);
        admFP.dhBotonesEditarFP(true);
        admPol.dhEnabled(true);
        if (byaSite.getIntegradoCDP()) {
            admCDP.dhBotonesModificacion(false);
            admCDP.dhBotonesDelete(true);            
        } else {
            admCDP.dhBotonesModificacion(true);
        }

        if ($("#cboENPLANC_EP").val() == "S") $("#btnBsqPAA").byaSetHabilitar(true);
        else $("#btnBsqPAA").byaSetHabilitar(false);
        
        //wizard._createValidacionEL(GuardarMod);
        //$(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: "después de modificar los datos y presione el botón guardar...!!!", tipo: "info" });
    };

    var GetDatosPlantilla=function () {
        var ep = {};
        ep.ID = dtoEstPrev.ID;
        ep.NOM_PLA_EP = $("#txtNOM_PLA_EP").val();
        return ep;
    };

    
    
    var crearTablaCodigos = function () {
        var config = {
            Id: '#tblCodigos',
            Source: lCodigosPAA,
            fn_Editar: function (item) {
                //alert(JSON.stringify(item));
            },
            lEliminar: true,
            lEditar:false,
            Display: 'NombreCodigo',
            Value: 'UNSPSC',
            fnFormatItem: function (item, index) {
                var Eliminar = '<span id="' + index + '" class="glyphicon glyphicon-remove codigos clsstblCodigosDelete" aria-hidden="true"></span>';
                return '<td>' + Eliminar + ' </td><td>' + item.UNSPSC + "</td><td>" + item.NombreCodigo + "</td>";
            },
            Enabled:false
        };
        lstCodigos = new byaTablaG();
        lstCodigos.init(config);
    };

    var _dibujarCodigos = function () {
        crearTablaCodigos();
        /*
        $("#lstCodigos").html("");
        $("#tblCodigos tbody").empty();
        $.each(lCodigosPAA, function (index, item) {
            $("#lstCodigos").append('<a class="list-group-item list-group-item-info" ><span id="' + index + '" onclick="wizard.BorrarCodigo(id)" class="glyphicon glyphicon-remove codigos" aria-hidden="true"></span> ' + item.UNSPSC + ' - ' + item.NombreCodigo + '</a>');

            var newRowContent = '<tr><td><span id="' + index + '" onclick="wizard.BorrarCodigo(id)" class="glyphicon glyphicon-remove codigos" aria-hidden="true"></span> </td><td>' + 1 + '</td><td>' + item.UNSPSC + "</td><td>" + item.NombreCodigo + "</td></tr>";
            $("#tblCodigos tbody").append(newRowContent);
        });
        */

    };
    var agregarCodigo = function (cod, nom) {
        if (_esValidoCodigo(cod)) {
            oCodigosUNSPSC.HideModal();
            var e = {};
            e.UNSPSC = cod;
            e.NombreCodigo = nom;
            lstCodigos.addItem(e);
            $("#txtUNSPSC").val("");
            $("#txtNombreProductoUNSPSC").val("");
            _dibujarCodigos();
        } else alert("El producto " + cod + " - " + nom + ", ya se encuentra agregado...");
    };
    var _esValidoCodigo = function (cod) {
        var ban = true;
        $.each(lstCodigos.getSource(), function (index, item) {
            if (item.UNSPSC == cod) {
                ban = false;
            }
        });
        return ban;
    };
    var NoBorrarCodigos = function (id) {
    };
    var BorrarCodigos = function (index) {
        delete lCodigosPAA[index];
        lCodigosPAA.splice(index, 1);
        _dibujarCodigos();
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
            dtoEstPrev.l_EP_PROYECTOS=value;
        },
        getPol: function () {
            return dtoEstPrev.l_EP_POLIZAS2;
        },
        setPol: function (value) {
            dtoEstPrev.l_EP_POLIZAS2=value;
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
        },
        ValidarEL: function () {
            $('#form1').jqxValidator('validate');
        },
        _createValidacionEL: function (fnOk) {
        },
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
        GetID: function () {
            return $(wizard.TxtID).val();
        },
        SetID: function (value) {
            $(wizard.TxtID).val(value);
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
        //Initializing the wizzard - creating all elements, adding event handlers and starting the validation
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
                wizard.TxtID.val(EP);
                AbrirEP();
                
            }
            this.Deshabilitar();
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
            $("#CboTip").byaSetHabilitar(false);
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
            this.disabled = true;
        },
        Limpiar: function () {
            $('#form1')[0].reset();
            //$('#FrmEstPrev :input').attr('value', '');
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
        },
        HabilitarE: function () {
            //cambiar
            $('.inputHab').byaSetHabilitar(true);
            //$('#form1 :input').attr('disabled', false);

            $('#TxtNomFun').attr('disabled', true);
            $('#TxtIdeFun').attr('disabled', true);
            $('#TxtNomRes').attr('disabled', true);
            $('#txtValOtros').attr('disabled', true);
            
            $("#CboDepSup").byaSetHabilitar(true);
            $("#CboDepSol").byaSetHabilitar(true);
            $("#CboTip").byaSetHabilitar(true);
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

            $(".intCDP").byaSetHabilitar(!wizard.getIntFin());
            this.disabled = false;
            //MostrarTab(TabActual);
            //wizard.loadPageTabs($("#jqxTabs").jqxTabs('val') + 1);
        },
        imprimir: function () {
            byaSite.AbrirPagina("../ashx/descEP.ashx?id_ep=" + wizard.TxtID.val());
        },
        Nuevo: function (GuardarNuevo) {
            wizard.Limpiar(); //Limpiar los input
            wizard.HabilitarN(); //Habilitar para nuevo
            wizard.TxtID.byaSetHabilitar(false);
            
            //wizard._createValidacionEL(GuardarNuevo); //Configurar el Validador
            wizard.RefreshCboSubTip("00");
            wizard.RefreshCboTPlazo2("M");
            //Colocar en Valores Por Defecto
            var user = wizard.getUser();
            $("#TxtIdeFun").val(user);
            wizard.BuscarTercero($("#TxtIdeFun"), $("#TxtNomFun"));
            wizard.SetID(0);
            wizard.config.oper = 'nuevo';
            var now = new Date();
            $("#TxtFecElab").val(byaPage.FechaShortX(now));
            $("#TxtFecElab").focus();
        },
        AbrirEP: function () {
            var msgPpal = "#LbMsg";
            var sw = false;
            var tip;
            
            if (wizard.GetID() == "") {
                $(msgPpal).msgBox({ titulo: "Estudios Previos...", mensaje: "Por favor Digite un Número de Estudio Previo...!!!", tipo: false });
                wizard.TxtID.focus();
                wizard.disabled = true;
                return false;
            }
            tip = 'EL';// tip.replace('#', '');
            var parametrosJSON = {
                "codigo_ep":wizard.GetID(),
                "tipo": '*'
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
                        $(msgPpal).msgBox({ titulo: "Estudios Previos...", mensaje: "Estudio Previo N° " + wizard.GetID() + " no encontrado...!!!", tipo: false });
                    }
                    else {
                        dtoEstPrev = ep;
                        //alert(dtoEstPrev.ID);
                        //alert(JSON.stringify(dtoEstPrev));
                        //alert(JSON.stringify(ep.l_EP_CDP[0]));
                        if (ep.EST_EP == "EL") {
                           
                            $("#lbEstado").text("Elaboración");
                            $("#lbEstado").addClass("alert alert-danger");
                        }
                        if (ep.EST_EP == "RV") {
                            //alert(sourceESTPREV.EST_EP);
                           
                            $("#lbEstado").text("Revisado");
                            $("#lbEstado").removeClass("alert alert-danger");
                            $("#lbEstado").addClass("alert alert-warning");

                        }
                        if (ep.EST_EP == "AP") {
                            //alert(sourceESTPREV.EST_EP);
                           
                            $("#lbEstado").text("Aprobado");
                            $("#lbEstado").removeClass("alert alert-warning");
                            $("#lbEstado").addClass("alert alert-success");
                        }

                        $('#TxtObjCon').val(ep.OBJE_EP);
                        $('#TxtLugar').val(ep.LUGE_EP);
                        $('#TxtPlazoLiq').val(ep.PLIQ_EP);
                        $("#CboEstEP").val(ep.EST_EP);

                        if (NuevoDePlantilla) {
                            $("#TxtFecElab").val($("#TxtFecElaboracion").val());
                        } else {
                            $("#TxtFecElab").val(byaPage.converJSONDate(ep.FEC_ELA_EP));
                            $("#TxtFecElaboracion").val(byaPage.converJSONDate(ep.FEC_ELA_EP));
                        }

                        //alert($("#TxtFecElaboracion").val());
                        //Quien Diligencia
                        $("#TxtIdeFun").val(ep.IDE_DIL_EP);
                        wizard.BuscarTercero($("#TxtIdeFun"), $("#TxtNomFun"));
                        $("#TxtIdeRes").val(ep.IDE_RES_EP);
                        wizard.BuscarTercero($("#TxtIdeRes"), $("#TxtNomRes"));

                        $("#TxtIdeCon").val(ep.IDE_CON_EP);
                        wizard.BuscarTercero($("#TxtIdeCon"), $("#TxtNomCon"));

                        $("#TxtIdeRep").val(ep.IDE_REP_EP);
                        wizard.BuscarTercero($("#TxtIdeRep"), $("#TxtNomRep"));
                        
                        $("#CboDepSup").val(ep.DEP_SUP_EP);
                        $("#CboDepSol").val(ep.DEP_NEC_EP);
                        $("#CboTip").val(ep.TIP_CON_EP);
                        wizard.RefreshCboSubTip();
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

                        $("#txtObligC").html(ep.OBLIGC);
                        $("#txtObligE").html(ep.OBLIGE);

                        $("#txtNOM_PLA_EP").val(ep.NOM_PLA_EP);
                        $("#cboENPLANC_EP").val(ep.ENPLANC_EP);

                        

                        $("#CboTipoPpto").val(ep.TIPO_PPTO);

                        $("#txtPAAId").val(ep.PAAID);
                        $("#txtDescripcionPAA").val(ep.PAADESC);

                        $("#EspObjCon").html(ep.ESP_OBJ_EP);
                        $("#AutorizacionPermisoLicencias").html(ep.AUTPERLIC_EP);
                        $("#DocTecnicos").html(ep.DOCTECNICOS_EP);

                        $("#txtVariablesCalculoPpto").html(ep.VARIABLESPPTO_EP);

                        $("#txtIdoneidad").html(ep.IDONEIDAD_EP);
                        $("#txtCapOrgan").html(ep.CAP_ORGANIZACIONAL_EP);
                        $("#txtFactoresEscogenciaCalificacionIdoneidad").html(ep.FACTORES_EVALUACION_EP);
                        $("#txtReglasDesempates").html(ep.REGLAS_DESEMPATE_EP);

                        //Modifcaicon Boris, 9 de Febrero 2015
                        //Modificación Carlos, 6 de Febrero 2015



                        //$("#ChkApoEnt").attr('checked', item.PGEN_FPAG == "S" ? true : false);

                        $("#txtActividadesConcretasDesarrollar").html(ep.ACT_CONT_EP);
                        $("#txtAportesPropiosConvenios").val(ep.DESC_APORTES_PROPIOS_EP); 
                        $("#txtRequiereCDP").attr('checked', ep.REQ_CDP_EP == "S" ? true : false);
                        $("#txtObservacionesACDP").html(ep.OBS_CDP_EP);
                        $("#txtObservacionesAPolizas").html(ep.OBS_POL_EP); 
                        $("#txtRequierePoliza").attr('checked', ep.REQ_POL_EP == "S" ? true : false);
                        $("#txtInicioApartirDe").val(ep.INICIO_APARTIR_DE_EP);
                        $("#txtFechaInicioContrato").val(byaPage.converJSONDate(ep.FEC_INICIO_EP));
                        $("#txtFechaTerminacionContrato").val(byaPage.converJSONDate(ep.FEC_FIN_EP));
                        
                        $("#txtNecesidadContratar").html(ep.NEC_EP);

                        $("#txtObligacionesGeneralesContratista").html(ep.OBLIGGRC);
                        $("#txtObligacionesGeneralesContrante").html(ep.OBLIGGRE);
                        $("#txtJustificacionValorContrato").html(ep.JUST_VALOR_EP);
                        $("#txtCapacidadJuridica").html(ep.CAP_JURIDICA_EP);
                        $("#txtCapacidadFinanciera").html(ep.CAP_FINANCIERA_EP);
                        $("#txtCapacidadResidual").html(ep.CAP_RESIDUAL_EP);
                        $("#txtPerspectivaLegal").html(ep.PERS_LEGAL_EP);
                        $("#txtPerspectivaOrganizacional").html(ep.PERS_ORGA_EP);
                        $("#txtNecesidadContratarInterventor").html(ep.NEC_CONT_INT_EP);
                        $("#txtSometimientoAcuerdoComercial").html(ep.SOM_ACUE_COMER_EP);
                        $("#txtExperiencia").html(ep.CAP_EXPERIENCA_EP);
                        $("#txtConstanciaCumplimiento").html(ep.CONST_CUMP_DEBERES_EP);
                        $("#txtModalidadSeleccionJustificacionFundamentosJuridicos").html(ep.FUN_JUR_MOD);
                        $("#txtCargoResponsable").val(ep.CAR_RES_EP);
                        if(ep.l_EP_UNSPSC != null) lCodigosPAA = ep.l_EP_UNSPSC;
                        
                        _dibujarCodigos();

                        
                        //$("#txtClasificacionUNSPSC").val(ep.COD_UNSPSC_EP);
                        //$("#txtDescripcionUNSPSC").val(ep.DES_UNSPSC_EP);
                        
                        

                        $("#txtIdSupervisor").val(ep.IDE_SUP_EP);
                        wizard.BuscarTercero($("#txtIdSupervisor"), $("#txtNombreSupervisor"));
                        //$("#txtNombreSupervisor").val(ep.NOM_SUP_EP);
                        $("#txtCargoSupervisor").val(ep.CAR_SUP_EP);

                        $("#btnGuardarCDP").byaSetHabilitar(false);
                        $("#btnGuardarRubro").byaSetHabilitar(false);
                        $("#btnNuevoCDP").byaSetHabilitar(false);
                       
                        

                        $('#diligenciarButton').attr("href", urlToDiligenciar + "?id=" + dtoEstPrev.ID)
                        wizard.hdCodigos(false);
                        admProy.setDatosTablaProyectos();
                        
                        if (dtoEstPrev.l_EP_CDP != null) admCDP.setDATOS(dtoEstPrev.l_EP_CDP);
                        else admCDP.setDATOS(new Array());                       
                        
                        
                        if (dtoEstPrev.l_EP_FORMA_PAGO != null) admFP.setDATOS(dtoEstPrev.l_EP_FORMA_PAGO);
                        else admFP.setDATOS(new Array());
                        admFP.dhBotonesEditarFP(false);
                        
                        admPol.setDATOS();
                        admDoc.setDATOS();
                        if (ep.l_EP_RIESGOS != null) admRiesgos.SetDatos(ep.l_EP_RIESGOS);
                        else admRiesgos.SetDatos(new Array());

                        $('.editorHtml').attr('contenteditable', 'false');
                        $(msgPpal).html('');
                        admPol.dhEnabled(false);
                        sw = true;



                        if (ep.EST_EP == "EL") {
                            editarButton.byaSetHabilitar(true);
                            nuevoButton.byaSetHabilitar(false);
                            abrirButton.byaSetHabilitar(true);
                            guardarButton.byaSetHabilitar(false);
                            cancelarButton.byaSetHabilitar(true);
                            imprimirButton.byaSetHabilitar(true);
                            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: "Listo...!!! Si desea modificar debe presionar el boton Editar, realizar los cambios y presione el Botón Guardar.", tipo: "info" });
                        }

                        if (ep.EST_EP != "EL") {
                            wizard.Deshabilitar();
                            editarButton.byaSetHabilitar(false);
                            nuevoButton.byaSetHabilitar(false);
                            abrirButton.byaSetHabilitar(true);
                            guardarButton.byaSetHabilitar(false);
                            cancelarButton.byaSetHabilitar(true);
                            imprimirButton.byaSetHabilitar(true);
                            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: "El Estudio Previo se encuentra en estado Aprobado, No se puede Editar.", tipo: "info" });
                        }
                    }
                },
                error: function (jqXHR, status, error) {
                    alert(error + "-" + jqXHR.responseText);
                }
            });
            return sw;
        },
        GetDatosEP: function () {
        var ep = {};
        ep.ID = dtoEstPrev.ID;
        ep.OBJE_EP = $('#TxtObjCon').val();
        ep.LUGE_EP = $('#TxtLugar').val();
        ep.PLIQ_EP = $('#TxtPlazoLiq').val();
        ep.FEC_ELA_EP = $('#TxtFecElaboracion').val();
        ep.IDE_RES_EP = $("#TxtIdeRes").val();
        ep.IDE_DIL_EP = $("#TxtIdeFun").val();
        ep.DEP_SUP_EP = $("#CboDepSup").val();
        ep.DEP_NEC_EP = $("#CboDepSol").val();
        ep.TIP_CON_EP = $("#CboTip").val();
        ep.MOD_SEL_EP = $("#CboMod").val();
        ep.TIP_CON_EP = $("#CboTip").val();
        ep.STIP_CON_EP = $("#CboSubTip").val();
        ep.VIG_EP = byaSite.getVigencia();
        ep.DEP_DEL_EP = $("#CboDepDel").val();
        ep.VAL_ENT_EP = $("#txtValProp").byaGetDecimal();
        ep.VAL_OTR_EP = $("#txtValOtros").byaGetDecimal();
        ep.PLAZ1_EP = $("#TxtPlazo1").val();
        ep.TPLA1_EP = $("#CboTPlazo1").val();
        ep.PLAZ2_EP = $("#TxtPlazo2").val();
        ep.TPLA2_EP = $("#CboTPlazo2").val();
        ep.TIPO_FP = $("#cboFPagoTipo").val();
        ep.ANTI_PORC = $("#txtAnti_Porc").val();
        ep.PERSONA_APOYO = $("#cboApoyo").val();
        
        ep.OBLIGC = $("#txtObligC").html();
        ep.OBLIGE = $("#txtObligE").html();
        ep.ENPLANC_EP = $("#cboENPLANC_EP").val();
        ep.TIPO_PPTO = $("#CboTipoPpto").val();
        ep.IDE_CON_EP = $("#TxtIdeCon").val();
        ep.IDE_REP_EP = $("#TxtIdeRep").val();

        ep.FUN_JUR_MOD = $("#txtModalidadSeleccionJustificacionFundamentosJuridicos").html();
        ep.CAR_RES_EP = $("#txtCargoResponsable").val();
            // campos adicionales de estudio previo //

        ep.NEC_EP = $("#txtNecesidadContratar").html();
        ep.OBLIGGRC = $("#txtObligacionesGeneralesContratista").html();
        ep.OBLIGGRE = $("#txtObligacionesGeneralesContrante").html();
        ep.JUST_VALOR_EP = $("#txtJustificacionValorContrato").html();
        ep.CAP_JURIDICA_EP = $("#txtCapacidadJuridica").html();
        ep.CAP_FINANCIERA_EP = $("#txtCapacidadFinanciera").html();
        ep.CAP_RESIDUAL_EP = $("#txtCapacidadResidual").html();
        ep.PERS_LEGAL_EP = $("#txtPerspectivaLegal").html();
        ep.PERS_ORGA_EP = $("#txtPerspectivaOrganizacional").html();
        ep.NEC_CONT_INT_EP = $("#txtNecesidadContratarInterventor").html();
        ep.SOM_ACUE_COMER_EP = $("#txtSometimientoAcuerdoComercial").html();
        ep.CAP_EXPERIENCA_EP = $("#txtExperiencia").html();
        ep.CONST_CUMP_DEBERES_EP = $("#txtConstanciaCumplimiento").html();
        ep.COD_UNSPSC_EP = $("#txtClasificacionUNSPSC").val();
        ep.DES_UNSPSC_EP = $("#txtDescripcionUNSPSC").val();
        ep.IDE_SUP_EP = $("#txtIdSupervisor").val();
        ep.NOM_Sup_EP = $("#txtNombreSupervisor").val();
        ep.CAR_SUP_EP = $("#txtCargoSupervisor").val();

        ep.PAAID = $("#txtPAAId").val();
        ep.PAADESC = $("#txtDescripcionPAA").val();

        ep.ESP_OBJ_EP = $("#EspObjCon").html();
        ep.AUTPERLIC_EP = $("#AutorizacionPermisoLicencias").html();
        ep.DOCTECNICOS_EP = $("#DocTecnicos").html();

        ep.VARIABLESPPTO_EP = $("#txtVariablesCalculoPpto").html();

        ep.IDONEIDAD_EP = $("#txtIdoneidad").html();
        ep.CAP_ORGANIZACIONAL_EP = $("#txtCapOrgan").html();
        ep.FACTORES_EVALUACION_EP = $("#txtFactoresEscogenciaCalificacionIdoneidad").html();
        ep.REGLAS_DESEMPATE_EP = $("#txtReglasDesempates").html();

        ep.ACT_CONT_EP = $("#txtActividadesConcretasDesarrollar").html();
        ep.DESC_APORTES_PROPIOS_EP = $("#txtAportesPropiosConvenios").val();
        ep.REQ_CDP_EP = $("#txtRequiereCDP").is(':checked') == true ? "S" : "N";
        ep.OBS_CDP_EP = $("#txtObservacionesACDP").html(); 
        ep.OBS_POL_EP = $("#txtObservacionesAPolizas").html();
        ep.REQ_POL_EP = $("#txtRequierePoliza").is(':checked') == true ? "S" : "N";
        ep.INICIO_APARTIR_DE_EP = $("#txtInicioApartirDe").val();
        ep.FEC_INICIO_EP = $("#txtFechaInicioContrato").val();
        ep.FEC_FIN_EP = $("#txtFechaTerminacionContrato").val();
        
        ep.NUM_EMP_EP = 0;
        ep.GRUPOS_EP = 0;
        //enlazar lista
        ep.l_EP_PROYECTOS = admProy.getDATOS();
        ep.l_EP_CDP = admCDP.getDATOS();
        ep.l_EP_FORMA_PAGO = admFP.getDATOS();
        ep.l_EP_POLIZAS2 = admPol.getDATOS();
        ep.l_EP_CLAUSULAS = admDoc.getDATOS();
        ep.l_EP_RIESGOS = admRiesgos.GetDatos();
        ep.l_EP_UNSPSC = lCodigosPAA;
            
        return ep;
        },
        getCodigo_Ep: function () {

            return $.getUrlVar("codigo_ep");
        },
        BorrarCodigo: function (index) {
            BorrarCodigos(index);
        },
        hdCodigos: function (value) {
            $("#btnBuscarCodigoUNSPSC").byaSetHabilitar(value);
        },
        traerCodigos : function (idPaa) {
            var parametro = {
                ID : "'" + idPaa + "'"
            }
            $.ajax({
                type: "GET",
                url: urlGetCodigosPAA,
                data: parametro,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (result) {
                    var lnewCodigos = byaPage.retObj(result.d);
                    lCodigosPAA = new Array();
                    $.each(lnewCodigos, function (index, item) {
                        var e = {};
                        e.UNSPSC = item.UNSPSC;
                        e.NombreCodigo = item.NombreCodigo;
                        lCodigosPAA.push(e);
                    });
                    _dibujarCodigos();                   
                },
                error: function (jqXHR, status, error) {
                    alert(error + "-" + jqXHR.responseText);
                }
            });
        },
        setDatosCodigosUNSPSC: function (lnewCodigos) {
            lCodigosPAA = lnewCodigos;
            _dibujarCodigos();
        }
    };
} ());

var admProy = (function () {
    var grid = "#jqxgridProy";
    var msgPpal = "#msgProy";
    var oper;
    var editrow = -1;
    var divBtnGrid = "#divBtnGridProy";
    var gridCon = '#jqxgridConProy'; 
    var urlToGridCon = "wfRgEstPrev.aspx/GetProyectos";
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
                traerProyecto(cod);
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
    var _verVentana=function () {
        //$(ventana).jqxWindow('open');
        $('#modalPry').modal('show');
        _createGridCon();
    }
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'Nro_Proyecto', type: 'string' },
                    { name: 'Nombre_Proyecto', type: 'string'}
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
        var dat = wizard.getProyectos();
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
        getDATOS:function(){
            return tableProy.getSource();
        },
        setDatosTablaProyectos: function () {
            CargarTabla();
        },
        init: function () {
            this.config.theme = wizard.config.theme;
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
    var _getDatos = function(){
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
            Enabled:true,
            fnFormatItem: function (item, index) {
                //alert(index);
                var Consultar = '<span class="glyphicon glyphicon-search clsstblCdpSelect" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var Editar = '<span class="glyphicon glyphicon-edit clsstblCdpEdit" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var Eliminar = '<span class="glyphicon glyphicon-remove clsstblCdpDelete" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';

                var colomnBound = '<td>' + item.NRO_CDP + "</td><td>" + item.FEC_CDP + "</td><td>" + byaPage.formatNumber.new(item.VAL_CDP, "$") + "</td><td>" + item.VIG_FUT + "</td>";
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
            });
            lCDPs = lnewCDP;
            DibujarCDPs();
        },
        getDATOS: function () {
            return tblCdp.getSource();
        },
        getRubros: function () {
            //alert(uid_cdp);
            if (uid_cdp >= 0) { return wizard.getCDP()[uid_cdp].EP_RUBROS_CDP; }
            return null;
        },
        setEditable: function (value) {
            
        },
        init: function () {
            
            this.config.theme = wizard.config.theme;
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
                
                var colomnBound = '<td>' + item.COD_RUB + "</td><td>" + item.NOM_RUB + "</td><td>" + byaPage.formatNumber.new(item.VALOR, "$") + "</td>";
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
    var VerDetalles= function (item, index) {
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
    var Editar = function (item,index) {
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
    var GuardarNuevo = function () {
        var dataRecord = {};
        dataRecord.CAN_PAG = 1;
        dataRecord.ORD_FPAG = 1;
        dataRecord.TIP_FPAG = $("#CboTipPag").val();
        dataRecord.VAL_FPAG = $("#txtValPag").byaGetDecimal();
        dataRecord.POR_FPAG = $("#txtPorc").byaGetDecimal();
        dataRecord.CON_FPAG = $("#txtCond").val();
        dataRecord.PGEN_FPAG = $("#ChkApoEnt").is(':checked') == true ? "S" : "N";
        dataRecord.NOM_TIP_FPAG = $("#CboTipPag option:selected").text();
        dataRecord.ES_NUEVO = true;
        var commit = $(grid).jqxGrid('addrow', null, dataRecord);
            $("#dvdMsg").addClass("alert alert-success");
            $("#lbMsg").html("Se agregó el item de la forma de pago");
            getTotalGrid();
    };
    var GuardarNuevoTBL = function () {
        var dataRecord = {};
        dataRecord.CAN_PAG = 1;
        dataRecord.ORD_FPAG = 1;
        dataRecord.TIP_FPAG = $("#CboTipPag").val();
        dataRecord.VAL_FPAG = $("#txtValPag").byaGetDecimal();
        dataRecord.POR_FPAG = $("#txtPorc").byaGetDecimal();
        dataRecord.CON_FPAG = $("#txtCond").val();
        dataRecord.PGEN_FPAG = $("#ChkApoEnt").is(':checked') == true ? "S" : "N";
        dataRecord.NOM_TIP_FPAG = $("#CboTipPag option:selected").text();
        dataRecord.ES_NUEVO = true;
        tblFP.addItem(dataRecord);
        lFP = tblFP.getSource();
        _dibujarTabla();
        tblFP.setEnabled(true);
        $("#dvdMsg").addClass("alert alert-success");
        $("#lbMsg").html("Se agregó el item de la forma de pago");
    };
    var GuardarMod = function () {
        if (editrow >= 0) {
            var rowID = $(grid).jqxGrid('getrowid', editrow);
            var dataRecord = $(grid).jqxGrid('getrowdata', editrow);
            dataRecord.ORD_FPAG = $("#txtOrden").val();
            dataRecord.TIP_FPAG = $("#CboTipPag").val();
            dataRecord.VAL_FPAG = $("#txtValPag").byaGetDecimal();
            dataRecord.POR_FPAG = $("#txtPorc").byaGetDecimal();
            dataRecord.CON_FPAG = $("#txtCond").val();
            dataRecord.PGEN_FPAG = $("#ChkApoEnt").is(':checked') == true ? "S" : "N";
            var commit = $(grid).jqxGrid('updaterow', rowID, dataRecord);
                $("#dvdMsg").addClass("alert alert-success");
                $("#lbMsg").html("Se actualizó el item de la forma de pago");
                getTotalGrid();
        }
    };
    var GuardarModTBL = function () {
        var dataRecord = tblFP.getSource()[indexEditado];
        dataRecord.TIP_FPAG = $("#CboTipPag").val();
        dataRecord.VAL_FPAG = $("#txtValPag").byaGetDecimal();
        dataRecord.POR_FPAG = $("#txtPorc").byaGetDecimal();
        dataRecord.CON_FPAG = $("#txtCond").val();
        dataRecord.PGEN_FPAG = $("#ChkApoEnt").is(':checked') == true ? "S" : "N";
        dataRecord.ES_MODIF = true;
        tblFP.getSource()[indexEditado] = dataRecord;
        _dibujarTabla();
        tblFP.setEnabled(true);
        $("#dvdMsg").addClass("alert alert-success");
        $("#lbMsg").html("Se actualizó el item de la forma de pago");
    };

    var ControlCaptura = function () {
        var opt = $('input:radio[name=CboVP]:checked').val();
        if (opt == "V") {
            $("#txtValPag").byaSetHabilitar(true);
            $("#txtPorc").byaSetHabilitar(false);
        } else {
            $("#txtValPag").byaSetHabilitar(false);
            $("#txtPorc").byaSetHabilitar(true);
        }
        $("#txtValPag").byaSetDecimal(0);
        $("#txtPorc").val(0);
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
        verGenerar();
    });
    $("#btnAgregarFP").click(function () {
        oper = "add";
        verVentana();
    }); 
    var verGenerar = function () {
        $('#modalGenFP').modal('show');
    };

    var verVentana = function () {
        ControlCaptura();
        $('#modalFP').modal('show');
    };
     
    var _esValidoFP=function(){
        
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
            if ($("#CboTipPag").val() == "") {
                $("#dvdTipPag").addClass("has-error");
                error=true;
            }else{
                $("#dvdTipPag").removeClass("has-error");
            }
            if ($("#txtValPag").byaGetDecimal() <= 0) {
                $("#dvdValPag").addClass("has-error");
                error = true;
            } else {
                $("#dvdValPag").removeClass("has-error");
            }

            if ($("#txtPorc").val() <= 0 || $("#txtPorc").val()>100) {
                $("#dvdPorc").addClass("has-error");
                error = true;
            } else {
                $("#dvdPorc").removeClass("has-error");
            }
            if ($("#txtCond").val() =="") {
                $("#dvdCond").addClass("has-error");
                error = true;
            } else {
                $("#dvdCond").removeClass("has-error");
            }


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

    $("#BtnFPGuardar").click(function () {
        activarValidar = true;
        if (_esValido()) {
            if (oper == "add") {
                //GuardarNuevo();
                GuardarNuevoTBL();
            }
            if (oper == "edit") {
                //GuardarMod();
                GuardarModTBL();
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
        var datosGrid = $(grid).jqxGrid('getboundrows');
        var acumV = 0;
        var acumP = 0;
        $.each(datosGrid, function (index, item) {
            acumP = acumP + item.POR_FPAG;
            acumV = acumV + item.VAL_FPAG;
        });
        var SaldoP = 100 - acumP;
        var SaldoV = admFP.getValTotal() - acumV;

        $("#txtSaldoP").val(SaldoP);
        $("#txtSaldoV").byaSetDecimal(SaldoV);
    };
    //Creating all page elements which are jqxWidgets
    var _createElements = function () {
        var sourceTIPPAG=byaPage.getSource('wfRgEstPrev.aspx/GetTIPO_PAGO')
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
                //alert(index);
                var Editar = '<span class="glyphicon glyphicon-edit clsstblFPEdit" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var Eliminar = '<span class="glyphicon glyphicon-remove clsstblFPDelete" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                //var Eliminar = '<span id="' + index + '" class="glyphicon glyphicon-remove codigos clsstblCodigosDelete" aria-hidden="true"></span>';

                var colomnBound = '<td>' + item.ORD_FPAG + "</td><td>" + item.CAN_PAG + "</td><td>" + item.NOM_TIP_FPAG + "</td><td>" + byaPage.formatNumber.new(item.VAL_FPAG, "$") + "</td><td>" + item.POR_FPAG + "</td><td>" + item.PGEN_FPAG + "</td><td>" + item.CON_FPAG + "</td>";
                var Botones = '<td>' + Editar + ' </td><td>' + Eliminar + ' </td>';
                return colomnBound + Botones;
            }
        };
        tblFP = new byaTablaG();
        tblFP.init(config);
    };
    var indexEditado;
    var EditarFPs = function (item, index) {
        oper = "edit";
        indexEditado = index;
        VerDetallesFPs(item);
        verVentana();
    };
    var VerDetallesFPs = function (item, index) {
        $("#txtOrden").val(item.ORD_FPAG);
        $("#CboTipPag").val(item.TIP_FPAG);
        $("#txtValPag").byaSetDecimal(item.VAL_FPAG);
        $("#txtPorPag").byaSetDecimal(item.POR_FPAG);
        $("#txtCond").val(item.CON_FPAG);
        $("#ChkApoEnt").attr('checked', item.PGEN_FPAG == "S" ? true : false);
    };
    //crea Grid

    var _getdataAdapter = function () {
        _dibujarTabla();
        data = wizard.getFORMAPAGO();
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

    var _createGrid =function () {        
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
                  { text: 'Anular', datafield: 'ES_ANULAR', width: 50, align: 'center', columntype: 'checkbox', editable: true, hidden:false },
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
                item.FEC_REG = byaPage.converJSONDate(item.FEC_REG);
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
            this.config.theme = wizard.config.theme;
            _createElements();
            
        },
        dhBotonesEditarFP: function (value) {
            tblFP.setEnabled(value);
        }
    };
}());

var admPol = (function () {
    var CboCodPol = {};
    var oper='add';
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
        data = wizard.getPol();
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
                  { text: 'Descripción', datafield: 'DES_POL', editable: !wizard.disabled },
                  { text: 'Anular', datafield: 'ES_ANULAR', width: 50, align: 'center', columntype: 'checkbox', editable: true },
                   {
                       text: 'Eliminar', datafield: 'Delete', columntype: 'button', width: 70,editable: true, cellsrenderer: function () {
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
                       text: 'Edit', datafield: 'Edit', columntype: 'button', width: 70,editable: true, cellsrenderer: function () {
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
            lPol = wizard.getPol();
            if (lPol == null) lPol = new Array();
            _dibujarTabla();
        },
        getDATOS: function () {
            return tblPol.getSource();
        },
        init: function () {
            this.config.theme = wizard.config.theme;
            var sourceAmparos = byaPage.getSource('wfRgEstPrev.aspx/GetPOLIZAS');
            CboCodPol = new byaComboBox();
            CboCodPol.init({ Id: "#CboCodPol", Source: sourceAmparos, Value: "COD_POL", Display: "NOM_POL" });
            _createGrid();
        },
        dhEnabled: function (value) {
            tblPol.setEnabled(value);
        }
    };
}());

var admDoc = (function () {
    "use strict";
    var tema;
    var Clausula = {};
    var urlToClausulas = '/Servicios/Procesos/wsMinutas.asmx/GetPClausulasEP';
    var urlToESTPREV = '/Servicios/EstPrev/wsGesEstPrev.asmx/GetDatos';
    var sourceESTPREV;
    var CboClausulas = {};
    var editor;
    //lista de Mapeo de los campos
    var lstCampos;
    //Lsita del Editor
    var camposDoc;



    var _addHandlers = function () {
        $('#dvdClausulaEdit').blur(function () {            
            Clausula.CLA_TEXTO = $('#dvdClausulaEdit').html();
            Clausula.IS_MODIF = true;
            Clausula.CLA_CRUZADA = ReemplazarCampos(Clausula);
            $('#dvdClausulaEdit').html(Clausula.CLA_CRUZADA);
            $('#dvdTitulo').html(Clausula.TITULO);
            //$('#dvdClausulaHTML').val(Clausula.CLA_TEXTO);
            //$('#dvdClausulaPreview').html(ReemplazarCampos(Clausula));
            GenerarVistaPrevia();
        });
        $('#dvdClausulaEdit').focus(function () {
            Clausula = CboClausulas.getSeleccionado();
            $('#dvdClausulaEdit').html(Clausula.CLA_TEXTO);
            $('#dvdTitulo').html(Clausula.TITULO);
            //$('#dvdClausulaHTML').val(Clausula.CLA_TEXTO);
            //$('#dvdClausulaPreview').html(ReemplazarCampos(Clausula));

        });
        $("#CboClausulas").change(function () {
            Clausula = CboClausulas.getSeleccionado();
            Clausula.CLA_CRUZADA = ReemplazarCampos(Clausula);
            $('#dvdClausulaEdit').html(Clausula.CLA_CRUZADA);
            $('#dvdTitulo').html(Clausula.TITULO);
        });
        $("#guardarButton").click(function () {
            //alert(Clausula.IS_MODIF);
        });
        $("#cancelarButton").click(function () {
            //byaSite.printDiv("dvdPrint");
        });
    };

    var ReemplazarCampos = function (lClausula) {
        var Previo = lClausula.CLA_TEXTO;
        $.each(lstCampos, function (index, item) {
            Previo = Previo.str_replace('{' + item.Nom_Pla + '}', sourceESTPREV[item.Nom_Cam]);
        });
        return Previo;
    };

    var GenerarVistaPrevia = function () {
        $("#dvdClausulaPreview").html('');
        $.each(CboClausulas.getSource(), function (index, item) {
            $("#dvdClausulaPreview").append(ReemplazarCampos(item));
        });
    }
    String.prototype.str_replace = function (buscar, reemplazar) {
        return this.replace(new RegExp(buscar, 'g'), reemplazar);
    };
    var _cargarDatos = function () {
        sourceESTPREV = {};
        sourceESTPREV = byaPage.getSource(urlToESTPREV, { codigo_ep: '"' + wizard.GetID() + '"' }); //carga datos de la base de datos
        /*
        $.each(lstCampos, function (index, item) {
            $("#idDatos").append('<div class="profile-info-row"><div class="profile-info-name"> ' + item.Nom_Pla + ' </div><div class="profile-info-value"><span class="editable" id="username">' + sourceESTPREV[item.Nom_Cam] + '</span></div></div>');
        });
        */
    };

    var _createElements = function () {
        lstCampos = byaSite.getPlantillasCampos();
        camposDoc = byaSite.getCamposHtml();
        if (wizard.GetID() != "") {
            _cargarDatos();
        }
        CboClausulas = new byaComboBox();
        //inicializar el objeto
        //CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
        // $('#dvdEdicion *').prop("contentEditable", "true");
        $('#myTab a:first').tab('show');
        crearEditor();
    };

    var crearEditor = function () {
        $("#dvdClausulaEdit").kendoEditor({
            tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "fontName",
                "fontSize",
                "insertHtml",
                "viewHtml",
                "createTable"
            ], insertHtml: camposDoc,
            
        });


        /*
        "formatting",
        "foreColor",
                    "backColor",
                    "subscript",
                    "superscript",
        "createTable",
                    "addColumnLeft",
                    "addColumnRight",
                    "addRowAbove",
                    "addRowBelow",
                    "deleteRow",
                    "deleteColumn",
                    "foreColor",
                    "backColor",
        */
    };


    return {
        editedRows: null,
        config: {
            theme: null
        },
        init: function () {
            tema = byaSite.tema;
            _createElements();
            _addHandlers();
            //_createGridCon();
        },
        getDATOS: function () {
            var ClausulaDTO = new Array();
            var i = 0;
            $.each(CboClausulas.getSource(), function (index, dto) {
                var ent = new Object();
                ent.ID = dto.ID;
                ent.CLA_CAM = dto.CLA_CAM;
                ent.ORDEN = dto.ORDEN;
                ent.TIP_PAR = dto.TIP_PAR;
                ent.CLA_NUM = dto.CLA_NUM;
                ent.CLA_PAR = dto.CLA_PAR;
                ent.CLA_TEXTO = dto.CLA_TEXTO;
                ent.CLA_TIT = dto.CLA_TIT;
                ent.TIP_PLA = dto.TIP_PLA;
                ent.IS_ENTER_FINAL = dto.IS_ENTER_FINAL;
                ent.IDE_PMIN = dto.IDE_PMIN;
                ent.ID_PLA = dto.ID_PLA;
                ent.CLA_CRUZADA = ReemplazarCampos(dto);
                ClausulaDTO[i] = ent;
                i = i + 1;
            });
            
            return ClausulaDTO;
        },
        setDATOS: function () {
            CboClausulas = new byaComboBox();
            var sourceClausulas = wizard.getDoc();//carga doc, actual
            if (sourceClausulas == null) sourceClausulas = new Array();
            CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
            _cargarDatos();
            GenerarVistaPrevia();
        }
        
    };
}());

var admPAA = (function () {
    var oper;
    var editrow = -1;
    var gridCon = '#jqxgridConPAA';
    var urlToGridCon = "wfRgEstPrev.aspx/GetPAA";

    $("#btnBsqPAA").click(function () {
        _verVentana();
    });
    $(gridCon).bind('rowselect', function (event) {
        var selectedRowIndex = event.args.rowindex;
        var cod, nom;
        var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'ID');
        cod = cell.value;
        var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'DESCRIPCION');
        nom = cell.value;
        $("#txtPAAId").val(cod);
        $("#txtDescripcionPAA").val(nom);
        $('#modalPAA').modal('hide');
        wizard.traerCodigos(cod);
    });
    var _verVentana = function () {
        //$(ventana).jqxWindow('open');
        $('#modalPAA').modal('show');
        _createGridCon();
    }
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID' },
                    { name: 'DESCRIPCION' }
            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { filtro: "'" + byaSite.getVigencia() + "'" }
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
                      { text: 'Código', datafield: 'ID', width: 150 },
                      { text: 'Descripción', datafield: 'DESCRIPCION' }
                        ]
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
            return $(grid).jqxGrid({ source: _getdataAdapter() });
        },
        getDATOS: function () {
            return $(grid).jqxGrid('getboundrows');
        },
        init: function () {
            this.config.theme = wizard.config.theme;
            _createGridCon();
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
                var res =  byaPage.retObj(result.d);
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
            this.config.theme = wizard.config.theme;
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

var admRiesgos = (function () {
    var grid = "#jqxgridRiesgos";
    var urlToGridCon = "wfRgEstPrev.aspx/";
    var lRiesgos = new Array();
    var indexOfertaActual;
    var activarValidar = true;
    var objAuxRiesgo;
    var opcionEjecutar;
    var Categorias = ["", "", "Riesgo Básico", "Riesgo Básico", "Riesgo Básico", "Riesgo Medio", "Riesgo Alto", "Riesgo Alto", "Riesgo Extremo", "Riesgo Extremo", "Riesgo Extremo"];
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
            _ValidarEmpty("cbo", "Clase");
            _ValidarEmpty("cbo", "Fuente");
            _ValidarEmpty("cbo", "Etapa");
            _ValidarEmpty("cbo", "Tipo");
            _ValidarEmpty("txt", "DescripcionR");
            _ValidarEmpty("txt", "ConsecuenciaOcurrenciaEvento");
            _ValidarEmpty("cbo", "ProbabilidadR");
            _ValidarEmpty("cbo", "cboImpactoR");
            _ValidarEmpty("txt", "ValoracionR");
            _ValidarEmpty("txt", "CategoriaR");
            _ValidarEmpty("cbo", "ProbabilidadT");
            _ValidarEmpty("cbo", "cboImpactoT");
            _ValidarEmpty("txt", "ValoracionT");
            _ValidarEmpty("txt", "CategoriaT");
            _ValidarEmpty("cbo", "AfectaEjecucion");
            _ValidarEmpty("txt", "ResponsableR");
            _ValidarEmpty("txt", "FechaIncioTratamento");
            _ValidarEmpty("txt", "FechaCompletoTratamento");
            _ValidarEmpty("txt", "MonitoreoR");
            _ValidarEmpty("txt", "PeriodicidadR");
            _ValidarEmpty("txt", "AQuienSeLeAsigna");
            _ValidarEmpty("txt", "Tratamiento");
            _MensajeFinalValidacion();
        }
        return !error;
    };
    var _addHandlers =function() {
        $("#btnNuevoRiesgo").click(function () {
            admRiesgos.Limpiar();
            admRiesgos.DesOrHabilitar(true);
            $("#btnGuardarRiesgo").byaSetHabilitar(true);
            opcionEjecutar = "N";
        });
        $("#btnGuardarRiesgo").click(function () {
            if (opcionEjecutar == "N") AgregarNuevoResgo();
            else EditarRiesgo();
        });
        $("#cboProbabilidadT").change(function () {
            if (($("#cboProbabilidadT").val() != null) && ($("#cboImpactoT").val() != "")) {
                var valoracion = parseInt($("#cboProbabilidadT").val()) + parseInt($("#cboImpactoT").val());
                $("#txtValoracionT").val(valoracion);
                $("#txtCategoriaT").val(Categorias[valoracion]);
            }
        });
        $("#cboImpactoT").change(function () {
            if (($("#cboProbabilidadT").val() != null) && ($("#cboImpactoT").val() != "")) {
                var valoracion = parseInt($("#cboProbabilidadT").val()) + parseInt($("#cboImpactoT").val());
                $("#txtValoracionT").val(valoracion);
                $("#txtCategoriaT").val(Categorias[valoracion]);
            }
        });
        $("#cboProbabilidadR").change(function () {
            if (($("#cboProbabilidadR").val() != null) && ($("#cboImpactoR").val() != "")) {
                var valoracion = parseInt($("#cboProbabilidadR").val()) + parseInt($("#cboImpactoR").val());
                $("#txtValoracionR").val(valoracion);
                $("#txtCategoriaR").val(Categorias[valoracion]);
            }
        });
        $("#cboImpactoR").change(function () {
            if (($("#cboProbabilidadR").val() != null) && ($("#cboImpactoR").val() != "")) {
                var valoracion = parseInt($("#cboProbabilidadR").val()) + parseInt($("#cboImpactoR").val());
                $("#txtValoracionR").val(valoracion);
                $("#txtCategoriaR").val(Categorias[valoracion]);
            }
        });
    };
    var _createElements = function () {
        $("#btnGuardarRiesgo").byaSetHabilitar(false);
    };
    var _getDatos = function () {
        var e = {}
        if (opcionEjecutar == "E") {
            e.ID = objAuxRiesgo.ID;
            e.N = objAuxRiesgo.N;
            e.ID_EP = objAuxRiesgo.ID_EP;
        }
        e.CLASE = $("#cboClase").val();
        e.FUENTE = $("#cboFuente").val();
        e.ETAPA = $("#cboEtapa").val();
        e.TIPO = $("#cboTipo").val();
        e.DESCRIPCION = $("#txtDescripcionR").val();
        e.CONSECUENCIAS = $("#txtConsecuenciaOcurrenciaEvento").val();
        e.PROBABILIDAD_R = $("#cboProbabilidadR").val();
        e.IMPACTO_R = $("#cboImpactoR").val();
        e.VALORACION_R = $("#txtValoracionR").val();
        e.CATEGORIA_R = $("#txtCategoriaR").val();
        e.PROBABILIDAD_T = $("#cboProbabilidadT").val();
        e.IMPACTO_T = $("#cboImpactoT").val();
        e.VALORACION_T = $("#txtValoracionT").val();
        e.CATEGORIA_T = $("#txtCategoriaT").val();
        e.AFECTAEJECUCIONCTO = $("#cboAfectaEjecucion").val();
        e.RESPONSABLE = $("#txtResponsableR").val();
        e.FECHAINICIO = $("#txtFechaIncioTratamento").val();
        e.FECHACOMPLETA = $("#txtFechaCompletoTratamento").val();
        e.FORMA_MONITOREO = $("#txtMonitoreoR").val();
        e.PERIOCIDAD = $("#txtPeriodicidadR").val();
        e.AQUIENSEASIGNA = $("#txtAQuienSeLeAsigna").val();
        e.TRATAMIENTO = $("#txtTratamiento").val();
        return e;
    };
    var DibujarRiesgos = function () {
        $("#lstRiesgos").html("");
        $.each(lRiesgos, function (index, item) {
            var CadenaHtml = '<div style="margin:5px; background:#d9edf7" class="list-group-item list-group-item-success">' +
                                    '<div class="row">' +
                                        '<div class="col-lg-11">' +
                                            '<strong>' + item.CATEGORIA_R + '</strong>' +
                                            '<p>' + item.DESCRIPCION + '</p>' +
                                        '</div>' +
                                        '<div class="col-lg-1">' +
                                            '<p><span class="glyphicon glyphicon-search" id="' + index + '" onclick="admRiesgos.VerDetallesRiesgo(id)" aria-hidden="true"></span></p>' +
                                            '<p><span class="glyphicon glyphicon-edit" id="' + index + '" onclick="admRiesgos.bEditarRiesgo(id)" aria-hidden="true"></span></p>' +
                                            '<p><span class="glyphicon glyphicon-remove" id="' + index + '" onclick="admRiesgos.bBorrarRiesgo(id)" aria-hidden="true"></span></p>' +                                            
                                        '</div>' +
                                    '</div>' +
                                '</div>';
            $("#lstRiesgos").append(CadenaHtml);
        });
    };
    var AgregarNuevoResgo = function () {
        if (_esValido()) {
            if (Date.parse($("#txtFechaIncioTratamento").val()) <= Date.parse($("#txtFechaCompletoTratamento").val())) {
                lRiesgos.push(_getDatos());
                DibujarRiesgos();
                admRiesgos.DesOrHabilitar(false);
                admRiesgos.Limpiar();
                $("#btnGuardarRiesgo").byaSetHabilitar(false);
            } else $("#LbMsg").append("La 'Fecha de inicio del tratamiento' no puede ser mayor a la 'Fecha final del tratamiento''");
        }
    };
    var MostrarDetallesResgo = function (index) {
         $("#cboClase").val(lRiesgos[index].CLASE);
         $("#cboFuente").val(lRiesgos[index].FUENTE);
         $("#cboEtapa").val(lRiesgos[index].ETAPA);
         $("#cboTipo").val(lRiesgos[index].TIPO);
         $("#txtDescripcionR").val(lRiesgos[index].DESCRIPCION);
         $("#txtConsecuenciaOcurrenciaEvento").val(lRiesgos[index].CONSECUENCIAS);
         $("#cboProbabilidadR").val(lRiesgos[index].PROBABILIDAD_R);
         $("#cboImpactoR").val(lRiesgos[index].IMPACTO_R);
         $("#txtValoracionR").val(lRiesgos[index].VALORACION_R);
         $("#txtCategoriaR").val(lRiesgos[index].CATEGORIA_R);
         $("#cboProbabilidadT").val(lRiesgos[index].PROBABILIDAD_T);
         $("#cboImpactoT").val(lRiesgos[index].IMPACTO_T);
         $("#txtValoracionT").val(lRiesgos[index].VALORACION_T);
         $("#txtCategoriaT").val(lRiesgos[index].CATEGORIA_T);
         $("#cboAfectaEjecucion").val(lRiesgos[index].AFECTAEJECUCIONCTO);
         $("#txtResponsableR").val(lRiesgos[index].RESPONSABLE);
         $("#txtFechaIncioTratamento").val(lRiesgos[index].FECHAINICIO);
         $("#txtFechaCompletoTratamento").val(lRiesgos[index].FECHACOMPLETA);
         $("#txtMonitoreoR").val(lRiesgos[index].FORMA_MONITOREO);
         $("#txtPeriodicidadR").val(lRiesgos[index].PERIOCIDAD);
         $("#txtAQuienSeLeAsigna").val(lRiesgos[index].AQUIENSEASIGNA);
         $("#txtTratamiento").val(lRiesgos[index].TRATAMIENTO);
    };
    var EditarRiesgo = function(){
        if (_esValido()) {
            if (Date.parse($("#txtFechaIncioTratamento").val()) <= Date.parse($("#txtFechaCompletoTratamento").val())) {
                lRiesgos[indexOfertaActual] = _getDatos();
                DibujarRiesgos();
                admRiesgos.DesOrHabilitar(false);
                admRiesgos.Limpiar();
                $("#btnGuardarRiesgo").byaSetHabilitar(false);
            } else $("#LbMsg").append("La 'Fecha de inicio del tratamiento' no puede ser mayor a la 'Fecha final del tratamiento''");
        }
    };
    var accionEditarRiesgo = function (index) {
        opcionEjecutar = "E";
        objAuxRiesgo = lRiesgos[index];
        $("#btnGuardarRiesgo").byaSetHabilitar(true);
        MostrarDetallesResgo(index);
        admRiesgos.DesOrHabilitar(true);
        indexOfertaActual = index;
    };
    var accionBorrarRiesgo = function (index) {
        delete lRiesgos[index];
        lRiesgos.splice(index, 1);
        DibujarRiesgos();
        admRiesgos.DesOrHabilitar(false);
        admRiesgos.Limpiar(false);
    };
    return {
        disabled: null,
        id_ep: null,
        editedRows: null,
        config: {
            theme: null
        },
        init: function () {
            this.config.theme = wizard.config.theme;
            _addHandlers();
            _createElements();
            this.DesOrHabilitar(false);
            this.DesabilitarOpcionesRiesgos();
        },
        DesOrHabilitar: function (value) {
            $("#cboClase").byaSetHabilitar(value);
            $("#cboFuente").byaSetHabilitar(value);
            $("#cboEtapa").byaSetHabilitar(value);
            $("#cboTipo").byaSetHabilitar(value);
            $("#txtDescripcionR").byaSetHabilitar(value);
            $("#txtConsecuenciaOcurrenciaEvento").byaSetHabilitar(value);
            $("#cboProbabilidadR").byaSetHabilitar(value);
            $("#cboImpactoR").byaSetHabilitar(value);
            //$("#txtValoracionR").byaSetHabilitar(value);
            //$("#txtCategoriaR").byaSetHabilitar(value);
            $("#cboProbabilidadT").byaSetHabilitar(value);
            $("#cboImpactoT").byaSetHabilitar(value);
            //$("#txtValoracionT").byaSetHabilitar(value);
            //$("#txtCategoriaT").byaSetHabilitar(value);
            $("#cboAfectaEjecucion").byaSetHabilitar(value);
            $("#txtResponsableR").byaSetHabilitar(value);
            $("#txtFechaIncioTratamento").byaSetHabilitar(value);
            $("#txtFechaCompletoTratamento").byaSetHabilitar(value);
            $("#txtMonitoreoR").byaSetHabilitar(value);
            $("#txtPeriodicidadR").byaSetHabilitar(value);
            $("#txtAQuienSeLeAsigna").byaSetHabilitar(value);
            $("#txtTratamiento").byaSetHabilitar(value);
        },
        Limpiar: function () {
            $("#cboClase").val("");
            $("#cboFuente").val("");
            $("#cboEtapa").val("");
            $("#cboTipo").val("");
            $("#txtDescripcionR").val("");
            $("#txtConsecuenciaOcurrenciaEvento").val("");
            $("#cboProbabilidadR").val("");
            $("#cboImpactoR").val("");
            $("#txtValoracionR").val("");
            $("#txtCategoriaR").val("");
            $("#cboProbabilidadT").val("");
            $("#cboImpactoT").val("");
            $("#txtValoracionT").val("");
            $("#txtCategoriaT").val("");
            $("#cboAfectaEjecucion").val("");
            $("#txtResponsableR").val("");
            $("#txtFechaIncioTratamento").val("");
            $("#txtFechaCompletoTratamento").val("");
            $("#txtMonitoreoR").val("");
            $("#txtPeriodicidadR").val("");
            $("#txtAQuienSeLeAsigna").val("");
            $("#txtTratamiento").val("");
        },
        SetDatos: function (RiesgosR) {
            $.each(RiesgosR, function (index, item) {
                item.FECHAINICIO = byaPage.converJSONDate(item.FECHAINICIO);
                item.FECHACOMPLETA = byaPage.converJSONDate(item.FECHACOMPLETA);
            });
            lRiesgos = RiesgosR;
            DibujarRiesgos();
        },
        GetDatos: function () {
            return lRiesgos;
        },
        VerDetallesRiesgo: function (index) {
            $("#btnGuardarRiesgo").byaSetHabilitar(false);
            MostrarDetallesResgo(index);
            admRiesgos.DesOrHabilitar(false);
            indexOfertaActual = index;
        },
        bEditarRiesgo: function (index) {
            accionEditarRiesgo(index);
        },
        bBorrarRiesgo: function (index) {
            accionBorrarRiesgo(index);
        },
        DesabilitarOpcionesRiesgos: function () {
            this.bEditarRiesgo = null;
            this.bBorrarRiesgo = null;
        },
        HabilitarOpcionesRiesgos: function () {
            this.bEditarRiesgo = accionEditarRiesgo;
            this.bBorrarRiesgo = accionBorrarRiesgo;
        }
    };
}());

$(document).ready(function () {
    byaSite.SetModuloP({ TituloForm: "Estudios Previos", Modulo: "Elaboración de Estudios Previos", urlToPanelModulo: "#", Cod_Mod: "ESPR4", Rol: "EP_CREAR" });
    $.data(document.body, 'theme', 'arctic');
    theme = getDemoTheme();
    wizard.config.theme = theme;
    wizard.init();
    wizard.Deshabilitar(); //Deshabilita los controles y tabs
});

