using AutoMapper;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;

namespace BLL
{
    public class ModalidadesBLL
    {
        Entities ctx;
        public ModalidadesBLL()
        {
            Mapper.CreateMap<TIPOSPROC, vTIPOSPROC>();
            Mapper.CreateMap<vTIPOSPROC, TIPOSPROC>();
        }
        public List<vTIPOSPROC> Gets()
        {
            using (ctx = new Entities())
            {
                List<vTIPOSPROC> r = new List<vTIPOSPROC>();
                List<TIPOSPROC> b = ctx.TIPOSPROC.OrderBy(t => t.COD_TPROC).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vTIPOSPROC Get(string ID)
        {
            using (ctx = new Entities())
            {
                vTIPOSPROC r = new vTIPOSPROC();
                TIPOSPROC b = ctx.TIPOSPROC.Where(t => t.COD_TPROC == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vTIPOSPROC Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vTIPOSPROC Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private TIPOSPROC ep = null;
            public vTIPOSPROC oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                // hacer las validaciones respectivas
                return true;
            }

            protected internal override void Antes()
            {
                string codigo = "";
                TIPOSPROC oldTipoPro = ctx.TIPOSPROC.OrderByDescending(t => t.COD_TPROC).FirstOrDefault();
                if (oldTipoPro == null) codigo = "TP00";
                else
                {
                    string cod = (int.Parse(oldTipoPro.COD_TPROC.Substring(2, 2)) + 1).ToString();
                    int tamaño = cod.Length;
                    for (int i = 1; i <= 2 - tamaño; i++)
                    {
                        cod = "0" + cod;
                    }
                    codigo = "TP" + cod;
                }
                oDto.COD_TPROC = codigo;
                ep = new TIPOSPROC();
                Mapper.Map(oDto, ep);
                ctx.TIPOSPROC.Add(ep);
                byaRpt.id = ep.COD_TPROC.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vTIPOSPROC oDto { get; set; }
            public TIPOSPROC ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.TIPOSPROC.Where(t => t.COD_TPROC == oDto.COD_TPROC).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected internal override void Antes()
            {
                Mapper.Map(oDto, ep);
            }
            #endregion
        }

        public List<vTIPOSPROC> GetsActivo()
        {
            using (ctx = new Entities())
            {
                List<vTIPOSPROC> r = new List<vTIPOSPROC>();
                List<TIPOSPROC> b = ctx.TIPOSPROC.Where(t=> t.ESTA_TPROC == "AC").OrderBy(t => t.COD_TPROC).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
    }
}
