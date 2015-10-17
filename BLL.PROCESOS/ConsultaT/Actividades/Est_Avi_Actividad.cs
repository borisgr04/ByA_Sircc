using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using Entidades.VistasPROC;

namespace BLL.PROCESOS.ConsultaT.Actividades
{
    public partial class Est_Avi_Actividad
    {

        Entities ctx { get; set; }
        ByARpt byaRpt = new ByARpt();
        mTerceros mt = new mTerceros();

        private int GetDiasIni()
        {
            return 1;
        }
        private int GetDiasFin()
        {
            return 4;
        }


        public List<vPCRONOGRAMASPC> getListaEstAviAct2(short vigencia, String Usuario)
        {
            List<vPESTADOS> lt = new List<vPESTADOS>();
            string cVig = vigencia.ToString();
            using (ctx = new Entities())
            {
                List<object> lparam = new List<object>();

                Mapper.CreateMap<PCRONOGRAMAS, vPCRONOGRAMASPC>()
                        .ForMember(dest => dest.OBJ_CON, opt => opt.MapFrom(src => src.PCONTRATOS.OBJ_CON))
                        .ForMember(dest => dest.EST_AVI_ACT, opt => opt.MapFrom(src => GetESTADOS(src)))
                        ;
                List<vPCRONOGRAMASPC> lst = new List<vPCRONOGRAMASPC>();
                List<PCRONOGRAMAS> lstO = ctx.PCRONOGRAMAS.Where(
                    t => t.NUM_PROC.EndsWith(cVig)
                        && t.EST_ACT != "0000"
                        && t.ANULADO == "N"
                        && t.PCONTRATOS.USUENCARGADO== Usuario
                        ).ToList();
                Mapper.Map(lstO, lst);

                return lst;

            }
        }

