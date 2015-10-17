using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vDOC_SECCIONES
    {
        public decimal ID { get; set; }
        public Nullable<decimal> ID_DOC { get; set; }
        public string HTML { get; set; }
        public string CRUZADO { get; set; }

        public bool ES_NUEVO { get; set; }
    }
}
