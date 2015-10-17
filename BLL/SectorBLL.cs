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
    public class SectorBLL
    {
        Entities ctx;
        public SectorBLL()
        {
            Mapper.CreateMap<SECTOR, vSECTOR>();
            Mapper.CreateMap<vSECTOR, SECTOR>();
        }
        public List<vSECTOR> GetsActivos()
        {
            using (ctx = new Entities())
            {
                List<vSECTOR> r = new List<vSECTOR>();
                List<SECTOR> b = ctx.SECTOR.Where(t => t.ESTADO == "AC").OrderBy(t => t.COD_SEC).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
    }
}
