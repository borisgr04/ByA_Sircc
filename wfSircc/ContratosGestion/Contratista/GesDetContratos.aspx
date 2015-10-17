<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesDetContratos.aspx.cs" Inherits="wfSircc.ContratosGestion.Contratista.GesDetContratos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="DetContrato" style="height: 150px; overflow: auto">
        </div>
        <hr />
        <ul class="nav nav-tabs" id="myTab">
            <li class="active"><a href="#Inf" data-toggle="tab">1. Informes</a></li>
            <li><a href="#" id="hrefSS" data-toggle="tab">2. Seguridad Social</a></li>
            <li><a href="#" id="hrefDoc"  data-toggle="tab">3. Documentos</a></li>
        </ul>
        <div class="tab-content">
            <div id="#Inf" class="tab-pane in active">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <div class="navbar-form navbar-right">

                            <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-warning" title="Registrar Nuevo Acta.">
                                <span class="glyphicon glyphicon-plus"></span>Nuevo
                            </button>
                            <button type="button" value="Editar" id="BtnEditar" class="btn btn-success" title="Editar Acta">
                                <span class="glyphicon glyphicon-pencil"></span>Editar
                            </button>
                            <button type="button" value="Editar" id="BtnImprimir" class="btn btn-primary" title="Imprimir Acta">
                                <span class="glyphicon glyphicon-print"></span>Imprimir
                            </button>
                            <a class="btn btn-danger" href="javascript:history.back(1)" title="Volver Atrás">
                                <span class="glyphicon glyphicon-arrow-left"></span>&nbsp Atrás</a>

                        </div>
                    </li>
                </ul>
                <div class="row">
                    &nbsp
                </div>

                <div id="jqxgridSol">
                </div>
            </div>
        </div>

        <hr />
        <ul class="nav navbar-nav navbar-right">
            <li>
                <div class="navbar-form navbar-right">
                    <button type="button" value="S.Social" id="BtnSS" class="btn btn-info" title="Seguridad Social">
                        <span class="glyphicon glyphicon-check"></span>S. Social
                    </button>
                    <button type="button" value="S.Social" id="BtnDoc" class="btn btn-primary" title="Seguridad Social">
                        <span class="glyphicon glyphicon-paperclip"></span>Adjuntos
                    </button>
                    
                </div>
            </li>

        </ul>


    

    <!-- Modal -->
    <div class="modal fade" id="modalDetalle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog custom-class">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H1">Detalle del Informe</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-2">
                            <label for="txtTIP_INF" class="control-label">Tipo Informe:</label>
                            <select id='txtTIP_INF' title="Tipo de Informe." class="form-control input-sm">
                                <option value="01">Inicial</option>
                                <option value="02">Parcial</option>
                                <option value="03" disabled>Suspensión</option>
                                <option value="04" disabled>Reinició</option>
                                <option value="05">Final</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label for="txtNUM_INF" class="control-label">Informe N°:</label>
                            <input id='txtNUM_INF' title="Informe Número." class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-4">
                            <label for="txtID" class="control-label">Identificador:</label>
                            <input id='txtID' title="Identificador Único" class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-4">
                            <label for="txtEST_INF" class="control-label">Estado</label>
                            <select id='txtEST_INF' title="Estado." class="form-control input-sm">
                                <option value="BO">Borrador</option>
                                <option value="AC">Activo</option>
                                <option disabled value="RV">Revisado</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="txtFEC_INF" class="control-label">Fecha Informe</label>
                            <input id='txtFEC_INF' type="date" title="Fecha del Informe" class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-4">
                            <label for="txtFEC_INI" class="control-label">Fecha Inicio</label>
                            <input id='txtFEC_INI' type="date" title="Fecha del Informe" class="form-control input-sm" />
                        </div>
                        <div class="col-md-4">
                            <label for="txtFEC_FIN" class="control-label">Fecha Final</label>
                            <input id='txtFEC_FIN' type="date" title="Fecha del Informe" class="form-control input-sm" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="txtVAL_PAG" class="control-label">Valor a Pagar</label>
                            <input id='txtVAL_PAG' title="Valor a Pagar" class="form-control input-sm currency" />
                        </div>
                        <div class="col-md-4">
                            <label for="txtOBL_FAC" class="control-label">Factura(DIAN)</label>
                            <select id='txtOBL_FAC' class="form-control input-sm">
                                <option value="SI">Si</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="txtCAN_HOJ" class="control-label">N° Folios </label>
                            <input id='txtCAN_HOJ' title="N° de Folios del Informe" class="form-control input-sm" />
                        </div>

                    </div>
                    <div class="row">
                        &nbsp
                    </div>

                    <div class="panel-group" id="accordion">

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseDES_INF">Resumen del Informe
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseDES_INF" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <textarea id="txtDES_INF"
                                        placeholder="Digite un Resumen del Informe adjunto. Actividades desarrolladas"
                                        class="form-control" title="Resumen del Informe" rows="4"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseNOT_INF">Nota 1
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseNOT_INF" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <%--<label for="txtNOT_INF" class="control-label">Nota 1</label>--%>
                                    <textarea id="txtNOT_INF" placeholder="Nota del documento en la parte inferior" class="form-control" title="Nota Adicional 1" rows="4"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseNOT2_INF">Nota 2
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseNOT2_INF" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <%--<label for="txtNOT2_INF" class="control-label">Nota 2</label>--%>
                                    <textarea id="txtNOT2_INF" placeholder="Nota adicional del documento en la parte inferior" class="form-control" title="Nota Adicional 2" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="BtnGuardar" class="btn btn-primary">Guardar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->


    <!-- Modal -->
    <div class="modal fade" id="modalInfoAct" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog custom-class">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Informe Contratista</h4>
                </div>
                <div class="modal-body">

                    <div id="InfoFile"></div>

                    <div id="dvdemb">
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
    <!-- /.modal -->


    <script src="js/GesDetContratos.js"></script>
    <style>
        @media screen and (min-width: 768px) {
            .custom-class {
                width: 80%; /* either % (e.g. 60%) or px (400px) */
            }
        }
    </style>
</asp:Content>
