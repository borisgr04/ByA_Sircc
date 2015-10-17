using BLL.CGestion;
using BLL.CGestion.Filtros;
using BLL.Contratos;
using ByA;
using Entidades.Contratos;
using Sircc4.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace wfSircc.Servicios.Contratos
{
    /// <summary>
    /// Descripción breve de wsLegalizacion
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsLegalizacion : System.Web.Services.WebService
    {
        LegalizacionBLL manager;



        [WebMethod(EnableSession = true)]
        public ByARpt InsertRp(vRP_CONTRATOS Reg)
        {
            manager = new LegalizacionBLL();
            return manager.InsertRp(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt DeleteRp(vRP_CONTRATOS Reg)
        {
            manager = new LegalizacionBLL();
            return manager.DeleteRp(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt InsertPlz(vPolizas_Contrato Reg)
        {
            manager = new LegalizacionBLL();
            return manager.InsertPoliCon(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt DeletePlz(vPolizas_Contrato Reg)
        {
            manager = new LegalizacionBLL();
            return manager.DeletePoliCon(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt InsertImp(vImp_Contratos Reg)
        {
            Reg.USER_REG = Usuario.UserName;
            manager = new LegalizacionBLL();
            return manager.InsertImp_Contratos(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt DeleteImp(vImp_Contratos Reg)
        {
            manager = new LegalizacionBLL();
            return manager.DeleteImp_Contratos(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt UpdateExo(vCONTRATOS Reg)
        {
            manager = new LegalizacionBLL();
            return manager.UpdateExo(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt InsertInter(vInterventores_Contrato Reg)
        {
            Reg.USUARIO = Usuario.UserName;
            manager = new LegalizacionBLL();
            return manager.InsertInterventoria(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt DeleteInter(vInterventores_Contrato Reg)
        {
            manager = new LegalizacionBLL();
            return manager.DeleteInterventoria(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt UpdateInter(vInterventores_Contrato Reg)
        {
            manager = new LegalizacionBLL();
            return manager.UpdateInterventoria(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt UpdateConf_C(vCONTRATOS Reg)
        {
            manager = new LegalizacionBLL();
            return manager.UpdateConf_C(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt UpdateConf_A(vAdiciones Reg)
        {
            manager = new LegalizacionBLL();
            return manager.UpdateConf_A(Reg);
        }

        [WebMethod(EnableSession = true)]
        public ByARpt UpdateRp(vRP_CONTRATOS Reg)
        {
            manager = new LegalizacionBLL();
            return manager.UpdateRp(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetRP_Contratos(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            List<vRP_CONTRATOS> lrp = manager.GetRPContratos(Cod_Con);
            foreach (vRP_CONTRATOS item in lrp)
            {
                item.RUBROS_CONTRATOS = null;
            }
            return ByAUtil.convertListToXML(lrp);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vRP_CONTRATOS> GetRP_ContratosJson(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            List<vRP_CONTRATOS> lrp = manager.GetRPContratos(Cod_Con);
            return lrp;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vAdiciones> GetCon_Adiciones(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            List<vAdiciones> list = new List<vAdiciones>();
            vAdiciones p = new vAdiciones();
            p.NRO_ADI = Cod_Con;
            list.Add(p);
            foreach (var item in manager.GetAdiciones(Cod_Con))
            {
                list.Add(item);
            }
            return list;


        }

      

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vContratosInt GetDetContratos(string Cod_Con)
        {
            CGSupervisorBLL o = new CGSupervisorBLL();
            return o.GetDetContrato(Cod_Con);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetPlzContratos(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            return ByAUtil.convertListToXML(manager.GetPolizas_Contrato(Cod_Con));
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vPolizas_Contrato> GetPlzContratosJson(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            return manager.GetPolizas_Contrato(Cod_Con);
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vAseguradoras> GetAseguradoras()
        {
            manager = new LegalizacionBLL();
            return manager.GetAseguradoras();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vImpuestos> GetImpuestos()
        {
            manager = new LegalizacionBLL();
            return manager.GetImpuesto();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetImp_Contratos(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            return ByAUtil.convertListToXML(manager.GetImp_Contratos(Cod_Con));
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vImp_Contratos> GetImp_ContratosJson(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            return manager.GetImp_Contratos(Cod_Con);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetInterventoria(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            return ByAUtil.convertListToXML(manager.GetInterventoria_Contrato(Cod_Con));
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vInterventores_Contrato> GetInterventoriaJson(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            return manager.GetInterventoria_Contrato(Cod_Con);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetConFAdiciones(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            return ByAUtil.convertListToXML(manager.GetAdiciones(Cod_Con));



        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetConFContratos(string Cod_Con)
        {
            manager = new LegalizacionBLL();
            return ByAUtil.convertListToXML(manager.GetContrato(Cod_Con));
        }

    }
}
