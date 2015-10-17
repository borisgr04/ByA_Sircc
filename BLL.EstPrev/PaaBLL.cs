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
    public class PaaBLL
    {
        Entities ctx;

        public PaaBLL()
        {
            Mapper.CreateMap<vEP_PAA, EP_PAA>();
            Mapper.CreateMap<EP_PAA, vEP_PAA>();
            Mapper.CreateMap<EP_PAA_UNSPSC, vEP_PAA_UNSPSC>()
                .ForMember(dest => dest.NombreCodigo, opt => opt.MapFrom(src => src.EP_CODIGOSUNSPSC.NOMBRE));
            Mapper.CreateMap<vEP_PAA_UNSPSC, EP_PAA_UNSPSC>();
        }
        public List<vEP_PAA> Gets(int Vigencia, decimal ID_EP_MPAA)
        {
            using (ctx = new Entities())
            {
                List<vEP_PAA> lrEp_Paa = new List<vEP_PAA>();
                List<EP_PAA> lEp_Paa = ctx.EP_PAA.Where(t => t.VIGENCIA == Vigencia && t.ID_EP_MPAA == ID_EP_MPAA).OrderByDescending(t => t.VIGENCIA).ToList();
                Mapper.Map(lEp_Paa, lrEp_Paa);
                return lrEp_Paa;
            }
        }
        public List<vEP_PAA> Gets2(short Vigencia)
        {
            using (ctx = new Entities())
            {
                List<vEP_PAA> lrEp_Paa = new List<vEP_PAA>();
                List<EP_PAA> lEp_Paa = ctx.EP_PAA.Where(t=> t.VIGENCIA == Vigencia).OrderByDescending(t => t.VIGENCIA).ToList();
                Mapper.Map(lEp_Paa, lrEp_Paa);
                return lrEp_Paa;
            }
        }
        public ByARpt Insert(vEP_PAA Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            ByARpt res = o.Enviar();
            return res;
        }
        public ByARpt Update(vEP_PAA Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            ByARpt res = o.Enviar();
            return res;
        }
        public vEP_PAA Get(int ID, string CodDep, int Vigencia)
        {
            using (ctx = new Entities())
            {
                EP_PAA obj = ctx.EP_PAA.Where(t => t.ID == ID && t.VIGENCIA == Vigencia && t.COD_DEP == CodDep).FirstOrDefault();
                if (obj == null) return null;
                else
                {
                    vEP_PAA Robj = new vEP_PAA();
                    Mapper.Map(obj, Robj);
                    return Robj;
                }
            }
        }
        public vEP_PAA Get2(int ID)
        {
            using (ctx = new Entities())
            {
                EP_PAA obj = ctx.EP_PAA.Where(t => t.ID == ID).FirstOrDefault();
                if (obj == null) return null;
                else
                {
                    vEP_PAA Robj = new vEP_PAA();
                    Mapper.Map(obj, Robj);
                    Robj.lCODIGOS_UNSPSC = GetProductosPAA(Robj.ID);
                    return Robj;
                }
            }
        }
        public List<vEP_PAA_UNSPSC> GetProductosPAA(int ID)
        {
            using (ctx = new Entities())
            {
                List<vEP_PAA_UNSPSC> lrproductos = new List<vEP_PAA_UNSPSC>();
                List<EP_PAA_UNSPSC> lproductos = ctx.EP_PAA_UNSPSC.Where(t => t.ID_EP_PAA == ID).ToList();
                Mapper.Map(lproductos, lrproductos);
                return lrproductos;
            }
        }
        public ByARpt DeletePAA(int IDPAA)
        {
            using (ctx = new Entities())
            {
                try{
                    ByARpt res = new ByARpt();
                    EP_PAA PAA = ctx.EP_PAA.Where(t => t.ID == IDPAA).FirstOrDefault();
                    if (PAA != null)
                    {
                        if (PAA.EP_MPAA.ESTADO == "AB")
                        {
                            EliminarCodigosUNSPSC_PAA(IDPAA);
                            ctx.EP_PAA.Remove(PAA);
                            ctx.SaveChanges();
                            res.Error = false;
                            res.Mensaje = "Operación realizada satisfactoriamente...";
                            return res;
                        }
                        else
                        {
                            res.Error = true;
                            res.Mensaje = "No se puede eliminar ya que el plan de adquisiciones de ha cerrado...";
                            return res;
                        }
                    }
                    else
                    {
                        res.Error = true;
                        res.Mensaje = "No se encuantra Plan de adquisición con esa identificación";
                        return res;
                    }
                }catch(Exception e){
                    ByARpt res = new ByARpt();
                    res.Error = true;
                    res.Mensaje = e.Message;
                    return res;
                }
            }
        }
        public void EliminarCodigosUNSPSC_PAA(int ID_PAA)
        {
            Entities ctx2 = new Entities();
                List<EP_PAA_UNSPSC> lCodigos = ctx2.EP_PAA_UNSPSC.Where(t => t.ID_EP_PAA == ID_PAA).ToList();
                foreach (EP_PAA_UNSPSC item in lCodigos)
                {
                    ctx2.EP_PAA_UNSPSC.Remove(item);
                }
                ctx2.SaveChanges();
        }
        class cmdInsert : absTemplate
        {
            private EP_PAA ep = null;
            public vEP_PAA oDto { get; set; }
            #region ImplementaciónMetodosAbstractos
            protected override bool esValido()
            {
                return true;
            }
            protected override void Antes()
            {
                Entities ctx2 = new Entities();
                EP_PAA Old = ctx2.EP_PAA.OrderByDescending(t => t.ID).FirstOrDefault();

                ep = new EP_PAA();
                Mapper.Map(oDto, ep);
                if (Old == null)
                {
                    string strId = oDto.VIGENCIA.ToString() + "000001";
                    ep.ID = int.Parse(strId);
                }else{
                    string strIdOld = Old.ID.ToString();
                    strIdOld = strIdOld.Substring(4, 6);
                    ep.ID = (int) (oDto.VIGENCIA * 1000000) + (int.Parse(strIdOld) + 1);
                }
                ctx.EP_PAA.Add(ep);
                InsertCodigosPAA(oDto.lCODIGOS_UNSPSC.Where(t => t.ID == 0).ToList(), ep.ID);
                byaRpt.id = ep.ID.ToString();
            }
            private void InsertCodigosPAA(List<vEP_PAA_UNSPSC> lcodigos, int idPAA)
            {
                        int old;
                        EP_PAA_UNSPSC oldCod = ctx.EP_PAA_UNSPSC.OrderByDescending(t => t.ID).FirstOrDefault();
                        if (oldCod == null) old = 0;
                        else old = oldCod.ID;
                        foreach (vEP_PAA_UNSPSC item in lcodigos)
                        {
                            Entities ctx2 = new Entities();
                            EP_PAA_UNSPSC codig = ctx2.EP_PAA_UNSPSC.Where(t => t.ID_EP_PAA == idPAA && t.UNSPSC == item.UNSPSC).FirstOrDefault();
                            if (codig == null)
                            {
                                EP_PAA_UNSPSC objCod = new EP_PAA_UNSPSC();
                                objCod.ID_EP_PAA = idPAA;
                                objCod.UNSPSC = item.UNSPSC;
                                objCod.ID = old + 1;
                                old = old + 1;
                                ctx.EP_PAA_UNSPSC.Add(objCod);
                            }
                        }
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vEP_PAA oDto { get; set; }
            public EP_PAA ep { get; set; }

            #region ImplementaciónMetodosAbstractos
            protected override bool esValido()
            {
                ep = ctx.EP_PAA.Where(t => t.ID == oDto.ID).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected override void Antes()
            {
                Mapper.Map(oDto, ep);
                DeleteCodigos(oDto.lCODIGOS_UNSPSC, oDto.ID);
                InsertCodigosPAA(oDto.lCODIGOS_UNSPSC.Where(t => t.ID == 0).ToList(), oDto.ID);
            }
            private void DeleteCodigos(List<vEP_PAA_UNSPSC> lrCodigos, int idPAA)
            {
                        List<EP_PAA_UNSPSC> lCodigos = ctx.EP_PAA_UNSPSC.Where(t => t.ID_EP_PAA == idPAA).ToList();
                        foreach (EP_PAA_UNSPSC item in lCodigos)
                        {
                            bool ban = true;
                            foreach (vEP_PAA_UNSPSC item2 in lrCodigos)
                            {
                                if (item.ID == item2.ID) ban = false;
                            }
                            if (ban)
                            {
                                ctx.EP_PAA_UNSPSC.Remove(item);
                            }
                        }
            }
            private void InsertCodigosPAA(List<vEP_PAA_UNSPSC> lcodigos, int idPAA)
            {
                int old;
                EP_PAA_UNSPSC oldCod = ctx.EP_PAA_UNSPSC.OrderByDescending(t => t.ID).FirstOrDefault();
                if (oldCod == null) old = 0;
                else old = oldCod.ID;
                foreach (vEP_PAA_UNSPSC item in lcodigos)
                {
                    Entities ctx2 = new Entities();
                    EP_PAA_UNSPSC codig = ctx2.EP_PAA_UNSPSC.Where(t => t.ID_EP_PAA == idPAA && t.UNSPSC == item.UNSPSC).FirstOrDefault();
                    if (codig == null)
                    {
                        EP_PAA_UNSPSC objCod = new EP_PAA_UNSPSC();
                        objCod.ID_EP_PAA = idPAA;
                        objCod.UNSPSC = item.UNSPSC;
                        objCod.ID = old + 1;
                        old = old + 1;
                        ctx.EP_PAA_UNSPSC.Add(objCod);
                    }
                }
            }
            #endregion
        }
    }
}
