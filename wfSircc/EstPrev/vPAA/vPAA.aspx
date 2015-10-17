<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="vPAA.aspx.cs" Inherits="wfSircc.EstPrev.PAA.PAA" %>

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
            <%--<div class="col-lg-2">
                <div class="input-group">
                    <input type="text" class="form-control inputHab" id="txtNumero" value="" />
                    <div class="input-group-btn ">
                        <button type="button" id="BtnDwnAbrir" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                            <span class="icon-folder-open-alt"></span>                        
                        </button>
                   
                    </div>
                </div>
            </div>--%>
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
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Id. Padre</label>
                </div>
                <div class="col-lg-2" id="dvdIdMPAA">
                    <input type="text" id="txtIdMPAA" class="form-control" disabled="disabled"/>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>ID</label>
                </div>
                <div class="col-lg-2" id="dvdId">
                    <input type="text" id="txtId" class="form-control" disabled="disabled"/>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Vigencia</label>
                </div>
                <div class="col-lg-5" id="Div2">
                    <input type="text" id="txtVigencia" class="form-control" disabled="disabled"/>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Descripción</label>
                </div>
                <div class="col-lg-5" id="dvdDescripcion">
                    <textarea class="form-control" id="txtDescripcion" rows="4"></textarea>
                </div><br /><br /><br /><br /><br />

            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Fecha estimada de inicio de proceso de selección</label>
                </div>
                <div class="col-lg-5" id="dvdFEC_EST_INI">
                    <input type="date" class="form-control" id="txtFEC_EST_INI"/>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Duración estimada del contrato</label>
                </div>
                <div class="col-lg-5" id="Div1">
                    <div class="row">
                        <div class="col-lg-2" id="dvdPLA1_EJE">
                            <input type="number" id="txtPLA1_EJE" class="form-control snumero"/>
                        </div>
                        <div class="col-lg-3" id="dvdTIP1_PLA">
                            <select id="cboTIP1_PLA" class="form-control">
                            </select>
                        </div>
                        <div class="col-lg-2 text-center"><label> y </label></div>
                        <div class="col-lg-2" id="dvdPLA2_EJE">
                            <input type="number" id="txtPLA2_EJE" class="form-control snumero"/>
                        </div>
                        <div class="col-lg-3" id="dvdTIP2_PLA">
                            <select id="cboTIP2_PLA" class="form-control">
                            </select>
                        </div>
                    </div>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Modalidad de selección</label>
                </div>
                <div class="col-lg-5" id="dvdModalidad">
                    <select id="cboModalidad" class="form-control"></select>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Fuente de los recursos</label>
                </div>
                <div class="col-lg-5" id="dvdFuente">
                    <select id="cboFuente" class="form-control">
                        <option value="">Seleccione...</option>
                        <option value="IN">Inversión</option>
                        <option value="FU">Funcionamiento</option>
                        <%--<option value="IR">Inversión Recursos propios/ ICLD-Impuesto  con destino al deporte Ley 181/95 y de productos nacionales y extranjeros</option>--%>
                    </select>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Valor total estimado</label>
                </div>
                <div class="col-lg-5" id="dvdValorEstimado">
                    <input type="text" class="form-control currency snumero" id="txtValorEstimado" value="0"/>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Valor estimado en la vigencia actual</label>
                </div>
                <div class="col-lg-5" id="dvdValorEstimadoVigenciaActual">
                    <input type="text" class="form-control currency snumero" id="txtValorEstimadoVigenciaActual" value="0"/>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>¿Se requieren vigencias futuras?</label>
                </div>
                <div class="col-lg-5" id="dvdSeRequierenVigenciasF">
                    <select id="cboSeRequierenVigenciasF" class="form-control">
                        <option value="">Seleccione...</option>
                        <option value="NO">NO</option>
                        <option value="SI">SI</option>
                        
                    </select>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Estado de solicitud de vigencias futuras</label>
                </div>
                <div class="col-lg-5" id="dvdEstadoSolicitudVigenciasFuturas">
                    <select id="cboEstadoSolicitudVigenciasFuturas" class="form-control">
                        <option value="">Seleccione...</option>
                        <option value="NA">N/A</option>
                        <option value="PS">Por Solicitar</option>
                        
                    </select>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Dependencia Necesidad</label>
                </div>
                <div class="col-lg-5" id="dvdDependenciaNecesidad">
                    <select id="cboDependenciaNecesidad" class="form-control">
                    </select>
                </div><br /><br />
            </div>
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Datos de contacto del responsable</label>
                </div>
                <div class="col-lg-5" id="dvdDatosContactoResponsable">
                    <textarea class="form-control" id="txtDatosContactoResponsable" rows="3"></textarea>
                </div><br /><br /><br /><br />
            </div>            
            <div class="row">
                <div class="col-lg-2 text-right">
                    <label>Códigos UNSPSC</label>
                </div>
                <div class="col-lg-2" id="dvdUNSPSC">
                    <div class="input-group">
                        <div class="input-group-btn ">
                            <button type="button" id="btnBuscarCodigoUNSPSC" class="btn btn-info">
                                <span class="icon-search"></span>                        
                            </button>                   
                        </div>
                    </div>
                </div>
                <br /><br />
                <div class="row">
                    <div class="col-lg-2"></div>
                    <div class="col-lg-5">
                        <div class="list-group" id="lstCodigos">
                            <%--<a id="Departamento" onclick="BsqPersonas.EliminarFiltro(id)" class="list-group-item list-group-item-info" style="background:#d9edf7"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Cesar</a>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <div id="secBsqCodigoUNSPSC"></div>
    <script src="js/PAA.js" type="text/javascript"></script>

</asp:Content>


