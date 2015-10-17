using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public partial class PSOLICITUDES
    {
        private string mNOM_EST_SOL;
        public DateTime Fecha_RegistroSH
        {
            get
            {
                return new DateTime(FECHA_REGISTRO.Value.Year, FECHA_REGISTRO.Value.Month, FECHA_REGISTRO.Value.Day);
            }
        }
        public string EST_SOL
        {
            get{
               if (this.HREVISADO1 != null)
                {
                    if (this.HREVISADO1.NIT_ABOG_RECIBE == null)
                    {
                        mNOM_EST_SOL = "SIN ASIGNAR";
                        return "SASI";
                    }
                    else if (this.HREVISADO1.NIT_ABOG_RECIBE != null && this.HREVISADO1.RECIBIDO_ABOG == "N")
                    {
                        mNOM_EST_SOL = "SIN RECIBIR";
                        return "SREC";
                    }
                    else if (this.HREVISADO1.RECIBIDO_ABOG == "S" && this.HREVISADO1.CONCEPTO_REVISADO == "P")
                    {
                        mNOM_EST_SOL = "SIN REVISAR";
                        return "SREV";
                    }
                    else if (this.HREVISADO1.RECIBIDO_ABOG == "S" && this.HREVISADO1.CONCEPTO_REVISADO == "A")
                    {
                        mNOM_EST_SOL = "ACEPTADO";
                        return "ACEP";
                    }
                    else if (this.HREVISADO1.RECIBIDO_ABOG == "S" && this.HREVISADO1.CONCEPTO_REVISADO == "R")
                    {
                        mNOM_EST_SOL = "RECHAZADO";
                        return "RECH";
                    }
                    else
                        return "";
                }
                else {
                    return "";
                }
            }
        }

        public string NOM_EST_SOL
        {
            get
            {
                return mNOM_EST_SOL;
            }
        }
    }

}
