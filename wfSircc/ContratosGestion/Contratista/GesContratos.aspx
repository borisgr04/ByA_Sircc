<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesContratos.aspx.cs" Inherits="wfSircc.ContratosGestion.Contratista.GesContratos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <div id="msgResult">
    </div>
    <div class="row">
        <div class="col-md-2">
            <label>
                Dependencia:</label>
        </div>
        <div class="col-md-3">
            <select id="CboFil" class="form-control input-sm"></select>
        </div>
        <div class="col-md-7">
            <div class="btn-toolbar">
                
                    <button type="button" value="Consultar" id="BtnConsulta" data-loading-text="Loading..." class="btn btn-warning">
                        <span class="glyphicon glyphicon-search"></span> Consultar
                    </button>
                    <button type="button" value="Nuevo" id="BtnDetalle" class="btn btn-info">
                        <span class="glyphicon glyphicon-zoom-in"></span> Detalle
                    </button>
                
                    <button type="button" value="Nuevo" id="BtnInformes" class="btn btn-success">
                        <span class="glyphicon glyphicon-book"></span> Informes
                    </button>
                    <a class="btn btn-danger" href="javascript:history.back(1)" title="Volver Atrás">
                        <span class="glyphicon glyphicon-arrow-left"></span>&nbsp Atrás</a>
                
            </div>
        </div>


    </div>
    <div class="row">
        <div class="col-md-12">
            <br />
        </div>
    </div>
    
   <!-- Modal -->
    <div class="modal fade" id="modalDetalle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H1">Detalle del Contratato</h4>
                </div>
                <div class="modal-body">
                    
                    <div id="DetContrato" style="height: 330px; overflow: auto">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

   
    
    <div id="jqxgridSol">
    </div>

    <div id="secDetalle"></div>


    <script src="js/GesContratos.js"></script>


</asp:Content>
