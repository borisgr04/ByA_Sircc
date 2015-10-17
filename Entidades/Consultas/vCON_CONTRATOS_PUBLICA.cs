using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Consultas
{
    public class vCON_CONTRATOS_PUBLICA
    {
        public short VIG_CON { get; set; }
        public string COD_CON { get; set; }
        public string OBJ_CON { get; set; }
        public string IDE_CON { get; set; }
        public string CONTRATISTA { get; set; }
        public System.DateTime FEC_SUS_CON { get; set; }
        public string ESTADO { get; set; }
        public string TIPOCONT { get; set; }
        public string SUB_TIPO { get; set; }
        public decimal VAL_CON { get; set; }
        public string NOM_TER_SUP { get; set; }
        public string DEPENDENCIA { get; set; }
        public Nullable<DateTime> FECHA_INICIAL { get; set; }
        public Nullable<DateTime> FECHA_FINAL { get; set; }
    }
}
