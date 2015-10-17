using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Financiero1.Entidades
{
    public class vEP_RUBROS_CDP_DTO
    {
        public decimal ID { get; set; }
        public Nullable<decimal> ID_EP { get; set; }
        public string COD_RUB { get; set; }
        public Nullable<decimal> VALOR { get; set; }
        public string NRO_CDP { get; set; }
        public Nullable<short> VIG_CDP { get; set; }
        public Nullable<int> GRUPO { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USAP_REG { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public string USAP_MOD { get; set; }
        public Nullable<decimal> ID_EP_CDP { get; set; }
        public string NOM_RUB { get; set; }
        public string COD_UNIDAD { get; set; }
        public string COD_RECURSO { get; set; }
        public string CLASE { get; set; }
    }
}
