using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.PROCESOS.Gestion;
using ByA;
using Entidades;
using Entidades.VistasPROC;
using Entidades.Consultas;


namespace BLL.PROCESOS
{
    public class ProcesosBLL
    {
        Entities ctx { get; set; }
        ByARpt byaRpt = new ByARpt();

        mPCRONOGRAMAS mCrono = new mPCRONOGRAMAS();
        mPCONTRATOS mProc =new mPCONTRATOS();
        
        #region CRONOGRAMA
        public ByARpt SegCronograma(List<vPCRONOGRAMAS> lst, string Num_Pro, string Usuario) {
            return mCrono.SegCronograma(lst, Num_Pro, Usuario);
        }
        public ByARpt CambiarEstadoCronograma(vPCRONOGRAMAS Reg)
        {
            return mCrono.CambiarEstadoCronograma(Reg);
        }
        public ByARpt UpdCronograma(List<vPCRONOGRAMAS> lst, string Num_Pro, string Usuario) {
            return mCrono.UpdCronograma(lst, Num_Pro, Usuario);
        }
        public ByARpt AplazarCronograma(List<vPCRONOGRAMAS> lst, string Num_Pro, string Usuario) {
            return mCrono.UpdAplazar(lst, Num_Pro, Usuario);
        }
        
        public List<vPCRONOGRAMAS> GetCronograma(string Num_Pro) { 
        return mCrono.GetCronograma(Num_Pro);
        }
        public List<vPCRONOGRAMAS> GetCronogramaS(string Num_Pro)
        {
            return mCrono.GetCronogramaS(Num_Pro);
        }
        public List<vPACTIVIDADES> GetActividadesNC(string Num_Pro) {
            return mCrono.GetActividadesNC(Num_Pro);
        }
        public List<vPACTIVIDADES> GetActividadesT(string Num_Pro) {
            return mCrono.GetActividadesT(Num_Pro);
        }
        public List<vPACTIVIDADES> GetActividadesC(string Num_Pro) {
            return mCrono.GetActividadesC(Num_Pro);
        }
        #endregion

        
        #region PROCESOS

        public vESTPREV GetEstPrevToProceso(string Num_Pro)
        {
            return mProc.GetEstPrevToProceso(Num_Pro);
        }

        public vPCONTRATOS GetProceso(string Num_Pro)
        {
            return mProc.GetProceso(Num_Pro);
        }

        public List<vPCONTRATOS> GetProcesosU(short Vigencia, string Usuario)
        {
            return mProc.GetProcesosU(Vigencia, Usuario);
        }

        public List<vPCONTRATOS> GetProcesosU(short Vigencia, string Usuario, string Dependencia,string Estado)
        {
            return mProc.GetProcesosU(Vigencia, Usuario, Dependencia, Estado);
        }

        public List<vPCONTRATOS> GetProcesosUFiltro(short Vigencia, string Usuario, string Dependencia, string Estado, string Filtro)
        {
            return mProc.GetProcesosUFiltro(Vigencia, Usuario, Dependencia, Estado, Filtro);
        }


        public List<vPCONTRATOS> GetProcesosD(short Vigencia, string Dep_Del)
        {
            return mProc.GetProcesosD(Vigencia, Dep_Del);
        }
        public List<vPCONTRATOS> GetProcesosS(short Vigencia, string Dep_Sol)
        {
            return mProc.GetProcesosS(Vigencia, Dep_Sol);
        }

