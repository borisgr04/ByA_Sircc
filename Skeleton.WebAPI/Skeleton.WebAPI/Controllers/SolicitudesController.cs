using BLL;
using BLL.PROCESOS;
using BLL.PROCESOS.ConsultaT.Actividades;
using Entidades;
using Entidades.VistasPROC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Security;
using ByA;
using System.Web.Http.Description;
using System.Threading.Tasks;

namespace Skeleton.WebAPI
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    //[Authorize]
    [RoutePrefix("api/v1/Solicitudes")]
    public class SolicitudesController : ApiController
    {
        #region RECIBIRSOLICITUDES
        [Route("{Usuario}/{Vigencia}/{Estado}")]
        /*Estados ->[ 
             * "SREC", Sin Recibir
             * "SREV", Sin Revisar
             * "RECH", Rechazadas
             * "ACEP", Aceptadas
             * ]
        */
        public List<vPSolicitudes> GetMisSolicitudes(string Usuario, short Vigencia, string Estado)
        {
            PSolicitudesBLL epBLL = new PSolicitudesBLL();
            return epBLL.GetMisSolicitudes(Usuario, Estado, Vigencia);
        }
        //var hr = {};
        //hr.IDE = Solicitudes.ID_HREV;
        //hr.OBS_RECIBIDO_ABOG = $("#txtObsRc").val();
        //var jsonData = "{'hr':" + JSON.stringify(hr) + "}";
        [Route("Recibido")]
        [HttpPost]
        public ByARpt PostRecibir(vHRevisado hr)
        {
            PSolicitudesBLL epBLL = new PSolicitudesBLL();
            return epBLL.Recibir(hr.IDE, hr.OBS_RECIBIDO_ABOG);
        }
        #endregion

        #region REVISARSOLICITUDES
        //var hr = {};
        //hr.CONCEPTO_REVISADO = $("#cboConceptoRv").val();
        //hr.OBS_REVISADO = $("#txtObsRv").val();
        //hr.IDE = Solicitudes.ID_HREV;
        //var jsonData = "{'hr':" + JSON.stringify(hr) + "}";
        [Route("Revision")]
        [HttpPost]
        public ByARpt PostRevisar(vHRevisado hr)
        {
            PSolicitudesBLL epBLL = new PSolicitudesBLL();
            return epBLL.Revisar(hr);
        }

        [Route("ProximoNum/{CodSol}")]
        [HttpGet]
        public string GetProximoNumxMod(string CodSol)
        {
            PSolicitudesBLL epBLL = new PSolicitudesBLL();
            return epBLL.GetProximoNumxMod(CodSol);
        }
        #endregion

    }
}
