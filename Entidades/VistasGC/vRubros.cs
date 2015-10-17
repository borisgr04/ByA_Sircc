using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
   public class vRubrosActas
    {
        public string Rubro { get; set; }
        public string Descripcion { get; set; }
        public decimal? Valor { get; set; }
        public string NroRp { get; set; }
    }
    
   public class vPolizasActas {
       public string Aseguradora { get; set; }
       public string NroPoliza { get; set; }
       public string Amparo { get; set; }
       public decimal? ValorAsegurado { get; set; }
       public string Vigencia { get; set; }
   }

   public class vImpuestosContratos
   {
       public string Impuesto { get; set; }
       public string VigLiquidacion { get; set; }
       public string NroLiquidacion { get; set; }
       public decimal ValorLiq { get; set; }
   }

   public  class vADICIONES
   {
       //nro_adi,obser, fec_sus_adi,pla_eje_adi,val_adi,tip_adi,  legalizado, fec_apr_pol
       public string TIP_ADI { get; set; }
       public string NRO_ADI { get; set; }
       public System.DateTime FEC_SUS_ADI { get; set; }
       public string PLA_EJE_ADI { get; set; }
       public decimal VAL_ADI { get; set; }
       public string LEGALIZADO { get; set; }
       public Nullable<System.DateTime> FEC_APR_POL { get; set; }
       public string OBSER { get; set; }
       public string EXENPOL { get; set; }
       public string RES_APR_POL { get; set; }
       public string DES_MOD { get; set; }
       
   }


   public class vPPLANTILLAS_ACTAS
   {
       public decimal IDE_PLA { get; set; }
       public string TIP_PLA { get; set; }
       public string NOM_PLA { get; set; }
       public byte[] PLANTILLA { get; set; }
       public string EXT { get; set; }
       
       //public string EST_PLA { get; set; }
       public string CLA_ACTA { get; set; }
       public string USAP { get; set; }
       public string USAP_MOD { get; set; }
       public string CLAVE { get; set; }
       public string EDITABLE { get; set; }
       public string URL_FORM { get; set; }
   }

   public class vSS_ACTAS
   {
       public string PERIODO_PAGO
       {
           get
           {
               String[] Meses = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.MonthNames;
               int mes = Convert.ToInt32(MES_PAGO) - 1;
               return YEAR_PAGO + "-" + MES_PAGO + "-" + Meses[mes].ToUpper();
           }
       }
       public string TIPO_PLA { get; set; }
       public string PLANILLAN { get; set; }
       public Nullable<decimal> VAL_SALUD { get; set; }
       public Nullable<decimal> VAL_PENSION { get; set; }
       public Nullable<decimal> VAL_RIESGOS { get; set; }
       public Nullable<decimal> VAL_PARAF { get; set; }
       public Nullable<decimal> TOTAL { 
            get {
                return VAL_SALUD.Value + VAL_RIESGOS.Value + VAL_PENSION.Value + VAL_PARAF.Value;
       } 
       }
       public string MES_PAGO { get; set; }
       public string YEAR_PAGO { get; set; }
       
   }

}
