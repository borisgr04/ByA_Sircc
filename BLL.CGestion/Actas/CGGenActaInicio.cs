using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.VisualBasic;
using System.Collections;
using System.Data;
using System.Diagnostics;

using GDocWord;
using Entidades;
using ByA;
using BLL.CGestion.Filtros;


namespace BLL.CGestion.Actas
{

    public class CGGenActaInicio : CGGenActa
    {
        protected List<vDocActasContratos> lep;
        public CGGenActaInicio()
        {
        IdPlantilla = 34;//NUMERO DE PLANTILLA
        oEC = new ESTCONTRATOS();
        lep = new List<vDocActasContratos>();
        }
        protected override void ObtenerTablaDocumento()
        {
            dtDatos = ByAUtil.convertToDataTable(lep);
        }
        protected override bool ObtenerDocumento()
        {
            int idActa = Convert.ToInt32(this.IdDocumento);
            var q = ctx.ESTCONTRATOS.Where(t => t.ID == idActa).FirstOrDefault();
            oEC = q;
            vDocActasContratos oContrato = new vDocActasContratos
            {
                Numero = oEC.CONTRATOS.COD_CON,
                Tipo = oEC.CONTRATOS.TIPOSCONT.NOM_TIP + " " + oEC.CONTRATOS.SUBTIPOS.NOM_STIP,
                Objeto = oEC.CONTRATOS.OBJ_CON,
                Fecha_Suscripcion = oEC.CONTRATOS.FEC_SUS_CON,
                Valor_Contrato = oEC.CONTRATOS.VAL_CON,
                DependenciaNec = oEC.CONTRATOS.DEPENDENCIA.NOM_DEP,
                DependenciaDel = oEC.CONTRATOS.DEPENDENCIA1.NOM_DEP,
                Contratista = buildNomTer(oEC.CONTRATOS.TERCEROS),
                Ide_Contratista = oEC.CONTRATOS.IDE_CON,
                Dep_Nec = oEC.CONTRATOS.DEP_CON,
                Dep_Del = oEC.CONTRATOS.DEP_PCON,
                Vigencia = oEC.CONTRATOS.VIG_CON,
                Estado = oEC.CONTRATOS.ESTADOS.ESTADO,
                Cod_STip = oEC.CONTRATOS.STIP_CON,
                Cod_Tip = oEC.CONTRATOS.TIP_CON,
                NroProceso = oEC.CONTRATOS.PRO_SEL_NRO,
                Nom_Modalidad = buildModalidad(oEC.CONTRATOS.COD_TPRO),
                Ide_RepLegal = oEC.CONTRATOS.IDE_REP,
                Nom_RepLegal = buildTercero(oEC.CONTRATOS.IDE_REP),
                FEC_APR_POL = oEC.CONTRATOS.FEC_APR_POL,
                FEC_ACT = oEC.FEC_ENT,
                CONTRATISTA_C2 = buildContratistaC2(oEC.CONTRATOS),
                ID = oEC.ID,
                OBSERVACIONES = oEC.OBS_EST,
                PLAZO_TEXTO = buildPlazo(oEC.CONTRATOS),
                RES_APR_POL = oEC.CONTRATOS.RES_APR_POL,
                Ide_Interventor = oEC.CONTRATOS.INTERVENTORES_CONTRATO.Where(t => t.EST_INT == "AC").Select(t => t.IDE_INT).FirstOrDefault(),
                Nom_Interventor = buildTercero(oEC.CONTRATOS.INTERVENTORES_CONTRATO.Where(t => t.EST_INT == "AC").Select(t => t.IDE_INT).FirstOrDefault())
            };

            lep.Add(oContrato);
            return (q != null);
        }
    }
   

}
