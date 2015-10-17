using BLL.EstPrev;
using ByA;
using Entidades;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace BLL.PROCESOS.GenDoc
{
    public class mCruzarDocSecciones
    {
        private Dictionary<string, string> GetCampos()
        {
            Dictionary<string, string> lstCampos = new Dictionary<string, string>();
            lstCampos.Add("NOM_DEP_NEC_EP", "DEP_SOLICITANTE");
            lstCampos.Add("CLASE_CONT", "CLASE_CONTRATO");
            lstCampos.Add("OBJE_EP", "OBJETO");
            lstCampos.Add("VAL_ENT_EP", "VAL_APORTES_PROPIOS");
            lstCampos.Add("VAL_OTR_EP", "VAL_APORTES_OTROS");
            lstCampos.Add("VALOR_TOTALC", "VALOR_A_CONTRATAR");
            lstCampos.Add("VAL_TOTAL_LETRAS", "TOTAL_LETRAS");
            lstCampos.Add("PLAZO_EP", "PLAZO_EJECUCIÓN");
            lstCampos.Add("LUGE_EP", "LUGAR_EJECUCION");
            lstCampos.Add("PLIQ_EP", "PLAZO_LIQUIDACION");
            //lstCampos.Add("NOM_DEP_SUP_EP","DEP_SUPERVISION");
            lstCampos.Add("POLIZAS", "POLIZAS");
            lstCampos.Add("CDP", "CDP");
            lstCampos.Add("OBLIGACIONESC", "OBLIG_CTISTA");
            lstCampos.Add("OBLIGACIONESE", "OBLIG_ENTIDAD");
            lstCampos.Add("sFEC_ELA_EP", "FEC_ELABORACION");
            lstCampos.Add("NOM_DEP_SUP_EP", "DEPENDENCIA_SUPERVISOR");
            lstCampos.Add("RESPONSABLE_EP", "NOM_RESPONSABLE_EP");
            lstCampos.Add("DILIGENCIADO_POR", "NOM_DILIGENCIADO_POR");
            lstCampos.Add("sFORMA_PAGO", "FORMA_PAGO");
            //lstCampos.Add("sBANCO_PROY","PROYECTO_PLAN_C");
            lstCampos.Add("LOGO", "LOGO");
            lstCampos.Add("sBANCO_PROY", "PROYECTOS");
            lstCampos.Add("NEC_EP", "NECESIDAD");
            lstCampos.Add("VARIABLESPPTO_EP", "VARIABLES_PPTO");
            lstCampos.Add("OBLIGGRC", "OBLIG_GRAL_CTISTA");
            lstCampos.Add("OBLIGGRE", "OBLIG_GRAL_ENTIDAD");
            lstCampos.Add("JUST_VALOR_EP", "JUSTIFICACION_VALOR");
            lstCampos.Add("CAP_JURIDICA_EP", "CAP_JURIDICA");
            lstCampos.Add("CAP_FINANCIERA_EP", "CAP_FINANCIERA");
            lstCampos.Add("CAP_RESIDUAL_EP", "CAP_RESIDUAL");
            lstCampos.Add("PERS_LEGAL_EP", "PERSPECTIVA_LEGAL");
            lstCampos.Add("PERS_ORGA_EP", "PERSPECTIVA_ORGANIZACIONAL");
            lstCampos.Add("CAP_EXPERIENCA_EP", "EXPERIENCIA");
            lstCampos.Add("NEC_CONT_INT_EP", "NEC_INTERVENTOR_EXTERNO");
            lstCampos.Add("SOM_ACUE_COMER_EP", "ACUERDO_COMERCIAL");
            lstCampos.Add("CONST_CUMP_DEBERES_EP", "CONSTANCIA_CUMPLIMIENTO");
            lstCampos.Add("IDE_SUP_EP", "IDENTIFICACION_SUPERVISOR");
            lstCampos.Add("NOM_SUP_EP", "NOMBRE_SUPERVISOR");
            lstCampos.Add("CAR_SUP_EP", "CARGO_SUPERVISOR");
            lstCampos.Add("NOM_TIPO_PPTO", "TIPO_PPTO");
            lstCampos.Add("PAAID", "PAA_CODIGO");
            lstCampos.Add("PAADESC", "PAA_DESCRIPCION");
            lstCampos.Add("ESP_OBJ_EP", "ESPECIFICACIONES_OBJETO");
            lstCampos.Add("AUTPERLIC_EP", "AUT_PER_LIC");
            lstCampos.Add("DOCTECNICOS_EP", "DOCUMENTOS_TECNICOS");
            lstCampos.Add("IDONEIDAD_EP", "IDONEIDAD");
            lstCampos.Add("CAP_ORGANIZACIONAL_EP", "CAP_ORGANIZACIONAL");
            lstCampos.Add("FACTORES_EVALUACION_EP", "FAC_EVALUACION");
            lstCampos.Add("REGLAS_DESEMPATE_EP", "REGLAS_DESEMPATES");
            lstCampos.Add("UNSPSC", "UNSPSC");
            lstCampos.Add("PLIQ_LETRAS_EP", "PLAZO_LIQUIDACION_TEXTO");
            lstCampos.Add("NOM_ENTIDAD", "ENTIDAD");
            lstCampos.Add("MOD_SEL_EP", "MODALIDAD_SELECCION");
            lstCampos.Add("FUN_JUR_MOD", "JUSTIFICACION_MODALIDAD");
            lstCampos.Add("CAR_RES_EP", "CARGO_RESPONSABLE");

            lstCampos.Add("NRO_PROC","NUMERO_PROCESO");
            lstCampos.Add("FEC_PROC", "FECHA_PROCESO");

            return lstCampos;
        }

        public void ActualizarSecciones(decimal ID_DOC)
        {
            using (Entities db = new Entities())
            {
                DOC_PLANTILLA Doc = db.DOC_PLANTILLA.Where(t=> t.ID == ID_DOC).FirstOrDefault();
                vDatosEPProc o = GetDatos(Doc.NUM_PROC);
                List<vDatosEPProc> lstDatos = new List<vDatosEPProc>();
                lstDatos.Add(o);
                DataTable dt = ByAUtil.convertToDataTable(lstDatos);

                List<DOC_SECCIONES> lstSecciones = Doc.DOC_SECCIONES.OrderBy(t=> t.ID).ToList();
                foreach (var item in lstSecciones)
                {
                    item.CRUZADO = ReemplazarCampos(dt, item.HTML);
                }
                db.SaveChanges();
            }
        }

        public vDatosEPProc GetDatos(string NUM_PROC)
        {
            EstPrevBLL epBLL = new EstPrevBLL();
            using (Entities db = new Entities())
            {                
                try{
                    Mapper.CreateMap<vDatosEP, vDatosEPProc>();

                    PCONTRATOS Proceso = db.PCONTRATOS.Where(t => t.PRO_SEL_NRO == NUM_PROC).FirstOrDefault();
                    PSOLICITUDES Solicitud = db.PSOLICITUDES.Where(t => t.COD_SOL == Proceso.NUM_SOL).FirstOrDefault();
                    vDatosEP DatosEP = epBLL.GetDatos(Solicitud.COD_EP);

                    vDatosEPProc DatEPPrc = new vDatosEPProc();
                    Mapper.Map(DatosEP, DatEPPrc);

                    DatEPPrc.NRO_PROC = Proceso.PRO_SEL_NRO;
                    DatEPPrc.FEC_PROC = (DateTime) Proceso.FEC_REG;

                    return DatEPPrc;

                }catch{
                    vDatosEPProc dat = new vDatosEPProc();
                    return dat;
                }

                
            }
        }

        private string ReemplazarCampos(DataTable dt, string html)
        {
            foreach (var item in GetCampos()) {
                    string Campo = "{" + item.Value + "}";
                    string Valor = dt.Rows[0][item.Key].ToString();
                    html = html.Replace(Campo, Valor);
            }
            return html;
        }
    }
}
