//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace Entidades
{
    public partial class INT_PAGOSST
    {
        public string COD_CON { get; set; }
        public string TIPO_PLA { get; set; }
        public string PLANILLAN { get; set; }
        public Nullable<decimal> VAL_SALUD { get; set; }
        public Nullable<decimal> VAL_PENSION { get; set; }
        public Nullable<decimal> VAL_RIESGOS { get; set; }
        public Nullable<decimal> VAL_PARAF { get; set; }
        public string MES_PAGO { get; set; }
        public string YEAR_PAGO { get; set; }
        public Nullable<decimal> NRO_DOC { get; set; }
        public decimal ID { get; set; }
        public string USAP { get; set; }
        public string USBD { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string OBS { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public string USBDM { get; set; }
        public string USAPM { get; set; }
        public string ESTADO { get; set; }
        public Nullable<decimal> IDE_INF { get; set; }
    
        public virtual CONTRATOS CONTRATOS { get; set; }
        public virtual INT_INFOCONT INT_INFOCONT { get; set; }
    }
    
}
