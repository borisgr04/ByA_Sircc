using System;
using System.Collections.Generic;
using System.Data;
using System.Data.EntityClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;

namespace BLL.CGestion
{
    public class CGTraslados
    {
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }

        public IList<vINT_CONTROL_DOCT> GetTraslado(string etapa)
        {
            return GetINT_CONTROL_DOC(etapa, "AC");
        }

        public IList<vINT_CONTROL_DOCT> GetPendiente(string etapa)
        {
            return GetINT_CONTROL_DOC(etapa, "RE");
        }

        public IList<vINT_CONTROL_DOCT> GetDevuelta(string etapa)
        {
            return GetINT_CONTROL_DOC(etapa, "DE");
        }

        private IList<vINT_CONTROL_DOCT> GetINT_CONTROL_DOC(string etapa, string estado)
        {
            IList<vINT_CONTROL_DOCT> lst = new List<vINT_CONTROL_DOCT>();
            IList<INT_CONTROL_DOC> lstO = new List<INT_CONTROL_DOC>();
            using (ctx = new Entities())
            {
                lstO = ctx.INT_CONTROL_DOC
                    .Where(t => 
                        t.ETA_DOC == etapa &&
                        t.EST_DOC == estado && 
                        t.INT_DETTRASLADO.Where(t2 => t2.EST_TRA!="AN" && t2.INT_TRASLADOS.ORI_TRA == etapa).Count()==0 
                        ).ToList();
                Mapper.CreateMap<INT_CONTROL_DOC, vINT_CONTROL_DOCT>()
                    .ForMember(dest => dest.NOM_ACTA, opt => opt.MapFrom(src => src.ESTCONTRATOS1.ESTADOS.NOM_EST))
                    .ForMember(dest => dest.VAL_PAGO, opt => opt.MapFrom(src => src.ESTCONTRATOS1.VAL_PAGO))
                    .ForMember(dest => dest.COD_CON, opt => opt.MapFrom(src => src.ESTCONTRATOS1.COD_CON))
                    .ForMember(dest => dest.IS_TRAS, opt => opt.MapFrom(src => src.INT_DETTRASLADO.Where(t=> t.EST_TRA!="AN" && t.INT_TRASLADOS.ORI_TRA==etapa) .FirstOrDefault().ID!=null))
                    .ForMember(dest => dest.ID_TRAS, opt => opt.MapFrom(src => src.INT_DETTRASLADO.Where(t=> t.EST_TRA!="AN" && t.INT_TRASLADOS.ORI_TRA==etapa) .FirstOrDefault().ID))
                    .ForMember(dest => dest.CONTRATISTA, opt => opt.MapFrom(src => GetTercero(src.ESTCONTRATOS1.CONTRATOS.TERCEROS)));
                Mapper.Map(lstO, lst);
                

                return lst;
            }
        }

        private void ejemploentity() {
            using (EntityConnection conn = new EntityConnection("name=travelEntitiesGeneral"))
            {
                conn.Open();
                EntityCommand cmd = conn.CreateCommand();
                cmd.CommandText = @"select c.BlogID from travelEntitiesGeneral.Blogs as c where c.BlogPosts.Count > 0";
                EntityDataReader reader = cmd.ExecuteReader(CommandBehavior.SequentialAccess);
                while (reader.Read())
                {
                    Console.WriteLine("BlogID = {0}", reader["BlogID"]);
                }
                conn.Close();
            }
        }

        private string GetTercero(TERCEROS t){
             return (t.APE1_TER.Trim() + " " + (t.APE2_TER == null ? "" : t.APE2_TER.Trim()) + " " + (t.NOM1_TER == null ? "" : t.NOM1_TER.Trim()) + " " + (t.NOM2_TER == null ? "" : t.NOM2_TER.Trim())).Trim();
        }

