using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Entidades;
using System.Data;
using AutoMapper;
using System.Data.Entity;
using Entidades.VistasPROC;
using ByA;


namespace BLL.PROCESOS.Gestion
{
    public class mPSOLICITUDES: absBLL
    {
        public mPSOLICITUDES() {
            Mapper.CreateMap<vPSolicitudes,PSOLICITUDES>();


            Mapper.CreateMap<PSOLICITUDES, vPSolicitudes>()
                        .ForMember(dest => dest.EST_REC, opt => opt.MapFrom(src => src.HREVISADO1.RECIBIDO_ABOG))
                        .ForMember(dest => dest.FECHA_REVISADO, opt => opt.MapFrom(src => src.HREVISADO1.FECHA_REVISADO))
                        .ForMember(dest => dest.OBS_REC, opt => opt.MapFrom(src => src.HREVISADO1.OBS_RECIBIDO_ABOG))
                        .ForMember(dest => dest.COD_TPRO_NOM, opt => opt.MapFrom(src => src.TIPOSPROC.NOM_TPROC))
                        .ForMember(dest => dest.ID_ABOG_ENC, opt => opt.MapFrom(src => src.HREVISADO1.NIT_ABOG_RECIBE))
                        .ForMember(dest => dest.DEP_PSOL_NOM, opt => opt.MapFrom(src => src.DEPENDENCIA.NOM_DEP))
                        .ForMember(dest => dest.DEP_SOL_NOM, opt => opt.MapFrom(src => src.DEPENDENCIA1.NOM_DEP))
                        .ForMember(dest => dest.TIP_CON_NOM, opt => opt.MapFrom(src => src.TIPOSCONT.NOM_TIP))
                        .ForMember(dest => dest.STIP_CON_NOM, opt => opt.MapFrom(src => src.SUBTIPOS.NOM_STIP))
                        .ForMember(dest => dest.NOM_EST_SOL, opt => opt.MapFrom(src =>buildNom_Est_Sol(src)))
                        .ForMember(dest => dest.OBS_REV, opt => opt.MapFrom(src => src.HREVISADO1.OBS_REVISADO))
                        .ForMember(dest => dest.NOM_ABOG_ENC, opt => opt.MapFrom(t => t.HREVISADO1.TERCEROS.APE1_TER + " " + t.HREVISADO1.TERCEROS.APE2_TER + " " + t.HREVISADO1.TERCEROS.NOM1_TER + " " + t.HREVISADO1.TERCEROS.NOM2_TER))
                        .ForMember(dest => dest.NOM_CONTRATISTA, opt => opt.MapFrom(t => buildNomTer(t.TERCEROS1)))
                        ;

            
        }
        private string buildNom_Est_Sol(PSOLICITUDES t)
        {
            if (t.ID_ABOG_ENC!=null)
            {
                if (t.HREVISADO1.NIT_ABOG_RECIBE == null)
                {
                    return "SIN ASIGNAR";
                }
                else if (t.HREVISADO1.NIT_ABOG_RECIBE != null && t.HREVISADO1.RECIBIDO_ABOG == "N")
                {
                    return "SIN RECIBIR";
                    
                }
                else if (t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "P")
                {
                    return "SIN REVISAR";
                    
                }
                else if (t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "A")
                {
                    return "ACEPTADO";
                    
                }
                else if (t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "R")
                {
                    return "RECHAZADO";
                    
                }
                else
                    return "";
            }
            else
            {
                return "SIN ASIGNAR";
            }
        }

        private string buildTer(string ide_ter)
        {
            TERCEROS t = ctx.TERCEROS.Where(o => o.IDE_TER == ide_ter).FirstOrDefault();
            return buildNomTer(t);
        }

        private string buildNomTer(TERCEROS t)
        {
            if (t != null)
            {
                return t.NOM1_TER + " " + t.NOM2_TER + " " + t.APE1_TER + " " + t.APE2_TER;
            }
            return "";
        }


        #region Insert

        #endregion
        public ByARpt Insert(vPSolicitudes Reg)
        {
            PSOLICITUDES r = new PSOLICITUDES();
            Mapper.Map(Reg,r);
            cmdInsert o = new cmdInsert { reg = r };
            return o.Enviar();
        }
        public ByARpt Update(vPSolicitudes Reg)
        {
            PSOLICITUDES r = new PSOLICITUDES();
            
            Mapper.Map(Reg, r);
            cmdUpdate o = new cmdUpdate { reg = r };
            return o.Enviar();
        }


