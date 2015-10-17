using AutoMapper;
using ByA;
using Entidades;
using Entidades.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Contratos.Gestion
{
    public class mTipo_Adiciones:absBLL
    {
        public mTipo_Adiciones()
       {
           Mapper.CreateMap<TIPO_ADCIONES, vTipo_Adiciones>();
           Mapper.CreateMap<vTipo_Adiciones, TIPO_ADCIONES>();
       }

        public List<vTipo_Adiciones> GetTip_Adiciones()
        {
            List<vTipo_Adiciones> List = new List<vTipo_Adiciones>();
            using (ctx = new Entities())
            {
                var query = ctx.TIPO_ADCIONES.ToList();
                Mapper.Map(query, List);
            }
            return List;

        }
      
    }
}
