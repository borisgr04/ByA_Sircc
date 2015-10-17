using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public class vACTASCONTRATO
    {
        public int ID { get; set; }
        public string COD_CON { get; set; }
        public string EST_INI { get; set; }
        public string EST_FIN { get; set; }
        public System.DateTime FEC_ACT { get; set; }
        public string OBS_EST { get; set; }
        public string ESTADO { get; set; }
        public Nullable<int> NRO_DOC { get; set; }
        public string NOM_ACTA { get; set; }
        public string USUARIO { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public Nullable<decimal> VAL_PAGO { get; set; }
        public decimal IDE_INF { get; set; }
        public decimal ID_CTRDOC { get; set; }
        public Nullable<decimal> POR_EJE_FIS { get; set; }

        public virtual vINT_CONTROL_DOC INT_CONTROL_DOC1 { get; set; }
    }
}
