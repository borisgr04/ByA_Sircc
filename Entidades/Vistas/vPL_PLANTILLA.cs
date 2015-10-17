using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vPL_PLANTILLA
    {
        public decimal ID { get; set; }
        public string COD_TIP { get; set; }
        public string TITULO { get; set; }
        public Nullable<System.DateTime> FEC_REV { get; set; }
        public string NRO_REV { get; set; }
        public string EST_PLA { get; set; }
        public Nullable<decimal> DOC_MAX { get; set; }

        public List<vPL_SECCIONES> lSecciones { get; set; }

        public string NOM_COD_TIP { get; set; }
    }
}
