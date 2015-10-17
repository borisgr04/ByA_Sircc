using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Entidades;

namespace BLL.CGestion.Filtros
{
    public interface FiltrosContratos
    {
        List<vContratosInt> GetContratos(vContratosIntFiltro cFil);
    }
    public class vContratosInt
    {
        public string Numero { get; set; }
        public string Tipo { get; set; }
        public string Objeto { get; set; }
        public string Ide_Contratista { get; set; }
        public string Contratista { get; set; }
        public decimal Valor_Contrato { get; set; }
        public DateTime Fecha_Suscripcion { get; set; }
        public string Estado { get; set; }
        public string DependenciaNec { get; set; }
        public string DependenciaDel { get; set; }
        public string Ide_Interventor { get; set; }
        public string Nom_Interventor { get; set; }
        public short Vigencia { get; set; }
        public string Dep_Nec { get; set; }
        public string Dep_Del { get; set; }
        public string Cod_Tip { get; set; }
        public string Cod_STip { get; set; }
        
        public string NroProceso { get; set; }
        public string Nom_Modalidad{ get; set; }
        
        public string Ide_RepLegal { get; set; }
        public string Nom_RepLegal { get; set; }

        public string Cod_Act { get; set; }

        public string Ide_Supervisor { get; set; }
        public string Nom_Supervisor { get; set; }


        public decimal ValorPagar { get; set; }
        public decimal ValorPagado { get; set; }
        public decimal ValorSaldo { get; set; }
    }

    
    public class vContratosIntFiltro : vContratosInt
    {
        public bool FilxFS { get; set; }
        public DateTime FS_Inicial { get; set; }
        public DateTime FS_Final { get; set; }
    }
}
