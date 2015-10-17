using Microsoft.Office.Interop.Word;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ByAWordHTML
{
    public class ByAHtml2Word
    {
        public string Log { get; set; }
        public byte[] PlantillaDoc{get;set;}
        public string Html{get;set;}
        public string Css{get;set;}
        public string PathPlantilla{get;set;}
        public string PathPlantillaPDF { get; set; }
        public byte[] Doc_Doc { get; set; }
        public byte[] Doc_PDF { get; set; }

        public ByAHtml2Word(byte[] PlantillaDoc)
        {
            this.PlantillaDoc = PlantillaDoc;
            PathPlantilla = Path.ChangeExtension(Path.GetTempFileName(), ".doc");
            PathPlantillaPDF = Path.ChangeExtension(Path.GetTempFileName(), ".pdf");

            FileStream oFileStream = null;
            if (File.Exists(PathPlantilla))
            {
                File.Delete(PathPlantilla);
            }
            oFileStream = new FileStream(PathPlantilla, FileMode.Create);
            oFileStream.Write(PlantillaDoc, 0, PlantillaDoc.Length);
            oFileStream.Close();
            oFileStream = null;
        }

        private void CrearPlantillaDoc() { 
        
        }

        public void GenerarDocumentos()
        {
            Application wordApp = new Application();
            wordApp.Visible = false;
            
                //PathPlantilla
            //Document doc = wordApp.Documents.Open(@"D:\ByA\svnSircc17022015_1\wfSircc\EstPrev\Docs\PlantillaEP.docx");
            Document doc = wordApp.Documents.Add(PathPlantilla);
            Range rng = wordApp.ActiveDocument.Range(0, 0);
            
            const float cms = 28.3464567f;
            //1 Point = 0.0352777778 Centimeters

            wordApp.ActiveDocument.PageSetup.Orientation=WdOrientation.wdOrientLandscape;
            wordApp.ActiveDocument.PageSetup.TopMargin=2*cms;
            wordApp.ActiveDocument.PageSetup.BottomMargin=2*cms;
            wordApp.ActiveDocument.PageSetup.LeftMargin=2*cms;
            wordApp.ActiveDocument.PageSetup.RightMargin=2*cms;
            wordApp.ActiveDocument.PageSetup.PaperSize = WdPaperSize.wdPaperLetter;
            
            //rng.Text = "New Text";
            object missing = Type.Missing;
            ContentControl contentControl = doc.ContentControls.Add(WdContentControlType.wdContentControlRichText, ref missing);
            contentControl.Title = "Plantilla";
            contentControl.Range.InsertFile(SaveToTemporaryFile(this.Html, this.Css), ref missing, ref missing, ref missing, ref missing);
            doc.SaveAs(PathPlantilla);
            doc.Saved= true;
            doc.SaveAs(PathPlantillaPDF, WdExportFormat.wdExportFormatPDF);
            doc.Close(ref missing);
            doc=null;
            Doc_Doc = ObtenerByte(PathPlantilla);
            Doc_PDF = ObtenerByte(PathPlantillaPDF);
            
            try{
                wordApp.Application.Quit(null, null, null);
                wordApp = null;
            }catch(Exception ex){
                Log += ex.Message;
            }

        }

        private byte[] ObtenerByte(string ruta ){
            byte[] b=null;
            try{
            FileStream oFileStream= new FileStream(ruta,FileMode.Open);
            BinaryReader bR = new BinaryReader(oFileStream);
            b = bR.ReadBytes((int)oFileStream.Length);
            oFileStream.Close();
            oFileStream = null;
            }catch(Exception ex){
                Log += ex.Message;
            }
            return b;
        }
    

        private string SaveToTemporaryFile(string html, string style)
        {
            string htmlTempFilePath = Path.Combine(Path.GetTempPath(), string.Format("{0}.html", Path.GetRandomFileName()));
            //File.Create(htmlTempFilePath);
            using (StreamWriter writer = new StreamWriter(htmlTempFilePath, true, System.Text.Encoding.UTF8))
            {
                html = string.Format("<html><head>{0}</head><body><div style='text-align:justify'>{1}</div><body></html>", style.ToString(), html);
                writer.WriteLine(html);
            }
            return htmlTempFilePath;
        }
    }
}
