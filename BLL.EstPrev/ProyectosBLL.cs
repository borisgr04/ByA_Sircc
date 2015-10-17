using BLL.EstPrev.Gestion;
using ByA;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.EstPrev
{
    public class ProyectosBLL
    {
        mProyectos Pmanager = new mProyectos();

        public ByARpt Insert(vPROYECTOS Reg)
        {
            return Pmanager.Insert(Reg);
        }
        public ByARpt Delete(vPROYECTOS Reg)
        {
            return Pmanager.Delete(Reg);
        }
        public ByARpt Update(vPROYECTOS Reg)
        {
            return Pmanager.Update(Reg);
        }
        public List<vPROYECTOS> GetProyectoss(string Vigencia)
        {
            return Pmanager.GetProyectoss(Vigencia);

        }
        public vPROYECTOS GetProyectos(string idProyecto)
        {
            return Pmanager.GetProyectos(idProyecto);

        }
    }
}
