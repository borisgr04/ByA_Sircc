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

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsPlantillas
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsPlantillas : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string Gets()
        {
            mPlantillas o = new mPlantillas();
            List<vPL_PLANTILLA> lPlantillas = o.Gets();
            foreach (vPL_PLANTILLA item in lPlantillas)
            {
                item.lSecciones = new List<vPL_SECCIONES>();
            }
            return ByAUtil.convertListToXML(lPlantillas);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetsActivas()
        {
            mPlantillas o = new mPlantillas();
            List<vPL_PLANTILLA> lPlantillas = o.Gets();
            foreach (vPL_PLANTILLA item in lPlantillas)
            {
                item.lSecciones = new List<vPL_SECCIONES>();
            }
            List<vPL_PLANTILLA> lPlantillas2 = new List<vPL_PLANTILLA>();
            lPlantillas2 = lPlantillas.Where(t => t.EST_PLA == "AC").ToList();
            return ByAUtil.convertListToXML(lPlantillas2);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPL_PLANTILLA> GetsActivasJson()
        {
            mPlantillas o = new mPlantillas();
            List<vPL_PLANTILLA> lPlantillas = o.Gets();
            foreach (vPL_PLANTILLA item in lPlantillas)
            {
                item.lSecciones = new List<vPL_SECCIONES>();
            }
            List<vPL_PLANTILLA> lPlantillas2 = new List<vPL_PLANTILLA>();
            lPlantillas2 = lPlantillas.Where(t => t.EST_PLA == "AC").ToList();
            return lPlantillas2;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vPL_PLANTILLA Get(decimal ID)
        {
            mPlantillas o = new mPlantillas();
            return o.Get(ID);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPLANTILLASXPROCESO> GetPlatillasPorProceso(string NUM_PROC, string Filtro)
        {
            mPlantillas o = new mPlantillas();
            return o.GetPlatillasPorProceso(NUM_PROC, Filtro);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vPL_PLANTILLA Reg)
        {
            mPlantillas o = new mPlantillas();
            return o.Insert(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vPL_PLANTILLA Reg)
        {
            mPlantillas o = new mPlantillas();
            return o.Update(Reg);
        }
    }
}
