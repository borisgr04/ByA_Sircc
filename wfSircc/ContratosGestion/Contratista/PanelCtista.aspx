<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="PanelCtista.aspx.cs" Inherits="wfSircc.ContratosGestion.Contratista.PanelCtista" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container">
        <!-- /.row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="panel-body">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#" data-toggle="tab">Mis Contratos</a></li>
                        
                    </ul>
                    <div class="tab-content">
                        <div id="tabCto" class="tab-pane in active">
                            <div class="list-group" id="dvdCto">
                            </div>    
                        </div>
                        <div class="text-right">
                            <a href="/ContratosGestion/Contratista/GesContratos.aspx">Ver más <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    </div>
                    
                    
                </div>
            </div>
        
        <div class="row">
            <div class="col-lg-6">
                <div class="panel-body">
                    <h3>Informes</h3>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tabBO" data-toggle="tab">Borrador</a></li>
                        <li><a href="#tabAC" data-toggle="tab">Pendientes</a></li>
                        <li><a href="#tabRV" data-toggle="tab">Revisados</a></li>
                        <li><a href="#tabRC" data-toggle="tab">Rechazados</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="tabBO" class="tab-pane in active">
                            <div class="list-group" id="dvdActBO">
                            </div>
                        </div>
                        <div id="tabAC" class="tab-pane in ">
                            <div class="list-group" id="dvdActAC">
                            </div>
                        </div>
                        <div id="tabRV" class="tab-pane in ">
                            <div class="list-group" id="dvdActRV">
                            </div>
                        </div>
                        <div id="tabRC" class="tab-pane in ">
                            <div class="list-group" id="dvdActRC">
                            </div>
                        </div>
                    </div>

                    <%--    <div class="text-right">
                            <a href="#">Ver más <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>--%>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="panel-body">
                    <h3>Cuentas</h3>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tabPR" data-toggle="tab">Por Revisar</a></li>
                        <li><a href="#tabCT" data-toggle="tab">Contabilidad</a></li>
                        <li><a href="#tabTS" data-toggle="tab">Tesoreria</a></li>
                        <li><a href="#tabAR" data-toggle="tab">Archivo</a></li>
                    </ul>
                    <div class="tab-content">

                        <div id="tabPR" class="tab-pane in active">
                            <div class="list-group" id="dvdActPR">
                            </div>
                        </div>
                        <div id="tabCT" class="tab-pane in ">
                            <div class="list-group" id="dvdActCT">
                            </div>
                        </div>
                        <div id="tabTS" class="tab-pane in ">
                            <div class="list-group" id="dvdActTS">
                            </div>
                        </div>
                        <div id="tabAR" class="tab-pane in ">
                            <div class="list-group" id="dvdActAR">
                            </div>
                        </div>
                    </div>


                    <%--<div class="text-right">
                        <a href="#">Ver Todas las devoluciones <i class="fa fa-arrow-circle-right"></i></a>
                    </div>--%>
                </div>
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>

    
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="http://cdn.oesmith.co.uk/morris-0.4.3.min.js"></script>
    <script src="js/Morris.js"></script>
    <script src="js/PanelCtista.js"></script>
    <script>
        $(function () {
            $("table").tablesorter({ debug: true });
        });
    </script>
</asp:Content>
