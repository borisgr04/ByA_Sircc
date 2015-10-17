using AutoMapper;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;
using Entidades.Vistas;

namespace BLL
{
    public class ConsecutivoPorModalidadBLL
    {
        Entities ctx;
        public ConsecutivoPorModalidadBLL()
        {
            Mapper.CreateMap<CONS_PROC, vCONS_PROC>()
                .ForMember(dest => dest.NOMBRE_DEP_DEP, opt => opt.MapFrom(src => src.DEPENDENCIA.NOM_DEP))
                .ForMember(dest => dest.NOMBRE_TIP_PROC, opt => opt.MapFrom(src => src.TIPOSPROC.NOM_TPROC))
                .ForMember(dest => dest.ABR_NOM_DEP, opt => opt.MapFrom(src => src.DEPENDENCIA.DEP_ABR))
                .ForMember(dest => dest.ABR_NOM_TIP_PROC, opt => opt.MapFrom(src => src.TIPOSPROC.ABRE_TPROC));
            Mapper.CreateMap<vCONS_PROC, CONS_PROC>();
        }
        public List<vCONS_PROC> Gets(short Vigencia)
        {
            using (ctx = new Entities())
            {
                List<vCONS_PROC> r = new List<vCONS_PROC>();
                List<CONS_PROC> b = ctx.CONS_PROC.Where(t=> t.VIGENCIA == Vigencia).OrderBy(t=> t.VIGENCIA).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vCONS_PROC Get(short VIGENCIA, string DEPENDENCIA, string MODALIDAD)
        {
            using (ctx = new Entities())
            {
                vCONS_PROC r = new vCONS_PROC();
                CONS_PROC b = ctx.CONS_PROC.Where(t => t.VIGENCIA == VIGENCIA &&  t.DEP_DEL== DEPENDENCIA && t.TIP_PROC == MODALIDAD).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vCONS_PROC Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vCONS_PROC Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private CONS_PROC ep = null;
            public vCONS_PROC oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                // hacer las validaciones respectivas
                CONS_PROC consec = ctx.CONS_PROC.Where(t => t.VIGENCIA == oDto.VIGENCIA && t.DEP_DEL == oDto.DEP_DEL && t.TIP_PROC == oDto.TIP_PROC).FirstOrDefault();
                if (consec == null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya se encuentra registrado un consecutivo con estas características";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                ep = new CONS_PROC();
                Mapper.Map(oDto, ep);
                ctx.CONS_PROC.Add(ep);
                byaRpt.id = ep.TIP_PROC.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vCONS_PROC oDto { get; set; }
            public CONS_PROC ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.CONS_PROC.Where(t => t.VIGENCIA == oDto.VIGENCIA && t.DEP_DEL == oDto.DEP_DEL && t.TIP_PROC == oDto.TIP_PROC).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected internal override void Antes()
            {
                Mapper.Map(oDto, ep);
            }
            #endregion
        }
    }
}
