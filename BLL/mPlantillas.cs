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
    public class mPlantillas
    {
        Entities ctx;
        public mPlantillas()
        {
            Mapper.CreateMap<vPL_SECCIONES, PL_SECCIONES>();
            Mapper.CreateMap<PL_SECCIONES, vPL_SECCIONES>();
            Mapper.CreateMap<vPL_PLANTILLA, PL_PLANTILLA>();
            Mapper.CreateMap<PL_PLANTILLA, vPL_PLANTILLA>()
                .ForMember(dest => dest.NOM_COD_TIP, opt => opt.MapFrom(src => src.PL_TIPOS_PLANTILLA.NOM_TIP))
                .ForMember(dest => dest.lSecciones, opt => opt.MapFrom(src => src.PL_SECCIONES.OrderBy(t=> t.ID)));
        }
        public List<vPL_PLANTILLA> Gets()
        {
            using (ctx = new Entities())
            {
                List<vPL_PLANTILLA> r = new List<vPL_PLANTILLA>();
                List<PL_PLANTILLA> b = ctx.PL_PLANTILLA.OrderBy(t => t.ID).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vPL_PLANTILLA Get(decimal ID)
        {
            using (ctx = new Entities())
            {
                vPL_PLANTILLA r = new vPL_PLANTILLA();
                PL_PLANTILLA b = ctx.PL_PLANTILLA.Where(t => t.ID == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public List<vPLANTILLASXPROCESO> GetPlatillasPorProceso(string NUM_PROC, string Filtro)
        {
            using (ctx = new Entities())
            {
                List<vPLANTILLASXPROCESO> lrPlantillas = new List<vPLANTILLASXPROCESO>();
                List<MOD_TIP_PLA> lTiposPlantillas = new List<MOD_TIP_PLA>();
                PCONTRATOS PROCESO = ctx.PCONTRATOS.Where(t => t.PRO_SEL_NRO == NUM_PROC).FirstOrDefault();
                if (PROCESO != null)
                {
                    lTiposPlantillas = ctx.MOD_TIP_PLA.Where(t=> t.COD_MOD == PROCESO.COD_TPRO && t.EST == "AC").ToList();                     
                    foreach (MOD_TIP_PLA item in lTiposPlantillas)
                    {
                        List<PL_PLANTILLA> lPlantillas = ctx.PL_PLANTILLA.Where(t => t.COD_TIP == item.COD_TIP).ToList();
                        if (Filtro != "") lPlantillas = lPlantillas.Where(t => t.TITULO.ToUpper().Contains(Filtro.ToUpper())).ToList();
                        foreach (PL_PLANTILLA item2 in lPlantillas)
                        {
                            vPLANTILLASXPROCESO Plantilla = new vPLANTILLASXPROCESO();
                            Plantilla.TITULO = item2.TITULO;
                            Plantilla.COD_TIP_PLA = item2.COD_TIP;
                            Plantilla.ID_PLA = item2.ID;

                            List<DOC_PLANTILLA> Documentos = ctx.DOC_PLANTILLA.Where(t => t.NUM_PROC == NUM_PROC && t.ID_PLA == item2.ID).ToList();
                            Plantilla.CANTIDAD = Documentos.Count();

                            lrPlantillas.Add(Plantilla);
                        }
                    }
                }
                return lrPlantillas;
            }
        }
        public ByARpt Insert(vPL_PLANTILLA Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vPL_PLANTILLA Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private PL_PLANTILLA ep = null;
            public vPL_PLANTILLA oDto { get; set; }
            private string styles { get; set; }

            #region ImplementaciónMetodosAbstractos
            private void CargarEstilos()
            {
                styles = "" +
                "<style>table {width:100%;border-style: double; border-width: 1px; border-collapse: collapse}" +
                     " td,th {border-style: double; border-width: 1px;resize:both;padding:3px;}" +
                     ".tbconborde {border-collapse: collapse;font-family:Arial;font-size:10pt;}" +
                     ".tbconborde td{border: 1px solid black;padding: 2mm;}" +
                     ".tbconborde tr{width:100%}" +
                     ".tbconborde th {background-color: #f8f3f3;border: 1px solid black;padding: 2mm;}" +
                     ".thSubtitulos {text-align: left;}" +
                     ".thTitulos {text-align: center;}" +
                     ".tdtitulo {font-weight:bold;width:30%;}" +
                     ".tdtitulo2 {font-weight:bold;width:30%;}" +
                "</style>";

            }
            protected internal override bool esValido()
            {
                // Implementar validaciones necesarias
                return true;
            }
            protected internal override void Antes()
            {
                CargarEstilos();
                ep = new PL_PLANTILLA();

                decimal ultId = 0;
                PL_PLANTILLA oldPlantilla = ctx.PL_PLANTILLA.OrderByDescending(t => t.ID).FirstOrDefault();
                if (oldPlantilla != null) ultId = oldPlantilla.ID;

                ultId++;
                oDto.ID = ultId;

                Mapper.Map(oDto, ep);
                ctx.PL_PLANTILLA.Add(ep);
                InsertSecciones();

                byaRpt.id = ep.ID.ToString();
            }
            private void InsertSecciones()
            {
                decimal ultId = 0;
                PL_SECCIONES oldSecciones = ctx.PL_SECCIONES.OrderByDescending(t => t.ID).FirstOrDefault();
                if (oldSecciones != null) ultId = oldSecciones.ID;
                int count = 1;
                foreach (vPL_SECCIONES item in oDto.lSecciones)
                {
                    PL_SECCIONES Seccion = new PL_SECCIONES();
                    ultId++;

                    item.ID = ultId;
                    item.ID_PLA = oDto.ID;
                    Mapper.Map(item, Seccion);
                    if (count == 1) Seccion.HTML = styles + "  " + Seccion.HTML;
                    ctx.PL_SECCIONES.Add(Seccion);
                    count++;
                }
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vPL_PLANTILLA oDto { get; set; }
            public PL_PLANTILLA ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.PL_PLANTILLA.Where(t => t.ID == oDto.ID).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected internal override void Antes()
            {
                Mapper.Map(oDto, ep);
                EliminarSecciones();
                ModificarSecciones();
                NuevasSecciones();
            }
            private void EliminarSecciones()
            {
                List<PL_SECCIONES> lSeccionesOld = ctx.PL_SECCIONES.Where(t => t.ID_PLA == oDto.ID).ToList();
                foreach (PL_SECCIONES item in lSeccionesOld)
                {
                    bool ban = true;
                    foreach (vPL_SECCIONES item2 in oDto.lSecciones)
                    {
                        if (item.ID == item2.ID) ban = false;
                    }
                    if (ban)
                    {
                        ctx.PL_SECCIONES.Remove(item);
                    }
                }
            }
            private void NuevasSecciones()
            {
                decimal ultId = 0;
                PL_SECCIONES oldSecciones = ctx.PL_SECCIONES.OrderByDescending(t => t.ID).FirstOrDefault();
                if (oldSecciones != null) ultId = oldSecciones.ID;

                foreach (vPL_SECCIONES item in oDto.lSecciones.Where(t=> t.ES_NUEVO).ToList())
                {
                    PL_SECCIONES Seccion = new PL_SECCIONES();
                    ultId++;

                    item.ID = ultId;
                    item.ID_PLA = oDto.ID;
                    Mapper.Map(item, Seccion);
                    ctx.PL_SECCIONES.Add(Seccion);
                }
            }
            private void ModificarSecciones()
            {
                foreach (vPL_SECCIONES item in oDto.lSecciones.Where(t => !t.ES_NUEVO).ToList())
                {
                    PL_SECCIONES Seccion = ctx.PL_SECCIONES.Where(t => t.ID == item.ID).FirstOrDefault();
                    Mapper.Map(item, Seccion);
                }
            }
            #endregion
        }
    }
}
