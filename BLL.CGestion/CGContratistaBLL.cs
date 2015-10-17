using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.CGestion.Actas;
using BLL.CGestion.Filtros;
using ByA;
using Entidades;
using Entidades.VistasGC;

namespace BLL.CGestion
{
    /// <summary>
    /// CLASE PARA ADMINISTRAR EL COMPONENTE DE GESTION DE CONTRATOS POR SUPERVISOR
    /// </summary>
    public class CGContratistaBLL
    {
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }
        //FiltrosContratos fc=null;
        CGContratos oContratos = new CGContratos();

        //Indirección a Contratos
        public IList<vContratosInt> GetContratos(string Ide_Contratista, short Vigencia)
        {
            return oContratos.GetContratosbyIdeCon(Ide_Contratista, Vigencia);
        }

        public IList<vDEPENDENCIA> GetDependencias(string Ide_Contratista)
        {
            using (ctx = new Entities())
            {
                //, short Vigencia
                //&& t.VIG_CON == Vigencia
                IList<vDEPENDENCIA> lst = ctx.CONTRATOS.Where(t => t.IDE_CON == Ide_Contratista )
                        .Select(t => new vDEPENDENCIA { NOM_DEP = t.DEPENDENCIA.NOM_DEP, COD_DEP = t.DEPENDENCIA.COD_DEP })
                      .Distinct().ToList();
                return lst;
            }
        }

        //Indirección
        public vContratosInt GetDetContrato(string CodCon) {

            return oContratos.GetDetContrato(CodCon);
        }

        public List<vINT_INFOCONT> GetInformes(string CodCon)
        {
            List<vINT_INFOCONT> l= new List<vINT_INFOCONT>();
            using (ctx = new Entities())
            {
                List<INT_INFOCONT> lst = ctx.INT_INFOCONT.Where(t => t.COD_CON == CodCon && t.EST_INF!="AN").ToList();
                Mapper.CreateMap<INT_INFOCONT,vINT_INFOCONT>();
                Mapper.Map(lst,l);
                
                return l;
            }
        }

        public List<vINT_INFOCONT> GetInformesV(short  Vig_Con, string UserName)
        {
            List<vINT_INFOCONT> l = new List<vINT_INFOCONT>();
            using (ctx = new Entities())
            {
                List<INT_INFOCONT> lst = ctx.INT_INFOCONT.Where(t => t.CONTRATOS.VIG_CON == Vig_Con && t.CONTRATOS.IDE_CON==UserName &&  t.EST_INF != "AN").ToList(); ;
                Mapper.CreateMap<INT_INFOCONT, vINT_INFOCONT>();
                Mapper.Map(lst, l);

                return l;
            }
        }

        public List<vACTASCONTRATO> GetActas(short Vig_Con, string UserName)
        {
            MapearEstAct();
            List<vACTASCONTRATO> oActa = new List<vACTASCONTRATO>();

            using (ctx = new Entities())
            {
                var oEst = ctx.ESTCONTRATOS.Where(t => t.CONTRATOS.VIG_CON == Vig_Con && t.CONTRATOS.IDE_CON == UserName && t.ESTADO == "AC").ToList();
                Mapper.Map(oEst, oActa);
                return oActa.OrderByDescending(t=>t.FEC_ACT).ToList();
            }
        }

        private void MapearEstAct()
        {
            Mapper.CreateMap<INT_CONTROL_DOC, vINT_CONTROL_DOC>();

            Mapper.CreateMap<ESTCONTRATOS, vACTASCONTRATO>()
                .ForMember(dest => dest.NOM_ACTA, opt => opt.MapFrom(src => src.ESTADOS.NOM_EST))
                .ForMember(dest => dest.FEC_ACT, opt => opt.MapFrom(src => src.FEC_ENT))
                .ForMember(dest => dest.INT_CONTROL_DOC1, opt => opt.MapFrom(src => src.INT_CONTROL_DOC1));
        }


