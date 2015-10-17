using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using System.Net;
using iTextSharp.tool.xml;
using System.Globalization;


namespace ByAHtmlToPdf
{
    public class HtmlToPdf
    {
        public void setMargin(float MarginLeft, float MarginRight, float MarginTop, float MarginBotton)
        {
            this.MarginBotton = MarginBotton;
            this.MarginLeft = MarginLeft;
            this.MarginRight = MarginRight;
            this.MarginTop = MarginTop;
        }
        private float _marginLeft = 3;
        private float _marginRight = 2;
        private float _marginTop = 4.75F;
        private float _marginBotton = 2;
        public float MarginLeft { get { return this._marginLeft; } set { this._marginLeft = value; } }
        public float MarginRight { get { return this._marginRight; } set { this._marginRight = value; } }
        public float MarginTop { get { return this._marginTop; } set { this._marginTop = value; } }
        public float MarginBotton { get { return this._marginBotton; } set { this._marginBotton = value; } }

        public void SetLogo(byte[] image)
        {
            _logo = Image.GetInstance(image);
        }
        public void SetLogo(Stream image)
        {
            _logo = Image.GetInstance(image);
        }
        public void SetLogo(string image)
        {
            _logo = Image.GetInstance(image);
        }
        public void SetLogo(Uri image)
        {
            _logo = Image.GetInstance(image);
        }
        public byte[] GetLogo()
        {
            return this._logo.RawData;
        }

        private Image _logo;
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Version { get; set; }
        public DateTime FechaVersion { get; set; }
        public Image Logo
        {
            get
            {
                return this._logo;
            }
        }

        public Byte[] Parser(string html)
        {
            //pasos paraa volver una caddena en formato de string en formato html a pdf
            Document document = new Document();//PageSize.LETTER, 3, 2, 2, 2
            var diezpoint = iTextSharp.text.Utilities.MillimetersToPoints(10);
            document.SetMargins(this.MarginLeft * diezpoint, this.MarginRight * diezpoint, this.MarginTop * diezpoint, this.MarginBotton * diezpoint);
            //PdfWriter pdfWrite = PdfWriter.GetInstance(document, new FileStream(@"D:\fmEP02.pdf", FileMode.Create));
            MemoryStream ms = new MemoryStream();
            PdfWriter pdfWrite = PdfWriter.GetInstance(document, ms);
            PDFHyF pdfhyf = new PDFHyF();
            pdfhyf.SetHeader(new HeaderHyF(Logo, Codigo, Nombre, Version, FechaVersion));
            pdfWrite.PageEvent = pdfhyf;
            document.Open();
            string htmlText = html;
            XMLWorkerHelper.GetInstance().ParseXHtml(pdfWrite, document, new StringReader(htmlText.Replace("<br>", "<br/>")));
            document.Close();
            pdfWrite.Close();

            //pasos para volver el archivo pdf en datos binarios
            //PdfReader pdfReader = new PdfReader("D://fmEP02.pdf");
            PdfReader pdfReader = new PdfReader(ms.ToArray());
            MemoryStream stream = new MemoryStream();
            PdfStamper stamper = new PdfStamper(pdfReader, stream);
            stream.Flush();
            stamper.Close();
            pdfReader.Close();
            stream.Close();
            return stream.ToArray();

        }
    }

    public class PDFHyF : PdfPageEventHelper
    {
        //Header
        private float HMarginLeft;
        private float HMarginRight;
        private float HMarginTop;
        private float HMarginBottom;
        private float ancho;
        private float alto;
        //
        // Este es el objeto contentbyte del escritor 
        private PdfContentByte cb;
        // vamos a poner el número final de páginas en una plantilla 
        private PdfTemplate template;
        // esta es la fuente base que vamos a utilizar para el encabezado / pie de página 
        private BaseFont bf = null;
        // Esto hace un seguimiento de la hora de creación 
        private DateTime printTime = DateTime.Now;
        //
        private HeaderHyF header;

