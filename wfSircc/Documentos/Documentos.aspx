<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="Documentos.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.MPAA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/Content/kendoui_css/kendo.common.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.default.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.rtl.min.css" rel="stylesheet" />
    <link href="/EstPrev/docEP.css" rel="stylesheet" />
    <style>
        table {
                    width:100%;
                    border-style: double; border-width: 1px;
                }
        td,th {
                    border-style: double; border-width: 1px;
                    resize:both;
                    padding:3px;
                }
        editorHtml {
                    width:90%;  border-style: double; border-width: 1px;

                }
    </style>
    <div class="container"> 
    <div class="row" style="margin-bottom:10px">
        <div class="col-lg-3">            
            <div class="input-group">
                <input type="text" class="form-control inputHab" id="txtBusqueda"  />
                <div class="input-group-btn ">
                    <button type="button" id="btnFiltrarDocumentos" class="btn btn-info">
                        <span class="icon-search"></span>
                    </button>
                </div>
            </div>  
        </div> 
                <div class="col-lg-7">
                    <div class="btn-toolbar">                      
                        <button type="button" class="btn btn-warning" id="nuevoButton">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Nuevo</button>                     
                        <%--<button type="button" class="btn btn-primary" id="editarButton">
                            <span class="glyphicon glyphicon-pencil"></span>
                            Editar</button>  --%>                      
                        <button type="button" class="btn btn-success" id="guardarButton">
                            <span class="glyphicon glyphicon-floppy-saved"></span>
                            Guardar</button>
                        <button type="button" value="Nuevo" id="imprimirButton" class="btn btn-info">
                            <span class="glyphicon glyphicon-print"></span>&nbsp Imprimir
                        </button>
                        <button type="button" class="btn btn-success" id="btnCompletarDocumento">
                            <span class="glyphicon glyphicon-check"></span>
                            Completado</button>
                        <%--<button type="button" class="btn btn-danger" id="cancelarButton">
                            <span class="glyphicon glyphicon-remove"></span>
                            Cancelar</button> --%>      
                        <button type="button" class="btn btn-sm btn-success" id="btnVolverAtras">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                            Atrás</button>                   
                    </div>
                </div>     
    </div>
    <div class="row">  
        <div class="col-lg-3">
            <div id="lstDocumentos"> 
            </div>
        </div>
        <div class="col-lg-9">
        <div class="row">
            <div class="col-md-12 alert-dismissable" id="dvdMsg">
                <span id="lbMsg" class="control-label"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12" id="secDocumentosHechos" style="display:none">
                <table class="table table-bordered table-hover table-striped tablesorter" id="tblDocumentosHechos">
                    <thead>
                        <tr>
                            <th>Nro. Documento <i class="fa fa-sort"></i></th>                            
                            <th>Fecha Revicion <i class="fa fa-sort"></i></th>
                            <th>Nro. Revicion <i class="fa fa-sort"></i></th>
                            <th>&nbsp<i class="fa fa-sort"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="form-horizontal">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tabInformacion" data-toggle="tab">1. Datos de la plantilla</a></li>
                <%--<li><a href="#tabSecciones" data-toggle="tab">2. Secciones</a></li>--%>
            </ul>

            <div class="tab-content">
                <div id="tabInformacion" class="tab-pane in active">   
                    <div id="dvdDoc"></div>
                    <div class="form-group row" style="display:none">
                        <div class="col-lg-3 text-right">
                            <label>Numero Proceso</label>
                        </div>
                        <div class="col-lg-6" id="dvdNUM_PROC">
                            <input type="text" id="txtNUM_PROC" class="form-control datos" disabled="disabled"/>
                        </div>
                    </div>                 
                    <div class="form-group row" style="display:none">
                        <div class="col-lg-3 text-right">
                            <label>Id</label>
                        </div>
                        <div class="col-lg-6" id="dvdID">
                            <input type="text" id="txtID" class="form-control limpiar datos" disabled="disabled"/>
                        </div>
                    </div>   
                    <div class="form-group row" style="display:none">
                        <div class="col-lg-3 text-right">
                            <label>Numero documento</label>
                        </div>
                        <div class="col-lg-6" id="dvdNRO_DOC">
                            <input type="text" id="txtNRO_DOC" class="form-control limpiar datos" disabled="disabled"/>
                        </div>
                    </div>  
                    <div class="form-group row" style="display:none">
                        <div class="col-lg-3 text-right">
                            <label>Tipo de plantilla</label>
                        </div>
                        <div class="col-lg-6" id="dvdCOD_TIP">
                            <select class="form-control habilitar limpiar datos validar" id="cboCOD_TIP"></select>
                        </div>
                    </div>   
                    <div class="form-group row" style="display:none">
                        <div class="col-lg-3 text-right">
                            <label>Titulo</label>
                        </div>
                        <div class="col-lg-6" id="dvdTITULO">
                            <input type="text" id="txtTITULO" class="form-control limpiar datos habilitar validar"/>
                        </div>
                    </div>  
                    <div class="form-group row">
                        <div class="col-lg-2 text-right">
                            <label>Fecha de revisión</label>
                        </div>
                        <div class="col-lg-3" id="dvdFEC_REV">
                            <input type="date" id="txtFEC_REV" class="form-control limpiar datos habilitar validar"/>
                        </div>
                        <div class="col-lg-2 text-right">
                            <label>Nro. Revision</label>
                        </div>
                        <div class="col-lg-1" id="dvdNRO_REV">
                            <input type="text" id="txtNRO_REV" class="form-control limpiar datos habilitar validar"/>
                        </div>
                        <div class="col-lg-3" id="dvdEST_PLA">
                            <select class="form-control habilitar limpiar datos validar" id="cboEST_DOC">
                                <option value="AC">ACTIVA</option>
                                <option value="IN">INACTIVA</option>
                            </select>
                        </div>
                    </div> 
                    <%--<div class="form-group row">
                        
                    </div> 
                    <%--<div class="form-group row">
                        <div class="col-lg-2 text-right">
                            <label>Estado</label>
                        </div>
                        
                    </div>--%>
                    <div class="form-group row" style="display:none">
                        <div class="col-lg-3 text-right">
                            <label>Fecha del documento</label>
                        </div>
                        <div class="col-lg-6" id="dvdFEC_DOC">
                            <input type="date" id="txtFEC_DOC" class="form-control limpiar datos habilitar validar"/>
                        </div>
                    </div> 
                    <div class="row">
                        <div class="col-lg-3 text-left">
                            <select id="cboSecciones" class="form-control input-sm habilitar" multiple="multiple" size="20">
                            </select>
                        </div>
                        <div class="col-lg-9">                                                       
                            <div id="txtSeccion" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                        </div>
                    </div>  
                </div>
                <%--<div id="tabSecciones" class="tab-pane in">
                                      
                </div>--%>
            </div>
        </div>
        </div>
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

    <script src="/jqscripts/kendoui/kendo.web.min.js"></script>
    <script src="js/Documentos.js" type="text/javascript"></script>
</asp:Content>
