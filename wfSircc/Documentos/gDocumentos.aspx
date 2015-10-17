<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/SiteBS.Master" CodeBehind="gDocumentos.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.gMPAA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="msgResult">
    </div>
    <div class="row" style="margin:5px">       
        <div class="col-lg-3">
            <div class="row">
                <div class="col-lg-4 text-right">
                    <label>Tipos de Plantillas</label>
                </div>
                <div class="col-lg-8">
                    <select class="form-control" id="cboTiposPlantillas"></select>
                </div>
            </div>  
        </div>     
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

    <div class="row">
        <div class="col-lg-10">
            <div id="jqxgridSol"></div>
        </div>
    </div>
    

    <div class="modal fade" id="modalPlantillas" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H5">Consulta de Plantillas</h4>
                </div>
                <div class="modal-body">
                    <div id="jqxgridPlantillas">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnCrearDocumento">Crear Nuevo Documento</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal TERCEROS-->



    <script src="js/gDocumentos.js"></script>
    
</asp:Content>
