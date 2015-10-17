<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Terceros.aspx.cs" Inherits="wfSircc.DatosBasicosG.Terceros.Terceros" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
        <div class="row">
                <div class="col-md-12">
                    <div class="col-md-3">
                        <div class="input-group">
                            <input type="text" class="form-control" id="txtNumero" />
                            <div class="input-xs input-group-btn ">
                                <button type="button" id="BtnDwnAbrir" class=" btn btn-sm btn-info dropdown-toggle" data-toggle="dropdown">
                                    <span class="icon-folder-open-alt"></span>
                                    Abrir 
                                </button>
                            </div>
                            <!-- /btn-group -->
                        </div>
                        <!-- /input-group -->
                    </div>
                    <!-- /.col-lg-9 -->
                    <div class="col-lg-9">
                        <div class="btn-toolbar">
                            <button type="button" class="btn btn-sm btn-warning" id="nuevoButton">
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Nuevo</button>
                            <button type="button" class="btn btn-sm btn-primary" id="editarButton" disabled="disabled">
                                <span class="glyphicon glyphicon-pencil"></span>
                                Editar</button>
                            <button type="button" class="btn btn-sm btn-success" id="guardarButton" disabled="disabled">
                                <span class="glyphicon glyphicon-floppy-saved"></span>
                                Guardar</button>
                            <button type="button" class="btn btn-sm btn-danger" id="cancelarButton">
                                <span class="glyphicon glyphicon-remove"></span>
                                Cancelar</button>
                            <%--<button type="button" class="btn btn-sm btn-danger" id="btnPrueba">
                                <span class="glyphicon glyphicon-remove"></span>
                                Prueba</button>--%>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
            </div>
     <br /> <br />
        <div class="form-horizontal">
                <div class="row">
                 <div class="form-group">
                        <label for='CboClasf' class="col-sm-3 control-label">Tipo de persona </label>
                        <div class="col-sm-3">
                         <select id="CboClasf" class="form-control">
                         </select>
                        </div>
                      </div>                 
                    
               <div class="form-group">
                        <label for="CboTipNro" class="col-sm-3 control-label">Tipo  Identificación</label>
                        <div class="col-sm-3">
                            <select id="CboTipNro" class="form-control"></select>
                         </div>
                       </div>
                   
               <div class="form-group">
                        <label for='txtNroDoc' class="col-sm-3 control-label">N° Identificación</label>
                         <div class="col-xs-3">
                           <input id='txtNroDoc' type="text" placeholder="No de documento" class="form-control" autocomplete="off"/>
                         </div>
                        <div class="col-xs-1">
                         <label for='txtNroDoc' class="control-label">-</label>
                        </div>
                        <div class="col-xs-1">
                         <input id='TxtDV' type="text" placeholder="DV" class="form-control"/>
                        </div>
                </div>
               <div class="form-group">
                        <label for='txtLugExp' class="col-sm-3 control-label">Lugar de Expedición </label>
                        <div class="col-sm-3">
                           <input id='txtLugExp' type="text" class="form-control" autocomplete="off"/>
                        </div>
                       </div>
               <div class="form-group">
                        <label for='txtPrimApe' class="col-sm-3 control-label">Primer Apellido </label>
                        <div class="col-sm-4">
                            <input id='txtPrimApe' type="text" class="form-control" autocomplete="off"/>
                        </div>
                        </div>
               <div class="form-group">
                        <label for='txtSegApe' class="col-sm-3 control-label">Segundo Apellido </label>
                        <div class="col-sm-4">
                          <input id='txtSegApe' type="text" class="form-control" autocomplete="off"/>
                        </div>
                       </div>
               <div class="form-group">
                        <label for='txtPrimNom' class="col-sm-3 control-label">Primer Nombre </label>
                        <div class="col-sm-4">
                          <input id='txtPrimNom' type="text" class="form-control" autocomplete="off"/>
                        </div>
                        </div>
               <div class="form-group">
                        <label for='txtSegNom' class="col-sm-3 control-label">Segundo Nombre </label>
                          <div class="col-sm-4">
                            <input id='txtSegNom' type="text" class="form-control" autocomplete="off"/>
                          </div>
                        </div>
               <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right" for="txtFecNac">Fecha de nacimiento</label>
                        <div class="col-sm-3">
                            <div class="input-medium">
                                <input type="date" id="txtFecNac" class="form-control" />
                            </div>
                         </div>
                        </div>
                      
                    
               <div class="form-group">
                        <label for='txtRazSoc' class="col-sm-3 control-label">Razón Social </label>
                        <div class="col-sm-4">
                            <input id='txtRazSoc' type="text" class="form-control" autocomplete="off"/>
                        </div>
                    </div>
               
               <div class="form-group">
                        <label for='txtDir' class="col-sm-3 control-label">Dirección </label>
                        <div class="col-sm-3">
                            <input id='txtDir' type="text" class="form-control" autocomplete="off"/>
                        </div>
                    </div>
                    <div class="form-group">
                       <label for='txtTel' class="col-sm-3 control-label no-padding-right">Telefono </label>
                        <div class="col-sm-9">
                           <span class="input-icon input-icon-right">
                              <input id='txtTel' type="text" class="form-control" />
                               <i class="icon-phone"></i>
                            </span>
                        </div>
                    </div>
               <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right" for="txtEma">Email</label>
                         <div class="col-sm-9">
                            <span class="input-icon input-icon-right">
                                <input type="email" id="txtEma" class="form-control" placeholder="alguien@gmail.com" />
                                <i class="icon-envelope"></i>
                            </span>
                        </div>
                    </div>
               
                    <div class="form-group">
                       <label for='txtcargo' class="col-sm-3 control-label">Cargo </label>
                        <div class="col-sm-3">
                         <input id='txtcargo' type="text" class="form-control" autocomplete="off"/>
                      </div>
                    </div>  
               <div class="form-group">
                      <label for='CboDepNec' class="col-sm-3 control-label">Dependencia </label>
                        <div class="col-sm-3">
                           <select id="CboDepNec" class="form-control"></select>
                        </div>
                    </div>
                  
               <div class="form-group">
                  <label for='CboEst' class="col-sm-3 control-label">Estado </label>
                     <div class="col-sm-3">
                         <select id="cbotEst" class="form-control"></select>
                        </div>
                     </div>
               <div class="form-group">
                        <label for='CboTpTer' class="col-sm-3 control-label">Tipo de Tercero </label>
                        <div class="col-sm-3">
                          <select id="CboTpTer" class="form-control"></select>
                        </div>
                     </div>
               
                     
              
           
               </div>
            <div id="secBsqTerceros"></div>
            </div>    
    
    <script src="js/Terceros.js" type="text/javascript"></script>
</asp:Content>
