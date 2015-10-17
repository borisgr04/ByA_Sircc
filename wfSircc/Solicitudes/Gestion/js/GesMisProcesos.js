var GesMisProcesos = (function () {
    var urlToModalidades = "/Servicios/wsProcesos.asmx/GetCantidadProcesosPorModalidad";
    var urlToProcesos = "/Servicios/wsProcesos.asmx/GetProcesosUsuario";
    var urlToCronogramaProceso = "/Servicios/wsProcesos.asmx/GetCronogramaProceso";
    var urlToUpdateCronograma = "/Servicios/wsProcesos.asmx/UpdCronograma";
    var urlToCambiarEstadoCronograma = "/Servicios/wsProcesos.asmx/CambiarEstadoCronograma";

    var msgPpal = "#LbMsg";
    var lModalidades = [];
    var lProcesos = [];
    var vModalidades = {};
    var lCronogramas = [];
    var lSeguimiento = [];
    var procesoCronograma = "";
    var procesoSeguimiento = "";
    var codActDesartar = "";

    var _addHandlers = function () {
        $("#txtNombreModalidad").keyup(function () {
            _filtrarModalidades($(this).val());
        });
        $("#txtFiltrarModalidades").click(function () {
            _filtrarModalidades($("#txtNombreModalidad").val());
        });
        $("#btnVerProcesosHoy").click(function () {
            _verProcesosHoy();
        });
        $("#txtFiltro").keyup(function () {
            _filtrarProcesos($("#txtFiltro").val());
        });
        $("#btnGuardarCronograma").click(function () {
            _guardarCronograma();
        });
        $("#btnDescartar").click(function () {
            _descartarProceso();
        });
        $("#btnDescartar2").click(function () {
            _descartarProceso();
        });
        $(".tip").tooltip({
            'trigger': 'hover'
        });
    };
    var _createElements = function () {
        _traerModalidades();
        _traerProcesos();
    };
    var _traerModalidades = function () {
        var jsonParam = { Vigencia: byaSite.getVigencia() };
        var source = byaPage.getSource(urlToModalidades, jsonParam);
        lModalidades = source;
        _crearListaModalidades(lModalidades);
    };
    var _verProcesosHoy = function(){
        _crearListaModalidades(lModalidades);
        _traerProcesos();
    };
    var _crearListaModalidades = function (objlModalidades) {    
        var config = {
            Id: '#dvdlModalidades',
            ClassItem: 'lModalidades',
            Source: objlModalidades,
            fn_callback: _traerProcesos,
            Display: 'NombreModalidad',
            Value: 'CodigoModalidad',
            Count: 'Cantidad'
        };
        vModalidades = new byaLista();
        vModalidades.init(config);
    };
    var _filtrarModalidades = function (value) {
        if (value == "") {
            _traerModalidades();
        }
        else {
            var lModalidadesAux = [];
            $.each(lModalidades, function (index, item) {
                var Nombre = "" + item.NombreModalidad + "";
                value = "" + value + "";
                if (Nombre.toUpperCase().indexOf(value.toUpperCase()) >= 0) {                    
                    lModalidadesAux.push(item);
                    byaPage.console(JSON.stringify(item));
                }
            });
            _crearListaModalidades(lModalidadesAux);
        }
    };
    var _traerProcesos = function () {
        $("#txtFiltro").val("");
        var Moda = vModalidades.getSeleccionado() != null ? vModalidades.getSeleccionado() : "";
        var jsonParam = { Vigencia: byaSite.getVigencia(), Modalidad: "'" + Moda + "'", Filtro: $("#txtFiltro").val() };
        //var source = byaPage.getSource(urlToProcesos, jsonParam);
        $.ajax({
            type: "GET",
            url: urlToProcesos,
            data: jsonParam,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $("#dvdLoader").fadeIn();
            },
            success: function (result) {
                $("#dvdLoader").fadeOut();
                lProcesos = byaPage.retObj(result.d);                 
                _visualizarProcesos(lProcesos);
                _siMostrarProcesosHoy();
            },
            error: function (jqXHR, status, error) {
                $("#dvdLoader").fadeOut();
                alert(error + "-" + jqXHR.responseText);
            }
        });        
    };
    var _visualizarProcesos = function (lstProcesos) {
        $("#dvdPanelProcesos").html("");
        if (lstProcesos.length > 0) {
            $.each(lstProcesos, function (index, item) {
                $("#dvdPanelProcesos").append('' +
                            '   <div class="alert" style="background-color:#eee;" role="alert">' +
                            '        <div class="row">' +
                            '            <div class="col-xs-4">' +
                            '                <strong>Proceso:</strong> ' + item.PRO_SEL_NRO + '                                        ' +
                            '            </div>' +
                            '            <div class="col-xs-3">' +
                            '                <strong>Solicitud:</strong> ' + item.NUM_SOL + '                                        ' +
                            '            </div>' +
                            '            <div class="col-xs-3">' +
                            '                <strong>Estado:</strong>  ' + item.NOM_EST_PROC + '                                   ' +
                            '            </div>' +
                            '            <div class="col-xs-2">' +
                            '                <span class="badge badge-danger tip" style="margin:3px;" data-toggle="tooltip" data-placement="top" title="Vencidas">' + item.ACT_VENCIDAS + '</span>' +
                            '                <span class="badge badge-success tip" style="margin:3px;" data-toggle="tooltip" data-placement="top" title="Hoy">' + item.ACT_HOY + '</span>' +
                            '                <span class="badge badge-info tip" style="margin:3px;" data-toggle="tooltip" data-placement="top" title="Proximas">' + item.ACT_POR_VENCER + '</span>      ' +
                            '            </div>          ' +
                            '        </div>' +
                            '        <div class="row">' +
                            '            <div class="col-xs-11">' +
                            '               <div class="row">' +
                            '                   <div class="col-xs-12">' +
                            '                       <p style="text-align:justify;"><strong>Objeto: </strong> ' + item.OBJ_CON + ' </p>' +
                            '                   </div>' +
                            '               </div>' +
                            '               <div class="row">' +
                            '                   <div class="col-xs-6">' +
                            '                       <strong>Delegada:</strong>  ' + item.DEP_PCON_NOM + '     ' +
                            '                   </div>' +
                            '                   <div class="col-xs-6">' +
                            '                       <strong>Solicitante:</strong> ' + item.DEP_CON_NOM + '    ' +
                            '                   </div>' +
                            '               </div>' +
                            '            </div>' +
                            '            <div class="col-xs-1">' +
                            '                <div class="row text-center" style="margin:5px;">' +
                            '                    <a href="javascript:;" data-toggle="modal" data-target="#modalCronograma" id="cron' + item.PRO_SEL_NRO + '" onclick="GesMisProcesos.IrCronograma(id)" class="tip" data-toggle="tooltip" data-placement="top" title="Realizar Cronograma"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></a>      ' +
                            '                </div>' +
                            '                <div class="row text-center" style="margin:5px;">' +
                            '                    <a href="javascript:;" id="segu' + item.PRO_SEL_NRO + '" onclick="GesMisProcesos.IrSeguimiento(id)" data-toggle="modal" data-target="#modalDetallesProceso" class="tip" data-toggle="tooltip" data-placement="top" title="Seguimiento"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></a>' +
                            '                </div>' +
                            '                <div class="row text-center" style="margin:5px;">' +
                            '                    <a href="javascript:;" class="tip" data-toggle="tooltip" data-placement="top" title="Ir a Proponentes" id="prop' + item.PRO_SEL_NRO + '" onclick="GesMisProcesos.IrProponentes(id)"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a>' +
                            '                </div> ' +
                            '                <div class="row text-center" style="margin:5px;">' +
                            '                    <a href="javascript:;" class="tip" data-toggle="tooltip" data-placement="top" title="Ver todos los documentos" id="docu' + item.PRO_SEL_NRO + '" onclick="GesMisProcesos.IrDocumentos(id)"><span class="glyphicon glyphicon-file" aria-hidden="true"></span></a>' +
                            '                </div> ' +
                            '            </div>' +
                            '        </div>' +
                            '    </div>' +
                    '');
            });
        } else {
            $("#dvdPanelProcesos").append('' +
                            '   <div class="alert" style="background-color:#eee;" role="alert">' +
                            '        <div class="row" style="margin:5px;">' +
                            '           <strong> No se han encontrado procesos</strong>' +
                            '        </div>' +
                            '   </div>');

        }
        $(".tip").tooltip({
            'trigger': 'hover'
        });
    };
    var _siMostrarProcesosHoy = function () {
        var value = vModalidades.getSeleccionado() == null ? true : false;
        switch (value) {
            case true:
                $("#siProcesosHoy").fadeIn();
                $("#noProcesosHoy").fadeOut();
                break;
            case false:
                $("#siProcesosHoy").fadeOut();
                $("#noProcesosHoy").fadeIn();
                break;
            default:
                $("#siProcesosHoy").fadeOut();
                $("#noProcesosHoy").fadeOut();
                break;
        }
    };
    var _filtrarProcesos = function (value) {   
        if ((value == "") || (value == null)) {
            _visualizarProcesos(lProcesos);
        } else {
            var lProcesosAux = [];
            $.each(lProcesos, function (index, item) {
                if ((byaPage.Like(item.PRO_SEL_NRO, value)) ||
                    (byaPage.Like(item.OBJ_CON, value)) ||
                    (byaPage.Like(item.VIG_CON, value)) ||
                    (byaPage.Like(item.NUM_SOL, value)) ||
                    (byaPage.Like(item.DEP_CON_NOM, value)) ||
                    (byaPage.Like(item.DEP_PCON_NOM, value)) ||
                    (byaPage.Like(item.TIP_CON_NOM, value)) ||
                    (byaPage.Like(item.STIP_CON_NOM, value)) ||
                    (byaPage.Like(item.NOM_ABOG_ENC, value)) ||
                    (byaPage.Like(item.NOM_EST_PROC, value)) ||
                    (byaPage.Like(item.VAL_CON, value))) {
                    lProcesosAux.push(item);
                }
            });
            _visualizarProcesos(lProcesosAux);
        }
    };
    var _traerCronogramaProceso = function (ValueNumProceso) {
        procesoCronograma = ValueNumProceso;
        var jsonParam = { Num_Pro : "'" + ValueNumProceso + "'" };
        $.ajax({
            type: "GET",
            url: urlToCronogramaProceso,
            data: jsonParam,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $("#dvdLoader").fadeIn();
            },
            success: function (result) {
                $("#dvdLoader").fadeOut();
                lCronogramas = byaPage.retObj(result.d);
                byaPage.console(JSON.stringify(result));
                if (lCronogramas.length == 0) {
                    $("#dvdCronograma").html('' +
                            '   <div class="alert" style="background-color:#eee;" role="alert">' +
                            '        <div class="row" style="margin:5px;">' +
                            '           <strong> No se han encontrado cronogramas</strong>' +
                            '        </div>' +
                            '   </div>');
                } else {
                    $("#dvdCronograma").html('');
                    var banDesc = false;
                    $.each(lCronogramas, function (index, item) {
                        item.FEC_REG = byaPage.converJSONDate(item.FEC_REG);
                        item.FEC_MOD = byaPage.converJSONDate(item.FEC_MOD);
                        item.FEC_AVISO = byaPage.converJSONDate(item.FEC_AVISO);
                        item.FECHAF = byaPage.converJSONDate(item.FECHAF);
                        item.FECHAI = byaPage.converJSONDate(item.FECHAI);
                        if (item.TIPO != "DE") {
                            var MFF = item.MFECFIN == "SI" ? "normal" : "none";
                            var MHI = item.MHORINI == "SI" ? "normal" : "none";
                            var MHF = item.MHORFIN == "SI" ? "normal" : "none";
                            $("#dvdCronograma").append('' +
                                '<div class="alert" style="background-color:#eee; font-size:small" role="alert">' +
                                '    <div class="container">' +
                                '        <div class="row" style="margin-bottom:4px;">' +
                                '            <strong>' + item.NOM_ACT + '</strong>' +
                                '        </div>' +
                                '        <div class="row">' +
                                '            <div class="col-xs-6">' +
                                '                <label>Fecha Inicial: </label> ' +
                                '                <input type="date" class="form-control input-sm" id="act-fi-' + item.ID + '" value="' + item.FECHAI + '"/>' +
                                '            </div>' +
                                '            <div class="col-xs-6" style="display:' + MFF + '">' +
                                '                <label>Fecha Final: </label>' +
                                '                <input type="date" class="form-control input-sm" id="act-ff-' + item.ID + '" value="' + item.FECHAF + '"/>' +
                                '            </div>' +
                                '            <div class="col-xs-6" style="display:' + MHI + '">' +
                                '                <label>Hora Inicial: </label> ' +
                                '                <input type="time" class="form-control input-sm" id="act-hi-' + item.ID + '" value="' + _armarHoraIActividad(item) + '"/>' +
                                '            </div>' +
                                '            <div class="col-xs-6" style="display:' + MHF + '">' +
                                '                <label>Hora Final: </label> ' +
                                '                <input type="time" class="form-control input-sm" id="act-hf-' + item.ID + '" value="' + _armarHoraFActividad(item) + '"/>' +
                                '            </div>' +
                                '        </div>' +
                                '    </div>' +
                                '</div>' +
                                '');
                        } else {
                            codActDesartar = item.ID;
                            banDesc = true;
                        }
                    });
                    if (banDesc) { $("#btnDescartar").fadeIn(); $("#btnDescartar2").fadeIn(); }
                    else { $("#btnDescartar").fadeOut(); $("#btnDescartar2").fadeOut(); }
                }  
            },
            error: function (jqXHR, status, error) {
                $("#dvdLoader").fadeOut();
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var _armarHoraIActividad = function (obj) {
        var hora = "";
        if (obj.HORAI == null) return "";
        else {
            obj.HORAI = "" + obj.HORAI + "";
            if (obj.MIN_I == null) obj.MIN_I = "00";
            obj.MIN_I = "" + obj.MIN_I + "";
            hora = (obj.HORAI.length == 1 ? "0" + obj.HORAI : obj.HORAI) + ":" + (obj.MIN_I.length == 1 ? "0" + obj.MIN_I : obj.MIN_I) + ":00";
            return hora;
        }
    };
    var _armarHoraFActividad = function (obj) {
        var hora = "";
        if (obj.HORAF == null) return "";
        else {
            obj.HORAF = "" + obj.HORAF + "";
            if (obj.MIN_F == null) obj.MIN_F = "00";
            obj.MIN_F = "" + obj.MIN_F + "";
            hora = (obj.HORAF.length == 1 ? "0" + obj.HORAF : obj.HORAF) + ":" + (obj.MIN_F.length == 1 ? "0" + obj.MIN_F : obj.MIN_F) + ":00";
            return hora;
        }
    };
    var _asignarCambiosCronogramas = function () {
        $.each(lCronogramas, function (index, item) {
            item.FECHAI = $("#act-fi-" + item.ID).val();
            item.FECHAF = $("#act-ff-" + item.ID).val();
            item.HORAI = (("" + $("#act-hi-" + item.ID).val() + "").split(":"))[0] == "undefined" ? "06" : (("" + $("#act-hi-" + item.ID).val() + "").split(":"))[0];
            item.MIN_I = (("" + $("#act-hi-" + item.ID).val() + "").split(":"))[1] == "undefined" ? "00" : (("" + $("#act-hi-" + item.ID).val() + "").split(":"))[1];
            item.HORAF = (("" + $("#act-hf-" + item.ID).val() + "").split(":"))[0] == "undefined" ? "18" : (("" + $("#act-hf-" + item.ID).val() + "").split(":"))[0];
            item.MIN_F = (("" + $("#act-hf-" + item.ID).val() + "").split(":"))[1] == "undefined" ? "00" : (("" + $("#act-hf-" + item.ID).val() + "").split(":"))[1];
        });
    };
    var _guardarCronograma = function () {
        _asignarCambiosCronogramas();
        byaPage.console(JSON.stringify(lCronogramas));
        jsonData = "{'lst':" + JSON.stringify(lCronogramas) + ",'Num_Pro':'" + procesoCronograma + "'}";
        byaPage.POST_Sync(urlToUpdateCronograma, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            $("#dvdMesCro,dvdMesSeg").msgBox({ titulo: "", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
        });
    };
    var _descartarProceso = function () {
        var e = {};
        e.EST_ACT = "0003";
        e.ID = codActDesartar;
        e.OBS_SEG = "";
        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToCambiarEstadoCronograma, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            $("#dvdMesCro,dvdMesSeg").msgBox({ titulo: "", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            _traerProcesos();
        });
    };
    var _traerSeguimientoProceso = function (ValueNumProceso) {
        procesoSeguimiento = ValueNumProceso;
        var jsonParam = { Num_Pro: "'" + ValueNumProceso + "'" };
        $.ajax({
            type: "GET",
            url: urlToCronogramaProceso,
            data: jsonParam,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $("#dvdLoader").fadeIn();
            },
            success: function (result) {
                $("#dvdLoader").fadeOut();
                lSeguimiento = byaPage.retObj(result.d);
                //byaPage.console(JSON.stringify(result));
                if (lSeguimiento.length == 0) {
                    $("#dvdSeguimientoProceso").html('' +
                            '   <div class="alert" style="background-color:#eee;" role="alert">' +
                            '        <div class="row" style="margin:5px;">' +
                            '           <strong> No se han encontrado cronogramas para realizar seguimiento del proceso</strong>' +
                            '        </div>' +
                            '   </div>');
                } else {
                    $("#dvdSeguimientoProceso").html('');
                    var banDesc = false;
                    $.each(lSeguimiento, function (index, item) {
                        item.FEC_REG = byaPage.converJSONDate(item.FEC_REG);
                        item.FEC_MOD = byaPage.converJSONDate(item.FEC_MOD);
                        item.FEC_AVISO = byaPage.converJSONDate(item.FEC_AVISO);
                        item.FECHAF = byaPage.converJSONDate(item.FECHAF);
                        item.FECHAI = byaPage.converJSONDate(item.FECHAI);

                        //byaPage.console(JSON.stringify(item));

                        if (item.TIPO != "DE") {

                            var operacionRealizar;
                            byaPage.console(item.TIPO);
                            if (item.EST_ACT != "0003") {
                                if (item.TIPO == "SC") operacionRealizar = '<a href="javascript:;" id="comp' + item.ID + '" onclick="GesMisProcesos.CompletarActividad(id)">Completar</a>';
                                else operacionRealizar = '<a href="javascript:;" id="' + item.NUM_PROC + '&' + item.TIP_PLA + '" onclick="GesMisProcesos.IrDocumentosTipo(id)">Ir a crear documento</a>';
                            } else operacionRealizar = '';

                            var TipoAlert;
                            if (item.EST_ACT == "0003") TipoAlert = '<div class="alert alert-info" style="font-size:small;" role="alert">';
                            else TipoAlert = '<div class="alert" style="background-color:#eee; font-size:small" role="alert">';
                            
                            $("#dvdSeguimientoProceso").append('' +
                                TipoAlert +
                                '    <div class="container">' +
                                '        <div class="row" style="margin-bottom:4px;">' +
                                '            <strong>' + item.NOM_ACT + '</strong>' +
                                '        </div>' +
                                '        <div class="row">' +
                                '            <div class="col-xs-4">' +
                                '                <strong>Fecha: </strong> ' + item.FECHAC + '' +
                                '            </div>' +
                                '            <div class="col-xs-4">' +
                                '                <strong>Estado: </strong> ' + item.NOM_EST + '' +
                                '            </div>' +
                                '            <div class="col-xs-4 text-right">' +
                                                operacionRealizar +
                                '            </div>' +
                                '        </div>' +
                                '    </div>' +
                                '</div>' +
                                '');
                        } else {
                            codActDesartar = item.ID;
                            banDesc = true;
                        }
                    });
                    if (banDesc) { $("#btnDescartar").fadeIn(); $("#btnDescartar2").fadeIn(); }
                    else { $("#btnDescartar").fadeOut(); $("#btnDescartar2").fadeOut(); }
                }
            },
            error: function (jqXHR, status, error) {
                $("#dvdLoader").fadeOut();
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var _completarActividad = function(cod_act){
        var e = {};
        e.EST_ACT = "0003";
        e.ID = cod_act;
        e.OBS_SEG = "";
        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToCambiarEstadoCronograma, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            $("#dvdMesCro,dvdMesSeg").msgBox({ titulo: "", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error)  {
                _traerSeguimientoProceso(procesoSeguimiento);
                _traerProcesos();
            }
        });
    };
    
    return {
        config: {
            theme: null
        },
        init: function () {
            _createElements();
            _addHandlers();
        },
        IrProponentes: function (value) {
            value = (("" + value + "").split("prop"))[1];
            window.location.href = "/Solicitudes/Gestion/gPproponentes.aspx?NumProc=" + value;
        },
        IrDocumentos: function (value) {
            value = (("" + value + "").split("docu"))[1];
            window.location.href = "/Documentos/Documentos.aspx?NUM_PROC=" + value;
        },
        IrCronograma: function (value) {
            $("#dvdMesSeg #dvdMesCro").html("");
            value = (("" + value + "").split("cron"))[1];
            _traerCronogramaProceso(value);
        },
        IrSeguimiento: function (value) {
            $("#dvdMesSeg #dvdMesCro").html("");
            value = (("" + value + "").split("segu"))[1];
            _traerSeguimientoProceso(value);
        },
        CompletarActividad: function (value) {
            value = (("" + value + "").split("comp"))[1];
            _completarActividad(value);
        },
        IrDocumentosTipo: function (value) {
            var value1 = (("" + value + "").split("&"))[0];
            var value2 = (("" + value + "").split("&"))[1];
            window.location.href = "/Documentos/Documentos.aspx?NUM_PROC=" + value1 + "&TIP_PLA=" + value2;
        }
    };
} ());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Mi Gestión - Procesos", Modulo: "Procesos Precontractuales", urlToPanelModulo: "PanelMiGestion.aspx", Cod_Mod: "SOLI4", Rol: "PR_GEST" });
    GesMisProcesos.config.theme = byaSite.tema;
    GesMisProcesos.init();
});
