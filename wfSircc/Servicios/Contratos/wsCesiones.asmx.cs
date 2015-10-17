using BLL.Contratos;
using ByA;
using Entidades.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace wfSircc.Servicios.Contratos
{
    /// <summary>
    /// Descripción breve de wsCesiones
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsCesiones : System.Web.Services.WebService
    {

        CesionesBLL Manager;
        [WebMethod]
        public string HelloWorld()
        {
            return "Hola a todos";
        }
        [WebMethod(EnableSession = true)]       
        public ByARpt Insert(vCesiones Reg)
        {
            Manager = new CesionesBLL();
            return Manager.Insert(Reg);
        }
        [WebMethod(EnableSession = true)]
        public ByARpt Delete(vCesiones Reg)
        {
            Manager = new CesionesBLL();
            return Manager.Delete(Reg);
        }       
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetCesiones(string Cod_Con)
        {
            Manager = new CesionesBLL();
            return ByAUtil.convertListToXML(Manager.GetCesiones(Cod_Con));

        }
    }
}
