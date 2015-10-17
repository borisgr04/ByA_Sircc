<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="Dependencias.aspx.cs" Inherits="wfSircc.EstPrev.MPAA.MPAA" %>
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
                    <label>Código</label>
                </div>
                <div class="col-lg-3" id="dvdCOD_DEP">
                    <input type="text" id="txtCOD_DEP" class="form-control datos" disabled="disabled"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Nombre</label>
                </div>
                <div class="col-lg-3" id="dvdNOM_DEP">
                    <input type="text" id="txtNOM_DEP" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div>
            <div class="form-group row" style="margin-bottom:25px">
                <div class="col-lg-2 text-right">
                    <label>Email</label>
                </div>
                <div class="col-lg-3" id="dvdEMAIL">
                    <input type="text" id="txtEMAIL" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Id. Tercero/Encargado</label>
                </div>
                <div class="col-lg-3" id="dvdIDE_TER">
                    <div class="input-group">
                        <input type="text" id="txtIDE_TER" class="form-control limpiar datos validar" disabled="disabled"/>
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
                    <label>Cargo Encargado</label>
                </div>
                <div class="col-lg-3" id="dvdCARGO_ENC">
                    <input type="text" id="txtCARGO_ENC" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div>
            <div class="form-group row" style="margin-bottom:25px">
                <div class="col-lg-2 text-right">
                    <label>Norma</label>
                </div>
                <div class="col-lg-3" id="dvdNORMA_DEL">
                    <input type="text" id="txtNORMA_DEL" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Dependencia delegada?</label>
                </div>
                <div class="col-lg-3" id="dvdDEP_DEL">
                    <select class="form-control habilitar limpiar datos validar" id="cboDEP_DEL">
                        <option value="S">SI</option>
                        <option value="N">NO</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Abreviatura</label>
                </div>
                <div class="col-lg-3" id="dvdDEP_ABR">
                    <input type="text" id="txtDEP_ABR" class="form-control habilitar limpiar datos validar"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Integrado con Procesos y Cronograma?</label>
                </div>
                <div class="col-lg-3" id="dvdINT_PRO">
                    <select class="form-control habilitar limpiar datos validar" id="cboINT_PRO">
                        <option value="S">SI</option>
                        <option value="N">NO</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2 text-right">
                    <label>Estado</label>
                </div>
                <div class="col-lg-3" id="dvdESTADO">
                    <select class="form-control habilitar limpiar datos validar" id="cboESTADO">
                        <option value="AC">ACTIVO</option>
                        <option value="IN">INACTIVO</option>
                    </select>
                </div>
            </div>  
            <div id="secBsqTerceros"></div> 
        </div>
    </div>
</div>
    <script src="js/Dependencias.js" type="text/javascript"></script>

</asp:Content>
