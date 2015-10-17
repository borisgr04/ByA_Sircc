using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Financiero
{
    public class SF_OP
    {
        public decimal VIGENCIA { get; set; }
        public decimal NUM_ORDEN { get; set; }
        public string NRO_FACTURA { get; set; }
        public Nullable<decimal> VAL_TOTAL { get; set; }
        public Nullable<decimal> VAL_NETO { get; set; }
        public Nullable<decimal> VAL_PAGADO { get; set; }
        public string ESTADO_ORDEN { get; set; }
        public System.DateTime FEC_RADICACION { get; set; }
        public Nullable<System.DateTime> FEC_PENDIENTE { get; set; }
        public Nullable<System.DateTime> FEC_APROBACION { get; set; }
        public Nullable<System.DateTime> FEC_CAUSACION { get; set; }
        public Nullable<System.DateTime> FEC_PROGPAGO { get; set; }
        public Nullable<decimal> NUM_EGRESO { get; set; }
        public string CLS_EGRESO { get; set; }
        public Nullable<System.DateTime> FEC_EGRESO { get; set; }
        public string NIT { get; set; }
        public string ANTICIPO { get; set; }
        public string AMORTIZA { get; set; }
        public string FIDUCIA { get; set; }
        public string MULTIPLES_PAGO { get; set; }
        public decimal VAL_AMORTIZADO { get; set; }
    }
}
