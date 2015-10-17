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
using System.Data.Entity;
using Entidades.Vistas;
using RestSharp;
using Newtonsoft.Json;
using BLL.EstPrev.Gestion;
using AgenteServicio;

namespace BLL.EstPrev
{
    public class EstPrevBLL
    {
        public EstPrevBLL()
        {
            Mapper.CreateMap<ESTPREV, vESTPREV>();
            Mapper.CreateMap<vESTPREV, vESTPREV_CONSULTA>();
        }
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }
        public string username { get; set; }
        public List<vESTPREV_CONSULTA> GetFiltros(CONSULTA_EP_DTO Filtros)
        {
            using (ctx = new Entities())
            {                
                List<vESTPREV> rEstPrev = new List<vESTPREV>();
                List<ESTPREV> estprev;
                if ((Filtros.SIPRODUCTO == false) && (Filtros.SINUMEROESTUDIOPREVIO == false) && (Filtros.SIMODALIDAD == false) && (Filtros.SIESTADO == false) && (Filtros.SIDEPENDENCIA == false) && (Filtros.SIPROYECTO == false) && (Filtros.SIFECHADESDE == false) && (Filtros.SIFECHAHASTA == false) && (Filtros.SICUANTIA == false) && (Filtros.SIOBJETO == false))
                {
                    estprev = ctx.ESTPREV.ToList();
                }
                else
                {
                    if (Filtros.SINUMEROESTUDIOPREVIO) estprev = ctx.ESTPREV.Where(t => t.CODIGO_EP == Filtros.NUMEROESTUDIOPREVIO).ToList();
                    else
                    {
                        bool PrimerFiltro = false;
                        //string query = "select * from estprev, ep_proyectos, ep_unspsc ";
                        string query = "select * from estprev ";

                        // Filtro de proyectos
                        if (Filtros.SIPROYECTO)
                        {
                            if (PrimerFiltro) query = query + " and ";
                            else query = query + " where ";
                            //query = query + " estprev.id = ep_proyectos.id_ep and ep_proyectos.COD_PRO = '" + Filtros.PROYECTO + "' ";
                            query = query + " estprev.id in (select ep_proyectos.id_ep from ep_proyectos where ep_proyectos.cod_pro = '" + Filtros.PROYECTO + "' ) ";
                            PrimerFiltro = true;
                        }

                        // Filtro de productos o servicios por codigos UNSPSC
                        if (Filtros.SIPRODUCTO)
                        {
                            if (PrimerFiltro) query = query + " and ";
                            else query = query + " where ";
                            //query = query + " estprev.id = ep_unspsc.ID_EP and ep_unspsc.UNSPSC = '" + Filtros.PRODUCTO + "' ";
                            query = query + " estprev.id in (select ep_unspsc.id_ep from ep_unspsc where ep_unspsc.UNSPSC = '" + Filtros.PRODUCTO + "' ) ";
                            PrimerFiltro = true;
                        }

                        // Filtro de modalidades
                        if (Filtros.SIMODALIDAD)
                        {
                            if (PrimerFiltro) query = query + " and ";
                            else query = query + " where ";
                            query = query + " MOD_SEL_EP = '" + Filtros.MODALIDAD + "' ";
                            PrimerFiltro = true;
                        }

                        // Filtro de dependencias
                        if (Filtros.SIDEPENDENCIA)
                        {
                            if (PrimerFiltro) query = query + " and ";
                            else query = query + " where ";
                            query = query + " DEP_NEC_EP = '" + Filtros.DEPENDENCIA + "' ";
                            PrimerFiltro = true;
                        }

                        // Filtro de fecha inicio  de elaboracion
                        if (Filtros.SIFECHADESDE)
                        {
                            if (PrimerFiltro) query = query + " and ";
                            else query = query + " where ";
                            query = query + " FEC_ELA_EP >= to_date('" + Filtros.FECHADESDE + "','yyyy/mm/dd') ";
                            PrimerFiltro = true;
                        }

                        // Filtro de fecha final de elaboracion
                        if (Filtros.SIFECHAHASTA)
                        {
                            if (PrimerFiltro) query = query + " and ";
                            else query = query + " where ";
                            query = query + " FEC_ELA_EP <= to_date('" + Filtros.FECHAHASTA + "','yyyy/mm/dd') ";
                            PrimerFiltro = true;
                        }

                        // Filtro de estado
                        if (Filtros.SIESTADO)
                        {
                            if (PrimerFiltro) query = query + " and ";
                            else query = query + " where ";
                            query = query + " EST_EP = '" + Filtros.ESTADO + "' ";
                            PrimerFiltro = true;
                        }

                        // Filtro de cuantia
                        if (Filtros.SICUANTIA)
                        {
                            if (PrimerFiltro) query = query + " and ";
                            else query = query + " where ";
                            if (Filtros.CUANTIA == "1") query = query + " VAL_ENT_EP >= '0' and VAL_ENT_EP <= '100000000' ";
                            if (Filtros.CUANTIA == "2") query = query + " VAL_ENT_EP >= '100000001' and VAL_ENT_EP <= '300000000' ";
                            if (Filtros.CUANTIA == "3") query = query + " VAL_ENT_EP >= '300000001' and VAL_ENT_EP <= '500000000' ";
                            if (Filtros.CUANTIA == "4") query = query + " VAL_ENT_EP >= '500000001' and VAL_ENT_EP <= '1000000000' ";
                            if (Filtros.CUANTIA == "5") query = query + " VAL_ENT_EP >= '1000000001' ";
                            PrimerFiltro = true;
                        }

                        // Filtro de objeto
                        if (Filtros.SIOBJETO)
                        {
                            if (PrimerFiltro) query = query + " and ";
                            else query = query + " where ";
                            query = query + " upper(OBJE_EP) like  upper('%" + Filtros.OBJETO + "%') ";
                            PrimerFiltro = true;
                        }

                        estprev = ctx.ESTPREV.SqlQuery(query).ToList();
                        //estprev = ctx.ESTPREV.SqlQuery("select * from estprev, ep_proyectos, ep_unspsc where estprev.id = ep_proyectos.id_ep and ep_proyectos.COD_PRO = '10-820175-00066' and estprev.id = ep_unspsc.ID_EP and ep_unspsc.UNSPSC = '10101501' and MOD_SEL_EP = 'TP01' and DEP_NEC_EP = '06' and FEC_ELA_EP >= to_date('01-02-2015','dd/mm/yyyy') and FEC_ELA_EP <= to_date('18-02-2015','dd/mm/yyyy') and EST_EP = 'EL' and VAL_ENT_EP >= '0' and VAL_ENT_EP <= '100000000' and CODIGO_EP = '150201-015' and upper(OBJE_EP) like  upper('%tUaL%')").ToList();
                    }
                }
                Mapper.Map(estprev,rEstPrev);
                rEstPrev = QuitarEstPrevRepetidos(rEstPrev);
                List<vESTPREV_CONSULTA> resEstPrev = new List<vESTPREV_CONSULTA>();
                Mapper.Map(rEstPrev, resEstPrev);
                return resEstPrev;
            }
        }
        public List<vESTPREV> QuitarEstPrevRepetidos(List<vESTPREV> lEP)
        {
            List<vESTPREV> lNewEP = new List<vESTPREV>();
            foreach (vESTPREV item in lEP)
            {
                bool ban = true;
                foreach (vESTPREV item2 in lNewEP)
                {
                    if (item.ID == item2.ID) ban = false;
                }
                if (ban) lNewEP.Add(item);
            }
            return lNewEP;
        }
        public List<vEP_CDP_DTO>  GetCDPsExt(string NRO_CDP)
        {
            CDP_Proxy oProxy = new CDP_Proxy();
            return oProxy.GetCDPsExt(NRO_CDP);
        }
        public vDatosEP GetDatos(string id) {
            GenDatosEP oGenDatosEP = new GenDatosEP();
            return oGenDatosEP.GetDatos(id); 
        }        
        public vESTPREV GetPK(string Codigo_EP,string tipo)
        {
            mESTPREV m = new mESTPREV();
            return m.GetPK(Codigo_EP, tipo);

        }
        public List<vEP_CLAUSULAS_DTO> GetClausulas(string Codigo_EP)
        {
            mESTPREV m = new mESTPREV();
            return m.GetClausulas(Codigo_EP);

        }
        public ByARpt Insert(vESTPREV Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vESTPREV Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt CreatePlantilla(vESTPREV Reg)
        {
            cmdCrearPlantilla o = new cmdCrearPlantilla();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt RevisarEP(vEP_HESTADOEP Reg)
        {
            cmdRevisarEP o = new cmdRevisarEP();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt AprobarEP(vEP_HESTADOEP Reg)
        {
            cmdAprobarEP o = new cmdAprobarEP();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt DAprobarEP(vEP_HESTADOEP Reg)
        {
            cmdDAprobarEP o = new cmdDAprobarEP();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt ElaborarMinuta(vELABORARMINUTA minuta)
        {
            using (ctx = new Entities())
            {
                try
                {
                    ByARpt res = new ByARpt();
                    PCONTRATOS PROCESO = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == minuta.NUM_PROC).FirstOrDefault();
                    PSOLICITUDES SOLICITUD = ctx.PSOLICITUDES.Where(t => t.COD_SOL == PROCESO.NUM_SOL).FirstOrDefault();
                    ESTPREV estPrev = ctx.ESTPREV.Where(t => t.CODIGO_EP == SOLICITUD.COD_EP).FirstOrDefault();
                    if (estPrev != null) estPrev.CONSIDERACIONES_EP = minuta.CONSIDERANDOS;
                    ctx.SaveChanges();
                    res.Error = false;
                    res.Mensaje = "Operación Realizada Satisfactorimente";
                    return res;
                }
                catch (Exception e)
                {
                    ByARpt res = new ByARpt();
                    res.Mensaje = e.Message;
                    res.Error = true;
                    return res;
                }
            }
        }
        public vELABORARMINUTA GetMinuta(string NUM_PROC)
        {
            using (ctx = new Entities())
            {
                try
                {
                    vELABORARMINUTA minuta = new vELABORARMINUTA();
                    PCONTRATOS PROCESO = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == NUM_PROC).FirstOrDefault();
                    PSOLICITUDES SOLICITUD = ctx.PSOLICITUDES.Where(t => t.COD_SOL == PROCESO.NUM_SOL).FirstOrDefault();
                    ESTPREV estPrev = ctx.ESTPREV.Where(t => t.CODIGO_EP == SOLICITUD.COD_EP).FirstOrDefault();
                    if (estPrev != null)
                    {
                        if (estPrev.CONSIDERACIONES_EP != null) minuta.CONSIDERANDOS = estPrev.CONSIDERACIONES_EP;
                        else minuta.CONSIDERANDOS = "";
                                             
                    }
                    else minuta.CONSIDERANDOS = "";
                    minuta.NUM_PROC = NUM_PROC;   
                    return minuta;
                }
                catch
                {
                    return null;
                }
            }
        }
        class cmdInsert : absTemplate
        {
            private ESTPREV ep = null;
            public vESTPREV oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                return true;
                

            }

            protected override void Antes()
            {
                ep = new ESTPREV();

                ep.OBJE_EP = oDto.OBJE_EP;
                ep.PLAZ1_EP = oDto.PLAZ1_EP;
                ep.TPLA1_EP = oDto.TPLA1_EP;
                ep.PLAZ2_EP = oDto.PLAZ2_EP;
                ep.TPLA2_EP = oDto.TPLA2_EP;
                ep.LUGE_EP = oDto.LUGE_EP;
                ep.PLIQ_EP = oDto.PLIQ_EP;

                ep.VAL_ENT_EP = oDto.VAL_ENT_EP;
                ep.VAL_OTR_EP = oDto.VAL_OTR_EP;

                ep.IDE_DIL_EP = oDto.IDE_DIL_EP;

                ep.DEP_NEC_EP = oDto.DEP_NEC_EP;
                ep.STIP_CON_EP = oDto.STIP_CON_EP;
                ep.FEC_ELA_EP = oDto.FEC_ELA_EP;
                ep.FEC_MOD_EP = oDto.FEC_MOD_EP;
                ep.USAP_MOD_EP = oDto.USAP_MOD_EP;
                ep.DEP_SUP_EP = oDto.DEP_SUP_EP;
                //ep.CAR_SUP_EP = oDto.CAR_SUP_EP;
                ep.VIG_EP = oDto.VIG_EP;

                ep.GRUPOS_EP = oDto.GRUPOS_EP;
                ep.NUM_EMP_EP = oDto.NUM_EMP_EP;
                ep.IDE_RES_EP = oDto.IDE_RES_EP;

                ep.MOD_SEL_EP = oDto.MOD_SEL_EP;
                ep.DEP_DEL_EP = oDto.DEP_DEL_EP;

                
                ep.TIPO_FP = oDto.TIPO_FP;
                ep.ANTI_PORC = oDto.ANTI_PORC;
                ep.PERSONA_APOYO = oDto.PERSONA_APOYO;

                ep.OBLIGC = oDto.OBLIGC;
                ep.OBLIGE = oDto.OBLIGE;

                ep.IDE_CON_EP = oDto.IDE_CON_EP;
                ep.IDE_REP_EP = oDto.IDE_REP_EP;
                
                ep.ENPLANC_EP = oDto.ENPLANC_EP;

                //Agregado  por Carlos Tirado,Feb 07 del 2015
                ep.NEC_EP = oDto.NEC_EP;
                ep.OBLIGGRC = oDto.OBLIGGRC;
                ep.OBLIGGRE = oDto.OBLIGGRE;
                ep.JUST_VALOR_EP = oDto.JUST_VALOR_EP;
                ep.CAP_JURIDICA_EP = oDto.CAP_JURIDICA_EP;
                ep.CAP_FINANCIERA_EP = oDto.CAP_FINANCIERA_EP;
                ep.CAP_RESIDUAL_EP = oDto.CAP_RESIDUAL_EP;
                ep.PERS_LEGAL_EP = oDto.PERS_LEGAL_EP;
                ep.PERS_ORGA_EP = oDto.PERS_ORGA_EP;
                ep.CAP_EXPERIENCA_EP = oDto.CAP_EXPERIENCA_EP;
                ep.NEC_CONT_INT_EP = oDto.NEC_CONT_INT_EP;
                ep.SOM_ACUE_COMER_EP = oDto.SOM_ACUE_COMER_EP;
                ep.CONST_CUMP_DEBERES_EP = oDto.CONST_CUMP_DEBERES_EP;
                ep.IDE_SUP_EP = oDto.IDE_SUP_EP;
                ep.CAR_SUP_EP = oDto.CAR_SUP_EP;
                ep.COD_UNSPSC_EP = oDto.COD_UNSPSC_EP;
                ep.DES_UNSPSC_EP = oDto.DES_UNSPSC_EP;       
                /////////////////////////////////////////////////

                // Objeto, especficaciones 
                ep.ESP_OBJ_EP = oDto.ESP_OBJ_EP;
                ep.AUTPERLIC_EP = oDto.AUTPERLIC_EP;
                ep.DOCTECNICOS_EP = oDto.DOCTECNICOS_EP;

                //Presupuesto
                ep.VARIABLESPPTO_EP = oDto.VARIABLESPPTO_EP;

                ep.TIPO_PPTO = oDto.TIPO_PPTO;
                ep.PAAID = oDto.PAAID;
                ep.PAADESC = oDto.PAADESC;

                // Criterios de seleccion
                ep.IDONEIDAD_EP = oDto.IDONEIDAD_EP;
                ep.CAP_ORGANIZACIONAL_EP = oDto.CAP_ORGANIZACIONAL_EP;
                ep.FACTORES_EVALUACION_EP = oDto.FACTORES_EVALUACION_EP;
                ep.REGLAS_DESEMPATE_EP = oDto.REGLAS_DESEMPATE_EP; 

                decimal ultId = 0;
                decimal ultNro = 0;
                try
                {
                    ultId = ctx.ESTPREV.Max(t => t.ID);
                }
                catch { }
                try
                {
                    ultNro = (decimal)ctx.ESTPREV.Where(t => t.FEC_ELA_EP == ep.FEC_ELA_EP).Max(t => t.NRO_EP);
                }
                catch { }
                ep.ID = ultId + 1;//Consecutivo unico
                ep.NRO_EP = ultNro + 1;//Consecutivvo por año.
                ep.EST_EP = "EL"; //Por defecto en elaboración
                ep.EST_FLU_EP = "NE"; // Por defecto el estado del flujo del proceso esta en no enviado.
                ep.CODIGO_EP = ByAUtil.Right(ep.FEC_ELA_EP.Value.Year.ToString(),2) + ep.FEC_ELA_EP.Value.Month.ToString().PadLeft(2, '0') + ep.FEC_ELA_EP.Value.Day.ToString().PadLeft(2, '0') + "-" + ep.NRO_EP.ToString().PadLeft(3, '0'); //Codigo Clave
                ep.FEC_ELAS_EP = DateTime.Now;//fecha de elaboración real
                ep.FEC_REG_EP = DateTime.Now;
                byaRpt.id = ep.CODIGO_EP.ToString();
                mProyectos();
                mCDP();
                delFormaPago();
                mPolizas();
                mFormaPago();
                mDocumento();
                ctx.ESTPREV.Add(ep);
            }

            private void mProyectos()
            {
                EP_PROYECTOS ep_pry;
                foreach (vEP_ProyectosDTO pry in oDto.l_EP_PROYECTOS.Where(t => t.ES_ANULAR || (t.ES_NUEVO && !t.ES_ANULAR)))
                {
                    if (pry.ES_ANULAR)
                    {
                        ep_pry = ep.EP_PROYECTOS.Where(t => t.COD_PRO == pry.COD_PRO).FirstOrDefault();
                        if (ep_pry != null)
                        {
                            ctx.Entry(ep_pry).State = EntityState.Deleted;
                        }
                    }
                    if (pry.ES_NUEVO && !pry.ES_ANULAR)
                    {
                        ep_pry = new EP_PROYECTOS();
                        ep_pry.FEC_REG = DateTime.Now;
                        ep_pry.COD_PRO = pry.COD_PRO;
                        ep_pry.USAP_REG = oDto.USAP_ELA_EP;
                        ep.EP_PROYECTOS.Add(ep_pry);
                    }
                }
            }

            private void mCDP()
            {
                
            }

            private void delFormaPago()
            {
                vEP_FORMA_PAGO_DTO dto;
                foreach (EP_FORMA_PAGO ent in ep.EP_FORMA_PAGO)
                {
                    dto = oDto.l_EP_FORMA_PAGO.Where(t => t.ID == ent.ID).FirstOrDefault();
                    if (dto == null)
                    {
                        ctx.Entry(ent).State = EntityState.Deleted;
                    }
                }
            }
            private void mFormaPago()
            {
                EP_FORMA_PAGO ep_fp;
                foreach (vEP_FORMA_PAGO_DTO fp in oDto.l_EP_FORMA_PAGO.Where(t => t.ES_ANULAR || (t.ES_NUEVO && !t.ES_ANULAR)))
                {
                    if (fp.ES_ANULAR)
                    {
                        ep_fp = ep.EP_FORMA_PAGO.Where(t => t.ID == fp.ID).FirstOrDefault();
                        if (ep_fp != null)
                        {
                            ctx.Entry(ep_fp).State = EntityState.Deleted;
                        }
                    }
                    if (fp.ES_NUEVO && !fp.ES_ANULAR)
                    {
                        ep_fp = new EP_FORMA_PAGO();
                        ep_fp.ORD_FPAG = fp.ORD_FPAG;
                        ep_fp.PGEN_FPAG = fp.PGEN_FPAG;
                        ep_fp.TIP_FPAG = fp.TIP_FPAG;
                        ep_fp.POR_FPAG = fp.POR_FPAG;
                        ep_fp.VAL_FPAG = fp.VAL_FPAG;
                        ep_fp.USAP_REG = oDto.USAP_REG_EP;
                        ep_fp.CON_FPAG = fp.CON_FPAG;
                        ep_fp.CAN_PAG = fp.CAN_PAG;
                        ep_fp.FEC_REG = DateTime.Now;
                        ep.EP_FORMA_PAGO.Add(ep_fp);
                    }
                }
            }

            private void mPolizas()
            {
                EP_POLIZAS2 ent;
                decimal ultId = 0;
                try
                {
                    ultId = ctx.EP_POLIZAS2.Max(t => t.ID);
                }
                catch { }
                foreach (vEP_POLIZAS2_DTO dto in oDto.l_EP_POLIZAS2)
                {

                    if (dto.ES_NUEVO && !dto.ES_ANULAR)
                    {
                        ultId = ultId + 1;
                        ent = new EP_POLIZAS2();
                        ent.ID = ultId;
                        ent.GRUPO = dto.GRUPO;
                        ent.PLA_POL = dto.PLA_POL;
                        ent.VAL_POL = dto.VAL_POL;
                        ent.COD_POL = dto.COD_POL;
                        ent.DES_POL = dto.DES_POL;
                        ep.EP_POLIZAS2.Add(ent);
                    }
                    if (dto.ES_ANULAR && !dto.ES_NUEVO)
                    {
                        ent = ep.EP_POLIZAS2.Where(t => t.ID == dto.ID).FirstOrDefault();
                        if (ent != null)
                        {
                            ctx.Entry(ent).State = EntityState.Deleted;
                        }
                    }
                    if (!dto.ES_ANULAR && !dto.ES_NUEVO) //Actualizar datos
                    {
                        ent = ep.EP_POLIZAS2.Where(t => t.ID == dto.ID).FirstOrDefault();
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

            //private void mDocumento()
            //{
            //    EP_CLAUSULAS ent;
            //    //decimal ultId = 0;
            //    //try
            //    //{
            //    //    ultId = ctx.EP_POLIZAS2.Max(t => t.ID);
            //    //}
            //    //catch { }
            //    foreach (vEP_CLAUSULAS_DTO dto in oDto.l_EP_CLAUSULAS)
            //    {

            //        if (dto.ES_NUEVO && !dto.ES_ANULAR)
            //        {
            //            //ultId = ultId + 1;
            //            //ent = new PCLAUSULAS();
            //            //ent.ID = ultId;
            //            //ent.GRUPO = dto.GRUPO;
            //            //ent.PLA_POL = dto.PLA_POL;
            //            //ent.VAL_POL = dto.VAL_POL;
            //            //ent.COD_POL = dto.COD_POL;
            //            //ent.DES_POL = dto.DES_POL;
            //            //ep.EP_POLIZAS2.Add(ent);
            //        }
            //        if (dto.ES_ANULAR && !dto.ES_NUEVO)
            //        {
            //            ent = ep.EP_CLAUSULAS.Where(t => t.ID == dto.ID).FirstOrDefault();
            //            if (ent != null)
            //            {
            //                ctx.Entry(ent).State = EntityState.Deleted;
            //            }
            //        }
            //        if (!dto.ES_ANULAR && !dto.ES_NUEVO) //Actualizar datos
            //        {
            //            ent = ep.EP_CLAUSULAS.Where(t => t.ID == dto.ID).FirstOrDefault();
            //            if (ent != null)
            //            {
            //                ent.CLA_TEXTO = dto.CLA_TEXTO;
            //                ctx.Entry(ent).State = EntityState.Modified;
            //            }
            //        }

            //    }
            //}

            private void mDocumento()
            {
                EP_CLAUSULAS ent;
                decimal ultId = 0;
                try
                {
                    ultId = ctx.EP_CLAUSULAS.Max(t => t.ID);
                }
                catch { }
                foreach (vEP_CLAUSULAS_DTO dto in oDto.l_EP_CLAUSULAS)
                {
                    ent = ep.EP_CLAUSULAS.Where(t => t.ID == dto.ID).FirstOrDefault();//buscar 
                    if (ent != null)//Si existe se actualiza
                    {
                        ent.CLA_TEXTO = dto.CLA_TEXTO;
                        ent.CLA_CRUZADA = dto.CLA_CRUZADA;
                        ctx.Entry(ent).State = EntityState.Modified;
                    }
                    else
                    { //sino existe se crea
                        ultId = ultId + 1;
                        ent = new EP_CLAUSULAS();
                        ent.ID = ultId;
                        ent.CLA_CAM = dto.CLA_CAM;
                        ent.ORDEN = dto.ORDEN;
                        ent.TIP_PAR = dto.TIP_PAR;
                        ent.CLA_NUM = dto.CLA_NUM;
                        ent.CLA_PAR = dto.CLA_PAR;
                        ent.CLA_TEXTO = dto.CLA_TEXTO;
                        ent.CLA_TIT = dto.CLA_TIT;
                        ent.TIP_PLA = dto.TIP_PLA;
                        ent.IS_ENTER_FINAL = dto.IS_ENTER_FINAL;
                        ent.IDE_PMIN = dto.IDE_PMIN;
                        ent.ID_PLA = dto.ID_PLA;
                        ent.CLA_CRUZADA = dto.CLA_CRUZADA;
                        ep.EP_CLAUSULAS.Add(ent);
                    }

                }
            }
            #endregion


        }
        class cmdUpdate : absTemplate
        {
            public vESTPREV oDto { get; set; }
            public ESTPREV ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                return true;
            }

            protected override void Antes()
            {

                oDto.FEC_MOD_EP = DateTime.Now;
                ep = ctx.ESTPREV.Find(oDto.ID);
                if (ep != null)
                {
                    ep.FEC_MOD_EP = DateTime.Now;
                    ep.OBJE_EP = oDto.OBJE_EP;
                    ep.PLAZ1_EP = oDto.PLAZ1_EP;
                    ep.TPLA1_EP = oDto.TPLA1_EP;
                    ep.PLAZ2_EP = oDto.PLAZ2_EP;
                    ep.TPLA2_EP = oDto.TPLA2_EP;
                    ep.LUGE_EP = oDto.LUGE_EP;
                    ep.PLIQ_EP = oDto.PLIQ_EP;

                    ep.VAL_ENT_EP = oDto.VAL_ENT_EP;
                    ep.VAL_OTR_EP = oDto.VAL_OTR_EP;

                    ep.IDE_DIL_EP = oDto.IDE_DIL_EP;

                    ep.DEP_NEC_EP = oDto.DEP_NEC_EP;
                    ep.STIP_CON_EP = oDto.STIP_CON_EP;
                    ep.FEC_ELA_EP = oDto.FEC_ELA_EP;
                    ep.FEC_MOD_EP = oDto.FEC_MOD_EP;
                    ep.USAP_MOD_EP = oDto.USAP_MOD_EP;
                    ep.DEP_SUP_EP = oDto.DEP_SUP_EP;
                    //found.CAR_SUP_EP = oDto.CAR_SUP_EP;
                    ep.VIG_EP = oDto.VIG_EP;

                    ep.GRUPOS_EP = oDto.GRUPOS_EP;
                    ep.NUM_EMP_EP = oDto.NUM_EMP_EP;
                    ep.IDE_RES_EP = oDto.IDE_RES_EP;

                    ep.MOD_SEL_EP = oDto.MOD_SEL_EP;
                    ep.DEP_DEL_EP = oDto.DEP_DEL_EP;
                    
                    ep.TIPO_FP = oDto.TIPO_FP;
                    ep.ANTI_PORC = oDto.ANTI_PORC;
                    ep.PERSONA_APOYO = oDto.PERSONA_APOYO;

                    ep.OBLIGC = oDto.OBLIGC;
                    ep.OBLIGE = oDto.OBLIGE;

                    ep.IDE_CON_EP = oDto.IDE_CON_EP;
                    ep.IDE_REP_EP = oDto.IDE_REP_EP;
                    ep.ENPLANC_EP = oDto.ENPLANC_EP;
                    //Agregado  por Carlos Tirado,Feb 07 del 2015
                    ep.NEC_EP = oDto.NEC_EP; 
                    ep.OBLIGGRC = oDto.OBLIGGRC; 
                    ep.OBLIGGRE = oDto.OBLIGGRE;
                    ep.JUST_VALOR_EP = oDto.JUST_VALOR_EP;
                    ep.CAP_JURIDICA_EP = oDto.CAP_JURIDICA_EP;
                    ep.CAP_FINANCIERA_EP = oDto.CAP_FINANCIERA_EP;
                    ep.CAP_RESIDUAL_EP = oDto.CAP_RESIDUAL_EP;
                    ep.PERS_LEGAL_EP = oDto.PERS_LEGAL_EP;
                    ep.PERS_ORGA_EP = oDto.PERS_ORGA_EP;
                    ep.CAP_EXPERIENCA_EP = oDto.CAP_EXPERIENCA_EP;
                    ep.NEC_CONT_INT_EP = oDto.NEC_CONT_INT_EP;
                    ep.SOM_ACUE_COMER_EP = oDto.SOM_ACUE_COMER_EP;
                    ep.CONST_CUMP_DEBERES_EP = oDto.CONST_CUMP_DEBERES_EP;
                    ep.IDE_SUP_EP = oDto.IDE_SUP_EP;
                    ep.CAR_SUP_EP = oDto.CAR_SUP_EP;
                    ep.COD_UNSPSC_EP = oDto.COD_UNSPSC_EP;
                    ep.DES_UNSPSC_EP = oDto.DES_UNSPSC_EP;

                    // Agregado por Carlos Tirado, Campos Adicionales, 13/03/2015
                    ep.ACT_CONT_EP = oDto.ACT_CONT_EP;
                    ep.DESC_APORTES_PROPIOS_EP = oDto.DESC_APORTES_PROPIOS_EP;
                    ep.REQ_CDP_EP = oDto.REQ_CDP_EP;
                    ep.OBS_CDP_EP = oDto.OBS_CDP_EP;
                    ep.OBS_POL_EP = oDto.OBS_POL_EP;
                    ep.REQ_POL_EP = oDto.REQ_POL_EP;
                    ep.INICIO_APARTIR_DE_EP = oDto.INICIO_APARTIR_DE_EP;
                    ep.FEC_INICIO_EP = oDto.FEC_INICIO_EP;
                    ep.FEC_FIN_EP = oDto.FEC_FIN_EP;



                    ep.TIPO_PPTO = oDto.TIPO_PPTO;
                    ep.PAAID = oDto.PAAID;
                    ep.PAADESC = oDto.PAADESC;

                    ep.FUN_JUR_MOD = oDto.FUN_JUR_MOD;
                    ep.CAR_RES_EP = oDto.CAR_RES_EP;

                    // Objeto, especficaciones 
                    ep.ESP_OBJ_EP = oDto.ESP_OBJ_EP;
                    ep.AUTPERLIC_EP = oDto.AUTPERLIC_EP;
                    ep.DOCTECNICOS_EP = oDto.DOCTECNICOS_EP;

                    //Presupuesto
                    ep.VARIABLESPPTO_EP = oDto.VARIABLESPPTO_EP;

                    // Criterios de seleccion
                    ep.IDONEIDAD_EP  = oDto.IDONEIDAD_EP;
                    ep.CAP_ORGANIZACIONAL_EP = oDto.CAP_ORGANIZACIONAL_EP; 
                    ep.FACTORES_EVALUACION_EP = oDto.FACTORES_EVALUACION_EP;
                    ep.REGLAS_DESEMPATE_EP = oDto.REGLAS_DESEMPATE_EP; 


                    //anular 
                    mProyectos();
                    mEliminarProyectos();
                    mCDP();
                    delFormaPago();
                    mFormaPago();
                    EliminarPolizas();
                    mPolizas();
                    mDocumento();
                    mEliminarRiesgos(oDto.l_EP_RIESGOS.Where(t => t.ID != 0).ToList(), oDto.ID);
                    mNuevosRiesgos(oDto.l_EP_RIESGOS.Where(t => t.ID == 0).ToList(), oDto.ID);
                    mModificarRiesgos(oDto.l_EP_RIESGOS.Where(t => t.ID != 0).ToList(), oDto.ID);
                    mEliminarCodigosUNSPSC(oDto.l_EP_UNSPSC.Where(t => t.ID != 0).ToList(), oDto.ID);
                    mNuevosCodigosUNSPSC(oDto.l_EP_UNSPSC.Where(t => t.ID == 0).ToList(), oDto.ID);
                    
                    ctx.Entry(ep).State = EntityState.Modified;
                }

            }
            private void EliminarPolizas()
            {
                List<EP_POLIZAS2> lPolizasOld = ctx.EP_POLIZAS2.Where(t => t.ID_EP == oDto.ID).ToList();
                foreach (EP_POLIZAS2 item in lPolizasOld)
                {
                    bool ban = true;
                    foreach (vEP_POLIZAS2_DTO item2 in oDto.l_EP_POLIZAS2)
                    {
                        if (item.ID == item2.ID) ban = false;
                    }
                    if (ban)
                    {
                        ctx.EP_POLIZAS2.Remove(item);
                    }
                }
                ctx.SaveChanges();
            }
            private void mPolizas()
            {
                EP_POLIZAS2 ent;
                decimal ultId = 0;
                try
                {
                    ultId = ctx.EP_POLIZAS2.Max(t => t.ID);
                }
                catch { }
                foreach (vEP_POLIZAS2_DTO dto in oDto.l_EP_POLIZAS2)
                {

                    if (dto.ES_NUEVO && !dto.ES_ANULAR)
                    {
                        ultId = ultId + 1;
                        ent = new EP_POLIZAS2();
                        ent.ID = ultId;
                        ent.GRUPO = dto.GRUPO;
                        ent.PLA_POL = dto.PLA_POL;
                        ent.VAL_POL = dto.VAL_POL;
                        ent.COD_POL = dto.COD_POL;
                        ent.DES_POL = dto.DES_POL;
                        ep.EP_POLIZAS2.Add(ent);
                    }
                    if (dto.ES_ANULAR && !dto.ES_NUEVO)
                    {
                        ent = ep.EP_POLIZAS2.Where(t => t.ID == dto.ID).FirstOrDefault();
                        if (ent != null)
                        {
                            ctx.Entry(ent).State = EntityState.Deleted;
                        }
                    }
                    if (!dto.ES_ANULAR && !dto.ES_NUEVO) //Actualizar datos
                    {
                        ent = ep.EP_POLIZAS2.Where(t => t.ID == dto.ID).FirstOrDefault();
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

            private void mDocumento()
            {
                EP_CLAUSULAS ent;
                decimal ultId = 0;
                try
                {
                    ultId = ctx.EP_CLAUSULAS.Max(t => t.ID);
                }
                catch { }
                foreach (vEP_CLAUSULAS_DTO dto in oDto.l_EP_CLAUSULAS)
                {
                    ent = ep.EP_CLAUSULAS.Where(t => t.ID == dto.ID).FirstOrDefault();//buscar 
                    if (ent != null)//Si existe se actualiza
                    {
                        ent.CLA_TEXTO = dto.CLA_TEXTO;
                        ent.CLA_CRUZADA = dto.CLA_CRUZADA;
                        ctx.Entry(ent).State = EntityState.Modified;
                    }
                    else { //sino existe se crea
                        ultId = ultId + 1;
                        ent = new EP_CLAUSULAS();
                        ent.ID = ultId;
                        ent.CLA_CAM = dto.CLA_CAM;
                        ent.ORDEN = dto.ORDEN;
                        ent.TIP_PAR = dto.TIP_PAR;
                        ent.CLA_NUM = dto.CLA_NUM;
                        ent.CLA_PAR = dto.CLA_PAR;
                        ent.CLA_TEXTO = dto.CLA_TEXTO;
                        ent.CLA_TIT = dto.CLA_TIT;
                        ent.TIP_PLA = dto.TIP_PLA;
                        ent.IS_ENTER_FINAL = dto.IS_ENTER_FINAL;
                        ent.IDE_PMIN = dto.IDE_PMIN;
                        ent.ID_PLA = dto.ID_PLA;
                        ent.CLA_CRUZADA = dto.CLA_CRUZADA;
                        ep.EP_CLAUSULAS.Add(ent);
                    }

                }
            }
            private void delFormaPago(){
                vEP_FORMA_PAGO_DTO dto;
                List<EP_FORMA_PAGO> l_FP =ep.EP_FORMA_PAGO.ToList();
                foreach (EP_FORMA_PAGO ent in l_FP)
                {
                    dto = oDto.l_EP_FORMA_PAGO.Where(t => t.ID == ent.ID).FirstOrDefault();
                    if (dto == null) {
                        ctx.Entry(ent).State = EntityState.Deleted;
                    }
                }
            }
            private void mFormaPago()
            {
                EP_FORMA_PAGO ep_fp;
                decimal ultId = 0;
                try
                {
                    ultId = ctx.EP_FORMA_PAGO.Max(t => t.ID);
                }
                catch { }
                foreach (vEP_FORMA_PAGO_DTO fp in oDto.l_EP_FORMA_PAGO.Where(t => t.ES_ANULAR || (t.ES_NUEVO && !t.ES_ANULAR) || t.ES_MODIF))
                {
                    if (fp.ES_ANULAR)
                    {
                        ep_fp = ep.EP_FORMA_PAGO.Where(t => t.ID == fp.ID).FirstOrDefault();
                        if (ep_fp != null)
                        {
                            ctx.Entry(ep_fp).State = EntityState.Deleted;
                        }
                    }
                    if (fp.ES_NUEVO && !fp.ES_ANULAR)
                    {
                        ultId=ultId + 1;
                        ep_fp = new EP_FORMA_PAGO();
                        ep_fp.ID = ultId;
                        ep_fp.CAN_PAG = fp.CAN_PAG;
                        ep_fp.ORD_FPAG = fp.ORD_FPAG;
                        ep_fp.PGEN_FPAG = fp.PGEN_FPAG;
                        ep_fp.TIP_FPAG = fp.TIP_FPAG;
                        ep_fp.POR_FPAG = fp.POR_FPAG;
                        ep_fp.VAL_FPAG = fp.VAL_FPAG;
                        ep_fp.USAP_REG = oDto.USAP_MOD_EP;
                        ep_fp.CON_FPAG = fp.CON_FPAG;
                        ep_fp.FEC_REG = DateTime.Now;
                        ep.EP_FORMA_PAGO.Add(ep_fp);
                    }
                    if (fp.ES_MODIF)
                    {
                        ep_fp = ep.EP_FORMA_PAGO.Where(t => t.ID == fp.ID).FirstOrDefault();
                        if (ep_fp != null)
                        {
                            ep_fp.ID = fp.ID;
                            ep_fp.CAN_PAG = fp.CAN_PAG;
                            ep_fp.ORD_FPAG = fp.ORD_FPAG;
                            ep_fp.PGEN_FPAG = fp.PGEN_FPAG;
                            ep_fp.TIP_FPAG = fp.TIP_FPAG;
                            ep_fp.POR_FPAG = fp.POR_FPAG;
                            ep_fp.VAL_FPAG = fp.VAL_FPAG;
                            ep_fp.USAP_REG = oDto.USAP_MOD_EP;
                            ep_fp.CON_FPAG = fp.CON_FPAG;
                            ep_fp.FEC_REG = fp.FEC_REG;
                            ep_fp.FEC_MOD = DateTime.Now;
                            ctx.Entry(ep_fp).State = EntityState.Modified;
                        }
                    }
                }
            }
            private void mProyectos()
            {
                EP_PROYECTOS ep_pry;
                foreach (vEP_ProyectosDTO pry in oDto.l_EP_PROYECTOS.Where(t => t.ES_NUEVO))
                {
                        ep_pry = new EP_PROYECTOS();
                        ep_pry.FEC_REG = DateTime.Now;
                        ep_pry.COD_PRO = pry.COD_PRO;
                        ep_pry.USAP_REG = oDto.USAP_MOD_EP;
                        ep.EP_PROYECTOS.Add(ep_pry);
                        ctx.SaveChanges();
                }
            }
            private void mEliminarProyectos()
            {
                List<EP_PROYECTOS> lProyectosOld = ctx.EP_PROYECTOS.Where(t => t.ID_EP == oDto.ID).ToList();
                foreach (EP_PROYECTOS item in lProyectosOld)
                {
                    bool ban = true;
                    foreach (vEP_ProyectosDTO item2 in oDto.l_EP_PROYECTOS)
                    {
                        if (item.COD_PRO == item2.COD_PRO) ban = false;
                    }
                    if (ban)
                    {
                        ctx.EP_PROYECTOS.Remove(item);
                    }
                }
                ctx.SaveChanges();
            }
            private void mNuevosRiesgos(List<vEP_RIESGOS> lRiesgosNuevos, decimal ID_EP)
            {
                EP_RIESGOS oldRiesgoP = ctx.EP_RIESGOS.Where(t => t.ID_EP == oDto.ID).OrderByDescending(t => t.ID).FirstOrDefault();
                decimal N;
                if (oldRiesgoP == null) N = 0;
                else N = (decimal) oldRiesgoP.N;

                EP_RIESGOS oldRiesgo = ctx.EP_RIESGOS.OrderByDescending(t => t.ID).FirstOrDefault();
                decimal ID;
                if (oldRiesgo == null) ID = 0;
                else ID = (decimal) oldRiesgo.ID;

                foreach (vEP_RIESGOS item in lRiesgosNuevos)
                {
                    EP_RIESGOS riesgo = new EP_RIESGOS();
                    riesgo.ID = ID + 1;
                    riesgo.N = N + 1;
                    riesgo.ID_EP = ID_EP;
                    riesgo.CLASE = item.CLASE;
                    riesgo.FUENTE = item.FUENTE;
                    riesgo.ETAPA = item.ETAPA;
                    riesgo.TIPO = item.TIPO;
                    riesgo.DESCRIPCION = item.DESCRIPCION;
                    riesgo.CONSECUENCIAS = item.CONSECUENCIAS;
                    riesgo.PROBABILIDAD_R = item.PROBABILIDAD_R;
                    riesgo.IMPACTO_R = item.IMPACTO_R;
                    riesgo.VALORACION_R = item.VALORACION_R;
                    riesgo.CATEGORIA_R = item.CATEGORIA_R;
                    riesgo.AQUIENSEASIGNA = item.AQUIENSEASIGNA;
                    riesgo.TRATAMIENTO = item.TRATAMIENTO;
                    riesgo.PROBABILIDAD_T = item.PROBABILIDAD_T;
                    riesgo.IMPACTO_T = item.IMPACTO_T;
                    riesgo.VALORACION_T = item.VALORACION_T;
                    riesgo.CATEGORIA_T = item.CATEGORIA_T;
                    riesgo.AFECTAEJECUCIONCTO = item.AFECTAEJECUCIONCTO;
                    riesgo.RESPONSABLE = item.RESPONSABLE;
                    riesgo.FECHAINICIO = item.FECHAINICIO;
                    riesgo.FECHACOMPLETA = item.FECHACOMPLETA;
                    riesgo.FORMA_MONITOREO = item.FORMA_MONITOREO;
                    riesgo.PERIOCIDAD = item.PERIOCIDAD;
                    ctx.EP_RIESGOS.Add(riesgo);
                    ctx.SaveChanges();
                    N = N + 1;
                    ID = ID + 1;
                }
            }
            private void mEliminarRiesgos(List<vEP_RIESGOS> lRiesgosNuevos, decimal ID_EP)
            {
                List<EP_RIESGOS> lRiesgosOld = ctx.EP_RIESGOS.Where(t => t.ID_EP == ID_EP).ToList();
                foreach (EP_RIESGOS item in lRiesgosOld)
                {
                    bool ban = true;
                    foreach (vEP_RIESGOS item2 in lRiesgosNuevos)
                    {
                        if (item.ID == item2.ID) ban = false;
                    }
                    if (ban)
                    {
                        ctx.EP_RIESGOS.Remove(item);
                    }
                }
                ctx.SaveChanges();
            }
            private void mModificarRiesgos(List<vEP_RIESGOS> lRiesgos, decimal ID_EP)
            {
                foreach (vEP_RIESGOS item in lRiesgos)
                {
                    EP_RIESGOS riesgo = ctx.EP_RIESGOS.Where(t => t.ID == item.ID).FirstOrDefault();
                    if (riesgo != null)
                    {
                        riesgo.CLASE = item.CLASE;
                        riesgo.FUENTE = item.FUENTE;
                        riesgo.ETAPA = item.ETAPA;
                        riesgo.TIPO = item.TIPO;
                        riesgo.DESCRIPCION = item.DESCRIPCION;
                        riesgo.CONSECUENCIAS = item.CONSECUENCIAS;
                        riesgo.PROBABILIDAD_R = item.PROBABILIDAD_R;
                        riesgo.IMPACTO_R = item.IMPACTO_R;
                        riesgo.VALORACION_R = item.VALORACION_R;
                        riesgo.CATEGORIA_R = item.CATEGORIA_R;
                        riesgo.AQUIENSEASIGNA = item.AQUIENSEASIGNA;
                        riesgo.TRATAMIENTO = item.TRATAMIENTO;
                        riesgo.PROBABILIDAD_T = item.PROBABILIDAD_T;
                        riesgo.IMPACTO_T = item.IMPACTO_T;
                        riesgo.VALORACION_T = item.VALORACION_T;
                        riesgo.CATEGORIA_T = item.CATEGORIA_T;
                        riesgo.AFECTAEJECUCIONCTO = item.AFECTAEJECUCIONCTO;
                        riesgo.RESPONSABLE = item.RESPONSABLE;
                        riesgo.FECHAINICIO = item.FECHAINICIO;
                        riesgo.FECHACOMPLETA = item.FECHACOMPLETA;
                        riesgo.FORMA_MONITOREO = item.FORMA_MONITOREO;
                        riesgo.PERIOCIDAD = item.PERIOCIDAD;
                        ctx.SaveChanges();
                    }
                }
            }
            private void mNuevosCodigosUNSPSC(List<vEP_UNSPSC> lCodigos, decimal ID_EP)
            {
                EP_UNSPSC oldCod = ctx.EP_UNSPSC.OrderByDescending(t => t.ID).FirstOrDefault();
                decimal ID;
                if (oldCod == null) ID = 0;
                else ID = oldCod.ID;
                foreach (vEP_UNSPSC item in lCodigos)
                {
                    EP_UNSPSC codigo = new EP_UNSPSC();
                    codigo.ID = ID + 1;
                    codigo.UNSPSC = item.UNSPSC;
                    codigo.ID_EP = ID_EP;

                    ctx.EP_UNSPSC.Add(codigo);
                    ctx.SaveChanges();
                    ID = ID + 1;
                }
            }
            private void mEliminarCodigosUNSPSC(List<vEP_UNSPSC> lCodigos, decimal ID_EP)
            {
                List<EP_UNSPSC> lCodigosOld = ctx.EP_UNSPSC.Where(t => t.ID_EP == ID_EP).ToList();
                foreach (EP_UNSPSC item in lCodigosOld)
                {
                    bool ban = true;
                    foreach (vEP_UNSPSC item2 in lCodigos)
                    {
                        if (item.ID == item2.ID) ban = false;
                    }
                    if (ban)
                    {
                        ctx.EP_UNSPSC.Remove(item);
                    }
                }
                ctx.SaveChanges();
            }
            private void mCDP()
            {   
                EliminarCDPs();
                NuevosCDP();
                ModificadosCDP();
            }

            private void EliminarCDPs()
            {
                List<EP_CDP> lCDPsOld = ctx.EP_CDP.Where(t => t.ID_EP == oDto.ID).ToList();
                foreach (EP_CDP item in lCDPsOld)
                {
                    bool ban = true;
                    foreach (vEP_CDP_DTO item2 in oDto.l_EP_CDP)
                    {
                        if (item.ID == item2.ID) ban = false;
                    }
                    if (ban)
                    {
                        EliminarRubrosCDP(item.ID);
                        ctx.EP_CDP.Remove(item);
                        ctx.SaveChanges();
                    }
                }
            }
            private void EliminarRubrosCDP(decimal ID_EP_CDP)
            {
                List<EP_RUBROS_CDP> lRubrosEliminar = ctx.EP_RUBROS_CDP.Where(t => t.ID_EP_CDP == ID_EP_CDP).ToList();
                foreach (EP_RUBROS_CDP item in lRubrosEliminar)
                {
                    ctx.EP_RUBROS_CDP.Remove(item);
                    ctx.SaveChanges();
                }
            }
            private void NuevosCDP()
            {
                decimal ultId = 0;
                try
                {
                    ultId = ctx.EP_CDP.Max(t => t.ID);
                }
                catch { }

                foreach (vEP_CDP_DTO item in oDto.l_EP_CDP.Where(t => t.ES_NUEVO == true).ToList())
                {
                    try
                    {
                        EP_CDP ep_cdp = new EP_CDP();
                        ultId = ultId + 1;
                        ep_cdp.FEC_REG = DateTime.Now;
                        ep_cdp.NRO_CDP = item.NRO_CDP;
                        ep_cdp.FEC_CDP = item.FEC_CDP;
                        ep_cdp.VAL_CDP = item.VAL_CDP;
                        ep_cdp.VIG_FUT = item.VIG_FUT;
                        ep_cdp.ID = ultId;
                        ep_cdp.USAP_REG = oDto.USAP_ELA_EP;
                        ep.EP_CDP.Add(ep_cdp);
                        ctx.SaveChanges();
                        NuevosRubrosCDP(item.EP_RUBROS_CDP, item.NRO_CDP, ultId);
                    }
                    catch { }
                }
            }
            private void NuevosRubrosCDP(ICollection<vEP_RUBROS_CDP_DTO> lRubrosNuevo, string NRO_CDP, decimal ID_EP_CDP)
            {
                decimal ultId = 0;
                try
                {
                    ultId = ctx.EP_RUBROS_CDP.Max(t => t.ID);
                }
                catch { }

                foreach (vEP_RUBROS_CDP_DTO item in lRubrosNuevo)
                {
                    Entities ctxp = new Entities();
                    RUBROS rubr = ctx.RUBROS.Where(t => t.COD_RUB == item.COD_RUB).FirstOrDefault();
                    if (rubr == null)
                    {
                        vRUBROS rub = new vRUBROS();
                        rub.COD_RUB = item.COD_RUB;
                        rub.DES_RUB = item.NOM_RUB;
                        rub.VIGENCIA = short.Parse(oDto.VIG_EP);
                        rub.COD_UNIDAD = item.COD_UNIDAD;
                        rub.CLASE = item.CLASE;
                        rub.COD_RECURSO = item.COD_RECURSO;

                        mRubros objRub = new mRubros();
                        objRub.Insert(rub);
                    }



                    ultId = ultId + 1;
                    EP_RUBROS_CDP rubro = new EP_RUBROS_CDP();
                    rubro.ID = ultId;
                    rubro.ID_EP = oDto.ID;
                    rubro.COD_RUB = item.COD_RUB;
                    rubro.VALOR = item.VALOR;
                    rubro.NRO_CDP = NRO_CDP;
                    rubro.VIG_CDP = item.VIG_CDP;
                    rubro.ID_EP_CDP = ID_EP_CDP;
                    ctx.EP_RUBROS_CDP.Add(rubro);
                    ctx.SaveChanges();
                }
            }
            private void ModificadosCDP()
            {
                foreach (vEP_CDP_DTO item in oDto.l_EP_CDP.Where(t => t.ES_NUEVO != true).ToList())
                {
                    if (item.ES_MODIF == true)
                    {
                        EP_CDP cdp = ctx.EP_CDP.Where(t => t.ID == item.ID).FirstOrDefault();
                        if (cdp != null)
                        {
                            cdp.FEC_CDP = item.FEC_CDP;
                            cdp.VAL_CDP = item.VAL_CDP;
                            cdp.VIG_FUT = item.VIG_FUT;
                            ctx.SaveChanges();
                        }

                    }
                    EliminarRubros(item.EP_RUBROS_CDP, item.ID);
                    NuevosRubrosCDP(item.EP_RUBROS_CDP.Where(t => t.ES_NUEVO == true).ToList(), item.NRO_CDP, item.ID);
                    ModificarRubros(item.EP_RUBROS_CDP.Where(t => t.ES_MODIF == true).ToList());
                }
            }
            private void EliminarRubros(ICollection<vEP_RUBROS_CDP_DTO> lRubros, decimal ID_EP_CDP)
            {
                List<EP_RUBROS_CDP> lRubrosOld = ctx.EP_RUBROS_CDP.Where(t => t.ID_EP_CDP == ID_EP_CDP).ToList();
                foreach (EP_RUBROS_CDP item in lRubrosOld)
                {
                    bool ban = true;
                    foreach (vEP_RUBROS_CDP_DTO item2 in lRubros)
                    {
                        if (item.ID == item2.ID) ban = false;
                    }
                    if (ban)
                    {
                        ctx.EP_RUBROS_CDP.Remove(item);
                    }
                }
                ctx.SaveChanges();
            }
            private void ModificarRubros(ICollection<vEP_RUBROS_CDP_DTO> lRubros)
            {
                foreach (vEP_RUBROS_CDP_DTO item in lRubros)
                {
                    EP_RUBROS_CDP rubro = ctx.EP_RUBROS_CDP.Where(t => t.ID == item.ID).FirstOrDefault();
                    if (rubro != null)
                    {
                        rubro.VALOR = item.VALOR;
                        ctx.SaveChanges();
                    }
                }
            }
            
            #endregion
        }
        class cmdCrearPlantilla : absTemplate
        {
            public vESTPREV oDto { get; set; }
            public ESTPREV ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                return true;
            }

            protected override void Antes()
            {

                oDto.FEC_MOD_EP = DateTime.Now;
                ep = ctx.ESTPREV.Find(oDto.ID);
                if (ep != null)
                {
                    ep.NOM_PLA_EP = oDto.NOM_PLA_EP;
                    ep.ES_PLAN_EP = "S";
                    ctx.Entry(ep).State = EntityState.Modified;

                }

            }

            #endregion
        }
        class cmdRevisarEP : absTemplate
        {
            public vEP_HESTADOEP oDto { get; set; }
            public ESTPREV ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                return true;
            }

            protected override void Antes()
            {
                ep = ctx.ESTPREV.Where(t => t.CODIGO_EP == oDto.CODIGO_EP).FirstOrDefault();
                decimal ultId = obteneId();
                if (ep != null)
                {
                    EP_HESTADOEP reg = new EP_HESTADOEP();
                    reg.FSIS_EP = DateTime.Now;
                    reg.EST_EP = "AC";
                    reg.USAP_EP = oDto.USAP_EP;
                    reg.ID_EP = ep.ID;
                    reg.ID = ultId + 1;
                    reg.TIP_EP="RV";
                    reg.FEC_EP = oDto.FEC_EP;
                    ep.ID_REV = reg.ID;
                    ep.USAP_REV_EP = oDto.USAP_EP;
                    ep.EST_EP = "RV";
                    
                    ctx.Entry(reg).State = EntityState.Added;
                    ctx.Entry(ep).State = EntityState.Modified;
                }
            }

            private decimal obteneId() {
                decimal ultId;
                try
                {
                    ultId = ctx.EP_HESTADOEP.Max(t => t.ID);
                }
                catch
                {
                    ultId = 0;
                }
                return ultId;
            }

            #endregion
        }
        class cmdAprobarEP : absTemplate
        {
            public vEP_HESTADOEP oDto { get; set; }
            public ESTPREV ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                return true;
            }

            protected override void Antes()
            {
                ep = ctx.ESTPREV.Where(t => t.CODIGO_EP == oDto.CODIGO_EP).FirstOrDefault();
                decimal ultId = obteneId();
                if (ep != null)
                {
                    EP_HESTADOEP reg = new EP_HESTADOEP();
                    reg.FSIS_EP = DateTime.Now;
                    reg.EST_EP = "AC";
                    reg.USAP_EP = oDto.USAP_EP;
                    reg.ID_EP = ep.ID;
                    reg.ID = ultId + 1;
                    reg.TIP_EP = "AP";
                    reg.FEC_EP = oDto.FEC_EP;
                    ep.ID_APR = reg.ID;
                    ep.USAP_APR_EP = oDto.USAP_EP;
                    ep.EST_EP = "AP";

                    ctx.Entry(reg).State = EntityState.Added;
                    ctx.Entry(ep).State = EntityState.Modified;
                }
            }

            private decimal obteneId()
            {
                decimal ultId;
                try
                {
                    ultId = ctx.EP_HESTADOEP.Max(t => t.ID);
                }
                catch
                {
                    ultId = 0;
                }
                return ultId;
            }

            #endregion
        }
        class cmdDAprobarEP : absTemplate
        {
            public vEP_HESTADOEP oDto { get; set; }
            public ESTPREV ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                return true;
            }

            protected override void Antes()
            {
                ep = ctx.ESTPREV.Where(t => t.CODIGO_EP == oDto.CODIGO_EP).FirstOrDefault();
                decimal ultId = obteneId();
                if (ep != null)
                {
                    EP_HESTADOEP reg = new EP_HESTADOEP();
                    reg.FSIS_EP = DateTime.Now;
                    reg.EST_EP = "AC";
                    reg.USAP_EP = oDto.USAP_EP;
                    reg.ID_EP = ep.ID;
                    reg.ID = ultId + 1;
                    reg.TIP_EP = "DA";
                    reg.FEC_EP = oDto.FEC_EP;
                    ep.ID_REV = null;
                    ep.ID_APR = null;
                    ep.FEC_REV_EP = null;
                    ep.FEC_APR_EP= null;
                    ep.USAP_APR_EP = null;
                    ep.USAP_REV_EP = null;
                    ep.EST_EP = "EL";

                    ctx.Entry(reg).State = EntityState.Added;
                    ctx.Entry(ep).State = EntityState.Modified;
                }
            }

            private decimal obteneId()
            {
                decimal ultId;
                try
                {
                    ultId = ctx.EP_HESTADOEP.Max(t => t.ID);
                }
                catch
                {
                    ultId = 0;
                }
                return ultId;
            }

            #endregion
        }     
        class cmdAprobarEP2 : absTemplate
        {
            public vESTPREV oDto { get; set; }
            public ESTPREV ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                return true;
            }

            protected override void Antes()
            {

                oDto.FEC_REV_EP = DateTime.Now;
                ep = ctx.ESTPREV.Find(oDto.ID);
                decimal ultId = obteneId();
                if (ep != null)
                {
                    EP_HESTADOEP reg = new EP_HESTADOEP();

                    reg.FSIS_EP = DateTime.Now;
                    reg.EST_EP = "AC";
                    reg.ID = ultId + 1;
                    if (reg.TIP_EP == "RV")
                    {
                        ep.ID_REV = reg.ID;
                        ep.USAP_REV_EP = oDto.USAP_REV_EP;
                        ep.EST_EP = "RV";
                    }
                    if (reg.TIP_EP == "AP")
                    {
                        ep.ID_APR = reg.ID;
                        ep.USAP_REV_EP = oDto.USAP_APR_EP;
                        ep.EST_EP = "AP";
                    }
                    ep.EST_EP = reg.TIP_EP;

                    if (reg.TIP_EP == "DA")
                    {
                        ep.ID_REV = null;
                        ep.ID_APR = null;
                        ep.EST_EP = "EL";
                    }
                    ctx.Entry(reg).State = EntityState.Added;
                    ctx.Entry(ep).State = EntityState.Modified;
                }

            }

            private decimal obteneId()
            {
                decimal ultId;
                try
                {
                    ultId = ctx.EP_HESTADOEP.Max(t => t.ID);
                }
                catch
                {
                    ultId = 0;
                }
                return ultId;
            }

            #endregion
        }
        public List<vESTPREV> GetPlantillas(string Vigencia)
        {
            List<vESTPREV> lstD ;
            using (ctx = new Entities())
            {

                lstD = ctx.ESTPREV.Where(t => t.VIG_EP == Vigencia && t.ES_PLAN_EP == "S")
                    .Select(t => new vESTPREV { 
                     CODIGO_EP= t.CODIGO_EP,
                     NOM_PLA_EP = t.NOM_PLA_EP
                    }).ToList();
                
                return lstD;
            }
        }
    }
}
