<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesDetContratos.aspx.cs" Inherits="wfSircc.ContratosGestion.Supervisor.GesDetContratos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="col-md-12">
        <div class="row">
            &nbsp
        </div>
      
        <div id="DetContrato" style="height: 150px; overflow: auto">
        </div>

        <hr />
        <ul class="nav navbar-nav navbar-right">
            <li>
                <div class="navbar-form navbar-right">
                    
                     
                    <div class="form-group">
                        <select id="CboActaSig" class="form-control">
                        </select>
                    </div>
                    <div class="form-group">
                       <select id="CboPlantilla" class="form-control">
                       </select>
                    </div>
                    <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-primary" title="Registrar Nuevo Acta.">
                        <span class="glyphicon glyphicon-plus"></span>Nuevo
                    </button>
                    <button type="button" value="Editar" id="BtnEditar" class="btn btn-warning" title="Editar Acta">
                        <span class="glyphicon glyphicon-pencil"></span>Editar
                    </button>
                    <button type="button" value="Editar" id="BtnImprimir" class="btn btn-success" title="Imprimir Acta">
                        <span class="glyphicon glyphicon-print"></span>Imprimir
                    </button>
                    <a class="btn btn-danger" href="javascript:history.back(1)" title="Volver Atrás">
                        <span class="glyphicon glyphicon-arrow-left"></span>&nbsp Atrás</a>
                </div>
            </li>

        </ul>

        <div class="row">
            &nbsp
        </div>

        <div id="jqxgridSol">
        </div>
    </div>
    <script src="js/GesDetContratos.js"></script>
</asp:Content>
