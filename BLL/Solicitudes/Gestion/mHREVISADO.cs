using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Text;
using BLL.Solicitudes.Vistas;
using ByA;
using Entidades;

namespace BLL.Solicitudes.Gestion
{
    class mHREVISADO:absBLL
    {
        public HREVISADO reg { get; set; }
        PSOLICITUDES sol {get; set;}

        #region Insert

        protected internal override bool esValidoInsert()
        {
           sol= ctx.PSOLICITUDES.Find(reg.COD_SOL);
            if (sol.ID_ABOG_ENC==reg.NIT_ABOG_RECIBE){
                byaRpt.Mensaje="Ya el Funcionario Tiene Asignado esta Solicitud";
                byaRpt.Error=true;
                return byaRpt.Error;
            }
            else{
                return true;
            }
            
        }
        protected internal override void AntesInsert()
        {
            decimal ultId,ultIde;
            try{ultId =(decimal)ctx.HREVISADO.Where(t=>t.COD_SOL==reg.COD_SOL).Max(t => t.ID_HREV);}
            catch{ultId = 0;}

            //consecutivo general
            try { ultIde = (decimal)ctx.HREVISADO.Max(t => t.IDE); }
            catch { ultIde = 0; }
            reg.CONCEPTO_REVISADO = null;
            reg.IDE = ultIde+1;
            reg.RECIBIDO_ABOG = "N";
            sol.HREVISADO1 = reg;
            sol.ID_ABOG_ENC = reg.NIT_ABOG_RECIBE;//no seria necesario

            reg.ID_HREV = ultId + 1;
            byaRpt.id = ultId.ToString();
            ctx.HREVISADO.Add(reg);
            
        }
        //protected override void DespuesInsert();
        #endregion

        protected internal ByARpt Asignar(HREVISADO hr)
        {
            cmdAsignar o=new cmdAsignar { reg = hr };
            return o.Enviar();
        }

        protected internal ByARpt Recibir(decimal ide_hrev, string obs)
        {
            cmdRecibir o = new cmdRecibir { ide = ide_hrev, obs = obs };
            return o.Enviar();
        }
        
        protected internal ByARpt Revisar(vHRevisado phr)
        {
            cmdRevisar o=new cmdRevisar { hr = phr };
            return o.Enviar();
        }

        #region Delete

        protected internal override bool esValidoDelete()
        {
            return true;
        }

        protected internal override void AntesDelete()
        {

            ctx.Entry(reg).State = EntityState.Deleted;
        }
        //protected override void DespuesInsert();
        #endregion

    }

    class cmdAsignar : absTemplate {
        public HREVISADO reg { get; set; }
        PSOLICITUDES sol { get; set; }

        protected internal override bool esValido()
        {
            sol = ctx.PSOLICITUDES.Find(reg.COD_SOL);
            if (sol.ID_ABOG_ENC == reg.NIT_ABOG_RECIBE)
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
        protected internal override void Antes()
        {
            decimal ultId, ultIde;
            try { ultId = (decimal)ctx.HREVISADO.Where(t => t.COD_SOL == reg.COD_SOL).Max(t => t.ID_HREV); }
            catch { ultId = 0; }

            //consecutivo general
            try { ultIde = (decimal)ctx.HREVISADO.Max(t => t.IDE); }
            catch { ultIde = 0; }
            reg.CONCEPTO_REVISADO = null;
            reg.IDE = ultIde + 1;
            reg.RECIBIDO_ABOG = "N";
            sol.HREVISADO1 = reg;
            sol.ID_ABOG_ENC = reg.NIT_ABOG_RECIBE;//no seria necesario

            reg.ID_HREV = ultId + 1;
            byaRpt.id = ultId.ToString();
            ctx.HREVISADO.Add(reg);
            
        }
    }
    class cmdRecibir : absTemplate
    {
        public decimal ide { get; set; }
        public string obs { get; set; }

        protected internal override void Antes()
        {
            var found = ctx.HREVISADO.Find(this.ide);
            if (found != null)
            {
                found.CONCEPTO_REVISADO = "P";
                found.FEC_REC_ABOG = DateTime.Now;
                found.OBS_RECIBIDO_ABOG = this.obs;
                found.RECIBIDO_ABOG = "S";
            }
            else
            {
                throw new Exception("No se encontro el registró");
            }
        }
    }
    class cmdRevisar : absTemplate
    {
        public vHRevisado hr { get; set; }
        
        private CONS_PROC cp;
        string numero="";
        PSOLICITUDES ps;
        PCONTRATOS pc;
        HREVISADO found;

        bool hayProceso
        {
            get
            {
                return !String.IsNullOrEmpty(numero);
            }
        }

