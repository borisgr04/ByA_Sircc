using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
   public partial class GD_DOCUMENTOSDTO
   {
       public decimal ID { get; set; }
       public string NOMBRE { get; set; }
       public Nullable<decimal> LONGITUD { get; set; }
       public string TYPE { get; set; }
       public string URL { get; set; }
       public string DESCRIPCION { get; set; }
       public string USUARIO { get; set; }
       public Nullable<System.DateTime> FEC_REG { get; set; }
       public Nullable<System.DateTime> FEC_MOD { get; set; }
       public string ESTADO { get; set; }
       public byte[] DOCUMENTO { get; set; }
   }

   public class vGD_DOC_ACTAS
   {
       public decimal ID { get; set; }
       public Nullable<decimal> ID_DOC { get; set; }
       public string COD_CON { get; set; }
       public Nullable<decimal> ID_INF { get; set; }
       public Nullable<System.DateTime> FEC_REG { get; set; }
       public string USAP { get; set; }
       public string EST_REL { get; set; }
       public string TIP_DOC { get; set; }
       public string NOMBRE { get; set; }
       public string ARCHIVO { get; set; }
       public Nullable<decimal> LONGITUD { get; set; }
       public string TYPE { get; set; }
       public string URL { get; set; }
   }
    
}
