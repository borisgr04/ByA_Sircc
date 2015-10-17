<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesSolicitudesT.aspx.cs" Inherits="wfSircc.Solicitudes.ConsultasT.GesSolicitudesT" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <ul class="nav nav-tabs">
        <li><a href="PanelConsT.aspx">Panel de Consolidados</a></li>
        <li class="active"><a href="GesSolicitudesT.aspx">Consultas Solicitudes</a></li>
        <li><a href="RptSolicitudesT.aspx">Reporte de Solicitudes</a></li>
        <li><a href="GesProcesosT.aspx">Consultas de Procesos</a></li>
        <li><a href="RptProcesosT.aspx">Reporte de Procesos</a></li>
        <li><a href="RptActividades.aspx">Reporte de Actividades</a></li>
        <li><a href="GetActividadesT.aspx">Actividades</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <h4>Consulta de Solicitudes</h4>


            <div class="row">

                <div class="col-md-2">
                    <label>
                        Solicitudes:</label>
                </div>
                <div class="col-md-3">
                    <select id="CboFil" class="form-control input-sm"></select>
                </div>
                <div class="col-md-7">
                    <div class="btn-toolbar">
                        <button type="button" value="Consultar" id="BtnConsulta" data-loading-text="Loading..." class="btn btn-warning">
                            <span class="glyphicon glyphicon-search"></span>Consultar
                        </button>
                        <button type="button" value="Consultar" id="BtnFullScreen" data-loading-text="Loading..." class="btn btn-primary">
                            <span class="glyphicon glyphicon-fullscreen"></span>Tabla
                        </button>

                        <button type="button" value="Consultar" id="BtnFullScreenP" data-loading-text="Loading..." class="btn btn-danger">
                            <span class="glyphicon glyphicon-fullscreen"></span>Pagina
                        </button>

                        <button type="button" value="Editar" id="BtnExcel" class="btn btn-success">
                            <span class="glyphicon glyphicon-export"></span>Excel
                        </button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <br />
                </div>
            </div>

            <div id="jqxgridSol">
            </div>
            <div id="secDetalle"></div>


        </div>
    </div>
    <script src="js/GesSolicitudesT.js"></script>

</asp:Content>
