using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BLL.PROCESOS;
using Entidades;
using Entidades.Vistas;
using ByA;
using System.Web.Script.Services;
using Entidades.VistasPROC;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsProponentes
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsProponentes : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets(string NumeroProceso)
        {
            ProponentesBLL o = new ProponentesBLL();
            List<vPPROPONENTESS> lrProponentes = o.Gets(NumeroProceso);
            return ByAUtil.convertListToXML(lrProponentes);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vPPROPONENTESS Reg)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.Insert(Reg);
        }        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vPPROPONENTESS Reg)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.Update(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vPPROPONENTESS Get(decimal id)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.Get(id);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public bool GetSiAdjudicado(string numProc)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.GetSiAdjudicado(numProc);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt AsignarNit(vPPROPONENTESS Proponente)
        {
            ProponentesBLL oProp = new ProponentesBLL();
            return oProp.AsignarNit(Proponente);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public bool GetSiNitAsignado(decimal ID)
        {
            ProponentesBLL oProp = new ProponentesBLL();
            return oProp.GetSiNitAsignado(ID);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt AdjudicarOrNot(vPPROPONENTESS oDto)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.AdjudicarOrNot(oDto);
        }

        // Miembros  Proponentes
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetsMiembrosProponentes(decimal IDE_PROP)
        {
            ProponentesBLL o = new ProponentesBLL();
            return ByAUtil.convertListToXML(o.GetsMiembrosProponentes(IDE_PROP));
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vCONSORCIOSUTXC GetMiembro(decimal IDE_PROP, string ID_MIEMBROS)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.GetMiembro(IDE_PROP, ID_MIEMBROS);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdateMiembro(vCONSORCIOSUTXC Reg)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.UpdateMiembros(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsertMiembro(vCONSORCIOSUTXC Reg)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.InsertMiembros(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public ByARpt DeleteMiembro(decimal IDE_PROP, string ID_MIEMBROS)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.DeleteMiembro(IDE_PROP, ID_MIEMBROS);
        }
    
        // Miembros Terceros
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetsMiembrosTerceros(string IDE_TER)
        {
            ProponentesBLL o = new ProponentesBLL();
            return ByAUtil.convertListToXML(o.GetsMiembrosTercero(IDE_TER));
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vCONSORCIOSUTXC GetMiembroTerceros(string IDE_TER, string ID_MIEMBROS)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.GetMiembroTercero(IDE_TER, ID_MIEMBROS);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt UpdateMiembroTerceros(vCONSORCIOSUTXC Reg)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.UpdateMiembrosTercero(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsertMiembroTerceros(vCONSORCIOSUTXC Reg)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.InsertMiembrosTercero(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public ByARpt DeleteMiembroTerceros(string IDE_TER, string ID_MIEMBROS)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.DeleteMiembroTercero(IDE_TER, ID_MIEMBROS);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt DeleteProponente(decimal ID)
        {
            ProponentesBLL o = new ProponentesBLL();
            return o.DeleteProponente(ID);
        }
    
    }
}
