<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="GesDetContratos.aspx.cs" Inherits="wfSircc.ContratosGestion.GesDetContratos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="col-md-12">
        <div class="row">
            &nbsp
        </div>
        <fieldset id="fsDatos">
            <legend>Información del Contrato</legend>

            <div class="row">
                <div class="col-md-3">
                    <label for="txtCodCon">
                        Número:
                    </label>
                    <input id='txtCodCon' class="form-control input-sm" />
                </div>
                <div class="col-md-3">
                    <label for="TxtDepSol">
                        Dependencia Solicitante:</label>
                    <input id='TxtDepSol' class="form-control input-sm" />
                </div>

                <div class="col-md-3">
                    <label for="txtValTot">
                        Valor a Contratar:
                    </label>
                    <div class="input-group">
                        <span class="input-group-addon">$</span>
                        <input id='txtValTot' title="Especifique El Valor Total a Contratar." class="form-control input-sm currency" />
                    </div>
                </div>
                <div class="col-md-3">
                    <label for="txtValTot">Estado:</label>
                    <input id='TxtEstado' class="form-control input-sm" />

                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <label>
                        Objeto a Contratar</label>
                    <textarea id="txtObjCon" class="form-control input-sm" rows="3" placeholder="Digite Objeto a Contratar"></textarea>
                </div>
            </div>
        </fieldset>

        <hr />
        <ul class="nav navbar-nav navbar-right">
            <li>
                <div class="navbar-form navbar-right">
                    
                     
                    <div class="form-group">
                        <select id="CboActaSig" class="form-control">
                        </select>
                    </div>
                    <div class="form-group">
                       <select id="CboPlantilla" class="form-control">
                       </select>
                    </div>
                    <button type="button" value="Nuevo" id="BtnNuevo" class="btn btn-default" title="Registrar Nuevo Acta.">
                        <span class="glyphicon glyphicon-plus"></span>Nuevo
                    </button>
                    <button type="button" value="Editar" id="BtnEditar" class="btn btn-default" title="Editar Acta">
                        <span class="glyphicon glyphicon-pencil"></span>Editar
                    </button>
                    <button type="button" value="Editar" id="BtnImprimir" class="btn btn-default" title="Imprimir Acta">
                        <span class="glyphicon glyphicon-print"></span>Imprimir
                    </button>
                </div>
            </li>

        </ul>

        <div class="row">
            &nbsp
        </div>

        <div id="jqxgridSol">
        </div>
    </div>
    <script src="js/GesDetContratos.js"></script>
</asp:Content>
