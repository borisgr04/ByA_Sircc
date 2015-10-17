using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades.Consultas;
using Entidades;
using AutoMapper;

namespace BLL.Oracle
{
    public  class ReporteDinamico
    {
        public Entities ctx { get; set; }
        bool primero = true;
        public List<vRptaReporteDinamicoContratos> Consultar(vConsultaContratosDinamicaDto Reg)
        {
            using (ctx = new Entities())
            {
                List<vRptaReporteDinamicoContratos> lr = new List<vRptaReporteDinamicoContratos>();
                List<vCON_CONTRATOS_DINAMICO> lrContratos = new List<vCON_CONTRATOS_DINAMICO>();
                string Query = ArmarCadenaConsulta(Reg);
                List<vCON_CONTRATOS_DINAMICO> lContratos = ctx.Database.SqlQuery<vCON_CONTRATOS_DINAMICO>(Query).ToList();

                vRptaReporteDinamicoContratos ReportePrincipal = new vRptaReporteDinamicoContratos();
                ReportePrincipal.Nombre = "Reporte principal";
                ReportePrincipal.Html = ArmarTablaReporte(lContratos, Reg.lCamposMostrar);
                lr.Add(ReportePrincipal);

                List<vRptaReporteDinamicoContratos> lConsolidados = new List<vRptaReporteDinamicoContratos>();
                if (Reg.lCamposAgrupar.Count() >= 1) lConsolidados = Consolidados(Reg, Query);

                lConsolidados.ForEach(t => lr.Add(t));
                
                return lr;
            }
        }
        private string ArmarCadenaConsulta(vConsultaContratosDinamicaDto Reg)
        {
            string Query = "SELECT " + CamposTraer(Reg) + " FROM CONTRATOS " + InnersJoins();
            Query = AgregarFiltro(Query, true, "CONTRATOS.VAL_ADI", "<", "10000000");
            Query = AgregarFiltro(Query, Reg.chkVigencia, "VIG_CON", "=", Reg.Vigencia);
            Query = AgregarFiltro(Query, !Reg.chkAnulados, "EST_CON", "!=", "07");
            Query = AgregarFiltro(Query, Reg.chkNumeroContrato, "CONTRATOS.COD_CON", "=", Reg.NumeroContrato);
            Query = AgregarFiltro(Query, Reg.chkTipoContrato, "TIP_CON", "=", Reg.TipoContrato);
            Query = AgregarFiltro(Query, Reg.chkSubTipoContrato, "STIP_CON", "=", Reg.SubTipoContrato);
            Query = AgregarFiltro(Query, Reg.chkUltimaActa, "EST_CON", "=", Reg.UltimaActa);
            Query = AgregarFiltroEstado(Query, Reg.chkEstado, Reg.Estado);
            Query = AgregarFiltro(Query, Reg.chkSectorDestino, "COD_SEC", "=", Reg.SectorDestino);
            Query = AgregarFiltroProyecto(Query, Reg.chkProyecto, Reg.Proyecto);
            Query = AgregarFiltro(Query, Reg.chkDependenciaAcargo, "DEP_CON", "=", Reg.DependenciaAcargo);
            Query = AgregarFiltro(Query, Reg.chkDependenciaNecesidad, "DEP_PCON", "=", Reg.DependenciaNecesidad);
            Query = AgregarFiltroFecha(Query, Reg.chkFechaSuscripcion, "FEC_SUS_CON", ">=", Reg.FechaISuscripcion.ToString());
            Query = AgregarFiltroFecha(Query, Reg.chkFechaSuscripcion, "FEC_SUS_CON", "<=", Reg.FechaFSuscripcion.ToString());
            Query = AgregarFiltroFecha(Query, Reg.chkFechaRegistro, "FEC_REG", ">=", Reg.FechaIRegistro.ToString());
            Query = AgregarFiltroFecha(Query, Reg.chkFechaRegistro, "FEC_REG", "<=", Reg.FechaFRegistro.ToString());
            Query = AgregarFiltro(Query, Reg.chkContratista, "IDE_CON", "=", Reg.IdContratista);
            Query = AgregarFiltro(Query, Reg.chkInterventor, "IDE_REP", "=", Reg.IdInterventor);
            Query = AgregarFiltro(Query, Reg.chkTipoProceso, "COD_TPRO", "=", Reg.TipoProceso);
            Query = AgregarFiltroCDP(Query, Reg.chkDisponibilidadPresupuestal, Reg.DisponibilidadPresupuestal, Reg.VigenciaDisponibilidadPresupuestal);
            Query = AgregarFiltroRP(Query, Reg.chkRegistroPresupuestal, Reg.RegistroPresupuestal, Reg.VigenciaRegistroPresupuestal);
            Query = AgregarFiltroObjeto(Query, Reg.chkObjeto, Reg.Objeto);
            Query = AgregarFiltro(Query, Reg.chkValorContratoConvenio, "VAL_CON", ">=", Reg.ValorDesdePrecontractual);
            Query = AgregarFiltro(Query, Reg.chkValorContratoConvenio, "VAL_CON", "<=", Reg.ValorHastaPrecontractual);
            Query = AgregarFiltroRecurso(Query, Reg.chkRecurso, Reg.Recurso, Reg.Vigencia);
            return Query;
        }
        private string CamposTraer(vConsultaContratosDinamicaDto Reg)
        {
            string Campos = "";
            Campos += " CONTRATOS.NRO_CON," +
                        "CONTRATOS.IDE_CON," +
                        "CONTRATOS.OBJ_CON," +
                        "CONTRATOS.PRO_CON," +
                        "CONTRATOS.FEC_SUS_CON," +
                        "CONTRATOS.PLA_EJE_CON," +
                        "CONTRATOS.DEP_CON," +
                        "CONTRATOS.VIG_CON," +
                        "CONTRATOS.TIP_CON," +
                        "CONTRATOS.STIP_CON," +
                        "CONTRATOS.EST_CON," +
                        "CONTRATOS.VAL_CON," +
                        "CONTRATOS.DOC_CON," +
                        "CONTRATOS.COD_CON," +
                        "CONTRATOS.CAN_ADI," +
                        "(SELECT SUM(VAL_ADI) FROM ADICIONES WHERE COD_CON=CONTRATOS.COD_CON) AS VAL_ADI," +
                        "CONTRATOS.COD_SEC," +
                        "CONTRATOS.TIP_FOR," +
                        "CONTRATOS.OTR_CNS," +
                        "CONTRATOS.COD_TPRO," +
                        "CONTRATOS.NRO_PLA_CON," +
                        "CONTRATOS.IDE_REP," +
                        "CONTRATOS.USUARIO," +
                        "CONTRATOS.FEC_REG," +
                        "CONTRATOS.OBS_DOC_CON," +
                        "CONTRATOS.URG_MAN," +
                        "CONTRATOS.EST_CONV," +
                        "CONTRATOS.FEC_APR_POL," +
                        "CONTRATOS.EXO_IMP," +
                        "CONTRATOS.EXO_OBS," +
                        "CONTRATOS.PRO_SEL_NRO," +
                        "CONTRATOS.DEP_PCON," +
                        "CONTRATOS.VAL_APO_GOB," +
                        "CONTRATOS.COD_CON0," +
                        "CONTRATOS.FEC_ULT_MOD," +
                        "CONTRATOS.USER_ACT," +
                        "CONTRATOS.LEGALIZADO," +
                        "CONTRATOS.PER_APO," +
                        "CONTRATOS.ANTICIPO," +
                        "CONTRATOS.NEMPLEOS," +
                        "CONTRATOS.AGOTAR_PPTO," +
                        "CONTRATOS.LUG_EJE," +
                        "CONTRATOS.NUM_PROC," +
                        "CONTRATOS.TIPO_PLAZO," +
                        "CONTRATOS.TIP_RADICACION," +
                        "CONTRATOS.GRUPO," +
                        "CONTRATOS.ENCARGADO," +
                        "CONTRATOS.CONSIDERANDOS," +
                        "CONTRATOS.APORTES," +
                        "CONTRATOS.PLAZO2_EJE_CON," +
                        "CONTRATOS.TIPO_PLAZO2," +
                        "CONTRATOS.VAL_SIN_IVA," +
                        "CONTRATOS.INTERVENTORIA," +
                        "CONTRATOS.EXENPOL," +
                        "CONTRATOS.OBS_POLIZA," +
                        "CONTRATOS.OBS_CDP," +
                        "CONTRATOS.OBS_PROYECTOS," +
                        "CONTRATOS.REVISADOPOR," +
                        "CONTRATOS.RES_APR_POL," +
                        "CONTRATOS.DEP_SUP," +
                        "CONTRATOS.TIPO_FP," +
                        "CONTRATOS.ANTI_PORC," +
                        "CONTRATOS.PLIQ_EP," +
                        "CONTRATOS.OBLIGC," +
                        "CONTRATOS.OBLIGE," +

                        "DEPENDENCIA.NOM_DEP AS DEPENDENCIA, " +
                        "TIPOSCONT.NOM_TIP AS TIPOCONT," +
                        "CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CON.NOM1_TER,' '),CON.NOM2_TER), ' '),CON.APE1_TER),' '), CON.APE2_TER) AS CONTRATISTA," +
                        "ESTADOS.ESTADO AS ESTADO," +
                        "SECTOR.NOM_SEC AS SECTOR," +
                        "CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(REP_LEG.NOM1_TER,' '),REP_LEG.NOM2_TER), ' '),REP_LEG.APE1_TER),' '), REP_LEG.APE2_TER) AS REP_LEG," +
                        "SUB_TIPOS.NOM_STIP AS SUB_TIPO," +
                        "TP.NOM_TPROC AS TIPO_PROCESO," +
                        "DEPENDENCIAP.NOM_DEP AS DEPENDENCIAP," +
                        "INT_TER_CON.IDE_TER AS IDE_TER_INTV," +
                        "SUP_TER_CON.IDE_TER AS IDE_TER_SUP," +
                        "CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(INT_TER_CON.NOM1_TER,' '),INT_TER_CON.NOM2_TER), ' '),INT_TER_CON.APE1_TER),' '), INT_TER_CON.APE2_TER) AS NOM_TER_INTV," +
                        "CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(SUP_TER_CON.NOM1_TER,' '),SUP_TER_CON.NOM2_TER), ' '),SUP_TER_CON.APE1_TER),' '), SUP_TER_CON.APE2_TER) AS NOM_TER_SUP," +
                        "CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(ABOG.NOM1_TER,' '),ABOG.NOM2_TER), ' '),ABOG.APE1_TER),' '), ABOG.APE2_TER) AS ABOGADO," +
                        "CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(REVPOR.NOM1_TER,' '),REVPOR.NOM2_TER), ' '),REVPOR.APE1_TER),' '), REVPOR.APE2_TER) AS REVISADO_POR," +
                        "TP.NOM_PLA AS TTIPO_PLAZO," +
                        "TP2.NOM_PLA AS TTIPO_PLAZO2," +
                        "ESTCONFI.FEC_ENT AS FECHA_INICIAL," +
                        "ESTCONFF.FEC_ENT AS FECHA_FINAL," +
                        "ESTCONLQ.FEC_ENT AS FECHA_LIQ," +

                        " (CASE " +
                            " WHEN CONTRATOS.TIPO_PLAZO = 'A' THEN CONTRATOS.PLA_EJE_CON * 360 " +
                            " WHEN CONTRATOS.TIPO_PLAZO = 'M' THEN CONTRATOS.PLA_EJE_CON * 30 " +
                            " WHEN CONTRATOS.TIPO_PLAZO = 'D' THEN CONTRATOS.PLA_EJE_CON " +
                            " ELSE 0 " +
                            " END)  + " +

                            " (CASE " +
                            " WHEN CONTRATOS.TIPO_PLAZO2 = 'A' THEN CONTRATOS.PLAZO2_EJE_CON * 360 " +
                            " WHEN CONTRATOS.TIPO_PLAZO2 = 'M' THEN CONTRATOS.PLAZO2_EJE_CON * 30 " +
                            " WHEN CONTRATOS.TIPO_PLAZO2 = 'D' THEN CONTRATOS.PLAZO2_EJE_CON " +
                            " ELSE 0 " +
                            " END) AS TOTAL_PLAZO, " +

                        " (SELECT  " +
                           " SUM( " +
                           " (CASE   " +
                           " WHEN AD.TIPO_PLAZO1_ADI = 'A' THEN AD.PLA_EJE_ADI * 360   " +
                           " WHEN AD.TIPO_PLAZO1_ADI = 'M' THEN AD.PLA_EJE_ADI * 30   " +
                           " WHEN AD.TIPO_PLAZO1_ADI = 'D' THEN AD.PLA_EJE_ADI   " +
                           " ELSE 0   " +
                           " END)  " +
                           " +   " +
                           " (CASE   " +
                           " WHEN AD.TIPO_PLAZO2_ADI = 'A' THEN AD.PLAZO2_ADI * 360   " +
                           " WHEN AD.TIPO_PLAZO2_ADI = 'M' THEN AD.PLAZO2_ADI * 30   " +
                           " WHEN AD.TIPO_PLAZO2_ADI = 'D' THEN AD.PLAZO2_ADI   " +
                           " ELSE 0   " +
                           " END) " +
                           " ) AS TOTAL_PLAZO_ADICION " +
                           " FROM CONTRATOS CON " +
                           " LEFT JOIN ADICIONES AD ON CON.COD_CON = AD.COD_CON " +
                           " WHERE CON.COD_CON = CONTRATOS.COD_CON " +
                           " GROUP BY  " +
                           " CON.COD_CON) AS TOTAL_PLAZO_ADICION " +
                            "";
            return Campos;
            #region SoloCamposMostar
            //string Campos = "";
            //if (Reg.lCamposMostrar.Where(t => t == "NRO_CON").FirstOrDefault() != null) Campos += " CONTRATOS.NRO_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "IDE_CON").FirstOrDefault() != null) Campos += " CONTRATOS.IDE_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "OBJ_CON").FirstOrDefault() != null) Campos += " CONTRATOS.OBJ_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "PRO_CON").FirstOrDefault() != null) Campos += " CONTRATOS.PRO_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "FEC_SUS_CON").FirstOrDefault() != null) Campos += " CONTRATOS.FEC_SUS_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "PLA_EJE_CON").FirstOrDefault() != null) Campos += " CONTRATOS.PLA_EJE_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "DEP_CON").FirstOrDefault() != null) Campos += " CONTRATOS.DEP_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "VIG_CON").FirstOrDefault() != null) Campos += " CONTRATOS.VIG_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "TIP_CON").FirstOrDefault() != null) Campos += " CONTRATOS.TIP_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "STIP_CON").FirstOrDefault() != null) Campos += " CONTRATOS.STIP_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "EST_CON").FirstOrDefault() != null) Campos += " CONTRATOS.EST_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "VAL_CON").FirstOrDefault() != null) Campos += " CONTRATOS.VAL_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "DOC_CON").FirstOrDefault() != null) Campos += " CONTRATOS.DOC_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "COD_CON").FirstOrDefault() != null) Campos += " CONTRATOS.COD_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "CAN_ADI").FirstOrDefault() != null) Campos += " CONTRATOS.CAN_ADI,";
            //if (Reg.lCamposMostrar.Where(t => t == "VAL_ADI").FirstOrDefault() != null) Campos += " (SELECT SUM(VAL_ADI) FROM ADICIONES WHERE COD_CON=CONTRATOS.COD_CON) AS VAL_ADI,";
            //if (Reg.lCamposMostrar.Where(t => t == "COD_SEC").FirstOrDefault() != null) Campos += " CONTRATOS.COD_SEC,";
            //if (Reg.lCamposMostrar.Where(t => t == "TIP_FOR").FirstOrDefault() != null) Campos += " CONTRATOS.TIP_FOR,";
            //if (Reg.lCamposMostrar.Where(t => t == "OTR_CNS").FirstOrDefault() != null) Campos += " CONTRATOS.OTR_CNS,";
            //if (Reg.lCamposMostrar.Where(t => t == "COD_TPRO").FirstOrDefault() != null) Campos += " CONTRATOS.COD_TPRO,";
            //if (Reg.lCamposMostrar.Where(t => t == "NRO_PLA_CON").FirstOrDefault() != null) Campos += " CONTRATOS.NRO_PLA_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "IDE_REP").FirstOrDefault() != null) Campos += " CONTRATOS.IDE_REP,";
            //if (Reg.lCamposMostrar.Where(t => t == "USUARIO").FirstOrDefault() != null) Campos += " CONTRATOS.USUARIO,";
            //if (Reg.lCamposMostrar.Where(t => t == "FEC_REG").FirstOrDefault() != null) Campos += " CONTRATOS.FEC_REG,";
            //if (Reg.lCamposMostrar.Where(t => t == "OBS_DOC_CON").FirstOrDefault() != null) Campos += " CONTRATOS.OBS_DOC_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "URG_MAN").FirstOrDefault() != null) Campos += " CONTRATOS.URG_MAN,";
            //if (Reg.lCamposMostrar.Where(t => t == "EST_CONV").FirstOrDefault() != null) Campos += " CONTRATOS.EST_CONV,";
            //if (Reg.lCamposMostrar.Where(t => t == "FEC_APR_POL").FirstOrDefault() != null) Campos += " CONTRATOS.FEC_APR_POL,";
            //if (Reg.lCamposMostrar.Where(t => t == "EXO_IMP").FirstOrDefault() != null) Campos += " CONTRATOS.EXO_IMP,";
            //if (Reg.lCamposMostrar.Where(t => t == "EXO_OBS").FirstOrDefault() != null) Campos += " CONTRATOS.EXO_OBS,";
            //if (Reg.lCamposMostrar.Where(t => t == "PRO_SEL_NRO").FirstOrDefault() != null) Campos += " CONTRATOS.PRO_SEL_NRO,";
            //if (Reg.lCamposMostrar.Where(t => t == "DEP_PCON").FirstOrDefault() != null) Campos += " CONTRATOS.DEP_PCON,";
            //if (Reg.lCamposMostrar.Where(t => t == "VAL_APO_GOB").FirstOrDefault() != null) Campos += " CONTRATOS.VAL_APO_GOB,";
            //if (Reg.lCamposMostrar.Where(t => t == "COD_CON0").FirstOrDefault() != null) Campos += " CONTRATOS.COD_CON0,";
            //if (Reg.lCamposMostrar.Where(t => t == "FEC_ULT_MOD").FirstOrDefault() != null) Campos += " CONTRATOS.FEC_ULT_MOD,";
            //if (Reg.lCamposMostrar.Where(t => t == "USER_ACT").FirstOrDefault() != null) Campos += " CONTRATOS.USER_ACT,";
            //if (Reg.lCamposMostrar.Where(t => t == "LEGALIZADO").FirstOrDefault() != null) Campos += " CONTRATOS.LEGALIZADO,";
            //if (Reg.lCamposMostrar.Where(t => t == "PER_APO").FirstOrDefault() != null) Campos += " CONTRATOS.PER_APO,";
            //if (Reg.lCamposMostrar.Where(t => t == "ANTICIPO").FirstOrDefault() != null) Campos += " CONTRATOS.ANTICIPO,";
            //if (Reg.lCamposMostrar.Where(t => t == "NEMPLEOS").FirstOrDefault() != null) Campos += " CONTRATOS.NEMPLEOS,";
            //if (Reg.lCamposMostrar.Where(t => t == "AGOTAR_PPTO").FirstOrDefault() != null) Campos += " CONTRATOS.AGOTAR_PPTO,";
            //if (Reg.lCamposMostrar.Where(t => t == "LUG_EJE").FirstOrDefault() != null) Campos += " CONTRATOS.LUG_EJE,";
            //if (Reg.lCamposMostrar.Where(t => t == "NUM_PROC").FirstOrDefault() != null) Campos += " CONTRATOS.NUM_PROC,";
            //if (Reg.lCamposMostrar.Where(t => t == "TIPO_PLAZO").FirstOrDefault() != null) Campos += " CONTRATOS.TIPO_PLAZO,";
            //if (Reg.lCamposMostrar.Where(t => t == "TIP_RADICACION").FirstOrDefault() != null) Campos += " CONTRATOS.TIP_RADICACION,";
            //if (Reg.lCamposMostrar.Where(t => t == "GRUPO").FirstOrDefault() != null) Campos += " CONTRATOS.GRUPO,";
            //if (Reg.lCamposMostrar.Where(t => t == "ENCARGADO").FirstOrDefault() != null) Campos += " CONTRATOS.ENCARGADO,";
            //if (Reg.lCamposMostrar.Where(t => t == "CONSIDERANDOS").FirstOrDefault() != null) Campos += " CONTRATOS.CONSIDERANDOS,";
            //if (Reg.lCamposMostrar.Where(t => t == "APORTES").FirstOrDefault() != null) Campos += " CONTRATOS.APORTES,";
            //if (Reg.lCamposMostrar.Where(t => t == "PLAZO2_EJE_CON").FirstOrDefault() != null) Campos += " CONTRATOS.PLAZO2_EJE_CON,";
            //if (Reg.lCamposMostrar.Where(t => t == "TIPO_PLAZO2").FirstOrDefault() != null) Campos += " CONTRATOS.TIPO_PLAZO2,";
            //if (Reg.lCamposMostrar.Where(t => t == "VAL_SIN_IVA").FirstOrDefault() != null) Campos += " CONTRATOS.VAL_SIN_IVA,";
            //if (Reg.lCamposMostrar.Where(t => t == "INTERVENTORIA").FirstOrDefault() != null) Campos += " CONTRATOS.INTERVENTORIA,";
            //if (Reg.lCamposMostrar.Where(t => t == "EXENPOL").FirstOrDefault() != null) Campos += " CONTRATOS.EXENPOL,";
            //if (Reg.lCamposMostrar.Where(t => t == "OBS_POLIZA").FirstOrDefault() != null) Campos += " CONTRATOS.OBS_POLIZA,";
            //if (Reg.lCamposMostrar.Where(t => t == "OBS_CDP").FirstOrDefault() != null) Campos += " CONTRATOS.OBS_CDP,";
            //if (Reg.lCamposMostrar.Where(t => t == "OBS_PROYECTOS").FirstOrDefault() != null) Campos += " CONTRATOS.OBS_PROYECTOS,";
            //if (Reg.lCamposMostrar.Where(t => t == "REVISADOPOR").FirstOrDefault() != null) Campos += " CONTRATOS.REVISADOPOR,";
            //if (Reg.lCamposMostrar.Where(t => t == "RES_APR_POL").FirstOrDefault() != null) Campos += " CONTRATOS.RES_APR_POL,";
            //if (Reg.lCamposMostrar.Where(t => t == "DEP_SUP").FirstOrDefault() != null) Campos += " CONTRATOS.DEP_SUP,";
            //if (Reg.lCamposMostrar.Where(t => t == "TIPO_FP").FirstOrDefault() != null) Campos += " CONTRATOS.TIPO_FP,";
            //if (Reg.lCamposMostrar.Where(t => t == "ANTI_PORC").FirstOrDefault() != null) Campos += " CONTRATOS.ANTI_PORC,";
            //if (Reg.lCamposMostrar.Where(t => t == "PLIQ_EP").FirstOrDefault() != null) Campos += " CONTRATOS.PLIQ_EP,";
            //if (Reg.lCamposMostrar.Where(t => t == "OBLIGC").FirstOrDefault() != null) Campos += " CONTRATOS.OBLIGC,";
            //if (Reg.lCamposMostrar.Where(t => t == "OBLIGE").FirstOrDefault() != null) Campos += " CONTRATOS.OBLIGE,";

            //if (Reg.lCamposMostrar.Where(t => t == "DEPENDENCIA").FirstOrDefault() != null) Campos += " DEPENDENCIA.NOM_DEP AS DEPENDENCIA,";
            //if (Reg.lCamposMostrar.Where(t => t == "TIPOCONT").FirstOrDefault() != null) Campos += " TIPOSCONT.NOM_TIP AS TIPOCONT,";
            //if (Reg.lCamposMostrar.Where(t => t == "CONTRATISTA").FirstOrDefault() != null) Campos += " CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CON.NOM1_TER,' '),CON.NOM2_TER), ' '),CON.APE1_TER),' '), CON.APE2_TER) AS CONTRATISTA,";
            //if (Reg.lCamposMostrar.Where(t => t == "ESTADO").FirstOrDefault() != null) Campos += " ESTADOS.ESTADO AS ESTADO,";
            //if (Reg.lCamposMostrar.Where(t => t == "SECTOR").FirstOrDefault() != null) Campos += " SECTOR.NOM_SEC AS SECTOR,";
            //if (Reg.lCamposMostrar.Where(t => t == "REP_LEG").FirstOrDefault() != null) Campos += " CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(REP_LEG.NOM1_TER,' '),REP_LEG.NOM2_TER), ' '),REP_LEG.APE1_TER),' '), REP_LEG.APE2_TER) AS REP_LEG,";
            //if (Reg.lCamposMostrar.Where(t => t == "SUB_TIPO").FirstOrDefault() != null) Campos += " SUB_TIPOS.NOM_STIP AS SUB_TIPO,";
            //if (Reg.lCamposMostrar.Where(t => t == "TIPO_PROCESO").FirstOrDefault() != null) Campos += " TP.NOM_TPROC AS TIPO_PROCESO,";
            //if (Reg.lCamposMostrar.Where(t => t == "DEPENDENCIAP").FirstOrDefault() != null) Campos += " DEPENDENCIAP.NOM_DEP AS DEPENDENCIAP,";
            //if (Reg.lCamposMostrar.Where(t => t == "IDE_TER_INTV").FirstOrDefault() != null) Campos += " INT_TER_CON.IDE_TER AS IDE_TER_INTV,";
            //if (Reg.lCamposMostrar.Where(t => t == "IDE_TER_SUP").FirstOrDefault() != null) Campos += " SUP_TER_CON.IDE_TER AS IDE_TER_SUP,";
            //if (Reg.lCamposMostrar.Where(t => t == "NOM_TER_INTV").FirstOrDefault() != null) Campos += " CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(INT_TER_CON.NOM1_TER,' '),INT_TER_CON.NOM2_TER), ' '),INT_TER_CON.APE1_TER),' '), INT_TER_CON.APE2_TER) AS NOM_TER_INTV,";
            //if (Reg.lCamposMostrar.Where(t => t == "NOM_TER_SUP").FirstOrDefault() != null) Campos += " CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(SUP_TER_CON.NOM1_TER,' '),SUP_TER_CON.NOM2_TER), ' '),SUP_TER_CON.APE1_TER),' '), SUP_TER_CON.APE2_TER) AS NOM_TER_SUP,";
            //if (Reg.lCamposMostrar.Where(t => t == "ABOGADO").FirstOrDefault() != null) Campos += " CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(ABOG.NOM1_TER,' '),ABOG.NOM2_TER), ' '),ABOG.APE1_TER),' '), ABOG.APE2_TER) AS ABOGADO,";
            //if (Reg.lCamposMostrar.Where(t => t == "REVISADO_POR").FirstOrDefault() != null) Campos += " CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(REVPOR.NOM1_TER,' '),REVPOR.NOM2_TER), ' '),REVPOR.APE1_TER),' '), REVPOR.APE2_TER) AS REVISADO_POR,";
            //if (Reg.lCamposMostrar.Where(t => t == "TTIPO_PLAZO").FirstOrDefault() != null) Campos += " TP.NOM_PLA AS TTIPO_PLAZO,";
            //if (Reg.lCamposMostrar.Where(t => t == "TTIPO_PLAZO2").FirstOrDefault() != null) Campos += " TP2.NOM_PLA AS TTIPO_PLAZO2,";
            //if (Reg.lCamposMostrar.Where(t => t == "FECHA_INICIAL").FirstOrDefault() != null) Campos += " ESTCONFI.FEC_ENT AS FECHA_INICIAL,";
            //if (Reg.lCamposMostrar.Where(t => t == "FECHA_FINAL").FirstOrDefault() != null) Campos += " ESTCONFF.FEC_ENT AS FECHA_FINAL,";
            //if (Reg.lCamposMostrar.Where(t => t == "FECHA_LIQ").FirstOrDefault() != null) Campos += " ESTCONLQ.FEC_ENT AS FECHA_LIQ,";

            //if (Reg.lCamposMostrar.Where(t => t == "TOTAL_PLAZO").FirstOrDefault() != null) Campos += " (CASE " +
            //                " WHEN CONTRATOS.TIPO_PLAZO = 'A' THEN CONTRATOS.PLA_EJE_CON * 360 " +
            //                " WHEN CONTRATOS.TIPO_PLAZO = 'M' THEN CONTRATOS.PLA_EJE_CON * 30 " +
            //                " WHEN CONTRATOS.TIPO_PLAZO = 'D' THEN CONTRATOS.PLA_EJE_CON " +
            //                " ELSE 0 " +
            //                " END)  + " +

            //                " (CASE " +
            //                " WHEN CONTRATOS.TIPO_PLAZO2 = 'A' THEN CONTRATOS.PLAZO2_EJE_CON * 360 " +
            //                " WHEN CONTRATOS.TIPO_PLAZO2 = 'M' THEN CONTRATOS.PLAZO2_EJE_CON * 30 " +
            //                " WHEN CONTRATOS.TIPO_PLAZO2 = 'D' THEN CONTRATOS.PLAZO2_EJE_CON " +
            //                " ELSE 0 " +
            //                " END) AS TOTAL_PLAZO,";



            //if (Reg.lCamposMostrar.Where(t => t == "TOTAL_PLAZO_ADICION").FirstOrDefault() != null) Campos += " (SELECT  " +
            //               " SUM( " +
            //               " (CASE   " +
            //               " WHEN AD.TIPO_PLAZO1_ADI = 'A' THEN AD.PLA_EJE_ADI * 360   " +
            //               " WHEN AD.TIPO_PLAZO1_ADI = 'M' THEN AD.PLA_EJE_ADI * 30   " +
            //               " WHEN AD.TIPO_PLAZO1_ADI = 'D' THEN AD.PLA_EJE_ADI   " +
            //               " ELSE 0   " +
            //               " END)  " +
            //               " +   " +
            //               " (CASE   " +
            //               " WHEN AD.TIPO_PLAZO2_ADI = 'A' THEN AD.PLAZO2_ADI * 360   " +
            //               " WHEN AD.TIPO_PLAZO2_ADI = 'M' THEN AD.PLAZO2_ADI * 30   " +
            //               " WHEN AD.TIPO_PLAZO2_ADI = 'D' THEN AD.PLAZO2_ADI   " +
            //               " ELSE 0   " +
            //               " END) " +
            //               " ) AS TOTAL_PLAZO_ADICION " +
            //               " FROM CONTRATOS CON " +
            //               " LEFT JOIN ADICIONES AD ON CON.COD_CON = AD.COD_CON " +
            //               " WHERE CON.COD_CON = CONTRATOS.COD_CON " +
            //               " GROUP BY  " +
            //               " CON.COD_CON) AS TOTAL_PLAZO_ADICION,";

            //Campos = Campos.TrimEnd(',');

            //return Campos;
            #endregion
        }
        private string InnersJoins()
        {
            string Inners = "";
            Inners += " INNER JOIN DEPENDENCIA ON CONTRATOS.DEP_CON = DEPENDENCIA.COD_DEP " +
                        " INNER JOIN TIPOSCONT ON CONTRATOS.TIP_CON = TIPOSCONT.COD_TIP " +
                        " INNER JOIN TERCEROS CON ON CONTRATOS.IDE_CON = CON.IDE_TER " +
                        " INNER JOIN ESTADOS ON CONTRATOS.EST_CON = ESTADOS.COD_EST " +
                        " INNER JOIN SECTOR ON CONTRATOS.COD_SEC = SECTOR.COD_SEC " +
                        " INNER JOIN TERCEROS REP_LEG ON CONTRATOS.IDE_REP = REP_LEG.IDE_TER " +
                        " INNER JOIN SUBTIPOS SUB_TIPOS ON CONTRATOS.STIP_CON = SUB_TIPOS.COD_STIP " +
                        " INNER JOIN TIPOSPROC TP ON CONTRATOS.COD_TPRO = TP.COD_TPROC " +
                        " LEFT JOIN DEPENDENCIA DEPENDENCIAP ON CONTRATOS.DEP_PCON = DEPENDENCIAP.COD_DEP " +
                        " LEFT JOIN INTERVENTORES_CONTRATO INTCONT ON CONTRATOS.COD_CON = INTCONT.COD_CON AND INTCONT.TIP_INT = 'I' " +
                        " LEFT JOIN TERCEROS INT_TER_CON ON INTCONT.IDE_INT = INT_TER_CON.IDE_TER " +
                        " LEFT JOIN INTERVENTORES_CONTRATO SUPCONT ON CONTRATOS.COD_CON = SUPCONT.COD_CON AND SUPCONT.TIP_INT = 'S' " +
                        " LEFT JOIN TERCEROS SUP_TER_CON ON SUPCONT.IDE_INT = SUP_TER_CON.IDE_TER " +
                        " LEFT JOIN TERCEROS ABOG ON CONTRATOS.ENCARGADO = ABOG.IDE_TER " +
                        " LEFT JOIN TERCEROS REVPOR ON CONTRATOS.REVISADOPOR = REVPOR.IDE_TER " +
                        " LEFT JOIN TIPO_PLAZOS TP ON TP.COD_TPLA = CONTRATOS.TIPO_PLAZO " +
                        " LEFT JOIN TIPO_PLAZOS TP2 ON TP2.COD_TPLA = CONTRATOS.TIPO_PLAZO2 " +
                        " LEFT JOIN ESTCONTRATOS ESTCONFI ON CONTRATOS.COD_CON = ESTCONFI.COD_CON AND ESTCONFI.EST_FIN = '01' AND ESTCONFI.ESTADO = 'AC' " +
                        " LEFT JOIN ESTCONTRATOS ESTCONFF ON CONTRATOS.COD_CON = ESTCONFF.COD_CON AND ESTCONFF.EST_FIN = '05' AND ESTCONFF.ESTADO = 'AC' " +
                        " LEFT JOIN ESTCONTRATOS ESTCONLQ ON CONTRATOS.COD_CON = ESTCONLQ.COD_CON AND ESTCONLQ.EST_FIN = '06' AND ESTCONLQ.ESTADO = 'AC' " +
                        " LEFT JOIN ADICIONES ON CONTRATOS.COD_CON = ADICIONES.COD_CON " +
                        "";
            return Inners;
        }
        private string AgregarFiltro(string Query, bool Check, string CampoBD, string Operador, string Valor)
        {
            if (Check)
            {
                if (primero)
                {
                    Query += " WHERE " + CampoBD + " " + Operador + " '" + Valor + "' ";
                }
                else
                {
                    Query += " AND " + CampoBD + " " + Operador + " '" + Valor + "' ";
                }
                primero = false;
            }
            return Query;
        }
        private string AgregarFiltroFecha(string Query, bool Check, string CampoBD, string Operador, string Valor)
        {
            Valor = Valor.Replace("a. m.", "AM");
            Valor = Valor.Replace("p. m.", "PM");
            if (Check)
            {
                if (primero)
                {
                    Query += " WHERE " + CampoBD + " " + Operador + " To_Date ('" + Valor + "', 'DD/MM/YYYY HH:MI:SS AM' ) ";
                }
                else
                {
                    Query += " AND " + CampoBD + " " + Operador + " To_Date ('" + Valor + "', 'DD/MM/YYYY HH:MI:SS AM' ) ";
                }
                primero = false;
            }
            return Query;
        }
        private string AgregarFiltroEstado(string Query, bool Check, string Valor)
        {
            if (Check)
            {
                if (primero)
                {
                    Query += " WHERE EST_CON IN (SELECT COD_EST FROM ESTADOS WHERE ESTADO = '" + Valor + "') ";
                }
                else
                {
                    Query += " AND EST_CON IN (SELECT COD_EST FROM ESTADOS WHERE ESTADO = '" + Valor + "') ";
                }
                primero = false;
            }
            return Query;
        }
        private string AgregarFiltroProyecto(string Query, bool Check, string Valor)
        {
            if (Check)
            {
                if (primero)
                {
                    Query += " WHERE COD_CON IN(SELECT COD_CON FROM CPROYECTOS WHERE PROYECTO = '" + Valor + "')";
                }
                else
                {
                    Query += " AND COD_CON IN(SELECT COD_CON FROM CPROYECTOS WHERE PROYECTO = '" + Valor + "')";
                }
                primero = false;
            }
            return Query;
        }
        private string AgregarFiltroCDP(string Query, bool Check, string CDP, string Vigencia)
        {
            if (Check)
            {
                if (primero)
                {
                    Query += " WHERE COD_CON IN(SELECT COD_CON FROM CDP_CONTRATOS WHERE NRO_CDP = '" + CDP + "')";
                }
                else
                {
                    Query += " AND COD_CON IN(SELECT COD_CON FROM CDP_CONTRATOS WHERE NRO_CDP = '" + CDP + "')";
                }
                primero = false;
            }
            return Query;
        }
        private string AgregarFiltroRP(string Query, bool Check, string RP, string Vigencia)
        {
            if (Check)
            {
                if (primero)
                {
                    Query += " WHERE COD_CON IN(SELECT COD_CON FROM RP_CONTRATOS WHERE NRO_CDP = '" + RP + "' AND VIGENCIA = '" + Vigencia + "')";
                }
                else
                {
                    Query += " AND COD_CON IN(SELECT COD_CON FROM RP_CONTRATOS WHERE NRO_CDP = '" + RP + "' AND VIGENCIA = '" + Vigencia + "')";
                }
                primero = false;
            }
            return Query;
        }
        private string AgregarFiltroObjeto(string Query, bool Check, string Valor)
        {
            if (Check)
            {
                if (primero)
                {
                    Query += " WHERE UPPER(OBJ_CON) LIKE UPPER('%" + Valor + "%')";
                }
                else
                {
                    Query += " AND UPPER(OBJ_CON) LIKE UPPER('%" + Valor + "%')";
                }
                primero = false;
            }
            return Query;
        }
        private string AgregarFiltroRecurso(string Query, bool Check, string Recurso, string Vigencia)
        {
            if (Check)
            {
                if (primero)
                {
                    Query += " WHERE CONTRATOS.COD_CON IN (SELECT DISTINCT COD_CON FROM (SELECT r.COD_RUB, r.DES_RUB, r.VIGENCIA, r.COD_UNIDAD, r.COD_RECURSO, r.CLASE, rc.cod_con, val_compromiso, nro_rp FROM rubros_contratos rc INNER JOIN rubros r ON rc.cod_rub = r.cod_rub AND r.vigencia = SUBSTR (cod_con, 1, 4)) WHERE COD_RECURSO = '" + Recurso + "' AND VIGENCIA = '" + Vigencia + "') ";
                }
                else
                {
                    Query += " AND CONTRATOS.COD_CON IN (SELECT DISTINCT COD_CON FROM (SELECT r.COD_RUB, r.DES_RUB, r.VIGENCIA, r.COD_UNIDAD, r.COD_RECURSO, r.CLASE, rc.cod_con, val_compromiso, nro_rp FROM rubros_contratos rc INNER JOIN rubros r ON rc.cod_rub = r.cod_rub AND r.vigencia = SUBSTR (cod_con, 1, 4)) WHERE COD_RECURSO = '" + Recurso + "' AND VIGENCIA = '" + Vigencia + "') ";
                }
                primero = false;
            }
            return Query;
        }
        private string ArmarTablaReporte(List<vCON_CONTRATOS_DINAMICO> lContratos, List<vCampos> lCamposMostrar)
        {
            string TablaReporte = "<table class='table table-bordered table-hover table-striped tablesorter' id='table0'>";
            #region TitulosTabla
            TablaReporte += "<thead><tr>";
            foreach (vCampos item in lCamposMostrar)
            {
                TablaReporte += "<th>" + item.name + "<i class='fa fa-sort'></i></th>";
            }
            TablaReporte += "</tr></thead>";
            #endregion
            #region CuerpoTabla
            TablaReporte += "<tbody>";
            foreach (vCON_CONTRATOS_DINAMICO item in lContratos)
            {
                TablaReporte += "<tr>";
                foreach (vCampos item2 in lCamposMostrar)
                {
                    TablaReporte += GetValueObject(item, item2.value);
                }
                TablaReporte += "</tr>";
            }
            TablaReporte += "</tbody>";
            #endregion
            TablaReporte += "</table>";
            return TablaReporte;
        }
        private string GetValueObject(vCON_CONTRATOS_DINAMICO Obj, string Campo)
        {
            switch (Campo)
            {
                case "TIPOCONT":
                    return "<td class='text-left'>" + Obj.TIPOCONT + "</td>";
                case "COD_CON":
                    return "<td class='text-right'>" + Obj.COD_CON + "</td>";
                case "OBJ_CON":
                    return "<td class='text-left'>" + Obj.OBJ_CON + "</td>";
                case "SUB_TIPO":
                    return "<td class='text-left'>" + Obj.SUB_TIPO + "</td>";
                case "DEPENDENCIA":
                    return "<td class='text-left'>" + Obj.DEPENDENCIA + "</td>";
                case "DEPENDENCIAP":
                    return "<td class='text-left'>" + Obj.DEPENDENCIAP + "</td>";
                case "FEC_SUS_CON":
                    return "<td class='text-right'>" + (Obj.FEC_SUS_CON != null ? Obj.FEC_SUS_CON.ToShortDateString() : "") + "</td>";
                case "ESTADO":
                    return "<td class='text-left'>" + Obj.ESTADO + "</td>";
                case "TOTAL_PLAZO":
                    return "<td class='text-right'>" + ( Obj.TOTAL_PLAZO != null ? Obj.TOTAL_PLAZO.ToString() : "" ) + "</td>";
                case "VAL_CON":
                    return "<td class='text-right'>" + (Obj.VAL_CON != null ? Obj.VAL_CON.ToString("C") : "") + "</td>";
                case "APORTES":
                    return "<td class='text-right'>" + Obj.APORTES + "</td>";
                case "TIPO_PROCESO":
                    return "<td class='text-left'>" + Obj.TIPO_PROCESO + "</td>";
                case "NRO_CON":
                    return"<td class='text-right'>" + ( Obj.NRO_CON != null ? Obj.NRO_CON.ToString() : "" ) + "</td>";
                case "CAN_ADI":
                    return "<td class='text-right'>" + ( Obj.CAN_ADI != null ? Obj.CAN_ADI.ToString() : "") + "</td>";
                case "VAL_ADI":
                    return "<td class='text-right'>" + ( Obj.VAL_ADI != null ? decimal.Parse(Obj.VAL_ADI.ToString()).ToString("C") : "" ) + "</td>";
                case "TOTAL_PLAZO_ADICION":
                    return "<td class='text-right'>" + ( Obj.TOTAL_PLAZO_ADICION != null ? Obj.TOTAL_PLAZO_ADICION.ToString() : "" ) + "</td>";
                case "URG_MAN":
                    return "<td class='text-right'>" + Obj.URG_MAN + "</td>";
                case "EXO_IMP":
                    return "<td class='text-right'>" + Obj.EXO_IMP + "</td>";
                case "FEC_APR_POL":
                    return "<td class='text-left'>" + (Obj.FEC_APR_POL != null ? Obj.FEC_APR_POL.ToString() : "") + "</td>";
                case "IDE_CON":
                    return "<td class='text-right'>" + (Obj.IDE_CON != null ? Obj.IDE_CON.ToString() : "") + "</td>";
                case "CONTRATISTA":
                    return "<td class='text-left'>" + (Obj.CONTRATISTA != null ? Obj.CONTRATISTA.ToString() : "") + "</td>";
                case "IDE_TER_INTV":
                    return "<td class='text-right'>" + (Obj.IDE_TER_INTV != null ? Obj.IDE_TER_INTV.ToString() : "") + "</td>";
                case "NOM_TER_INTV":
                    return "<td class='text-left'>" + Obj.NOM_TER_INTV + "</td>";
                case "IDE_TER_SUP":
                    return "<td class='text-right'>" + Obj.IDE_TER_SUP + "</td>";
                case "NOM_TER_SUP":
                    return "<td class='text-left'>" + (Obj.NOM_TER_SUP != null ? Obj.NOM_TER_SUP.ToString() : "") + "</td>";
                case "IDE_REP":
                    return "<td class='text-right'>" + (Obj.IDE_REP != null ? Obj.IDE_REP.ToString() : "") + "</td>";
                case "REP_LEG":
                    return "<td class='text-left'>" + (Obj.REP_LEG != null ? Obj.REP_LEG.ToString() : "") + "</td>";
                case "FECHA_INICIAL":
                    return "<td class='text-left'>" + (Obj.FECHA_INICIAL != null ? Obj.FECHA_INICIAL.Value.ToShortDateString() : "") + "</td>";
                case "FECHA_FINAL":
                    return "<td class='text-left'>" + (Obj.FECHA_FINAL != null ? Obj.FECHA_FINAL.Value.ToShortDateString() : "") + "</td>";
                case "FECHA_LIQ":
                    return "<td class='text-left'>" + (Obj.FECHA_LIQ != null ? Obj.FECHA_LIQ.Value.ToShortDateString() : "") + "</td>";
                default:
                    return "";
            }
        }
        private List<vRptaReporteDinamicoContratos> Consolidados(vConsultaContratosDinamicaDto Reg, string Query)
        {
            int id_tabla = 1;
            List<vRptaReporteDinamicoContratos> lr = new List<vRptaReporteDinamicoContratos>();
            if (!Reg.AgruparIndividuales)
            {
                string newQuery = ArmarConsultaAgrupada(Reg.lCamposAgrupar, Query);
                List<vConsultaConsolidado> lConsolidadosUnico = ctx.Database.SqlQuery<vConsultaConsolidado>(newQuery).ToList();

                vRptaReporteDinamicoContratos ConsolidadoUnico = new vRptaReporteDinamicoContratos();
                ConsolidadoUnico.Nombre = "Consolidado";
                ConsolidadoUnico.Html = ArmarTablaConsolidado(lConsolidadosUnico, Reg.lCamposAgrupar, id_tabla.ToString());
                lr.Add(ConsolidadoUnico);
                return lr;
            }
            else
            {
                foreach (vCampos item in Reg.lCamposAgrupar)
                {
                    List<vCampos> l = new List<vCampos>(); 
                    l.Add(item);
                    string newQuery = ArmarConsultaAgrupada(l, Query);
                    List<vConsultaConsolidado> lConsolidadosIndividual = ctx.Database.SqlQuery<vConsultaConsolidado>(newQuery).ToList();

                    vRptaReporteDinamicoContratos ConsolidadoIndividual = new vRptaReporteDinamicoContratos();
                    ConsolidadoIndividual.Nombre = "Consolidado  " + item.name;

                    List<vCampos> lAux = new List<vCampos>();
                    lAux.Add(item);

                    ConsolidadoIndividual.Html = ArmarTablaConsolidado(lConsolidadosIndividual, lAux, id_tabla.ToString());
                    id_tabla++;
                    lr.Add(ConsolidadoIndividual);
                }                
            }
            return lr;
        }
        private string ArmarConsultaAgrupada(List<vCampos> lCampos, string Query)
        {
            string newQuery = "   SELECT " +
                                  CamposGroup(lCampos) +
                                " COUNT(*) AS CANTIDAD, " +
                                " SUM(VAL_CON) AS VALOR_INICIAL, " +
                                " SUM(VAL_APO_GOB) AS APORTES_PROPIOS, " +
                                " SUM(VAL_CON - VAL_APO_GOB) AS APORTES_OTROS, " +
                                " Sum(VAL_ADI) AS VALOR_ADICIONADO, " +
                                " Sum(VAL_ADI + VAL_CON) As VALOR_TOTAL " +
                                " FROM " +
                                " ( " +
                                  Query +
                                " ) " +
                                " GROUP BY " +
                                  CamposGroup2(lCampos);
            return newQuery;
        }
        private string CamposGroup2(List<vCampos> lCampos)
        {
            string Campos = " ";
            for (int i = 0; i < lCampos.Count(); i++)
            {
                if (i == 0) Campos += lCampos[i].value;
                else Campos += " , " + lCampos[i].value;
            }
            return Campos + " ";
        }
        private string CamposGroup(List<vCampos> lCampos)
        {
            string Campos = " ";
            for (int i = 0; i < lCampos.Count(); i++)
            {
                Campos += lCampos[i].value + " , ";
            }
            return Campos + " ";
        }
        private string ArmarTablaConsolidado(List<vConsultaConsolidado> lConsulta, List<vCampos> lCamposAgrupar, string id_tabla)
        {
            string TablaReporte = "<table class='table table-bordered table-hover table-striped tablesorter' id='table" + id_tabla + "'>";
            #region TitulosTabla
            TablaReporte += "<thead><tr>";
            foreach (vCampos item in lCamposAgrupar)
            {
                TablaReporte += "<th>" + item.name + "<i class='fa fa-sort'></i></th>";
            }
            TablaReporte += "<th> CANTIDAD <i class='fa fa-sort'></i></th>";
            TablaReporte += "<th> VALOR_INICIAL <i class='fa fa-sort'></i></th>";
            TablaReporte += "<th> APORTES_PROPIOS <i class='fa fa-sort'></i></th>";
            TablaReporte += "<th> APORTES_OTROS <i class='fa fa-sort'></i></th>";
            TablaReporte += "<th> VALOR_ADICIONADO <i class='fa fa-sort'></i></th>";
            TablaReporte += "<th> VALOR_TOTAL <i class='fa fa-sort'></i></th>";
            TablaReporte += "</tr></thead>";
            #endregion
            #region CuerpoTabla
            TablaReporte += "<tbody>";
            foreach (vConsultaConsolidado item in lConsulta)
            {
                TablaReporte += "<tr>";
                foreach (vCampos item2 in lCamposAgrupar)
                {
                    TablaReporte += "<td>" + GetValueObjectReporteDinamico(item, item2.value) + "</td>";
                }
                TablaReporte += "<td class='text-right'>" + item.CANTIDAD + "<i class='fa fa-sort'></i></td>";
                TablaReporte += "<td class='text-right'>" + GetValueDecimal(item.VALOR_INICIAL) +"<i class='fa fa-sort'></i></td>";
                TablaReporte += "<td class='text-right'>" + GetValueDecimal(item.APORTES_PROPIOS) + "<i class='fa fa-sort'></i></td>";
                TablaReporte += "<td class='text-right'>" + GetValueDecimal(item.APORTES_OTROS) + "<i class='fa fa-sort'></i></td>";
                TablaReporte += "<td class='text-right'>" + GetValueDecimal(item.VALOR_ADICIONADO) + "<i class='fa fa-sort'></i></td>";
                TablaReporte += "<td class='text-right'>" + GetValueDecimal(item.VALOR_TOTAL) + "<i class='fa fa-sort'></i></td>";
                TablaReporte += "</tr>";
            }
            TablaReporte += "</tbody>";
            #endregion
            TablaReporte += "</table>";
            return TablaReporte;
        }
        private string GetValueObjectReporteDinamico(vConsultaConsolidado Obj, string Campo)
        {
            switch (Campo)
            {
                case "TIPOCONT":
                    return Obj.TIPOCONT;
                case "SUB_TIPO":
                    return Obj.SUB_TIPO;
                case "DEPENDENCIA":
                    return Obj.DEPENDENCIA;
                case "DEPENDENCIAP":
                    return Obj.DEPENDENCIAP;
                case "ESTADO":
                    return Obj.ESTADO;
                case "TIPO_PROCESO":
                    return Obj.TIPO_PROCESO;
                case "CONTRATISTA":
                    return Obj.CONTRATISTA != null ? Obj.CONTRATISTA.ToString() : "";
                case "NOM_TER_INTV":
                    return Obj.NOM_TER_INTV;
                case "NOM_TER_SUP":
                    return Obj.NOM_TER_SUP;
                case "REP_LEG":
                    return Obj.REP_LEG;
                default:
                    return "";
            }
        }
        private string GetValueDecimal(decimal? Value)
        {
            if (Value == null) Value = 0;
            return decimal.Parse(Value.ToString()).ToString("C");
        }
    }
}