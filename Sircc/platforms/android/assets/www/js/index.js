var Elecc = (function () {

    var lEmpresas

    var _addHandlers = function () {
    };

    var _createElements = function () {

    };

    var EventoAtras = function () {
    }

    var TraerDirEmpresas = function () {
        
        var a = navigator.onLine;
        if (a) {       
            byaPage.showLoading("b", "", false, false);
            ProyectosDAO.Get(function (_d) {
                byaPage.hideLoading();
                lEmpresas = byaPage.retObj(_d);
                $("#lstEmpresasPrograma").html("");
                $.each(lEmpresas, function (index, item) {
                    $("#lstEmpresasPrograma").append("<li><a id='" + index + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='Elecc.SeleccionarDireccionEmpresa(id)'><h2>" + item.Empresa + "</h2></a></li>");
                })
                $("#lstEmpresasPrograma").trigger("create");
            }, function () {
                byaPage.hideLoading();
                $("#msg").html("Error: No se pudo hacer su peticion...");
            });
        } else {
            alert('Error: Verifique su conexion a internet!!');
        }
    }
    
    var VerificarSiDir = function () {
        var dir = localStorage.getItem("DirSerSircc");
        var usu = localStorage.getItem("UsuarioGcmProyecto");
        var idp = localStorage.getItem("IDPROYECTO");
        if ((dir == null) || (usu == null) || (idp == null)) {
            TraerDirEmpresas();
        } else {
            window.location.href = "home.html";
        }
    }

    var SeleccionarDireccionEmpresa = function (id) {
        localStorage.setItem("DirSerSircc", lEmpresas[id].Ip);
        localStorage.setItem("UsuarioGcmProyecto", lEmpresas[id].IdProyectoGCM);
        localStorage.setItem("IDPROYECTO", lEmpresas[id].id);
        window.location.href = "home.html";
    }

    return {
        init: function () {            
            _createElements();
            _addHandlers();
            document.addEventListener("backbutton", EventoAtras, true);
            VerificarSiDir();
        },
        SeleccionarDireccionEmpresa: function (id) {
            SeleccionarDireccionEmpresa(id);
        }
    };
}());

$(document).ready(function () {
    Elecc.init();
});