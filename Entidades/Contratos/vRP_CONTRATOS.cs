using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Contratos
{
    public class vRP_CONTRATOS
    {
        public string NRO_RP { get; set; }
        public string COD_CON { get; set; }
        public System.DateTime FEC_RP { get; set; }
        public short VIGENCIA { get; set; }
        public string DOC_SOP { get; set; }
        public Nullable<decimal> VAL_RP { get; set; }
        public Nullable<decimal> VAL_PAGO { get; set; }
        public string USAP { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USBD { get; set; }
        public string NRO_CDP { get; set; }

        public virtual ICollection<vRUBROS_CONTRATOS> RUBROS_CONTRATOS { get; set; }
    }
}
