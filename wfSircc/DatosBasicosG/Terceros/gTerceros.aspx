<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="gTerceros.aspx.cs" Inherits="wfSircc.DatosBasicosG.Terceros.gTerceros" %>
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
                    <button type="button" value="Editar" id="btnAgregarMiembros" class="btn btn-info" title="Editar Solicitud Actual">
                        <span class="glyphicon glyphicon-plus"></span>Agregar Miembros
                    </button>                
            </div>            
        </div>       
    </div>
    <div class="row form-group" style="margin-top:20px">
         <div class="col-lg-6">
            <div class="input-group">
                <label>Id. Tercero</label>
                <input type="text" class="form-control inputHab" id="txtIdeTer" value="" />
                <div class="input-group-btn" style="padding-top:23px">
                    <button type="button" id="btnBsqIdTer" class="btn btn-info">
                        <span class="icon-search"></span>                        
                    </button>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="input-group">
                <label>Nombre</label>
                <input type="text" class="form-control inputHab" id="txtNomTer" value="" />
                <div class="input-group-btn" style="padding-top:23px">
                    <button type="button" id="btnBsqNomTer" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                        <span class="icon-search"></span>                        
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="row"><br /></div>

    <div id="jqxgridTerceros">
    </div>

    <div id="secTerceros"></div>

    <script src="js/gTerceros.js"></script>
</asp:Content>