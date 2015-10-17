using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vEP_PAA
    {
        public int ID { get; set; }
        public Nullable<short> VIGENCIA { get; set; }
        public string DESCRIPCION { get; set; }
        public Nullable<System.DateTime> FEC_EST_INI { get; set; }
        public Nullable<decimal> PLA1_EJE { get; set; }
        public string TIP1_PLA { get; set; }
        public Nullable<decimal> PLA2_EJE { get; set; }
        public string TIP2_PLA { get; set; }
        public string MOD_SEL { get; set; }
        public string FUE_SEL { get; set; }
        public Nullable<decimal> VAL_TOT_EST { get; set; }
        public Nullable<decimal> VAL_VIG_EST { get; set; }
        public string VIG_FUT { get; set; }
        public string EST_SOL_VF { get; set; }
        public string DAT_RESPONSABLE { get; set; }
        public string COD_DEP { get; set; }
        public Nullable<decimal> ID_EP_MPAA { get; set; }
        public List<vEP_PAA_UNSPSC> lCODIGOS_UNSPSC { get; set; }
    }
}
