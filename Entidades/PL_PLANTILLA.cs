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
    public partial class PL_PLANTILLA
    {
        public PL_PLANTILLA()
        {
            this.DOC_PLANTILLA = new HashSet<DOC_PLANTILLA>();
            this.PL_SECCIONES = new HashSet<PL_SECCIONES>();
        }
    
        public decimal ID { get; set; }
        public string COD_TIP { get; set; }
        public string TITULO { get; set; }
        public Nullable<System.DateTime> FEC_REV { get; set; }
        public string NRO_REV { get; set; }
        public string EST_PLA { get; set; }
        public Nullable<decimal> DOC_MAX { get; set; }
    
        public virtual ICollection<DOC_PLANTILLA> DOC_PLANTILLA { get; set; }
        public virtual PL_TIPOS_PLANTILLA PL_TIPOS_PLANTILLA { get; set; }
        public virtual ICollection<PL_SECCIONES> PL_SECCIONES { get; set; }
    }
    
}
