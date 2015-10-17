using BLL.Financiero1;
using BLL.Financiero1.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiCDPs.Controllers
{
    [RoutePrefix("api/rp")]
    public class RPsController : ApiController
    {
        [Route("{NRO_RP}/{VIGENCIA}")]
        public vRP_CONTRATOS Get(string NRO_RP, string VIGENCIA)
        {
            mRP obj = new mRP();
            vRP_CONTRATOS rp = new vRP_CONTRATOS();
            rp = obj.Get(NRO_RP, VIGENCIA);
            return rp;
        }
    }
}
