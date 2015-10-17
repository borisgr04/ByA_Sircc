using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vNROCONVIG
    {
        public short YEAR_VIG { get; set; }
        public string COD_TIP { get; set; }
        public Nullable<int> NRO_INI_CON { get; set; }
        public Nullable<int> NRO_ACT_CON { get; set; }
        public Nullable<decimal> POR_ADI_VIG { get; set; }

        public string NOM_COD_TIP { get; set; }
    }
}
