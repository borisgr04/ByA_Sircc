<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesMisProcesosnn.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.GesMisProcesos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/Content/Bootstrap_Personalize/css/byaSIRCC.css" rel="stylesheet" />
    <ul class="nav nav-tabs">
        <li><a href="PanelMiGestion.aspx">Panel de Gestión</a></li>
        <li><a href="GesMisSolicitudes.aspx">Mis Solicitudes</a></li>
        <li class="active"><a href="GesMisProcesos.aspx">Mis Procesos</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <h4>Panel de Gestión de Procesos</h4>
    <br />
    <div id="msgResult">
    </div>

    <br />
    <div class="row">
        <div class="col-md-12">
            <div class="btn-toolbar">

                <button type="button" value="Consultar" id="BtnConsulta" data-loading-text="Loading..." class="btn btn-success btn-sm">
                    <span class="glyphicon glyphicon-search"></span>Actualizar
                </button>

                <button type="button" value="Consultar" id="BtnDetalle" data-loading-text="Loading..." class="btn btn-info btn-sm">
                    <span class="glyphicon glyphicon-eye-open"></span>Ver actividades 
                </button>

                <button id="btnElaborarM" data-loading-text="Loading..." class="btn btn-warning btn-sm">
                    <span class="glyphicon glyphicon-eye-open"></span>Elaborar Minuta
                </button>

                <button type="button" value="Consultar" id="BtnCronograma" data-loading-text="Loading..." class="btn btn-danger btn-sm">
                    <span class="glyphicon glyphicon-calendar"></span>Cronograma
                </button>

                <%--<button type="button" value="Consultar" id="Button1" data-loading-text="Loading..." class="btn btn-purple btn-sm">
                    <span class="glyphicon glyphicon-remove-circle"></span>Filtros
                </button>

                <button type="button" value="Consultar" id="BtnFullScreen" data-loading-text="Loading..." class="btn btn-inverse btn-sm">
                    <span class="glyphicon glyphicon-fullscreen"></span>Tabla
                </button>

                <button type="button" value="Consultar" id="BtnFullScreenP" data-loading-text="Loading..." class="btn btn-pink btn-sm">
                    <span class="glyphicon glyphicon-fullscreen"></span>Pagina
                </button>--%>
                <button type="button" value="Editar" id="BtnExcel" class="btn btn-primary btn-sm">
                    <span class="glyphicon glyphicon-export"></span>Excel
                </button>
                <button type="button" value="" id="btnVerProponentes" class="btn btn-primary btn-sm">
                    <span class="glyphicon glyphicon-search"></span>Proponentes
                </button>
                <button type="button" value="Seguimiento" id="btnSeguimiento" class="btn btn-info btn-sm">
                    <span class="glyphicon glyphicon-eye-open"></span>Seguimiento
                </button>
                <button type="button" value="Consultar" id="btnVerDocumentos" class="btn btn-success btn-sm">
                    <span class="glyphicon glyphicon-search"></span>Documentos
                </button>
                <input type="checkbox" id="chkAgrupar" />
                Agrupar
                <div style='width:100%; border-width: 1px;background:#fff' contenteditable='true'>&nbsp</div>
            </div>
        </div>
    </div>
    <br />
    <div class="row">
        <div class="col-md-2">
            <label class="no-padding-right">
                Dependencia:</label>
            <select id="CboDepDel" class="form-control input-sm"></select>
            <br />
                    <div class="list-group" id="dvdEstado">
                    </div>
        </div>
        <div class="col-md-10">
            <div class="row" style="margin:5px">
                <div class="col-lg-1 text-right"><label>Filtro: </label></div>
                <div class="col-lg-8">
                    <div class="input-group">
                        <input style="" id="txtFiltro" class="form-control input-sm " />
                        <div class="input-group-btn ">
                            <button type="button" id="btnBsqFiltro" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                <span class="icon-search"></span>                        
                            </button>                   
                        </div>
                    </div>
                </div>
            </div>
            <div id="jqxgridSol">
            </div>
        </div>

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

    <!-- Modal -->
    <div class="modal fade" id="modalSeguimiento" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H1">Actividades del Proceso</h4>
                </div>
                <div class="modal-body">
                    <div id="lstActividades" style="height:400px;overflow-y:scroll;"></div>
                    
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

    <script src="js/GesMisProcesosnn.js"></script>
</asp:Content>
