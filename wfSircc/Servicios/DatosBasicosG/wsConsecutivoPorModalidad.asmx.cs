using BLL;
using ByA;
using Entidades;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace wfSircc.Servicios.DatosBasicosG
{
    /// <summary>
    /// Descripción breve de wsConsecutivoPorModalidad
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsConsecutivoPorModalidad : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets(short Vigencia)
        {
            ConsecutivoPorModalidadBLL o = new ConsecutivoPorModalidadBLL();
            return ByAUtil.convertListToXML(o.Gets(Vigencia));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vCONS_PROC Get(short VIGENCIA, string DEPENDENCIA, string MODALIDAD)
        {
            ConsecutivoPorModalidadBLL o = new ConsecutivoPorModalidadBLL();
            return o.Get(VIGENCIA, DEPENDENCIA, MODALIDAD);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vCONS_PROC Reg)
        {
            ConsecutivoPorModalidadBLL o = new ConsecutivoPorModalidadBLL();
            return o.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vCONS_PROC Reg)
        {
            ConsecutivoPorModalidadBLL o = new ConsecutivoPorModalidadBLL();
            return o.Update(Reg);
        }
    }
}
