<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="admActividades.aspx.cs" Inherits="wfSircc.Solicitudes.DatosBasicos.Actividades.admActividades" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container"> 
    <div class="row">
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-9">
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
                    </div>
                </div>    
               
            </div>           
        </div>

        <div class="col-md-12">  
            <div class="col-md-12"> 
                 &nbsp
             </div>         
            <div class="row">
                <div class="col-md-6">
                    <label for="txtVig">
                        Vigencia:
                    </label>
                    <select id='CboVig' title="Número de Solicitud." class="form-control input-sm"></select>
                </div>
                <div class="col-md-6">
                    <label for="CboModal">
                        Modalidad:
                    </label>
                      <select id="CboModal" class="form-control input-sm"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>
                        Codigo:</label>
                    <input id="txtCod" type="text" class="form-control input-sm date"/>
                </div>    
                  <div class="col-md-6">
                    <label>
                        Nombre:</label>
                    <textarea id="txtNom"  class="form-control input-sm date" ></textarea>
                </div>           
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>
                       Estado del Proceso:</label>
                    <select id="CboEst" class="form-control input-sm"></select>
                </div>   
                <div class="col-md-6">
                    <label>
                        Lugar y Caracteristica(predeterminado):</label>
                    <textarea id="txtUbicacion" class="form-control input-sm"></textarea>
                </div>
            </div>               
            <div class="row">
                 <div class="col-md-6">
                    <label for="txtOrd">
                       Orden:
                    </label>
                    <input id="txtOrd" class="form-control input-sm"/>
                </div>            
                <div class="col-md-6">
                    <label for="CboOcu">
                        Ocupado:</label>
                    <select id="CboOcu" class="form-control input-sm">
                        <option value="1">Si</option>
                        <option value="0">No</option>
  
                    </select>
                </div>
                
            </div>
            <div class="row">
                <div class="col-md-3">
                    <label for="CboEsta">
                        Estado:</label>
                    <select id="CboEsta" class="form-control input-sm">
                        <option value="AC">Activo</option>
                        <option value="IN">Inactivo</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="CboObl">
                      Obligatorio:
                    </label>
                     <select id="CboObl" class="form-control input-sm">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                     </select>
                </div>
                <div class="col-md-3">
                    <label>
                        Dia No Habil:
                    </label>                   
                    <select id="CboDia" class="form-control input-sm">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                    </select>
                </div>
                  <div class="col-md-3">
                    <label>
                        Notificar:
                    </label>                   
                    <select id="CboNot" class="form-control input-sm">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <label >
                        Mostrar Fecha Inicial:</label>
                    <select id="CboIni" class="form-control input-sm">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="CboObl">
                      Mostrar Hora Inicial:
                    </label>
                     <select id="CboHini" class="form-control input-sm">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                     </select>
                </div>
                <div class="col-md-3">
                    <label>
                        Mostrar Fecha Final:
                    </label>                   
                    <select id="CboFinal" class="form-control input-sm">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                    </select>
                </div>
                  <div class="col-md-3">
                    <label>
                        Mostrar Hora Final:
                    </label>                   
                    <select id="CboHfinal" class="form-control input-sm">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </div>
           
            
        </div>
    </div>
</div>
    <script src="js/admActividades.js"></script>
    
    
</asp:Content>
