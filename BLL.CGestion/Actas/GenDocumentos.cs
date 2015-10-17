using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.CGestion.Filtros;
using ByA;
using Entidades;
using GDocWord;

namespace BLL.CGestion.Actas
{
    #region
 
    /// <summary>
    /// CLASES ESENCIALES PARA EL MANEJO DE LA IMPRESION
    /// </summary>
    public class rPPLANTILLAS_FORMATO_TABLAS
    {
        public string NTABLA { get; set; }
        public string NOM_CAM { get; set; }
        public string DES_CAM { get; set; }
        public string TIP_DAT { get; set; }
        public Nullable<decimal> ANCHO { get; set; }
    }
    /// <summary>
    /// CLASE PARA QUE SIRVE DE BASE PARA OBTENER LIST DE STRING
    /// </summary>
    class stringD
    {
        public string Desc { get; set; }
    }

    public class rFmtoTablas : GDocWord.IFmtoColumn
    {
        public List<rPPLANTILLAS_FORMATO_TABLAS> lft;
        int IFmtoColumn.getAncho(string NomTabla, string NomCam)
        {
            return (int)lft.Where(t => t.NTABLA == NomTabla && t.NOM_CAM == NomCam).Select(t => t.ANCHO).FirstOrDefault();
        }

        string IFmtoColumn.getTipoDato(string NomTabla, string NomCam)
        {
            return lft.Where(t => t.NTABLA == NomTabla && t.NOM_CAM == NomCam).Select(t => t.TIP_DAT).FirstOrDefault();
        }


        public int tieneConf(string NomTabla, string NomCam)
        {
            return (int)lft.Where(t => t.NTABLA == NomTabla && t.NOM_CAM == NomCam).Count();
        }


        public string getDescripcion(string NomTabla, string NomCam)
        {
            return lft.Where(t => t.NTABLA == NomTabla && t.NOM_CAM == NomCam).Select(t => t.DES_CAM).FirstOrDefault();
        }
    }
    #endregion
   
    /// <summary>
    /// CLASE BASE PARA LA GENERACION DEL DOCUMENTO
    /// </summary>
    /// 
    public abstract class GenDocumento
    {
        #region PROPIEDADES
        
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }

        public string IdDocumento { get; set; }
        public decimal IdPlantilla { get; set; }

        public byte[] Doc_Doc { get; set; }
        public byte[] Doc_PDF { get; set; }

        protected DataTable dtDatos = new DataTable();//datos prinicipales de la plantilla, un solo campo
        protected DataTable dtPlantilla = new DataTable();

        protected List<string> ListaNomTablas = new List<string>();
        protected List<DataTable> ListaTablas = new List<DataTable>();
        protected List<string> ListaGrupoNomTabla = new List<string>();
        protected List<DataTable> ListaGrupoTabla = new List<DataTable>();
        protected rFmtoTablas FormatoTablas = new rFmtoTablas();
        protected PPLANTILLAS oPlantilla { get; set; }

        protected List<PPLANTILLAS_CAMPOS> lPlantillasCampos = null;
        //List<T> ldatosP = new List<T>();
        public string Clave {
            get { 
                return "SIRCCGM"; 
            }
         }

        GDWord oWord = new GDWord();
        #endregion

        public bool lErrorWord
        {
            get{
                return oWord.lErrorG;
            }
        }

        public string MsgWord
        {
            get
            {
                return oWord.Msg;
            }
        }

        #region METODOSPROTEGIDOS Y ABSTRACTOS
        protected abstract void ObtenerTablaDocumento();
        protected abstract void ObtenerTablasRelacionadas();
        protected abstract bool ObtenerDocumento();
        #endregion

