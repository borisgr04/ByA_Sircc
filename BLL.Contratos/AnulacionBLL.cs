using BLL.Contratos.Gestion;
using ByA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Contratos
{
    public class AnulacionBLL
    {

        mEstContratos EstManager = new mEstContratos();
        public ByARpt InsertAnular(Entidades.Contratos.vEstContratos Reg)
        {
            return EstManager.InsertAnular(Reg);
        }
    }
}
