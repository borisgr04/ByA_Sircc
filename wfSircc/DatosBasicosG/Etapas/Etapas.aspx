<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="Etapas.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.MPAA" %>
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
                <div class="col-lg-2" id="dvdCOD_ETA">
                    <input type="text" id="txtCOD_ETA" class="form-control limpiar datos" disabled="disabled"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Nombre</label>
                </div>
                <div class="col-lg-3" id="dvdNOM_ETA">
                    <input type="text" id="txtNOM_ETA" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Proceso</label>
                </div>
                <div class="col-lg-3" id="dvdPROCESO">
                    <select class="form-control habilitar limpiar datos validar" id="cboPROCESO">
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
            </div>       
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Estado</label>
                </div>
                <div class="col-lg-3" id="dvdESTADO">
                    <select class="form-control habilitar limpiar datos validar" id="cboESTADO">
                        <option value="AC">ACTIVA</option>
                        <option value="IN">INACTIVA</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
    <script src="js/Etapas.js" type="text/javascript"></script>

</asp:Content>
