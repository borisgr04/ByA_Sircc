<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/SiteBS.Master" CodeBehind="gPproponentes.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.gPproponentes1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="msgResult">
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="btn-toolbar"> 
                    <%--<button type="button" value="Nuevo" id="BtnDetalles" class="btn btn-info" title="Registrar Nueva Solicitud de Contratación.">
                        <span class="glyphicon glyphicon-search"></span>Detalles
                    </button>--%>
                    <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-success" title="Registrar Nueva Solicitud de Contratación.">
                        <span class="glyphicon glyphicon-plus"></span>Nuevo
                    </button>
                    <button type="button" value="Editar" id="BtnEditar" class="btn btn-primary" title="Editar Solicitud Actual">
                        <span class="glyphicon glyphicon-pencil"></span>Editar
                    </button>   
                    <button type="button" value="Editar" id="btnAgregarMiembros" class="btn btn-info" title="Editar Solicitud Actual">
                        <span class="glyphicon glyphicon-plus"></span>Agregar Miembros
                    </button>   
                    <button type="button" class="btn btn-sm btn-info" id="btnAdjudicar">
                        <span class="glyphicon glyphicon-pencil"></span>
                        Adjudicar</button>    
                    <%--<button type="button" class="btn btn-sm btn-success" id="btnVolverAtras">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        Atrás</button> --%>           
                    <button type="button" value="Nuevo" id="BtnEliminar" class="btn btn-danger detalle">
                        <span class="glyphicon glyphicon-minus"></span>Quitar
                    </button>  
                    <button type="button" value="Atras" id="btnAtras" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-chevron-left"></span>Atrás</button>          
                    
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="panel-group Separar" id="accordion">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseProc">+ <b>PROCESO N°:</b> <span class="Nproc"></span>
                                </a>
                            </div>
                            <div id="collapseProc" class="panel-collapse collapse out">
                                <div class="panel-body">
                                    <div class="container">
                                        <div class="row">
                                            <div id="dvdProc" ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </div>

    <div class="row"><br /></div>

    <div id="jqxgridProponentes">
    </div>
    <style>
        .Separar {
            margin:5px
        }
    </style>
    <div id="secDetalle"></div>
    <div class="modal fade" id="modalAdjudicar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H2">Adjudicacion</h4>
                </div>
                <div class="modal-body">
                    <div class="row Separar">
                        <div class="col-lg-3 text-right">
                            <label>Id. Proponente</label>
                        </div>
                        <div class="col-lg-2">
                            <input type="text" class="form-control" id="txtIdProponenteAdjudicar" disabled="disabled" />
                        </div>
                    </div>
                    <div class="row Separar">
                        <div class="col-lg-3 text-right">
                            <label>Adjudicado</label>
                        </div>
                        <div class="col-lg-5">
                            <select class="form-control" id="cboAdjudicado">
                                <option selected="selected" value="N">NO</option>
                                <option value="S">SI</option>
                            </select>
                        </div>
                    </div>
                    <div class="row Separar">
                        <div class="col-lg-3 text-right">
                            <label>Fecha de adjudicacion</label>
                        </div>
                        <div class="col-lg-5">
                            <input type="date" class="form-control" id="txtFechaAdjudicado"/>
                        </div>
                    </div>
                    <div class="row Separar">
                        <div class="col-lg-3 text-right">
                            <label>Observación</label>
                        </div>
                        <div class="col-lg-5">
                            <textarea class="form-control" id="txtObservacionAdjudicacion" rows="2"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnGuardarAdjudicado" class="btn btn-success">Guardar</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <script src="js/gPproponentes.js"></script>
</asp:Content>
