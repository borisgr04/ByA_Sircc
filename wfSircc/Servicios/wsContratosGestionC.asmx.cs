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
    /// Descripción breve de wsContratosGestionC
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsContratosGestionC : System.Web.Services.WebService
    {
        #region GESTIONCONTRATISTA
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetConsultaContratos(short Vig_Con)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            return ByAUtil.convertListToXML(o.GetContratos(Usuario.UserName, Vig_Con));
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vContratosInt> GetConsultaContratosJS(short Vig_Con)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            return o.GetContratos(Usuario.UserName, Vig_Con);
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vDEPENDENCIA> GetDepContratos()
        {
            CGContratistaBLL o = new CGContratistaBLL();
            return o.GetDependencias(Usuario.UserName).ToList();
        }
        #endregion 
        #region INFORMES
       
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vINT_INFOCONT> GetInformesVigenciasJS(short Vig_Con)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            string username = Usuario.UserName;
            return o.GetInformesV(Vig_Con, username);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vACTASCONTRATO> GetActasJS(short Vig_Con)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            string username = Usuario.UserName;
            return o.GetActas(Vig_Con, username);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetInformes(string CodCon)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            
            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(o.GetInformes(CodCon).OrderByDescending(t=> t.NUM_INF).ToList());
        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsertInforme(vINT_INFOCONT Reg)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            Reg.USAP = Usuario.UserName;
            ByARpt rpt = o.Insert(Reg);
            return rpt;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdateInforme(vINT_INFOCONT Reg)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            Reg.USAP = Usuario.UserName;
            ByARpt rpt = o.Update(Reg);
            return rpt;
        }
        #endregion

        #region SS
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetSS(string CodCon, decimal? IdeInf)
        {
            CGContratistaBLL o = new CGContratistaBLL();

            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(o.GetSS(CodCon, IdeInf));
        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsertSS(vINT_PAGOSST Reg)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            Reg.USAP = Usuario.UserName;
            ByARpt rpt = o.Insert(Reg);
            return rpt;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdateSS(vINT_PAGOSST Reg)
        {
            CGContratistaBLL o = new CGContratistaBLL();
            Reg.USAP = Usuario.UserName;
            ByARpt rpt = o.Update(Reg);
            return rpt;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt AnularSS(vINT_PAGOSST Reg)
        {
            Reg.USAP = Usuario.UserName;
            CGContratistaBLL o = new CGContratistaBLL();
            ByARpt rpt = o.Anular(Reg);
            return rpt;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vINTTIPO_ESS> GetTipoSS()
        {
            CGContratistaBLL o = new CGContratistaBLL();
            return o.GetTipoSS();
        }

        #endregion

        #region ADJUNTOS
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsDocActa(vGD_DOC_ACTAS Reg)
        {
            
            CGContratistaBLL o = new CGContratistaBLL();
            Reg.USAP = Usuario.UserName;
            ByARpt rpt = o.InsDocActa(Reg);
            return rpt;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsLstDocActa(List<vGD_DOC_ACTAS> Reg, string COD_CON)
        {

            CGContratistaBLL o = new CGContratistaBLL();
            Reg.ForEach(t => t.USAP = Usuario.UserName);
            //Reg.USAP = Usuario.UserName;
            ByARpt rpt = o.InsLstDocActa(Reg,COD_CON);
            return rpt;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetDocumentos(string CodCon, decimal Id_info) { 
            CGContratistaBLL o = new CGContratistaBLL();
            return ByAUtil.convertListToXML(o.GetDocumentos(CodCon,Id_info));
        }

        #endregion


    }
}
