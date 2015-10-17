using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using BLL.EstPrev;
using ByA;
using Entidades;
using Sircc4.Clases;
using Entidades.Vistas;

namespace wfSircc.Servicios.EstPrev
{
    /// <summary>
    /// Descripción breve de wsGesEstPrev
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsGesEstPrev : System.Web.Services.WebService
    {
        EstPrevBLL epBLL = new EstPrevBLL();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public vESTPREV GetEstPrev(string codigo_ep, string tipo)
        {
            vESTPREV Reg = epBLL.GetPK(codigo_ep,tipo);
            return Reg;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vESTPREV> GetPlantillas(string Vigencia)
        {
            return epBLL.GetPlantillas(Vigencia);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vEP_CLAUSULAS_DTO> GetClausulas(string Codigo_EP) {
            return epBLL.GetClausulas(Codigo_EP);
        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt RevisarEP(vEP_HESTADOEP Reg)
        {
            Reg.USAP_EP = Usuario.UserName;
            return epBLL.RevisarEP(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt AprobarEP(vEP_HESTADOEP Reg)
        {
            Reg.USAP_EP = Usuario.UserName;
            return epBLL.AprobarEP(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt DAprobarEP(vEP_HESTADOEP Reg)
        {
            Reg.USAP_EP = Usuario.UserName;
            return epBLL.DAprobarEP(Reg);
        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vDatosEP GetDatos(string codigo_ep)
        {
            vDatosEP Reg = epBLL.GetDatos(codigo_ep);
            return Reg;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetEstPrevList(string codigo_ep)
        {
            
            vDatosEP Reg = epBLL.GetDatos(codigo_ep);        
            List<vDatosEP> list = new List<vDatosEP>();
            list.Add(Reg);
            return ByAUtil.convertListToXML(list);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt insertESTPREV(vESTPREV Reg)
        {
            Reg.USAP_REG_EP = Usuario.UserName;
            return epBLL.Insert(Reg);
        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt updateESTPREV(vESTPREV Reg)
        {
            Reg.USAP_MOD_EP = Usuario.UserName;
            return epBLL.Update(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt CreatePlantilla(vESTPREV Reg)
        {
            Reg.USAP_MOD_EP = Usuario.UserName;
            return epBLL.CreatePlantilla(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vESTPREV_CONSULTA> GetFiltros(CONSULTA_EP_DTO Reg)
        {
            EstPrevBLL mEstPrev = new EstPrevBLL();
            return mEstPrev.GetFiltros(Reg);
        }


    }
}