        protected internal override void Antes()
        {
            found = ctx.HREVISADO.Find(hr.IDE);
            if (found != null)
            {
                MapearHrToFound();
                if (found.CONCEPTO_REVISADO == "A")
                {
                    ps = found.PSOLICITUDES;
                    CrearNumero();
                    if (hayProceso)
                    {
                        CrearProceso();
                        UpdateConsecutivo();
                        CrearActividades();
                        byaRpt.id = numero;
                    }
                    else
                        throw new Exception("No se pudo crear el consecutivo");
                }

            }
            else
            {
                throw new Exception("No se encontro el registró");
            }
        }

        private void MapearHrToFound()
        {
            found.CONCEPTO_REVISADO = hr.CONCEPTO_REVISADO;
            found.FECHA_REVISADO = DateTime.Now;
            found.OBS_REVISADO = hr.OBS_REVISADO;
            found.HOBS_REVISADO = String.Format("Usuario: {0} {1} {2} <br><hr>", found.NIT_ABOG_RECIBE, DateTime.Now.ToShortDateString(), hr.OBS_REVISADO, found.HOBS_REVISADO);
            ctx.Entry(found).State = EntityState.Modified;
        }

        private void CrearProceso()
        {
            //crear numeo de consecutivo
            pc = new PCONTRATOS();
            if (hayProceso)
            {
                pc.COD_TPRO = ps.COD_TPRO;
                pc.PRO_SEL_NRO = numero;
                pc.OBJ_CON = ps.OBJ_SOL;
                pc.DEP_CON = ps.DEP_SOL;
                pc.DEP_PCON = ps.DEP_PSOL;
                pc.VIG_CON = ps.VIG_SOL;
                pc.TIP_CON = ps.TIP_CON;
                pc.ESTADO = "TR";//estado de tramita, de diligenciamiento de datos
                pc.STIP_CON = ps.STIP_CON;
                pc.FECHARECIBIDO = ps.FEC_RECIBIDO;
                pc.NUM_SOL = ps.COD_SOL;
                pc.EST_CON = "SI"; //estado del cronograma de contratación.
                pc.VAL_CON = (decimal)ps.VAL_CON;
                pc.VAL_APO_GOB = (decimal)ps.VAL_CON;
                pc.USUENCARGADO = found.NIT_ABOG_RECIBE;
                pc.NRO_CON = (int)(cp.SIGUIENTE - 1);
                cp.SIGUIENTE = cp.SIGUIENTE + 1;
                pc.USUARIO = hr.NIT_ABOG_RECIBE;
                pc.NUMGRUPOS = 1;
                ctx.PCONTRATOS.Add(pc);//se crea proceso
            }
        }

        private void UpdateConsecutivo()
        {
            ctx.Entry(cp).State = EntityState.Modified; //se actualiza numeacion
        }

        private void CrearActividades()
        {
            string vig = ps.VIG_SOL.ToString();
            List<PACTIVIDADES> lact = ctx.PACTIVIDADES.Where(t => t.VIGENCIA == vig && t.COD_TPRO == ps.COD_TPRO && t.OBLIGATORIO == "SI").ToList();
            decimal id=ctx.PCRONOGRAMAS.Max(t => t.ID);
            foreach (PACTIVIDADES a in lact)
            {
                id++;
                PCRONOGRAMAS objCrono = new PCRONOGRAMAS
                {
                    COD_ACT = a.COD_ACT,
                    COD_TPRO = a.COD_TPRO,
                    EST_ACT = "0000",
                    EST_PROC = a.EST_PROC,
                    FEC_REG = DateTime.Now,
                    ID = id,
                    NOM_ACT = a.NOM_ACT,
                    NOTIFICAR = a.NOTIFICAR,
                    NUM_PROC = pc.PRO_SEL_NRO,
                    OBLIGATORIO = a.OBLIGATORIO,
                    OCUPADO = a.OCUPADO,
                    USAP = pc.USUARIO,
                    UBICACION = a.UBICACION,
                };
                ctx.PCRONOGRAMAS.Add(objCrono);
            }
        }

        private string CrearNumero()
        {
            //ERROR AL NO EXISTIR CONSECUTIVOS PARA ESE 
            cp = ctx.CONS_PROC.Where(t => t.VIGENCIA == ps.VIG_SOL && t.TIP_PROC == ps.COD_TPRO && t.DEP_DEL == ps.DEP_PSOL).FirstOrDefault();
            numero = "";
            if (cp != null)
            {
                numero = String.Format("{0}-{1}-{2}-{3}", cp.TIPOSPROC.ABRE_TPROC, cp.DEPENDENCIA.DEP_ABR, cp.SIGUIENTE.ToString().PadLeft(4, '0'), cp.VIGENCIA);
            }
            return numero;
        }
    }

 
}
