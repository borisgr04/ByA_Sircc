<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Modificatorios.aspx.cs" Inherits="wfSircc.Contratos.Adiciones.Adiciones" %>
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
        <div class="col-lg-12" style="display:none" id="dvdDetContrato">  
                   <div id="DetContrato" style="height:130px; overflow:auto"></div>
           </div> 
    </div>
    <br />
    <br />
    <div class="form-horizontal" role="form" id="formDATOS">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tabRadi" data-toggle="tab">1.Radicación</a></li>
            <li><a href="#tabhist" data-toggle="tab">2.Historico de Modificatorios</a></li>        
        </ul>

        <div class="tab-content">

            <div id="tabRadi" class="tab-pane in active"> 
               
                <div class="col-md-12"> 
                 &nbsp
                </div> 

                <div class="form-group">
                    <label for="CboTipoDocu" class="col-sm-2 control-label">
                        Tipo Documento: 
                    </label>
                    <div class="col-md-2">
                         <select id="CboTipoDocu" class="form-control input-sm cbo">                           
                         </select>  
                    </div>               
                </div>
                 <div class="form-group">
                    <label for="TextPlazoDias" class="col-sm-2 control-label">
                        Plazo Adición(Días): 
                    </label>
                    <div class="col-md-1">
                        <input id="TextPlazo1" type="text" class="form-control input-sm inputHab" />
                    </div>      
                      <div class="col-md-2">
                         <select id="CboPlazo1" class="form-control input-sm cbo">                           
                         </select>  
                    </div>   
                      <div class="col-md-1">
                        <input id="TextPlazo2" type="text" class="form-control input-sm inputHab" />
                    </div>      
                      <div class="col-md-2">
                         <select id="CboPlazo2" class="form-control input-sm cbo">                           
                         </select>  
                    </div>   
                </div>
                 <div class="form-group">
                    <label for="TextValorAdi" class="col-sm-2 control-label">
                        Valor Adición($): 
                    </label>
                    <div class="col-md-2">
                        <input id="TextValorAdi" type="text" class="form-control input-sm inputHab currency" />
                    </div>          
                </div>
                    <div class="form-group">
                    <label for="TextFecSus" class="col-sm-2 control-label">
                        Fecha de Suscripción: 
                    </label>
                     <div class="col-sm-3">
                         <input type="date" id="TextFecSus" class="form-control" />
                            <%--<div class="input-medium">
                                <div class="input-group">
                                    <input class="input-medium date-picker" id="TextFecSus" type="text" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" />
                                    <span class="input-group-addon">
                                        <i class="icon-calendar"></i>
                                    </span>
                                </div>
                            </div>--%>
                         </div>                 
                    </div>    
                  <div class="form-group">
                    <label for="TextObs" class="col-sm-2 control-label">
                       Observación/Objeto del Documento: 
                    </label>
                    <div class="col-md-5">
                        <textarea id="TextObs"  class="form-control input-sm inputHab" ></textarea>
                    </div>  
                               
                    </div>    
                 <div class="form-group">
                         <div class="col-md-2">
                       
                    </div>  
                     <div class="col-md-2">
                             <button type="button" class="btn btn-success" id="BtnguardarRadicacion">
                             <span class="glyphicon glyphicon-floppy-saved">
                             </span>Guardar</button>         
                         </div>    
                    </div>    
                
                     
            </div>    
            <!---Registro Presupuestal-->            
            <div id="tabhist" class="tab-pane ">                          
                      <div class="row"> 
                           <div class="col-md-12">  
                           
                                <div class="col-md-3">  
                                         LISTADO DE MODIFICATORIOS  
                      </div>  
                                    <div class="col-md-7">  
                                     
                      </div>  
                                 <div class="col-md-2">
                              <button type="button" class="btn btn-danger" id="BtnEliminarAdi">
                             <span class="glyphicon glyphicon-remove">
                             </span>Eliminar</button>      
                         </div>                  
                      </div>                            
                      <div class="col-md-12">  
                             &nbsp                            
                      </div>   
                          
                                              
                      <div class="col-md-12"> 
                      <div id="jqxgridHisto"></div> 
                      </div>
                      </div>                             
            </div>
            <!---Polizas de Garantia-->
    
</div>
        </div>          
   
    <!-- /.modal TERCEROS-->  
        <script src="js/Modificatorios.js"></script>
</asp:Content>
