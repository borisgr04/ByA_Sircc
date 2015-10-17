using AutoMapper;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;

namespace BLL
{
    public class SubTiposContratosBLL
    {
        Entities ctx;
        public SubTiposContratosBLL()
        {
            Mapper.CreateMap<SUBTIPOS, vSUBTIPOS>();
            Mapper.CreateMap<vSUBTIPOS, SUBTIPOS>();
        }
        public List<vSUBTIPOS> Gets(string COD_TIP)
        {
            using (ctx = new Entities())
            {
                List<vSUBTIPOS> r = new List<vSUBTIPOS>();
                List<SUBTIPOS> b = ctx.SUBTIPOS.Where(t=> t.COD_TIP == COD_TIP).OrderBy(t => t.COD_STIP).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vSUBTIPOS Get(string ID)
        {
            using (ctx = new Entities())
            {
                vSUBTIPOS r = new vSUBTIPOS();
                SUBTIPOS b = ctx.SUBTIPOS.Where(t => t.COD_STIP == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vSUBTIPOS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vSUBTIPOS Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private SUBTIPOS ep = null;
            public vSUBTIPOS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                // Hacer las validaciones necesarias
                return true;
            }

            protected internal override void Antes()
            {
                string codigo = "";
                SUBTIPOS oldTipoPro = ctx.SUBTIPOS.Where(t=> t.COD_TIP == oDto.COD_TIP).OrderByDescending(t => t.COD_TIP).OrderByDescending(t=> t.COD_STIP).FirstOrDefault();
                if (oldTipoPro == null) codigo = oDto.COD_TIP + "001";
                else
                {
                    string cod = (int.Parse(oldTipoPro.COD_STIP.Substring(2,3)) + 1).ToString();
                    int tamaño = cod.Length;
                    for (int i = 1; i <= 3 - tamaño; i++)
                    {
                        cod = "0" + cod;
                    }
                    codigo = oDto.COD_TIP + cod;
                }
                oDto.COD_STIP = codigo;
                ep = new SUBTIPOS();
                Mapper.Map(oDto, ep);
                ctx.SUBTIPOS.Add(ep);
                byaRpt.id = ep.COD_STIP.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vSUBTIPOS oDto { get; set; }
            public SUBTIPOS ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.SUBTIPOS.Where(t => t.COD_STIP == oDto.COD_STIP).FirstOrDefault();
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
