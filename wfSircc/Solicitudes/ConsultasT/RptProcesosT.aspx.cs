using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using BLL.PROCESOS;

namespace wfSircc.Solicitudes.ConsultasT
{
    public partial class RptProcesosT : System.Web.UI.Page
    {
        DatosBasicosBLL o = new DatosBasicosBLL();

        protected void Page_Load(object sender, EventArgs e)
        {


            ActualizarDependencias();

            ActualizarFuncionarios();
        }

        private void ActualizarDependencias()
        {
            CboDepDel.DataValueField = "COD_DEP";
            CboDepDel.DataTextField = "NOM_DEP";
            CboDepDel.DataSource = o.GetvDEPENDENCIAD();
            CboDepDel.SelectedValue = "06";
            CboDepDel.DataBind();
        }

        private void ActualizarFuncionarios()
        {

            CboEncargados.DataSource = o.GetFuncionarios(CboDepDel.SelectedValue);
            CboEncargados.DataValueField = "IDE_TER";
            CboEncargados.DataTextField = "NOMBRE";
            CboEncargados.DataBind();
        }

        protected void BtnGenerarRpt_Click(object sender, EventArgs e)
        {
            if (cboTipRpt.SelectedValue != "SA")
            {
                this.ReportViewer1.LocalReport.ReportPath = "Solicitudes\\ConsultasT\\RptProcesosT.rdlc"; //agrupado
            }
            else
            {
                this.ReportViewer1.LocalReport.ReportPath = "Solicitudes\\ConsultasT\\RptProcesos.rdlc";//sin agrupar
            }
            ObjProcesosT.DataBind();
         
            this.ReportViewer1.LocalReport.Refresh();
        }

        protected void ObjProcesosT_Selecting(object sender, ObjectDataSourceSelectingEventArgs e)
        {
          
            /*e.InputParameters["Vigencia"] =Convert.ToInt16(Request.Cookies["sircc_vig"].Value);
           e.InputParameters["Dep_Del"] = CboDepDel.SelectedValue;
            */
            
            classFiltro f = new classFiltro();
            f.VIG_SOL = Convert.ToInt16(Request.Cookies["sircc_vig"].Value);

            if (chkDepDel.Checked)
            {
                f.DEP_PSOL = CboDepDel.SelectedValue;
            }

            if (chkObj.Checked)
            {
                f.OBJ_SOL = txtObj.Text.ToUpper() ;
            }
            
            if (chkFecha.Checked)
            {
                f.TIPO_FECHAP = (classFiltro.TipoFechap)cboTipoFecha.SelectedIndex;
                f.FECHA_I = Convert.ToDateTime(txtFechaIni.Text);
                f.FECHA_F = Convert.ToDateTime(txtFechaFin.Text);
            }
            if (chkFuncionario.Checked)
            {
                f.ID_ABOG_ENC = CboEncargados.SelectedValue;
            }
            if (chkNumPro.Checked)
            {
                f.NUM_PRO = TxtNumPro.Text;
            }

            e.InputParameters["Filtro"] = f;
            
        }

        protected void CboDepDel_SelectedIndexChanged(object sender, EventArgs e)
        {
            ActualizarFuncionarios();
        }
    }
}