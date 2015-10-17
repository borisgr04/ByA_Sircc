using BLL.EstPrev;
using ByA;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace wfSircc.Servicios.EstPrev
{
    /// <summary>
    /// Descripción breve de wsProyectos
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsProyectos : System.Web.Services.WebService
    {
        ProyectosBLL Manager;
        [WebMethod]
        public string HelloWorld()
        {
            return "Hola a todos";
        }
        [WebMethod(EnableSession = true)]
        public ByARpt Insert(vPROYECTOS Reg)
        {
            Manager = new ProyectosBLL();
            return Manager.Insert(Reg);
        }
        [WebMethod(EnableSession = true)]
        public ByARpt Delete(vPROYECTOS Reg)
        {
            Manager = new ProyectosBLL();
            return Manager.Delete(Reg);
        }
        [WebMethod(EnableSession = true)]
        public ByARpt Update(vPROYECTOS Reg)
        {
            Manager = new ProyectosBLL();
            return Manager.Update(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetProyectos(string filtro)
        {
            Manager = new ProyectosBLL();
            return ByAUtil.convertListToXML(Manager.GetProyectoss(filtro));

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vPROYECTOS GetProyectos2(string idProyecto)
        {
            Manager = new ProyectosBLL();
            return Manager.GetProyectos(idProyecto);

        }      
    }
}
