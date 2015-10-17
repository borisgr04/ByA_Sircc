using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL.EstPrev;
using Entidades;

namespace wfSircc.EstPrev.Revision
{
    public partial class revEstPrev : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            EstPrevBLL epBLL = new EstPrevBLL();
            List<vEP_CLAUSULAS_DTO> lst = epBLL.GetClausulas("-00001");
            string temp = "";
            foreach (vEP_CLAUSULAS_DTO i in lst) {
                temp += i.CLA_CRUZADA;
            }



            //Response.Clear();
            //Response.Buffer = true;
            //Response.ContentType = "application/vnd.openxmlformatsofficedocument.wordprocessingml.documet";
            //Response.AddHeader("Content-Disposition", "attachment; filename=WORK_ORDER.doc");
            //System.IO.StringWriter writer = new System.IO.StringWriter();
            //System.Web.UI.HtmlTextWriter html = new System.Web.UI.HtmlTextWriter(writer);
            //html.Write(temp);
            //Response.Write(writer);
            //Response.End();
            #region word2
    //        var strBody=  new System.Text.StringBuilder("");

    //strBody.Append("<html " +
    //        "xmlns:o='urn:schemas-microsoft-com:office:office' " +
    //        "xmlns:w='urn:schemas-microsoft-com:office:word'" +
    //        "xmlns='http://www.w3.org/TR/REC-html40'>" +
    //        "<head><title>Time</title>"); 

    ////'The setting specifies document's view after it is downloaded as Print
    ////'instead of the default Web Layout
    //strBody.Append("<!--[if gte mso 9]>" +
    //                         "<xml>" +
    //                         "<w:WordDocument>" +
    //                         "<w:View>Print</w:View>" +
    //                         "<w:Zoom>90</w:Zoom>" +
    //                         "<w:DoNotOptimizeForBrowser/>" +
    //                         "</w:WordDocument>" +
    //                         "</xml>" +
    //                         "<![endif]-->");

    //strBody.Append("<style>" +
    //                        "<!-- /* Style Definitions */" +
    //                        "@page Section1" +
    //                        "   {size:8.5in 11.0in; " +
    //                        "   margin:1.0in 1.25in 1.0in 1.25in ; " +
    //                        "   mso-header-margin:.5in; " +
    //                        "   mso-footer-margin:.5in; mso-paper-source:0;}" +
    //                        " div.Section1" +
    //                        "   {page:Section1;}" +
    //                        "-->" +
    //                       "</style></head>") ;

    //strBody.Append("<body lang=EN-US style='tab-interval:.5in'>" +
    //                        "<div class=Section1>" +
    //                      temp+
    //                        "</div></body></html>"); 

    ////'Force this content to be downloaded 
    ////'as a Word document with the name of your choice
    //Response.AppendHeader("Content-Type", "application/msword");
    //Response.AppendHeader ("Content-disposition","attachment; filename=myword.doc");
    //Response.Write(strBody);
            #endregion
        }
    }

}