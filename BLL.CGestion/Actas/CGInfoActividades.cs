using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.CGestion.Filtros;
using ByA;
using Entidades;

namespace BLL.CGestion.Actas
{
    public class vDocInfoActividades : vContratosInt
    {
        public decimal ID { get; set; }
        public string CONTRATISTA_C2 { get; set; }
        public DateTime? FEC_INF { get; set; }
        public DateTime? FEC_INI { get; set; }
        public DateTime? FEC_FIN { get; set; }
        public string DES_INF { get; set; }
        public string NOT_INF { get; set; }
        public string NOT2_INF { get; set; }

    }
    public class CGInfoActividades : GenDocumento
    {
        
        protected INT_INFOCONT oInfo { get; set; }
        protected List<vDocInfoActividades> lep;
        public CGInfoActividades()
        {
        IdPlantilla = 40;//NUMERO DE PLANTILLA
        oInfo = new INT_INFOCONT();

        lep = new List<vDocInfoActividades>();
        }

        protected override void ObtenerTablasRelacionadas()
        {
        }
        protected override void ObtenerTablaDocumento()
        {
            dtDatos = ByAUtil.convertToDataTable(lep);
        }
        protected override bool ObtenerDocumento()
        {
            int idInfo = Convert.ToInt32(this.IdDocumento);
            var q = ctx.INT_INFOCONT.Where(t => t.ID == idInfo).FirstOrDefault();
            oInfo = q;
            if (oInfo != null)
            {
                vDocInfoActividades oinfoCont = new vDocInfoActividades
                {
                    Numero = oInfo.CONTRATOS.COD_CON,
                    Tipo = oInfo.CONTRATOS.TIPOSCONT.NOM_TIP + " " + oInfo.CONTRATOS.SUBTIPOS.NOM_STIP,
                    Objeto = oInfo.CONTRATOS.OBJ_CON,
                    Fecha_Suscripcion = oInfo.CONTRATOS.FEC_SUS_CON,
                    Valor_Contrato = oInfo.CONTRATOS.VAL_CON,
                    DependenciaNec = oInfo.CONTRATOS.DEPENDENCIA.NOM_DEP,
                    DependenciaDel = oInfo.CONTRATOS.DEPENDENCIA1.NOM_DEP,
                    Contratista = buildNomTer(oInfo.CONTRATOS.TERCEROS),
                    Ide_Contratista = oInfo.CONTRATOS.IDE_CON,
                    Dep_Nec = oInfo.CONTRATOS.DEP_CON,
                    Dep_Del = oInfo.CONTRATOS.DEP_PCON,
                    Vigencia = oInfo.CONTRATOS.VIG_CON,
                    Estado = oInfo.CONTRATOS.ESTADOS.ESTADO,
                    Cod_STip = oInfo.CONTRATOS.STIP_CON,
                    Cod_Tip = oInfo.CONTRATOS.TIP_CON,
                    NroProceso = oInfo.CONTRATOS.PRO_SEL_NRO,
                    Nom_Modalidad = buildModalidad(oInfo.CONTRATOS.COD_TPRO),
                    Ide_RepLegal = oInfo.CONTRATOS.IDE_REP,
                    Nom_RepLegal = buildTercero(oInfo.CONTRATOS.IDE_REP),
                    CONTRATISTA_C2 = buildContratistaC2(oInfo.CONTRATOS),
                    Ide_Interventor = oInfo.CONTRATOS.INTERVENTORES_CONTRATO.Where(t => t.EST_INT == "AC").Select(t => t.IDE_INT).FirstOrDefault(),
                    Nom_Interventor = buildTercero(oInfo.CONTRATOS.INTERVENTORES_CONTRATO.Where(t => t.EST_INT == "AC").Select(t => t.IDE_INT).FirstOrDefault()),
                    ID = oInfo.ID,
                    FEC_INF = oInfo.FEC_INF,
                    DES_INF = oInfo.DES_INF,
                    NOT_INF = oInfo.NOT_INF,
                    NOT2_INF = oInfo.NOT2_INF,
                    FEC_INI = oInfo.FEC_INI,
                    FEC_FIN = oInfo.FEC_FIN
                };

                lep.Add(oinfoCont);
            }
            return (q != null);
        }
    }
}
