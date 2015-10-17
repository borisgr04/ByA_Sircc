using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public class vEP_Proyectos
    {
        public decimal ID_EP { get; set; }
        public string COD_PRO { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USAP_REG { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public string USAP_MOD { get; set; }

        public string NOMBRE_PROYECTO { get; set; }
        public string ES_NUEVO { get; set; }
        public string ES_ANULAR { get; set; }
        public string ES_MODIF { get; set; }
    }

    public class vEP_ProyectosDTO
    {
        public decimal ID_EP { get; set; }
        public string COD_PRO { get; set; }
        public string NOMBRE_PROYECTO { get; set; }
        public bool ES_NUEVO { get; set; }
        public bool ES_ANULAR { get; set; }
        public bool ES_MODIF { get; set; }
        public decimal ID { get; set; }
    }


    public class vProyectos
    {
        public string Nro_Proyecto { get; set; }
        public string Nombre_Proyecto { get; set; }
        public string NECESIDAD { get; set; }
    }
}
