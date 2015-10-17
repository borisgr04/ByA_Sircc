using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Consultas
{
    public class vConsultaContratosParametrizadaDto
    {
        public bool chkVigencia { get; set; }                   
        public bool chkAnulados { get; set; }                   
        public string Vigencia { get; set; }                    

        public bool chkNumeroContrato { get; set; }             
        public string NumeroContrato { get; set; }              

        public bool chkTipoContrato { get; set; }               
        public string TipoContrato { get; set; }                

        public bool chkSubTipoContrato { get; set; }            
        public string SubTipoContrato { get; set; }             

        public bool chkUltimaActa { get; set; }                  
        public string UltimaActa { get; set; }                   

        public bool chkEstado { get; set; }                      
        public string Estado { get; set; }                      

        public bool chkSectorDestino { get; set; }               
        public string SectorDestino { get; set; }                

        public bool chkProyecto { get; set; }                   
        public string Proyecto { get; set; }                    

        public bool chkDependenciaNecesidad { get; set; }       
        public string DependenciaNecesidad { get; set; }         

        public bool chkDependenciaAcargo { get; set; }           
        public string DependenciaAcargo { get; set; }            

        public bool chkFechaSuscripcion { get; set; }           
        public DateTime FechaISuscripcion { get; set; }         
        public DateTime FechaFSuscripcion { get; set; }         

        public bool chkFechaRegistro { get; set; }              
        public DateTime FechaIRegistro { get; set; }            
        public DateTime FechaFRegistro { get; set; }            

        public bool chkContratista { get; set; }                 
        public string IdContratista { get; set; }                

        public bool chkInterventor { get; set; }                 
        public string IdInterventor { get; set; }                

        public bool chkTipoProceso { get; set; }                
        public string TipoProceso { get; set; }                 

        public bool chkPlaneacionPrecontractual { get; set; }
        public string PlaneacionPrecontractual { get; set; }

        public bool chkRecurso { get; set; }
        public string Recurso { get; set; }

        public bool chkDisponibilidadPresupuestal { get; set; } 
        public string DisponibilidadPresupuestal { get; set; } 
        public string VigenciaDisponibilidadPresupuestal { get; set; } 

        public bool chkRegistroPresupuestal { get; set; }   
        public string RegistroPresupuestal { get; set; }    
        public string VigenciaRegistroPresupuestal { get; set; } 

        public bool chkValorContratoConvenio { get; set; }  
        public string ValorDesdePrecontractual { get; set; }
        public string ValorHastaPrecontractual { get; set; }

        public bool chkRubroPresupuestal { get; set; }
        public string RubroPresupuestal { get; set; }

        public bool chkObjeto { get; set; } 
        public string Objeto { get; set; }  
    }
}
