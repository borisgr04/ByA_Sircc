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
    public partial class INT_DETTRASLADO
    {
        public decimal ID { get; set; }
        public Nullable<decimal> ID_TRASLADO { get; set; }
        public Nullable<decimal> ID_CTRDOC { get; set; }
        public string EST_TRA { get; set; }
        public Nullable<decimal> ID_CTRDOC2 { get; set; }
    
        public virtual INT_CONTROL_DOC INT_CONTROL_DOC { get; set; }
        public virtual INT_CONTROL_DOC INT_CONTROL_DOC1 { get; set; }
        public virtual INT_TRASLADOS INT_TRASLADOS { get; set; }
    }
    
}
