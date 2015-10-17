<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesMisProcesos.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.GesMisProcesosn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <ul class="nav nav-tabs">
        <li><a href="PanelMiGestion.aspx">Panel de Gestión</a></li>
        <li><a href="GesMisSolicitudes.aspx">Mis Solicitudes</a></li>
        <li class="active"><a href="GesMisProcesos.aspx">Mis Procesos</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-3">
                    <label>Modalidad</label>
                    <div class="input-group">
                        <input class="form-control input-xs" id="txtNombreModalidad" />
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-info dropdown-toggle" id="txtFiltrarModalidades" data-toggle="dropdown">
                                <span class="icon-search"></span>                        
                            </button>                   
                        </div>
                    </div>
                </div>
                <div class="col-xs-3">
                    <label>Filtrar</label>
                    <div class="input-group">
                        <input class="form-control input-xs" id="txtFiltro"/>
                        <div class="input-group-btn" >
                            <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                <span class="icon-search"></span>                        
                            </button>                   
                        </div>
                    </div>
                </div>
                <div class="col-xs-1"></div>
                <div class="col-xs-5 text-right">                    
                    <div class="alert alert-success" role="alert" style="display:none;" id="siProcesosHoy">
                        <div class="container text-center">
                            <strong>Estos son procesos con actividades para el día de hoy</strong> 
                        </div>
                    </div>
                    <div id="noProcesosHoy" style="display:none;">
                        <button type="button" class="btn btn-success" id="btnVerProcesosHoy" style="margin-top:23px;">
                            <span class="glyphicon glyphicon-eye-open"></span> Ver procesos con tareas hoy                
                        </button>  
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top:10px;">
                <div class="col-xs-3">
                    <ul class="list-group" style="margin-left:0px;width:100%;height:400px;overflow-y:scroll;" id="dvdlModalidades">
                    </ul>
                </div>
                <div class="col-xs-9">
                    <div class="panel panel-default" style="width:100%;height:400px; overflow-y:scroll;">
                        <div class="panel-body" id="dvdPanelProcesos">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <div class="modal fade" id="modalDetallesProceso" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Seguimiento del Proceso</h4>
          </div>
          <div class="modal-body">
              <div id="dvdMesSeg"></div>
              <div class="panel panel-default" style="width:100%;height:400px; overflow-y:scroll;">
                <div class="panel-body" id="dvdSeguimientoProceso">
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" style="display:none" id="btnDescartar2">Descartar</button>
            <%--<button type="button" class="btn btn-primary">Terminación</button>--%>            
            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>            
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal de detalles de proceso -->
    </div>
    <div class="modal fade" id="modalCronograma" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Elaborar Cronograma</h4>
          </div>
          <div class="modal-body">
              <div id="dvdMesCro"></div>
              <div class="panel panel-default" style="width:100%;height:400px; overflow-y:scroll;">
                    <div class="panel-body" id="dvdCronograma">
                    </div>
              </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnDescartar" style="display:none">Descartar</button>
            <button type="button" class="btn btn-primary" id="btnGuardarCronograma">Guardar</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>            
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal de detalles de proceso -->
    </div>
    <script type="text/javascript" src="js/GesMisProcesos.js"></script>
</asp:Content>
