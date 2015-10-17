using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using Entidades;
using ByA;
using Entidades.Vistas;

namespace BLL
{
    public class DT_ParametrosBLL
    {
        Entities ctx;
        public DT_ParametrosBLL()
        {
            Mapper.CreateMap<DT_PARAMETROS, vDT_PARAMETROS>();
            Mapper.CreateMap<vDT_PARAMETROS, DT_PARAMETROS>();
        }
        public vDT_PARAMETROS Get(string ID)
        {
            using (ctx = new Entities())
            {
                vDT_PARAMETROS r = new vDT_PARAMETROS();
                DT_PARAMETROS b = ctx.DT_PARAMETROS.Where(t => t.NOMBRE == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
    }
}
