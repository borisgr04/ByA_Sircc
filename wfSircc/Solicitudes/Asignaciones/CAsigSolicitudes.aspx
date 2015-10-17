<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="CAsigSolicitudes.aspx.cs" Inherits="wfSircc.Solicitudes.Asignaciones.CAsigSolicitudes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    
    <!-- Button trigger modal -->
    <%--<a data-toggle="modal" href="#myModal" class="btn btn-primary btn-lg">Launch demo modal</a>--%>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Asignación de Solicitude a Funcionarios</h4>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="col-md-3">
                            <label for="txtNSolAs" class="control-label">N° de Solicitud:</label>
                            <input id='txtNSolAs' title="Número de Solicitud." class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-3">
                            <label for="txtEstadoAs" class="control-label">Estado:</label>
                            <input id='txtEstadoAs' title="Estado." class="form-control input-sm" disabled />
                        </div>
                        <div class="col-md-6">
                            <label for="txtFecRecAs" class="control-label">Fecha Recibido:</label>
                            <input id='txtFecRecAs' title="Fecha de Recibido por el abogado." class="form-control input-sm" disabled />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="txtObjConAs" class="control-label">Objeto a Contratar</label>
                            <textarea id="txtObjConAs" class="form-control" title="Objeto a contratar" rows="2" disabled></textarea>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-12">
                            <label for="cboFun" class="control-label">
                                Funcionario encargado:
                            </label>
                            <select id="cboFun" class="form-control"></select>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="BtnGuardar" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->



    <div class="row">
        &nbsp
    </div>

    <div id="msgResult">
    </div>
    <div class="row">
        <div class="col-md-2">
            <h6>Delegación:</h6>
        </div>
        <div class="col-md-4">
            <select id="CboDepDel" class="form-control input-sm"></select>
        </div>
        <div class="col-md-6">
            <div class="btn-toolbar">
                <div class="btn-group">
                    <button type="button" value="Consultar" id="BtnConsulta" data-loading-text="Loading..." class="btn btn-default">
                        <span class="glyphicon glyphicon-search"></span>Consultar
                    </button>
                    <button type="button" value="Nuevo" id="BtnDetalle" class="btn btn-default">
                        <span class="glyphicon glyphicon-zoom-in"></span>&nbsp Detalle
                    </button>
                </div>
                <div class="btn-group">
                    <button type="button" value="Nuevo" id="BtnAsignar" class="btn btn-primary">
                        <span class="glyphicon glyphicon-hand-right"></span>&nbsp Asignar
                    
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-2">
        </div>
        <div class="col-md-2">
        </div>

    </div>
    <div class="row">
        &nbsp
    </div>

    <div id="jqxgridSol">
    </div>

    <div id="secDetalle"></div>


    <script src="js/CAsigSolicitudes.js"></script>

</asp:Content>
