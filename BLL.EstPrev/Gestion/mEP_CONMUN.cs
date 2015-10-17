using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Entidades;
using System.Data;
using System.Data.Entity;

namespace BLL.EstPrev
{

    public class mEP_CONMUN : absBLL
    {
        public EP_CONMUN reg { get; set; }

        #region Insert

        protected override bool esValidoInsert()
        {
            return true;
        }
        protected override void AntesInsert()
        {
            //et.FEC_REG = DateTime.Now;
            decimal ultId;
            try
            {
                ultId = ctx.EP_CONMUN.Max(t => t.ID);
            }
            catch
            {
                ultId = 0;
            }
            reg.ID = ultId + 1;
            byaRpt.id = ultId.ToString();
            ctx.EP_CONMUN.Add(reg);
            
        }
        //protected override void DespuesInsert();
        #endregion


        #region Delete

        protected override bool esValidoDelete()
        {
            return true;
        }

        protected override void AntesDelete()
        {

            ctx.Entry<EP_CONMUN>(reg).State = EntityState.Deleted;
        }
        //protected override void DespuesInsert();
        #endregion
    }
}
