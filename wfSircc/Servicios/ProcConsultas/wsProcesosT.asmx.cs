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

namespace wfSircc.Servicios.ProcConsultas
{
    /// <summary>
    /// Descripción breve de wsProcesosT
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsProcesosT : System.Web.Services.WebService
    {
      
      ProcesosCBLL epcBLL = new ProcesosCBLL();
      Est_Avi_Actividad Avi_Act = new Est_Avi_Actividad();

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
      public List<vPESTADOS> getxEstados(string DepDel, short Vigencia) { 
      return epcBLL.getxEstados( DepDel, Vigencia);
      }
      [WebMethod(EnableSession = true)]
      [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
      public List<vPESTADOS> getSolxEstados(string DepDel, short Vigencia) {
          return epcBLL.getSolxEstados(DepDel, Vigencia);
      }
      [WebMethod(EnableSession = true)]
      [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
      public string GetSolicitudes(string estado, short vigencia)
      {
          return ByAUtil.convertListToXML(epcBLL.GetSolicitudesxEst( estado, vigencia));
      }

      [WebMethod(EnableSession = true)]
      [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
      public List<vPCRONOGRAMAS> GetCronogramaJ(string Num_Pro)
      {

          string username = Usuario.UserName;
         return epcBLL.GetCronograma(Num_Pro);
      }
      [WebMethod(EnableSession = true)]
      [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
      public List<vPESTADOS> getEst_Avi_Act(short Vigencia, string DepDel)
      {
          return Avi_Act.getEst_Avi_Act(Vigencia, DepDel);
      }

      [WebMethod(EnableSession = true)]
      [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
      public IList<RootObject> GetCategoriasFiltro()
      {
          IList<RootObject> lstEstados = new List<RootObject>();
          lstEstados.Add(new RootObject { Key = "SASI", Value = "Por Asignar" });
          lstEstados.Add(new RootObject { Key = "SREC", Value = "Por Recibir" });
          lstEstados.Add(new RootObject { Key = "SREV", Value = "Pendientes" });
          lstEstados.Add(new RootObject { Key = "RECH", Value = "Rechazadas" });
          lstEstados.Add(new RootObject { Key = "ACEP", Value = "Aceptadas" });
          return lstEstados;
      }
      public class RootObject
      {
          public string Key { get; set; }
          public string Value { get; set; }
      }

    }
}
