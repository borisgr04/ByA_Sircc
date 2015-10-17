using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using BLL;
using Sircc4.Clases;
using Entidades;
using Entidades.Vistas;
using ByA;

namespace Sircc4.Servicios
{
    /// <summary>
    /// Summary description for wsDatosBasicos
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class wsDatosBasicos : System.Web.Services.WebService
    {
        //EstudiosPreviosBL ep = new EstudiosPreviosBL();
        DatosBasicosBLL ep = new DatosBasicosBLL();
     
         [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vTIPOSPROC> GetvModalidad()
        {
            
            IList<vTIPOSPROC> lEp = ep.GetvModalidad();
            return lEp;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vTIPOSCONT> GetvTIPOSCONT()
        {
            
            IList<vTIPOSCONT> lEp = ep.GetvTIPOSCONT();
            return lEp;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vSUBTIPOS> GetvSUBTIPOS(string cod_tip)
        {
            
            IList<vSUBTIPOS> lEp = ep.GetvSUBTIPOS(cod_tip);
            return lEp;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vDEPENDENCIA> GetvDEPENDENCIAD()
        {
            string ide_ter = Usuario.UserName;
            
            IList<vDEPENDENCIA> lEp = ep.GetvDEPENDENCIAD();
            return lEp;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vDEPENDENCIA> GetvDEPENDENCIA()
        {
            string ide_ter = Usuario.UserName;
            
            IList<vDEPENDENCIA> lEp = ep.GetvDEPENDENCIA();
            return lEp;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vTerceros GetvTercerosPk(string ide_ter)
        {
            
            vTerceros t = ep.GetTercerosPk(ide_ter);
            return t;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string GetNomTercerosPk(string ide_ter)
        {

            vTerceros t = ep.GetTercerosPk(ide_ter);
            return t == null ? "0" : t.NOMBRE;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetTerceros()
        {
            
            return ByAUtil.convertListToXML(ep.GetTerceros()); ;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vTerceros> GetvFuncionariosP(string cod_dep)
        {
            string ide_ter = Usuario.UserName;
            
            IList<vTerceros> lEp = ep.GetFuncionarios(cod_dep);
            return lEp;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vVIGENCIAS> GetvVigencias()
        {
            return ep.GetvVIGENCIAS();
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vTIP_DOC> GetTIPOSDOC()
        {
            return ep.GetTIPOSDOC();        
        }


        #region COMBOS
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vEP_CARGO> GetvEP_CARGO()
        {
            
            IList<vEP_CARGO> lEp = ep.GetvEP_CARGO("2013");
            return lEp;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vDEPENDENCIA> GetvDEPENDENCIAXU()
        {
            string ide_ter = Usuario.UserName;
            
            IList<vDEPENDENCIA> lEp = ep.GetvDEPENDENCIA(ide_ter);
            return lEp;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vDEPENDENCIA> GetvDEPENDENCIAT()
        {
            
            IList<vDEPENDENCIA> lEp = ep.GetvDEPENDENCIA();
            return lEp;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vTIPO_PLAZOS> GetvTIPO_PLAZOS2(string cod_tpla)
        {
            
            IList<vTIPO_PLAZOS> lEp = ep.GetvTIPO_PLAZOS(cod_tpla);
            return lEp;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vTIPO_PLAZOS> GetvTIPO_PLAZOS()
        {
            IList<vTIPO_PLAZOS> lEp = ep.GetvTIPO_PLAZOS();
            return lEp;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vPOLIZAS> GetPOLIZAS()
        {
            EstudiosPreviosBL ep = new EstudiosPreviosBL();
            IList<vPOLIZAS> lEp = ep.GetPOLIZAS();
            return lEp;
            //return ByAUtil.convertListToXML(lEp);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetProyectos(string filtro)
        {
            EstudiosPreviosBL ep = new EstudiosPreviosBL();
            IList<vProyectos> lt = ep.GetProyectos(filtro);
            return ByAUtil.convertListToXML(lt);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vTIPO_PAGO> GetTIPO_PAGO()
        {
            EstudiosPreviosBL ep = new EstudiosPreviosBL();
            return ep.GetTIPO_PAGO();
        }
        
        #endregion

    }
}
