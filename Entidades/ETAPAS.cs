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
    public partial class ETAPAS
    {
        public ETAPAS()
        {
            this.TIP_DOC = new HashSet<TIP_DOC>();
        }
    
        public string COD_ETA { get; set; }
        public string NOM_ETA { get; set; }
        public string ESTADO { get; set; }
        public string PROCESO { get; set; }
    
        public virtual ICollection<TIP_DOC> TIP_DOC { get; set; }
    }
    
}
