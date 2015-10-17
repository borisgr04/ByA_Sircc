using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Contratos
{
    public class vPolizas_Contrato
    {

        public string COD_CON { get; set; }
        public int COD_POL { get; set; }
        public int COD_ASE { get; set; }
        public string NOM_POL { get; set; }
        public string NOM_ASE { get; set; }
        public decimal VAL_POL { get; set; }
        public System.DateTime FEC_POL { get; set; }
        public string NRO_POL { get; set; }
        public int ID_POL { get; set; }
        public string TIP_POL { get; set; }
        public string NRO_POL_AUX { get; set; }
        public Nullable<System.DateTime> FEC_INI { get; set; }

        //public virtual ASEGURADORAS ASEGURADORAS { get; set; }
        //public virtual CONTRATOS CONTRATOS { get; set; }
        //public virtual POLIZAS POLIZAS { get; set; }
    }
}
