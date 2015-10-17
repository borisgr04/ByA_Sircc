//http://yoavniran.wordpress.com/2009/08/02/creating-a-webservice-proxy-with-jquery/
var MIAPLICACION = MIAPLICACION || {};

//Capa Infraestructura de Acceso a Servicios Externos
//Definicio de Propiedades
ServiceProxy = function (baseUrl) //constructor for the proxy
{
    this._baseURL = baseUrl; 
};
//Definicio de Metodos
ServiceProxy.prototype=
{
    _defaultErrorHandler: function (xhr, status, error) {
        alert("Error:" + JSON.stringify(xhr));
    },
    //POST, PUT
    _doAjax: function (sType, uri, data, fnSuccess, fnError, _async) {
        if (!data) data = {};
        if (!fnError)fnError = this._defaultErrorHandler;
        if (!_async) _async = true;
        $.ajax({
            type: sType,
            url: this._baseURL + uri,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async:_async, 
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
var ContratosDAO = (function () {
    var DataFields = [
                           { Titulo: 'N&uacute;mero', Campo: 'Numero', Tipo: 'S' },
                           { Titulo: 'Contratista', Campo: 'Contratista', Tipo: 'S' },
                           { Titulo: 'Objeto', Campo: 'Objeto', Tipo: 'S' },
                           { Titulo: 'Tipo', Campo: 'Tipo', Tipo: 'S' },
                           { Titulo: 'Valor del Contrato', Campo: 'Valor_Contrato', Tipo: 'N' },
                           { Titulo: 'Fecha de Suscripci&oacute;n', Campo: 'Fecha_Suscripcion', Tipo: 'D' },
                           { Titulo: 'Dependencia Necesidad', Campo: 'DependenciaNec', Tipo: 'S' },
                           { Titulo: 'Dependencia Delegada', Campo: 'DependenciaDel', Tipo: 'S' },
                           { Titulo: 'Interventor', Campo: 'Nom_Interventor', Tipo: 'S' },
                           { Titulo: 'Identificaci&oacute;n Contratista', Campo: 'Ide_Contratista', Tipo: 'S' },
                           { Titulo: 'Nro Proceso', Campo: 'NroProceso', Tipo: 'S' }
    ];
    var proxy = new ServiceProxy("/");
    return {
        //Retornar Todos los Datos
        GetAll: function (fnExito) {
            if (!fnExito)
                return proxy._getAjax("Proyectos/");
            else 
                proxy._doAjax("GET", "Proyectos", null, fnExito);
        },
        GetPk: function (Cod_Con) {
            var UrlGetPk = "Servicios/Contratos/wsLegalizacion.asmx/GetDetContratos";
            var result = proxy._getAjax(UrlGetPk, { 'Cod_Con': Cod_Con })
            return byaPage.retObj(result.d);
        },
        GetPk: function (Cod_Con, fnExito) {
            var UrlGetPk = "Servicios/Contratos/wsLegalizacion.asmx/GetDetContratos";
            var parametro={ 'Cod_Con': Cod_Con }
            if (!fnExito) {
                var result = proxy._getAjax(UrlGetPk, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", UrlGetPk, parametro, fnExito);
                return byaPage.retObj(result.d);
            }
        },
        GetDataFields: function () {
            return DataFields;
        }
    };
}());


var ContratosGestionC = (function () {
    var DataFields = [
                           { Titulo: 'N&uacute;mero', Campo: 'Numero', Tipo: 'S' },
                           { Titulo: 'Contratista', Campo: 'Contratista', Tipo: 'S' },
                           { Titulo: 'Objeto', Campo: 'Objeto', Tipo: 'S' },
                           { Titulo: 'Tipo', Campo: 'Tipo', Tipo: 'S' },
                           { Titulo: 'Valor del Contrato', Campo: 'Valor_Contrato', Tipo: 'N' },
                           { Titulo: 'Fecha de Suscripci&oacute;n', Campo: 'Fecha_Suscripcion', Tipo: 'D' },
                           { Titulo: 'Dependencia Necesidad', Campo: 'DependenciaNec', Tipo: 'S' },
                           { Titulo: 'Dependencia Delegada', Campo: 'DependenciaDel', Tipo: 'S' },
                           { Titulo: 'Interventor', Campo: 'Nom_Interventor', Tipo: 'S' },
                           { Titulo: 'Identificaci&oacute;n Contratista', Campo: 'Ide_Contratista', Tipo: 'S' },
                           { Titulo: 'Nro Proceso', Campo: 'NroProceso', Tipo: 'S' }
    ];
    var proxy = new ServiceProxy("/");
    return {
        Gets: function (fnExito) {
            var Url = "Servicios/wsContratosGestionC.asmx/GetConsultaContratosJS";
            var parametro = {'Vig_Con': byaSite.getVigencia() };
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        GetInfoVig: function (fnExito) {
            var Url = "Servicios/wsContratosGestionC.asmx/GetInformesVigenciasJS";
            var parametro = {'Vig_Con': byaSite.getVigencia() };
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        GetActas: function (fnExito) {
            var Url = "Servicios/wsContratosGestionC.asmx/GetActasJS";
            var parametro = {'Vig_Con': byaSite.getVigencia() };
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        
        
        GetDataFields: function () {
            return DataFields;
        }
    };
}());


var ContratosGestionS = (function () {
    var DataFields = [
                           { Titulo: 'N&uacute;mero', Campo: 'Numero', Tipo: 'S' },
                           { Titulo: 'Contratista', Campo: 'Contratista', Tipo: 'S' },
                           { Titulo: 'Objeto', Campo: 'Objeto', Tipo: 'S' },
                           { Titulo: 'Tipo', Campo: 'Tipo', Tipo: 'S' },
                           { Titulo: 'Valor del Contrato', Campo: 'Valor_Contrato', Tipo: 'N' },
                           { Titulo: 'Fecha de Suscripci&oacute;n', Campo: 'Fecha_Suscripcion', Tipo: 'D' },
                           { Titulo: 'Dependencia Necesidad', Campo: 'DependenciaNec', Tipo: 'S' },
                           { Titulo: 'Dependencia Delegada', Campo: 'DependenciaDel', Tipo: 'S' },
                           { Titulo: 'Interventor', Campo: 'Nom_Interventor', Tipo: 'S' },
                           { Titulo: 'Identificaci&oacute;n Contratista', Campo: 'Ide_Contratista', Tipo: 'S' },
                           { Titulo: 'Nro Proceso', Campo: 'NroProceso', Tipo: 'S' }
    ];
    var DataFieldsInfo = [
                           { Titulo: 'N&uacute;mero', Campo: 'NUM_INF', Tipo: 'S' },
                           { Titulo: 'Fecha del Informe', Campo: 'FEC_INF', Tipo: 'D' },
                           { Titulo: 'Tipo de Informe', Campo: 'NOM_TIP_INF', Tipo: 'S' },
                           { Titulo: 'Periodo', Campo: 'PERIODO', Tipo: 'S' },
                           { Titulo: 'Descripci&oacute;n', Campo: 'DES_INF', Tipo: 'S' },
                           { Titulo: 'Notas 1', Campo: 'NOT_INF', Tipo: 'S' },
                           { Titulo: 'Notas 2', Campo: 'NOT2_INF', Tipo: 'S' },
                           { Titulo: 'Valor a Pagar', Campo: 'VAL_PAG', Tipo: 'N' },
                           { Titulo: 'Acta Nro', Campo: 'ID_ACTA', Tipo: 'S' },
                           { Titulo: 'Obligaci&oacuten Factura', Campo: 'OBL_FAC', Tipo: 'S' },
                           { Titulo: 'Estado', Campo: 'EST_INF', Tipo: 'S' }

    ];
    var proxy = new ServiceProxy("/");
    return {
        Gets: function (fnExito) {
            var Url = "Servicios/wsContratosGestionS.asmx/GetConsultaContratosJS";
            
            var parametro = { 'Vig_Con': byaSite.getVigencia() };
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        GetInfoVig: function (fnExito) {
            var Url = "Servicios/wsContratosGestionS.asmx/GetInformesVigenciasJS";
            var parametro = { 'Vig_Con': byaSite.getVigencia() };
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        GetActas: function (fnExito) {
            var Url = "Servicios/wsContratosGestionS.asmx/GetActasJS";
            var parametro = { 'Vig_Con': byaSite.getVigencia() };
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        GetInfo: function (Cod_Con, fnExito) {
            var Url = "Servicios/wsContratosGestionS.asmx/GetInfoCon";
            
            var parametro = { 'cod_con': Cod_Con };
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        GetDocumentos: function (Cod_Con, Ide_Inf, fnExito) {
            var Url = "Servicios/wsContratosGestionS.asmx/GetDocumentos";
            var parametro = { CodCon: "'" + Cod_Con + "'", IdeInf: "'" + Ide_Inf + "'" };
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        GetSS: function (Cod_Con, Ide_Inf, fnExito) {
            var Url = "Servicios/wsContratosGestionS.asmx/GetSS";
            var parametro = { CodCon: "'" + Cod_Con + "'", IdeInf: "'" + Ide_Inf + "'" };
            //proxy._Ejecutar(Url, parametro, fnExito);
            
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        GetPlantillasActas: function (ClaActa, fnExito) {
            var Url = 'Servicios/wsContratosGestionS.asmx/GetPlantillasActas';
            var parametro = { ClaActa: "'" + ClaActa + "'" };
            if (!fnExito) {
                var result = proxy._getAjax(Url, parametro);
                return byaPage.retObj(result.d);
            }
            else {
                var result = proxy._doAjax("GET", Url, parametro, fnExito);
            }
        },
        PostActaParcial:function(ActaJSON, fnExito){
            var Url = "Servicios/wsContratosGestionS.asmx/InsertActaParcialIM";
            if (!fnExito) {
                alert("Debe asignar una función de Callback");
            }else{
                proxy._doAjax("POST", Url, ActaJSON, fnExito);
            }
        },
        GetDataFields: function () {
            return DataFields;
        },
        GetDataFieldsInfo: function () {
            return DataFieldsInfo;
        }
        
        
    };
}());



var IsNullOrEmpty = function (string) {
    return (string === "" || string === null);
};