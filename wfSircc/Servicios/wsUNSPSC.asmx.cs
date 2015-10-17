using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BLL.EstPrev;
using Entidades;
using Entidades.Vistas;
using System.Web.Script.Services;
using ByA;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsUNSPSC
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsUNSPSC : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vEP_CODIGOSUNSPSC> GetGrupos()
        {
            CodigosUNSPSCBLL o = new CodigosUNSPSCBLL();
            return o.GetGrupos();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vEP_CODIGOSUNSPSC> GetSegmentos(string codigoGrupo)
        {
            CodigosUNSPSCBLL o = new CodigosUNSPSCBLL();
            return o.GetSegmentos(codigoGrupo);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vEP_CODIGOSUNSPSC> GetFamilias(string codigoSegmento)
        {
            CodigosUNSPSCBLL o = new CodigosUNSPSCBLL();
            return o.GetFamilias(codigoSegmento);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vEP_CODIGOSUNSPSC> GetClases(string codigoFamilia)
        {
            CodigosUNSPSCBLL o = new CodigosUNSPSCBLL();
            return o.GetClases(codigoFamilia);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vEP_CODIGOSUNSPSC> GetProductos(string codigoClase)
        {
            CodigosUNSPSCBLL o = new CodigosUNSPSCBLL();
            return o.GetProductos(codigoClase);
        }
    }
}
