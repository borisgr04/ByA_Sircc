using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Contratos
{
    public class vCesiones
    {

        public string NIT_ANT { get; set; }
        public string NIT_NUE { get; set; }
        public Nullable<int> PLA_CES { get; set; }
        public Nullable<int> VAL_CES { get; set; }
        public Nullable<System.DateTime> FEC_CES { get; set; }
        public string RES_AUT { get; set; }
        public string COD_CON { get; set; }
        public Nullable<System.DateTime> FEC_RES { get; set; }

        //public virtual CONTRATOS CONTRATOS { get; set; }
    }
}
