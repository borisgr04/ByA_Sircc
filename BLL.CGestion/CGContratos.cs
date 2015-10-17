using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.CGestion.Filtros;
using ByA;
using Entidades;

namespace BLL.CGestion
{
    class CGContratos
    {
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }

        public vContratosInt GetDetContrato(string CodCon)
        {
            using (ctx = new Entities())
            {

                vContratosInt q = ctx.CONTRATOS.Where(t => t.COD_CON == CodCon)
                                                       .Select(c => new vContratosInt
                                                       {
                                                           Numero = c.COD_CON,
                                                           Tipo = c.TIPOSCONT.NOM_TIP + " " + c.SUBTIPOS.NOM_STIP,
                                                           Objeto = c.OBJ_CON,
                                                           Fecha_Suscripcion = c.FEC_SUS_CON,
                                                           Valor_Contrato = c.VAL_CON,
                                                           DependenciaNec = c.DEPENDENCIA.NOM_DEP,
                                                           DependenciaDel = c.DEPENDENCIA1.NOM_DEP,
                                                           Contratista = c.TERCEROS.APE1_TER.Trim() + " " + c.TERCEROS.APE2_TER.Trim() + " " + c.TERCEROS.NOM1_TER.Trim() + " " + c.TERCEROS.NOM2_TER.Trim(),
                                                           Ide_Contratista = c.IDE_CON,
                                                           Dep_Nec = c.DEP_CON,
                                                           Dep_Del = c.DEP_PCON,
                                                           Vigencia = c.VIG_CON,
                                                           Estado = c.ESTADOS.ESTADO,
                                                           Cod_Act = c.EST_CON,
                                                           Cod_STip = c.STIP_CON,
                                                           Cod_Tip = c.TIP_CON
                                                       }).FirstOrDefault();
                q.ValorPagar = GetValorPagarContrato(CodCon);
                q.ValorPagado = GetValorPagadoContrato(CodCon);
                q.ValorSaldo = q.ValorPagar - q.ValorPagado;
                return q;
            }
        }
        private decimal GetValorPagarContrato(string COD_CON)
        {
            using (ctx = new Entities())
            {
                decimal valor = 0;
                CONTRATOS Contrato = ctx.CONTRATOS.Where(t => t.COD_CON == COD_CON).FirstOrDefault();
                if (Contrato != null)
                {
                    valor += Contrato.VAL_CON;
                    List<ADICIONES> Adiciones = Contrato.ADICIONES.ToList();
                    Adiciones.ForEach(t => valor += t.VAL_ADI);
                }
                return valor;
            }
        }
        private decimal GetValorPagadoContrato(string COD_CON)
        {
            using (ctx = new Entities())
            {
                decimal valor = 0;
                CONTRATOS Contrato = ctx.CONTRATOS.Where(t => t.COD_CON == COD_CON).FirstOrDefault();
                if (Contrato != null)
                {
                    valor += Contrato.VAL_CON;
                    List<ESTCONTRATOS> EstContratos = Contrato.ESTCONTRATOS.ToList();
                    EstContratos.ForEach(t => valor += (decimal) t.VAL_PAGO);
                }
                return valor;
            }
        }
        public IList<vContratosInt> GetContratosbyIdeCon(string Ide_Contratista, short Vigencia)
        {
            using (ctx = new Entities())
            {
                IList<vContratosInt> lst = (from ic in ctx.INTERVENTORES_CONTRATO
                                            join c in ctx.CONTRATOS on ic.COD_CON equals c.COD_CON
                                            where c.IDE_CON == Ide_Contratista && c.VIG_CON == Vigencia
                                            && ic.TIP_INT == "S"
                                            && ic.EST_INT == "AC"
                                            orderby c.COD_CON
                                            select (new vContratosInt
                                            {
                                                Numero = c.COD_CON,
                                                Tipo = c.TIPOSCONT.NOM_TIP + " " + c.SUBTIPOS.NOM_STIP,
                                                Objeto = c.OBJ_CON,
                                                Fecha_Suscripcion = c.FEC_SUS_CON,
                                                Valor_Contrato = c.VAL_CON,
                                                DependenciaNec = c.DEPENDENCIA.NOM_DEP,
                                                DependenciaDel = c.DEPENDENCIA1.NOM_DEP,
                                                Contratista = c.TERCEROS.APE1_TER.Trim() + " " + c.TERCEROS.APE2_TER.Trim() + " " + c.TERCEROS.NOM1_TER.Trim() + " " + c.TERCEROS.NOM2_TER.Trim(),
                                                Ide_Contratista = c.IDE_CON,
                                                Ide_Interventor = ic.IDE_INT,
                                                Nom_Interventor = ic.TERCEROS.APE1_TER.Trim() + " " + ic.TERCEROS.APE2_TER.Trim() + " " + ic.TERCEROS.NOM1_TER.Trim() + " " + ic.TERCEROS.NOM2_TER.Trim(),
                                                Dep_Nec = c.DEP_CON,
                                                Dep_Del = c.DEP_PCON,
                                                Vigencia = c.VIG_CON,
                                                Estado = c.ESTADOS.ESTADO,
                                                Cod_STip = c.STIP_CON,
                                                Cod_Tip = c.TIP_CON
                                            })).ToList();


                return lst;
            }
        }

