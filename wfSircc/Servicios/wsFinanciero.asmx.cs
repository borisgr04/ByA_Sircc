using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using BLL.CGestion;
using ByA;
using Entidades;
using Financiero;
using BLL.EstPrev;
using Entidades.Contratos;
using BLL.Contratos.Gestion;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsFinanciero
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsFinanciero : System.Web.Services.WebService
    {
        IFinanciero f = FinancieroFactory.Create("SIIAF");

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public SF_OP GetOp(string nro_op, string vigencia)
        {
            
            return f.GetOP(nro_op,vigencia);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetRpOpLoadEgr(int IdActa)
        {
            CGControlPagosC cp = new CGControlPagosC();
            IList<vRP_ContratosOP> lst = cp.GetRpOp(IdActa);
            foreach(vRP_ContratosOP item in lst){
                SF_OP op=f.GetOP(item.NRO_OP, item.FEC_OP.Value.Year.ToString());
                item.NRO_EGR = op.NUM_EGRESO.ToString();
                item.FEC_EGR = op.FEC_EGRESO;
            }
            return ByAUtil.convertListToXML(lst);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public  List<vEP_CDP_DTO> GetCDPs(string NRO_CDP)
        {
            EstPrevBLL o = new EstPrevBLL();
            return o.GetCDPsExt(NRO_CDP);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<object> GetRPs(string NRO_RP, string VIGENCIA)
        {
            mRP_Contratos o = new mRP_Contratos();
            return o.GetRPExt(NRO_RP, VIGENCIA);
        }
    }
}
