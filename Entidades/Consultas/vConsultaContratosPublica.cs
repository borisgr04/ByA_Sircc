using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Consultas
{
    public class vConsultaContratosPublica
    {
        public bool chkVigencia { get; set; }
        public string Vigencia { get; set; }

        public bool chkNumeroContrato { get; set; }
        public string NumeroContrato { get; set; }

        public bool chkTipoContrato { get; set; }
        public string TipoContrato { get; set; }

        public bool chkCedulaNitContratista { get; set; }
        public string CedulaNitContratista { get; set; }

        public bool chkNombreContratista { get; set; }
        public string NombreContratista { get; set; }

        public bool chkDependenciaNecesidad { get; set; }
        public string DependenciaNecesidad { get; set; }

        public bool chkObjeto { get; set; }
        public string Objeto { get; set; }
    }
}
