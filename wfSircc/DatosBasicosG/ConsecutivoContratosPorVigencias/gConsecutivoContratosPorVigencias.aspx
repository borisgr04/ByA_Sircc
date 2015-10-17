<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/SiteBS.Master" CodeBehind="gConsecutivoContratosPorVigencias.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.gMPAA" %>
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
            </div>
        </div>
    </div>

    <div class="row"><br /></div>

    <div id="jqxgridSol">
    </div>

    <div id="secDetalle"></div>

    <script src="js/gConsecutivoContratosPorVigencias.js"></script>
    
</asp:Content>
