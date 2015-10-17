using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.VistasPROC
{
   public class vDatosMinuta
    {
        public decimal ID { get; set; }
        public string OBJE_EP { get; set; }
        public Nullable<decimal> PLAZ1_EP { get; set; }
        public string TPLA1_EP { get; set; }
        public Nullable<decimal> PLAZ2_EP { get; set; }
        public string TPLA2_EP { get; set; }
        public string LUGE_EP { get; set; }
        public Nullable<decimal> VAL_ENT_EP { get; set; }
        public Nullable<decimal> VAL_OTR_EP { get; set; }
        public Nullable<decimal>  VALOR_TOTAL
        {
            get
            {
                return  (VAL_ENT_EP + VAL_OTR_EP);
            }
        }
       public string VALOR_TOTALC
        {
            get
            {
                return String.Format("{0:C}", VALOR_TOTAL); ;
            }
        }
       
        public string VAL_TOTAL_LETRAS { get; set; }
        
        public Nullable<decimal> PLIQ_EP { get; set; }
        public string PLIQ_LETRAS_EP { get; set; }
        public string DEP_NEC_EP { get; set; }
        public string TIP_CON_EP { get; set; }
        public string STIP_CON_EP { get; set; }
        public string DEP_SUP_EP { get; set; }
        public string CAR_SUP_EP { get; set; }
        public string VIG_EP { get; set; }
        public string CODIGO_EP { get; set; }
        public string MOD_SEL_EP { get; set; }
        public Nullable<decimal> NRO_EP { get; set; }
        public string DEP_DEL_EP { get; set; }
        public string CDP { get; set; }
        public string NOM_DEP_NEC_EP { get; set; }
        public string NOM_TIP_EP { get; set; }
        public string PLAZO_EP { get; set; }
        public string NOM_DEP_SUP_EP { get; set; }
        public string POLIZAS { get; set; }
        public string OBLIGACIONESC { get; set; }
        public string OBLIGACIONESE { get; set; }
        public string CLASE_CONT { get; set; }

        public string sFORMA_PAGO { get; set; }
       
    }
    

}
