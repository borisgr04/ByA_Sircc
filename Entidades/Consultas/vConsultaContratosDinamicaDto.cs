using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Consultas
{
    public class vCampos
    {
        public string name { get; set; }
        public string value { get; set; }
    }

    public class vConsultaContratosDinamicaDto: vConsultaContratosParametrizadaDto
    {
        public List<vCampos> lCamposMostrar { get; set; }
        public List<vCampos> lCamposAgrupar { get; set; }
        public bool AgruparIndividuales { get; set; }
    }
}
