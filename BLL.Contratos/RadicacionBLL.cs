using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using Entidades.Contratos;

namespace BLL.Contratos
{
    public class RadicacionBLL
    {
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }

        private void MapearEstPrev() {
            Mapper.CreateMap<EP_CLAUSULAS, vEP_CLAUSULAS_DTO>()
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false));

            Mapper.CreateMap<EP_PROYECTOS, vEP_ProyectosDTO>()
                .ForMember(dest => dest.NOMBRE_PROYECTO, opt => opt.MapFrom(src => src.PROYECTOS.NOMBRE_PROYECTO))
                .ForMember(dest => dest.ES_ANULAR, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_NUEVO, opt => opt.MapFrom(src => false))
                ;

            Mapper.CreateMap<EP_CDP, vEP_CDP_DTO>()
                .ForMember(dest => dest.ES_ANULAR, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_NUEVO, opt => opt.MapFrom(src => false))
                ;

            Mapper.CreateMap<EP_FORMA_PAGO, vEP_FORMA_PAGO_DTO>()
                .ForMember(dest => dest.NOM_TIP_FPAG, opt => opt.MapFrom(src => src.TIPO_PAGO.DES_PAGO))
                .ForMember(dest => dest.ES_ANULAR, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_NUEVO, opt => opt.MapFrom(src => false))
                ;

            Mapper.CreateMap<EP_POLIZAS2, vEP_POLIZAS2_DTO>()
                .ForMember(dest => dest.NOM_POL, opt => opt.MapFrom(src => src.POLIZAS.NOM_POL))
                .ForMember(dest => dest.ES_ANULAR, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_NUEVO, opt => opt.MapFrom(src => false))
                ;

            Mapper.CreateMap<ESTPREV, vESTPREV>()
                        .ForMember(dest => dest.l_EP_PROYECTOS, opt => opt.MapFrom(src => src.EP_PROYECTOS))
                        .ForMember(dest => dest.l_EP_CDP, opt => opt.MapFrom(src => src.EP_CDP))
                        .ForMember(dest => dest.l_EP_FORMA_PAGO, opt => opt.MapFrom(src => src.EP_FORMA_PAGO))
                        .ForMember(dest => dest.l_EP_POLIZAS2, opt => opt.MapFrom(src => src.EP_POLIZAS2))
                        .ForMember(dest => dest.l_EP_CLAUSULAS, opt => opt.MapFrom(src => src.EP_CLAUSULAS.OrderBy(x => x.ORDEN)))
                        .ForMember(dest => dest.TIP_CON_EP, opt => opt.MapFrom(src => src.SUBTIPOS.TIPOSCONT.COD_TIP))
                        ;

        }
        private void MapearContratos()
        {

            Mapper.CreateMap<CPROYECTOS, vEP_ProyectosDTO>()
                .ForMember(dest => dest.COD_PRO, opt => opt.MapFrom(src => src.PROYECTOS.PROYECTO))
                .ForMember(dest => dest.NOMBRE_PROYECTO, opt => opt.MapFrom(src => src.PROYECTOS.NOMBRE_PROYECTO))
                .ForMember(dest => dest.ES_ANULAR, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_NUEVO, opt => opt.MapFrom(src => false))
                ;

            Mapper.CreateMap<C_RUBROS_CDP, vEP_RUBROS_CDP_DTO>()
                .ForMember(dest => dest.NOM_RUB, opt => opt.MapFrom(src => src.RUBROS.DES_RUB))
                .ForMember(dest => dest.ES_ANULAR, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_NUEVO, opt => opt.MapFrom(src => false))
                ;

            Mapper.CreateMap<CDP_CONTRATOS, vEP_CDP_DTO>()
                .ForMember(dest => dest.EP_RUBROS_CDP, opt => opt.MapFrom(src => src.C_RUBROS_CDP))
                .ForMember(dest => dest.ES_ANULAR, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_NUEVO, opt => opt.MapFrom(src => false))
                ;

            Mapper.CreateMap<C_FORMA_PAGO, vEP_FORMA_PAGO_DTO>()
                .ForMember(dest => dest.NOM_TIP_FPAG, opt => opt.MapFrom(src => src.TIPO_PAGO.DES_PAGO))
                .ForMember(dest => dest.ES_ANULAR, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_NUEVO, opt => opt.MapFrom(src => false))
                ;

            Mapper.CreateMap<C_POLIZAS2, vEP_POLIZAS2_DTO>()
                .ForMember(dest => dest.NOM_POL, opt => opt.MapFrom(src => src.POLIZAS.NOM_POL))
                .ForMember(dest => dest.ES_ANULAR, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.ES_NUEVO, opt => opt.MapFrom(src => false))
                ;
            //
            //.ForMember(dest => dest.l_EP_CLAUSULAS, opt => opt.MapFrom(src => src.EP_CLAUSULAS.OrderBy(x => x.ORDEN)))
            Mapper.CreateMap<CONTRATOS, vCONTRATOS>()
                        .ForMember(dest => dest.l_EP_PROYECTOS, opt => opt.MapFrom(src => src.CPROYECTOS))
                        .ForMember(dest => dest.l_EP_CDP, opt => opt.MapFrom(src => src.CDP_CONTRATOS))
                        .ForMember(dest => dest.l_EP_FORMA_PAGO, opt => opt.MapFrom(src => src.C_FORMA_PAGO))
                        .ForMember(dest => dest.l_EP_POLIZAS2, opt => opt.MapFrom(src => src.C_POLIZAS2))
                        ;
        }
        public RadicacionBLL()
        {
            
        }
        public vESTPREV GetPK(string num_pro)
        {
            MapearEstPrev();
            vESTPREV Reg = new vESTPREV();

            ESTPREV ep = null;
            using (ctx = new Entities())
            {
                
                var proc = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == num_pro).FirstOrDefault();
                var sol = ctx.PSOLICITUDES.Where(t => t.COD_SOL == proc.NUM_SOL).FirstOrDefault();

                ep = ctx.ESTPREV.Where(t => t.CODIGO_EP == sol.COD_EP).FirstOrDefault<ESTPREV>();
                
                if (ep != null)
                {
                    Mapper.Map(ep, Reg);
                }
                return Reg;
            }
        }
        public vCONTRATOS GetContratos(string cod_con) {
            MapearContratos();
            vCONTRATOS Reg = new vCONTRATOS();
            CONTRATOS cto = null;
            using (ctx = new Entities())
            {
                cto = ctx.CONTRATOS.Where(t => t.COD_CON == cod_con).FirstOrDefault();
                if (cto != null)
                {
                    Mapper.Map(cto, Reg);
                }
                return Reg;
            }
        }
        public ByARpt Insert(vCONTRATOS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vCONTRATOS Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt InsertEst(vCONTRATOS Reg)
        {
            cmdInsertEst o = new cmdInsertEst();
            o.oDto = Reg;
            return o.Enviar();
        }
        public vCONTRATOS_ULT GetUltimos(short vigencia, string tip_con)
        {
            using (ctx = new Entities()) {
                vCONTRATOS_ULT ncv = ctx.CONTRATOS.Where(t => t.TIP_CON == tip_con && t.VIG_CON == vigencia).OrderByDescending(t => t.FEC_SUS_CON).ThenByDescending(t=> t.FEC_REG)
                    .Select(
                    t => new vCONTRATOS_ULT { 
                         COD_CON=t.COD_CON,
                          COD_TIP=t.TIP_CON,
                           FEC_SUS_CON= t.FEC_SUS_CON,
                            VIG_CON=t.VIG_CON
                    }
                    )
                    .FirstOrDefault();
                return ncv;
            }
        
        }
    }
    class cmdInsert : absTemplate
    {
        private CONTRATOS cto = null;
        public vCONTRATOS oDto { get; set; }
        private PCONTRATOS pc;
        private DEPENDENCIA Ddel;
        private decimal ultId_cdp_rubros { get; set; }
        #region ImplementaciónMetodosAbstractos

        protected override bool esValido()
        {
            if (esValidoProceso())
            {
                //fechad e suscripcio pertenece a la vigencia
                if (oDto.FEC_SUS_CON.Year != oDto.VIG_CON)
                {
                    byaRpt.Mensaje = "La fecha de suscripción no corresponde con la vigencia";
                    byaRpt.Error = true;
                    return false;
                }

                CONTRATOS ult = ctx.CONTRATOS.Where(t => t.TIP_CON == oDto.TIP_CON && t.VIG_CON == oDto.VIG_CON).OrderByDescending(t => t.FEC_SUS_CON).FirstOrDefault();
                if (ult != null)
                {
                    if (ult.FEC_SUS_CON > oDto.FEC_SUS_CON)
                    {
                        byaRpt.Mensaje = "La Ultima Fecha de Suscripción para este Tipo de Contratos es " + ult.FEC_SUS_CON.ToShortDateString();
                        byaRpt.Error = true;
                        return false;
                    }
                }
                return true;
            }
            else {
                return false;
            }


        }

        private bool esValidoProceso() {

            Ddel = ctx.DEPENDENCIA.Where(t => t.COD_DEP == oDto.DEP_PCON).FirstOrDefault();
            if (Ddel.INT_PRO == "S")
            {
                pc = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == oDto.PRO_SEL_NRO).FirstOrDefault();
                if (pc == null)
                {
                    byaRpt.Mensaje = "El proceso no existe en el sistema";
                    byaRpt.Error = true;
                    return false;
                }
                else
                {
                    if (pc.COD_TPRO != oDto.COD_TPRO)
                    {
                        byaRpt.Mensaje = "No coincide con la Modalidad del Proceso, por Favor Verificar";
                        byaRpt.Error = true;
                        return false;
                    }
                    if (!(pc.EST_CON == "AD") || (pc.EST_CON == "CE"))
                    {
                        byaRpt.Mensaje = "El sistema esta Integrado con el Módulo de Procesos/Cronograma, el proceso debe estar en estado Adjudicado " + oDto.PRO_SEL_NRO;
                        byaRpt.Error = true;
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
            }
            else {
                return true;
            }

        }

        private void PonerEnCelebrado() {
            if (Ddel.INT_PRO == "S") { 
                PCRONOGRAMAS pcrono = ctx.PCRONOGRAMAS.Where(t=>t.EST_PROC=="CE" && t.NUM_PROC==oDto.NUM_PROC).FirstOrDefault();
                if(pcrono!=null){
                    pcrono.EST_ACT="0003";
                    pcrono.OBS_SEG = "Se actualizó automáticamente al Radicar el Contrato";
                    pcrono.USAP_MOD = oDto.USUARIO;
                    pcrono.FEC_MOD = DateTime.Now;
                }
            }
        }

        protected override void Antes()
        {
            cto = new CONTRATOS();

            ultId_cdp_rubros = 0;
            try
            {
                ultId_cdp_rubros = ctx.C_RUBROS_CDP.Max(t => t.ID);
            }
            catch { }

            cto.OBJ_CON = oDto.OBJ_CON;
            cto.PLA_EJE_CON = oDto.PLA_EJE_CON;
            cto.TIPO_PLAZO = oDto.TIPO_PLAZO;
            cto.PLAZO2_EJE_CON = oDto.PLAZO2_EJE_CON;
            cto.TIPO_PLAZO2 = oDto.TIPO_PLAZO2;
            cto.LUG_EJE = oDto.LUG_EJE;
            //ep.PLIQ_EP = oDto.PLIQ_EP;

            cto.VAL_APO_GOB = oDto.VAL_APO_GOB;
            cto.VAL_CON = oDto.VAL_CON;

            //ep.IDE_DIL_EP = oDto.IDE_DIL_EP;
            cto.TIP_CON = oDto.TIP_CON;
            cto.EST_CON = "99";
            cto.DEP_CON = oDto.DEP_CON;
            cto.STIP_CON = oDto.STIP_CON;
            cto.FEC_SUS_CON = oDto.FEC_SUS_CON;
            //ep.FEC_MOD_EP = oDto.;
            //ep.USAP_MOD_EP = oDto.USAP_MOD_EP;
            cto.DEP_SUP = oDto.DEP_SUP;
            //ep.CAR_SUP_EP = oDto.CAR_SUP_EP;
            cto.VIG_CON = oDto.VIG_CON;

            //ep.GRUPO = oDto.GRUPO;
            cto.NEMPLEOS = oDto.NEMPLEOS;
            //ep.IDE_RES_EP = oDto.IDE_RES_EP;

            cto.COD_TPRO = oDto.COD_TPRO;
            cto.DEP_PCON = oDto.DEP_PCON;


            //ep.TIPO_FP = oDto.TIPO_FP;
            //ep.ANTI_PORC = oDto.ANTI_PORC;
            //cto.PER_APO = oDto.PER_APO;

            //ep.OBLIGC = oDto.OBLIGC;
            //ep.OBLIGE = oDto.OBLIGE;
            cto.TIP_FOR = "CON FORMALIDAD";
            cto.IDE_CON = oDto.IDE_CON;
            cto.IDE_REP = oDto.IDE_REP;

            cto.COD_SEC = "000";
            cto.NUM_PROC = oDto.NUM_PROC;
            cto.INTERVENTORIA = oDto.INTERVENTORIA;
            
            cto.ANTI_PORC = oDto.ANTI_PORC;
            if (oDto.ANTI_PORC > 0)
                cto.ANTICIPO = "1";
            else
                cto.ANTICIPO = "0";

            cto.OBLIGE =oDto.OBLIGE;
            cto.OBLIGC = oDto.OBLIGC;
            cto.PLIQ_EP = oDto.PLIQ_EP;
            cto.TIPO_FP = oDto.TIPO_FP;
        
        //cto.OBLIGC= oDto.OBLI

            //ep.ENPLANC_EP = oDto.ENPLANC_EP;
            NROCONVIG consec = ctx.NROCONVIG.Where(t => t.YEAR_VIG == oDto.VIG_CON && t.COD_TIP == oDto.TIP_CON).FirstOrDefault();
            consec.NRO_ACT_CON++;
            cto.NRO_CON = (int)consec.NRO_ACT_CON;
            string COD_CON = oDto.VIG_CON + oDto.TIP_CON + ByAUtil.Right("0000" + consec.NRO_ACT_CON.ToString(), 4);

            cto.COD_CON = COD_CON;
            cto.PRO_SEL_NRO = oDto.NUM_PROC;
            cto.TIP_RADICACION = oDto.TIP_RADICACION;
            cto.USUARIO = oDto.USUARIO;
            cto.FEC_REG = DateTime.Now;
            byaRpt.id = cto.COD_CON;
            
            mProyectos(COD_CON);
            mCDP(COD_CON);
            //delFormaPago();
            mFormaPago(COD_CON);
            mPolizas(COD_CON);
            ctx.Entry(consec).State = EntityState.Modified;
            ctx.Entry(cto).State = EntityState.Added;            
            PonerEnCelebrado();

        }
                
        private void mProyectos(string COD_CON)
        {
            CPROYECTOS ep_pry;
            decimal ultId = 0;
            try
            {
                ultId = ctx.CPROYECTOS.Max(t => t.ID);
            }
            catch { }
            foreach (vEP_ProyectosDTO pry in oDto.l_EP_PROYECTOS.Where(t => t.ES_ANULAR || (t.ES_NUEVO && !t.ES_ANULAR)))
            {
                if (pry.ES_ANULAR)
                {
                    ep_pry =  cto.CPROYECTOS.Where(t => t.PROYECTO == pry.COD_PRO).FirstOrDefault();
                    if (ep_pry != null)
                    {
                        ctx.Entry(ep_pry).State = EntityState.Deleted;
                    }
                }
                if (pry.ES_NUEVO && !pry.ES_ANULAR)
                {                   

                    ep_pry = new CPROYECTOS();
                    ultId++;
                    ep_pry.ID = ultId;
                    ep_pry.FEC_REG = DateTime.Now;
                    ep_pry.PROYECTO = pry.COD_PRO;
                    ep_pry.USAP = oDto.USUARIO;
                    ep_pry.COD_CON = COD_CON;
                    ctx.CPROYECTOS.Add(ep_pry);
                }
            }
        }

        private void mCDP(string COD_CON)
        {
            CDP_CONTRATOS ep_cdp;
            foreach (vEP_CDP_DTO dto in oDto.l_EP_CDP)
            {
                if (!dto.ES_NUEVO && dto.ES_ANULAR)
                {
                    ep_cdp = cto.CDP_CONTRATOS.Where(t => t.NRO_CDP == dto.NRO_CDP).FirstOrDefault();
                    if (ep_cdp != null)
                    {
                        ctx.Entry(ep_cdp).State = EntityState.Deleted;
                    }
                }
                if (dto.ES_NUEVO && !dto.ES_ANULAR)
                {
                    ep_cdp = new CDP_CONTRATOS();
                    ep_cdp.NRO_CDP = dto.NRO_CDP;
                    ep_cdp.FEC_CDP = dto.FEC_CDP;
                    ep_cdp.VAL_CDP = dto.VAL_CDP;
                    ep_cdp.VIG_FUT = dto.VIG_FUT;
                    ep_cdp.COD_CON = COD_CON;
                    cto.CDP_CONTRATOS.Add(ep_cdp);
                    mRubrosCDPs(dto.EP_RUBROS_CDP, COD_CON);
                }
                if (!dto.ES_NUEVO && !dto.ES_ANULAR) //MODIFICAR
                {
                    ep_cdp = cto.CDP_CONTRATOS.Where(t => t.NRO_CDP == dto.NRO_CDP).FirstOrDefault();
                    if (ep_cdp != null)
                    {
                        ep_cdp.NRO_CDP = dto.NRO_CDP;
                        ep_cdp.FEC_CDP = dto.FEC_CDP;
                        ep_cdp.VAL_CDP = dto.VAL_CDP;
                        ep_cdp.COD_CON = COD_CON;
                        ep_cdp.VIG_FUT = dto.VIG_FUT;
                        //ep_cdp.USAP_MOD = oDto.USAP_ELA_EP;
                        ctx.Entry(ep_cdp).State = EntityState.Modified;
                        
                    }
                }
            }
        }

        private void mRubrosCDPs(List<vEP_RUBROS_CDP_DTO> lRubros, string COD_CON)
        {
            C_RUBROS_CDP rubro;            
            foreach (vEP_RUBROS_CDP_DTO item in lRubros)
            {
                rubro = new C_RUBROS_CDP();
                ultId_cdp_rubros++;
                rubro.ID = ultId_cdp_rubros;
                rubro.NRO_CDP = item.NRO_CDP;
                rubro.COD_RUB = item.COD_RUB;
                rubro.VALOR = item.VALOR;
                rubro.VIG_CDP = item.VIG_CDP;
                rubro.COD_CON = COD_CON;
                rubro.FEC_REG = DateTime.Now;
                ctx.C_RUBROS_CDP.Add(rubro);
            }

        }
        
        private void delFormaPago()
        {
            vEP_FORMA_PAGO_DTO dto;
            foreach (C_FORMA_PAGO ent in cto.C_FORMA_PAGO)
            {
                dto = oDto.l_EP_FORMA_PAGO.Where(t => t.ID == ent.ID).FirstOrDefault();
                if (dto == null)
                {
                    ctx.Entry(ent).State = EntityState.Deleted;
                }
            }
        }

        private void mFormaPago(string COD_CON)
        {
            C_FORMA_PAGO ep_fp;
            decimal ultId = 0;
            try
            {
                ultId = ctx.C_FORMA_PAGO.Max(t => t.ID);
            }
            catch { }
            foreach (vEP_FORMA_PAGO_DTO fp in oDto.l_EP_FORMA_PAGO.Where(t => t.ES_ANULAR || (t.ES_NUEVO && !t.ES_ANULAR)))
            {
                if (fp.ES_ANULAR)
                {
                    ep_fp = cto.C_FORMA_PAGO.Where(t => t.ID == fp.ID).FirstOrDefault();
                    if (ep_fp != null)
                    {
                        ctx.Entry(ep_fp).State = EntityState.Deleted;
                    }
                }
                if (fp.ES_NUEVO && !fp.ES_ANULAR)
                {
                    ep_fp = new C_FORMA_PAGO();
                    ultId = ultId + 1;
                    ep_fp.ID = ultId;
                    ep_fp.ORD_FPAG = fp.ORD_FPAG;
                    ep_fp.PGEN_FPAG = fp.PGEN_FPAG;
                    ep_fp.TIP_FPAG = fp.TIP_FPAG;
                    ep_fp.POR_FPAG = fp.POR_FPAG;
                    ep_fp.VAL_FPAG = fp.VAL_FPAG;
                    ep_fp.USAP_REG = oDto.USUARIO;
                    ep_fp.CON_FPAG = fp.CON_FPAG;
                    ep_fp.CAN_PAG = fp.CAN_PAG;
                    ep_fp.COD_CON = COD_CON;
                    ep_fp.FEC_REG = DateTime.Now;
                    cto.C_FORMA_PAGO.Add(ep_fp);
                }
            }
        }

        private void mPolizas(string COD_CON)
        {
            C_POLIZAS2 ent;
            decimal ultId = 0;
            try
            {
                ultId = ctx.C_POLIZAS2.Max(t => t.ID);
            }
            catch { }
            foreach (vEP_POLIZAS2_DTO dto in oDto.l_EP_POLIZAS2)
            {

                if (dto.ES_NUEVO && !dto.ES_ANULAR)
                {
                    ultId = ultId + 1;
                    ent = new C_POLIZAS2();
                    ent.ID = ultId;
                    ent.GRUPO = dto.GRUPO;
                    ent.PLA_POL = dto.PLA_POL;
                    ent.VAL_POL = dto.VAL_POL;
                    ent.COD_POL = dto.COD_POL;
                    ent.DES_POL = dto.DES_POL;
                    ent.COD_CON = COD_CON;
                    cto.C_POLIZAS2.Add(ent);
                }
                if (dto.ES_ANULAR && !dto.ES_NUEVO)
                {
                    ent = cto.C_POLIZAS2.Where(t => t.ID == dto.ID).FirstOrDefault();
                    if (ent != null)
                    {
                        ctx.Entry(ent).State = EntityState.Deleted;
                    }
                }
                if (!dto.ES_ANULAR && !dto.ES_NUEVO) //Actualizar datos
                {
                    ent = cto.C_POLIZAS2.Where(t => t.ID == dto.ID).FirstOrDefault();
                    if (ent != null)
                    {
                        ent.GRUPO = dto.GRUPO;
                        ent.PLA_POL = dto.PLA_POL;
                        ent.VAL_POL = dto.VAL_POL;
                        ent.COD_POL = dto.COD_POL;
                        ent.DES_POL = dto.DES_POL;
                        ctx.Entry(ent).State = EntityState.Modified;
                    }
                }

            }
        }

        
        #endregion


    }
    class cmdUpdate : absTemplate
    {
        private CONTRATOS cto = null;
        public vCONTRATOS oDto { get; set; }

        #region ImplementaciónMetodosAbstractos

        protected override bool esValido()
        {
            //fechad e suscripcio pertenece a la vigencia
            // elproceso es valido
            //ultima fecha de suscripcion
            // actuaizar nro consecutivo
            // poner en celebrado el rpceso
            return true;


        }

        protected override void Antes()
        {

            cto = ctx.CONTRATOS.Where(t => t.COD_CON == oDto.COD_CON).FirstOrDefault();
            if (cto != null)
            {
                cto.OBJ_CON = oDto.OBJ_CON;
                cto.PLA_EJE_CON = oDto.PLA_EJE_CON;
                cto.TIPO_PLAZO = oDto.TIPO_PLAZO;
                cto.PLAZO2_EJE_CON = oDto.PLAZO2_EJE_CON;
                cto.TIPO_PLAZO2 = oDto.TIPO_PLAZO2;
                cto.LUG_EJE = oDto.LUG_EJE;
                //ep.PLIQ_EP = oDto.PLIQ_EP;
                cto.VAL_APO_GOB = oDto.VAL_APO_GOB;
                cto.VAL_CON = oDto.VAL_CON;
                //ep.IDE_DIL_EP = oDto.IDE_DIL_EP;
                cto.TIP_CON = oDto.TIP_CON;
                cto.DEP_CON = oDto.DEP_CON;
                cto.STIP_CON = oDto.STIP_CON;
                cto.FEC_SUS_CON = oDto.FEC_SUS_CON;
                cto.FEC_ULT_MOD = DateTime.Now;
                //ep.FEC_MOD_EP = oDto.;
                //ep.USAP_MOD_EP = oDto.USAP_MOD_EP;
                cto.DEP_SUP = oDto.DEP_SUP;
                //ep.CAR_SUP_EP = oDto.CAR_SUP_EP;
                cto.VIG_CON = oDto.VIG_CON;
                //ep.GRUPO = oDto.GRUPO;
                cto.NEMPLEOS = oDto.NEMPLEOS;
                //ep.IDE_RES_EP = oDto.IDE_RES_EP;
                cto.COD_TPRO = oDto.COD_TPRO;
                cto.DEP_PCON = oDto.DEP_PCON;
                //ep.TIPO_FP = oDto.TIPO_FP;
                //ep.ANTI_PORC = oDto.ANTI_PORC;
                //cto.PER_APO = oDto.PER_APO;
                //ep.OBLIGC = oDto.OBLIGC;
                if (oDto.EST_CON == "00") cto.EST_CON = oDto.EST_CON;
                //ep.OBLIGE = oDto.OBLIGE;
                cto.TIP_FOR = "CON FORMALIDAD";
                cto.IDE_CON = oDto.IDE_CON;
                cto.IDE_REP = oDto.IDE_REP;
                cto.COD_SEC = "000";
                cto.NUM_PROC = oDto.NUM_PROC;
                cto.INTERVENTORIA = oDto.INTERVENTORIA;
                cto.PRO_SEL_NRO = oDto.NUM_PROC;
                byaRpt.id = cto.COD_CON;

                cto.ANTI_PORC = oDto.ANTI_PORC;
                cto.OBLIGE = oDto.OBLIGE;
                cto.OBLIGC = oDto.OBLIGC;
                cto.PLIQ_EP = oDto.PLIQ_EP;
                cto.TIPO_FP = oDto.TIPO_FP;
                cto.USUARIO = oDto.USUARIO;
                if (oDto.ANTI_PORC > 0)
                    cto.ANTICIPO = "1";
                else
                    cto.ANTICIPO = "0";
                mProyectos();
                mCDP();
                delFormaPago();
                mFormaPago();
                
                mPolizas();
                

                ctx.Entry(cto).State = EntityState.Modified;
            }
        }

        private void mProyectos()
        {
            List<CPROYECTOS> lProyectosOld = ctx.CPROYECTOS.Where(t => t.COD_CON == cto.COD_CON).ToList();
            foreach (CPROYECTOS item in lProyectosOld)
            {
                bool ban = true;
                foreach (vEP_ProyectosDTO item2 in oDto.l_EP_PROYECTOS)
                {
                    if (item.ID == item2.ID) ban = false;
                }
                if (ban)
                {
                    ctx.CPROYECTOS.Remove(item);
                }
            }


            CPROYECTOS ep_pry;
            decimal ult =0;
            try
            {
                ult = ctx.CPROYECTOS.Max(t => t.ID);
            }
            catch {             }
            
            foreach (vEP_ProyectosDTO pry in oDto.l_EP_PROYECTOS.Where(t => t.ES_ANULAR || (t.ES_NUEVO && !t.ES_ANULAR)))
            {
                if (pry.ES_ANULAR)
                {
                    ep_pry = cto.CPROYECTOS.Where(t => t.PROYECTO == pry.COD_PRO).FirstOrDefault();
                    if (ep_pry != null)
                    {
                        ctx.Entry(ep_pry).State = EntityState.Deleted;
                    }
                }
                if (pry.ES_NUEVO && !pry.ES_ANULAR)
                {
                    ep_pry = new CPROYECTOS();
                    ep_pry.ID = ult + 1;
                    ep_pry.FEC_REG = DateTime.Now;
                    ep_pry.PROYECTO = pry.COD_PRO;
                    ep_pry.USAP = oDto.USUARIO;
                    cto.CPROYECTOS.Add(ep_pry);
                    ult = ult + 1;
                }
            }
        }

        private void mRubrosCDPs(List<vEP_RUBROS_CDP_DTO> lRubros, string COD_CON)
        {
            C_RUBROS_CDP rubro;
            decimal ultId = 0;
            try
            {
                ultId = ctx.C_RUBROS_CDP.Max(t => t.ID);
            }
            catch { }
            foreach (vEP_RUBROS_CDP_DTO item in lRubros)
            {
                rubro = new C_RUBROS_CDP();
                ultId++;
                rubro.ID = ultId;
                rubro.NRO_CDP = item.NRO_CDP;
                rubro.COD_RUB = item.COD_RUB;
                rubro.VALOR = item.VALOR;
                rubro.VIG_CDP = item.VIG_CDP;
                rubro.COD_CON = COD_CON;
                rubro.FEC_REG = DateTime.Now;
                ctx.C_RUBROS_CDP.Add(rubro);
            }

        }

        private void mCDP()
        {
            List<CDP_CONTRATOS> lCDPsOld = ctx.CDP_CONTRATOS.Where(t => t.COD_CON == cto.COD_CON).ToList();
            foreach (CDP_CONTRATOS item in lCDPsOld)
            {
                bool ban = true;
                foreach (vEP_CDP_DTO item2 in oDto.l_EP_CDP)
                {
                    if (item.NRO_CDP == item2.NRO_CDP) ban = false;
                }
                if (ban)
                {
                    List<C_RUBROS_CDP> lRubrosEliminar = ctx.C_RUBROS_CDP.Where(t => t.COD_CON == cto.COD_CON && t.NRO_CDP == item.NRO_CDP).ToList();
                    foreach (C_RUBROS_CDP item3 in lRubrosEliminar)
                    {
                        ctx.C_RUBROS_CDP.Remove(item3);
                        ctx.SaveChanges();
                    }
                    ctx.CDP_CONTRATOS.Remove(item);
                }
            }

            CDP_CONTRATOS ep_cdp;
            foreach (vEP_CDP_DTO dto in oDto.l_EP_CDP)
            {
                if (!dto.ES_NUEVO && dto.ES_ANULAR)
                {
                    ep_cdp = cto.CDP_CONTRATOS.Where(t => t.NRO_CDP == dto.NRO_CDP).FirstOrDefault();
                    if (ep_cdp != null)
                    {
                        ctx.Entry(ep_cdp).State = EntityState.Deleted;
                    }
                }
                if (dto.ES_NUEVO && !dto.ES_ANULAR)
                {
                    ep_cdp = new CDP_CONTRATOS();
                    ep_cdp.NRO_CDP = dto.NRO_CDP;
                    ep_cdp.FEC_CDP = dto.FEC_CDP;
                    ep_cdp.VAL_CDP = dto.VAL_CDP;
                    ep_cdp.VIG_FUT = dto.VIG_FUT;
                    cto.CDP_CONTRATOS.Add(ep_cdp);
                    mRubrosCDPs(dto.EP_RUBROS_CDP, cto.COD_CON);
                }
                if (!dto.ES_NUEVO && !dto.ES_ANULAR) //MODIFICAR
                {
                    ep_cdp = cto.CDP_CONTRATOS.Where(t => t.NRO_CDP == dto.NRO_CDP).FirstOrDefault();
                    if (ep_cdp != null)
                    {
                        ep_cdp.NRO_CDP = dto.NRO_CDP;
                        ep_cdp.FEC_CDP = dto.FEC_CDP;
                        ep_cdp.VAL_CDP = dto.VAL_CDP;
                        ep_cdp.VIG_FUT = dto.VIG_FUT;
                        //ep_cdp.USAP_MOD = oDto.USAP_ELA_EP;
                        ctx.Entry(ep_cdp).State = EntityState.Modified;

                    }
                }
            }
        }

        private void delFormaPago()
        {
            List<C_FORMA_PAGO> lFormasPagoOld = ctx.C_FORMA_PAGO.Where(t => t.COD_CON == cto.COD_CON).ToList();
            foreach (C_FORMA_PAGO item in lFormasPagoOld)
            {
                bool ban = true;
                foreach (vEP_FORMA_PAGO_DTO item2 in oDto.l_EP_FORMA_PAGO)
                {
                    if (item.ID == item2.ID) ban = false;
                }
                if (ban)
                {
                    ctx.C_FORMA_PAGO.Remove(item);
                }
            }
        }
        private void mFormaPago()
        {
            C_FORMA_PAGO ep_fp;
            decimal ultId = 0;
            try
            {
                ultId = ctx.C_FORMA_PAGO.Max(t => t.ID);
            }
            catch { }
            foreach (vEP_FORMA_PAGO_DTO fp in oDto.l_EP_FORMA_PAGO.Where(t => t.ES_ANULAR || (t.ES_NUEVO && !t.ES_ANULAR)))
            {
                if (fp.ES_ANULAR)
                {
                    ep_fp = cto.C_FORMA_PAGO.Where(t => t.ID == fp.ID).FirstOrDefault();
                    if (ep_fp != null)
                    {
                        ctx.Entry(ep_fp).State = EntityState.Deleted;
                    }
                }
                if (fp.ES_NUEVO && !fp.ES_ANULAR)
                {
                    ep_fp = new C_FORMA_PAGO();
                    ultId = ultId + 1;
                    ep_fp.ID = ultId;
                    ep_fp.ORD_FPAG = fp.ORD_FPAG;
                    ep_fp.PGEN_FPAG = fp.PGEN_FPAG;
                    ep_fp.TIP_FPAG = fp.TIP_FPAG;
                    ep_fp.POR_FPAG = fp.POR_FPAG;
                    ep_fp.VAL_FPAG = fp.VAL_FPAG;
                    ep_fp.USAP_REG = oDto.USUARIO;
                    ep_fp.CON_FPAG = fp.CON_FPAG;
                    ep_fp.CAN_PAG = fp.CAN_PAG;
                    ep_fp.FEC_REG = DateTime.Now;
                    cto.C_FORMA_PAGO.Add(ep_fp);
                }
            }
        }

        private void mPolizas()
        {
            List<C_POLIZAS2> lPolizasOld = ctx.C_POLIZAS2.Where(t => t.COD_CON == cto.COD_CON).ToList();
            foreach (C_POLIZAS2 item in lPolizasOld)
            {
                bool ban = true;
                foreach (vEP_POLIZAS2_DTO item2 in oDto.l_EP_POLIZAS2)
                {
                    if (item.ID == item2.ID) ban = false;
                }
                if (ban)
                {
                    ctx.C_POLIZAS2.Remove(item);
                }
            }


            C_POLIZAS2 ent;
            decimal ultId = 0;
            try
            {
                ultId = ctx.C_POLIZAS2.Max(t => t.ID);
            }
            catch { }
            foreach (vEP_POLIZAS2_DTO dto in oDto.l_EP_POLIZAS2)
            {

                if (dto.ES_NUEVO && !dto.ES_ANULAR)
                {
                    ultId = ultId + 1;
                    ent = new C_POLIZAS2();
                    ent.ID = ultId;
                    ent.GRUPO = dto.GRUPO;
                    ent.PLA_POL = dto.PLA_POL;
                    ent.VAL_POL = dto.VAL_POL;
                    ent.COD_POL = dto.COD_POL;
                    ent.DES_POL = dto.DES_POL;
                    cto.C_POLIZAS2.Add(ent);
                }
                if (dto.ES_ANULAR && !dto.ES_NUEVO)
                {
                    ent = cto.C_POLIZAS2.Where(t => t.ID == dto.ID).FirstOrDefault();
                    if (ent != null)
                    {
                        ctx.Entry(ent).State = EntityState.Deleted;
                    }
                }
                if (!dto.ES_ANULAR && !dto.ES_NUEVO) //Actualizar datos
                {
                    ent = cto.C_POLIZAS2.Where(t => t.ID == dto.ID).FirstOrDefault();
                    if (ent != null)
                    {
                        ent.GRUPO = dto.GRUPO;
                        ent.PLA_POL = dto.PLA_POL;
                        ent.VAL_POL = dto.VAL_POL;
                        ent.COD_POL = dto.COD_POL;
                        ent.DES_POL = dto.DES_POL;
                        ctx.Entry(ent).State = EntityState.Modified;
                    }
                }

            }
        }

        #endregion


    }

    class cmdInsertEst : absTemplate
    {
        private CONTRATOS cto = null;
        public vCONTRATOS oDto { get; set; }
        private PCONTRATOS pc;
        private DEPENDENCIA Ddel;
        #region ImplementaciónMetodosAbstractos

        protected override bool esValido()
        {
            if (esValidoProceso())
            {
                //fechad e suscripcio pertenece a la vigencia
                if (oDto.FEC_SUS_CON.Year != oDto.VIG_CON)
                {
                    byaRpt.Mensaje = "La fecha de suscripción no corresponde con la vigencia";
                    byaRpt.Error = true;
                    return false;
                }

                CONTRATOS ult = ctx.CONTRATOS.Where(t => t.TIP_CON == oDto.TIP_CON && t.VIG_CON == oDto.VIG_CON).OrderByDescending(t => t.FEC_SUS_CON).FirstOrDefault();
                if (ult != null)
                {
                    if (ult.FEC_SUS_CON > oDto.FEC_SUS_CON)
                    {
                        byaRpt.Mensaje = "La Ultima Fecha de Suscripción para este Tipo de Contratos es " + ult.FEC_SUS_CON.ToShortDateString();
                        byaRpt.Error = true;
                        return false;
                    }
                }
                return true;
            }
            else
            {
                return false;
            }


        }
        private bool esValidoProceso()
        {

            Ddel = ctx.DEPENDENCIA.Where(t => t.COD_DEP == oDto.DEP_PCON).FirstOrDefault();
            if (Ddel.INT_PRO == "S")
            {
                pc = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == oDto.PRO_SEL_NRO).FirstOrDefault();
                if (pc == null)
                {
                    byaRpt.Mensaje = "El proceso no existe en el sistema";
                    byaRpt.Error = true;
                    return false;
                }
                else
                {
                    if (pc.COD_TPRO != oDto.COD_TPRO)
                    {
                        byaRpt.Mensaje = "No coincide con la Modalidad del Proceso, por Favor Verificar";
                        byaRpt.Error = true;
                        return false;
                    }
                    if (!(pc.EST_CON == "AD") || (pc.EST_CON == "CE"))
                    {
                        byaRpt.Mensaje = "El sistema esta Integrado con el Módulo de Procesos/Cronograma, el proceso debe estar en estado Adjudicado " + oDto.PRO_SEL_NRO;
                        byaRpt.Error = true;
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
            }
            else
            {
                return true;
            }

        }
        private void PonerEnCelebrado()
        {
            if (Ddel.INT_PRO == "S")
            {
                PCRONOGRAMAS pcrono = ctx.PCRONOGRAMAS.Where(t => t.EST_PROC == "CE" && t.NUM_PROC == oDto.NUM_PROC).FirstOrDefault();
                if (pcrono != null)
                {
                    pcrono.EST_ACT = "0003";
                    pcrono.OBS_SEG = "Se actualizó automáticamente al Radicar el Contrato";
                    pcrono.USAP_MOD = oDto.USUARIO;
                    pcrono.FEC_MOD = DateTime.Now;
                }
            }
        }
        protected override void Antes()
        {
            cto = new CONTRATOS();

            cto.OBJ_CON = oDto.OBJ_CON;
            cto.PLA_EJE_CON = oDto.PLA_EJE_CON;
            cto.TIPO_PLAZO = oDto.TIPO_PLAZO;
            cto.PLAZO2_EJE_CON = oDto.PLAZO2_EJE_CON;
            cto.TIPO_PLAZO2 = oDto.TIPO_PLAZO2;
            cto.LUG_EJE = oDto.LUG_EJE;
            //ep.PLIQ_EP = oDto.PLIQ_EP;

            cto.VAL_APO_GOB = oDto.VAL_APO_GOB;
            cto.VAL_CON = oDto.VAL_CON;

            //ep.IDE_DIL_EP = oDto.IDE_DIL_EP;
            cto.TIP_CON = oDto.TIP_CON;
            cto.EST_CON = "00";
            cto.DEP_CON = oDto.DEP_CON;
            cto.STIP_CON = oDto.STIP_CON;
            cto.FEC_SUS_CON = oDto.FEC_SUS_CON;
            //ep.FEC_MOD_EP = oDto.;
            //ep.USAP_MOD_EP = oDto.USAP_MOD_EP;
            cto.DEP_SUP = oDto.DEP_SUP;
            //ep.CAR_SUP_EP = oDto.CAR_SUP_EP;
            cto.VIG_CON = oDto.VIG_CON;

            //ep.GRUPO = oDto.GRUPO;
            cto.NEMPLEOS = oDto.NEMPLEOS;
            //ep.IDE_RES_EP = oDto.IDE_RES_EP;

            cto.COD_TPRO = oDto.COD_TPRO;
            cto.DEP_PCON = oDto.DEP_PCON;


            //ep.TIPO_FP = oDto.TIPO_FP;
            //ep.ANTI_PORC = oDto.ANTI_PORC;
            //cto.PER_APO = oDto.PER_APO;

            //ep.OBLIGC = oDto.OBLIGC;
            //ep.OBLIGE = oDto.OBLIGE;
            cto.TIP_FOR = "CON FORMALIDAD";
            cto.IDE_CON = oDto.IDE_CON;
            cto.IDE_REP = oDto.IDE_REP;

            cto.COD_SEC = "000";
            cto.NUM_PROC = oDto.NUM_PROC;
            cto.INTERVENTORIA = oDto.INTERVENTORIA;

            cto.ANTI_PORC = oDto.ANTI_PORC;
            if (oDto.ANTI_PORC > 0)
                cto.ANTICIPO = "1";
            else
                cto.ANTICIPO = "0";

            cto.OBLIGE = oDto.OBLIGE;
            cto.OBLIGC = oDto.OBLIGC;
            cto.PLIQ_EP = oDto.PLIQ_EP;
            cto.TIPO_FP = oDto.TIPO_FP;


            //cto.OBLIGC= oDto.OBLI

            //ep.ENPLANC_EP = oDto.ENPLANC_EP;
            NROCONVIG consec = ctx.NROCONVIG.Where(t => t.YEAR_VIG == oDto.VIG_CON && t.COD_TIP == oDto.TIP_CON).FirstOrDefault();
            consec.NRO_ACT_CON++;
            cto.NRO_CON = (int)consec.NRO_ACT_CON;
            string COD_CON = oDto.VIG_CON + oDto.TIP_CON + ByAUtil.Right("0000" + consec.NRO_ACT_CON.ToString(), 4);

            cto.COD_CON = COD_CON;
            cto.PRO_SEL_NRO = oDto.NUM_PROC;
            cto.TIP_RADICACION = "A";
            cto.USUARIO = oDto.USUARIO;
            cto.FEC_REG = DateTime.Now;
            byaRpt.id = cto.COD_CON;

            mProyectos(COD_CON);
            mCDP(COD_CON);
            mFormaPago(COD_CON);
            mPolizas(COD_CON);

            ctx.Entry(consec).State = EntityState.Modified;
            ctx.Entry(cto).State = EntityState.Added;
            PonerEnCelebrado();
            byaRpt.id = COD_CON;
        }
        private void mProyectos(string COD_CON)
        {
            CPROYECTOS ep_pry;

            decimal ultId = 0;
            try
            {
                ultId = ctx.CPROYECTOS.Max(t => t.ID);
            }
            catch { }

            foreach (vEP_ProyectosDTO pry in oDto.l_EP_PROYECTOS)
            {
                ep_pry = new CPROYECTOS();
                ep_pry.FEC_REG = DateTime.Now;
                ep_pry.PROYECTO = pry.COD_PRO;
                ep_pry.USAP = oDto.USUARIO;
                ep_pry.COD_CON = COD_CON;
                ultId++;
                ep_pry.ID = ultId;
                cto.CPROYECTOS.Add(ep_pry);
            }
        }
        private void mCDP(string COD_CON)
        {
            CDP_CONTRATOS ep_cdp;
            foreach (vEP_CDP_DTO dto in oDto.l_EP_CDP)
            {
                ep_cdp = new CDP_CONTRATOS();
                ep_cdp.NRO_CDP = dto.NRO_CDP;
                ep_cdp.FEC_CDP = dto.FEC_CDP;
                ep_cdp.VAL_CDP = dto.VAL_CDP;
                ep_cdp.COD_CON = COD_CON;
                //ep_cdp.VIG_FUT = dto.VIG_FUT;
                ctx.CDP_CONTRATOS.Add(ep_cdp);
                mRubrosCDPs(dto.EP_RUBROS_CDP, COD_CON);
            }
        }
        private void mRubrosCDPs(List<vEP_RUBROS_CDP_DTO> lRubros, string COD_CON)
        {
            C_RUBROS_CDP rubro;
            decimal ultId = 0;
            try
            {
                ultId = ctx.C_RUBROS_CDP.Max(t => t.ID);
            }
            catch { }
            foreach (vEP_RUBROS_CDP_DTO item in lRubros)
            {
                rubro = new C_RUBROS_CDP();
                ultId++;
                rubro.ID = ultId;
                rubro.NRO_CDP = item.NRO_CDP;
                rubro.COD_RUB = item.COD_RUB;
                rubro.VALOR = item.VALOR;
                rubro.VIG_CDP = item.VIG_CDP;
                rubro.COD_CON = COD_CON;
                rubro.FEC_REG = DateTime.Now;
                ctx.C_RUBROS_CDP.Add(rubro);
            }

        }
        private void mFormaPago(string COD_CON)
        {
            C_FORMA_PAGO ep_fp;
            decimal ultId = 0;
            try
            {
                ultId = ctx.C_FORMA_PAGO.Max(t => t.ID);
            }
            catch { }
            foreach (vEP_FORMA_PAGO_DTO fp in oDto.l_EP_FORMA_PAGO)
            {
                    ep_fp = new C_FORMA_PAGO();
                    ultId = ultId + 1;
                    ep_fp.ID = ultId;
                    ep_fp.ORD_FPAG = fp.ORD_FPAG;
                    ep_fp.PGEN_FPAG = fp.PGEN_FPAG;
                    ep_fp.TIP_FPAG = fp.TIP_FPAG;
                    ep_fp.POR_FPAG = fp.POR_FPAG;
                    ep_fp.VAL_FPAG = fp.VAL_FPAG;
                    ep_fp.USAP_REG = oDto.USUARIO;
                    ep_fp.CON_FPAG = fp.CON_FPAG;
                    ep_fp.CAN_PAG = fp.CAN_PAG;
                    ep_fp.COD_CON = COD_CON;
                    ep_fp.FEC_REG = DateTime.Now;
                    ctx.C_FORMA_PAGO.Add(ep_fp);
            }
        }
        private void mPolizas(string COD_CON)
        {
            C_POLIZAS2 ent;
            decimal ultId = 0;
            try
            {
                ultId = ctx.C_POLIZAS2.Max(t => t.ID);
            }
            catch { }
            foreach (vEP_POLIZAS2_DTO dto in oDto.l_EP_POLIZAS2)
            {
                    ultId = ultId + 1;
                    ent = new C_POLIZAS2();
                    ent.ID = ultId;
                    ent.GRUPO = dto.GRUPO;
                    ent.PLA_POL = dto.PLA_POL;
                    ent.VAL_POL = dto.VAL_POL;
                    ent.COD_POL = dto.COD_POL;
                    ent.DES_POL = dto.DES_POL;
                    ent.COD_CON = COD_CON;
                    ctx.C_POLIZAS2.Add(ent);               
            }
        }
        #endregion
    }
}

