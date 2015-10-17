<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesProcesosT.aspx.cs" Inherits="wfSircc.Solicitudes.ConsultasT.GesProcesosT" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/Content/Bootstrap_Personalize/css/byaSIRCC.css" rel="stylesheet" />
    <ul class="nav nav-tabs">
        <li><a href="PanelConsT.aspx">Panel de Consolidados</a></li>
        <li><a href="GesSolicitudesT.aspx">Consultas Solicitudes</a></li>
        <li><a href="RptSolicitudesT.aspx">Reporte de Solicitudes</a></li>
        <li class="active"><a href="GesProcesosT.aspx">Consultas de Procesos</a></li>
        <li><a href="RptProcesosT.aspx">Reporte de Procesos</a></li>
        <li><a href="RptActividades.aspx">Reporte de Actividades</a></li>
        <li><a href="GetActividadesT.aspx">Actividades</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <h3>Consulta de Procesos de Contratación </h3>
            <div id="msgResult">
            </div>
            <div class="row">
                <div class="col-xs-4">
                    <label>Delegación:</label>
                    <select id="CboDepDel" class="form-control input-sm"></select>
                </div>

                <div class="col-xs-4">
                    <label for="cboFun" class="control-label">
                        Funcionario encargado:
                    </label>
                    <select id="cboFun" class="form-control"></select>
                </div>
            </div>
            <div class="row">
                &nbsp
            </div>
            <div class="row">
                <div class="col-md-1">
                </div>
                <div class="col-md-11">
                    <div class="btn-toolbar">

                        <button type="button" value="Consultar" id="BtnConsulta" data-loading-text="Loading..." class="btn btn-warning">
                            <span class="glyphicon glyphicon-search"></span>Actualizar
                        </button>

                        <button type="button" value="Consultar" id="BtnDetalle" data-loading-text="Loading..." class="btn btn-danger">
                            <span class="glyphicon glyphicon-eye-open"></span>Detalle
                        </button>

                        <%--<button type="button" value="Consultar" id="BtnCronograma" data-loading-text="Loading..." class="btn btn-primary">
                    <span class="glyphicon glyphicon-calendar"></span>Cronograma
                </button>--%>

                        <%--<button type="button" value="Consultar" id="Button1" data-loading-text="Loading..." class="btn btn-primary">
                            <span class="glyphicon glyphicon-remove-circle"></span>Filtros
                        </button>--%>

                        <button type="button" value="Consultar" id="BtnFullScreen" data-loading-text="Loading..." class="btn btn-primary">
                            <span class="glyphicon glyphicon-fullscreen"></span>Tabla
                        </button>

                        <button type="button" value="Consultar" id="BtnFullScreenP" data-loading-text="Loading..." class="btn btn-info">
                            <span class="glyphicon glyphicon-fullscreen"></span>Pagina
                        </button>

                        <button type="button" value="Editar" id="BtnExcel" class="btn btn-success">
                            <span class="glyphicon glyphicon-export"></span>Excel
                        </button>
                        <input type="checkbox" id="chkAgrupar" />
                        Agrupar

                    </div>
                </div>

            </div>
            <hr />
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
                    <h4 class="modal-title" id="H2">Actividades del Proceso</h4>
                </div>
                <div class="modal-body">
                    <div id="gridCrono">
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



    <script src="js/GesProcesosT.js"></script>

</asp:Content>
