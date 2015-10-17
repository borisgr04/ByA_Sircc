using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using BLL.PROCESOS;
using Entidades;
using Entidades.VistasPROC;

namespace wfSircc.ContratosB
{
    public partial class MinutaTest : System.Web.UI.Page
    {
        vESTPREV Reg;
        protected void Page_Load(object sender, EventArgs e)
        {
            PMinutas pm = new PMinutas();
            
            EstudiosPreviosBL epBLL = new EstudiosPreviosBL();
            ESTPREV ep = new ESTPREV();
            ep.ID = 1;
            epBLL.ep = ep;
            Reg = epBLL.GetPK("EL");

            this.Title = String.Format("CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES No. CELEBRADO ENTRE EL DEPARTAMENTO DEL CESAR Y YENNY YOHANA ALCOCER PLAZA.");
            //Response.Write(Reg.OBJE_EP);

            List<vPCLAUSULASPRINT> lst = pm.GetPClausulasP(1);
            string print="";
            foreach (vPCLAUSULASPRINT i in lst)
            {
                print += i.TEXTO;
            }
            Literal1.Text = print;
            //GetClausulas
        }

        private string printClausula(vPCLAUSULASPRINT c)
        {
            //c.CLA_TEXTO = c.CLA_TEXTO.Replace("{1}", Reg.OBJE_EP);
            return String.Format("<b>CLAUSULA {0}.-{1}:</b>{2}", c.CLA_NUM, c.CLA_TIT, c.CLA_TEXTO);
        }
    }
}