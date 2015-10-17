//http://yoavniran.wordpress.com/2009/08/02/creating-a-webservice-proxy-with-jquery/
var MIAPLICACION = MIAPLICACION || {};

//Capa Infraestructura de Acceso a Servicios Externos
//Definicion de Propiedades
ServiceProxy = function (baseUrl) //constructor for the proxy
{
    this._baseURL = baseUrl; 
};
//Definicion de Metodos
ServiceProxy.prototype=
{
    _defaultErrorHandler: function (xhr, status, error) {
        alert(JSON.stringify(error));
        alert(JSON.stringify(xhr));
        alert(JSON.stringify(status));
    },
    _defaultBefore: function (xhr) {
    },
    //POST, PUT // GET Sincrono o Asincrono
    _doAjax: function (sType, uri, data, fnSuccess,  fnError, _async) {
        if (!data) data = {};
        if (!fnError) fnError = this._defaultErrorHandler;
        if (!_async) _async = true;
        $.ajax({
            type: sType,
            url: this._baseURL + uri,
            data: data,
            async: _async,
            success: fnSuccess,
            error: fnError
        });
    },
    //GET //Sin
    _getAjax: function (uri, data) {
        var source = {};
        if (!data) data = {};
        var fnError = this._defaultErrorHandler;
        $.ajax({
            type: "GET",
            url: this._baseURL + uri,
            data: data,
            async: false,
            beforeSend: function (xhr) {
            },
            success: function (result) {
                source = result;
            },
            error: fnError
        });
        return source;
    }
};

//Capa de Acceso a Datos . DAO
var EncargadosDAO = (function () {
    var proxy = new ServiceProxy(localStorage.getItem("DirSerSircc") + "Encargados/");
    var fnExito = function (result) {
        alert("Muestra de Articulos" + JSON.stringify(result));
    };
    return {
        GetConsolidado: function (idusuario, Vigencia, fCorrecto) {
            var cadena = "Consolidado/" + idusuario + "/" + Vigencia;
            proxy._doAjax("GET", cadena, null, fCorrecto, null, true);
        },
        GetActividadesFiltro: function (idusuario, Estado, Vigencia) {
            var cadena = "" + idusuario + "/Actividades/" + Vigencia + "/" + Estado + "";
            var listaActividades = proxy._getAjax(cadena);
            return listaActividades;
        },
        GetActividadesFiltro2: function (idusuario, Estado, Vigencia, fCorrecto,fError) {
            var cadena = "" + idusuario + "/Actividades/" + Vigencia + "/" + Estado + "";
            proxy._doAjax("GET", cadena, null, fCorrecto,fError , true);
        },
        GetVigencias: function (fCorrecto,fError) {
            var cadena = "Vigencias";
            proxy._doAjax("GET", cadena, null, fCorrecto,fError, true);
        },
        Login: function (usuario, pass, fSuc, fError) {
            var username = usuario;
            var pass = pass;
            var datos = {
                username: username,
                password: pass
            }
            var cadena = "Login";
            proxy._doAjax("GET", cadena, datos, fSuc, fError, true);
        },
        AplazarActividad: function (datos, fCorrecto) {
            var cadena = "Actividades/Aplazar";
            proxy._doAjax("POST", cadena, datos, fCorrecto, null, true);
        },
        CompletarActividad: function (datos, fCorrecto,fError) {
            var cadena = "Actividades/";
            proxy._doAjax("POST", cadena, datos, fCorrecto, fError, true);
        }
    };
}());

var ProyectosDAO = (function () {
    var proxy = new ServiceProxy("http://192.168.0.13:8197/api/Proyects/");
    return {
        Get: function (fCorrecto,fError) {
            proxy._doAjax("GET", "", null, fCorrecto, fError, true);
        }
    };
}());

var UsuariosGcmDAO = (function () {
    var proxy = new ServiceProxy("http://192.168.0.13:8197/api/Users/");
    return {
        EnviarRegGcm: function (datos, fCorrecto) {
            var cadena = "";
            proxy._doAjax("POST", cadena, datos, fCorrecto, null, true);
       }
    };
}());

var SolicitudesDAO = (function () {
    var proxy = new ServiceProxy(localStorage.getItem("DirSerSircc") + "Solicitudes/");
    return {
        GetSolicitudes: function (usuario,vigencia,estado,fCorrecto) {
            var cadena = "" + usuario + "/" + vigencia + "/" + estado;
            proxy._doAjax("GET", cadena, null, fCorrecto,null, true);
        },
        GetProximoNumero: function(NumSol,fCorrecto){
            var cadena = "ProximoNum/" + NumSol;
            proxy._doAjax("GET", cadena, null, fCorrecto,null, true);
        },
        PostRecibirsSolicitud: function (Datos, fCorrecto) {
            var cadena = "Recibido";
            proxy._doAjax("POST", cadena, Datos, fCorrecto, null, true);
        },
        PostRevisarSolicitud: function (Datos, fCorrecto) {            
            var cadena = "Revision";
            proxy._doAjax("POST", cadena, Datos, fCorrecto, null, true);
        }
    };
}());
















