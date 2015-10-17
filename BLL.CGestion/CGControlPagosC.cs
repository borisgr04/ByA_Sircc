using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.CGestion.Filtros;
using ByA;
using Entidades;
using Entidades.VistasGC;
using System.Data;
using System.Data.Entity;
namespace BLL.CGestion
{
    public class CGControlPagosC
    {

        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }
        //
        CGContratos oContratos = new CGContratos();
        ESTCONTRATOS oEst;

        public vContratosInt GetContrato(int IdeActa)
        {
            using (ctx = new Entities())
            {
                oContratos.ctx = ctx;
                oEst = ctx.ESTCONTRATOS.Where(t => t.ID == IdeActa).FirstOrDefault();
                return oContratos.GetContrato(oEst.COD_CON);
            }
        }

        public IList<vRP_ContratosOP> GetRpOp(int IdeActa)
        {
            IList<vRP_ContratosOP> lst = new List<vRP_ContratosOP>();
            using (ctx = new Entities())
            {
                oContratos.ctx = ctx;
                oEst = ctx.ESTCONTRATOS.Where(t => t.ID == IdeActa).FirstOrDefault();
                IList<RP_CONTRATOS> oRP = ctx.RP_CONTRATOS.Where(t => t.COD_CON == oEst.COD_CON).ToList();
                Mapper.CreateMap<RP_CONTRATOS, vRP_ContratosOP>();
                Mapper.Map(oRP, lst);
                foreach (vRP_ContratosOP item in lst)
                {
                    INT_DETCUENTA idc = ctx.INT_DETCUENTA.Where(t => t.NRO_RP == item.NRO_RP && t.IDACTA==IdeActa).FirstOrDefault();
                    if (idc != null)
                    {
                        item.NRO_OP = idc.NRO_OP;
                        item.VAL_OP = idc.VAL_OP;
                        item.FEC_OP = idc.FEC_OP;
                        item.NRO_EGR = idc.NRO_EGR;
                        item.FEC_EGR = idc.FEC_EGR;
                        item.ID_DC = idc.ID;
                    }
                }
                return lst;
            }
        }

        public IList<RP_CONTRATOS> GetRpOp2(int IdeActa)
        {
            IList<vRP_ContratosOP> lst = new List<vRP_ContratosOP>();
            using (ctx = new Entities())
            {
                oContratos.ctx = ctx;
                oEst = ctx.ESTCONTRATOS.Where(t => t.ID == IdeActa).FirstOrDefault();
                
                IList<RP_CONTRATOS> oRP = ctx.RP_CONTRATOS.Include("INT_DETCUENTA").Where(t => t.COD_CON == oEst.COD_CON).ToList();
                
                //IList<INT_DETCUENTA> ldt = 

                //IList<INT_DETCUENTA> ldt = oRP.Select(t => t.INT_DETCUENTA.Where(tt=>tt.IDACTA==IdeActa).ToList();

                Mapper.CreateMap<RP_CONTRATOS, vRP_ContratosOP>();
                Mapper.Map(oRP, lst);

                
                return oRP;
            }
        }
        
        public vACTASCONTRATO GetActa(int IdeActa)
        {
            vACTASCONTRATO oActa= new vACTASCONTRATO();

            Mapper.CreateMap<ESTCONTRATOS, vACTASCONTRATO>()
                    .ForMember(dest => dest.NOM_ACTA, opt => opt.MapFrom(src => src.ESTADOS.NOM_EST))
                    .ForMember(dest => dest.FEC_ACT, opt => opt.MapFrom(src => src.FEC_ENT))
                    .ForMember(dest => dest.INT_CONTROL_DOC1, opt => opt.MapFrom(src => src.INT_CONTROL_DOC1));

            using (ctx = new Entities()) {
                oEst = ctx.ESTCONTRATOS.Include(t=>t.INT_CONTROL_DOC1).Where(t => t.ID == IdeActa).FirstOrDefault();
                Mapper.CreateMap<INT_CONTROL_DOC, vINT_CONTROL_DOC>();
                
                
                Mapper.Map(oEst, oActa);

                
            }
            return oActa;
        }

