using AutoMapper;
using Entidades;
using Entidades.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Contratos.Gestion
{
    public class mAseguradoras:absBLL
    {
        public mAseguradoras()
        {
            Mapper.CreateMap<ASEGURADORAS, vAseguradoras>();
            Mapper.CreateMap<vAseguradoras, ASEGURADORAS>(); 
        }
        public List<vAseguradoras> GetAseguradoras()
        {
            List<vAseguradoras> List = new List<vAseguradoras>();
            using (ctx = new Entities())
            {

                var query = ctx.ASEGURADORAS.ToList();
                Mapper.Map(query, List);


            }
            return List;

        }
    }
}
