using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL.CGestion.Actas;
using Microsoft.Reporting.WebForms;

namespace wfSircc.ContratosGestion
{
    public partial class Prueba : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
           
        }
        public void mostrar(){
         CGActaParcial oGenerador = new CGActaParcial();
            oGenerador.IdDocumento = "4022";
            ReportDataSource rds = new ReportDataSource();
            rds.Name = "datosActa";
            
            rds.Value = oGenerador.GetActa();
            rv.LocalReport.DataSources.Clear();
            rv.LocalReport.DataSources.Add(rds);
            rv.LocalReport.Refresh();
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            mostrar();
        }
    }
}