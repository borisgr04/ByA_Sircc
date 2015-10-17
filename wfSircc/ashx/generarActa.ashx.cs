using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BLL;
using BLL.CGestion;
using BLL.CGestion.Actas;

namespace Sircc4.ashx
{
    /// <summary>
    /// Descripción breve de generarActa
    /// </summary>
    public class generarActa : IHttpHandler
    {
        //aca se debe resolver el generador con un patron de diseño.
        
        //CGInfoActividades oGenerador = new CGInfoActividades();
        
        public void ProcessRequest(HttpContext context)
        {
            CGGenActa oGenerador ;
            if (context.Request.QueryString["idacta"] == "4032")
            {
                oGenerador = new CGGenActaInicio();
            }
            else {
                oGenerador = new CGActaParcial();
            }
    
        
            oGenerador.IdDocumento = context.Request.QueryString["idacta"];
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
                else {
                    context.Response.Write(oGenerador.MsgWord);
                    context.Response.End();
                }
            }
            else {
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