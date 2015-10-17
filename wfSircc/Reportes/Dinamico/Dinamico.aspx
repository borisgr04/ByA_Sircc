<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Dinamico.aspx.cs" Inherits="wfSircc.Reportes.Dinamico.Dinamico" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .ul-box {
            border:1px solid #c5d0dc; 
            list-style-type: none; 
            height: 20em;
            overflow: scroll;
            overflow-x:hidden;
        }
        .li-box-selected {
            background:#6495ED;
            color: white;
        }
        label {
            margin-left:5px;
            margin-bottom:0px;
            margin-right:0px;
            margin-top:0px;
        }
    </style> 
    <div id="dvdCapturaFiltros">
        <ul class="nav nav-tabs">
            <li class="active" id="liSeleccionCampos"><a href="#tabSeleccionCampos" data-toggle="tab">1. Selección campos</a></li>
            <li  id="liFiltros"><a href="#tabFiltro" data-toggle="tab">2. Filtros</a></li>
            <li  id="liConsolidado"><a href="#tabConsolidados" data-toggle="tab">2. Consolidados</a></li>
        </ul>
        <div class="tab-content">
            <div id="tabSeleccionCampos" class="tab-pane in active">
                <div class="container">
                    <div class="form-group row">
                        <label>Seleccione los campos que desea mostrar el en reporte</label>
                    </div>
                    <div class="form-group row">
                        <div class="col-xs-1"></div>
                        <div class="col-xs-4">
                            <h5 style="margin-left:25px;"><strong>Listado de Columnas</strong></h5>
                            <strong style="margin-left:25px;">Seleccionar: </strong>  <a href="javascript:;" id="btnTodosListado" style="margin-left:10px;">Todos</a><a href="javascript:;" id="btnNingunoListado" style="margin-left:10px;">Ninguno</a>   
                            <ul id="ul-campos-posibles" class="connectedSortable ul-box">
                            </ul>
                        </div>
                        <div class="col-xs-2 text-center">
                            <br /><br />                            
                            <br /><br /><br />
                            <div class="form-group row text-center"><button type="button" id="btnAgregarSeleccionados" class="btn btn-success" style="width:150px;"><span class="glyphicon glyphicon-arrow-right"></span> Agregar</button></div>
                            <br />
                            <div class="form-group row text-center"><button type="button" id="btnQuitarSeleccionados" class="btn btn-danger" style="width:150px;"><span class="glyphicon glyphicon-arrow-left"></span> Quitar</button></div>
                        </div>
                        <div class="col-xs-4">
                            <h5 style="margin-left:25px;"><strong>Campos Seleccionados</strong></h5>
                            <strong style="margin-left:25px;">Seleccionar: </strong>  <a href="javascript:;" id="btnTodosSeleccionados" style="margin-left:10px;">Todos</a><a href="javascript:;" id="btnNingunoSeleccionados" style="margin-left:10px;">Ninguno</a>   
                            <ul id="ul-campos-seleccionados" class="connectedSortable ul-box">
                            </ul>
                        </div>
                        <div class="col-xs-1"></div>
                    </div>
                    <div class="form-group row text-right">
                        <button type="button" class="btn btn-success btnIrFiltros">Siguiente <span class="glyphicon glyphicon-chevron-right"></span></button>
                    </div>
                </div>
            </div>
            <div id="tabFiltro" class="tab-pane in">
                <div class="container">
                    <div class="form-group row">
                        <div class="col-lg-6 text-left">
                            <label>Seleccione los filtros que se aplicaran</label>
                        </div>
                        <div class="col-lg-6 text-right">
                            <button type="button" class="btn btn-info btnLimpiar"><span class="glyphicon glyphicon-remove"></span>Limpiar</button>
                            <button type="button" class="btn btn-success btnIrSeleccionCampos"><span class="glyphicon glyphicon-chevron-left"></span> Anterior</button>
                            <button type="button" class="btn btn-success btnIrConsolidados">Siguiente <span class="glyphicon glyphicon-chevron-right"></span></button>
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
                    <div class="form-group row">
                        <div class="col-lg-12 text-right">
                            <button type="button" class="btn btn-info btnLimpiar"><span class="glyphicon glyphicon-remove"></span>Limpiar</button>
                            <button type="button" class="btn btn-success btnIrSeleccionCampos"><span class="glyphicon glyphicon-chevron-left"></span> Anterior</button>
                            <button type="button" class="btn btn-success btnIrConsolidados">Siguiente <span class="glyphicon glyphicon-chevron-right"></span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="tabConsolidados" class="tab-pane in">
                <div class="container">
                    <div class="form-group row">
                        <label>Seleccione a agrupar</label>
                    </div>
                    <div class="form-group row">
                        <div class="col-xs-1"></div>
                        <div class="col-xs-4">
                            <h5 style="margin-left:25px;"><strong>Listado de Columnas</strong></h5>
                            <strong style="margin-left:25px;">Seleccionar: </strong>  <a href="javascript:;" id="btnTodosListadoConsolidado" style="margin-left:10px;">Todos</a><a href="javascript:;" id="btnNingunoListadoConsolidado" style="margin-left:10px;">Ninguno</a>   
                            <ul id="ul-campos-posibles-consolidado" class="connectedSortableConsolidados ul-box">
                            </ul>
                        </div>
                        <div class="col-xs-2 text-center">
                            <br /><br />
                            <label><input type="checkbox" id="chkIndividuales"/> Individuales</label>
                            <br /><br /><br />
                            <div class="form-group row text-center"><button type="button" id="btnAgregarSeleccionadosConsolidado" class="btn btn-success" style="width:150px;"><span class="glyphicon glyphicon-arrow-right"></span> Agregar</button></div>
                            <br />
                            <div class="form-group row text-center"><button type="button" id="btnQuitarSeleccionadosConsolidado" class="btn btn-danger" style="width:150px;"><span class="glyphicon glyphicon-arrow-left"></span> Quitar</button></div>
                        </div>
                        <div class="col-xs-4">
                            <h5 style="margin-left:25px;"><strong>Campos Seleccionados</strong></h5>
                            <strong style="margin-left:25px;">Seleccionar: </strong>  <a href="javascript:;" id="btnTodosSeleccionadosConsolidado" style="margin-left:10px;">Todos</a><a href="javascript:;" id="btnNingunoSeleccionadosConsolidado" style="margin-left:10px;">Ninguno</a>   
                            <ul id="ul-campos-seleccionados-consolidado" class="connectedSortableConsolidados ul-box">
                            </ul>
                        </div>
                        <div class="col-xs-1"></div>
                    </div>
                    <div class="form-group row text-right">
                        <button type="button" class="btn btn-success btnIrFiltros"><span class="glyphicon glyphicon-chevron-left"></span> Anterior</button>
                        <button type="button" id="btnConsulta" class="btn btn-success">
                            <span class="glyphicon glyphicon-search"></span> Realizar Consulta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="display:none;" id="dvdRespuestaReporte">
        <div class="row">
            <div class="col-xs-6 text-left">
                <h4>Resultado de la consulta</h4>
            </div>
            <div class="col-xs-6 text-right">
                <button type="button" class="btn btn-success" id="btnAtras">
                    <span class="glyphicon glyphicon-chevron-left"></span> Atrás
                </button> 
            </div>
        </div>
        <div class="row">
            <ul class="nav nav-tabs" id="llamadaTabs">
        
            </ul>
            <div class="tab-content" id="seccionesTabs">

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
    <script src="js/Dinamico.js"></script>
    <script src="../../jqscripts/jquery-ui-1.11.4.custom/jquery-ui.js"></script>
</asp:Content>
