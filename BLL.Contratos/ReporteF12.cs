using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;

namespace BLL.Contratos
{
    public class ReporteF12
    {
        Entities ctx { get; set; }
        ByARpt byaRpt = new ByARpt();
        public ReporteF12()
        {
            
            Mapper.CreateMap<PROYECTOS, vRptF12>()
                            .ForMember(dest => dest.FECHAFINAL, opt => opt.MapFrom(src => src.CPROYECTOS.Max(t=>t.CONTRATOS.ESTCONTRATOS.Where(e=>e.EST_FIN=="01" && e.ESTADO=="AC").Select(f=>f.FEC_ENT))))
                            .ForMember(dest => dest.FECHAFINAL, opt => opt.MapFrom(src => src.CPROYECTOS.Max(t=>t.CONTRATOS.ESTCONTRATOS.Where(e=>e.EST_FIN=="05" && e.ESTADO=="AC").Select(f=>f.FEC_ENT))))
                            .ForMember(dest => dest.VALOR_CONTRATADO, opt => opt.MapFrom(src => src.CPROYECTOS.Sum(t=>t.CONTRATOS.VAL_CON)))
                            ;
        }
        
        public List<vRptF12> GetRptF12(short vigencia)
        {
            List<vRptF12> lst = new List<vRptF12>();
            ctx = new Entities();
            string vigenciaS=vigencia.ToString();
            List<PROYECTOS> lstO = ctx.PROYECTOS.Where(t => t.VIGENCIA == vigenciaS).ToList();
            Mapper.Map(lstO, lst);
            return lst;
        }
    }

    public class vRptF12 {
        public string VIGENCIA { get; set; }
        public string PROYECTO { get; set; }
        public string NOMBRE_PROYECTO { get; set; }
        public Nullable<decimal> VALOR { get; set; }

        public Nullable<decimal> VALOR_CONTRATADO { get; set; }
        public Nullable<DateTime> FECHAINICIO { get; set; }
        public Nullable<DateTime> FECHAFINAL { get; set; }
        
    }
}
