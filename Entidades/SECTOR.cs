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
    public partial class SECTOR
    {
        public SECTOR()
        {
            this.CONTRATOS = new HashSet<CONTRATOS>();
            this.MOD_CONTRATOS = new HashSet<MOD_CONTRATOS>();
        }
    
        public string COD_SEC { get; set; }
        public string NOM_SEC { get; set; }
        public string ESTADO { get; set; }
    
        public virtual ICollection<CONTRATOS> CONTRATOS { get; set; }
        public virtual ICollection<MOD_CONTRATOS> MOD_CONTRATOS { get; set; }
    }
    
}