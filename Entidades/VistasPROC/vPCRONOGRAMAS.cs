using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.VistasPROC
{
    public class vPCRONOGRAMAS
    {
        public string COD_ACT { get; set; }
        public string NOM_ACT { get; set; }
        public string COD_TPRO { get; set; }
        public Nullable<System.DateTime> FECHAI { get; set; }
        public Nullable<decimal> HORAI { get; set; }
        public Nullable<System.DateTime> FECHAF { get; set; }
        public Nullable<decimal> HORAF { get; set; }
        public string UBICACION { get; set; }
        public string NOTAS { get; set; }
        public string OCUPADO { get; set; }
        public string EST_ACT { get; set; }
        public string OBS_SEG { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USAP { get; set; }
        public string USBD { get; set; }
        public Nullable<System.DateTime> FEC_MOD { get; set; }
        public string USAP_MOD { get; set; }
        public string USBD_MOD { get; set; }
        public string NUM_PROC { get; set; }
        public decimal ID { get; set; }
        public string COLOR { get; set; }
        public string ANULADO { get; set; }
        public string OBLIGATORIO { get; set; }
        public string EST_PROC { get; set; }
        public Nullable<decimal> DIAS_AVISO { get; set; }
        public System.DateTime FEC_AVISO { get; set; }
        public string MIN_I { get; set; }
        public string MIN_F { get; set; }
        public string NOTIFICAR { get; set; }
        public string MFECINI { get; set; }
        public string MHORINI { get; set; }
        public string MFECFIN { get; set; }
        public string MHORFIN { get; set; }
        public Nullable<int> ORDEN { get; set; }
        public string TIPO { get; set; }
        public string TIP_PLA { get; set; }

        public string NOM_EST { get; set; }
        public string IS_FINAL { get; set; }

        public bool IS_NUEVO{ get;set; }
        public bool IS_ANULAR { get; set; }

        public bool OBLIGATORIOL {
            get{
                return OBLIGATORIO == "SI";
            }
        }
        public bool NOTIFICARL
        {
            get
            {
                return NOTIFICAR == "SI";
            }
        }
        public string FECHAC {
            get{
                string f = "-";
                if (FECHAI != null)
                {
                    try
                    {
                        f = FECHAI.Value.ToShortDateString();
                        if (MHORINI == "SI") f = f + " " + HORAI;
                        if (MFECFIN == "SI") f = f + " Hasta " + FECHAF.Value.ToShortDateString();
                        if (MHORFIN == "SI") f = f + " " + HORAF;
                    }
                    catch {
                        f = "";
                    }
                }
                return f;

            }

             }
        //public bool IS_NUEVO { get; set; }
        //public bool IS_ANULAR { get; set; }
        //public bool IS_ANULAR { get; set; }
        public string EST_AVI_ACT { get; set; }
        //public virtual PCONTRATOS PCONTRATOS { get; set; }
        //public virtual ICollection<PCRONO_DIAS> PCRONO_DIAS { get; set; }
        //public virtual PESTADOSACT PESTADOSACT { get; set; }
    }

    public class vPCRONOGRAMASPC : vPCRONOGRAMAS
    {
        public string  OBJ_CON { get; set; }
        
    }
}
    

