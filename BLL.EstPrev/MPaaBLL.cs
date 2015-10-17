using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Entidades.Vistas;
using Entidades;
using ByA;

namespace BLL.EstPrev
{
    public class MPaaBLL
    {
        Entities ctx;
        public MPaaBLL()
        {
            Mapper.CreateMap<vEP_MPAA, EP_MPAA>();
            Mapper.CreateMap<EP_MPAA, vEP_MPAA>();
        }
        public List<vEP_MPAA> Gets(short Vigencia)
        {
            using (ctx = new Entities())
            {
                List<vEP_MPAA> lr = new List<vEP_MPAA>();
                List<EP_MPAA> l = ctx.EP_MPAA.Where(t => t.VIGENCIA == Vigencia).ToList();
                Mapper.Map(l, lr);
                return lr;
            }
        }
        public vEP_MPAA Get(decimal ID)
        {
            using (ctx = new Entities())
            {
                vEP_MPAA lr = new vEP_MPAA();
                EP_MPAA l = ctx.EP_MPAA.Where(t => t.ID == ID).FirstOrDefault();
                Mapper.Map(l, lr);
                return lr;
            }
        }
        public ByARpt Insert(vEP_MPAA Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vEP_MPAA Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private EP_MPAA ep = null;
            public vEP_MPAA oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                return true;
            }

            protected override void Antes()
            {
                Entities ctx2 = new Entities();
                EP_MPAA Old = ctx2.EP_MPAA.OrderByDescending(t => t.ID).FirstOrDefault();
                ep = new EP_MPAA();
                Mapper.Map(oDto, ep);
                if (Old == null) ep.ID = 1;
                else ep.ID = Old.ID + 1;               
                ctx.EP_MPAA.Add(ep);
                byaRpt.id = ep.ID.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vEP_MPAA oDto { get; set; }
            public EP_MPAA ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                ep = ctx.EP_MPAA.Where(t => t.ID == oDto.ID).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected override void Antes()
            {
                Mapper.Map(oDto, ep);
            }
            #endregion
        }
    }
}
