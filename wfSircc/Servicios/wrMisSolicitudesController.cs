using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL.Solicitudes;
using BLL.Solicitudes.Vistas;
using Sircc4.Clases;

namespace wfSircc.Servicios
{
    public class wrMisSolicitudesController : ApiController
    {
        // GET api/<controller>
        //public IEnumerable<vPSolicitudes> Get()
        //{
        //    PSolicitudesBLL epBLL = new PSolicitudesBLL();
        //    string username = Usuario.UserName;
        //    return epBLL.GetMisSolicitudes(username);
            
        //}

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}