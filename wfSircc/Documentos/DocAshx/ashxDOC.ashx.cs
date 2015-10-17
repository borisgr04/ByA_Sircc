using BLL.PROCESOS.GenDoc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace wfSircc.Documentos.DocAshx
{
    /// <summary>
    /// Descripción breve de ashxDOC
    /// </summary>
    public class ashxDOC : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            decimal ID_DOC = Convert.ToDecimal(context.Request.QueryString["id_doc"]);
            GenHtmlDoc dc = new GenHtmlDoc();
            dc.Generar(ID_DOC);
            if (dc.Doc_PDF != null)
            {
                context.Response.AddHeader("content-disposition", "inline; filename=DocProceso_" + ID_DOC + ".pdf");
                context.Response.ContentType = "application/pdf";
                context.Response.BinaryWrite(dc.Doc_PDF);

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