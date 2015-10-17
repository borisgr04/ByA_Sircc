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
   public class mAdiciones:absBLL
    {
       public mAdiciones()
       {
           Mapper.CreateMap<ADICIONES, vAdiciones>();
           Mapper.CreateMap<vAdiciones, ADICIONES>();
       }
       public ByARpt Insert(vAdiciones Reg)
       {
           ADICIONES r = new ADICIONES();
           Mapper.Map(Reg, r);
           cmdInsert o = new cmdInsert { reg = r };
           return o.Enviar();
       }
       public ByARpt Delete(vAdiciones Reg)
       {
           ADICIONES r = new ADICIONES();
           Mapper.Map(Reg, r);
           cmdDelete o = new cmdDelete { reg = r };
           return o.Enviar();
       }   
       public ByARpt Update(vAdiciones Reg)
       {
           ADICIONES r = new ADICIONES();
           Mapper.Map(Reg, r);
           cmdUpdate o = new cmdUpdate { reg = r };
           return o.Enviar();
       }   
       public List<vAdiciones> GetAdiciones(string Cod_Con)
        {
            List<vAdiciones> List = new List<vAdiciones>();
            using (ctx = new Entities())
            {
                var query = ctx.ADICIONES.Where(t => t.COD_CON == Cod_Con).ToList();
                Mapper.Map(query, List);
                    
                
            }
            return List;

        }
       public List<vAdiciones> GetModificatorios(string Cod_Con)
       {
           List<vAdiciones> List = new List<vAdiciones>();
           using (ctx = new Entities())
           {
               var query = ctx.ADICIONES.Where(t => t.COD_CON == Cod_Con).ToList();
               foreach (var item in query)
               {
                   vAdiciones vAdi = new vAdiciones();
                   vAdi.NRO_ADI = item.NRO_ADI;
                   if (item.TIP_ADI == "1")
                   { vAdi.NOM_ADI = "EN VALOR Y PLAZO"; }
                   if (item.TIP_ADI == "2")
                   { vAdi.NOM_ADI = "EN VALOR"; }
                   if (item.TIP_ADI == "3")
                   { vAdi.NOM_ADI = "EN PLAZO"; }
                   if (item.TIP_ADI == "4")
                   { vAdi.NOM_ADI = "ACLARATORIO"; }
                   if (item.TIP_ADI == "5")
                   { vAdi.NOM_ADI = "MODIFICATORIO"; }
                   vAdi.FEC_SUS_ADI = item.FEC_SUS_ADI;
                   vAdi.PLA_EJE_ADI = item.PLA_EJE_ADI;
                   vAdi.TIPO_PLAZO1_ADI = item.TIPO_PLAZO1_ADI;
                   vAdi.PLAZO2_ADI = item.PLAZO2_ADI;
                   vAdi.TIPO_PLAZO2_ADI = item.TIPO_PLAZO2_ADI;
                   vAdi.VAL_ADI = item.VAL_ADI;
                   vAdi.OBSER = item.OBSER;
                   List.Add(vAdi);


               }
           }
           return List;

       }
       class cmdUpdate : absTemplate
       {
           public ADICIONES reg { get; set; }
           public ADICIONES found { get; set; }
           protected override bool esValido()
           {
               found = ctx.ADICIONES.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
               if (found != null)
               {
                   found.EXENPOL = reg.EXENPOL;
                   found.FEC_APR_POL = reg.FEC_APR_POL;
                   found.RES_APR_POL = reg.RES_APR_POL;
                   found.LEGALIZADO = reg.LEGALIZADO;                  
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
           public ADICIONES found { get; set; }
           public ADICIONES reg { get; set; }
           protected override bool esValido()
           {
               reg.CONTRATOS = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
               found = ctx.ADICIONES.Where(t => t.COD_CON == reg.COD_CON).OrderByDescending(t => t.FEC_SUS_ADI).FirstOrDefault();
               if (found == null)
               {
                   if (reg.FEC_SUS_ADI >= reg.CONTRATOS.FEC_SUS_CON)
                   {
                       return true;
                   }else
                   {
                       byaRpt.Mensaje = "La Fecha de Suscripcion deber ser mayor ala Fecha de Suscripcion del contrato";
                       byaRpt.Error = true;
                       return !byaRpt.Error;
                       
                   }
               }
               else
               {

                   if (reg.FEC_SUS_ADI >= found.FEC_SUS_ADI)
                   {
                       return true;
                   }
                   {
                       byaRpt.Mensaje = "La Fecha de Suscripcion deber ser mayor ala ultima Fecha Suscripta que es " + found.FEC_SUS_ADI.Date.Day + "/" + found.FEC_SUS_ADI.Date.Month + "/" + found.FEC_SUS_ADI.Date.Year;
                       byaRpt.Error = true;
                       return !byaRpt.Error;
                   }
               }
           }
           protected override void Antes()
           {
               //Mapear Objeto DTO a Ado Entity FrameWork    
               int CountAdi=ctx.ADICIONES.Where(t => t.COD_CON == reg.COD_CON).ToList().Count + 1;
               char pad = '0';
               reg.NRO_ADI = reg.COD_CON + "-" + CountAdi.ToString().PadLeft(2, pad);              
               ctx.ADICIONES.Add(reg);
               byaRpt.id = reg.NRO_ADI;
           }


       }
       class cmdDelete : absTemplate
       {
           public ADICIONES reg { get; set; }
           public ADICIONES found { get; set; }
           protected override bool esValido()
           {
               found = ctx.ADICIONES.Where(t => t.COD_CON == reg.COD_CON && t.NRO_ADI==reg.NRO_ADI).FirstOrDefault();
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
               ctx.ADICIONES.Remove(found);
           }


       }
    }
}
