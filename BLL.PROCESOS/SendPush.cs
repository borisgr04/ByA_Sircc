using BLL.PROCESOS.ConsultaT.Actividades;
using ByA;
using Entidades;
using Entidades.VistasPROC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades.Notificaciones;

namespace BLL.PROCESOS
{
    public class SendPush
    {
        Entities ctx { get; set; }
        ByARpt byaRpt = new ByARpt();
        
        public List<notificacionDto> ListaNotificacionesActividades()
        {
            List<notificacionDto> lNot = new List<notificacionDto>();
            short Vigencia = 2011;
            List<TERCEROS> lstT;
            using (Entities db = new Entities()) {
                 lstT= db.HDEP_ABOGADOS.Where(t => t.ASIG_PROC == "SI" && t.ESTADO == "AC").Select(t => t.TERCEROS).ToList();
            }
            foreach(var persona in  lstT){
                Est_Avi_Actividad bll = new Est_Avi_Actividad();
                List<vPCRONOGRAMASPC> lst = bll.getListaEstAviAct2(Vigencia,persona.IDE_TER);
                if (lst != null)
                {
                    List<vPCRONOGRAMASPC> lVencidas = lst.Where(t => t.EST_AVI_ACT == "ACVEN").ToList();
                    List<vPCRONOGRAMASPC> lHoy = lst.Where(t => t.EST_AVI_ACT == "ACHOY").ToList();
                    string MensajeNotificacion = "Vencidas (" + lVencidas.Count() + "), Hoy (" + lHoy.Count() +")";
                    notificacionDto Not = new notificacionDto();
                    Not.usuario = persona.IDE_TER;
                    Not.mensaje = MensajeNotificacion;
                    lNot.Add(Not);
                }
            }
            return lNot;
        }

        public string Cadena()
        {
            return "Hola mundo";
        }

        public string GetVigencias()
        {
            DatosBasicosBLL ep = new DatosBasicosBLL();
            return ep.GetvVIGENCIAS().ToString();
        }
    }
}