        public void SetHeader(HeaderHyF header)
        {
            this.header = header;

        }
        public override void OnOpenDocument(PdfWriter writer, Document document)
        {
            var diezpoint = iTextSharp.text.Utilities.MillimetersToPoints(10);
            try
            {
                bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                cb = writer.DirectContent;
                template = cb.CreateTemplate(50, 50);
                this.HMarginLeft = document.LeftMargin;
                this.HMarginRight = document.RightMargin;
                this.HMarginTop = 1.25F * diezpoint;
                this.HMarginBottom = 0.75f * diezpoint;
                this.ancho = document.PageSize.Width - HMarginLeft - HMarginRight;
                this.alto = document.TopMargin - HMarginTop - HMarginBottom;

            }
            catch (DocumentException de)
            {
            }
            catch (System.IO.IOException ioe)
            {
            }
        }
        public override void OnEndPage(PdfWriter writer, Document document)
        {
            base.OnEndPage(writer, document);

            AddHeader(writer, document);
            AddFooter(writer, document);

        }
        private void AddFooter(PdfWriter writer, Document document)
        {
            int pageN = writer.PageNumber;
            String text = "Pagina " + pageN + "  ";
            float len = bf.GetWidthPoint(text, 8);
            Rectangle pageSize = document.PageSize;
            cb.SetRGBColorFill(100, 100, 100);

            cb.BeginText();
            cb.SetFontAndSize(bf, 8);
            cb.SetTextMatrix(pageSize.GetLeft(40), pageSize.GetBottom(30));
            cb.ShowText(text);
            cb.EndText();
            cb.AddTemplate(template, pageSize.GetLeft(40) + len, pageSize.GetBottom(30));

            cb.BeginText();
            cb.SetFontAndSize(bf, 8);
            cb.ShowTextAligned(PdfContentByte.ALIGN_RIGHT, "Creado : " + printTime.ToString(), pageSize.GetRight(40), pageSize.GetBottom(30), 0);
            cb.EndText();
        }
        private void AddHeader(PdfWriter writer, Document document)
        {
            //cb.Rectangle(HMarginLeft, document.PageSize.Height-document.TopMargin+ HMarginBottom, ancho, alto);
            //cb.Stroke();
            var diezpoint = iTextSharp.text.Utilities.MillimetersToPoints(10);
            float cellHeight = 2.5f * diezpoint;
            Rectangle page = document.PageSize;

            PdfPTable table = new PdfPTable(4);
            table.TotalWidth = ancho;
            float scale = alto / header.Logo.Height;
            header.Logo.ScalePercent(scale * 100);
            PdfPCell cell = new PdfPCell(header.Logo, false);
            cell.Padding = 1;
            cell.Colspan = 1;
            cell.Rowspan = 3;
            cell.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
            var aaa = header.Logo.ScaledHeight;
            //cell. = logo.ScaledHeight+2;

            table.AddCell(cell);
            // new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD ), FontFactory.GetFont(BaseFont.COURIER_BOLD, 10, Font.BOLD);
            cell = new PdfPCell(new Phrase(header.Nombre, FontFactory.GetFont(BaseFont.HELVETICA, 14, Font.BOLD)));
            cell.Colspan = 2; cell.Rowspan = 2;
            cell.VerticalAlignment = 2; cell.HorizontalAlignment = 1;
            cell.PaddingTop = 0.75f * diezpoint;
            cell.PaddingBottom = 0.75f * diezpoint;
            table.AddCell(cell);
            //fecha
            DateTime dateValue = DateTime.Now;
            cell = new PdfPCell(new Phrase("Fecha : " + header.FechaVersion.ToString("MMMM", new CultureInfo("es-ES")) + " " + header.FechaVersion.Day.ToString() + " de " + header.FechaVersion.Year.ToString(), FontFactory.GetFont(BaseFont.HELVETICA, 8, Font.BOLD)));
            cell.Rowspan = 1; cell.Colspan = 1;
            cell.HorizontalAlignment = 0;
            cell.VerticalAlignment = PdfPCell.ALIGN_MIDDLE;
            table.AddCell(cell);



            cell = new PdfPCell(new Phrase("Version " + header.Version, FontFactory.GetFont(BaseFont.HELVETICA, 8, Font.BOLD)));
            cell.Rowspan = 1; cell.Colspan = 1;
            cell.HorizontalAlignment = 0;
            cell.PaddingTop = 0.25f * diezpoint;
            cell.PaddingBottom = 0.25f * diezpoint;

            cell.VerticalAlignment = PdfPCell.ALIGN_MIDDLE;
            table.AddCell(cell);

            cell = new PdfPCell(new Phrase(header.Codigo, FontFactory.GetFont(BaseFont.HELVETICA, 14, Font.BOLD)));
            cell.Colspan = 2; cell.Rowspan = 2;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = PdfPCell.ALIGN_BOTTOM;
            table.AddCell(cell);

            cell = new PdfPCell();
            table.AddCell(cell);
            //PdfPTable head = table;
            cellHeight = table.TotalHeight;
            int t = table.Rows.Count;
            table.WriteSelectedRows(0, -1, HMarginLeft, page.Height - HMarginTop, writer.DirectContent);

        }
    }

    public class HeaderHyF
    {
        public HeaderHyF(Image Logo, string Codigo, string Nombre, string Version, DateTime Fecha)
        {
            this.Logo = Logo;
            this.Codigo = Codigo;
            this.Nombre = Nombre;
            this.Version = Version;
            this.FechaVersion = Fecha;
        }

        private float RightMargin { get; set; }
        private float LeftMargin { get; set; }
        private float TopMargin { get; set; }
        private float BottomMargin { get; set; }

        private float ancho;
        private float alto;

        public Image Logo { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Version { get; set; }
        public DateTime FechaVersion { get; set; }
        public PdfPTable table { get; set; }
    }

}
