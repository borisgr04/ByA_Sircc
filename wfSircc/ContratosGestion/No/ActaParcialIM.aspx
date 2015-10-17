<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ActaParcialIM.aspx.cs" Inherits="wfSircc.ContratosGestion.ActaParcialIM" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <%--<ul class="nav nav-tabs" id="tbACTAS">
        <li><a href="#infcon" data-toggle="tab">1. Informes del Contratista</a></li>
        <li><a href="#actasup" data-toggle="tab">2. Diligencia Documento</a></li>
        <li><a href="#gendoc" data-toggle="tab">3. Generar Documento</a></li>
    </ul>

    <div class="tab-content">


        <div class="tab-pane" id="infcon">

            <div class="row">
                <div class="col-md-3">
                    
                </div>
                <div class="col-md-9">
                    <div class="btn-toolbar">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default" id="BtnVerInforme">
                                <span class="glyphicon glyphicon-floppy-saved"></span>
                                Informe</button>
                            <button type="button" class="btn btn-default" id="BtnSS">
                                <span class="glyphicon glyphicon-remove"></span>
                                Seguridad Social</button>
                            <button type="button" class="btn btn-default" id="BtnActSer">
                                <span class="glyphicon glyphicon-remove"></span>
                                Produtos/Servicios</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>

        <div class="tab-pane" id="actasup">--%>
            <div id="registro">
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn-toolbar">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default" id="guardarButton">
                                    <span class="glyphicon glyphicon-floppy-saved"></span>
                                    Guardar</button>
                                <button type="button" class="btn btn-default" id="cancelarButton">
                                    <span class="glyphicon glyphicon-remove"></span>
                                    Cancelar</button>
                            </div>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default" id="imprimirButton">
                                    <span class="glyphicon glyphicon-print"></span>
                                    Imprimir</button>
                            </div>
                            <div class="btn-group">
                                <a class="btn btn-default" href="javascript:history.back(1)" title="Volver Atrás">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    &nbsp Atrás</a>
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->
                </div>
                <div class="row">
                    &nbsp
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <label for="cboInformes">
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
                        <input id='txtFecIni' type="date" class="form-control input-sm" />
                    </div>
                    <div class="col-md-6">
                        <label for="txtFecFin">
                            Fecha Final
                        </label>
                        <input id='txtFecFin' type="date" class="form-control input-sm" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label for="CboAutPag">
                            Autoriza pago
                        </label>
                        <select id="CboAutPag" class="form-control input-sm">
                            <option value="">Seleccione..</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="txtValPago">
                            Valor Autorizado a Pagar 
                        </label>
                        <input id='txtValPago' type="text" class="form-control input-sm currency" />
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

     <%--   </div>
        <div class="tab-pane" id="gendoc">m</div>
    </div>--%>


    <script src="js/ActaParcialIM.js"></script>
</asp:Content>
