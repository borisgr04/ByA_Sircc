using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.VistasGC
{

    public class TipoInfo {
        public string CODIGO { get; set; }
        public string NOMBRE { get; set; }
        public string URL { get; set; }
    }

    public class vINT_INFOCONT
    {
        Dictionary<string, TipoInfo> dTipo = new Dictionary<string, TipoInfo>();

        public vINT_INFOCONT(){
            dTipo.Add("01", new TipoInfo { CODIGO = "01", NOMBRE = "INICIAL", URL = "" });
            dTipo.Add("02", new TipoInfo { CODIGO = "02", NOMBRE = "PARCIAL", URL = "gcAutoPago.html" });
            dTipo.Add("03", new TipoInfo { CODIGO = "03", NOMBRE = "SUSPENCIÓN", URL = "" });
            dTipo.Add("04", new TipoInfo { CODIGO = "04", NOMBRE = "REINICIO", URL = "" });
            dTipo.Add("05", new TipoInfo { CODIGO = "05", NOMBRE = "FINAL", URL = "" });
            
        }

        public string COD_CON { get; set; }
        public Nullable<System.DateTime> FEC_INF { get; set; }
        public Nullable<System.DateTime> FEC_INI { get; set; }
        public Nullable<System.DateTime> FEC_FIN { get; set; }
        public Nullable<decimal> CAN_HOJ { get; set; }
        public Nullable<decimal> NUM_INF { get; set; }
        public Nullable<System.DateTime> FE_REG { get; set; }
        public string USAP { get; set; }
        public string USBD { get; set; }
        public string EST_INF { get; set; }
        public string DES_INF { get; set; }
        public decimal ID { get; set; }
        public string NOT_INF { get; set; }
        public Nullable<decimal> VAL_PAG { get; set; }
        public string OBL_FAC { get; set; }
        public string NOT2_INF { get; set; }
        public Nullable<int> ID_ACTA { get; set; }
        public string TIP_INF { get; set; }
        public string PERIODO { 
            get{
                return FEC_INI.Value.ToShortDateString() + " - " + FEC_FIN.Value.ToShortDateString();
            }
        }
        public string ID_PERIODO
        {
            get
            {
                return "INFORME ID° "+ NUM_INF.Value.ToString()+" - [ " + FEC_INI.Value.ToShortDateString() + " - " + FEC_FIN.Value.ToShortDateString()+"]";
            }
        }
        public string NOM_TIP_INF
        {
            get
            {
                return dTipo[TIP_INF].NOMBRE;
            }
        }
        public string URL_TIP_INF
        {
            get
            {
                return dTipo[TIP_INF].URL;
            }
        }
        

    }
}
