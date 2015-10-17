using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL.Contratos;

namespace wfSircc.ContratosB.Reportes
{
    public partial class RptF12 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            ReporteF12 obj = new ReporteF12();
            GridView1.DataSource = obj.GetRptF12(2011);
            GridView1.DataBind();
        }
    }
}