var Elecc = (function () {

    var listaActividadesVen;
    var listaActividadesHoy;
    var listaActividadesPro;
    var listaSolicitudesPorRecibir;
    var listaSolicitudesPorRevisar;
    var tipoActividadActual;
    var idActividadActual;
    var estadoDetalleProceso = false;
    var estadoObservacionPosponer = false;
    var actividadPosponer;
    var idSolicitudPorRecibirActual;
    var idSolicitudPorRevisarActual;
    var lConsolidado;
    var chart;
    var chart2;
    var estadoRevisar;
    var stylesOn = {
        "-webkit-box-shadow": "0 10px 6px -6px #777",
        "-moz-box-shadow": "0 10px 6px -6px #777",
        "box-shadow": "0 10px 6px -6px #777"
    }
    var styleOff = {
        "-webkit-box-shadow": "",
        "-moz-box-shadow": "",
        "box-shadow": ""
    }
    

    var _addHandlers = function () {
        $("#btnCambiarDirSer").click(function () {
            CambiarServidor();
        });

        $("#btnIrPrincipal").click(function () {
            $("#secSolicitudes").fadeOut();
            $("#secActividades").fadeOut();
            $("#secPrincipal").fadeIn();
        });

        $("#btnIrVencidas").click(function () {
            Elecc.irActVencidas();
        });

        $("#btnIrHoy").click(function () {
            Elecc.irActHoy();
        });

        $("#btnIrProximas").click(function () {
            Elecc.irActProximas();
        });

        $("#btnCerrarSesion").click(function () {
            CerrarSesion();
        });

        $("#btnActividadCompletada").click(function () {
            CompletarActividad();
        });

        $("#cboVigencias").change(function () {
            var itemSelect = $("#cboVigencias").val();
            localStorage.setItem("Vigencia", itemSelect);
            $("#pVigencias").panel("close");
            Elecc.init();
        });

        $("#btnVerDetallesProceso").click(function () {
            switch (estadoDetalleProceso) {
                case false:
                    $("#secObjetoProceso").fadeIn();
                    estadoDetalleProceso = true;
                    break;
                case true:
                    $("#secObjetoProceso").fadeOut();
                    estadoDetalleProceso = false;
                    break;
            }
        });

        $("#btnVerObservacion").click(function () {
            switch (estadoObservacionPosponer) {
                case false:
                    $("#secObservacionPosponer").fadeIn();
                    estadoObservacionPosponer = true;
                    break;
                case true:
                    $("#secObservacionPosponer").fadeOut();
                    estadoObservacionPosponer = false;
                    break;
            }
        });

        $("#cerraPopDetalleProceso").click(function () {
            $("#popDetalleActividad").popup("close");
        });

        $("#btnCerrarPopFecha").click(function () {
            $("#popFechaActividad").popup("close");
        });

        $("#btnPosActividad").click(function () {
            enviarPosponerActividad();
        });

        $("#btnSolicitudesPorRecibir").click(function () {
            Elecc.irSolPorRecibir();
        });

        $("#btnSolicitudesPorRevisar").click(function () {
            Elecc.irSolPorRevisar();
        });

        $("#btnCerrarDetalleSolicitudPorRecibir").click(function () {
            $("#popDetalleSolicitudPorRecibir").popup("close");
        });

        $("#btnCerrarDetalleSolicitudPorRevisar").click(function () {
            $("#popDetalleSolicitudPorRevisar").popup("close");
        });

        $("#btnRecibirSolicitud").click(function () {
            RecibirSolicitud();
        });

        $("#btnListoRevisarSolicitud").click(function () {
            RevisarSolicitud(estadoRevisar);
        });
    };
    var _createElements = function () {
        var now = new Date();
        now.setDate(now.getDate() + 1);

        $("#txtFechaInicial").val(byaPage.FechaShortX(now));
        $("#txtFechaFinal").val(byaPage.FechaShortX(now));
    };
    var GetVigencias = function () {
        byaPage.showLoading("b", "", false, false);
        EncargadosDAO.GetVigencias(function (_d) {
            var listaVigencias = byaPage.retObj(_d);
            $("#cboVigencias").html("");
            var primerVig = listaVigencias[listaVigencias.length - 1].YEAR_VIG;
            $.each(listaVigencias, function (index, item) {
                $("#cboVigencias").append("<option data-rel='close' value='" + item.YEAR_VIG + "'>" + item.YEAR_VIG + "</option>");
            })
            var VigAct = localStorage.getItem("Vigencia");
            if (VigAct == null) {
                localStorage.setItem("Vigencia", primerVig);
                $('#cboVigencias > option[value="' + primerVig + '"]').attr('selected', 'selected');
            } else {
                $('#cboVigencias > option[value="' + VigAct + '"]').attr('selected', 'selected');
            }
            $("#cboVigencias").selectmenu("refresh", true);
            VerActividadesVen();
        }, function () {
            confirRestablecerDir();
        });
    };
    var EnviarRegIdServidor = function () {
        byaPage.showLoading("b", "", false, false);
        UsuariosGcmDAO.EnviarRegGcm(_getDatosRegistroGcm(), function (_d) {
            byaPage.hideLoading();
        });
    }
    var _getDatosRegistroGcm = function () {
        var e = {}
        e.IdProyect = localStorage.getItem("IDPROYECTO");
        e.Usuario = localStorage.getItem("UsuarioSircc");
        e.IdGCM = localStorage.getItem("RegIdSircc");
        return e;
    }
    var confirRestablecerDir = function () {
        var con = confirm("No se pudieron cargar los datos, ¿Desea restablecer la direccion del servidor?");
        if (con) {
            localStorage.removeItem("DirSerSircc");
            localStorage.removeItem("UsuarioGcmProyecto");
            window.location.href = "index.html";
        } else {
            location.reload();
        }
    }
    var EventoAtras = function () {
        $("#secSolicitudes").fadeOut();
        $("#secActividades").fadeOut();
        $("#secPrincipal").fadeIn();

        $("#btnIrSolicitudes").css(styleOff);
        $("#btnIrActividades").css(styleOff);
    }
    var CambiarServidor = function () {
        var NewDir = prompt("Por favor digite la nueva direcion:", "http://");
        localStorage.setItem("DirSerSircc", NewDir + "/api/v1/");
        alert("La direccion ha sido cambiada...");
    }
    var CerrarSesion = function () {
        localStorage.removeItem("UsuarioSircc");
        window.location.href = "login.html";
    }
    var VerificarSesion = function () {
        var midir = localStorage.getItem("DirSerSircc");
        if (midir == null) {
            window.location.href = "index.html";
        } else {
            var ses = localStorage.getItem("UsuarioSircc");
            if (ses == null) {
                window.location.href = "login.html";
            } else {
                $("#txtUsuario").html("Usuario: " + ses);
                GetVigencias();
                traerConsolidados();
            }
        }
    }

    var traerConsolidados = function () {
        byaPage.showLoading("b", "", false, false);
        EncargadosDAO.GetConsolidado(localStorage.getItem("UsuarioSircc"), localStorage.getItem("Vigencia"), function (_d) {
            byaPage.hideLoading();
            lConsolidado = _d;
            verConsolidadosActividades();
            verConsolidadoSolicitudes();            
        });
    }
    var verConsolidadosActividades = function () {
        $("#secConsolidadoActividades").html("<h3 align='center'>Avance de actividades de los procesos</h3>");
        $.each(lConsolidado.lActividades, function (index, item) {
            var numeroCant = item.Cantidad * 2;
            var strFunctionIr;
            if (index == 0) { strFunctionIr = "Elecc.irActVencidas()"; $("#countVencidas").html(item.Cantidad); }
            if (index == 1) { strFunctionIr = "Elecc.irActHoy()"; $("#countHoy").html(item.Cantidad);}
            if (index == 2) { strFunctionIr = "Elecc.irActProximas()"; $("#countProximas").html(item.Cantidad); }
            $("#secConsolidadoActividades").append("<div onclick='" + strFunctionIr + "'><p align='left'>" + item.Nombre + " [" + item.Cantidad + "]</p><div class='uk-progress uk-progress-" + item.Color + " uk-progress-mini' ><div class='uk-progress-bar' style='width: " + numeroCant + "%'></div></div></div>");
        })
    }
    var verConsolidadoSolicitudes = function () {
        $("#secConsolidadoSolicitudes").html("<h3 align='center'>Gestion de Solicitudes</h3>");
        $.each(lConsolidado.lSolicitudes, function (index, item) {
            var numero = item.Cantidad * 2;
            var strFunctionIr;
            if (index == 0) { strFunctionIr = "Elecc.irSolPorRecibir()"; $("#countPorRecibir").html(item.Cantidad);}
            if (index == 1) { strFunctionIr = "Elecc.irSolPorRevisar()"; $("#countPorRevisar").html(item.Cantidad); }
            $("#secConsolidadoSolicitudes").append("<div onclick='" + strFunctionIr + "'><p align='left'>" + item.Nombre + " [" + item.Cantidad + "]</p><div class='uk-progress uk-progress-" + item.Color + " uk-progress-mini' ><div class='uk-progress-bar' style='width: " + numero + "%'></div></div></div>");
        })
    }
    
    var VerActividadesVen = function () {
            byaPage.showLoading("b", "", false, false);
            EncargadosDAO.GetActividadesFiltro2(localStorage.getItem("UsuarioSircc"), "ACVEN", localStorage.getItem("Vigencia")
            , function (_d) {
                byaPage.hideLoading();
                listaActividadesVen = byaPage.retObj(_d);
                $("#lstActVen").html("");
                if (listaActividadesVen.length > 0) {
                    $.each(listaActividadesVen, function (index, item) {
                        $("#lstActVen").append("<div style='background-color:#f3f3f3; font-size: 0.7rem;'><div style='padding:8px 8px 8px 8px'><p><strong>Proceso: </strong>" + item.NUM_PROC + "</p><p align='justify'><strong>Objeto: </strong>" + item.OBJ_CON + "</p><p><strong>Actividad: </strong>" + item.NOM_ACT + "</p><p><strong>Fecha: </strong>" + item.FECHAC + "</p></div><div data-role='navbar'><ul><li><a data-theme='e' id='" + index + "' onclick='Elecc.VerDetallesActividadVen(id)' class='ui-btn ui-btn-icon-left ui-icon-check'>Completar</a></li><li><a data-theme='e' id=" + index + " onclick='Elecc.PosponerActividadVen(id)' class='ui-btn ui-btn-icon-right ui-icon-calendar'>Posponer</a></li></ul></div></div><br/>");
                    })
                } else {
                    $("#lstActVen").append("<div style='background-color:#f3f3f3;'><div style='padding:8px 8px 8px 8px'><p><strong>No hay actividades...</strong></p></div></div><br/>");
                }
                $("#lstActVen").trigger("create");
                VerActividadesHoy();
            }
            , function () {
                confirRestablecerDir();
            });
    }
    var VerActividadesHoy = function () {
        byaPage.showLoading("b", "", false, false);
        EncargadosDAO.GetActividadesFiltro2(localStorage.getItem("UsuarioSircc"), "ACHOY", localStorage.getItem("Vigencia"), function (_d) {
            byaPage.hideLoading();
            listaActividadesHoy = byaPage.retObj(_d);
            $("#lstActHoy").html("");
            if (listaActividadesHoy.length > 0) {
                $.each(listaActividadesHoy, function (index, item) {
                    $("#lstActHoy").append("<div style='background-color:#f3f3f3; font-size: 0.7rem;'><div style='padding:8px 8px 8px 8px'><p><strong>Proceso: </strong>" + item.NUM_PROC + "</p><p align='justify'><strong>Objeto: </strong>" + item.OBJ_CON + "</p><p><strong>Actividad: </strong>" + item.NOM_ACT + "</p><p><strong>Fecha: </strong>" + item.FECHAC + "</p></div><div data-role='navbar'><ul><li><a data-theme='e' id='" + index + "' onclick='Elecc.VerDetallesActividadHoy(id)' class='ui-btn ui-btn-icon-left ui-icon-check'>Completar</a></li><li><a data-theme='e' id=" + index + " onclick='Elecc.PosponerActividadHoy(id)' class='ui-btn ui-btn-icon-right ui-icon-calendar'>Posponer</a></li></ul></div></div><br/>");
                })
            } else {
                $("#lstActHoy").append("<div style='background-color:#f3f3f3;'><div style='padding:8px 8px 8px 8px'><p><strong>No hay actividades...</strong></p></div></div><br/>");
            }
            $("#lstActHoy").trigger("create");
            VerActividadesPro();
        }, function () {
            confirRestablecerDir();
        });
    }
    var VerActividadesPro = function () {
        byaPage.showLoading("b", "", false, false);
        EncargadosDAO.GetActividadesFiltro2(localStorage.getItem("UsuarioSircc"), "ACPVEN", localStorage.getItem("Vigencia"), function (_d) {
            byaPage.hideLoading();
            listaActividadesPro = byaPage.retObj(_d);
            $("#lstActPro").html("");
            if (listaActividadesPro.length > 0) {
                $.each(listaActividadesPro, function (index, item) {
                    $("#lstActPro").append("<div style='background-color:#f3f3f3; font-size: 0.7rem;'><div style='padding:8px 8px 8px 8px'><p><strong>Proceso: </strong>" + item.NUM_PROC + "</p><p align='justify'><strong>Objeto: </strong>" + item.OBJ_CON + "</p><p><strong>Actividad: </strong>" + item.NOM_ACT + "</p><p><strong>Fecha: </strong>" + item.FECHAC + "</p></div><div data-role='navbar'><ul><li><a data-theme='e' id='" + index + "' onclick='Elecc.VerDetallesActividadPro(id)' class='ui-btn ui-btn-icon-left ui-icon-check'>Completar</a></li><li><a data-theme='e' id=" + index + " onclick='Elecc.PosponerActividadPro(id)' class='ui-btn ui-btn-icon-right ui-icon-calendar'>Posponer</a></li></ul></div></div><br/>");
                })
            } else {
                $("#lstActPro").append("<div style='background-color:#f3f3f3;'><div style='padding:8px 8px 8px 8px'><p><strong>No hay actividades...</strong></p></div></div><br/>");
            }
            $("#lstActPro").trigger("create");
            VerSolicitudesPorRecibir();
        }, function () {
            confirRestablecerDir();
        });
    }
    var VerDetallesActividadVen = function (id) {
        var act = listaActividadesVen[id];

        $("#txtProceso").html("<strong>" + act.NUM_PROC + "</strong>");

        $("#popDetalleActividad").popup({ transition: "slide" });
        $("#popDetalleActividad").popup({ positionTo: "window" });
        var option = $("#popDetalleActividad").popup("option");
        $("#popDetalleActividad").popup("open", option);
    }
    var VerDetallesActividadHoy = function (id) {
        var act = listaActividadesHoy[id];

        $("#txtProceso").html("<strong>" + act.NUM_PROC + "</strong>");

        $("#popDetalleActividad").popup({ transition: "slide" });
        $("#popDetalleActividad").popup({ positionTo: "window" });
        var option = $("#popDetalleActividad").popup("option");
        $("#popDetalleActividad").popup("open", option);
    }
    var VerDetallesActividadPro = function (id) {
        var act = listaActividadesPro[id];

        $("#txtProceso").html("<strong>" + act.NUM_PROC + "</strong>");

        $("#popDetalleActividad").popup({ transition: "slide" });
        $("#popDetalleActividad").popup({ positionTo: "window" });
        var option = $("#popDetalleActividad").popup("option");
        $("#popDetalleActividad").popup("open", option);
    }
    var _getDatosPosponerActividad = function () {
        var e = {}
        e.USUARIO = localStorage.getItem("UsuarioSircc");
        e.NUM_PROC = actividadPosponer.NUM_PROC;
        e.ID = actividadPosponer.ID;
        e.OBS_SEG = $("#txtObservacionPosponer").val();
        e.HORAI = $("#txtHoraInicial").val();
        e.HORAF = $("#txtHoraFinal").val();

        var FechaInicialStr = $("#txtFechaInicial").val();
        var FechaFinalStr = $("#txtFechaFinal").val();

        var fechaI = "" + FechaInicialStr + "";
        fechaI = fechaI.split("-");
        var fi = {};
        fi.Year = fechaI[0];
        fi.Month = fechaI[1];
        fi.Day = fechaI[2];

        var fechaF = "" + FechaFinalStr + "";
        fechaF = fechaF.split("-");
        var ff = {};
        ff.Year = fechaF[0];
        ff.Month = fechaF[1];
        ff.Day = fechaF[2];

        e.mFEFHAI = fi;
        e.mFEFHAF = ff;
        return e;
    }
    var PosponerActividadVen = function (id, tipoActividadPosponer) {
        var listaACT;
        switch (tipoActividadPosponer) {
            case "ACVEN":
                listaACT = listaActividadesVen;
                break;
            case "ACHOY":
                listaACT = listaActividadesHoy;
                break;
            case "ACPVEN":
                listaACT = listaActividadesPro;
                break;
        }
        var ActX = listaACT[id];
        actividadPosponer = ActX;
        switch (ActX.MFECINI) {
            case "SI":
                $("#secFechaInicial").fadeIn();
                break;
            case "NO":
                $("#secFechaInicial").fadeOut();
                break;
        }
        switch (ActX.MHORINI) {
            case "SI":
                $("#secHoraInicial").fadeIn();
                break;
            case "NO":
                $("#secHoraInicial").fadeOut();
                break;
        }
        switch (ActX.MFECFIN) {
            case "SI":
                $("#secFechaFinal").fadeIn();
                break;
            case "NO":
                $("#secFechaFinal").fadeOut();
                break;
        }
        switch (ActX.MHORFIN) {
            case "SI":
                $("#secHoraFinal").fadeIn();
                break;
            case "NO":
                $("#secHoraFinal").fadeOut();
                break;
        }

        $("#popFechaActividad").popup({ transition: "slide" });
        $("#popFechaActividad").popup({ positionTo: "window" });
        var option = $("#popFechaActividad").popup("option");
        $("#popFechaActividad").popup("open", option);

    }    
    var enviarPosponerActividad = function () {
        byaPage.showLoading("b", "", false, false);
        EncargadosDAO.AplazarActividad(_getDatosPosponerActividad(), function (_d) {
            byaPage.hideLoading();
            var resp = (typeof _d) == 'string' ? eval('(' + _d + ')') : _d;
            if (resp.Error == false) {
                $("#txtObservacionPosponer").val("");
                Elecc.init();
            } else {
                alert("Error: " + resp.Mensaje);
            }
            $("#popFechaActividad").popup("close");
        });
    }
    var GetDatosActComplt = function () {
        var listaACT;
        switch (tipoActividadActual) {
            case "ACVEN":
                listaACT = listaActividadesVen;
                break;
            case "ACHOY":
                listaACT = listaActividadesHoy;
                break;
            case "ACPRO":
                listaACT = listaActividadesPro;
                break;
        }
        var ActX = listaACT[idActividadActual];

        var ObjAct = {};
        ObjAct.USUARIO = localStorage.getItem("UsuarioSircc");
        ObjAct.NUM_PROC = ActX.NUM_PROC;
        ObjAct.ID = ActX.ID;
        ObjAct.OBS_SEG = $("#txtObsSeg").val();
        return ObjAct;
    }
    var CompletarActividad = function () {
        byaPage.showLoading("b", "", false, false);
        EncargadosDAO.CompletarActividad(GetDatosActComplt(), function (_d) {
            byaPage.hideLoading();
            var resp = (typeof _d) == 'string' ? eval('(' + _d + ')') : _d;
            if (resp.Error == false) {
                $("#txtObsSeg").val("");
                $("#popDetalleActividad").popup("close");
                Elecc.init();
            }
        }, function (er) {
            alert(JSON.stringify(er));
        });
    }
     
    var VerSolicitudesPorRecibir = function () {
        byaPage.showLoading("b", "", false, false);
        SolicitudesDAO.GetSolicitudes(localStorage.getItem("UsuarioSircc"), localStorage.getItem("Vigencia"), "SREC", function (_d) {
            byaPage.hideLoading();
            listaSolicitudesPorRecibir = byaPage.retObj(_d);
            $("#lstSolicitudesPorRecebir").html("");
            if (listaSolicitudesPorRecibir.length > 0) {
                $.each(listaSolicitudesPorRecibir, function (index, item) {
                    $("#lstSolicitudesPorRecebir").append("<div style='background-color:#f3f3f3; font-size: 0.7rem;'><div style='padding:8px 8px 8px 8px'><p><strong>Cod. Solicitud: </strong>" + item.COD_SOL + "</p><p align='justify'><strong>Objeto: </strong>" + item.OBJ_SOL + "</p><p align='justify'><strong>Dep. Necesidad: </strong>" + item.DEP_SOL_NOM + "</p><p align='justify'><strong>Dep. Delegada: </strong>" + item.DEP_PSOL_NOM + "</p><p align='justify'><strong>Modalidad: </strong>" + item.COD_TPRO_NOM + "</p><p align='justify'><strong>Clase: </strong>" + item.CLASE + "</p><p align='justify'><strong>Valor: </strong>" + item.VAL_CON + "</p><p align='justify'><strong>Fecha Recibido: </strong>" + item.FEC_RECIBIDO + "</p><p align='justify'><strong>Fecha Encargado: </strong>" + item.NOM_ABOG_ENC + "</p></div><div data-role='navbar'><ul><li><a data-theme='e' id='" + index + "' onclick='Elecc.VerDetallesSolicitudPorRecibir(id)' class='ui-btn ui-btn-icon-right ui-icon-check'>Recibir</a></li></ul></div></div><br/>");
                })
            } else {
                $("#lstSolicitudesPorRecebir").append("<div style='background-color:#f3f3f3;'><div style='padding:8px 8px 8px 8px'><p><strong>No hay actividades...</strong></p></div></div><br/>");
            }
            $("#lstSolicitudesPorRecebir").trigger("create");
            VerSolicitudesPorRevisar();
        });
    }
    var VerSolicitudesPorRevisar = function () {
        byaPage.showLoading("b", "", false, false);
        SolicitudesDAO.GetSolicitudes(localStorage.getItem("UsuarioSircc"), localStorage.getItem("Vigencia"), "SREV", function (_d) {
            byaPage.hideLoading();
            listaSolicitudesPorRevisar = byaPage.retObj(_d);
            $("#lstSolicitudesPorRevisar").html("");
            if (listaSolicitudesPorRevisar.length > 0) {
                $.each(listaSolicitudesPorRevisar, function (index, item) {
                    $("#lstSolicitudesPorRevisar").append("<div style='background-color:#f3f3f3; font-size: 0.7rem;'><div style='padding:8px 8px 8px 8px'><p><strong>Cod. Solicitud: </strong>" + item.COD_SOL + "</p><p align='justify'><strong>Objeto: </strong>" + item.OBJ_SOL + "</p><p align='justify'><strong>Dep. Necesidad: </strong>" + item.DEP_SOL_NOM + "</p><p align='justify'><strong>Dep. Delegada: </strong>" + item.DEP_PSOL_NOM + "</p><p align='justify'><strong>Modalidad: </strong>" + item.COD_TPRO_NOM + "</p><p align='justify'><strong>Clase: </strong>" + item.CLASE + "</p><p align='justify'><strong>Valor: </strong>" + item.VAL_CON + "</p><p align='justify'><strong>Fecha Recibido: </strong>" + item.FEC_RECIBIDO + "</p><p align='justify'><strong>Fecha Encargado: </strong>" + item.NOM_ABOG_ENC + "</p></div><div data-role='navbar'><ul><li><a data-theme='e' id='" + index + "' onclick='Elecc.VerDetallesSolicitudPorRevisarAceptar(id)' class='ui-btn ui-btn-icon-left ui-icon-check'>Aceptar</a></li><li><a data-theme='e' id='" + index + "' onclick='Elecc.VerDetallesSolicitudPorRevisarRechazar(id)' class='ui-btn ui-btn-icon-right ui-icon-delete'>Rechazar</a></li></ul></div></div><br/>");
                })
            } else {
                $("#lstSolicitudesPorRevisar").append("<div style='background-color:#f3f3f3;'><div style='padding:8px 8px 8px 8px'><p><strong>No hay actividades...</strong></p></div></div><br/>");
            }
            $("#lstSolicitudesPorRevisar").trigger("create");
            Elecc.SolicitudRegistroGCM();
        });
    }
    var VerDetallesSolicitudPorRecibir = function (id) {
        $("#txtNumero").html(listaSolicitudesPorRecibir[id].COD_SOL);
        $("#popDetalleSolicitudPorRecibir").popup({ transition: "slide" });
        $("#popDetalleSolicitudPorRecibir").popup({ positionTo: "window" });
        var option = $("#popDetalleSolicitudPorRecibir").popup("option");
        $("#popDetalleSolicitudPorRecibir").popup("open", option);
    }
    var VerDetallesSolicitudPorRevisar = function (id) {
        $("#txtNumeroSolicitudPorRevisar").html(listaSolicitudesPorRevisar[id].COD_SOL);

        $("#popDetalleSolicitudPorRevisar").popup({ transition: "slide" });
        $("#popDetalleSolicitudPorRevisar").popup({ positionTo: "window" });
        var option = $("#popDetalleSolicitudPorRevisar").popup("option");
        $("#popDetalleSolicitudPorRevisar").popup("open", option);
    }
    var _getDatosRecibirSolicitud = function () {
        var e = {}
        e.IDE = listaSolicitudesPorRecibir[idSolicitudPorRecibirActual].ID_HREV;
        e.OBS_RECIBIDO_ABOG = $("#txtObservacionSolicitudPorRecibir").val();
        return e;
    }
    var RecibirSolicitud = function () {
        byaPage.showLoading("b", "", false, false);
        SolicitudesDAO.PostRecibirsSolicitud(_getDatosRecibirSolicitud(), function (_d) {
            byaPage.hideLoading();
            var resp = (typeof _d) == 'string' ? eval('(' + _d + ')') : _d;
            if (resp.Error == false) {
                $("#txtObservacionSolicitudPorRecibir").val("");
                $("#popDetalleSolicitudPorRecibir").popup("close");
                Elecc.init();
            } else {
                alert(resp.Mensaje);
            }
        });
    }
    var ProximoNumero = function () {
        SolicitudesDAO.GetProximoNumero(listaSolicitudesPorRevisar[idSolicitudPorRevisarActual].COD_SOL, function (_d) {
            $("#txtProximoNumero").html("El numero a asignarle al proceso seria <strong>" + _d + "</strong>");
        });
    }
    var _getDatosRevisarSolicitud = function (estado) {
        var e = {}
        e.CONCEPTO_REVISADO = estado;
        e.OBS_REVISADO = $("#txtObsSolicitudPorRevisar").val();
        e.IDE = listaSolicitudesPorRevisar[idSolicitudPorRevisarActual].ID_HREV;
        return e;
    }
    var RevisarSolicitud = function (estado) {
        byaPage.showLoading("b", "", false, false);
        SolicitudesDAO.PostRevisarSolicitud(_getDatosRevisarSolicitud(estado), function (_d) {
            byaPage.hideLoading();
            var resp = (typeof _d) == 'string' ? eval('(' + _d + ')') : _d;
            if (resp.Error == false) {
                $("#txtObsSolicitudPorRevisar").val("");
                $("#popDetalleSolicitudPorRevisar").popup("close");
                Elecc.init();
            } else {
                alert(resp.Mensaje);
            }
        });
    }

    return {
        init: function () {
            VerificarSesion();
            _createElements();
            _addHandlers();            
            document.addEventListener("backbutton", EventoAtras, true);
            
        },
        SolicitudRegistroGCM: function () {
            var pushNotification = window.plugins.pushNotification;
            var gcmDirPro = localStorage.getItem("UsuarioGcmProyecto");
            pushNotification.register(Elecc.successHandler, Elecc.errorHandler, { "senderID": gcmDirPro, "ecb": "Elecc.onNotificationGCM" });
        },
        successHandler: function (result) {
        },
        errorHandler: function (error) {
            alert(error);
        },
        onNotificationGCM: function (e) {
            switch (e.event) {
                case 'registered':
                    if (e.regid.length > 0) {
                        console.log("Id registro: " + e.regid);
                        localStorage.setItem("RegIdSircc", e.regid);
                        EnviarRegIdServidor();
                    }
                    break;
                case 'message':// if this flag is set, this notification happened while we were in the foreground.
                    // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    if (e.foreground) {
                        confirm("Notificacion: \n" + e.message);
                        // if the notification contains a soundname, play it.
                        var my_media = new Media("/android_asset/www/" + e.soundname);
                        my_media.play();
                    }
                    else {  // otherwise we were launched because the user touched a notification in the notification tray.
                        if (e.coldstart) {
                            confirm("Notificacion: \n" + e.message);
                        }
                        else {
                            confirm("Notificacion: \n" + e.message);
                        }
                    }
                    break;
                case 'error':
                    alert('GCM error = ' + e.msg);
                    break;
                default:
                    alert('Ocurrió un evento desconocido de GCM');
                    break;
            }
        },
        VerDetallesActividadVen: function (id) {
            tipoActividadActual = "ACVEN";
            idActividadActual = id;
            VerDetallesActividadVen(id);
        },
        VerDetallesActividadHoy: function (id) {
            tipoActividadActual = "ACHOY";
            idActividadActual = id;
            VerDetallesActividadHoy(id);
        },
        VerDetallesActividadPro: function (id) {
            tipoActividadActual = "ACPRO";
            idActividadActual = id;
            VerDetallesActividadPro(id);
        },
        PosponerActividadVen: function (id) {
            PosponerActividadVen(id,"ACVEN");
        },
        PosponerActividadHoy: function (id) {
            PosponerActividadVen(id, "ACHOY");
        },
        PosponerActividadPro: function (id) {
            PosponerActividadVen(id, "ACPVEN");
        },
        VerDetallesSolicitudPorRecibir: function (id) {
            idSolicitudPorRecibirActual = id;
            VerDetallesSolicitudPorRecibir(id);
        },
        VerDetallesSolicitudPorRevisarAceptar: function (id) {
            estadoRevisar = "A";
            idSolicitudPorRevisarActual = id;
            ProximoNumero();
            VerDetallesSolicitudPorRevisar(id);
        },
        VerDetallesSolicitudPorRevisarRechazar: function (id) {
            estadoRevisar = "R";
            idSolicitudPorRevisarActual = id;
            ProximoNumero();
            VerDetallesSolicitudPorRevisar(id);
        },
        irActVencidas: function () {
            $("#secPrincipal").fadeOut();
            $("#secSolicitudes").fadeOut();
            $("#secActividades").fadeIn();

            $("#pageActHoy").fadeOut();
            $("#pageActProximas").fadeOut();
            $("#pageActVencidas").fadeIn();
        },
        irActHoy: function () {
            $("#secPrincipal").fadeOut();
            $("#secSolicitudes").fadeOut();
            $("#secActividades").fadeIn();

            $("#pageActProximas").fadeOut();
            $("#pageActVencidas").fadeOut();
            $("#pageActHoy").fadeIn();
        },
        irActProximas: function () {
            $("#secPrincipal").fadeOut();
            $("#secSolicitudes").fadeOut();
            $("#secActividades").fadeIn();

            $("#pageActVencidas").fadeOut();
            $("#pageActHoy").fadeOut();
            $("#pageActProximas").fadeIn();
        },
        irSolPorRecibir: function () {
            $("#secPrincipal").fadeOut();
            $("#secActividades").fadeOut();
            $("#secSolicitudes").fadeIn();

            $("#pageSolicitudesPorRevisar").fadeOut();
            $("#pageSolicitudesPorRecibir").fadeIn();
        },
        irSolPorRevisar: function () {
            $("#secPrincipal").fadeOut();
            $("#secActividades").fadeOut();
            $("#secSolicitudes").fadeIn();

            $("#pageSolicitudesPorRecibir").fadeOut();
            $("#pageSolicitudesPorRevisar").fadeIn();
        }
    };
}());

$(document).ready(function () {
    FastClick.attach(document.body);
    Elecc.init();
});