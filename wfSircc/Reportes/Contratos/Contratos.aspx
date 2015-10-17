<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Contratos.aspx.cs" Inherits="wfSircc.Reportes.Contratos.Contratos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">              
        <div class="row" id="secParametrosConsulta">
            <div class="panel panel-default">
                <div class="panel-heading">Seleccione los campos para realizar el filtro de contratos</div>                    
                <div class="panel-body">
                    <div class="form-group row text-right">
                        <div class="col-lg-12">
                            <button type="button" value="Limpiar" id="btnLimpiar" data-loading-text="Loading..."
                                class="btn btn-info" title="Limpia el formulario">
                                <span class="glyphicon glyphicon-remove"></span>Limpiar
                            </button>
                             <button type="button" id="BtnConsulta" data-loading-text="Loading..."
                                class="btn btn-success" title="Actualiza el listado de Solicitudes de acuerdo a la dependencia Seleccionada">
                                <span class="glyphicon glyphicon-search"></span>Consultar
                            </button>
                        </div>
                    </div>                      
                    <div class="form-group row">
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkVigencia"/>
                            <label>Vigencia</label>
                            <input type="checkbox" id="chkAnulados" style="margin-left:30px"/>
                            <label>Incluir anulados</label>
                            <input type="text" class="form-control input-sm snumero" id="txtVigencia"/>
                        </div>
                        <div class="col-lg-3">   
                            <input type="checkbox" id="chkNumeroContrato"/>
                            <label>Nro. Contrato</label>
                            <input type="text" class="form-control input-sm" id="txtNumeroContrato"/>                        
                        </div>
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkTipoContrato"/>
                            <label>Tipo Contrato</label>
                            <select class="form-control input-sm" id="cboTipoContrato"></select>
                        </div>
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkSubTipoContrato"/>
                            <label>SubTipo</label>
                            <select class="form-control input-sm" id="cboSubTipoContrato"></select> 
                        </div>
                    </div>
                    <div class="form-group row">                        
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkUltimaActa"/>
                            <label>Ultima acta</label>
                            <select class="form-control input-sm" id="cboUltimaActa"></select>
                        </div>
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkEstado"/>
                            <label>Estado</label>
                            <select class="form-control input-sm" id="cboEstado"></select> 
                        </div>
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkSectorDestino"/>
                            <label>Sector destino</label>
                            <select class="form-control input-sm" id="cboSectorDestino"></select> 
                        </div>
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkProyecto"/>
                            <label>Proyecto</label>
                            <input type="text" class="form-control input-sm" id="txtProyecto"/>
                        </div>
                    </div>                                      
                    <div class="form-group row">  
                        <div class="col-lg-6">
                            <input type="checkbox" id="chkDependenciaNecesidad"/>
                            <label>Depenencia que genera la nececidad</label>
                            <select class="form-control input-sm" id="cboDependenciaNecesidad"></select> 
                        </div>                      
                        <div class="col-lg-6">
                            <input type="checkbox" id="chkDependenciaAcargo"/>
                            <label>Depenencia a cargo del proceso</label>
                            <select class="form-control input-sm" id="cboDependenciaAcargo"></select> 
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <div class="col-lg-12">
                                <input type="checkbox" id="chkFechaSuscripcion"/>
                                <label>Fecha de suscripción</label>
                            </div>    
                            <div class="col-lg-5">
                                <input type="date" class="form-control input-sm" id="txtFechaISuscripcion"/>
                            </div> 
                            <div class="col-lg-2">
                                <label>hasta</label>
                            </div>                       
                            <div class="col-lg-5">
                                <input type="date" class="form-control input-sm" id="txtFechaFSuscripcion"/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="col-lg-12">
                                <input type="checkbox" id="chkFechaRegistro"/>
                                <label>Fecha de registro</label>
                            </div>    
                            <div class="col-lg-5">
                                <input type="date" class="form-control input-sm" id="txtFechaIRegistro"/>
                            </div> 
                            <div class="col-lg-2">
                                <label>hasta</label>
                            </div>                       
                            <div class="col-lg-5">
                                <input type="date" class="form-control input-sm" id="txtFechaFRegistro"/>
                            </div>
                        </div>
                    </div>  
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <div class="col-lg-12">
                                <input type="checkbox" id="chkContratista"/>
                                <label>Contratista</label>
                            </div>
                            <div class="col-lg-12">
                                <div class="col-lg-4">
                                    <input id="txtIdContratista" type="text" class="form-control input-sm" disabled="disabled" />
                                </div>
                                <div class="col-lg-2">
                                    <button type="button" value="Nuevo" id="btnBuscarContratista" class="btn btn-primary btn-xs" title="Abrir Cuadro de Busqueda">
                                        <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                                <div class="col-lg-6">
                                    <input id="txtNomContratista" type="text" class="form-control input-sm" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="col-lg-12">
                                <input type="checkbox" id="chkInterventor"/>
                                <label>Interventor</label>
                            </div>
                            <div class="col-lg-12">
                                <div class="col-lg-4">
                                    <input id="txtIdInterventor" type="text" class="form-control input-sm" disabled="disabled"/>
                                </div>
                                <div class="col-lg-2">
                                    <button type="button" value="Nuevo" id="btnBsqInterventor" class="btn btn-primary btn-xs" title="Abrir Cuadro de Busqueda">
                                        <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                                <div class="col-lg-6">
                                    <input id="txtNomInterventor" type="text" class="form-control input-sm" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <input type="checkbox" id="chkTipoProceso"/>
                            <label>Tipo de proceso</label>
                            <select class="form-control input-sm" id="cboTipoProceso"></select> 
                        </div>                        
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkPlaneacionPrecontractual" disabled="disabled"/>
                            <label>Planeacion Precontractual</label>
                            <input type="text" class="form-control input-sm" id="txtPlaneacionPrecontractual" disabled="disabled"/>
                        </div>
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkRecurso"/>
                            <label>Recurso</label>
                            <input type="text" class="form-control input-sm" id="txtRecurso" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkDisponibilidadPresupuestal"/>
                            <label>Disponibilidad Presupuestal (CDP)</label>                            
                            <input type="text" class="form-control input-sm" id="txtDisponibilidadPresupuestal" />
                        </div>
                        <div class="col-lg-3">
                            <label>Vigencia</label>                            
                            <input type="text" class="form-control input-sm" id="txtVigenciaDisponibilidadPresupuestal" />
                        </div>
                        <div class="col-lg-3">
                            <input type="checkbox" id="chkRegistroPresupuestal"/>
                            <label>Registro Presupuestal (RP)</label>                            
                            <input type="text" class="form-control input-sm" id="txtRegistroPresupuestal" />
                        </div>
                        <div class="col-lg-3">
                            <label>Vigencia</label>                            
                            <input type="text" class="form-control input-sm" id="txtVigenciaRegistroPresupuestal" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <div class="col-lg-12">
                                <input type="checkbox" id="chkValorContratoConvenio"/>
                                <label>Valor de contrato/convenio</label>
                            </div>    
                            <div class="col-lg-5">
                                <input type="text" class="form-control input-sm" id="txtValorDesdePrecontractual"/>
                            </div> 
                            <div class="col-lg-2">
                                <label>hasta</label>
                            </div>                       
                            <div class="col-lg-5">
                                <input type="text" class="form-control input-sm" id="txtValorHastaPrecontractual"/>
                            </div>
                        </div> 
                        <div class="col-lg-6">
                            <div class="col-lg-12">
                                <input type="checkbox" id="chkRubroPresupuestal"/>
                                <label>Rubro presupuestal</label>
                            </div>
                            <div class="col-lg-12">
                                <div class="col-lg-4">
                                    <input id="txtRubroPresupuestal" type="text" class="form-control input-sm" disabled="disabled" />
                                </div>
                                <div class="col-lg-2">
                                    <button type="button" value="Nuevo" id="btmBsqRubro" class="btn btn-primary btn-xs" title="Abrir Cuadro de Busqueda">
                                        <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                                <div class="col-lg-6">
                                    <input id="txtNomRubroPresupuestal" type="text" class="form-control input-sm" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-12">
                            <input type="checkbox" id="chkObjeto"/>
                            <label>Objeto</label>              
                            <textarea class="form-control input-sm" id="txtObjeto"></textarea>    
                        </div>                        
                    </div>
                </div>
            </div>            
        </div>
        <div class="row" id="secRespuestaConsulta" style="display:none;">    
            <div class="panel panel-default">
                <div class="panel-heading">Resultado de la consulta</div>                    
                <div class="panel-body">
                    <div class="form-group row text-right" style="margin-right:7px;">
                        <button type="button" class="btn btn-info" id="btnExportar">
                            <span class="glyphicon glyphicon-save"></span> Exportar
                        </button>
                        <button type="button" class="btn btn-success" id="btnAtras">
                            <span class="glyphicon glyphicon-chevron-left"></span> Atrás
                        </button> 
                    </div>
                    <div class="row text-right">
                        <label id="nroContratos"></label>
                    </div> 
                    <style>

                    </style>
                    <div class="form-group row text-right">
                        <div style="overflow:auto; width:100%; height:450px">
                        <table class="table table-bordered table-hover table-striped tablesorter" id="tblConsulta">
                            <thead>
                                <tr>
                                    <th>Tipo<i class="fa fa-sort"></i></th>
                                    <th>Numero<i class="fa fa-sort"></i></th>
                                    <th>Objeto<i class="fa fa-sort"></i></th>
                                    <th>Identificacion contratista<i class="fa fa-sort"></i></th>
                                    <th>Nombre contratista<i class="fa fa-sort"></i></th>
                                    <th>Clase contratación<i class="fa fa-sort"></i></th>
                                    <th>Dependencia que genera la necesidad<i class="fa fa-sort"></i></th>
                                    <th>Dependencia a cargo del proceso<i class="fa fa-sort"></i></th>
                                    <th>Fecha de suscripción<i class="fa fa-sort"></i></th>
                                    <th>Estado<i class="fa fa-sort"></i></th>
                                    <th>Plazo de ejecución en dias<i class="fa fa-sort"></i></th>
                                    <th>Valor Total<i class="fa fa-sort"></i></th>
                                    <th>Aportes propios<i class="fa fa-sort"></i></th>                                    
                                    <th>Tipo de proceso de contratación<i class="fa fa-sort"></i></th>
                                    <th>No. Proceso<i class="fa fa-sort"></i></th>
                                    <th>No. Adiciones<i class="fa fa-sort"></i></th>
                                    <th>Valor Adiciones<i class="fa fa-sort"></i></th>
                                    <th>Total plazo adiciones en dias<i class="fa fa-sort"></i></th>
                                    <th>Urgencia manifiesta<i class="fa fa-sort"></i></th>
                                    <th>Exoneracion de IMPTOS<i class="fa fa-sort"></i></th>
                                    <th>Fecha de aprobación de la poliza<i class="fa fa-sort"></i></th>
                                    <th>Identificación Interventor<i class="fa fa-sort"></i></th>
                                    <th>Nombre Interventor<i class="fa fa-sort"></i></th>
                                    <th>Identificación Supervisor<i class="fa fa-sort"></i></th>
                                    <th>Nombre Supervisor<i class="fa fa-sort"></i></th>
                                    <th>Identificación Representante Legal<i class="fa fa-sort"></i></th>
                                    <th>Representante legal<i class="fa fa-sort"></i></th>
                                    <th>Fecha de inicio<i class="fa fa-sort"></i></th>
                                    <th>Fecha de finalización<i class="fa fa-sort"></i></th>                                    
                                    <th>Fecha Liquidación<i class="fa fa-sort"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        </div>
                    </div>  
                </div>
            </div>                  
        </div>
    </div>
     <div class="modal fade" id="modalTer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H5">Consulta de Terceros</h4>
                </div>
                <div class="modal-body">
                    <div id="jqxgridTer">
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
    <!-- /.modal TERCEROS-->

     <div class="modal fade" id="modalRubros" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H8">Rubros</h4>
                </div>
                <div class="modal-body">
                    <div id="jqxgridConRubros">
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
    <script src="../../jqscripts/jquery.battatech.excelexport.js"></script>
    <script src="js/Contratos.js"></script>
</asp:Content>
