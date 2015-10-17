var wizard = (function () {
    "use strict"
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
            _generarPagoMensual();
        }
        if (tp == "PU") {
            _generarPagoUnico();
        }
        if (tp == "PP") {
            _generarParcial();
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
        admFP.setDATOS();
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
        admFP.setDATOS();
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
        admFP.setDATOS();
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

                    wizard.Deshabilitar();
                    wizard.Limpiar();
                    $('#form1').jqxValidator('hide');
                    $('#form1').jqxValidator();
                }
            });
            imprimirButton.click(function (event) {
                alert("Imprimir");
                byaSite.AbrirPagina("/ashx/descEP.ashx?id_ep=" + wizard.TxtID.val());
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
                $('#txtValOtros').val(tot - prop)
            }
            else {
                $('#txtValProp').val(0);
            }
            _genFP();
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
        
        admProy.init();
        admCDP.init();
        admFP.init();
        admPol.init();
        admDoc.init();
        ModTer.init();
    };

    //elaboracion
    var GuardarNuevo = function () {
        
        var jsonData = "{'Reg':" + JSON.stringify(wizard.GetDatosEP()) + "}";
        byaPage.POST_Sync(urlToInsertEstPrev, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                wizard.SetID(byaRpta.id);
                //AbrirEP();
                //Editar();
            }
        });

    };

    var GuardarMod = function () {
        //alert(JSON.stringify(wizard.GetDatosEP()));
        byaRpta = {};
       var jsonData = "{'Reg':" + JSON.stringify(wizard.GetDatosEP()) + "}";

        byaPage.POST_Sync(urlToUpdateESTPREV, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            //alert(byaRpta.Mensaje);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
        });

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

    };


    var nuevo = function () {
        nuevoButton.byaSetHabilitar(false);
        abrirButton.byaSetHabilitar(false);
        editarButton.byaSetHabilitar(false);

        guardarButton.byaSetHabilitar(true);
        cancelarButton.byaSetHabilitar(true);
        imprimirButton.byaSetHabilitar(true);
        wizard.config.oper = 'nuevo';
        wizard.Nuevo();
        admProy.setDatos();
        admCDP.setDATOS();
        admFP.setDATOS();
        admPol.setDATOS();
        admDoc.setDATOS();
    };

    var AbrirEP = function () {
        wizard.config.oper = 'abrir';
        if (wizard.AbrirEP()) {
            editarButton.byaSetHabilitar(true);
            nuevoButton.byaSetHabilitar(false);
            abrirButton.byaSetHabilitar(true);
            editarButton.byaSetHabilitar(true);
            guardarButton.byaSetHabilitar(false);
            cancelarButton.byaSetHabilitar(true);
            imprimirButton.byaSetHabilitar(true);
            admProy.setDATOS();
            admCDP.setDATOS();
            admFP.setDATOS();
            admPol.setDATOS();
            admDoc.setDATOS();
            //wizard.va
            //Solicitudes.NuevoFromEP(_guardarNuevo);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: "Listo...!!! Si desea modificar debe presionar el boton Editar, realizar los cambios y presione el Botón Guardar.", tipo: "info" });
        }
    };

    var Editar = function () {

        
        wizard.config.oper = 'editar';
        wizard.HabilitarE();
        wizard.disabled = false;

        nuevoButton.byaSetHabilitar(false);
        abrirButton.byaSetHabilitar(false);
        editarButton.byaSetHabilitar(false);

        guardarButton.byaSetHabilitar(true);
        cancelarButton.byaSetHabilitar(true);
        imprimirButton.byaSetHabilitar(true);
        diligenciarButton.byaSetHabilitar(true);
        wizard.TxtID.byaSetHabilitar(false);

        admCDP.setEditable(true);
        //wizard._createValidacionEL(GuardarMod);
        //$(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: "después de modificar los datos y presione el botón guardar...!!!", tipo: "info" });
    };

    var GetDatosPlantilla=function () {
        var ep = {};
        ep.ID = dtoEstPrev.ID;
        ep.NOM_PLA_EP = $("#txtNOM_PLA_EP").val();
        return ep;
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
            $(".intCDP").byaSetHabilitar(!wizard.getIntFin());
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
            /*
            var tip = $.getUrlVar('tip');
            if (!tip)
            {
                alert("No se ha especificado el rol");
                return;
            }*/
            if (wizard.GetID() == "") {
                $(msgPpal).msgBox({ titulo: "Estudios Previos...", mensaje: "Por favor Digite un Número de Estudio Previo...!!!", tipo: false });
                wizard.TxtID.focus();
                wizard.disabled = true;
                return false;
            }
            tip = 'EL';// tip.replace('#', '');
            var parametrosJSON = {
                "codigo_ep":wizard.GetID(),
                "tipo": tip
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
                        
                        $('#TxtObjCon').val(ep.OBJE_EP);
                        $('#TxtLugar').val(ep.LUGE_EP);
                        $('#TxtPlazoLiq').val(ep.PLIQ_EP);
                        $("#CboEstEP").val(ep.EST_EP);
                        $("#TxtFecElab").val(byaPage.converJSONDate(ep.FEC_ELA_EP));
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

                        $("#txtObligC").val(ep.OBLIGC);
                        $("#txtObligE").val(ep.OBLIGE);

                        $("#txtNOM_PLA_EP").val(ep.NOM_PLA_EP);
                        $("#cboENPLANC_EP").val(ep.ENPLANC_EP);



                        $('#diligenciarButton').attr("href", urlToDiligenciar + "?id=" + dtoEstPrev.ID)
                        
                        
                        //$(msgPpal).msgBox({ titulo: "Estudios Previos...", mensaje: "Listo...!!!", tipo: true });
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
        
        GetDatosEP: function () {
        var ep = {};
        ep.ID = dtoEstPrev.ID;
        ep.OBJE_EP = $('#TxtObjCon').val();
        ep.LUGE_EP = $('#TxtLugar').val();
        ep.PLIQ_EP = $('#TxtPlazoLiq').val();
        ep.FEC_ELA_EP = $('#TxtFecElab').val();
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
        
        ep.OBLIGC = $("#txtObligC").val();
        ep.OBLIGE = $("#txtObligE").val();
        ep.ENPLANC_EP = $("#cboENPLANC_EP").val();
        ep.IDE_CON_EP = $("#TxtIdeCon").val();
        ep.IDE_REP_EP = $("#TxtIdeRep").val();
        

        
        ep.NUM_EMP_EP = 0;
        ep.GRUPOS_EP = 0;
        //enlazar lista
        ep.l_EP_PROYECTOS = admProy.getDATOS();
        ep.l_EP_CDP = admCDP.getDATOS();
        ep.l_EP_FORMA_PAGO = admFP.getDATOS();
        ep.l_EP_POLIZAS2 = admPol.getDATOS();
        ep.l_EP_CLAUSULAS = admDoc.getDATOS();

        
            
        return ep;
        }

    };
} ());

