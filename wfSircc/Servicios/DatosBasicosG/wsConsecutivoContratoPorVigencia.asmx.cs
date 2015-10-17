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
    /// Descripción breve de wsConsecutivoContratoPorVigencia
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsConsecutivoContratoPorVigencia : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets()
        {
            ConsecutivoContratoPorVigenciaBLL o = new ConsecutivoContratoPorVigenciaBLL();
            return ByAUtil.convertListToXML(o.Gets());
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vNROCONVIG Get(short YEAR_VIG,string COD_TIP)
        {
            ConsecutivoContratoPorVigenciaBLL o = new ConsecutivoContratoPorVigenciaBLL();
            return o.Get(YEAR_VIG,COD_TIP);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vNROCONVIG Reg)
        {
            ConsecutivoContratoPorVigenciaBLL o = new ConsecutivoContratoPorVigenciaBLL();
            return o.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vNROCONVIG Reg)
        {
            ConsecutivoContratoPorVigenciaBLL o = new ConsecutivoContratoPorVigenciaBLL();
            return o.Update(Reg);
        }

    }
}
