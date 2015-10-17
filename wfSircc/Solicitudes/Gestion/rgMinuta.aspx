<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="rgMinuta.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.rgMinuta" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/Content/kendoui_css/kendo.common.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.default.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.rtl.min.css" rel="stylesheet" />
    <link href="docEP.css" rel="stylesheet" />
    <style>
        @media screen
        {
            .print
            {
                margin-left: 4cm;
                margin-right: 4cm;
                background-color: white;
                padding:5px;
                padding-top:10px;
                width: 8.5in;
            }
        }
    </style>
    <div class="row">
        <div class="col-md-12" id="dvdEla">
            <div class="col-md-3">
                <div class="input-group">
                    <input type="text" class="form-control inputHab" id="txtNumero" disabled />
                </div>
            </div>
            <!-- /.col-lg-9 -->
            <div class="col-lg-6">
                <button type="button" class="btn btn-success" id="guardarButton">
                    <span class="glyphicon glyphicon-floppy-saved"></span>
                    Guardar
                </button>
                <button type="button" class="btn btn-danger" id="cancelarButton">
                    <span class="glyphicon glyphicon-remove"></span>
                    Cancelar</button>
                <button  id="btnPrint" data-loading-text="Loading..." class="btn btn-warning">
                            <span class="glyphicon glyphicon-eye-open"></span>Imprimir
                </button>
            </div>

        </div>
        <!-- /.row -->
    </div>
    <div class="row">
        &nbsp
    </div>

    <ul class="nav nav-tabs">
        <li class="active"><a href="#tabElaborar" data-toggle="tab">1.Elaborar</a></li>
        <li><a href="#tabPreview" data-toggle="tab">2.Vista Previa</a></li>
    </ul>


    <div class="tab-content">
        <div id="tabElaborar" class="tab-pane in active">

            <div class="row">
                <div id="dvdFilaClausulas" class="col-lg-3">
                    <select id="CboClausulas" class="form-control input-sm" multiple size="20"></select>
                </div>
                <div id="dvdClausula" class="col-lg-9">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" id="myTab">
                        <li class="active"><a href="#dvdEdicion" data-toggle="tab">Edición</a></li>
                        <li><a href="#dvdDatos" data-toggle="tab">Datos </a></li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content" style="min-height: 300px">
                        <div class="tab-pane active" id="dvdEdicion">
                            <h4 id="dvdTitulo"></h4>
                            <div id="dvdClausulaEdit" contenteditable style="text-align: justify; min-height: 300px"></div>
                        </div>
                        <div class="tab-pane" id="dvdDatos">
                            <div id="Div2" style="text-align: justify">
                                <div class="profile-user-info profile-user-info-striped" id="idDatos">
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <div class="tab-pane" id="tabPreview">
            <div style="text-align: justify; border-color:azure; background-color:gray" >
                <div id="dvdPrint" style="text-align: justify; " class="print">
                    <div id="dvdClausulaPreview" style="text-align: justify;"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="/jqscripts/kendoui/kendo.web.min.js"></script>
    <script src="js/rgMinuta.js"></script>
</asp:Content>
