<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ActaParcialIM.aspx.cs" Inherits="wfSircc.ContratosGestion.Supervisor.ActaParcialIM" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

   <div id="DetContrato" style="height: 150px; overflow: auto">
        </div>
    <hr />
            <div id="registro">
                <%--barra de herramientas--%>
                <div class="row">
                    <div class="col-md-7">
                        </div>
                    <div class="col-md-5">
                        <div class="btn-toolbar">
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary" id="guardarButton">
                                    <span class="glyphicon glyphicon-floppy-saved"></span>
                                    Guardar</button>
                                <button type="button" class="btn btn-warning" id="cancelarButton">
                                    <span class="glyphicon glyphicon-remove"></span>
                                    Cancelar</button>
                            </div>
                            <div class="btn-group">
                                <button type="button" class="btn btn-success" id="imprimirButton">
                                    <span class="glyphicon glyphicon-print"></span>
                                    Imprimir</button>
                            </div>
                            <div class="btn-group">
                                <a class="btn btn-danger" href="javascript:history.back(1)" title="Volver Atrás">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    &nbsp Atrás</a>
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->
                </div>
                <%--fin barra de herramientas--%>
                <div class="row">
                    &nbsp
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <label for="cboInfoCon">
                        Informe del Contratista
                    </label>
                    <select id="cboInfoCon" class="form-control input-sm">
                    </select>
                    &nbsp
                    </div>
                </div>

                <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseDES_INF">Resumen del Informe
                                </a>
                            </h4>
                        </div>
                        <div id="collapseDES_INF" class="panel-collapse collapse">
                            <div class="panel-body">
                                <textarea id="txtDES_INF" disabled
                                    placeHolder="Digite un Resumen del Informe adjunto. Actividades desarrolladas"
                                     class="form-control" title="Resumen del Informe" rows="10"></textarea>
                            </div>
                        </div>
                    </div>

                <div class="row">
                    <div class="col-md-6">
                        <label for="txtIdActa">
                            Id Acta
                        </label>
                        <input id='txtIdActa' readonly="true" type="number" class="form-control input-sm" />
                    </div>
                    <div class="col-md-6">
                        <label for="txtFecAct">
                            Fecha del Acta 
                        </label>
                        <input id='txtFecAct' type="date" class="form-control input-sm" />
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <label for="txtFecIni">
                            Fecha Inicial
                        </label>
                        <input id='txtFecIni' type="date" class="form-control input-sm" disabled />
                    </div>
                    <div class="col-md-6">
                        <label for="txtFecFin">
                            Fecha Final
                        </label>
                        <input id='txtFecFin' type="date" class="form-control input-sm" disabled/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label for="CboAutPag">
                            Autoriza pago
                        </label>
                        <select id="CboAutPag" class="form-control input-sm" disabled>
                            <option value="">Seleccione..</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="txtValPago">
                            Valor Autorizado a Pagar 
                        </label>
                        <input id='txtValPago' type="text" class="form-control input-sm currency" disabled />
                    </div>

                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <label for="txtObjAct">
                            Observaciones
                        </label>
                        <textarea id="txtObjAct" class="form-control input-sm" rows="3" placeholder="Observaciones del Documento"></textarea>
                    </div>
                </div>
            </div>

    
    <script src="js/ActaParcialIM.js"></script>
</asp:Content>