        internal vPSolicitudes GetPK(string COD_SOL)
        {
            vPSolicitudes Reg = new vPSolicitudes();
            
            using (ctx = new Entities())
            {
                PSOLICITUDES ep = ctx.PSOLICITUDES.Where(t => t.COD_SOL == COD_SOL).FirstOrDefault();
                if (ep != null)
                {
                    Mapper.Map(ep, Reg);
                }
                return Reg;
            }
        }


        internal List<vPSolicitudes> GetSolicitudes(string Dep_PSol, short Vig_Sol)
        {
            using (ctx = new Entities())
            {
                List<vPSolicitudes> lst = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == Dep_PSol && t.VIG_SOL==Vig_Sol )
                .Select(
                t => new vPSolicitudes {
                    EST_REC = t.HREVISADO1.RECIBIDO_ABOG,
                    NOM_EST_SOL = t.HREVISADO1.CONCEPTO_REVISADO,
                    OBS_REC = t.HREVISADO1.OBS_RECIBIDO_ABOG,
                     COD_EP= t.COD_EP,
                     COD_SOL=t.COD_SOL,
                     COD_TPRO= t.COD_TPRO,
                     COD_TPRO_NOM = t.TIPOSPROC.NOM_TPROC,
                     ID_ABOG_ENC = t.HREVISADO1.NIT_ABOG_RECIBE,
                     OBJ_SOL = t.OBJ_SOL,
                     DEP_PSOL= t.DEP_PSOL,
                     DEP_PSOL_NOM = t.DEPENDENCIA.NOM_DEP,
                     DEP_SOL = t.DEP_SOL,
                     DEP_SOL_NOM = t.DEPENDENCIA1.NOM_DEP,
                     TIP_CON = t.TIP_CON,
                     TIP_CON_NOM= t.TIPOSCONT.NOM_TIP,
                     STIP_CON = t.STIP_CON,
                     STIP_CON_NOM= t.SUBTIPOS.NOM_STIP,
                    VAL_CON = t.VAL_CON,
                    ID_HREV = t.ID_HREV,
                    OBS_REV = t.HREVISADO1.OBS_REVISADO,
                    NOM_ABOG_ENC = (t.HREVISADO1.TERCEROS.APE1_TER + " " + t.HREVISADO1.TERCEROS.APE2_TER +" "+ t.HREVISADO1.TERCEROS.NOM1_TER+ " " + t.HREVISADO1.TERCEROS.NOM2_TER).Trim(),
                    NOM_CONTRATISTA = (t.TERCEROS1.APE1_TER + " " + t.TERCEROS1.APE2_TER + " " + t.TERCEROS1.NOM1_TER + " " + t.TERCEROS1.NOM2_TER).Trim()
                }
                )
                .OrderByDescending(t=>t.COD_SOL)
                .ToList<vPSolicitudes>();
            return lst;
            }
        }

        internal List<vPSolicitudes> GetMisSolicitudes(string UserName, string estado)
        {
            Dictionary<string, string> Estados = new Dictionary<string, string>();
            using (ctx = new Entities())
            {
                List<vPSolicitudes> lst = ctx.PSOLICITUDES.Where(t => t.ID_ABOG_ENC ==UserName)
                .Select(
                t => new vPSolicitudes
                {
                    COD_EP = t.COD_EP,
                    COD_SOL = t.COD_SOL,
                    COD_TPRO = t.COD_TPRO,
                    COD_TPRO_NOM = t.TIPOSPROC.NOM_TPROC,
                    ID_ABOG_ENC = t.ID_ABOG_ENC,
                    OBJ_SOL = t.OBJ_SOL,
                    DEP_PSOL = t.DEP_PSOL,
                    DEP_PSOL_NOM = t.DEPENDENCIA.NOM_DEP,
                    DEP_SOL = t.DEP_SOL,
                    DEP_SOL_NOM = t.DEPENDENCIA1.NOM_DEP,
                    TIP_CON = t.TIP_CON,
                    TIP_CON_NOM = t.TIPOSCONT.NOM_TIP,
                    STIP_CON = t.STIP_CON,
                    STIP_CON_NOM = t.SUBTIPOS.NOM_STIP,
                    VAL_CON = t.VAL_CON,
                    EST_REC = t.HREVISADO1.RECIBIDO_ABOG,
                    NOM_EST_SOL = t.NOM_EST_SOL,
                    ID_HREV = t.ID_HREV,
                    OBS_REC = t.HREVISADO1.OBS_RECIBIDO_ABOG,
                    OBS_REV = t.HREVISADO1.OBS_REVISADO,
                    NOM_ABOG_ENC = (t.HREVISADO1.TERCEROS.APE1_TER + " " + t.HREVISADO1.TERCEROS.APE2_TER + " " + t.HREVISADO1.TERCEROS.NOM1_TER + " " + t.HREVISADO1.TERCEROS.NOM2_TER).Trim()
                }
                )
                .OrderByDescending(t => t.COD_SOL)
                .ToList<vPSolicitudes>();
                return lst;
            }
        }

        
        public List<vPSolicitudes> GetMisSolicitudesxEstxDD(string UserName, string Estado, short Vigencia, string Dep_Del)
        {
            List<vPSolicitudes> lst = GetMisSolicitudesxEst(UserName, Estado, Vigencia);
            if (Dep_Del == "")
            {
                return lst;
            }
            else {
                return lst.Where(t => t.DEP_PSOL == Dep_Del).ToList();
            }
             
        }

