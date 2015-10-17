using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BLL.EstPrev;
using Entidades;
using Entidades.Vistas;
using System.Web.Script.Services;
using ByA;
using BLL;

namespace wfSircc.Servicios.DatosBasicosG
{
    /// <summary>
    /// Descripción breve de wsModalidadesPorTipoPlantilla
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsModalidadesPorTipoPlantilla : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vMOD_TIP_PLA> GetsTodasModalidad(string COD_MOD)
        {
            ModalidadesPorTipoPlantillaBLL o = new ModalidadesPorTipoPlantillaBLL();
            return o.GetsTodasModalidad(COD_MOD);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdateOrInsert(List<vMOD_TIP_PLA> lReg)
        {
            ModalidadesPorTipoPlantillaBLL o = new ModalidadesPorTipoPlantillaBLL();
            return o.UpdateOrInsert(lReg);
        }
    }
}
