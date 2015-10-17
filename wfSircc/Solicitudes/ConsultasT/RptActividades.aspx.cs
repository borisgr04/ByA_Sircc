using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace wfSircc.Solicitudes.ConsultasT
{
    public partial class RptActividades : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ObjectDataSource1_Selecting(object sender, ObjectDataSourceSelectingEventArgs e)
        {
            e.InputParameters["Vigencia"] = Convert.ToInt16(Request.Cookies["sircc_vig"].Value);
            //e.InputParameters["Dep_Del"] = CboDepDel.SelectedValue;
        }


    }
}