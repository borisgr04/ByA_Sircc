<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesProyectos.aspx.cs" Inherits="wfSircc.EstPrev.Proyectos.GesProyectos" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div class="row">
            <div class="col-md-12">               
                <div class="col-md-6">
                        <div class="btn-toolbar">
                        <button type="button" class="btn btn-warning" id="nuevoButton">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Nuevo</button>                          
                        <button type="button" class="btn btn-primary" id="editarButton">
                            <span class="glyphicon glyphicon-pencil"></span>
                            Editar</button>   
                            <button type="button" class="btn btn-danger" id="anularButton">
                            <span class="glyphicon glyphicon-remove"></span>
                            Anular</button>                 
                        
                    </div>
                </div>    
               
            </div>           
        </div>
       <br />
    <br />
         <div class="form-horizontal" role="form" id="formDATOS">
         <ul class="nav nav-tabs">
            <li class="active"><a href="#tabGesProyectos" data-toggle="tab">1.Listado de Proyectos</a></li>
          
        </ul>
         <div   class="tab-content">
             <div id="tabGesProyectos" class="tab-pane in active ">
             <div class="form-group">
                 <div class="col-md-12">  
                             &nbsp                            
                      </div>    
           <div class="col-md-12"> 
                      <div id="jqxgridHisto"></div> 
                      </div>
            </div>
                 </div>
           

          </div>
            
       </div>
     
     <script src="js/GesProyectos.js"></script>
</asp:Content>
