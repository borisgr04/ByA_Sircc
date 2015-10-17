using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public class vTerceros
    {
        public string TIP_IDE { get; set; }
        public string IDE_TER { get; set; }
        public string DV_TER { get; set; }
        public string EXP_IDE { get; set; }
        public string APE1_TER { get; set; }
        public string APE2_TER { get; set; }
        public string NOM1_TER { get; set; }
        public string NOM2_TER { get; set; }
        public string RAZ_SOC { get; set; }
        public string DIR_TER { get; set; }
        public string TEL_TER { get; set; }
        public string EMA_TER { get; set; }
        public Nullable<System.DateTime> FEC_NAC { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public string USAP { get; set; }
        public string USAPM { get; set; }
        public string TIP_PER { get; set; }
        
        public string ORD_GAS { get; set; }
        public string CAR_FUN { get; set; }
        public string DEP_NEC { get; set; }
        public string DOC_DEL { get; set; }
        public Nullable<System.DateTime> FEC_DEL { get; set; }
       
        public string ESTADO { get; set; }
        public string TIPO { get; set; }
        public int CANT_PROC { get; set; }
        public string OBS_TER { get; set; }
        public string CLAS_TER { get; set; }
        public string APNOMBRE
        {

            get;
            set;
            
                //return (APE1_TER.Trim() + " " + (APE2_TER == null ? "" : APE2_TER.Trim()) + " " + (NOM1_TER == null ? "" : NOM1_TER.Trim()) + " " + (NOM2_TER == null ? "" : NOM2_TER.Trim())).Trim();


        }

        public string NOMBRE
        {
            //return (NOM1_TER == null ? "" : NOM1_TER.Trim()) + " " + (NOM2_TER == null ? "" : NOM2_TER.Trim()) + " " + APE1_TER.Trim() + " " + (APE2_TER == null ? "" : APE2_TER.Trim()).Trim();
            get;
            set;

        }
    }
}
