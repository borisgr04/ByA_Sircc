var objregistro = (function () {

    var urlSourceEst = '/servicios/wsDatosBasicos.asmx/GetvEP_ESTADOS';
    var urlSourceDep = '/servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAT';
    var urlSourceDepS = '/servicios/wsDatosBasicos.asmx/GetvDEPENDENCIA';
    var urlSourceDepD = '/servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD';
    var urlSourceTip = '/servicios/wsDatosBasicos.asmx/GetvTIPOSCONT';
    var urlSourceMod = '/servicios/wsDatosBasicos.asmx/GetvModalidad';
    var urlSourcePla = '/servicios/wsDatosBasicos.asmx/GetvTIPO_PLAZOS';
    var urlSourcePlazos2 = '/servicios/wsDatosBasicos.asmx/GetvTIPO_PLAZOS2';
    var urlSourceTer = "/Servicios/wsDatosBasicos.asmx/GetNomTercerosPk";
    var urlSourceSubTip = '/servicios/wsDatosBasicos.asmx/GetvSUBTIPOS';

    var urlToAbrir = "/Servicios/DatosBasicosG/wsVigencias.asmx/Get";
    var urlToGuardarNuevo = "/Servicios/CT_Radicacion/ws_ct_radicacion.asmx/InsertEst";
    var urlToGuardarMod = "/Servicios/DatosBasicosG/wsVigencias.asmx/Update";

    var urlToAbrirDeEstPrev = "/Servicios/wsProcesos.asmx/GetEstPrevToProceso";
    var urlToInsert = "/Servicios/CT_Radicacion/ws_ct_radicacion.asmx/InsertEst";
    var urlToAbrirContrato = "/Servicios/CT_Radicacion/ws_ct_radicacion.asmx/GetContratos";

    var activarValidar = true;
    var ejecutar;
    var idObj;
    var msgPpal = "#LbMsg";


    var lProyectos = new Array();
    var lCDPs = new Array();
    var lFP = new Array();
    var lPol = new Array();

    var tableProy;
    var tblCdp;
    var tblFP;
    var tblPol;
    var tblRubros;

    var dtoEstPrev;

    var _addHandlers = function () {
        $("#btnVolverAtras").click(function () {
            history.back();
        });
        $("#nuevoButton").click(function () {
            var value = $('#CboTip').val();
            if (value != "") Nuevo();
            else alert("Debe seleccionar un tipo de contrato");
        });
        $("#editarButton").click(function () {
            Editar();
        });
        $("#guardarButton").click(function () {
            byaMsgBox.confirm("Desea guardar los Cambios?", function (result) {
                if (result) {
                    ejecutar();
                }
            });
        });
        $("#cancelarButton").click(function () {
            _cancelar();
        });
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });
        $("#btnBuscarProceso").click(function () {
            AbrirEP();
        });
        $('#CboTip').change(function (event) {
            objregistro.RefreshCboSubTip();
        });
        $("#TxtNroPro").blur(function () {
            AbrirEP();
        });
        $("#abrirButton").click(function () {
            var value = $("#txtNumero").val();
            if (value != "") AbrirContrato();
            else alert("Debe digitar un número de proceso");
        });
    };    
    var _crearElements = function () {
        var sourceDep = byaPage.getSource(urlSourceDep);
        $("#CboDepSup").byaCombo({ DataSource: sourceDep, Value: "COD_DEP", Display: "NOM_DEP" });

        var sourceDepS = byaPage.getSource(urlSourceDepS);
        $("#CboDepSol").byaCombo({ DataSource: sourceDepS, Value: "COD_DEP", Display: "NOM_DEP" });

        var sourceDepD = byaPage.getSource(urlSourceDepD);
        $("#CboDepDel").byaCombo({ DataSource: sourceDepD, Value: "COD_DEP", Display: "NOM_DEP" });
        
        var sourcePla = byaPage.getSource(urlSourcePla);
        $("#CboTPlazo1").byaCombo({ DataSource: sourcePla, Value: "COD_TPLA", Display: "NOM_PLA" });

        $("#CboTPlazo2").byaCombo({ DataSource: sourcePla, Value: "COD_TPLA", Display: "NOM_PLA" });

        var sourceMod = byaPage.getSource(urlSourceMod);
        $("#CboMod").byaCombo({ DataSource: sourceMod, Value: "COD_TPROC", Display: "NOM_TPROC" });

        var sourceTip = byaPage.getSource(urlSourceTip);
        $("#CboTip").byaCombo({ DataSource: sourceTip, Value: "COD_TIP", Display: "NOMC_TIP" });
    };
    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                objregistro.config.oper = 'cancelar';
                _reset();
            }
        });
    };
    var _reset = function () {
        $("#nuevoButton").byaSetHabilitar(true);
        $("#guardarButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#cancelarButton").byaSetHabilitar(false);
        objregistro.DesOrhabilitar(false);
        objregistro.Limpiar();
        $(msgPpal).html("");
    };
    var _esValido = function () {
        var modalidadSeleccion = $("#CboMod").val();
        if (modalidadSeleccion == "") {
            $(msgPpal).msgBox({ titulo: "Radicacion", mensaje: "El campo Modalidad de seleccion no puede estar vacio", tipo: false });
            return false;
        } else {
            var numeroProceso = $("#TxtNroPro").val();
            if (numeroProceso == "") {
                $(msgPpal).msgBox({ titulo: "Radicacion", mensaje: "El campo Número de Proceso no puede estar vacio", tipo: false });
                return false;
            } else {
                var identificacionContrato = $("#CboSubTip").val();
                if (identificacionContrato == "") {
                    $(msgPpal).msgBox({ titulo: "Radicacion", mensaje: "El campo Identificación del contrato no puede estar vacio", tipo: false });
                    return false;
                } else {
                    var FechaSuscricion = $("#TxtFecSus").val();
                    if (FechaSuscricion == "") {
                        $(msgPpal).msgBox({ titulo: "Radicacion", mensaje: "El campo Fecha de suscripción no puede estar vacio", tipo: false });
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
    }
    var _guardarNuevo = function () {
        if (_esValido()) {
            var jsonData = "{'Reg':" + JSON.stringify(_getDatosRadicacion()) + "}";
            byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);                
                if (!byaRpta.Error) {
                    $(msgPpal).msgBox({ titulo: "Radicacion", mensaje: byaRpta.Mensaje + "<br/>Contrato radicado con el código: <strong>" + byaRpta.id + "</strong>", tipo: !byaRpta.Error });
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(true);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    objregistro.DesOrhabilitar(false);
                    $("#TxtNroPro").byaSetHabilitar(false);
                } else $(msgPpal).msgBox({ titulo: "Radicacion", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            });
        }
    };
    var _guardarMod = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("datos");
            datos.RAD_AUT = 1;
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Se Modifico el Item", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    objregistro.DesOrhabilitar(false);
                }
            });
            $("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(true);
            $("#guardarButton").byaSetHabilitar(false);
            $("#cancelarButton").byaSetHabilitar(false);
        }
    };
    var Nuevo = function () {
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        objregistro.config.oper = 'Nuevo';
        objregistro.Limpiar();
        $(".inputHabNew").byaSetHabilitar(true);
        //objregistro.DesOrhabilitar(true);
        ejecutar = _guardarNuevo;
    };
    var Editar = function () {
        objregistro.config.oper = 'Editar';
        objregistro.DesOrhabilitar(true);
        objregistro.disabled = false;
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $(msgPpal).msgBox({ titulo: "Vigencias", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        ejecutar = _guardarMod;
    };
    var AbrirEP = function () {
        var parametrosJSON = {
            "Num_Pro": "'" + $("#TxtNroPro").val() + "'",
        };
        $.ajax({
            type: "GET",
            url: urlToAbrirDeEstPrev,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {

            },
            success: function (result) {
                var ep = byaPage.retObj(result.d);
                //alert(JSON.stringify(ep));

                $("#TxtIdeCon").val(ep.IDE_CON_EP);
                objregistro.BuscarTercero($("#TxtIdeCon"), $("#TxtNomCon"));

                $("#TxtIdeRep").val(ep.IDE_REP_EP);
                objregistro.BuscarTercero($("#TxtIdeRep"), $("#TxtNomRep"));

                $("#CboDepSol").val(ep.DEP_NEC_EP);
                $("#TxtObjCon").val(ep.OBJE_EP);
                $("#CboDepDel").val(ep.DEP_DEL_EP);
                $("#CboDepSup").val(ep.DEP_SUP_EP);
                $("#TxtLugar").val(ep.LUGE_EP);
                $("#TxtPlazoLiq").val(ep.PLIQ_EP);
                $("#cboApoyo").val(ep.PERSONA_APOYO);
                $("#cboENPLANC_EP").val(ep.ENPLANC_EP);

                lProyectos = ep.l_EP_PROYECTOS;
                CargarTablaProyectos();

                lCDPs = ep.l_EP_CDP;
                crearTablaCDP();

                lFP = ep.l_EP_FORMA_PAGO;
                CargarTablaFormasPago();

                lPol = ep.l_EP_POLIZAS2;
                CargarTablaPolizas();
                
                $("#txtValTot").byaSetDecimal(parseFloat(ep.VAL_ENT_EP) + parseFloat(ep.VAL_OTR_EP));
                $("#txtValProp").byaSetDecimal(ep.VAL_ENT_EP);
                $("#txtValOtros").byaSetDecimal(ep.VAL_OTR_EP);
                $("#txtAnti_Porc").val(ep.ANTI_PORC);

                var porc = $("#txtAnti_Porc").byaGetDecimal();
                var ValTot = $("#txtValTot").byaGetDecimal();
                if (porc > 0) {
                    var valor = parseFloat(ValTot);
                    var anticipo = valor * porc / 100;
                }
                $("#txtAnti_Val").byaSetDecimal(anticipo);

                $("#TxtPlazo1").val(ep.PLAZ1_EP);
                $("#CboTPlazo1").val(ep.TPLA1_EP);
                $("#TxtPlazo2").val(ep.PLAZ2_EP);
                $("#CboTPlazo2").val(ep.TPLA2_EP);
                $("#cboFPagoTipo").val(ep.TIPO_FP);
                $("#txtObligC").val(ep.OBLIGC);
                $("#txtObligE").val(ep.OBLIGE);
                //$("#").val(ep.);


            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var AbrirContrato = function () {
        var parametrosJSON = {
            "cod_con": "'" + $("#txtNumero").val() + "'",
        };
        $.ajax({
            type: "GET",
            url: urlToAbrirContrato,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
            },
            success: function (result) {
                var ep = byaPage.retObj(result.d);

                $("#CboTip").val(ep.TIP_CON);
                objregistro.RefreshCboSubTip();
                $("#CboSubTip").val(ep.STIP_CON);
                $("#CboMod").val(ep.COD_TPRO);
                $("#TxtNroPro").val(ep.NUM_PROC);
                $("#TxtFecSus").val(byaPage.converJSONDate(ep.FEC_SUS_CON));

                $("#TxtIdeCon").val(ep.IDE_CON);
                objregistro.BuscarTercero($("#TxtIdeCon"), $("#TxtNomCon"));
                $("#TxtIdeRep").val(ep.IDE_REP);
                objregistro.BuscarTercero($("#TxtIdeRep"), $("#TxtNomRep"));

                $("#CboDepSol").val(ep.DEP_CON);
                $("#TxtObjCon").val(ep.OBJ_CON);
                $("#CboDepDel").val(ep.DEP_PCON);
                $("#CboDepSup").val(ep.DEP_SUP);
                $("#TxtLugar").val(ep.LUG_EJE);
                $("#TxtPlazoLiq").val(ep.PLIQ_EP);
                $("#cboApoyo").val(ep.PER_APO);
                $("#cboENPLANC_EP").val(ep.ENPLANC_EP);

                lProyectos = ep.l_EP_PROYECTOS;
                CargarTablaProyectos();

                lCDPs = ep.l_EP_CDP;
                crearTablaCDP();

                lFP = ep.l_EP_FORMA_PAGO;
                CargarTablaFormasPago();

                lPol = ep.l_EP_POLIZAS2;
                CargarTablaPolizas();

                $("#txtValTot").byaSetDecimal(ep.VAL_CON);
                $("#txtValProp").byaSetDecimal(ep.VAL_APO_GOB);
                $("#txtValOtros").byaSetDecimal($("#txtValTot").byaGetDecimal() - $("#txtValProp").byaGetDecimal());
                $("#txtAnti_Porc").val(ep.ANTI_PORC);

                var porc = $("#txtAnti_Porc").byaGetDecimal();
                var ValTot = $("#txtValTot").byaGetDecimal();
                if (porc > 0) {
                    var valor = parseFloat(ValTot);
                    var anticipo = valor * porc / 100;
                }
                $("#txtAnti_Val").byaSetDecimal(anticipo);

                $("#TxtPlazo1").val(ep.PLA_EJE_CON);
                $("#CboTPlazo1").val(ep.TIPO_PLAZO);
                $("#TxtPlazo2").val(ep.PLAZO2_EJE_CON);
                $("#CboTPlazo2").val(ep.TIPO_PLAZO2);
                $("#cboFPagoTipo").val(ep.TIP_FP);
                $("#txtObligC").val(ep.OBLIGC);
                $("#txtObligE").val(ep.OBLIGE);
                $(msgPpal).msgBox({ titulo: "Radicación", mensaje: "Se cargo la información del contrato", tipo: true });
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };

    var _getDatosRadicacion = function () {
        var e = {};
        e.TIP_CON = $("#CboTip").val();
        e.STIP_CON = $("#CboSubTip").val();
        e.COD_TPRO = $("#CboMod").val();
        e.NUM_PROC = $("#TxtNroPro").val();
        e.FEC_SUS_CON = $("#TxtFecSus").val();
        e.IDE_CON = $("#TxtIdeCon").val();
        e.IDE_REP = $("#TxtIdeRep").val();
        e.DEP_CON = $("#CboDepSol").val();
        e.OBJ_CON = $("#TxtObjCon").val();
        e.DEP_PCON = $("#CboDepDel").val();
        e.DEP_SUP = $("#CboDepSup").val();
        e.LUG_EJE = $("#TxtLugar").val();
        e.PLIQ_EP = $("#TxtPlazoLiq").val();
        e.PER_APO = $("#cboApoyo").val();
        e.VAL_CON = $("#txtValTot").byaGetDecimal();
        e.VAL_APO_GOB = $("#txtValProp").byaGetDecimal();
        e.ANTI_PORC = $("#txtAnti_Porc").val();
        e.ANTICIPO = $("#txtAnti_Val").val();
        e.PLA_EJE_CON = $("#TxtPlazo1").val();
        e.TIPO_PLAZO = $("#CboTPlazo1").val();
        e.PLAZO2_EJE_CON = $("#TxtPlazo2").val();
        e.TIPO_PLAZO2 = $("#CboTPlazo2").val();
        e.TIP_FP = $("#cboFPagoTipo").val();
        e.OBLIGC = $("#txtObligC").val();
        e.OBLIGE = $("#txtObligE").val();
        e.l_EP_PROYECTOS = tableProy.getSource();
        e.l_EP_CDP = tblCdp.getSource();
        e.l_EP_FORMA_PAGO = tblFP.getSource();
        e.l_EP_POLIZAS2 = tblPol.getSource();
        e.VIG_CON = byaSite.getVigencia();
        e.USUARIO = objregistro.getUser();
        //alert(e.VIG_CON);
        //alert(JSON.stringify(e));
        return e;
    };

    var CargarTablaProyectos = function () {
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
                var colomnBound = '<td>' + item.COD_PRO + "</td><td>" + item.NOMBRE_PROYECTO + "</td>";
                return colomnBound;
            }
        };
        tableProy = new byaTablaG();
        tableProy.init(config);
        tableProy.setEnabled(false);
    };
    var crearTablaCDP = function () {
        $.each(lCDPs, function (index, item) {
            item.FEC_CDP = byaPage.converJSONDate(item.FEC_CDP);
        });
        var config = {
            Id: '#tblCdp',
            Source: lCDPs,
            fn_Editar: Editar,
            fn_Seleccionar: verDetallesCDP,
            lEliminar: false,
            lEditar: false,
            lSeleccionar: true,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: true,
            fnFormatItem: function (item, index) {
                //alert(index);
                var Consultar = '<span class="glyphicon glyphicon-search clsstblCdpSelect" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var colomnBound = '<td>' + item.NRO_CDP + "</td><td>" + item.FEC_CDP + "</td><td>" + byaPage.formatNumber.new(item.VAL_CDP, "$") + "</td><td>" + item.VIG_FUT + "</td>";
                var Botones = '<td>' + Consultar + ' </td>';
                return colomnBound + Botones;

            }
        };
        tblCdp = new byaTablaG();
        tblCdp.init(config);
    };
    var CargarTablaFormasPago = function () {
        $.each(lFP, function (index, item) {
            item.FEC_REG = byaPage.converJSONDate(item.FEC_REG);
        });
        var config = {
            Id: '#tblFP',
            Source: lFP,
            fn_Editar: null,
            fn_Seleccionar: null,
            lEliminar: false,
            lEditar: false,
            lSeleccionar: false,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: true,
            fnFormatItem: function (item, index) {

                var colomnBound = '<td>' + item.ORD_FPAG + "</td><td>" + item.CAN_PAG + "</td><td>" + item.NOM_TIP_FPAG + "</td><td>" + byaPage.formatNumber.new(item.VAL_FPAG, "$") + "</td><td>" + item.POR_FPAG + "</td><td>" + item.PGEN_FPAG + "</td><td>" + item.CON_FPAG + "</td>";
             
                return colomnBound;
            }
        };
        tblFP = new byaTablaG();
        tblFP.init(config);
    };
    var CargarTablaPolizas = function () {
        var config = {
            Id: '#tblPol',
            Source: lPol,
            fn_Editar: null,
            fn_Seleccionar: null,
            lEliminar: false,
            lEditar: false,
            lSeleccionar: false,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: true,
            fnFormatItem: function (item, index) {

                var colomnBound = '<td>' + item.NOM_POL + "</td><td>" + item.DES_POL + "</td></td>";
                return colomnBound;
            }
        };
        tblPol = new byaTablaG();
        tblPol.init(config);
    };
    var CargarTablaRubros = function (lR) {
        var config = {
            Id: '#tblRubros',
            Source: lR,
            fn_Editar: null,
            fn_Seleccionar: null,
            lEliminar: false,
            lEditar: false,
            lSeleccionar: false,
            Display: 'COD_RUB',
            Value: 'COD_RUB',
            Enabled: false,
            fnFormatItem: function (item, index) {
                var colomnBound = '<td>' + item.COD_RUB + "</td><td>" + item.NOM_RUB + "</td><td>" + byaPage.formatNumber.new(item.VALOR, "$") + "</td>";
                return colomnBound;

            }
        };
        tblRubros = new byaTablaG();
        tblRubros.init(config);
        tblRubros.setEnabled(false);
    };


    var verDetallesCDP = function (item, index) {
        CargarTablaRubros(item.EP_RUBROS_CDP);
    };

    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        RefreshCboSubTip: function () {
            var cod_tip = $('#CboTip').val();
            var source = byaPage.getSource(urlSourceSubTip, { cod_tip: "'" + cod_tip + "'" });
            $("#CboSubTip").byaCombo({ DataSource: source, Value: "COD_STIP", Display: "NOMC_STIP" });
        },
        init: function () {
            _addHandlers();
            _crearElements();
            $("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(false);
            $("#guardarButton").byaSetHabilitar(false);
            $("#cancelarButton").byaSetHabilitar(false);

            this.DesOrhabilitar(false);
        },
        DesOrhabilitar: function (value) {
            $(".inputHab").byaSetHabilitar(value);
        },
        Limpiar: function () {
            $(".limpiar").val("");
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
        getUser: function () {
            return byaSite.getUsuario();
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Contratos", Modulo: "Radicación", urlToPanelModulo: "#", Cod_Mod: "CONT4", Rol: "CT_RADEST" });
    objregistro.init();
});
