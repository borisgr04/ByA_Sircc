using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Contratos
{
    public partial class vCONTRATOS
    {
        public int NRO_CON { get; set; }
        public string IDE_CON { get; set; }
        public string OBJ_CON { get; set; }
        public string PRO_CON { get; set; }
        public System.DateTime FEC_SUS_CON { get; set; }
        public int PLA_EJE_CON { get; set; }
        public string DEP_CON { get; set; }
        public short VIG_CON { get; set; }
        public string TIP_CON { get; set; }
        public string STIP_CON { get; set; }
        public string EST_CON { get; set; }
        public decimal VAL_CON { get; set; }
        public string DOC_CON { get; set; }
        public string COD_CON { get; set; }
        public int CAN_ADI { get; set; }
        public int VAL_ADI { get; set; }
        public string COD_SEC { get; set; }
        public string TIP_FOR { get; set; }
        public string OTR_CNS { get; set; }
        public string COD_TPRO { get; set; }
        public string NRO_PLA_CON { get; set; }
        public string IDE_REP { get; set; }
        public string USUARIO { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string OBS_DOC_CON { get; set; }
        public string URG_MAN { get; set; }
        public string EST_CONV { get; set; }
        public Nullable<System.DateTime> FEC_APR_POL { get; set; }
        public string EXO_IMP { get; set; }
        public string EXO_OBS { get; set; }
        public string PRO_SEL_NRO { get; set; }
        public string DEP_PCON { get; set; }
        public Nullable<decimal> VAL_APO_GOB { get; set; }
        public string COD_CON0 { get; set; }
        public Nullable<System.DateTime> FEC_ULT_MOD { get; set; }
        public string USER_ACT { get; set; }
        public string LEGALIZADO { get; set; }
        public string PER_APO { get; set; }
        public string ANTICIPO { get; set; }
        public Nullable<int> NEMPLEOS { get; set; }
        public string AGOTAR_PPTO { get; set; }
        public string LUG_EJE { get; set; }
        public string NUM_PROC { get; set; }
        public string TIPO_PLAZO { get; set; }
        public string TIP_RADICACION { get; set; }
        public Nullable<int> GRUPO { get; set; }
        public string ENCARGADO { get; set; }
        public string CONSIDERANDOS { get; set; }
        public string APORTES { get; set; }
        public Nullable<decimal> PLAZO2_EJE_CON { get; set; }
        public string TIPO_PLAZO2 { get; set; }
        public Nullable<decimal> VAL_SIN_IVA { get; set; }
        public string INTERVENTORIA { get; set; }
        public string EXENPOL { get; set; }
        public string OBS_POLIZA { get; set; }
        public string OBS_CDP { get; set; }
        public string OBS_PROYECTOS { get; set; }
        public string REVISADOPOR { get; set; }
        public string RES_APR_POL { get; set; }
        public string DEP_SUP { get; set; }

        public string TIPO_FP { get; set; }
        public Nullable<decimal> ANTI_PORC { get; set; }
        public Nullable<decimal> PLIQ_EP { get; set; }
        public string OBLIGC { get; set; }
        public string OBLIGE { get; set; }
    
        
        public virtual List<vEP_ProyectosDTO> l_EP_PROYECTOS { get; set; }
        public virtual List<vEP_CDP_DTO> l_EP_CDP{ get; set; }
        public virtual List<vEP_FORMA_PAGO_DTO> l_EP_FORMA_PAGO { get; set; }
        public virtual List<vEP_POLIZAS2_DTO> l_EP_POLIZAS2 { get; set; }

        //public virtual ICollection<ADICIONES> ADICIONES { get; set; }
        //public virtual ICollection<ANX_CONTRATOS> ANX_CONTRATOS { get; set; }
        //public virtual ICollection<CDP_CONTRATOS> CDP_CONTRATOS { get; set; }
        //public virtual ICollection<CFORMA_PAGO> CFORMA_PAGO { get; set; }
        //public virtual ICollection<COBLIGACIONES> COBLIGACIONES { get; set; }
        //public virtual ICollection<CON_POLIZAS> CON_POLIZAS { get; set; }
        //public virtual ICollection<CONMUN> CONMUN { get; set; }
        //public virtual ICollection<POLIZAS_CONTRATO> POLIZAS_CONTRATO { get; set; }
        //public virtual DEPENDENCIA DEPENDENCIA { get; set; }
        //public virtual SECTOR SECTOR { get; set; }
        //public virtual SUBTIPOS SUBTIPOS { get; set; }
        //public virtual TIPOSCONT TIPOSCONT { get; set; }
        //public virtual DEPENDENCIA DEPENDENCIA1 { get; set; }
        //public virtual ESTADOS ESTADOS { get; set; }
        //public virtual ICollection<ESTCONTRATOS> ESTCONTRATOS { get; set; }
        //public virtual ICollection<MOD_CFORMA_PAGO> MOD_CFORMA_PAGO { get; set; }
        //public virtual ICollection<MOD_COBLIGACIONES> MOD_COBLIGACIONES { get; set; }
        //public virtual ICollection<MOD_CON_POLIZAS> MOD_CON_POLIZAS { get; set; }
        //public virtual ICollection<RUBROS_RCONTRATOS> RUBROS_RCONTRATOS { get; set; }
        //public virtual TIPO_PLAZOS TIPO_PLAZOS { get; set; }
        //public virtual ICollection<INTERVENTORES_CONTRATO> INTERVENTORES_CONTRATO { get; set; }
        //public virtual ICollection<MOD_CDP_CONTRATOS> MOD_CDP_CONTRATOS { get; set; }
        //public virtual ICollection<MOD_CONMUN> MOD_CONMUN { get; set; }
        //public virtual ICollection<MOD_CPROYECTOS> MOD_CPROYECTOS { get; set; }
        //public virtual PCONTRATOS PCONTRATOS { get; set; }
        //public virtual ICollection<RP_CONTRATOS> RP_CONTRATOS { get; set; }
        //public virtual ICollection<RUBROS_CONTRATOS> RUBROS_CONTRATOS { get; set; }
        //public virtual ICollection<SOL_ADICIONES> SOL_ADICIONES { get; set; }
        //public virtual ICollection<TERCEROS> TERCEROS { get; set; }
        //public virtual TERCEROS TERCEROS_1 { get; set; }
        //public virtual ICollection<IMP_CONTRATOS> IMP_CONTRATOS { get; set; }
        //public virtual ICollection<INT_INFOCONT> INT_INFOCONT { get; set; }
        //public virtual ICollection<INT_PAGOSS> INT_PAGOSS { get; set; }
        //public virtual ICollection<INT_PAGOSST> INT_PAGOSST { get; set; }
        //public virtual ICollection<GD_DOC_ACTAS> GD_DOC_ACTAS { get; set; }
        //public virtual ICollection<CPROYECTOS> CPROYECTOS { get; set; }
    }
    

}
