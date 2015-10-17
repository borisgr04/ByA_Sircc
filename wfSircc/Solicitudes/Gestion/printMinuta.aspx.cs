using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL.PROCESOS;
using Entidades.VistasPROC;

namespace wfSircc.Solicitudes.Gestion
{
    public partial class printMinuta : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            PMinutas pm = new PMinutas();


            this.Title = String.Format("CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES No. CELEBRADO ENTRE EL DEPARTAMENTO DEL CESAR Y YENNY YOHANA ALCOCER PLAZA.");
            //Response.Write(Reg.OBJE_EP);

            List<vPCLAUSULAS> lst = pm.GetPClausulas("0001");
            string print = "";
            foreach (vPCLAUSULAS i in lst)
            {
                print += i.TEXTO;
            }
            Literal1.Text = print;
         
        }
    }
}