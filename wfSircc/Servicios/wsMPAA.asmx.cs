using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Entidades;
using ByA;
using BLL.EstPrev;
using System.Web.Script.Services;
using Entidades.Vistas;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsMPAA
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsMPAA : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets(short Vigencia)
        {
            MPaaBLL o = new MPaaBLL();
            return ByAUtil.convertListToXML(o.Gets(Vigencia));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vEP_MPAA Get(decimal ID)
        {
            MPaaBLL o = new MPaaBLL();
            return o.Get(ID);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vEP_MPAA Reg)
        {
            MPaaBLL o = new MPaaBLL();
            return o.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vEP_MPAA Reg)
        {
            MPaaBLL o = new MPaaBLL();
            return o.Update(Reg);
        }
    }
}
