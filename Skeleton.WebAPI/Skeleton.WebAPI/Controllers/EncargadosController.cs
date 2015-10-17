using BLL;
using BLL.PROCESOS;
using BLL.PROCESOS.ConsultaT.Actividades;
using Entidades;
using Entidades.VistasPROC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Security;
using ByA;
using System.Web.Http.Description;
using System.Threading.Tasks;

namespace Skeleton.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    //[Authorize]
    [RoutePrefix("api/v1/Encargados")]
    public class EncargadosController:ApiController
    {
        // GET ?Usuario=50950218&Vigencia=2013&fechaFinal=12/12/2014&TipoT=TD
        [Route("{Usuario}/Actividades/{Vigencia}/{Estado}")]
        public IEnumerable<vPCRONOGRAMASPC> GetFiltro(string Usuario, string Estado, short Vigencia)
        {
            Est_Avi_Actividad bll = new Est_Avi_Actividad();
            List<vPCRONOGRAMASPC> lst = bll.getListaEstAviAct2(Vigencia, Usuario);
            /*
            lst.Where(t => t.EST_AVI_ACT == "ACVEN");
            lst.Where(t => t.EST_AVI_ACT == "ACHOY");
            lst.Where(t => t.EST_AVI_ACT == "ACPVEN");
            */
            return lst.Where(t => t.EST_AVI_ACT == Estado).ToList();
        }

        [Route("Login")]
        public bool GetLogin(string username, string password)
        {
            bool permiso = Membership.ValidateUser(username, password);
            return permiso;
        }

        [Route("Vigencias")]
        public IList<vVIGENCIAS> GetvVigencias()
        {
            DatosBasicosBLL ep = new DatosBasicosBLL();
            return ep.GetvVIGENCIAS();
        }


        [Route("Actividades")]
        public ByARpt PostCronograma(PCronogramasDTO p )
        {
            List<vPCRONOGRAMAS> lst= new List<vPCRONOGRAMAS>();
            vPCRONOGRAMAS Actividad = new vPCRONOGRAMAS { ID = p.ID, NUM_PROC =p.NUM_PROC, OBS_SEG = p.OBS_SEG, EST_ACT="0003" };
            lst.Add(Actividad);
            ProcesosBLL epBLL = new ProcesosBLL();
            ByARpt rpt = epBLL.SegCronograma(lst, p.NUM_PROC, p.USUARIO);
            return rpt;
        }
        
        [Route("Actividades/Aplazar")]
        public ByARpt PostAplazarCrono(PCronogramasDTO p)
        {
            p.FECHAI = new DateTime(p.mFEFHAI.Year, p.mFEFHAI.Month, p.mFEFHAI.Day);
            p.FECHAF = new DateTime(p.mFEFHAF.Year, p.mFEFHAF.Month, p.mFEFHAF.Day);
            List<vPCRONOGRAMAS> lst = new List<vPCRONOGRAMAS>();
            vPCRONOGRAMAS Actividad = new vPCRONOGRAMAS
            {
                ID = p.ID,
                NUM_PROC = p.NUM_PROC,
                FECHAF = p.FECHAF,
                FECHAI = p.FECHAI,
                HORAI = p.HORAI,
                HORAF = p.HORAF
            };
            lst.Add(Actividad);
            ProcesosBLL epBLL = new ProcesosBLL();
            ByARpt rpt = epBLL.AplazarCronograma(lst, p.NUM_PROC, p.USUARIO);
            return rpt;
        }

        [Route("Consolidado/{Usuario}/{Vigencia}")]
        public ConsolidadoDto GetConsolidado(string Usuario, short Vigencia)
        {
            ConsolidadoDto con = new ConsolidadoDto();

            Est_Avi_Actividad bll = new Est_Avi_Actividad();
            List<vPCRONOGRAMASPC> lst = bll.getListaEstAviAct2(Vigencia, Usuario);
            List<itemConcolidado> lAct = new List<itemConcolidado>();
            List<itemConcolidado> lSol = new List<itemConcolidado>();
            con.lActividades = lAct;
            con.lSolicitudes = lSol;

            itemConcolidado item1 = new itemConcolidado();
            item1.Nombre = "Vencidas";
            item1.Cantidad = lst.Where(t => t.EST_AVI_ACT == "ACVEN").ToList().Count();
            item1.Color = "danger";
            con.lActividades.Add(item1);

            itemConcolidado item2 = new itemConcolidado();
            item2.Nombre = "Hoy";
            item2.Cantidad = lst.Where(t => t.EST_AVI_ACT == "ACHOY").ToList().Count();
            item2.Color = "info";
            con.lActividades.Add(item2);

            itemConcolidado item3 = new itemConcolidado();
            item3.Nombre = "Proximas";
            item3.Cantidad = lst.Where(t => t.EST_AVI_ACT == "ACPVEN").ToList().Count();
            item3.Color = "success";
            con.lActividades.Add(item3);

            PSolicitudesBLL epBLL = new PSolicitudesBLL();

            itemConcolidado item4 = new itemConcolidado();
            item4.Nombre = "Por Recibir";
            item4.Cantidad = epBLL.GetMisSolicitudes(Usuario, "SREC", Vigencia).Count();
            item4.Color = "warning";
            con.lSolicitudes.Add(item4);

            itemConcolidado item5 = new itemConcolidado();
            item5.Nombre = "Por Revisar";
            item5.Cantidad = epBLL.GetMisSolicitudes(Usuario, "SREV", Vigencia).Count();
            item5.Color = "success";
            con.lSolicitudes.Add(item5);

            itemConcolidado item6 = new itemConcolidado();
            item6.Nombre = "Aceptadas";
            item6.Cantidad = epBLL.GetMisSolicitudes(Usuario, "ACEP", Vigencia).Count();
            item6.Color = "info";
            con.lSolicitudes.Add(item6);

            itemConcolidado item7 = new itemConcolidado();
            item7.Nombre = "Rechazadas";
            item7.Cantidad = epBLL.GetMisSolicitudes(Usuario, "RECH", Vigencia).Count();
            item7.Color = "danger";
            con.lSolicitudes.Add(item7);

            return con;
        }
    }

    public class PCronogramasDTO  {
        public string USUARIO { get; set; }
        public string NUM_PROC{get;set;}
        public  decimal ID {get;set;}
        public string OBS_SEG { get; set; }
        public MiFecha mFEFHAI { get; set; }
        public MiFecha mFEFHAF { get; set; }
        public Nullable<System.DateTime> FECHAI { get; set; }
        public Nullable<decimal> HORAI { get; set; }
        public Nullable<System.DateTime> FECHAF { get; set; }
        public Nullable<decimal> HORAF { get; set; }
    }

    public class MiFecha
    {
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }

    public class ConsolidadoDto
    {
        public List<itemConcolidado> lActividades { get; set; }
        public List<itemConcolidado> lSolicitudes { get; set; }
    }

    public class itemConcolidado
    {
        public string Nombre { get; set; }
        public int Cantidad { get; set; }
        public string Color { get; set; }
    }
}