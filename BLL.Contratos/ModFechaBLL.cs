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
    public class ModFechaBLL

    {
        mContratos Cmanager = new mContratos();
     
        public ByARpt UpdateModFecha(vCONTRATOS Reg)
        {
            return Cmanager.UpdateModFecha(Reg);
        }
        public RangoFecha GetModFecha_Contrato(string Cod_Con)
        {

            return Cmanager.GetModFecha_Contrato(Cod_Con);

        }     
    }
}
