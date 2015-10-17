<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="PanelSup.aspx.cs" Inherits="wfSircc.ContratosGestion.Supervisor.PanelSup" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">



    <div class="row">
            <div class="col-lg-3">
                <div class="panel-body">
                   <a href="GesContratos.aspx"> <h3>Contratos</h3> </a>
                 
                    <div class="tab-content">
                        <div id="tabEJ" class="tab-pane in active">
                            <div class="list-group" id="dvdCtos">
                            </div>    
                        </div>
                        <div id="tabTE" class="tab-pane in active">
                            <div class="list-group" id="dvdTE">
                            </div>    
                        </div>
                        <div id="tabLI" class="tab-pane in active">
                            <div class="list-group" id="dvdLI">
                            </div>    
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col-md-9">
            <h3>Contrato ()</h3>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tabAC" data-toggle="tab">Cuentas Por Revisar</a></li>
                        <li><a href="#tabRC" data-toggle="tab">Cuentas Rechazados</a></li>
                        <li><a href="#tabPR" data-toggle="tab">Cuentas para Contabilidad</a></li>
                        <li><a href="#tabCT" data-toggle="tab">Ordenes de Pago</a></li>
                        <li><a href="#tabTS" data-toggle="tab">Pagos </a></li>
                        <li><a href="#tabAR" data-toggle="tab">Archivados </a></li>

                    </ul>
                    <div class="tab-content">
                        <div id="tabAC" class="tab-pane in active">
                            <div class="list-group" id="dvdActAC">
                            </div>
                        </div>
                        <div id="tabRC" class="tab-pane in ">
                            <div class="list-group" id="dvdActRC">
                            </div>
                        </div>
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
       
             <!-- /.row -->
            </div>
    </div>

        <div class="row">
                  <div class="col-lg-4">
                <%--<div class="panel-body">
                    <h3>Informes</h3>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tabAC" data-toggle="tab">Pendientes</a></li>
                        <li><a href="#tabRV" data-toggle="tab">Revisados</a></li>
                        <li><a href="#tabRC" data-toggle="tab">Rechazados</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="tabAC" class="tab-pane in active">
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

                    <div class="text-right">
                            <a href="#">Ver más <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                </div> --%>
            </div>

              <div class="col-lg-5">
                      <%--
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


                </div>
            </div>
                    --%>
            
        </div>
      
        <!-- /#page-wrapper -->

    </div>

    
    <%--<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="http://cdn.oesmith.co.uk/morris-0.4.3.min.js"></script>
    <script src="js/Morris.js"></script>--%>
    <script src="js/PanelSup.js"></script>
    <script>
        $(function () {
            $("table").tablesorter({ debug: true });
        });
    </script>


</asp:Content>
