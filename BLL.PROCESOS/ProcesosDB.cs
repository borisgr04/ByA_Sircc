using ByA;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades.VistasPROC;
namespace BLL.PROCESOS
{
    public class ProcesosDB
    {   
        
        Entities ctx { get; set; }
        ByARpt byaRpt = new ByARpt();
        
        public List<vHoras> GetHoras()
        {
            List<vHoras> lt = new List<vHoras>();
            using (ctx = new Entities())
            {
                var q= ctx.HORAS.ToList();
                AutoMapper.Mapper.CreateMap<HORAS,vHoras>();
                AutoMapper.Mapper.Map(q,lt);
                return lt;
            }
        }
    }
}