var ModTer = (function () {
    "use strict";
    var msgPopup = "#msgTer";
    var gridCon = '#jqxgridTer';
    var urlToGridCon = "/Servicios/wsDatosBasicos.asmx/GetTerceros";

    //crea GridTipos
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'IDE_TER', type: 'number' },
                    { name: 'NOMBRE' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon
        };
        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }
        var cellsrendererIDE = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: ModTer.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                          { text: 'Identificación', datafield: 'IDE_TER', width: 150, cellsformat: 'd', cellsalign: 'right' },
                          { text: 'Apellidos y Nombre', datafield: 'NOMBRE',  cellsrenderer: cellsrendererNOM }
                        ]
                    });

        //rowselect
        $(gridCon).bind('rowdoubleclick', function (event) {
            var selectedRowIndex = event.args.rowindex;
            var datarow = {};
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'IDE_TER');
            datarow["IDE_TER"] = cell.value;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'NOMBRE');
            datarow["NOMBRE"] = cell.value;
            ModTer.fnresultado(datarow);
            _cerrarVentana();
        });

    };
    var _cerrarVentana = function () {

        $('#modalTerceros').modal('hide');
        //_createGridCon();
    };
    var _verVentana = function () {

        $('#modalTerceros').modal('show');
        //_createGridCon();
    };
    return {
        fnresultado: null,
        config: {
            theme: null
        },
        init: function () {
            this.config.theme = byaSite.tema;
            _createGridCon();
        },
        showWindow: function (fnresultado) {
            this.fnresultado = fnresultado;
            _verVentana();
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
    var urlToGridCon = "wfRgEstPrev.aspx/GetProyectos";

    $("#addButtonProy").click(function () {
        _verVentana();
    });
    $("#deleteButton").click(function () {
        var selectedrowindex = $(grid).jqxGrid('getselectedrowindex');
        var rowscount = $(grid).jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            var id = $(grid).jqxGrid('getrowid', selectedrowindex);
            $(grid).jqxGrid('deleterow', id);
        }
    });
    $(gridCon).bind('rowselect', function (event) {
        var selectedRowIndex = event.args.rowindex;
        var cod, nom;
        var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'Nro_Proyecto');
        cod = cell.value;
        var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'Nombre_Proyecto');
        nom = cell.value;
        var datarow = {};
        datarow["COD_PRO"] = cod;
        datarow["NOMBRE_PROYECTO"] = nom;
        datarow["ES_NUEVO"] = true;
        var commit = $(grid).jqxGrid('addrow', null, datarow);
    });
    var _verVentana=function () {
        //$(ventana).jqxWindow('open');
        $('#modalPry').modal('show');
        _createGridCon();
    }
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'Nro_Proyecto' },
                    { name: 'Nombre_Proyecto' }
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
                      { text: 'Código', datafield: 'Nro_Proyecto', width: 150 },
                      { text: 'Descripción', datafield: 'Nombre_Proyecto' }
                        ]
                    });
    };
    var _getdataAdapter = function () {
        data = wizard.getProyectos();
        var source = {
            localdata: data,
            datatype: "local",
            datafields: [
                    { name: 'ID_EP' },
                    { name: 'COD_PRO' },
                    { name: 'NOMBRE_PROYECTO' },
                    { name: 'ES_NUEVO', type: 'bool' },
                    { name: 'ES_MODIF', type: 'bool' },
                    { name: 'ES_ANULAR', type: 'bool' }
            ]
        }
        var dataAdapter = new $.jqx.dataAdapter(source);
        return dataAdapter;
    };
    var _createGrid =function () {
        // initialize jqxGrid //
        $(grid).jqxGrid(
            {
                width: '100%',
                source: _getdataAdapter(),
                theme: admProy.config.theme,
                localization: byaPage.getLocalization(),
                height: 100,
                sortable: true,
                altrows: true,
                autoheight: true,
                autorowheight: true,
                editable: true,
                enabletooltips: true,
                columns: [
                  { text: 'Código del Proyecto', datafield: 'COD_PRO', width: 150, editable: false },
                  { text: 'Nombre del Proyecto', datafield: 'NOMBRE_PROYECTO',editable: false },
                  { text: 'Eliminar', datafield: 'ES_ANULAR', width: 50, align: 'center', columntype: 'checkbox', editable: true }
                ]
            });
        //{ text: 'Nuevo', datafield: 'ES_NUEVO', width: 50, align: 'center', columntype: 'checkbox', editable: true }
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
        getDATOS:function(){
            return $(grid).jqxGrid('getboundrows');
        },
        init: function () {
            this.config.theme = wizard.config.theme;
            _createGridCon();
            _createGrid();
        }
    };
}());


