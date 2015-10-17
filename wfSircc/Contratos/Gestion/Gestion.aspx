<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Gestion.aspx.cs" Inherits="wfSircc.Contratos.Gestion.Gestion" %>

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
        <div class="col-lg-12" id="dvdDetContrato" style="display:none; margin-bottom:10px">  
                <div id="DetContrato" style="height:130px; overflow:auto">
                    </div>
           </div> 
    </div>
    <div class="form-horizontal" role="form" id="formDATOS">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tabActas" data-toggle="tab">1.Registro de Actas</a></li>
            <li><a href="#tabList" data-toggle="tab">2.Listado de Actas</a></li>        
        </ul>
        <div   class="tab-content">
              <div id="tabActas" class="tab-pane in active ">   
               <div class="row">              
               <div class="col-xs-6">
                  <div class="form-group">
                    <label for="TextFecDoc" class="col-sm-4 control-label">
                        Fecha Documento: 
                    </label>
                      <div class="col-sm-6">
                          <input type="date" class="form-control" id="TextFecDoc" />
                           <%-- <div class="input-medium">
                                <div class="input-group">
                                    <input class="input-medium date-picker" id="TextFecDoc" type="text" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" />
                                    <span class="input-group-addon">
                                        <i class="icon-calendar"></i>
                                    </span>
                                </div>
                            </div>--%>
                         </div>             
                </div>             
                  <div class="form-group">
                    <label for="CboEst" class="col-sm-4 control-label">
                        Documento: 
                    </label>
                    <div class="col-md-6">
                        <select id="CboEst" class="form-control input-sm"></select>
                    </div>               
                    </div>    
                  <div class="form-group">
                    <label for="textObs" class="col-sm-4 control-label">
                      Observación: 
                    </label>
                     <div class="col-md-6" >
                         <textarea id="textObs" class="form-control inputHab"> </textarea>
                       </div>

              </div>      
                  <div class="form-group">
                    <label for="TextNvis" class="col-sm-4 control-label">
                        Nº Visitas: 
                    </label>
                    <div class="col-md-4">
                       <input id="TextNvis" type="text" class="form-control input-sm inputHab" />
                    </div>               
                    </div>   
                  <div class="form-group">
                    <label for="TextValp" class="col-sm-4 control-label">
                        Valor Autorizacion Pago: 
                    </label>
                    <div class="col-md-4">
                       <input id="TextValp" type="text" class="form-control input-sm inputHab currency" />
                    </div>               
                    </div>   
                  <div class="form-group">
                    <label for="TextFisico" class="col-sm-4 control-label">
                        % Ejecución Fisico: 
                    </label>
                    <div class="col-md-4">
                        <input id="TextFisico" type="text" class="form-control input-sm inputHab text-right" />
                    </div>
                   
                </div>
                  <div class="col-md-12"> 
                               &nbsp
                         </div>  
                  <div class="row">
                      <div class="col-md-4">
                                  
                         </div> 
                         <div class="col-md-4">
                             <button type="button" class="btn btn-success" id="BtnguardarGestion">
                             <span class="glyphicon glyphicon-floppy-saved">
                             </span>Guardar</button>         
                         </div>   
                         <div class="col-md-4">       
                             <button type="button" class="btn btn-danger" id="BtncancelarGestion">
                             <span class="glyphicon glyphicon-remove">
                             </span>Cancelar</button>
                         </div>
                                   
                </div> 
                </div> 
                <div class="col-xs-6"></div> 
                   <div class="col-md-3 alert alert-info" id="dvdEstadoCuentaContrato">                  
                   </div>    
                </div>             
            </div>          
              <div id="tabList" class="tab-pane ">                          
                      <div class="row"> 
                           <div class="col-md-12">   
                               <div class="col-md-2">                                    
                                </div>                          
                                <div class="col-md-4 text-left">  
                                    <h4>Listado de Actas</h4> 
                                </div>                                    
                                <div class="col-md-4 text-right">
                                     <button type="button" class="btn btn-danger" id="BtnAnularGestion">
                                     <span class="glyphicon glyphicon-remove">
                                     </span>Eliminar</button>      
                                </div>   
                               <div class="col-md-2">                                    
                                </div>                
                            </div>                            
                            <div class="col-md-12">  
                                &nbsp                            
                            </div>          
                            <div class="col-md-8"> 
                                <div id="jqxgridGestion"></div> 
                            </div>
                          <div class="col-md-2">                       
                            </div>
                      </div>                             
            </div>          
    </div>

        </div>
            
 

  
        <script src="js/Gestion.js"></script>
</asp:Content>
