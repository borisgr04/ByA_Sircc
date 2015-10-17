using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using Entidades;

using AutoMapper;
using ByA;

using Sircc4.Clases;
using Entidades.VistasPROC;
using BLL.PROCESOS;

namespace Sircc4.Servicios
{
    /// <summary>
    /// Summary description for wsSolicitudes
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class wsSolicitudes : System.Web.Services.WebService
    {
        PSolicitudesBLL epBLL = new PSolicitudesBLL();
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsertPSolicitud(vPSolicitudes Reg)
        {
            
            Reg.USAP = Usuario.UserName;
            ByARpt rpt = epBLL.Insert(Reg);
            return rpt;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdatePSolicitud(vPSolicitudes Reg)
        {
            
            Reg.USAP = Usuario.UserName;
            ByARpt rpt = epBLL.Update(Reg);
            return rpt;
        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public vPSolicitudes GetSolicitud(string codsol)
        {
            
            return epBLL.GetPK(codsol);
        }

        //Solicitudes
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetSolicitudes(string dep_psol, short Vig_Sol)
        {
            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(epBLL.getSolicitudes(dep_psol, Vig_Sol));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPESTADOS> getSolxEstados(string DepDel, short Vigencia)
        {
            return epBLL.getSolxEstados(DepDel, Vigencia);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetSolicitudesxEstxDD(string Estado, short Vigencia, string Dep_Del)
        {
            return ByAUtil.convertListToXML(epBLL.GetSolicitudesxEstxDD(Estado, Vigencia, Dep_Del));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt AsignarFuncionario(vHRevisado hr)
        {
            hr.FEC_ASIGNADO = DateTime.Now;
            hr.FEC_REG = DateTime.Now;
            hr.USAP = Usuario.UserName;
            return epBLL.AsignarFuncionario(hr);
        }

    }
}
