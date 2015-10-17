using AutoMapper;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;

namespace BLL
{
    public class mPolizas
    {
        Entities ctx;
        public mPolizas()
        {
            Mapper.CreateMap<POLIZAS, vPOLIZAS>();
            Mapper.CreateMap<vPOLIZAS, POLIZAS>();
        }
        public List<vPOLIZAS> Gets()
        {
            using (ctx = new Entities())
            {
                List<vPOLIZAS> r = new List<vPOLIZAS>();
                List<POLIZAS> b = ctx.POLIZAS.OrderBy(t => t.COD_POL).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vPOLIZAS Get(short ID)
        {
            using (ctx = new Entities())
            {
                vPOLIZAS r = new vPOLIZAS();
                POLIZAS b = ctx.POLIZAS.Where(t => t.COD_POL == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vPOLIZAS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vPOLIZAS Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private POLIZAS ep = null;
            public vPOLIZAS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.POLIZAS.Where(t => t.COD_POL == oDto.COD_POL).FirstOrDefault();
                if (ep == null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya se encuentra una poliza registrada con este codigo de poliza";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                ep = new POLIZAS();
                Mapper.Map(oDto, ep);
                ctx.POLIZAS.Add(ep);
                byaRpt.id = ep.COD_POL.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vPOLIZAS oDto { get; set; }
            public POLIZAS ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.POLIZAS.Where(t => t.COD_POL == oDto.COD_POL).FirstOrDefault();
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