        public ByARpt Trasladar(List<vINT_CONTROL_DOCT> lst)
        {
            cmdTrasladar o = new cmdTrasladar();
            o.lst = lst;
            return o.Enviar();
        }
        
        public IList<vINT_CONTROL_DOCT> GetTrasladoByID(decimal? idtras)
        {
            IList<vINT_CONTROL_DOCT> lst = new List<vINT_CONTROL_DOCT>();
            IList<INT_CONTROL_DOC> lstO = new List<INT_CONTROL_DOC>();
            using (ctx = new Entities())
            {
            
            lstO = ctx.INT_DETTRASLADO.Where(t =>t.EST_TRA!="AN" && t.ID_TRASLADO == idtras).Select(t => t.INT_CONTROL_DOC).ToList();
            Mapper.CreateMap<INT_CONTROL_DOC, vINT_CONTROL_DOCT>()
                .ForMember(dest => dest.NOM_ACTA, opt => opt.MapFrom(src => src.ESTCONTRATOS1.ESTADOS.NOM_EST))
                .ForMember(dest => dest.VAL_PAGO, opt => opt.MapFrom(src => src.ESTCONTRATOS1.VAL_PAGO))
                .ForMember(dest => dest.COD_CON, opt => opt.MapFrom(src => src.ESTCONTRATOS1.COD_CON))
                .ForMember(dest => dest.IS_TRAS, opt => opt.MapFrom(src => src.INT_DETTRASLADO.Where(t => t.EST_TRA != "AN").FirstOrDefault().ID != null))
                .ForMember(dest => dest.ID_TRAS, opt => opt.MapFrom(src => src.INT_DETTRASLADO.Where(t => t.EST_TRA != "AN").FirstOrDefault().ID))
                .ForMember(dest => dest.CONTRATISTA, opt => opt.MapFrom(src => GetTercero(src.ESTCONTRATOS1.CONTRATOS.TERCEROS)));
            Mapper.Map(lstO, lst);
            
            return lst;
            }
        }

