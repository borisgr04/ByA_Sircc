using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class CONSULTA_EP_DTO
    {
        public bool SIPRODUCTO { get; set; }
        public bool SINUMEROESTUDIOPREVIO { get; set; }
        public bool SIMODALIDAD { get; set; }
        public bool SIESTADO { get; set; }
        public bool SIDEPENDENCIA { get; set; }
        public bool SIPROYECTO { get; set; }
        public bool SIFECHADESDE { get; set; }
        public bool SIFECHAHASTA { get; set; }
        public bool SICUANTIA { get; set; }
        public bool SIOBJETO { get; set; }

        public string PRODUCTO { get; set; }
        public string NUMEROESTUDIOPREVIO { get; set; }
        public string MODALIDAD { get; set; }
        public string ESTADO { get; set; }
        public string DEPENDENCIA { get; set; }
        public string PROYECTO { get; set; }
        public string FECHADESDE { get; set; }
        public string FECHAHASTA { get; set; }
        public string CUANTIA { get; set; }
        public string OBJETO { get; set; }

    }
}
