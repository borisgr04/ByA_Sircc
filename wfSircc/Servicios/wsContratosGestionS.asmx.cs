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
    /// Descripción breve de wsContratosGestionS
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsContratosGestionS : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetConsultaContratos(string Dep_Nec, short Vig_Con)
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            //vContratosIntFiltro fc = new vContratosIntFiltro { Ide_Interventor = Usuario.UserName, Vigencia= Vig_Con, Dep_Nec= Dep_Nec };
            //return ByAUtil.convertListToXML(o.GetContratos(fc));
            return ByAUtil.convertListToXML(o.GetContratos(Usuario.UserName, Vig_Con, Dep_Nec));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vContratosInt> GetConsultaContratosJS(short Vig_Con)
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            return o.GetContratos(Usuario.UserName, Vig_Con);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vDEPENDENCIA> GetDepContratos()
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            vContratosIntFiltro fc = new vContratosIntFiltro { Ide_Interventor = Usuario.UserName };
            return o.GetDependencias(fc);
        }

        //Solicitudes
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public vContratosInt GetDetContratos(string CodCon)
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            string username = Usuario.UserName;
            return o.GetDetContrato(CodCon);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetActas(string CodCon)
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(o.GetActas(CodCon));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vACTASCONTRATO> GetActasJS(short Vig_Con)
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            string username = Usuario.UserName;
            return o.GetActas(Vig_Con,username);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vINT_INFOCONT> GetInformesVigenciasJS(short Vig_Con)
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            string Ide_Supervisor = Usuario.UserName;
            List<vINT_INFOCONT> l = o.GetInformesV(Vig_Con, Ide_Supervisor);
            return l;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vEstados> GetActasSiguientes(string CodCon)
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            string username = Usuario.UserName;
            return o.GetActasSiguientes(CodCon);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPPLANTILLAS_ACTAS> GetPlantillasActas(string ClaActa)
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            string username = Usuario.UserName;
            return o.GetPlantillasActas(ClaActa);
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsertActaInicio(vACTAINICIO Reg)
        {
            CGRegGestionBLL epBLL = new CGRegGestionBLL();
            Reg.USUARIO = Usuario.UserName;
            ByARpt rpt = epBLL.Insert(Reg);
            return rpt;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsertActaParcialIM(vActaParcialDto Reg)
        {
            CGRegGestionBLL epBLL = new CGRegGestionBLL();
            Reg.USUARIO = Usuario.UserName;
            ByARpt rpt = epBLL.Insert(Reg);
            return rpt;
        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vINT_INFOCONT> GetInfoCon(string cod_con)
        {
            CGContratistaBLL o =new CGContratistaBLL();
            //solo los activos
            //anulados no , deberian ser los revisados.
            return o.GetInformes(cod_con).Where(t => t.EST_INF == "AC").ToList();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vGD_DOC_ACTAS> GetDocumentos(string CodCon, decimal IdeInf)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            return o.GetDocumentos(CodCon, IdeInf);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vINT_PAGOSST> GetSS(string CodCon, decimal? IdeInf)
        {
            CGContratistaBLL o = new CGContratistaBLL();

            string username = Usuario.UserName;
            return o.GetSS(CodCon, IdeInf);
        }
        
    }
    
}
