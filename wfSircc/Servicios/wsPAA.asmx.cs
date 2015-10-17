using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BLL.EstPrev;
using Entidades;
using Entidades.Vistas;
using System.Web.Script.Services;
using ByA;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsPAA
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsPAA : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets(decimal ID_EP_MPAA, int Vigencia)
        {
            PaaBLL obj = new PaaBLL();
            return ByAUtil.convertListToXML(obj.Gets(Vigencia,ID_EP_MPAA));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetXML(int ID, string CodDep, int Vigencia)
        {
            PaaBLL obj = new PaaBLL();
            vEP_PAA o = obj.Get(ID,CodDep,Vigencia);
            List<vEP_PAA> lo = new List<vEP_PAA>();
            if(o != null) lo.Add(o);
            return ByAUtil.convertListToXML(lo);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vEP_PAA Reg)
        {
            PaaBLL obj = new PaaBLL();
            return obj.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vEP_PAA Reg)
        {
            PaaBLL obj = new PaaBLL();
            return obj.Update(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vEP_PAA Get(int ID)
        {
            PaaBLL obj = new PaaBLL();
            return obj.Get2(ID);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vEP_PAA_UNSPSC> GetProductos(int ID)
        {
            PaaBLL obj = new PaaBLL();
            return obj.GetProductosPAA(ID);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public ByARpt DeletePAA(int IDPAA)
        {
            PaaBLL o = new PaaBLL();
            return o.DeletePAA(IDPAA);
        }
    }
}