var admCDP = (function () {
    var oper;
    var editrow = -1;
    var grid = "#jqxgridCDP";
    $(grid).on('rowselect', function (event) {
        admCDP.id_ep_cdp = event.args.row.ID;
        admCDP.VIG_CDP = byaSite.getVigencia();
        admCDP.NRO_CDP = event.args.row.NRO_CDP;
        $.get("admRub.htm", function (data) {
            $('#divRubros').html(data);
        });

    });
    $('#btnCancelarCDP').click(function () {
        _cancelar();
    });
    $('#btnAgregarCDP').click(function () {
        if (oper == 'edit') {
            _guardarMod();
        } else {
            _guardarNuevo();
        }
    });

    var _limpiar = function () {
        $("#txtNroCDP").val('');
        $("#txtFecCDP").val('');
        $("#txtValCDP").byaSetDecimal(0);
        $("#cboVigFut").val('NO');
        $("#txtNroCDP").byaSetHabilitar(true);
        oper = 'add';
    };

    var _guardarMod = function () {
        if (editrow >= 0) {
            var rowID = $(grid).jqxGrid('getrowid', editrow);
            var dataRecord = $(grid).jqxGrid('getrowdata', editrow);

            dataRecord.FEC_CDP = $("#txtFecCDP").val();
            dataRecord.VAL_CDP = $("#txtValCDP").byaGetDecimal();
            dataRecord.VIG_FUT = $("#cboVigFut").val();
            dataRecord.ES_MODIF=true;

            var commit = $(grid).jqxGrid('updaterow', rowID, dataRecord);

            _limpiar();

            
        }
    };
    
    var _guardarNuevo = function () {
        var dataRecord = {};
        dataRecord.NRO_CDP = $("#txtNroCDP").val();
        dataRecord.FEC_CDP = $("#txtFecCDP").val();
        dataRecord.VAL_CDP = $("#txtValCDP").byaGetDecimal();
        dataRecord.VIG_FUT = $("#cboVigFut").val();
        dataRecord.ES_NUEVO = true;
        var commit = $(grid).jqxGrid('addrow', null, dataRecord);
        _limpiar();
    };
    var _getdataAdapter = function () {
        data = wizard.getCDP();
        var source = {
            datatype: "local",
            localdata: data,
            datafields: [
                { name: 'ID_EP' },
                { name: 'ID' },
                { name: 'NRO_CDP', type: 'number' },
                { name: 'FEC_CDP', type: 'date' },
                { name: 'VAL_CDP', type: 'number' },
                { name: 'VIG_FUT', type: 'string' },
                { name: 'ES_MODIF', type: 'bool' },
                { name: 'ES_ANULAR', type: 'bool' },
                { name: 'ES_NUEVO', type: 'bool' },
                { name: 'GRUPO', type: 'number' }
            ]
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        return dataAdapter;
    };
    var _createGrid=function () {
        $(grid).jqxGrid(
            {
                width: '100%',
                source: _getdataAdapter(),
                theme: admCDP.config.theme,
                altrows: true,
                editable: true,
                autoheight: true,
                autorowheight: true,
                editable:true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columns: [
                  { text: 'N° CDP', datafield: 'NRO_CDP', columntype: 'numberinput', cellsalign: 'right',editable: false},
                  { text: 'Fecha CDP', datafield: 'FEC_CDP', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right', editable: !wizard.getIntFin()  },
                  { text: 'Valor CDP', datafield: 'VAL_CDP', columntype: 'numberinput', cellsformat: 'c2', cellsalign: 'right', editable: !wizard.getIntFin() },
                  { text: 'Vig. Futura', datafield: 'VIG_FUT', editable: !wizard.getIntFin()  },
                  { text: 'Anular', datafield: 'ES_ANULAR', width: 50, align: 'center', columntype: 'checkbox', editable: true }
                ]
            });
        //,
        //           {
        //               text: 'Edit', datafield: 'Edit', columntype: 'button', width: 70, cellsrenderer: function () {
        //                   return "Editar";
        //               }, buttonclick: function (row) {
        //                   oper = "edit";
        //                   editrow = row;
        //                   var dataRecord = $(grid).jqxGrid('getrowdata', editrow);
        //                   $("#txtNroCDP").byaSetHabilitar(false);
        //                   $("#txtNroCDP").val(dataRecord.NRO_CDP);
        //                   $("#txtValCDP").byaSetDecimal(dataRecord.VAL_CDP);
        //                   $("#cboVigFut").val(dataRecord.VIG_FUT);
        //                   $("#txtFecCDP").val(byaSite.FechaShort(dataRecord.FEC_CDP));
        //                   $("#txtFecCDP").val(dataRecord.FEC_CDP);
        //               }
        //           }
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
        setEditable: function (value) {
            return $(grid).jqxGrid({ editable: value });
        },
        init: function () {
            this.config.theme = wizard.config.theme;
            _createGrid();

        }
    };
}());

var admFP = (function () {
    var grid = "#jqxgridFP";
    var oper;
    var editrow = -1;
    
    var GuardarNuevo = function () {
        var dataRecord = {};
        dataRecord.CAN_PAG = 1;
        dataRecord.ORD_FPAG = 1;
        dataRecord.TIP_FPAG = $("#CboTipPag").val();
        dataRecord.VAL_FPAG = $("#txtValPag").byaGetDecimal();
        dataRecord.POR_FPAG = $("#txtPorc").byaGetDecimal();
        dataRecord.CON_FPAG = $("#txtCond").val();
        dataRecord.PGEN_FPAG = $("#CboApoEnt").val();
        dataRecord.NOM_TIP_FPAG = $("#CboTipPag option:selected").text();
        dataRecord.ES_NUEVO = true;
        var commit = $(grid).jqxGrid('addrow', null, dataRecord);
        
            $("#dvdMsg").addClass("alert alert-success");
            $("#lbMsg").html("Se agregó el item de la forma de pago");
            getTotalGrid();
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
            dataRecord.PGEN_FPAG = $("#CboApoEnt").val();

            var commit = $(grid).jqxGrid('updaterow', rowID, dataRecord);
                $("#dvdMsg").addClass("alert alert-success");
                $("#lbMsg").html("Se actualizó el item de la forma de pago");
                getTotalGrid();
        }
    };

    var ControlCaptura=function(){
        if ($("#CboVP").val() == "V") {
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

            if ($("#txtPorc").val() <= 0) {
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
                GuardarNuevo();
            }
            if (oper == "edit") {
                GuardarMod();
            }
        }
    
    });
    
    $("#txtValPag").blur(function () {
        _calPor();
    });
    //$("#txtValPag").change(function () {
    //    _calPor();
    //});
    //$("#txtValPag").keypress(function () {
    //    _calPor();
    //});

    $("#txtPorc").blur(function () {
        _calVal();
    });
    //$("#txtPorc").change(function () {
    //    _calVal();
    //});
    //$("#txtPorc").keypress(function () {
    //    _calVal();
    //});

    var _calPor = function () {
        var por = $("#txtValPag").byaGetDecimal() / admFP.getValTotal() * 100;
        $("#txtPorc").val(por.toFixed(2));
    };
    var _calVal = function () {
        var val = parseFloat($("#txtPorc").val()) * admFP.getValTotal()/100;
        $("#txtValPag").byaSetDecimal(val);
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
        var SaldoV = admFP.getValTotal() - acumP;

        $("#txtSaldoP").val(SaldoP);
        $("#txtSaldoV").byaSetDecimal(SaldoV);
    };
    //Creating all page elements which are jqxWidgets
    var _createElements = function () {
        var sourceTIPPAG=byaPage.getSource('wfRgEstPrev.aspx/GetTIPO_PAGO')
        $("#CboTipPag").byaCombo({ DataSource: sourceTIPPAG, Value: "ID_PAGO", Display: "DES_PAGO" });
        
        var sourceTip = [{ cod: "S", val: "SI" }, { cod: "N", val: "NO" }];
        $("#CboApoEnt").byaCombo({ DataSource: sourceTip, Value: "cod", Display: "val" });
        $("#CboApoEnt").val("S");
        _createGrid();
    };
    /*
    deleteButton.click(function (event) {
        var selectedrowindex = $(grid).jqxGrid('getselectedrowindex');
        var rowscount = $(grid).jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            var id = $(grid).jqxGrid('getrowid', selectedrowindex);
            $(grid).jqxGrid('deleterow', id);
        }
    });*/
    //crea Grid

    var _getdataAdapter = function () {
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
                           $("#CboApoEnt").val(dataRecord.PGEN_FPAG);
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
        setDATOS: function () {
            return $(grid).jqxGrid({ source: _getdataAdapter() });
        },
        getDATOS: function () {
            return $(grid).jqxGrid('getboundrows');
        },
        getValTotal: function () {
            return $("#txtValTot").byaGetDecimal();
        },
        init: function () {
            this.editedRows = new Array();
            this.config.theme = wizard.config.theme;
            _createElements();
            
        }
    };
}());

