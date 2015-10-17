<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Tramitar.aspx.cs" Inherits="wfSircc.ControlPagos.Contabilidad.Tramitar" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <style type="text/css">
        .editedRow {
          color: #b90f0f !important;
          font-style: italic;
        }
</style>

    <div class="container">
        <div class="row">
            <div class="col-lg-8"></div>
            <div class="col-lg-4">
                <div class="btn-toolbar">

                    <button type="button" value="Editar" id="BtnTramitar" class="btn btn-success">
                        <span class="glyphicon glyphicon-send"></span>Guardar
                    </button>

                    <a class="btn btn-danger" href="javascript:history.back(1)" title="Volver Atrás">
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
    
    <script src="js/Tramitar.js"></script>
</asp:Content>
