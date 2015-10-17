using BLL.Procesos.Gestion;
using ByA;
using Entidades.VistasProcDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Procesos
{
   public class PActividadesBLL
    {
     
       mPActividades manager = new mPActividades();
       public ByARpt Insert(vPActividades_DTO Reg)
        {
            return manager.Insert(Reg);
        }
       public ByARpt Update(vPActividades_DTO Reg)
        {
            return manager.Update(Reg);
        }
       public List<vPActividades_DTO> _GetFilterActividades(string VIG, string TPRO)
       {
           return manager._GetFilterActividades(VIG,TPRO);
       }
    }
}
