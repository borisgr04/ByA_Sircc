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
    public class EstadosBLL
    {
        Entities ctx;
        public EstadosBLL()
        {
            Mapper.CreateMap<ESTADOS, vESTADOS>();
            Mapper.CreateMap<vESTADOS, ESTADOS>();
        }
        public List<vESTADOS> Gets()
        {
            using (ctx = new Entities())
            {
                List<vESTADOS> r = new List<vESTADOS>();
                List<ESTADOS> b = ctx.ESTADOS.OrderBy(t => t.COD_EST).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
    }
}
