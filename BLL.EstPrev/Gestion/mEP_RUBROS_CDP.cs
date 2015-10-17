using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Entidades;
using System.Data;
using System.Data.Entity;

namespace BLL.EstPrev
{
    
    public class mEP_RUBROS_CDP : absBLL
    {
        public EP_RUBROS_CDP reg { get; set; }

        #region Insert

        protected  override bool esValidoInsert()
        {
            return true;
        }
        protected  override void AntesInsert()
        {
            //reg.FEC_REG = DateTime.Now;
            decimal ultId;
            try
            {
                ultId = ctx.EP_RUBROS_CDP.Max(t => t.ID);
            }
            catch
            {
                ultId = 0;
            }
            reg.ID = ultId + 1;
            reg.FEC_REG = DateTime.Now;
            byaRpt.id = ultId.ToString();
            ctx.Entry(reg).State = EntityState.Added; //Adicionar Registro
            
        }
        //protected override void DespuesInsert();
        #endregion

        #region Update

        protected  override bool esValidoUpdate()
        {
            return true;
        }
        protected  override void AntesUpdate()
        {
            //reg.FEC_MOD = DateTime.Now;
            reg.FEC_MOD = DateTime.Now;
            
            var found = ctx.EP_RUBROS_CDP.Find(reg.ID);

            if (found != null)
            {
                found.VALOR = reg.VALOR;
                found.COD_RUB = reg.COD_RUB;
                found.USAP_MOD = reg.USAP_MOD;
                ctx.Entry(found).State = EntityState.Modified;
                
            }
            else
            {
                throw new Exception("No se encontro el registró");
            }


        }
        //protected override void DespuesUpdate();
        #endregion

        #region Delete

        protected  override bool esValidoDelete()
        {
            return true;
        }

        protected  override void AntesDelete()
        {

            ctx.Entry(reg).State = EntityState.Deleted;
        }
        //protected override void DespuesInsert();
        #endregion

    }
}