        public List<vPCONTRATOS> Consultar(classFiltro Filtro)
        {
            return mProc.Consultar(Filtro);
        }

        
        public List<vPESTADOS> getSolxEstados(string DepDel, short Vigencia, string Username)
        {
            List<vPESTADOS> lt = new List<vPESTADOS>();
            using (ctx = new Entities())
            {

                int porRecibir;
                int Pendiente;
                int Aceptadas;
                int Rechazadas;

                if (DepDel == "")
                {
                    porRecibir = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == Username && t.HREVISADO1.RECIBIDO_ABOG == "N").Count();
                    Pendiente = ctx.PSOLICITUDES.Where (t => t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == Username && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "P").Count();
                    Aceptadas = ctx.PSOLICITUDES.Where (t => t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == Username && t.HREVISADO1.CONCEPTO_REVISADO == "A").Count();
                    Rechazadas = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == Username && t.HREVISADO1.CONCEPTO_REVISADO == "R").Count();
                }
                else {
                    porRecibir = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == Username && t.HREVISADO1.RECIBIDO_ABOG == "N").Count();
                    Pendiente = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == Username && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "P").Count();
                    Aceptadas = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == Username && t.HREVISADO1.CONCEPTO_REVISADO == "A").Count();
                    Rechazadas = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == Username && t.HREVISADO1.CONCEPTO_REVISADO == "R").Count();
                }
                var Total = porRecibir + Pendiente + Aceptadas + Rechazadas;
                //Resumen
                if (Total > 0)
                {
                    lt.Add(new vPESTADOS { COD_EST = "SREC", NOM_EST = "Por Recibir", COLOR = "progress-bar progress-bar-danger", CANT = porRecibir, PORC = (decimal)porRecibir / Total });
                    lt.Add(new vPESTADOS { COD_EST = "SREV", NOM_EST = "Pendientes", COLOR = "progress-bar progress-bar-pink", CANT = Pendiente, PORC = (decimal)Pendiente / Total });
                    lt.Add(new vPESTADOS { COD_EST = "ACEP", NOM_EST = "Aceptadas", COLOR = "progress-bar progress-bar-success", CANT = Aceptadas, PORC = (decimal)Aceptadas / Total });
                    lt.Add(new vPESTADOS { COD_EST = "RECH", NOM_EST = "Rechazadas", COLOR = "progress-bar progress-bar-inverse", CANT = Rechazadas, PORC = (decimal)Rechazadas / Total });
                    return lt;
                }
                else
                {
                    lt.Add(new vPESTADOS { COD_EST = "SREC", NOM_EST = "Por Recibir", COLOR = "progress-bar progress-bar-danger", CANT = porRecibir, PORC = (decimal)0 });
                    lt.Add(new vPESTADOS { COD_EST = "SREV", NOM_EST = "Pendientes", COLOR = "progress-bar progress-bar-pink", CANT = Pendiente, PORC = (decimal)0 });
                    lt.Add(new vPESTADOS { COD_EST = "ACEP", NOM_EST = "Aceptadas", COLOR = "progress-bar progress-bar-success", CANT = Aceptadas, PORC = (decimal)0 });
                    lt.Add(new vPESTADOS { COD_EST = "RECH", NOM_EST = "Rechazadas", COLOR = "progress-bar progress-bar-inverse", CANT = Rechazadas, PORC = (decimal)0 });
                    return lt;
                }
            }
        }

        public List<vPESTADOS> getxEstados(string DepDel, short Vigencia, string UserName)
        {

            List<vPESTADOS> lt;
            using (ctx = new Entities())
            {
                if (DepDel != "")
                {
                    lt = ctx.PESTADOS.
                        Where(t => t.COD_EST != "00").
                        Select(t => new vPESTADOS
                        {
                            COD_EST = t.COD_EST,
                            COLOR = t.COLOR,
                            NOM_EST = t.NOM_EST,
                            ORDEN = t.ORDEN,
                            CANT = t.PCONTRATOS.Where(p => p.DEP_PCON == DepDel && p.VIG_CON == Vigencia && p.USUENCARGADO == UserName).Count()
                        }).OrderBy(t => t.ORDEN).ToList();
                }
                else {
                    lt = ctx.PESTADOS.
                            Where(t => t.COD_EST != "00").
                            Select(t => new vPESTADOS
                            {
                                COD_EST = t.COD_EST,
                                COLOR = t.COLOR,
                                NOM_EST = t.NOM_EST,
                                ORDEN = t.ORDEN,
                                CANT = t.PCONTRATOS.Where(p =>  p.VIG_CON == Vigencia && p.USUENCARGADO == UserName).Count()
                            }).OrderBy(t => t.ORDEN).ToList();
                    
                }

                int Total =(int)lt.Sum(t => t.CANT);
                if (Total > 0)
                {
                    foreach (var item in lt)
                    {
                        item.PORC = (decimal)item.CANT / Total;
                    }
                }
                lt.Add(new vPESTADOS {  CANT=Total, NOM_EST="Todos", COD_EST="00" });
                return lt;
            }
        }

        //Carlos Tirado 29/09/2015
        public List<vPROC_MOD> GetCantidadProcesosPorModalidad(short Vigencia, string Usuario)
        {
            return mProc.GetCantidadProcesosPorModalidad(Vigencia, Usuario);
        }
        public List<vPCONTRATOS> GetProcesosUsuario(short Vigencia, string Usuario, string Modalidad, string Filtro)
        {
            return mProc.GetProcesosUsuario(Vigencia, Usuario, Modalidad, Filtro);
        }
        #endregion
    }
    
}
