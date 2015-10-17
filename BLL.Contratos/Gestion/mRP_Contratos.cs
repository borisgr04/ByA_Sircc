using AutoMapper;
using ByA;
using Entidades;
using Entidades.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AgenteServicio;

namespace BLL.Contratos.Gestion
{
   public  class mRP_Contratos:absBLL
    {
       public mRP_Contratos()
        {
            Mapper.CreateMap<RUBROS_CONTRATOS, vRUBROS_CONTRATOS>();
            Mapper.CreateMap<RUBROS_CONTRATOS, vRUBROS_CONTRATOS>();
            
            Mapper.CreateMap<RP_CONTRATOS, vRP_CONTRATOS>()
                .ForMember(dest => dest.RUBROS_CONTRATOS, opt => opt.MapFrom(src => src.RUBROS_CONTRATOS));
            Mapper.CreateMap<vRP_CONTRATOS, RP_CONTRATOS>()
                .ForMember(dest => dest.RUBROS_CONTRATOS, obj => obj.MapFrom(src => src.RUBROS_CONTRATOS));
        }
       public ByARpt Insert(vRP_CONTRATOS Reg)
        {
            Reg.FEC_REG = DateTime.Now;
            RP_CONTRATOS r = new RP_CONTRATOS();

            List<vRUBROS_CONTRATOS> lRubrosReg = new List<vRUBROS_CONTRATOS>();
            ICollection<vRUBROS_CONTRATOS> rubrosAux = Reg.RUBROS_CONTRATOS;
            foreach (vRUBROS_CONTRATOS item in rubrosAux)
            {
                lRubrosReg.Add(item);
            }
            Reg.RUBROS_CONTRATOS = null;
            Mapper.Map(Reg, r);
            cmdInsert o = new cmdInsert { reg = r,lRegRubros = lRubrosReg};
            return o.Enviar();
        }
       public ByARpt Update(vRP_CONTRATOS Reg)
        {
            RP_CONTRATOS r = new RP_CONTRATOS();
            Mapper.Map(Reg, r);
            cmdUpdate o = new cmdUpdate { reg = r };
            return o.Enviar();
        }
       public ByARpt Delete(vRP_CONTRATOS Reg)
       {
           RP_CONTRATOS r = new RP_CONTRATOS();
           Mapper.Map(Reg, r);
           cmdDelete o = new cmdDelete { reg = r };
           return o.Enviar();
       }
       public List<vRP_CONTRATOS> GetRPContratos(string Cod_Con)
        {
            List<vRP_CONTRATOS> List = new List<vRP_CONTRATOS>();
            using (ctx = new Entities())
            {

                List<RP_CONTRATOS> query = ctx.RP_CONTRATOS.Where(t => t.COD_CON == Cod_Con).ToList();
                Mapper.Map(query, List);                
            }
            return List;

        }
       public List<object> GetRPExt(string NRO_RP, string VIGENCIA)
       {
           RP_Proxy oProxy = new RP_Proxy();
           return oProxy.GetRPsExt(NRO_RP,VIGENCIA);
       }

       
      

    class cmdUpdate : absTemplate
   {
        public RP_CONTRATOS reg { get; set; }
        public RP_CONTRATOS found { get; set; }
        protected override bool esValido()
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
        public RP_CONTRATOS reg { get; set; }        
        public List<vRUBROS_CONTRATOS> lRegRubros { get; set; }
        protected  override bool esValido()
        {
            RP_CONTRATOS Dto = ctx.RP_CONTRATOS.Where(t => t.VIGENCIA == reg.VIGENCIA && t.COD_CON == reg.COD_CON && t.NRO_RP == reg.NRO_RP).FirstOrDefault();
            if (Dto == null) return true;
            else
            {
                byaRpt.Mensaje = "Ya existe un RP registrado con las mismas caracteristicas";
                byaRpt.Error = true;
                return false;
            }
        }
        protected  override void Antes()
        {
            //Mapear Objeto DTO a Ado Entity FrameWork
            ctx.RP_CONTRATOS.Add(reg);
            InsertRubros();
            
        }
        private void InsertRubros()
        {
            decimal ultId = 0;
            try
            {
                ultId = ctx.RUBROS_CONTRATOS.Max(t => t.ID);
            }
            catch { }
            foreach (vRUBROS_CONTRATOS item in lRegRubros)
            {
                RUBROS_CONTRATOS rub = new RUBROS_CONTRATOS();
                rub.FEC_REG = DateTime.Now;
                rub.COD_CON = reg.COD_CON;
                ultId ++;
                rub.ID = ultId;
                rub.COD_RUB = item.COD_RUB;
                rub.NOM_RUB = item.NOM_RUB;
                rub.VAL_COMPROMISO = item.VAL_COMPROMISO;
                rub.NRO_RP = reg.NRO_RP;
                rub.VIGENCIA = reg.VIGENCIA;
                ctx.RUBROS_CONTRATOS.Add(rub);
            }
        }
    }
    class cmdDelete : absTemplate
    {
        public RP_CONTRATOS reg { get; set; }
        public RP_CONTRATOS found { get; set; }
        protected  override bool esValido()
        {
            found = ctx.RP_CONTRATOS.Where(t => t.NRO_RP == reg.NRO_RP && t.COD_CON == reg.COD_CON).FirstOrDefault();
            if (found != null)
            {
                return true;
            }
            else
            {
                byaRpt.Mensaje = "No se encontró el Rp";
                byaRpt.Error = true;
                return !byaRpt.Error;
            }
            
        }
        private void EliminarRubros()
        {
            List<RUBROS_CONTRATOS> lRubros = ctx.RUBROS_CONTRATOS.Where(t => t.VIGENCIA == reg.VIGENCIA && t.NRO_RP == reg.NRO_RP && t.COD_CON == reg.COD_CON).ToList();
            foreach (RUBROS_CONTRATOS item in lRubros)
            {
                ctx.RUBROS_CONTRATOS.Remove(item);
            }
        }
        protected  override void Antes()
        {
            EliminarRubros();
            //Mapear Objeto DTO a Ado Entity FrameWork
            ctx.RP_CONTRATOS.Remove(found);
        }


    }

    }
}
