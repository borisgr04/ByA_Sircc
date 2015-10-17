<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Anulacion.aspx.cs" Inherits="wfSircc.Contratos.Anulacion.Anulacion" %>

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

    <div class="col-lg-12" style="margin-top:20px">
    <div class="panel panel-default">
                    <div class="panel-heading">Anulación<span style="margin-left:20px" class="label label-default" id="cdpTip"></span></div>
                    <div class="panel-body">


    <div class="form-horizontal" role="form" id="formDATOS">
           <div class="row">                
                <div class="col-md-12"> 
                 &nbsp
                </div>            
                <div class="form-group">
                    <label for="TextFecDoc" class="col-sm-2 control-label">
                        Fecha Documento: 
                    </label>
                      <div class="col-sm-3">
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
                    <label for="textObs" class="col-sm-2 control-label">
                      Observación: 
                    </label>
                     <div class="col-md-5" >
                         <textarea id="textObs" class="form-control inputHab"> </textarea>
                       </div>

              </div>          
                <div class="form-group">

                         <div class="col-md-2">                       
                    </div>  
                     <%--<div class="col-md-2">
                             <button type="button" class="btn btn-warning" id="BtnnuevaAnulacion">
                             <span class="glyphicon glyphicon-floppy-saved">
                             </span>Nuevo</button>         
                         </div>   --%> 
                  

                         <div class="col-md-2">
                             <button type="button" class="btn btn-success" id="BtnguardarAnulacion">
                             <span class="glyphicon glyphicon-floppy-saved">
                             </span>Anular</button>         
                         </div>    
                     
                        <div class="col-md-2">
                             <button type="button" class="btn btn-danger" id="BtncancelarAnulacion">
                             <span class="glyphicon glyphicon-floppy-saved">
                             </span>Cancelar</button>         
                         </div>    
                    </div>                        
           </div>     
    </div>     
                        </div>
        </div></div>       
   
        <script src="js/Anulacion.js"></script>
</asp:Content>
