<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="aprEstPrev.aspx.cs" Inherits="wfSircc.EstPrev.Aprobacion.aprEstPrev" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <link href="../docEP.css" rel="stylesheet" />

    
        <div class="row">
            <div class="col-md-12" id="dvdEla">
                <div class="col-md-3">
                    <div class="input-group">
                        <input type="text" class="form-control inputHab" id="txtNumero" />
                        <div class="input-group-btn ">
                            <button type="button" id="BtnDwnAbrir" class="btn btn-info">
                                <span class="icon-folder-open-alt"></span>
                            </button>
                        </div>
                        <!-- /btn-group -->
                    </div>
                    <!-- /input-group -->
                </div>
                <!-- /.col-lg-9 -->
                <div class="col-lg-7">
                    <button type="button" class="btn btn-success" id="aprobarButton">
                        <span class="glyphicon glyphicon-floppy-saved"></span>
                        Aprobar
                    </button>
                    <button type="button" class="btn btn-warning" id="desaprobarButton">
                        <span class="glyphicon glyphicon-floppy-saved"></span>
                        Desaprobar
                    </button>
                    <button type="button" class="btn btn-danger" id="cancelarButton">
                        <span class="glyphicon glyphicon-remove"></span>
                        Cancelar</button>
                    <button type="button" class="btn btn-primary" id="elaborarButton">
                        <span class="glyphicon glyphicon-pencil"></span>
                        Ir a Elaboración</button>
                     <button type="button" class="btn btn-info" id="imprimirButton">
                        <span class="glyphicon glyphicon-print"></span>
                        Imprimir</button>
                </div>
                <div id="lbEstado" class="col-lg-2"></div>

            </div>
            <!-- /.row -->
        </div>

    
    <br />
    <select id="CboClausulas" style="display: none" class="form-control input-sm" multiple size="20"></select>

    <div class="tab-pane" id="tabPreview">
        <div id="dvdPrint" style="text-align: justify">
            <div id="dvdClausulaPreview" style="text-align: justify;"></div>
        </div>
    </div>


    <div class="modal fade" id="modalAprobar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H5">Aprobación de Estudios Previos</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="TxtFecApr" class="control-label">
                                Fecha de Aprobación
                            </label>
                            <input type="date" id="TxtFecRev" class="form-control input-sm inputHab">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnAprobar">Aprobado (OK)</button>
                    <button type="button" class="btn btn-warning" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal TERCEROS-->


    <div class="modal fade" id="modalDAprobar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H1">Anular Aprobación de Estudios Previos</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="TxtFecApr" class="control-label">
                                Fecha de Anulación Aprobación
                            </label>
                            <input type="date" id="TxtFecDApr" class="form-control input-sm inputHab">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnDAprobar">Anular Aprobación</button>
                    <button type="button" class="btn btn-warning" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal DESAPROBAR-->


    <script src="js/aprEstPrev.js"></script>



</asp:Content>
