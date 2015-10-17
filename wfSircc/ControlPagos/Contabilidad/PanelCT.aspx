<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="PanelCT.aspx.cs" Inherits="wfSircc.ControlPagos.Contabilidad.PanelCT" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="http://cdn.oesmith.co.uk/morris-0.4.3.min.css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container">
        <div class="row">

            <div class="row">
                <div class="col-lg-3">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-6">
                                    <i class="fa fa-comments fa-5x"></i>
                                </div>
                                <div class="col-xs-12 text-right">
                                    <p class="announcement-heading">30</p>
                                    <p class="announcement-text">Cuentas por Recibir</p>
                                </div>
                            </div>
                        </div>
                        <a href="DetCuenta.aspx">
                            <div class="panel-footer announcement-bottom">
                                <div class="row">
                                    <div class="col-xs-6">
                                        Nuevas
                                    </div>
                                    <div class="col-xs-6 text-right">
                                        <i class="fa fa-arrow-circle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="panel panel-warning">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-6">
                                    <i class="fa fa-check fa-5x"></i>
                                </div>
                                <div class="col-xs-12 text-right">
                                    <p class="announcement-heading" id="countRev">12</p>
                                    <p class="announcement-text">Cuentas en Revisión</p>
                                </div>
                            </div>
                        </div>
                        <a href="Pendientes.aspx">
                            <div class="panel-footer announcement-bottom">
                                <div class="row">
                                    <div class="col-xs-6">
                                        Pendientes
                                    </div>
                                    <div class="col-xs-6 text-right">
                                        <i class="fa fa-arrow-circle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="panel panel-danger">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-6">
                                    <i class="fa fa-tasks fa-5x"></i>
                                </div>
                                <div class="col-xs-12 text-right">
                                    <p class="announcement-heading">18</p>
                                    <p class="announcement-text">Cuentas con errores </p>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer announcement-bottom">
                                <div class="row">
                                    <div class="col-xs-6">
                                        Devoluciones
                                    </div>
                                    <div class="col-xs-6 text-right">
                                        <i class="fa fa-arrow-circle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="panel panel-success">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-6">
                                    <i class="fa fa-comments fa-5x"></i>
                                </div>
                                <div class="col-xs-12 text-right">
                                    <p class="announcement-heading">56</p>
                                    <p class="announcement-text">Ordenes  Hechas</p>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer announcement-bottom">
                                <div class="row">
                                    <div class="col-xs-6">
                                        Tramitadas
                                    </div>
                                    <div class="col-xs-6 text-right">
                                        <i class="fa fa-arrow-circle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- /.row -->



            <div class="row">
                <div class="col-lg-4">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title"><i class="fa fa-long-arrow-right"></i>Gestión de Cuentas: Noviembre</h3>
                        </div>
                        <div class="panel-body">
                            <div id="morris-chart-donut"></div>
                            <div class="text-right">
                                <a href="#">Ver Detalles <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title"><i class="fa fa-clock-o"></i>Revisiones Recientes</h3>
                        </div>
                        <div class="panel-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item">
                                    <span class="badge">just now</span>
                                    <i class="glyphicon glyphicon-remove"></i><b>2010201000</b>
                                    <p class="list-group-item-text">
                                        Boris Gonzalez Rivera, Acta: 1010
                                    </p>
                                </a>
                                <a href="#" class="list-group-item">
                                    <span class="badge">hace 4 minutes</span>
                                    <i class="fa fa-check"></i><b>2010201000</b>
                                    <p class="list-group-item-text">
                                        Cecilia Castro, Acta: 1010
                                    </p>
                                </a>
                                <a href="#" class="list-group-item">
                                    <span class="badge">23 minutes ago</span>
                                    <i class="glyphicon glyphicon-remove"></i>Order 392 shipped
                                </a>
                                <a href="#" class="list-group-item">
                                    <span class="badge">46 minutes ago</span>
                                    <i class="fa fa-check"></i>Invoice 653 has been paid
                                </a>
                                <a href="#" class="list-group-item">
                                    <span class="badge">1 hour ago</span>
                                    <i class="glyphicon glyphicon-remove"></i>A new user has been added
                                </a>
                                <a href="#" class="list-group-item">
                                    <span class="badge">2 hours ago</span>
                                    <i class="fa fa-check"></i>Completed task: "pick up dry cleaning"
                                </a>
                                <a href="#" class="list-group-item">
                                    <span class="badge">yesterday</span>
                                    <i class="fa fa-globe"></i>Saved the world
                                </a>
                                <a href="#" class="list-group-item">
                                    <span class="badge">two days ago</span>
                                    <i class="fa fa-check"></i>Completed task: "fix error on sales page"
                                </a>
                            </div>
                            <div class="text-right">
                                <a href="#">Ver más <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title"><i class="fa fa-money"></i>Devoluciones de Tesoreria</h3>
                        </div>
                        <div class="panel-body">

                            <div class="table-responsive">
                                <table class="table table-bordered table-hover table-striped tablesorter">
                                    <thead>
                                        <tr>
                                            <th>Order # <i class="fa fa-sort"></i></th>
                                            <th>Order Date <i class="fa fa-sort"></i></th>
                                            <th>Order Time <i class="fa fa-sort"></i></th>
                                            <th>Amount (USD) <i class="fa fa-sort"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>3326</td>
                                            <td>10/21/2013</td>
                                            <td>3:29 PM</td>
                                            <td>$321.33</td>
                                        </tr>
                                        <tr>
                                            <td>3325</td>
                                            <td>10/21/2013</td>
                                            <td>3:20 PM</td>
                                            <td>$234.34</td>
                                        </tr>
                                        <tr>
                                            <td>3324</td>
                                            <td>10/21/2013</td>
                                            <td>3:03 PM</td>
                                            <td>$724.17</td>
                                        </tr>
                                        <tr>
                                            <td>3323</td>
                                            <td>10/21/2013</td>
                                            <td>3:00 PM</td>
                                            <td>$23.71</td>
                                        </tr>
                                        <tr>
                                            <td>3322</td>
                                            <td>10/21/2013</td>
                                            <td>2:49 PM</td>
                                            <td>$8345.23</td>
                                        </tr>
                                        <tr>
                                            <td>3321</td>
                                            <td>10/21/2013</td>
                                            <td>2:23 PM</td>
                                            <td>$245.12</td>
                                        </tr>
                                        <tr>
                                            <td>3320</td>
                                            <td>10/21/2013</td>
                                            <td>2:15 PM</td>
                                            <td>$5663.54</td>
                                        </tr>
                                        <tr>
                                            <td>3319</td>
                                            <td>10/21/2013</td>
                                            <td>2:13 PM</td>
                                            <td>$943.45</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="text-right">
                                <a href="#">Ver Todas las devoluciones <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.row -->

        </div>
        <!-- /#page-wrapper -->

    </div>

    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="http://cdn.oesmith.co.uk/morris-0.4.3.min.js"></script>
    <script src="js/Morris.js"></script>
    <script>
        $(function () {
            $("table").tablesorter({ debug: true });
        });
    </script>

</asp:Content>
