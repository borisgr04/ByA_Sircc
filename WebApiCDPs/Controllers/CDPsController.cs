using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL.Financiero1;
using BLL.Financiero1.Entidades;


namespace WebApiCDPs.Controllers
{
    [RoutePrefix("api/cdp")]
    public class CDPsController : ApiController
    {
        [Route("{ID}")]
        public vEP_CDP_DTO Get(string ID)
        {
            mCDP obj = new mCDP();
            return obj.Get(ID);
        }
    }
}
