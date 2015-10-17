<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteBS.Master" CodeBehind="gPAA.aspx.cs" Inherits="wfSircc.DatosBasicosG.PAA.gPAA" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="msgResult">
    </div>
    <div class="row">
            <%--<div class="col-lg-2">
                <div class="input-group">
                    <input type="text" class="form-control inputHab" id="txtNumero" value="" />
                    <div class="input-group-btn ">
                        <button type="button" id="BtnDwnAbrir" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                            <span class="icon-folder-open-alt"></span>                        
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-1"><label>Dependencia</label></div>
            <div class="col-lg-3">
                    <select class="form-control" id="cboFiltroDependencia"></select>
            </div>--%>
        <div class="col-md-6">
            <div class="btn-toolbar"> 
                    <button type="button" value="Nuevo" id="BtnDetalles" class="btn btn-info" title="Registrar Nueva Solicitud de Contratación.">
                        <span class="glyphicon glyphicon-search"></span>Detalles
                    </button>
                    <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-success" title="Registrar Nueva Solicitud de Contratación.">
                        <span class="glyphicon glyphicon-plus"></span>Nuevo
                    </button>
                    <button type="button" value="Editar" id="BtnEditar" class="btn btn-primary" title="Editar Solicitud Actual">
                        <span class="glyphicon glyphicon-pencil"></span>Editar
                    </button>                   
                    <button type="button" value="Nuevo" id="BtnEliminar" class="btn btn-danger detalle">
                        <span class="glyphicon glyphicon-minus"></span>Eliminar
                    </button>   
                    <button type="button" class="btn btn-sm btn-success" id="btnVolverAtras">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        Atrás</button>            
            </div>
        </div>
    </div>
    <style>
        .Separar {
            margin:5px
        }
    </style>
    <div class="row">
        <div class="col-lg-12">
            <div class="panel-group Separar" id="accordion">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseProc">+ <b>PLAN ANUAL DE ADQUISICIÓN</b> <span class="Nproc"></span>
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

    <div id="jqxgridSol">
    </div>

    <div id="secDetalle"></div>

    <script src="js/gPAA.js"></script>
    
</asp:Content>
