using AutoMapper;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;
using Entidades.Vistas;

namespace BLL
{
    public class mDocumentos
    {
        Entities ctx;
        public mDocumentos()
        {
            Mapper.CreateMap<vDOC_SECCIONES, DOC_SECCIONES>();
            Mapper.CreateMap<DOC_SECCIONES, vDOC_SECCIONES>();
            Mapper.CreateMap<vDOC_PLANTILLA, DOC_PLANTILLA>();
            Mapper.CreateMap<DOC_PLANTILLA, vDOC_PLANTILLA>()
                .ForMember(dest => dest.NOM_COD_TIP, opt => opt.MapFrom(src => src.PL_TIPOS_PLANTILLA.NOM_TIP))
                .ForMember(dest => dest.lSecciones, opt => opt.MapFrom(src => src.DOC_SECCIONES.OrderBy(t=> t.ID)));

            Mapper.CreateMap<vPL_SECCIONES, vDOC_SECCIONES>();
            Mapper.CreateMap<vPL_PLANTILLA, vDOC_PLANTILLA>();
        }
        public List<vDOC_PLANTILLA> Gets(string NUM_PROC)
        {
            using (ctx = new Entities())
            {
                List<vDOC_PLANTILLA> r = new List<vDOC_PLANTILLA>();
                List<DOC_PLANTILLA> b = ctx.DOC_PLANTILLA.Where(t=> t.NUM_PROC == NUM_PROC).OrderBy(t => t.ID).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public List<vDOC_PLANTILLA> Gets(string NUM_PROC,decimal ID_PLA)
        {
            using (ctx = new Entities())
            {
                List<vDOC_PLANTILLA> r = new List<vDOC_PLANTILLA>();
                List<DOC_PLANTILLA> b;
                b = ctx.DOC_PLANTILLA.Where(t => t.NUM_PROC == NUM_PROC && t.ID_PLA == ID_PLA).OrderBy(t => t.ID).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vDOC_PLANTILLA Get(decimal ID)
        {
            using (ctx = new Entities())
            {
                vDOC_PLANTILLA r = new vDOC_PLANTILLA();
                DOC_PLANTILLA b = ctx.DOC_PLANTILLA.Where(t => t.ID == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(decimal ID_PLA,string NUM_PROC)
        {
            mPlantillas oPlantilla = new mPlantillas();
            vPL_PLANTILLA Plantilla = oPlantilla.Get(ID_PLA);

            vDOC_PLANTILLA Reg = new vDOC_PLANTILLA();
            Mapper.Map(Plantilla, Reg);
            Reg.EST_DOC = "AC";
            Reg.FEC_DOC = DateTime.Now;
            Reg.NUM_PROC = NUM_PROC;
            Reg.ID_PLA = ID_PLA;
            Reg.COMPLETADO = "INI";

            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vDOC_PLANTILLA Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt CompletarDocumento(vCOMPLETAR_DOCUMENTO Reg)
        {
            cmdCompletarDocumento o = new cmdCompletarDocumento();
            o.objCompletar = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private DOC_PLANTILLA ep = null;
            public vDOC_PLANTILLA oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                PL_PLANTILLA Plantilla = ctx.PL_PLANTILLA.Where(t => t.ID == oDto.ID_PLA).FirstOrDefault();
                List<DOC_PLANTILLA> lDocumentos = ctx.DOC_PLANTILLA.Where(t => t.ID_PLA == oDto.ID_PLA && t.NUM_PROC == oDto.NUM_PROC).ToList();
                if (lDocumentos.Count() >= Plantilla.DOC_MAX) {
                    byaRpt.Mensaje = "Ya ha creado el número máximo de documentos permitidos para esta plantilla en este proceso";
                    byaRpt.Error = true;
                    return false;
                }else return true;
            }

            protected internal override void Antes()
            {
                ep = new DOC_PLANTILLA();

                decimal ultId = 0;
                DOC_PLANTILLA oldPlantilla = ctx.DOC_PLANTILLA.OrderByDescending(t => t.ID).FirstOrDefault();
                if (oldPlantilla != null) ultId = oldPlantilla.ID;

                ultId++;
                oDto.ID = ultId;

                string strId = oDto.ID.ToString();
                int tam = strId.Length;
                for (decimal i = 1; i <= 6 - tam; i++)
                {
                    strId = "0" + strId;
                }
                oDto.NRO_DOC = strId;

                Mapper.Map(oDto, ep);
                ep.EST_COMPLETADO = oDto.COMPLETADO;
                ctx.DOC_PLANTILLA.Add(ep);
                InsertSecciones();

                byaRpt.id = ep.ID.ToString();
            }
            private void InsertSecciones()
            {
                decimal ultId = 0;
                DOC_SECCIONES oldSecciones = ctx.DOC_SECCIONES.OrderByDescending(t => t.ID).FirstOrDefault();
                if (oldSecciones != null) ultId = oldSecciones.ID;

                foreach (vDOC_SECCIONES item in oDto.lSecciones)
                {
                    DOC_SECCIONES Seccion = new DOC_SECCIONES();
                    ultId++;

                    item.ID = ultId;
                    item.ID_DOC = oDto.ID;
                    Mapper.Map(item, Seccion);
                    ctx.DOC_SECCIONES.Add(Seccion);
                }
            }
            #endregion
        }
        class cmdCompletarDocumento : absTemplate
        {
            public vCOMPLETAR_DOCUMENTO objCompletar { get; set; }
            DOC_PLANTILLA Documento { get; set; }
            #region ImplementaciónMetodosAbstractos
            protected internal override bool esValido()
            {
                Documento = ctx.DOC_PLANTILLA.Where(t => t.ID == objCompletar.ID_DOC).FirstOrDefault();
                if (Documento != null)
                {
                    if (Documento.EST_COMPLETADO == "INI") return true;
                    else
                    {
                        byaRpt.Error = false;
                        byaRpt.Mensaje = "Este documento ya ha sido completado.";
                        return false;
                    }
                }
                else
                {
                    byaRpt.Error = false;
                    byaRpt.Mensaje = "No existe un documento con esta identificación.";
                    return false;
                }
            }
            protected internal override void Antes()
            {
                Documento.EST_COMPLETADO = "COM";
                CompletarActividad();
            }
            private void CompletarActividad()
            {
                List<PCRONOGRAMAS> lCronograma = ctx.PCRONOGRAMAS.Where(t => t.TIP_PLA == Documento.COD_TIP && t.NUM_PROC == Documento.NUM_PROC).ToList();
                foreach (PCRONOGRAMAS Cronograma in lCronograma)
                {
                    Cronograma.EST_ACT = "0003";
                    Cronograma.OBS_SEG = "";
                }
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vDOC_PLANTILLA oDto { get; set; }
            public DOC_PLANTILLA ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.DOC_PLANTILLA.Where(t => t.ID == oDto.ID).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected internal override void Antes()
            {
                oDto.ID_PLA = (decimal) ep.ID_PLA;
                Mapper.Map(oDto, ep);
                ep.EST_COMPLETADO = oDto.COMPLETADO;
                EliminarSecciones();
                ModificarSecciones();
                NuevasSecciones();
            }
            private void EliminarSecciones()
            {
                List<DOC_SECCIONES> lSeccionesOld = ctx.DOC_SECCIONES.Where(t => t.ID_DOC == oDto.ID).ToList();
                foreach (DOC_SECCIONES item in lSeccionesOld)
                {
                    bool ban = true;
                    foreach (vDOC_SECCIONES item2 in oDto.lSecciones)
                    {
                        if (item.ID == item2.ID) ban = false;
                    }
                    if (ban)
                    {
                        ctx.DOC_SECCIONES.Remove(item);
                    }
                }
            }
            private void NuevasSecciones()
            {
                decimal ultId = 0;
                DOC_SECCIONES oldSecciones = ctx.DOC_SECCIONES.OrderByDescending(t => t.ID).FirstOrDefault();
                if (oldSecciones != null) ultId = oldSecciones.ID;

                foreach (vDOC_SECCIONES item in oDto.lSecciones.Where(t=> t.ES_NUEVO).ToList())
                {
                    DOC_SECCIONES Seccion = new DOC_SECCIONES();
                    ultId++;

                    item.ID = ultId;
                    item.ID_DOC = oDto.ID;
                    Mapper.Map(item, Seccion);
                    ctx.DOC_SECCIONES.Add(Seccion);
                }
            }
            private void ModificarSecciones()
            {
                foreach (vDOC_SECCIONES item in oDto.lSecciones.Where(t => !t.ES_NUEVO).ToList())
                {
                    DOC_SECCIONES Seccion = ctx.DOC_SECCIONES.Where(t => t.ID == item.ID).FirstOrDefault();
                    Mapper.Map(item, Seccion);
                }
            }
            #endregion
        }
    }
}
