using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using Entidades.VistasGC;

namespace BLL.CGestion.Actas
{
    public class vDocActasParcial : vDocActasContratos
    {
        //public Nullable<System.DateTime> FEC_FIN { get; set; }
        public Nullable<decimal> POR_EJE_FIS { get; set; }
        //public Nullable<System.DateTime> FEC_FIN { get; set; }
        //public Nullable<System.DateTime> FEC_PINI { get; set; }
        public Nullable<int> NVIS_PER { get; set; }
        public Nullable<decimal> POR_EJE_FIS_PER { get; set; }
        public Nullable<decimal> SALDO_PER { get; set; }
        //public Nullable<System.DateTime> FEC_ACT { get; set; }
        public Nullable<decimal> SAL_ANT { get; set; }
        public string CLA_DOC { get; set; }
        public string EST_DOC { get; set; }
    }
    public class CGActaParcial : CGGenActa
    {
        protected List<vDocActasParcial> lep;
        public CGActaParcial()
        {
        IdPlantilla = 39;//NUMERO DE PLANTILLA
        oEC = new ESTCONTRATOS();
        lep = new List<vDocActasParcial>();
        }

        public List<vDocActasParcial> GetActa(){
            ctx = new Entities();
            ObtenerDocumento();
            ctx.Dispose();
            return lep;
        }
        
        protected override void ObtenerTablasRelacionadas()
        {
            base.ObtenerTablasRelacionadas();
            ObtenerSS();

        }
        protected void ObtenerMODIFICACIONES()
        {

            //IList<ADICIONES> l = ctx.ADICIONES.Where(t => t.COD_CON == oEC.COD_CON).ToList();
            //if (l.Count > 0)
            //{
            //    IList<vPolizasActas> l2 = l.Select(t => new vPolizasActas
            //    {
            //        Amparo = t.POLIZAS.NOM_POL,
            //        Aseguradora = t.ASEGURADORAS.NOM_ASE,
            //        NroPoliza = t.NRO_POL,
            //        ValorAsegurado = t.VAL_POL,
            //        Vigencia = t.FEC_INI != null ? t.FEC_INI.Value.ToShortDateString() : " hasta " + "-" + t.FEC_POL.ToShortDateString()
            //    }).ToList();
            //    ListaTablas.Add(ByAUtil.convertToDataTable(l2));
            //    ListaNomTablas.Add("VPOLIZAS");
            //}
        }

        
              
        protected void ObtenerSS()
        {
            //String[] Meses = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.MonthNames;
            //int mes = Convert.ToInt32(MES_PAGO) - 1;
            //return YEAR_PAGO + "-" + MES_PAGO + "-" + Meses[mes].ToUpper();
            List<vSS_ACTAS> lDto = new List<vSS_ACTAS>();
            List<INT_PAGOSST> l =ctx.INT_PAGOSST.Where(t => t.INT_INFOCONT.ID_ACTA == oEC.ID).ToList();
            if (l.Count > 0)
            {
                Mapper.CreateMap<INT_PAGOSST, vSS_ACTAS>();
                Mapper.Map(l, lDto);
                ListaTablas.Add(ByAUtil.convertToDataTable(lDto));
                ListaNomTablas.Add("VSS");
            }
        }
        protected override void ObtenerTablaDocumento()
        {
            dtDatos = ByAUtil.convertToDataTable(lep);
        }
        //vDocActasParcial
        protected override bool ObtenerDocumento()
        {
            int idActa = Convert.ToInt32(this.IdDocumento);
            var q = ctx.ESTCONTRATOS.Where(t => t.ID == idActa).FirstOrDefault();
            oEC = q;
            vDocActasParcial oContrato = new vDocActasParcial
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
                Ide_Interventor = oEC.CONTRATOS.INTERVENTORES_CONTRATO.Where(t => t.EST_INT == "AC" && t.TIP_INT=="I").Select(t => t.IDE_INT).FirstOrDefault(),
                Nom_Interventor = buildTercero(oEC.CONTRATOS.INTERVENTORES_CONTRATO.Where(t => t.EST_INT == "AC" && t.TIP_INT == "I").Select(t => t.IDE_INT).FirstOrDefault()),
                Ide_Supervisor = oEC.CONTRATOS.INTERVENTORES_CONTRATO.Where(t => t.EST_INT == "AC" && t.TIP_INT == "S").Select(t => t.IDE_INT).FirstOrDefault(),
                Nom_Supervisor= buildTercero(oEC.CONTRATOS.INTERVENTORES_CONTRATO.Where(t => t.EST_INT == "AC" && t.TIP_INT == "S").Select(t => t.IDE_INT).FirstOrDefault())
                 
            };

            lep.Add(oContrato);
            return (q != null);
        }

    }
}
