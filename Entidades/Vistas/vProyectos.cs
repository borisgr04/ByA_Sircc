using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vPROYECTOS
    {
        //  public PROYECTOS()
        //{
        //    this.EP_PROYECTOS = new HashSet<EP_PROYECTOS>();
        //    this.GPPROYECTOS = new HashSet<GPPROYECTOS>();
        //    this.MOD_CPROYECTOS = new HashSet<MOD_CPROYECTOS>();
        //    this.CPROYECTOS = new HashSet<CPROYECTOS>();
        //}
    
        public string VIGENCIA { get; set; }
        public string PROYECTO { get; set; }
        public string NOMBRE_PROYECTO { get; set; }
        public Nullable<System.DateTime> FECHA_RAD { get; set; }
        public string COMITE { get; set; }
        public Nullable<decimal> VALOR { get; set; }
        public string ESTADO { get; set; }
        public Nullable<decimal> APORTES_PROPIOS { get; set; }
        public string NOM_MUN { get; set; }
        public string DEP_NOM { get; set; }
        public string TIP_PRO { get; set; }
        public string IDE_APORTANTE { get; set; }
        public string NECESIDAD { get; set; }
        public string BPIN { get; set; }
    
        //public virtual ICollection<EP_PROYECTOS> EP_PROYECTOS { get; set; }
        //public virtual ICollection<GPPROYECTOS> GPPROYECTOS { get; set; }
        //public virtual ICollection<MOD_CPROYECTOS> MOD_CPROYECTOS { get; set; }
        //public virtual PROYECTOS PROYECTOS1 { get; set; }
        //public virtual PROYECTOS PROYECTOS2 { get; set; }
        //public virtual ICollection<CPROYECTOS> CPROYECTOS { get; set; }
    }
}
