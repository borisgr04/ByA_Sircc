<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ETraslados.aspx.cs" Inherits="wfSircc.ControlPagos.Contabilidad.ETraslados" %>
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
                    <button type="button" value="Editar" id="BtnSelTodo" class="btn btn-default">
                        <span class="glyphicon glyphicon-check"></span>Seleccinar Todos
                    </button>

                    <button type="button" value="Editar" id="BtnNinguno" class="btn btn-default">
                        <span class="glyphicon glyphicon-unchecked"></span> Deseleccionar
                    </button>

                    <button type="button" value="Editar" id="BtnTrasladar" class="btn btn-success">
                        <span class="glyphicon glyphicon-send"></span>Trasladar
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
    <script src="js/ETraslado.js"></script>

</asp:Content>