        public List<vGD_DOC_ACTAS> GetDocumentos(string CodCon, decimal Id_info)
        {
            List<vGD_DOC_ACTAS> l = new List<vGD_DOC_ACTAS>();
            using (ctx = new Entities())
            {
                List<GD_DOC_ACTAS> lst = ctx.GD_DOC_ACTAS.Where(t => t.COD_CON == CodCon && t.ID_INF==Id_info ).ToList();
                Mapper.CreateMap<GD_DOC_ACTAS, vGD_DOC_ACTAS>();
                Mapper.Map(lst, l);
                foreach (vGD_DOC_ACTAS d in l) {
                    GD_DOCUMENTOS gd = ctx.GD_DOCUMENTOS.Where(t => t.ID == d.ID_DOC).FirstOrDefault();
                    if (gd != null)
                    {
                        d.LONGITUD = gd.LONGITUD;
                        d.ARCHIVO = gd.NOMBRE;
                        d.NOMBRE = ctx.TIP_DOC.Where(t=>t.COD_TIP==d.TIP_DOC).FirstOrDefault().DES_TIP;
                        d.TYPE = gd.TYPE;
                    }
                }
                
                
                return l;
            }
        }
        
        public ByARpt Insert(vINT_INFOCONT Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }

        public ByARpt Update(vINT_INFOCONT Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }

        public ByARpt InsDocActa(vGD_DOC_ACTAS Reg)
        {
            cmdInsDocActa o = new cmdInsDocActa();
            o.oDto = Reg;
            return o.Enviar();
        }

        public ByARpt InsLstDocActa(List<vGD_DOC_ACTAS> Reg, string COD_CON )
        {
            cmdLstInsDocActa o = new cmdLstInsDocActa();
            o.oDto = Reg;
            o.COD_CON = COD_CON;
            return o.Enviar();
        }


        class cmdInsDocActa : absTemplate
        {
            private GD_DOC_ACTAS e = null;
            public vGD_DOC_ACTAS oDto { get; set; }
            CONTRATOS oContrato = null;

            #region ImplementaciónMetodosAbstractos
            private bool ExisteContrato()
            {
                return oContrato != null;
            }
            protected override bool esValido()
            {

                oContrato = ctx.CONTRATOS.Where(t => t.COD_CON == oDto.COD_CON).FirstOrDefault();
                if (!ExisteContrato())
                {
                    byaRpt.Mensaje = "No se encuentra el contrato relacionado";
                    byaRpt.Error = false;
                    return byaRpt.Error;
                }
                else
                {
                    return true;
                }

            }
            protected override void Antes()
            {
                GD_DOCUMENTOS gd = ctx.GD_DOCUMENTOS.Find(oDto.ID_DOC);
                if (gd != null) {
                    gd.ESTADO = "AS";
                }
                ctx.Entry(gd).State = EntityState.Modified;

                e = new GD_DOC_ACTAS();
                e.COD_CON = oDto.COD_CON;
                e.EST_REL = "AC";
                e.ID_DOC = oDto.ID_DOC;
                e.ID_INF = oDto.ID_INF;
                e.TIP_DOC = oDto.TIP_DOC;
                e.USAP = oDto.USAP;
                e.FEC_REG = DateTime.Now;
                e.ID = ObtenerID();
                ctx.GD_DOC_ACTAS.Add(e);
                byaRpt.id = e.ID.ToString();
                byaRpt.Error = false;
            }
            #endregion
            private int ObtenerID()
            {
                int m;
                try
                {
                    m = (int)ctx.GD_DOC_ACTAS.Max(t => t.ID) + 1;
                }
                catch
                {
                    m = 1;
                }
                return m;
            }
           

        }


        class cmdLstInsDocActa : absTemplate
        {
            private GD_DOC_ACTAS e = null;
            public List<vGD_DOC_ACTAS> oDto { get; set; }
            CONTRATOS oContrato = null;
            public string COD_CON { get; set; }

