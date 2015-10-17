using BLL;
using ByA;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace wfSircc.Servicios.DatosBasicosG
{
    /// <summary>
    /// Descripción breve de wsSubTiposContratos
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsSubTiposContratos : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets(string COD_TIP)
        {
            SubTiposContratosBLL o = new SubTiposContratosBLL();
            return ByAUtil.convertListToXML(o.Gets(COD_TIP));
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vSUBTIPOS> Gets2(string COD_TIP)
        {
            SubTiposContratosBLL o = new SubTiposContratosBLL();
            return o.Gets(COD_TIP);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vSUBTIPOS Get(string ID)
        {
            SubTiposContratosBLL o = new SubTiposContratosBLL();
            return o.Get(ID);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vSUBTIPOS Reg)
        {
            SubTiposContratosBLL o = new SubTiposContratosBLL();
            return o.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vSUBTIPOS Reg)
        {
            SubTiposContratosBLL o = new SubTiposContratosBLL();
            return o.Update(Reg);
        }
    }
}
