using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using BLL.CGestion;
using BLL.CGestion.Filtros;
using ByA;
using Entidades;
using Entidades.VistasGC;
using Sircc4.Clases;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsControlPagosC
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsControlPagosC : System.Web.Services.WebService
    {
        CGControlPagosC cp = new CGControlPagosC();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public vACTASCONTRATO GetActa(int IdActa) {
            return cp.GetActa(IdActa);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public vContratosInt GetContrato(int IdActa) {
            return cp.GetContrato(IdActa);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetRpOp(int IdActa) {
            return ByAUtil.convertListToXML(cp.GetRpOp(IdActa));
        }
        
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vRP_ContratosOP> GetListRpOp(int IdActa)
        {
            return cp.GetRpOp(IdActa);
        }
        

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vRP_ContratosOP> GetListRpOpY(int IdActa)
        {
            return cp.GetRpOp(IdActa);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Revisar(vINT_CONTROL_DOC Reg)
        {
            Reg.USAP_REV = Usuario.UserName;
            return cp.Revisar(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Recibir(vINT_CONTROL_DOC Reg)
        {
            Reg.USAP_REC = Usuario.UserName;
            return cp.Recibir(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdateRpOp(List<vRP_ContratosOP> lst, decimal id_ctrdoc)
        {
            return cp.UpdateRpOp(lst, id_ctrdoc, Usuario.UserName);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdateRpOpEg(List<vRP_ContratosOP> lst, decimal id_ctrdoc)
        {
            return cp.UpdateRpOpEg(lst, id_ctrdoc, Usuario.UserName);
        }
        
    }
}
