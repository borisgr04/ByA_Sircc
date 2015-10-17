using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Text;
using ByA;
using Entidades;
using Entidades.VistasPROC;

namespace BLL.PROCESOS.Gestion
{
    class mHREVISADO:absBLL
    {
        protected internal ByARpt Insert(HREVISADO hr) {
            cmdInsert o = new cmdInsert { reg = hr };
            return o.Enviar();
        }
        protected internal ByARpt Delete(HREVISADO hr)
        {
            cmdDelete o = new cmdDelete { reg = hr };
            return o.Enviar();
        }
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


        internal string GetProximoNumxMod(string COD_SOL)
        {
            vPSolicitudes Reg = new vPSolicitudes();

            using (ctx = new Entities())
            {
                PSOLICITUDES ps = ctx.PSOLICITUDES.Where(t => t.COD_SOL == COD_SOL).FirstOrDefault();
                cmdRevisar o = new cmdRevisar();
                o.ctx = ctx;
                return o.GetProximoNumero(ps);
            }
        }
        
    }
    class cmdDelete : absTemplate
    {
        public HREVISADO reg { get; set; }
        PSOLICITUDES sol { get; set; }
        protected override bool esValido()
        {
            return true;

        }
        protected override void Antes()
        {
            ctx.Entry(reg).State = EntityState.Deleted;
        }
    }
    class cmdInsert : absTemplate
    {
        public HREVISADO reg { get; set; }
        PSOLICITUDES sol { get; set; }
        protected override bool esValido()
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
        protected override void Antes()
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
            ctx.Entry(sol).State = EntityState.Modified;
            ctx.HREVISADO.Add(reg);

        }
    }
    class cmdAsignar : absTemplate {
        public HREVISADO reg { get; set; }
        PSOLICITUDES sol { get; set; }

        protected override bool esValido()
        {
            sol = ctx.PSOLICITUDES.Find(reg.COD_SOL);
            if (sol.ID_ABOG_ENC == reg.NIT_ABOG_RECIBE)
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
        protected override void Antes()
        {
            decimal ultId, ultIde;
            try { ultId = (decimal)ctx.HREVISADO.Where(t => t.COD_SOL == reg.COD_SOL).Max(t => t.ID_HREV); }
            catch { ultId = 0; }

            //consecutivo general
            try { ultIde = (decimal)ctx.HREVISADO.Max(t => t.IDE); }
            catch { ultIde = 0; }
            //ESTABA EN NULL, PERO SE PASO A P POR QUE COINCIDA CON EL SISTEMA EN FUNCIONAMIENTO, SE SUGIERE DEJAR EN OTRO ESTADO INICIAL
            reg.CONCEPTO_REVISADO = "P";
            reg.IDE = ultIde + 1;
            reg.RECIBIDO_ABOG = "N";
            sol.HREVISADO1 = reg;
            sol.ID_ABOG_ENC = reg.NIT_ABOG_RECIBE;//no seria necesario
            sol.FEC_MOD = DateTime.Now;
            sol.FECHA_ASIGNADO = DateTime.Now;
            sol.USAP_MOD = reg.USAP;
            reg.ID_HREV = ultId + 1;
            byaRpt.id = ultId.ToString();
            ctx.Entry(sol).State = EntityState.Modified;
            ctx.HREVISADO.Add(reg);
            
        }
    }
    class cmdRecibir : absTemplate
    {
        public decimal ide { get; set; }
        public string obs { get; set; }

        protected override void Antes()
        {
            HREVISADO found = ctx.HREVISADO.Find(this.ide);
            found.PSOLICITUDES.FEC_RECIBIDO = DateTime.Now;
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

        protected override void Antes()
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
                        CrearProponente();
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

        private void CrearProponente()
        {
            //Si es CONTRATACION DIRECTA
            //Buscar en estudio Previo.
            ESTPREV ep=ctx.ESTPREV.Where(t => t.CODIGO_EP == ps.COD_EP).FirstOrDefault();
            PPROPONENTESS p = new PPROPONENTESS();
            decimal id;
            Entities ctx3 = new Entities();
            PPROPONENTESS oldPro2 = ctx3.PPROPONENTESS.OrderByDescending(t => t.ID).FirstOrDefault();
            if (oldPro2 == null) id = 1;
            else id = oldPro2.ID + 1;
            if (ep != null)
            {
                //Si es Contratación Directa
                if (ep.TIPOSPROC.COD_TPROC == "TP01")
                {        
                    p.ID = id;
                    p.TIPO_PROP = ep.TERCEROS1.TIPO;
                    p.NUM_PROC = numero;
                    p.FEC_PROP = DateTime.Now;
                    p.VAL_PROP = ep.VAL_ENT_EP + ep.VAL_OTR_EP;
                    p.VAL_SIN_IVA = ep.VAL_ENT_EP + ep.VAL_OTR_EP;
                    p.NUM_FOLIO = 0; // preguntar si este valor se saca de alguna otra parte
                    p.IDE_PROP = ep.IDE_CON_EP;
                    p.TIP_IDE_PROP = ep.TERCEROS1.TIP_IDE;
                    p.EXP_IDE_PROP = ep.TERCEROS1.EXP_IDE;
                    p.DV_PROP = ep.TERCEROS1.DV_TER;
                    p.TIP_PER_PROP = ep.TERCEROS1.TIP_PER;
                    p.APE1_PROP = ep.TERCEROS1.APE1_TER;
                    p.APE2_PROP = ep.TERCEROS1.APE2_TER;
                    p.NOM1_PROP = ep.TERCEROS1.NOM1_TER;
                    p.NOM2_PROP = ep.TERCEROS1.NOM2_TER;
                    p.RAZ_SOC = ep.TERCEROS1.RAZ_SOC;
                    p.DIR_PROP = ep.TERCEROS1.DIR_TER;
                    p.TEL_PROP = ep.TERCEROS1.TEL_TER;
                    p.EMA_PROP = ep.TERCEROS1.EMA_TER;
                    p.FEC_NAC = ep.TERCEROS1.FEC_NAC;
                    p.ADJUDICADO = "S";
                    p.FEC_ADJUDICACION = DateTime.Now;
                    p.OBS_ADJUDICACION = "";
                    p.ESTADO = "AC";
                    p.DENOMINACION = "CONTRATISTA";
                    p.ID_REP_LEGAL = ep.IDE_REP_EP;
                    p.MUNICIPIO = ""; // Preguntar de donde se saca el municipio
                    p.FEC_REG = DateTime.Now;
                    p.APORTES = ""; // preguntar de donde salen los aportes 

                    //Crear por defecto un proponente con adjudicado = 'S'
                    ctx.PPROPONENTESS.Add(p);
                }
            }
            else
            {
                if (ps.COD_TPRO == "TP01")
                {
                    TERCEROS TerceroProp = ctx.TERCEROS.Where(t => t.IDE_TER == ps.IDE_CON).FirstOrDefault();
                    if (TerceroProp != null)
                    {
                        p.ID = id;
                        p.TIPO_PROP = TerceroProp.TIPO;
                        p.NUM_PROC = numero;
                        p.FEC_PROP = DateTime.Now;
                        p.VAL_PROP = ps.VAL_CON;
                        p.VAL_SIN_IVA = ps.VAL_CON;
                        p.NUM_FOLIO = 0; // preguntar si este valor se saca de alguna otra parte
                        p.IDE_PROP = TerceroProp.IDE_TER;
                        p.TIP_IDE_PROP = TerceroProp.TIP_IDE;
                        p.EXP_IDE_PROP = TerceroProp.EXP_IDE;
                        p.DV_PROP = TerceroProp.DV_TER;
                        p.TIP_PER_PROP = TerceroProp.TIP_PER;
                        p.APE1_PROP = TerceroProp.APE1_TER;
                        p.APE2_PROP = TerceroProp.APE2_TER;
                        p.NOM1_PROP = TerceroProp.NOM1_TER;
                        p.NOM2_PROP = TerceroProp.NOM2_TER;
                        p.RAZ_SOC = TerceroProp.RAZ_SOC;
                        p.DIR_PROP = TerceroProp.DIR_TER;
                        p.TEL_PROP = TerceroProp.TEL_TER;
                        p.EMA_PROP = TerceroProp.EMA_TER;
                        p.FEC_NAC = TerceroProp.FEC_NAC;
                        p.ADJUDICADO = "S";
                        p.FEC_ADJUDICACION = DateTime.Now;
                        p.OBS_ADJUDICACION = "";
                        p.ESTADO = "AC";
                        p.DENOMINACION = "CONTRATISTA";
                        p.ID_REP_LEGAL = ps.IDE_CON;
                        p.MUNICIPIO = ""; // Preguntar de donde se saca el municipio
                        p.FEC_REG = DateTime.Now;
                        p.APORTES = ""; // preguntar de donde salen los aportes 

                        //Crear por defecto un proponente con adjudicado = 'S'
                        ctx.PPROPONENTESS.Add(p);
                    }
                }
            }
            //throw new NotImplementedException();
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
                pc.IDE_CON = ps.IDE_CON;
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
                    MFECINI = a.MFECINI,                    
                    MFECFIN = a.MFECFIN,
                    MHORINI = a.MHORINI,
                    MHORFIN = a.MHORFIN,
                    ORDEN = (int) a.ORDEN,
                    ANULADO = "N",
                    TIPO = a.TIPO,
                    TIP_PLA = a.TIP_PLA
                };
                ctx.PCRONOGRAMAS.Add(objCrono);
            }
        }
        public string GetProximoNumero(PSOLICITUDES Sol)
        {
            ps=Sol;
            return CrearNumero();
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
