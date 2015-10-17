using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using Entidades.VistasPROC;

namespace BLL.EstPrev
{
    class GenDatosEP
    {


        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }
        public ESTPREV ep { get; set; }

        public vDatosEP GetDatos(string codigo_ep)
        {
            ep = new ESTPREV();
            vDatosEP mep = new vDatosEP();
            
            using (ctx = new Entities())
            {
                var q = ctx.ESTPREV.Where(t => t.CODIGO_EP == codigo_ep).FirstOrDefault<ESTPREV>();
                if (q != null)
                {
                    ep = q;
                    Mapper.CreateMap<ESTPREV, vDatosEP>()
                        .ForMember(dest => dest.CLASE_CONT, opt => opt.MapFrom(src => src.SUBTIPOS.TIPOSCONT.NOM_TIP + " DE " + src.SUBTIPOS.NOM_STIP))
                        .ForMember(dest => dest.NOM_DEP_NEC_EP, opt => opt.MapFrom(src => src.DEPENDENCIA.NOM_DEP))
                        .ForMember(dest => dest.PLAZO_EP, opt => opt.MapFrom(src => buildPlazo(src)))
                        .ForMember(dest => dest.NOM_DEP_SUP_EP, opt => opt.MapFrom(src => src.DEPENDENCIA2.NOM_DEP))
                        .ForMember(dest => dest.OBLIGACIONESC, opt => opt.MapFrom(src => src.OBLIGC))
                        .ForMember(dest => dest.MOD_SEL_EP, opt => opt.MapFrom(src => src.TIPOSPROC.NOM_TPROC))
                        .ForMember(dest => dest.OBLIGACIONESE, opt => opt.MapFrom(src => src.OBLIGE))
                        .ForMember(dest => dest.CDP, opt => opt.MapFrom(src => buildCDP(src)))
                        .ForMember(dest => dest.POLIZAS , opt => opt.MapFrom(src => buildPoliza(src)))
                        .ForMember(dest => dest.sBANCO_PROY, opt => opt.MapFrom(src => buildBancoProy(src)))
                        .ForMember(dest => dest.UNSPSC, opt => opt.MapFrom(src => buildUNSPSC(src)))
                        ;
                    Mapper.Map(this.ep, mep);
                    #region mapeo
                    mep.LOGO = "<img src='/ashx/ashxImg.ashx' />";
                    mep.VAL_TOTAL_LETRAS = MonedaToLet((decimal)mep.VALOR_TOTAL);
                    mep.PLIQ_LETRAS_EP = NumToLet((decimal)mep.PLIQ_EP).Replace("con 00/100.-", "");
                    mep.sFORMA_PAGO = buildFORMAPAGO(ep);

                    mep.NOM_ENTIDAD = ctx.CTRL_ENTIDAD.First().NOM_SECPRINCIPAL;
                    //mep.NOM_ENTIDAD= ctx.CTRL_ENTIDAD.First().NOM_SECPRINCIPAL;

                    try
                    {

                        mep.DILIGENCIADO_POR = buildNomTer(ctx.TERCEROS.Where(o => o.IDE_TER == ep.IDE_DIL_EP).FirstOrDefault());
                    }
                    catch
                    {
                        mep.DILIGENCIADO_POR = "";
                    }
                    try
                    {

                        mep.RESPONSABLE_EP = buildNomTer(ctx.TERCEROS.Where(o => o.IDE_TER == ep.IDE_RES_EP).FirstOrDefault());
                    }
                    catch
                    {
                        mep.RESPONSABLE_EP = "";
                    }
                    try
                    {

                        mep.NOM_SUP_EP = buildNomTer(ctx.TERCEROS.Where(o => o.IDE_TER == ep.IDE_SUP_EP).FirstOrDefault());
                    }
                    catch
                    {
                        mep.NOM_SUP_EP = "";
                    } 
                    #endregion
                    return mep;
                }
                else
                {
                    return null;
                }

            }


        }


        private string buildPlazo(ESTPREV ep)
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
            let.LetraCapital = true;
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

