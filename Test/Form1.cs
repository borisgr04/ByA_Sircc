using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using BLL.PROCESOS;
using Entidades.VistasPROC;
using Entidades;
using BLL.EstPrev;



namespace Test
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            /*
            ProcesosCBLL p = new ProcesosCBLL();
            classFiltro f = new classFiltro();
            f.DEP_PSOL = "06";
            //f.COD_SOL = "2011-SGR-0001";

            f.ID_ABOG_ENC = "22667823";
            f.TIPO_FECHA = classFiltro.TipoFecha.REVISADO;
            f.FECHA_I = Convert.ToDateTime("01/04/2011");
            f.FECHA_F = Convert.ToDateTime("21/04/2011");

            dataGridView1.DataSource=p.Consultar(f);
            dataGridView1.Refresh();*/

            Entidades.Entities ctx = new Entidades.Entities();
            string cod = ctx.Database.SqlQuery<string>("Select to_char(sysdate) from vtiposcont ").FirstOrDefault<string>();
            ctx.Dispose();
            MessageBox.Show(cod);
        }

        private void button2_Click(object sender, EventArgs e)
        {
            BLL.EstPrev.Gestion.mCruzarEPClausulas m = new BLL.EstPrev.Gestion.mCruzarEPClausulas();
            m.ActualizarClausulas(57);
            MessageBox.Show("Cruzó");
        }
    }
}
