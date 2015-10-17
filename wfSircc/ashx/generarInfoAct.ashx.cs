using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BLL.CGestion.Actas;


namespace wfSircc.ashx
{
    /// <summary>
    /// Descripción breve de generarInfoAct1
    /// </summary>
    public class generarInfoAct1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            CGInfoActividades oGenerador;
            oGenerador = new CGInfoActividades();


            oGenerador.IdDocumento = context.Request.QueryString["id"];
            if (isValido())
            {
                byte[] Documento = oGenerador.imprimir();
                if (Documento != null)
                {
                    string Adjunto = String.Format("inline; filename=Documento_{0}.pdf", oGenerador.IdDocumento.ToString());
                    context.Response.AddHeader("content-disposition", Adjunto);
                    context.Response.ContentType = "application/pdf";
                    context.Response.BinaryWrite(Documento);
                    context.Response.End();
                }
                else
                {
                    context.Response.Write(oGenerador.MsgWord);
                    context.Response.End();
                }
            }
            else
            {
                context.Response.Write("No se especifico N° de Acta");
                context.Response.End();
            }
        }

        private bool isValido()
        {
            return true;
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