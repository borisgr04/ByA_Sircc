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
using BLL;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsTiposPlantillas
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsTiposPlantillas : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPL_TIPOS_PLANTILLA> Gets()
        {
            mTiposPlantillas o = new mTiposPlantillas();
            return o.Gets();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPL_TIPOS_PLANTILLA> GetsActivasJson()
        {
            mTiposPlantillas o = new mTiposPlantillas();
            return o.Gets();
        }
    }
}
