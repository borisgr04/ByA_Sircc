using AutoMapper;
using ByA;
using Entidades;
using Entidades.VistasProcDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Procesos.Gestion
{
   public class mPActividades :absBLL
    {
        public mPActividades()
        {
            Mapper.CreateMap<PACTIVIDADES, vPActividades_DTO>();
            Mapper.CreateMap<vPActividades_DTO, PACTIVIDADES>(); 
        }
        public ByARpt Insert(vPActividades_DTO Reg)
        {
           
            PACTIVIDADES r = new PACTIVIDADES();
            Mapper.Map(Reg, r);
            cmdInsert o = new cmdInsert { reg = r };
            return o.Enviar();
        }
        public ByARpt Update(vPActividades_DTO Reg)
        {
            PACTIVIDADES r = new PACTIVIDADES();
            Mapper.Map(Reg, r);
            cmdUpdate o = new cmdUpdate { reg = r };
            return o.Enviar();
        }
        public List<vPActividades_DTO> _GetFilterActividades(string VIG,string TPRO)
        {
            List<vPActividades_DTO> List = new List<vPActividades_DTO>();
            using (ctx = new Entities())
            {
                if ((VIG == "") || (TPRO == ""))
                {
                    var query = ctx.PACTIVIDADES.ToList();
                    Mapper.Map(query, List);
                }
                else
                {
                    var query = ctx.PACTIVIDADES.Where(t => t.VIGENCIA == VIG && t.COD_TPRO == TPRO).ToList();
                    Mapper.Map(query, List);
                }
            }
            return List;

        }

    class cmdUpdate : absTemplate
    {
        public PACTIVIDADES reg { get; set; }
        public PACTIVIDADES found { get; set; }
        protected internal override bool esValido()
        {
            
            found = ctx.PACTIVIDADES.Where(t => t.COD_ACT == reg.COD_ACT && t.VIGENCIA == reg.VIGENCIA && t.COD_TPRO == reg.COD_TPRO).FirstOrDefault();
            if (found.COD_ACT != "")
            {
                return true;
            }
            else
            {
                byaRpt.Mensaje = "No se encontro La Actividad";
                byaRpt.Error = true;
                return !byaRpt.Error;
            }
        }
        protected internal override void Antes()
        {
           
            found.NOM_ACT=reg.NOM_ACT;
            found.ORDEN = reg.ORDEN;
            found.OCUPADO = reg.OCUPADO;
            found.EST_PROC = reg.EST_PROC;
            found.ESTADO = reg.ESTADO;
            found.OBLIGATORIO = reg.OBLIGATORIO;           
            found.DIA_NOHABIL = reg.DIA_NOHABIL;
            found.NOTIFICAR = reg.NOTIFICAR;
            found.MFECINI = reg.MFECINI; 
            found.MHORINI = reg.MHORINI;           
            found.MFECFIN = reg.MFECFIN; 
            found.MHORFIN = reg.MHORFIN;
            found.UBICACION = reg.UBICACION;
            ctx.Entry(found).State = System.Data.EntityState.Modified;
        }
    }
    class cmdInsert : absTemplate
    {
        public PACTIVIDADES reg { get; set; }
        protected internal override bool esValido()
        {
            return true;
        }
        protected internal override void Antes()
        {
            //Mapear Objeto DTO a Ado Entity FrameWork
            ctx.PACTIVIDADES.Add(reg);
        }


    }
    }



}
