using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using ByA;
using BLL.PROCESOS;
using Sircc4.Clases;
using Entidades.VistasPROC;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsMisSolicitudes
    /// </summary>
    [WebService(Namespace = "http://byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsMisSolicitudes : System.Web.Services.WebService
    {
        PSolicitudesBLL epBLL = new PSolicitudesBLL();
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetMisSolicitudes(string estado, short vigencia)
        {
            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(epBLL.GetMisSolicitudes(username, estado, vigencia));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetMisSolicitudesxEstxDD(string Estado, short Vigencia, string Dep_Del) {
            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(epBLL.GetMisSolicitudesxEstxDD(username, Estado, Vigencia, Dep_Del));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Recibir(vHRevisado hr)
        {
            return epBLL.Recibir(hr.IDE,hr.OBS_RECIBIDO_ABOG);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Revisar(vHRevisado hr)
        {
            
            return epBLL.Revisar(hr);
        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string GetProximoNumxMod(string codsol)
        {
            return epBLL.GetProximoNumxMod(codsol);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<RootObject> GetCategoriasFiltro()
        {
            IList<RootObject> lstEstados = new List<RootObject>();
            lstEstados.Add(new RootObject { Key = "SREC", Value = "Por Recibir" });
            lstEstados.Add(new RootObject { Key = "SREV", Value = "Pendientes" });
            lstEstados.Add(new RootObject { Key = "RECH", Value = "Rechazadas" });
            lstEstados.Add(new RootObject { Key = "ACEP", Value = "Aceptadas" });
            return lstEstados;
        }
        public class RootObject
        {
            public string Key { get; set; }
            public string Value { get; set; }
        }
    }
}