var admPol = (function () {
    var CboCodPol = {};
    var oper='add';
    var editrow = -1;
    var grid = "#jqxgridPol";
/*
    $(grid).on('rowselect', function (event) {
        admCDP.id_ep_cdp = event.args.row.ID;
        admCDP.VIG_CDP = byaSite.getVigencia();selected
        admCDP.NRO_CDP = event.args.row.NRO_CDP;
        $.get("admRub.htm", function (data) {
            $('#divRubros').html(data);
        });

    });
    */

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
        } else {
            _guardarNuevo();

        }
    });

    var _cancelar = function () {
        $("#CboCodPol").byaSetHabilitar(true);
        $("#CboCodPol").val('');
        $("#txtDescPol").val('');

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
            $("#CboCodPol").val('');
            $("#txtDescPol").val('');
            $("#CboCodPol").byaSetHabilitar(true);
            oper = 'add';
        }
    };


    var _guardarNuevo = function () {
        var dataRecord = {};
        dataRecord.COD_POL = $("#CboCodPol").val();
        dataRecord.NOM_POL = $("#CboCodPol option:selected").text();
        dataRecord.DES_POL = $("#txtDescPol").val();
        dataRecord.ES_NUEVO = true;
        var commit = $(grid).jqxGrid('addrow', null, dataRecord);
        $("#CboCodPol").val('');
        $("#txtDescPol").val('');
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
            ]
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
    return {
        disabled: null,
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
            var sourceAmparos = byaPage.getSource('wfRgEstPrev.aspx/GetPOLIZAS');
            CboCodPol = new byaComboBox();
            CboCodPol.init({ Id: "#CboCodPol", Source: sourceAmparos, Value: "COD_POL", Display: "NOM_POL" });
            _createGrid();
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

    var lstCampos = [
                    { Nom_Pla: "DEP_SOLICITANTE", Nom_Cam: "NOM_DEP_NEC_EP" },
                    { Nom_Pla: "CLASE_CONTRATO", Nom_Cam: "CLASE_CONT" },
                    { Nom_Pla: "OBJETO", Nom_Cam: "OBJE_EP" },
                    { Nom_Pla: "VAL_APORTES_PROPIOS", Nom_Cam: "VAL_ENT_EP" },
                    { Nom_Pla: "VAL_APORTES_OTROS", Nom_Cam: "VAL_OTR_EP" },
                    { Nom_Pla: "VALOR_A_CONTRATAR", Nom_Cam: "VALOR_TOTALC" },
                    { Nom_Pla: "TOTAL_LETRAS", Nom_Cam: "VAL_TOTAL_LETRAS" },
                    { Nom_Pla: "PLAZO_EJECUCIÓN", Nom_Cam: "PLAZO_EP" },
                    { Nom_Pla: "LUGAR_EJECUCION", Nom_Cam: "LUGE_EP" },
                    { Nom_Pla: "PLAZO_LIQUIDACION", Nom_Cam: "PLIQ_EP" },
                    { Nom_Pla: "DEP_SUPERVISION", Nom_Cam: "NOM_DEP_SUP_EP" },
                    { Nom_Pla: "POLIZAS", Nom_Cam: "POLIZAS" },
                    { Nom_Pla: "CDP", Nom_Cam: "CDP" },
                    { Nom_Pla: "OBLIG_CTISTA", Nom_Cam: "OBLIGACIONESC" },
                    { Nom_Pla: "OBLIG_ENTIDAD", Nom_Cam: "OBLIGACIONESE" },
                    { Nom_Pla: "FEC_ELABORACION", Nom_Cam: "sFEC_ELA_EP" },
                    { Nom_Pla: "DEP_SUPERVISION", Nom_Cam: "NOM_DEP_SUP_EP" },
                    { Nom_Pla: "NOM_RESPONSABLE_EP", Nom_Cam: "RESPONSABLE_EP" },
                    { Nom_Pla: "NOM_DILIGENCIADO_POR", Nom_Cam: "DILIGENCIADO_POR" },
                    { Nom_Pla: "FORMA_PAGO", Nom_Cam: "sFORMA_PAGO" },
                    { Nom_Pla: "PROYECTO_PLAN_C", Nom_Cam: "sBANCO_PROY" },
                    { Nom_Pla: "LOGO", Nom_Cam: "LOGO" },
    ];
    var camposDoc = [
           { text: "OBJETO", value: "{OBJETO}" },
           { text: "LUGAR_EJECUCION", value: "{LUGAR_EJECUCION}" },
           { text: "VALOR_A_CONTRATAR", value: "{VALOR_A_CONTRATAR}" },
           { text: "PLAZO_EJECUCIÓN", value: "{PLAZO_EJECUCIÓN}" },
           { text: "VAL_APORTES_PROPIOS", value: "{VAL_APORTES_PROPIOS}" },
           { text: "DEP_SOLICITANTE", value: "{DEP_SOLICITANTE}" },
           { text: "OBLIG_CTISTA", value: "{OBLIG_CTISTA}" },
           { text: "OBLIG_ENTIDAD", value: "{OBLIG_ENTIDAD}" },
           { text: "VALOR_TOTAL", value: "{VALOR_TOTAL}" },
           { text: "PLAZO_LIQUIDACION", value: "{PLAZO_LIQUIDACION}" },
           { text: "TOTAL_LETRAS", value: "{TOTAL_LETRAS}" },
           { text: "DEP_SUPERVISION", value: "{DEP_SUPERVISION}" },
           { text: "POLIZAS", value: "{POLIZAS}" },
           { text: "CDP", value: "{CDP}" },
           { text: "CLASE_CONTRATO", value: "{CLASE_CONTRATO}" },
           { text: "FEC_ELABORACION", value: "{FEC_ELABORACION}" },
           { text: "CDP", value: "{CDP}" },
           { text: "DEP_SUPERVISION", value: "{DEP_SUPERVISION}" },
           { text: "NOM_RESPONSABLE_EP", value: "{NOM_RESPONSABLE_EP}" },
           { text: "NOM_DILIGENCIADO_POR", value: "{NOM_DILIGENCIADO_POR}" },
           { text: "FORMA_PAGO", value: "{FORMA_PAGO}" },
           { text: "PROYECTO_PC", value: "{PROYECTO_PLAN_C}" }
           
    ];



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
            //$('#dvdClausulaHTML').val(Clausula.CLA_TEXTO);
            //$('#dvdClausulaPreview').html(ReemplazarCampos(Clausula));

        });
        $("#guardarButton").click(function () {
            //alert(Clausula.IS_MODIF);
        });
        $("#cancelarButton").click(function () {
            //byaSite.printDiv("dvdPrint");
        });
    };

    var ReemplazarCampos = function (lClausula) {
        //alert(JSON.stringify(sourceESTPREV));
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

    var _createElements = function () {
        //var sourceClausulas = byaPage.getSource(urlToClausulas, { Num_Pro: "'XXXX'" });
        //alert(wizard.GetID());
        sourceESTPREV = byaPage.getSource(urlToESTPREV, { codigo_ep: '"'+wizard.GetID() +'"'}); //carga datos de la base de datos
        //alert(JSON.stringify(sourceESTPREV));
        $.each(lstCampos, function (index, item) {
            $("#idDatos").append('<div class="profile-info-row"><div class="profile-info-name"> ' + item.Nom_Pla + ' </div><div class="profile-info-value"><span class="editable" id="username">' + sourceESTPREV[item.Nom_Cam] + '</span></div></div>');
        });
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
                "viewHtml"
            ], insertHtml: camposDoc
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
            CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
            sourceESTPREV = byaPage.getSource(urlToESTPREV, { codigo_ep: "'" + wizard.GetID() + "'" }); //carga datos de la base de datos
            GenerarVistaPrevia();
        }
        
    };
}());

