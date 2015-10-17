using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using Entidades.VistasPROC;
using BLL.EstPrev;
using Entidades.Consultas;

namespace BLL.PROCESOS.Gestion
{
  class mPCONTRATOS
    {       
        protected Entities ctx { get; set; }
        protected ByARpt byaRpt = new ByARpt();
        //protected mTerceros mt = new mTerceros();
        List<TIPOSCONT> ltip;
        List<SUBTIPOS> lsub;

        public mPCONTRATOS()
        {
            
        }
        protected void Mapear()
        {
           // mt.ctx = ctx;
            ltip = ctx.TIPOSCONT.Where(t => t.EST_TIP == "AC").ToList();
            lsub = ctx.SUBTIPOS.Where(t => t.ESTADO == "AC").ToList();
            Mapper.CreateMap<PCONTRATOS, vPCONTRATOS>()
                        .ForMember(dest => dest.DEP_CON_NOM, opt => opt.MapFrom(src => src.DEPENDENCIA1.NOM_DEP))
                        .ForMember(dest => dest.DEP_PCON_NOM, opt => opt.MapFrom(src => src.DEPENDENCIA.NOM_DEP))
                        .ForMember(dest => dest.COD_TPRO_NOM, opt => opt.MapFrom(src => src.TIPOSPROC.NOM_TPROC))
                        .ForMember(dest => dest.NOM_ABOG_ENC, opt => opt.MapFrom(src => buildTercero(src.USUENCARGADO)))
                        .ForMember(dest => dest.TIP_CON_NOM, opt => opt.MapFrom(src => ltip.Where(t => t.COD_TIP == src.TIP_CON).FirstOrDefault().NOM_TIP))
                        .ForMember(dest => dest.STIP_CON_NOM, opt => opt.MapFrom(src => lsub.Where(t => t.COD_STIP == src.STIP_CON).FirstOrDefault().NOM_STIP))
                        .ForMember(dest => dest.NOM_EST_PROC, opt => opt.MapFrom(src => src.PESTADOS.NOM_EST))
                        .ForMember(dest => dest.FECHAASIG, opt => opt.MapFrom(src => GetFechaAsig(src)))
                        .ForMember(dest => dest.ACT_HOY, opt => opt.MapFrom(src => GetACT_HOY(src)))
                        .ForMember(dest => dest.ACT_VENCIDAS, opt => opt.MapFrom(src => GetACT_VENCIDAS(src)))
                        .ForMember(dest => dest.ACT_POR_VENCER, opt => opt.MapFrom(src => GetACT_POR_VENCER(src)))
                        .ForMember(dest => dest.ACT_EN_ESPERA, opt => opt.MapFrom(src => GetACT_EN_ESPERA(src)))
                        .ForMember(dest => dest.ACT_EN_CURSO, opt => opt.MapFrom(src => GetACT_EN_CURSO(src)))
                        .ForMember(dest => dest.ACT_APLAZADAS, opt => opt.MapFrom(src => GetACT_APLAZADAS(src)))
                        .ForMember(dest => dest.ACT_COMPLETADAS, opt => opt.MapFrom(src => GetACT_COMPLETADAS(src)))
                        ;
        }
        public vPCONTRATOS GetProceso(string Num_Pro)
        {
            vPCONTRATOS pc = new vPCONTRATOS();
            using (ctx = new Entities())
            {

                PCONTRATOS pcO = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == Num_Pro).FirstOrDefault();
                Mapper.CreateMap<PCONTRATOS, vPCONTRATOS>();
                Mapear();
                Mapper.Map(pcO, pc);
                return pc;
            }
        }
        public vESTPREV GetEstPrevToProceso(string Num_Pro)
        {
            using (ctx = new Entities())
            {                
                PCONTRATOS Proceso = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == Num_Pro).FirstOrDefault();
                if ((Proceso != null) && (Proceso.NUM_SOL != null))
                {
                    PSOLICITUDES Solicitud = ctx.PSOLICITUDES.Where(t => t.COD_SOL == Proceso.NUM_SOL).FirstOrDefault();
                    if ((Solicitud != null) && (Solicitud.COD_EP != null))
                    {
                        mESTPREV objEstPrev = new mESTPREV();
                        vESTPREV EstudioPrevio = objEstPrev.GetPK(Solicitud.COD_EP, "*");
                        return EstudioPrevio;
                    }
                    else return null;
                }
                else return null;
            }
        }
        public List<vPCONTRATOS> GetProcesosU(short Vigencia, string Usuario)
        {
            List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
            ctx = new Entities();
            Mapear();

            List<PCONTRATOS> lstO = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia && t.USUENCARGADO == Usuario).OrderBy(t=> new{t.PRO_SEL_NRO, t.ESTADO} ).ToList();
            Mapper.Map(lstO, lst);
            return lst;
        }
        public List<vPCONTRATOS> GetProcesosU(short Vigencia, string Usuario, string Dependencia, string Estado)
        {
            List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
            ctx = new Entities();
            

            List<PCONTRATOS> lstO = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia && t.USUENCARGADO == Usuario).OrderBy(t=> new{t.PRO_SEL_NRO, t.ESTADO} ).ToList();
            
            if (Dependencia != "") {
                lstO = lstO.Where(t => t.DEP_PCON == Dependencia).ToList();
            }

            if (Estado != "00")
            {
                lstO = lstO.Where(t => t.EST_CON == Estado).ToList();
            }
            Mapear();
            Mapper.Map(lstO, lst);
            return lst;
        }
        public List<vPCONTRATOS> GetProcesosUFiltro(short Vigencia, string Usuario, string Dependencia, string Estado, string Filtro)
        {
            List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
            ctx = new Entities();


            List<PCONTRATOS> lstO = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia && t.USUENCARGADO == Usuario).OrderBy(t => new { t.PRO_SEL_NRO, t.ESTADO }).ToList();

            if (Dependencia != "")
            {
                lstO = lstO.Where(t => t.DEP_PCON == Dependencia).ToList();
            }

            if (Estado != "00")
            {
                lstO = lstO.Where(t => t.EST_CON == Estado).ToList();
            }

            Mapear();
            Mapper.Map(lstO, lst);

            lst = lst.Where(t => t.DEP_PCON_NOM.ToUpper().Contains(Filtro.ToUpper()) || t.DEP_CON_NOM.ToUpper().Contains(Filtro.ToUpper()) || t.COD_TPRO_NOM.ToUpper().Contains(Filtro.ToUpper()) || t.OBJ_CON.ToUpper().Contains(Filtro.ToUpper())).ToList();


            return lst;
        }
        public List<vPCONTRATOS> GetProcesosD(short Vigencia, string Dep_Del)
        {
            List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
            ctx = new Entities();
            Mapear();
        
            List<PCONTRATOS> lstO;
            if (String.IsNullOrEmpty(Dep_Del))
            {
                lstO = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia ).ToList();
            }
            else {
                lstO = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia && t.DEP_PCON == Dep_Del).ToList();
            }
            
            Mapper.Map(lstO, lst);
            return lst;
        }
        public List<vPCONTRATOS> GetProcesosS(short Vigencia, string Dep_Sol)
        {
            List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
            ctx = new Entities();
            Mapear();

            List<PCONTRATOS> lstO;
            if (String.IsNullOrEmpty(Dep_Sol))
            {
                lstO = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia).ToList();
            }
            else
            {
                lstO = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia && t.DEP_PCON == Dep_Sol).ToList();
            }
            Mapper.Map(lstO, lst);
            return lst;
        }
        public List<vPCONTRATOS> GetProcesosDF(short Vigencia, string Dep_Del)
        {
            List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
            ctx = new Entities();
            Mapear();
            
            List<PCONTRATOS> lstO;
            
            List<object> lparam = new List<object>();
            ObjectParameter VigenciaParam = new ObjectParameter("Vigencia", Vigencia);
            lparam.Add(VigenciaParam);
            
            lstO = ctx.PCONTRATOS.SqlQuery("Select * from PCONTRATOS Where VIG_CON=@Vigencia", lparam.ToArray()).ToList<PCONTRATOS>();

            Mapper.Map(lstO, lst);
            return lst;
        }
        public List<vPCONTRATOS> Consultar(classFiltro Filtro)
        {
            List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
            List<PCONTRATOS> Lst = new List<PCONTRATOS>();

            ctx = new Entities();//)
            //{
                Mapear();
                Lst = ctx.PCONTRATOS.Where(t => t.VIG_CON == Filtro.VIG_SOL).ToList();
                if (Filtro.NUM_PRO != null)
                {
                    Lst = Lst.Where(t => t.PRO_SEL_NRO == Filtro.NUM_PRO).ToList();
                }
                if (Filtro.TIPO_FECHAP.Equals( classFiltro.TipoFechap.REGISTRO))
                {
                      Lst = Lst.Where(t => t.FEC_REG.Value.Date >= Filtro.FECHA_I.Date &&
                         t.FEC_REG.Value.Date <= Filtro.FECHA_F.Date
                         ).ToList();
                }
                else if (Filtro.TIPO_FECHAP.Equals(classFiltro.TipoFechap.ASIGNADO))
                {
                    Lst = Lst.Where(tt => tt.FECHAASIG.HasValue).Where(t =>
                          t.FECHAASIG.Value.Date >= Filtro.FECHA_I.Date &&
                          t.FECHAASIG.Value.Date <= Filtro.FECHA_F.Date
                      ).ToList();
                    /*
                    Lst = Lst.Where(t =>
                       EntityFunctions.TruncateTime(t.HREVISADO1.FECHA_REVISADO.Value) >= Filtro.FECHA_I &&
                       EntityFunctions.TruncateTime(t.HREVISADO1.FECHA_REVISADO.Value) <= Filtro.FECHA_F
                    ).ToList();*/
                }
                else if (Filtro.TIPO_FECHAP.Equals(classFiltro.TipoFechap.RECIBIDO))
                {
                    Lst = Lst.Where(t =>
                          t.FECHARECIBIDO.Value >= Filtro.FECHA_I.Date &&
                          t.FECHARECIBIDO.Value <= Filtro.FECHA_F.Date
                      ).ToList();
                
                }
                if (Filtro.DEP_PSOL != null)
                {
                    Lst = Lst.Where(t => t.DEP_CON == Filtro.DEP_PSOL).ToList();
                }
                if (Filtro.ID_ABOG_ENC != null)
                {
                    Lst = Lst.Where(t => t.USUENCARGADO == Filtro.ID_ABOG_ENC).ToList();
                }
                Mapper.Map(Lst, lst);
                return lst;
           // }using (
        }
        private DateTime? GetFechaAsig(PCONTRATOS pc)
        { 
            try {
                return ctx.HREVISADO.Where(t => t.COD_SOL == pc.NUM_SOL).FirstOrDefault().FEC_ASIGNADO;
            }catch
            {
                return null;
            }
        }
        private int GetACT_EN_ESPERA(PCONTRATOS pc)
        {
            return pc.PCRONOGRAMAS.Where(t => t.ANULADO == "N" && t.EST_ACT == "0005").Count();
        }
        private int GetACT_EN_CURSO(PCONTRATOS pc)
        {
            return pc.PCRONOGRAMAS.Where(t => t.ANULADO == "N" && t.EST_ACT == "0002").Count();
        }
        private int GetACT_APLAZADAS(PCONTRATOS pc)
        {
            return pc.PCRONOGRAMAS.Where(t => t.ANULADO == "N" && t.EST_ACT == "0004").Count();
        }
        private int GetACT_COMPLETADAS(PCONTRATOS pc)
        {
                return pc.PCRONOGRAMAS.Where(t => t.ANULADO == "N" && t.EST_ACT == "0003" ).Count();
        }
        private int GetACT_HOY(PCONTRATOS pc)
        {
            return pc.PCRONOGRAMAS.Where(t => t.ANULADO == "N" && t.EST_ACT != "0003" && t.EST_ACT != "0000" && t.FECHAI.Value.ToShortDateString() == DateTime.Now.ToShortDateString()).Count();
            
        }
        private int GetACT_VENCIDAS(PCONTRATOS pc)
        {
            return pc.PCRONOGRAMAS.Where(t => t.ANULADO == "N" && t.EST_ACT != "0003" && t.EST_ACT != "0000"
                && Convert.ToDateTime(t.FECHAI.Value.ToShortDateString()) < Convert.ToDateTime(DateTime.Now.ToShortDateString())).Count();
        }
        private int GetACT_POR_VENCER(PCONTRATOS pc)
        {
            return pc.PCRONOGRAMAS.Where(t => t.ANULADO == "N" && t.EST_ACT != "0003" && t.EST_ACT != "0000"
                && (Convert.ToDateTime(t.FECHAI.Value.ToShortDateString()) > Convert.ToDateTime(DateTime.Now.AddDays(GetDiasIni()).ToShortDateString())
                && Convert.ToDateTime(t.FECHAI.Value.ToShortDateString()) <  Convert.ToDateTime(DateTime.Now.AddDays(GetDiasFin()).ToShortDateString()) )).Count();
        }   
        private int GetDiasIni()
        {
            return 0;
        }
        private int GetDiasFin()
        {
            return 4;
        }
        private string buildNomTer(TERCEROS t)
        {
            if (t != null)
            {
                return t.NOM1_TER + " " + t.NOM2_TER + " " + t.APE1_TER + " " + t.APE2_TER;
            }
            return "";
        }
        private string buildTercero(string IdeTer)
        {
            Entities ctx2 = new Entities();
            return buildNomTer(ctx2.TERCEROS.Where(t => t.IDE_TER == IdeTer).FirstOrDefault());
        }        

        /// Carlos Tirado 29/09/2015
        public List<vPROC_MOD> GetCantidadProcesosPorModalidad(short Vigencia, string Usuario)
        {
            using (ctx = new Entities())
            {
                List<vPROC_MOD> lr = new List<vPROC_MOD>();
                List<TIPOSPROC> lModalidades = ctx.TIPOSPROC.Where(t => t.COD_TPROC != "TP00" && t.ESTA_TPROC == "AC").ToList();
                foreach (TIPOSPROC Modalidad in lModalidades)
                {
                    vPROC_MOD ProcesoCantidad = new vPROC_MOD();
                    List<PCONTRATOS> Procesos = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia && t.USUENCARGADO == Usuario && t.COD_TPRO == Modalidad.COD_TPROC).OrderBy(t => new { t.PRO_SEL_NRO, t.ESTADO }).ToList();
                    ProcesoCantidad.NombreModalidad = Modalidad.NOM_TPROC;
                    ProcesoCantidad.CodigoModalidad = Modalidad.COD_TPROC;
                    ProcesoCantidad.Cantidad = Procesos.Count();
                    lr.Add(ProcesoCantidad);
                }
                return lr.OrderByDescending(t => t.Cantidad).ToList();
            }  
        }
        public List<vPCONTRATOS> GetProcesosUsuario(short Vigencia, string Usuario, string Modalidad, string Filtro)
        {
            using (ctx = new Entities())
            {
                List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
                if ((Modalidad == "") || (Modalidad == null)) lst = ProcesosHoy(Vigencia, Usuario);
                else lst = ProcesosTodos(Vigencia, Usuario, Modalidad);
                return FiltrarProcesos(lst, Filtro);
            }
        }
        private List<vPCONTRATOS> ProcesosTodos(short Vigencia, string Usuario, string Modalidad)
        {
            List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
            List<PCONTRATOS> lstTodas = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia && t.USUENCARGADO == Usuario && t.COD_TPRO == Modalidad).OrderBy(t => new { t.PRO_SEL_NRO, t.ESTADO }).ToList();
            Mapear();
            Mapper.Map(lstTodas, lst);
            return lst.ToList();
        }
        private List<vPCONTRATOS> ProcesosHoy(short Vigencia, string Usuario)
        {
            List<vPCONTRATOS> lst = new List<vPCONTRATOS>();
            List<PCONTRATOS> lstHoy = ctx.PCONTRATOS.Where(t => t.VIG_CON == Vigencia && t.USUENCARGADO == Usuario).OrderBy(t => new { t.PRO_SEL_NRO, t.ESTADO }).ToList();
            Mapear();
            Mapper.Map(lstHoy, lst);
            return lst.Where(t => t.ACT_HOY > 0).ToList();
        }
        private List<vPCONTRATOS> FiltrarProcesos(List<vPCONTRATOS> lst, string Filtro)
        {
            if ((Filtro == "")||(Filtro == null)) return lst;
            else
            {
                return lst.Where(t =>
                    t.PRO_SEL_NRO.ToUpper().Contains(Filtro.ToUpper()) ||
                    t.OBJ_CON.ToUpper().Contains(Filtro.ToUpper()) ||
                    t.NOM_ABOG_ENC.ToUpper().Contains(Filtro.ToUpper()) ||
                    t.NOM_EST_PROC.ToUpper().Contains(Filtro.ToUpper()) ||
                    t.DEP_CON_NOM.ToUpper().Contains(Filtro.ToUpper()) ||
                    t.DEP_PCON_NOM.ToUpper().Contains(Filtro.ToUpper()) ||
                    t.NOM_EST_PROC.ToUpper().Contains(Filtro.ToUpper())
                    ).ToList();
            }
        }
    }
}
