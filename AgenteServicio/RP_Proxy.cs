using BLL;
using Entidades;
using Entidades.Contratos;
using Entidades.Vistas;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgenteServicio
{
    public  class RP_Proxy
    {
        public List<object> GetRPsExt(string NRO_RP, string VIGENCIA)
        {
            DT_ParametrosBLL objDT_Par = new DT_ParametrosBLL();
            vDT_PARAMETROS parametro = objDT_Par.Get("API_RP");

            string uri = parametro.VALOR;
            string enduri = NRO_RP + "/" + VIGENCIA;
            var client = new RestClient(uri);
            var request = new RestRequest(enduri, Method.GET);

            List<object> queryResult = client.Execute<List<object>>(request).Data;
            return queryResult;
        }
    }
}
