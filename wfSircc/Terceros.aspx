<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Terceros.aspx.cs" Inherits="wfSircc.Terceros" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="page-header">
        <h1>Radicación de Contrato
								<small>
                                    <i class="icon-double-angle-right"></i>
                                    Common form elements and layouts
                                </small>
        </h1>
    </div>

    <div class="widget-header">
        <h4>Información del Contrato</h4>
    </div>
    <div class="widget-body">
        <div class="widget-main">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-3">
                        <div class="input-group">
                            <input type="text" class="form-control" id="txtNumero" />
                            <div class="input-group-btn ">
                                <button type="button" id="BtnDwnAbrir" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                    <span class="icon-folder-open-alt"></span>
                                    Abrir <span class="caret"></span>
                                </button>
                                
                            </div>
                            <!-- /btn-group -->
                        </div>
                        <!-- /input-group -->
                    </div>
                    <!-- /.col-lg-9 -->
                    <div class="col-lg-9">
                        <div class="btn-toolbar">
                            <button type="button" class="btn btn-warning" id="nuevoButton">
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Nuevo</button>
                            <button type="button" class="btn btn-primary" id="editarButton">
                                <span class="glyphicon glyphicon-pencil"></span>
                                Editar</button>

                            <button type="button" class="btn btn-success" id="guardarButton">
                                <span class="glyphicon glyphicon-floppy-saved"></span>
                                Guardar</button>
                            <button type="button" class="btn btn-danger" id="cancelarButton">
                                <span class="glyphicon glyphicon-remove"></span>
                                Cancelar</button>

                            <button type="button" value="Nuevo" id="BtnAsignar" class="btn btn-info">
                                <span class="glyphicon glyphicon-hand-right"></span>&nbsp Asignar
                            </button>

                            <%--<a class="btn btn-danger" href="javascript:history.back(1)" title="Volver Atrás">
                            <span class="glyphicon glyphicon-arrow-left"></span>
                            &nbsp Atrás</a>--%>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <div class="form-horizontal">
                <div class="row">
                    <div class="space-24"></div>
                    <div class="form-group">
                        <label for="CboTipNro" class="col-sm-2 control-label">Tipo  Identificación</label>
                        <div class="col-sm-3">
                            <select id="CboTipNro" class="form-control input-sm cbo"></select>

                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtNroDoc' class="col-sm-2 control-label">Número  Identificación </label>
                        <div class="col-xs-5">
                            <input id='txtNroDoc' type="text" placeholder="No de docuemnto" class="form-control input-sm" />
                        </div>
                    </div>



                    <div class="form-group">
                        <label for='txtLugExp' class="col-sm-2 control-label">lugar de Expedición </label>
                        <div class="col-sm-5">
                            <input id='txtLugExp' type="text" class="form-control input-sm" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtPrimApe' class="col-sm-2 control-label">Primer Apellido </label>
                        <div class="col-sm-5">
                            <input id='txtPrimApe' type="text" class="form-control input-sm" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtSegApe' class="col-sm-2 control-label">Segundo Apellido </label>
                        <div class="col-sm-5">
                            <input id='txtSegApe' type="text" class="form-control input-sm" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtPrimNom' class="col-sm-2 control-label">Primer Nombre </label>
                        <div class="col-sm-5">
                            <input id='txtPrimNom' type="text" class="form-control input-sm" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtSegmNom' class="col-sm-2 control-label">Segundo Nombre </label>
                        <div class="col-sm-5">
                            <input id='txtSegmNom' type="text" class="form-control input-sm" />
                        </div>
                    </div>


                    <div class="form-group">
                        <label for='txtFecNac' class="col-sm-2 control-label">Fecha de Nacimiento </label>
                        <div class="col-sm-5">
                            <input id='txtFecNac' type="text" class="form-control input-sm" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtRazSoc' class="col-sm-2 control-label">Razón Social </label>
                        <div class="col-sm-5">
                            <input id='txtRazSoc' type="text" class="form-control input-sm" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtDir' class="col-sm-2 control-label">Dirección </label>
                        <div class="col-sm-5">
                            <input id='txtDir' type="text" class="form-control input-sm" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtEma' class="col-sm-2 control-label">Email </label>
                        <div class="col-sm-5">
                            <input id='txtEma' type="text" class="form-control input-sm" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtTel' class="col-sm-2 control-label">Telefono </label>
                        <div class="col-sm-5">
                            <input id='txtTel' type="text" class="form-control input-sm" />
                        </div>
                    </div>


                    <div class="form-group">
                        <label for='CboEst' class="col-sm-2 control-label">Estado </label>
                        <div class="col-sm-3">
                            <select id="cbotEst" class="form-control input-sm cbo"></select>

                        </div>
                    </div>


                    <div class="form-group">
                        <label for='CboTpTer' class="col-sm-2 control-label">Tipo de Tercero </label>
                        <div class="col-sm-3">
                            <select id="CboTpTer" class="form-control input-sm cbo"></select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for='CboClasf' class="col-sm-2 control-label">Clasificación </label>
                        <div class="col-sm-3">
                            <select id="CboClasf" class="form-control input-sm cbo"></select>

                        </div>
                    </div>

                    <div class="form-group">
                        <label for='txtObs' class="col-sm-2 control-label">Observación </label>
                        <div class="col-sm-5">
                            <textarea id='txtObs' rows="6" class="form-control input-sm"></textarea>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
    
    <script src="js/Terceros.js" type="text/javascript"></script>
</asp:Content>
