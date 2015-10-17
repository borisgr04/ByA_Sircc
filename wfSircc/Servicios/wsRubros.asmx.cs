using BLL.EstPrev.Gestion;
using ByA;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsRubros
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsRubros : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets(short filtro)
        {
            mRubros  obj = new mRubros();
            return ByAUtil.convertListToXML(obj.Gets(filtro));
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vRUBROS Reg)
        {
            mRubros obj = new mRubros();
            return obj.Insert(Reg);
        }
    }
}
