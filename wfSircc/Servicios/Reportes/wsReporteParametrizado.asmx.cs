using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Entidades.Consultas;
using BLL.Oracle;

namespace wfSircc.Servicios.Reportes
{
    /// <summary>
    /// Descripción breve de wsReporteParametrizado
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsReporteParametrizado : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<vCON_CONTRATOS> RealizarReporteParametrizado(vConsultaContratosParametrizadaDto Reg)
        {
            ReporteParametrizado o = new ReporteParametrizado();
            return o.Consultar(Reg);
        }
    }
}