        public List<vPCRONOGRAMASPC> getListaEstAviAct(string DepDel, short vigencia)
        {
            List<vPESTADOS> lt = new List<vPESTADOS>();
            string cVig = vigencia.ToString();
            using (ctx = new Entities())
            {
                List<object> lparam = new List<object>();

                Mapper.CreateMap<PCRONOGRAMAS, vPCRONOGRAMASPC>()
                        .ForMember(dest => dest.OBJ_CON, opt => opt.MapFrom(src => src.PCONTRATOS.OBJ_CON))
                        .ForMember(dest => dest.EST_AVI_ACT, opt => opt.MapFrom(src => GetESTADOS(src)))
                        ;
                List<vPCRONOGRAMASPC> lst = new List<vPCRONOGRAMASPC>();
                List<PCRONOGRAMAS> lstO = ctx.PCRONOGRAMAS.Where(
                    t => t.NUM_PROC.EndsWith(cVig)
                        && t.EST_ACT != "0000"
                        && t.ANULADO == "N"
                        && t.PCONTRATOS.DEPENDENCIA.COD_DEP.Equals( DepDel)
                        ).ToList();
                Mapper.Map(lstO, lst);

                return lst;

            }
        }
        public List<vPESTADOS> getEst_Avi_Act2(short vigencia,string Username)
        {
            List<vPESTADOS> lt = new List<vPESTADOS>();
            List<vPCRONOGRAMASPC> lst = this.getListaEstAviAct2(vigencia, Username);
            var Total = lst.Count();

            
            //Resumen
            lt.Add(new vPESTADOS { COD_EST = "ACVEN", NOM_EST = "Actividades Vencidas", COLOR = "progress-bar progress-inverse", CANT = lst.Where(t => t.EST_AVI_ACT == "ACVEN").Count(), PORC = Total>0?(decimal)lst.Where(t => t.EST_AVI_ACT == "ACVEN").Count() / Total:0 });
            lt.Add(new vPESTADOS { COD_EST = "ACHOY", NOM_EST = "Actividades para Hoy", COLOR = "progress-bar progress-bar-danger", CANT = lst.Where(t => t.EST_AVI_ACT == "ACHOY").Count(), PORC = Total>0?(decimal)lst.Where(t => t.EST_AVI_ACT == "ACHOY").Count() / Total:0  });
            lt.Add(new vPESTADOS { COD_EST = "ACPVEN", NOM_EST = "Actividades Proximas a vencerse ", COLOR = "progress-bar progress-bar-pink", CANT = lst.Where(t => t.EST_AVI_ACT == "ACPVEN").Count(), PORC = Total>0?(decimal)lst.Where(t => t.EST_AVI_ACT == "ACPVEN").Count() / Total:0  });
            lt.Add(new vPESTADOS { COD_EST = "NA", NOM_EST = "Actividades con un Plazo Mayor", COLOR = "progress-bar progress-bar-pink", CANT = lst.Where(t => t.EST_AVI_ACT == "NA").Count(), PORC = Total > 0 ? (decimal)lst.Where(t => t.EST_AVI_ACT == "NA").Count() / Total : 0 });
            lt.Add(new vPESTADOS { COD_EST = "ACOK", NOM_EST = "Actividades Completadas", COLOR = "progress-bar progress-inverse", CANT = lst.Where(t => t.EST_AVI_ACT == "ACOK").Count(), PORC = Total > 0 ? (decimal)lst.Where(t => t.EST_AVI_ACT == "ACOK").Count() / Total : 0 });
            //lt.Add(new vPESTADOS { COD_EST = "Total", NOM_EST = "Total", CANT = lst.Count() });

            return lt;

        }
        public List<vPESTADOS> getEst_Avi_Act(short vigencia, string DepDel)
        {
            List<vPESTADOS> lt = new List<vPESTADOS>();
            List<vPCRONOGRAMASPC> lst = this.getListaEstAviAct(DepDel, vigencia);
            var Total = lst.Count();
            //Resumen
            lt.Add(new vPESTADOS { COD_EST = "ACVEN", NOM_EST = "Actividades Vencidas", COLOR = "progress-bar progress-inverse", CANT = lst.Where(t => t.EST_AVI_ACT == "ACVEN").Count(), PORC = Total > 0 ? (decimal)lst.Where(t => t.EST_AVI_ACT == "ACVEN").Count() / Total : 0 });
            lt.Add(new vPESTADOS { COD_EST = "ACHOY", NOM_EST = "Actividades para Hoy", COLOR = "progress-bar progress-bar-danger", CANT = lst.Where(t => t.EST_AVI_ACT == "ACHOY").Count(), PORC = Total > 0 ? (decimal)lst.Where(t => t.EST_AVI_ACT == "ACHOY").Count() / Total : 0 });
            lt.Add(new vPESTADOS { COD_EST = "ACPVEN", NOM_EST = "Actividades Proximas a vencerse ", COLOR = "progress-bar progress-bar-pink", CANT = lst.Where(t => t.EST_AVI_ACT == "ACPVEN").Count(), PORC = Total > 0 ? (decimal)lst.Where(t => t.EST_AVI_ACT == "ACPVEN").Count() / Total : 0 });
            lt.Add(new vPESTADOS { COD_EST = "NA", NOM_EST = "Actividades con un Plazo Mayor", COLOR = "progress-bar progress-bar-pink", CANT = lst.Where(t => t.EST_AVI_ACT == "NA").Count(), PORC = Total > 0 ? (decimal)lst.Where(t => t.EST_AVI_ACT == "NA").Count() / Total : 0 });
            lt.Add(new vPESTADOS { COD_EST = "ACOK", NOM_EST = "Actividades Completadas", COLOR = "progress-bar progress-inverse", CANT = lst.Where(t => t.EST_AVI_ACT == "ACOK").Count(), PORC = Total > 0 ? (decimal)lst.Where(t => t.EST_AVI_ACT == "ACOK").Count() / Total : 0 });
            //lt.Add(new vPESTADOS { COD_EST = "Total", NOM_EST = "Total", CANT = lst.Count() });

            return lt;

        }
        private string GetESTADOS(PCRONOGRAMAS t)
        {
            if (isACT_VENCIDAS(t) == true) return "ACVEN";
            if (isACT_HOY(t) == true) return "ACHOY";
            if (isACT_POR_VENCER(t) == true) return "ACPVEN";
            if (isACT_COMPLETADAS(t) == true) return "ACOK";
            return "NA";
        }
        private bool isACT_VENCIDAS(PCRONOGRAMAS t)
        {
            if (t.EST_ACT != "0003" && t.EST_ACT != "0000" && Convert.ToDateTime(t.FECHAI.Value.ToShortDateString()) < Convert.ToDateTime(DateTime.Now.ToShortDateString()))
                return true;
            else
                return false;
        }
        private bool isACT_POR_VENCER(PCRONOGRAMAS t)
        {
            string fecha = DateTime.Now.AddDays(GetDiasIni()).ToShortDateString();
            return t.EST_ACT != "0003" && t.EST_ACT != "0000"
                && (Convert.ToDateTime(t.FECHAI.Value.ToShortDateString()) > Convert.ToDateTime(DateTime.Now.AddDays(GetDiasIni()).ToShortDateString())
                && Convert.ToDateTime(t.FECHAI.Value.ToShortDateString()) <= Convert.ToDateTime(DateTime.Now.AddDays(GetDiasFin()).ToShortDateString()));
        }
        private bool isACT_HOY(PCRONOGRAMAS t)
        {
            return t.EST_ACT != "0003" && t.EST_ACT != "0000" && t.FECHAI.Value.ToShortDateString() == DateTime.Now.ToShortDateString();
        }
        //private int GetACT_APLAZADAS(PCONTRATOS pc)
        //{
        //    return pc.PCRONOGRAMAS.Where(t => t.ANULADO == "N" && t.EST_ACT == "0004").Count();
        //}
        private bool isACT_COMPLETADAS(PCRONOGRAMAS t)
        {
                return  t.ANULADO == "N" && t.EST_ACT == "0003";
        }
        //private int GetACT_HOY(PCONTRATOS pc)
        //{
        //    return pc.PCRONOGRAMAS.Where(t => t.ANULADO == "N" && t.EST_ACT != "0003" && t.EST_ACT != "0000" && t.FECHAI.Value.ToShortDateString() == DateTime.Now.ToShortDateString()).Count();
        //}
        //}

      
    }
}

