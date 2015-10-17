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
    public class mContratos:absBLL
    {
        public mContratos()
        {
            Mapper.CreateMap<CONTRATOS, vCONTRATOS>();
            Mapper.CreateMap<vCONTRATOS, CONTRATOS>();
            
        }
        public ByARpt Update(vCONTRATOS Reg)
        {
            CONTRATOS r = new CONTRATOS();
            Mapper.Map(Reg, r);
            cmdUpdate o = new cmdUpdate { reg = r };
            return o.Enviar();
        }
        public ByARpt UpdateConf(vCONTRATOS Reg)
        {
            CONTRATOS r = new CONTRATOS();
            Mapper.Map(Reg, r);
            cmdUpdateConf o = new cmdUpdateConf { reg = r };
            return o.Enviar();
        }
        public ByARpt UpdateModFecha(vCONTRATOS Reg)
        {
            CONTRATOS r = new CONTRATOS();
            Mapper.Map(Reg, r);
            cmdUpdateModFecha o = new cmdUpdateModFecha { reg = r };
            return o.Enviar();
        }
        public List<vCONTRATOS> GetContrato(string Cod_Con)
        {
            List<vCONTRATOS> List = new List<vCONTRATOS>();
            using (ctx = new Entities())
            {
                var query = ctx.CONTRATOS.Where(t => t.COD_CON == Cod_Con).ToList();
                Mapper.Map(query, List);
            }
            return List;

        }
        public RangoFecha GetModFecha_Contrato(string Cod_Con)
        {
            cmdUpdateModFecha o = new cmdUpdateModFecha();
            return o.GetModFecha_Contrato(Cod_Con);
           
        }     


        class cmdUpdate : absTemplate
        {
            public CONTRATOS reg { get; set; }
            public CONTRATOS found { get; set; }
            protected  override bool esValido()
            {
                found = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
                if (found != null)
                {
                    found.EXO_IMP = reg.EXO_IMP;
                    found.EXO_OBS = reg.EXO_OBS;

                    return true;
                }
                else
                {
                    byaRpt.Mensaje = "No se encontro el contrato";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }
               

            }
            protected  override void Antes()
            {


                ctx.Entry(found).State = System.Data.EntityState.Modified;
            }
        }
        class cmdUpdateConf : absTemplate
        {
            public CONTRATOS reg { get; set; }
            public CONTRATOS found { get; set; }
            protected override bool esValido()
            {
                found = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
                if (found != null)
                {
                    found.EXENPOL = reg.EXENPOL;
                    found.FEC_APR_POL = reg.FEC_APR_POL;
                    found.RES_APR_POL = reg.RES_APR_POL;
                    found.LEGALIZADO = reg.LEGALIZADO;
                    found.EST_CON = "09";
                    byaRpt.Error = false;
                    return true;
                }
                else
                {

                    byaRpt.Mensaje = "No se encontro el contrato";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }


            }
            protected override void Antes()
            {
                ctx.Entry(found).State = System.Data.EntityState.Modified;
               
            }
        }
        class cmdUpdateModFecha : absTemplate
        {
            public CONTRATOS reg { get; set; }
            public CONTRATOS found { get; set; }
            public RangoFecha GetModFecha_Contrato(string Cod_Con)
            {
              
                using (ctx = new Entities())
                {
                    return GetModFechap(Cod_Con);
                   
                }
               
            }
            private RangoFecha GetModFechap(string Cod_Con)
            {
                RangoFecha r = new RangoFecha();
                CONTRATOS c = ctx.CONTRATOS.Where(t => t.COD_CON == Cod_Con).FirstOrDefault();
                if (c != null)
                {
                    string CodigoAnterior = c.VIG_CON + c.TIP_CON + (c.NRO_CON - 1).ToString().PadLeft(4, '0');
                    CONTRATOS c_ant = ctx.CONTRATOS.Where(t => t.COD_CON == CodigoAnterior).FirstOrDefault();
                    if (c_ant != null)
                    {
                        r.FechaAnt = c_ant.FEC_SUS_CON;
                    }
                    else
                    {
                        r.FechaAnt = new DateTime(c.VIG_CON, 1, 1);
                    }
                    string CodigoSiguiente = c.VIG_CON + c.TIP_CON + (c.NRO_CON + 1).ToString().PadLeft(4, '0');
                    CONTRATOS c_sig = ctx.CONTRATOS.Where(t => t.COD_CON == CodigoSiguiente).FirstOrDefault();
                    if (c_sig != null)
                    {
                        r.FechaSig = c_sig.FEC_SUS_CON;
                    }
                    else
                    { r.FechaAnt = new DateTime(c.VIG_CON, 12, 31); }
                }
                return r;
            }     

            protected override bool esValido()
            {
                found = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();                
                if (found != null)
                {
                     RangoFecha r = GetModFechap(reg.COD_CON);
                     if (((reg.FEC_SUS_CON >= r.FechaAnt) && (reg.FEC_SUS_CON <= r.FechaSig)) || ((reg.FEC_SUS_CON >= r.FechaAnt) && (r.FechaSig == null)))
                     {
                         return true;
                     }
                     else
                     {
                         byaRpt.Mensaje = "Error: La <strong>nueva fecha de suscripción</strong> debe estar entre las fechas indicadas en la parte inferior";
                         byaRpt.Error = true;
                         return false;
                     }
                }
                else
                {
                    byaRpt.Mensaje = "No se Encontró El Contrato";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }


            }
            protected override void Antes()
            {
                found.FEC_SUS_CON = reg.FEC_SUS_CON;                
                ctx.Entry(found).State = System.Data.EntityState.Modified;
            }
        }

    }
    public class RangoFecha { 
       public DateTime? FechaAnt {get;set;}
       public DateTime? FechaSig { get; set; }
    }
}
