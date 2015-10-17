<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="PanelMiGestion.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.PanelMiGestion" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <ul class="nav nav-tabs">
        <li class="active"><a href="PanelMiGestion.aspx">Panel de Gestión</a></li>
        <li><a href="GesMisSolicitudes.aspx">Mis Solicitudes</a></li>
        <li><a href="GesMisProcesos.aspx">Mis Procesos</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <h4>Panel de Gestión </h4>
            <div class="row">
                <div class="col-sm-5">
                    <select id="CboDepDel" class="form-control input-sm"></select>    
                 </div>
                </div>
            <div class="row">
                <div class="space-6"></div>
                <div class="col-sm-5">
                    <div class="widget-box">
                        
                        <div id="TitSol" class="widget-header widget-header-flat widget-header-small">
                           
                        </div>
                        <div class="widget-body">
                            <div class="widget-main" id="divSol">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vspace-sm"></div>

                <div class="col-sm-5">
                    <div class="widget-box">
                        <div id="TitProc" class="widget-header widget-header-flat widget-header-small">
                            <div class="widget-toolbar no-border">
                            </div>
                        </div>

                        <div class="widget-body">
                            <div class="widget-main">
                                <div id="piechart-placeholder" style="width: 90%; min-height: 150px; padding: 0px; position: relative;">
                                    <canvas class="flot-base" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 384px; height: 150px;" width="384" height="150"></canvas>
                                    <canvas class="flot-overlay" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 384px; height: 150px;" width="384" height="150"></canvas>
                                    <div class="legend">
                                        <div style="position: absolute; width: 95px; height: 110px; top: 15px; right: -30px; background-color: rgb(255, 255, 255); opacity: 0.85;"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- /widget-main -->
                        </div>
                        <!-- /widget-body -->
                    </div>
                    <!-- /widget-box -->
                </div>
                <!-- /span -->
            </div>

            <div class="row">

                <div class="col-sm-5">
                    <div class="widget-box">
                        <div id='TitAct' class="widget-header widget-header-flat widget-header-small">
                        </div>
                        <div class="widget-body">
                            <div class="widget-main" id="divAvi_Act">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vspace-sm"></div>
            </div>

            <div class="row">

                <div class="col-sm-5">
                    <div class="widget-box">
                        <div id='TitProcL' class="widget-header widget-header-flat widget-header-small">
                        </div>
                        <div class="widget-body">
                            <div class="widget-main" id="divProcL">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vspace-sm"></div>
            </div>

        </div>
    </div>
    <!-- panel -->

    <script src="js/PanelMiGestion.js"></script>
    <script src="/Content/Bootstrap_Personalize/js/jquery.flot.min.js"></script>
    <script src="/Content/Bootstrap_Personalize/js/jquery.flot.pie.min.js"></script>
    <script src="/Content/Bootstrap_Personalize/js/jquery.flot.resize.min.js"></script>
    <script src="/Content/Bootstrap_Personalize/js/jquery.slimscroll.min.js"></script>

    <script type="text/javascript">
        jQuery(function ($) {

            
        })
    </script>
</asp:Content>
