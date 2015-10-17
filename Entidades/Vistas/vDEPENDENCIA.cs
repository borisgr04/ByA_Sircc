using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public class vDEPENDENCIA
    {        
        public string COD_DEP { get; set; }
        public string NOM_DEP { get; set; }
        public string DEP_DEL { get; set; }
        public string DEP_ABR { get; set; }
        public string IDE_TER { get; set; }
        public string NORMA_DEL { get; set; }
        public string ESTADO { get; set; } // VOY POR AQUI
        public string EMAIL { get; set; }
        public string CARGO_ENC { get; set; }
        public string INT_PRO { get; set; }

        public string NOM_DEP_DEL
        {
            get
            {
                return DEP_DEL == "S" ? "SI" : "NO";
            }
        }
        public string NOM_ESTADO
        {
            get
            {
                return ESTADO == "AC" ? "ACTIVO" : "INACTIVO";
            }
        }
        public string NOM_INT_PRO
        {
            get
            {
                return INT_PRO == "S" ? "SI" : "NO";
            }
        }
    }
}
