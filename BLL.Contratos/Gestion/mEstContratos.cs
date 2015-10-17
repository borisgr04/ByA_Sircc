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
    public class mEstContratos
    {

        public mEstContratos()
        {
            Mapper.CreateMap<ESTCONTRATOS, Entidades.Contratos.vEstContratos>();
            Mapper.CreateMap<Entidades.Contratos.vEstContratos, ESTCONTRATOS>();
            
        }
        public ByARpt InsertGestion(Entidades.Contratos.vEstContratos Reg)
        {
            ESTCONTRATOS r = new ESTCONTRATOS();
            Mapper.Map(Reg, r);
            cmdInsertGestion o = new cmdInsertGestion { reg = r };
            return o.Enviar();
        }
        public ByARpt InsertAnular(Entidades.Contratos.vEstContratos Reg)
        {
            ESTCONTRATOS r = new ESTCONTRATOS();
            Mapper.Map(Reg, r);
            cmdInsert o = new cmdInsert { reg = r };
            return o.Enviar();
        }
        public ByARpt InsertTerminacion(Entidades.Contratos.vEstContratos Reg)
        {
            ESTCONTRATOS r = new ESTCONTRATOS();
            Mapper.Map(Reg, r);
            cmdInsertTerminacion o = new cmdInsertTerminacion { reg = r };
            return o.Enviar();
        }
        public ByARpt AnularGestion(Entidades.Contratos.vEstContratos Reg)
        {
            ESTCONTRATOS r = new ESTCONTRATOS();
            Mapper.Map(Reg, r);
            cmdAnularGestion o = new cmdAnularGestion { reg = r };
            return o.Enviar();
        }


      
        class cmdInsert : absTemplate
        {
            public ESTCONTRATOS reg { get; set; }
            public CONTRATOS found { get; set; }
            public ESTCONTRATOS found2 { get; set; }
            protected  override bool esValido()
            {
                reg.CONTRATOS = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
                found = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
                found2 = ctx.ESTCONTRATOS.Where(t => t.COD_CON == reg.COD_CON).OrderByDescending(t => t.FEC_ENT).FirstOrDefault();
                if ((found != null) && (found.EST_CON!="00"))
                {
                    if (found2 == null)
                    {
                        if (reg.FEC_ENT >= reg.CONTRATOS.FEC_SUS_CON)
                        {
                            return true;
                        }
                        else
                        {
                            byaRpt.Mensaje = "La Fecha de Anulacion deber ser mayor ala Fecha de Suscripcion del contrato";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                    }
                    else
                    {
                        if (reg.FEC_ENT >= found2.FEC_ENT)
                        {
                            return true;
                        }
                        {
                            byaRpt.Mensaje = "La Fecha de Anulacion deber ser mayor ala ultima Fecha Suscripta";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                    }
                }
                else
                {
                    byaRpt.Mensaje = "No se encontró el contrato o No se Puede Anular";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }
               

            }
            protected  override void Antes()
            {
                found.EST_CON = "07";
                try
                {
                    reg.ID = ctx.ESTCONTRATOS.Select(t => t.ID).Max() + 1;
                }
                catch (System.Exception)
                {

                    reg.ID = 1;
                }               
                reg.EST_INI = "00";
                reg.EST_FIN = "07";              
                reg.FEC_REG = DateTime.Now;               
                reg.ESTADO = "AC";
                ctx.ESTCONTRATOS.Add(reg);
                ctx.Entry(found).State = System.Data.EntityState.Modified;
            }
        }
        class cmdInsertTerminacion : absTemplate
        {
            public ESTCONTRATOS reg { get; set; }
            public CONTRATOS found { get; set; }
            public ESTCONTRATOS found2 { get; set; }
            protected override bool esValido()
            {
                reg.CONTRATOS = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
                found = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
                found2 = ctx.ESTCONTRATOS.Where(t => t.COD_CON == reg.COD_CON).OrderByDescending(t => t.FEC_ENT).FirstOrDefault();
                if ((found != null) && (found.EST_CON != "00"))
                {
                    if (found2 == null)
                    {
                        if (reg.FEC_ENT >= reg.CONTRATOS.FEC_SUS_CON)
                        {
                            return true;
                        }
                        else
                        {
                            byaRpt.Mensaje = "La Fecha debe ser mayor a la Fecha de Suscripción del contrato";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                    }
                    else
                    {
                        if (reg.FEC_ENT >= found2.FEC_ENT)
                        {
                            return true;
                        }
                        {
                            byaRpt.Mensaje = "La Fecha debe ser mayor a la ultima Fecha Suscripta";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                    }
                }
                else
                {
                    byaRpt.Mensaje = "No se encontró el contrato o No se puede realizar este proceso";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }


            }
            protected override void Antes()
            {
                found.EST_CON = "12";
                try
                {
                    reg.ID = ctx.ESTCONTRATOS.Select(t => t.ID).Max() + 1;
                }
                catch (System.Exception)
                {

                    reg.ID = 1;
                }
                reg.EST_INI = "00";
                reg.EST_FIN = "12";
                reg.FEC_REG = DateTime.Now;
                reg.ESTADO = "AC";
                ctx.ESTCONTRATOS.Add(reg);
                ctx.Entry(found).State = System.Data.EntityState.Modified;
            }
        }
        class cmdInsertGestion : absTemplate
        {
            public ESTCONTRATOS reg { get; set; }
            public CONTRATOS found { get; set; }
            public ESTCONTRATOS found2 { get; set; }
            protected override bool esValido()
            {
                found = ctx.CONTRATOS.Where(t => t.COD_CON == reg.COD_CON).FirstOrDefault();
                found2 = ctx.ESTCONTRATOS.Where(t => t.COD_CON == reg.COD_CON).OrderByDescending(t => t.FEC_ENT).FirstOrDefault();
                if ((found != null) && (found.EST_CON != "00") && (found.EST_CON!="07"))
                {
                    if (found2 == null)
                    {
                        if (reg.FEC_ENT >= found.FEC_SUS_CON)
                        {
                            return true;
                        }
                        else
                        {
                            byaRpt.Mensaje = "La Fecha de Terminacion deber ser mayor ala Fecha de Suscripcion del contrato";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                    }
                    else
                    {
                        if (reg.FEC_ENT >= found2.FEC_ENT)
                        {
                            return true;
                        }
                        {
                            byaRpt.Mensaje = "La Fecha de Terminacion deber ser mayor ala ultima Fecha Suscrita";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                    }
                }
                else
                {
                    byaRpt.Mensaje = "No se encontró el contrato o No se Puede Anular";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }


            }
            protected override void Antes()
            {
                reg.EST_INI = found.EST_CON;
                found.EST_CON = reg.EST_FIN;
                try
                {
                    reg.ID = ctx.ESTCONTRATOS.Select(t => t.ID).Max() + 1;
                }
                catch (System.Exception)
                {

                    reg.ID = 1;
                }
               
                              
                reg.FEC_REG = DateTime.Now;
                reg.ESTADO = "AC";
                ctx.ESTCONTRATOS.Add(reg);
                ctx.Entry(found).State = System.Data.EntityState.Modified;
            }
        }
        class cmdAnularGestion : absTemplate
        {
            public ESTCONTRATOS reg { get; set; }
            public CONTRATOS found2 { get; set; }
            public ESTCONTRATOS found { get; set; }
            protected override bool esValido()
            {
               
                found = ctx.ESTCONTRATOS.Where(t => t.ID == reg.ID).FirstOrDefault();

                found2 = ctx.CONTRATOS.Where(t => t.COD_CON == found.COD_CON).FirstOrDefault();
                if ((found != null) && (found2 !=null))
                {
                    return true;
                }
                else
                {
                    byaRpt.Mensaje = "Error No se Puede Anular";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }


            }
            protected override void Antes()
            {
                found2.EST_CON = found.EST_INI;
                found.ESTADO = "AN";
                ctx.Entry(found).State = System.Data.EntityState.Modified;
                ctx.Entry(found2).State = System.Data.EntityState.Modified;
            }
        }
     
    }
}
