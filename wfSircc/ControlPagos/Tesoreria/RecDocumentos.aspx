<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="RecDocumentos.aspx.cs" Inherits="wfSircc.ControlPagos.Tesoreria.RecDocumentos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="form-group">
                    <div class="checkbox" >
                        <input type="checkbox" id="chkTodos"  > Todos
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="btn-toolbar">
                    
                    <button type="button" value="Editar" id="BtnTrasladar" class="btn btn-danger">
                        <span class="glyphicon glyphicon-send"></span>Recibir
                    </button>

                    <button type="button" value="Editar" id="BtnRevisar" class="btn btn-warning">
                        <span class="glyphicon glyphicon-eye-open"></span>Devolver
                    </button>

                    <button type="button" value="Editar" id="BtnTramitar" class="btn btn-success">
                        <span class="glyphicon glyphicon-send"></span>Tramitar
                    </button>

                    <a class="btn btn-primary" href="javascript:history.back(1)" title="Volver Atrás">
                        <span class="glyphicon glyphicon-arrow-left"></span>&nbsp Atrás</a>

                </div>
            </div>
        </div>

    </div>
    <div class="row">
        &nbsp
    </div>

    <div id="jqxgridSol">
    </div>

    <div id='jqxgridDet'></div>
    
    <script src="js/RecDocumentos.js"></script>
</asp:Content>
