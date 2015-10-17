using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Solicitudes.Vistas
{
    public class vHRevisado
    {
        public string COD_SOL { get; set; }
        public Nullable<System.DateTime> FECHA_RECIBIDO { get; set; }
        public Nullable<System.DateTime> FEC_REC_ABOG { get; set; }
        public string RECIBIDO_ABOG { get; set; }
        public string OBS_RECIBIDO_ABOG { get; set; }
        public Nullable<System.DateTime> FECHA_REVISADO { get; set; }
        public string OBS_REVISADO { get; set; }
        public string CONCEPTO_REVISADO { get; set; }
        public Nullable<decimal> ID_HREV { get; set; }
        public string NIT_ABOG_RECIBE { get; set; }
        public string OBSERVACION_RECIBIDO { get; set; }
        public Nullable<System.DateTime> FEC_ASIGNADO { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USAP { get; set; }
        public string HOBS_REVISADO { get; set; }
        public decimal IDE { get; set; }
    }
}
