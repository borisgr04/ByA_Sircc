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
    public class TiposDocumentosBLL
    {
        Entities ctx;
        public TiposDocumentosBLL()
        {
            Mapper.CreateMap<TIP_DOC, vTIP_DOC>()
                .ForMember(dest => dest.NOM_EST, opt => opt.MapFrom(src => src.EST_TIP == "AC" ? "ACTIVO" : "INACTIVO"))
                .ForMember(dest => dest.NOM_ORIGEN, opt => opt.MapFrom(src => src.ORIGEN == "E" ? "ENTIDAD" : "CONTRATISTA"))
                .ForMember(dest => dest.NOM_ETAPA, opt => opt.MapFrom(src => src.ETAPAS.NOM_ETA));
            Mapper.CreateMap<vTIP_DOC, TIP_DOC>();
        }
        public List<vTIP_DOC> Gets()
        {
            using (ctx = new Entities())
            {
                List<vTIP_DOC> r = new List<vTIP_DOC>();
                List<TIP_DOC> b = ctx.TIP_DOC.OrderBy(t => t.COD_TIP).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vTIP_DOC Get(string ID)
        {
            using (ctx = new Entities())
            {
                vTIP_DOC r = new vTIP_DOC();
                TIP_DOC b = ctx.TIP_DOC.Where(t => t.COD_TIP == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vTIP_DOC Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vTIP_DOC Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private TIP_DOC ep = null;
            public vTIP_DOC oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                TIP_DOC tc = ctx.TIP_DOC.Where(t => t.DES_TIP == oDto.DES_TIP).FirstOrDefault();
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
                TIP_DOC oldTipoPro = ctx.TIP_DOC.OrderByDescending(t => t.COD_TIP).FirstOrDefault();
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
                ep = new TIP_DOC();
                Mapper.Map(oDto, ep);
                ctx.TIP_DOC.Add(ep);
                byaRpt.id = ep.COD_TIP.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vTIP_DOC oDto { get; set; }
            public TIP_DOC ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.TIP_DOC.Where(t => t.COD_TIP == oDto.COD_TIP).FirstOrDefault();
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
