<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ConsultaGestion.aspx.cs" Inherits="wfSircc.Contratos.Gestion.ConsultaGestion" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div class="col-md-12"> 
         &nbsp
        </div>   
     
    <br />
    <br />
   
                        
                                     
                      <div class="row"> 
                           <div class="col-md-12">  
                           
                                <div class="col-md-3">  
                                         <select id="CboFil" class="form-control input-sm"></select>
                      </div>  
                                   
                                 <div class="col-md-2">
                              <button type="button" class="btn btn-info" id="BtndetallesGestion">
                             <span class="glyphicon glyphicon-search">
                             </span>Detalles</button>      
                         </div>                  
                      </div>                            
                      <div class="col-md-12">  
                             &nbsp                            
                      </div>                      
                             <div class="col-md-1"> 
                      
                      </div>                 
                      <div class="col-md-9"> 
                      <div id="jqxgridGestion"></div> 
                      </div>
                      </div>                             
           
          
    

      
            
 

  
        <script src="js/ConsultaGestion.js"></script>
</asp:Content>
