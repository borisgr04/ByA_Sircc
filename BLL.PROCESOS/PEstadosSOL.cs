using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.PROCESOS
{
    public class PEstadosSOL
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }

        public static IList<PEstadosSOL> GetEstadosSol()
        {
            IList<PEstadosSOL> lstEstados = new List<PEstadosSOL>();
            lstEstados.Add(new PEstadosSOL { Codigo = "SREC", Nombre = "Por Recibir" });
            lstEstados.Add(new PEstadosSOL { Codigo = "SREV", Nombre = "Pendientes" });
            lstEstados.Add(new PEstadosSOL { Codigo = "RECH", Nombre = "Rechazadas" });
            lstEstados.Add(new PEstadosSOL { Codigo = "ACEP", Nombre = "Aceptadas" });
            lstEstados.Add(new PEstadosSOL { Codigo = "SASI", Nombre = "Por Asignar" });
            return lstEstados;
        }
    }
}
