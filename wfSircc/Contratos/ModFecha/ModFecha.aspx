<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ModFecha.aspx.cs" Inherits="wfSircc.Contratos.ModFecha" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <div class="col-md-12"> 
         &nbsp
        </div>   
     <div class="row">
        <div class="col-md-12" id="dvdEla">
            <div class="col-md-3" >
                <select id="CboTip" class="form-control input-sm"></select>
            </div>
            <div class="col-md-3">                
                <div class="input-group">
                    <input type="text" class="form-control inputHab" id="txtNumero"  />
                    <div class="input-group-btn ">
                        <button type="button" id="BtnDwnAbrir" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                            <span class="icon-folder-open-alt"></span>
                        </button>                       
                    </div>
                    <!-- /btn-group -->
                </div>
                <!-- /input-group -->               
            </div>     
                
         </div>  
        <div class="col-md-12"> 
         &nbsp
        </div>          
        <div class="col-lg-12" id="dvdDetContrato" style="display:none">  
                 <div id="DetContrato" style="height:130px; overflow:auto">

</div>
           </div> 
    </div>

    <div class="col-lg-12" style="margin-top:20px">
    <div class="panel panel-default">
                    <div class="panel-heading">ModFecha<span style="margin-left:20px" class="label label-default" id="cdpTip"></span></div>
                    <div class="panel-body">

    <div class="form-horizontal" role="form" id="formDATOS">
         <div class="row">      
             <div class="col-xs-6">          
                <div class="col-md-12"> 
                 &nbsp
                </div>            
                <div class="form-group">
                    <label for="TextNFech" class="col-sm-5 control-label">
                        Nueva Fecha de Suscripción: 
                    </label>
                      <div class="col-sm-7">
                            <div class="input-medium">
                                <input type="date" class="form-control" id="TextNFech" />
                                <%--<div class="input-group">
                                    <input class="input-medium date-picker" id="TextNFech" type="text" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" />
                                    <span class="input-group-addon">
                                        <i class="icon-calendar"></i>
                                    </span>
                                </div>--%>
                            </div>
                         </div>             
                </div>
                <div class="form-group">
                    <label  class="col-sm-5 control-label">
                      Fecha Minima Válida: 
                    </label>
                     <label id="FechMinima" class="col-sm-7 control-label">
                       
                    </label>                                  
                </div>
                <div class="form-group">
                    <label  class="col-sm-5 control-label">
                      Fecha Maxima Válida: 
                    </label>
                     <label id="FechMaxima" class="col-sm-7 control-label">
                       
                    </label>   

              </div>   
                <div class="form-group">
                         <div class="col-md-5">                       
                    </div>  
                     <div class="col-md-7">
                             <button type="button" class="btn btn-success" id="BtnguardarModFecha">
                             <span class="glyphicon glyphicon-floppy-saved">
                             </span>Guardar</button>         
                         </div>    
                    </div>    
              </div>
             <div class="col-xs-6">
                 <div id="lbMensaje" class="col-xs-12 alert alert-danger">
                     <strong>Atención: </strong> La modificación puede generar inconsistencias y violar la integridad de la información. 
                 </div>
             </div>
            </div>   
    </div>            
   </div></div></div>

        <script src="js/ModFecha.js"></script>
</asp:Content>
