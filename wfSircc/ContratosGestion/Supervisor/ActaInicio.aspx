<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ActaInicio.aspx.cs" Inherits="wfSircc.ContratosGestion.Supervisor.ActaInicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
        <div class="row">
            <div class="col-md-12">
                    <div class="btn-toolbar">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default" id="guardarButton">
                                <span class="glyphicon glyphicon-floppy-saved"></span>
                                Guardar</button>
                            <button type="button" class="btn btn-default" id="cancelarButton">
                                <span class="glyphicon glyphicon-remove"></span>
                                Cancelar</button>
                        </div>
                        <div class="btn-group">
                            <button type="button" class="btn btn-default" id="imprimirButton">
                                <span class="glyphicon glyphicon-print"></span>
                                Imprimir</button>
                        </div>
                        <div class="btn-group">
                            <a class="btn btn-default" href="javascript:history.back(1)" title="Volver Atrás">
                                <span class="glyphicon glyphicon-arrow-left"></span>
                                &nbsp Atrás</a>
                        </div>
                    </div>
            </div>
            <!-- /.row -->
        </div>
    <div class="row">
        &nbsp
    </div>
    <div class="row">
        <div class="col-md-4">
                <label for="cboApartir">
                    Inicio a partir de 
                </label>
                <select id="cboApartir" class="form-control"> 
                    <option>Pago del Anticipo</option>
                    <option>Aprobación de la Póliza</option>
                    <option>Acta de Inicio</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="txtFecIni">
                    Fecha del Acta Inicio:
                </label>
                <input id='txtFecAct' type="date" class="form-control input-sm" />
            </div>
            <div class="col-md-4">
                <label for="txtFecFin">
                    Fecha Estimada de Finalización:
                </label>
                <input id='txtFecFin' type="date" class="form-control input-sm" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <label for="txtObjCon">
                    Observaciones:
                </label>
                <textarea id="txtObjCon" class="form-control input-sm" rows="3" placeholder="Observaciones del Acta de Inicio"></textarea>
            </div>
        </div>
    <script src="js/ActaInicio.js"></script>
</asp:Content>