//Revisión 
function _createToolBarRV() {
    divBtnGrid = "#divToolEP";
    tema = theme;
    ancho = 85;
    alto = 20;
    
	var ToolRevApr = byaPage.container();

    var abrirButton = byaPage.idButton("../jqwidgets/images/open.png", "Abrir");
	var revisarButton = byaPage.idButton("../jqwidgets/images/valid.png", "Revisar");
	var cancelarButton = byaPage.idButton("../jqwidgets/images/undo.png", "Cancelar");
    var imprimirButton = byaPage.idButton("../jqwidgets/images/print.png", "Imprimir");
	
	ToolRevApr.append(wizard.TxtID);
	ToolRevApr.append(abrirButton);
    ToolRevApr.append(revisarButton);
    ToolRevApr.append(cancelarButton);
    ToolRevApr.append(imprimirButton);

    $(divToolRevApr).html(ToolRevApr);

	wizard.TxtID.jqxNumberInput({ decimalDigits: 0,min:0, width: '100px', height: '25px', inputMode: 'simple', spinButtons: true, theme: tema });
    abrirButton.jqxButton({ theme: tema, width: ancho, height: alto });
	revisarButton.jqxButton({ theme: tema, width: ancho, height: alto, disabled: true });
    cancelarButton.jqxButton({ theme: tema, width: ancho, height: alto, disabled: true });
	imprimirButton.jqxButton({ theme: tema, width: ancho, height: alto, disabled: true });
	
    if( EP ){
		 wizard.TxtID.val(EP);
		 AbrirEP();
	}
	revisarButton.click(function (event) {
	    if (!revisarButton.jqxButton('disabled')) {
	        admHEstadosEP.AbrirRevisar(wizard.TxtID.val());
	    }
	});


	abrirButton.click(function (event) {
	    AbrirEP();
	});
	function AbrirEP() {

	    if (wizard.AbrirEP()) {
	        imprimirButton.jqxButton({ disabled: false });
	        revisarButton.jqxButton({ disabled: false });
	        cancelarButton.jqxButton({ disabled: false });
	        abrirButton.jqxButton({ disabled: true });
	    }
	    else {
	        imprimirButton.jqxButton({ disabled: true });
	        revisarButton.jqxButton({ disabled: true });
	        cancelarButton.jqxButton({ disabled: true });
	        abrirButton.jqxButton({ disabled: false });
	    }
    }

    cancelarButton.click(function (event) {
        
        if (!cancelarButton.jqxButton('disabled')) {

            wizard.config.oper = 'cancelar';

            if (confirm("Desea cancelar el proceso?")) {

                imprimirButton.jqxButton({ disabled: true });
                revisarButton.jqxButton({ disabled: true });
                cancelarButton.jqxButton({ disabled: true });
                abrirButton.jqxButton({ disabled: false });

                wizard.Deshabilitar();
                wizard.Limpiar();
                
            }
        }
    });
    imprimirButton.click(function (event) {
        if (!imprimirButton.jqxButton('disabled')) {
            wizard.imprimir();
        }
    });
            
}

