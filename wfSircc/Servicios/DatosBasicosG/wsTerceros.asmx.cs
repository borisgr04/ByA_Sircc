using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BLL;
using ByA;
using Entidades;
using Entidades.VistasGC;
using Sircc4.Clases;
using System.Web.Script.Services;

namespace wfSircc.Servicios.DatosBasicosG
{
    /// <summary>
    /// Descripción breve de wsTerceros
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsTerceros : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vTerceros Reg)
        {

            mTerceros oTer = new mTerceros();
            Reg.USAP = Usuario.UserName;
            ByARpt rpt = oTer.Update(Reg);
            return rpt;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vTerceros GetTercerosxId(string IdTer)
        {
            mTerceros oTer = new mTerceros();
            return oTer.GetTercerobyId(IdTer);
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vTerceros Reg)
        {
            mTerceros oTer = new mTerceros();
            Reg.USAP = Usuario.UserName;
            return oTer.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetsFiltro(string Filtro, string Valor)
        {
            mTerceros o = new mTerceros();
            return ByAUtil.convertListToXML(o.GetsFiltro(Filtro, Valor));
        }

    }
}
