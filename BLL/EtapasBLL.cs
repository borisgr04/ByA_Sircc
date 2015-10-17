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
    public class EtapasBLL
    {
        Entities ctx;
        public EtapasBLL()
        {
            Mapper.CreateMap<ETAPAS, vETAPAS>();
            Mapper.CreateMap<vETAPAS, ETAPAS>();
        }
        public List<vETAPAS> Gets()
        {
            using (ctx = new Entities())
            {
                List<vETAPAS> r = new List<vETAPAS>();
                List<ETAPAS> b = ctx.ETAPAS.OrderBy(t => t.COD_ETA).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vETAPAS Get(string ID)
        {
            using (ctx = new Entities())
            {
                vETAPAS r = new vETAPAS();
                ETAPAS b = ctx.ETAPAS.Where(t => t.COD_ETA == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vETAPAS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vETAPAS Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private ETAPAS ep = null;
            public vETAPAS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.ETAPAS.Where(t => t.COD_ETA == oDto.COD_ETA).FirstOrDefault();
                if (ep == null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya se encuentra una etapa registrada con este codigo";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                int idx = 0;
                ETAPAS oldEtapa = ctx.ETAPAS.OrderByDescending(t => t.COD_ETA).FirstOrDefault();
                if (oldEtapa != null)
                {
                    idx = int.Parse(oldEtapa.COD_ETA);
                }

                string strId = (idx + 1).ToString();
                int tam = strId.Length;
                for (decimal i = 1; i <= 2 - tam; i++)
                {
                    strId = "0" + strId;
                }
                oDto.COD_ETA = strId;

                ep = new ETAPAS();
                Mapper.Map(oDto, ep);
                ctx.ETAPAS.Add(ep);
                byaRpt.id = ep.COD_ETA.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vETAPAS oDto { get; set; }
            public ETAPAS ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.ETAPAS.Where(t => t.COD_ETA == oDto.COD_ETA).FirstOrDefault();
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
