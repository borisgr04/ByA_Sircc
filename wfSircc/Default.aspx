<%@ Page Title="Página principal" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="wfSircc._Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <%--<asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>--%>
    <div class="page-header">
        <h1>SIRCC &reg <small>Sistema de Información de Radicación y Control de Contratos</small></h1>
        
    </div>

    <div class="list-group">
        
        <a href="#" class="list-group-item ">
            <h4 class="list-group-item-heading">Elaborar Estudios Previos</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="#" class="list-group-item ">
            <h4 class="list-group-item-heading">Revisar Estudios Previos</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="#" class="list-group-item ">
            <h4 class="list-group-item-heading">Aprobar Estudios Previos</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="#" class="list-group-item ">
            <h4 class="list-group-item-heading">Registro y Asignación de Solicitudes</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="#" class="list-group-item ">
            <h4 class="list-group-item-heading">Gestión de Solictudes y Procesos</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="#" class="list-group-item ">
            <h4 class="list-group-item-heading">Radicar y Legalizar</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="/ContratosGestion/Contratista/PanelCtista.aspx" class="list-group-item ">
            <h4 class="list-group-item-heading">Registrar Informes de Contratista</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="/ContratosGestion/Supervisor/PanelSup.aspx" class="list-group-item ">
            <h4 class="list-group-item-heading">Supervisión de Contratos</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="#" class="list-group-item ">
            <h4 class="list-group-item-heading">Ordenes de Paga</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="#" class="list-group-item ">
            <h4 class="list-group-item-heading">Egresos</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        <a href="#" class="list-group-item ">
            <h4 class="list-group-item-heading">Archivos</h4>
            <%--<p class="list-group-item-text">Elaboración, Revisión y Aprobación</p>--%>
        </a>
        
    </div>


</asp:Content>
