using Entidades;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using ByA;

namespace BLL
{
    public class ModalidadesPorTipoPlantillaBLL
    {
        Entities ctx;
        public ModalidadesPorTipoPlantillaBLL()
        {
            Mapper.CreateMap<vMOD_TIP_PLA, MOD_TIP_PLA>();
            Mapper.CreateMap<MOD_TIP_PLA, vMOD_TIP_PLA>()
                .ForMember(dest => dest.NOM_COD_MOD, opt => opt.MapFrom(src => src.TIPOSPROC.NOM_TPROC))
                .ForMember(dest => dest.NOM_COD_TIP, opt => opt.MapFrom(src => src.PL_TIPOS_PLANTILLA.NOM_TIP));
        }
        public List<vMOD_TIP_PLA> GetsTodasModalidad(string COD_MOD)
        {
            using (ctx = new Entities())
            {
                List<vMOD_TIP_PLA> lModTipos = new List<vMOD_TIP_PLA>();
                List<PL_TIPOS_PLANTILLA> lTiposPlantillas = ctx.PL_TIPOS_PLANTILLA.ToList();
                foreach (PL_TIPOS_PLANTILLA item in lTiposPlantillas)
                {
                    vMOD_TIP_PLA mod = new vMOD_TIP_PLA();
                    MOD_TIP_PLA Per = ctx.MOD_TIP_PLA.Where(t => t.COD_MOD == COD_MOD && t.COD_TIP == item.COD_TIP).FirstOrDefault();
                    if (Per != null)
                    {
                        Mapper.Map(Per, mod);
                    }
                    else
                    {
                        ModalidadesBLL oMod = new ModalidadesBLL();

                        mod.COD_MOD = COD_MOD;
                        mod.NOM_COD_MOD = oMod.Get(COD_MOD).NOM_TPROC;
                        
                        mod.COD_TIP = item.COD_TIP;
                        mod.NOM_COD_TIP = item.NOM_TIP;
                        mod.EST = "IN";
                    }
                    lModTipos.Add(mod);
                }
                return lModTipos;
            }
        }
        public ByARpt UpdateOrInsert(List<vMOD_TIP_PLA> lReg)
        {
            using (ctx = new Entities())
            {
                try
                {
                    foreach (vMOD_TIP_PLA item in lReg)
                    {
                        MOD_TIP_PLA ModTip = ctx.MOD_TIP_PLA.Where(t => t.COD_TIP == item.COD_TIP && t.COD_MOD == item.COD_MOD).FirstOrDefault();
                        if (ModTip != null)
                        {
                            Mapper.Map(item, ModTip);
                        }
                        else
                        {
                            ModTip = new MOD_TIP_PLA();
                            Mapper.Map(item, ModTip);
                            ctx.MOD_TIP_PLA.Add(ModTip);
                        }
                    }
                    ctx.SaveChanges();

                    ByARpt Res = new ByARpt();
                    Res.Mensaje = "Operación Realizada Satisfactoriamente";
                    Res.Error = false;
                    return Res;
                }
                catch (Exception e)
                {
                    ByARpt Res = new ByARpt();
                    Res.Mensaje = e.Message;
                    Res.Error = true;
                    return Res;
                }
            }
        }
    }
}
