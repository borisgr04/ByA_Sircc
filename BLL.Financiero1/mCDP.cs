using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Financiero1.Entidades;

namespace BLL.Financiero1
{
    public class mCDP
    {
        vEP_CDP_DTO CDP1;
        vEP_CDP_DTO CDP2;
        vEP_CDP_DTO CDP3;
        List<vEP_CDP_DTO> lCDPs;
        public mCDP()
        {
            lCDPs = new List<vEP_CDP_DTO>();
            CDP1 = new vEP_CDP_DTO();
            CDP1 = _CDP1();

            CDP2 = new vEP_CDP_DTO();
            CDP2 = _CDP2();

            CDP3 = new vEP_CDP_DTO();
            CDP3 = _CDP3();
            lCDPs.Add(CDP1);
            lCDPs.Add(CDP2);
            lCDPs.Add(CDP3);
        }
        public vEP_CDP_DTO _CDP1()
        {

            vEP_RUBROS_CDP_DTO Rubro1 = new vEP_RUBROS_CDP_DTO();
            vEP_RUBROS_CDP_DTO Rubro2 = new vEP_RUBROS_CDP_DTO();

            vEP_CDP_DTO CDP = new vEP_CDP_DTO();
            CDP.ID = 1;
            CDP.ID_EP = 12;
            CDP.NRO_CDP = "12345";
            CDP.FEC_CDP = new DateTime(2013, 2, 12);
            CDP.VAL_CDP = 1200000;
            CDP.VIG_FUT = "SI";

            Rubro1.ID = 1;
            Rubro1.ID_EP = CDP.ID_EP;
            Rubro1.ID_EP_CDP = CDP.ID;
            Rubro1.NRO_CDP = CDP.NRO_CDP;
            Rubro1.VALOR = 12000;
            Rubro1.VIG_CDP = 2013;
            Rubro1.COD_RUB = "03 - 3 - 1 1 8 1 - 02";
            Rubro1.NOM_RUB = "Fomento, Desarrollo y Práctica del Deporte y la Recreación y el Aprovechamiento del Tiempo Libre ";
            Rubro1.CLASE = "2";
            Rubro1.COD_RECURSO = "2";
            Rubro1.COD_UNIDAD = "2";

            Rubro2.ID = 2;
            Rubro2.ID_EP = CDP.ID_EP;
            Rubro2.ID_EP_CDP = CDP.ID;
            Rubro2.NRO_CDP = CDP.NRO_CDP;
            Rubro2.VALOR = 12000;
            Rubro2.VIG_CDP = 2013;
            Rubro2.COD_RUB = "03 - 3 - 1 1 8 1 - 02";
            Rubro2.NOM_RUB = "Carlos";
            Rubro2.CLASE = "1";
            Rubro2.COD_RECURSO = "1";
            Rubro2.COD_UNIDAD = "1";

            CDP.EP_RUBROS_CDP = new List<vEP_RUBROS_CDP_DTO>();
            CDP.EP_RUBROS_CDP.Add(Rubro1);
            CDP.EP_RUBROS_CDP.Add(Rubro2);
            return CDP;
        }
        public vEP_CDP_DTO _CDP2()
        {

            vEP_RUBROS_CDP_DTO Rubro1 = new vEP_RUBROS_CDP_DTO();
            vEP_RUBROS_CDP_DTO Rubro2 = new vEP_RUBROS_CDP_DTO();

            vEP_CDP_DTO CDP = new vEP_CDP_DTO();
            CDP.ID = 2;
            CDP.ID_EP = 12;
            CDP.NRO_CDP = "54321";
            CDP.FEC_CDP = new DateTime(2013, 2, 12);
            CDP.VAL_CDP = 87865867;
            CDP.VIG_FUT = "SI";

            Rubro1.ID = 1;
            Rubro1.ID_EP = CDP.ID_EP;
            Rubro1.ID_EP_CDP = CDP.ID;
            Rubro1.NRO_CDP = CDP.NRO_CDP;
            Rubro1.VALOR = 12000;
            Rubro1.VIG_CDP = 2013;
            Rubro1.COD_RUB = "03 - 3 - 1 1 8 1 - 02";
            Rubro1.NOM_RUB = "Fomento, Desarrollo y Práctica del Deporte y la Recreación y el Aprovechamiento del Tiempo Libre ";
            Rubro1.CLASE = "2";
            Rubro1.COD_RECURSO = "2";
            Rubro1.COD_UNIDAD = "2";

            Rubro2.ID = 2;
            Rubro2.ID_EP = CDP.ID_EP;
            Rubro2.ID_EP_CDP = CDP.ID;
            Rubro2.NRO_CDP = CDP.NRO_CDP;
            Rubro2.VALOR = 12000;
            Rubro2.VIG_CDP = 2013;
            Rubro2.COD_RUB = "03 - 3 - 1 1 8 1 - 02";
            Rubro2.NOM_RUB = "Carlos";
            Rubro2.CLASE = "1";
            Rubro2.COD_RECURSO = "1";
            Rubro2.COD_UNIDAD = "1";

            CDP.EP_RUBROS_CDP = new List<vEP_RUBROS_CDP_DTO>();
            CDP.EP_RUBROS_CDP.Add(Rubro1);
            CDP.EP_RUBROS_CDP.Add(Rubro2);
            return CDP;
        }
        public vEP_CDP_DTO _CDP3()
        {

            vEP_RUBROS_CDP_DTO Rubro1 = new vEP_RUBROS_CDP_DTO();
            vEP_RUBROS_CDP_DTO Rubro2 = new vEP_RUBROS_CDP_DTO();

            vEP_CDP_DTO CDP = new vEP_CDP_DTO();
            CDP.ID = 3;
            CDP.ID_EP = 12;
            CDP.NRO_CDP = "98765";
            CDP.FEC_CDP = new DateTime(2013, 2, 12);
            CDP.VAL_CDP = 87865867;
            CDP.VIG_FUT = "SI";

            Rubro1.ID = 1;
            Rubro1.ID_EP = CDP.ID_EP;
            Rubro1.ID_EP_CDP = CDP.ID;
            Rubro1.NRO_CDP = CDP.NRO_CDP;
            Rubro1.VALOR = 12000;
            Rubro1.VIG_CDP = 2013;
            Rubro1.COD_RUB = "03 - 3 - 1 1 8 1 - 02";
            Rubro1.NOM_RUB = "Fomento, Desarrollo y Práctica del Deporte y la Recreación y el Aprovechamiento del Tiempo Libre ";
            Rubro1.CLASE = "2";
            Rubro1.COD_RECURSO = "2";
            Rubro1.COD_UNIDAD = "2";

            Rubro2.ID = 2;
            Rubro2.ID_EP = CDP.ID_EP;
            Rubro2.ID_EP_CDP = CDP.ID;
            Rubro2.NRO_CDP = CDP.NRO_CDP;
            Rubro2.VALOR = 12000;
            Rubro2.VIG_CDP = 2013;
            Rubro2.COD_RUB = "03 - 3 - 1 1 8 1 - 02";
            Rubro2.NOM_RUB = "Carlos";
            Rubro2.CLASE = "1";
            Rubro2.COD_RECURSO = "1";
            Rubro2.COD_UNIDAD = "1";

            CDP.EP_RUBROS_CDP = new List<vEP_RUBROS_CDP_DTO>();
            CDP.EP_RUBROS_CDP.Add(Rubro1);
            CDP.EP_RUBROS_CDP.Add(Rubro2);
            return CDP;
        }
        public vEP_CDP_DTO Get(string NRO_CDP)
        {
            return lCDPs.Where(t => t.NRO_CDP == NRO_CDP).FirstOrDefault();
        }
    }
}
