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
    public class CesionesBLL
    {
        mCesiones CeManager = new mCesiones();
        public ByARpt Insert(vCesiones Reg)
        {
            return CeManager.Insert(Reg);
        }
        public ByARpt Delete(vCesiones Reg)
        {
            return CeManager.Delete(Reg);
        }
        public List<vCesiones> GetCesiones(string Cod_Con)
        {
            return CeManager.GetCesiones(Cod_Con);

        }
    }
}
