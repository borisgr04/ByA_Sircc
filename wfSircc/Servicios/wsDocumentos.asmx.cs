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
using BLL.PROCESOS.GenDoc;

namespace wfSircc.Servicios
{
    /// <summary>
    /// Descripción breve de wsDocumentos
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsDocumentos : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vDOC_PLANTILLA> GetsHechos(string NUM_PROC, decimal ID_PLA)
        {
            mDocumentos o = new mDocumentos();
            List<vDOC_PLANTILLA> lPlantillas = o.Gets(NUM_PROC, ID_PLA);
            foreach (vDOC_PLANTILLA item in lPlantillas)
            {
                item.lSecciones = new List<vDOC_SECCIONES>();
            }
            return lPlantillas;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vDOC_PLANTILLA> Gets(string NUM_PROC)
        {
            mDocumentos o = new mDocumentos();
            List<vDOC_PLANTILLA> lPlantillas = o.Gets(NUM_PROC);
            foreach (vDOC_PLANTILLA item in lPlantillas)
            {
                item.lSecciones = new List<vDOC_SECCIONES>();
            }
            return lPlantillas;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vDatosEPProc GetDatosEpProc(string NUM_PROC)
        {
            mCruzarDocSecciones o = new mCruzarDocSecciones();
            return o.GetDatos(NUM_PROC);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vDOC_PLANTILLA> GetsFiltro(string NUM_PROC, string FILTRO)
        {
            mDocumentos o = new mDocumentos();
            List<vDOC_PLANTILLA> lPlantillas = o.Gets(NUM_PROC);
            foreach (vDOC_PLANTILLA item in lPlantillas)
            {
                item.lSecciones = new List<vDOC_SECCIONES>();
            }
            return lPlantillas.Where(t => t.TITULO.ToUpper().Contains(FILTRO.ToUpper())).ToList();
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vDOC_PLANTILLA Get(decimal ID)
        {
            mDocumentos o = new mDocumentos();
            return o.Get(ID);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(decimal ID_PLA, string NUM_PROC)
        {
            mDocumentos o = new mDocumentos();
            return o.Insert(ID_PLA,NUM_PROC);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Update(vDOC_PLANTILLA Reg)
        {
            mDocumentos o = new mDocumentos();
            return o.Update(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt CompletarDocumento(vCOMPLETAR_DOCUMENTO Reg)
        {
            mDocumentos o = new mDocumentos();
            return o.CompletarDocumento(Reg);
        }
    }
}
