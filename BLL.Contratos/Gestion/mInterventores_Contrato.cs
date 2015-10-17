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
    public class mInterventores_Contrato:absBLL
    {
        public mInterventores_Contrato()
        {
            Mapper.CreateMap<INTERVENTORES_CONTRATO,vInterventores_Contrato>();
            Mapper.CreateMap<vInterventores_Contrato, INTERVENTORES_CONTRATO>(); 
        }
        public ByARpt Insert(vInterventores_Contrato Reg)
        {
           
            INTERVENTORES_CONTRATO r = new INTERVENTORES_CONTRATO();         
            Mapper.Map(Reg, r);
            cmdInsert o = new cmdInsert { reg = r };
            return o.Enviar();
        }
        public ByARpt Update(vInterventores_Contrato Reg)
        {
            INTERVENTORES_CONTRATO r = new INTERVENTORES_CONTRATO();
            Mapper.Map(Reg, r);
            cmdUpdate o = new cmdUpdate { reg = r };
            return o.Enviar();
        }
        public ByARpt Delete(vInterventores_Contrato Reg)
       {
           INTERVENTORES_CONTRATO r = new INTERVENTORES_CONTRATO();           
           Mapper.Map(Reg, r);
           cmdDelete o = new cmdDelete { reg = r };
           return o.Enviar();
       }
        public List<vInterventores_Contrato> GetInterventores_Contrato(string Cod_Con)
        {
            List<vInterventores_Contrato> List = new List<vInterventores_Contrato>();
            using (ctx = new Entities())
            {

                var query = ctx.INTERVENTORES_CONTRATO.Where(t => t.COD_CON == Cod_Con).
                             Select(t => new  { t.IDE_INT,
                                 t.TERCEROS.NOM1_TER,
                                 t.TERCEROS.NOM2_TER,
                                 t.TERCEROS.APE1_TER,
                                 t.TERCEROS.APE2_TER,
                                 t.TIP_INT,
                                 t.COD_CON, 
                                 t.OBS_INT,
                                 t.EST_INT,}).ToList();
             
                foreach (var item in query)
                {
                    vInterventores_Contrato p = new vInterventores_Contrato();
                    p.IDE_INT = item.IDE_INT;
                    p.NOM_INT = item.NOM1_TER+" "+item.NOM2_TER+" "+item.APE1_TER+" "+item.APE2_TER;
                    if (item.TIP_INT == "S"){p.TIP_INT = "Interno(Supervisor)";}
                    if (item.TIP_INT == "I"){p.TIP_INT = "Externo";}
                    if (item.TIP_INT == "T"){p.TIP_INT = "Interno(Apoyo Tecnico)";}
                    p.COD_CON = item.COD_CON;
                    p.OBS_INT = item.OBS_INT;
                    p.EST_INT = item.EST_INT;                        
                    List.Add(p);
                    
                }
                
                
            }
            return List;

        }
      
      

    class cmdUpdate : absTemplate
    {
        public INTERVENTORES_CONTRATO reg { get; set; }
        public INTERVENTORES_CONTRATO found { get; set; }
        protected  override bool esValido()
        {
            found = ctx.INTERVENTORES_CONTRATO.Where(t => t.COD_CON == reg.COD_CON && t.IDE_INT == reg.IDE_INT).FirstOrDefault();
            if (found != null)
            {
                return true;
            }
            else
            {
                byaRpt.Mensaje = "No se encontro el supervisor/interventor";
                byaRpt.Error = true;
                return !byaRpt.Error;
            }
            
        }
        protected  override void Antes()
        {

            found.OBS_INT = reg.OBS_INT;
            found.EST_INT = reg.EST_INT;
            ctx.Entry(found).State = System.Data.EntityState.Modified;
        }
    }
    class cmdInsert : absTemplate
    {
        public INTERVENTORES_CONTRATO reg { get; set; }
        protected  override bool esValido()
        {
            return true;
        }
        protected  override void Antes()
        {
            //Mapear Objeto DTO a Ado Entity FrameWork
            try
            {
                reg.FEC_REG = DateTime.Now;               
                reg.IDE = ctx.INTERVENTORES_CONTRATO.Select(t => t.IDE).Max() + 1;
                
            }
            catch (System.Exception)
            {

                reg.IDE = 1;
            }
            byaRpt.id = reg.IDE.ToString();
            ctx.INTERVENTORES_CONTRATO.Add(reg);
        }


    }
    class cmdDelete : absTemplate
    {
        public INTERVENTORES_CONTRATO reg { get; set; }
        public INTERVENTORES_CONTRATO found { get; set; }
        protected  override bool esValido()
        {
            found = ctx.INTERVENTORES_CONTRATO.Where(t => t.COD_CON == reg.COD_CON && t.IDE_INT == reg.IDE_INT).FirstOrDefault();
            if (found != null)
            {
                return true;
            }
            else
            {
                byaRpt.Mensaje = "No se encontro el supervisor/interventor";
                byaRpt.Error = true;
                return !byaRpt.Error;
            }
            
        }
        protected  override void Antes()
        {
            //Mapear Objeto DTO a Ado Entity FrameWork
            ctx.INTERVENTORES_CONTRATO.Remove(found);
        }


    }
    }
}
