using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ByA;
using Entidades;
using BLL;
using Entidades.VistasGC;

namespace BLL.CGestion
{
    public class CGRegGestionBLL
    {
        Entities ctx;
        ByARpt byaRpt = new ByARpt();
        public vACTASCONTRATO oActa{get;set;}

        public ByARpt Insert(vACTAINICIO oActaInicio){
            cmdActaInicio o = new cmdActaInicio { oActaInicio = oActaInicio };
            return o.Enviar();
        }

        public ByARpt Insert(vActaParcialDto oActa)
        {
            cmdActaParcial o = new cmdActaParcial { oActaP = oActa };
            return o.Enviar();
        }
        
        public IList<ESTADOS> GetRutaActas(string cod_con)
        {
            IList<ESTADOS> lstE=null;
            using (ctx = new Entities())
            {
                CONTRATOS Cont = ctx.CONTRATOS.Where(c => c.COD_CON.Equals(cod_con)).FirstOrDefault();
                if (Cont!=null) { 
                ESTADOS Est = ctx.ESTADOS.Where(t => t.COD_EST.Equals(Cont.EST_CON)).Single();
                lstE= Est.ESTADOS1.ToList();// El Estado 1, sera el siguiente
                }
                return lstE;
            }
        }

        public IList<vEstContratos> GetActas(string cod_con)
        {
            using (ctx = new Entities())
            {
                var lst = from ec in ctx.ESTCONTRATOS
                          where ec.COD_CON == cod_con && ec.ESTADO=="AC"
                          orderby ec.ID, ec.FEC_ENT
                          select (new vEstContratos {
                              ID = ec.ID,
                              COD_EST= ec.EST_FIN,
                              NRO_DOC = ec.NRO_DOC,
                              NOM_EST=ec.ESTADOS.NOM_EST,  
                              FEC_ENT=ec.FEC_ENT,
                              NVISITAS= ec.NVISITAS,
                              POR_EJE_FIS= ec.POR_EJE_FIS,
                              VAL_PAGO = ec.VAL_PAGO,
                          });

                             
                return lst.ToList();
            }
        }

        //public ByARpt Anular(int Ide_Acta)
        //{
        //    using (ctx = new Entities())
        //    {
        //        try
        //        {
        //            ESTCONTRATOS ec = ctx.ESTCONTRATOS.Where(t => t.ID == Ide_Acta).FirstOrDefault();
        //            if (ec != null) {
        //                CONTRATOS oContrato = ctx.CONTRATOS.Where(t => t.COD_CON == ec.COD_CON).FirstOrDefault();
        //                oContrato.EST_CON = ec.EST_INI;//Se Devuelve al Ultimo
        //                ec.ESTADO = "IN"; //    INACTIVA EL ACTA
        //                ctx.SaveChanges();
        //                byaRpt.Mensaje = "Se Anuló el Registro!!!";
        //                byaRpt.Error = false;
        //            }
        //        }
        //        catch (System.Data.Entity.Validation.DbEntityValidationException ex)
        //        {
        //            AdminException(byaRpt, ex);
        //        }
        //        catch (Exception ex)
        //        {
        //            AdminException(byaRpt, ex);

        //        }
        //        return byaRpt;
        //    }
        //}

        //public ByARpt Update(ESTCONTRATOS ec)
        //{
        //    ByARpt byaRpt = new ByARpt();
        //    using (ctx = new Entities()) {
        //        try
        //        {
        //            var ecN=ctx.ESTCONTRATOS.Find(ec.ID);
        //            if(ecN!=null){ //Si el Objeto existe
        //                ecN.FEC_ENT=ec.FEC_ENT;//Ojo Verificar
        //                ecN.OBS_EST=ec.OBS_EST;
        //                ecN.VAL_PAGO=ec.VAL_PAGO;
        //                ecN.NVISITAS = ec.NVISITAS;
        //                ecN.POR_EJE_FIS = ec.POR_EJE_FIS;
        //                ctx.Entry(ecN).State = EntityState.Modified;
        //                ctx.SaveChanges();
                        
        //                byaRpt.Mensaje="Se Actualizó el Registro";
        //                byaRpt.Error = false;
        //            }
        //            else{
        //                byaRpt.Mensaje="Se Intentó Actualizar un registro que no se encontró en la base de datos";
        //                byaRpt.Error = false;
        //            }
        //        }
        //        catch (System.Data.Entity.Validation.DbEntityValidationException ex)
        //        {
        //            AdminException(byaRpt, ex);
        //        }
        //        catch (Exception ex)
        //        {
        //            AdminException(byaRpt, ex);    
        //        }
        //        return byaRpt; 
        //        }
        //} 
        
    }

