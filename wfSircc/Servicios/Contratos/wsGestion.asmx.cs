using BLL.Contratos;
using ByA;
using Entidades.Contratos;
using Sircc4.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace wfSircc.Servicios.Contratos
{
    /// <summary>
    /// Descripción breve de wsGestion
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsGestion : System.Web.Services.WebService
    {



        GestionBLL Manager;
        [WebMethod]
        public string HelloWorld()
        {
            return "Hola a todos";
        }


        [WebMethod(EnableSession = true)]
        public ByARpt Insert(vEstContratos Reg)
        {
            Manager = new GestionBLL();
            Reg.USUARIO = Usuario.UserName;
            Reg.FEC_ENT = new DateTime(Reg.FEC_ENT.Year, Reg.FEC_ENT.Month, Reg.FEC_ENT.Day);
            return Manager.InsertGestion(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt Anular(vEstContratos Reg)
        {
            Manager = new GestionBLL();           
            return Manager.AnularGestion(Reg);
        }
    }
}
