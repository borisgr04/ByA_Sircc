<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="rgEstPrev1.aspx.cs" Inherits="wfSircc.EstPrev.Elaborar.rgEstPrev1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <link href="/Content/kendoui_css/kendo.common.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.default.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.rtl.min.css" rel="stylesheet" />
    <link href="../docEP.css" rel="stylesheet" />
   
    <div class="row">
        <div class="col-xs-2">
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
            
              <div class="col-xs-8" >   
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
                    <button type="button" value="Nuevo" id="printMatrizR" class="btn btn-info">
                            <span class="glyphicon glyphicon-print"></span>&nbsp Matriz de Riesgo
                        </button>
                    <button type="button" id="btnAbrirP" class="btn btn-success" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-floppy-saved"></span>
                        Plantilla</button>
              </div>
              <div class="col-xs-2" >
                       <div id="lbEstado"></div>
               </div>
            
           
        
        
        <!-- /.row -->
    </div>
    <br />
    <div class="form-horizontal" role="form" id="formDATOS">

        <div class="tabbable tabs-left">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tabDatosG" data-toggle="tab">1. Datos Generales de la Contratación</a></li>
            <li><a href="#tabDatos" data-toggle="tab">2. Datos de la Contratación</a></li>
            <li><a href="#tabNecDesc" data-toggle="tab">3. Necesidad a Satisfacer  </a></li>
            <li><a href="#tabObjeto" data-toggle="tab">4. Objeto, Especificaciones  </a></li>
            <li><a href="#tabCondiciones" data-toggle="tab">5.Condiciones de la Contratación </a></li>            
            <li><a href="#tabPpto" data-toggle="tab">6.Presupuesto</a></li>
            <li><a href="#tabFP" data-toggle="tab">7.Plazo, Valor y Forma de Pago</a></li>            
            <li><a href="#tabCriterios" data-toggle="tab">8.Criterios de Selección</a></li>            
            <li><a href="#tabRiegos" data-toggle="tab">9.Matriz de Riesgos</a></li>            
            <li><a href="#tabPol" data-toggle="tab">10.Garantía Única </a></li>
            <li><a href="#tabOtros" data-toggle="tab">11.Otros </a></li>            
            <li><a href="#tabContratista" data-toggle="tab">12.Contratista </a></li>            
            <li><a href="#tabElaborar" data-toggle="tab">13.Elaborar</a></li>
            <li><a href="#tabPreview" data-toggle="tab">14. Vista Previa</a></li>
        </ul>

        <div class="tab-content">
            <div id="tabDatosG" class="tab-pane in active">
                
                <div class="form-group">
                    <label for='CboTipoPpto' class="col-sm-3 control-label">
                        Tipo de Presupuesto
                    </label>
                    <div class="col-lg-4">
                        <select id="CboTipoPpto" class="form-control input-sm inputHab">
                            <option value="F">Funcionamiento</option>
                            <option value="I">Inversión</option>
                        </select>
                    </div>
                </div>
                <!-- TIPO DE GASTO -->
                
                <div class="form-group">
                    <label for='cboENPLANC_EP' class="col-sm-3 control-label">
                        Incluido en el Plan de adquisiciones
                    </label>
                    <div class="col-lg-4">
                        <select id="cboENPLANC_EP" class="form-control input-sm inputHab">
                            <option value="N">NO</option>
                            <option value="S">SI</option>
                        </select>
                    </div>
                </div>
                <!-- INCLUIDO EN EL PLAN DE COMPRAS -->

               <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtPAAId">N° Plan De Adquisiones</label>
                    </div>
                    <div class="col-lg-4">
                        <input id="txtPAAId" class="form-control input-sm" disabled="disabled"/>
                    </div>
                   <button type="button" class="btn btn-success btn-minier" id="btnBsqPAA">
                                        <span class="glyphicon glyphicon-search"></span>
                                        Buscar</button>
                </div>
                <!-- CODIGO PAA -->
                <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtDescripcionPAA">Descripción</label>
                    </div>
                    <div class="col-lg-9">
                        <textarea id="txtDescripcionPAA" class="form-control input-sm" disabled="disabled"> </textarea>
                    </div>
               </div>
                <!-- DESCRIPCION PAA -->
                

                <div class="form-group">
                    <label for="TxtProyecto" class="col-sm-3 control-label">
                       Proyecto
                    </label>
                    <div class="col-sm-8">
                        
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

                            <%--<div id="jqxgridProy">
                            </div>--%>

                            <table class="table table-bordered table-hover table-striped tablesorter" id="lProyectos">
                                <thead>
                                    <tr>
                                        <th>Código del proyecto<i class="fa fa-sort"></i></th>
                                        <th>Nombre del proyecto <i class="fa fa-sort"></i></th>
                                        <th>&nbsp <i class="fa fa-sort"></i></th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>                        
                    </div>
                </div>
        
                  <br />
                
            </div>
            <div id="tabDatos" class="tab-pane in ">
           
                <div class="form-group">
                    <label for="TxtFecElab" class="col-sm-3 control-label">
                        Fecha de elaboración
                    </label>
                    <div class="col-sm-4">
                        <input type="date" id="TxtFecElab" class="form-control input-sm inputHab"/>
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
                <div class="form-group">
                    <label for="" class="col-sm-3 control-label">
                        Cargo del responsable 
                    </label>
                    <div class="col-sm-4">
                        <input type="text" id="txtCargoResponsable" class="form-control input-sm inputHab"/>
                    </div>
                </div>
                <!-- reponsable -->

                <div class="form-group">
                    <label for="CboDepSol" class="col-sm-3 control-label">
                        Dependencia Solicitante:</label>
                    <div class="col-sm-4">
                        <select id="CboDepSol" class="form-control input-sm cbo"></select>
                    </div>
                </div>
                <!---dep solicutante-->
              
                <div class="form-group">

                    <label for="CboDepDel" class="col-sm-3 control-label">
                        Dependencia Delegada:</label>
                    <div class="col-sm-4">
                        <select id="CboDepDel" class="form-control input-sm cbo"></select>
                    </div>
                </div>
                <!-- delegada -->

                <div class="form-group">
                    <label for="CboTip" class="col-sm-3 control-label">
                        Identificación del Contrato:</label>
                    <div class="col-lg-3">
                        <select id="CboTip" class="form-control input-sm cbo"></select>
                    </div>
                    <div class="col-lg-6">
                        <select id="CboSubTip" class="form-control input-sm cbo"></select>
                    </div>
                </div>
                <!-- identificacion del contrato -->
                
            </div>
            <!-- INFO GENERLA -->
            
            <div id="tabNecDesc" class="tab-pane ">
        
                <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtNecesidadContratar">Descripción de la Necesidad que se pretende satisfacer con el proceso de Contratación</label>
                    </div>
                    <div class="col-lg-9">

                        <div id="txtNecesidadContratar" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                    </div>
                </div>
            </div>
            <div id="tabObjeto" class="tab-pane ">
                        
                <div class="form-group">

                    <label class="col-sm-3 control-label">
                        Objeto a Contratar</label>
                    <div class="col-lg-8">
                        <textarea id='TxtObjCon' rows="2" class="form-control input-sm inputHab"></textarea>
                            
                            <%--Para atender la necesidad, se requiere contratar la _________

                            Orientación.    Aquí vamos a encontrar la respuesta del cómo atiendo la necesidad o carencia pública. Para ello indicaré con claridad el objeto del contrato a celebrar; por ejemplo, en una obra pública, debemos describir cuáles serán las prestaciones que la integrarán. Debemos ser lo más cuidadosos posibles para que el objeto del contrato quede lo suficientemente amplio y completo para desarrollar la parte general y especial del cómo atiendo la necesidad en el respectivo contrato en el otro numeral.
                            (Borre esta Nota)--%>

                        
                    </div>
                </div>
                <!-- objeto -->

                 <div class="form-group">

                    <label class="col-sm-3 control-label">
                        Clasificación UNSPSC</label>
                     <div class="col-lg-1" id="dvdUNSPSC">
                        <div class="input-group">
                            <div class="input-group-btn ">
                                <button type="button" id="btnBuscarCodigoUNSPSC" class="btn btn-info">
                                    <span class="icon-search"></span>                        
                                </button>                   
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="list-group" id="lstCodigos">
                            
                        </div>
                                <table class="table table-bordered table-hover table-striped tablesorter" id="tblCodigos">
                                    <thead>
                                        <tr>
                                            <th>&nbsp<i class="fa fa-sort"></i></th>
                                            <th>Clasificación UNSPSC <i class="fa fa-sort"></i></th>
                                            <th>Clase/Producto <i class="fa fa-sort"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                    </div>
                </div>
                <!-- Clasificación UNSPSC -->

                <div class="form-group">

                    <label class="col-sm-3 control-label">
                        Especificaciones del Objeto a Contratar</label>
                    <div class="col-lg-8">
                        <div id="EspObjCon" class="editorHtml" style="width:100%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                    </div>
                </div>
                <!-- Especificaciones del Objeto a Contratar -->

                <div class="form-group">

                    <label class="col-sm-3 control-label">
                        Autorizaciones, permisos y Licencias Requeridos para la Ejecución del Objeto Contractual.</label>
                    <div class="col-lg-8">
                        <div id="AutorizacionPermisoLicencias" class="editorHtml" style="width:100%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                    </div>
                </div>
                <!-- Autorizaciones, permisos y Licencias Requeridos -->

                <div class="form-group">

                    <label class="col-sm-3 control-label" >
                        Documentos técnicos para el desarrollo del proyecto. </label>
                    <div class="col-lg-8">
                        
                        <div id="DocTecnicos" class="editorHtml" style="width:100%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                    </div>
                </div>
                <!-- Documentos técnicos para el desarrollo del proyecto: -->
                 
                


            </div>
            
            <div id="tabCondiciones" class="tab-pane ">
                
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="txtObligC">
                        Obligaciones del Contratista
                    </label>
                    <div class="col-sm-8">
                        <div id="txtObligC" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                    </div>
                </div>
                <!-- oblig ctita-->
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="txtObligE">
                        Obligaciones Entidad Contrante
                    </label>
                    <div class="col-sm-8">
                        <div id="txtObligE" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                    </div>
                </div>
                <!-- oblig dpto-->

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
                    <label for="CboMod" class="col-sm-3 control-label">
                        Modalidad de Selección
                    </label>
                    <div class="col-lg-8">
                        <select id="CboMod" class="form-control input-sm cbo"></select>
                    </div>
                </div>
                <!--modalidad de seleccion-->

                <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtModalidadSeleccionJustificacionFundamentosJuridicos">
                            Justificación y fundamentos jurídicos de la Modalidad de Selección
                        </label>
                    </div>
                    <div class="col-lg-8">
                        <div id="txtModalidadSeleccionJustificacionFundamentosJuridicos" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                    </div>
                     </div>

                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtIdSupervisor">Identificación del Supervisor</label>
                    </div>
                    <div class="col-lg-2">
                        <input type="text" id="txtIdSupervisor" class="form-control input-sm " />
                    </div>
                    <div class="col-lg-1">
                        <button type="button" value="Nuevo" id="btnBusqSupervisor" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="col-lg-4">
                        <input type="text" id="txtNombreSupervisor" class="form-control " disabled="disabled"/>
                    </div>
                         </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtCargoSupervisor">Cargo Supervisor</label>
                    </div>
                 
                    <div class="col-lg-8">
                        <input id="txtCargoSupervisor" class="form-control input-sm "/>
                    </div>
                     </div>
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
                    <label for='cboApoyo' class="col-sm-3 control-label">
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
                            <div class="col-lg-3 text-right">
                                <label class="control-label" for="txtActividadesConcretasDesarrollar">Actividades concretas a desarrollar</label>
                            </div>
                            <div class="col-lg-9">
                                <div id="txtActividadesConcretasDesarrollar" class="editorHtml" style="width: 90%; border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                            </div>
                        </div>

                <div class="form-group">
                            <div class="col-lg-3 text-right">
                                <label class="control-label" for="txtInicioApartirDe">Inicio apartir de </label>
                            </div>
                            <div class="col-lg-4">
                                <select class="form-control inputHab" id="txtInicioApartirDe">
                                    <option value="FLG">FECHA DE LIGALIZACIÓN</option>
                                    <option value="FAI">FECHA DE ACTA DE INICIO</option>
                                    <option value="FPA">FECHA PAGO DEL ANTICIPO</option>
                                </select>
                            </div>
                        </div>

                <div class="form-group">
                            <div class="col-lg-3 text-right">
                                <label class="control-label" for="txtFechaInicioContrato">Fecha de inicio del contrato</label>
                            </div>
                            <div class="col-lg-4">
                                <input id="txtFechaInicioContrato" type="date" class="form-control inputHab" /> 
                            </div>
                        </div>

                <div class="form-group">
                            <div class="col-lg-3 text-right">
                                <label class="control-label" for="txtFechaTerminacionContrato">Fecha de terminación del contrato</label>
                            </div>
                            <div class="col-lg-4">
                                <input id="txtFechaTerminacionContrato" type="date" class="form-control inputHab" /> 
                            </div>
                        </div>
            </div>
            <!--- Obligaciones --->

            <div id="tabPpto" class="tab-pane ">


                <!-- panel ppto-->
                <div class="panel panel-default">
                    <div class="panel-heading">Certificado de Disponibilidad Presupuestal<span style="margin-left:20px" class="label label-default" id="cdpTip"></span></div>
                    <div class="panel-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-2">
                                    <label for="txtNroCDP">
                                        Número
                                    </label>
                                    <div id="dvdNroCDP">
                                    <input type="text" id="txtNroCDP" class="form-control input-sm" />
                                    </div>
                                </div>
                                <div class="col-xs-2">
                                    <label for="txtFecCDP">
                                        Fecha
                                    </label>
                                    <div id="dvdFecCDP">
                                    <input type="date" id="txtFecCDP" class="form-control input-sm" />
                                    </div>
                                </div>
                                <div class="col-xs-2">
                                    <label for="txtValCDP">
                                        Valor Total</label>
                                    <div id="dvdValCDP">
                                    <input type="text" id="txtValCDP" class="form-control input-sm currency" />
                                    </div>
                                </div>
                                <div class="col-xs-2" >
                                    <label for="VigFut">
                                        Vigencia Futura</label>
                                    <div id="dvdVigFut">
                                    <select id="cboVigFut" class="form-control input-sm currency">
                                        <option value="NO">NO</option>
                                        <option value="SI">SI</option>
                                    </select>
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <button type="button" class="btn btn-success" id="btnGuardarCDP"><span class="glyphicon glyphicon-floppy-saved"></span>Guardar</button>
                                    <button type="button" class="btn btn-warning inputHab" id="btnNuevoCDP"><span class="glyphicon glyphicon-plus-sign"></span>Nuevo</button>
                                </div>
                            </div>
                            <div class="row">&nbsp</div>
                            <div class="row">
                                <div class="list-group inputHab" id="lstCDPs">  
                                </div>
                                <table class="table table-bordered table-hover table-striped tablesorter" id="tblCdp">
                                    <thead>
                                        <tr>
                                            <th>N°<i class="fa fa-sort"></i></th>
                                            <th>Fecha <i class="fa fa-sort"></i></th>
                                            <th>Valor  <i class="fa fa-sort"></i></th>
                                            <th>Vigencia Futura <i class="fa fa-sort"></i></th>
                                            <th>&nbsp <i class="fa fa-sort"></i></th>
                                            <th>&nbsp <i class="fa fa-sort"></i></th>
                                            <th>&nbsp <i class="fa fa-sort"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- panelppto-->
                <div class="panel panel-default">
                    <div class="panel-heading">Rubros</div>
                    <div class="panel-body">
                        <div class="container">

                            <div class="row">
                                <div class="col-xs-3">
                                    <label for="txtCodRub">
                                        Código</label>                                    
                                    <div class="input-group">
                                        <input style="" id="txtCodRub" class="form-control input-sm " />
                                        <div class="input-group-btn ">
                                            <button type="button" id="btnBsqRubro" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                                <span class="icon-search"></span>                        
                                            </button>                   
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <label for="txtDesRub">
                                        Descripción</label>
                                    <input id="txtDesRub" class="form-control input-sm " />
                                </div>
                                <div class="col-xs-2">
                                    <label for="txtValRub">
                                        Valor
                                    </label>
                                    <input id="txtValRub" class="form-control input-sm  currency" />
                                </div>
                                <div class="col-xs-3">
                                    <button type="button" class="btn btn-success" id="btnGuardarRubro"><span class="glyphicon glyphicon-floppy-saved"></span>Guardar</button>
                                    <button type="button" class="btn btn-warning" id="btnNuevoRubro"><span class="glyphicon glyphicon-plus-sign"></span>Nuevo</button>
                                </div>
                            </div>
                            
                            <div class="row">&nbsp</div>
                            <div class="list-group inputHab" id="lstRubros"> 
                                    
                            </div>        
                            <table class="table table-bordered table-hover table-striped tablesorter" id="tblRubros">
                                    <thead>
                                        <tr>
                                            <th>Código Rubro<i class="fa fa-sort"></i></th>
                                            <th>Nombre del Rubro <i class="fa fa-sort"></i></th>
                                            <th>Valor  <i class="fa fa-sort"></i></th>
                                            <th>&nbsp <i class="fa fa-sort"></i></th>
                                            <th>&nbsp <i class="fa fa-sort"></i></th>
                                            <th>&nbsp <i class="fa fa-sort"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>                   
                        </div>
                    </div>
                </div>

                
                
                <div class="form-group">
                            <div class="col-lg-3 text-right">
                                <label class="control-label" for="txtVariablesCalculoPpto">Variables Consideredas para Calcular el Presupuesto Oficial</label>
                            </div>
                            <div class="col-lg-9">
                                <div id="txtVariablesCalculoPpto" class="editorHtml" style="width: 90%; border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                            </div>
                        </div>
                <!-- Variables ppto-->        

            </div>
            <!--- FORMA DE PAGO --->
            <div id="tabFP" class="tab-pane ">
                <%--<div class="panel panel-default">
                    <div class="panel-heading">Plazo de Ejecución, Valor a Contratar y Forma de Pago</div>
                    <div class="panel-body">--%>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">
                                Plazo de Ejecución
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
                        <!--- Plazo de Ejecución-->

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


                        <div class="form-group">
                            <label for='txtValOtros' class="col-sm-3 control-label ">
                                Aportes Propios (Caso de Convenios)
                            </label>
                            <div class="col-sm-8">
                                <input id='txtAportesPropiosConvenios' type="text" placeholder="" class="form-control input-sm inputHab" />
                            </div>
                        </div>
                        <!--- Aportes Propios (Caso de Convenios)-->

                        <div class="form-group">
                            <label for='txtValOtros' class="col-sm-3 control-label">
                                Requiere CDP
                            </label>
                            <div class="col-sm-1">
                                <input id='txtRequiereCDP' checked="checked" type="checkbox" class="input-sm inputHab" />
                            </div>
                        </div>
                        <!--- Requiere CDP -->

                        <div class="form-group">
                            <div class="col-lg-3 text-right">
                                <label class="control-label" for="txtObservacionesACDP">Observaciones a CDP</label>
                            </div>
                            <div class="col-lg-9">
                                <div id="txtObservacionesACDP" class="editorHtml" style="width: 90%; border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-lg-3 text-right">
                                <label class="control-label" for="txtJustificacionValorContrato">Justificación del Valor del contrato</label>
                            </div>
                            <div class="col-lg-9">
                                <div id="txtJustificacionValorContrato" class="editorHtml" style="width: 90%; border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                            </div>
                        </div>

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

                            <div id="jqxgridFP" style="display:none">
                            </div>
                            <table class="table table-bordered table-hover table-striped tablesorter" id="tblFP">
                                    <thead>
                                        <tr>                                            
                                            <th>Orden <i class="fa fa-sort"></i></th>
                                            <th>Cantidad <i class="fa fa-sort"></i></th>
                                            <th>Tipo <i class="fa fa-sort"></i></th>
                                            <th>Valor <i class="fa fa-sort"></i></th>
                                            <th>% <i class="fa fa-sort"></i></th>
                                            <th>Aporte Entidad <i class="fa fa-sort"></i></th>
                                            <th>Condicion <i class="fa fa-sort"></i></th>
                                            <th>&nbsp<i class="fa fa-sort"></i></th>
                                            <th>&nbsp<i class="fa fa-sort"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                        </div>


                 <%--   </div>
                </div>--%>

                <!--- FORMA DE PAGO --->
            </div>
            
            
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
            <div id="tabCriterios" class="tab-pane ">
                
                
                <%--<div class="form-group">
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
                     </div>--%>
                 
                 
                 <div class="form-group">

                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtCapacidadJuridica">Capacidad jurídica</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtCapacidadJuridica" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>

                     </div>
                <!-- Capacidad Juridica -->
                   <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label">Experiencia</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtExperiencia" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                <!-- Experiencia -->
                   <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label">Idoneidad</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtIdoneidad" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                <!-- Idoneidad -->
                 <div class="form-group">
                    <div class="col-lg-3 text-right" >
                        <label class="control-label" for="txtCapacidadFinanciera">Capacidad Financiera</label>
                    </div>
                    <div class="col-lg-9">
                        <div id="txtCapacidadFinanciera" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                <!-- Capacidad Financiera -->
                 <div class="form-group">
                    <div class="col-lg-3 text-right" >
                        <label class="control-label" for="txtCapacidadFinanciera">Capacidad Organizacional</label>
                    </div>
                    <div class="col-lg-9">
                        <div id="txtCapOrgan" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                <!-- Capacidad Organizacional -->
                 <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtCapacidadResidual">Capacidad Residual</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtCapacidadResidual" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true"></div>
                    </div>
                     </div>
                 <div class="form-group">
                    <div class="col-lg-3 text-right" for="txtFactoresEscogenciaCalificacionIdoneidad">
                        <label class="control-label">Factores de Evaluacuón</label>
                    </div>
                    <div class="col-lg-9">
                        
                        <div id="txtFactoresEscogenciaCalificacionIdoneidad" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">
                            Particularmente, para el futuro contrato, el ofrecimiento más favorable para la entidad, será aquél que sea el resultado de los siguientes factores de evaluación, así:
                            <table>
                                <thead>
                                    <tr>
                                    <th>No</th>
                                    <th>Factor de Escogencia y calificación</th>
                                    <th>Puntaje</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1</td>
                                    <td>Factor económico</td>
                                    <td></td>
                                     </tr>
                                    <tr>
                                    <td>2</td>
                                    <td>Factor técnico</td>
                                    <td></td>
                                     </tr>
                                    <tr>
                                    <td>2</td>
                                    <td>Apoyo Industrial Nacional</td>
                                    <td></td>
                                     </tr>
                                    <tr>
                                    <td>2</td>
                                    <td>No Sanciones</td>
                                    <td></td>
                                     </tr>
                                    <tr>
                                    <td>2</td>
                                    <td>Inclusión Social</td>
                                    <td></td>
                                     </tr>
                                    <tr>
                                    <td>2</td>
                                    <td>Factor Cálidad</td>
                                    <td></td>
                                     </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                     </div>
              
                <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtReglasDesempates">Reglas de Desempates de Ofertas </label>
                    </div>
                    <div class="col-lg-9">
                        <div id="txtReglasDesempates" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                    </div>
                     </div>

               <%-- <div class="form-group">
                    <div class="col-lg-3 text-right">
                        <label class="control-label" for="txtAnalisisRiesgo">Analisis de Riesgos y la Forma de Mitigarlo </label>
                    </div>
                    <div class="col-lg-9">
                        <div id="txtAnalisisRiesgo" class="editorHtml" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                    </div>
                     </div>--%>
                
            </div>
            <!--- Criterios --->
            <div id="tabRiegos" class="tab-pane">
                <div class="row">   
                    <div class="col-lg-7">                 
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Clase</label>
                        </div>
                        <div class="col-lg-9" id="dvdClase">
                            <select id="cboClase" class="form-control">
                                <option value="">Seleccione...</option>
                                <option value="GENERAL">General</option>
                                <option value="ESPECIFICO">Especifico</option>
                            </select>
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Fuente</label>
                        </div>
                        <div class="col-lg-9" id="dvdFuente">
                            <select id="cboFuente" class="form-control">
                                <option value="">Seleccione...</option>
                                <option value="INTERNO">Interno</option>
                                <option value="EXTERNO">Externo</option>
                            </select>
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Etapa</label>
                        </div>
                        <div class="col-lg-9" id="dvdEtapa">
                            <select id="cboEtapa" class="form-control">
                                <option value="">Seleccione...</option>
                                <option value="PLANEACION">Planeación</option>
                                <option value="SELECCION">Selección</option>
                                <option value="CONTRATACION">Contratación</option>
                            </select>
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Tipo</label>
                        </div>
                        <div class="col-lg-9" id="dvdTipo">
                            <select id="cboTipo" class="form-control">
                                <option value="">Seleccione...</option>
                                <option value="RE">Riesgos Económicos</option>
                                <option value="RSP">Riesgos Sociales y Políticos</option>
                                <option value="RO">Riesgos Operacionales</option>
                                <option value="RF">Riesgos Financieros</option>
                                <option value="RR">Riesgos Regulatorios</option>
                                <option value="RN">Riesgos de la Naturaleza</option>
                                <option value="RA">Riesgos Ambientales</option>
                                <option value="RT">Riesgos de la Tecnológicos</option>
                            </select>   
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Descripción</label>
                        </div>
                        <div class="col-lg-9" id="dvdDescripcionR">
                            <textarea class="form-control" rows="3" id="txtDescripcionR"></textarea>
                        </div><br /><br /><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Consecuencia de la ocurrencia del evento</label>
                        </div>
                        <div class="col-lg-9" id="dvdConsecuenciaOcurrenciaEvento">
                            <textarea class="form-control" rows="3" id="txtConsecuenciaOcurrenciaEvento"></textarea>
                        </div><br /><br /><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Probabilidad</label>
                        </div>
                        <div class="col-lg-9" id="dvdProbabilidadR">
                            <select id="cboProbabilidadR" class="form-control">
                                <option value="">Seleccione...</option>
                                <option value="1">Raro</option>
                                <option value="2">Improbable</option>
                                <option value="3">Posible</option>
                                <option value="4">Probable</option>
                                <option value="5">Casi Cierto</option>
                            </select>
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Impacto</label>
                        </div>
                        <div class="col-lg-9" id="dvdImpactoR">
                            <select id="cboImpactoR" class="form-control">
                                <option value="">Seleccione...</option>
                                <option value="1">Insignificante</option>
                                <option value="2">Menor</option>
                                <option value="3">Moderado</option>
                                <option value="4">Mayor</option>
                                <option value="5">Catastrófico</option>
                            </select>
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Valoración</label>
                        </div>
                        <div class="col-lg-9" id="dvdValoracionR">
                            <input type="text" class="form-control" id="txtValoracionR" disabled="disabled" />
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Categoria</label>
                        </div>
                        <div class="col-lg-9" id="dvdCategoriaR">
                            <input type="text" class="form-control" id="txtCategoriaR" disabled="disabled" />
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>¿A quién se le asigna?</label>
                        </div>
                        <div class="col-lg-9" id="dvdAQuienSeLeAsigna">
                            <textarea class="form-control" rows="3" id="txtAQuienSeLeAsigna"></textarea>
                        </div><br /><br /><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Tratamiento</label>
                        </div>
                        <div class="col-lg-9" id="dvdTratamiento">
                            <textarea class="form-control" rows="3" id="txtTratamiento"></textarea>
                        </div><br /><br /><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Probabilidad, después del tratamiento</label>
                        </div>
                        <div class="col-lg-9" id="dvdProbabilidadT">
                            <select id="cboProbabilidadT" class="form-control">
                                <option value="">Seleccione...</option>
                                <option value="1">Raro</option>
                                <option value="2">Improbable</option>
                                <option value="3">Posible</option>
                                <option value="4">Probable</option>
                                <option value="5">Casi Cierto</option>
                            </select>
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Impacto, después del tratamiento</label>
                        </div>
                        <div class="col-lg-9" id="dvdImpactoT">
                            <select id="cboImpactoT" class="form-control">
                                <option value="">Seleccione...</option>
                                <option value="1">Insignificante</option>
                                <option value="2">Menor</option>
                                <option value="3">Moderado</option>
                                <option value="4">Mayor</option>
                                <option value="5">Catastrofico</option>
                            </select>
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Valoración, después del tratamiento</label>
                        </div>
                        <div class="col-lg-9" id="dvdValoracionT">
                            <input type="text" class="form-control" id="txtValoracionT" disabled="disabled" />
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Categoria, después del tratamiento</label>
                        </div>
                        <div class="col-lg-9" id="dvdCategoriaT">
                            <input type="text" class="form-control" id="txtCategoriaT" disabled="disabled" />
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>¿Afecta la ejecución del contrato?</label>
                        </div>
                        <div class="col-lg-9" id="dvdAfectaEjecucion">
                            <select id="cboAfectaEjecucion" class="form-control">
                                <option value="">Seleccione...</option>
                                <option value="SI">SI</option>
                                <option value="NO">NO</option>
                            </select>
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Responsable por implementar el tratamiento</label>
                        </div>
                        <div class="col-lg-9" id="dvdResponsableR">
                            <input type="text" class="form-control" id="txtResponsableR"/>
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Fecha estimada que se inicia el tratamiento</label>
                        </div>
                        <div class="col-lg-9" id="dvdFechaIncioTratamento">
                            <input type="date" class="form-control" id="txtFechaIncioTratamento" />
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Fecha estimada que se completará el tratamiento</label>
                        </div>
                        <div class="col-lg-9" id="dvdFechaCompletoTratamento">
                            <input type="date" class="form-control" id="txtFechaCompletoTratamento" />
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>¿Cómo se realiza  el monitoreo?</label>
                        </div>
                        <div class="col-lg-9" id="dvdMonitoreoR">
                            <input type="text" class="form-control" id="txtMonitoreoR" />
                        </div><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-3 text-right">
                            <label>Periodicidad</label>
                        </div>
                        <div class="col-lg-9" id="dvdPeriodicidadR">
                            <input type="text" class="form-control" id="txtPeriodicidadR" />
                        </div><br /><br />
                    </div>
                    </div> 
                    <div class="col-lg-5">
                        <div class="row">                            
                            <button type="button" class="btn btn-success" id="btnGuardarRiesgo"><span class="glyphicon glyphicon-floppy-saved"></span>Guardar</button>
                            <button type="button" class="btn btn-warning inputHab" id="btnNuevoRiesgo"><span class="glyphicon glyphicon-plus-sign"></span>Nuevo</button>
                        </div>
                        <div class="row">
                            <div class="list-group inputHab" id="lstRiesgos">    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!---polizas-->
            <div id="tabPol" class="tab-pane ">
                <div class="panel panel-default">
                    <div class="panel-heading">Garantia Única de Cumplimiento</div>
                    <div class="panel-body">
                        <div class="container">

                            <div class="row">
                                <div class="form-group">
                                <label for='txtValOtros' class="col-sm-3 control-label">
                                    Requiere Póliza
                                </label>
                                <div class="col-sm-1">
                                    <input id='txtRequierePoliza' checked="checked" type="checkbox" class="input-sm inputHab" />
                                </div>
                            </div>
                            <!--- Requiere Póliza -->  
                            
                            <div class="form-group">
                                <div class="col-lg-3 text-right">
                                    <label class="control-label" for="txtObservacionesAPolizas">Observaciones a Pólizas</label>
                                </div>
                                <div class="col-lg-9">
                                    <div id="txtObservacionesAPolizas" class="editorHtml" style="width: 90%; border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                                </div>
                            </div>   
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
                            <div id="jqxgridPol" style="display:none">
                            </div>
                            <table class="table table-bordered table-hover table-striped tablesorter" id="tblPol">
                                    <thead>
                                        <tr>                                            
                                            <th>Amparo <i class="fa fa-sort"></i></th>
                                            <th>Descripción <i class="fa fa-sort"></i></th>
                                            <th>&nbsp<i class="fa fa-sort"></i></th>
                                            <th>&nbsp<i class="fa fa-sort"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>

            
            <div id="tabOtros" class="tab-pane ">
                
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

            <div id="tabElaborar" class="tab-pane ">

                <div class="row">
                    <div id="dvdFilaClausulas" class="col-lg-2">
                        <select id="CboClausulas" class="form-control input-sm" multiple size="20"></select>
                    </div>
                    <div id="dvdClausula" class="col-lg-10">


                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" id="myTab">
                            <li><a href="#dvdEdicion" data-toggle="tab">Edición</a></li>
                            <%--<li><a href="#dvdDatos" data-toggle="tab">Datos </a></li>--%>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content" style="min-height: 300px">
                            <div class="tab-pane active" id="dvdEdicion">
                                <h4 id="dvdTitulo"></h4>
                                <div id="dvdClausulaEdit" contenteditable style="text-align: justify; min-height: 300px"></div>
                            </div>
                            <%--<div class="tab-pane" id="dvdDatos">
                                <div id="Div2" style="text-align: justify">
                                    <div class="profile-user-info profile-user-info-striped" id="idDatos">
                                    </div>
                                </div>
                            </div>--%>

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

    <div class="modal fade" id="modalPAA" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H7">Consulta de Plan Anual de Adquisicion</h4>
                </div>
                <div class="modal-body">
                    <div id="jqxgridConPAA">
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
                    <div class="row" style="padding-top:10px">
                        <p align="center"><strong>Si no se encuentra el rubro que busca puede registrar uno nuevo <a id="btnRegistrarNuevoRubro">Aqui</a></strong></p>
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
    <style type="text/css">
        .separa {
            padding: 5px
        }
    </style>
    <div class="modal fade" id="modalNuevoRubro" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H9">Nuevo Rubro</h4>
                </div>
                <div class="modal-body">
                    <div class="row separa">
                        <div class="col-lg-3">
                            <label>Código del rubro</label>
                        </div>
                        <div class="col-lg-9" id="dvdCodigoRubroNuevo">
                            <input type="text" class="form-control" id="txtCodigoRubroNuevo" />
                        </div>
                    </div>
                    <div class="row separa">
                        <div class="col-lg-3">
                            <label>Descripción</label>
                        </div>
                        <div class="col-lg-9" id="dvdDescripcionRubroNuevo">
                            <textarea class="form-control" id="txtDescripcionRubroNuevo" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="row separa">
                        <div class="col-lg-3">
                            <label>Código unidad</label>
                        </div>
                        <div class="col-lg-9" >
                            <input type="text" class="form-control" id="txtCodigoUnidadRubroNuevo" />
                        </div>
                    </div>
                    <div class="row separa">
                        <div class="col-lg-3">
                            <label>Codigo recurso</label>
                        </div>
                        <div class="col-lg-9" id="dvdCodigoRecursoRubroNuevo">
                            <input type="text" class="form-control" id="txtCodigoRecursoRubroNuevo" />
                        </div>
                    </div>
                    <div class="row separa">
                        <div class="col-lg-3">
                            <label>Clase</label>
                        </div>
                        <div class="col-lg-9" id="dvdClaseRubroNuevo">
                            <input type="text" class="form-control" id="txtClaseRubroNuevo" />
                        </div>
                    </div>
                    <div class="row separa">
                        <div class="text-center">
                            <button type="button" id="btnGuardarNuevoRubro" class="btn btn-success">Guardar</button>
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
                            <textarea id="txtCondGenFP" rows="3" class="form-control"></textarea>
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
    <div id="secBsqCodigoUNSPSC"></div>

                
    
    <script src="/jqscripts/kendoui/kendo.web.min.js"></script>
    <script src="js/rgEstPrev.js"></script>
    <%--    <script src="js/admProy.js" type="text/javascript"></script>--%>


</asp:Content>
