using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vEP_CODIGOSUNSPSC
    {
        public string UNSPSC { get; set; }
        public string CODIGO { get; set; }
        public string NOMBRE { get; set; }
        public string NOMBRE_C { 
            get {
                return "["+CODIGO + "]-" + NOMBRE;
                } 
        }
        public string CLASIFICADOR { get; set; }
        public string PADRE { get; set; }
    }
}
