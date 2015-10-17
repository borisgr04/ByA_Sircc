using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.PROCESOS;
using BLL.PROCESOS.ConsultaT.Actividades;
using Entidades.VistasPROC;
using ByA;
using Entidades;
using Entidades.Notificaciones;
using RestSharp;
using Newtonsoft.Json;

namespace CSendNotificaciones
{
    class Program
    {
        static void Main(string[] args)
        {
            SendPush objSend = new SendPush();
            int idProyect = 1;
            List<notificacionDto> lNot = objSend.ListaNotificacionesActividades();
            foreach (notificacionDto item in lNot)
            {
                item.idproyect = idProyect;
            }
            IRestResponse i = Create<notificacionDto>(lNot, "Notificaciones/EnviarNotificaciones");
        }


        public static IRestResponse Create<T>(object objectToUpdate, string apiEndPoint) where T : new()
        {
            var client = new RestClient("http://localhost:8197/api")
            {
            };
            var json = JsonConvert.SerializeObject(objectToUpdate);
            var request = new RestRequest(apiEndPoint, Method.POST);
            request.AddParameter("text/json", json, ParameterType.RequestBody);
            var response = client.Execute<T>(request);
            return response;
        }
    }    
}
