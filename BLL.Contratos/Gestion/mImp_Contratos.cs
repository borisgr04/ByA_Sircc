using AutoMapper;
using ByA;
using Entidades;
using Entidades.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Contratos.Gestion
{
    public class mImp_Contratos:absBLL
    {
        public mImp_Contratos()
        {
            Mapper.CreateMap<IMP_CONTRATOS,vImp_Contratos>()
                .ForMember(dest => dest.NOM_IMP, opt => opt.MapFrom(src => src.IMPUESTOS.NOM_IMP));

            Mapper.CreateMap<vImp_Contratos, IMP_CONTRATOS>(); 
        }
        public ByARpt Insert(vImp_Contratos Reg)
        {
            Reg.FEC_REG = DateTime.Now;
            IMP_CONTRATOS r = new IMP_CONTRATOS();         
            Mapper.Map(Reg, r);
            cmdInsert o = new cmdInsert { reg = r };
            return o.Enviar();
        }
        public ByARpt Update(vImp_Contratos Reg)
        {
            IMP_CONTRATOS r = new IMP_CONTRATOS();
            Mapper.Map(Reg, r);
            cmdUpdate o = new cmdUpdate { reg = r };
            return o.Enviar();
        }
        public ByARpt Delete(vImp_Contratos Reg)
       {
           IMP_CONTRATOS r = new IMP_CONTRATOS();           
           Mapper.Map(Reg, r);
           cmdDelete o = new cmdDelete { reg = r };
           return o.Enviar();
       }
        public List<vImp_Contratos> GetImp_Contratos(string Cod_Con)
        {
            List<vImp_Contratos> LstT = new List<vImp_Contratos>();
            using (ctx = new Entities())
            {
                List<IMP_CONTRATOS> lstO = ctx.IMP_CONTRATOS.Where(t => t.COD_CON == Cod_Con).ToList();
                //var query = ctx.IMP_CONTRATOS.Where(t => t.COD_CON == Cod_Con).
                //             Select(t => new  { t.NRO_IMP, t.IMPUESTOS.NOM_IMP,
                //                 t.VIG_LIQ,
                //                 t.NRO_COM, 
                //                 t.VAL_IMP,
                //                 t.COD_SOP,}).ToList();
             
                //foreach (var item in query)
                //{
                //    vImp_Contratos p = new vImp_Contratos();
                //    p.NRO_IMP = item.NRO_IMP;
                //    p.NOM_IMP = item.NOM_IMP;
                //    p.VIG_LIQ = item.VIG_LIQ;
                //    p.NRO_COM = item.NRO_COM;
                //    p.VAL_IMP = item.VAL_IMP;
                //    p.COD_SOP = item.COD_SOP;           
                //    List.Add(p);
                    
                //}
                Mapper.Map(lstO, LstT);
                
                
            }
            return LstT;

        }
      
      

    class cmdUpdate : absTemplate
    {
        public IMP_CONTRATOS reg { get; set; }
        public IMP_CONTRATOS found { get; set; }
        protected  override bool esValido()
        {
            return true;
            
        }
        protected  override void Antes()
        {
           
            
            ctx.Entry(found).State = System.Data.EntityState.Modified;
        }
    }
    class cmdInsert : absTemplate
    {
        public IMP_CONTRATOS reg { get; set; }
        protected  override bool esValido()
        {
            return true;
        }
        protected  override void Antes()
        {
            //Mapear Objeto DTO a Ado Entity FrameWork




            try
            {
                reg.ID = ctx.IMP_CONTRATOS.Select(t => t.ID).Max() + 1;
            }
            catch (System.Exception)
            {

                reg.ID = 1;
            }
            
            ctx.IMP_CONTRATOS.Add(reg);
            byaRpt.id = reg.ID.ToString();
        }


    }
    class cmdDelete : absTemplate
    {
        public IMP_CONTRATOS reg { get; set; }
        public IMP_CONTRATOS found { get; set; }
        protected  override bool esValido()
        {
            found = ctx.IMP_CONTRATOS.Where(t =>t.COD_CON == reg.COD_CON && t.NRO_IMP==reg.NRO_IMP).FirstOrDefault();
            if (found != null)
            {
                return true;
            }
            else
            {
                byaRpt.Mensaje = "No se encontro el impuesto registrado";
                byaRpt.Error = true;
                return !byaRpt.Error;
                
            }
            
        }
        protected  override void Antes()
        {
            //Mapear Objeto DTO a Ado Entity FrameWork
            ctx.IMP_CONTRATOS.Remove(found);
        }


    }
    }
}
