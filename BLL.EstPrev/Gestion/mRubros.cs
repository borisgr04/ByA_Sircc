using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Entidades;
using System.Data;
using AutoMapper;
using System.Data.Entity;
using Entidades.VistasPROC;
using Entidades.Vistas;
using ByA;

namespace BLL.EstPrev.Gestion
{
    public class mRubros
    {
        Entities ctx;
        public mRubros()
        {
            Mapper.CreateMap<RUBROS, vRUBROS>();
            Mapper.CreateMap<vRUBROS, RUBROS>();
        }
        public List<vRUBROS> Gets(short vigencia)
        {
            using (ctx = new Entities())
            {
                List<vRUBROS> lrRubros = new List<vRUBROS>();
                List<RUBROS> lRubros = ctx.RUBROS.Where(t=> t.VIGENCIA == vigencia).OrderByDescending(t=> t.VIGENCIA).ToList();
                Mapper.Map(lRubros, lrRubros);
                return lrRubros;
            }
        }
        public ByARpt Insert(vRUBROS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private RUBROS ep = null;
            public vRUBROS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                RUBROS rubro = ctx.RUBROS.Where(t => t.COD_RUB == oDto.COD_RUB).FirstOrDefault();
                if (rubro == null) return true;
                else return false;
            }

            protected override void Antes()
            {
                ep = new RUBROS();
                Mapper.Map(oDto, ep);
                ctx.RUBROS.Add(ep);
            }
            #endregion
        }

    }
}
