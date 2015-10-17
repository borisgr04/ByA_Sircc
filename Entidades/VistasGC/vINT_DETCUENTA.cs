using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public class vINT_DETCUENTA
    {
        public decimal ID { get; set; }
        public int IDACTA { get; set; }
        public string NRO_RP { get; set; }
        public string NRO_OP { get; set; }
        public Nullable<decimal> VAL_OP { get; set; }
        public Nullable<System.DateTime> FEC_OP { get; set; }
        public Nullable<System.DateTime> FEC_CAU { get; set; }
        public string NRO_EGR { get; set; }
        public Nullable<System.DateTime> FEC_EGR { get; set; }
        public string EST_EGR { get; set; }
        public Nullable<short> VIG_RP { get; set; }

        //public virtual ESTCONTRATOS ESTCONTRATOS { get; set; }
        //public virtual RP_CONTRATOS RP_CONTRATOS { get; set; }
    }
}
