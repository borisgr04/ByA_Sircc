<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Legalizacion.aspx.cs" Inherits="wfSircc.Contratos.Legalizacion.Legalización" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server"> 
    <div class="container">
    <div class="row">
        <div class="col-md-12" id="dvdEla">
            <div class="col-md-3">
                <select id="CboTip" class="form-control input-sm"></select>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <input type="text" class="form-control inputHab" id="txtNumero" />
                    <div class="input-group-btn ">
                        <button type="button" id="BtnDwnAbrir" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                            <span class="icon-folder-open-alt"></span>
                        </button>
                    </div>
                    <!-- /btn-group -->
                </div>
                <!-- /input-group -->
            </div>
        </div>
        <hr />
        <div class="col-md-12" style="display:none; margin:15px 15px 15px 15px" id="dvdDetContrato">   
            <div id="DetContrato" style="height:130px; overflow:auto">
                <br />
                <hr />                   
                <br /> 
            </div>  
        </div>    
        <div class="col-md-12">  
                                &nbsp                            
                            </div>  
        <div class="form-horizontal" role="form" id="formDATOS">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tabRegi" data-toggle="tab">1.Registro Presupuestal</a></li>
                <li><a href="#tabPoli" data-toggle="tab">2.Pólizas de Garantia</a></li>
                <li><a href="#tabImpu" data-toggle="tab">3.Impuesto</a></li>
                <li><a href="#tabExon" data-toggle="tab">4.Exoneracion de Impuestos</a></li>
                <li><a href="#tabInte" data-toggle="tab">5.Interventoria/Supervisión </a></li>
                <li><a href="#tabConf" data-toggle="tab">6.Confirmar Legalizacion </a></li>
            </ul>

            <div class="tab-content">
                <div id="tabRegi" class="tab-pane in active">
                    <div class="row">                        
                        <br />
                        <div class="row">
                            <div class="col-md-12">
                                <div id="jqxgridRegisP"></div>
                                <div class="panel panel-default" style="margin:5px">
                                    <div class="panel-heading">Registros Presupuestales<span style="margin-left:20px" class="label label-default" id="RPTip"></span></div>
                                    <div class="panel-body">
                                        <div class="col-md-12" style="margin-bottom:15px;">
                                            <div class="col-md-2">
                                                <label for="txtNRp">Número Rp:</label>
                                                <input id="txtNRp" type="text" class="form-control input-sm inputHab" />
                                            </div>
                                            <div class="col-md-2">
                                                <label for="TxtFechaRp">Fecha Rp:</label>                                
                                                <input type="date" class="form-control" id="TxtFechaRp" />
                                            </div>
                                            <div class="col-md-2">
                                                <label for="TxtValorRp">Valor Rp:</label>
                                                <input id="TxtValorRp" type="text" class="form-control input-sm inputHab currency" />
                                            </div>
                                            <div class="col-md-2">
                                                <label for="CboNCont">Documento Soporte:</label>
                                                <select id="CboNCont" class="form-control input-sm cbo"></select>
                                            </div>
                                            <div class="col-md-4" style="margin-top:20px;">
                                                <button type="button" class="btn btn-warning" id="btnNuevoRP"><span class="glyphicon glyphicon-plus-sign"></span>Nuevo</button>
                                                <button type="button" class="btn btn-success" id="BtnguardarRegistro">
                                                    <span class="glyphicon glyphicon-floppy-saved"></span>Guardar</button>
                                                <button type="button" class="btn btn-danger" id="BtncancelarRegistro">
                                                    <span class="glyphicon glyphicon-remove"></span>Cancelar</button>
                                            </div>
                                        </div>
                                        <table class="table table-bordered table-hover table-striped tablesorter" id="tblRP">
                                            <thead>
                                                <tr>
                                                    <th class='text-right'>N° RP <i class="fa fa-sort"></i></th>
                                                    <th>Fecha <i class="fa fa-sort"></i></th>
                                                    <th class="text-right">Valor <i class="fa fa-sort"></i></th>
                                                    <th>Documento Soporte <i class="fa fa-sort"></i></th>
                                                    <th>&nbsp<i class="fa fa-sort"></i></th>
                                                    <th>&nbsp<i class="fa fa-sort"></i></th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="panel panel-default" style="margin:5px;margin-top:10px">
                                    <div class="panel-heading">Rubros</div>
                                    <div class="panel-body">
                                        <div class="container">

                                            <div class="row">
                                                <div class="col-xs-3">
                                                    <label for="txtCodRub">
                                                        Código</label>                                    
                                                    <div class="input-group">
                                                        <input style="" id="txtCodRub" class="form-control input-sm inputHab" disabled="disabled"/>
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
                                                    <input id="txtDesRub" class="form-control input-sm" disabled="disabled" />
                                                </div>
                                                <div class="col-xs-2">
                                                    <label for="txtValRub">
                                                        Valor
                                                    </label>
                                                    <input id="txtValRub" class="form-control input-sm  currency inputHab" />
                                                </div>
                                                <div class="col-xs-3">
                                                    <button type="button" class="btn btn-success" id="btnGuardarRubro"><span class="glyphicon glyphicon-floppy-saved"></span>Guardar</button>
                                                    <button type="button" class="btn btn-warning" id="btnNuevoRubro"><span class="glyphicon glyphicon-plus-sign"></span>Nuevo</button>
                                                </div>
                                            </div>
                            
                                            <div class="row">&nbsp</div>
                                            <div class="list-group inputHab" id="lstRubros"> 
                                    
                                            </div>        
                                            <table class="table table-bordered table-hover table-striped tablesorter" id="tblRubrosContratos">
                                                    <thead>
                                                        <tr>
                                                            <th>Código Rubro<i class="fa fa-sort"></i></th>
                                                            <th>Nombre del Rubro <i class="fa fa-sort"></i></th>
                                                            <th class="text-right">Valor  <i class="fa fa-sort"></i></th>
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
                        </div>
                    </div>

                </div>
                <!---Registro Presupuestal-->
                <div id="tabPoli" class="tab-pane ">

                    <div class="row">
                        <div class="col-md-12">

                            <div class="col-md-8">
                            </div>

                            <div class="col-md-4 text-right">
                                <button type="button" class="btn btn-success" id="BtnguardarPoliza">
                                    <span class="glyphicon glyphicon-floppy-saved"></span>Guardar</button>
                                <button type="button" class="btn btn-danger" id="BtncancelarPoliza">
                                    <span class="glyphicon glyphicon-remove"></span>Cancelar</button>
                            </div>
                            <div class="col-md-6">
                                <label for="CboAmp">Tipo de Amparo:</label>
                                <div id="dvdAmp"><select id="CboAmp" class="form-control input-sm cbo"></select></div>
                            </div>
                            <div class="col-md-6">
                                <label for="CboAseg">Aseguradora:</label>
                                <div id="dvdAseg"><select id="CboAseg" class="form-control input-sm cbo"></select></div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-2">
                                <label for="TxtFechaIPlz">Fecha Inicial:</label>
                                <input type="date" class="form-control" id="TxtFechaIPlz" />
                                <%--<div class="input-medium">
                                    <div class="input-group">
                                        <input class="input-medium date-picker" id="TxtFechaIPlz" type="text" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" />
                                        <span class="input-group-addon">
                                            <i class="icon-calendar"></i>
                                        </span>
                                    </div>
                                </div>--%>
                            </div>

                            <div class="col-md-2">
                                <label for="TxtFechaVPlz">Fecha de Vencimiento:</label>
                                <input type="date" class="form-control" id="TxtFechaVPlz" />
                                <%--<div class="input-medium">
                                    <div class="input-group">
                                        <input class="input-medium date-picker" id="TxtFechaVPlz" type="text" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" />
                                        <span class="input-group-addon">
                                            <i class="icon-calendar"></i>
                                        </span>
                                    </div>
                                </div>--%>
                            </div>

                            <div class="col-md-3">
                                <label for="TextNroPlz">N° Póliza:</label>
                                <input type="text" id="TextNroPlz" class="form-control input-sm inputHab" />
                            </div>

                            <div class="col-md-3">
                                <label for="TextValorPlz">Valor:</label>
                                <input type="text" id="TextValorPlz" class="form-control input-sm inputHab currency" />
                            </div>

                            <div class="col-md-2">
                                <label for="CboTipoPlz">Tipo:</label>
                                <select id="CboTipoPlz" class="form-control input-sm cbo">
                                    <option value="I">Inicial</option>
                                    <option value="A">Ampliación</option>
                                    <option value="M">Modificación</option>
                                    <option value="R">Reducción</option>
                                </select>
                            </div>

                        </div>
                        <div class="col-md-12">
                            &nbsp
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div id="jqxgridRegisPlz"></div>
                                <table class="table table-bordered table-hover table-striped tablesorter" id="tblPolizasR">
                                    <thead>
                                        <tr>
                                            <th>ID <i class="fa fa-sort"></i></th>
                                            <th>Tipo de Amparo <i class="fa fa-sort"></i></th>
                                            <th>Aseguradora <i class="fa fa-sort"></i></th>
                                            <th>N° Poliza <i class="fa fa-sort"></i></th>
                                            <th>Fecha Inicial <i class="fa fa-sort"></i></th>
                                            <th>Fecha Vencimiento <i class="fa fa-sort"></i></th>
                                            <th>Valor Poliza <i class="fa fa-sort"></i></th>
                                            <th>Legalizacion <i class="fa fa-sort"></i></th>
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
                <!---Polizas de Garantia-->
                <div id="tabImpu" class="tab-pane ">
                    <div class="row">
                        <div class="col-md-8">
                        </div>
                        <div class="col-md-4 text-right">
                            <button type="button" class="btn btn-success" id="BtnguardarImpuesto">
                                <span class="glyphicon glyphicon-floppy-saved"></span>Guardar</button>
                            <button type="button" class="btn btn-danger" id="BtncancelarImpuesto">
                                <span class="glyphicon glyphicon-remove"></span>Cancelar</button>
                        </div>

                    </div>
                    <div class="col-md-12">
                        &nbsp
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-4">
                                <label for="CboImpu">Tipo de Impuesto:</label>
                                <div id="dvdImpu"><select id="CboImpu" class="form-control input-sm cbo"></select></div>
                            </div>
                            <div class="col-md-2">
                                <label for="TextVigenciaLqd">Vigencia Liquidacion:</label>
                                <div id="dvdVigenciaLqd"><input type="text" id="TextVigenciaLqd" class="form-control input-sm inputHab" /></div>
                            </div>

                            <div class="col-md-2">
                                <label for="TextNroLqd">N° Liquidacion:</label>
                                <div id="dvdNroLqd"><input type="text" id="TextNroLqd" class="form-control input-sm inputHab" /></div>
                            </div>

                            <div class="col-md-2">
                                <label for="TextValLqd">Valor Liquidacion:</label>
                                <div id="dvdValLqd"><input type="text" id="TextValLqd" class="form-control input-sm inputHab currency" /></div>
                            </div>

                            <div class="col-md-2">
                                <label for="CboDS">Documento Soporte:</label>
                                <div id="dvdDS">
                                    <select id="CboDS" class="form-control input-sm cbo">
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-12">
                            &nbsp
                        </div>
                        <div class="row">
                            
                            <div class="col-md-12">
                                <div id="jqxgridRegisImp"></div>
                                <table class="table table-bordered table-hover table-striped tablesorter" id="tblImpuestos">
                                    <thead>
                                        <tr>
                                            <th>N° Impuesto <i class="fa fa-sort"></i></th>
                                            <th>Impuesto <i class="fa fa-sort"></i></th>
                                            <th>Vigencia Liquidación <i class="fa fa-sort"></i></th>
                                            <th>N° Liquidación <i class="fa fa-sort"></i></th>
                                            <th>Valor Liquidación <i class="fa fa-sort"></i></th>
                                            <th>Documento Soporte <i class="fa fa-sort"></i></th>
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
                <!---Impuesto --->
                <div id="tabExon" class="tab-pane ">
                    <div class="row">
                        <div class="col-md-12">
                            &nbsp
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                            </div>
                            <div class="col-md-9">
                                <label>
                                    <input id="CheckExon" type="checkbox" />
                                    Exonerado de Impuestos
                                </label>
                                <label>
                                    <textarea id="TextObs" class="form-control input-sm inputHab"> </textarea>Escriba el número de la resolución de exoneración, impuestos exonerados y toda la información 
                                de soporte del acto administrativo.  
                                </label>
                            </div>
                            <div class="col-md-12">
                                <div class="col-md-2">
                                </div>
                                <div class="col-md-4 text-left">
                                    <button type="button" class="btn btn-success" id="BtnguardarExno">
                                        <span class="glyphicon glyphicon-floppy-saved"></span>Guardar</button>
                                                                   <button type="button" class="btn btn-danger" id="BtncancelarExno">
                                        <span class="glyphicon glyphicon-remove"></span>Cancelar</button>
                                </div>
                            </div>

                        </div>





                    </div>




                </div>
                <!---Exoneracion de Impuestos-->
                <div id="tabInte" class="tab-pane ">
                    <div class="row">
                        <div class="col-md-8">
                        </div>
                        <div class="col-md-4 text-right">
                            <button type="button" class="btn btn-success" id="BtnguardarIntervria">
                                <span class="glyphicon glyphicon-floppy-saved"></span>Guardar</button>
                            <button type="button" class="btn btn-danger" id="BtncancelarIntervria">
                                <span class="glyphicon glyphicon-remove"></span>Cancelar</button>
                        </div>

                    </div>
                    <div class="col-md-12">
                        &nbsp
                    </div>

                    <div class="form-group">
                        <label for="CboTipoInter" class="col-sm-2 control-label">
                            Tipo: 
                        </label>
                        <div class="col-md-3">
                            <select id="CboTipoInter" class="form-control input-sm cbo">
                                <option value="S">Interno(Supervisor)</option>
                                <option value="I">Externo</option>
                                <option value="T">Interno(Apoyo Tecnico)</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="TxtIdeInter" class="col-sm-2 control-label">
                            Identificación: 
                        </label>
                        <div class="col-md-3">
                            <input id="TxtIdeInter" type="text" class="form-control input-sm inputHab" />
                        </div>
                        <div class="col-md-1">
                            <button type="button" value="Nuevo" id="BtnBuscCon" class="btn btn-primary btn-xs" title="Abrir Cuadro de Busqueda">
                                <span class="glyphicon glyphicon-search"></span>
                            </button>
                        </div>
                        <div class="col-md-5">
                            <input id="TxtNomCon" type="text" class="form-control input-sm " disabled="disabled" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="TextObser" class="col-sm-2 control-label">
                            Observación: 
                        </label>
                        <div class="col-md-9">
                            <textarea id="TextObser" class="form-control input-sm inputHab"></textarea>
                        </div>
                    </div>


                    <div class="col-md-12">
                        &nbsp
                    </div>
                    <div class="row">

                        <div class="col-md-12">
                            <div id="jqxgridRegisInter"></div>
                            <%--<table class="table table-bordered table-hover table-striped tablesorter" id="tblInterventores">
                                    <thead>
                                        <tr>
                                            <th>Identificación <i class="fa fa-sort"></i></th>
                                            <th>Nombre <i class="fa fa-sort"></i></th>
                                            <th>Tipo <i class="fa fa-sort"></i></th>
                                            <th>Contrato <i class="fa fa-sort"></i></th>
                                            <th>Observacion <i class="fa fa-sort"></i></th>
                                            <th>Estado <i class="fa fa-sort"></i></th>
                                            <th>&nbsp<i class="fa fa-sort"></i></th>
                                            <th>&nbsp<i class="fa fa-sort"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>--%>
                        </div>
                    </div>


                </div>
                <!---Interventoria/Supervisión --->
                <div id="tabConf" class="tab-pane ">
                    <div class="row">
                        <div class="col-md-12">
                            Legalización de Contratos
                        </div>
                        <div class="col-md-12">
                            <div id="jqxgridRegisConf_Con"></div>
                        </div>
                        <div class="col-md-12">
                            &nbsp
                        </div>
                        <div class="col-md-12">
                            Confirmación de Adiciones
                        </div>
                        <div class="col-md-12">
                            <div id="jqxgridRegisConf_Adi"></div>
                        </div>
                    </div>




                </div>
                <!---Confirmar Legalizacion --->
            </div>
        </div>

        </div>
    </div>

        <%--<div class="modal fade" id="modalTerceros" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
        <!-- /.modal TERCEROS-->--%>


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


    <div id="secBsqTerceros"></div>


        <script src="js/Legalizacion.js"></script>
</asp:Content>

