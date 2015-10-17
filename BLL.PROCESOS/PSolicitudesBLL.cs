using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;
using BLL.PROCESOS.Gestion;
using Entidades;
using AutoMapper;
using Entidades.VistasPROC;


namespace BLL.PROCESOS
{
    public class PSolicitudesBLL : absBLL
    {
        public vPSolicitudes ep { get; set; }
        mPSOLICITUDES manager = new mPSOLICITUDES();

        #region DELEGACION
        public ByARpt Insert(vPSolicitudes Reg)
        {
            return manager.Insert(Reg);
        }
        public ByARpt Update(vPSolicitudes Reg)
        {
            return manager.Update(Reg);
        }
        public ByARpt AsignarFuncionario(vHRevisado Reg)
        {
            mHREVISADO manager = new mHREVISADO();
            HREVISADO hr = new HREVISADO();
            //Mapear Objeto DTO a Ado Entity FrameWork
            Mapper.CreateMap<vHRevisado, HREVISADO>();
            Mapper.Map(Reg, hr);
            //manager.reg = aeReg;
            return manager.Asignar(hr);
            //return EnviaDatos.EnviarInsert(manager);
        }

        #endregion


        public vPSolicitudes GetPK(string Cod_Sol)
        {
            return manager.GetPK(Cod_Sol);
        }

        public List<vPSolicitudes> getSolicitudes(string Dep_PSol, short Vig_Sol)
        {
            return manager.GetSolicitudes(Dep_PSol, Vig_Sol);
        }


        #region MISSOLICITUDES

        public string GetProximoNumxMod(string Cod_Sol)
        {
            mHREVISADO manager = new mHREVISADO();
            return manager.GetProximoNumxMod(Cod_Sol);
        }
        public List<vPSolicitudes> GetMisSolicitudes(string UserName, string Estado)
        {
            return manager.GetMisSolicitudes(UserName, Estado);
        }
        public List<vPSolicitudes> GetMisSolicitudes(string UserName, string Estado, short Vigencia)
        {
            return manager.GetMisSolicitudesxEst(UserName, Estado, Vigencia);
        }
        public List<vPSolicitudes> GetMisSolicitudesxEstxDD(string UserName, string Estado, short Vigencia, string Dep_Del)
        {
            return manager.GetMisSolicitudesxEstxDD(UserName, Estado, Vigencia, Dep_Del);
        }
        public ByARpt Recibir(decimal ide_hrev, string obs)
        {
            mHREVISADO manager = new mHREVISADO();

            return manager.Recibir(ide_hrev, obs);
        }
        public ByARpt Revisar(vHRevisado hr)
        {
            mHREVISADO manager = new mHREVISADO();
            return manager.Revisar(hr);
        }
        #endregion

                
        public List<vPESTADOS> getSolxEstados(string DepDel, short Vigencia)
        {
            List<vPESTADOS> lt = new List<vPESTADOS>();
            using (ctx = new Entities())
            {

                int porRecibir;
                int Pendiente;
                int Aceptadas;
                int Rechazadas;
                int porAsignar;

                if (DepDel == "")
                {
                    porAsignar = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == null).Count();
                    porRecibir = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.RECIBIDO_ABOG == "N").Count();
                    Pendiente = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "P").Count();
                    Aceptadas = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.CONCEPTO_REVISADO == "A").Count();
                    Rechazadas = ctx.PSOLICITUDES.Where(t => t.VIG_SOL == Vigencia && t.HREVISADO1.CONCEPTO_REVISADO == "R").Count();
                }
                else
                {
                    porAsignar = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.ID_ABOG_ENC == null).Count();
                    porRecibir = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.HREVISADO1.RECIBIDO_ABOG == "N").Count();
                    Pendiente = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.HREVISADO1.RECIBIDO_ABOG == "S" && t.HREVISADO1.CONCEPTO_REVISADO == "P").Count();
                    Aceptadas = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.HREVISADO1.CONCEPTO_REVISADO == "A").Count();
                    Rechazadas = ctx.PSOLICITUDES.Where(t => t.DEP_PSOL == DepDel && t.VIG_SOL == Vigencia && t.HREVISADO1.CONCEPTO_REVISADO == "R").Count();
                }
                var Total = porRecibir + Pendiente + Aceptadas + Rechazadas+porAsignar;

                lt.Add(new vPESTADOS { COD_EST = "SASI", NOM_EST = "Por Asignar", COLOR = "progress-bar progress-bar-danger", CANT = porAsignar, PORC = (Total > 0 ? (decimal)porAsignar / Total : 0) });
                lt.Add(new vPESTADOS { COD_EST = "SREC", NOM_EST = "Por Recibir", COLOR = "progress-bar progress-bar-danger", CANT = porRecibir, PORC = (Total > 0 ? (decimal)porRecibir / Total : 0) });
                lt.Add(new vPESTADOS { COD_EST = "SREV", NOM_EST = "Pendientes", COLOR = "progress-bar progress-bar-pink", CANT = Pendiente, PORC = (Total > 0 ? (decimal)Pendiente / Total : 0) });
                lt.Add(new vPESTADOS { COD_EST = "ACEP", NOM_EST = "Aceptadas", COLOR = "progress-bar progress-bar-success", CANT = Aceptadas, PORC = (Total > 0 ? (decimal)Aceptadas / Total : 0) });
                lt.Add(new vPESTADOS { COD_EST = "RECH", NOM_EST = "Rechazadas", COLOR = "progress-bar progress-bar-inverse", CANT = Rechazadas, PORC = (Total > 0 ? (decimal)Rechazadas / Total : 0) });

                return lt;

            }
        }



        public IList<vPSolicitudes> GetSolicitudesxEstxDD(string Estado, short Vigencia, string Dep_Del)
        {
            return manager.GetSolicitudesxEstxDD(Estado, Vigencia, Dep_Del);
        
        }

    }
}