//Aprobación
function _createToolBarAP() {
    divBtnGrid = "#divToolEP";
    tema = theme;
    ancho = 85;
    alto = 20;

    var ToolRevApr = byaPage.container();

    var abrirButton = byaPage.idButton("../jqwidgets/images/open.png", "Abrir");
    var aprobarButton = byaPage.idButton("../jqwidgets/images/check.png", "Aprobar");
    var cancelarButton = byaPage.idButton("../jqwidgets/images/undo.png", "Cancelar");
    var imprimirButton = byaPage.idButton("../jqwidgets/images/print.png", "Imprimir");

    ToolRevApr.append(wizard.TxtID);
    ToolRevApr.append(abrirButton);
    ToolRevApr.append(aprobarButton);
    ToolRevApr.append(cancelarButton);
    ToolRevApr.append(imprimirButton);

    $(divToolRevApr).html(ToolRevApr);

    wizard.TxtID.jqxNumberInput({ decimalDigits: 0, min: 0, width: '100px', height: '25px', inputMode: 'simple', spinButtons: true, theme: tema });
    abrirButton.jqxButton({ theme: tema, width: ancho, height: alto });
    aprobarButton.jqxButton({ theme: tema, width: ancho, height: alto, disabled: true });
    cancelarButton.jqxButton({ theme: tema, width: ancho, height: alto, disabled: true });
    imprimirButton.jqxButton({ theme: tema, width: ancho, height: alto, disabled: true });

    if (EP) {
        wizard.TxtID.val(EP);
        AbrirEP();
    }
    aprobarButton.click(function (event) {
        if (!aprobarButton.jqxButton('disabled')) {
            admHEstadosEP.AbrirAprobar(wizard.TxtID.val());
        }
    });

    abrirButton.click(function (event) {
        AbrirEP();
    });
    function AbrirEP() {
        if (wizard.AbrirEP()) {
            imprimirButton.jqxButton({ disabled: false });
            aprobarButton.jqxButton({ disabled: false });
            cancelarButton.jqxButton({ disabled: false });
            abrirButton.jqxButton({ disabled: true });
        }
        else {
            imprimirButton.jqxButton({ disabled: true });
            aprobarButton.jqxButton({ disabled: true });
            cancelarButton.jqxButton({ disabled: true });
            abrirButton.jqxButton({ disabled: false });
        }
    }

    cancelarButton.click(function (event) {

        if (!cancelarButton.jqxButton('disabled')) {

            wizard.config.oper = 'cancelar';

            if (confirm("Desea cancelar el proceso?")) {

                imprimirButton.jqxButton({ disabled: true });
                revisarButton.jqxButton({ disabled: true });
                cancelarButton.jqxButton({ disabled: true });
                abrirButton.jqxButton({ disabled: false });

                wizard.Deshabilitar();
                wizard.Limpiar();

            }
        }
    });
    imprimirButton.click(function (event) {
        if (!imprimirButton.jqxButton('disabled')) {
            wizard.imprimir();
        }
    });

}

