<%@ Page Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Pproponentes.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.gPproponentes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/Content/kendoui_css/kendo.common.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.default.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.rtl.min.css" rel="stylesheet" />
    <div class="row">
        <div class="col-md-12">
            <div class="col-lg-9">
                <div class="btn-toolbar">
                    <button type="button" class="btn btn-sm btn-warning" id="nuevoButton">
                        <span class="glyphicon glyphicon-plus-sign"></span>
                        Nuevo</button>
                    <button type="button" class="btn btn-sm btn-primary" id="editarButton">
                        <span class="glyphicon glyphicon-pencil"></span>
                        Editar</button>
                    <button type="button" class="btn btn-sm btn-success" id="guardarButton">
                        <span class="glyphicon glyphicon-floppy-saved"></span>
                        Guardar</button>
                    <button type="button" class="btn btn-sm btn-danger" id="cancelarButton">
                        <span class="glyphicon glyphicon-remove"></span>
                        Cancelar</button>
                    <button type="button" class="btn btn-sm btn-info" id="btnAsignarNit">
                        <span class="glyphicon glyphicon-pencil"></span>
                        Asignar Nit</button>
                    <button type="button" class="btn btn-sm btn-success" id="btnVolverAtras">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        Atrás</button>
                    <%--<button type="button" class="btn btn-sm btn-info" id="btnAdjudicar">
                        <span class="glyphicon glyphicon-pencil"></span>
                        Adjudicar</button> --%> 
                </div>
            </div>
        </div>
    </div>
    <style>
        .Separar {
            margin:5px
        }
    </style>
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
    <div class="row" style="margin:20px">
        <div  role="form" id="formDATOS">
            <div class="tabbable">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#tabDatosTercero" data-toggle="tab">1. Datos del Tercero</a></li>
                    <li><a href="#tabDatosProponente" data-toggle="tab">2. Datos de la Propuesta</a></li>
                </ul>
                <div class="tab-content">
                    <div id="tabDatosTercero" class="tab-pane in active">
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Tipo de proponente</label>
                            </div>
                            <div class="col-lg-6" id="dvdTipoProponente">
                                <select class="form-control" id="cboTipoProponente">
                                    <option selected="selected" value="PU">Única Persona</option>
                                    <option value="CS">Consorcio</option>
                                    <option value="UT">Unión Temporal</option>
                                </select>
                            </div>
                        </div>    
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Proponente</label>
                            </div>
                            <div class="col-lg-6">
                                <div class="input-group" id="dvdIdProponente">
                                    <input type="text" class="form-control" id="txtIdProponente" disabled="disabled" />
                                    <div class="input-xs input-group-btn ">
                                        <button type="button" id="btnBuscarIdProponente" class=" btn btn-sm btn-info dropdown-toggle" data-toggle="dropdown">
                                            <span class="icon-search"></span>
                                        </button>
                                   </div>
                                </div>
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Tipo  Identificación</label>
                            </div>
                            <div class="col-sm-6">
                                <select id="cboTipoIdentificacion" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Expedida en</label>
                            </div>
                            <div class="col-sm-6" id="dvdExpedicionIdProponente">
                                <input type="text" class="form-control" id="txtExpedicionIdProponente" />
                            </div>
                        </div>
                        <%--<div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Tipo Persona</label>
                            </div>
                            <div class="col-sm-6">
                                <select id="cboTipoPersonaProponente" class="form-control">

                                </select>
                            </div>
                        </div>--%>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Primer Apellido</label>
                            </div>
                            <div class="col-sm-6" id="dvdPrimerApellidoProponente">
                                <input type="text" class="form-control" id="txtPrimerApellidoProponente" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Segundo Apellido</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txtSegundoApellidoProponente" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Primer Nombre</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txtPrimerNombreProponente" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Segundo Nombre</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txtSegundoNombreProponente" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Razón Social</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txtRazonSocialProponente" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Dirección</label>
                            </div>
                            <div class="col-sm-6" id="dvdDireccionProponente">
                                <input type="text" class="form-control" id="txtDireccionProponente" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Teléfono</label>
                            </div>
                            <div class="col-sm-6" id="dvdTelefonoProponente">
                                <input type="text" class="form-control" id="txtTelefonoProponente" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Email</label>
                            </div>
                            <div class="col-sm-6" id="dvdEmailProponente" >
                                <input type="text" class="form-control" id="txtEmailProponente" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Fecha de nacimiento/creación</label>
                            </div>
                            <div class="col-lg-3" id="dvdFechaNacimiento">
                                <input type="date" id="txtFechaNacimiento" class="form-control tip" data-toggle="tooltip" data-placement="top" title="Si es una persona natural digite la fecha de nacimiento, y si es una persona jurídica digite la fecha de creación" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Id. Representante Legal</label>
                            </div>
                            <div class="col-lg-6">
                                <div class="input-group" id="dvdIdRepresentanteLegal">
                                    <input type="text" class="form-control" id="txtIdRepresentanteLegal" disabled="disabled" />
                                    <div class="input-xs input-group-btn ">
                                        <button type="button" id="btnBuscarIdRepresentanteLegal" class=" btn btn-sm btn-info dropdown-toggle" data-toggle="dropdown">
                                            <span class="icon-search"></span>
                                        </button>
                                   </div>
                                </div>
                            </div>
                        </div>        
                        <%--<div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Dirección</label>
                            </div>
                            <div class="col-lg-3">
                                <input type="text" id="txtDireccion" class="form-control" />
                            </div>
                            <div class="col-lg-1 text-right">
                                <label>Telefono</label>
                            </div>
                            <div class="col-lg-2">
                                <input type="text" id="txtTelefono" class="form-control" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Correo Electronico</label>
                            </div>
                            <div class="col-lg-6">
                                <input type="text" id="txtCorreoElectronico" class="form-control" />
                            </div>
                        </div>  
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <input type="checkbox" id="txtSeRequiereAseguradora" />
                            </div>
                            <div class="col-lg-2">
                                <label>Se requiere aseguradora</label>
                            </div>            
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Aseguradora</label>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-control" id="cboAseguradora">
                                    <option value="">Seleccione...</option>
                                </select>
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Fecha Inicial</label>
                            </div>
                            <div class="col-lg-3">
                                <input type="date" id="txtFechaInicialAseguradora" class="form-control" />
                            </div>
                            <div class="col-lg-1 text-right">
                                <label>Fecha Final</label>
                            </div>
                            <div class="col-lg-2">
                                <input type="date" id="txtFechaFinalAseguradora" class="form-control" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Valor</label>
                            </div>
                            <div class="col-lg-2">
                                <input type="text" id="txtValorAseguradora" class="form-control" />
                            </div>
                        </div>--%>
                    </div>
                    <div id="tabDatosProponente" class="tab-pane">                            
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Nro. Proceso</label>
                            </div>
                            <div class="col-lg-6" id="dvdNumeroProceso">
                                <input type="text" class="form-control" id="txtNumeroProceso" disabled="disabled" />                    
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Fecha de entrega</label>
                            </div>
                            <div class="col-lg-3" id="dvdFechaEntraga">
                                <input type="date" id="txtFechaEntraga" class="form-control" />
                            </div>
                           <%-- <div class="col-lg-1 text-right">
                                <label>Hora</label>
                            </div>
                            <div class="col-lg-2">
                                <input type="time" id="txtHoraEntraga" class="form-control" />
                            </div>--%>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Valor de la propuesta</label>
                            </div>
                            <div class="col-lg-6" id="dvdValorPropuesta">
                                <input type="text" class="form-control currency" id="txtValorPropuesta" />                    
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Valor de la propuesta sin IVA</label>
                            </div>
                            <div class="col-lg-6" id="dvdValorPropuestaSinIVA">
                                <input type="text" class="form-control currency" id="txtValorPropuestaSinIVA" />                    
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Aportes</label>
                            </div>
                            <div class="col-lg-6">
                                <div id="txtAportes" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                                <%--<input type="text" class="form-control currency" id="txtAportes" />--%>                    
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Municipio</label>
                            </div>
                            <div class="col-lg-6" id="dvdMunicipio">
                                <input type="text" id="txtMunicipio" class="form-control" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Denominacion</label>
                            </div>
                            <div class="col-lg-6" id="dvdDenominacion">
                                <input type="text" id="txtDenominacion" value="Contratista" class="form-control" />
                            </div>
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Numero de folios</label>
                            </div>
                            <div class="col-lg-1" id="dvdNumeroFolios">
                                <input type="text" id="txtNumeroFolios" class="form-control" />
                            </div>           
                        </div>
                        <br /><br />

                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <input type="checkbox" id="txtRequierePoliza"/>
                            </div> 
                            <div class="col-lg-2">
                                <label>La oferta requiere póliza</label>
                            </div>                                      
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Numero de Póliza</label>
                            </div>
                            <div class="col-lg-3">
                                <input type="text" id="txtNumeroPoliza" class="form-control" />
                            </div>           
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Fecha Inicial Póliza</label>
                            </div>
                            <div class="col-lg-3">
                                <input type="date" id="txtFechaInicialPoliza" class="form-control" />
                            </div>           
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Fecha Final Póliza</label>
                            </div>
                            <div class="col-lg-3">
                                <input type="date" id="txtFechaFinalPoliza" class="form-control" />
                            </div>           
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Aseguradora</label>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-control" id="cboAseguradoras"></select>
                            </div>           
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Nombre Póliza</label>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-control" id="cboNombrePoliza"></select>
                            </div>           
                        </div>
                        <div class="row Separar">
                            <div class="col-lg-2 text-right">
                                <label>Valor de Póliza</label>
                            </div>
                            <div class="col-lg-3">
                                <input type="text" id="txtValorPoliza" class="form-control currency" />
                            </div>           
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    <div class="modal fade" id="modalAdjudicar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H2">Adjudicacion</h4>
                </div>
                <div class="modal-body">
                    <div class="row Separar">
                        <div class="col-lg-3 text-right">
                            <label>Adjudicado</label>
                        </div>
                        <div class="col-lg-5">
                            <select class="form-control" id="cboAdjudicado">
                                <option selected="selected" value="N">NO</option>
                                <option value="S">SI</option>
                            </select>
                        </div>
                    </div>
                    <div class="row Separar">
                        <div class="col-lg-3 text-right">
                            <label>Fecha de adjudicacion</label>
                        </div>
                        <div class="col-lg-5">
                            <input type="date" class="form-control" id="txtFechaAdjudicado"/>
                        </div>
                    </div>
                    <div class="row Separar">
                        <div class="col-lg-3 text-right">
                            <label>Observación</label>
                        </div>
                        <div class="col-lg-5">
                            <textarea class="form-control" id="txtObservacionAdjudicacion" rows="2"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    
    <div class="modal fade" id="modalAsignarNit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H1">Asignación NIT</h4>
                </div>
                <div class="modal-body">
                    <div class="row Separar">
                        <div class="col-lg-3 text-right">
                            <label>NIT</label>
                        </div>
                        <div class="col-lg-5"><input type="text" id="txtNitEmpresa" class="form-control" /></div>
                        <div class="col-lg-2"><input type="text" id="txtCodigoVerificacion" class="form-control" /></div>  
                    </div>
                    <div class="row Separar">
                        <div class="col-lg-3 text-right"><label>Lugar Expedición</label></div>
                        <div class="col-lg-5"><input type="text" id="txtLugarExpedicion" class="form-control" /></div>        
                        <div class="col-lg-2 text-center">
                            <button type="button" class="btn btn-sm btn-success" id="btnEnviarAsignarNit">
                                <span class="glyphicon glyphicon-floppy-saved"></span>
                                Asignar
                            </button>
                        </div>                        
                    </div>
                </div>        
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    
    <div id="secBsqTerceros"></div>
    <script type="text/javascript" src="js/Pproponentes.js"></script>
    <script src="/jqscripts/kendoui/kendo.web.min.js"></script>
</asp:Content>