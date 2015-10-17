using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using BLL.CGestion;
using ByA;
using Entidades;
using Sircc4.Clases;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsTrasladosDoc
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsTrasladosDoc : System.Web.Services.WebService
    {
        CGTraslados ct = new CGTraslados();
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetTraslado(string etapa) {
            return ByAUtil.convertListToXML(ct.GetTraslado(etapa));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetPendiente(string etapa)
        {
            return ByAUtil.convertListToXML(ct.GetPendiente(etapa));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdateTraslados(List<vINT_CONTROL_DOCT> lst)
        {
            return ct.Trasladar(lst);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdateTrasladosR(List<vINT_CONTROL_DOCT2> lst)
        {
            return ct.TrasladarR(lst,Usuario.UserName);
        }
        

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetTrasladoByID(decimal? idtras)
        {
            return ByAUtil.convertListToXML(ct.GetTrasladoByID(idtras));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetRecTrasladoByID(decimal? idtras)
        {
            return ByAUtil.convertListToXML(ct.GetRecTrasladoByID(idtras));
        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetDocPorTram(string etapa)
        {
            return ByAUtil.convertListToXML(ct.GetDocumentosPorTram(etapa));
        }
        

        
    }
}
