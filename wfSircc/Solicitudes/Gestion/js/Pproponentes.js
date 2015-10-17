var admProponentes = (function () {
    var msgPpal = "#LbMsg";
    var urlModalTerceros = "../../DatosBasicosG/Terceros/Tercerosh.html";
    var urlToAbrirTer = "/Servicios/DatosBasicosG/wsTerceros.asmx/GetTercerosxId";
    var urlToGuardarNuevo = "../../Servicios/wsProponentes.asmx/Insert";
    var urlToGuardarMod = "../../Servicios/wsProponentes.asmx/Update";
    var urlToProponente = "../../Servicios/wsProponentes.asmx/Get";
    var urlToSiAdjudicado = "../../Servicios/wsProponentes.asmx/GetSiAdjudicado";
    var urlToAsignarNit = "../../Servicios/wsProponentes.asmx/AsignarNit";
    var urlToVerificarSiNitAsignado = "../../Servicios/wsProponentes.asmx/GetSiNitAsignado";
    var urlToProceso = "/Servicios/wsProcesos.asmx/GetProceso";
    var urlSourcePlz = '/servicios/wsDatosBasicos.asmx/GetPolizas';
    var urlSourceAsgdra = '/servicios/Contratos/wsLegalizacion.asmx/GetAseguradoras';
    var operacionEjecutar;
    var activarValidar = true;
    var oNumProc;
    var asignadoNit;
    var idProponente;
    var objProceso;
    var _addHandlers = function () {
        $('#txtRazonSocialProponente').blur(function () {
            $("#txtPrimerApellidoProponente").val($(this).val());
        });
        $("#btnBuscarIdProponente").click(function () {
            $.get(urlModalTerceros, function (data) {
                $("#secBsqTerceros").html(data);
                mTerceros.showWindow(function (item) {
                    //alert(JSON.stringify(item));
                    
                    _AbrirTercero(item.IDE_TER);
                });
            });
        });
        $("#txtValorPropuesta").blur(function () {
            $("#txtValorPropuestaSinIVA").val($(this).val());
            $('.currency').formatCurrency();
        });
        $("#txtValorPropuestaSinIVA").blur(function () {
            var ValorPropuesta = $("#txtValorPropuesta").byaGetDecimal();
            var ValorPropuestaSinIVA = $(this).byaGetDecimal();
            if (ValorPropuestaSinIVA > ValorPropuesta) {
                alert("Error: El Valor de la propuesta sin IVA no puede ser mayor que El Valor de total de la propuesta.");
                $(this).byaSetDecimal(ValorPropuesta);
                $(this).focus();                
            }
        });
        $("#btnBuscarIdRepresentanteLegal").click(function () {
            $.get(urlModalTerceros, function (data) {
                $("#secBsqTerceros").html(data);
                mTerceros.showWindow(function (item) {
                    $("#txtIdRepresentanteLegal").val(item.IDE_TER);
                });
            });
        });
        $("#cboTipoProponente").change(function () {
                var tipoPersona = $("#cboTipoProponente").val();
                if (tipoPersona == "PU") {
                    admProponentes.dHabilitarCamposTercero(false);
                    if (operacionEjecutar != "N") $("#btnAsignarNit").byaSetHabilitar(false);
                }
                else {
                    admProponentes.dHabilitarCamposTercero(true);
                    if ((operacionEjecutar != "N")&&(asignadoNit == false)) $("#btnAsignarNit").byaSetHabilitar(true);
                    admProponentes.LimpiarCamposTecero();

                    $("#txtPrimerApellidoProponente").byaSetHabilitar(false);
                    $("#txtSegundoApellidoProponente").byaSetHabilitar(false);
                    $("#txtPrimerNombreProponente").byaSetHabilitar(false);
                    $("#txtSegundoNombreProponente").byaSetHabilitar(false);

                    $("#txtRazonSocialProponente").byaSetHabilitar(true);
                }
        });
        $("#btnAsignarNit").click(function () {
            $("#modalAsignarNit").modal("show");
        });
        $("#cancelarButton").click(function () {
            _cancelar();
        });
        $("#nuevoButton").click(function () {
            Nuevo();
        });
        $("#editarButton").click(function () {
            Editar();
        });
        $("#guardarButton").click(function () {
            var ValProp = parseFloat($("#txtValorPropuesta").byaGetDecimal());
            var ValEstP = parseFloat(objProceso.VAL_CON);
            if (ValProp <= ValEstP) {
                if (operacionEjecutar == "N") _guardarNuevo();
                else _guardarMod();
            } else {
                alert("El valor de la propuesta no puede ser mayor al valor del estudio previo...");
            }
        });
        $("#btnAdjudicar").click(function () {
            $("#modalAdjudicar").modal("show");
        });
        $("#btnEnviarAsignarNit").click(function () {
            AsignarNit();
        });
        $('.currency').byaSetDecimal(0);
        ////que todos los que tengan formato currency
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#txtRequierePoliza").click(function () {
            if ($("#txtRequierePoliza").is(':checked')) {
                $("#txtNumeroPoliza").byaSetHabilitar(true);
                $("#txtFechaInicialPoliza").byaSetHabilitar(true);
                $("#txtFechaFinalPoliza").byaSetHabilitar(true);
                $("#cboAseguradoras").byaSetHabilitar(true);
                $("#cboNombrePoliza").byaSetHabilitar(true);
                $("#txtValorPoliza").byaSetHabilitar(true);
            } else {
                $("#txtNumeroPoliza").byaSetHabilitar(false);
                $("#txtFechaInicialPoliza").byaSetHabilitar(false);
                $("#txtFechaFinalPoliza").byaSetHabilitar(false);
                $("#cboAseguradoras").byaSetHabilitar(false);
                $("#cboNombrePoliza").byaSetHabilitar(false);
                $("#txtValorPoliza").byaSetHabilitar(false);
            }
        });
        $("#btnVolverAtras").click(function () {
            history.back();
        });
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
    var _crearElements = function () {
        var tipoPersona = $("#cboTipoProponente").val();
        if (tipoPersona == "PU") {
            admProponentes.dHabilitarCamposTercero(false);
            $("#btnAsignarNit").byaSetHabilitar(false);
        }
        else {
            admProponentes.dHabilitarCamposTercero(true);
            $("#btnAsignarNit").byaSetHabilitar(true);
        }        
        var sourceDep = [
        { "NOM_DOC": "NIT", "COD_DOC": "NI " },
        { "NOM_DOC": "CÉDULA DE CIUDADANÍA", "COD_DOC": "CC " },
        { "NOM_DOC": "CÉDULA DE EXTRANJERÍA", "COD_DOC": "CE " },
        { "NOM_DOC": "PASAPORTE", "COD_DOC": "PA " }
        ];
        $('#cboTipoIdentificacion').byaCombo({
            DataSource: sourceDep, placeHolder: 'Seleccione el tipo de Doc', Display: "NOM_DOC", Value: "COD_DOC"
        });

        //var sourceDep = [
        //    { "NOM_TIP": "NINGUNO", "COD_TIP": "NI" },
        //    { "NOM_TIP": "UNICA PERSONA", "COD_TIP": "PU" },
        //    { "NOM_TIP": "CONSORCIO", "COD_TIP": "CS" },
        //    { "NOM_TIP": "UNIÓN TEMPORAL", "COD_TIP": "UT" }
        //];
        //$('#cboTipoPersonaProponente').byaCombo({
        //    DataSource: sourceDep, placeHolder: 'Clase de Tercero', Display: "NOM_TIP", Value: "COD_TIP"
        //});

        objProceso = byaPage.getSource(urlToProceso, { Num_Pro: "'" + $.getUrlVar('NumProc') + "'" });


        var sourceMod = byaPage.getSource(urlSourceAsgdra);
        $("#cboAseguradoras").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo de Aseguradora', Display: "NOM_ASE", Value: "COD_ASE"
        });

        var sourceMod = byaPage.getSource(urlSourcePlz);
        $("#cboNombrePoliza").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo de Poliza ', Display: "NOM_POL", Value: "COD_POL"
        });

        if ($("#txtRequierePoliza").is(':checked')) {
            $("#txtNumeroPoliza").byaSetHabilitar(true);
            $("#txtFechaInicialPoliza").byaSetHabilitar(true);
            $("#txtFechaFinalPoliza").byaSetHabilitar(true);
            $("#cboAseguradoras").byaSetHabilitar(true);
            $("#cboNombrePoliza").byaSetHabilitar(true);
            $("#txtValorPoliza").byaSetHabilitar(true);
        } else {
            $("#txtNumeroPoliza").byaSetHabilitar(false);
            $("#txtFechaInicialPoliza").byaSetHabilitar(false);
            $("#txtFechaFinalPoliza").byaSetHabilitar(false);
            $("#cboAseguradoras").byaSetHabilitar(false);
            $("#cboNombrePoliza").byaSetHabilitar(false);
            $("#txtValorPoliza").byaSetHabilitar(false);
        }
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
                if (validarDatosTercero(ter)) {
                    $("#txtIdProponente").val(ter.IDE_TER);
                    $('#cboTipoIdentificacion').val(ter.TIP_IDE);
                    $('#txtExpedicionIdProponente').val(ter.EXP_IDE);
                    $('#txtPrimerApellidoProponente').val(ter.APE1_TER);
                    $('#txtSegundoApellidoProponente').val(ter.APE2_TER);
                    $('#txtPrimerNombreProponente').val(ter.NOM1_TER);
                    $('#txtSegundoNombreProponente').val(ter.NOM2_TER);
                    $('#txtRazonSocialProponente').val(ter.RAZ_SOC);
                    $('#txtFechaNacimiento').val(byaPage.converJSONDate(ter.FEC_NAC));
                    $('#txtDireccionProponente').val(ter.DIR_TER);
                    $('#txtTelefonoProponente').val(ter.TEL_TER);
                    $('#txtEmailProponente').val(ter.EMA_TER);
                    //$('#cboTipoPersonaProponente').val(ter.TIPO);
                    mTerceros.HideModal();
                }
            },
            error: function (jqXHR, status, error) {
                alert("Debe Seleccionar un Tercero de la tabla para editar...");
            }
        });
    };
    var validarDatosTercero = function (ter) {
        var Mensaje = "";
        var Permiso = true;
        if ((ter.TIP_IDE == "") ||(ter.TIP_IDE == null)){            
            Permiso = false;
            Mensaje = Mensaje + "\n  - Tipo de identificacion";
        } else {
            if (ter.TIP_IDE == "NI ") {
                if ((ter.RAZ_SOC == "")||(ter.RAZ_SOC == null)) {
                    Permiso = false;
                    Mensaje = Mensaje + "\n  - Razón social";
                }
            } else {
                if ((ter.APE1_TER == "") || (ter.APE1_TER == null)) {
                    Permiso = false;
                    Mensaje = Mensaje + "\n  - Primer Apellido";
                }
                if ((ter.NOM1_TER == "")||(ter.NOM1_TER == null)) {
                    Permiso = false;
                    Mensaje = Mensaje + "\n  - Primer Nombre";
                }
            }
        }
        if ((ter.EXP_IDE == "")||(ter.EXP_IDE == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Expedicion";
        }
        if ((ter.TIPO == "")||(ter.TIPO == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Tipo de persona";
        }
        if ((ter.APE1_TER == "")||(ter.APE1_TER == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Primer Apellido";
        }
        if ((ter.DIR_TER == "") || (ter.DIR_TER == null)){
            Permiso = false;
            Mensaje = Mensaje + "\n  - Dirección";
        }
        if ((ter.TEL_TER == "") || (ter.TEL_TER == null)){
            Permiso = false;
            Mensaje = Mensaje + "\n  - Télefono";
        }
        if ((ter.EMA_TER == "") || (ter.EMA_TER == null)) {
            Permiso = false;
            Mensaje = Mensaje + "\n  - Email";
        } else {
            expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
    var Nuevo = function () {
        operacionEjecutar = "N";
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);

        if ($("#txtRequierePoliza").is(':checked')) {
            $("#txtNumeroPoliza").byaSetHabilitar(true);
            $("#txtFechaInicialPoliza").byaSetHabilitar(true);
            $("#txtFechaFinalPoliza").byaSetHabilitar(true);
            $("#cboAseguradoras").byaSetHabilitar(true);
            $("#cboNombrePoliza").byaSetHabilitar(true);
            $("#txtValorPoliza").byaSetHabilitar(true);
        } else {
            $("#txtNumeroPoliza").byaSetHabilitar(false);
            $("#txtFechaInicialPoliza").byaSetHabilitar(false);
            $("#txtFechaFinalPoliza").byaSetHabilitar(false);
            $("#cboAseguradoras").byaSetHabilitar(false);
            $("#cboNombrePoliza").byaSetHabilitar(false);
            $("#txtValorPoliza").byaSetHabilitar(false);
        }

        admProponentes.Limpiar();
        admProponentes.DesOrhabilitar(true);
        $("#btnAsignarNit").byaSetHabilitar(false);
        verificarsiAdjudicado();
    };
    var Editar = function () {
        operacionEjecutar = "E";

        $("#cboTipoProponente").byaSetHabilitar(false);
        $("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        admProponentes.DesOrhabilitar(true);
        _AbrirProponente(idProponente);
        $("#btnBuscarIdProponente").byaSetHabilitar(false);
    };
    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                admProponentes.config.oper = 'cancelar';
                _reset();
            }
        });
    };
    var _reset = function () {
        $("#nuevoButton").byaSetHabilitar(true);
        $("#guardarButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#cancelarButton").byaSetHabilitar(false);
        $("#btnAdjudicar").byaSetHabilitar(false);
        admProponentes.DesOrhabilitar(false);
        admProponentes.Limpiar();
        $(msgPpal).html("");
    };
    var _getDatos = function () {
        var e = {}
        e.TIPO_PROP = $("#cboTipoProponente").val();
        e.NUM_PROC = $("#txtNumeroProceso").val();
        e.FEC_PROP = $("#txtFechaEntraga").val();
        e.VAL_PROP = $("#txtValorPropuesta").byaGetDecimal();
        e.NUM_FOLIO = $("#txtNumeroFolios").val();
        e.IDE_PROP = $("#txtIdProponente").val();
        e.TIP_IDE_PROP = $("#cboTipoIdentificacion").val();
        e.EXP_IDE_PROP = $("#txtExpedicionIdProponente").val();
        e.TIP_PER_PROP = e.TIPO_PROP;
        e.APE1_PROP = $("#txtPrimerApellidoProponente").val();
        e.APE2_PROP = $("#txtSegundoApellidoProponente").val();
        e.NOM1_PROP = $("#txtPrimerNombreProponente").val();
        e.NOM2_PROP = $("#txtSegundoNombreProponente").val();
        e.RAZ_SOC = $("#txtRazonSocialProponente").val();
        e.DIR_PROP = $("#txtDireccionProponente").val();
        e.TEL_PROP = $("#txtTelefonoProponente").val();
        e.EMA_PROP = $("#txtEmailProponente").val();
        e.FEC_NAC = $("#txtFechaNacimiento").val();
        e.ADJUDICADO = $("#cboAdjudicado").val();
        e.ID_REP_LEGAL = $("#txtIdRepresentanteLegal").val();
        e.MUNICIPIO = $("#txtMunicipio").val();
        e.FEC_ADJUDICACION = $("#txtFechaAdjudicado").val();
        e.OBS_ADJUDICACION = $("#txtObservacionAdjudicacion").val();
        e.APORTES = $("#txtAportes").html();
        e.VAL_SIN_IVA = $("#txtValorPropuestaSinIVA").byaGetDecimal();

        e.NUMPOLIZA = $("#txtNumeroPoliza").val();
        e.FECHA_INICIAL = $("#txtFechaInicialPoliza").val();
        e.FECHA_FINAL = $("#txtFechaFinalPoliza").val();
        e.ASEGURADORA = $("#cboAseguradoras").val();
        e.NOM_POLIZA = $("#cboNombrePoliza").val();
        e.VALOR_POLIZA = $("#txtValorPoliza").byaGetDecimal();
        e.DENOMINACION = $("#txtDenominacion").val();
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
                $(msgPpal).msgBox({ titulo: "Registro Proponentes: ", mensaje: "Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ", tipo: false });
            } else {
                $("#LbMsg").html("");
            }
        };
        if (activarValidar) {
            _ValidarEmpty("cbo", "TipoProponente");
            if ($("#cboTipoProponente").val() == "PU") _ValidarEmpty("txt", "IdProponente");
            else _ValidarEmpty("txt", "RazonSocialProponente");
            _ValidarEmpty("txt", "IdRepresentanteLegal");
            _ValidarEmpty("txt", "NumeroProceso");
            _ValidarEmpty("txt", "FechaEntraga");
            _ValidarEmpty("txt", "ValorPropuesta");
            _ValidarEmpty("txt", "ValorPropuestaSinIVA");
            _ValidarEmpty("txt", "Municipio");
            _ValidarEmpty("txt", "Denominacion");
            _ValidarEmpty("txt", "NumeroFolios");
            _ValidarEmpty("txt", "ExpedicionIdProponente");
            _ValidarEmpty("txt", "PrimerApellidoProponente");
            _ValidarEmpty("txt", "DireccionProponente");
            _ValidarEmpty("txt", "EmailProponente");
            _ValidarEmpty("txt", "TelefonoProponente");
            _ValidarEmpty("txt", "FechaNacimiento");
            _MensajeFinalValidacion();
        }
        return !error;
    };
    var _guardarNuevo = function () {
        if (_esValido()) {
            var byaRpta = {};
            var jsonData = "{'Reg':" + JSON.stringify(_getDatos()) + "}";
            byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Registro de Proponentes: ", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    admProponentes.DesOrhabilitar(false);
                }
            });
        }
    };
    var _guardarMod = function () {
        if (_esValido()) {
            var byaRpta = {};
            var datos = _getDatos();
            datos.ID = idProponente;
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Registro Proponentes: ", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    $("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    $("#btnAdjudicar").byaSetHabilitar(false);
                    admProponentes.DesOrhabilitar(false);
                }

            });
            $("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(true);
            $("#guardarButton").byaSetHabilitar(false);
            $("#cancelarButton").byaSetHabilitar(false);
            $("#btnAdjudicar").byaSetHabilitar(false);
        }
    };
    var _AbrirProponente = function (ideProp) {
        var parametrosJSON = { "id": ideProp };
        $.ajax({
            type: "GET",
            url: urlToProponente,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var e = byaPage.retObj(result.d);
                $("#cboTipoProponente").val(e.TIPO_PROP);
                $("#txtNumeroProceso").val(e.NUM_PROC);
                $("#txtFechaEntraga").val(byaPage.converJSONDate(e.FEC_PROP));
                $("#txtValorPropuesta").val(e.VAL_PROP);
                $("#txtNumeroFolios").val(e.NUM_FOLIO);
                $("#txtIdProponente").val(e.IDE_PROP);
                $("#cboTipoIdentificacion").val(e.TIP_IDE_PROP);
                $("#txtExpedicionIdProponente").val(e.EXP_IDE_PROP);
                //$("#cboTipoPersonaProponente").val(e.TIP_PER_PROP);
                $("#txtPrimerApellidoProponente").val(e.APE1_PROP);
                $("#txtSegundoApellidoProponente").val(e.APE2_PROP);
                $("#txtPrimerNombreProponente").val(e.NOM1_PROP);
                $("#txtSegundoNombreProponente").val(e.NOM2_PROP);
                $("#txtRazonSocialProponente").val(e.RAZ_SOC);
                $("#txtDireccionProponente").val(e.DIR_PROP);
                $("#txtTelefonoProponente").val(e.TEL_PROP);
                $("#txtEmailProponente").val(e.EMA_PROP);
                $("#txtFechaNacimiento").val(byaPage.converJSONDate(e.FEC_NAC));
                $("#cboAdjudicado").val(e.ADJUDICADO);
                $("#txtIdRepresentanteLegal").val(e.ID_REP_LEGAL);
                $("#txtMunicipio").val(e.MUNICIPIO);
                $("#txtFechaAdjudicado").val(byaPage.converJSONDate(e.FEC_ADJUDICACION));
                $("#txtObservacionAdjudicacion").val(e.OBS_ADJUDICACION);
                $("#txtAportes").html(e.APORTES);
                $("#txtValorPropuestaSinIVA").byaSetDecimal(e.VAL_SIN_IVA);

                if ((e.TIPO_PROP != "PU") && (e.IDE_PROP == null)) {
                    admProponentes.dHabilitarCamposTercero(true);
                }

                $("#txtNumeroPoliza").val(e.NUMPOLIZA);
                $("#txtFechaInicialPoliza").val(byaPage.converJSONDate(e.FECHA_INICIAL));
                $("#txtFechaFinalPoliza").val(byaPage.converJSONDate(e.FECHA_FINAL));
                $("#cboAseguradoras").val(e.ASEGURADORA);
                $("#cboNombrePoliza").val(e.NOM_POLIZA);
                $("#txtValorPoliza").byaSetDecimal(e.VALOR_POLIZA);
                $("#txtDenominacion").val(e.DENOMINACION);

                if ($("#txtRequierePoliza").is(':checked')) {
                    $("#txtNumeroPoliza").byaSetHabilitar(true);
                    $("#txtFechaInicialPoliza").byaSetHabilitar(true);
                    $("#txtFechaFinalPoliza").byaSetHabilitar(true);
                    $("#cboAseguradoras").byaSetHabilitar(true);
                    $("#cboNombrePoliza").byaSetHabilitar(true);
                    $("#txtValorPoliza").byaSetHabilitar(true);
                } else {
                    $("#txtNumeroPoliza").byaSetHabilitar(false);
                    $("#txtFechaInicialPoliza").byaSetHabilitar(false);
                    $("#txtFechaFinalPoliza").byaSetHabilitar(false);
                    $("#cboAseguradoras").byaSetHabilitar(false);
                    $("#cboNombrePoliza").byaSetHabilitar(false);
                    $("#txtValorPoliza").byaSetHabilitar(false);
                }

                $('.currency').formatCurrency();
                if (e.ADJUDICADO == "S") $("#btnAdjudicar").byaSetHabilitar(true);
                else verificarsiAdjudicado();                
            },
            error: function (jqXHR, status, error) {
                alert("Debe Seleccionar un Tercero de la tabla para editar...");
            }
        });
    };
    var verificarsiAdjudicado = function () {
        var parametrosJSON = { "numProc": "'" + oNumProc + "'" };
        $.ajax({
            type: "GET",
            url: urlToSiAdjudicado,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e) $("#btnAdjudicar").byaSetHabilitar(false);
                else $("#btnAdjudicar").byaSetHabilitar(true);
            },
            error: function (jqXHR, status, error) {
                alert("Error...");
            }
        });
    };
    var _getDatosAsignarNit = function () {
        var e = {}
        e.ID = idProponente;
        e.IDE_PROP = $("#txtNitEmpresa").val();
        e.DV_PROP = $("#txtCodigoVerificacion").val();
        e.EXP_IDE_PROP = $("#txtLugarExpedicion").val();
        return e;
    };
    var AsignarNit = function () {
        var confirmacion = confirm("Esta seguro que desea asignar el NIT " + _getDatosAsignarNit().IDE_PROP + "-" + _getDatosAsignarNit().DV_PROP + "?");
        if (confirmacion) {
            var byaRpta = {};
            var jsonData = "{'Proponente':" + JSON.stringify(_getDatosAsignarNit()) + "}";
            byaPage.POST_Sync(urlToAsignarNit, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                alert(byaRpta.Mensaje);
                $("#modalAsignarNit").modal("hide");
                $("#btnAsignarNit").byaSetHabilitar(false);
                admProponentes.config.oper = 'cancelar';
                _reset();
                history.back();
            });
        }
    };
    var VerificarSiNitAsignado = function () {
        var parametrosJSON = { "ID": idProponente };
        $.ajax({
            type: "GET",
            url: urlToVerificarSiNitAsignado,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var ter = byaPage.retObj(result.d);
                if (ter) $("#btnAsignarNit").byaSetHabilitar(false);
                else $("#btnAsignarNit").byaSetHabilitar(true);
                asignadoNit = ter;
            },
            error: function (jqXHR, status, error) {
                alert("Error...");
            }
        });
    };
    
    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        init: function () {
            _addHandlers();
            _crearElements();
            oNumProc = $.getUrlVar('NumProc');
            if (oNumProc != null) oNumProc = byaPage.quitarNumeral(oNumProc);

            idProponente = $.getUrlVar('IdProponente');
            if (idProponente != null) idProponente = byaPage.quitarNumeral(idProponente);
            $("#txtNumeroProceso").val(oNumProc);
            if (idProponente != null) Editar();
            else Nuevo();
            if (operacionEjecutar != "N") VerificarSiNitAsignado();
        }, 
        dHabilitarCamposTercero: function (value) {
            $("#cboTipoIdentificacion").byaSetHabilitar(value);
            $("#txtExpedicionIdProponente").byaSetHabilitar(value);
            //$("#cboTipoPersonaProponente").byaSetHabilitar(value);
            $("#txtPrimerApellidoProponente").byaSetHabilitar(value);
            $("#txtSegundoApellidoProponente").byaSetHabilitar(value);
            $("#txtPrimerNombreProponente").byaSetHabilitar(value);
            $("#txtSegundoNombreProponente").byaSetHabilitar(value);
            $("#txtRazonSocialProponente").byaSetHabilitar(value);
            $("#txtDireccionProponente").byaSetHabilitar(value);
            $("#txtTelefonoProponente").byaSetHabilitar(value);
            $("#txtEmailProponente").byaSetHabilitar(value);
            $("#txtFechaNacimiento").byaSetHabilitar(value);
            $("#btnBuscarIdProponente").byaSetHabilitar(!value);
        },
        LimpiarCamposTecero: function () {
            $("#txtIdProponente").val("");
            $("#cboTipoIdentificacion").val("");
            $("#txtExpedicionIdProponente").val("");
            //$("#cboTipoPersonaProponente").val("");
            $("#txtPrimerApellidoProponente").val("");
            $("#txtSegundoApellidoProponente").val("");
            $("#txtPrimerNombreProponente").val("");
            $("#txtSegundoNombreProponente").val("");
            $("#txtRazonSocialProponente").val("");
            $("#txtDireccionProponente").val("");
            $("#txtTelefonoProponente").val("");
            $("#txtEmailProponente").val("");
            $("#txtFechaNacimiento").val("");
        },
        DesOrhabilitar: function (value) {
            $("#txtFechaEntraga").byaSetHabilitar(value);
            $("#txtValorPropuesta").byaSetHabilitar(value);
            $("#txtMunicipio").byaSetHabilitar(value);
            $("#txtNumeroFolios").byaSetHabilitar(value);
            $("#btnBuscarIdRepresentanteLegal").byaSetHabilitar(value);
            $("#txtAportes").byaSetHabilitar(value);
            $("#txtDenominacion").byaSetHabilitar(value);
        },
        Limpiar: function () {
            $("#txtFechaEntraga").val("");
            $("#txtValorPropuesta").val("");
            $("#txtMunicipio").val("");
            $("#txtNumeroFolios").val("");
            $("#txtIdRepresentanteLegal").val("");
            $("#txtAportes").html("");
            $("#txtNumeroPoliza").val("");
            $("#txtFechaInicialPoliza").val("");
            $("#txtFechaFinalPoliza").val("");
            $("#cboAseguradoras").val("");
            $("#cboNombrePoliza").val("");
            $("#txtValorPoliza").byaSetDecimal(0);
            $("#txtDenominacion").val("Contratista");

            $("#txtIdProponente").val("");
            $("#cboTipoIdentificacion").val("");
            $("#txtExpedicionIdProponente").val("");
            //$("#cboTipoPersonaProponente").val("");
            $("#txtPrimerApellidoProponente").val("");
            $("#txtSegundoApellidoProponente").val("");
            $("#txtPrimerNombreProponente").val("");
            $("#txtSegundoNombreProponente").val("");
            $("#txtRazonSocialProponente").val("");
            $("#txtDireccionProponente").val("");
            $("#txtTelefonoProponente").val("");
            $("#txtEmailProponente").val("");
            $("#txtFechaNacimiento").val("");
            $("#btnBuscarIdProponente").val("");
        }
    }
}());

$(document).ready(function () {
    byaSite.SetModuloP({ TituloForm: "Proponentes", Modulo: "Gestión", urlToPanelModulo: "gPproponentes.aspx?NumProc=" + $.getUrlVar('NumProc'), Cod_Mod: "SOLI4", Rol: "PR_RECEP" });
    admProponentes.config.theme = theme;
    admProponentes.init();
});