using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using Entidades.VistasPROC;

namespace BLL.PROCESOS
{
    public class PMinutas
    {
        Entities ctx { get; set; }
        ByARpt byaRpt = new ByARpt();

        public ByARpt GuardarM(List<vPCLAUSULAS> lst)
        {
            cmdInsert o = new cmdInsert();
            o.lst = lst;
            return o.Enviar();
        }
        public List<vPCLAUSULAS> GetPClausulas(string TIP_PLA)
        {
            List<vPCLAUSULAS> lst = new List<vPCLAUSULAS>();
            ctx = new Entities();
            //List<PCLAUSULAS> lstO = ctx.PCLAUSULAS.Where(t => t.ID_PLA== ID_PLA ).OrderBy(t=>t.ORDEN).ToList();
            List<PCLAUSULAS> lstO = ctx.PCLAUSULAS.Where(t => t.TIP_PLA == TIP_PLA).ToList();

            Mapper.CreateMap<PCLAUSULAS, vPCLAUSULAS>()
            .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false));
            Mapper.Map(lstO, lst);
            lst = lst.OrderBy(t => t.ORDEN).ThenBy(t => t.CLA_NUM).ToList();
            return lst;
        }

        public List<vPCLAUSULASPRINT> GetPClausulasP(decimal ID_PLA)
        {
            List<vPCLAUSULASPRINT> lst = new List<vPCLAUSULASPRINT>();

            ctx = new Entities();

            List<PCLAUSULAS> lstO = ctx.PCLAUSULAS.Where(t => t.ID_PLA == ID_PLA).ToList();


            Mapper.CreateMap<PCLAUSULAS, vPCLAUSULASPRINT>()
            .ForMember(dest => dest.ES_MODIF, opt => opt.MapFrom(src => false));
            Mapper.Map(lstO, lst);

            return lst;
        }

        public List<vPR_DB_CLAUSULAS> GetClausulas(decimal ID_PLA)
        {
            List<vPR_DB_CLAUSULAS> lst = new List<vPR_DB_CLAUSULAS>();

            ctx = new Entities();

            List<PR_DB_CLAUSULAS> lstO = ctx.PR_DB_CLAUSULAS.Where(t => t.ID_PLA == ID_PLA).ToList();

            Mapper.CreateMap<PR_DB_CLAUSULAS, vPR_DB_CLAUSULAS>()
            .ForMember(dest => dest.IS_MODIF, opt => opt.MapFrom(src => false));
            Mapper.Map(lstO, lst);

            return lst;
        }

        class cmdInsert : absTemplate
        {
            public List<vPCLAUSULAS> lst = null;
            
            protected override bool esValido()
            {
                return true;
            }

            protected override void Antes()
            {
                mDocumento();
            }

            private void mDocumento()
            {
                PCLAUSULAS ent;
                decimal ultId = 0;
                try
                {
                    ultId = ctx.PCLAUSULAS.Max(t => t.ID);
                }
                catch { }
                foreach (vPCLAUSULAS dto in lst)
                {
                    ent = ctx.PCLAUSULAS.Where(t => t.ID == dto.ID).FirstOrDefault();//buscar 
                    if (ent != null)//Si existe se actualiza
                    {
                        ent.CLA_TEXTO = dto.CLA_TEXTO;
                        ent.CLA_CRUZADA = dto.CLA_CRUZADA;
                        ctx.Entry(ent).State = EntityState.Modified;
                    }
                    else
                    { //sino existe se crea
                        ultId = ultId + 1;
                        ent = new PCLAUSULAS();
                        ent.ID = ultId;
                        ent.CLA_CAM = dto.CLA_CAM;
                        ent.ORDEN = dto.ORDEN;
                        ent.TIP_PAR = dto.TIP_PAR;
                        ent.CLA_NUM = dto.CLA_NUM;
                        ent.CLA_PAR = dto.CLA_PAR;
                        ent.CLA_TEXTO = dto.CLA_TEXTO;
                        ent.CLA_TIT = dto.CLA_TIT;
                        ent.TIP_PLA = dto.TIP_PLA;
                        ent.IS_ENTER_FINAL = dto.IS_ENTER_FINAL;
                        ent.IDE_PMIN = dto.IDE_PMIN;
                        ent.ID_PLA = dto.ID_PLA;
                        ent.CLA_CRUZADA = dto.CLA_CRUZADA;
                        ctx.PCLAUSULAS.Add(ent);
                    }

                }
            }

        }
    }
}

