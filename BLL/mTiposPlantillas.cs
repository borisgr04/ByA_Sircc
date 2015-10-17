using Entidades;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;

namespace BLL
{
    public class mTiposPlantillas
    {
        Entities ctx;
        public mTiposPlantillas()
        {
            Mapper.CreateMap<vPL_TIPOS_PLANTILLA, PL_TIPOS_PLANTILLA>();
            Mapper.CreateMap<PL_TIPOS_PLANTILLA, vPL_TIPOS_PLANTILLA>();
        }
        public List<vPL_TIPOS_PLANTILLA> Gets()
        {
            using (ctx = new Entities())
            {
                List<vPL_TIPOS_PLANTILLA> r = new List<vPL_TIPOS_PLANTILLA>();
                List<PL_TIPOS_PLANTILLA> b = ctx.PL_TIPOS_PLANTILLA.OrderByDescending(t => t.NOM_TIP).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
    }
}
