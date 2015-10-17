using BLL.Contratos;
using BLL.Contratos.Gestion;
using ByA;
using Entidades.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace wfSircc.Servicios.Contratos
{
    /// <summary>
    /// Descripción breve de wsModFecha
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsModFecha : System.Web.Services.WebService
    {
        ModFechaBLL Manager;
        [WebMethod]
        public string HelloWorld()
        {
            return "Hola a todos";
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public RangoFecha GetModFecha_Contrato(string Cod_Con)
        {
            Manager = new ModFechaBLL();
            return Manager.GetModFecha_Contrato(Cod_Con);
        }



        [WebMethod(EnableSession = true)]
        public ByARpt UpdateModFecha(vCONTRATOS Reg)
        {
            Manager = new ModFechaBLL();
            //YYMMDD
            Reg.FEC_SUS_CON = new DateTime(Reg.FEC_SUS_CON.Year, Reg.FEC_SUS_CON.Month, Reg.FEC_SUS_CON.Day);
            return Manager.UpdateModFecha(Reg);
        }
    }
}
