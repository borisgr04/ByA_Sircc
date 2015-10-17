using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Contratos
{
    public class vAseguradoras
    {
        //   public ASEGURADORAS()
        //{
        //    this.POLIZAS_CONTRATO = new HashSet<POLIZAS_CONTRATO>();
        //    this.POLIZAS_ADICIONES = new HashSet<POLIZAS_ADICIONES>();
        //}
    
        public int COD_ASE { get; set; }
        public string NOM_ASE { get; set; }
        public string ESTADO { get; set; }
    
        //public virtual ICollection<POLIZAS_CONTRATO> POLIZAS_CONTRATO { get; set; }
        //public virtual ICollection<POLIZAS_ADICIONES> POLIZAS_ADICIONES { get; set; }
    }
}
