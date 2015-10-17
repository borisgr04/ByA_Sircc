using BLL.EstPrev.Gestion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace wfSircc.EstPrev.ashx
{
    /// <summary>
    /// Descripción breve de ashxEP
    /// </summary>
    public class ashxEP : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            decimal id_ep = Convert.ToDecimal(context.Request.QueryString["id_ep"]);
            GenHtmlEP ep = new GenHtmlEP();
            string tipo = context.Request.QueryString["tipo"];
            ep.Generar(id_ep);
            if (ep.Doc_PDF != null)
            {
                if (tipo == "doc")
                {
                    context.Response.AddHeader("content-disposition", "attachment; filename=EstudioPrevio_" + id_ep.ToString() + ".docx");
                    context.Response.ContentType = "application/msword";
                    //application/vnd.openxmlformats-officedocument.wordprocessingml.document
                    context.Response.BinaryWrite(ep.Doc_Doc);
                }
                else
                {
                    context.Response.AddHeader("content-disposition", "inline; filename=EstudioPrevio_" + id_ep.ToString() + ".pdf");
                    context.Response.ContentType = "application/pdf";
                    context.Response.BinaryWrite(ep.Doc_PDF);
                }
                context.Response.End();
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}