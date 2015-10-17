using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BLL.Solicitudes.Vistas;
using ByA;
using BLL.Solicitudes.Gestion;
using Entidades;
using AutoMapper;

namespace BLL.Solicitudes
{
    public class PSolicitudesBLL : absBLL
    {
        public vPSolicitudes ep { get; set; }
        mPSOLICITUDES manager = new mPSOLICITUDES();

        #region PSolicitudes
        public ByARpt Insert(vPSolicitudes Reg)
        {
            PSOLICITUDES RegD = new PSOLICITUDES();
            
            Mapper.CreateMap<vPSolicitudes, PSOLICITUDES>();
            Mapper.Map(Reg, RegD);
            manager.reg = RegD;
            return EnviaDatos.EnviarInsert(manager);
        }
        public ByARpt Update(vPSolicitudes Reg)
        {
            PSOLICITUDES RegD = new PSOLICITUDES();
            Mapper.CreateMap<vPSolicitudes, PSOLICITUDES>();
            Mapper.Map(Reg, RegD);
            manager.reg = RegD;
            return EnviaDatos.EnviarUpdate(manager);
        }
        //public ByARpt Delete(EP_ESPTEC reg)
        //{
        //    mEP_ESPTEC manager = new mEP_ESPTEC();
        //    manager.et = reg;
        //    return EnviaDatos.EnviarDelete(manager);
        //}
        #endregion

        public vPSolicitudes GetPK(string Cod_Sol)
        {
            manager.reg = new PSOLICITUDES { COD_SOL = Cod_Sol };
            return manager.GetPK();
        }

        public List<vPSolicitudes> getSolicitudes(string Dep_PSol, short Vig_Sol)
        {
            return manager.GetSolicitudes(Dep_PSol, Vig_Sol);
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

        #region MISSOLICITUDES
        public List<vPSolicitudes> GetMisSolicitudes(string UserName, string Estado)
        {
            return manager.GetMisSolicitudes(UserName,Estado);
        }
        public List<vPSolicitudes> GetMisSolicitudes(string UserName, string Estado,short Vigencia)
        {
            return manager.GetMisSolicitudesxEst(UserName, Estado, Vigencia);
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

      

        
    }
}
