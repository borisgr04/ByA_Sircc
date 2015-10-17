<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="RegSolicitudes.aspx.cs" Inherits="wfSircc.Solicitudes.RegSolicitudes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="row">

        <div class="row">
            <div class="col-md-12">
                <div class="col-md-3">
                    <div class="input-group">
                        <input type="text" class="form-control" id="txtNumero">
                        <div class="input-group-btn ">
                            <button type="button" id="BtnDwnAbrir" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Abrir <span class="caret"></span></button>
                            <ul class="dropdown-menu pull-right">
                                <li><a href="#" id="BtnAbrirdeEP">
                                    <span class="glyphicon glyphicon-plus-sign"></span>
                                    &nbsp Nuevo Apartir de Estudio Previo</a></li>
                                <li class="divider"></li>
                                <li><a href="#" id="abrirButton">
                                    <span class="glyphicon glyphicon-folder-open"></span>
                                    &nbsp Abrir Solicitud</a></li>
                            </ul>
                        </div>
                        <!-- /btn-group -->
                    </div>
                    <!-- /input-group -->
                </div>
                <!-- /.col-lg-9 -->
                <div class="col-lg-9">
                    <div class="btn-toolbar">
                        <%--<div class="btn-group">--%>
                            <button type="button" class="btn btn-default" id="nuevoButton">
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Nuevo</button>
                            <button type="button" class="btn btn-default" id="editarButton">
                                <span class="glyphicon glyphicon-pencil"></span>
                                Editar</button>
                        <%--</div>
                        <div class="btn-group">--%>
                            <button type="button" class="btn btn-default" id="guardarButton">
                                <span class="glyphicon glyphicon-floppy-saved"></span>
                                Guardar</button>
                            <button type="button" class="btn btn-default" id="cancelarButton">
                                <span class="glyphicon glyphicon-remove"></span>
                                Cancelar</button>

                       <%-- </div>
                        <div class="btn-group">--%>

                            <a class="btn btn-danger" href="javascript:history.back(1)" title="Volver Atrás">
                                <span class="glyphicon glyphicon-arrow-left"></span>
                                &nbsp Atrás</a>
                        <%--</div>--%>

                    </div>
                </div>
            </div>
            <!-- /.row -->
        </div>

        <div class="col-md-12">
            <div class="row">
                &nbsp
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="txtNSol">
                        N° de Solicitud:
                    </label>
                    <input id='txtNSol' title="Número de Solicitud." class="form-control input-sm" />
                </div>
                <div class="col-md-6">
                    <label for="txtIDEP">
                        N° de Estudio Prevo:
                    </label>
                    <input id='txtIDEP' title="Número de Estudio Previo." class="form-control input-sm" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>
                        Fecha de Recibido :</label>
                    <input id="txtFecRec" type="date" class="form-control input-sm date" />

                </div>
                <div class="col-md-6">
                    <label for="CboDepSol">
                        Dependencia solicitante:</label>
                    <select id="CboDepSol" class="form-control input-sm"></select>

                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label>
                        Objeto a Contratar</label>
                    <textarea id="txtObjCon" class="form-control input-sm" rows="3" placeholder="Digite Objeto a Contratar"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="CboDepDel">
                        Dependencia Delegada:</label>
                    <select id="CboDepDel" class="form-control input-sm"></select>
                </div>
                <div class="col-md-6">
                    <label for="CboMod">
                        Modalidad de Selección
                    </label>
                    <select id="CboMod" class="form-control input-sm"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="CboTip">
                        Tipo del Contrato:</label>
                    <select id="CboTip" class="form-control input-sm"></select>
                </div>
                <div class="col-md-6">
                    <label for="CboSubTip">
                        SubTipo del Contrato:</label>
                    <select id="CboSubTip" class="form-control input-sm"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="txtValTot">
                        Valor a Contratar:
                    </label>

                    <input id='txtValTot' title="Especifique El Valor Total a Contratar." class="form-control input-sm currency" />
                </div>
                <%--<div class="col-md-6">
                    <label>
                        Funcionario encargado:
                    </label>
                    <select id="CboFun" class="form-control input-sm"></select>
                    <input id='txtFun' title="Funcionario Encargado" class="form-control input-sm"  disabled/>
                </div>--%>
            </div>

        </div>
    </div>

    <script src="/Solicitudes/js/RegSolicitud.js" type="text/javascript"></script>
</asp:Content>
