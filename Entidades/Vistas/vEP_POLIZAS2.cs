using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public partial class vEP_POLIZAS2
    {
        public decimal ID { get; set; }
        public Nullable<int> COD_POL { get; set; }
        public string DES_POL { get; set; }
        public string PLA_POL { get; set; }
        public string VAL_POL { get; set; }
        public Nullable<int> GRUPO { get; set; }
        public Nullable<decimal> ID_EP { get; set; }

        public string NOM_POL { get; set; }
        //public virtual ESTPREV ESTPREV { get; set; }
        //public virtual POLIZAS POLIZAS { get; set; }
    }

    public partial class vEP_POLIZAS2_DTO : vEP_POLIZAS2
    {
        
        public bool ES_NUEVO { get; set; }
        public bool ES_ANULAR { get; set; }
        public bool ES_MODIF { get; set; }
        
    }
    
}
