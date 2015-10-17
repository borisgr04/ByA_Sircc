using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.VistasGC
{
    public class vACTAPARCIAL : vACTASCONTRATO
    {

        //public Nullable<System.DateTime> FEC_FIN { get; set; }
        public Nullable<decimal> POR_EJE_FIS { get; set; }
        //public Nullable<System.DateTime> FEC_FIN { get; set; }
        public Nullable<System.DateTime> FEC_PINI { get; set; }
        public Nullable<System.DateTime> FEC_PFIN { get; set; }
        public Nullable<int> NVIS_PER { get; set; }
        public Nullable<decimal> POR_EJE_FIS_PER { get; set; }

        public Nullable<decimal> SALDO_PER { get; set; }
        public Nullable<decimal> SAL_ANT { get; set; }

        public string CLA_DOC { get; set; }
        public string EST_DOC { get; set; }
    }


    public class vActaParcialDto : vACTASCONTRATO
    {
        public int ID_ACTA { get; set; }
        public Nullable<System.DateTime> FEC_PINI { get; set; }
        public Nullable<System.DateTime> FEC_PFIN { get; set; }
        public string AUT_PAG { get; set; }
        public Nullable<decimal> VAL_AUT { get; set; }
        public string USAP { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public string USAP_MOD { get; set; }
    }
}