        public vContratosInt GetContrato(string CodCon)
        {
            vContratosInt oContrato=null;
            
            oContrato = (from ic in ctx.INTERVENTORES_CONTRATO
                                            join c in ctx.CONTRATOS on ic.COD_CON equals c.COD_CON
                                            where c.COD_CON == CodCon
                                            orderby c.COD_CON
                                            select (new vContratosInt
                                            {
                                                Numero = c.COD_CON,
                                                Tipo = c.TIPOSCONT.NOM_TIP + " " + c.SUBTIPOS.NOM_STIP,
                                                Objeto = c.OBJ_CON,
                                                Fecha_Suscripcion = c.FEC_SUS_CON,
                                                Valor_Contrato = c.VAL_CON,
                                                DependenciaNec = c.DEPENDENCIA.NOM_DEP,
                                                DependenciaDel = c.DEPENDENCIA1.NOM_DEP,
                                                Contratista = c.TERCEROS.APE1_TER.Trim() + " " + c.TERCEROS.APE2_TER.Trim() + " " + c.TERCEROS.NOM1_TER.Trim() + " " + c.TERCEROS.NOM2_TER.Trim(),
                                                Ide_Contratista = c.IDE_CON,
                                                Ide_Interventor = ic.IDE_INT,
                                                Nom_Interventor = ic.TERCEROS.APE1_TER.Trim() + " " + ic.TERCEROS.APE2_TER.Trim() + " " + ic.TERCEROS.NOM1_TER.Trim() + " " + ic.TERCEROS.NOM2_TER.Trim(),
                                                Dep_Nec = c.DEP_CON,
                                                Dep_Del = c.DEP_PCON,
                                                Vigencia = c.VIG_CON,
                                                Estado = c.ESTADOS.ESTADO,
                                                Cod_STip = c.STIP_CON,
                                                Cod_Tip = c.TIP_CON
                                            })).FirstOrDefault();
                return oContrato;
            
        }

