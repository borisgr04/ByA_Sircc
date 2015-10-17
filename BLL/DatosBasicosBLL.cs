using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;
using Entidades;
using AutoMapper;
using Entidades.Vistas;

namespace BLL
{
   public class DatosBasicosBLL
    {

        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }

        public IList<vTIP_DOC> GetTIPOSDOC()
        {
            IList<vTIP_DOC> lst = new List<vTIP_DOC>();
            using (ctx = new Entities())
            {
                IList<TIP_DOC> lstO = ctx.TIP_DOC.Where(t => t.EST_TIP == "AC" && t.ORIGEN=="C" && t.ETAPAS.PROCESO=="NO").ToList();
                Mapper.CreateMap<TIP_DOC, vTIP_DOC>();
                Mapper.Map(lstO,lst);
                return lst.ToList();
            }
        }

        public vVIGENCIAS GetVigenciaActual() {
            VIGENCIAS vig;
            vVIGENCIAS oVig= new vVIGENCIAS();
            Mapper.CreateMap<VIGENCIAS, vVIGENCIAS>();
            using (ctx = new Entities())
            {
                vig = ctx.VIGENCIAS.Where(t => t.EST_VIG == "ABIERTA").OrderBy(t => t.YEAR_VIG).FirstOrDefault();
                Mapper.Map(vig, oVig);
                return oVig;
            }
            
        } 
        
