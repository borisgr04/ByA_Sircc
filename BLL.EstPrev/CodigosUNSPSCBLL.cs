using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using Entidades.Vistas;
using System.Data.Entity;

namespace BLL.EstPrev
{
    public class CodigosUNSPSCBLL
    {
        Entities ctx;
        public CodigosUNSPSCBLL()
        {
            Mapper.CreateMap<EP_CODIGOSUNSPSC, vEP_CODIGOSUNSPSC>();
            Mapper.CreateMap<vEP_CODIGOSUNSPSC, EP_CODIGOSUNSPSC>();
        }
        public List<vEP_CODIGOSUNSPSC> GetGrupos()
        {
            using (ctx = new Entities())
            {
                List<vEP_CODIGOSUNSPSC> lrCodigos = new List<vEP_CODIGOSUNSPSC>();
                List<EP_CODIGOSUNSPSC> lCodigos = ctx.EP_CODIGOSUNSPSC.Where(t => t.CLASIFICADOR == "G").OrderBy(t=> t.CODIGO).ToList();
                Mapper.Map(lCodigos, lrCodigos);
                return lrCodigos;
            }
        }
        public List<vEP_CODIGOSUNSPSC> GetSegmentos(string codigoGrupo)
        {
            using (ctx = new Entities())
            {
                List<vEP_CODIGOSUNSPSC> lrCodigos = new List<vEP_CODIGOSUNSPSC>();
                List<EP_CODIGOSUNSPSC> lCodigos = ctx.EP_CODIGOSUNSPSC.Where(t => t.CLASIFICADOR == "S" && t.PADRE == codigoGrupo).ToList();
                Mapper.Map(lCodigos, lrCodigos);
                return lrCodigos;
            }
        }
        public List<vEP_CODIGOSUNSPSC> GetFamilias(string codigoSegmento)
        {
            using (ctx = new Entities())
            {
                List<vEP_CODIGOSUNSPSC> lrCodigos = new List<vEP_CODIGOSUNSPSC>();
                List<EP_CODIGOSUNSPSC> lCodigos = ctx.EP_CODIGOSUNSPSC.Where(t => t.CLASIFICADOR == "F" && t.PADRE == codigoSegmento).ToList();
                Mapper.Map(lCodigos, lrCodigos);
                return lrCodigos;
            }
        }
        public List<vEP_CODIGOSUNSPSC> GetClases(string codigoFamilia)
        {
            using (ctx = new Entities())
            {
                List<vEP_CODIGOSUNSPSC> lrCodigos = new List<vEP_CODIGOSUNSPSC>();
                List<EP_CODIGOSUNSPSC> lCodigos = ctx.EP_CODIGOSUNSPSC.Where(t => t.CLASIFICADOR == "C" && t.PADRE == codigoFamilia).ToList();
                Mapper.Map(lCodigos, lrCodigos);
                return lrCodigos;
            }
        }
        public List<vEP_CODIGOSUNSPSC> GetProductos(string codigoClase)
        {
            using (ctx = new Entities())
            {
                List<vEP_CODIGOSUNSPSC> lrCodigos = new List<vEP_CODIGOSUNSPSC>();
                List<EP_CODIGOSUNSPSC> lCodigos = ctx.EP_CODIGOSUNSPSC.Where(t => t.CLASIFICADOR == "P" && t.PADRE == codigoClase).ToList();
                Mapper.Map(lCodigos, lrCodigos);
                return lrCodigos;
            }
        }
    }
}
