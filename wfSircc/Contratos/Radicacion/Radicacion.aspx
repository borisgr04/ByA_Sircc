<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Radicacion.aspx.cs" Inherits="wfSircc.Contratos.Radicacion.Radicacion" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../../Content/aceadmin/css/datepicker.css" rel="stylesheet" />

    <div class="panel panel-default">
        <div class="panel-body">
            Ultima Radicación
      <div id="dvdUltRad">
      </div>
        </div>
    </div>
    <div class="row">

        <div class="col-md-12" id="dvdEla">
            <div class="col-xs-2">
                <select id="CboTip" class="form-control input-sm"></select>
            </div>
            <div class="col-xs-2">
                <div class="input-group">
                    <input type="text" class="form-control" id="txtNumero" />
                    <div class="input-group-btn ">
                        <button type="button" id="abrirButton" class="btn btn-info">
                            <span class="icon-folder-open-alt"></span>
                        </button>
                    </div>
                    <!-- /btn-group -->
                </div>
                <!-- /input-group -->


            </div>
            <!-- /.col-lg-9 -->
            <div class="col-xs-8">
                <%--<div class="btn-toolbar">--%>
                <button type="button" class="btn btn-warning" id="nuevoButton">
                    <span class="glyphicon glyphicon-plus-sign"></span>
                    Nuevo</button>
                <button type="button" class="btn btn-primary" id="editarButton">
                    <span class="glyphicon glyphicon-pencil"></span>
                    Editar</button>
                <button type="button" class="btn btn-success" id="guardarButton">
                    <span class="glyphicon glyphicon-floppy-saved"></span>
                    Guardar 
                </button>
                <%--<div class="input-group-btn">
                        <button type="button" class="btn btn-success dropdown-toggle" id="guardarButton" data-toggle="dropdown">Guardar <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a href="#">Guardar Nuevo </a></li>
                            <li class="divider"></li>
                            <li><a href="#">Guardar Plantilla</a></li>
                        </ul>
                    </div>--%>
                <!-- /btn-group -->
                <button type="button" class="btn btn-danger" id="cancelarButton">
                    <span class="glyphicon glyphicon-remove"></span>
                    Cancelar</button>

                <%--<button type="button" value="Nuevo" id="imprimirButton" class="btn btn-info">
                            <span class="glyphicon glyphicon-print"></span>&nbsp Imprimir
                        </button>--%>
                <%--<a href="EdEstPrev.html" target="_blank" class="btn btn-info" id="diligencdiarButton">
                    <span class="glyphicon glyphicon-print"></span>
                    Imprimir</a>--%>
                <button type="button" class="btn btn-success" id="btnCompletado">
                    <span class="glyphicon glyphicon-floppy-saved"></span>
                    Completado
                </button>


                <!-- /btn-group -->
                <%--</div>--%>
            </div>

        </div>
    </div>
    <br />
    <br />
    <div class="form-horizontal" role="form" id="formDATOS">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tabDatos" data-toggle="tab">1. Datos Generales</a></li>
            <li><a href="#tabProy" data-toggle="tab">2.Proyecto</a></li>
            <li><a href="#tabPpto" data-toggle="tab">3.Presupuesto</a></li>
            <li><a href="#tabFP" data-toggle="tab">4.Plazo, Valor y Forma de Pago</a></li>
            <li><a href="#tabPol" data-toggle="tab">5.Garantía Única </a></li>
            <li><a href="#tabObligaciones" data-toggle="tab">6.Obligaciones </a></li>
        </ul>

        <div class="tab-content">
            <div id="tabDatos" class="tab-pane in active">

                <div class="form-group">
                    <label for="CboTip" class="col-sm-3 control-label">
                        Identificación del Contrato:</label>
                    <div class="col-lg-4" id="dvdSubTip">
                        <select id="CboSubTip" class="form-control input-sm cbo inputHab"></select>
                    </div>
                </div>



                <!--identificaion del contrato-->
                <div class="form-group">
                    <label for="TxtFecSus" class="col-sm-3 control-label">
                        Fecha de Suscripción
                    </label>
                    <div class="col-sm-4" id="dvdFecSus">
                        <input type="date" id="TxtFecSus" class="form-control input-sm inputHab" />
                    </div>
                </div>
                <!-- fecha de elaboración -->
                <div class="form-group">
                    <label for="TxtIdeCon" class="col-sm-3 control-label">
                        Contratista 
                    </label>
                    <div class="col-lg-2" id="dvdIdeCon">
                        <input id="TxtIdeCon" type="text" class="form-control input-sm inputHab" disabled="disabled" />
                    </div>
                    <div class="col-lg-1">
                        <button type="button" value="Nuevo" id="BtnBuscCon" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="col-lg-3">
                        <input id="TxtNomCon" type="text" class="form-control input-sm" disabled="disabled" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="TxtIdeRep" class="col-sm-3 control-label">
                        Representante Legal
                    </label>
                    <div class="col-lg-2" id="dvdIdeRep">
                        <input id="TxtIdeRep" type="text" class="form-control input-sm inputHab" disabled="disabled" />
                    </div>
                    <div class="col-lg-1">
                        <button type="button" value="Nuevo" id="BtnBuscRep" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="col-lg-3">
                        <input id="TxtNomRep" type="text" class="form-control input-sm" disabled="disabled" />
                    </div>
                </div>
                <!--contaratista-->

                <div class="form-group">
                    <label for="CboDepSol" class="col-sm-3 control-label">
                        Dependencia solicitante:</label>
                    <div class="col-sm-4" id="dvdDepSol">
                        <select id="CboDepSol" class="form-control input-sm cbo inputHab"></select>
                    </div>
                </div>
                <!---dep solicutante-->
                <div class="form-group">

                    <label class="col-sm-3 control-label">
                        Objeto a Contratar</label>
                    <div class="col-lg-6" id="dvdObjCon">
                        <textarea id='TxtObjCon' rows="2" class="form-control input-sm inputHab"></textarea>
                    </div>
                </div>
                <!-- objeto -->
                <div class="form-group">
                    <label for="CboMod" class="col-sm-3 control-label">
                        Modalidad de Selección
                    </label>
                    <div class="col-lg-4" id="dvdMod">
                        <select id="CboMod" class="form-control input-sm cbo inputHab"></select>
                    </div>
                </div>
                <!--modalidad de seleccion-->
                <div class="form-group">
                    <label for="TxtNroProc" class="col-sm-3 control-label">
                        N° de Proceso
                    </label>
                    <div class="col-lg-4" id="dvdNroPro">
                        <input id="TxtNroPro" type="text" class="form-control input-sm inputHab" disabled />
                    </div>
                </div>

                <!-- identificacion del contrato -->
                <div class="form-group">

                    <label for="CboDepDel" class="col-sm-3 control-label">
                        Dependencia Delegada:</label>
                    <div class="col-sm-4" id="dvdDepDel">
                        <select id="CboDepDel" class="form-control input-sm cbo inputHab"></select>
                    </div>
                </div>
                <!-- delegada -->
                <div class="form-group">
                    <label for="CboDepSu" class="col-sm-3 control-label">
                        Dependencia Supervisión
                    </label>
                    <div class="col-sm-4" id="dvdDepSup">
                        <select id="CboDepSup" class="form-control input-sm cbo inputHab"></select>
                    </div>
                </div>
                <!-- supervision -->
                <div class="form-group">
                    <label class="col-sm-3 control-label">
                        Lugar de ejecución del contrato
                    </label>
                    <div class="col-sm-6">
                        <textarea id="TxtLugar" rows="2" class="form-control input-sm inputHab"></textarea>
                    </div>
                </div>
                <!-- lugar ejecucion-->
                <div class="form-group">
                    <label for='TxtPlazoLiq' class="col-sm-3 control-label">
                        Plazo de liquidación 
                    </label>
                    <div class="col-lg-2">
                        <input id='TxtPlazoLiq' value="4" type="text" placeholder="Plazo de Liquidación" class="form-control input-sm inputHab" />
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
            <!-- panel proyecto-->

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
                                            <th class="text-right">Valor  <i class="fa fa-sort"></i></th>
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
                                            <th class="text-right">Valor  <i class="fa fa-sort"></i></th>
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

                
                
                
                <!-- Variables ppto-->        

            </div>

            <!--- FORMA DE PAGO --->
            <div id="tabFP" class="tab-pane ">
                <%--<div class="panel panel-default">
                    <div class="panel-heading">Plazo de Ejecución, Valor a Contratar y Forma de Pago</div>
                    <div class="panel-body">--%>

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
                            <label for="txtAnti_Porc" class="col-sm-3 control-label">
                                % del Anticipo</label>
                            <div class="col-sm-2">
                                <input type="text" id="txtAnti_Porc" value="0" class="form-control input-sm inputHab" />
                            </div>
                            <label for="txtAnti_Porc" class="col-sm-2 control-label">
                                Valor del Anticipo</label>
                            <div class="col-sm-2">
                                <input type="text" id="txtAnti_Val" value="0" class="form-control input-sm inputHab" disabled="disabled" />
                            </div>

                        </div>
                        <!--- anticipo-->

                <div class="form-group">
                            <label class="col-sm-3 control-label">
                                Plazo de Ejecución
                            </label>
                            <div class="col-lg-2">
                                <input id='TxtPlazo1' type="text" placeholder="Plazo de ejecución" class="form-control input-sm inputHab" />
                            </div>
                            <div class="col-lg-2">
                                <select id="CboTPlazo1" class="form-control input-sm cbo inputHab"></select>
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
                            <label class="col-sm-3 control-label">
                                Tipo de Forma de Pago
                            </label>
                            <div class="col-xs-2">
                                <select id="cboFPagoTipo" class="form-control input-sm inputHab">
                                    <option value="PU">Pago Único </option>
                                    <option value="PM" selected="selected">Pago Mensual</option>
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
                                    <button type="button" class="btn btn-success btn-minier inputHab" id="btnAgregarFP" disabled="disabled">
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
                                            <th class="text-right">Valor <i class="fa fa-sort"></i></th>
                                            <th class="text-right">% <i class="fa fa-sort"></i></th>
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


        </div>

    </div>
    <!-- FIN DE DATOS-->

    <div id="secBsqTerceros"></div>

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
                                <%--<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>--%>
                                <span id="lbMsg" class="control-label"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12" id="dvdTipPag">
                                <label for="CboTipPag">
                                    Tipo de Pago</label>
                                <select id="CboTipPag" class="form-control input-sm validar" autofocus></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4" id="dvdPorc">
                                <label for="txtValPorc">
                                    Porcentaje (%)</label>
                                <input type="text" id="txtPorc" class="form-control input-sm validar inputHab" />
                            </div>

                            <div class="col-xs-4" id="dvdValPag">
                                <label for="txtValPag">
                                    Valor </label>
                                <input type="text" id="txtValPag" class="form-control input-sm currency validar inputHab"/>
                            </div>
                            <div class="col-xs-4" id="dvdCantidadPagos">
                                <label for="txtCantidadPagos">
                                    Cantidad Pagos</label>
                                <input type="text" id="txtCantidadPagos" class="form-control input-sm validar" disabled="disabled" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12" id="dvdCond">
                                <label for="txtCond">Condición del Pago</label>
                                <textarea id="txtCond" rows="4" class="form-control input-sm validar"></textarea>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <label for="CboApoEnt">
                                    Aporte/Pago por la Entidad?
                                </label>
                                <select id="CboApoEnt" class="form-control input-sm ">
                                    <option value="S">SI</option>
                                    <option value="N">NO</option>
                                </select>
                            </div>                            
                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <label for="txtSaldo">
                                    Saldo en Porcentaje (%)
                                </label>
                                <input type="text" id="txtSaldoP" class="form-control input-sm" disabled />

                            </div>
                            <div class="col-xs-6">
                                <label for="txtSaldo">
                                    Saldo en Valor
                                </label>
                                <input type="text" id="txtSaldoV" class="form-control input-sm currency " disabled />
                            </div>
                        </div>
                    </div>
                    <!--</form>-->
                </div>
                <div class="modal-footer">
                    <button type="button" id="BtnFPGuardar" class="btn btn-default">Guardar</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
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
                            <input id="txtNOM_PLA_EP" maxlength="100" class="form-control" />
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


    <div class="modal fade" id="modalTerceros" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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

    
    <script src="js/Radicacion.js"></script>
</asp:Content>