        public string buildUNSPSC(ESTPREV ep)
        {
            StringBuilder Fmt = new StringBuilder();
            List<EP_UNSPSC> lst = ep.EP_UNSPSC.ToList();
            Fmt.Append("<table><tr><th style='width:20%'>ITEM</th><th style='width:20%'>Clasificación UNSPSC</th><th>Clase/Producto</th></tr>");
            if (lst.Count > 0)
            {
                int i = 1;
                foreach (EP_UNSPSC pry in lst)
                {
                    Fmt.AppendFormat("<tr><td>{0}</td><td>{1}</td><td>{2}</td></tr>", i, pry.UNSPSC, pry.EP_CODIGOSUNSPSC.EP_CODIGOSUNSPSC2.NOMBRE);
                    i++;
                }
            }
            else {
                Fmt.AppendFormat("<tr><td colspan=3>NO TIENE ASOCIADO CÓDIGOS UNSPSC</td></tr>");
            }
            Fmt.Append("</table>");
            return Fmt.ToString();
        }

        public string buildBancoProy(ESTPREV ep)
        {
            StringBuilder Fmt= new StringBuilder();
            Fmt.Append("<table><tr><th style='width:20%'>CÓDIGO</th><th>NOMBRE</th><th style='width:20%'>Código BPIN</th></tr>");
                List<EP_PROYECTOS> lst = ep.EP_PROYECTOS.ToList();
                if (lst.Count > 0)
                {

                    foreach (EP_PROYECTOS pry in lst)
                    {
                        Fmt.AppendFormat("<tr><td>{0}</td><td>{1}</td><td>{2}</td></tr>", pry.COD_PRO, pry.PROYECTOS.NOMBRE_PROYECTO, !String.IsNullOrEmpty(pry.PROYECTOS.BPIN)?pry.PROYECTOS.BPIN:"N/A");
                    }
                }
                else {
                    Fmt.AppendFormat("<tr><td colspan=3>NO TIENE ASOCIADO PROYECTOS</td></tr>");
                }
                Fmt.Append("</table>");
                return Fmt.ToString();
        }
        
        public string buildPoliza0()
        {
            string temp = "";
            //Armar Cadena de Poliza
            List<stringD> lp = ep.EP_POLIZAS.Select(t => new stringD
            {
                Desc = t.POLIZAS.NOM_POL.ToUpper() + ": el valor de la garantía deberá ser por un monto equivalente al " +
                       t.POR_SMMLV + " " + t.TIPO + " del " + t.CALCULOPOL.DESCRIPCION + " '  y su vigencia será de " + t.VIGENCIA + "  días a partir de "
                       + t.CAL_VIG_POL.DESCRIPCION
            }).ToList();


            foreach (stringD p in lp)
            {
                temp += p.Desc;
            }
            return temp;

        }

        class stringD
        {
            public string Desc { get; set; }
        }
        private string buildTer(string ide_ter)
        {
            TERCEROS t= ctx.TERCEROS.Where(o => o.IDE_TER == ide_ter).FirstOrDefault();
            return buildNomTer(t);
        }

        private string buildNomTer(TERCEROS t)
        {
            if (t != null)
            {
                return t.NOM1_TER + " " + t.NOM2_TER + " " + t.APE1_TER + " " + t.APE2_TER;
            }
            return "";
        }

        private string buildFORMAPAGO(ESTPREV ep)
        {
            string temp = "";
            foreach (EP_FORMA_PAGO item in ep.EP_FORMA_PAGO)
            {
                int cantidad=(int)item.CAN_PAG;
                temp += String.Format("{0}-({5}) {1} de {2:C} equivalente al {3:P} {4}<br/>", cantidad.ToText2().ToCapital(), item.TIPO_PAGO.DES_PAGO, item.VAL_FPAG, item.POR_FPAG / 100, item.CON_FPAG, item.CAN_PAG);
            }
            return temp;
        }

        public string buildPoliza(ESTPREV ep)
        {
            string temp = "";
            //Armar Cadena de Poliza
            List<stringD> lp = ep.EP_POLIZAS2.Select(t => new stringD
            {
                Desc = "<b>" + t.POLIZAS.NOM_POL.ToUpper() + " </b>, " + t.DES_POL + "<br/>"

            }).ToList();


            foreach (stringD p in lp)
            {
                temp += p.Desc;
            }
            return temp;

        }
        private string buildCDP(ESTPREV ep)
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
                temp += item.DES_OBLIG + ".";
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
    }
}
