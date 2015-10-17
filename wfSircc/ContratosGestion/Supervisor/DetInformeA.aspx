<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="DetInformeA.aspx.cs" Inherits="wfSircc.ContratosGestion.Supervisor.DetInformeA" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="DetContrato" style="height: 150px; overflow: auto">
    </div>

    <hr />

    <div class="row">
        <div class="col-lg-4">
            <label for="cboInfoCon">
                Informe del Contratista
            </label>
            <select id="cboInfoCon" class="form-control input-sm">
            </select>
        </div>
        <div class="col-lg-4">
            <label for="CboPlantilla">
                Plantilla de Acta
            </label>
            <select id="CboPlantilla" class="form-control">
            </select>
        </div>
        <div class="col-lg-4">
            <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-primary" title="Registrar Nuevo Acta.">
                <span class="glyphicon glyphicon-plus"></span>Nuevo
            </button>
            <button type="button" value="Nuevo" id="BtnRechazar" class="btn btn-primary" title="Rechazar Informe">
                <span class="glyphicon glyphicon-plus"></span>Rechazar
            </button>
        </div>
    </div>

    <br />


    <div class="row">
        <div class="col-lg-4">
            <div id="DetInforme">
            </div>

        </div>
        <div class="col-lg-4">
            <div class="panel panel-default">
                <div class="panel-heading"><b>DOCUMENTOS ASOCIADOS</b></div>
                <div class="panel-body">
                    <div id="dvdDA">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="panel panel-default">
                <div class="panel-heading"><b>Información de Seguridad Social</b></div>
                <div class="panel-body">
                    <div id="dvdSS">
                    </div>
                </div>
            </div>
        </div>

    </div>


    <!-- Modal -->
    <div class="modal fade" id="modalDetDoc" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog custom-class">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Información del Documento</h4>
                </div>
                <div class="modal-body">

                    <div id="InfoFile"></div>

                    <div id="dvdemb">
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

    <div id="dvdGestion">

    </div>

    <script src="js/DetInformeA.js"></script>

    <style>
        @media screen and (min-width: 768px)
        {
            .custom-class
            {
                width: 80%; /* either % (e.g. 60%) or px (400px) */
            }
        }
    </style>
</asp:Content>
