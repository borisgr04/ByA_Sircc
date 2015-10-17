using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Entidades;
using BLL.Contratos;
using Entidades.Contratos;
using ByA;
using Sircc4.Clases;

namespace wfSircc.Servicios.CT_Radicacion
{
    /// <summary>
    /// Descripción breve de ws_ct_radicacion
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class ws_ct_radicacion : System.Web.Services.WebService
    {
        RadicacionBLL o = new RadicacionBLL();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public vESTPREV GetEstPrev(string num_proc)
        {
            vESTPREV Reg = o.GetPK(num_proc);
            return Reg;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod( UseHttpGet=true, ResponseFormat = ResponseFormat.Json)]
        public vCONTRATOS_ULT GetUltimos(short vigencia, string tip_con) {
            return o.GetUltimos(vigencia, tip_con);
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vCONTRATOS Reg)
        {
            Reg.USUARIO = Usuario.UserName;
            return o.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsertEst(vCONTRATOS Reg)
        {
            Reg.USUARIO = Usuario.UserName;
            return o.InsertEst(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vCONTRATOS Reg)
        {
            Reg.USUARIO = Usuario.UserName;
            return o.Update(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vCONTRATOS GetContratos(string cod_con)
        {
            vCONTRATOS Reg = o.GetContratos(cod_con);
            return Reg;
        }
    }
}
