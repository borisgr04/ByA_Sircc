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
    public class ConsecutivoContratoPorVigenciaBLL
    {
        Entities ctx;
        public ConsecutivoContratoPorVigenciaBLL()
        {
            Mapper.CreateMap<NROCONVIG, vNROCONVIG>()
                .ForMember(dest => dest.NOM_COD_TIP, opt => opt.MapFrom(src => src.TIPOSCONT.NOM_TIP));
            Mapper.CreateMap<vNROCONVIG, NROCONVIG>();
        }
        public List<vNROCONVIG> Gets()
        {
            using (ctx = new Entities())
            {
                List<vNROCONVIG> r = new List<vNROCONVIG>();
                List<NROCONVIG> b = ctx.NROCONVIG.OrderByDescending(t=> t.YEAR_VIG).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vNROCONVIG Get(short YEAR_VIG, string COD_TIP)
        {
            using (ctx = new Entities())
            {
                vNROCONVIG r = new vNROCONVIG();
                NROCONVIG b = ctx.NROCONVIG.Where(t => t.YEAR_VIG == YEAR_VIG && t.COD_TIP == COD_TIP).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vNROCONVIG Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vNROCONVIG Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private NROCONVIG ep = null;
            public vNROCONVIG oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.NROCONVIG.Where(t => t.YEAR_VIG == oDto.YEAR_VIG && t.COD_TIP == oDto.COD_TIP).FirstOrDefault();
                if (ep == null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya se encuentra un consecutivo registrado con estas caracteristicas";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                ep = new NROCONVIG();
                Mapper.Map(oDto, ep);
                ctx.NROCONVIG.Add(ep);
                byaRpt.id = ep.YEAR_VIG.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vNROCONVIG oDto { get; set; }
            public NROCONVIG ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.NROCONVIG.Where(t => t.YEAR_VIG == oDto.YEAR_VIG && t.COD_TIP == oDto.COD_TIP).FirstOrDefault();
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
