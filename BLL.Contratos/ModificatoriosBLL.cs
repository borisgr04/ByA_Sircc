using BLL.Contratos.Gestion;
using ByA;
using Entidades.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Contratos
{
    public class ModificatoriosBLL
    {
        mTipo_Adiciones TipManager = new mTipo_Adiciones();
        mAdiciones AdiManager = new mAdiciones();
        #region Adiciones
        public ByARpt Insert(vAdiciones Reg)
        {
            return AdiManager.Insert(Reg);
        }
        public ByARpt Delete(vAdiciones Reg)
        {
           return AdiManager.Delete(Reg);
        
        }   
        #endregion
        public List<vAdiciones> GetModificatorios(string Cod_Con)
        {
            return AdiManager.GetModificatorios(Cod_Con);

        }
        public List<vTipo_Adiciones> GetTip_Adiciones()
        {
            return TipManager.GetTip_Adiciones();

        }
    }
}
