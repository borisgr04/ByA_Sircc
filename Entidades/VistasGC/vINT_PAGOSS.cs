using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.VistasGC
{
    public class vINT_PAGOSS
    {
        public string COD_CON { get; set; }
        public string COD_TIP_ESS { get; set; }
        public string PLANILLAN { get; set; }
        public Nullable<decimal> VAL_APO { get; set; }
        public string MES_PAGO { get; set; }
        public string YEAR_PAGO { get; set; }
        public string TIPO_PLA { get; set; }
        public Nullable<decimal> NRO_DOC { get; set; }
        public decimal ID { get; set; }
        public string USAP { get; set; }
        public string USBD { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string OBS { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public string USBDM { get; set; }
        public string USAPM { get; set; }
        public string ESTADO { get; set; }
        public Nullable<decimal> IDE_INF { get; set; }
        
        public string TIPO_ESS { get; set; }
        public string PERIODO_PAGO { 
            get{
                String[] Meses = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.MonthNames;
                int mes= Convert.ToInt32(MES_PAGO)-1;
                return YEAR_PAGO + "-" +  MES_PAGO+"-"+ Meses[mes].ToUpper();
            }
        }

        

    }

    public class vINT_PAGOSST
    {
        public string COD_CON { get; set; }
        public string TIPO_PLA { get; set; }
        public string PLANILLAN { get; set; }
        public Nullable<decimal> VAL_SALUD { get; set; }
        public Nullable<decimal> VAL_PENSION { get; set; }
        public Nullable<decimal> VAL_RIESGOS { get; set; }
        public Nullable<decimal> VAL_PARAF { get; set; }
        public string MES_PAGO { get; set; }
        public string YEAR_PAGO { get; set; }
        public Nullable<decimal> NRO_DOC { get; set; }
        public decimal ID { get; set; }
        public string USAP { get; set; }
        public string USBD { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string OBS { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public string USBDM { get; set; }
        public string USAPM { get; set; }
        public string ESTADO { get; set; }
        public Nullable<decimal> IDE_INF { get; set; }

        public string PERIODO_PAGO
        {
            get
            {
                String[] Meses = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.MonthNames;
                int mes = Convert.ToInt32(MES_PAGO) - 1;
                return YEAR_PAGO + "-" + MES_PAGO + "-" + Meses[mes].ToUpper();
            }
        }

    }
 
}
