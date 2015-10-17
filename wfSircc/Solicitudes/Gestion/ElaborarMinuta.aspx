<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ElaborarMinuta.aspx.cs" Inherits="wfSircc.Solicitudes.ElaborarMinuta" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/Content/kendoui_css/kendo.common.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.default.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.rtl.min.css" rel="stylesheet" />
    <div class="container">

        <div class="panel panel-default">
                <div class="panel-heading">Elaborar minuta</div>                    
                <div class="panel-body">

    <div class="row">
        <div class="col-lg-12">
            <div class="panel-group Separar" id="accordion">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseProc">+ <b>PROCESO N°:</b> <span class="Nproc"></span>
                                </a>
                            </div>
                            <div id="collapseProc" class="panel-collapse collapse out">
                                <div class="panel-body">
                                    <div class="container">
                                        <div class="row">
                                            <div id="dvdProc" ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
        <style>
                table {
                    width:100%;
                    border-style: double; border-width: 1px;
                }
                td,th {
                    border-style: double; border-width: 1px;
                    resize:both;
                    padding:3px;
                }
                editorHtml {
                    width:90%;  border-style: double; border-width: 1px;

                }
             </style>
    <div id="tabNecDesc" class="tab-pane ">        
        <div class="form-group">
            <div class="col-lg-1 text-right">
                <label class="control-label" for="txtMinuta">Considerandos</label>
            </div>
            <div class="col-lg-5">
                <div id="txtConsiderandos" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
            </div>
            <div class="col-lg-6 text-left">
                <button type="button" value="Guardar" id="BtnEnviarElaborarMinuta" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export"></span>Guardar</button>
                <button type="button" value="Atras" id="btnAtras" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-chevron-left"></span>Atrás</button>
            </div>
        </div>
    </div>

                    </div>
            </div>
       


    </div>
    <script src="js/ElaborarMinuta.js"></script>
    <script src="/jqscripts/kendoui/kendo.web.min.js"></script>
</asp:Content>
