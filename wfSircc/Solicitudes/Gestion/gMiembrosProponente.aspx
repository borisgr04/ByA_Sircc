<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="gMiembrosProponente.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.gMiembrosProponente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="msgResult">
    </div>
    <style>
        .Separar {
            margin:5px
        }
    </style>
    <div class="row">
        <div class="col-md-6">
            <div class="btn-toolbar"> 
                    <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-success" title="Registrar Nueva Solicitud de Contratación.">
                        <span class="glyphicon glyphicon-plus"></span>Nuevo
                    </button>
                    <button type="button" value="Editar" id="BtnEditar" class="btn btn-primary" title="Editar Solicitud Actual">
                        <span class="glyphicon glyphicon-pencil"></span>Editar
                    </button>   
                    <button type="button" value="Editar" id="btnEliminarMiembros" class="btn btn-danger" title="Editar Solicitud Actual">
                        <span class="glyphicon glyphicon-minus"></span>Eliminar
                    </button>  
                <button type="button" class="btn btn-sm btn-success" id="btnVolverAtras">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        Atrás</button>                
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="panel-group Separar" id="accordion">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseProc">+ <b>PROPONENTE:</b> <span class="Nproc"></span>
                                </a>
                            </div>
                            <div id="collapseProc" class="panel-collapse collapse out">
                                <div class="panel-body">
                                    <div class="container">
                                        <div class="row">
                                            <div id="dvdProc" ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
    <div class="row"><br /></div>
    <div id="jqxgridMiembrosProponentes">
    </div>
    <script src="js/gMiembrosProponente.js"></script>
</asp:Content>