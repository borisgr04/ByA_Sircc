using AutoMapper;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;

namespace BLL
{
    public class DependenciasBLL
    {
        Entities ctx;
        public DependenciasBLL()
        {
            Mapper.CreateMap<DEPENDENCIA, vDEPENDENCIA>();
            Mapper.CreateMap<vDEPENDENCIA, DEPENDENCIA>();
        }
        public List<vDEPENDENCIA> Gets()
        {
            using (ctx = new Entities())
            {
                List<vDEPENDENCIA> r = new List<vDEPENDENCIA>();
                List<DEPENDENCIA> b = ctx.DEPENDENCIA.OrderBy(t=> t.COD_DEP).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vDEPENDENCIA Get(string ID)
        {
            using (ctx = new Entities())
            {
                vDEPENDENCIA r = new vDEPENDENCIA();
                DEPENDENCIA b = ctx.DEPENDENCIA.Where(t => t.COD_DEP == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vDEPENDENCIA Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vDEPENDENCIA Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private DEPENDENCIA ep = null;
            public vDEPENDENCIA oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                // hacer las validaciones necesarias
                return true;
            }

            protected internal override void Antes()
            {
                string codigo = "";
                DEPENDENCIA oldTipoPro = ctx.DEPENDENCIA.OrderByDescending(t => t.COD_DEP).FirstOrDefault();
                if (oldTipoPro == null) codigo = "00";
                else
                {
                    string cod = (int.Parse(oldTipoPro.COD_DEP) + 1).ToString();
                    int tamaño = cod.Length;
                    for (int i = 1; i <= 2 - tamaño; i++)
                    {
                        cod = "0" + cod;
                    }
                    codigo = cod;
                }
                oDto.COD_DEP = codigo;
                ep = new DEPENDENCIA();
                Mapper.Map(oDto, ep);
                ctx.DEPENDENCIA.Add(ep);
                byaRpt.id = ep.COD_DEP.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vDEPENDENCIA oDto { get; set; }
            public DEPENDENCIA ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.DEPENDENCIA.Where(t => t.COD_DEP == oDto.COD_DEP).FirstOrDefault();
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
