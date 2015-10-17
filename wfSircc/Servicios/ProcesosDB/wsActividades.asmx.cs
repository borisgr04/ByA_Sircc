using BLL.Procesos;
using ByA;
using Entidades.VistasProcDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace wfSircc.Servicios.ProcesosDB
{
    /// <summary>
    /// Descripción breve de wsActividades
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsActividades : System.Web.Services.WebService
    {
        PActividadesBLL manager;
        [WebMethod]
        public string HelloWorld()
        {
            return "Hola a todos";
        }
        [WebMethod(EnableSession = true)]       
        public ByARpt Insert(vPActividades_DTO Reg)
        {              
            manager = new PActividadesBLL();        
            ByARpt rpt = manager.Insert(Reg);
            return rpt;
        }
        [WebMethod(EnableSession = true)]
        public ByARpt Update(vPActividades_DTO Reg)
        {
            manager = new PActividadesBLL();
            ByARpt rpt = manager.Update(Reg);
            return rpt;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetActividades(string VIG, string TPRO)
        {
            manager = new PActividadesBLL();            
            return ByAUtil.convertListToXML(manager._GetFilterActividades(VIG,TPRO));
           
          
        }

    }
}
