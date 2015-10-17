using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.VistasPROC
{
    public class vPR_DB_CLAUSULAS
    {
        public decimal ID { get; set; }
        public Nullable<decimal> ID_PLA { get; set; }
        public string TIP_PLA { get; set; }
        public string CLA_TIT { get; set; }
        public Nullable<decimal> CLA_NUM { get; set; }
        public string CLA_CAM { get; set; }
        public string CLA_PAR { get; set; }
        public string CLA_TEXTO { get; set; }

        public string IS_MODIF { get; set; }
        
    }
}