        public IList<vContratosInt> GetContratosbyIdeSup(string Ide_Supervisor, short Vigencia)
        {
            using (ctx = new Entities())
            {
                IList<vContratosInt> lst = (from ic in ctx.INTERVENTORES_CONTRATO
                                            join c in ctx.CONTRATOS on ic.COD_CON equals c.COD_CON
                                            where ic.IDE_INT == Ide_Supervisor
                                                    && c.VIG_CON == Vigencia
                                                    && ic.TIP_INT == "S"
                                                    && ic.EST_INT == "AC"
                                            orderby c.COD_CON
                                            select (new vContratosInt
                                            {
                                                Numero = c.COD_CON,
                                                Tipo = c.TIPOSCONT.NOM_TIP + " " + c.SUBTIPOS.NOM_STIP,
                                                Objeto = c.OBJ_CON,
                                                Fecha_Suscripcion = c.FEC_SUS_CON,
                                                Valor_Contrato = c.VAL_CON,
                                                DependenciaNec = c.DEPENDENCIA.NOM_DEP,
                                                DependenciaDel = c.DEPENDENCIA1.NOM_DEP,
                                                Contratista = c.TERCEROS.APE1_TER.Trim() + " " + c.TERCEROS.APE2_TER.Trim() + " " + c.TERCEROS.NOM1_TER.Trim() + " " + c.TERCEROS.NOM2_TER.Trim(),
                                                Ide_Contratista = c.IDE_CON,
                                                Ide_Interventor = ic.IDE_INT,
                                                Nom_Interventor = ic.TERCEROS.APE1_TER.Trim() + " " + ic.TERCEROS.APE2_TER.Trim() + " " + ic.TERCEROS.NOM1_TER.Trim() + " " + ic.TERCEROS.NOM2_TER.Trim(),
                                                Dep_Nec = c.DEP_CON,
                                                Dep_Del = c.DEP_PCON,
                                                Vigencia = c.VIG_CON,
                                                Estado = c.ESTADOS.ESTADO,
                                                Cod_STip = c.STIP_CON,
                                                Cod_Tip = c.TIP_CON
                                            })).ToList();


                return lst;
            }
        }

        public IList<vContratosInt> GetContratosbyIdeSup(string Ide_Supervisor, short Vigencia, string Dep_Nec)
        {
            using (ctx = new Entities())
            {
                IList<vContratosInt> lst = (from ic in ctx.INTERVENTORES_CONTRATO
                                            join c in ctx.CONTRATOS on ic.COD_CON equals c.COD_CON
                                            where ic.IDE_INT == Ide_Supervisor 
                                                    && c.VIG_CON == Vigencia 
                                                    && ic.TIP_INT=="S" 
                                                    && ic.EST_INT=="AC"
                                                    && c.DEP_CON== Dep_Nec
                                            orderby c.COD_CON
                                            select (new vContratosInt
                                            {
                                                Numero = c.COD_CON,
                                                Tipo = c.TIPOSCONT.NOM_TIP + " " + c.SUBTIPOS.NOM_STIP,
                                                Objeto = c.OBJ_CON,
                                                Fecha_Suscripcion = c.FEC_SUS_CON,
                                                Valor_Contrato = c.VAL_CON,
                                                DependenciaNec = c.DEPENDENCIA.NOM_DEP,
                                                DependenciaDel = c.DEPENDENCIA1.NOM_DEP,
                                                Contratista = c.TERCEROS.APE1_TER.Trim() + " " + c.TERCEROS.APE2_TER.Trim() + " " + c.TERCEROS.NOM1_TER.Trim() + " " + c.TERCEROS.NOM2_TER.Trim(),
                                                Ide_Contratista = c.IDE_CON,
                                                Ide_Interventor = ic.IDE_INT,
                                                Nom_Interventor = ic.TERCEROS.APE1_TER.Trim() + " " + ic.TERCEROS.APE2_TER.Trim() + " " + ic.TERCEROS.NOM1_TER.Trim() + " " + ic.TERCEROS.NOM2_TER.Trim(),
                                                Dep_Nec = c.DEP_CON,
                                                Dep_Del = c.DEP_PCON,
                                                Vigencia = c.VIG_CON,
                                                Estado = c.ESTADOS.ESTADO,
                                                Cod_STip = c.STIP_CON,
                                                Cod_Tip = c.TIP_CON
                                            })).ToList();


                return lst;
            }
        }
    }
}
