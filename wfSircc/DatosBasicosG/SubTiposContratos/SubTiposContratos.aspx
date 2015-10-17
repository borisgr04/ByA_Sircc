<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="SubTiposContratos.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.MPAA" %>
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
                <div class="col-lg-3" id="dvdCOD_STIP">
                    <input type="text" id="txtCOD_STIP" class="form-control datos" disabled="disabled"/>
                </div>
            </div> 
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Codigo Tipo de Contrato</label>
                </div>
                <div class="col-lg-3" id="dvdCOD_TIP">
                    <input type="text" id="txtCOD_TIP" class="form-control datos" disabled="disabled"/>
                </div>
                <div class="col-lg-3" id="dvdNombreTipoContrato">
                    <input type="text" id="txtNombreTipoContrato" class="form-control" disabled="disabled"/>
                </div>
            </div> 
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Nombre</label>
                </div>
                <div class="col-lg-3" id="dvdNOM_STIP">
                    <input type="text" id="txtNOM_STIP" class="form-control habilitar limpiar datos validar"/>
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
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Clase de Contrato Contraloria Departamental</label>
                </div>
                <div class="col-lg-3" id="dvdCLA_CON_DEP">
                    <input type="text" id="txtCLA_CON_DEP" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div> 
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Homologación formato 20 1a contraloría departamental </label>
                </div>
                <div class="col-lg-3" id="dvdCRT_F20_1A">
                    <input type="text" id="txtCRT_F20_1A" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div> 
        </div>
    </div>
</div>
    <script src="js/SubTiposContratos.js" type="text/javascript"></script>

</asp:Content>
