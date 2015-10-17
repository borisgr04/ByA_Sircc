using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Contratos
{
    public class vImpuestos
    {
        //  public IMPUESTOS()
        //{
        //    this.IMP_CONTRATOS = new HashSet<IMP_CONTRATOS>();
        //}
    
        public string NRO_IMP { get; set; }
        public string NOM_IMP { get; set; }
        public Nullable<int> COD_PCT { get; set; }
        public string ESTADO { get; set; }
    
        //public virtual ICollection<IMP_CONTRATOS> IMP_CONTRATOS { get; set; }
    }
}
