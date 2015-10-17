<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Pendientes.aspx.cs" Inherits="wfSircc.ControlPagos.Contabilidad.Pendientes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title"><i class="fa fa-money"></i>Cuentas Pendientes por Revisar</h3>
        </div>
        <div class="panel-body">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10">
                    </div>
                    <div class="col-lg-2">
                        <button type="button" value="Detalle" id="BtnRevisar" class="btn btn-default" title="Revisión">
                            <span class="glyphicon glyphicon-eye-open"></span>Revisar
                        </button>
                    </div>
                </div>
                <div class="row">
                    &nbsp
                </div>
            </div>


            <div id="jqxgridSol"></div>



        </div>

    </div>
    <script src="js/Pendientes.js"></script>

    <script>
        $(function () {
            $("table")
                .tablesorter({ debug: false });

        });
    </script>
    <style>
        .filasGrid
        {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.428571429;
            color: #333333;
        }
    </style>
</asp:Content>
