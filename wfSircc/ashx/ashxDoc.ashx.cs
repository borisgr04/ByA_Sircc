using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Entidades;
using BLL.DOC;

namespace wfSircc.ashx
{
    /// <summary>
    /// Descripción breve de ashxDoc
    /// </summary>
    public class ashxDoc : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            decimal id = Convert.ToDecimal(context.Request.QueryString["id"]);
            GestionDOC gs = new GestionDOC();
            GD_DOCUMENTOSDTO dto= gs.GetDOC(id);
            string Adjunto = String.Format("inline; filename=Documento_{0}.pdf",id);
            context.Response.AddHeader("content-disposition", Adjunto);
            context.Response.ContentType = dto.TYPE;
            context.Response.BinaryWrite(dto.DOCUMENTO);
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