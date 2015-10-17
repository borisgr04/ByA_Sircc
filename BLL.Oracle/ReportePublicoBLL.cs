using Entidades;
using Entidades.Consultas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Oracle
{
    public class ReportePublicoBLL
    {
        bool primero = true;
        Entities ctx;
        public List<vCON_CONTRATOS_PUBLICA> Consultar(vConsultaContratosPublica Reg)
        {
            using (ctx = new Entities())
            {
                string Query = ArmarCadenaConsulta(Reg);
                List<vCON_CONTRATOS_PUBLICA> lContratos = ctx.Database.SqlQuery<vCON_CONTRATOS_PUBLICA>(Query).ToList();
                return lContratos;
            }
        }
        private string ArmarCadenaConsulta(vConsultaContratosPublica Reg)
        {
            string Query = "SELECT " + CamposTraer() + " FROM CONTRATOS " + InnersJoins();
            Query = AgregarFiltro(Query, Reg.chkVigencia, "VIG_CON", "=", Reg.Vigencia);
            Query = AgregarFiltro(Query, Reg.chkNumeroContrato, "CONTRATOS.COD_CON", "=", Reg.NumeroContrato);
            Query = AgregarFiltro(Query, Reg.chkTipoContrato, "TIP_CON", "=", Reg.TipoContrato);
            Query = AgregarFiltro(Query, Reg.chkDependenciaNecesidad, "DEP_PCON", "=", Reg.DependenciaNecesidad);
            Query = AgregarFiltro(Query, Reg.chkCedulaNitContratista, "IDE_CON", "=", Reg.CedulaNitContratista);
            Query = AgregarFiltroObjeto(Query, Reg.chkObjeto, Reg.Objeto);
            Query = AgregarFiltroNombreContratista(Query, Reg.chkNombreContratista, Reg.NombreContratista);
            return Query;
        }
        private string CamposTraer()
        {
            string Campos = "";
            Campos += " " +
                        "CONTRATOS.VIG_CON," +
                        "CONTRATOS.COD_CON," +
                        "CONTRATOS.OBJ_CON," +
                        "CONTRATOS.IDE_CON," +
                        "CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CON.NOM1_TER,' '),CON.NOM2_TER), ' '),CON.APE1_TER),' '), CON.APE2_TER) AS CONTRATISTA," +
                        "CONTRATOS.FEC_SUS_CON," +
                        "ESTADOS.ESTADO AS ESTADO," +
                        "TIPOSCONT.NOM_TIP AS TIPOCONT," +
                        "SUB_TIPOS.NOM_STIP AS SUB_TIPO," +
                        "CONTRATOS.VAL_CON," +
                        "CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(SUP_TER_CON.NOM1_TER,' '),SUP_TER_CON.NOM2_TER), ' '),SUP_TER_CON.APE1_TER),' '), SUP_TER_CON.APE2_TER) AS NOM_TER_SUP," +
                        "DEPENDENCIA.NOM_DEP AS DEPENDENCIA, " +
                        "ESTCONFI.FEC_ENT AS FECHA_INICIAL," +
                        "ESTCONFF.FEC_ENT AS FECHA_FINAL" +                     
                        "";
            return Campos;
        }
        private string InnersJoins()
        {
            string Inners = "";
            Inners +=   " INNER JOIN DEPENDENCIA ON CONTRATOS.DEP_CON = DEPENDENCIA.COD_DEP " +
                        " INNER JOIN TIPOSCONT ON CONTRATOS.TIP_CON = TIPOSCONT.COD_TIP " +
                        " INNER JOIN TERCEROS CON ON CONTRATOS.IDE_CON = CON.IDE_TER " +
                        " INNER JOIN ESTADOS ON CONTRATOS.EST_CON = ESTADOS.COD_EST " +
                        " INNER JOIN SUBTIPOS SUB_TIPOS ON CONTRATOS.STIP_CON = SUB_TIPOS.COD_STIP " +
                        " LEFT JOIN INTERVENTORES_CONTRATO SUPCONT ON CONTRATOS.COD_CON = SUPCONT.COD_CON AND SUPCONT.TIP_INT = 'S' " +
                        " LEFT JOIN TERCEROS SUP_TER_CON ON SUPCONT.IDE_INT = SUP_TER_CON.IDE_TER " +
                        " LEFT JOIN ESTCONTRATOS ESTCONFI ON CONTRATOS.COD_CON = ESTCONFI.COD_CON AND ESTCONFI.EST_FIN = '01' AND ESTCONFI.ESTADO = 'AC' " +
                        " LEFT JOIN ESTCONTRATOS ESTCONFF ON CONTRATOS.COD_CON = ESTCONFF.COD_CON AND ESTCONFF.EST_FIN = '05' AND ESTCONFF.ESTADO = 'AC' " +
                        " LEFT JOIN ESTCONTRATOS ESTCONLQ ON CONTRATOS.COD_CON = ESTCONLQ.COD_CON AND ESTCONLQ.EST_FIN = '06' AND ESTCONLQ.ESTADO = 'AC' " +
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
        private string AgregarFiltroNombreContratista(string Query, bool Check, string Valor)
        {
            if (Check)
            {
                if (primero)
                {
                    Query += " WHERE UPPER(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CON.APE1_TER,' '),CON.APE2_TER), ' '),CON.NOM1_TER),' '), CON.NOM2_TER)) LIKE UPPER('%" + Valor + "%') ";
                }
                else
                {
                    Query += " AND UPPER(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CON.APE1_TER,' '),CON.APE2_TER), ' '),CON.NOM1_TER),' '), CON.NOM2_TER)) LIKE UPPER('%" + Valor + "%') ";
                }
                primero = false;
            }
            return Query;
        }
    }
}
