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
    public partial class EP_ESPTEC
    {
        public string DESC_ITEM { get; set; }
        public Nullable<decimal> CANT_ITEM { get; set; }
        public string UNI_ITEM { get; set; }
        public Nullable<decimal> VAL_UNI_ITEM { get; set; }
        public Nullable<decimal> PORC_IVA { get; set; }
        public decimal ID { get; set; }
        public string USAP_REG { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USAP_MOD { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public Nullable<decimal> ID_EP { get; set; }
        public Nullable<short> GRUPO { get; set; }
    
        public virtual EP_DT_UNIDADES EP_DT_UNIDADES { get; set; }
        public virtual ESTPREV ESTPREV { get; set; }
    }
    
}