using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Entidades.VistasProcDB;
using BLL.Procesos;
using System.Web.Script.Services;

namespace wfSircc.Servicios.ProcesosDB
{
    /// <summary>
    /// Descripción breve de wsEstados
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsEstados : System.Web.Services.WebService
    {
        PEstadosBLL manager; 

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPEstados_DTO> _GetEstados()
        { 
            manager = new PEstadosBLL();
            return manager._GetEstados();
        }
    }
}
