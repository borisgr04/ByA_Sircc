<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="rgEstPrev.aspx.cs" Inherits="wfSircc.EstPrev.Elaborar.rgEstPrev" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <link href="/Content/kendoui_css/kendo.common.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.default.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.rtl.min.css" rel="stylesheet" />
    <link href="../docEP.css" rel="stylesheet" />
   
    <div class="row">
        <div class="col-md-12" id="dvdEla">
            <div class="col-md-2">
                <div class="input-group">
                    <input type="text" class="form-control inputHab" id="txtNumero" value="" />
                    <div class="input-group-btn ">
                        <button type="button" id="BtnDwnAbrir" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                            <span class="icon-folder-open-alt"></span>                        
                        </button>
                   
                    </div>
                </div>
            </div>
            <!-- /.col-lg-9 -->
            <div class="col-md-10">
              <div class="col-md-9">
               
               
                    <button type="button" class="btn btn-warning" id="nuevoButton">
                        <span class="glyphicon glyphicon-plus-sign"></span>
                        Nuevo</button>
                    <button type="button" class="btn btn-primary" id="editarButton">
                        <span class="glyphicon glyphicon-pencil"></span>
                        Editar</button>
                    <button type="button" class="btn btn-success" id="guardarButton" >
                        <span class="glyphicon glyphicon-floppy-saved"></span>
                        Guardar 
                    </button>                  
                    <button type="button" class="btn btn-danger" id="cancelarButton">
                        <span class="glyphicon glyphicon-remove"></span>
                        Cancelar</button>
                    <button type="button" value="Nuevo" id="imprimirButton" class="btn btn-info">
                            <span class="glyphicon glyphicon-print"></span>&nbsp Imprimir
                        </button>
                    <button type="button" id="btnAbrirP" class="btn btn-success" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-floppy-saved"></span>
                           
                        Guardar Plantilla</button>
              </div>
              <div class="col-md-3">
                       <div id="lbEstado"></div>
                         </div>
            </div>
           
        </div>
        
        <!-- /.row -->
    </div>
    <br />
    <div class="form-horizontal" role="form" id="formDATOS">

        <div class="tabbable tabs-left">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tabDatos" data-toggle="tab">1. Datos Generales</a></li>
            <li><a href="#tabProy" data-toggle="tab">2.Proyecto</a></li>
            <li><a href="#tabPpto" data-toggle="tab">3.Presupuesto</a></li>
            <li><a href="#tabFP" data-toggle="tab">4.Plazo, Valor y Forma de Pago</a></li>
            <li><a href="#tabPol" data-toggle="tab">5.Garantía Única </a></li>
            <li><a href="#tabObligaciones" data-toggle="tab">6.Obligaciones </a></li>
            <li><a href="#tabContratista" data-toggle="tab">7.Contratista </a></li>
            <li><a href="#tabEjemplo" data-toggle="tab">8.Ejemplo </a></li>
            <li><a href="#tabElaborar" data-toggle="tab">9.Elaborar</a></li>
            <li><a href="#tabPreview" data-toggle="tab">10. Vista Previa</a></li>
        </ul>

        <div class="tab-content">
            <div id="tabDatos" class="tab-pane in active">

                <div class="form-group">
                    <label for="TxtFecElab" class="col-sm-3 control-label">
                        Fecha de elaboración
                    </label>
                    <div class="col-sm-4">
                        <input type="date" id="TxtFecElab" class="form-control input-sm inputHab">
                    </div>
                </div>
                <!-- fecha de elaboración -->

                <div class="form-group">

                    <label for='TxtIdeFun' class="col-sm-3 control-label">
                        Funcionario
                    </label>
                    <div class="col-lg-3">
                        <input id="TxtIdeFun" type="text" class="form-control input-sm " disabled />
                    </div>
                    <div class="col-lg-1">
                        <button type="button" value="Nuevo" id="btnBuscarC" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="col-lg-3">
                        <input id="TxtNomFun" type="text" class="form-control input-sm " disabled />
                    </div>
                </div>
                <!-- diligenciado por -->


                <div class="form-group">
                    <label for="TxtIdeRes" class="col-sm-3 control-label">
                        Responsable
                    </label>
                    <div class="col-lg-3">
                        <input id="TxtIdeRes" type="text" class="form-control input-sm inputHab" />
                    </div>
                    <div class="col-lg-1">
                        <button type="button" value="Nuevo" id="btnBuscarR" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="col-lg-3">
                        <input id="TxtNomRes" type="text" class="form-control input-sm " disabled />
                    </div>
                </div>
                <!-- reponsable -->
                <div class="form-group">
                    <label for="CboDepSol" class="col-sm-3 control-label">
                        Dependencia solicitante:</label>
                    <div class="col-sm-4">
                        <select id="CboDepSol" class="form-control input-sm cbo"></select>
                    </div>
                </div>
                <!---dep solicutante-->
                <div class="form-group">

                    <label class="col-sm-3 control-label">
                        Objeto a Contratar</label>
                    <div class="col-lg-8">
                        <textarea id='TxtObjCon' rows="2" class="form-control input-sm inputHab"></textarea>
                    </div>
                </div>
                <!-- objeto -->
                <div class="form-group">
                    <label for="CboMod" class="col-sm-3 control-label">
                        Modalidad de Selección
                    </label>
                    <div class="col-lg-4">
                        <select id="CboMod" class="form-control input-sm cbo"></select>
                    </div>
                </div>
                <!--modalidad de seleccion-->
                <div class="form-group">
                    <label for="CboTip" class="col-sm-3 control-label">
                        Identificación del Contrato:</label>
                    <div class="col-lg-4">
                        <select id="CboTip" class="form-control input-sm cbo"></select>
                    </div>
                    <div class="col-lg-4">
                        <select id="CboSubTip" class="form-control input-sm cbo"></select>
                    </div>
                </div>
                <!-- identificacion del contrato -->
                <div class="form-group">

                    <label for="CboDepDel" class="col-sm-3 control-label">
                        Dependencia Delegada:</label>
                    <div class="col-sm-4">
                        <select id="CboDepDel" class="form-control input-sm cbo"></select>
                    </div>
                </div>
                <!-- delegada -->
                <div class="form-group">
                    <label for="CboDepSu" class="col-sm-3 control-label">
                        Dependencia Supervisión
                    </label>
                    <div class="col-sm-4">
                        <select id="CboDepSup" class="form-control input-sm cbo"></select>
                    </div>
                </div>
                <!-- supervision -->
                <div class="form-group">
                    <label class="col-sm-3 control-label">
                        Lugar de ejecución del contrato
                    </label>
                    <div class="col-sm-8">
                        <textarea id="TxtLugar" rows="2" class="form-control input-sm cbo inputHab"></textarea>
                    </div>
                </div>
                <!-- lugar ejecucion-->
                <div class="form-group">
                    <label for='TxtPlazoLiq' class="col-sm-3 control-label">
                        Plazo de liquidación 
                    </label>
                    <div class="col-lg-2">
                        <input id='TxtPlazoLiq' type="text" placeholder="Plazo de Liquidación" class="form-control input-sm inputHab" />
                    </div>
                    <div class="col-lg-1">
                        - [Meses]
                    </div>
                </div>
                <!-- plazo liquidacion -->
                <div class="form-group">
                    <label for='TxtPlazoLiq' class="col-sm-3 control-label">
                        Personal de Apoyo a la gestión 
                    </label>
                    <div class="col-lg-2">
                        <select id="cboApoyo" class="form-control input-sm inputHab">
                            <option value="NO">NO</option>
                            <option value="SI">SI</option>
                        </select>
                    </div>
                </div>
                <!-- PERSONAL DE APOYO -->
                <div class="form-group">
                    <label for='TxtPlazoLiq' class="col-sm-3 control-label">
                        Incluido en el Plan de Comprar 
                    </label>
                    <div class="col-lg-2">
                        <select id="cboENPLANC_EP" class="form-control input-sm inputHab">
                            <option value="N">NO</option>
                            <option value="S">SI</option>
                        </select>
                    </div>
                </div>
                <!-- INCLUIDO EN EL PLAN DE COMPRAS -->
            </div>
            <!-- INFO GENERLA -->
            
            <div id="tabProy" class="tab-pane ">

                <!-- panel proyecto-->

                <div class="panel panel-default">
                    <div class="panel-heading">Proyectos</div>
                    <div class="panel-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-success btn-minier inputHab" id="addButtonProy">
                                        <span class="glyphicon glyphicon-plus-sign"></span>
                                        Agregar</button>
                                </div>
                                <div class="col-md-11">
                                    <%--<button type="button" class="btn btn-success btn-sm" id="deleteButtonProy">
                                                <span class="glyphicon glyphicon-remove"></span>
                                                Eliminar</button>--%>
                                </div>
                            </div>
                            <div class="row">
                                &nbsp
                            </div>
                            <div id="msgProy" class="information"></div>

                            <div id="jqxgridProy">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- panel proyecto-->

            <div id="tabPpto" class="tab-pane ">
                <!-- panel ppto-->
                <div class="panel panel-default">
                    <div class="panel-heading">Certificado de Disponibilidad Presupuestal</div>
                    <div class="panel-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-2">
                                    <label for="txtNroCDP">
                                        Número
                                    </label>
                                    <input type="text" id="txtNroCDP" class="form-control input-sm inputHab " />
                                </div>
                                <div class="col-xs-2">
                                    <label for="txtFecCDP">
                                        Fecha
                                    </label>
                                    <input type="date" id="txtFecCDP" class="form-control input-sm intCDP inputHab" />
                                </div>
                                <div class="col-xs-2">
                                    <label for="txtValCDP">
                                        Valor Total</label>
                                    <input type="text" id="txtValCDP" class="form-control input-sm currency intCDP inputHab" />
                                </div>
                                <div class="col-xs-2">
                                    <label for="chkVigFut">
                                        Vigencia Futura</label>
                                    <select id="cboVigFut" class="form-control input-sm currency inputHab intCDP ">
                                        <option value="NO">NO</option>
                                        <option value="SI">SI</option>
                                    </select>
                                </div>
                                <div class="col-xs-1">
                                    <label>
                                        &nbsp
                                    </label>
                                    <button type="button" class="btn btn-success btn-sm inputHab" id="btnAgregarCDP">
                                        <span class="glyphicon glyphicon-ok"></span>
                                    </button>
                                </div>
                                <div class="col-xs-1">
                                    <label>
                                        &nbsp
                                    </label>
                                    <button type="button" class="btn btn-danger btn-sm inputHab" id="btnCancelarCDP">
                                        <span class="glyphicon glyphicon-remove-circle"></span>
                                    </button>
                                </div>
                            </div>
                            <div class="row">&nbsp</div>
                            <div id="jqxgridCDP">
                            </div>
                        </div>
                    </div>
                </div>
                <!--- panelppto-->
                <div class="panel panel-default">
                    <div class="panel-heading">Rubros</div>
                    <div class="panel-body">
                        <div class="container">

                            <div id="jqxgridRub">
                            </div>

                            <div class="row">
                                <div class="col-xs-2">
                                    <label for="txtCodRub">
                                        Código</label>
                                    <input style="" id="txtCodRub" class="form-control input-sm inputHab" />
                                </div>
                                <div class="col-xs-4">
                                    <label for="txtDesRub">
                                        Descripción</label>
                                    <input id="txtDesRub" class="form-control input-sm inputHab" />
                                </div>
                                <div class="col-xs-2">
                                    <label for="txtValRub">
                                        Valor
                                    </label>
                                    <input id="txtValRub" class="form-control input-sm inputHab currency" />
                                </div>
                                <div class="col-xs-1">
                                    <label>
                                        &nbsp
                                    </label>
                                    <button type="button" class="btn btn-success btn-sm inputHab" id="BtnEPGuardarRub">
                                        <span class="glyphicon glyphicon-ok"></span>
                                    </button>
                                </div>
                                <div class="col-xs-1">
                                    <label>
                                        &nbsp
                                    </label>
                                    <button type="button" class="btn btn-danger btn-sm inputHab" id="BtnEPCancelarRub">
                                        <span class="glyphicon glyphicon-remove-circle"></span>
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <!--- FORMA DE PAGO --->
            <div id="tabFP" class="tab-pane ">
                <div class="panel panel-default">
                    <div class="panel-heading">Forma de Pago</div>
                    <div class="panel-body">

                        <div class="form-group">
                            <label for='txtValTot' class="col-sm-3 control-label">
                                Valor a Contratar
                            </label>
                            <div class="col-sm-2">
                                <input id='txtValTot' type="text" placeholder="Valor Total a Contratar" class="form-control input-sm currency inputHab" />
                            </div>
                        </div>
                        <!-- valor a contratar -->
                        <div class="form-group">
                            <label for='txtValProp' class="col-sm-3 control-label">
                                Aportes Entidad
                            </label>
                            <div class="col-sm-2">
                                <input id='txtValProp' type="text" placeholder="Aportes Propios" class="form-control input-sm currency inputHab" />
                            </div>
                        </div>
                        <!--aportes entidad-->
                        <div class="form-group">
                            <label for='txtValOtros' class="col-sm-3 control-label ">
                                Aportes Otros
                            </label>
                            <div class="col-sm-2">
                                <input id='txtValOtros' type="text" placeholder="Aportes Otros" class="form-control input-sm currency " />
                            </div>
                        </div>
                        <!--- valor otros-->
                        <!--- anticipo-->
                        <div class="form-group">
                            <label for="txtAnti_Porc" class="col-sm-3 control-label">
                                % del Anticipo</label>
                            <div class="col-sm-2">
                                <input type="text" id="txtAnti_Porc" value="0" class="form-control input-sm inputHab " />
                            </div>
                            <div class="col-sm-2">
                                <input type="text" id="txtAnti_Val" value="0" class="form-control input-sm  " disabled />
                            </div>

                        </div>
                        <!--- anticipo-->

                        <div class="form-group">
                            <label class="col-sm-3 control-label">
                                Plazo de ejecución
                            </label>
                            <div class="col-lg-2">
                                <input id='TxtPlazo1' type="text" placeholder="Plazo de ejecución" class="form-control input-sm inputHab" />
                            </div>
                            <div class="col-lg-2">
                                <select id="CboTPlazo1" class="form-control input-sm cbo"></select>
                            </div>
                            <div class="col-lg-2">
                                <input id='TxtPlazo2' type="text" placeholder="Plazo de ejecución" class="form-control input-sm inputHab" />
                            </div>
                            <div class="col-lg-2">
                                <select id="CboTPlazo2" class="form-control input-sm cbo inputHab"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">
                                Tipo de Forma de Pago
                            </label>
                            <div class="col-xs-2">
                                <select id="cboFPagoTipo" class="form-control input-sm inputHab">
                                    <option value="PU">Pago Único </option>
                                    <option value="PM" selected>Pago Mensual</option>
                                    <option value="PP">Otra forma de Pago </option>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <button type="button" class="btn btn-success btn-minier inputHab" id="btnAbrirGenFP">
                                    <span class="glyphicon glyphicon-plus-sign"></span>
                                    Generar Forma de Pago</button>
                            </div>
                        </div>
                        <!-- plazo de ejecucion-->

                        <div class="container">

                            <div class="row">
                                <div class="col-lg-12">
                                    <button type="button" class="btn btn-success btn-minier " id="btnAgregarFP" disabled>
                                        <span class="glyphicon glyphicon-plus-sign"></span>
                                        Agregar</button>
                                    &nbsp
                                </div>
                            </div>

                            <div class="row">
                                &nbsp
                            </div>

                            <div id="jqxgridFP">
                            </div>

                        </div>
                    </div>
                </div>

                <!--- FORMA DE PAGO --->
            </div>
            <!---polizas-->
            <div id="tabPol" class="tab-pane ">

                <div class="panel panel-default">
                    <div class="panel-heading">Garantia Única de Cumplimiento</div>
                    <div class="panel-body">
                        <div class="container">

                            <div class="row">
                                <div class="col-xs-3">
                                    <label for="CboCodPol">
                                        Amparo</label>
                                    <select id="CboCodPol" class="form-control input-sm inputHab"></select>
                                </div>
                                <div class="col-xs-7">
                                    <label for="txtDescPol">
                                        Descripción</label>
                                    <textarea id="txtDescPol" rows="1" class="form-control inputHab input-sm inputHab"></textarea>
                                </div>
                                <div class="col-xs-1">
                                    <label>
                                        &nbsp
                                    </label>
                                    <button type="button" class="btn btn-success btn-sm inputHab" id="btnAgregarPol">
                                        <span class="glyphicon glyphicon-ok"></span>
                                    </button>
                                </div>
                                <div class="col-xs-1">
                                    <label>
                                        &nbsp
                                    </label>
                                    <button type="button" class="btn btn-danger btn-sm inputHab" id="btnCancelarPol">
                                        <span class="glyphicon glyphicon-remove-circle"></span>
                                    </button>
                                </div>
                            </div>
                            <div class="row">&nbsp</div>
                            <div id="jqxgridPol">
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div id="tabObligaciones" class="tab-pane ">
                
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="txtObligC">
                        Obligaciones del Contratista
                    </label>
                    <div class="col-sm-8">
                        <textarea id="txtObligC" rows="10" class="form-control input-sm cbo inputHab"></textarea>
                    </div>
                </div>
                <!-- oblig ctita-->
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="txtObligE">
                        Obligaciones Entidad Contrante
                    </label>
                    <div class="col-sm-8">
                        <textarea id="txtObligE" rows="10" class="form-control input-sm cbo inputHab"></textarea>
                    </div>
                </div>
                <!-- oblig dpto-->
            </div>
            <!--- Obligaciones --->

            <div id="tabContratista" class="tab-pane ">
                <h4>(Caso de Contratación Directa)</h4>
                <div class="form-group">
                    <label for="TxtIdeCon" class="col-sm-3 control-label">
                        Contratista 
                    </label>
                    <div class="col-lg-3">
                        <input id="TxtIdeCon" type="text" class="form-control input-sm inputHab" />
                    </div>
                    <div class="col-lg-1">
                        <button type="button" value="Nuevo" id="BtnBuscCon" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="col-lg-3">
                        <input id="TxtNomCon" type="text" class="form-control input-sm " disabled />
                    </div>
                </div>
                 <div class="form-group">
                    <label for="TxtIdeRep" class="col-sm-3 control-label">
                        Represente Legal
                    </label>
                    <div class="col-lg-3">
                        <input id="TxtIdeRep" type="text" class="form-control input-sm inputHab" />
                    </div>
                    <div class="col-lg-1">
                        <button type="button" value="Nuevo" id="BtnBuscRep" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="col-lg-3">
                        <input id="TxtNomRep" type="text" class="form-control input-sm " disabled />
                    </div>
                </div>
            </div>
            <!--- Contratista --->
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
            <div id="tabEjemplo" class="tab-pane ">
                <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtNecesidadContratar">Necesidad a contratar</label>
                    </div>
                    <div class="col-lg-9">

                        <div id="txtNecesidadContratar" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtClasificacionUNSPSC">Clasificación UNSPSC</label>
                    </div>
                    <div class="col-lg-9">
                        <textarea rows="3" style="width:90%" id="txtClasificacionUNSPSC"></textarea>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtDescripcionUNSPSC">Descripcion UNSPSC</label>
                    </div>
                    <div class="col-lg-9">
                        <textarea rows="3" style="width:90%" id="txtDescripcionUNSPSC"></textarea>
                    </div>
               </div>
                <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtObligacionesGeneralesContratista">Obligaciones Generales del Contratista</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtObligacionesGeneralesContratista" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                 </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtObligacionesGeneralesContrante">Obligaciones General del  Contratante</label>
                    </div>
                    <div class="col-lg-9">
                        <div id="txtObligacionesGeneralesContrante" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtModalidadSeleccionJustificacionFundamentosJuridicos">Justificación de la Modalidad de Selección </label>
                    </div>
                    <div class="col-lg-9">
                        <div id="txtModalidadSeleccionJustificacionFundamentosJuridicos" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtJustificacionValorContrato">Justificación del Valor del contrato</label>
                    </div>
                    <div class="col-lg-9">
                        <div id="txtJustificacionValorContrato" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">

                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtCapacidadJuridica">Capacidad jurídica</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtCapacidadJuridica" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>

                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right" >
                        <label class="control-label" for="txtCapacidadFinanciera">Capacidad financiera</label>
                    </div>
                    <div class="col-lg-9">
                        <div id="txtCapacidadFinanciera" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtCapacidadResidual">Capacidad residual</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtCapacidadResidual" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right" for="txtFactoresEscogenciaCalificacionIdoneidad">
                        <label class="control-label">Factores de escogencia y calificación idoneidad</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtFactoresEscogenciaCalificacionIdoneidad" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label">Experiencia</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtExperiencia" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtIdSupervisor">Id Supervisor</label>
                    </div>
                    <div class="col-lg-2">
                        <input type="text" id="txtIdSupervisor" class="form-control"/>
                    </div>
                    <div class="col-lg-1">
                        <button type="button" value="Nuevo" id="btnBusqSupervisor" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="col-lg-4">
                        <input type="text" class="form-control" id="txtNombreSupervisor" />
                    </div>
                         </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtCargoSupervisor">Cargo Supervisor</label>
                    </div>
                 
                    <div class="col-lg-9">
                        <textarea id="txtCargoSupervisor" rows="1" style="width:90%"></textarea>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtNecesidadContratarInterventor">Necesidad de contratar con interventor cuando los contratos superen la menor cuantía </label>
                    </div>
                    <div class="col-lg-9">
                        <div id="txtNecesidadContratarInterventor" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtSometimientoAcuerdoComercial">Sometimiento a acuerdo Comercial</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtSometimientoAcuerdoComercial" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtConstanciaCumplimiento">Constancia de cumplimiento del deber de las entidades estatales</label>
                    </div>
                    <div class="col-lg-9">
                       <div id="txtConstanciaCumplimiento" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtPerspectivaLegal">Analisis del sector, Perspectiva legal</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtPerspectivaLegal" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtPerspectivaOrganizacional">Analisis del sector, Perspectiva organizacional</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtPerspectivaOrganizacional" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
            </div>
            <!--- Ejemplo --->

            <div id="tabElaborar" class="tab-pane ">

                <div class="row">
                    <div id="dvdFilaClausulas" class="col-lg-2">
                        <select id="CboClausulas" class="form-control input-sm" multiple size="20"></select>
                    </div>
                    <div id="dvdClausula" class="col-lg-10">


                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" id="myTab">
                            <li><a href="#dvdEdicion" data-toggle="tab">Edición</a></li>
                            <li><a href="#dvdDatos" data-toggle="tab">Datos </a></li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content" style="min-height: 300px">
                            <div class="tab-pane active" id="dvdEdicion">
                                <h4 id="dvdTitulo"></h4>
                                <div id="dvdClausulaEdit" contenteditable style="text-align: justify; min-height: 300px"></div>
                            </div>
                            <div class="tab-pane" id="dvdDatos">
                                <div id="Div2" style="text-align: justify">
                                    <div class="profile-user-info profile-user-info-striped" id="idDatos">
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <div class="tab-pane" id="tabPreview">
                <div id="dvdPrint" style="text-align: justify">
                    <link href="../docEP.css" rel="stylesheet" />
                    <div id="dvdClausulaPreview" style="text-align: justify;"></div>
                </div>
            </div>
        </div>
       
        </div>
    </div>
    <!-- FIN DE DATOS-->

    <!-- Modal -->
    <div class="modal fade" id="modalPry" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H2">Consulta de Proyectos</h4>
                </div>
                <div class="modal-body">

                    <div id="jqxgridConProy">
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
    <!-- /.modal -->


    <div class="modal fade" id="modalFP" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H1">Forma de Pago</h4>
                </div>
                <div class="modal-body">

                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 alert-dismissable" id="dvdMsg">
                                <span id="lbMsg" class="control-label"></span>
                            </div>
                        </div>

                        <div class="row">
                            
                        </div>
                        <div class="row">
                            <div class="col-xs-4" id="dvdTipPag">
                                <label for="CboTipPag">
                                    Tipo de Pago</label>
                                <select id="CboTipPag" class="form-control input-sm validar" autofocus></select>
                            </div>
                           <div class="col-xs-4" id="dvdPorc">
                                <label for="txtValPorc">
                                    <input type="radio" name="CboVP" id="OptPorc" value="P" checked="checked"/> %</label>
                                <input type="text" id="txtPorc" class="form-control input-sm validar inputHab" />
                            </div>

                            <div class="col-xs-4" id="dvdValPag">
                                <label for="txtValPag">
                                    <input type="radio" name="CboVP" id="OptValor" value="V" /> $ Valor</label>
                                <input type="text" id="txtValPag" class="form-control input-sm currency validar inputHab" disabled />
                            </div>


                        </div>
                        <div class="row">
                            <div class="col-xs-12" id="dvdCond">
                                <label for="txtCond">
                                    Condición del Pago</label>
                                <textarea id="txtCond" rows="4" class="form-control input-sm validar "></textarea>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <label for="CboApoEnt">
                                    <input type="checkbox" id="ChkApoEnt"  checked="checked"/> Aporte/Pago por la Entidad?
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <label for="txtSaldo">
                                    Saldo en Porcentaje (%)
                                </label>
                                <input type="text" id="txtSaldoP" class="form-control input-sm " disabled readonly />

                            </div>
                            <div class="col-xs-6">
                                <label for="txtSaldo">
                                    Saldo en Valor
                                </label>
                                <input type="text" id="txtSaldoV" class="form-control input-sm currency" disabled readonly/>
                            </div>
                        </div>
                    </div>
                    <!--</form>-->
                </div>
                <div class="modal-footer">
                    <button type="button" id="BtnFPGuardar" class="btn btn-success">Guardar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalGenFP" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H3">Forma de Pago</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            Condición de Pago
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <textarea id="txtCondGenFP" rows="3" class="form-control">
                            </textarea>
                        </div>
                    </div>
                    <div class="row">
                        &nbsp
                    </div>

                    <%--<div class="panel panel-default">
                        <div class="panel-body" id="result">
                            Resultados de Generación de Forma de Pago
                        </div>
                    </div>--%>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="BtnGenFP">Generar</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalPlantilla" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H4">Crear Plantilla apartir del Estudio Previo</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            Nombre de la Plantilla
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <input id="txtNOM_PLA_EP" maxlength="100" class="form-control"/>
                        </div>
                    </div>
                    <div class="row">
                        &nbsp
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnGuardarP">Guardar</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalNuevoEP" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H6">Nuevo Estudio Previo</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                         <div class="col-md-12">
                    <label for="TxtFecElab" class="col-md-4 control-label">
                        Fecha de elaboración
                    </label>
                    <div class="col-md-6">
                        <input type="date" id="TxtFecElaboracion" class="form-control input-sm " />
                    </div>
                     </div>
                                                              
                        <hr />
                        <div class="col-md-12">
                        <div class="list-group" id="dvdPlantillas">                            
                         </div>
                            </div>
                    </div>
                    
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->


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

                
    
    <script src="/jqscripts/kendoui/kendo.web.min.js"></script>
    <script src="js/rgEstPrev.js"></script>
    <%--    <script src="js/admProy.js" type="text/javascript"></script>--%>


</asp:Content>
