<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="RegSolicitudes.aspx.cs" Inherits="wfSircc.Solicitudes.Registro.RegSolicitudes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container"> 
    <div class="row">

        <div class="row">
            <div class="col-md-12">
                <div class="col-md-3">
                    <div class="input-group">
                        <input type="text" class="form-control" id="txtNumero" />
                        <div class="input-group-btn ">
                            <button type="button" id="BtnDwnAbrir" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                <span class="icon-folder-open-alt"></span>
                                Abrir <span class="caret"></span></button>
                            <ul class="dropdown-menu pull-right">
                                <li><a href="#" id="abrirButton">
                                    <span class="glyphicon glyphicon-folder-open"></span>
                                    &nbsp Abrir Solicitud</a></li>
                                <li class="divider"></li>
                                <li><a href="#" id="BtnAbrirdeEP">
                                    <span class="glyphicon glyphicon-plus-sign"></span>
                                    &nbsp Nuevo Apartir de Estudio Previo</a></li>
                                
                                
                            </ul>
                        </div>
                        <!-- /btn-group -->
                    </div>
                    <!-- /input-group -->
                </div>
                <!-- /.col-lg-9 -->
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

                        <button type="button" value="Nuevo" id="BtnAsignar" class="btn btn-info">
                        <span class="glyphicon glyphicon-hand-right"></span>&nbsp Asignar
                        </button>
                        <button id="btnAtras" class="btn btn-success"><span class="glyphicon glyphicon-chevron-left"></span>Atrás</button>  
                        <%--<a class="btn btn-danger" href="javascript:history.back(1)" title="Volver Atrás">
                            <span class="glyphicon glyphicon-arrow-left"></span>
                            &nbsp Atrás</a>--%>
                        
                    </div>
                </div>
            </div>
            <!-- /.row -->
        </div>

        <div class="col-md-12">
            <div class="row">
                &nbsp
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="txtNSol">
                        N° de Solicitud:
                    </label>
                    <input id='txtNSol' title="Número de Solicitud." class="form-control input-sm" />
                </div>
                <div class="col-md-6">
                    <label for="txtIDEP">
                        N° de Estudio Prevo:
                    </label>
                    <input id='txtIDEP' title="Número de Estudio Previo." class="form-control input-sm" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>
                        Fecha de Recibido :</label>
                    <input id="txtFecRec" type="date" class="form-control input-sm date" />

                </div>
                <div class="col-md-6">

                    <label for="CboDepDel">
                        Dependencia Delegada:</label>
                    <select id="CboDepDel" class="form-control input-sm"></select>
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label>
                        Objeto a Contratar</label>
                    <textarea id="txtObjCon" class="form-control input-sm" rows="3" placeholder="Digite Objeto a Contratar"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="CboDepSol">
                        Dependencia solicitante:</label>
                    <select id="CboDepSol" class="form-control input-sm"></select>
                </div>
                <div class="col-md-6">
                    <label for="CboMod">
                        Modalidad de Selección
                    </label>
                    <select id="CboMod" class="form-control input-sm"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="CboTip">
                        Tipo del Contrato:</label>
                    <select id="CboTip" class="form-control input-sm"></select>
                </div>
                <div class="col-md-6">
                    <label for="CboSubTip">
                        SubTipo del Contrato:</label>
                    <select id="CboSubTip" class="form-control input-sm"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="txtValTot">
                        Valor a Contratar:
                    </label>

                    <input id='txtValTot' title="Especifique El Valor Total a Contratar." class="form-control input-sm currency" />
                </div>
                <div class="col-md-6">
                    <label>
                        Funcionario encargado:
                    </label>
                    <%--<select id="CboFun" class="form-control input-sm" disabled></select>--%>
                    <input id='txtFun' title="Funcionario Encargado" class="form-control input-sm"  disabled/>
                </div>
            </div>
            
            <br />
               <div class="panel panel-default" style="width:100%;">
               <div class="panel-heading">
               <h3 class="panel-title">Futuro Contratista</h3>
               </div>
              <div class="panel-body">
               <div class="form-group">
                    <div class="col-md-3">
                        <input id="TxtIdeCon" type="text" class="form-control " disabled  placeholder="Identificacion"/>
                    </div>
                   <div class="col-md-1">
                       <button type="button" id="btnBuscarFun" class="btn btn-primary">
                           <span class="glyphicon glyphicon-search"></span>
                           </button>
                    </div>
                    <div class="col-md-8">
                        <input id="TxtNomCon" type="text" class="form-control " disabled placeholder="Nombre Contratista"/>
                    </div>
                     
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
    <div id="secDetalle"></div>
    <script src="js/RegSolicitud.js" type="text/javascript"></script>

</asp:Content>
