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
    public class vDocActasContratos : vContratosInt
    {
        //public string Numero { get; set; }
        //public string Tipo { get; set; }
        //public string Objeto { get; set; }
        //public string Ide_Contratista { get; set; }
        //public string Contratista { get; set; }
        //public decimal Valor_Contrato { get; set; }
        //public DateTime Fecha_Suscripcion { get; set; }
        //public string Estado { get; set; }
        //public string DependenciaNec { get; set; }
        //public string DependenciaDel { get; set; }
        //public string Ide_Interventor { get; set; }
        //public string Nom_Interventor { get; set; }
        //public short Vigencia { get; set; }
        //public string Dep_Nec { get; set; }
        //public string Dep_Del { get; set; }
        //public string Cod_Tip { get; set; }
        //public string Cod_STip { get; set; }

        //public string NroProceso { get; set; }
        //public string Nom_Modalidad { get; set; }

        //public string Ide_RepLegal { get; set; }
        //public string Nom_RepLegal { get; set; }

        public DateTime? FEC_APR_POL { get; set; }
        public string CONTRATISTA_C2 { get; set; }
        public DateTime? FEC_ACT { get; set; }
        public DateTime? FEC_FIN { get; set; }
        public string PLAZO_TEXTO { get; set; }
        public int ID { get; set; }
        public string OBSERVACIONES { get; set; }
        public string RES_APR_POL { get; set; }

    }

    public abstract class CGGenActa : GenDocumento
    {
        protected ESTCONTRATOS oEC { get; set; }

        /// <summary>
        /// Se pasa a lista, para convertirla a tabla Automáticamente
        /// </summary>
        
        /// <summary>
        /// Obtener el Objeto del Documento, al cual se le agregaran los objetos relacionados
        /// </summary>
        /// <returns></returns>

        protected override void ObtenerTablasRelacionadas()
        {
            ObtenerCDP();
            ObtenerRP();
            ObtenerRUBROS();
            ObtenerPOLIZAS();
            ObtenerIMPUESTOS();

        }
        protected void ObtenerPOLIZAS()
        {
            IList<POLIZAS_CONTRATO> l = ctx.POLIZAS_CONTRATO.Where(t => t.COD_CON == oEC.COD_CON).ToList();
            if (l.Count > 0)
            {
                IList<vPolizasActas> l2 = l.Select(t => new vPolizasActas
                {
                    Amparo = t.POLIZAS.NOM_POL,
                    Aseguradora = t.ASEGURADORAS.NOM_ASE,
                    NroPoliza = t.NRO_POL,
                    ValorAsegurado = t.VAL_POL,
                    Vigencia = t.FEC_INI != null ? t.FEC_INI.Value.ToShortDateString() : " hasta " + "-" + t.FEC_POL.ToShortDateString()
                }).ToList();
                ListaTablas.Add(ByAUtil.convertToDataTable(l2));
                ListaNomTablas.Add("VPOLIZAS");
            }
        }
        protected void ObtenerIMPUESTOS()
        {
            IList<IMP_CONTRATOS> l = ctx.IMP_CONTRATOS.Where(t => t.COD_CON == oEC.COD_CON).ToList();
            if (l.Count > 0)
            {
                IList<vImpuestosContratos> l2 = l.Select(t => new vImpuestosContratos
                {
                    NroLiquidacion = t.NRO_COM,
                    ValorLiq = t.VAL_IMP == null ? (decimal)t.VAL_IMP : 0,
                    VigLiquidacion = t.VIG_LIQ.ToString(),
                    Impuesto = "Nombre del Impuesto"

                }).ToList();
                ListaTablas.Add(ByAUtil.convertToDataTable(l2));
                ListaNomTablas.Add("VIMPUESTOS");
            }
        }
        protected void ObtenerCDP()
        {
            IList<CDP_CONTRATOS> l = ctx.CDP_CONTRATOS.Where(t => t.COD_CON == oEC.COD_CON).ToList();
            if (l.Count > 0)
            {
                IList<stringD> l2 = l.Select(t => new stringD
                {
                    Desc =
                        "N° " + t.NRO_CDP + "  por Valor de $" + t.VAL_CDP.ToString() + " de Fecha " + t.FEC_CDP.ToLongDateString()
                }).ToList();
                ListaTablas.Add(ByAUtil.convertToDataTable(l2));
                ListaNomTablas.Add("VCDP");
            }
        }
        protected void ObtenerRP()
        {
            IList<RP_CONTRATOS> l = ctx.RP_CONTRATOS.Where(t => t.COD_CON == oEC.COD_CON).ToList();
            if (l.Count > 0)
            {
                IList<stringD> l2 = l.Select(t => new stringD
                {
                    Desc =
                        "N° " + t.NRO_RP + "  por Valor de $" + t.VAL_RP.ToString() + " de Fecha " + t.FEC_RP.ToLongDateString()
                }).ToList();
                ListaTablas.Add(ByAUtil.convertToDataTable(l2));
                ListaNomTablas.Add("VRP");
            }
        }
        protected void ObtenerRUBROS()
        {
            IList<vRubrosActas> l = ctx.RUBROS_CONTRATOS.Where(t => t.COD_CON == oEC.COD_CON)
                .Select(t => new vRubrosActas
                {
                    Rubro = t.COD_RUB,
                    Descripcion = t.NOM_RUB,
                    Valor = t.VAL_COMPROMISO,
                    NroRp = t.NRO_RP
                })
                .ToList();
            if (l.Count > 0)
            {
                ListaTablas.Add(ByAUtil.convertToDataTable(l));
                ListaNomTablas.Add("VRUBROS");
            }
        }
        



    }
    


}
