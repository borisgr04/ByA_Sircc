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
    public class AseguradorasBLL
    {
        Entities ctx;
        public AseguradorasBLL()
        {
            Mapper.CreateMap<ASEGURADORAS, vASEGURADORAS>();
            Mapper.CreateMap<vASEGURADORAS, ASEGURADORAS>();
        }
        public List<vASEGURADORAS> Gets()
        {
            using (ctx = new Entities())
            {
                List<vASEGURADORAS> r = new List<vASEGURADORAS>();
                List<ASEGURADORAS> b = ctx.ASEGURADORAS.OrderByDescending(t => t.COD_ASE).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vASEGURADORAS Get(short ID)
        {
            using (ctx = new Entities())
            {
                vASEGURADORAS r = new vASEGURADORAS();
                ASEGURADORAS b = ctx.ASEGURADORAS.Where(t => t.COD_ASE == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vASEGURADORAS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vASEGURADORAS Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private ASEGURADORAS ep = null;
            public vASEGURADORAS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.ASEGURADORAS.Where(t => t.COD_ASE == oDto.COD_ASE).FirstOrDefault();
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
                ep = new ASEGURADORAS();
                Mapper.Map(oDto, ep);
                ctx.ASEGURADORAS.Add(ep);
                byaRpt.id = ep.COD_ASE.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vASEGURADORAS oDto { get; set; }
            public ASEGURADORAS ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.ASEGURADORAS.Where(t => t.COD_ASE == oDto.COD_ASE).FirstOrDefault();
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
