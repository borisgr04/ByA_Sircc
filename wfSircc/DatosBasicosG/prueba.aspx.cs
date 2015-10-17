using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace wfSircc.DatosBasicosG
{
    public partial class prueba : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            dto p= new dto();
            p.x= FileUpload1.FileBytes;


        }
        class dto {
            public byte[] x { get; set; }
            public string nombre { get; set; }
        }
    }

}