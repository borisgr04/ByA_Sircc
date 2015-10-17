using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public class vINT_CONTROL_DOC
    {
        public decimal ID { get; set; }
        public Nullable<int> IDACTA { get; set; }
        public Nullable<System.DateTime> FEC_REC { get; set; }
        public Nullable<System.DateTime> FEC_REC_SIS { get; set; }
        public string OBS_REC { get; set; }
        public string EST_DOC { get; set; }
        public string ETA_DOC { get; set; }
        public Nullable<System.DateTime> FEC_REV { get; set; }
        public string OBS_REV { get; set; }
        public string USAP_REC { get; set; }
        public string USAP_REV { get; set; }
        public string USAP_MOD { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public Nullable<System.DateTime> FEC_REV_SIS { get; set; }
        public Nullable<decimal> IDPADRE { get; set; }
        
        //public virtual ICollection<INT_CONTROL_DOC> INT_CONTROL_DOC1 { get; set; }
        //public virtual INT_CONTROL_DOC INT_CONTROL_DOC2 { get; set; }
    }

    public class vINT_CONTROL_DOCT : vINT_CONTROL_DOC
    {
        //DATOS ADICIONALES PARA MOSTRAR EN LISTA
        public Nullable<decimal> ID_TRAS { get; set; }
        public bool IS_TRAS { get; set; }
        public string COD_CON { get; set; }
        public string EST_FIN { get; set; }
        public System.DateTime FEC_ACT { get; set; }
        public Nullable<int> NRO_DOC { get; set; }
        public string NOM_ACTA { get; set; }
        public Nullable<decimal> VAL_PAGO { get; set; }
        public string CONTRATISTA { get; set; }
    }

    public class vINT_CONTROL_DOCT2 : vINT_CONTROL_DOC
    {
        //DATOS ADICIONALES PARA MOSTRAR EN LISTA
        public Nullable<decimal> ID_TRAS { get; set; }
        public bool IS_TRAS {get;set;}
        public string EST_TRA { get; set; }
        public string COD_CON { get; set; }
        public string EST_FIN { get; set; }
        public System.DateTime FEC_ACT { get; set; }
        public Nullable<int> NRO_DOC { get; set; }
        public string NOM_ACTA { get; set; }
        public Nullable<decimal> VAL_PAGO { get; set; }
        public string CONTRATISTA { get; set; }
    }
    
    
}
