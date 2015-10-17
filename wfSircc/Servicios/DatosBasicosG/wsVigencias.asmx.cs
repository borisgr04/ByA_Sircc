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
    /// Descripción breve de wsVigencias
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsVigencias : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets()
        {
            VigenciasBLL o = new VigenciasBLL();
            return ByAUtil.convertListToXML(o.Gets());
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vVIGENCIAS Get(short ID)
        {
            VigenciasBLL o = new VigenciasBLL();
            return o.Get(ID);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vVIGENCIAS Reg)
        {
            VigenciasBLL o = new VigenciasBLL();
            return o.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vVIGENCIAS Reg)
        {
            VigenciasBLL o = new VigenciasBLL();
            return o.Update(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vVIGENCIAS> GetsAbiertas()
        {
            VigenciasBLL o = new VigenciasBLL();
            return o.GetsAbiertas();
        }
    }
}
