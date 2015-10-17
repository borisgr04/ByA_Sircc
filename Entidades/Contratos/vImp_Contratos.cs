using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Contratos
{
   public class vImp_Contratos
    {
        public string COD_CON { get; set; }
        public string NRO_IMP { get; set; }
        public string NOM_IMP { get; set; }
        public string NRO_COM { get; set; }
        public Nullable<short> VIG_LIQ { get; set; }
        public Nullable<long> VAL_IMP { get; set; }
        public string COD_SOP { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USER_REG { get; set; }
        public Nullable<decimal> ID { get; set; }

        //public virtual CONTRATOS CONTRATOS { get; set; }
        //public virtual IMPUESTOS IMPUESTOS { get; set; }
    }
}
