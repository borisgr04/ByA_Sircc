using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.CGestion.Actas;
using BLL.CGestion.Filtros;
using ByA;
using Entidades;
using Entidades.VistasGC;

namespace BLL.CGestion
{
    /// <summary>
    /// CLASE PARA ADMINISTRAR EL COMPONENTE DE GESTION DE CONTRATOS POR SUPERVISOR
    /// </summary>
    public class CGSupervisorBLL
    {
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }
        FiltrosContratos fc;
        CGContratos oContratos = new CGContratos();

        public List<vPPLANTILLAS_ACTAS> GetPlantillasActas(string ClaActa)
        {
            using (ctx = new Entities())
            {
                return ctx.PPLANTILLAS.Where(t => t.TIP_PLA == "04" && t.EST_PLA == "AC" && t.COD_STIP == ClaActa)
                    .Select(
                    t => new vPPLANTILLAS_ACTAS
                    {
                      CLA_ACTA= t.COD_STIP,
                      CLAVE=t.CLAVE,
                      EDITABLE=t.EDITABLE,
                      EXT=t.EXT,
                      IDE_PLA=t.IDE_PLA,
                      NOM_PLA=t.NOM_PLA,
                      URL_FORM= t.INT_PPLANTILLAS_URL.URL_FORM
                    }
                    ).ToList();
            }
        }
        public List<vContratosInt> GetContratos(vContratosIntFiltro cFil)
        {
            //Crear Una Tabla que Tenga Configurado el Formulario y el Tipo de Filtro
            fc = FiltroContratosFactory.CreateFiltroContratos(TipoFiltrosContratos.Interventor);
            return fc.GetContratos(cFil);
        }

        public IList<vContratosInt> GetContratos(string Ide_Supervisor, short Vigencia, string Dep_Sup) {
            return oContratos.GetContratosbyIdeSup(Ide_Supervisor, Vigencia, Dep_Sup);
        }
        public IList<vContratosInt> GetContratos(string Ide_Supervisor, short Vigencia)
        {
            return oContratos.GetContratosbyIdeSup(Ide_Supervisor, Vigencia);
        }
        public List<vDEPENDENCIA> GetDependencias(vContratosIntFiltro cFil)
        {
            //Crear Una Tabla que Tenga Configurado el Formulario y el Tipo de Filtro
            using(ctx= new Entities()){
                List<vDEPENDENCIA> q = ctx.INTERVENTORES_CONTRATO.Where(t => t.IDE_INT == cFil.Ide_Interventor)
                        .Select(t => new vDEPENDENCIA { NOM_DEP = t.CONTRATOS.DEPENDENCIA.NOM_DEP, COD_DEP = t.CONTRATOS.DEPENDENCIA.COD_DEP })
                        .Distinct().ToList();
                return q;
            }
        }

        public List<vACTASCONTRATO> GetActas(string CodCon)
        {
            using (ctx = new Entities())
            {
                List<vACTASCONTRATO> q = ctx.ESTCONTRATOS.Where(t => t.COD_CON == CodCon && t.ESTADO == "AC")
                       .Select(
                       t => new vACTASCONTRATO
                       {
                           COD_CON = t.COD_CON,
                           EST_FIN = t.EST_FIN,
                           EST_INI = t.EST_INI,
                           FEC_ACT = t.FEC_ENT,
                           VAL_PAGO = t.VAL_PAGO,
                           NRO_DOC = t.NRO_DOC,
                           NOM_ACTA = t.ESTADOS.NOM_EST,
                           ID=t.ID,
                           OBS_EST= t.OBS_EST,
                           POR_EJE_FIS = t.POR_EJE_FIS
                       }).OrderByDescending(t => t.ID).ToList();
                return q;
            }
        }

        public List<vACTASCONTRATO> GetActas(short Vig_Con, string Ide_Supervisor)
        {
            MapearEstAct();
            List<vACTASCONTRATO> oActa = new List<vACTASCONTRATO>();

            
            using (ctx = new Entities())
            {
               List<ESTCONTRATOS> oEst = ctx.ESTCONTRATOS.
                    Where(tt => 
                        tt.CONTRATOS.VIG_CON == Vig_Con && 
                        tt.ESTADO == "AC" &&
                        tt.CONTRATOS.INTERVENTORES_CONTRATO.Where(t=>t.IDE_INT==Ide_Supervisor && t.TIP_INT=="S" && t.EST_INT=="AC").Count()>0
                        ).ToList();
                Mapper.Map(oEst, oActa);
                return oActa.OrderByDescending(t => t.FEC_ACT).ToList();
            }
        }

        private void MapearEstAct()
        {
            Mapper.CreateMap<INT_CONTROL_DOC, vINT_CONTROL_DOC>();

            Mapper.CreateMap<ESTCONTRATOS, vACTASCONTRATO>()
                .ForMember(dest => dest.NOM_ACTA, opt => opt.MapFrom(src => src.ESTADOS.NOM_EST))
                .ForMember(dest => dest.FEC_ACT, opt => opt.MapFrom(src => src.FEC_ENT))
                .ForMember(dest => dest.INT_CONTROL_DOC1, opt => opt.MapFrom(src => src.INT_CONTROL_DOC1));
        }

        //Indirección
        public vContratosInt GetDetContrato(string CodCon)
        {
            CGContratos o = new CGContratos();
            return o.GetDetContrato(CodCon);
        }
        public List<vEstados> GetActasSiguientes(string CodCon)
        {
            List<vEstados> lstE = null;
            using (ctx = new Entities())
            {
                CONTRATOS Cont = ctx.CONTRATOS.Where(c => c.COD_CON==CodCon).FirstOrDefault();
                if (Cont != null)
                {
                    
                    var q = ctx.ESTADOS
                        .Where(t => t.COD_EST == Cont.EST_CON)
                        .FirstOrDefault()
                        .ESTADOS1.Select(t => new vEstados{  codigo=t.COD_EST,nombre=t.NOM_EST});// El Estado 1, sera el siguiente
                    lstE = q.ToList(); 
                }
                return lstE;
            }
        }

        /// <summary>
        /// Prueba de Report
        /// </summary>
        /// <returns></returns>
        public List<vDocActasParcial> ActaParcial() {
            CGActaParcial cg = new CGActaParcial();
            return cg.GetActa();
        }


        public List<vINT_INFOCONT> GetInformesV(short Vig_Con, string Ide_Supervisor)
        {
            List<vINT_INFOCONT> l = new List<vINT_INFOCONT>();
            using (ctx = new Entities())
            {
                List<INT_INFOCONT> lst = ctx.INT_INFOCONT.
                    Where(
                             t =>  t.CONTRATOS.VIG_CON == Vig_Con &&
                                   t.EST_INF != "AN" && t.EST_INF != "BO" &&
                                   t.CONTRATOS.INTERVENTORES_CONTRATO.Where(tt => tt.IDE_INT == Ide_Supervisor && tt.TIP_INT == "S" && tt.EST_INT == "AC").Count() > 0

                    ).ToList(); ;
                Mapper.CreateMap<INT_INFOCONT, vINT_INFOCONT>();
                Mapper.Map(lst, l);

                return l;
            }
        
        }
    }
}