//DesAprobación
function _createToolBarDA() {
    divBtnGrid = "#divToolEP";
    tema = theme;
    ancho = 85;
    alto = 20;

    var ToolRevApr = byaPage.container();

    var abrirButton = byaPage.idButton("../jqwidgets/images/open.png", "Abrir");
    var desaprobarButton = byaPage.idButton("../jqwidgets/images/uncheck.png", "Desaprobar");
    var cancelarButton = byaPage.idButton("../jqwidgets/images/undo.png", "Cancelar");
    var imprimirButton = byaPage.idButton("../jqwidgets/images/print.png", "Imprimir");

    ToolRevApr.append(wizard.TxtID);
    ToolRevApr.append(abrirButton);
    ToolRevApr.append(desaprobarButton);
    ToolRevApr.append(cancelarButton);
    ToolRevApr.append(imprimirButton);

    $(divToolRevApr).html(ToolRevApr);

    wizard.TxtID.jqxNumberInput({ decimalDigits: 0, min: 0, width: '100px', height: '25px', inputMode: 'simple', spinButtons: true, theme: tema });
    desaprobarButton.jqxButton({ theme: tema, width: ancho + 10, height: alto, disabled: true });
    abrirButton.jqxButton({ theme: tema, width: ancho, height: alto });
    cancelarButton.jqxButton({ theme: tema, width: ancho, height: alto, disabled: true });
    imprimirButton.jqxButton({ theme: tema, width: ancho, height: alto, disabled: true });

    if (EP) {
        wizard.TxtID.val(EP);
        AbrirEP();
    }
    desaprobarButton.click(function (event) {
        if (!desaprobarButton.jqxButton('disabled')) {
            admHEstadosEP.AbrirDesAprobar(wizard.TxtID.val());
        }
    });

    abrirButton.click(function (event) {
        AbrirEP();
    });

    function AbrirEP() {
        if (wizard.AbrirEP()) {
            imprimirButton.jqxButton({ disabled: false });
            desaprobarButton.jqxButton({ disabled: false });
            cancelarButton.jqxButton({ disabled: false });
            abrirButton.jqxButton({ disabled: true });
            
        }
        else {
            imprimirButton.jqxButton({ disabled: true });
            desaprobarButton.jqxButton({ disabled: true });
            cancelarButton.jqxButton({ disabled: true });
            abrirButton.jqxButton({ disabled: false });
        }
    }

    cancelarButton.click(function (event) {

        if (!cancelarButton.jqxButton('disabled')) {

            wizard.config.oper = 'cancelar';

            if (confirm("Desea cancelar el proceso?")) {

                imprimirButton.jqxButton({ disabled: true });
                desaprobarButton.jqxButton({ disabled: true });
                cancelarButton.jqxButton({ disabled: true });
                abrirButton.jqxButton({ disabled: false });

                wizard.Deshabilitar();
                wizard.Limpiar();

            }
        }
    });
    imprimirButton.click(function (event) {
        if (!imprimirButton.jqxButton('disabled')) {
            wizard.imprimir();
        }
    });

}

