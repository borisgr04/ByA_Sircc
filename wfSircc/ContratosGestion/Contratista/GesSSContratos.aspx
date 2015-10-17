<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesSSContratos.aspx.cs" Inherits="wfSircc.ContratosGestion.Contratista.GesSSContratos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

        

        <div id="DetContrato" style="height: 150px; overflow: auto">
        </div>

        <hr />

        <ul class="nav nav-tabs">
            <li><a href="#" id="hrefInf" data-toggle="tab">1. Informes</a></li>
            <li class="active"><a href="#" data-toggle="tab">2. Seguridad Social</a></li>
            <li><a href="#" id="hrefDoc" data-toggle="tab">3. Documentos</a></li>
        </ul> 
        <div class="tab-content">
            <div id="tabCto" class="tab-pane in active">
                  <ul class="nav navbar-nav navbar-right">
                    <li>
                        <div class="navbar-form navbar-right">
                            <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-warning" title="Registrar Nuevo Acta.">
                                <span class="glyphicon glyphicon-plus"></span>Nuevo
                            </button>
                            <button type="button" value="Editar" id="BtnEditar" class="btn btn-success" title="Editar Acta">
                                <span class="glyphicon glyphicon-pencil"></span>Editar
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
    
    <!-- Modal -->
    <div class="modal fade" id="modalDetalle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H1">Detalle del Seguridad Social</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 alert-dismissable" id="dvdMsg">
                            <%--<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>--%>
                            <span id="lbMsg" class="control-label"></span>
                        </div>
                        <div class="col-md-3" id="dvdTIPO_PLA">
                            <label for="txtTIPO_PLA" class="control-label">Tipo Plantilla</label>
                            <select id="txtTIPO_PLA" class="form-control input-sm">
                                <option value="N">Normal</option>
                                <option value="C">Corrección</option>
                            </select>
                        </div>
                        <div class="col-md-3" id="dvdPLANILLAN">
                            <label for="txtPLANILLAN" class="control-label">Planilla N°</label>
                            <input id='txtPLANILLAN' title="Planilla" class="form-control input-sm validar" autofocus />
                        </div>
                        <div class="col-md-3" id="dvdYEAR_PAGO">
                            <label for="txtYEAR_PAGO" class="control-label">Año Aporte</label>
                            <input id='txtYEAR_PAGO' type="number" title="Fecha del Informe" class="form-control input-sm validar" />
                        </div>
                        <div class="col-md-3">
                            <label for="txtMES_PAGO" class="control-label">Mes Aporte </label>
                            <select id="txtMES_PAGO" class="form-control input-sm">
                                <option value="01">ENERO</option>
                                <option value="02">FEBRERO</option>
                                <option value="03">MARZO</option>
                                <option value="04">ABRIL</option>
                                <option value="05">MAYO</option>
                                <option value="06">JUNIO</option>
                                <option value="07">JULIO</option>
                                <option value="08">AGOSTO</option>
                                <option value="09">SEPTIEMBRE</option>
                                <option value="10">OCTUBRE</option>
                                <option value="11">NOVIEMBRE</option>
                                <option value="12">DICIEMBRE</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                    </div>
                    <%--<div class="row">
                        <div class="col-md-6" id="dvdIBC">
                            <label for="txtIBC" class="control-label">Año Aporte</label>
                            <input id='txtIBC' type="number" title="Ingreso base de cotización [40% del valor Mensual]" class="form-control input-sm validar" />
                        </div>
                        <div class="col-md-6">
                            <label for="cboRiesgos" class="control-label">Tipo de Riesgo</label>
                            <select id="cboRiesgos" class="form-control input-md ">
                              </select>
                        </div>
                    </div>--%>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="txtOBS" class="control-label">Observación</label>
                            <textarea id="txtOBS"
                                placeholder="Digite una Observación"
                                class="form-control" title="Resumen del Informe" rows="1"></textarea>
                        </div>
                    
                    </div>
                    
                    <div class="table-responsive">
                        <table class="table table-condensed">
                            <thead>
                                <tr>
                                    <th style="width: 50%">Clase de Aporte</th>
                                    <th>Valor del Aporte</th>
                                </tr>
                            </thead>
                            <tbody class="table-hover">
                                <tr>
                                    <td>Salud</td>
                                    <td>
                                        <div id="dvdVAL_SALUD">

                                            <div class="input-group">
                                                <span class="input-group-addon">$</span>
                                                <input id='txtVAL_SALUD' title="Aportes Salud" class="form-control input-sm currency aportes validar" />
                                            </div>

                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <td>Pensión</td>
                                    <td>
                                        <div id="dvdVAL_PENSION">
                                            <div class="input-group ">
                                                <span class="input-group-addon">$</span>
                                                <input id='txtVAL_PENSION' title="Aportes Pensión" class="form-control input-sm currency aportes validar" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Riesgo
                                    </td>
                                    <td>
                                        <div id="dvdVAL_RIESGOS">
                                            <div class="input-group ">
                                                <span class="input-group-addon">$</span>
                                                <input id='txtVAL_RIESGOS' title="Aportes Riesgos" class="form-control input-sm currency aportes validar" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Parafiscales</td>
                                    <td>
                                        <div id="dvdVAL_PARAF">
                                            <div class="input-group ">
                                                <span class="input-group-addon">$</span>
                                                <input id='txtVAL_PARAF' title="Aportes Parafiscales" class="form-control input-sm currency aportes validar" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total Aportes</td>
                                    <td>
                                        <div id="dvdVAL_APO">
                                            <div class="input-group">

                                                <span class="input-group-addon">$</span>
                                                <input id='txtVAL_APO' title="Total Aportes" class="form-control input-sm currency validar" disabled />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="BtnGuardar" class="btn btn-success">
                        <span class="glyphicon glyphicon-floppy-disk"></span>
                        Actualizar</button>
                    <button type="button" value="Editar" id="BtnAnular" class="btn btn-danger" title="Anular Planilla">
                        <span class="glyphicon glyphicon-remove"></span>Anular
                    </button>
                    <button type="button" id="BtnGuardarN" class="btn btn-primary">
                        <span class="glyphicon glyphicon-floppy-disk"></span>
                        Guardar Nuevo</button>

                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    <script src="js/GesSSContratos.js"></script>
</asp:Content>