        public IList<vINT_CONTROL_DOCT2> GetRecTrasladoByID(decimal? idtras)
        {
            IList<vINT_CONTROL_DOCT2> lst = new List<vINT_CONTROL_DOCT2>();
            IList<INT_CONTROL_DOC> lstO = new List<INT_CONTROL_DOC>();
            using (ctx = new Entities())
            {

                lstO = ctx.INT_DETTRASLADO.Where(t => t.EST_TRA != "AN" && t.ID_TRASLADO == idtras).Select(t => t.INT_CONTROL_DOC).ToList();

                Mapper.CreateMap<INT_CONTROL_DOC, vINT_CONTROL_DOCT2>()
                        .ForMember(dest => dest.NOM_ACTA, opt => opt.MapFrom(src => src.ESTCONTRATOS1.ESTADOS.NOM_EST))
                        .ForMember(dest => dest.VAL_PAGO, opt => opt.MapFrom(src => src.ESTCONTRATOS1.VAL_PAGO))
                        .ForMember(dest => dest.COD_CON, opt => opt.MapFrom(src => src.ESTCONTRATOS1.COD_CON))
                        .ForMember(dest => dest.IS_TRAS, opt => opt.MapFrom(src => src.INT_DETTRASLADO.Where(t => t.EST_TRA != "AN").FirstOrDefault().EST_TRA!="AC"))
                        .ForMember(dest => dest.EST_TRA, opt => opt.MapFrom(src => src.INT_DETTRASLADO.Where(t => t.EST_TRA != "AN").FirstOrDefault().EST_TRA))
                        .ForMember(dest => dest.ID_TRAS, opt => opt.MapFrom(src => src.INT_DETTRASLADO.Where(t => t.EST_TRA != "AN").FirstOrDefault().ID))
                        .ForMember(dest => dest.CONTRATISTA, opt => opt.MapFrom(src => GetTercero(src.ESTCONTRATOS1.CONTRATOS.TERCEROS)));

                Mapper.Map(lstO, lst);

                return lst;
            }
        }
        /// <summary>
        /// Listado de Documentos no revisados por ETAPA
        /// </summary>
        /// <returns></returns>
        public IList<vINT_CONTROL_DOCT2> GetDocumentosPorTram(string etapa)
        {
            IList<vINT_CONTROL_DOCT2> lst = new List<vINT_CONTROL_DOCT2>();
            IList<INT_CONTROL_DOC> lstO = new List<INT_CONTROL_DOC>();
            using (ctx = new Entities())
            {

                lstO = ctx.INT_CONTROL_DOC.Where(t => t.EST_DOC == "RE" && t.ETA_DOC == etapa).ToList();

                Mapper.CreateMap<INT_CONTROL_DOC, vINT_CONTROL_DOCT2>()
                        .ForMember(dest => dest.NOM_ACTA, opt => opt.MapFrom(src => src.ESTCONTRATOS1.ESTADOS.NOM_EST))
                        .ForMember(dest => dest.VAL_PAGO, opt => opt.MapFrom(src => src.ESTCONTRATOS1.VAL_PAGO))
                        .ForMember(dest => dest.COD_CON, opt => opt.MapFrom(src => src.ESTCONTRATOS1.COD_CON))
                        .ForMember(dest => dest.CONTRATISTA, opt => opt.MapFrom(src => GetTercero(src.ESTCONTRATOS1.CONTRATOS.TERCEROS)));

                Mapper.Map(lstO, lst);

                return lst;
            }
        }

        
        public ByARpt TrasladarR(List<vINT_CONTROL_DOCT2> lst, string USUARIO)
        {
            cmdTrasladarR o = new cmdTrasladarR();
            o.lst = lst;
            o.USUARIO = USUARIO;
            return o.Enviar();
        }
    }
    class cmdTrasladarR : absTemplate
    {
        public decimal ID_DOC { get; set; }
        public string USUARIO { get; set; }
        public List<vINT_CONTROL_DOCT2> lst { get; set; }
        private INT_TRASLADOS oEnt { get; set; }
        #region ImplementaciónMetodosAbstractos
        //protected override bool esValido()
        //{
        //    return true;
        //}
        protected override void Antes()
        {
            //crearTraslado();
            decimal id_cd=ObtenerID_CD();
            foreach (vINT_CONTROL_DOCT2 item in lst)
            {
                INT_DETTRASLADO idc = ctx.INT_DETTRASLADO.Find(item.ID);
                //crear el nuevo documento para tesoreria    
                //idc.ID_CTRDOC = item.ID;
                if (item.IS_TRAS && idc.EST_TRA=="AC")
                {
                    idc.EST_TRA = "RE";
                    ctx.Entry(idc).State = EntityState.Modified;
                    CrearControlDoc(idc, id_cd);//crear item para revision o tramite en estado actual (en recibido y se asocia al tramite siguiente del item actual
                    id_cd++;
                }
            }
            //ctx.SaveChanges();
            byaRpt.Mensaje = "Se Realizó la operación";
            //byaRpt.id = oEnt.ID.ToString();
            byaRpt.Error = false;
        }


        public void CrearControlDoc(INT_DETTRASLADO idc, decimal id_cd)
        {
            INT_CONTROL_DOC oEnt = new INT_CONTROL_DOC();//Se instancia el Objeto
            oEnt.ID = id_cd;
            oEnt.FEC_REC = DateTime.Now;
            oEnt.FEC_REC_SIS = DateTime.Now;
            oEnt.EST_DOC = "RE"; //Recibido
            oEnt.ETA_DOC = idc.INT_TRASLADOS.DES_TRA; //ETAPA  idc.INT_TRASLADOS.DES_TRA
            oEnt.USAP_REC = USUARIO;
            oEnt.IDACTA = idc.INT_CONTROL_DOC.ESTCONTRATOS1.ID;
            oEnt.IDPADRE = idc.ID_CTRDOC;
            idc.INT_CONTROL_DOC1 = oEnt; //se relaciona con el tramite siguiente
            idc.INT_CONTROL_DOC.ESTCONTRATOS1.INT_CONTROL_DOC = oEnt;//enlaza al ultimo.

            //ec.INT_CONTROL_DOC1 = oEnt;//Se relaciona objeto actual
            //decidir si se enlaza al primer elemento o al ultimo

        }

        private int ObtenerID_CD()
        {
            int m;
            try
            {
                m = (int)ctx.INT_CONTROL_DOC.Max(t => t.ID) + 1;
            }
            catch
            {
                m = 1;
            }
            return m;
        }

        private void crearTraslado()
        {
            oEnt = new INT_TRASLADOS();
            oEnt.ID = ObtenerID();
            oEnt.FEC_REG = DateTime.Now;
            oEnt.EST_TRA = "AC"; //ACTIVO
            oEnt.ORI_TRA = "CT";//ORIGEN
            oEnt.DES_TRA = "TS";//DESTINO
            oEnt.FEC_TRA = DateTime.Now;
            oEnt.USAP = USUARIO;
            ctx.INT_TRASLADOS.Add(oEnt);
        }
        #endregion

        #region MetodosPrivados
        private int ObtenerID()
        {
            int m;
            try
            {
                m = (int)ctx.INT_TRASLADOS.Max(t => t.ID) + 1;
            }
            catch
            {
                m = 1;
            }
            return m;
        }

        private int ObtenerID_DT()
        {
            int m;
            try
            {
                m = (int)ctx.INT_DETTRASLADO.Max(t => t.ID) + 1;
            }
            catch
            {
                m = 1;
            }
            return m;
        }

        #endregion

    }

    class cmdTrasladar : absTemplate
    {
        public decimal ID_DOC { get; set; }
        public string USUARIO { get; set; }
        public List<vINT_CONTROL_DOCT> lst { get; set; }
        private INT_TRASLADOS oEnt { get; set; }
        #region ImplementaciónMetodosAbstractos
        //protected override bool esValido()
        //{
        //    return true;
        //}
        protected override void Antes()
        {
            crearTraslado();

            decimal id = ObtenerID_DT();
            foreach (vINT_CONTROL_DOCT item in lst)
            {
                INT_DETTRASLADO idc = new INT_DETTRASLADO();
                idc.ID = id;
                id = id + 1;
                idc.ID_CTRDOC = item.ID;
                idc.EST_TRA = "AC";
                oEnt.INT_DETTRASLADO.Add(idc);
            }
            ctx.SaveChanges();
            byaRpt.Mensaje = "Se Realizó la operación";
            byaRpt.id = oEnt.ID.ToString();
            byaRpt.Error = false;
        }

        private void crearTraslado()
        {
            oEnt = new INT_TRASLADOS();
            oEnt.ID = ObtenerID();
            oEnt.FEC_REG = DateTime.Now;
            oEnt.EST_TRA = "AC"; //ACTIVO
            oEnt.ORI_TRA = "CT";//ORIGEN
            oEnt.DES_TRA = "TS";//DESTINO
            oEnt.FEC_TRA = DateTime.Now;
            oEnt.USAP = USUARIO;
            ctx.INT_TRASLADOS.Add(oEnt);
        }
        #endregion

        #region MetodosPrivados
        private int ObtenerID()
        {
            int m;
            try
            {
                m = (int)ctx.INT_TRASLADOS.Max(t => t.ID) + 1;
            }
            catch
            {
                m = 1;
            }
            return m;
        }

        private int ObtenerID_DT()
        {
            int m;
            try
            {
                m = (int)ctx.INT_DETTRASLADO.Max(t => t.ID) + 1;
            }
            catch
            {
                m = 1;
            }
            return m;
        }

        #endregion

    }

   
}