//Consulta
function _createToolBarCN() {
    divBtnGrid = "#divToolEP";
    tema = theme;
    ancho = 85;
    alto = 20;

    var ToolRevApr = byaPage.container();
    var imprimirButton = byaPage.idButton("../jqwidgets/images/print.png", "Imprimir");
    ToolRevApr.append(imprimirButton);
    $(divToolRevApr).html(ToolRevApr);
    wizard.TxtID.jqxNumberInput({ decimalDigits: 0, min: 0, width: '100px', height: '25px', inputMode: 'simple', spinButtons: true, theme: tema });
    imprimirButton.jqxButton({ theme: tema, width: ancho, height: alto});
    if (EP) {
        wizard.TxtID.val(EP);
        wizard.AbrirEP();
     
    }
    imprimirButton.click(function (event) {
        if (!imprimirButton.jqxButton('disabled')) {
            wizard.imprimir();
        }
    });

}



$(document).ready(function () {
    byaSite.SetModuloP({ TituloForm: "Estudios Previos", Modulo: "Elaboración de Estudios Previos", urlToPanelModulo: "#", Cod_Mod: "ESPR4", Rol: "EP_CREAR" });
    $.data(document.body, 'theme', 'arctic');
    theme = getDemoTheme();
    wizard.config.theme = theme;
    wizard.init();
    wizard.Deshabilitar(); //Deshabilita los controles y tabs
});

