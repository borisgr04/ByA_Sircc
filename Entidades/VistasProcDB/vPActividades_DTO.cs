﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.VistasProcDB
{
    public class vPActividades_DTO
    {
        public string COD_ACT { get; set; }
        public string NOM_ACT { get; set; }
        public string COD_TPRO { get; set; }
        public string VIGENCIA { get; set; }
        public Nullable<decimal> ORDEN { get; set; }
        public string OCUPADO { get; set; }
        public string EST_PROC { get; set; }
        public string ESTADO { get; set; }
        public string OBLIGATORIO { get; set; }
        public string DIA_NOHABIL { get; set; }
        public string NOTIFICAR { get; set; }
        public string MFECINI { get; set; }
        public string MHORINI { get; set; }
        public string MFECFIN { get; set; }
        public string MHORFIN { get; set; }
        public string UBICACION { get; set; }

        //public virtual TIPOSPROC TIPOSPROC { get; set; }
        //public virtual PESTADOS PESTADOS { get; set; }
    }
}