        public ByARpt Recibir(vINT_CONTROL_DOC oDto)
        {
            cmdRecibirDoc o = new cmdRecibirDoc { oDto = oDto };
            return o.Enviar();
        }

        public ByARpt Revisar(vINT_CONTROL_DOC oDto)
        {
            cmdRevisarDoc o = new cmdRevisarDoc { oDto = oDto };
            return o.Enviar();
        }
        
        //Tramitar
        public ByARpt UpdateRpOp(List<vRP_ContratosOP> lst, decimal id_ctrdoc, string usuario)
        {
            cmdTramitarDoc oTram = new cmdTramitarDoc();
            oTram.ID_DOC = id_ctrdoc;
            oTram.USUARIO = usuario;
            oTram.lstOP = lst;
            return oTram.Enviar();
        }

        
        class cmdRecibirDoc : absTemplate
        {
            private ESTCONTRATOS ec = null;
            public vINT_CONTROL_DOC oDto { get; set; }
            private INT_CONTROL_DOC oEnt { get; set; }

            #region ImplementaciónMetodosAbstractos
            protected override bool esValido()
            {
                //metodo buscar estado de cuenta activo
                ec= ctx.ESTCONTRATOS.Where(t => t.ID == oDto.IDACTA && t.ESTADO == "AC").FirstOrDefault();
                if (ec == null)
                {
                    byaRpt.Mensaje = "No se encontró el acta asociado.";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }
                else {
                    if (ec.INT_CONTROL_DOC1 != null)
                    {
                        if (ec.INT_CONTROL_DOC.EST_DOC == "RE" || ec.INT_CONTROL_DOC.EST_DOC == "AC")
                        {
                            byaRpt.Mensaje = String.Format("El acta N° {0} ya fue recibida", ec.ID);
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                    }
                }
                return true;
            }

           
            protected override void Antes()
            {
                oEnt = new INT_CONTROL_DOC();//Se instancia el Objeto
                oEnt.ID = ObtenerID();
                oEnt.FEC_REC = oDto.FEC_REC;
                oEnt.FEC_REC_SIS = DateTime.Now;
                oEnt.OBS_REC = oDto.OBS_REC;
                oEnt.EST_DOC = "RE"; //Recibido
                oEnt.ETA_DOC = "CT"; //Recibido
                oEnt.USAP_REC = oDto.USAP_REC;
                oEnt.IDACTA = ec.ID;
                ec.INT_CONTROL_DOC = oEnt;//Se relaciona objeto actual
                //ctx.SaveChanges();
                byaRpt.Mensaje = "Se Agregó el Registro";
                byaRpt.id = oEnt.ID.ToString();
                byaRpt.Error = false;
            }
            #endregion

            #region MetodosPrivados
            private int ObtenerID()
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
 
            #endregion

        }

        class cmdRevisarDoc : absTemplate
        {
            private ESTCONTRATOS ec = null;
            public vINT_CONTROL_DOC oDto { get; set; }
            private INT_CONTROL_DOC oEnt { get; set; }

            #region ImplementaciónMetodosAbstractos
            protected override bool esValido()
            {
                //metodo buscar estado de cuenta activo
                oEnt = ctx.INT_CONTROL_DOC.Find(oDto.ID);
                if (oEnt == null)
                {
                    byaRpt.Mensaje = "No se encontró el registro asociado.";
                    byaRpt.Error = true;
                    return !byaRpt.Error;

                }
                else
                {
                  if (oEnt.EST_DOC == "DE" )
                  {
                            byaRpt.Mensaje = String.Format("El acta N° {0} ya fue devueta", ec.ID);
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                  }
                  if(oEnt.EST_DOC == "AC")
                  {
                            byaRpt.Mensaje = String.Format("El acta N° {0} ya fue tramitada", ec.ID);
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                  }
                }
                return true;
            }