            #region ImplementaciónMetodosAbstractos
            private bool ExisteContrato()
            {
                return oContrato != null;
            }
            protected override bool esValido()
            {

                oContrato = ctx.CONTRATOS.Where(t => t.COD_CON == COD_CON).FirstOrDefault();
                if (!ExisteContrato())
                {
                    byaRpt.Mensaje = "No se encuentra el contrato relacionado";
                    byaRpt.Error = false;
                    return byaRpt.Error;
                }
                else
                {
                    return true;
                }

            }
            protected override void Antes()
            {
                int Id = ObtenerID();
                foreach(vGD_DOC_ACTAS item in oDto){
            
                    GD_DOCUMENTOS gd = ctx.GD_DOCUMENTOS.Find(item.ID_DOC);
                    if (gd != null)
                    {
                        gd.ESTADO = "AS";
                    }
                
                    ctx.Entry(gd).State = EntityState.Modified;

                    e = new GD_DOC_ACTAS();
                    e.COD_CON = item.COD_CON;
                    e.EST_REL = "AC";
                    e.ID_DOC = item.ID_DOC;
                    e.ID_INF = item.ID_INF;
                    e.TIP_DOC = item.TIP_DOC;
                    e.USAP = item.USAP;
                    e.FEC_REG = DateTime.Now;
                    e.ID = Id;
                    ctx.GD_DOC_ACTAS.Add(e);
                    Id++;
                }

                byaRpt.id = e.ID.ToString();
                byaRpt.Error = false;
            }
            #endregion
            private int ObtenerID()
            {
                int m;
                try
                {
                    m = (int)ctx.GD_DOC_ACTAS.Max(t => t.ID) + 1;
                }
                catch
                {
                    m = 1;
                }
                return m;
            }


        }


        class cmdInsert : absTemplate
        {
            private INT_INFOCONT e = null;
            public vINT_INFOCONT oDto { get; set; }
            CONTRATOS oContrato=null;
            
            #region ImplementaciónMetodosAbstractos
            private bool ExisteContrato()
            {
                return oContrato != null;
            }
            protected override bool esValido()
            {
                
                oContrato = ctx.CONTRATOS.Where(t => t.COD_CON == oDto.COD_CON).FirstOrDefault();
                if (!ExisteContrato())
                {
                    byaRpt.Mensaje = "No se encuentra el contrato relacionado";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }
                else
                {
                    if (oDto.DES_INF=="")
                    {
                        byaRpt.Mensaje = "Debe escribir el resumen del Informe";
                        byaRpt.Error = true;
                        return !byaRpt.Error;
                    }
                    if (oDto.VAL_PAG < 0)
                    {
                        byaRpt.Mensaje = "El valor a pagar debe ser mayor a 0";
                        byaRpt.Error = true;
                        return !byaRpt.Error;
                    }
                    if (oDto.CAN_HOJ <= 0)
                    {
                        byaRpt.Mensaje = "Debe especificar el N° de Folios";
                        byaRpt.Error = true;
                        return !byaRpt.Error;
                    }
                    if (oDto.FEC_INI > oDto.FEC_FIN)
                    {
                        byaRpt.Mensaje = "La fecha final del informe debe ser mayor a la fecha inicial ";
                        byaRpt.Error = true;
                        return !byaRpt.Error;
                    }
                    return true;
                }

            }
            protected override void Antes()
            {
             
                e = new INT_INFOCONT();
                Mapper.CreateMap< vINT_INFOCONT,INT_INFOCONT>();
                Mapper.Map(oDto, e);
                e.FE_REG = DateTime.Now;
                e.ID = ObtenerID();
                e.NUM_INF = ObtenerNUM_INF();
                ctx.INT_INFOCONT.Add(e);
                byaRpt.id = e.NUM_INF.ToString();
                byaRpt.Error = false;
            }
            #endregion
            private int ObtenerID()
            {
                int m;
                try
                {
                    m = (int)ctx.INT_INFOCONT.Max(t => t.ID) + 1;
                }
                catch
                {
                    m = 1;
                }
                return m;
            }
            private int ObtenerNUM_INF()
            {
                int m;
                try
                {
                    m = (int)ctx.INT_INFOCONT.Where(t=>t.COD_CON==oDto.COD_CON).Max(t => t.NUM_INF) + 1;
                }
                catch
                {
                    m = 1;
                }
                return m;
            }

        }

