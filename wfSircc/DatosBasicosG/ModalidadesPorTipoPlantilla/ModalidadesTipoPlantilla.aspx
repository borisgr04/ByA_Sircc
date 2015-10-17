<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ModalidadesTipoPlantilla.aspx.cs" Inherits="wfSircc.DatosBasicosG.ModalidadesPorTipoPlantilla.ModalidadesTipoPlantilla" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row" style="margin-bottom:10px">
            <div class="col-lg-1">
                <label>Modalidades</label>
            </div>
            <div class="col-lg-4">
                <select id="cboModalidades" class="form-control"></select>
            </div>
            <div class="col-lg-6">
                <button type="button" class="btn btn-success" id="guardarButton">
                    <span class="glyphicon glyphicon-floppy-saved"></span>Guardar
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-7">
                <table class="table table-bordered table-hover table-striped tablesorter" id="tblTiposPlantillas">
                    <thead>
                        <tr>                            
                            <th>Tipo de plantilla <i class="fa fa-sort"></i></th>
                            <th>Estado <i class="fa fa-sort"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>            
        </div>
    </div>
    <script src="js/ModalidadesTipoPlantilla.js"></script>
</asp:Content>
