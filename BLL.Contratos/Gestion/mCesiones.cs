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
    public class mCesiones:absBLL   
    {
        public mCesiones()
        {
            Mapper.CreateMap<CESIONES, vCesiones>();
            Mapper.CreateMap<vCesiones, CESIONES>(); 
        }
        public ByARpt Insert(vCesiones Reg)
        {
            
            CESIONES r = new CESIONES();         
            Mapper.Map(Reg, r);
            cmdInsert o = new cmdInsert { reg = r };
            return o.Enviar();
        }
        public ByARpt Delete(vCesiones Reg)
        {

            CESIONES r = new CESIONES();
            Mapper.Map(Reg, r);
            cmdDelete o = new cmdDelete { reg = r };
            return o.Enviar();
        }
        public List<vCesiones> GetCesiones(string Cod_Con)
        {
            List<vCesiones> List = new List<vCesiones>();
            using (ctx = new Entities())
            {
                var query = ctx.CESIONES.Where(t=>t.COD_CON==Cod_Con).ToList();
                Mapper.Map(query, List);             
                
            }
            return List;

        }
      
      

   
    class cmdInsert : absTemplate
    {
        public CONTRATOS found { get; set; }
        public CESIONES reg { get; set; }
        protected  override bool esValido()
        {
            if (reg.NIT_NUE != "")
            {
                if (reg.FEC_CES != null)
                {
                    if (reg.FEC_RES != null)
                    {
                        found = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
                        if (found != null)
                        {
                            if (reg.NIT_NUE != found.IDE_CON)
                            {
                                reg.NIT_ANT = found.IDE_CON;
                                found.IDE_CON = reg.NIT_NUE;
                                byaRpt.Error = false;
                                return true;
                            }
                            else
                            {
                                byaRpt.Mensaje = "Ha seleccionado el mismo contratista";
                                byaRpt.Error = true;
                                return !byaRpt.Error;
                            }
                        }
                        else
                        {

                            byaRpt.Mensaje = "No se encontro contrato";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                    }
                    else
                    {
                        byaRpt.Mensaje = "La Fecha de Resolución no puede estar vacia";
                        byaRpt.Error = true;
                        return false;
                    }
                }
                else
                {
                    byaRpt.Mensaje = "La Fecha de Cesión no puede estar vacia";
                    byaRpt.Error = true;
                    return false;
                }
            }
            else
            {
                byaRpt.Mensaje = "Debe especificar seleccionar un nuevo contratista";
                byaRpt.Error = true;
                return false;
            }            
        }
        protected  override void Antes()
        {
            //Mapear Objeto DTO a Ado Entity FrameWork
            ctx.CESIONES.Add(reg);
            ctx.Entry(found).State = System.Data.EntityState.Modified;
            
        }


    }
    class cmdDelete : absTemplate
    {
        public CESIONES found { get; set; }
        public CONTRATOS found2 { get; set; }
        public CESIONES reg { get; set; }
        protected override bool esValido()
        {
            found2 = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
            found = ctx.CESIONES.Where(t => t.COD_CON == reg.COD_CON && t.NIT_ANT==reg.NIT_ANT && t.NIT_NUE==reg.NIT_NUE).FirstOrDefault();
            if (found != null && found2!=null)
            {
               
                found2.IDE_CON = reg.NIT_ANT;
                byaRpt.Error = false;
                return true;
            }
            else
            {

                byaRpt.Mensaje = "No se encontro contrato";
                byaRpt.Error = true;
                return !byaRpt.Error;
            }
        }
        protected override void Antes()
        {
            //Mapear Objeto DTO a Ado Entity FrameWork 
            ctx.CESIONES.Remove(found);
            ctx.Entry(found2).State = System.Data.EntityState.Modified;
           

        }


    }
    }
}
