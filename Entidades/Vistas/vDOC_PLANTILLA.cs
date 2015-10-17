using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vDOC_PLANTILLA
    {
        public decimal ID { get; set; }
        public string NRO_DOC { get; set; }
        public string COD_TIP { get; set; }
        public string TITULO { get; set; }
        public Nullable<System.DateTime> FEC_REV { get; set; }
        public string NRO_REV { get; set; }
        public string EST_DOC { get; set; }
        public Nullable<System.DateTime> FEC_DOC { get; set; }
        public string NUM_PROC { get; set; }
        public decimal ID_PLA { get; set; }
        public string COMPLETADO { get; set; }

        public string NOM_COD_TIP { get; set; }
        public List<vDOC_SECCIONES> lSecciones { get; set; }
    }
}
