using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades.Vistas;
using Entidades;
using AutoMapper;
using ByA;
using Entidades.VistasPROC;

namespace BLL.PROCESOS
{
    public class ProponentesBLL
    {
        Entities ctx;
        public ProponentesBLL()
        {
            Mapper.CreateMap<PPROPONENTESS, vPPROPONENTESS>()
                .ForMember(dest => dest.NOMBRE, opt => opt.MapFrom(src => src.TERCEROS.NOM1_TER + " " + src.TERCEROS.NOM2_TER + " " + src.TERCEROS.APE1_TER + " " + src.TERCEROS.APE2_TER));
            Mapper.CreateMap<vPPROPONENTESS, PPROPONENTESS>();
            Mapper.CreateMap<CONSORCIOSUTXC, vCONSORCIOSUTXC>()
                .ForMember(dest => dest.NOMBRE, opt => opt.MapFrom(src => src.TERCEROS.NOM1_TER + " " + src.TERCEROS.NOM2_TER + " " + src.TERCEROS.APE1_TER + " " + src.TERCEROS.APE2_TER));
            Mapper.CreateMap<vCONSORCIOSUTXC, CONSORCIOSUTXC>();
        }
        public List<vPPROPONENTESS> Gets(string NumeroProceso)
        {
            using (ctx = new Entities())
            {
                List<vPPROPONENTESS> lrProponentes = new List<vPPROPONENTESS>();
                List<PPROPONENTESS> lProponentes = ctx.PPROPONENTESS.Where(t => t.NUM_PROC == NumeroProceso).ToList();
                Mapper.Map(lProponentes, lrProponentes);
                foreach (vPPROPONENTESS item in lrProponentes)
                {
                    if (item.IDE_PROP == null) item.NOMBRE = item.RAZ_SOC;
                }
                return lrProponentes;
            }
        }
        public vPPROPONENTESS Get(decimal id)
        {
            using (ctx = new Entities())
            {
                vPPROPONENTESS rProponente = new vPPROPONENTESS();
                PPROPONENTESS proponente = ctx.PPROPONENTESS.Where(t => t.ID == id).FirstOrDefault();
                Mapper.Map(proponente, rProponente);
                return rProponente;
            }
        }
        public bool GetSiAdjudicado(string numProc)
        {
            using (ctx = new Entities())
            {
                PPROPONENTESS pro = ctx.PPROPONENTESS.Where(t => t.NUM_PROC == numProc && t.ADJUDICADO == "S").FirstOrDefault();
                if (pro == null) return false;
                return true;
            }
        }
        public ByARpt AsignarNit(vPPROPONENTESS Proponente)
        {
            using (ctx = new Entities())
            {
                try{
                    PPROPONENTESS prop = ctx.PPROPONENTESS.Where(t => t.ID == Proponente.ID).FirstOrDefault();
                    vTerceros Tercero = new vTerceros();

                    Tercero.TIP_IDE = prop.TIP_IDE_PROP;
                    Tercero.IDE_TER = Proponente.IDE_PROP;
                    Tercero.DV_TER = Proponente.DV_PROP;
                    Tercero.EXP_IDE = prop.EXP_IDE_PROP;
                    Tercero.APE1_TER = prop.APE1_PROP;
                    Tercero.APE2_TER = prop.APE2_PROP;
                    Tercero.NOM1_TER = prop.NOM1_PROP;
                    Tercero.NOM2_TER = prop.NOM2_PROP;
                    Tercero.RAZ_SOC = prop.RAZ_SOC;
                    Tercero.DIR_TER = prop.DIR_PROP;
                    Tercero.TEL_TER = prop.TEL_PROP;
                    Tercero.EMA_TER = prop.EMA_PROP;
                    Tercero.FEC_NAC = prop.FEC_NAC;
                    Tercero.FEC_REG = DateTime.Now;
                    Tercero.ESTADO = "AC";
                    Tercero.TIP_PER = prop.TIP_PER_PROP;
                    mTerceros oTerceros = new mTerceros();
                    ByARpt res = oTerceros.Insert(Tercero);
                    if (res.Error == false)
                    {
                        prop.IDE_PROP = Proponente.IDE_PROP;
                        prop.DV_PROP = Proponente.DV_PROP;
                        prop.EXP_IDE_PROP = Proponente.EXP_IDE_PROP;
                    }
                    ctx.SaveChanges();
                    AsignarNitMiembros(Tercero.IDE_TER, Proponente.ID);
                    return res;
                }catch(Exception e){
                    ByARpt res = new ByARpt();
                    res.Error = true;
                    res.Mensaje = e.Message;
                    return res;
                }
            }
        }
        public void AsignarNitMiembros(string idTer, decimal idProp)
        {
            using (ctx = new Entities())
            {
                List<CONSORCIOSUTXC> lCon = ctx.CONSORCIOSUTXC.Where(t => t.ID_PROP == idProp).ToList();
                foreach (CONSORCIOSUTXC item in lCon)
                {
                    item.IDE_TER = idTer;
                }
                ctx.SaveChanges();
            }
        }
        public ByARpt AdjudicarOrNot(vPPROPONENTESS oDto)
        {
            using (ctx = new Entities())
            {
                try{
                    ByARpt Res = new ByARpt();
                    Entities ctx2 = new Entities();
                    PPROPONENTESS propaux;
                    if (oDto.ADJUDICADO == "S") propaux = ctx2.PPROPONENTESS.Where(t => t.NUM_PROC == oDto.NUM_PROC && t.ADJUDICADO == "S").FirstOrDefault();
                    else propaux = null;
                    if (propaux == null)
                    {
                        PPROPONENTESS prop = ctx.PPROPONENTESS.Where(t => t.ID == oDto.ID).FirstOrDefault();
                        prop.ADJUDICADO = oDto.ADJUDICADO;
                        prop.FEC_ADJUDICACION = oDto.FEC_ADJUDICACION;
                        prop.OBS_ADJUDICACION = oDto.OBS_ADJUDICACION;
                        ctx.SaveChanges();
                        Res.Error = false;
                        if(oDto.ADJUDICADO == "S") Res.Mensaje = "El proceso fue adjudicado al proponente " + prop.NOM1_PROP + " " + prop.NOM2_PROP + " " + prop.APE1_PROP + " " + prop.APE2_PROP;
                        else Res.Mensaje = "Operación realizada satisfactoriamente";
                    }
                    else
                    {
                        Res.Error = true;
                        Res.Mensaje = "Ya se encuentra adjudicado este proceso...";
                    }
                    return Res;
                }catch(Exception e){
                    ByARpt Res = new ByARpt();
                    Res.Error = true;
                    Res.Mensaje = e.Message;
                    return Res;
                }
            }
        }
        public bool GetSiNitAsignado(decimal ID)
        {
            using (ctx = new Entities())
            {
                //PPROPONENTESS Prop = ctx.PPROPONENTESS.Where(t => t.ID == ID).FirstOrDefault();
                PPROPONENTESS Prop = ctx.PPROPONENTESS.Where(t => t.ID == ID && t.TIPO_PROP != "PU" && t.IDE_PROP != null).FirstOrDefault();
                if (Prop == null) return false;
                else return true;
            }
        }
        public ByARpt DeleteProponente(decimal ID)
        {
            using (ctx = new Entities())
            {
                try
                {
                    ByARpt res = new ByARpt();
                    PPROPONENTESS proponente = ctx.PPROPONENTESS.Where(t => t.ID == ID).FirstOrDefault();
                    if (proponente != null)
                    {
                        ctx.PPROPONENTESS.Remove(proponente);
                        ctx.SaveChanges();
                        res.Error = false;
                        res.Mensaje = "Operación Realizada Satisfactoriamente";
                    }
                    else
                    {
                        res.Error = true;
                        res.Mensaje = "No existe proponentes con esta identificación";
                    }
                    return res;
                }
                catch (Exception e)
                {
                    ByARpt res = new ByARpt();
                    res.Error = true;
                    res.Mensaje = e.Message;
                    return res;
                }
            }
        }
        public ByARpt Insert(vPPROPONENTESS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }        
        public ByARpt Update(vPPROPONENTESS Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }        
        class cmdInsert : absTemplate
        {
            private PPROPONENTESS ep = null;
            public vPPROPONENTESS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                if (oDto.TIPO_PROP == "PU")
                {
                    PPROPONENTESS pro = ctx.PPROPONENTESS.Where(t => t.IDE_PROP == oDto.IDE_PROP).FirstOrDefault();
                    if (pro == null) return true;
                    else
                    {
                        byaRpt.Mensaje = "Ya se encuentra registrado un proponente con esta identificacion...";
                        return false;
                    }
                }else return true;
            }

