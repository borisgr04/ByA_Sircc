using ByAHtmlToPdf;
using ByAWordHTML;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

     //table {width:100%;border-style: double; border-width: 1px; border-collapse: collapse}
     //     td,th {border-style: double; border-width: 1px;resize:both;padding:3px;}
     //    .tbconborde {border-collapse: collapse;font-family:Arial;font-size:10pt;}
     //    .tbconborde td{border: 1px solid black;}
     //    .tbconborde tr{width:100%}
     //    .tbconborde th {background-color: #f8f3f3;border: 1px solid black;}
     //    .thSubtitulos {text-align: left;}
     //    .thTitulos {text-align: center;}
     //    .tdtitulo {font-weight:bold;width:30%;}
     //    .tdtitulo2 {font-weight:bold;width:30%;}
namespace BLL.EstPrev.Gestion
{
   public class GenHtmlEP
    {
        public byte[] Doc_Doc { get; set; }
        public byte[] Doc_PDF { get; set; }

        public void Generar(decimal id)
        {
            //1. Cruza Los Datos
            mCruzarEPClausulas m = new mCruzarEPClausulas();
            m.ActualizarClausulas(id);
            //2. Se Consulta la Información de las Clausulas
            List<EP_CLAUSULAS> l ;
            //PPLANTILLAS plantilla;
            CTRL_ENTIDAD Ent;
            using (Entities db = new Entities()) {
                l = db.EP_CLAUSULAS.Where(t => t.ID_EP == id).OrderBy(t => t.ORDEN).ToList();
                //plantilla = db.PPLANTILLAS.Where(t => t.TIP_PLA == "06").FirstOrDefault();
                Ent = db.CTRL_ENTIDAD.FirstOrDefault();
            }
            string html = "";
            foreach (var c in l)
            {
                html += c.CLA_CRUZADA;
            }
            html = WebUtility.HtmlDecode(html);
            StringBuilder style = getStyles();
            //ByAHtml2Word hw = new ByAHtml2Word(plantilla.PLANTILLA);
            HtmlToPdf htmltopdf = new HtmlToPdf();

            //Deberia venir de una plantilla.
            htmltopdf.Codigo = "DO - GC";
            htmltopdf.FechaVersion = DateTime.Now;
            htmltopdf.Nombre = "ESTUDIOS PREVIOS";
            htmltopdf.Version = "1.0";

            htmltopdf.SetLogo(Ent.LOGO_RPT);

            //hw.Css =  style.ToString();
            //hw.Html = html;
            //hw.GenerarDocumentos();
            //Doc_Doc = hw.Doc_Doc;
            //Doc_PDF = hw.Doc_PDF;
            //byte[] buffer = htmltopdf.HtmlToPdf(html);
            Doc_PDF = htmltopdf.Parser(html);
        }

        public string GenerarHTML(decimal id)
        {
            //1. Cruza Los Datos
            mCruzarEPClausulas m = new mCruzarEPClausulas();
            m.ActualizarClausulas(id);
            //
            
            List<EP_CLAUSULAS> l;
            using (Entities db = new Entities())
            {
                l = db.EP_CLAUSULAS.Where(t => t.ID_EP == id).OrderBy(t => t.ORDEN).ToList();
            }
            string html = "";
            foreach (var c in l)
            {
                html += c.CLA_CRUZADA;
            }
            html = WebUtility.HtmlDecode(html);
            StringBuilder style = getStyles();
            
            html = string.Format("<html><head>{0}</head><body><div style='text-align:justify'>{1}</div><body></html>", style.ToString(), html);
            return html;        
            
        }

        private static StringBuilder getStyles()
        {
            StringBuilder style = new StringBuilder();
            style.Append("<style>");
            style.Append("th {text-align: left;}");
            style.Append(".tbconborde{border-collapse: collapse;font-family:Arial;font-size:10pt;}");
            style.Append(".tbconborde td{border: 1px solid black;}");
            style.Append(".tbconborde tr{width:100%}");
            style.Append(".tbconborde th{background-color: #f8f3f3;border: 1px solid black;}");
            style.Append(".thSubtitulos {text-align: left;}");
            style.Append(".thTitulos {text-align: center;}");
            style.Append(".tdtitulo {font-weight:bold;width:30%;}");
            style.Append(".tdtitulo2 {font-weight:bold;width:30%;}");
            //padding: 2mm;padding: 2mm;padding: 2mm;
            style.Append("</style>");
            return style;
        }
    }

}
