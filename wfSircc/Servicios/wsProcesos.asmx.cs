using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using BLL.PROCESOS;
using ByA;
using Entidades.VistasPROC;
using BLL.PROCESOS.ConsultaT.Actividades;
using Sircc4.Clases;
using Entidades;
using Entidades.Consultas;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsProcesos
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsProcesos : System.Web.Services.WebService
    {
        ProcesosBLL epBLL = new ProcesosBLL();
        Est_Avi_Actividad Avi_Act = new Est_Avi_Actividad();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetCronograma(string Num_Pro)
        {
            
            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(epBLL.GetCronograma(Num_Pro));
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPCRONOGRAMAS> GetCronograma2(string Num_Pro)
        {

            string username = Usuario.UserName;
            return epBLL.GetCronograma(Num_Pro);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt CambiarEstadoCronograma(vPCRONOGRAMAS Reg)
        {
            return epBLL.CambiarEstadoCronograma(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetCronogramaS(string Num_Pro)
        {

            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(epBLL.GetCronogramaS(Num_Pro));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdCronograma(List<vPCRONOGRAMAS> lst, string Num_Pro)
        {
            return epBLL.UpdCronograma(lst, Num_Pro, Usuario.UserName);
        }

        [WebMethod(EnableSession = true)]
                [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt SegCronograma(List<vPCRONOGRAMAS> lst, string Num_Pro) {
            
            return epBLL.SegCronograma(lst, Num_Pro, Usuario.UserName);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPCRONOGRAMAS> GetCronogramaJ(string Num_Pro)
        {

            string username = Usuario.UserName;
            return epBLL.GetCronograma(Num_Pro);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPACTIVIDADES> GetActividadesT(string Num_Pro)
        {
            return epBLL.GetActividadesT(Num_Pro); 
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPACTIVIDADES> GetActividadesC(string Num_Pro)
        {
            return epBLL.GetActividadesC(Num_Pro); 
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPACTIVIDADES> GetActividadesNC(string Num_Pro)
        {
            return epBLL.GetActividadesNC(Num_Pro); 
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vPCONTRATOS GetProceso(string Num_Pro)
        {
            return epBLL.GetProceso(Num_Pro);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vESTPREV GetEstPrevToProceso(string Num_Pro)
        {
            return epBLL.GetEstPrevToProceso(Num_Pro);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetProcesosUActual(short Vigencia, string Dependencia, string Estado) {
            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(epBLL.GetProcesosU(Vigencia, username,Dependencia,Estado));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetProcesosUFiltro(short Vigencia, string Dependencia, string Estado, string Filtro)
        {
            string username = Usuario.UserName;
            return ByAUtil.convertListToXML(epBLL.GetProcesosUFiltro(Vigencia, username, Dependencia,Estado,Filtro));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetProcesosT(short Vigencia, string Dep_Del)
        {
            ProcesosBLL epBLL = new ProcesosBLL();
            return ByAUtil.convertListToXML(epBLL.GetProcesosD(Vigencia, Dep_Del));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetProcesosU(short Vigencia, string Usuario)
        {
            ProcesosBLL epBLL = new ProcesosBLL();
            return ByAUtil.convertListToXML(epBLL.GetProcesosU(Vigencia, Usuario));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPESTADOS> getxEstados(string DepDel, short Vigencia)
        {
            string username = Usuario.UserName;
            return epBLL.getxEstados(DepDel, Vigencia, username);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPESTADOS> getSolxEstados(string DepDel, short Vigencia)
        {
            string username = Usuario.UserName;
            return epBLL.getSolxEstados(DepDel, Vigencia, username);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPESTADOS> getEst_Avi_Act(short Vigencia)
        {
            string username = Usuario.UserName;
            return Avi_Act.getEst_Avi_Act2 (Vigencia, username);
        }      


        // Carlos Tirado 29/09/2015
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPROC_MOD> GetCantidadProcesosPorModalidad(short Vigencia)
        {
            string username = Usuario.UserName;
            return epBLL.GetCantidadProcesosPorModalidad(Vigencia, username);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPCONTRATOS> GetProcesosUsuario(short Vigencia, string Modalidad, string Filtro)
        {
            string username = Usuario.UserName;
            return epBLL.GetProcesosUsuario(Vigencia, username, Modalidad, Filtro);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPCRONOGRAMAS> GetCronogramaProceso(string Num_Pro)
        {
            string username = Usuario.UserName;
            return epBLL.GetCronograma(Num_Pro);
        }
    }
}
