using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BLL.EstPrev;
using BLL.EstPrev.Gestion;

namespace wfSircc.ashx
{
    /// <summary>
    /// Descripción breve de ashxEP
    /// </summary>
    public class ashxEP : IHttpHandler
    {
      
        public void ProcessRequest(HttpContext context)
        {
            GenHtmlEP ep = new GenHtmlEP();      
            decimal id_ep = Convert.ToDecimal(context.Request.QueryString["id_ep"]);
            string tipo = context.Request.QueryString["tipo"];
            ep.Generar(id_ep);
            if (ep.Doc_PDF!=null)
            {
                context.Response.AddHeader("content-disposition", "inline; filename=EstudioPrevio_" + id_ep.ToString() + ".pdf");
                context.Response.ContentType = "application/pdf";
                context.Response.BinaryWrite(ep.Doc_PDF);
                context.Response.End();
            }
        }


        void imprimirPDF(HttpContext context, byte[] doc)
        {
           
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