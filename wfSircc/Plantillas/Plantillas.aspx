<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="Plantillas.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.MPAA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/Content/kendoui_css/kendo.common.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.default.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.rtl.min.css" rel="stylesheet" />
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
    <div class="row">
        <div class="row">
            <div class="col-md-12 alert-dismissable" id="dvdMsg">
                <span id="lbMsg" class="control-label"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-10">
                <div class="col-lg-9">
                    <div class="btn-toolbar">
                        <button type="button" class="btn btn-warning" id="nuevoButton">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Nuevo</button>
                        <button type="button" class="btn btn-primary" id="editarButton">
                            <span class="glyphicon glyphicon-pencil"></span>
                            Editar</button>
                        
                        <button type="button" class="btn btn-success" id="guardarButton">
                            <span class="glyphicon glyphicon-floppy-saved"></span>
                            Guardar</button>
                        <button type="button" class="btn btn-danger" id="cancelarButton">
                            <span class="glyphicon glyphicon-remove"></span>
                            Cancelar</button>       
                        <button type="button" class="btn btn-sm btn-success" id="btnVolverAtras">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        Atrás</button>                   
                    </div>
                </div>
            </div>
            <!-- /.row -->
        </div> <br />

        <div class="tabbable tabs-left">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tabInformacion" data-toggle="tab">1. Datos de la plantilla</a></li>
                <li><a href="#tabSecciones" data-toggle="tab">2. Secciones</a></li>
            </ul>

            <div class="tab-content">
                <div id="tabInformacion" class="tab-pane in active">                    
                    <div class="form-group row">
                        <div class="col-lg-2 text-right">
                            <label>Id</label>
                        </div>
                        <div class="col-lg-1" id="dvdID">
                            <input type="text" id="txtID" class="form-control limpiar datos text-right" disabled="disabled"/>
                        </div>
                    </div>    
                    <div class="form-group row">
                        <div class="col-lg-2 text-right">
                            <label>Tipo de plantilla</label>
                        </div>
                        <div class="col-lg-6" id="dvdCOD_TIP">
                            <select class="form-control habilitar limpiar datos validar" id="cboCOD_TIP"></select>
                        </div>
                    </div>   
                    <div class="form-group row">
                        <div class="col-lg-2 text-right">
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
                        <div class="col-lg-2" id="dvdFEC_REV">
                            <input type="date" id="txtFEC_REV" class="form-control limpiar datos habilitar validar"/>
                        </div>
                        <div class="col-lg-2 text-right">
                            <label>Estado</label>
                        </div>
                        <div class="col-lg-2" id="dvdEST_PLA">
                            <select class="form-control habilitar limpiar datos validar" id="cboEST_PLA">
                                <option value="AC">ACTIVA</option>
                                <option value="IN">INACTIVA</option>
                            </select>
                        </div>
                    </div> 
                    <div class="form-group row">
                        <div class="col-lg-2 text-right">
                            <label>Nro. Revision</label>
                        </div>
                        <div class="col-lg-2" id="dvdNRO_REV">
                            <input type="text" id="txtNRO_REV" class="form-control text-right limpiar datos habilitar validar"/>
                        </div>
                        <div class="col-lg-2 text-right">
                            <label>Numero max. de plantilla por proceso</label>
                        </div>
                        <div class="col-lg-2" id="dvdDOC_MAX">
                            <input type="text" id="txtDOC_MAX" class="form-control text-right limpiar datos habilitar validar snumero"/>
                        </div>
                    </div>  
                </div>
                <div id="tabSecciones" class="tab-pane in">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <button type="button" class="btn btn-success habilitar" id="btnNuevaSeccion">
                                    <span class="glyphicon glyphicon-plus-sign"></span>
                                    Nueva</button>
                                <button type="button" class="btn btn-warning habilitar" id="btnEliminarSeccion">
                                    <span class="glyphicon glyphicon-plus-sign"></span>
                                Eliminar</button>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 text-left">
                            <select id="cboSecciones" class="form-control input-sm habilitar" multiple="multiple" size="20">
                            </select>
                        </div>
                        <div class="col-lg-10">                                                       
                            <div id="txtSeccion" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</div>

    <script src="/jqscripts/kendoui/kendo.web.min.js"></script>
    <script src="js/Plantillas.js" type="text/javascript"></script>
</asp:Content>
