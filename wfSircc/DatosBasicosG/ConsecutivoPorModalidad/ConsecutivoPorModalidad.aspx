<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="ConsecutivoPorModalidad.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.MPAA" %>
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
                    <label>Vigencia</label>
                </div>
                <div class="col-lg-3" id="dvdVIGENCIA">
                    <select class="form-control habilitar limpiar datos validar" id="cboVIGENCIA">
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Dependencia</label>
                </div>
                <div class="col-lg-3" id="dvdDEP_DEL">
                    <select class="form-control habilitar limpiar datos validar" id="cboDEP_DEL">
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Modalidad</label>
                </div>
                <div class="col-lg-3" id="dvdTIP_PROC">
                    <select class="form-control habilitar limpiar datos validar" id="cboTIP_PROC">
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Inicial</label>
                </div>
                <div class="col-lg-3" id="dvdINICIAL">
                    <input type="text" id="txtINICIAL" class="form-control habilitar limpiar datos validar snumero"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Siguiente</label>
                </div>
                <div class="col-lg-3" id="dvdSIGUIENTE">
                    <input type="text" id="txtSIGUIENTE" class="form-control habilitar limpiar datos validar snumero"/>
                </div>
            </div>
        </div>
    </div>
</div>
    <script src="js/ConsecutivoPorModalidad.js" type="text/javascript"></script>

</asp:Content>
