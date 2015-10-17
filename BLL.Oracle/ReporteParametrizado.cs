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
    public class ReporteParametrizado
    {
        public Entities ctx { get; set; }
        bool primero = true;
        public List<vCON_CONTRATOS> Consultar(vConsultaContratosParametrizadaDto Reg)
        {
            using (ctx = new Entities())
            {
                List<vCON_CONTRATOS> lrContratos = new List<vCON_CONTRATOS>();
                string Query = ArmarCadenaConsulta(Reg);
                List<vCON_CONTRATOS> lContratos = ctx.Database.SqlQuery<vCON_CONTRATOS>(Query).ToList();                   
                return lContratos;
            }
        }
        private string ArmarCadenaConsulta(vConsultaContratosParametrizadaDto Reg)
        {
            string Query = "SELECT " + CamposTraer() + " FROM CONTRATOS " + InnersJoins();
            Query = AgregarFiltro(Query, true, "CONTRATOS.VAL_ADI", "<", "10000000");
            Query = AgregarFiltro(Query, Reg.chkVigencia, "VIG_CON", "=", Reg.Vigencia);
            Query = AgregarFiltro(Query, !Reg.chkAnulados, "EST_CON", "!=" , "07");
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
        private string CamposTraer()
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
                        //" LEFT JOIN ADICIONES ON CONTRATOS.COD_CON = ADICIONES.COD_CON " +
                        "";
            return Inners;
        }
        private string AgregarFiltro(string Query, bool Check, string CampoBD, string Operador, string Valor)
        {
            if (Check)
            {
                if (primero) { 
                    Query += " WHERE " + CampoBD + " " + Operador + " '" + Valor + "' ";                    
                }
                else { 
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
    }
}
