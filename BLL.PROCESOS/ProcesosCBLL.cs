using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
//using System.Linq.Dynamic;
using Entidades;
using Entidades.VistasPROC;
using BLL.PROCESOS.Gestion;

namespace BLL.PROCESOS
{
    public static class MyExtensions
    {
        public static bool IsBetween(this DateTime dt, DateTime start, DateTime end)
        {
            return dt >= start && dt <= end;
        }
    }

    
    public class classFiltro {
        public enum TipoFecha
        {
            NINIGUNO, REGISTRO,
            REVISADO
        }
        public enum TipoFechap
        {
            NINIGUNO, REGISTRO, ASIGNADO, RECIBIDO
        }
        public short VIG_SOL { get; set; }
        public string DEP_PSOL { get; set; }
        public string COD_SOL { get; set; }
        public string DEP_SOL { get; set; }
        public string ID_ABOG_ENC { get; set; }
        public decimal? VAL_CON { get; set; }
        public string IDE_CON { get; set; }
        public string COD_EP { get; set; }
        public decimal ID_HREV { get; set; }
        public string OBJ_SOL { get; set; }
        public string TIP_CON { get; set; }
        public string STIP_CON { get; set; }
        public string COD_TPRO { get; set; }
        public string EST_REC { get; set; }

        public string NUM_PRO { get; set; }

        public TipoFecha TIPO_FECHA { get; set; }
        public TipoFechap TIPO_FECHAP { get; set; }
        public DateTime FECHA_I { get; set; }
        public DateTime FECHA_F { get; set; }
    }
    
    public class ProcesosCBLL
    {
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }
        mPCRONOGRAMAS mCrono = new mPCRONOGRAMAS();
        mPCONTRATOS mProc = new mPCONTRATOS();

        public ProcesosCBLL(){
            Mapper.CreateMap<PESTADOS, vPESTADOS>();
            crearMapeo();
        }
        public List<vPCRONOGRAMAS> GetCronograma(string Num_Pro)
        {
            return mCrono.GetCronograma(Num_Pro);
        }
        public List<vTerceros> getEncargados(string Dep_Del, short Vigencia)
        {
            List<vTerceros> lt;
            using (ctx = new Entities())
            {
                lt = ctx.HDEP_ABOGADOS.Where(t => t.COD_DEP == Dep_Del && t.ESTADO == "AC" && t.ASIG_PROC == "SI").Select(
                    t => new vTerceros
                    {
                        APE1_TER = t.TERCEROS.APE1_TER,
                        APE2_TER = t.TERCEROS.APE2_TER,
                        NOM1_TER = t.TERCEROS.NOM1_TER,
                        NOM2_TER = t.TERCEROS.NOM2_TER,
                        IDE_TER = t.IDE_TER,
                        CANT_PROC = t.TERCEROS.PCONTRATOS.Where(y => y.VIG_CON == Vigencia).Count()
                    }
                    ).OrderByDescending(t => t.CANT_PROC).ToList();
                return lt;
            }
        }

        public List<vPESTADOS> getxEstados(string DepDel, short Vigencia)
        {

            List<vPESTADOS> lt;
            using (ctx = new Entities())
            {
                lt = ctx.PESTADOS.Where(t=>t.COD_EST!="00").
                    Select(t => new vPESTADOS { 
                         COD_EST=t.COD_EST,
                         COLOR=t.COLOR,
                         NOM_EST=t.NOM_EST,
                         ORDEN=t.ORDEN,
                         CANT = t.PCONTRATOS.Where(p => p.DEP_PCON == DepDel && p.VIG_CON == Vigencia).Count(),
                    }).OrderBy(t=>t.ORDEN).ToList();
                return lt;
            }
        }

