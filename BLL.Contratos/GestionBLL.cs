using BLL.Contratos.Gestion;
using ByA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Contratos
{
    public class GestionBLL
    {
        mEstContratos EstManager = new mEstContratos();
        public ByARpt InsertGestion(Entidades.Contratos.vEstContratos Reg)
        {
            return EstManager.InsertGestion(Reg);
        }

        public ByARpt AnularGestion(Entidades.Contratos.vEstContratos Reg)
        {
            return EstManager.AnularGestion(Reg);
        }
    }
}
