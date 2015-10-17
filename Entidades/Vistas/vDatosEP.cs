using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    
    /// <summary>
    /// Clase DTO para Mostrar Estudios Previos a Imprimir.
    /// </summary>
   public class vDatosEP 
    {
        public decimal ID { get; set; }
        public Nullable<System.DateTime> FEC_ELA_EP { get; set; }
        
        public string OBJE_EP { get; set; }
        public Nullable<decimal> PLAZ1_EP { get; set; }
        public string TPLA1_EP { get; set; }
        public Nullable<decimal> PLAZ2_EP { get; set; }
        public string TPLA2_EP { get; set; }
        public string LUGE_EP { get; set; }
        public Nullable<decimal> VAL_ENT_EP { get; set; }
        public Nullable<decimal> VAL_OTR_EP { get; set; }
        public string DILIGENCIADO_POR { get; set; }
        public string RESPONSABLE_EP { get; set; }
        public string sFORMA_PAGO { get; set; }

        public string sFEC_ELA_EP { 
            
                    get {
                        if (FEC_ELA_EP == null)
                        {
                            FEC_ELA_EP = DateTime.Now;
                        }
                        return FEC_ELA_EP.Value.ToShortDateString();
                    } 
        
        }

        public Nullable<decimal> VALOR_TOTAL
        {
            get
            {
                return (VAL_ENT_EP + VAL_OTR_EP);
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

        public string sBANCO_PROY { get; set; }
        public string LOGO { get; set; }
        public string EST_EP { get; set; }

       //Nuevos Campos 16/02/2015, Boris
        public string NEC_EP { get; set; }
        public string VAR_PPT_EP { get; set; }
        public string OBLIGGRC { get; set; }
        public string OBLIGGRE { get; set; }
        public string JUST_VALOR_EP { get; set; }
        public string CAP_JURIDICA_EP { get; set; }
        public string CAP_FINANCIERA_EP { get; set; }
        public string CAP_RESIDUAL_EP { get; set; }
        public string PERS_LEGAL_EP { get; set; }
        public string PERS_ORGA_EP { get; set; }
        public string CAP_EXPERIENCA_EP { get; set; }
        public string NEC_CONT_INT_EP { get; set; }
        public string SOM_ACUE_COMER_EP { get; set; }
        public string CONST_CUMP_DEBERES_EP { get; set; }
        public string IDE_SUP_EP { get; set; }
        public string NOM_SUP_EP { get; set; }

        public string TIPO_PPTO { get; set; }
        public string NOM_TIPO_PPTO { 
            get{
            return TIPO_PPTO=="F"?"Funcionamiento":"Inversión";
            }
        }
        public Nullable<int> PAAID { get; set; }
        public string PAADESC { get; set; }

        public string ESP_OBJ_EP { get; set; }
        public string AUTPERLIC_EP { get; set; }
        public string DOCTECNICOS_EP { get; set; }

        public string VARIABLESPPTO_EP { get; set; }

        public string IDONEIDAD_EP { get; set; }
        public string CAP_ORGANIZACIONAL_EP { get; set; }
        public string FACTORES_EVALUACION_EP { get; set; }
        public string REGLAS_DESEMPATE_EP { get; set; }

        public string UNSPSC { get; set; }

        public string NOM_ENTIDAD { get; set; }

        public string FUN_JUR_MOD { get; set; }
        public string CAR_RES_EP { get; set; }
        

    }
  
}