    [Serializable]
    public class vEstContratos {
        public int ID { get; set; }
        public string COD_EST { get; set; }
        public int? NRO_DOC {get; set;}
        public string NOM_EST { get; set; }
        public DateTime FEC_ENT { get; set; }
        public string sFEC_ENT { 
            get{ 
                return FEC_ENT.ToShortDateString();
            }
        }
        public int? NVISITAS {get; set;}
        public decimal? POR_EJE_FIS {get; set;}
        public decimal? VAL_PAGO {get; set;}
    }

    class cmdActaInicio : absTemplate
    {
        private CONTRATOS oContrato=null;
        private ESTCONTRATOS ec=null;
        public vACTAINICIO oActaInicio{get; set;}
        private vACTASCONTRATO oActa{get;set;}

        #region ImplementaciónMetodosAbstractos
        protected override bool esValido()
        {
            oActa = oActaInicio;//Se asignan el objeto con todos los datos.
            ObtenerContrato();
            if (!ExisteContrato())
            {
                byaRpt.Mensaje = "Se Agregó el Registro";
                byaRpt.Error = false;
            }
            else
            {
                ec = new ESTCONTRATOS();//Se instancia el Objeto
                ec.COD_CON = oActaInicio.COD_CON;
                ec.EST_INI = oContrato.EST_CON;
                ec.EST_FIN = oActaInicio.EST_FIN;
                ec.FEC_ENT = oActaInicio.FEC_ACT;
                ec.FEC_FIN = oActaInicio.FEC_FIN;
                ec.OBS_EST = oActaInicio.OBS_EST;
                ec.FEC_REG = DateTime.Now;
                ec.NRO_DOC = ObtenerNroDoc();
                ec.ID = ObtenerID();
                ec.ESTADO = "AC";
                ObtenerNroDoc();
                ec.USUARIO = oActaInicio.USUARIO;
            }
            //VALIDAR 
            // LA FECHA DEBE SER MAYOR O IGUAL A LA FECHA DE: RP,  FEC_APR_POL o MAYOR A ULTIMA ACTTA
            if (ValidarFechaAndUltEst() && ValidarValor())
            {
                byaRpt.Mensaje = "Ya el Funcionario Tiene Asignado esta Solicitud";
                byaRpt.Error = true;
                return !byaRpt.Error;
            }
            else
            {
                return true;
            }

        }

        private int ObtenerID()
        {
            int m;
            try
            {
                m = (int) ctx.ESTCONTRATOS.Max(t => t.ID) + 1;
            }
            catch
            {
                m = 1;
            }
            return m;
        }
        
        protected override void Antes()
        {
            oContrato.EST_CON = ec.EST_FIN;//Se Actualiza el Contrato.
            ctx.ESTCONTRATOS.Add(ec);
            ctx.SaveChanges();
            byaRpt.Mensaje = "Se Agregó el Registro";
            byaRpt.id = ec.ID.ToString();
            byaRpt.Error = false;
        }
        #endregion

        #region MetodosPrivados
            private int ObtenerNroDoc()
        {
            int m;
            try
            {
                m =(int)ctx.ESTCONTRATOS.Where(t => t.COD_CON == oActa.COD_CON & t.ESTADO == "AC" && t.EST_FIN == oActa.EST_FIN).Max(t => t.NRO_DOC);
            }
            catch
            {
                m = 0;
            }
            return m + 1;
        }

            private bool ExisteContrato()
        {
            return oContrato != null;
        }

            private void ObtenerContrato()
            {
            oContrato = ctx.CONTRATOS.Where(t => t.COD_CON == oActa.COD_CON).FirstOrDefault();//Se con
            }

            private bool ValidarValor()
            {
                //Validar el Valor del Contrato con la Sumatoria de todos los pagos.
                decimal totVvalor = ctx.ESTCONTRATOS.Where(t => t.COD_CON == oActa.COD_CON & t.ESTADO == "AC").Sum(t => t.VAL_PAGO).Value;
                if (oActa.VAL_PAGO > (oContrato.VAL_APO_GOB + oContrato.VAL_ADI - totVvalor))
                {
                    byaRpt.Mensaje = String.Format("El Valor a Autorizar: {0} Supera el Saldo del Contrato {1}.", oActa.VAL_PAGO, (oContrato.VAL_APO_GOB + oContrato.VAL_ADI) - totVvalor);
                    byaRpt.Error = true;
                }
                return byaRpt;
            }

