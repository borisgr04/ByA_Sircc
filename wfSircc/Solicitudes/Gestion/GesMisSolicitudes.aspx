<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesMisSolicitudes.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.GesMisSolicitudes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <ul class="nav nav-tabs">
        <li><a href="PanelMiGestion.aspx">Panel de Gestión</a></li>
        <li class="active"><a href="GesMisSolicitudes.aspx">Mis Solicitudes</a></li>
        <li><a href="GesMisProcesos.aspx">Mis Procesos</a></li>
    </ul>
    
            <div class="panel panel-default">
        <div class="panel-body">

            <h4>Solicitudes a Cargo </h4>
            <div id="msgResult">
            </div>

            <div class="rows">

            
            <div class="col-md-2">
                    Dependencia
                    <select id="CboDepDel" class="form-control input-sm"></select>    
                    <br />
                    <div class="list-group" id="dvdEstado">
                    </div>
            </div>
                <div class="col-md-10">
                    <div class="rows">
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-6">
                            <div class="btn-toolbar">

                                <button type="button" value="Consultar" id="BtnConsulta" data-loading-text="Loading..." class="btn btn-success btn-small">
                                    <span class="glyphicon glyphicon-search "></span>Consultar
                                </button>
                                <button type="button" value="Nuevo" id="BtnDetalle" class="btn btn-info btn-small">
                                    <span class="glyphicon glyphicon-zoom-in"></span>Detalle
                                </button>


                                <button type="button" value="Nuevo" id="BtnRecibir" class="btn btn-warning btn-small">
                                    <span class="glyphicon glyphicon-hand-up"></span>Recibir
                                </button>
                                <button type="button" value="Editar" id="BtnRevisar" class="btn btn-danger btn-small">
                                    <span class="glyphicon glyphicon-eye-open"></span>Revisar
                                </button>

                            </div>
                            <br />
                    </div>
                </div>
                
                <div class="rows">
                    <br />
                    <div id="jqxgridSol">
                    </div>
                    </div>
                </div>


                </div>
            
            

      </div>
                </div>  
   

    <!-- Modal -->
    <div class="modal fade" id="modalRecibir" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h6 class="modal-title" id="H1">Recibir Solicitud de Contratación</h6>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                     <div class="row">
                        <div class="form-group">
                            <label for="txtNSolRc" class="col-sm-3 control-label no-padding-right" >N° de Solicitud:</label>
                            <div class="col-xs-4">
                            <input id='txtNSolRc' title="Número de Solicitud." class="form-control input-sm" disabled />
                            </div>
                        </div>
                                                 
                        <div class="form-group">
                        <label for="txtEstadoRc" class="col-sm-3 control-label no-padding-right">Estado:</label>
                        <div class="col-xs-3">
                        <%--<input id='txtEstadoRc' title="Estado" class="form-control input-sm" disabled />--%>
                            <select id="txtEstadoRc" class="form-control input-sm" disabled>
                                <option value="P">Pendiente</option>
                                <option value="A">Aceptado</option>
                                <option value="R">Rechazado</option>
                            </select>
                        </div>
                        </div>

                        <div class="form-group">
                                
                             <label for="txtFecRecRc" class="col-sm-3 control-label no-padding-right">Fecha Recibido:</label>
                             <div class="col-xs-3">
                             <input id='txtFecRecRc' title="Fecha de Recibido por el abogado." class="form-control input-sm" disabled />
                             </div>
                            </div>
                   
                         <div class="form-group">
                            <label for="txtObjConRc" class="col-sm-3 control-label no-padding-right"> Objeto a Contratar</label>
                            <div class="col-xs-9">
                            <textarea id="txtObjConRc" class="form-control input-sm" title="Objeto a contratar" rows="5" disabled></textarea>
                            </div>
                        </div>

                         <div class="form-group">
                            <label for="txtObsRc" class="col-sm-3 control-label no-padding-right">Observación  Recibido</label>
                            <div class="col-xs-9">
                            <textarea id="txtObsRc" class="form-control input-sm" title="Observación" rows="2"></textarea>
                        </div>
                    </div>

                </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-small" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="BtnRecDetalle" class="btn btn-success btn-small detalle">Más Detalles</button>
                    <button type="button" id="BtnRecGuardar" class="btn btn-primary btn-small">Guardar</button>
                </div>
                </div>

            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
   
    <!-- Modal -->
    <div class="modal fade" id="modalRevisar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H2">Revisar Solicitud de Contratación</h4>
                </div>
                <div class="modal-body">
                  <div class="form-horizontal">
                     <div class="alert alert-info">
                                   <i class="glyphicon glyphicon-hand-right"></i>  El Número a Asignarle al Proceso Sería, 
                                  <strong> <span id="txtNumPro">SAMC-SGR-0010-2013</span></strong>
                               </div>
                    
                     <div class="form-group">
                        
                            <label for="txtNSolRv" class="col-sm-3 control-label no-padding-right">N° de Solicitud:</label>
                            <div class="col-sm-3">
                            <input id='txtNSolRv' title="Número de Solicitud." class="form-control input-sm" disabled />
                            </div>

                        <label for="txtEstadoRv" class="col-sm-3 control-label no-padding-right"">Estado actual:</label>
                         <div class="col-sm-3">
                            <select id="txtEstadoRv" class="form-control input-sm" disabled>
                                <option value="P">Pendiente</option>
                                <option value="A">Aceptado</option>
                                <option value="R">Rechazado</option>
                            </select>
                        </div>
                    </div>
                   
                    <div class="form-group">
                         <label for="txtFecRecRc"class= "col-sm-3 control-label no-padding-right">Fecha Recibido:</label>
                         <div class="col-sm-3">
                              <input id='txtFecRecRv' title="Fecha de Recibido por el abogado." class="form-control input-sm" disabled />
                         </div>


                        <label for="txtFecRevRv" class="col-sm-3 control-label no-padding-right">Fecha de la Revisión:</label>
                            <div class="col-sm-3">
                            <input id='txtFecRevRv' title="Fecha de Recibido por el abogado." class="form-control input-sm" disabled />
                            </div>

                    </div>
                    <div class="form-group">
                         <label for="txtObjConRv" class="col-sm-3 control-label no-padding-right">Objeto a Contratar</label>
                         <div class="col-sm-9">
                            <textarea id="txtObjConRv" class="form-control" title="Objeto a contratar" rows="5" disabled></textarea>
                        </div>
                   </div>
                    <div class="form-group">    
                        <label for="cboConceptoRv" class="col-sm-3 control-label no-padding-right">Concepto de la Revisión</label>
                        <div class="col-sm-6">
                            <select id="cboConceptoRv" class="form-control input-sm">
                                <option value="P">Pendiente</option>
                                <option value="A">Aceptado</option>
                                <option value="R">Rechazado</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                         <label for="txtObsRv" class="col-sm-3 control-label no-padding-right">Observación de la Revisión</label>
                         <div class="col-sm-9">
                              <textarea id="txtObsRv" class="form-control" title="Observación" rows="4"></textarea>
                        </div>
                    </div>
          
                    
                    </div>
                   </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger bt-small" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="BtnRvDetalle" class="btn btn-success btn-small detalle">Más Detalles</button>
                    <button type="button" id="BtnRevGuardar" class="btn btn-primary btn-small">Guardar Cambios</button>
                </div>
             
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->


    <div id="secDetalle"></div>


    <script src="js/GesMisSolicitudes.js"></script>



</asp:Content>
