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
    public partial class ORA_ASPNET_SESSIONS
    {
        public string SESSIONID { get; set; }
        public System.DateTime CREATED { get; set; }
        public System.DateTime EXPIRES { get; set; }
        public System.DateTime LOCKDATE { get; set; }
        public System.DateTime LOCKDATELOCAL { get; set; }
        public decimal LOCKCOOKIE { get; set; }
        public decimal TIMEOUT { get; set; }
        public decimal LOCKED { get; set; }
        public byte[] SESSIONITEMSHORT { get; set; }
        public byte[] SESSIONITEMLONG { get; set; }
        public decimal FLAGS { get; set; }
    }
    
}
