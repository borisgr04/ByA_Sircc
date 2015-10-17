using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public partial class vEP_CLAUSULAS
    {
        public decimal ID { get; set; }
        public Nullable<decimal> ID_PLA { get; set; }
        public string TIP_PLA { get; set; }
        public string CLA_TIT { get; set; }
        public Nullable<decimal> CLA_NUM { get; set; }
        public string CLA_CAM { get; set; }
        public string CLA_PAR { get; set; }
        public string CLA_TEXTO { get; set; }
        public Nullable<decimal> IDE_PMIN { get; set; }
        public string TIP_PAR { get; set; }
        public string IS_ENTER_FINAL { get; set; }
        public Nullable<short> ORDEN { get; set; }
        public Nullable<decimal> ID_EP { get; set; }
        public string CLA_CRUZADA { get; set; }
        public string TITULO
        {
            get
            {
                if (TIP_PAR == "C")
                {
                    //return String.Format("CLÁUSULA NÚMERO {0}.-{1}", CLA_NUM.ToString(),CLA_TIT);
                    return String.Format("CLÁUSULA {0}.-{1}:", CLA_NUM, CLA_TIT);
                }
                else
                {
                    return CLA_TIT;
                }

            }
        }
        
//        public virtual ESTPREV ESTPREV { get; set; }
    }

    public partial class vEP_CLAUSULAS_DTO : vEP_CLAUSULAS
    {

        public bool ES_NUEVO { get; set; }
        public bool ES_ANULAR { get; set; }
        public bool ES_MODIF { get; set; }

    }

}
