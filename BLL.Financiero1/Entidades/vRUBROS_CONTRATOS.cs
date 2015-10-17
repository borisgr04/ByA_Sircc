using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Financiero1.Entidades
{
    public class vRUBROS_CONTRATOS
    {
        public string COD_RUB { get; set; }
        public string COD_CON { get; set; }
        public string NOM_RUB { get; set; }
        public Nullable<decimal> VAL_COMPROMISO { get; set; }
        public string NRO_RP { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USBD { get; set; }
        public Nullable<short> VIGENCIA { get; set; }
        public decimal ID { get; set; }
    }
}
