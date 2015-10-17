using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vEP_RIESGOS
    {
        public decimal ID { get; set; }
        public Nullable<decimal> N { get; set; }
        public Nullable<decimal> ID_EP { get; set; }
        public string CLASE { get; set; }
        public string FUENTE { get; set; }
        public string ETAPA { get; set; }
        public string TIPO { get; set; }
        public string DESCRIPCION { get; set; }
        public string CONSECUENCIAS { get; set; }
        public Nullable<short> PROBABILIDAD_R { get; set; }
        public Nullable<short> IMPACTO_R { get; set; }
        public Nullable<short> VALORACION_R { get; set; }
        public string CATEGORIA_R { get; set; }
        public string AQUIENSEASIGNA { get; set; }
        public string TRATAMIENTO { get; set; }
        public Nullable<short> PROBABILIDAD_T { get; set; }
        public Nullable<short> IMPACTO_T { get; set; }
        public Nullable<short> VALORACION_T { get; set; }
        public string CATEGORIA_T { get; set; }
        public string AFECTAEJECUCIONCTO { get; set; }
        public string RESPONSABLE { get; set; }
        public Nullable<System.DateTime> FECHAINICIO { get; set; }
        public Nullable<System.DateTime> FECHACOMPLETA { get; set; }
        public string FORMA_MONITOREO { get; set; }
        public string PERIOCIDAD { get; set; }
    }
}
