using AutoMapper;
using Entidades;
using Entidades.VistasProcDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Procesos.Gestion
{
    public class mPEstados : absBLL
    {
        public mPEstados()
        { 
            Mapper.CreateMap<PESTADOS, vPEstados_DTO>(); 
        }

        public List<vPEstados_DTO> _GetEstados()
        {
            List<vPEstados_DTO> List =new  List<vPEstados_DTO>();
            using (ctx = new Entities())
            {
                //Where(t=>t.COD_EST!="00")
               var query= ctx.PESTADOS.OrderBy(t=>t.NOM_EST).ToList();
              
                Mapper.Map(query, List);


            }
            return List;
        }
       
    }
}
