using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using Entidades.VistasPROC;

namespace BLL.PROCESOS.Gestion
{
    class mPCRONOGRAMAS
    {
        Entities ctx { get; set; }
        ByARpt byaRpt = new ByARpt();

        public List<vPACTIVIDADES> GetActividadesT(string Num_Pro)
        {
            List<vPACTIVIDADES> lst = new List<vPACTIVIDADES>();
            using (ctx = new Entities())
            {
                PCONTRATOS pc = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == Num_Pro).FirstOrDefault();
                List<PACTIVIDADES> lstO = pc.TIPOSPROC.PACTIVIDADES.Where(t => t.VIGENCIA == pc.VIG_CON.ToString()).OrderBy(t => t.ORDEN).ToList();
                Mapper.CreateMap<PACTIVIDADES, vPACTIVIDADES>();
                Mapper.Map(lstO, lst);
                return lst;
            }
        }

        public List<vPACTIVIDADES> GetActividadesNC(string Num_Pro)
        {
            List<vPACTIVIDADES> lst = new List<vPACTIVIDADES>();
            using (ctx = new Entities())
            {
                Mapper.CreateMap<PACTIVIDADES, vPACTIVIDADES>();
                PCONTRATOS pc = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == Num_Pro).FirstOrDefault();
                if (pc != null)
                {
                    List<PACTIVIDADES> lstO = pc.TIPOSPROC.PACTIVIDADES.Where(t => t.VIGENCIA == pc.VIG_CON.ToString()).OrderBy(t => t.ORDEN).ToList();
                    foreach (PACTIVIDADES item in lstO)
                    {
                        if (pc.PCRONOGRAMAS.Where(t => t.COD_ACT == item.COD_ACT && t.ANULADO == "N").Count() == 0)
                        {//Sino esta en esa fila
                            vPACTIVIDADES vpa = new vPACTIVIDADES();
                            Mapper.Map(item, vpa);
                            lst.Add(vpa);
                        }
                    }
                }
                return lst;
            }
        }

        public List<vPACTIVIDADES> GetActividadesC(string Num_Pro)
        {
            List<vPACTIVIDADES> lst = new List<vPACTIVIDADES>();
            using (ctx = new Entities())
            {
                PCONTRATOS pc = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == Num_Pro).FirstOrDefault();
                List<vPACTIVIDADES> lstO = pc.PCRONOGRAMAS
                    .Select(t => new
                    vPACTIVIDADES
                    {
                        COD_ACT = t.COD_ACT,
                        NOM_ACT = t.NOM_ACT
                    }
                    ).ToList();
                Mapper.Map(lstO, lst);
                return lst;
            }
        }

        public List<vPCRONOGRAMAS> GetCronograma(string Num_Pro)
        {
            List<vPCRONOGRAMAS> lst = new List<vPCRONOGRAMAS>();
            using (ctx = new Entities())
            {
                List<PCRONOGRAMAS> lstO = ctx.PCRONOGRAMAS.Where(t => t.NUM_PROC == Num_Pro && t.ANULADO == "N").OrderBy(t => t.ORDEN).ToList();
                Mapper.CreateMap<PCRONOGRAMAS, vPCRONOGRAMAS>()
                    .ForMember(dest => dest.NOM_EST, opt => opt.MapFrom(src => src.PESTADOSACT.NOM_EST))
                    .ForMember(dest => dest.IS_FINAL, opt => opt.MapFrom(src => src.PESTADOSACT.IS_FINAL))
                    .ForMember(dest => dest.IS_NUEVO, opt => opt.MapFrom(src => false))
                    .ForMember(dest => dest.IS_ANULAR, opt => opt.MapFrom(src => false));
                Mapper.Map(lstO, lst);
                return lst;
            }
        }

        public ByARpt CambiarEstadoCronograma(vPCRONOGRAMAS Reg)
        {
            using (ctx = new Entities())
            {
                try
                {
                    ByARpt res = new ByARpt();
                    PCRONOGRAMAS crono = ctx.PCRONOGRAMAS.Where(t => t.ID == Reg.ID).FirstOrDefault();
                    crono.EST_ACT = Reg.EST_ACT;
                    crono.OBS_SEG = Reg.OBS_SEG;
                    ctx.SaveChanges();
                    res.Error = false;
                    res.Mensaje = "Operación Realizada Satisfactoriamente";
                    return res;
                }
                catch (Exception e)
                {
                    ByARpt res = new ByARpt();
                    res.Error = true;
                    res.Mensaje = e.Message;
                    return res;
                }
            }
        }

        public ByARpt CambiarEstadoCronograma(vPCRONOGRAMAS Reg, Entities ctx)
        {
            try
            {
                ByARpt res = new ByARpt();
                PCRONOGRAMAS crono = ctx.PCRONOGRAMAS.Where(t => t.ID == Reg.ID).FirstOrDefault();
                crono.EST_ACT = Reg.EST_ACT;
                crono.OBS_SEG = Reg.OBS_SEG;
                ctx.SaveChanges();
                res.Error = false;
                res.Mensaje = "Operación Realizada Satisfactoriamente";
                return res;
            }
            catch (Exception e)
            {
                ByARpt res = new ByARpt();
                res.Error = true;
                res.Mensaje = e.Message;
                return res;
            }
        }

        public List<vPCRONOGRAMAS> GetCronogramaS(string Num_Pro)
        {
            List<vPCRONOGRAMAS> lst = new List<vPCRONOGRAMAS>();
            using (ctx = new Entities())
            {
                List<PCRONOGRAMAS> lstO = ctx.PCRONOGRAMAS.Where(t => t.NUM_PROC == Num_Pro && t.ANULADO == "N" && t.EST_ACT!="0000").OrderBy(t => t.ORDEN).ToList();
                Mapper.CreateMap<PCRONOGRAMAS, vPCRONOGRAMAS>()
                    .ForMember(dest => dest.NOM_EST, opt => opt.MapFrom(src => src.PESTADOSACT.NOM_EST))
                    .ForMember(dest => dest.IS_FINAL, opt => opt.MapFrom(src => src.PESTADOSACT.IS_FINAL))
                    .ForMember(dest => dest.IS_NUEVO, opt => opt.MapFrom(src => false))
                    .ForMember(dest => dest.IS_ANULAR, opt => opt.MapFrom(src => false));
                Mapper.Map(lstO, lst);
                return lst;
            }
        }

        public ByARpt UpdAplazar(List<vPCRONOGRAMAS> lst, string Num_Pro, string Usuario)
        {
            UpdAplazar o = new UpdAplazar();
            o.Num_Pro = Num_Pro;
            o.USUARIO = Usuario;
            o.lst = lst;
            return o.Enviar();
        }
        
        public ByARpt UpdCronograma(List<vPCRONOGRAMAS> lst, string Num_Pro, string Usuario)
        {
            UpdCronograma o = new UpdCronograma();
            o.Num_Pro = Num_Pro;
            o.USUARIO = Usuario;
            o.lst = lst;
            return o.Enviar();
        }

        public ByARpt SegCronograma(List<vPCRONOGRAMAS> lst, string Num_Pro, string Usuario)
        {
            SegCronograma o = new SegCronograma();
            o.USUARIO = Usuario;
            o.Num_Pro = Num_Pro;
            o.lst = lst;
            return o.Enviar();
        }


    }

    class UpdAplazar : absTemplate
    {
        public string Num_Pro { get; set; }
        public string USUARIO { get; set; }
        public List<vPCRONOGRAMAS> lst { get; set; }
        private PCRONOGRAMAS oEnt { get; set; }
        private PCONTRATOS oPC { get; set; }
        #region ImplementaciónMetodosAbstractos

        protected override void Antes()
        {
            oPC = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == Num_Pro).FirstOrDefault();
            if (oPC != null)
            {
                lst.ForEach(item=> UpdActividades(item));
                byaRpt.Mensaje = "Se Realizó la operación";
                byaRpt.Error = false;
            }
        }
        private void UpdActividades(vPCRONOGRAMAS item)
        {
                PCRONOGRAMAS crono = ctx.PCRONOGRAMAS.Find(item.ID);
                crono.FECHAI = item.FECHAI;
                crono.HORAI = item.HORAI;
                crono.MIN_I = item.MIN_I;
                crono.FECHAF = item.FECHAF;
                crono.MIN_F = item.MIN_F;
                crono.USAP_MOD = USUARIO;
                ctx.Entry(crono).State = EntityState.Modified;
        }
        #endregion
    }

    class UpdCronograma : absTemplate
    {
        public string Num_Pro { get; set; }
        public string USUARIO { get; set; }
        public List<vPCRONOGRAMAS> lst { get; set; }
        private PCRONOGRAMAS oEnt { get; set; }
        private PCONTRATOS oPC { get; set; }
        #region ImplementaciónMetodosAbstractos

        protected override void Antes()
        {
            oPC = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == Num_Pro).FirstOrDefault();
            decimal id = ObtenerID();
            if (oPC != null)
            {
                foreach (vPCRONOGRAMAS item in lst)
                {
                    //Si no es nuevo
                    if (!item.IS_NUEVO)
                    {
                        UpdActividades(item);
                    }
                    else
                    {
                        AddActividades(item, id);
                        id++;
                    }

                }
                byaRpt.Mensaje = "Se Realizó la operación";
                //byaRpt.id = oEnt.ID.ToString();
                byaRpt.Error = false;
            }

        }
        private void UpdActividades(vPCRONOGRAMAS item)
        {
            PCRONOGRAMAS crono = ctx.PCRONOGRAMAS.Find(item.ID);
            if (item.IS_ANULAR)
            {
                crono.ANULADO = "S";
            }
            else
            {
                if (item.EST_ACT == "0000")
                {
                    if (item.FECHAI != null)
                    {
                        crono.EST_ACT = "0001";
                        crono.FECHAI = item.FECHAI;
                        crono.HORAI = item.HORAI;
                        crono.MIN_I = item.MIN_I;
                        crono.FECHAF = item.FECHAF;
                        crono.MIN_F = item.MIN_F;
                    }
                    else
                    {
                        crono.EST_ACT = "0000";
                        crono.FECHAI = null;
                        crono.HORAI = null;
                        crono.MIN_I = null;
                        crono.FECHAF = null;
                        crono.MIN_F = null;
                    }
                }
            }
            ctx.Entry(crono).State = EntityState.Modified;
        }

        private void AddActividades(vPCRONOGRAMAS item, decimal id)
        {

            string vig = oPC.VIG_CON.ToString();
            PACTIVIDADES a = ctx.PACTIVIDADES.Where(t => t.VIGENCIA == vig && t.COD_ACT == item.COD_ACT).FirstOrDefault();
            string EST_ACT = item.FECHAI != null ? "0001" : "0000";
            PCRONOGRAMAS objCrono = new PCRONOGRAMAS
            {
                ID = id,
                COD_ACT = a.COD_ACT,
                COD_TPRO = a.COD_TPRO,
                EST_ACT = EST_ACT,
                EST_PROC = a.EST_PROC,
                FEC_REG = DateTime.Now,
                NOM_ACT = a.NOM_ACT,
                NOTIFICAR = a.NOTIFICAR,
                NUM_PROC = oPC.PRO_SEL_NRO,
                OBLIGATORIO = a.OBLIGATORIO,
                OCUPADO = a.OCUPADO,
                USAP = oPC.USUARIO,
                UBICACION = a.UBICACION,
                FECHAI = item.FECHAI,
                HORAI = item.HORAI,
                MIN_I = item.MIN_I,
                FECHAF = item.FECHAF,
                MIN_F = item.MIN_F,
                ANULADO = "N"
            };
            ctx.PCRONOGRAMAS.Add(objCrono);
        }

        private int ObtenerID()
        {
            int m;
            try
            {
                m = (int)ctx.PCRONOGRAMAS.Max(t => t.ID) + 1;
            }
            catch
            {
                m = 1;
            }
            return m;
        }


        #endregion
    }

    class SegCronograma : absTemplate
    {
        public string Num_Pro { get; set; }
        public string USUARIO { get; set; }
        public List<vPCRONOGRAMAS> lst { get; set; }
        public List<PCRONOGRAMAS> lstC { get; set; }
        private PCRONOGRAMAS oEnt { get; set; }
        private PCONTRATOS oPC { get; set; }

        #region ImplementaciónMetodosAbstractos
        protected override bool esValido()
        {
            oPC = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == Num_Pro).FirstOrDefault();
            if (oPC != null)
            {
                byaRpt.Mensaje = "Se Realizó la operación";
                byaRpt.id = Num_Pro;
                byaRpt.Error = false;
                return !byaRpt.Error;
            }
            else
            {
                byaRpt.Mensaje = "No se encontró el Proceso";
                byaRpt.id = Num_Pro;
                byaRpt.Error = true;
                return !byaRpt.Error;
            }
        }
        protected override void Antes()
        {
            lstC = oPC.PCRONOGRAMAS.Where(t => t.ANULADO == "N").ToList(); //Cargar a memoria listado de actividades
            lst.ForEach(t => SegActividades(t));
            byaRpt.Mensaje = "Se Realizó la operación";
            byaRpt.id = Num_Pro;
            byaRpt.Error = false;
        }
        private void SegActividades(vPCRONOGRAMAS item)
        {
            PCRONOGRAMAS crono = lstC.Where(t => t.ID == item.ID).FirstOrDefault();
            if (crono.EST_ACT != item.EST_ACT || crono.OBS_SEG != item.OBS_SEG)
            {//si hay cambios
                crono.EST_ACT = item.EST_ACT;
                crono.OBS_SEG = item.OBS_SEG;
                crono.FEC_MOD = DateTime.Now;
                crono.USAP_MOD = USUARIO;
                ctx.Entry(crono).State = EntityState.Modified;
            }
        }
        #endregion
    }
}
