using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.VistasPROC
{
    public  class vPCONTRATOS{
        public string PRO_SEL_NRO { get; set; }
        public string IDE_CON { get; set; }
        public string OBJ_CON { get; set; }
        public string PRO_CON { get; set; }
        public int PLA_EJE_CON { get; set; }
        public string DEP_CON { get; set; }
        public string DEP_PCON { get; set; }
        public short VIG_CON { get; set; }
        public string TIP_CON { get; set; }
        public string STIP_CON { get; set; }
        public decimal VAL_CON { get; set; }
        public decimal VAL_APO_GOB { get; set; }
        public string COD_SEC { get; set; }
        public string TIP_FOR { get; set; }
        public string OTR_CNS { get; set; }
        public string NRO_PLA_CON { get; set; }
        public string IDE_REP { get; set; }
        public string URG_MAN { get; set; }
        public string EST_CONV { get; set; }
        public string APL_GAC { get; set; }
        public string EST_CON { get; set; }
        public string COD_CON { get; set; }
        public Nullable<int> NRO_CON { get; set; }
        public string USUARIO { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USBD { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public string LUG_EJE { get; set; }
        public string USUENCARGADO { get; set; }
        public Nullable<System.DateTime> FECHAASIG { get; set; }
        public Nullable<System.DateTime> FECHARECIBIDO { get; set; }
        public string NUM_SOL { get; set; }
        public string COD_TPRO { get; set; }
        public string ESTADO { get; set; }
        public string TIPO_PLAZO { get; set; }
        public Nullable<int> NUMGRUPOS { get; set; }

        public string DEP_CON_NOM { get; set; }
        public string DEP_PCON_NOM { get; set; }
        public string TIP_CON_NOM { get; set; }
        public string STIP_CON_NOM { get; set; }
        public string COD_TPRO_NOM { get; set; }
        public string NOM_ABOG_ENC { get; set; }
        
        public string NOM_EST_PROC { get; set; }

        public string CLASE
        {
            get
            {
                return TIP_CON_NOM + " " + STIP_CON_NOM;
            }
        }

        public int ACT_HOY { get; set; }
        public int ACT_VENCIDAS { get; set; }
        public int ACT_POR_VENCER { get; set; }
        
        public int ACT_EN_ESPERA { get; set; }
        public int ACT_EN_CURSO { get; set; }

        public int ACT_APLAZADAS { get; set; }
        public int ACT_COMPLETADAS { get; set; }
        

        
    }
    
}
