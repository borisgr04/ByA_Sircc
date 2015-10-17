using BLL.Contratos.Gestion;
using ByA;
using Entidades.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Contratos
{
    public class LegalizacionBLL
    {
        mRP_Contratos Rpmanager = new mRP_Contratos();
        mContratos Cmanager = new mContratos();
        mAdiciones Amanager = new mAdiciones();     
        mAseguradoras AseguradorasManager = new mAseguradoras();
        mPolizas_Contrato PoliConManager = new mPolizas_Contrato();
        mImpuestos ImpuManager = new mImpuestos();
        mImp_Contratos ImpManager = new mImp_Contratos();
        mInterventores_Contrato IntManager = new mInterventores_Contrato();
        mTipo_Adiciones TipManager = new mTipo_Adiciones();
        //Funciones Post
        #region RP
        public ByARpt InsertRp(vRP_CONTRATOS Reg)
        {

            return Rpmanager.Insert(Reg);
        }
        public ByARpt UpdateRp(vRP_CONTRATOS Reg)
        {
            return Rpmanager.Update(Reg);
        }
        public ByARpt DeleteRp(vRP_CONTRATOS Reg)
        {
            return Rpmanager.Delete(Reg);
        }
        #endregion
        #region Polizas_Contrato
        public ByARpt InsertPoliCon(vPolizas_Contrato Reg)
        {

            return PoliConManager.Insert(Reg);
        }
        public ByARpt UpdatePoliCon(vPolizas_Contrato Reg)
        {
            return PoliConManager.Update(Reg);
        }
        public ByARpt DeletePoliCon(vPolizas_Contrato Reg)
        {
            return PoliConManager.Delete(Reg);
        }
        #endregion
        #region Impuestos
        public ByARpt InsertImp_Contratos(vImp_Contratos Reg)
        {

            return ImpManager.Insert(Reg);
        }
        public ByARpt UpdateImp_Contratos(vImp_Contratos Reg)
        {
            return ImpManager.Update(Reg);
        }
        public ByARpt DeleteImp_Contratos(vImp_Contratos Reg)
        {
            return ImpManager.Delete(Reg);
        }
        #endregion
        #region Exoneracion
        public ByARpt UpdateExo(vCONTRATOS Reg)
        {
           return  Cmanager.Update(Reg);
        }

        #endregion
        #region Interventoria
        public ByARpt InsertInterventoria(vInterventores_Contrato Reg)
        {

            return IntManager.Insert(Reg);
        }
        public ByARpt UpdateInterventoria(vInterventores_Contrato Reg)
        {
            return IntManager.Update(Reg);
        }
        public ByARpt DeleteInterventoria(vInterventores_Contrato Reg)
        {
            return IntManager.Delete(Reg);
        }
        #endregion
        #region Confirmacion
        public ByARpt UpdateConf_C(vCONTRATOS Reg)
        {
            return Cmanager.UpdateConf(Reg);
        }
        public ByARpt UpdateConf_A(vAdiciones Reg)
        {
            return Amanager.Update(Reg);
        }
        #endregion
        //Funciones Get
        public List<vRP_CONTRATOS> GetRPContratos(string Cod_Con)
        {
           return Rpmanager.GetRPContratos(Cod_Con);
        }
        public List<vCONTRATOS> GetContrato(string Cod_Con)
        {
           return  Cmanager.GetContrato(Cod_Con);

        }
        public List<vAdiciones> GetAdiciones(string Cod_Con)
        {
            return Amanager.GetAdiciones(Cod_Con);

        }
        public List<vImpuestos> GetImpuesto()
        {
            return ImpuManager.GetImpuesto();

        }
        public List<vAseguradoras> GetAseguradoras()
        {
            return AseguradorasManager.GetAseguradoras();

        }
        public List<vPolizas_Contrato> GetPolizas_Contrato(string Cod_Con)
        {
            return PoliConManager.GetPolizas_Contrato(Cod_Con);

        }
        public List<vImp_Contratos> GetImp_Contratos(string Cod_Con)
        {
            return ImpManager.GetImp_Contratos(Cod_Con);

        }
        public List<vInterventores_Contrato> GetInterventoria_Contrato(string Cod_Con)
        {
            return IntManager.GetInterventores_Contrato(Cod_Con);

        }
    }
}
