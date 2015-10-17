using BLL;
using Entidades;
using Entidades.Vistas;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgenteServicio
{
    public class CDP_Proxy
    {
        public List<vEP_CDP_DTO> GetCDPsExt(string NRO_CDP)
        {
            DT_ParametrosBLL objDT_Par = new DT_ParametrosBLL();
            vDT_PARAMETROS parametro = objDT_Par.Get("API_CDP");

            string uri = parametro.VALOR;
            string enduri = NRO_CDP;
            var client = new RestClient(uri);
            var request = new RestRequest(enduri, Method.GET);

            List<vEP_CDP_DTO> queryResult = client.Execute<List<vEP_CDP_DTO>>(request).Data;
            return queryResult;
        }
    }
}
