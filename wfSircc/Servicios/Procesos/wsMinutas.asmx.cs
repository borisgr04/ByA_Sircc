using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using BLL;
using BLL.PROCESOS;
using ByA;
using Entidades.VistasPROC;
using Sircc4.Clases;


namespace wfSircc.Servicios.Procesos
{
    /// <summary>
    /// Descripción breve de wsMinutas
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsMinutas : System.Web.Services.WebService
    {
        PMinutas pm = new PMinutas();
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt GuardarM(List<vPCLAUSULAS> lst)
        {
            return pm.GuardarM(lst);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPR_DB_CLAUSULAS> GetClausulas(string Num_Pro)
        {
            string username = Usuario.UserName;
            return pm.GetClausulas(1);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPCLAUSULAS> GetPClausulas(string Num_Pro)
        {
            string username = Usuario.UserName;
            return pm.GetPClausulas("0001");
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPCLAUSULAS> GetPClausulasEP(string Num_Pro)
        {
            string username = Usuario.UserName;
            return pm.GetPClausulas("0010");
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vDatosMinuta GenDatosMin(string num_pro)
        {
            GenDatosMinuta ep = new GenDatosMinuta();
            return ep.GetDatos(num_pro);

        }


        
    }
}
