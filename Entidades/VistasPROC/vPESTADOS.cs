using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.VistasPROC
{
    public class vPESTADOS
    {
            public string COD_EST { get; set; }
            public string NOM_EST { get; set; }
            public string IMAGEN { get; set; }
            public string COLOR { get; set; }
            public string FINAL { get; set; }

            public Nullable<decimal> ORDEN { get; set; }
            public Nullable<int> CANT { get; set; }
            public decimal  PORC { get; set; }
        
    }
}
