using BLL.PROCESOS;
using Entidades.VistasPROC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Skeleton.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/v1/Horas")]
    public class HorasController : ApiController
    {
        // GET api/v1/Horas
        [Route("")]
        public IEnumerable<vHoras> Get()
        {
            ProcesosDB bll = new ProcesosDB();

            List<vHoras> lst = bll.GetHoras();

            return lst;
        }

    }
}
