using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vEP_MPAA
    {
        public decimal ID { get; set; }
        public Nullable<short> VIGENCIA { get; set; }
        public string OBSERV { get; set; }
        public Nullable<System.DateTime> FEC_INI { get; set; }
        public Nullable<System.DateTime> FEC_FIN { get; set; }
        public string ESTADO { get; set; }
        public string COD_SECOP { get; set; }
    }
}
