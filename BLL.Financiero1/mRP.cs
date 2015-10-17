using BLL.Financiero1.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Financiero1
{
    public class mRP
    {
        vRP_CONTRATOS RP1;
        vRP_CONTRATOS RP2;
        vRP_CONTRATOS RP3;
        List<vRP_CONTRATOS> lRPs;
        public mRP()
        {
            lRPs = new List<vRP_CONTRATOS>();
            RP1 = new vRP_CONTRATOS();
            RP1 = _RP1();

            RP2 = new vRP_CONTRATOS();
            RP2 = _RP2();

            RP3 = new vRP_CONTRATOS();
            RP3 = _RP3();
            lRPs.Add(RP1);
            lRPs.Add(RP2);
            lRPs.Add(RP3);
        }
        public vRP_CONTRATOS _RP1()
        {

            vRUBROS_CONTRATOS Rubro1 = new vRUBROS_CONTRATOS();
            vRUBROS_CONTRATOS Rubro2 = new vRUBROS_CONTRATOS();

            vRP_CONTRATOS RP = new vRP_CONTRATOS();
            
            RP.NRO_RP = "123456";
            RP.COD_CON = "123456";
            RP.FEC_RP = DateTime.Now;
            RP.VIGENCIA = short.Parse("2013");
            RP.DOC_SOP = "123456";
            RP.VAL_RP = 123456;
            RP.VAL_PAGO = 123456;
            RP.USAP = "";
            RP.FEC_REG = DateTime.Now;
            RP.USBD = "";
            RP.NRO_CDP = "123456";

            Rubro1.COD_RUB = "03 - 3 - 1 1 8 1 - 02";
            Rubro1.COD_CON = "123456";
            Rubro1.NOM_RUB = "Fomento, Desarrollo y Práctica del Deporte y la Recreación y el Aprovechamiento del Tiempo Libre ";
            Rubro1.VAL_COMPROMISO = 123456;
            Rubro1.NRO_RP = "123456";
            Rubro1.FEC_REG = DateTime.Now;
            Rubro1.USBD = "";
            Rubro1.VIGENCIA = short.Parse("2013");
            Rubro1.ID = 1;

            Rubro2.COD_RUB = "04 - 3 - 1 1 1 2 1 3 2 3 - 25";
            Rubro2.COD_CON = "123456";
            Rubro2.NOM_RUB = "Fomento, Desarrollo y Práctica del Deporte y la Recreación y el Aprovechamiento del Tiempo Libre ";
            Rubro2.VAL_COMPROMISO = 123456;
            Rubro2.NRO_RP = "123456";
            Rubro2.FEC_REG = DateTime.Now;
            Rubro2.USBD = "";
            Rubro2.VIGENCIA = short.Parse("2013");
            Rubro2.ID = 2;

            RP.RUBROS_CONTRATOS = new List<vRUBROS_CONTRATOS>();
            RP.RUBROS_CONTRATOS.Add(Rubro1);
            RP.RUBROS_CONTRATOS.Add(Rubro2);
            return RP;
        }
        public vRP_CONTRATOS _RP2()
        {

            vRUBROS_CONTRATOS Rubro1 = new vRUBROS_CONTRATOS();
            vRUBROS_CONTRATOS Rubro2 = new vRUBROS_CONTRATOS();

            vRP_CONTRATOS RP = new vRP_CONTRATOS();

            RP.NRO_RP = "123456";
            RP.COD_CON = "123456";
            RP.FEC_RP = DateTime.Now;
            RP.VIGENCIA = short.Parse("2013");
            RP.DOC_SOP = "123456";
            RP.VAL_RP = 123456;
            RP.VAL_PAGO = 123456;
            RP.USAP = "";
            RP.FEC_REG = DateTime.Now;
            RP.USBD = "";
            RP.NRO_CDP = "123456";

            Rubro1.COD_RUB = "03 - 3 - 1 1 8 1 - 02";
            Rubro1.COD_CON = "123456";
            Rubro1.NOM_RUB = "Fomento, Desarrollo y Práctica del Deporte y la Recreación y el Aprovechamiento del Tiempo Libre ";
            Rubro1.VAL_COMPROMISO = 123456;
            Rubro1.NRO_RP = "123456";
            Rubro1.FEC_REG = DateTime.Now;
            Rubro1.USBD = "";
            Rubro1.VIGENCIA = short.Parse("2013");
            Rubro1.ID = 1;

            Rubro2.COD_RUB = "04 - 3 - 1 1 1 2 1 3 2 3 - 25";
            Rubro2.COD_CON = "123456";
            Rubro2.NOM_RUB = "Fomento, Desarrollo y Práctica del Deporte y la Recreación y el Aprovechamiento del Tiempo Libre ";
            Rubro2.VAL_COMPROMISO = 123456;
            Rubro2.NRO_RP = "123456";
            Rubro2.FEC_REG = DateTime.Now;
            Rubro2.USBD = "";
            Rubro2.VIGENCIA = short.Parse("2013");
            Rubro2.ID = 2;

            RP.RUBROS_CONTRATOS = new List<vRUBROS_CONTRATOS>();
            RP.RUBROS_CONTRATOS.Add(Rubro1);
            RP.RUBROS_CONTRATOS.Add(Rubro2);
            return RP;
        }
        public vRP_CONTRATOS _RP3()
        {

            vRUBROS_CONTRATOS Rubro1 = new vRUBROS_CONTRATOS();
            vRUBROS_CONTRATOS Rubro2 = new vRUBROS_CONTRATOS();

            vRP_CONTRATOS RP = new vRP_CONTRATOS();

            RP.NRO_RP = "123456";
            RP.COD_CON = "123456";
            RP.FEC_RP = DateTime.Now;
            RP.VIGENCIA = short.Parse("2013");
            RP.DOC_SOP = "123456";
            RP.VAL_RP = 123456;
            RP.VAL_PAGO = 123456;
            RP.USAP = "";
            RP.FEC_REG = DateTime.Now;
            RP.USBD = "";
            RP.NRO_CDP = "123456";

            Rubro1.COD_RUB = "03 - 3 - 1 1 8 1 - 02";
            Rubro1.COD_CON = "123456";
            Rubro1.NOM_RUB = "Fomento, Desarrollo y Práctica del Deporte y la Recreación y el Aprovechamiento del Tiempo Libre ";
            Rubro1.VAL_COMPROMISO = 123456;
            Rubro1.NRO_RP = "123456";
            Rubro1.FEC_REG = DateTime.Now;
            Rubro1.USBD = "";
            Rubro1.VIGENCIA = short.Parse("2013");
            Rubro1.ID = 1;

            Rubro2.COD_RUB = "04 - 3 - 1 1 1 2 1 3 2 3 - 25";
            Rubro2.COD_CON = "123456";
            Rubro2.NOM_RUB = "Fomento, Desarrollo y Práctica del Deporte y la Recreación y el Aprovechamiento del Tiempo Libre ";
            Rubro2.VAL_COMPROMISO = 123456;
            Rubro2.NRO_RP = "123456";
            Rubro2.FEC_REG = DateTime.Now;
            Rubro2.USBD = "";
            Rubro2.VIGENCIA = short.Parse("2013");
            Rubro2.ID = 2;

            RP.RUBROS_CONTRATOS = new List<vRUBROS_CONTRATOS>();
            RP.RUBROS_CONTRATOS.Add(Rubro1);
            RP.RUBROS_CONTRATOS.Add(Rubro2);
            return RP;
        }
        public vRP_CONTRATOS Get(string NRO_RP, string VIGENCIA)
        {
            return lRPs.Where(t => t.NRO_RP == NRO_RP && t.VIGENCIA == short.Parse(VIGENCIA)).FirstOrDefault();
        }
    }
}