        #region ESTUDIO-PREVIOS
        public IList<DEPENDENCIA> GetDependencia()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.DEPENDENCIA.Where(t => t.ESTADO == "AC");
                return lst.ToList();
            }
        }

        public IList<TIPOSCONT> GetTipos()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.TIPOSCONT.Where(t => t.EST_TIP == "AC");
                return lst.ToList();
            }
        }

        public IList<vTIPOSCONT> GetvTIPOSCONT()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.TIPOSCONT.Where(t => t.EST_TIP == "AC").Select(t => new vTIPOSCONT { COD_TIP = t.COD_TIP, NOM_TIP = t.NOM_TIP, EST_TIP = t.EST_TIP });
                return lst.ToList();
            }
        }

        public IList<SUBTIPOS> GetSubTipos(string Cod_Tip)
        {
            using (ctx = new Entities())
            {
                var lst = ctx.SUBTIPOS.Where(st => st.COD_TIP == Cod_Tip && st.ESTADO == "AC");
                return lst.ToList();
            }
        }

        public IList<vEP_ESTADOS> GetvEP_ESTADOS()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.EP_ESTADOS.Select(t => new vEP_ESTADOS { COD_EST = t.COD_EST, NOM_EST = t.NOM_EST });
                return lst.ToList();
            }
        }
        public IList<vSUBTIPOS> GetvSUBTIPOS(string Cod_Tip)
        {
            using (ctx = new Entities())
            {
                var lst = ctx.SUBTIPOS.Where(st => st.COD_TIP == Cod_Tip && st.ESTADO == "AC").Select(t => new vSUBTIPOS { COD_STIP = t.COD_STIP, NOM_STIP = t.NOM_STIP, NOMC_STIP = t.TIPOSCONT.NOM_TIP + " " + t.NOM_STIP, COD_TIP = t.COD_STIP });
                return lst.ToList();
            }
        }


        public IList<TIPO_PLAZOS> GetPlazos()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.TIPO_PLAZOS;
                return lst.ToList();
            }
        }

        public IList<TIPO_PLAZOS> GetPlazos(string Cod_Plazo)
        {
            using (ctx = new Entities())
            {
                TIPO_PLAZOS tpInicial = (ctx.TIPO_PLAZOS.Where(tp => tp.COD_TPLA == Cod_Plazo)).FirstOrDefault();
                decimal? OrdSel = tpInicial.ORD_TPLA;
                var lst = ctx.TIPO_PLAZOS.Where(tp => tp.ORD_TPLA < OrdSel);
                return lst.ToList();
            }
        }


        public IList<vTIPO_PLAZOS> GetvTIPO_PLAZOS()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.TIPO_PLAZOS.Select(t => new vTIPO_PLAZOS { COD_TPLA = t.COD_TPLA, NOM_PLA = t.NOM_PLA });
                return lst.ToList();
            }
        }

        public IList<vTIPOSPROC> GetvModalidad()
        {
            using (ctx = new Entities())
            {

                var lst = ctx.TIPOSPROC.Where(t => t.COD_TPROC != "TP00" && t.ESTA_TPROC == "AC").Select(t => new vTIPOSPROC { COD_TPROC = t.COD_TPROC, ABRE_TPROC = t.ABRE_TPROC, NOM_TPROC = t.NOM_TPROC }).OrderBy(t => t.NOM_TPROC);
                return lst.ToList();
            }
        }

        public IList<vTIPO_PLAZOS> GetvTIPO_PLAZOS(string Cod_Plazo)
        {
            using (ctx = new Entities())
            {
                TIPO_PLAZOS tpInicial = (ctx.TIPO_PLAZOS.Where(tp => tp.COD_TPLA == Cod_Plazo)).FirstOrDefault();
                decimal? OrdSel = tpInicial.ORD_TPLA;
                var lst = ctx.TIPO_PLAZOS.Where(tp => tp.ORD_TPLA < OrdSel).Select(t => new vTIPO_PLAZOS { COD_TPLA = t.COD_TPLA, NOM_PLA = t.NOM_PLA });
                return lst.ToList();
            }
        }


        public IList<EP_CARGO> GetCargos(string Vig)
        {
            using (ctx = new Entities())
            {
                var lst = ctx.EP_CARGO.Where(t => t.EST_CARGO == "AC" && t.VIG_CARGO == Vig);
                return lst.ToList();
            }
        }

        public IList<vEP_CARGO> GetvEP_CARGO(string Vig)
        {
            using (ctx = new Entities())
            {
                var lst = ctx.EP_CARGO.Where(t => t.EST_CARGO == "AC" && t.VIG_CARGO == Vig).Select(t => new vEP_CARGO { COD_CARGO = t.COD_CARGO, DES_CARGO = t.DES_CARGO });
                return lst.ToList();
            }
        }

        public IList<vProyectos> GetProyectos(string filtro)
        {
            using (ctx = new Entities())
            {
                //var lst = ctx.PROYECTOS.Where(t => t.PROYECTO.Contains(filtro) || t.NOMBRE_PROYECTO.Contains(filtro));
                var lst = (from t in ctx.PROYECTOS
                           where (t.PROYECTO.Contains(filtro) || t.NOMBRE_PROYECTO.Contains(filtro))
                           select (new vProyectos { Nro_Proyecto = t.PROYECTO, Nombre_Proyecto = t.NOMBRE_PROYECTO }));
                return lst.ToList();
            }
        }


        public IList<vEP_POLIZAS> GetEP_POLIZAS(int iID_EP)
        {
            using (ctx = new Entities())
            {
                //var lst = ctx.PROYECTOS.Where(t => t.PROYECTO.Contains(filtro) || t.NOMBRE_PROYECTO.Contains(filtro));
                var lst = (from t in ctx.EP_POLIZAS
                           where (t.ID_EP == iID_EP)
                           select (new vEP_POLIZAS
                           {
                               ID = t.ID,
                               COD_POL = t.COD_POL,
                               ID_EP = t.ID_EP,
                               POR_SMMLV = t.POR_SMMLV,
                               CAL_APARTIRDE = t.CAL_APARTIRDE,
                               VIGENCIA = t.VIGENCIA,
                               APARTIRDE = t.APARTIRDE,
                               TIPO = t.TIPO,
                               GRUPO = t.GRUPO,
                               NOM_POL = t.POLIZAS.NOM_POL.ToUpper(),
                               NOM_CALPOL = t.CALCULOPOL.DESCRIPCION,
                               NOM_CALVIGPOL = t.CAL_VIG_POL.DESCRIPCION
                           }));
                return lst.ToList();
            }
        }
        public IList<vPOLIZAS> GetPOLIZAS()
        {
            using (ctx = new Entities())
            {
                var lst = (from t in ctx.POLIZAS
                           where t.EST_POL == "AC"
                           select (new vPOLIZAS { COD_POL = t.COD_POL, NOM_POL = t.NOM_POL.ToUpper() }));
                return lst.ToList();
            }
        }

        public IList<vCALCULOPOL> GetCALCULOPOL()
        {
            using (ctx = new Entities())
            {
                var lst = (from t in ctx.CALCULOPOL
                           select (new vCALCULOPOL { COD_CAL = t.COD_CAL, DESCRIPCION = t.DESCRIPCION }));
                return lst.ToList();
            }
        }

        public IList<vCAL_VIG_POL> GetCAL_VIG_POL()
        {

            using (ctx = new Entities())
            {
                var lst = (from t in ctx.CAL_VIG_POL
                           select (new vCAL_VIG_POL { COD_CAL = t.COD_CAL, DESCRIPCION = t.DESCRIPCION }));
                return lst.ToList();
            }
        }


        public IList<vEP_ESPTEC> GetEP_ESPTEC(int iID_EP)
        {
            using (ctx = new Entities())
            {
                //var lst = ctx.PROYECTOS.Where(t => t.PROYECTO.Contains(filtro) || t.NOMBRE_PROYECTO.Contains(filtro));
                var lst = (from t in ctx.EP_ESPTEC
                           where (t.ID_EP == iID_EP)
                           select (new vEP_ESPTEC
                           {
                               ID_EP = t.ID_EP,
                               DESC_ITEM = t.DESC_ITEM,
                               CANT_ITEM = t.CANT_ITEM,
                               UNI_ITEM = t.UNI_ITEM,
                               VAL_UNI_ITEM = t.VAL_UNI_ITEM,
                               PORC_IVA = t.PORC_IVA,
                               ID = t.ID,
                               GRUPO = t.GRUPO

                           }));
                return lst.ToList();
            }
        }

        public IList<vTerceros> GetTerceros(string filtro)
        {
            using (ctx = new Entities())
            {
                var lst = (from t in ctx.TERCEROS
                           where t.ESTADO == "AC" && t.IDE_TER.Contains(filtro) || (t.APE1_TER.Trim() + " " + t.APE2_TER.Trim() + " " + t.NOM1_TER.Trim() + " " + t.NOM2_TER.Trim()).ToUpper().Contains(filtro.ToUpper())

                           select (new vTerceros
                           {
                               IDE_TER = t.IDE_TER,
                               APE1_TER = t.APE1_TER,
                               APE2_TER = t.APE2_TER,
                               NOM1_TER = t.NOM1_TER,
                               NOM2_TER = t.NOM2_TER
                           }));
                return lst.ToList();
            }
        }

     

        public IList<vEP_Proyectos> GetEP_Proyectos(decimal id)
        {
            using (ctx = new Entities())
            {
                var lst = from t in ctx.EP_PROYECTOS
                          where t.ID_EP == id
                          orderby t.COD_PRO
                          select (new vEP_Proyectos { COD_PRO = t.COD_PRO, NOMBRE_PROYECTO = t.PROYECTOS.NOMBRE_PROYECTO, ID_EP = t.ID_EP });
                return lst.ToList();
            }
        }

        public IList<vDEPENDENCIA> GetvDEPENDENCIA(string ide_ter)
        {
            using (ctx = new Entities())
            {
                var lst = ctx.HDEP_ABOGADOS.
                    Where(t => t.IDE_TER == ide_ter).
                    Select(t => t.DEPENDENCIA).
                    Where(t => t.ESTADO == "AC" && t.COD_DEP != "00").
                    Select(t => new vDEPENDENCIA { COD_DEP = t.COD_DEP, NOM_DEP = t.NOM_DEP }).OrderBy(t => t.NOM_DEP);

                return lst.ToList();
            }
        }

        public IList<vDEPENDENCIA> GetvDEPENDENCIAD()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.DEPENDENCIA.Where(t => t.ESTADO == "AC" && t.COD_DEP != "00" && t.DEP_DEL == "S").
                    Select(t => new vDEPENDENCIA { COD_DEP = t.COD_DEP, NOM_DEP = t.NOM_DEP }).OrderBy(t => t.NOM_DEP);

                return lst.ToList();
            }
        }

        public IList<vDEPENDENCIA> GetvDEPENDENCIA()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.DEPENDENCIA.Where(t => t.ESTADO == "AC" && t.COD_DEP != "00").
                    Select(t => new vDEPENDENCIA { COD_DEP = t.COD_DEP, NOM_DEP = t.NOM_DEP }).OrderBy(t => t.NOM_DEP);

                return lst.ToList();
            }
        }


        public IList<vVIGENCIAS> GetvVIGENCIAS()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.VIGENCIAS.Select(t => new vVIGENCIAS { YEAR_VIG = t.YEAR_VIG }).OrderByDescending(t => t.YEAR_VIG);
                return lst.ToList();
            }
        }

        public List<short> getVigencias()
        {
            List<short> lt;
            using (ctx = new Entities())
            {
                lt = ctx.VIGENCIAS.OrderByDescending(t => t.YEAR_VIG).
                    Select(t => t.YEAR_VIG).ToList();
                return lt;
            }
        }

        public vTerceros GetTercerosPk(string ide_ter)
        {
            using (ctx = new Entities())
            {
                vTerceros ter = (from t in ctx.TERCEROS
                                 where t.IDE_TER.Equals(ide_ter)
                                 select (new vTerceros
                                 {
                                     IDE_TER = t.IDE_TER,
                                     APE1_TER = t.APE1_TER,
                                     APE2_TER = t.APE2_TER,
                                     NOM1_TER = t.NOM1_TER,
                                     NOM2_TER = t.NOM2_TER,
                                     NOMBRE = (t.NOM1_TER == null ? "" : t.NOM1_TER.Trim()) + " " + (t.NOM2_TER == null ? "" : t.NOM2_TER.Trim()) + " " + t.APE1_TER.Trim() + " " + (t.APE2_TER == null ? "" : t.APE2_TER.Trim()).Trim(),
                                     APNOMBRE = (t.APE1_TER.Trim() + " " + (t.APE2_TER == null ? "" : t.APE2_TER.Trim()) + " " + (t.NOM1_TER == null ? "" : t.NOM1_TER.Trim()) + " " + (t.NOM2_TER == null ? "" : t.NOM2_TER.Trim())).Trim()
                                 })).FirstOrDefault();
                return ter;
            }
        }

        public IList<vTerceros> GetTerceros()
        {
            using (ctx = new Entities())
            {
                var lst = (from t in ctx.TERCEROS
                           where t.ESTADO == "AC"
                           select (new vTerceros
                           {
                               IDE_TER = t.IDE_TER,
                               APE1_TER = t.APE1_TER,
                               APE2_TER = t.APE2_TER,
                               NOM1_TER = t.NOM1_TER,
                               NOM2_TER = t.NOM2_TER,
                               NOMBRE = (t.NOM1_TER == null ? "" : t.NOM1_TER.Trim()) + " " + (t.NOM2_TER == null ? "" : t.NOM2_TER.Trim()) + " " + t.APE1_TER.Trim() + " " + (t.APE2_TER == null ? "" : t.APE2_TER.Trim()).Trim(),
                               APNOMBRE = (t.APE1_TER.Trim() + " " + (t.APE2_TER == null ? "" : t.APE2_TER.Trim()) + " " + (t.NOM1_TER == null ? "" : t.NOM1_TER.Trim()) + " " + (t.NOM2_TER == null ? "" : t.NOM2_TER.Trim())).Trim(),
                               TIP_PER = t.TIP_PER
                           }));
                return lst.ToList();
            }
        }

        public IList<vTerceros> GetFuncionarios(string cod_dep)
        {
            using (ctx = new Entities())
            {
                var lst = ctx.HDEP_ABOGADOS.
                    Where(f => f.COD_DEP == cod_dep && f.ESTADO == "AC" && f.ASIG_PROC == "SI").
                    Select(
                    t => new vTerceros
                    {
                        IDE_TER = t.IDE_TER,
                        APE1_TER = t.TERCEROS.APE1_TER,
                        APE2_TER = t.TERCEROS.APE2_TER,
                        NOM1_TER = t.TERCEROS.NOM1_TER,
                        NOM2_TER = t.TERCEROS.NOM2_TER,
                        NOMBRE = (t.TERCEROS.NOM1_TER == null ? "" : t.TERCEROS.NOM1_TER.Trim()) + " " + (t.TERCEROS.NOM2_TER == null ? "" : t.TERCEROS.NOM2_TER.Trim()) + " " + t.TERCEROS.APE1_TER.Trim() + " " + (t.TERCEROS.APE2_TER == null ? "" : t.TERCEROS.APE2_TER.Trim()).Trim(),
                        APNOMBRE = (t.TERCEROS.APE1_TER.Trim() + " " + (t.TERCEROS.APE2_TER == null ? "" : t.TERCEROS.APE2_TER.Trim()) + " " + (t.TERCEROS.NOM1_TER == null ? "" : t.TERCEROS.NOM1_TER.Trim()) + " " + (t.TERCEROS.NOM2_TER == null ? "" : t.TERCEROS.NOM2_TER.Trim())).Trim()
                    }
                    );
                return lst.OrderBy(t => t.NOMBRE).ToList();
            }
        }

        #endregion
    }
}
