<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="gMiembros.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.gMiembrosProponente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="msgResult">
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="btn-toolbar"> 
                    <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-success" title="Registrar Nueva Solicitud de Contratación.">
                        <span class="glyphicon glyphicon-plus"></span>Nuevo
                    </button>
                    <button type="button" value="Editar" id="BtnEditar" class="btn btn-primary" title="Editar Solicitud Actual">
                        <span class="glyphicon glyphicon-pencil"></span>Editar
                    </button>   
                    <button type="button" value="Editar" id="btnEliminarMiembros" class="btn btn-danger" title="Editar Solicitud Actual">
                        <span class="glyphicon glyphicon-minus"></span>Eliminar
                    </button>                 
            </div>
        </div>
    </div>
    <div class="row"><br /></div>
    <div id="jqxgridMiembrosProponentes">
    </div>
    <script src="js/gMiembros.js"></script>
</asp:Content>