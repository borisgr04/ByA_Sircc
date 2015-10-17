using AutoMapper;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;

namespace BLL
{
    public class TiposContratosBLL
    {
        Entities ctx;
        public TiposContratosBLL()
        {
            Mapper.CreateMap<TIPOSCONT, vTIPOSCONT>();
            Mapper.CreateMap<vTIPOSCONT, TIPOSCONT>();
        }
        public List<vTIPOSCONT> Gets()
        {
            using (ctx = new Entities())
            {
                List<vTIPOSCONT> r = new List<vTIPOSCONT>();
                List<TIPOSCONT> b = ctx.TIPOSCONT.OrderBy(t => t.COD_TIP).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vTIPOSCONT Get(string ID)
        {
            using (ctx = new Entities())
            {
                vTIPOSCONT r = new vTIPOSCONT();
                TIPOSCONT b = ctx.TIPOSCONT.Where(t => t.COD_TIP == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vTIPOSCONT Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vTIPOSCONT Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private TIPOSCONT ep = null;
            public vTIPOSCONT oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                TIPOSCONT tc = ctx.TIPOSCONT.Where(t => t.NOM_TIP == oDto.NOM_TIP).FirstOrDefault();
                if (tc == null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya existe un tipo de contrato con ese nombre";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                string codigo = "";
                TIPOSCONT oldTipoPro = ctx.TIPOSCONT.OrderByDescending(t => t.COD_TIP).FirstOrDefault();
                if (oldTipoPro == null) codigo = "01";
                else
                {
                    string cod = (int.Parse(oldTipoPro.COD_TIP) + 1).ToString();
                    for (int i = 1; i <= 2 - cod.Length; i++)
                    {
                        cod = "0" + cod;
                    }
                    codigo = cod;
                }
                oDto.COD_TIP = codigo;
                ep = new TIPOSCONT();
                Mapper.Map(oDto, ep);
                ctx.TIPOSCONT.Add(ep);
                byaRpt.id = ep.COD_TIP.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vTIPOSCONT oDto { get; set; }
            public TIPOSCONT ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.TIPOSCONT.Where(t => t.COD_TIP == oDto.COD_TIP).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected internal override void Antes()
            {
                Mapper.Map(oDto, ep);
            }
            #endregion
        }

        public List<vTIPOSCONT> GetsActivos()
        {
            using (ctx = new Entities())
            {
                List<vTIPOSCONT> r = new List<vTIPOSCONT>();
                List<TIPOSCONT> b = ctx.TIPOSCONT.Where(t=> t.EST_TIP == "AC").OrderBy(t => t.COD_TIP).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
    }
}
