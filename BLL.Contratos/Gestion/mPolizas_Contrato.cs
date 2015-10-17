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
    public class mPolizas_Contrato:absBLL
    {
        public mPolizas_Contrato()
        {
            Mapper.CreateMap<POLIZAS_CONTRATO, vPolizas_Contrato>();
            Mapper.CreateMap<vPolizas_Contrato, POLIZAS_CONTRATO>(); 
        }
        public ByARpt Insert(vPolizas_Contrato Reg)
        {
            
            POLIZAS_CONTRATO r = new POLIZAS_CONTRATO();         
            Mapper.Map(Reg, r);
            cmdInsert o = new cmdInsert { reg = r };
            return o.Enviar();
        }
        public ByARpt Update(vPolizas_Contrato Reg)
        {
            POLIZAS_CONTRATO r = new POLIZAS_CONTRATO();
            Mapper.Map(Reg, r);
            cmdUpdate o = new cmdUpdate { reg = r };
            return o.Enviar();
        }
        public ByARpt Delete(vPolizas_Contrato Reg)
       {
           POLIZAS_CONTRATO r = new POLIZAS_CONTRATO();
           Mapper.Map(Reg, r);
           cmdDelete o = new cmdDelete { reg = r };
           return o.Enviar();
       }
        public List<vPolizas_Contrato> GetPolizas_Contrato(string Cod_Con)
        {
            List<vPolizas_Contrato> List = new List<vPolizas_Contrato>();
            using (ctx = new Entities())
            {

                var query = ctx.POLIZAS_CONTRATO.Where(t => t.COD_CON == Cod_Con).
                             Select(t => new  { t.ID_POL, t.ASEGURADORAS.NOM_ASE,
                                 t.POLIZAS.NOM_POL,
                                 t.NRO_POL, 
                                 t.FEC_INI,
                                 t.FEC_POL,
                                 t.VAL_POL,
                                 t.TIP_POL }).ToList();
             
                foreach (var item in query)
                {
                    vPolizas_Contrato p = new vPolizas_Contrato();
                    p.ID_POL = item.ID_POL;
                    p.NOM_ASE = item.NOM_ASE;
                    p.NOM_POL = item.NOM_POL;
                    p.NRO_POL = item.NRO_POL;
                    p.FEC_INI = item.FEC_INI;
                    p.FEC_POL = item.FEC_POL;
                    p.VAL_POL = item.VAL_POL;
                    if (item.TIP_POL == "I")
                    {
                        p.TIP_POL = "Inicial";
                    }
                    if (item.TIP_POL == "A")
                    {
                        p.TIP_POL = "Ampliacion";
                    }
                    if (item.TIP_POL == "R")
                    {
                        p.TIP_POL = "Reduccion";
                    }
                    if (item.TIP_POL == "M")
                    {
                        p.TIP_POL = "Modificacion";
                    }
                   
                    List.Add(p);
                    
                }
                
                
            }
            return List;

        }


        class cmdUpdate : absTemplate
        {
            public POLIZAS_CONTRATO reg { get; set; }
            public POLIZAS_CONTRATO found { get; set; }
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
            public POLIZAS_CONTRATO reg { get; set; }
            protected  override bool esValido()
            {
                if (reg.FEC_INI != null)
                {
                    if (reg.FEC_POL != null)
                    {
                        if (reg.FEC_POL >= reg.FEC_INI)
                        {
                            if (reg.NRO_POL != "")
                            {
                                if (reg.VAL_POL > 0)
                                {
                                    return true;
                                }
                                else
                                {
                                    byaRpt.Error = true;
                                    byaRpt.Mensaje = "El valor de la poliza debe ser mayor a cero (0)";
                                    return false;
                                }
                            }
                            else
                            {
                                byaRpt.Error = true;
                                byaRpt.Mensaje = "El numero de la poliza no puede estar vacio";
                                return false;
                            }
                        }
                        else
                        {
                            byaRpt.Error = true;
                            byaRpt.Mensaje = "La fecha final no puede ser menor a la fecha de inicio";
                            return false;
                        }
                    }
                    else
                    {
                        byaRpt.Error = true;
                        byaRpt.Mensaje = "La fecha final no puede estar vacia";
                        return false;
                    }
                }
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "La fecha inicial no puede estar vacia";
                    return false;
                }
            }
            protected  override void Antes()
            {
                //Mapear Objeto DTO a Ado Entity FrameWork
                try
                {
                    reg.ID_POL = ctx.POLIZAS_CONTRATO.Select(t => t.ID_POL).Max() + 1;
                }
                catch (System.Exception)
                {

                    reg.ID_POL = 1;
                }

                byaRpt.id = reg.ID_POL.ToString();
                ctx.POLIZAS_CONTRATO.Add(reg);
            }


        }
        class cmdDelete : absTemplate
        {
            public POLIZAS_CONTRATO reg { get; set; }
            public POLIZAS_CONTRATO found { get; set; }
            protected  override bool esValido()
            {
                found = ctx.POLIZAS_CONTRATO.Where(t => t.NRO_POL == reg.NRO_POL && t.COD_CON == reg.COD_CON).FirstOrDefault();
                if (found != null)
                {
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
                //Mapear Objeto DTO a Ado Entity FrameWork
                ctx.POLIZAS_CONTRATO.Remove(found);
            }


        }
    

    }
   
}
