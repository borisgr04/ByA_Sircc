<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesContratos.aspx.cs" Inherits="wfSircc.ContratosGestion.GesContratos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div id="msgResult">
    </div>
    <div class="row">
        <div class="col-md-2">
            <label>
                Solicitudes:</label>
        </div>
        <div class="col-md-3">
            <select id="CboFil" class="form-control input-sm"></select>
        </div>
        <div class="col-md-7">
            <div class="btn-toolbar">
                <div class="btn-group">
                    <button type="button" value="Consultar" id="BtnConsulta" data-loading-text="Loading..." class="btn btn-default">
                        <span class="glyphicon glyphicon-search"></span> Consultar
                    </button>
                    <button type="button" value="Nuevo" id="BtnDetalle" class="btn btn-default">
                        <span class="glyphicon glyphicon-zoom-in"></span> Detalle
                    </button>
                </div>
            </div>
        </div>


    </div>
    <div class="row">
        <div class="col-md-12">
            <br />
        </div>
    </div>

    <div id="jqxgridSol">
    </div>


    <!-- Modal -->
    <div class="modal fade" id="modalRecibir" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H1">Recibir Solicitud de Contratación</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="txtNSolRc" class="control-label">N° de Solicitud:</label>
                            <input id='txtNSolRc' title="Número de Solicitud." class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-3">
                            <label for="txtEstadoRc" class="control-label">Estado:</label>
                            <input id='txtEstadoRc' title="Estado." class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-6">
                            <label for="txtFecRecRc" class="control-label">Fecha Recibido:</label>
                            <input id='txtFecRecRc' title="Fecha de Recibido por el abogado." class="form-control input-sm" disabled />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="txtObjConRc" class="control-label">Objeto a Contratar</label>
                            <textarea id="txtObjConRc" class="form-control" title="Objeto a contratar" rows="2" disabled></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="txtObsRc" class="control-label">Observación del Recibido</label>
                            <textarea id="txtObsRc" class="form-control" title="Observación" rows="2"></textarea>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="BtnRecDetalle" class="btn btn-default detalle">Más Detalles</button>
                    <button type="button" id="BtnRecGuardar" class="btn btn-primary">Guardar</button>
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
                    <div class="row">
                        <div class="col-md-3">
                            <label for="txtNSolRv" class="control-label">N° de Solicitud:</label>
                            <input id='txtNSolRv' title="Número de Solicitud." class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-3">
                            <label for="txtEstadoRv" class="control-label">Estado:</label>
                            <input id='txtEstadoRv' title="Estado." class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-6">
                            <label for="txtFecRecRc" class="control-label">Fecha Recibido:</label>
                            <input id='txtFecRecRv' title="Fecha de Recibido por el abogado." class="form-control input-sm" disabled />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="txtObjConRv" class="control-label">Objeto a Contratar</label>
                            <textarea id="txtObjConRv" class="form-control" title="Objeto a contratar" rows="2" disabled></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="cboConceptoRv" class="control-label">Concepto de la Revisión</label>
                            <select id="cboConceptoRv" class="form-control input-sm">
                                <option value="P">Pendiente</option>
                                <option value="A">Aceptado</option>
                                <option value="R">Rechazado</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="txtFecRevRv" class="control-label">Fecha de la Revisión:</label>
                            <input id='txtFecRevRv' title="Fecha de Recibido por el abogado." class="form-control input-sm" disabled />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="txtObsRv" class="control-label">Observación de la Revisión</label>
                            <textarea id="txtObsRv" class="form-control" title="Observación" rows="4"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="BtnRvDetalle" class="btn btn-default detalle">Más Detalles</button>
                    <button type="button" id="BtnRevGuardar" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->


    <div id="secDetalle"></div>


    <script src="js/GesContratos.js"></script>
</asp:Content>
