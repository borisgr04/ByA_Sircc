using AutoMapper;
using Entidades;
using Entidades.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Contratos.Gestion
{
    public class mImpuestos:absBLL
    {
         public mImpuestos()
       {
           Mapper.CreateMap<IMPUESTOS, vImpuestos>();
           Mapper.CreateMap<vImpuestos, IMPUESTOS>();
       }
         public List<vImpuestos> GetImpuesto()
        {
            List<vImpuestos> List = new List<vImpuestos>();
            using (ctx = new Entities())
            {
                List<IMPUESTOS> query = ctx.IMPUESTOS.ToList();
                Mapper.Map(query, List);
            }
            return List;

        }
    }
}
