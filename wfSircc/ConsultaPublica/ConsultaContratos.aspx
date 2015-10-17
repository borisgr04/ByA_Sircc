﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ConsultaContratos.aspx.cs" Inherits="wfSircc.ConsultaPublica.ConsultaContratos" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="description" content="3 styles with inline editable feature" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="Content/bootstrap/bootstrap.css" rel="stylesheet" />
		<link href="/Content/aceadmin/css/bootstrap.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="/Content/aceadmin/css/font-awesome.min.css" />
		<link rel="stylesheet" href="/Content/aceadmin/css/jquery-ui-1.10.3.custom.min.css" />
		<link rel="stylesheet" href="/Content/aceadmin/css/jquery.gritter.css" />
		<link rel="stylesheet" href="/Content/aceadmin/css/select2.css" />
		<link rel="stylesheet" href="/Content/aceadmin/css/bootstrap-editable.css" />
		<link rel="stylesheet" href="/Content/aceadmin/css/ace-fonts.css" />
		<link rel="stylesheet" href="/Content/aceadmin/css/ace.min.css" />
		<link rel="stylesheet" href="/Content/aceadmin/css/ace-rtl.min.css" />
		<link rel="stylesheet" href="/Content/aceadmin/css/ace-skins.min.css" />
        <script src="/Scripts/jquery-1.9.1.js"></script>
        <script type="text/javascript" src="/jqscripts/jquery_ext.js"> </script>
        <script type="text/javascript" src="/jqscripts/bya_page.js"></script>
        <script src="/jqscripts/byaSite.js" type="text/javascript"></script>        
		<script src="/Content/aceadmin/js/ace-extra.min.js"></script>
        <link href="jqscripts/loader.css" rel="stylesheet" />
        <script src="/jqscripts/jquery.battatech.excelexport.js"></script>
        <script type="text/javascript" src="ConsultaContratos.js"></script>
        <title>Consulta contratos</title>
</head>
<body>
    <div class="row">
        <div class="col-xs-1"></div>
        <div class="col-xs-10">
            <img src="BanerGob.jpg" style="width:100%" />
        </div>
        <div class="col-xs-1"></div>
    </div>    
    <div class="row">
        <div class="col-lg-12 text-center">
            <h3>Archivos de contratos</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-1"></div>
        <div class="col-xs-10">
            <h4>Opciones de Búsqueda</h4>
            <div class="form-group row">
                <div class="col-lg-3">
                    <input type="checkbox" id="chkVigencia"/>
                    <label>Vigencia</label>
                    <input type="text" class="form-control input-sm snumero" id="txtVigencia"/>
                </div>
                <div class="col-lg-3">   
                    <input type="checkbox" id="chkNumeroContrato"/>
                    <label>Nro. Contrato</label>
                    <input type="text" class="form-control input-sm" id="txtNumeroContrato"/>                        
                </div>
                <div class="col-lg-3">
                    <input type="checkbox" id="chkCedulaNitContratista"/>
                    <label>Cedula/Nit Contratista</label>
                    <input type="text" class="form-control input-sm snumero" id="txtCedulaNitContratista"/>
                </div>
                <div class="col-lg-3">
                    <input type="checkbox" id="chkNombreContratista"/>
                    <label>Nombre Contratista</label>
                    <input type="text" class="form-control input-sm" id="txtNombreContratista"/>
                </div>
            </div>
            <div class="form-group row">                
                <div class="col-lg-3">
                    <input type="checkbox" id="chkTipoContrato"/>
                    <label>Tipo Contrato</label>
                    <select class="form-control input-sm" id="cboTipoContrato"></select>
                </div>
                <div class="col-lg-3">
                    <input type="checkbox" id="chkDependenciaNecesidad"/>
                    <label>Depenencia que genera la nececidad</label>
                    <select class="form-control input-sm" id="cboDependenciaNecesidad"></select> 
                </div> 
                <div class="col-lg-6">
                    <input type="checkbox" id="chkObjeto"/>
                    <label>Objeto</label>              
                    <textarea class="form-control input-sm" rows="1" id="txtObjeto"></textarea>    
                </div>
            </div>
        </div>
        <div class="col-xs-1"></div>
    </div>
    <div class="row text-center">
        <button type="button" id="BtnConsulta" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-search"></span>Consultar</button>
    </div>
    <div class="form-group row" style="margin-top:10px; display:none;" id="dvdRespuestaConsulta">
        <div class="col-xs-1"></div>
        <div class="col-xs-10">
            <div class="form-group row text-right" style="margin-right:7px;">
                <button type="button" class="btn btn-info btn-sm" id="btnExportar">
                    <span class="glyphicon glyphicon-save"></span> Exportar
                </button>
            </div>
            <div style="overflow:auto; width:100%; height:450px">
                <table class="table table-bordered table-hover table-striped tablesorter" id="tblConsulta">
                    <thead>
                        <tr>
                            <th>Vigencia <i class="fa fa-sort"></i></th>
                            <th>Cod. Contrato <i class="fa fa-sort"></i></th>
                            <th>Objeto <i class="fa fa-sort"></i></th>
                            <th>Id. Contratista <i class="fa fa-sort"></i></th>
                            <th>Contratista <i class="fa fa-sort"></i></th>                            
                            <th>Estado <i class="fa fa-sort"></i></th>
                            <th>Tipo <i class="fa fa-sort"></i></th>
                            <th>Subtipo <i class="fa fa-sort"></i></th>
                            <th>Valor <i class="fa fa-sort"></i></th>
                            <th>Supervisor <i class="fa fa-sort"></i></th>
                            <th>Dependencia <i class="fa fa-sort"></i></th>
                            <th>Fecha Suscripcion <i class="fa fa-sort"></i></th>
                            <th>Fecha Inicial <i class="fa fa-sort"></i></th>
                            <th>Fecha Final <i class="fa fa-sort"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-xs-1"></div>
    </div>
    <div class="row">
        <div class="col-xs-1"></div>
        <div class="col-xs-10 text-center">
            <hr style="border-color:#5b5a5a"/>
            <label>SIRCC ® Sistema de Información de Radicación y Control de Contratos</label>
        </div>
        <div class="col-xs-1"></div>
    </div>    
</body>
</html>
