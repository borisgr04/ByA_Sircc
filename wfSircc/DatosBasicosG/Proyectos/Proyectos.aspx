<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Proyectos.aspx.cs" Inherits="wfSircc.EstPrev.Proyectos.Proyectos" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/Content/kendoui_css/kendo.common.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.default.min.css" rel="stylesheet" />
    <link href="/Content/kendoui_css/kendo.rtl.min.css" rel="stylesheet" />
    <link href="../docEP.css" rel="stylesheet" />
       <div class="row">
            <div class="col-md-12">
               
                <div class="col-md-6">
                        <div class="btn-toolbar">
                        <button type="button" class="btn btn-warning" id="nuevoButton">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Nuevo</button>
                             <button type="button" class="btn btn-success" id="guardarButton">
                            <span class="glyphicon glyphicon-floppy-saved"></span>
                            Guardar</button>                                
                        <button type="button" class="btn btn-danger" id="cancelarButton">
                            <span class="glyphicon glyphicon-remove"></span>
                            Cancelar</button>   
                        <button type="button" class="btn btn-sm btn-success" id="btnVolverAtras">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                            Atrás</button>              
                    </div>
                </div>    
               
            </div>           
        </div>

        <br />
    <br />
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
     <div class="form-horizontal" role="form" id="formDATOS">
         <ul class="nav nav-tabs">
            <li class="active"><a href="#tabProyectos" data-toggle="tab">1.Registro Proyectos</a></li>
          
        </ul>
         <div   class="tab-content">
             <div id="tabProyectos" class="tab-pane in active ">
              <div class="col-md-12"> 
                 &nbsp
             </div>         
              <div class="form-group">
                    <label for="TextProyecto" class="col-sm-2 control-label">
                        N° Proyecto: 
                    </label>
                    <div class="col-md-3">
                        <input id="TextProyecto" type="text" class="form-control input-sm inputHab" />
                    </div>          
                </div>
                 <div class="form-group">
                    <label for="txtBPIN" class="col-sm-2 control-label">
                        BPIN: 
                    </label>
                    <div class="col-md-3">
                        <input id="txtBPIN" type="text" class="form-control input-sm inputHab" />
                    </div>          
                </div>
              <div class="form-group">
                    <label for="TextVigencia" class="col-sm-2 control-label">
                        Vigencia: 
                    </label>
                    <div class="col-md-3">
                        <input id="TextVigencia" type="text" class="form-control input-sm inputHab" />
                    </div>          
                </div>
              <div class="form-group">
                    <label for="TextNom" class="col-sm-2 control-label">
                        Nombre: 
                    </label>
                    <div class="col-md-6">
                        <textarea id="TextNom" rows="2"  class="form-control input-sm inputHab" ></textarea>
                    </div>          
                </div>
                  <div class="form-group">
                    <label for="TextFecRad" class="col-sm-2 control-label">
                      Fecha de Creación: 
                    </label>
                      <div class="col-md-3">                       
                            <div class="input-medium">
                                <div class="input-group">
                                    <input class="input-medium date-picker" id="TextFecRad" type="text" data-date-format="dd-mm-yyyy" placeholder="mm-dd-yyyy" />
                                    <span class="input-group-addon">
                                        <i class="icon-calendar"></i>
                                    </span>
                                </div>
                            </div>
                         </div>               
                </div>     
                  <div class="form-group">
                    <label for="TextComite" class="col-sm-2 control-label">
                        Comite: 
                    </label>
                    <div class="col-md-3">
                        <input id="TextComite" type="text" class="form-control input-sm inputHab" />
                    </div>          
                </div>
                  <div class="form-group">
                    <label for="TextEstado" class="col-sm-2 control-label">
                        Estado: 
                    </label>
                    <div class="col-md-3">
                        <select class="form-control input-sm inputHab" id="TextEstado">
                            <option value="EN EJECUCIÓN">EN EJECUCIÓN</option>
                            <option value="PRIORIZADO SIN RECURSOS">PRIORIZADO SIN RECURSOS</option>
                            <option value="RADICADO">RADICADO</option>
                            <option value="REMITIDO A SECTORIAL">REMITIDO A SECTORIAL</option>
                            <option value="CONTRATADO">CONTRATADO</option>
                            <option value="DEVUELTO">DEVUELTO</option>
                            <option value="EJECUTADO">EJECUTADO</option>
                            <option value="PRECONTRACTUAL">PRECONTRACTUAL</option>
                            <option value="VIABILIZADO SECTORIAL">VIABILIZADO SECTORIAL</option>
                            <option value="REFORMULADO">REFORMULADO</option>
                            <option value="LICITACION ADJUDICADA">LICITACION ADJUDICADA</option>
                            <option value="LIQUIDADO">LIQUIDADO</option>
                            <option value="PRIORIZADO">PRIORIZADO</option>
                            <option value="EN LICITACION">EN LICITACION</option>
                            <option value="ANULADO">ANULADO</option>
                        </select>
                    </div>          
                </div>
                  <div class="form-group">
                    <label for="TextValor" class="col-sm-2 control-label">
                        Valor: 
                    </label>
                    <div class="col-md-3">
                        <input id="TextValor" type="text" class="form-control input-sm inputHab currency text-right snumero" />
                    </div>          
                </div>
                <div class="form-group">
                    <label for="txtAportesPropios" class="col-sm-2 control-label">
                        Aportes propios: 
                    </label>
                    <div class="col-md-3">
                        <input id="txtAportesPropios" type="text" class="form-control input-sm inputHab currency text-right snumero" />
                    </div>          
                </div>
                 <div class="form-group">
                    <label for="txtNombreMunicipio" class="col-sm-2 control-label">
                        Nombre Municipio: 
                    </label>
                    <div class="col-md-3">
                        <input id="txtNombreMunicipio" type="text" class="form-control input-sm inputHab" />
                    </div>          
                </div>
                <div class="form-group">
                    <label for="txtNombreDepartamento" class="col-sm-2 control-label">
                        Nombre Departamento: 
                    </label>
                    <div class="col-md-3">
                        <input id="txtNombreDepartamento" type="text" class="form-control input-sm inputHab" />
                    </div>          
                </div>
                 <div class="form-group">
                    <label for="txtTipoProyecto" class="col-sm-2 control-label">
                        Tipo de Proyecto: 
                    </label>
                    <div class="col-md-3">
                        <select class="form-control input-sm inputHab" id="txtTipoProyecto">
                            <option value="RP">Recursos Propios</option>
                            <option value="SGR">Sistema General de Regalias</option>
                        </select>
                    </div>          
                </div>
                <div class="form-group">
                    <label for="txtIdAportante" class="col-sm-2 control-label">
                        Id del Aportante: 
                    </label>
                    <div class="col-md-3">
                        <div class="input-group">
                            <input id="txtIdAportante" class="form-control input-sm" disabled="disabled" />
                            <div class="input-group-btn ">
                                <button type="button" id="btnBsqMiembro" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                    <span class="icon-search"></span>  
                                </button>                   
                            </div>
                        </div>
                    </div> 
                    <div class="col-lg-4">
                        <input id="txtNombreAportante" class="form-control input-sm" disabled="disabled" />
                    </div>         
                </div>
                 <div class="form-group">
                    <label for="txtNecesidad" class="col-sm-2 control-label">
                        Necesidad: 
                    </label>
                    <div class="col-md-6">
                        <div id="txtNecesidad" class="editorHtml inputHab" style="width:90%;  border-style: double; border-width: 1px;" contenteditable="true">&nbsp</div>
                        <%--<textarea id="txtNecesidad" rows="2"  class="form-control input-sm inputHab"  ></textarea>--%>
                    </div>          
                </div>
                
            </div>
           

          </div>
            
       </div>
    <div id="secBsqTerceros"></div> 
    <script src="/jqscripts/kendoui/kendo.web.min.js"></script>
    <script src="js/Proyectos.js"></script>    
</asp:Content>
