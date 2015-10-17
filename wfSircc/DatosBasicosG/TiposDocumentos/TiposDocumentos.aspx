<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="TiposDocumentos.aspx.cs" Inherits="wfSircc.DatosBasicosG.TiposDocumentos.TiposDocumentos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
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
        </div>
        <br />
        <div class="col-md-12">
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Codigo</label>
                </div>
                <div class="col-lg-3" id="dvdCOD_TIP">
                    <input type="text" id="txtCOD_TIP" class="form-control limpiar datos" disabled="disabled"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Nombre</label>
                </div>
                <div class="col-lg-3" id="dvdDES_TIP">
                    <input type="text" id="txtDES_TIP" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div>      
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Estado</label>
                </div>
                <div class="col-lg-3" id="dvdEST_TIP">
                    <select class="form-control habilitar limpiar datos validar" id="cboEST_TIP">
                        <option value="AC">ACTIVO</option>
                        <option value="IN">INACTIVO</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Etapa</label>
                </div>
                <div class="col-lg-3" id="dvdCOD_ETAPA">
                    <select class="form-control habilitar limpiar datos validar" id="cboCOD_ETAPA">
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Origen</label>
                </div>
                <div class="col-lg-3" id="dvdORIGEN">
                    <select class="form-control habilitar limpiar datos validar" id="cboORIGEN">
                        <option value="E">ENTIDAD</option>
                        <option value="C">CONTRATISTA</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
    <script src="js/TiposDocumentos.js" type="text/javascript"></script>

</asp:Content>