        public List<vPESTADOS> getSolxEstados(string DepDel, short Vigencia)
        {
            List<vPESTADOS> lt = new List<vPESTADOS>();
            using (ctx = new Entities())
            {
                
                var porAsignar = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == null).Count();
                var porRecibir = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC != null && t.HREVISADO1.RECIBIDO_ABOG == "N").Count();
                var Pendiente = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC != null && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "P").Count();
                var Aceptadas = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC != null && t.HREVISADO1.CONCEPTO_REVISADO == "A").Count();
                var Rechazadas = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC != null && t.HREVISADO1.CONCEPTO_REVISADO == "R").Count();
                var Total = porAsignar + porRecibir + Pendiente +Aceptadas+ Rechazadas;
                
                //Resumen
                //lt.Add(new vPESTADOS { COD_EST = "TO", NOM_EST = "Total", CANT = lt.Sum(t => t.CANT) });
                if (Total > 0)
                {
                    lt.Add(new vPESTADOS { COD_EST = "SASI", NOM_EST = "Por Asignar", COLOR = "progress-bar progress-bar-purple", CANT = porAsignar, PORC = (decimal)porAsignar / Total });
                    lt.Add(new vPESTADOS { COD_EST = "SREC", NOM_EST = "Por Recibir", COLOR = "progress-bar progress-bar-danger", CANT = porRecibir, PORC = (decimal)porRecibir / Total });
                    lt.Add(new vPESTADOS { COD_EST = "SREV", NOM_EST = "Pendientes", COLOR = "progress-bar progress-bar-pink", CANT = Pendiente, PORC = (decimal)Pendiente / Total });
                    lt.Add(new vPESTADOS { COD_EST = "ACEP", NOM_EST = "Aceptadas", COLOR = "progress-bar progress-bar-success", CANT = Aceptadas, PORC = (decimal)Aceptadas / Total });
                    lt.Add(new vPESTADOS { COD_EST = "RECH", NOM_EST = "Rechazadas", COLOR = "progress-bar progress-bar-inverse", CANT = Rechazadas, PORC = (decimal)Rechazadas / Total });
                    return lt;
                }
                else {
                    lt.Add(new vPESTADOS { COD_EST = "SASI", NOM_EST = "Por Asignar", COLOR = "progress-bar progress-bar-purple", CANT = porAsignar, PORC = (decimal)0 });
                    lt.Add(new vPESTADOS { COD_EST = "SREC", NOM_EST = "Por Recibir", COLOR = "progress-bar progress-bar-danger", CANT = porRecibir, PORC = (decimal)0 });
                    lt.Add(new vPESTADOS { COD_EST = "SREV", NOM_EST = "Pendientes", COLOR = "progress-bar progress-bar-pink", CANT = Pendiente, PORC = (decimal)0 });
                    lt.Add(new vPESTADOS { COD_EST = "ACEP", NOM_EST = "Aceptadas", COLOR = "progress-bar progress-bar-success", CANT = Aceptadas, PORC = (decimal)0 });
                    lt.Add(new vPESTADOS { COD_EST = "RECH", NOM_EST = "Rechazadas", COLOR = "progress-bar progress-bar-inverse", CANT = Rechazadas, PORC = (decimal)0 });
                    return lt;
                }
            }
        }
        public List<vTerceros> getEncargadosP(string DepDel, short Vigencia, int Pagina)
        {
            List<vTerceros> lt = null; ;
            using (ctx = new Entities())
            {
                var TamanoPagina = 5;
                var Total = ctx.HDEP_ABOGADOS.Where(t => t.COD_DEP == DepDel && t.ESTADO == "AC" && t.ASIG_PROC == "SI").Count();
                var Residuo = Total % TamanoPagina;
                var NElementos = TamanoPagina - Residuo;
                if (NElementos > 0)
                {
                    lt = ctx.HDEP_ABOGADOS.Where(t => t.COD_DEP == DepDel && t.ESTADO == "AC" && t.ASIG_PROC == "SI").Select(
                        t => new vTerceros
                        {
                            APE1_TER = t.TERCEROS.APE1_TER,
                            APE2_TER = t.TERCEROS.APE2_TER,
                            NOM1_TER = t.TERCEROS.NOM1_TER,
                            NOM2_TER = t.TERCEROS.NOM2_TER,
                            IDE_TER = t.IDE_TER,
                            CANT_PROC = t.TERCEROS.PCONTRATOS.Where(y => y.VIG_CON == Vigencia).Count()
                        }
                        ).OrderByDescending(t => t.CANT_PROC).Skip(5 * (Pagina - 1) + 1).Take(NElementos).ToList();

                }
                return lt;

            }
        }
        public List<vTerceros> getEncargadosxEstado(string DepDel, short Vigencia, string Est)
        {
            List<vTerceros> lt;
            using (ctx = new Entities())
            {
                lt = ctx.PCONTRATOS.Where(t => t.DEP_PCON == DepDel && t.PESTADOS.NOM_EST == Est && t.VIG_CON == Vigencia)
                    .GroupBy(t => t.TERCEROS)
                    .Select(t => new vTerceros
                    {
                        APE1_TER = t.Key.APE1_TER,
                        APE2_TER = t.Key.APE2_TER,
                        NOM1_TER = t.Key.NOM1_TER,
                        NOM2_TER = t.Key.NOM2_TER,
                        IDE_TER = t.Key.IDE_TER,
                        CANT_PROC = t.Count()

                    }).OrderBy(t => t.CANT_PROC).ToList();


                return lt;
            }
        }
        public List<vPESTADOS> getxEncEstados(string DepDel, short Vigencia, string IdeFunc)
        {
            List<vPESTADOS> lt;
            using (ctx = new Entities())
            {
                lt = ctx.PCONTRATOS.Where(t => t.DEP_PCON == DepDel && t.VIG_CON == Vigencia && t.USUENCARGADO == IdeFunc).
                    GroupBy(t => t.PESTADOS.NOM_EST).
                    Select(t => new vPESTADOS { CANT = t.Count(), NOM_EST = t.Key }).OrderBy(t => t.NOM_EST).ToList();
                return lt;
            }
        }
        public List<vPSolicitudes> GetSolicitudesT(short Vigencia, vPSolicitudes filtro) {
            List<vPSolicitudes> lst = new List<vPSolicitudes>();
            foreach (PEstadosSOL item in PEstadosSOL.GetEstadosSol()) {

                List<vPSolicitudes> lstO = GetSolicitudesxEst(item.Codigo, Vigencia);
                if (lstO != null)
                {
                    foreach (vPSolicitudes item2 in lstO)
                    {
                        lst.Add(item2);
                    }
                }
            }
            return lst;
        }
        public List<vPSolicitudes> GetSolicitudesxEst(string Estado, short Vigencia)
        {
            List<vPSolicitudes> lt = null;
            using (ctx = new Entities())
            {
                if (Estado == "SASI")
                {
                    lt = GetSASI(Vigencia, lt);
                }
                if (Estado == "SREC")
                {
                    lt = GetSREC(Vigencia, lt);
                }
                if (Estado == "SREV")
                {
                    lt = GetSREV(Vigencia, lt);

                }
                if (Estado == "ACEP")
                {
                    lt = GetACEP(Vigencia, lt);
                }
                if (Estado == "RECH")
                {
                    lt = getRECH(Vigencia, lt);
                }
                return lt;
            }
        }

        public List<vPSolicitudes> Consultar(classFiltro Filtro )
        {
            List<vPSolicitudes> lst= new List<vPSolicitudes>();

            List<string> filtro =new List<string>(); ;
            Dictionary<string, object> dict = new Dictionary<string, object>();
            int i = 0;
            string Key;
            if (Filtro.COD_SOL != null) {
                Key="COD_SOL";
                dict.Add(Key, Filtro.COD_SOL);
                filtro.Add(string.Format("{0} == @{1}", Key,i++));
            }
            if (Filtro.DEP_PSOL != null)
            {
                Key = "DEP_PSOL";
                dict.Add(Key, Filtro.DEP_PSOL);
                filtro.Add(string.Format("{0} == @{1}", Key, i++));
            }
            if (Filtro.DEP_SOL != null)
            {
                Key = "DEP_SOL";
                dict.Add(Key, Filtro.DEP_SOL);
                filtro.Add(string.Format("{0} == @{1}", Key, i++));
            }
            /*
            if (Filtro.ID_ABOG_ENC != null)
            {
                Key = "HREVISADO1.NIT_ABOG_RECIBE";
                dict.Add(Key, Filtro.ID_ABOG_ENC);
                filtro.Add(string.Format("{0} == @{1}", Key, i++));
            }*/
            if (Filtro.VAL_CON != null)
            {
                Key = "VAL_CON";
                dict.Add(Key, Filtro.VAL_CON);
                filtro.Add(string.Format("{0} == @{1}", Key, i++));
            }
           
            if (Filtro.OBJ_SOL != null)
            {
                Key = "OBJ_SOL";
                dict.Add(Key, Filtro.OBJ_SOL);
                filtro.Add(string.Format(" OBJ_SOL.Contains(@0)  ",  i++));
            }
            if (Filtro.COD_TPRO != null)
            {
                Key = "COD_TPRO";
                dict.Add(Key, Filtro.COD_TPRO);
                filtro.Add(string.Format("{0} == @{1}", Key, i++));
            }
        
        /*
            public string COD_EP { get; set; }
        public decimal ID_HREV { get; set; }
        public string TIP_CON { get; set; }
        public string STIP_CON { get; set; }
        */
        
            
            string predicado = string.Join(" and ", filtro);
            
            crearMapeo();
            List<PSOLICITUDES> Lst= new List<PSOLICITUDES>();
            using (ctx = new Entities()){
                
                Lst = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Filtro.VIG_SOL).ToList();

                if (Filtro.TIPO_FECHA==classFiltro.TipoFecha.REGISTRO)
                {
                     Lst = Lst.Where(t => t.FECHA_REGISTRO.Value.Date >= Filtro.FECHA_I.Date &&
                           t.FECHA_REGISTRO.Value.Date <= Filtro.FECHA_F.Date
                        ).ToList();    
                }
                else if (Filtro.TIPO_FECHA == classFiltro.TipoFecha.REVISADO)
                {
                   
                    Lst = Lst.Where(tt=>tt.HREVISADO1.FECHA_REVISADO.HasValue).Where(t => 
                        t.HREVISADO1.FECHA_REVISADO.Value.Date >= Filtro.FECHA_I.Date &&
                        t.HREVISADO1.FECHA_REVISADO.Value.Date <= Filtro.FECHA_F.Date 
                     ).ToList();
                }
                if (Filtro.ID_ABOG_ENC != null)
                {
                    Lst = Lst.Where(t => t.HREVISADO1.NIT_ABOG_RECIBE == Filtro.ID_ABOG_ENC).ToList();
                }
                if (!String.IsNullOrEmpty(predicado))
                {
                  //  Lst = Lst.AsQueryable().Where(predicado, dict.Values.ToArray()).ToList();
                }
                 /*
                Lst = ctx.PSOLICITUDES.SqlQuery("Select * FRom PSolicitudes Where Vig_Sol=2013 And HREVISADO1.NIT_ABOG_RECIBE=50950218").ToList();
                  */
                if (Filtro.DEP_PSOL != null)
                {
                    Lst = Lst.Where(t => t.DEP_PSOL == Filtro.DEP_PSOL).ToList();
                }

                if (Filtro.OBJ_SOL != null)
                {
                    Lst=Lst.Where(t=>t.OBJ_SOL.Contains(Filtro.OBJ_SOL)).ToList();
                }

                if (Filtro.COD_SOL != null)
                {

                    Lst = Lst.Where(t => t.COD_SOL == Filtro.COD_SOL).ToList();
                }
                Mapper.Map(Lst, lst);
                return lst;
            }
        }
        
        private void crearMapeo() {
            Mapper.CreateMap<PSOLICITUDES, vPSolicitudes>()
                            .ForMember(dest => dest.EST_REC, opt => opt.MapFrom(src => src.HREVISADO1.RECIBIDO_ABOG))
                            .ForMember(dest => dest.FECHA_REVISADO, opt => opt.MapFrom(src => src.HREVISADO1.FECHA_REVISADO))
                            .ForMember(dest => dest.NOM_EST_SOL, opt => opt.MapFrom(src => src.HREVISADO1.CONCEPTO_REVISADO))
                            .ForMember(dest => dest.OBS_REC, opt => opt.MapFrom(src => src.HREVISADO1.OBS_RECIBIDO_ABOG))
                            .ForMember(dest => dest.COD_TPRO_NOM, opt => opt.MapFrom(src => src.TIPOSPROC.NOM_TPROC))
                            .ForMember(dest => dest.ID_ABOG_ENC, opt => opt.MapFrom(src => src.HREVISADO1.NIT_ABOG_RECIBE))
                            .ForMember(dest => dest.DEP_PSOL_NOM, opt => opt.MapFrom(src => src.DEPENDENCIA.NOM_DEP))
                            .ForMember(dest => dest.DEP_SOL_NOM, opt => opt.MapFrom(src => src.DEPENDENCIA1.NOM_DEP))
                            .ForMember(dest => dest.TIP_CON_NOM, opt => opt.MapFrom(src => src.TIPOSCONT.NOM_TIP))
                            .ForMember(dest => dest.STIP_CON_NOM, opt => opt.MapFrom(src => src.SUBTIPOS.NOM_STIP))
                            .ForMember(dest => dest.OBS_REV, opt => opt.MapFrom(src => src.HREVISADO1.OBS_REVISADO))
                            .ForMember(dest => dest.FEC_RECIBIDO, opt => opt.MapFrom(src => src.HREVISADO1.FECHA_RECIBIDO))
                            .ForMember(dest => dest.FEC_REC_ABOG, opt => opt.MapFrom(src => src.HREVISADO1.FEC_REC_ABOG))
                            .ForMember(dest => dest.FECHA_ASIGNADO, opt => opt.MapFrom(src => src.HREVISADO1.FEC_ASIGNADO))
                            .ForMember(dest => dest.FECHA_ASIGNADO, opt => opt.MapFrom(src => src.HREVISADO1.FEC_ASIGNADO))
                            .ForMember(dest => dest.NOM_ABOG_ENC, opt => opt.MapFrom(t => t.HREVISADO1.TERCEROS.APE1_TER + " " + t.HREVISADO1.TERCEROS.APE2_TER + " " + t.HREVISADO1.TERCEROS.NOM1_TER + " " + t.HREVISADO1.TERCEROS.NOM2_TER))
                            .ForMember(dest => dest.NOM_CON, opt => opt.MapFrom(t => t.TERCEROS1.APE1_TER + " " + t.TERCEROS1.APE2_TER + " " + t.TERCEROS1.NOM1_TER + " " + t.TERCEROS1.NOM2_TER))
                            ;
                             //EST_SOL = "SASI",
                             //NOM_EST_SOL = "Sin Asignar",
                
                

        }


        private List<vPSolicitudes> GetSASI2(short Vigencia, List<vPSolicitudes> lt)
        {
            return new List<vPSolicitudes>();
        }

        private List<vPSolicitudes> GetSASI(short Vigencia, List<vPSolicitudes> lt)
        {
            var q = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.NIT_ABOG_RECIBE == null).OrderBy(t=>t.COD_SOL)
            .Select(
            t => new vPSolicitudes
            {
                EST_REC = t.HREVISADO1.RECIBIDO_ABOG,
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
                ID_HREV = t.ID_HREV,
                OBS_REC = t.HREVISADO1.OBS_RECIBIDO_ABOG,
                OBS_REV = t.HREVISADO1.OBS_REVISADO,
                FEC_RECIBIDO = t.HREVISADO1.FECHA_RECIBIDO,
                FEC_REC_ABOG = t.HREVISADO1.FEC_REC_ABOG,
                FECHA_ASIGNADO = t.HREVISADO1.FEC_ASIGNADO,
                FECHA_REVISADO = t.HREVISADO1.FECHA_REVISADO,
                EST_SOL = "SASI",
                NOM_EST_SOL = "Sin Asignar",
                NOM_ABOG_ENC = (t.HREVISADO1.TERCEROS.APE1_TER + " " + t.HREVISADO1.TERCEROS.APE2_TER + " " + t.HREVISADO1.TERCEROS.NOM1_TER + " " + t.HREVISADO1.TERCEROS.NOM2_TER).Trim(),
                IDE_CON = t.IDE_CON,
                VIG_SOL = t.VIG_SOL,
                FECHA_REGISTRO=t.FECHA_REGISTRO,
                NOM_CON = (t.TERCEROS1.APE1_TER + " " + t.TERCEROS1.APE2_TER + " " + t.TERCEROS1.NOM1_TER + " " + t.TERCEROS1.NOM2_TER).Trim()
            }
            ).OrderByDescending(t => t.COD_SOL);

            lt = q.ToList<vPSolicitudes>();
            return lt;
        }

        private List<vPSolicitudes> GetSREC(short Vigencia, List<vPSolicitudes> lt)
        {
            var q = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.NIT_ABOG_RECIBE != null && t.HREVISADO1.RECIBIDO_ABOG == "N").OrderBy(t=>t.COD_SOL)
            .Select(
            t => new vPSolicitudes
            {
                EST_REC = t.HREVISADO1.RECIBIDO_ABOG,
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
                ID_HREV = t.ID_HREV,
                OBS_REC = t.HREVISADO1.OBS_RECIBIDO_ABOG,
                OBS_REV = t.HREVISADO1.OBS_REVISADO,
                FEC_RECIBIDO = t.HREVISADO1.FECHA_RECIBIDO,
                FEC_REC_ABOG = t.HREVISADO1.FEC_REC_ABOG,
                FECHA_ASIGNADO = t.HREVISADO1.FEC_ASIGNADO,
                FECHA_REVISADO = t.HREVISADO1.FECHA_REVISADO,
                EST_SOL = "SREC",
                NOM_EST_SOL = "Sin Revisar",
                NOM_ABOG_ENC = (t.HREVISADO1.TERCEROS.APE1_TER + " " + t.HREVISADO1.TERCEROS.APE2_TER + " " + t.HREVISADO1.TERCEROS.NOM1_TER + " " + t.HREVISADO1.TERCEROS.NOM2_TER).Trim(),
                IDE_CON = t.IDE_CON,
                VIG_SOL = t.VIG_SOL,
                FECHA_REGISTRO = t.FECHA_REGISTRO,
                NOM_CON = (t.TERCEROS1.APE1_TER + " " + t.TERCEROS1.APE2_TER + " " + t.TERCEROS1.NOM1_TER + " " + t.TERCEROS1.NOM2_TER).Trim()
            }
            ).OrderByDescending(t => t.COD_SOL);

            lt = q.ToList<vPSolicitudes>();
            return lt;
        }

        private List<vPSolicitudes> GetSREV(short Vigencia, List<vPSolicitudes> lt)
        {
            var q = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "P").OrderBy(t=>t.COD_SOL)
                .Select(
        t => new vPSolicitudes
        {
            EST_REC = t.HREVISADO1.RECIBIDO_ABOG,

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
            ID_HREV = t.ID_HREV,
            OBS_REC = t.HREVISADO1.OBS_RECIBIDO_ABOG,
            OBS_REV = t.HREVISADO1.OBS_REVISADO,
            FEC_RECIBIDO = t.HREVISADO1.FECHA_RECIBIDO,
            FEC_REC_ABOG = t.HREVISADO1.FEC_REC_ABOG,
            FECHA_ASIGNADO = t.HREVISADO1.FEC_ASIGNADO,
            FECHA_REVISADO = t.HREVISADO1.FECHA_REVISADO,
            EST_SOL = "SREV",
            NOM_EST_SOL = "Pendiente",
            NOM_ABOG_ENC = (t.HREVISADO1.TERCEROS.APE1_TER + " " + t.HREVISADO1.TERCEROS.APE2_TER + " " + t.HREVISADO1.TERCEROS.NOM1_TER + " " + t.HREVISADO1.TERCEROS.NOM2_TER).Trim(),
            IDE_CON = t.IDE_CON,
            VIG_SOL = t.VIG_SOL,
            FECHA_REGISTRO = t.FECHA_REGISTRO,
            NOM_CON = (t.TERCEROS1.APE1_TER + " " + t.TERCEROS1.APE2_TER + " " + t.TERCEROS1.NOM1_TER + " " + t.TERCEROS1.NOM2_TER).Trim()
        }
        )
        .OrderByDescending(t => t.COD_SOL);
            lt = q.ToList<vPSolicitudes>();
            return lt;
        }

        private List<vPSolicitudes> GetACEP(short Vigencia, List<vPSolicitudes> lt)
        {
            var q = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "A").OrderBy(t => t.COD_SOL)
                .Select(
        t => new vPSolicitudes
        {
            EST_REC = t.HREVISADO1.RECIBIDO_ABOG,
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
            ID_HREV = t.ID_HREV,
            OBS_REC = t.HREVISADO1.OBS_RECIBIDO_ABOG,
            OBS_REV = t.HREVISADO1.OBS_REVISADO,
            FEC_RECIBIDO = t.HREVISADO1.FECHA_RECIBIDO,
            FEC_REC_ABOG = t.HREVISADO1.FEC_REC_ABOG,
            FECHA_ASIGNADO = t.HREVISADO1.FEC_ASIGNADO,
            FECHA_REVISADO = t.HREVISADO1.FECHA_REVISADO,
            EST_SOL = "ACEP",
            NOM_EST_SOL = "Aceptado",
            NOM_ABOG_ENC = (t.HREVISADO1.TERCEROS.APE1_TER + " " + t.HREVISADO1.TERCEROS.APE2_TER + " " + t.HREVISADO1.TERCEROS.NOM1_TER + " " + t.HREVISADO1.TERCEROS.NOM2_TER).Trim(),
            IDE_CON = t.IDE_CON,
            VIG_SOL = t.VIG_SOL,
            FECHA_REGISTRO = t.FECHA_REGISTRO,
            NOM_CON = (t.TERCEROS1.APE1_TER + " " + t.TERCEROS1.APE2_TER + " " + t.TERCEROS1.NOM1_TER + " " + t.TERCEROS1.NOM2_TER).Trim()
        }
        )
        .OrderByDescending(t => t.COD_SOL);
            lt = q.ToList<vPSolicitudes>();
            return lt;
        }

        private List<vPSolicitudes> getRECH(short Vigencia, List<vPSolicitudes> lt)
        {
            var q = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "R").OrderBy(t => t.COD_SOL)
                .Select(
                    t => new vPSolicitudes
                    {
                        EST_REC = t.HREVISADO1.RECIBIDO_ABOG,
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
                        ID_HREV = t.ID_HREV,
                        OBS_REC = t.HREVISADO1.OBS_RECIBIDO_ABOG,
                        OBS_REV = t.HREVISADO1.OBS_REVISADO,
                        FEC_RECIBIDO = t.HREVISADO1.FECHA_RECIBIDO,
                        FEC_REC_ABOG = t.HREVISADO1.FEC_REC_ABOG,
                        FECHA_ASIGNADO = t.HREVISADO1.FEC_ASIGNADO,
                        FECHA_REVISADO = t.HREVISADO1.FECHA_REVISADO,
                        NOM_EST_SOL = "Rechazado",
                        NOM_ABOG_ENC = (t.HREVISADO1.TERCEROS.APE1_TER + " " + t.HREVISADO1.TERCEROS.APE2_TER + " " + t.HREVISADO1.TERCEROS.NOM1_TER + " " + t.HREVISADO1.TERCEROS.NOM2_TER).Trim(),
                        IDE_CON = t.IDE_CON,
                        VIG_SOL = t.VIG_SOL,
                        FECHA_REGISTRO = t.FECHA_REGISTRO,
                        NOM_CON = (t.TERCEROS1.APE1_TER + " " + t.TERCEROS1.APE2_TER + " " + t.TERCEROS1.NOM1_TER + " " + t.TERCEROS1.NOM2_TER).Trim()
                    }
        )
        .OrderByDescending(t => t.COD_SOL);
            lt = q.ToList<vPSolicitudes>();
            return lt;
        }

        /*
        private static readonly Func<Entities, classFiltro, IQueryable<PSOLICITUDES>> 
            PSOLICITUDESWithFilters = CompiledQuery.Compile(
            (Entities context, classFiltro f) =>
          context.PSOLICITUDES.Where(c =>  f.COD_EP == "" || c.COD_EP == f.COD_EP)
          .Where(c => c.DEP_PSOL == "" || c.DEP_PSOL == c.DEP_PSOL)
         );
        */
        public List<vPSolicitudes> Consultar2(classFiltro Filtro)
        {
            classFiltro f = Filtro;
            List<vPSolicitudes> lst = new List<vPSolicitudes>();
            //IQueryable<PSOLICITUDES> lst
            using (ctx = new Entities())
            {
                var Lst =
                    ctx.PSOLICITUDES.
                    Where(c => f.COD_SOL == null || c.COD_EP == f.COD_SOL)
                   .Where(c => f.DEP_PSOL == null || c.DEP_PSOL == f.DEP_PSOL)
                   .Where(c => f.DEP_SOL == null || c.DEP_PSOL == f.DEP_SOL)
                   .Where(c => f.VAL_CON.HasValue == false || c.VAL_CON == f.VAL_CON)
                   .Where(c => (f.ID_ABOG_ENC == null && c.HREVISADO1 != null) || c.HREVISADO1.NIT_ABOG_RECIBE == f.ID_ABOG_ENC)
                   .Where(c => f.OBJ_SOL == null || c.OBJ_SOL == f.OBJ_SOL)
                   .Where(c => f.COD_TPRO == null || c.COD_TPRO == f.COD_TPRO)
                   ;
                Mapper.Map(Lst, lst);
            }
            return lst.ToList();
        }
    }

   

}
