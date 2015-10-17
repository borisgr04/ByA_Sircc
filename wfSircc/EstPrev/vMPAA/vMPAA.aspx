<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="vMPAA.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.MPAA" %>
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
                    <label>ID</label>
                </div>
                <div class="col-lg-2" id="dvdID">
                    <input type="text" id="txtID" class="form-control mpaadatos" disabled="disabled"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Vigencia</label>
                </div>
                <div class="col-lg-3" id="dvdVIGENCIA">
                    <input type="text" id="txtVIGENCIA" class="form-control mpaadatos validar" disabled="disabled"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Observación</label>
                </div>
                <div class="col-lg-3" id="dvdOBSERV">
                    <textarea id="txtOBSERV" class="form-control mpaadatos habilitar limpiar validar" rows="2"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Fecha Inicial</label>
                </div>
                <div class="col-lg-3" id="dvdFEC_INI">
                    <input type="date" id="txtFEC_INI" class="form-control mpaadatos habilitar limpiar validar"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Fecha Final</label>
                </div>
                <div class="col-lg-3" id="dvdFEC_FIN">
                    <input type="date" id="txtFEC_FIN" class="form-control mpaadatos habilitar limpiar validar"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Estado</label>
                </div>
                <div class="col-lg-3" id="dvdESTADO">
                    <select class="form-control mpaadatos habilitar limpiar" id="cboESTADO">
                        <option value="AB">ABIERTO</option>
                        <option value="CE">CERRADO</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
    <script src="js/MPAA.js" type="text/javascript"></script>

</asp:Content>
