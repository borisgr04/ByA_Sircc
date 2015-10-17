using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public class vRP_ContratosOP
    {
        public string NRO_RP { get; set; }
        public string COD_CON { get; set; }
        public System.DateTime FEC_RP { get; set; }
        public short VIGENCIA { get; set; }
        public string DOC_SOP { get; set; }
        public Nullable<decimal> VAL_RP { get; set; }
        public Nullable<decimal> VAL_PAGO { get; set; }
        public string VIG_CDP { get; set; }
        public string NRO_CDP { get; set; }
        public string VIG_OP { get; set; }
        public string NRO_OP { get; set; }
        public Nullable<System.DateTime> FEC_OP { get; set; }
        public Nullable<decimal> VAL_OP { get; set; }
        public string NRO_EGR { get; set; }
        public Nullable<System.DateTime> FEC_EGR { get; set; }
        public Nullable<decimal> ID_DC { get; set; }
    }
}
