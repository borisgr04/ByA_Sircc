using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Entidades.VistasPROC;
using Entidades.Vistas;

namespace Entidades
{
    public class vESTPREVFIL
    {
        public decimal ID { get; set; }
        public string OBJE_EP { get; set; }
    }
    
    public class vESTPREV
    {
        public decimal ID { get; set; }
        public string OBJE_EP { get; set; }
        public Nullable<decimal> PLAZ1_EP { get; set; }
        public string TPLA1_EP { get; set; }
        public Nullable<decimal> PLAZ2_EP { get; set; }
        public string TPLA2_EP { get; set; }
        public string LUGE_EP { get; set; }
        public Nullable<decimal> PLIQ_EP { get; set; }
        public Nullable<decimal> VAL_ENT_EP { get; set; }
        public Nullable<decimal> VAL_OTR_EP { get; set; }
        public string IDE_DIL_EP { get; set; }
        public string DEP_NEC_EP { get; set; }
        public string TIP_CON_EP { get; set; }
        public string STIP_CON_EP { get; set; }
        public Nullable<System.DateTime> FEC_ELA_EP { get; set; }
        public Nullable<System.DateTime> FEC_REG_EP { get; set; }
        public Nullable<System.DateTime> FEC_MOD_EP { get; set; }
        public string USAP_REG_EP { get; set; }
        public string USAP_MOD_EP { get; set; }
        public Nullable<System.DateTime> FEC_REV_EP { get; set; }
        public string USAP_REV_EP { get; set; }
        public string USAP_ELA_EP { get; set; }
        public Nullable<System.DateTime> FEC_ELAS_EP { get; set; }
        public string USAP_APR_EP { get; set; }
        public Nullable<System.DateTime> FEC_APR_EP { get; set; }
        public string USAP_ANU_EP { get; set; }
        public Nullable<System.DateTime> FEC_ANU_EP { get; set; }
        public string USAP_DAN_EP { get; set; }
        public Nullable<System.DateTime> FEC_DAN_EP { get; set; }
        public string DEP_SUP_EP { get; set; }
        public string CAR_SUP_EP { get; set; }
        public string VIG_EP { get; set; }

        
        
        public string CODIGO_EP { get; set; }
        public Nullable<decimal> GRUPOS_EP { get; set; }
        public Nullable<decimal> NUM_EMP_EP { get; set; }

        public string IDE_RES_EP { get; set; }
        public string MOD_SEL_EP { get; set; }
        public Nullable<decimal> NRO_EP { get; set; }

        public string EST_EP { get; set; }
        public string EST_FLU_EP { get; set; }

        public string DEP_DEL_EP { get; set; }

        public string VAR_PPT_EP { get; set; }
        public string ENPLANC_EP { get; set; }
        public string NOM_PLA_EP { get; set; }

        public Nullable<decimal> ID_REV { get; set; }
        public Nullable<decimal> ID_APR { get; set; }

        public string OBLIGC { get; set; }
        public string OBLIGE { get; set; }
        
        public string PERSONA_APOYO { get; set; }
        public Nullable<decimal> ANTI_PORC { get; set; }
        public string TIPO_FP { get; set; }
        public string IDE_CON_EP { get; set; }
        public string IDE_REP_EP { get; set; }

        public string NEC_EP { get; set; }
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
        public string COD_UNSPSC_EP { get; set; }
        public string DES_UNSPSC_EP { get; set; }

        public string TIPO_PPTO { get; set; }
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

        public string FUN_JUR_MOD { get; set; }
        public string CAR_RES_EP { get; set; }

        public string ACT_CONT_EP { get; set; }
        public string DESC_APORTES_PROPIOS_EP { get; set; }
        public string REQ_CDP_EP { get; set; }
        public string OBS_CDP_EP { get; set; }
        public string OBS_POL_EP { get; set; }
        public string REQ_POL_EP { get; set; }
        public string INICIO_APARTIR_DE_EP { get; set; }
        public Nullable<System.DateTime> FEC_INICIO_EP { get; set; }
        public Nullable<System.DateTime> FEC_FIN_EP { get; set; }
        public Nullable<System.DateTime> FEC_SUS_EP { get; set; }

        public virtual List<vEP_ProyectosDTO> l_EP_PROYECTOS { get; set; }
        public virtual List<vEP_CDP_DTO> l_EP_CDP{ get; set; }
        public virtual List<vEP_FORMA_PAGO_DTO> l_EP_FORMA_PAGO { get; set; }
        public virtual List<vEP_POLIZAS2_DTO> l_EP_POLIZAS2 { get; set; }
        public virtual List<vEP_CLAUSULAS_DTO> l_EP_CLAUSULAS { get; set; }
        public virtual List<vEP_RIESGOS> l_EP_RIESGOS { get; set; }
        public virtual List<vEP_UNSPSC> l_EP_UNSPSC { get; set; }

        //public virtual List<vEP_RUBROS_CDP_DTO> EP_RUBROS_CDP { get; set; }

        
        
        
    }
    
        
    
    
    
}