            private bool ValidarFechaAndUltEst()
        {
            if (oContrato != null)
            {
                if (oContrato.FEC_APR_POL > oActa.FEC_ACT)
                {  //El Acta debe ser mayor o igual a la fecha de aprobación de la poliza
                    byaRpt.Mensaje = String.Format("Error Fecha de Acta: {0} debe ser mayor a la Fecha Aprobación de la Poliza{1}.", oActa.FEC_ACT.ToShortDateString(), oContrato.FEC_APR_POL.ToString());
                    byaRpt.Error = true;
                }
            }
            RP_CONTRATOS rp = ctx.RP_CONTRATOS.Where(t => t.COD_CON == oActa.COD_CON & t.DOC_SOP == oActa.COD_CON).OrderByDescending(t => t.FEC_RP).FirstOrDefault();
            if (rp != null)
            {
                if (rp.FEC_RP > oActa.FEC_ACT)//El Acta debe ser mayor o igual a la fecha del ultimo RP asociado al contratp
                {
                    byaRpt.Mensaje = String.Format("Error Fecha de Acta: {0} debe ser mayor a la Fecha del Registro Presupuestal {1}.", oActa.FEC_ACT.ToShortDateString(), rp.FEC_RP.ToShortDateString());
                    byaRpt.Error = true;
                }
            }
            ESTCONTRATOS actaUlt = ctx.ESTCONTRATOS.Where(t => t.COD_CON == oActa.COD_CON & t.ESTADO == "AC").OrderByDescending(t => t.FEC_ENT).FirstOrDefault();
            if (actaUlt != null)
            {
                if (actaUlt.FEC_ENT > oActa.FEC_ACT)//El Acta debe ser mayor o igual a la fecha del ultimo RP asociado al contratp
                {
                    byaRpt.Mensaje = String.Format("Error Fecha de Acta: {0} debe ser mayor del Ultimo Acta {1}.", oActa.FEC_ACT.ToShortDateString(), actaUlt.FEC_ENT.ToShortDateString());
                    byaRpt.Error = true;
                }
                else if (actaUlt.EST_FIN != oActa.EST_INI)
                {
                    byaRpt.Mensaje = String.Format("El Ultimo acta: {0} no coincide con el Acta Anterior {1}.", actaUlt.EST_FIN, oActa.EST_INI);
                    byaRpt.Error = true;
                }

            }
            return byaRpt;
        }
        #endregion

    }
    

    class cmdActaParcial : absTemplate
    {
        private CONTRATOS oContrato=null;
        private ESTCONTRATOS ec=null;
        public vActaParcialDto oActaP{get; set;}
        private vACTASCONTRATO oActa{get;set;}
        private INT_INFOCONT oINFO=null;

        #region ImplementaciónMetodosAbstractos
        protected override bool esValido()
        {
            oActa = oActaP;//Se asignan el objeto con todos los datos.
            ObtenerContrato();
            oINFO = ctx.INT_INFOCONT.Find(oActa.IDE_INF);

            if (oINFO==null)
            {
                byaRpt.Mensaje = "El informe no se encuentra en la base de datos.";
                byaRpt.Error = false;
            }
            else if (oContrato==null)
            {
                byaRpt.Mensaje = "No existe el contrato";
                byaRpt.Error = false;
            }
            else
            {
                ec = new ESTCONTRATOS();//Se instancia el Objeto
                ec.COD_CON = oActa.COD_CON;
                ec.EST_INI = oContrato.EST_CON;
                ec.EST_FIN = oActa.EST_FIN;
                ec.FEC_ENT = oActa.FEC_ACT;
                ec.VAL_PAGO = oActaP.VAL_PAGO;
                //ec.FEC_FIN = oActa.FEC_FIN;
                ec.OBS_EST = oActa.OBS_EST;
                ec.FEC_REG = DateTime.Now;
                ec.NRO_DOC = ObtenerNroDoc();
                ec.ID = ObtenerID();
                ec.ESTADO = "AC";
                ObtenerNroDoc();
                ec.USUARIO = oActa.USUARIO;
                oINFO.ID_ACTA = ec.ID;
                oINFO.EST_INF = "RV";
            }
            //VALIDAR 
            // LA FECHA DEBE SER MAYOR O IGUAL A LA FECHA DE: RP,  FEC_APR_POL o MAYOR A ULTIMA ACTTA
            if (ValidarFechaAndUltEst() && ValidarValor())
            {
                byaRpt.Mensaje = "Ya el Funcionario Tiene Asignado esta Solicitud";
                byaRpt.Error = true;
                
                return byaRpt.Error;
            }
            else
            {
                return true;
            }

        }

