//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace Entidades
{
    public partial class ORA_ASPNET_PERSONALIZNALLUSERS
    {
        public Nullable<System.Guid> PATHID { get; set; }
        public byte[] PAGESETTINGS { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    
        public virtual ORA_ASPNET_PATHS ORA_ASPNET_PATHS { get; set; }
    }
    
}