            protected override void Antes()
            {
                oEnt.FEC_REV = oDto.FEC_REV;
                oEnt.FEC_REV_SIS = DateTime.Now;
                oEnt.OBS_REV = oDto.OBS_REV;
                oEnt.EST_DOC = "DE"; //Recibido
                oEnt.USAP_REV = oDto.USAP_REV;
                oEnt.USAP_MOD = oDto.USAP_REV;
                oEnt.FEC_MOD = oDto.FEC_MOD;
                ctx.Entry(oEnt).State = EntityState.Modified;
                ctx.SaveChanges();
                byaRpt.Mensaje = "Se Realizó la operación";
                byaRpt.id = oEnt.ID.ToString();
                byaRpt.Error = false;
            }
            #endregion

            #region MetodosPrivados
            private int ObtenerID()
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

            #endregion

        }
        
        class cmdTramitarDoc : absTemplate
        {
            public decimal ID_DOC{get; set;}
            public string USUARIO { get; set; }
            private ESTCONTRATOS ec { get; set; }
            public List<vRP_ContratosOP> lstOP{get;set;}
            private List<INT_DETCUENTA> odet { get; set; }
            private INT_CONTROL_DOC oEnt { get; set; }
            
            #region ImplementaciónMetodosAbstractos
            protected override bool esValido()
            {
                //metodo buscar estado de cuenta activo
                oEnt = ctx.INT_CONTROL_DOC.Find(ID_DOC);
                if (oEnt == null)
                {
                    byaRpt.Mensaje = "No se encontró el registro asociado.";
                    byaRpt.Error = true;
                    return !byaRpt.Error;

                }
                else
                {
                    decimal? sumaOp = lstOP.Sum(t => t.VAL_OP);
                    if (oEnt.ESTCONTRATOS1.VAL_PAGO != sumaOp) {
                        byaRpt.Mensaje = String.Format("La suma total de las Ordenes de Pago No coincide con el valor autorizado ");
                        byaRpt.Error = true;
                        return !byaRpt.Error;
                    }
                    if (oEnt.EST_DOC == "DE")
                    {
                        byaRpt.Mensaje = String.Format("El acta N° {0} ya fue devueta", oEnt.IDACTA+"-"+oEnt.ID.ToString());
                        byaRpt.Error = true;
                        return !byaRpt.Error;
                    }
                    /*if (oEnt.EST_DOC == "AC")
                    {
                        byaRpt.Mensaje = String.Format("El acta N° {0} ya fue tramitada", oEnt.IDACTA+"-"+oEnt.ID.ToString());
                        byaRpt.Error = true;
                        return !byaRpt.Error;
                    }*/
                }
                return true;
            }


            protected override void Antes()
            {
                UpdateDetCuenta();
                //INT_DETCUENTA e = ctx.INT_DETCUENTA.Where(t => t.ID_CTRDOC == ID_DOC);
                decimal id = ObtenerID();
                foreach (vRP_ContratosOP item in lstOP) 
                {
                    INT_DETCUENTA idc = ctx.INT_DETCUENTA.Where(t => t.NRO_RP == item.NRO_RP && t.IDACTA == oEnt.ESTCONTRATOS1.ID).FirstOrDefault();
                    if (idc == null)
                    {
                        idc = new INT_DETCUENTA();
                        idc.ID = id;
                        id = id + 1;
                        idc.FEC_REG = DateTime.Now;
                        idc.USAP = USUARIO;
                        idc.VIG_RP = (short)item.FEC_RP.Year;
                        idc.NRO_RP = item.NRO_RP;
                        idc.IDACTA = oEnt.ESTCONTRATOS1.ID;
                        oEnt.INT_DETCUENTA.Add(idc);
                    }
                    else {
                        idc.FEC_MOD = DateTime.Now;
                        idc.USAPM = USUARIO;
                    }
                      //solo actualilizar los datos de la op
                      idc.FEC_OP = item.FEC_OP;
                      idc.FEC_CAU= item.FEC_OP;
                      idc.NRO_OP = item.NRO_OP;
                      idc.VAL_OP= item.VAL_OP;
                      
                }
                byaRpt.Mensaje = "Se Realizó la operación";
                byaRpt.id = oEnt.ID.ToString();
                byaRpt.Error = false;
            }

