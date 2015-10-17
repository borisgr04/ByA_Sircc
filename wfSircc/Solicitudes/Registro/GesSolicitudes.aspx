<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesSolicitudes.aspx.cs" Inherits="wfSircc.Solicitudes.Registro.GesSolicitudes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="msgResult">
    </div>
    <div class="row">
        <%--<div class="col-md-2">
            <label>Delegación:</label>
        </div>
        <div class="col-md-4">
            <select id="CboDepDel" class="form-control input-sm"></select>
        </div>--%>
        <div class="col-md-2">
            Dependencia
                    <select id="CboDepDel" class="form-control input-sm"></select>
            <br />
            <div class="list-group" id="dvdEstado"></div>
        </div>
        <div class="col-md-10">
            <div class="btn-toolbar">

                <button type="button" value="Consultar" id="BtnConsulta" data-loading-text="Loading..."
                    class="btn btn-warning" title="Actualiza el listado de Solicitudes de acuerdo a la dependencia Seleccionada">
                    <span class="glyphicon glyphicon-search"></span>Consultar
                </button>
                <button type="button" value="Nuevo" id="BtnDetalle" class="btn btn-danger detalle">
                    <span class="glyphicon glyphicon-zoom-in"></span>Detalle
                </button>
                <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-success" title="Registrar Nueva Solicitud de Contratación.">
                    <span class="glyphicon glyphicon-plus"></span>Nuevo
                </button>
                <button type="button" value="Nuevo" id="BtnAsignar" class="btn btn-info">
                    <span class="glyphicon glyphicon-hand-right"></span>&nbsp Asignar
                </button>
                <button type="button" value="Editar" id="BtnEditar" class="btn btn-primary" title="Editar Solicitud Actual">
                    <span class="glyphicon glyphicon-pencil"></span>Editar
                </button>


            </div>
            <div class="row">
                <div class="col-md-12">
                    <br />
                </div>
                <div id="jqxgridSol">
                </div>
            </div>
        </div>
    </div>



    

    <div id="secDetalle"></div>

    <script src="js/GesSolicitudes.js"></script>

</asp:Content>
