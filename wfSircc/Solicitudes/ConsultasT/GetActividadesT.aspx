<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GetActividadesT.aspx.cs" Inherits="wfSircc.Solicitudes.ConsultasT.GetActividadesT" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/Content/Bootstrap_Personalize/css/byaSIRCC.css" rel="stylesheet" />
    
    <ul class="nav nav-tabs">
        <li><a href="PanelConsT.aspx">Panel de Consolidados</a></li>
        <li><a href="GesSolicitudesT.aspx">Consultas Solicitudes</a></li>
        <li><a href="RptSolicitudesT.aspx">Reporte de Solicitudes</a></li>
        <li><a href="GesProcesosT.aspx">Consultas de Procesos</a></li>
        <li><a href="RptProcesosT.aspx">Reporte de Procesos</a></li>
        <li><a href="RptActividades.aspx">Reporte de Actividades</a></li>
        <li class="active"><a href="GetActividadesT.aspx">Actividades</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
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
     <script src="js/GetActividades.js"></script>
</asp:Content>
