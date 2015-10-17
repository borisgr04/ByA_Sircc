using BLL;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using BLL.Oracle;
using Entidades.Consultas;

namespace wfSircc.ConsultaPublica
{
    /// <summary>
    /// Descripción breve de wsConsultaContratosPublica
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsConsultaContratosPublica : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vTIPOSCONT> GetsTiposContratos()
        {
            TiposContratosBLL o = new TiposContratosBLL();
            return o.GetsActivos();
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vDEPENDENCIA> GetsDependencias()
        {
            DependenciasBLL o = new DependenciasBLL();
            return o.Gets();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<vCON_CONTRATOS_PUBLICA> RealizarConsulta(vConsultaContratosPublica Reg)
        {
            ReportePublicoBLL o = new ReportePublicoBLL();
            return o.Consultar(Reg);
        }
    }
}
