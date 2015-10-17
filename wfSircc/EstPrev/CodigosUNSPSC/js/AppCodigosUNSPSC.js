//http://yoavniran.wordpress.com/2009/08/02/creating-a-webservice-proxy-with-jquery/
var MIAPLICACION = MIAPLICACION || {};

//Capa Infraestructura de Acceso a Servicios Externos
//Definicio de Propiedades
ServiceProxy = function (baseUrl) //constructor for the proxy
{
    this._baseURL = baseUrl;
};
//Definicio de Metodos
ServiceProxy.prototype =
{
    _defaultErrorHandler: function (xhr, status, error) {
        alert("Error:" + JSON.stringify(xhr));
    },
    //POST, PUT
    _doAjax: function (sType, uri, data, fnSuccess, fnError, _async) {
        if (!data) data = {};
        if (!fnError) fnError = this._defaultErrorHandler;
        if (!_async) _async = true;
        $.ajax({
            type: sType,
            url: this._baseURL + uri,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: _async,
            success: fnSuccess,
            error: fnError
        });
    },
    //GET
    _getAjax: function (uri, data) {
        var source = {};
        if (!data) data = {};
        var fnError = this._defaultErrorHandler;
        $.ajax({
            type: "GET",
            url: this._baseURL + uri,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                source = result;
            },
            error: fnError
        });
        return source;
    },
    _Ejecutar: function (Url, parametro, fnExito) {

        if (!fnExito) {
            var result = this._getAjax(Url, parametro);
            return byaPage.retObj(result.d);
        }
        else {
            var result = this._doAjax("GET", Url, parametro, fnExito);
        }
    }
};

//Capa de Acceso a Datos . DAO, 


var CodigosUNSPSCDAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsUNSPSC.asmx/");
    return {
        GetsGrupos: function (fnExito) {
            var Url = "GetGrupos";
            proxy._doAjax("GET", Url, null, fnExito,null,true);
        },
        GetsSegmentos: function (CodigoGrupo,fnExito) {
            var Url = "GetSegmentos";
            var parametro = {
                codigoGrupo : "'" + CodigoGrupo + "'"
            }
            proxy._doAjax("GET", Url, parametro, fnExito, null, true);
        },
        GetsFamilias: function (CodigoSegmento, fnExito) {
            var Url = "GetFamilias";
            var parametro = {
                codigoSegmento: "'" + CodigoSegmento + "'"
            }
            proxy._doAjax("GET", Url, parametro, fnExito, null, true);
        },
        GetsClases: function (CodigoFamilia, fnExito) {
            var Url = "GetClases";
            var parametro = {
                codigoFamilia: "'" + CodigoFamilia + "'"
            }
            proxy._doAjax("GET", Url, parametro, fnExito, null, true);
        },
        GetsProductos: function (CodigoClase, fnExito) {
            var Url = "GetProductos";
            var parametro = {
                codigoClase: "'" + CodigoClase + "'"
            }
            proxy._doAjax("GET", Url, parametro, fnExito, null, true);
        },
    };
}());