        class cmdUpdate : absTemplate
        {
            private INT_INFOCONT e = null;
            public vINT_INFOCONT oDto { get; set; }
            

            #region ImplementaciónMetodosAbstractos
          
            protected override bool esValido()
            {

                e = ctx.INT_INFOCONT.Where(t => t.ID == oDto.ID).FirstOrDefault();
                byaRpt.id=oDto.ID.ToString();
                if (e == null)
                {
                    byaRpt.Mensaje = "No se encuentra el informe ";
                    byaRpt.Error = true;
                    return !byaRpt.Error;
                }
                else
                {
                    if (e.EST_INF == "RV")
                    {
                        byaRpt.Mensaje = "El Informe no se puede modificar, ya fue revisado y aceptado por el supervisor";
                        byaRpt.Error = true;
                        return !byaRpt.Error;
                    }
                    else
                    {
                        if (oDto.DES_INF == "")
                        {
                            byaRpt.Mensaje = "Debe escribir el resumen del Informe";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                        if (oDto.VAL_PAG < 0)
                        {
                            byaRpt.Mensaje = "El valor a pagar debe ser mayor a 0";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                        if (oDto.CAN_HOJ < 1)
                        {
                            byaRpt.Mensaje = "Debe especificar el N° de Folios";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                        if (oDto.FEC_INI > oDto.FEC_FIN)
                        {
                            byaRpt.Mensaje = "La fecha final del informe debe ser mayor a la fecha inicial ";
                            byaRpt.Error = true;
                            return !byaRpt.Error;
                        }
                        if (oDto.EST_INF == "AC")//si lo voy a activar
                        {
                            
                            //Si es un informe para solicitar un pago
                            if (e.VAL_PAG > 0)
                            {
                                //SALUD
                                    //Al menos un soporte de Salud
                                    if (e.INT_PAGOSST.Where(t => t.ESTADO != "AN").Count() == 0)
                                    {
                                        byaRpt.Mensaje = "El informe no se puede Activar para la revisión del Supevisor, No ha asociado el pago de salud.";
                                        byaRpt.Error = true;
                                        return !byaRpt.Error;
                                    }
                                    //Al menos un soporte de Salud
                                    if (e.GD_DOC_ACTAS.Where(t => t.TIP_DOC == "66").Count() > 0)
                                    {
                                        byaRpt.Mensaje = "El informe no se puede Activar para la revisión del Supevisor, No ha asociado el documento soporte del pago de salud.";
                                        byaRpt.Error = true;
                                        return !byaRpt.Error;
                                    }
                                //FACTURA  
                                    if (e.OBL_FAC == "SI")
                                    {
                                        //se verifica que halla subido el soporte de la factura
                                        if (e.GD_DOC_ACTAS.Where(t => t.TIP_DOC == "67").Count() > 0)
                                        {
                                            byaRpt.Mensaje = "El informe no se puede Activar para la revisión del Supevisor, No ha asociado el documento soporte de la factura.";
                                            byaRpt.Error = true;
                                            return !byaRpt.Error;
                                        }
                                    }
                                //VALIDAR SI ES PERSONA JURIDICA
                                //e.CONTRATOS.TERCEROS_1.TIP_IDE
                            }
                        }
                    }
                    
                    
                    return true;
                }

            }
            protected override void Antes()
            {
                //e.FEC_MON = DateTime.Now;
                e.EST_INF = oDto.EST_INF;
                e.CAN_HOJ = oDto.CAN_HOJ;
                e.DES_INF = oDto.DES_INF;
                e.FEC_FIN = oDto.FEC_FIN;
                e.FEC_INI = oDto.FEC_INI;
                e.FEC_INF = oDto.FEC_INF;
                e.NOT_INF = oDto.NOT_INF;
                e.NOT2_INF = oDto.NOT2_INF;
                e.OBL_FAC = oDto.OBL_FAC;
                e.VAL_PAG = oDto.VAL_PAG;
                ctx.Entry(e).State = EntityState.Modified;
                byaRpt.id = e.NUM_INF.ToString();
                byaRpt.Error = false;
            }
            #endregion
          

        }

        #region SeguridadSocial

        public ByARpt Insert(vINT_PAGOSST Reg)
        {
            cmdInsertSS o = new cmdInsertSS();
            o.oDto = Reg;
            return o.Enviar();
        }

        public ByARpt Update(vINT_PAGOSST Reg)
        {
            cmdUpdateSS o = new cmdUpdateSS();
            o.oDto = Reg;
            return o.Enviar();
        }

        public ByARpt Anular(vINT_PAGOSST Reg)
        {
            cmdAnularSS o = new cmdAnularSS();
            o.oDto = Reg;
            return o.Enviar();
        }
      

        public List<vINT_PAGOSST> GetSS(string CodCon, decimal? IdeInf)
        {
            List<vINT_PAGOSST> l = new List<vINT_PAGOSST>();
            List<INT_PAGOSST> lst;
            using (ctx = new Entities())
            {
                if (IdeInf == null)
                {
                    lst = ctx.INT_PAGOSST.Where(t => t.COD_CON == CodCon && t.ESTADO != "AN").ToList();
                }else{
                    lst= ctx.INT_PAGOSST.Where(t => t.COD_CON == CodCon && t.IDE_INF==IdeInf && t.ESTADO != "AN").ToList();
                }
                //Mapear de aef  a DTO    
                Mapper.CreateMap<INT_PAGOSST, vINT_PAGOSST>();
                Mapper.Map(lst, l);
                l.OrderBy(t => new { t.PERIODO_PAGO });
                return l;
            }
        }

        class cmdAnularSS : absTemplate
        {
            private INT_PAGOSST e = null;
            public vINT_PAGOSST oDto { get; set; }


            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                e = ctx.INT_PAGOSST.Find(oDto.ID);
                if (!Existe(e))
                {
                    byaRpt.Mensaje = "No se encuentra el Registro de Seguridad Social ";
                    byaRpt.Error = false;
                    return byaRpt.Error;
                }
                else
                {
                    if ( !(e.INT_INFOCONT.EST_INF == "AC" || e.INT_INFOCONT.EST_INF == "BO"))
                    {

                        byaRpt.Mensaje = "No se puede anular porque el Informe asociado ya fue revisado y aceptado por el supervisor";
                        byaRpt.Error = false;
                        return byaRpt.Error;
                    }
                    return true;
                }

            }
            protected override void Antes()
            {
                e.ESTADO = "AN";
                e.OBS = oDto.OBS;
                e.USAPM = oDto.USAPM;
                ctx.Entry(e).State = EntityState.Modified;
                byaRpt.id = e.ID.ToString();
            }

            #endregion


        }
        class cmdUpdateSS : absTemplate
        {
            private INT_PAGOSST e = null;
            public vINT_PAGOSST oDto { get; set; }
            

            #region ImplementaciónMetodosAbstractos
            
            protected override bool esValido()
            {

                e = ctx.INT_PAGOSST.Find(oDto.ID);
                if (!Existe(e))
                {
                    byaRpt.Mensaje = "No se encuentra el Registro de Seguridad Social ";
                    byaRpt.Error = false;
                    return byaRpt.Error;
                }
                else
                {
                    if (!(e.INT_INFOCONT.EST_INF == "AC" || e.INT_INFOCONT.EST_INF == "BO"))
                    {
                        byaRpt.Mensaje = "El estado se encuentra " + e.INT_INFOCONT.EST_INF + " No se puede anular el documento";
                        byaRpt.Error = false;
                        return byaRpt.Error;
                    }
                    return true;
                }

            }
            protected override void Antes()
            {
                e.PLANILLAN = oDto.PLANILLAN;
                e.OBS = oDto.OBS;
                e.MES_PAGO = oDto.MES_PAGO;
                e.YEAR_PAGO = oDto.YEAR_PAGO;
                e.VAL_SALUD = oDto.VAL_SALUD;
                e.VAL_PARAF = oDto.VAL_PARAF;
                e.VAL_PENSION = oDto.VAL_PENSION;
                e.VAL_RIESGOS = oDto.VAL_RIESGOS;
                e.TIPO_PLA = oDto.TIPO_PLA;
                e.NRO_DOC = oDto.NRO_DOC;
                e.FEC_MOD = DateTime.Now;
                e.USAPM = oDto.USAPM;
                ctx.Entry(e).State = EntityState.Modified;
                byaRpt.id = e.ID.ToString();
            }
      
            #endregion


        }
        class cmdInsertSS : absTemplate
        {
            private INT_PAGOSST e = null;
            public vINT_PAGOSST oDto { get; set; }
            CONTRATOS oContrato = null;
            INT_INFOCONT oInfo = null;

            #region ImplementaciónMetodosAbstractos
            protected override bool esValido()
            {

                oContrato = ctx.CONTRATOS.Find(oDto.COD_CON);
                oInfo = ctx.INT_INFOCONT.Find(oDto.IDE_INF);
                if (oContrato==null)
                {
                    byaRpt.Mensaje = "No se encuentra el contrato relacionado";
                    byaRpt.Error = false;
                    return byaRpt.Error;
                }
                if (oInfo==null)
                {
                    byaRpt.Mensaje = "No se encuentra el informe relacionado";
                    byaRpt.Error = false;
                    return byaRpt.Error;
                }
                else
                {
                    if (!(oInfo.EST_INF == "AC" || oInfo.EST_INF == "BO"))
                    {

                        byaRpt.Mensaje = "No se puede anular porque el Informe asociado ya fue revisado y aceptado por el supervisor";
                        byaRpt.Error = false;
                        return byaRpt.Error;
                    }
                    return true;
                }

            }
            protected override void Antes()
            {

                e = new INT_PAGOSST();
                Mapper.CreateMap<vINT_PAGOSST, INT_PAGOSST>();
                Mapper.Map(oDto, e);
                e.FEC_REG = DateTime.Now;
                e.ID = ObtenerID();
                e.ESTADO = "AC";
                ctx.INT_PAGOSST.Add(e);
                byaRpt.id = e.ID.ToString();
                byaRpt.Error = false;
            }
            #endregion

            private int ObtenerID()
            {
                int m;
                try
                {
                    m = (int)ctx.INT_PAGOSST.Max(t => t.ID) + 1;
                }
                catch
                {
                    m = 1;
                }
                return m;
            }

        }


        public List<vINTTIPO_ESS> GetTipoSS()
        {
            List<vINTTIPO_ESS> l = new List<vINTTIPO_ESS>();
            using (ctx = new Entities())
            {
                List<INTTIPO_ESS> lst = ctx.INTTIPO_ESS.Where(t => t.EST_TIP == "AC").ToList();
                Mapper.CreateMap<INTTIPO_ESS, vINTTIPO_ESS>();//Mapear de aef  a DTO    
                Mapper.Map(lst, l);
                return l;
            }
        }
        #endregion
    }
}
