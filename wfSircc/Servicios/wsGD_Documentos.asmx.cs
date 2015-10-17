using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Entidades;
using ByA;
using BLL.DOC;
using Sircc4.Clases;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsGD_Documentos
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsGD_Documentos : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetBandeja()
        {
            GestionDOC gd = new GestionDOC();

            return ByAUtil.convertListToXML(gd.GetBandeja(Usuario.UserName));
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string GetBandejaJ()
        {
            GestionDOC gd = new GestionDOC();

            return ByAUtil.convertListToXML(gd.GetBandeja(Usuario.UserName));
        }
    }
}
