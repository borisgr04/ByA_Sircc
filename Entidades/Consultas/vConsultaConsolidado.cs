using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Consultas
{
    public class vConsultaConsolidado
    {
        public string TIPOCONT { get; set; }
        public string CONTRATISTA { get; set; }
        public string SUB_TIPO { get; set; }
        public string DEPENDENCIA { get; set; }
        public string DEPENDENCIAP { get; set; }
        public string ESTADO { get; set; }
        public string TIPO_PROCESO { get; set; }
        public string NOM_TER_INTV { get; set; }
        public string NOM_TER_SUP { get; set; }
        public string REP_LEG { get; set; }

        public Nullable<decimal> CANTIDAD { get; set; }
        public Nullable<decimal> VALOR_INICIAL { get; set; }
        public Nullable<decimal> APORTES_PROPIOS { get; set; }
        public Nullable<decimal> APORTES_OTROS { get; set; }
        public Nullable<decimal> VALOR_ADICIONADO { get; set; }
        public Nullable<decimal> VALOR_TOTAL { get; set; }
    }
}