        private int ObtenerID()
        {
            int m;
            try
            {
                m = (int) ctx.ESTCONTRATOS.Max(t => t.ID) + 1;
            }
            catch
            {
                m = 1;
            }
            return m;
        }
        protected override void Antes()
        {
            oContrato.EST_CON = ec.EST_FIN;//Se Actualiza el Contrato.
            
            ACTAPARCIAL ap= new ACTAPARCIAL();
            ap.AUT_PAG = oActaP.AUT_PAG;
            ap.FEC_PFIN = oActaP.FEC_PFIN;
            ap.FEC_PINI = oActaP.FEC_PINI;
            
            ap.FEC_REG = DateTime.Now;
            ap.USAP = oActaP.USUARIO;

            ec.ACTAPARCIAL = ap;
            ec.INT_INFOCONT.Add(oINFO);//se le relacioná el acta
            ctx.ESTCONTRATOS.Add(ec);
            ctx.SaveChanges();
            
            
            byaRpt.Mensaje = "Se Agregó el Registro";
            byaRpt.id = ec.ID.ToString();
            byaRpt.Error = false;
        }
        #endregion

        #region MetodosPrivados
        
        private int ObtenerNroDoc()
        {
            int m;
            try
            {
                m =(int)ctx.ESTCONTRATOS.Where(t => t.COD_CON == oActa.COD_CON & t.ESTADO == "AC" && t.EST_FIN == oActa.EST_FIN).Max(t => t.NRO_DOC);
            }
            catch
            {
                m = 0;
            }
            return m + 1;
        }

        private bool ExisteContrato()
        {
            return oContrato != null;
        }

        private void ObtenerContrato()
            {
            oContrato = ctx.CONTRATOS.Where(t => t.COD_CON == oActa.COD_CON).FirstOrDefault();//Se con
            }

        private bool ValidarValor()
        {
            //Validar el Valor del Contrato con la Sumatoria de todos los pagos.
            decimal totVvalor=0;
            try
            {
               totVvalor  = ctx.ESTCONTRATOS.Where(t => t.COD_CON == oActa.COD_CON & t.ESTADO == "AC" && t.VAL_PAGO != null).Sum(t => t.VAL_PAGO).Value;
            }
            catch {
                totVvalor = 0;
            }
                if (oActa.VAL_PAGO > (oContrato.VAL_APO_GOB + oContrato.VAL_ADI - totVvalor))
                {
                    byaRpt.Mensaje = String.Format("El Valor a Autorizar: {0} Supera el Saldo del Contrato {1}.", oActa.VAL_PAGO, (oContrato.VAL_APO_GOB + oContrato.VAL_ADI) - totVvalor);
                    byaRpt.Error = true;
                }
                return byaRpt;
        }

        private bool ValidarFechaAndUltEst()
        {
            if (oContrato != null)
            {
                if (oContrato.FEC_APR_POL > oActa.FEC_ACT)
                {  //El Acta debe ser mayor o igual a la fecha de aprobación de la poliza
                    byaRpt.Mensaje = String.Format("Error Fecha de Acta: {0} debe ser mayor a la Fecha Aprobación de la Poliza{1}.", oActa.FEC_ACT.ToShortDateString(), oContrato.FEC_APR_POL.ToString());
                    byaRpt.Error = true;
                }
            }
            RP_CONTRATOS rp = ctx.RP_CONTRATOS.Where(t => t.COD_CON == oActa.COD_CON & t.DOC_SOP == oActa.COD_CON).OrderByDescending(t => t.FEC_RP).FirstOrDefault();
            if (rp != null)
            {
                if (rp.FEC_RP > oActa.FEC_ACT)//El Acta debe ser mayor o igual a la fecha del ultimo RP asociado al contratp
                {
                    byaRpt.Mensaje = String.Format("Error Fecha de Acta: {0} debe ser mayor a la Fecha del Registro Presupuestal {1}.", oActa.FEC_ACT.ToShortDateString(), rp.FEC_RP.ToShortDateString());
                    byaRpt.Error = true;
                }
            }
            ESTCONTRATOS actaUlt = ctx.ESTCONTRATOS.Where(t => t.COD_CON == oActa.COD_CON & t.ESTADO == "AC").OrderByDescending(t => t.FEC_ENT).FirstOrDefault();
            if (actaUlt != null)
            {
                if (actaUlt.FEC_ENT > oActa.FEC_ACT)//El Acta debe ser mayor o igual a la fecha del ultimo RP asociado al contratp
                {
                    byaRpt.Mensaje = String.Format("Error Fecha de Acta: {0} debe ser mayor del Ultimo Acta {1}.", oActa.FEC_ACT.ToShortDateString(), actaUlt.FEC_ENT.ToShortDateString());
                    byaRpt.Error = true;
                }
                else if (actaUlt.EST_FIN != oActa.EST_INI)
                {
                    byaRpt.Mensaje = String.Format("El Ultimo acta: {0} no coincide con el Acta Anterior {1}.", actaUlt.EST_FIN, oActa.EST_INI);
                    byaRpt.Error = true;
                }

            }
            return byaRpt;
        }
        #endregion

    }

    
}
