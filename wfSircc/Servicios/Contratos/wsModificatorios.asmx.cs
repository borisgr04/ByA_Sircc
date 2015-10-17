using BLL.Contratos;
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
    /// Descripción breve de wsModificatorios
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsModificatorios : System.Web.Services.WebService
    {
        ModificatoriosBLL Manager;

        [WebMethod]
        public string HelloWorld()
        {
            return "Hola a todos";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vTipo_Adiciones> GetTip_Adiciones()
        {
            Manager = new ModificatoriosBLL();
            return Manager.GetTip_Adiciones();
        }
        [WebMethod(EnableSession = true)]
        public ByARpt InsertAdi(vAdiciones Reg)
        {
            Manager = new ModificatoriosBLL();
            return Manager.Insert(Reg);
        }
        [WebMethod(EnableSession = true)]
        public ByARpt DeleteAdi(vAdiciones Reg)
        {
            Manager = new ModificatoriosBLL();
            return Manager.Delete(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetModificatorios(string Cod_Con)
        {
            Manager = new ModificatoriosBLL();
            return ByAUtil.convertListToXML(Manager.GetModificatorios(Cod_Con));
        }       

    }
}