            private void UpdateDetCuenta()
            {
                oEnt.FEC_REV = DateTime.Now;
                oEnt.FEC_REV_SIS = DateTime.Now;
                oEnt.EST_DOC = "AC"; //Recibido
                oEnt.USAP_REV = USUARIO;
                oEnt.USAP_MOD = USUARIO;
                oEnt.FEC_MOD = DateTime.Now;
                ctx.Entry(oEnt).State = EntityState.Modified;
            }
            #endregion

            #region MetodosPrivados
            private int ObtenerID()
            {
                int m;
                try
                {
                    m = (int)ctx.INT_DETCUENTA.Max(t => t.ID) + 1;
                }
                catch
                {
                    m = 1;
                }
                return m;
            }

            #endregion

        }


        public ByARpt UpdateRpOpEg(List<vRP_ContratosOP> lst, decimal id_ctrdoc, string usuario)
        {
            cmdTramEgreso oTram = new cmdTramEgreso();
            oTram.ID_DOC = id_ctrdoc;
            oTram.USUARIO = usuario;
            oTram.lstOP = lst;
            return oTram.Enviar();
        }
        

        class cmdTramEgreso : absTemplate
        {
            public decimal ID_DOC { get; set; }
            public string USUARIO { get; set; }
            private ESTCONTRATOS ec { get; set; }
            public List<vRP_ContratosOP> lstOP { get; set; }
            private List<INT_DETCUENTA> odet { get; set; }
            private INT_CONTROL_DOC oEnt { get; set; }

            #region ImplementaciónMetodosAbstractos
            protected override bool esValido()
            {
                //metodo buscar estado de cuenta activo
                oEnt = ctx.INT_CONTROL_DOC.Find(ID_DOC);
                if (oEnt == null)
                {
                    byaRpt.Mensaje = "No se encontró el registro asociado.";
                    byaRpt.Error = true;
                    return !byaRpt.Error;

                }
                return true;
            }

            protected override void Antes()
            {
                UpdateDetCuenta();
                foreach (vRP_ContratosOP item in lstOP)
                {
                    INT_DETCUENTA idc = ctx.INT_DETCUENTA.Where(t => t.NRO_RP == item.NRO_RP && t.IDACTA == oEnt.IDACTA).FirstOrDefault();
                    if (idc != null)
                    {
                        idc.NRO_EGR = item.NRO_EGR;
                        idc.FEC_EGR = item.FEC_EGR;
                        idc.FEC_MOD = DateTime.Now;
                        idc.USAPM = USUARIO;
                    }
                }
                byaRpt.Mensaje = "Se Realizó la operación";
                byaRpt.id = oEnt.ID.ToString();
                byaRpt.Error = false;
            }

            private void UpdateDetCuenta()
            {
                oEnt.FEC_REV = DateTime.Now;
                oEnt.FEC_REV_SIS = DateTime.Now;
                oEnt.EST_DOC = "TR"; //Recibido
                oEnt.USAP_REV = USUARIO;
                oEnt.USAP_MOD = USUARIO;
                oEnt.FEC_MOD = DateTime.Now;
                ctx.Entry(oEnt).State = EntityState.Modified;
            }
            #endregion

            #region MetodosPrivados
            private int ObtenerID()
            {
                int m;
                try
                {
                    m = (int)ctx.INT_DETCUENTA.Max(t => t.ID) + 1;
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



     
}
