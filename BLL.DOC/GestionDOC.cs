using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades;
using ByA;
using AutoMapper;

namespace BLL.DOC
{
    public class GestionDOC
    {

        Entities ctx;
        ByARpt byaRpt = new ByARpt();
        
            
        public ByARpt Guardar(GD_DOCUMENTOSDTO a)
        {
            using (ctx = new Entities())
            {
                GD_DOCUMENTOS f = new GD_DOCUMENTOS();
                f.NOMBRE = a.NOMBRE;
                f.LONGITUD = a.LONGITUD;
                try
                {
                    f.ID = ctx.GD_DOCUMENTOS.Max(t => t.ID) + 1;
                }
                catch {
                    f.ID = 1;
                }
                
                f.TYPE = a.TYPE;
                f.URL = a.URL;
                f.DESCRIPCION = a.DESCRIPCION;
                f.GD_DDOCUMENTOS = new GD_DDOCUMENTOS();
                f.GD_DDOCUMENTOS.DOCUMENTO = a.DOCUMENTO;
                f.ESTADO = "PE";
                f.FEC_REG = DateTime.Now;
                f.USUARIO = a.USUARIO;
                ctx.GD_DOCUMENTOS.Add(f);
                ctx.SaveChanges();
                byaRpt.Mensaje = "OK";
                byaRpt.id = f.ID.ToString();
                byaRpt.Error = false;

            }

            return byaRpt;
        }

        public List<GD_DOCUMENTOSDTO> GetBandeja(string Usuario)
        {
            List<GD_DOCUMENTOSDTO> lst=new List<GD_DOCUMENTOSDTO>();
            using (ctx = new Entities())
            {
                List<GD_DOCUMENTOS> lstO = ctx.GD_DOCUMENTOS.Where(t => t.USUARIO == Usuario && t.ESTADO == "PE").ToList();
                Mapper.CreateMap<GD_DOCUMENTOS, GD_DOCUMENTOSDTO>();
                Mapper.Map(lstO, lst);
                    return lst;
            }
            
       }
    

     public GD_DOCUMENTOSDTO GetDOC(decimal id)
        {
            GD_DOCUMENTOSDTO item = new GD_DOCUMENTOSDTO(); 
            using (ctx = new Entities())
            {
                GD_DOCUMENTOS itemO = ctx.GD_DOCUMENTOS.Where(t => t.ID==id).FirstOrDefault();
                Mapper.CreateMap<GD_DOCUMENTOS, GD_DOCUMENTOSDTO>();
                Mapper.Map(itemO, item);
                item.DOCUMENTO = itemO.GD_DDOCUMENTOS.DOCUMENTO;
                return item;
            }
        }
   
}
     
}