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
    public partial class ASEGURADORAS
    {
        public ASEGURADORAS()
        {
            this.POLIZAS_CONTRATO = new HashSet<POLIZAS_CONTRATO>();
            this.POLIZAS_ADICIONES = new HashSet<POLIZAS_ADICIONES>();
            this.PPROPONENTESS = new HashSet<PPROPONENTESS>();
        }
    
        public int COD_ASE { get; set; }
        public string NOM_ASE { get; set; }
        public string ESTADO { get; set; }
    
        public virtual ICollection<POLIZAS_CONTRATO> POLIZAS_CONTRATO { get; set; }
        public virtual ICollection<POLIZAS_ADICIONES> POLIZAS_ADICIONES { get; set; }
        public virtual ICollection<PPROPONENTESS> PPROPONENTESS { get; set; }
    }
    
}
