using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using Entidades.VistasPROC;

namespace BLL.PROCESOS
{
    public class GenDatosMinuta
    {
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }
        public ESTPREV ep { get; set; }

        public vDatosMinuta GetDatos(string num_pro)
        {
            ep = new ESTPREV();
            vDatosMinuta mep = new vDatosMinuta();
            
            using (ctx = new Entities())
            {
                var proc = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == num_pro).FirstOrDefault();
                var sol = ctx.PSOLICITUDES.Where(t => t.COD_SOL == proc.NUM_SOL).FirstOrDefault();
                var q = ctx.ESTPREV.Where(t => t.CODIGO_EP == sol.COD_EP).FirstOrDefault<ESTPREV>();
                if (q != null)
                {
                    ep = q;
                    Mapper.CreateMap<ESTPREV, vDatosMinuta>();
                    Mapper.Map(this.ep, mep);
                    mep.CDP = buildCDP();
                    mep.OBLIGACIONESC = ep.OBLIGC;
                    mep.OBLIGACIONESE = ep.OBLIGE;
                    mep.VAL_TOTAL_LETRAS = MonedaToLet((decimal)mep.VALOR_TOTAL);
                    mep.PLIQ_LETRAS_EP = NumToLet((decimal)mep.PLIQ_EP);
                    mep.sFORMA_PAGO = buildFORMAPAGO(ep);
                    #region mapeo
                    try
                    {
                        mep.CLASE_CONT = ep.SUBTIPOS.TIPOSCONT.NOM_TIP +" DE " + ep.SUBTIPOS.NOM_STIP;
                    }
                    catch
                    {
                        mep.NOM_DEP_NEC_EP = "";
                    }
                    try
                    {
                        mep.NOM_DEP_NEC_EP = ep.DEPENDENCIA.NOM_DEP;
                    }
                    catch
                    {
                        mep.NOM_DEP_NEC_EP = "";
                    }
                    try
                    {
                        mep.NOM_TIP_EP = ep.SUBTIPOS.TIPOSCONT.NOM_TIP + " " + ep.SUBTIPOS.NOM_STIP;
                    }
                    catch
                    {
                        mep.NOM_TIP_EP = "";
                    }

                    try
                    {
                        mep.PLAZO_EP = buildPlazo();
                    }
                    catch
                    {
                        mep.PLAZO_EP = "";
                    }
                    
                    
                    try
                    {
                        mep.NOM_DEP_SUP_EP = ep.DEPENDENCIA2.NOM_DEP;
                    }
                    catch
                    {
                        mep.NOM_DEP_SUP_EP = "";
                    }
                    mep.POLIZAS = buildPoliza(ep);
                    
                    #endregion
                    return mep;
                }
                else
                {
                    return null;
                }

            }


        }


        private string buildPlazo()
        {
            string plazo = "";
            if (ep.TIPO_PLAZOS != null)
            {
                plazo = ep.PLAZ1_EP + " " + ep.TIPO_PLAZOS.NOM_PLA;
                if (ep.TIPO_PLAZOS1 != null)
                {
                    plazo += " " + ep.PLAZ2_EP + " " + ep.TIPO_PLAZOS1.NOM_PLA; ;
                }
            }

            return plazo;
        }

        public string MonedaToLet(decimal num)
        {
            Numalet let = new Numalet();
            let.SeparadorDecimalSalida = "pesos y";
            let.ConvertirDecimales = true;
            //redondeando en cuatro decimales
            let.Decimales = 2;
            let.LetraCapital= true;        
            let.MascaraSalidaDecimal = "centavos";
            return let.ToCustomCardinal(num);
        }

        public string NumToLet(decimal num)
        {
            Numalet let = new Numalet();
            let.SeparadorDecimalSalida = "";
            let.MascaraSalidaDecimal = "";
            let.ConvertirDecimales = false;
            let.Decimales = 0;
            return let.ToCustomCardinal(num);
        }

        //public string buildPoliza()
        //{
        //    string temp = "";
        //    //Armar Cadena de Poliza
        //    List<stringD> lp = ep.EP_POLIZAS.Select(t => new stringD
        //    {
        //        Desc = t.POLIZAS.NOM_POL.ToUpper() + ": el valor de la garantía deberá ser por un monto equivalente al " +
        //               t.POR_SMMLV + " " + t.TIPO + " del " + t.CALCULOPOL.DESCRIPCION + " '  y su vigencia será de " + t.VIGENCIA + "  días a partir de "
        //               + t.CAL_VIG_POL.DESCRIPCION
        //    }).ToList();


        //    foreach (stringD p in lp)
        //    {
        //        temp += p.Desc;
        //    }
        //    return temp;

        //}

        class stringD
        {
            public string Desc { get; set; }
        }
        private string buildNomTer(TERCEROS t)
        {
            if (t != null)
            {
                return t.NOM1_TER + " " + t.NOM2_TER + " " + t.APE1_TER + " " + t.APE2_TER;
            }
            return "";
        }

        private string buildCDP()
        {
            string vCDP = null;
            foreach (EP_CDP cdp in ep.EP_CDP)
            {
                string vRubros = "";
                foreach (EP_RUBROS_CDP rubro in cdp.EP_RUBROS_CDP)
                {
                    string cadRub = rubro.COD_RUB + " denominado: " + rubro.RUBROS.DES_RUB;
                    vRubros = String.IsNullOrEmpty(vRubros) ? cadRub : "," + cadRub;
                }
                string cadCDP = "Certificado de Disponilidad Presupuestal N° " + cdp.NRO_CDP + " de fecha " + cdp.FEC_CDP.ToShortDateString() + " con un Valor " + cdp.VAL_CDP + " y Rubro(s) Presupuestal(es) " + vRubros;
                vCDP = String.IsNullOrEmpty(vCDP) ? cadCDP : "," + cadCDP;
            }
            return vCDP;
        }
        private string buildOBLIGACIONESC()
        {
            string temp = "";
            foreach (EP_OBLIGACIONESC item in ep.EP_OBLIGACIONESC)
            {
                temp += item.DES_OBLIG+".";
            }
            return temp;
        }
        private string buildOBLIGACIONESE()
        {
            string temp = "";
            foreach (EP_OBLIGACIONESE item in ep.EP_OBLIGACIONESE)
            {
                temp += item.DES_OBLIG + ".";
            }
            return temp;
        }

        private string buildFORMAPAGO(ESTPREV ep)
        {
            string temp = "";
            foreach (EP_FORMA_PAGO item in ep.EP_FORMA_PAGO)
            {
                int cantidad = (int)item.CAN_PAG;
                temp += String.Format("{0}-({5}) {1} de {2:C} equivalente al {3:P} {4};", cantidad.ToText2().ToCapital(), item.TIPO_PAGO.DES_PAGO, item.VAL_FPAG, item.POR_FPAG / 100, item.CON_FPAG, item.CAN_PAG);
            }
            return temp;
        }

        public string buildPoliza(ESTPREV ep)
        {
            string temp = "";
            //Armar Cadena de Poliza
            List<stringD> lp = ep.EP_POLIZAS2.Select(t => new stringD
            {
                Desc = "<b>" + t.POLIZAS.NOM_POL.ToUpper() + " </b>, " + t.DES_POL + ";"

            }).ToList();


            foreach (stringD p in lp)
            {
                temp += p.Desc;
            }
            return temp;

        }
    }
}
