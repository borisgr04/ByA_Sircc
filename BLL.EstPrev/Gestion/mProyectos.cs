using AutoMapper;
using ByA;
using Entidades;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.EstPrev.Gestion
{
    public class mProyectos:absBLL
    {
        public mProyectos()
       {
           Mapper.CreateMap<PROYECTOS, vPROYECTOS>();
           Mapper.CreateMap<vPROYECTOS, PROYECTOS>();
       }
        public ByARpt Insert(vPROYECTOS Reg)
       {
           PROYECTOS r = new PROYECTOS();
           Mapper.Map(Reg, r);
           cmdInsert o = new cmdInsert { reg = r };
           return o.Enviar();
       }
        public ByARpt Delete(vPROYECTOS Reg)
       {
           PROYECTOS r = new PROYECTOS();
           Mapper.Map(Reg, r);
           cmdDelete o = new cmdDelete { reg = r };
           return o.Enviar();
       }
        public ByARpt Update(vPROYECTOS Reg)
       {
           PROYECTOS r = new PROYECTOS();
           Mapper.Map(Reg, r);
           cmdUpdate o = new cmdUpdate { reg = r };
           return o.Enviar();
       }
        public List<vPROYECTOS> GetProyectoss(string Vigencia)
        {
            List<vPROYECTOS> List = new List<vPROYECTOS>();
            using (ctx = new Entities())
            {
                var query = ctx.PROYECTOS.Where(t=> t.VIGENCIA == Vigencia).ToList();
                Mapper.Map(query, List); 
            }
            return List;

        }
        public vPROYECTOS GetProyectos(string idProyecto)
        {
            vPROYECTOS Proyecto = new vPROYECTOS();
            using (ctx = new Entities())
            {
                var query = ctx.PROYECTOS.Where(t => t.PROYECTO == idProyecto).FirstOrDefault();
                Mapper.Map(query, Proyecto);


            }
            return Proyecto;

        }
    
       class cmdUpdate : absTemplate
       {
           public PROYECTOS reg { get; set; }
           public PROYECTOS found { get; set; }
           protected override bool esValido()
           {
               found = ctx.PROYECTOS.Where(t => t.PROYECTO == reg.PROYECTO).FirstOrDefault();
               if (found != null)
               {
                   found.VIGENCIA = reg.VIGENCIA;
                   found.NOMBRE_PROYECTO = reg.NOMBRE_PROYECTO;
                   found.FECHA_RAD = reg.FECHA_RAD;
                   if (reg.COMITE == "")
                   {
                       reg.COMITE = null;
                   }
                   found.COMITE = reg.COMITE;
                   found.VALOR = reg.VALOR;
                   found.ESTADO = reg.ESTADO; 
    
                   found.APORTES_PROPIOS = reg.APORTES_PROPIOS;
                   found.NOM_MUN = reg.NOM_MUN;
                   found.DEP_NOM = reg.DEP_NOM;
                   found.TIP_PRO = reg.TIP_PRO;
                   found.IDE_APORTANTE = reg.IDE_APORTANTE;
                   found.NECESIDAD = reg.NECESIDAD;
                   found.BPIN = reg.BPIN;

                   return true;
               }
               else
               {
                   byaRpt.Mensaje = "No se encontro La Adicion";
                   byaRpt.Error = true;
                   return !byaRpt.Error;
               }


           }
           protected override void Antes()
           {


               ctx.Entry(found).State = System.Data.EntityState.Modified;
           }
       }
       class cmdInsert : absTemplate
       {
           public PROYECTOS found { get; set; }
           public PROYECTOS reg { get; set; }
           protected override bool esValido()
           {
               return true;
           }
           protected override void Antes()
           {
               //Mapear Objeto DTO a Ado Entity FrameWork    
                         
               ctx.PROYECTOS.Add(reg);
              
           }


       }
       class cmdDelete : absTemplate
       {
           public PROYECTOS reg { get; set; }
           public PROYECTOS found { get; set; }
           protected override bool esValido()
           {
               found = ctx.PROYECTOS.Where(t => t.PROYECTO == reg.PROYECTO).FirstOrDefault();
               if (found != null)
               {
                   return true;
               }
               else
               {
                   byaRpt.Mensaje = "No se Encontro La Adicion";
                   byaRpt.Error = true;
                   return !byaRpt.Error;
               }

           }
           protected override void Antes()
           {
               //Mapear Objeto DTO a Ado Entity FrameWork
               ctx.PROYECTOS.Remove(found);
           }


       }
    }
}
