using BLL;
using ByA;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace wfSircc.Servicios.DatosBasicosG
{
    /// <summary>
    /// Descripción breve de wsEtapas
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsEtapas : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets()
        {
            EtapasBLL o = new EtapasBLL();
            return ByAUtil.convertListToXML(o.Gets());
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vETAPAS> GetsActivas()
        {
            EtapasBLL o = new EtapasBLL();
            return o.Gets().Where(t => t.ESTADO == "AC").ToList();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vETAPAS Get(string ID)
        {
            EtapasBLL o = new EtapasBLL();
            return o.Get(ID);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vETAPAS Reg)
        {
            EtapasBLL o = new EtapasBLL();
            return o.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vETAPAS Reg)
        {
            EtapasBLL o = new EtapasBLL();
            return o.Update(Reg);
        }
    }
}
