<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="default2.aspx.cs" Inherits="wfSircc.default2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

          <ul class="nav nav-tabs" id="myTab3">
            <li class="active">
                <a data-toggle="tab" href="#tabDatos"><i class="pink icon-dashboard bigger-110"></i>1. Diligenciar Datos</a>
            </li>
           <li><a data-toggle="tab" href="#tabDoc">
               <i class="blue icon-user bigger-110"></i>2. Documento</a></li>
            <li>
                <a data-toggle="tab" href="#tabPrevia"><i class="icon-rocket"></i>3. Vista Previa</a>
            </li>
        </ul>

        <div class="tab-content">
            <div id="tabDatos" class="tab-pane in active">
                <ul class="nav nav-tabs" id="myTab">
                    <li class="active"><a href="#PanelBasico" data-toggle="tab">Datos Generales</a></li>
                    <li><a href="#panelProyecto" data-toggle="tab">Proyecto</a></li>
                    <li><a href="#panelPpto" data-toggle="tab">Presupuesto</a></li>
                    <li><a href="#panelEspTec" data-toggle="tab">Especificaciones Técnicas</a></li>
                    <li><a href="#panelOblCont" data-toggle="tab">Obligación Contratista</a></li>
                    <li><a href="#panelOblEnt" data-toggle="tab">Obligación Entidad</a></li>
                    <li><a href="#panelPolizas" data-toggle="tab">Polizas</a></li>
                    <li><a href="#panelRegion" data-toggle="tab">Región</a></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content" style="min-height: 300px">
                    <div class="tab-pane active" id="PanelBasico">
                        <div class="profile-user-info profile-user-info-striped" id="idDatos">
                                
                        <div class="profile-info-row"><div class="profile-info-name"> Estado:</div>
                            <div class="profile-info-value"><span class="editable" id="username">
                                boris
                                </span></div></div>
                            </div>
                        <div class="row">
                            &nbsp
                        </div>

                        <div class="row">

                            <div class="col-lg-4">
                                <label for="CboEstEP">
                                    
                                </label>

                                
                            </div>
                            <div class="col-lg-4">
                                <label>
                                    Vigencia:
                                </label>
                                <select id="CboVig" class="form-control input-sm"></select>
                            </div>

                            <div class="col-lg-4">
                                <label for="TxtFecElab">
                                    Fecha de elaboración :</label>
                                <input type="date" id="TxtFecElab" class="form-control input-sm">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3">
                                <label for='TxtIdeFun'>
                                    Funcionario :</label>

                                <input id="TxtIdeFun" type="text" class="form-control input-sm" />

                            </div>
                            <div class="col-lg-1">
                                <button type="button" value="Nuevo" id="btnBuscarC" class="btn btn-primary" title="Abrir Cuadro de Busqueda">
                                    <span class="glyphicon glyphicon-search"></span>
                                </button>
                            </div>
                            <div class="col-lg-4">
                                <label for="CboDepSol">
                                    &nbsp
                                </label>
                                <input id="TxtNomFun" type="text" class="form-control input-sm" disabled />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3">
                                <label for="TxtIdeRes">
                                    Responsable
                                </label>
                                <input id="TxtIdeRes" type="text" class="form-control input-sm" />
                            </div>
                            <div class="col-lg-1">
                                <span class="space-12"></span>
                                <label>
                                    &nbsp
                                </label>
                                <button type="button" value="Nuevo" id="btnBuscarR" class="btn btn-primary" title="Abrir Cuadro de Busqueda">
                                    <span class="glyphicon glyphicon-search"></span>
                                </button>
                            </div>
                            <div class="col-lg-4">
                                <label for="TxtNomRes">
                                    &nbsp
                                </label>
                                <input id="TxtNomRes" type="text" class="form-control input-sm" disabled />

                            </div>

                        </div>

                        <div class="row">
                            <div class="col-lg-4">
                                <label for="CboDepSol">
                                    Dependencia solicitante:</label>
                                <select id="CboDepSol" class="form-control input-sm cbo"></select>
                            </div>
                            <div class="col-lg-4">
                                <label for="CboDepSu">
                                    Dependencia Supervisión
                                </label>
                                <select id="CboDepSup" class="form-control input-sm cbo"></select>
                            </div>
                            <div class="col-lg-4">
                                <label for="CboDepDel">
                                    Dependencia Delegada:</label>
                                <select id="CboDepDel" class="form-control input-sm cbo"></select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <label>
                                    Objeto a Contratar</label>
                                <textarea id='TxtObjCon' rows="4" class="form-control input-sm"></textarea>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-4">
                                <label for="CboMod">
                                    Modalidad de Selección
                                </label>
                                <select id="CboMod" class="form-control input-sm cbo"></select>
                            </div>
                            <div class="col-lg-4">
                                <label for="CboTip">
                                    Identificación del Contrato:</label>
                                <select id="CboTip" class="form-control input-sm cbo"></select>
                            </div>
                            <div class="col-lg-4">
                                <label for="CboSubTip">
                                    &nbsp</label>
                                <select id="CboSubTip" class="form-control input-sm cbo"></select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-4">
                                <label>
                                    Valor a Contratar:
                                </label>
                                <input id='txtValTot' type="text" placeholder="Valor a Contratar" class="form-control input-sm" />
                            </div>
                            <div class="col-lg-4">
                                <label for='txtValProp'>
                                    Aportes Entidad:
                                </label>
                                <input id='txtValProp' type="text" placeholder="Aportes Priopios" class="form-control input-sm" />
                            </div>
                            <div class="col-lg-4">
                                <label for='txtValOtros'>
                                    Aportes Otros:
                                </label>

                                <input id='txtValOtros' type="text" placeholder="Aportes Otros" class="form-control input-sm" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-2">
                                <label>
                                    Plazo de ejecución
                                </label>
                                <input id='TxtPlazo1' type="text" placeholder="Plazo de ejecución" class="form-control input-sm" />
                            </div>
                            <div class="col-lg-2">
                                <label>
                                    &nbsp</label>
                                <select id="CboTPlazo1" class="form-control input-sm cbo"></select>
                            </div>
                            <div class="col-lg-2">
                                <label>
                                    &nbsp</label>
                                <input id='TxtPlazo2' type="text" placeholder="Plazo de ejecución" class="form-control input-sm" />
                            </div>
                            <div class="col-lg-2">
                                <label>
                                    &nbsp</label>
                                <select id="CboTPlazo2" class="form-control input-sm cbo"></select>

                            </div>
                            <div class="col-lg-4">
                                <label for='TxtPlazoLiq'>
                                    Plazo de liquidación del contrato (Mes(es))
                                </label>
                                <input id='TxtPlazoLiq' type="text" placeholder="Plazo de Liquidación" class="form-control input-sm" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <label>
                                    Lugar de ejecución del contrato:
                                </label>
                                <textarea id="TxtLugar" rows="2" class="form-control input-sm cbo"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="panelPpto">
                        Cargando Proyecto....
                    </div>
                    <div class="tab-pane" id="panelProyecto">
                        Cargando Proyecto....
                    </div>
                    <div class="tab-pane" id="panelEspTec">
                        Cargando Especificaciones Técnicas....
                    </div>
                    <div class="tab-pane" id="panelOblCont">
                        Cargando Oblig....
                    </div>
                    <div class="tab-pane" id="panelOblEnt">
                        Cargando Oblig....
                    </div>
                    <div class="tab-pane" id="panelPolizas">
                        Cargando... Polizas
                    </div>
                    <div class="tab-pane" id="panelRegion">
                        Cargando... Region
                    </div>
                </div>
            </div>

            <div id="tabDoc" class="tab-pane">
                Mostrar Documento
            </div>

            <div id="tabPrevia" class="tab-pane">
                Monstrar Vista Previa
            </div>
        </div>
</asp:Content>
