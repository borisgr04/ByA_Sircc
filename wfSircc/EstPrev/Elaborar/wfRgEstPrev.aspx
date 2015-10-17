<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfRgEstPrev.aspx.cs" Inherits="Sircc4.EstPrev.wfRgEstPrev"
    EnableEventValidation="false" %>
<!DOCTYPE >
<html lang="es-co">
<head runat="server">
    <title>SIRCC - ESTUDIOS PREVIOS</title>
    <link rel="stylesheet" type="text/css" href="/Content/EstiloFormulario.css" />
    <link rel="stylesheet" href="/jqwidgets/styles/jqx.base.css" type="text/css" />

    <link href="/Content/bootstrap/bootstrap.min.css" rel="stylesheet" />

    <script type="text/javascript" src="/jqscripts/jquery-1.10.1.min.js"></script>
    <script type="text/javascript" src="/jqwidgets/jqx-all.js"></script>
    <script type="text/javascript" src="/jqscripts/bya_Page.js"></script>
    <script type="text/javascript" src="/jqscripts/gettheme.js"></script>
    <script type="text/javascript" src="/jqwidgets/globalization/globalize.js"></script>
    <script type="text/javascript" src="/jqwidgets/globalization/globalize.culture.es-CO.js"></script>
    <script type="text/javascript" src="/jqscripts/jquery_ext.js"></script>
    <script type="text/javascript" src="/jqscripts/byaSite.js"></script>

    <%--    <link href="/Content/Bootstrap_Personalize/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/Content/Bootstrap_Personalize/css/ace.min.css" rel="stylesheet" />
    <link href="/Content/Bootstrap_Personalize/css/ace-skins.min.css" rel="stylesheet" />
    <link href="/Content/Bootstrap_Personalize/css/font-awesome.min.css" rel="stylesheet" />
    <link href="/Content/Bootstrap_Personalize/css/ace-rtl.min.css" rel="stylesheet" />
    <link href="/Content/Bootstrap_Personalize/Font/css.css" rel="stylesheet" />--%>
    <style>
        /*textarea
        {
            padding: 10px;
            width: 97%;
            min-height: 300px;
        }*/

        .sectionButtonsWrapper
        {
            float: right;
            margin-top: 30px;
            margin-right: 10px;
            width: 115px;
        }

        .backButton
        {
            float: left;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">SIRCC &reg - Estudios Previos</h3>
        </div>
    </div>
<div class="panel-body">

    <div class="row">
                <div class="col-md-12" id="dvdEla">
                    <div class="col-md-3">
                        <div class="input-group">
                            <input type="text" class="form-control" id="txtNumero" />
                            <div class="input-group-btn ">
                                <button type="button" id="BtnDwnAbrir" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                    <span class="icon-folder-open-alt"></span>
                                    &nbsp <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu pull-right">
                                    <li><a href="#" id="BtnAbrirdeEP">
                                        <span class="glyphicon glyphicon-folder-open"></span>
                                        &nbsp Abrir Estudio Previo</a></li>
                                    <li class="divider"></li>
                                    <li><a href="#" id="abrirButton">
                                        <span class="glyphicon glyphicon-plus-sign"></span>
                                        &nbsp Nuevo Apartir de Estudio Previo</a></li>
                                </ul>
                            </div>
                            <!-- /btn-group -->
                        </div>
                        <!-- /input-group -->
                    </div>
                    <!-- /.col-lg-9 -->
                    <div class="col-lg-9">
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

                            <button type="button" value="Nuevo" id="imprimirButton" class="btn btn-info">
                                <span class="glyphicon glyphicon-print"></span>&nbsp Imprimir
                            </button>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
            </div>


        <div id="main" style="padding: 30px">
            <form id="FrmEstPrev" runat="server">
                <asp:HiddenField ID="HdUser" ClientIDMode="Static" runat="server" />
                <asp:HiddenField ID="HdVig" ClientIDMode="Static" runat="server" />
                <div id="LbMsg">
                </div>
                <div id='jqxTabs'>
                    <ul>
                        <li>1. Datos Iniciales</li>
                        <li title="Descripción de la Necesidad">2. Necesidad </li>
                        <li title="Objeto a Contratar  y Descripción del Objeto a Contratar">3. Objeto </li>
                        <li title="Proyecto y Plan de Compras">4. Proy. /P.Compras</li>
                        <li title="Especificaciones Técnicas, Caracteristicas del Bien, Obra y/o Servicio">5.
                        Especificaciones </li>
                        <li title="Plazo de Ejecución y Lugar de Ejecución">6. Plazo y Lugar </li>
                        <li>7. Oblig. Ctatista </li>
                        <li>8. Oblig. Entidad </li>
                        <li>9. Fund. Juridicos</li>
                        <li>10. Presupuesto </li>
                        <li>11. Forma de Pago</li>
                        <li>12. Mod. de Selección</li>
                        <li>13. Capacidad Juridica</li>
                        <li title="Experiencia y Capacidad Residual">14. Exp. y C. Residual</li>
                        <li>15. Polizas </li>
                        <li>16. Municipio </li>
                    </ul>
                    <div class="section" id="content1">
                        <div class="container">
                            <div class="row">
                                &nbsp
                            </div>
                            <div class="row">

                                <div class="col-lg-4">
                                    <label for="CboEstEP">
                                        Estado:
                                    </label>

                                    <select id="CboEstEP" class="form-control input-sm"></select>
                                </div>
                                <div class="col-lg-4">
                                    <label>
                                        Vigencia:
                                    </label>

                                    <select id="CboVig" class="form-control input-sm"></select>
                                </div>

                                <div class="col-lg-4">
                                    <label for="TxtFecElab">
                                        Fecha de elaboración :</label>
                                    <input type="date" id="TxtFecElab" class="form-control input-sm">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4">
                                    <label for='TxtIdeFun'>
                                        Funcionario :</label>
                                    <div class="input-group">
                                        <input id="TxtIdeFun" type="text" class="form-control input-sm" />
                                        <span class="input-group-btn">

                                            <button type="button" value="Nuevo" id="btnBuscarC" class="btn btn-primary" title="Abrir Cuadro de Busqueda">
                                                <span class="glyphicon glyphicon-search"></span>
                                            </button>

                                        </span>
                                        <input id="TxtNomFun" type="text" class="form-control input-sm" disabled />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <label for="CboDepSol">
                                        Dependencia solicitante:</label>
                                    <select id="CboDepSol" class="form-control input-sm cbo"></select>
                                </div>
                                <div class="col-lg-4">
                                    <label for="CboCarDilJq">
                                        Cargo :</label>
                                    <select id="CboCarDilJq" class="form-control input-sm cbo"></select>
                                </div>

                            </div>
                            <div class="row">

                                <div class="col-lg-4">
                                    <label for="TxtIdeRes">
                                        Responsable
                                    </label>
                                    <div class="input-group">
                                        <input id="TxtIdeRes" type="text" class="form-control input-sm" />
                                        <span class="input-group-btn">
                                            <button type="button" value="Nuevo" id="btnBuscarR" class="btn btn-primary" title="Abrir Cuadro de Busqueda">
                                                <span class="glyphicon glyphicon-search"></span>
                                            </button>
                                        </span>
                                        <input id="TxtNomRes" type="text" class="form-control input-sm" disabled />
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <label>
                                        Cargo del Responsable
                                    </label>
                                    <select id="CboCarRes" class="form-control input-sm cbo"></select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <label for="TxtIdeApoTec">
                                        Apoyo Técnico
                                    </label>
                                    <div class="input-group">
                                        <input id="TxtIdeApoTec" type="text" class="form-control input-sm" />
                                        <span class="input-group-btn">

                                            <button type="button" value="Nuevo" id="btnBuscarApoTec" class="btn btn-primary" title="Abrir Cuadro de Busqueda">
                                                <span class="glyphicon glyphicon-search"></span>
                                            </button>
                                        </span>
                                        <input id="TxtNomApoTec" type="text" class="form-control input-sm" disabled />

                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <label for="CboCarApoTec">
                                        Cargo
                                    </label>
                                    <select id="CboCarApoTec" class="form-control input-sm cbo"></select>
                                </div>
                                <div class="col-lg-4">
                                    <label for="CboDepSu">
                                        Dependencia Supervisión
                                    </label>
                                    <select id="CboDepSup" class="form-control input-sm cbo"></select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <label for="CboCarSup">
                                        Cargo del Funcionario Supervisor</label>
                                    <select id="CboCarSup" class="form-control input-sm cbo"></select>
                                </div>
                                <div class="col-lg-4">
                                    <label for="CboDepDel">
                                        Dependencia Delegada:</label>
                                    <select id="CboDepDel" class="form-control input-sm cbo"></select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <label for="CboTip">
                                        Identificación del Contrato:</label>
                                    <select id="CboTip" class="form-control input-sm cbo"></select>


                                </div>
                                <div class="col-lg-4">
                                    <label for="CboSubTip">
                                        Subtipo</label>
                                    <select id="CboSubTip" class="form-control input-sm cbo"></select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <label>
                                        Valor a Contratar:
                                    </label>
                                    <input id='txtValTot' type="text" placeholder="Valor a Contratar" class="form-control input-sm" />

                                </div>

                                <div class="col-lg-4">
                                    <label for='txtValProp'>
                                        Aportes Entidad:
                                    </label>
                                    <input id='txtValProp' type="text" placeholder="Aportes Priopios" class="form-control input-sm" />
                                </div>
                                <div class="col-lg-4">
                                    <label for='txtValOtros'>
                                        Aportes Otros:
                                    </label>

                                    <input id='txtValOtros' type="text" placeholder="Aportes Otros" class="form-control input-sm" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <label for='TxtGrupos'>
                                        Cantidad de Grupos:
                                    </label>
                                    <input id='TxtGrupos' type="text" placeholder="N° Grupos" class="form-control input-sm" title="Especifique la cantidad de grupo del contrato, si no es por grupo deje el valor en 0." />
                                </div>
                                <div class="col-lg-4">
                                    <label for='TxtNEmpleos'>
                                        Nro Empleos Directos:
                                    </label>
                                    <input id='TxtNEmpleos' type="text" placeholder="N° de Empleos" class="form-control input-sm" title="Especifique la cantidad de empleos directos a generar en el Contrato." />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-10">
                                </div>
                                <div class="col-lg-2">
                                    <input type="button" value="Siguiente" class="nextButton" id="nextButton1" />
                                </div>


                            </div>

                        </div>


                    </div>
                    <div class="section" id="content2">
                        <div class="container">
                            <div class="row">
                                <label>
                                    Descripción de la necesidad</label>
                                <textarea id='TxtDesNec' placeholder="Descripción de la Necesidad" rows="10" class="form-control input-sm" title="Especifique la cantidad de empleos directos a generar en el Contrato."></textarea>
                            </div>
                        </div>
                        <div class="sectionButtonsWrapper">
                            <input type="button" value="Siguiente" class="nextButton" id="nextButton2" />
                        </div>
                    </div>
                    <div class="section" id="content3">
                        <div class="container">
                            <div class="row">
                                <label>
                                    Descripción del objeto a contratar:</label>
                                <textarea id='TxtDesObj' rows="10" class="form-control input-sm"></textarea>
                            </div>
                            <div class="row">
                                <label>
                                    Objeto a Contratar</label>
                                <textarea id='TxtObjCon' rows="10" class="form-control input-sm"></textarea>
                            </div>
                        </div>
                        <div class="sectionButtonsWrapper">
                            <input type="button" value="Siguiente" class="nextButton" id="nextButton3" />
                        </div>
                    </div>
                    <div class="section" id="content4">
                        Cargando Proyecto....
                    </div>
                    <div class="section" id="content5">
                        Cargando Especificaciones Técnicas....
                    </div>
                    <div class="section" id="content6">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <label>
                                        Plazo de ejecución del contrato:</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3">
                                    <input id='TxtPlazo1' type="text" placeholder="Plazo de ejecución" class="form-control input-sm" />
                                </div>
                                <div class="col-lg-3">
                                    <select id="CboTPlazo1" class="form-control input-sm cbo"></select>
                                </div>
                                <div class="col-lg-3">
                                    <input id='TxtPlazo2' type="text" placeholder="Plazo de ejecución" class="form-control input-sm" />
                                </div>
                                <div class="col-lg-3">
                                    <select id="CboTPlazo2" class="form-control input-sm cbo"></select>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <label>
                                        Lugar de ejecución del contrato:
                                    </label>
                                    <textarea id="TxtLugar" rows="3" class="form-control input-sm cbo"></textarea>

                                </div>

                            </div>

                            <div class="sectionButtonsWrapper">
                                <input type="button" value="Siguiente" class="nextButton" id="nextButton5" />
                            </div>
                        </div>
                        </div>
                <div class="section" id="content7">
                    Cargando Oblig....
                </div>
                <div class="section" id="content8">
                    Cargando Oblig....
                </div>
                <div class="section" id="content9">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3">
                            <label for='TxtPlazoLiq'>
                                Plazo de liquidación del contrato [ Mes(es)]
                            </label>
                            <input id='TxtPlazoLiq' type="text" placeholder="Plazo de Liquidación" class="form-control input-sm" />
                                </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                            <label>
                                Fundamentos Jurídicos de la modalidad de selección</label>
                            <textarea id="TxtFundJur" class="form-control input-sm"  rows="5"> </textarea>
                                </div>
                        </div>
                    </div>
                    <div class="sectionButtonsWrapper">
                        <input type="button" value="Siguiente" class="nextButton" id="nextButton6" />
                    </div>
                </div>
                <div class="section" id="content10">
                    <div class="sectionButtonsWrapper">
                        <input type="button" value="Siguiente" class="nextButton" id="nextButton7" />
                    </div>
                </div>
                <div class="section" id="content11">
                    ss
                </div>
                <div class="section" id="content12">
                    <div class="container">
                        <div class="row">
                            <label for="CboMod">
                                Modalidad de Selección
                            </label>
                            <select id="CboMod" class="form-control input-sm cbo"></select>
                        </div>
                        <div class="row">
                            <label for="TxtJFacSel">
                                Justificación de los factores de selección
                            </label>
                            <textarea id="TxtJFacSel" class="form-control input-sm" rows="4"> </textarea>
                        </div>
                        <div class="row">
                            <label for="TxtCapFin">
                                Capacidad Financiera
                            </label>
                            <textarea id="TxtCapFin" class="form-control input-sm" rows="4"> </textarea>
                        </div>
                    </div>
                    <div class="sectionButtonsWrapper">
                        <input type="button" value="Siguiente" class="nextButton" id="nextButton11" />
                    </div>
                </div>
                <div class="section" id="content13">
                    Cargando... Capacidad Juridica
                </div>
                <div class="section" id="content14">
                    <div class="container">
                        <div class="row">
                            <label for="TxtCodExp">
                                Condiciones de experiencia
                            </label>

                            <textarea id="TxtCodExp" class="form-control input-sm" rows="4"> </textarea>
                        </div>
                        <div class="row">
                            <label for="TxtCapRes">
                                Capacidad residual de contratación
                            </label>
                            <textarea id="TxtCapRes" class="form-control input-sm" rows="4"> </textarea>
                        </div>
                        <div class="row">
                            <label for="TxtFacEsc">
                                Factores de escogencia y calificación
                            </label>
                            <textarea id="TxtFacEsc" class="form-control input-sm" rows="4"> </textarea>
                        </div>
                    </div>
                    <div class="sectionButtonsWrapper">
                        <input type="button" value="Siguiente" class="nextButton" id="nextButton12" />
                    </div>
                </div>
                <div class="section" id="content15">
                    Cargando... Polizas
                </div>
                <div class="section" id="content16">
                    Cargando... Region
                </div>
        </div>
        <!--VENTANA CONSULTA DE TERCEROS  -->
        <div id="winTer">
            <div id="winHTer">
                <span>Listado de Terceros </span>
            </div>
            <div style="overflow: hidden;" id="wConTer">
                <div id="msgTer" class="information">
                    Hacer click para seleccionar el funcionario
                </div>
                <div>
                    <div id="jqxgridTer">
                    </div>
                </div>
            </div>
        </div>
        <!--VENTANA APROBACIÓN  -->
        <div id="winRAI">
            <div id="winHRAI">
                <span>Estudios Previos </span>
            </div>
            <div style="overflow: hidden;" id="Div3">
                <div id="winConRAI" class="information">
                    Hacer click para seleccionar el funcionario
                </div>
                <div>
                    <div class="form">
                        <div class="row">
                            <label for="txtFec">
                                Fecha
                            </label>
                            <div id="txtFec" style="margin-top: 3px;" />
                        </div>
                        <div class="row">
                            <label for="txtObs">
                                Observación</label>
                            <textarea id="txtObs" class="textareapq" name="txtObs"></textarea>
                        </div>
                        <div class="rowBtn">
                            <input type="button" value="Guardar" id="BtnRAIGuardar" />
                            <input type="button" value="Cancelar" id="BtnRAICancelar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
    </div>
    </div>

    <%--esto era de lo viejo--%>
    <div class="page">

        <div class="clear">
        </div>
    </div>
    <div class="footer">
        PIE DE PAGINA
    </div>
    <%--fin de lo vieho--%>
    <script src="js/wizard.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="/jqwidgets/styles/jqx.base.css" />
        <link rel="stylesheet" type="text/css" href="/jqwidgets/styles/jqx.arctic.css" />
    <script type="text/javascript">
        function LoadJqWidget() {
            $.data(document.body, 'theme', 'arctic');
            theme = getDemoTheme();
            wizard.config.theme = theme;
            wizard.init();
            wizard.Deshabilitar(); //Deshabilita los controles y tabs
            _createToolBar();

        }

        $(document).ready(function () {
            LoadJqWidget();
        });

        function pagActual() {
            this.tipo = $.getUrlVar('tip')
            if (this.tipo != null) {
                this.tipo = this.tipo.substring(0, 2);
                this.EP = $.getUrlVar('nep');
            }
            
        }
        var pag = new pagActual();




    </script>

    <script type="text/javascript" src="/Scripts/bootstrap.min.js"></script>

    <script src="js/ModalTer.js" type="text/javascript"></script>
    <script src="js/admHEstadosEP.js" type="text/javascript"></script>
</body>
</html>
