using AutoMapper;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;

namespace BLL
{
    public class VigenciasBLL
    {
        Entities ctx;
        public VigenciasBLL()
        {
            Mapper.CreateMap<VIGENCIAS, vVIGENCIAS>();
            Mapper.CreateMap<vVIGENCIAS, VIGENCIAS>();
        }
        public List<vVIGENCIAS> Gets()
        {
            using (ctx = new Entities())
            {
                List<vVIGENCIAS> r = new List<vVIGENCIAS>();
                List<VIGENCIAS> b = ctx.VIGENCIAS.OrderByDescending(t=> t.YEAR_VIG).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vVIGENCIAS Get(short ID)
        {
            using (ctx = new Entities())
            {
                vVIGENCIAS r = new vVIGENCIAS();
                VIGENCIAS b = ctx.VIGENCIAS.Where(t => t.YEAR_VIG == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vVIGENCIAS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vVIGENCIAS Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private VIGENCIAS ep = null;
            public vVIGENCIAS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.VIGENCIAS.Where(t => t.YEAR_VIG == oDto.YEAR_VIG).FirstOrDefault();
                if (ep == null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya se encuentra una Vigencia registrada para este año";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                ep = new VIGENCIAS();
                Mapper.Map(oDto, ep);
                ctx.VIGENCIAS.Add(ep);
                byaRpt.id = ep.YEAR_VIG.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vVIGENCIAS oDto { get; set; }
            public VIGENCIAS ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.VIGENCIAS.Where(t => t.YEAR_VIG == oDto.YEAR_VIG).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected internal override void Antes()
            {
                Mapper.Map(oDto, ep);
            }
            #endregion
        }
        public List<vVIGENCIAS> GetsAbiertas()
        {
            using (ctx = new Entities())
            {
                List<vVIGENCIAS> r = new List<vVIGENCIAS>();
                List<VIGENCIAS> b = ctx.VIGENCIAS.Where(t=> t.EST_VIG == "ABIERTA").OrderByDescending(t => t.YEAR_VIG).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
    }
}
