var mTerceros = (function () {
    "use strict";
    var tercero;
    var ventana = '#modalTerceros';
    var operacionEjecutar;
    var urlToAbrirTer = "/Servicios/DatosBasicosG/wsTerceros.asmx/GetTercerosxId";
    var urlToGuardarNuevo = "/Servicios/DatosBasicosG/wsTerceros.asmx/Insert";
    var urlToGuardarMod = "/Servicios/DatosBasicosG/wsTerceros.asmx/Update";
    var _addHandlers = function () {
        $("#btnGuardarTercero").click(function () {
            if(validarDatosTercero(getDatos()))         
            {
                if (operacionEjecutar == "N") _guardarNuevo();
                else GuardarMod();
            }
        });
        $("#btnSeleccinarCodigo").click(function () {
            var item = ModTer.getTerceroSelect();
            _AbrirTerceroVer(item.IDE_TER);
            if (validarDatosTercero(tercero)) {
                mTerceros.fnresultado(item);
                _ocultarVentana();
            }
        });
        $("#btnNuevoTercero").click(function () {
            Limpiar();
            operacionEjecutar = "N";
        });
        $("#btnEditarTercero").click(function () {
            operacionEjecutar = "E";
            var Tercero = ModTer.getTerceroSelect();
            _AbrirTercero(Tercero.IDE_TER);
        });
    };
    var _createElements = function () {
        ModTer.init();

        var sourceDep = [
        { "NOM_DOC": "NIT", "COD_DOC": "NI " },
        { "NOM_DOC": "CÉDULA DE CIUDADANÍA", "COD_DOC": "CC " },
        { "NOM_DOC": "CÉDULA DE EXTRANJERÍA", "COD_DOC": "CE " },
        { "NOM_DOC": "PASAPORTE", "COD_DOC": "PA " }
        ];
        $('#CboTipNroM').byaCombo({
            DataSource: sourceDep, placeHolder: 'Seleccione el tipo de Doc', Display: "NOM_DOC", Value: "COD_DOC"
        });

        //var sourceDep = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIA');
        //$("#CboDepNecM").byaCombo({
        //    DataSource: sourceDep, placeHolder: 'Dependencia Contratante:', Display: "NOM_DEP", Value: "COD_DEP"
        //});

        var sourceDep = [
        { "NOM_TIP": "NINGUNO", "COD_TIP": "NI" },
        { "NOM_TIP": "UNICA PERSONA", "COD_TIP": "PU" },
        { "NOM_TIP": "CONSORCIO", "COD_TIP": "CS" },
        { "NOM_TIP": "UNIÓN TEMPORAL", "COD_TIP": "UT" }
        ];
        $('#CboTpTerM').byaCombo({
            DataSource: sourceDep, placeHolder: 'Tipo de Tercero', Display: "NOM_TIP", Value: "COD_TIP"
        });
        var sourceDep = [
               { "NOM_EST": "ACTIVO", "COD_EST": "AC" },
               { "NOM_EST": "INACTIVO", "COD_EST": "IN" }
        ];
        $('#cbotEstM').byaCombo({
            DataSource: sourceDep, placeHolder: 'Estado del Tercero', Display: "NOM_EST", Value: "COD_EST"
        });

        var sourceDep = [
             { "NOM_CLA": "PERSONA NATURAL", "COD_CLA": "PN" },
             { "NOM_CLA": "PERSONA JURIDICA", "COD_CLA": "PJ" }
        ];
        $('#CboClasfM').byaCombo({
            DataSource: sourceDep, placeHolder: 'Tipo de persona', Display: "NOM_CLA", Value: "COD_CLA"
        });
    };
    var _mostrarVentana = function () {
        $(ventana).modal('show');
    };
    var _ocultarVentana = function () {
        $(ventana).modal('hide');
    };
    var Limpiar = function () {
        $('#CboTipNroM').val("");
        $('#txtNroDocM').val("");
        $('#txtLugExpM').val("");
        $('#txtPrimApeM').val("");
        $('#txtSegApeM').val("");
        $('#txtPrimNomM').val("");
        $('#txtSegNomM').val("");
        $('#txtRazSocM').val("");
        $('#txtFecNacM').val("");
        $('#txtDirM').val("");
        $('#txtTelM').val("");
        $('#txtEmaM').val("");
        $('#txtcargoM').val("");
        //$('#CboDepNecM').val("");
        $('#cbotEstM').val("");
        $('#CboTpTerM').val("");
        $('#txtObsM').val("");
        $('#CboClasfM').val("");
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
            success: function (result) {
                var ter = byaPage.retObj(result.d);
                    $('#CboTipNroM').val(ter.TIP_IDE);
                    $('#txtNroDocM').val(ter.IDE_TER);
                    $('#txtLugExpM').val(ter.EXP_IDE);
                    $('#txtPrimApeM').val(ter.APE1_TER);
                    $('#txtSegApeM').val(ter.APE2_TER);
                    $('#txtPrimNomM').val(ter.NOM1_TER);
                    $('#txtSegNomM').val(ter.NOM2_TER);
                    $('#txtRazSocM').val(ter.RAZ_SOC);
                    $('#txtFecNacM').val(byaPage.converJSONDate(ter.FEC_NAC));
                    $('#txtDirM').val(ter.DIR_TER);
                    $('#txtTelM').val(ter.TEL_TER);
                    $('#txtEmaM').val(ter.EMA_TER);
                    $('#txtcargoM').val(ter.CAR_FUN);
                    //$('#CboDepNecM').val(ter.DEP_NEC);
                    $('#cbotEstM').val(ter.ESTADO);
                    $('#CboTpTerM').val(ter.TIPO);
                    $('#txtObsM').val(ter.OBS_TER);
                    $('#CboClasfM').val(ter.TIP_PER);
            },
            error: function (jqXHR, status, error) {
                alert("Debe Seleccionar un Tercero de la tabla para editar...");
            }
        });
    };
    var _AbrirTerceroVer = function (ideTer) {
        var parametrosJSON = { "IdTer": ideTer };
        $.ajax({
            type: "GET",
            url: urlToAbrirTer,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                tercero = byaPage.retObj(result.d);
            },
            error: function (jqXHR, status, error) {
                alert("Debe Seleccionar un Tercero de la tabla para editar...");
            }
        });
    };
    var getDatos = function () {
        var e = {};
        e.TIP_IDE = $('#CboTipNroM').val();
        e.IDE_TER = $('#txtNroDocM').val();
        e.EXP_IDE = $('#txtLugExpM').val();
        e.DV_TER = $('#TxtDVM').val();
        e.APE1_TER = $('#txtPrimApeM').val();
        e.APE2_TER = $('#txtSegApeM').val();
        e.NOM1_TER = $('#txtPrimNomM').val();
        e.NOM2_TER = $('#txtSegNomM').val();
        e.RAZ_SOC = $('#txtRazSocM').val();
        e.FEC_NAC = $('#txtFecNacM').val();
        e.DIR_TER = $('#txtDirM').val();
        e.TEL_TER = $('#txtTelM').val();
        e.EMA_TER = $('#txtEmaM').val();
        e.CAR_FUN = $('#txtcargoM').val();
        //e.DEP_NEC = $('#CboDepNecM').val();
        e.ESTADO = "AC";
        e.TIPO = $('#CboTpTerM').val();
        e.OBS_TER = $('#txtObsM').val();
        e.TIP_PER = $('#CboClasfM').val();
        var now = new Date();
        e.FEC_MOD = byaPage.FechaShortX(now);
        if (operacionEjecutar == 'N') {
            e.FEC_REG = byaPage.FechaShortX(now);
        }
        return e;
    };
    var _guardarNuevo = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            alert(byaRpta.Mensaje);
            mTerceros.init();
        });
    };
    var GuardarMod = function () {
        var byaRpta = {};
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            alert(byaRpta.Mensaje);
            mTerceros.init();
            $("#ediTer").removeClass("active");
            $("#tabRTerceros").removeClass("active");
            $("#gesTer").addClass("active");
            $("#tabGTerceros").addClass("active");
        });
    };
    var validarDatosTercero = function (ter) {
        var Mensaje = "";
        var Permiso = true;
        if ((ter.TIP_IDE == "") || (ter.TIP_IDE == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Tipo de identificacion";
        } else {
            if (ter.TIP_IDE == "NI ") {
                if ((ter.RAZ_SOC == "") || (ter.RAZ_SOC == null)) {
                    Permiso = false;
                    Mensaje = Mensaje + "\n  - Razón social";
                }
            } else {
                if ((ter.APE1_TER == "") || (ter.APE1_TER == null)) {
                    Permiso = false;
                    Mensaje = Mensaje + "\n  - Primer Apellido";
                }
                if ((ter.NOM1_TER == "") || (ter.NOM1_TER == null)) {
                    Permiso = false;
                    Mensaje = Mensaje + "\n  - Primer Nombre";
                }
            }
        }
        if ((ter.EXP_IDE == "") || (ter.EXP_IDE == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Expedicion";
        }
        if ((ter.TIP_PER == "") || (ter.TIP_PER == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Tipo de persona";
        }
        if ((ter.TIPO == "") || (ter.TIPO == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Tipo de tercero";
        }
        if ((ter.APE1_TER == "") || (ter.APE1_TER == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Primer Apellido";
        }
        if ((ter.DIR_TER == "") || (ter.DIR_TER == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Dirección";
        }
        if ((ter.TEL_TER == "") || (ter.TEL_TER == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Télefono";
        }
        if ((ter.EMA_TER == "") || (ter.EMA_TER == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Email";
        } else {
            var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!expr.test(ter.EMA_TER)) {
                Permiso = false;
                Mensaje = Mensaje + "\n  - La dirección de correo no es valida";
            }
        }
        if ((ter.FEC_NAC == "") || (ter.FEC_NAC == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Fecha nacimiento/creación";
        }

        if (Permiso == false) alert("Los campos: " + Mensaje + "\nNo pueden estar vacíos.\nPuede ir a Editar y luego agragarlo nuevamente.");
        return Permiso;
    };
    return {
        fnresultado: null,
        config: {
            theme: null
        },
        init: function () {
            _addHandlers();
            _createElements();
        },
        ShowModal: function () {
            _mostrarVentana();
        },
        HideModal: function () {
            _ocultarVentana();
        },
        showWindow: function (fnresultado) {
            this.fnresultado = fnresultado;
            this.ShowModal();
        }
    };
}());
$(function () {
    mTerceros.init();
});