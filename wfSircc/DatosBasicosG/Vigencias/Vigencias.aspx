<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="Vigencias.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.MPAA" %>
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
                    <label>Año</label>
                </div>
                <div class="col-lg-2" id="dvdYEAR_VIG">
                    <select class="form-control habilitar limpiar datos validar" id="cboYEAR_VIG"></select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Fecha Inicial</label>
                </div>
                <div class="col-lg-3" id="dvdFEC_INI_VIG">
                    <input type="date" id="txtFEC_INI_VIG" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Fecha Final</label>
                </div>
                <div class="col-lg-3" id="dvdFEC_FIN_VIG">
                    <input type="date" id="txtFEC_FIN_VIG" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Porcentaje de adición</label>
                </div>
                <div class="col-lg-3" id="dvdPOR_ADI_VIG">
                    <input type="text" id="txtPOR_ADI_VIG" class="form-control habilitar limpiar datos validar snumero"/>
                </div>
            </div>        
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Estado</label>
                </div>
                <div class="col-lg-3" id="dvdEST_VIG">
                    <select class="form-control habilitar limpiar datos validar" id="cboEST_VIG">
                        <option value="ABIERTA">ABIERTA</option>
                        <option value="CERRADA">CERRADA</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
    <script src="js/Vigencias.js" type="text/javascript"></script>

</asp:Content>