        public List<vPSolicitudes> GetMisSolicitudesxEst(string UserName, string Estado, short Vigencia)
        {
            List<vPSolicitudes> lt = new List<vPSolicitudes>();
            List<PSOLICITUDES> lstO = new List<PSOLICITUDES>();
            
            using (ctx = new Entities())
            {
                if (Estado == "SREC")
                {
                    var q = ctx.PSOLICITUDES
                        .Where(t => t.VIG_SOL == Vigencia &&  t.HREVISADO1.NIT_ABOG_RECIBE == UserName && t.HREVISADO1.RECIBIDO_ABOG == "N")
                        .OrderByDescending(t => t.COD_SOL);
                    lstO = q.ToList();
                   
                }
                if (Estado == "SREV")
                {
                   var q = ctx.PSOLICITUDES
                        .Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.NIT_ABOG_RECIBE == UserName && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "P")
                        .OrderByDescending(t => t.COD_SOL); 
                   lstO = q.ToList();
                   
                }
                if (Estado == "ACEP")
                {
                    var q = ctx.PSOLICITUDES
                        .Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.NIT_ABOG_RECIBE == UserName && t.HREVISADO1.CONCEPTO_REVISADO == "A")
                        .OrderByDescending(t => t.COD_SOL);
                    lstO = q.ToList();
                   
                }
                if (Estado == "RECH")
                {
                    var q = ctx.PSOLICITUDES
                        .Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.NIT_ABOG_RECIBE == UserName && t.HREVISADO1.CONCEPTO_REVISADO == "R")
                        .OrderByDescending(t => t.COD_SOL);
                    lstO = q.ToList();
                    
                }
                Mapper.Map(lstO, lt);
                return lt;
            }
        }

        class cmdUpdate : absTemplate
        {
            public PSOLICITUDES reg { get; set; }
            public PSOLICITUDES found { get; set; }
            protected override bool esValido()
            {
                found = ctx.PSOLICITUDES.Find(reg.COD_SOL);
                if (found != null)
                {
                    if (found.HREVISADO1 != null)
                    {
                        if (found.HREVISADO1.CONCEPTO_REVISADO == "A")
                        {
                            byaRpt.Mensaje = "La Solicitud esta en estado Aceptado, no se puede actualzar ";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                        else if (found.HREVISADO1.CONCEPTO_REVISADO == "R")
                        {
                            byaRpt.Mensaje = "La Solicitud esta en estado Rechazado, no se puede actualzar ";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                        else{
                            return true;
                        }
                                            
                    }
                    else
                    {
                        return true;
                    }
                }
                else
                {
                    byaRpt.Mensaje = "No se encontró Solicitud de el Sistema";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }
            }
        
            protected override void Antes() {
                    found.FEC_MOD = DateTime.Now;
                    found.OBJ_SOL = reg.OBJ_SOL;
                    found.FEC_RECIBIDO = reg.FEC_RECIBIDO;
                    found.DEP_SOL = reg.DEP_SOL;
                    found.TIP_CON = reg.TIP_CON;
                    found.COD_TPRO = reg.COD_TPRO;
                    found.STIP_CON = reg.STIP_CON;
                    found.VIG_SOL = reg.VIG_SOL;
                    found.DEP_PSOL = reg.DEP_PSOL;
                    found.VAL_CON = reg.VAL_CON;
                    found.ID_ABOG_ENC = reg.ID_ABOG_ENC;
                    found.NUM_PLA = reg.NUM_PLA;
                    found.IDE_CON = reg.IDE_CON;
                    found.ID_ABOG_ENC = reg.ID_ABOG_ENC;
                    //found.USAP = reg.USAP;
                    //found.USBD = reg.USBD;
                    //found.FECHA_ASIGNADO = reg.FECHA_ASIGNADO;

                    ctx.Entry(found).State = EntityState.Modified;
                
            }
        }
        class cmdInsert : absTemplate
        {
            public PSOLICITUDES reg { get; set; }
            PSOLICITUDES sol { get; set; }
            ESTPREV ep;

            protected override bool esValido()
            {
                /// Analiza si existe una solidtud asociada al estudio previo relacionado, que este en estado aceptado.
                /// Si esta en estado aceptada retorna 0
                /// Esto se comprueba solo si se relaciona un estudio previo en otro caso no se valida.
                bool sw = true;
                if (reg.COD_EP != null)
                {
                    sw = ctx.PSOLICITUDES.Where(t => t.COD_EP == reg.COD_EP && t.HREVISADO1.CONCEPTO_REVISADO == "A").Count() == 0;
                    if (sw == false)
                    {
                        byaRpt.Mensaje = "El Estudio Previo ya fue Aceptado.";
                        byaRpt.id = "";
                        byaRpt.Error = true;
                        return false;
                    }
                    else
                    {
                        ep = ctx.ESTPREV.Where(t => t.CODIGO_EP == reg.COD_EP).FirstOrDefault();
                        byaRpt.Error = false;
                        return true;
                    }
                }
                return true;

            }
            protected override void Antes()
            {
                //Mapear Objeto DTO a Ado Entity FrameWork
                decimal ultId = 0;
                try
                {
                    ultId = (decimal)ctx.PSOLICITUDES.Where(t => t.VIG_SOL == reg.VIG_SOL && t.DEP_PSOL == reg.DEP_PSOL).Max(t => t.NUM_SOL);
                }
                catch { }

                reg.NUM_SOL = ultId + 1;//Consecutivo unico
                string AbrDep = ctx.DEPENDENCIA.Where(t => t.COD_DEP == reg.DEP_PSOL).Select(t => t.DEP_ABR).Single();
                reg.COD_SOL = reg.VIG_SOL + "-" + AbrDep + "-" + reg.NUM_SOL.ToString().PadLeft(4, '0');
                reg.FECHA_REGISTRO = DateTime.Now;
                
                ctx.Entry(reg).State = EntityState.Added;
                byaRpt.id = reg.COD_SOL;
                if (ep != null)
                {
                    ep.EST_FLU_EP = "RE";
                    ctx.Entry(ep).State = EntityState.Modified;
                }
                
            }
            //protected override void DespuesInsert();

        }

        
        public List<vPSolicitudes> GetSolicitudesxEstxDD(string Estado, short Vigencia, string Dep_Del)
        {
            List<vPSolicitudes> lst = GetSolicitudesxEst(Estado, Vigencia);
            if (Dep_Del == "")
            {
                return lst;
            }
            else
            {
                return lst.Where(t => t.DEP_PSOL == Dep_Del).ToList();
            }

        }

        public List<vPSolicitudes> GetSolicitudesxEst(string Estado, short Vigencia)
        {
            List<vPSolicitudes> lt = new List<vPSolicitudes>();
            List<PSOLICITUDES> lstO = new List<PSOLICITUDES>();

            using (ctx = new Entities())
            {

                if (Estado == "SASI")
                {
                    var q = ctx.PSOLICITUDES
                        .Where(t => t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == null)
                        .OrderByDescending(t => t.COD_SOL);
                    lstO = q.ToList();
                }
                if (Estado == "SREC")
                {
                    var q = ctx.PSOLICITUDES
                        .Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.RECIBIDO_ABOG == "N")
                        .OrderByDescending(t => t.COD_SOL);
                    lstO = q.ToList();
                }
                if (Estado == "SREV")
                {
                    var q = ctx.PSOLICITUDES
                         .Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "P")
                         .OrderByDescending(t => t.COD_SOL);
                    lstO = q.ToList();

                }
                if (Estado == "ACEP")
                {
                    var q = ctx.PSOLICITUDES
                        .Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.CONCEPTO_REVISADO == "A")
                        .OrderByDescending(t => t.COD_SOL);
                    lstO = q.ToList();

                }
                if (Estado == "RECH")
                {
                    var q = ctx.PSOLICITUDES
                        .Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.CONCEPTO_REVISADO == "R")
                        .OrderByDescending(t => t.COD_SOL);
                    lstO = q.ToList();

                }
                Mapper.Map(lstO, lt);
                return lt;
            }
        }

    }

}
