<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ActaInicioObra.aspx.cs" Inherits="wfSircc.ContratosGestion.ActaInicioObra" %>
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
                            <button type="button" class="btn btn-default" id="Button1">
                                <span class="glyphicon glyphicon-print"></span>
                                Imprimir</button>
                        </div>
                        <div class="btn-group">
                            <a class="btn btn-default" href="javascript:history.back(1)" title="Volver Atrás">
                                <span class="glyphicon glyphicon-arrow-left"></span>
                                &nbsp Atrás</a>
                        </div>
                    </div>

                VER DATOS DEL CONTRATO <br />
                VER FECHA DE POLIZA<br />
                VER FECHA DE RP<br />
                VER FECHA DE PAGO DE IMPUESTOS<br />
                RECIBIO POR CONCEPTO DE ANTICIPO Y PLAN DE INVERSION DE ANTICIPO<br />
                CONDICIONES DE LA OBRA<br />
                PERSONAL DE OBRA<br />
                DOCUMENTOS ENTREGADOS AL CONTRATISTA    <br />
                ITEM DE OBSERVACIONES .. PREDEFINIDAS <br />
                INICIO DEL CONTRATO SUPEDITADO AL PAGO DEL ANTICIPO
                CUANDO INICIA:

                FECHA DE APROBACION DE LA POLIZA(FECHA DE LEGALIZACION)
                PAGO DEL ANTICIPO
                ACTA DE INICIO 

                ANEXAS LOS TRABAJADORES


            </div>
            <!-- /.row -->
        </div>
    <div class="row">
        &nbsp
    </div>
    <div class="row">
            <div class="col-md-6">
                <label for="txtCodCon">
                    Fecha de Suscripción Inicio:
                </label>
                <input id='txtFecIni' type="date" class="form-control input-sm" />
            </div>
            <div class="col-md-6">
                <label for="txtCodCon">
                    Fecha Estimada de Finalización:
                </label>
                <input id='txtFecFin' type="date" class="form-control input-sm" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <label for="txtValTot">
                    Observaciones:
                </label>
                <textarea id="txtObjCon" class="form-control input-sm" rows="3" placeholder="Digite Objeto a Contratar"></textarea>
            </div>
        </div>
</asp:Content>
