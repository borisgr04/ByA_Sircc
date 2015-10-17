using BLL.Procesos.Gestion;
using Entidades.VistasProcDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Procesos
{
   public  class PEstadosBLL
   {
       mPEstados manager = new mPEstados();
       public List<vPEstados_DTO> _GetEstados()
       {
           return manager._GetEstados();
       }
    }
}