        #region metodosprivados_implementados
        private void ObtenerPlantillasFormatosTablas()
        {
            FormatoTablas.lft = oPlantilla.PPLANTILLAS_FORMATO_TABLAS
                .Select(t => new rPPLANTILLAS_FORMATO_TABLAS
                {
                    DES_CAM = t.DES_CAM,
                    ANCHO = t.ANCHO,
                    TIP_DAT = t.TIP_DAT,
                    NOM_CAM = t.NOM_CAM,
                    NTABLA = t.NTABLA
                }).ToList();
        }
        private void ObtenerPlantilla()
        {
            oPlantilla = ctx.PPLANTILLAS.Find(IdPlantilla);
        }
        private void ObtenerPPlantillasCampos()
        {
            lPlantillasCampos = ctx.PPLANTILLAS_CAMPOS.Where(t => t.IDE_PLA == oPlantilla.IDE_PLA && t.EST_CAM == "AC").ToList();
        }
        protected DataTable ObtenerTablaPlantillasCampos()
        {
            return ByAUtil.convertToDataTable(lPlantillasCampos);
        }
        private string GenerarDocumento()
        {
            string Msg = "";

            if (this.lPlantillasCampos != null)
            {
                byte[] DocPlantilla = oPlantilla.PLANTILLA;
                ObtenerTablaDocumento();
                DataTable dtPlantillasCampos = ObtenerTablaPlantillasCampos();
                byte[] Documento = null;
                byte[] DocumentoPDF = null;
                if ((DocPlantilla != null))
                {
                    if (oPlantilla.EDITABLE == "1")
                    {
                        oWord.DocProtegido = true;
                        oWord.ClavePlantilla = this.Clave;
                    }
                    else
                    {
                        oWord.DocProtegido = false;
                    }

                    oWord.DocProtegido = true;
                    oWord.ClavePlantilla = Clave;

                    oWord.IdPlantilla = oPlantilla.IDE_PLA.ToString();
                    oWord.ListaNomTablas = ListaNomTablas;
                    oWord.ListaTablas = ListaTablas;
                    oWord.pfm = this.FormatoTablas;
                    Documento = oWord.GenerarDocumento(DocPlantilla, dtPlantillasCampos, dtDatos);
                    DocumentoPDF = oWord.Documento_Pdf;
                    if (!oWord.lErrorG)
                    {
                        if ((Documento != null))
                        {
                            Doc_Doc = oWord.Documento_Word;
                            Doc_PDF = oWord.Documento_Pdf;
                            Msg = "Se Generó el Documento N°";
                        }
                    }
                }
                else
                {
                    Msg = "La plantilla no esta definida. Por favor verifique";
                }
            }
            return Msg;
        }
        #endregion

        #region metodospublicos
        /// <summary>
        /// Metodo publico de construcción de documento plantilla
        /// </summary>
        /// <returns></returns>
        public byte[] imprimir()
        {
            using (ctx = new Entities())
            {
                if (ObtenerDocumento())
                {
                    ObtenerPlantilla();
                    ObtenerPlantillasFormatosTablas();
                    ObtenerPPlantillasCampos();
                    ObtenerTablasRelacionadas();
                    GenerarDocumento();
                }
                return this.Doc_PDF;
            }
        }
        /// <summary>
        /// Metodo Privado que Genera el Documento con el Objeto de Word
        /// </summary>
        /// <returns></returns>

        #endregion

        public string DecToLet(decimal num)
        {
            Numalet let = new Numalet();
            let.SeparadorDecimalSalida = "pesos y";
            let.ConvertirDecimales = true;
            //redondeando en cuatro decimales
            let.Decimales = 2;
            let.MascaraSalidaDecimal = "centavos";
            return let.ToCustomCardinal(num);
        }


        protected string buildContratistaC2(CONTRATOS c)
        {
            string nom_contratista = buildNomTer(c.TERCEROS);
            string nombre = c.TERCEROS.TIP_IDE.Trim() != "NI" ? nom_contratista : buildTercero(c.IDE_REP) + " Representante Legal de " + nom_contratista;
            return nombre;
        }

        protected string buildTercero(string IdeTer)
        {
            return buildNomTer(ctx.TERCEROS.Where(t => t.IDE_TER == IdeTer).FirstOrDefault());
        }
        protected string buildModalidad(string NroProceso)
        {
            return ctx.TIPOSPROC.Where(t => t.COD_TPROC == NroProceso).Select(t => t.ABRE_TPROC + "-" + t.NOM_TPROC).FirstOrDefault();
        }
        protected string buildPlazo(CONTRATOS c)
        {
            string plazo = "";
            if (c.TIPO_PLAZO != null)
            {
                plazo = c.PLA_EJE_CON + " " + c.TIPO_PLAZOS.NOM_PLA;
                if (c.TIPO_PLAZO2 != null)
                {
                    plazo += " " + c.PLAZO2_EJE_CON + " " + ctx.TIPO_PLAZOS.Where(t => t.COD_TPLA == c.TIPO_PLAZO2).Select(t => t.NOM_PLA).FirstOrDefault();
                }
            }
            return plazo;
        }
        protected string buildNomTer(TERCEROS t)
        {
            if (t != null)
            {
                return t.NOM1_TER + " " + t.NOM2_TER + " " + t.APE1_TER + " " + t.APE2_TER;
            }
            return "";
        }
        
    }

}