            protected override void Antes()
            {
                string IdeProNew;
                decimal id;
                if (oDto.TIPO_PROP == "PU") IdeProNew = oDto.IDE_PROP;
                else
                {
                    Entities ctx2 = new Entities();
                    PPROPONENTESS oldPro = ctx.PPROPONENTESS.Where(t => t.TIPO_PROP != "PU").OrderByDescending(t => t.FEC_REG).FirstOrDefault();
                    if (oldPro == null) IdeProNew = oDto.TIPO_PROP + "0001";
                    else
                    {
                        string oldId = oldPro.COD_AUX.Substring(2, 4);
                        decimal idOldNum = int.Parse(oldId);
                        idOldNum = idOldNum + 1;
                        string newNum = idOldNum.ToString();
                        int longitudCadena = newNum.Length;
                        for (int i = 1; i <= 4 - longitudCadena; i++)
                        {
                            newNum = "0" + newNum;
                        }
                        IdeProNew = oDto.TIPO_PROP + newNum;
                    }
                }

                Entities ctx3 = new Entities();
                PPROPONENTESS oldPro2 = ctx3.PPROPONENTESS.OrderByDescending(t => t.ID).FirstOrDefault();
                if (oldPro2 == null) id = 1;
                else id = oldPro2.ID + 1;

                ep = new PPROPONENTESS();
                Mapper.Map(oDto, ep);

                if (oDto.TIPO_PROP == "PU")  ep.IDE_PROP = IdeProNew;
                if (oDto.TIPO_PROP != "PU")
                {
                    ep.APE1_PROP = oDto.RAZ_SOC;
                    ep.COD_AUX = IdeProNew;
                }
                ep.ID = id;
                ep.FEC_REG = DateTime.Now;
                ep.ESTADO = "AC";

                ctx.PPROPONENTESS.Add(ep);
                byaRpt.id = ep.ID.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vPPROPONENTESS oDto { get; set; }
            public PPROPONENTESS ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                Entities ctx2 = new Entities();
                PPROPONENTESS prop = ctx2.PPROPONENTESS.Where(t => t.NUM_PROC == oDto.NUM_PROC && t.ADJUDICADO == "S").FirstOrDefault();
                if (prop != null)
                {
                    oDto.ADJUDICADO = "N";
                    oDto.OBS_ADJUDICACION = "";
                }
                ep = ctx.PPROPONENTESS.Where(t => t.ID == oDto.ID).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected override void Antes()
            {
               

                decimal IdAux = ep.ID;
                string EstadoAux = ep.ESTADO;
                DateTime Fech_Reg_Aux = (DateTime) ep.FEC_REG;

                string IDE_PROP_AUX;
                if (ep.TIPO_PROP == "PU") IDE_PROP_AUX = ep.IDE_PROP;
                else IDE_PROP_AUX = ep.COD_AUX;                

                Mapper.Map(oDto, ep);
                ep.ID = IdAux;
                ep.ESTADO = EstadoAux;
                ep.FEC_REG = Fech_Reg_Aux;

                if (ep.TIPO_PROP == "PU") ep.IDE_PROP = IDE_PROP_AUX;
                else
                {
                    ep.APE1_PROP = oDto.RAZ_SOC;
                    ep.COD_AUX = IDE_PROP_AUX;
                }
                
            }
            #endregion
        }

