var theme;
var msgPpal = "#LbMsg";

var wizard = (function () {
    //Adding event listeners
    
    var _addHandlers = function () {

        //Botones Siguiente
        $('.nextButton').click(function () {
            wizard.validar();
            $('#jqxTabs').jqxTabs('next');
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

        $("#btnBuscarApoTec").click(function () {

            ModTer.showWindow(function (ter) {
                $("#TxtNomApoTec").val(ter.NOMBRE);
                $("#TxtIdeApoTec").val(ter.IDE_TER);
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

        $('#TxtIdeApoTec').blur(function () {
            wizard.BuscarTercero($('#TxtIdeApoTec'), $('#TxtNomApoTec'));
        });

        $('#jqxTabs').on('selected', function (event) {
            var pageIndex = event.args.item + 1;
            wizard.loadPageTabs(pageIndex);
        });

        $('#txtValTot').change( function () {
            $('#txtValProp').val($('#txtValTot').val());
            $('#txtValOtros').val(0);
        });
        $('#txtValProp').change(function () {
            var tot = $('#txtValTot').val();
            var prop = $('#txtValProp').val();
            if (prop <= tot) {
                $('#txtValOtros').val(tot - prop)
            }
            else {
                $('#txtValProp').val(0);
            }
        });

    };

    _iniElements = function () {

        //Inicializar Usuario
        var user = wizard.getUser();
        $("#HeadLoginName").html(user);

        //$("#TxtIdeFun").val(user);
        //wizard.BuscarTercero(TxtIdeFun, TxtNomFun);
        wizard.RefreshCboSubTip("00");
        wizard.RefreshCboTPlazo2("M");
    };

    _createElements = function () {
        //Crea Tabs y Botones de Control
        tema = wizard.config.theme;
        $('#jqxTabs').jqxTabs({ height: 1000, width: '100%', theme: wizard.config.theme, keyboardNavigation: false, scrollPosition: 'both' });
       
        var sourceEst = byaPage.getSource('wfRgEstPrev.aspx/GetvEP_ESTADOS');
        $("#CboEstEP").byaCombo({ DataSource: sourceEst, Value: "COD_EST", Display: "NOM_EST" });
        var sourceVig = byaPage.getSource('wfRgEstPrev.aspx/GetvVIGENCIAS');
        $("#CboVig").byaCombo({ DataSource: sourceVig, Value: "YEAR_VIG", Display: "YEAR_VIG" });

        var sourceCargo = byaPage.getSource('wfRgEstPrev.aspx/GetvEP_CARGO');
        $("#CboCarDilJq").byaCombo({ DataSource: sourceCargo, Value: "COD_CARGO", Display: "DES_CARGO" });
        $("#CboCarRes").byaCombo({ DataSource: sourceCargo, Value: "COD_CARGO", Display: "DES_CARGO" });
        $("#CboCarApoTec").byaCombo({ DataSource: sourceCargo, Value: "COD_CARGO", Display: "DES_CARGO" });
        $("#CboCarSup").byaCombo({ DataSource: sourceCargo, Value: "COD_CARGO", Display: "DES_CARGO" });
        
        var sourceDep = byaPage.getSource('wfRgEstPrev.aspx/GetvDEPENDENCIAT');
        $("#CboDepSup").byaCombo({ DataSource: sourceDep, Value: "COD_DEP", Display: "NOM_DEP" });

        var sourceDepS = byaPage.getSource('wfRgEstPrev.aspx/GetvDEPENDENCIA');
        $("#CboDepSol").byaCombo({ DataSource: sourceDepS, Value: "COD_DEP", Display: "NOM_DEP" });

        var sourceDepD = byaPage.getSource('wfRgEstPrev.aspx/GetvDEPENDENCIAD');
        $("#CboDepDel").byaCombo({ DataSource: sourceDepD, Value: "COD_DEP", Display: "NOM_DEP" });

        var sourceTip = byaPage.getSource('wfRgEstPrev.aspx/GetvTIPOSCONT');
        $("#CboTip").byaCombo({ DataSource: sourceTip, Value: "COD_TIP", Display: "NOMC_TIP" });
        
        var sourcePla = byaPage.getSource('wfRgEstPrev.aspx/GetvTIPO_PLAZOS');
        $("#CboTPlazo1").byaCombo({ DataSource: sourcePla, Value: "COD_TPLA", Display: "NOM_PLA" });
        
        var sourceMod = byaPage.getSource('wfRgEstPrev.aspx/GetvModalidad');
        $("#CboMod").byaCombo({ DataSource: sourceMod, Value: "COD_TPROC", Display: "NOM_TPROC" });
        
        
    };


    return {
        disabled: true,
        TxtID: null,
        config: {
            dragArea: null,
            theme: null,
            oper: null
        },

        getUser: function () {
            return byaSite.getUsuario();
        }
        ,
        RefreshCboTPlazo2: function (cod) {

            var source = byaPage.getSource('wfRgEstPrev.aspx/GetvTIPO_PLAZOS2', { cod_tpla: "'" + cod + "'" });
            $("#CboTPlazo2").byaCombo({ DataSource: source, Value: "COD_TPLA", Display: "NOM_PLA" });
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
        }
        ,
        ValidarEL: function () {
            $('#FrmEstPrev').jqxValidator('validate');
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
                var source = byaPage.getSource("/Servicios/wsDatosBasicos.asmx/GetNomTercerosPk", {ide_ter:"'" + ide_ter + "'"});
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
            var source = byaPage.getSource('wfRgEstPrev.aspx/GetvSUBTIPOS', { cod_tip: "'" + cod_tip + "'" });
            $("#CboSubTip").byaCombo({ DataSource: source, Value: "COD_STIP", Display: "NOMC_STIP" });
        },
        init: function () {

            this.TxtID = $("#txtNumero");

            _createElements();
            
            _iniElements();

            //$('#backButtonReview').jqxButton({ width: 50, theme: theme });
            _addHandlers();

            //this.validate();
            this.Deshabilitar();

        },
        validar: function () {
            alert("Debe Guardar los Datos Iniciales del Estudio Previo para continuar....");
        },
        Deshabilitar: function () {
            $('#jqxTabs').jqxTabs({ disabled: true });
            //Deshabilita todos los controles
            $('.formC :input').attr('disabled', true);

            $("#CboCarDilJq").byaSetHabilitar(true);
            $("#CboCarRes").byaSetHabilitar(true);
            $("#CboCarApoTec").byaSetHabilitar(true);
            $("#CboCarSup").byaSetHabilitar(true);
            $("#CboDepSup").byaSetHabilitar(true);
            $("#CboDepSol").byaSetHabilitar(true);
            $("#CboTip").byaSetHabilitar(true);
            $("#CboSubTip").byaSetHabilitar(true);
            $("#TxtFecElab").byaSetHabilitar(false);
            $("#CboMod").byaSetHabilitar(false);
            $('#txtValOtros').byaSetHabilitar(false);
            $("#CboTPlazo1").byaSetHabilitar(false);
            $("#CboTPlazo2").byaSetHabilitar(false);

            $("#TxtGrupos").byaSetHabilitar(false);
            $("#TxtNEmpleos").byaSetHabilitar(false);

            $("#CboDepDel").byaSetHabilitar(false);



            this.disabled = true;
        },
        Limpiar: function () {
            //Colocar Valores Por Defecto
            $('#FrmEstPrev')[0].reset();
            //$('#FrmEstPrev :input').attr('value', '');

            /*
            $("#CboCarDilJq").val('');
            $("#CboCarRes").val('');
            $("#CboCarApoTec").val('');
            $("#CboCarSup").val('');
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
            var Tabs = $('#jqxTabs');
            Tabs.jqxTabs('enableAt', 0);
            Tabs.jqxTabs('disableAt', 1);
            Tabs.jqxTabs('disableAt', 2);
            Tabs.jqxTabs('disableAt', 3);
            Tabs.jqxTabs('disableAt', 4);
            Tabs.jqxTabs('disableAt', 5);
            Tabs.jqxTabs('disableAt', 6);
            Tabs.jqxTabs('disableAt', 7);
            Tabs.jqxTabs('disableAt', 8);
            Tabs.jqxTabs('disableAt', 9);
            Tabs.jqxTabs('disableAt', 10);
            Tabs.jqxTabs('disableAt', 11);
            Tabs.jqxTabs('disableAt', 12);
            Tabs.jqxTabs('disableAt', 13);
            Tabs.jqxTabs('disableAt', 14);

            $('.formC :input').byaSetHabilitar(false);

            $('#TxtNomApoTec').byaSetHabilitar(false);
            $('#TxtNomFun').byaSetHabilitar(false);
            $('#TxtIdeFun').byaSetHabilitar(false);

            $('#TxtNomRes').byaSetHabilitar(false);
            $('#txtValOtros').byaSetHabilitar(false);

            $("#CboCarDilJq").byaSetHabilitar(true);
            $("#CboCarRes").byaSetHabilitar(true);
            $("#CboCarApoTec").byaSetHabilitar(true);
            $("#CboCarSup").byaSetHabilitar(true);
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
        },
        HabilitarE: function () {
            var Tabs = $('#jqxTabs');
            Tabs.jqxTabs('enableAt', 0);
            Tabs.jqxTabs('enableAt', 1);
            Tabs.jqxTabs('enableAt', 2);
            Tabs.jqxTabs('enableAt', 3);
            Tabs.jqxTabs('enableAt', 4);
            Tabs.jqxTabs('enableAt', 5);
            Tabs.jqxTabs('enableAt', 6);
            Tabs.jqxTabs('enableAt', 7);
            Tabs.jqxTabs('enableAt', 8);
            Tabs.jqxTabs('enableAt', 9);
            Tabs.jqxTabs('enableAt', 10);
            Tabs.jqxTabs('enableAt', 11);
            Tabs.jqxTabs('enableAt', 12);
            Tabs.jqxTabs('enableAt', 13);
            Tabs.jqxTabs('enableAt', 14);

            $('.formC :input').attr('disabled', false);

            $('#TxtNomApoTec').attr('disabled', true);
            $('#TxtNomFun').attr('disabled', true);
            $('#TxtIdeFun').attr('disabled', true);
            $('#TxtNomRes').attr('disabled', true);
            $('#txtValOtros').attr('disabled', true);

            
            $("#CboCarDilJq").byaSetHabilitar(true);
            $("#CboCarRes").byaSetHabilitar(true);
            $("#CboCarApoTec").byaSetHabilitar(true);
            $("#CboCarSup").byaSetHabilitar(true);
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
            
            this.disabled = false;

            wizard.loadPageTabs($("#jqxTabs").jqxTabs('val') + 1);
        },
        imprimir: function () {
            byaSite.AbrirPagina("../ashx/descEP.ashx?id_ep=" + wizard.TxtID.val());
        }
		,
        Nuevo: function (GuardarNuevo) {
            wizard.config.oper = 'nuevo';
            wizard.TxtID.val(0);
            wizard.TxtID.byaSetHabilitar(false);
            wizard.HabilitarN(); //Habilitar para nuevo
            wizard.Limpiar(); //Limpiar los input
            //wizard._createValidacionEL(GuardarNuevo); //Configurar el Validador
            wizard.RefreshCboSubTip("00");
            wizard.RefreshCboTPlazo2("M");
            //Colocar en Valores Por Defecto
            var user = wizard.getUser();

            $("#TxtIdeFun").val(user);

            wizard.BuscarTercero($("#TxtIdeFun"), $("#TxtNomFun"));



        },
        AbrirEP: function () {
            var msgPpal = "#LbMsg";
            var sw = false;
            if (wizard.GetID() == "") {
                $(msgPpal).msgBox({ titulo: "Estudios Previos...", mensaje: "Por favor Digite un Número de Estudio Previo...!!!", tipo: false });
                wizard.TxtID.focus();
                wizard.disabled = true;
                return false;
            }
            var parametrosJSON = {
                "id_ep": wizard.GetID(),
                "tipo": pag.tipo
            };
            //byaPage.msgJson(parametrosJSON);
            $.ajax({
                type: "POST",
                url: "wfRgEstPrev.aspx/GetEstPrev",
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
                        //.byaSetHabilitar(true);
                        
                        $('#jqxTabs').jqxTabs({ disabled: false });
                        //Deshabilita todos los controles
                        $('.formC :input').attr('disabled', true);
                        $('#TxtDesNec').val(ep.NECE_EP);
                        $('#TxtObjCon').val(ep.OBJE_EP);
                        $('#TxtDesObj').val(ep.DESC_EP);
                        $('#TxtPlazo1').val(ep.PLAZ1_EP);
                        $('#TxtPlazo2').val(ep.PLAZ2_EP);
                        $('#TxtLugar').val(ep.LUGE_EP);
                        $('#TxtPlazoLiq').val(ep.PLIQ_EP);
                        $('#TxtFundJur').val(ep.FJUR_EP);
                        $('#TxtJFacSel').val(ep.JFAC_SEL_EP);
                        $('#TxtFacEsc').val(ep.FAC_ESC_EP);
                        $('#TxtCapFin').val(ep.CAP_FIN_EP);
                        $('#TxtCapRes').val(ep.CAP_RES_EP);
                        //TxtAnaExig.Text = ep.ANA_EXI_EP; era la poliza
                        $('#TxtCodExp').val(ep.CON_EXP_EP);
                        $("#CboEstEP").val(ep.EST_EP);

                        //$("#TxtFecElab").val(byaPage.parseJsonDate(ep.FEC_ELA_EP));
                        //Quien Diligencia
                        $("#TxtIdeFun").val(ep.IDE_DIL_EP);
                        wizard.BuscarTercero($("#TxtIdeFun"), $("#TxtNomFun"));
                        $("#CboCarDilJq").val(ep.CAR_DIL_EP);
                        $("#TxtIdeRes").val(ep.IDE_RES_EP);
                        wizard.BuscarTercero($("#TxtIdeRes"), $("#TxtNomRes"));
                        //CboCarDil.SelectedValue = ep.CAR_DIL_EP;
                        $("#TxtIdeApoTec").val(ep.IDE_APTE_EP);
                        wizard.BuscarTercero($("#TxtIdeApoTec"), $("#TxtNomApoTec"));
                        $("#CboCarApoTec").val(ep.CAR_APTE_EP);

                        //$("#CboCarRes").val(ep.CAR_DIL_EP);
                        $("#CboCarSup").val(ep.CAR_SUP_EP);
                        $("#CboDepSup").val(ep.DEP_SUP_EP);

                        $("#CboDepSol").val(ep.DEP_NEC_EP);
                        $("#CboTip").val(ep.TIP_CON_EP);

                        $("#CboMod").val(ep.MOD_SEL_EP);

                        $("#TxtNEmpleos").val(ep.NUM_EMP_EP);
                        $("#TxtGrupos").val(ep.GRUPOS_EP);


                        $("#TxtPlazo1").val(ep.PLAZ1_EP);
                        $("#CboTPlazo1").val(ep.TPLA1_EP);
                        $("#TxtPlazo2").val(ep.PLAZ2_EP);
                        $("#CboTPlazo2").val(ep.TPLA2_EP);

                        $("#CboDepSup").val(ep.DEP_SUP_EP);

                        wizard.RefreshCboSubTip(ep.TIP_CON_EP);
                        $("#CboDepDel").val(ep.DEP_DEL_EP);

                        $("#txtValTot").val(ep.VAL_ENT_EP + ep.VAL_OTR_EP);

                        $("#txtValProp").val(ep.VAL_ENT_EP);
                        $("#txtValOtros").val(ep.VAL_OTR_EP);


                        //Mostrar Primer Tab
                        $('#jqxTabs').jqxTabs('select', 0);

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
        }

    };
} ());


function _createToolBar() {
    //byaSite.getUsuario();
    _createToolBarEL();
    if (pag.tipo == "EL") {
        
    }
    if (pag.tipo == "RV") {
        _createToolBarRV();
    }
    if (pag.tipo == "AP") {
        _createToolBarAP();
    }
	if (pag.tipo == "DA") {
        _createToolBarDA();
    }
    if (pag.tipo == "CN") {
        _createToolBarCN();
    }
    
}

//Elaboración
function _createToolBarEL() {
    divBtnGrid = "#divToolEP";
    var div = "#dvdEla";
    $("#txtNumero").blur(function (event) {
            AbrirEP();
    });
    if (pag.EP) {
        wizard.TxtID.val(pag.EP);
		AbrirEP();
    }
    var editarButton = $("#editarButton");
    var nuevoButton = $("#nuevoButton");
    var abrirButton = $("#abrirButton");
    var guardarButton = $("#guardarButton");
    var cancelarButton = $("#cancelarButton");
    var imprimirButton = $("#imprimirButton");

    //Handler
    editarButton.click(function (event) {
                Editar();
    });
    nuevoButton.click(function (event) {
                nuevo();
    });
    abrirButton.click(function (event) {
        AbrirEP();
    });
    guardarButton.click(function (event) {
        if (wizard.config.oper = 'editar') {
            GuardarMod();
        } else {
            GuardarNuevo();
        }
        
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
            $('#FrmEstPrev').jqxValidator('hide');
            $('#FrmEstPrev').jqxValidator();
        }
    });
    imprimirButton.click(function (event) {
        alert("Imprimir");
        byaSite.AbrirPagina("/ashx/descEP.ashx?id_ep=" + wizard.TxtID.val());
    });

    var nuevo = function () {
        nuevoButton.byaSetHabilitar(false);
        abrirButton.byaSetHabilitar(false);
        editarButton.byaSetHabilitar(false);

        guardarButton.byaSetHabilitar(true);
        cancelarButton.byaSetHabilitar(true);
        imprimirButton.byaSetHabilitar(true);

        wizard.Nuevo();
    };

    var AbrirEP=function () {
        wizard.config.oper = 'abrir';
        if (wizard.AbrirEP()) {
            editarButton.byaSetHabilitar(true);
            nuevoButton.byaSetHabilitar(false);
            abrirButton.byaSetHabilitar(true);
            editarButton.byaSetHabilitar(true);
            guardarButton.byaSetHabilitar(false);
            cancelarButton.byaSetHabilitar(true);
            imprimirButton.byaSetHabilitar(true);
            //wizard.va
            //Solicitudes.NuevoFromEP(_guardarNuevo);
            //$(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: "Listo...!!! Si desea modificar debe presionar el boton Editar, realizar los cambios y presione el Botón Guardar.", tipo: "info" });
        }
    };
    var Editar = function () {
        nuevoButton.byaSetHabilitar(false);
        abrirButton.byaSetHabilitar(false);
        editarButton.byaSetHabilitar(false);
        
        guardarButton.byaSetHabilitar(true);
        cancelarButton.byaSetHabilitar(true);
        imprimirButton.byaSetHabilitar(true);
        wizard.TxtID.byaSetHabilitar(false);
        wizard.config.oper = 'editar';
        wizard.HabilitarE();
        wizard.disabled = false;
        wizard._createValidacionEL(GuardarMod);
        //$(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: "después de modificar los datos y presione el botón guardar...!!!", tipo: "info" });
    };

    var GuardarNuevo = function () {
        alert('guardo nuevo');
        jsonData = "{'Reg':" + JSON.stringify(datosEP()) + "}";
        alert(jsonData);
        urlTo = "wfRgEstPrev.aspx/insertESTPREV";
        msgPpal = "#LbMsg";
        byaPage.POST_Sync(urlTo, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: byaRpta.Error });
            if (!byaRpta.Error) {
                wizard.SetID(byaRpta.id);
                AbrirEP();
                Editar();
            }
        });
    };
    var GuardarMod = function () {
        alert('guardo mod');
        byaRpta = {};
        jsonData = "{'Reg':" + JSON.stringify(datosEP()) + "}";
        urlTo = "wfRgEstPrev.aspx/updateESTPREV";
        msgPpal = "#LbMsg";
        byaPage.POST_Sync(urlTo, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: byaRpta.Error });
        });
    };

    var datosEPNuevo = function () {
            var ep = {};
            ep.FEC_ELA_EP = $('#TxtFecElab').val();
            ep.IDE_DIL_EP = $("#TxtIdeFun").val();
            ep.CAR_DIL_EP = $("#CboCarDilJq").val();
            ep.IDE_RES_EP = $("#TxtIdeRes").val();
            ep.CAR_RES_EP = $("#CboCarRes").val();
            ep.IDE_APTE_EP = $("#TxtIdeApoTec").val();
            ep.CAR_APTE_EP = $("#CboCarApoTec").val();
            ep.DEP_NEC_EP = $("#CboDepSol").val();
            ep.DEP_SUP_EP = $("#CboDepSup").val();
            ep.CAR_SUP_EP = $("#CboCarSup").val();
            ep.TIP_CON_EP = $("#CboTip").val();
            ep.STIP_CON_EP = $("#CboSubTip").val();
            ep.MOD_SEL_EP = $("#CboMod").val();
            ep.NUM_EMP_EP = $("#TxtNEmpleos").val();
            ep.GRUPOS_EP = $("#TxtGrupos").val();
            ep.DEP_DEL_EP = $("#CboDepDel").val();
            ep.VAL_ENT_EP = $("#txtValProp").val();
            ep.VAL_OTR_EP = $("#txtValOtros").val();
            return ep;
        };

    var datosEP = function () {
            var ep = {};
            ep.ID = wizard.GetID();
            ep.NECE_EP = $('#TxtDesNec').val();
            ep.OBJE_EP = $('#TxtObjCon').val();
            ep.DESC_EP = $('#TxtDesObj').val();
            ep.LUGE_EP = $('#TxtLugar').val();
            //ep.PLIQ_EP = $('#TxtPlazoLiq').val();
            ep.FJUR_EP = $('#TxtFundJur').val();
            ep.JFAC_SEL_EP = $('#TxtJFacSel').val();
            ep.FAC_ESC_EP = $('#TxtFacEsc').val();
            ep.CAP_FIN_EP = $('#TxtCapFin').val();
            ep.CAP_RES_EP = $('#TxtCapRes').val();
            ep.CON_EXP_EP = $('#TxtCodExp').val();
            ep.FEC_ELA_EP = $('#TxtFecElab').val();
            ep.IDE_RES_EP = $("#TxtIdeRes").val();
            ep.CAR_RES_EP = $("#CboCarRes").val();
            ep.IDE_DIL_EP = $("#TxtIdeFun").val();
            ep.CAR_DIL_EP = $("#CboCarDilJq").val();
            ep.IDE_APTE_EP = $("#TxtIdeApoTec").val();
            ep.CAR_APTE_EP = $("#CboCarApoTec").val();
            ep.CAR_SUP_EP = $("#CboCarSup").val();
            ep.DEP_SUP_EP = $("#CboDepSup").val();
            ep.DEP_NEC_EP = $("#CboDepSol").val();
            ep.TIP_CON_EP = $("#CboTip").val();
            ep.MOD_SEL_EP = $("#CboMod").val();
            ep.TIP_CON_EP = $("#CboTip").val();
            ep.STIP_CON_EP = $("#CboSubTip").val();
            ep.VIG_EP = $("#CboVig").val();
            ep.DEP_DEL_EP = $("#CboDepDel").val();
            ep.VAL_ENT_EP = $("#txtValProp").val();
            ep.VAL_OTR_EP = $("#txtValOtros").val();
            /*
            ep.NUM_EMP_EP = $("#TxtNEmpleos").val();
            ep.GRUPOS_EP = $("#TxtGrupos").val();
            ep.PLAZ1_EP = $("#TxtPlazo1").val();
            ep.TPLA1_EP = $("#CboTPlazo1").val();
            ep.PLAZ2_EP = $("#TxtPlazo2").val();
            ep.TPLA2_EP = $("#CboTPlazo2").val();
            */
            return ep;
        };

        
}

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
	
    if( pag.EP ){
		 wizard.TxtID.val(pag.EP);
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

    if (pag.EP) {
        wizard.TxtID.val(pag.EP);
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

    if (pag.EP) {
        wizard.TxtID.val(pag.EP);
        AbrirEP();
        alert("Ho....");
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
    if (pag.EP) {
        wizard.TxtID.val(pag.EP);
        wizard.AbrirEP();
     
    }
    imprimirButton.click(function (event) {
        if (!imprimirButton.jqxButton('disabled')) {
            wizard.imprimir();
        }
    });

}