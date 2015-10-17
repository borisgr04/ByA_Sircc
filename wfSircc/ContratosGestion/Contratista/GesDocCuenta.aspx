<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesDocCuenta.aspx.cs" Inherits="wfSircc.ContratosGestion.Contratista.GesDocCuenta" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="DetContrato" style="height: 150px; overflow: auto">
    </div>
    
    <hr />
    <ul class="nav nav-tabs" id="Ul1">
            <li><a href="#" id="hrefInf" data-toggle="tab">1. Informes</a></li>
            <li><a href="#" id="hrefSS" data-toggle="tab">2. Seguridad Social</a></li>
            <li class="active"><a href="#" id="hrefDoc"  data-toggle="tab">3. Documentos</a></li>
        </ul>
        <div class="tab-content">
            <div id="#hrefDoc" class="tab-pane in active">

    

    <ul class="nav nav-tabs" role="tablist" id="myTab">
       <li role="presentation" class="active"><a href="#docasociados" aria-controls="profile" role="tab" data-toggle="tab">Documentos Asociados</a></li>
         <li role="presentation" ><a href="#bandent" aria-controls="home" role="tab" data-toggle="tab">Bandeja Entrada</a></li>
        
    </ul>


    <div class="tab-content">
         <div role="tabpanel" class="tab-pane active" style="min-height:300px" id="docasociados">

            <div id="jqxgridDA">
            </div>

        </div>
        <div role="tabpanel" class="tab-pane " id="bandent" style="min-height:300px">
            <a href="#" id="BtnUpload" title="Subir Archivos" class="btn btn-danger">
                <span class="glyphicon glyphicon-paperclip"></span>Subir 
            </a>
            <a href="#" title="Actualizar" id="BtnUpdBandeja" class="btn btn-warning">
                <span class="glyphicon glyphicon-refresh"></span>Actualizar
            </a>
            <button type="button" value="Nuevo" id="BtnAsociarD" class="btn btn-primary" title="Asociar">
                <span class="glyphicon glyphicon-link"></span>Asociar
            </button>

            <hr />

            <div id="jqxgridSol">
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

                    <div id="dvdemb" >
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

    <script src="js/GesDocCuenta.js"></script>
    <style>

        @media screen and (min-width: 768px) {
            .custom-class {
                width: 80%; /* either % (e.g. 60%) or px (400px) */
            }
        }

    </style>
</asp:Content>
