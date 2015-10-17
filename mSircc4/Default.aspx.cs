using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Web.Script.Services;
using BLL.mobile;

namespace mSircc4
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string x = Session["Hola"].ToString();
        }

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static IList<vTerceros> getEncargados()
        //{
        //    mobConsultas mc = new mobConsultas();
        //    return mc.getEncargados("06");
        //}

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static IList<vPESTADOS> getxEstados()
        //{
        //    mobConsultas mc = new mobConsultas();
        //    return mc.getxEstados("06");
        //}

        

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static IList<vPCONTRATOS> getProcesos(string IdeFun)
        //{
        //    mobConsultas mc = new mobConsultas();
        //    return mc.getProcesos(IdeFun);
        //}

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static IList<vPCRONOGRAMAS> getCronograma(string NroPro)
        //{
        //    mobConsultas mc = new mobConsultas();
        //    return mc.getCronograma(NroPro);
        //}
        
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static IList<vPCONTRATOS> getProcesosxEst(string Estado)
        //{
        //    mobConsultas mc = new mobConsultas();
        //    return mc.getProcesosxEst("06",Estado);
        //}
        
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static IList<vPCONTRATOS> getProcesosDD(string DepDel)
        //{
        //    mobConsultas mc = new mobConsultas();
        //    return mc.getProcesosDD(DepDel);
        //}

        
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static IList<vDEPENDENCIAS> getDependencias()
        //{
        //    mobConsultas mc = new mobConsultas();
        //    return mc.getDependencias("06");
        //}
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static IList<vPCONTRATOS> getProcesosxDN(string DepNec)
        //{
        //    mobConsultas mc = new mobConsultas();
        //    return mc.getProcesosDN("06",DepNec);
        //}
        
    }
}