        //Miembros Proponentes
        public List<vCONSORCIOSUTXC> GetsMiembrosProponentes(decimal IDE_PROP)
        {
            using (ctx = new Entities())
            {
                List<vCONSORCIOSUTXC> lrMiembros = new List<vCONSORCIOSUTXC>();
                List<CONSORCIOSUTXC> lMiembros = ctx.CONSORCIOSUTXC.Where(t => t.ID_PROP == IDE_PROP).ToList();
                Mapper.Map(lMiembros, lrMiembros);
                return lrMiembros;
            }
        }
        public vCONSORCIOSUTXC GetMiembro(decimal IDE_PROP, string ID_MIEMBROS)
        {
            using (ctx = new Entities())
            {
                vCONSORCIOSUTXC rMiembros = new vCONSORCIOSUTXC();
                CONSORCIOSUTXC Miembros = ctx.CONSORCIOSUTXC.Where(t => t.ID_PROP == IDE_PROP && t.ID_MIEMBROS == ID_MIEMBROS).FirstOrDefault();
                Mapper.Map(Miembros, rMiembros);
                return rMiembros;
            }
        }
        public ByARpt InsertMiembros(vCONSORCIOSUTXC Reg)
        {
            cmdInsertMiembros o = new cmdInsertMiembros();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt UpdateMiembros(vCONSORCIOSUTXC Reg)
        {
            cmdUpdateMiembros o = new cmdUpdateMiembros();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt DeleteMiembro(decimal IDE_PROP, string ID_MIEMBROS)
        {
            using (ctx = new Entities())
            {
                try
                {
                    ByARpt res = new ByARpt();
                    CONSORCIOSUTXC miembro = ctx.CONSORCIOSUTXC.Where(t => t.ID_PROP == IDE_PROP && t.ID_MIEMBROS == ID_MIEMBROS).FirstOrDefault();
                    if (miembro != null)
                    {
                        ctx.CONSORCIOSUTXC.Remove(miembro);
                        ctx.SaveChanges();
                        res.Error = false;
                        res.Mensaje = "Operación realizada satisfactoriamente...";
                    }
                    else
                    {
                        res.Error = true;
                        res.Mensaje = "No se encuentra ese miembro del proponente";
                    }
                    return res;
                }
                catch(Exception e)
                {
                    ByARpt res = new ByARpt();
                    res.Error = true;
                    res.Mensaje = e.Message;
                    return res;
                }
            }
        }
        class cmdInsertMiembros : absTemplate
        {
            private CONSORCIOSUTXC ep = null;
            public vCONSORCIOSUTXC oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                ep = ctx.CONSORCIOSUTXC.Where(t => t.ID_PROP == oDto.ID_PROP && t.ID_MIEMBROS == oDto.ID_MIEMBROS).FirstOrDefault();
                if (ep == null)
                {
                    Entities ctx2 = new Entities();
                    List<CONSORCIOSUTXC> lConso = ctx2.CONSORCIOSUTXC.Where(t => t.ID_PROP == oDto.ID_PROP).ToList();
                    decimal porcentajeAct = 0;
                    foreach (CONSORCIOSUTXC item in lConso)
                    {
                        porcentajeAct = porcentajeAct + (decimal)item.PORC_PART;
                    }
                    decimal porcentajeRestante = 100 - porcentajeAct;
                    if (oDto.PORC_PART > porcentajeRestante)
                    {
                        byaRpt.Mensaje = "La suma de los porcentajes de partisipación supera el " + porcentajeRestante + "% que esta disponible!!!";
                        byaRpt.Error = true;
                        return false;
                    }
                    else return true;
                }
                else 
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Este miembro ya ha sido agregado...";
                    return false; 
                }
            }

            protected override void Antes()
            {
                ep = new CONSORCIOSUTXC();
                Entities ctx2 = new Entities();
                int oldId;
                CONSORCIOSUTXC old = ctx2.CONSORCIOSUTXC.OrderByDescending(t => t.ID).FirstOrDefault();
                if(old == null) oldId = 0;
                else oldId = (int) old.ID;

                Mapper.Map(oDto, ep);
                ep.ID = oldId + 1;
                ep.FEC_REG = DateTime.Now;

                ctx.CONSORCIOSUTXC.Add(ep);
            }
            #endregion
        }
        class cmdUpdateMiembros : absTemplate
        {
            private CONSORCIOSUTXC ep = null;
            public vCONSORCIOSUTXC oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                ep = ctx.CONSORCIOSUTXC.Where(t => t.ID_PROP == oDto.ID_PROP && t.ID_MIEMBROS == oDto.ID_MIEMBROS).FirstOrDefault();
                if (ep != null)
                {
                    Entities ctx2 = new Entities();
                    List<CONSORCIOSUTXC> lConso = ctx2.CONSORCIOSUTXC.Where(t => t.ID_PROP == oDto.ID_PROP).ToList();
                    decimal porcentajeAct = 0;
                    foreach (CONSORCIOSUTXC item in lConso)
                    {
                        if(oDto.ID_MIEMBROS != item.ID_MIEMBROS) porcentajeAct = porcentajeAct + (decimal)item.PORC_PART;
                    }
                    decimal porcentajeRestante = 100 - porcentajeAct;
                    if (oDto.PORC_PART > porcentajeRestante)
                    {
                        byaRpt.Mensaje = "La suma de los porcentajes de partisipación supera el " + porcentajeRestante + "% que esta disponible!!!";
                        byaRpt.Error = true;
                        return false;
                    }
                    else return true;
                }
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Este miembro no ha sido agregado...";
                    return false;
                }
            }
            protected override void Antes()
            {
                decimal IDAUX = ep.ID;
                DateTime FECHAREGAUX = (DateTime)ep.FEC_REG;

                Mapper.Map(oDto, ep);
                ep.ID = IDAUX;
                ep.FEC_REG = FECHAREGAUX;
            }
            #endregion
        }

        //Miembros Tercero
        public List<vCONSORCIOSUTXC> GetsMiembrosTercero(string IDE_TER)
        {
            using (ctx = new Entities())
            {
                List<vCONSORCIOSUTXC> lrMiembros = new List<vCONSORCIOSUTXC>();
                List<CONSORCIOSUTXC> lMiembros = ctx.CONSORCIOSUTXC.Where(t => t.IDE_TER == IDE_TER).ToList();
                Mapper.Map(lMiembros, lrMiembros);
                return lrMiembros;
            }
        }
        public vCONSORCIOSUTXC GetMiembroTercero(string IDE_TER, string ID_MIEMBROS)
        {
            using (ctx = new Entities())
            {
                vCONSORCIOSUTXC rMiembros = new vCONSORCIOSUTXC();
                CONSORCIOSUTXC Miembros = ctx.CONSORCIOSUTXC.Where(t => t.IDE_TER == IDE_TER && t.ID_MIEMBROS == ID_MIEMBROS).FirstOrDefault();
                Mapper.Map(Miembros, rMiembros);
                return rMiembros;
            }
        }
        public ByARpt InsertMiembrosTercero(vCONSORCIOSUTXC Reg)
        {
            cmdInsertMiembrosTercero o = new cmdInsertMiembrosTercero();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt UpdateMiembrosTercero(vCONSORCIOSUTXC Reg)
        {
            cmdUpdateMiembrosTercero o = new cmdUpdateMiembrosTercero();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt DeleteMiembroTercero(string IDE_TER, string ID_MIEMBROS)
        {
            using (ctx = new Entities())
            {
                try
                {
                    ByARpt res = new ByARpt();
                    CONSORCIOSUTXC miembro = ctx.CONSORCIOSUTXC.Where(t => t.IDE_TER == IDE_TER && t.ID_MIEMBROS == ID_MIEMBROS).FirstOrDefault();
                    if (miembro != null)
                    {
                        ctx.CONSORCIOSUTXC.Remove(miembro);
                        ctx.SaveChanges();
                        res.Error = false;
                        res.Mensaje = "Operación realizada satisfactoriamente...";
                    }
                    else
                    {
                        res.Error = true;
                        res.Mensaje = "No se encuentra ese miembro del proponente";
                    }
                    return res;
                }
                catch (Exception e)
                {
                    ByARpt res = new ByARpt();
                    res.Error = true;
                    res.Mensaje = e.Message;
                    return res;
                }
            }
        }
        class cmdInsertMiembrosTercero : absTemplate
        {
            private CONSORCIOSUTXC ep = null;
            public vCONSORCIOSUTXC oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                ep = ctx.CONSORCIOSUTXC.Where(t => t.IDE_TER == oDto.IDE_TER && t.ID_MIEMBROS == oDto.ID_MIEMBROS).FirstOrDefault();
                if (ep == null)
                {
                    Entities ctx2 = new Entities();
                    List<CONSORCIOSUTXC> lConso = ctx2.CONSORCIOSUTXC.Where(t => t.IDE_TER == oDto.IDE_TER).ToList();
                    decimal porcentajeAct = 0;
                    foreach (CONSORCIOSUTXC item in lConso)
                    {
                        porcentajeAct = porcentajeAct + (decimal)item.PORC_PART;
                    }
                    decimal porcentajeRestante = 100 - porcentajeAct;
                    if (oDto.PORC_PART > porcentajeRestante)
                    {
                        byaRpt.Mensaje = "La suma de los porcentajes de partisipación supera el " + porcentajeRestante + "% que esta disponible!!!";
                        byaRpt.Error = true;
                        return false;
                    }
                    else return true;
                }
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Este miembro ya ha sido agregado...";
                    return false;
                }
            }

            protected override void Antes()
            {
                ep = new CONSORCIOSUTXC();
                Entities ctx2 = new Entities();
                int oldId;
                CONSORCIOSUTXC old = ctx2.CONSORCIOSUTXC.OrderByDescending(t => t.ID).FirstOrDefault();
                if (old == null) oldId = 0;
                else oldId = (int)old.ID;

                Mapper.Map(oDto, ep);
                ep.ID = oldId + 1;
                ep.FEC_REG = DateTime.Now;

                ctx.CONSORCIOSUTXC.Add(ep);
            }
            #endregion
        }
        class cmdUpdateMiembrosTercero : absTemplate
        {
            private CONSORCIOSUTXC ep = null;
            public vCONSORCIOSUTXC oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected override bool esValido()
            {
                ep = ctx.CONSORCIOSUTXC.Where(t => t.IDE_TER == oDto.IDE_TER && t.ID_MIEMBROS == oDto.ID_MIEMBROS).FirstOrDefault();
                if (ep != null)
                {
                    Entities ctx2 = new Entities();
                    List<CONSORCIOSUTXC> lConso = ctx2.CONSORCIOSUTXC.Where(t => t.IDE_TER == oDto.IDE_TER).ToList();
                    decimal porcentajeAct = 0;
                    foreach (CONSORCIOSUTXC item in lConso)
                    {
                        if (oDto.ID_MIEMBROS != item.ID_MIEMBROS) porcentajeAct = porcentajeAct + (decimal)item.PORC_PART;
                    }
                    decimal porcentajeRestante = 100 - porcentajeAct;
                    if (oDto.PORC_PART > porcentajeRestante)
                    {
                        byaRpt.Mensaje = "La suma de los porcentajes de partisipación supera el " + porcentajeRestante + "% que esta disponible!!!";
                        byaRpt.Error = true;
                        return false;
                    }
                    else return true;
                }
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Este miembro no ha sido agregado...";
                    return false;
                }
            }
            protected override void Antes()
            {
                decimal IDAUX = ep.ID;
                DateTime FECHAREGAUX = (DateTime)ep.FEC_REG;

                Mapper.Map(oDto, ep);
                ep.ID = IDAUX;
                ep.FEC_REG = FECHAREGAUX;
            }
            #endregion
        }
    
    }
}
