<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="Miembros.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.MiembrosProponentes" %>
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
                    </div>
                </div>
            </div>
            <!-- /.row -->
        </div>
        <br />
        <div class="col-md-12">
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Id. Tercero</label>
                </div>
                <div class="col-lg-5" id="dvdIDE_TER">
                    <input type="text" id="txtIDE_TER" class="form-control datMiembroProponente " disabled="disabled"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Id. Miembro</label>
                </div>
                <div class="col-lg-5" id="dvdID_MIEMBROS">
                    <div class="input-group">
                        <input id="txtID_MIEMBROS" class="form-control input-sm datMiembroProponente camLimp" disabled="disabled" />
                        <div class="input-group-btn ">
                            <button type="button" id="btnBsqMiembro" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                <span class="icon-search"></span>  
                            </button>                   
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Nombre Miembro</label>
                </div>
                <div class="col-lg-5" id="dvdNOMBRE">
                    <input type="text" class="form-control datMiembroProponente camLimp" id="txtNOMBRE" disabled="disabled"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Estado</label>
                </div>
                <div class="col-lg-5" id="dvdID_ESTADO">
                    <select class="form-control datMiembroProponente camDesh camLimp" id="cboID_ESTADO">
                        <option value="">Seleccione...</option>
                        <option value="AC">Activo</option>
                        <option value="IN">Inactivo</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Porcentaje de participación</label>
                </div>
                <div class="col-lg-5" id="dvdPORC_PART">
                    <input type="text" id="txtPORC_PART" class="form-control datMiembroProponente camDesh camLimp" />
                </div>
            </div>  
            <div id="secBsqTerceros"></div>          
        </div>
    </div>
</div>
    <script src="js/Miembros.js" type="text/javascript"></script>
</asp:Content>
