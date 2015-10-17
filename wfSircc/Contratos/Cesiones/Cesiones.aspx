<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Cesiones.aspx.cs" Inherits="wfSircc.Contratos.Cesiones.Cesiones" %>

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

    <div class="form-horizontal" role="form" id="formDATOS">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tabCesi" data-toggle="tab">1.Cesiones</a></li>
            <li><a href="#tabhist" data-toggle="tab">2.Historico de Cesiones</a></li>        
        </ul>
        <div   class="tab-content">
              <div id="tabCesi"class="tab-pane in active ">
                  
                 <div class="form-group">
                    <label for="TextFecCesion" class="col-sm-2 control-label">
                        Fecha Cesión: 
                    </label>
                             <div class="col-sm-2">
                                 <input type="date" class="form-control" id="TextFecCesion" />
                            <%--<div class="input-medium">
                                <div class="input-group">
                                    <input class="input-medium date-picker" id="TextFecCesion" type="text" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" />
                                    <span class="input-group-addon">
                                        <i class="icon-calendar"></i>
                                    </span>
                                </div>
                            </div>--%>
                         </div>            
                </div>
                  <div class="form-group">
                    <label for="TextPlazE" class="col-sm-2 control-label">
                        Plazo Ejecución: 
                    </label>
                    <div class="col-md-2">
                        <input id="TextPlazE" type="text" class="form-control input-sm inputHab" />
                    </div>               
                    </div>    
                <div class="form-group">
                    <label for="TextValor" class="col-sm-2 control-label">
                        Valor: 
                    </label>
                    <div class="col-md-2">
                       <input id="TextValor" type="text" class="form-control input-sm inputHab currency" />
                    </div>               
                    </div>  
                <div class="form-group">
                    <label for="TextRes" class="col-sm-2 control-label">
                        Resolución: 
                    </label>
                    <div class="col-md-2">
                       <input id="TextRes" type="text" class="form-control input-sm inputHab" />
                    </div>               
                    </div>   
                 <div class="form-group">
                    <label for="TextFecRes" class="col-sm-2 control-label">
                        Fecha de Resolución: 
                    </label>
                           <div class="col-sm-2">
                               <input type="date" class="form-control" id="TextFecRes" />
                            <%--<div class="input-medium">
                                <div class="input-group">
                                    <input class="input-medium date-picker" id="TextFecRes" type="text" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" />
                                    <span class="input-group-addon">
                                        <i class="icon-calendar"></i>
                                    </span>
                                </div>
                            </div>--%>
                         </div>        
                    </div>   
                 <div class="form-group">
                    <label for="TxtIdeInter" class="col-sm-2 control-label">
                        Nuevo Contratista: 
                    </label>
                    <div class="col-md-2">
                        <input id="TxtIdeInter" type="text" class="form-control input-sm inputHab" />
                    </div>
                    <div class="col-md-1">
                        <button type="button" value="Nuevo" id="BtnBuscCon" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <input id="TxtNomCon" type="text" class="form-control input-sm " disabled="disabled" />
                    </div>
                </div>
                  
                    
                     <div class="col-md-12"> 
                               &nbsp
                         </div>  
                        <div class="row">
                      <div class="col-md-2">
                                  
                         </div> 
                         <div class="col-md-2">
                             <button type="button" class="btn btn-success" id="BtnguardarCesiones">
                             <span class="glyphicon glyphicon-floppy-saved">
                             </span>Guardar</button>         
                         </div>   
                         <div class="col-md-2">       
                             <button type="button" class="btn btn-danger" id="BtncancelarCesiones">
                             <span class="glyphicon glyphicon-remove">
                             </span>Cancelar</button>
                         </div>
                                   
                </div> 
                
                 
            </div>          
              <div id="tabhist" class="tab-pane ">                          
                      <div class="row"> 
                           <div class="col-md-12">  
                           
                                <div class="col-md-3">  
                                         Listado de Cesiones  
                      </div>  
                                    <div class="col-md-7">  
                                     
                      </div>  
                                 <div class="col-md-2">
                              <button type="button" class="btn btn-danger" id="BtnEliminarCesiones">
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
            </div>
    

          
          
           
       

        </div>

    <div id="secBsqTerceros"></div>
            
    <div class="modal fade" id="modalTerceros" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H5">Consulta de Terceros</h4>
                </div>
                <div class="modal-body">
                    <div id="jqxgridTer">
                            </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal TERCEROS-->
    

  
        <script src="js/Cesiones.js"></script>
</asp:Content>
