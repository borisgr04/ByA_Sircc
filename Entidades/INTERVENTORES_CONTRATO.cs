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
    public partial class INTERVENTORES_CONTRATO
    {
        public string IDE_INT { get; set; }
        public string COD_CON { get; set; }
        public string TIP_INT { get; set; }
        public string USUARIO { get; set; }
        public System.DateTime FEC_REG { get; set; }
        public string EST_INT { get; set; }
        public string OBS_INT { get; set; }
        public string COD_CON_INT { get; set; }
        public decimal IDE { get; set; }
    
        public virtual CONTRATOS CONTRATOS { get; set; }
        public virtual TERCEROS TERCEROS { get; set; }
    }
    
}
