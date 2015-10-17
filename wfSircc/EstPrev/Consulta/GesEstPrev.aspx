<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesEstPrev.aspx.cs" Inherits="wfSircc.EstPrev.Consulta.GesEstPrev" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <%--<link href="../docEP.css" rel="stylesheet" />  --%>  
            <div class="container">
                <div class="row">                
                <div class="col-md-12" id="dvdEla" style="margin:10px">                     
                    <div class="row">  
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Producto o Servicio</label>
                                                </div>
                                                <div class="input-group col-lg-7">
                                                    <input type="text" class="form-control" id="txtProducto" value="" disabled="disabled"/>
                                                    <div class="input-group-btn ">
                                                        <button type="button" id="btnBuscarCodigoUNSPSC" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                                            <span class="icon-search"></span>                        
                                                        </button> 
                                                        <button type="button" id="btnLimpiarCodigoUNSPSC" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                                            <span class="icon-remove"></span>                        
                                                        </button>         
                                                    </div>
                                                </div>
                                            </div>
                                        </div>    
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Número de estudio previo</label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input type="text" class="form-control inputHab tip" id="txtNumeroEstudioPrevio" value="" data-toggle="tooltip" data-placement="top" title="Al digitar, solo se busca estudio previo con este numero"/>                                                
                                                </div>
                                            </div>
                                        </div>  
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Modalidad de Contratación</label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <select class="form-control" id="cboModalidad"></select>                                              
                                                </div>
                                            </div>
                                        </div>  
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Estado</label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <select class="form-control" id="cboEstado">
                                                        <option value="">Seleccione</option>
                                                        <option value="EL">ELABORADO</option>
                                                        <option value="RV">REVISADO</option>
                                                        <option value="AP">APROVADO</option>
                                                    </select>                                              
                                                </div>
                                            </div>
                                        </div> 
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Dependencia Solicitud</label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <select class="form-control" id="cboDependencia">
                                                    </select>                                              
                                                </div>
                                            </div>
                                        </div> 
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Proyecto</label>
                                                </div>
                                                <div class="input-group col-lg-7">
                                                    <input type="text" class="form-control" id="txtProyecto" value="" disabled="disabled"/>
                                                    <div class="input-group-btn ">
                                                        <button type="button" id="addButtonProy" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                                            <span class="icon-search"></span>                        
                                                        </button>  
                                                        <button type="button" id="btnLimpiarProyecto" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                                            <span class="icon-remove"></span>                        
                                                        </button>                  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Fecha desde</label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" type="date" id="txtFechaDesde"/>                                             
                                                </div>
                                            </div>
                                        </div> 
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Fecha hasta</label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" type="date" id="txtFechaHasta" />                                             
                                                </div>
                                            </div>
                                        </div> 
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Cuantía</label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <select class="form-control" id="cboCuantia">
                                                        <option value="">Cualquier Valor...</option>
                                                        <option value="1">$0 - $100.000.000</option>
                                                        <option value="2">$100.000.001 - $300.000.000</option>
                                                        <option value="3">$300.000.001 - $500.000.000</option>
                                                        <option value="4">$500.000.001 - $1.000.000.000</option>
                                                        <option value="5">Mayores a $1.000.000.000</option>           
                                                    </select>                                      
                                                </div>
                                            </div>
                                        </div> 
                        <div class="col-lg-6" style="padding:5px">                
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <label>Objeto a Contratar</label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input type="text" class="form-control inputHab" id="txtObjeto" value="" />                                                
                                                </div>
                                            </div>
                                        </div> 
                    </div>  
                    <div class="row">
                        <div class="text-center">
                            <button type="button" value="Nuevo" id="btnBuscarEstudioPrevio" class="btn btn-info">
                                <span class="glyphicon glyphicon-search"></span>&nbsp Buscar
                            </button>
                            <button type="button" value="Nuevo" id="btnRestablecerFiltros" class="btn btn-success">
                                <span class="glyphicon glyphicon-trash"></span>&nbsp Restablecer
                            </button>
                        </div>
                    </div>
                </div> 
                <div class="col-lg-12">
                    <table class="table table-bordered table-hover table-striped tablesorter" id="lEstPrev">
                        <thead>
                            <tr>
                                <th>Número<i class="fa fa-sort"></i></th>
                                <th>Modalidad de Contratación<i class="fa fa-sort"></i></th>
                                <th>Estado<i class="fa fa-sort"></i></th>
                                <th>Dependencia<i class="fa fa-sort"></i></th>
                                <th>Objeto<i class="fa fa-sort"></i></th>
                                <th>Contratista<i class="fa fa-sort"></i></th>
                                <th>Cuantía<i class="fa fa-sort"></i></th>
                                <th>Fecha<i class="fa fa-sort"></i></th>
                                <th><i class="fa fa-sort"></i></th>
                                <th><i class="fa fa-sort"></i></th>
                                <th><i class="fa fa-sort"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table> 

                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <h4 id="msjResp"></h4>
                        </div>
                    </div> 
                </div>
            <!-- /.row -->
            </div>
                </div>     
    <div id="secBsqCodigoUNSPSC"></div>                  
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
    <script src="js/GesEstPrev.js"></script>
</asp:Content>
