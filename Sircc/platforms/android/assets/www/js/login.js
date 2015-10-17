var Elecc = (function () {  

    var _addHandlers = function () {
        $("#btnEntrarPrueba").click(function () {
            EntrarPrueba();
        });

        $("#btnLogin").click(function () {
            VerLogin();
        });
    };

    var _createElements = function () {
        
    };

    var EventoAtras = function () {
    }

    var VerLogin = function () {
        var usuario = $("#txtUsuario").val();
        var pass = $("#txtPassword").val();
        byaPage.showLoading("b", "", false, false);
        EncargadosDAO.Login(usuario, pass, function (_d) {
            byaPage.hideLoading();
            var permiso = byaPage.retObj(_d);
            if (permiso == true) {
                localStorage.setItem("UsuarioSircc", usuario);
                window.location.href = "index.html"
            } else {
                $("#txtUsuario").val("");
                $("#txtPassword").val("");
                alert("Usuario/Contraseña, incorrectos...");
            }
        }, function () {
            byaPage.hideLoading();
            confirRestablecerDir();
        });
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

    var VerificarSesion = function () {
        var midir = localStorage.getItem("DirSerSircc");
        if (midir == null) {
            window.location.href = "index.html";
        } else {
            var ses = localStorage.getItem("UsuarioSircc");
            if (ses != null) {
                window.location.href = "index.html";
            }
        }
    }

    var EntrarPrueba = function () {
        localStorage.setItem("UsuarioSircc", "50950218");
        window.location.href = "index.html"
    }

    return {
        init: function () {
            VerificarSesion();
            _createElements();
            _addHandlers();
            document.addEventListener("backbutton", EventoAtras, true);
        }
    };
}());

$(document).ready(function () {
    Elecc.init();
});