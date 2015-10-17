using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades;
using BLL;
using Entidades.Vistas;


namespace AgenteServicios
{
    public class CDPProxy
    {
        Entities ctx;
        public List<vEP_CDP_DTO> GetCDPsExt(string NRO_CDP)
        {
            DT_ParametrosBLL objDT_Par = new DT_ParametrosBLL();
            vDT_PARAMETROS parametro = objDT_Par.Get("API_CDP");

            string uri = parametro.VALOR;
            string enduri = NRO_CDP;
            var client = new RestClient(uri);
            var request = new RestRequest(enduri, Method.GET);

            List<vEP_CDP_DTO> queryResult;
            return queryResult = client.Execute<List<vEP_CDP_DTO>>(request).Data;
        }
    }
}
