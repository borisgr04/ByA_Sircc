<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="DetCuenta.aspx.cs" Inherits="wfSircc.ControlPagos.Contabilidad.DetCuenta" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="row">
        <div class="col-md-12">
            <div class="col-md-3">
                <div class="input-group">
                    <input type="text" class="form-control" id="txtIdActa">
                    <span class="input-group-btn">
                        <button class="btn btn-info" type="button" id="BtnBuscar">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                    <!-- /btn-group -->
                </div>
                <!-- /input-group -->
            </div>
            <!-- /.col-lg-9 -->
            <div class="col-lg-9">
                <div class="btn-toolbar">

                    <button type="button" value="Nuevo" id="BtnRecibir" class="btn btn-danger">
                        <span class="glyphicon glyphicon-hand-up"></span>Recibir
                    </button>

                    <button type="button" value="Editar" id="BtnRevisar" class="btn btn-warning">
                        <span class="glyphicon glyphicon-eye-open"></span>Devolver
                    </button>

                    <button type="button" value="Editar" id="BtnTramitar" class="btn btn-success">
                        <span class="glyphicon glyphicon-send"></span>Tramitar
                    </button>

                    <a class="btn btn-primary" href="javascript:history.back(1)" title="Volver Atrás">
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

    <ul class="nav nav-tabs">
        <li class="active"><a href="#acta" data-toggle="tab">Información del Actas</a></li>
        <li><a href="#contrato" data-toggle="tab">Información de Contrato</a></li>
    </ul>
    <div class="tab-content">
        <!-- /.row TAB PARA INFORMACIÓN DEL ACTA -->
        <div class="tab-pane active" id="acta">
            <div class="container">
                &nbsp
                <div class="row">
                    <div class="col-md-2">
                        <label for="txtDoc">
                            Documento
                        </label>
                        <input id='txtDoc' type="text" class="form-control input-sm " disabled />
                    </div>
                    <div class="col-md-2">
                        <label for="txtIdActa1">
                            Id Acta
                        </label>
                        <input id='txtIdActa1' readonly="true" type="number" class="form-control input-sm" />
                    </div>

                    <div class="col-md-2">
                        <label for="txtFecAct">
                            Fecha del Acta 
                        </label>
                        <input id='txtFecAct' type="date" class="form-control input-sm" disabled />
                    </div>
                    <div class="col-md-2">
                        <label for="txtAutPag">
                            Autoriza pago
                        </label>
                        <input id='txtAutPag' type="text" class="form-control input-sm " disabled />
                    </div>
                    <div class="col-md-2">
                        <label for="txtValPago">
                            Valor Aut. a Pagar 
                        </label>
                        <input id='txtValPago' type="text" class="form-control input-sm currency" disabled />
                    </div>
                    <div class="col-md-2">
                        <label for="txtEstAct">
                            Estado
                        </label>
                        <input id='txtEstAct' type="text" class="form-control input-sm currency" disabled />
                    </div>
                </div>


            </div>
        </div>

        <!-- /.row TAB PARA INFORMACIÓN BÁSICA DEL CONTRATO -->
        <div class="tab-pane" id="contrato">
            <div class="container">
                &nbsp
                <div class="row">
                    <div class="col-md-3">
                        <label for="txtCodCon">
                            Número:
                        </label>
                        <input id='txtCodCon' class="form-control input-sm" disabled />
                    </div>
                    <div class="col-md-3">
                        <label for="txtDepSol">
                            Dependencia Solicitante:</label>
                        <input id='txtDepSol' class="form-control input-sm" disabled />
                    </div>

                    <div class="col-md-3">
                        <label for="txtValTot">
                            Valor a Contratar:
                        </label>
                        <div class="input-group">
                            <span class="input-group-addon">$</span>
                            <input id='txtValTot' type="text" title="Especifique El Valor Total a Contratar." class="form-control input-sm " disabled />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <label for="txtEstado">Estado:</label>
                        <input id='txtEstado' class="form-control input-sm" disabled />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label for="txtContratista">
                            Contratista
                        </label>
                        <input id="txtContratista" class="form-control input-sm" disabled />
                    </div>

                    <div class="col-md-6">
                        <label for="txtSupervisor">
                            Supervisor/Interventor</label>
                        <input id="txtSupervisor" class="form-control input-sm" disabled />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label>
                            Objeto a Contratar</label>
                        <textarea id="txtObjCon" class="form-control input-sm" rows="3" placeholder="Digite Objeto a Contratar" disabled></textarea>
                    </div>
                </div>

            </div>




        </div>

        <div class="tab-pane" id="rp">
            <div id="jqxgridSol">
            </div>

        </div>
    </div>
    <br />
    <div id="secDetalle"></div>

    <div class="modal fade" id="modalRecibir" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H2">Recepción de Cuentas</h4>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="col-md-12">
                            <div id="LbMsg"></div>
                        </div>
                        <div class="col-md-4">
                            <label for="txtFec">
                                Fecha 
                            </label>
                            <input id='txtFec' type="date" class="form-control input-sm" />
                        </div>
                        <div class="col-md-4">
                            <label for="txtIdRecCD">
                                N° de Control
                            </label>
                            <input id='txtIdRecCD' type="text" class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-4">
                            <label for="txtEstCD">
                                Estado
                            </label>
                            <select id="txtEstCD" class="form-control input-sm" disabled>
                                <option value="RE">Recibido</option>
                                <option value="DE">Devuelto</option>
                                <option value="AC">Aceptado</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <label>
                                Observación</label>
                            <textarea id="txtObs" class="form-control input-sm" rows="3" placeholder="Digite Observación"></textarea>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="BtnGuardar" class="btn btn-primary" autofocus>Recibir</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

     
    <script src="js/DetCuenta.js"></script>
    
</asp:Content>
