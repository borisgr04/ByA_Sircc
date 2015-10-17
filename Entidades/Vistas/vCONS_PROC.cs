using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vCONS_PROC
    {
        public short VIGENCIA { get; set; }
        public string DEP_DEL { get; set; }
        public string TIP_PROC { get; set; }
        public string NOMBRE_DEP_DEP { get; set; }
        public string NOMBRE_TIP_PROC { get; set; }
        public Nullable<decimal> INICIAL { get; set; }
        public Nullable<decimal> SIGUIENTE { get; set; }

        public string ABR_NOM_DEP { get; set; }
        public string ABR_NOM_TIP_PROC { get; set; }
    }
}
