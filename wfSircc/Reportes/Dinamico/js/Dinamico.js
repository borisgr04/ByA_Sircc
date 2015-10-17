var manejador = (function () {
    var urlToTiposContratos = "/Servicios/DatosBasicosG/wsTiposContratos.asmx/GetsActivos";
    var urlToSector = "/Servicios/DatosBasicosG/wsSector.asmx/GetsActivos";
    var urlToSubTiposContratos = "/Servicios/DatosBasicosG/wsSubTiposContratos.asmx/Gets2";
    var urlToSubDependencias = "/EstPrev/Elaborar/wfRgEstPrev.aspx/GetvDEPENDENCIA";
    var urlToTiposProcesos = "/Servicios/DatosBasicosG/wsModalidades.asmx/GetsActivo";
    var urlToEstados = "/Servicios/DatosBasicosG/wsEstados.asmx/Gets";
    var urlToRealizarConsulta = "/Servicios/Reportes/wsReporteDinamico.asmx/RealizarReporteDinamico";
    var gridCon = '#jqxgridConRubros';
    var urlToGridCon = "/Servicios/wsRubros.asmx/Gets";
    var urlToInsertRubro = "/Servicios/wsRubros.asmx/Insert";
    var listaCampos = [];
    var listaCamposConsolidado = [];
    var lSection = ["dvdCapturaFiltros", "dvdRespuestaReporte"];
    var lNavegacion = [];
    var _addHandlers = function () {
        $("#ul-campos-posibles, #ul-campos-seleccionados").sortable({
            connectWith: ".connectedSortable",
            receive: function (event, ui) {
                $(".li-box").removeClass('li-box-selected');
            }
        });
        $("#ul-campos-posibles-consolidado, #ul-campos-seleccionados-consolidado").sortable({
            connectWith: ".connectedSortableConsolidados",
            receive: function (event, ui) {
                $(".li-box").removeClass('li-box-selected');
            }
        });
        $(".li-box").click(function () {
            if ($(this).hasClass('li-box-selected')) {
                $(this).removeClass('li-box-selected');
            } else {
                $(this).addClass('li-box-selected');
            }
        });
        $("#btnTodosListado").click(function () {
            $("#ul-campos-posibles .li-box").addClass('li-box-selected');
        });
        $("#btnNingunoListado").click(function () {
            $("#ul-campos-posibles .li-box").removeClass('li-box-selected');
        });
        $("#btnTodosSeleccionados").click(function () {
            $("#ul-campos-seleccionados .li-box").addClass('li-box-selected');
        });
        $("#btnNingunoSeleccionados").click(function () {
            $("#ul-campos-seleccionados .li-box").removeClass('li-box-selected');
        });
        $("#btnAgregarSeleccionados").click(function () {
            _AgregarSeleccionados();
        });
        $("#btnQuitarSeleccionados").click(function () {
            _QuitarSeleccionados();
        });
        $("#btnAgregarSeleccionadosConsolidado").click(function () {
            _AgregarSeleccionadosConsolidado();
        });
        $("#btnQuitarSeleccionadosConsolidado").click(function () {
            _QuitarSeleccionadosConsolidado();
        });
        $(".btnIrFiltros").click(function () {
            _irTab("liFiltros");
        });
        $(".btnIrSeleccionCampos").click(function () {
            _irTab("liSeleccionCampos");
        });
        $(".btnIrConsolidados").click(function () {
            _irTab("liConsolidado");
        });
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $(".btnLimpiar").click(function () {
            LimpiarFiltros();
        });
        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });
        $("#cboTipoContrato").change(function () {
            var sourceSubTiposContratos = byaPage.getSource(urlToSubTiposContratos, { COD_TIP: "'" + $(this).val() + "'" });
            $("#cboSubTipoContrato").byaCombo({
                DataSource: sourceSubTiposContratos, placeHolder: 'Seleccione', Display: "NOM_STIP", Value: "COD_STIP"
            });
        });
        $("#btnBuscarContratista").click(function () {
            ModTer.showWindow(function (ter) {
                $("#txtIdContratista").val(ter.IDE_TER);
                $("#txtNomContratista").val(ter.NOMBRE);
            });
        });
        $("#btnBsqInterventor").click(function () {
            ModTer.showWindow(function (ter) {
                $("#txtIdInterventor").val(ter.NOMBRE);
                $("#txtNomInterventor").val(ter.IDE_TER);
            });
        });
        $("#btmBsqRubro").click(function () {
            _verVentana();
        });
        $("#btnTodosListadoConsolidado").click(function () {
            $("#ul-campos-posibles-consolidado .li-box").addClass('li-box-selected');
        });
        $("#btnNingunoListadoConsolidado").click(function () {
            $("#ul-campos-posibles-consolidado .li-box").removeClass('li-box-selected');
        });
        $("#btnTodosSeleccionadosConsolidado").click(function () {
            $("#ul-campos-seleccionados-consolidado .li-box").addClass('li-box-selected');
        });
        $("#btnNingunoSeleccionadosConsolidado").click(function () {
            $("#ul-campos-seleccionados-consolidado .li-box").removeClass('li-box-selected');
        });
        $("#btnConsulta").click(function () {
            _realizarConsulta();
        });
        $("#btnAtras").click(function () {
            _mostrarSection("dvdCapturaFiltros");
        });
    };
    var _crearElements = function () {
        _llenarCampos();
        _llenarCamposConsolidado();
        _cargarCamposEnLista();
        _cargarCamposEnListaConsolidados();
        _armarNavegacion();

        $("#chkVigencia").attr("checked", true);
        $("#txtVigencia").val(byaSite.getVigencia());

        var sourceTiposContratos = byaPage.getSource(urlToTiposContratos);
        $("#cboTipoContrato").byaCombo({
            DataSource: sourceTiposContratos, placeHolder: 'Seleccione', Display: "NOM_TIP", Value: "COD_TIP"
        });


        var sourceDependencias = byaPage.getSource(urlToSubDependencias);
        $("#cboDependenciaNecesidad").byaCombo({
            DataSource: sourceDependencias, placeHolder: 'Seleccione', Display: "NOM_DEP", Value: "COD_DEP"
        });

        $("#cboDependenciaAcargo").byaCombo({
            DataSource: sourceDependencias, placeHolder: 'Seleccione', Display: "NOM_DEP", Value: "COD_DEP"
        });

        var sourceTiposProcesos = byaPage.getSource(urlToTiposProcesos);
        $("#cboTipoProceso").byaCombo({
            DataSource: sourceTiposProcesos, placeHolder: 'Seleccione', Display: "NOM_TPROC", Value: "COD_TPROC"
        });

        var sourceEstados = byaPage.getSource(urlToEstados);
        $("#cboUltimaActa").byaCombo({
            DataSource: sourceEstados, placeHolder: 'Seleccione', Display: "NOM_EST", Value: "COD_EST"
        });

        var sourceSector = byaPage.getSource(urlToSector);
        $("#cboSectorDestino").byaCombo({
            DataSource: sourceSector, placeHolder: 'Seleccione', Display: "NOM_SEC", Value: "COD_SEC"
        });

        var lEstados = [];
        $.each(sourceEstados, function (index, item) {
            var ban = false;
            $.each(lEstados, function (index2, item2) {
                if (item.ESTADO == item2.ESTADO) ban = true;
            });
            if (!ban) {
                var e = { ESTADO: item.ESTADO }
                lEstados.push(e);
            }
        });

        $("#cboEstado").byaCombo({
            DataSource: lEstados, placeHolder: 'Seleccione', Display: "ESTADO", Value: "ESTADO"
        });
    };
    var _llenarCampos = function () {
        listaCampos = [
            { value: "TIPOCONT" , name: "TIPO_CONTRATO"},
            { value: "COD_CON" , name: "CODIGO_CONTRATO"},
            { value: "OBJ_CON" , name: "OBJETO"},
            { value: "SUB_TIPO" , name: "SUBTIPO_CONTRATO"},
            { value: "DEPENDENCIA" , name: "DEPENDENCIA_NECESIDAD"},
            { value: "DEPENDENCIAP" , name: "DEPENDENCIA_A_CARGO"},
            { value: "FEC_SUS_CON" , name: "FECHA_SUSCRIPCION"},
            { value: "ESTADO" , name: "ESTADO"},
            { value: "TOTAL_PLAZO" , name: "TOTAL_PLAZO"},
            { value: "VAL_CON" , name: "VALOR_CONTRATO"},
            { value: "APORTES" , name: "APORTES"},                
            { value: "TIPO_PROCESO" , name: "MODALIDAD"},
            { value: "NRO_CON" , name: "NUMERO_CONTRATO"},
            { value: "CAN_ADI" , name: "CANTIDAD_ADICIONES"},
            { value: "VAL_ADI" , name: "VALOR_ADICIONES"},
            { value: "TOTAL_PLAZO_ADICION", name: "TOTAL_PLAZO_ADICION" },
            { value: "URG_MAN" , name: "URGENCIA_MANIFIESTA"},
            { value: "EXO_IMP" , name: "EXONERACION_IMPUESTOS"},
            { value: "FEC_APR_POL", name: "FECHA_APROBACION_POLIZA" },
            { value: "IDE_CON", name: "IDE_CONTRATISTA" },
            { value: "CONTRATISTA", name: "NOMBRE_CONTRATISTA" },
            { value: "IDE_TER_INTV" , name: "IDE_INTERVENTOR"},
            { value: "NOM_TER_INTV" , name: "NOMBRE_INTERVENTOR"},
            { value: "IDE_TER_SUP" , name: "IDE_SUPERVISOR"},
            { value: "NOM_TER_SUP" , name: "NOMBRE_SUPERVISOR"},
            { value: "IDE_REP" , name: "IDE_REPRESENTANTE"},
            { value: "REP_LEG" , name: "REPRESENTANTE_LEGAL"},
            { value: "FECHA_INICIAL" , name: "FECHA_INICIAL"},
            { value: "FECHA_FINAL" , name: "FECHA_FINAL"},                
            { value: "FECHA_LIQ" , name: "FECHA_LIQUIDACION"}
        ];
    };
    var _llenarCamposConsolidado = function () {
        listaCamposConsolidado = [
            { value: "TIPOCONT", name: "TIPO_CONTRATO" },
            //{ value: "COD_CON", name: "CODIGO_CONTRATO" },
            //{ value: "OBJ_CON", name: "OBJETO" },
            //{ value: "IDE_CON", name: "IDE_CONTRATISTA" },
            { value: "CONTRATISTA", name: "NOMBRE_CONTRATISTA" },
            { value: "SUB_TIPO", name: "SUBTIPO_CONTRATO" },
            { value: "DEPENDENCIA", name: "DEPENDENCIA_NECESIDAD" },
            { value: "DEPENDENCIAP", name: "DEPENDENCIA_A_CARGO" },
            //{ value: "FEC_SUS_CON", name: "FECHA_SUSCRIPCION" },
            { value: "ESTADO", name: "ESTADO" },
            //{ value: "TOTAL_PLAZO", name: "TOTAL_PLAZO" },
            //{ value: "VAL_CON", name: "VALOR_CONTRATO" },
            //{ value: "APORTES", name: "APORTES" },
            { value: "TIPO_PROCESO", name: "TIPO_PROCESO" },
            //{ value: "NRO_CON", name: "NUMERO_CONTRATO" },
            //{ value: "CAN_ADI", name: "CANTIDAD_ADICIONES" },
            //{ value: "VAL_ADI", name: "VALOR_ADICIONES" },
            //{ value: "TOTAL_PLAZO_ADICION", name: "TOTAL_PLAZO_ADICION" },
            //{ value: "URG_MAN", name: "URGENCIA_MANIFIESTA" },
            //{ value: "EXO_IMP", name: "EXONERACION_IMPUESTOS" },
            //{ value: "FEC_APR_POL", name: "FECHA_APROBACION_POLIZA" },
            //{ value: "IDE_TER_INTV", name: "IDE_INTERVENTOR" },
            { value: "NOM_TER_INTV", name: "NOMBRE_INTERVENTOR" },
            //{ value: "IDE_TER_SUP", name: "IDE_SUPERVISOR" },
            { value: "NOM_TER_SUP", name: "NOMBRE_SUPERVISOR" },
            //{ value: "IDE_REP", name: "IDE_REPRESENTANTE" },
            { value: "REP_LEG", name: "REPRESENTANTE_LEGAL" },
            //{ value: "FECHA_INICIAL", name: "FECHA_INICIAL" },
            //{ value: "FECHA_FINAL", name: "FECHA_FINAL" },
            //{ value: "FECHA_LIQ", name: "FECHA_LIQUIDACION" }
        ];
    };
    var _cargarCamposEnLista = function () {
        $("#ul-campos-posibles").html("");
        $.each(listaCampos, function (index, item) {
            $("#ul-campos-posibles").append('<li class="li-box"><label>' + item.name + '</label></li>');
        });
        _agregarEventoSeleccionar();
    };
    var _cargarCamposEnListaConsolidados = function () {
        $("#ul-campos-posibles-consolidado").html("");
        $.each(listaCamposConsolidado, function (index, item) {
            $("#ul-campos-posibles-consolidado").append('<li class="li-box"><label>' + item.name + '</label></li>');
        });
        _agregarEventoSeleccionar();
    };
    var _AgregarSeleccionados = function () {
        $("#ul-campos-posibles .li-box-selected").each(function (index) {
            $("#ul-campos-seleccionados").append('<li class="li-box"><label>' + $(this).text() + '</label></li>');
            $(this).remove();
        });
        _agregarEventoSeleccionar();
    };
    var _QuitarSeleccionados = function () {
        $("#ul-campos-seleccionados .li-box-selected").each(function (index) {
            $("#ul-campos-posibles").append('<li class="li-box"><label>' + $(this).text() + '</label></li>');
            $(this).remove();
        });
        _agregarEventoSeleccionar();
    };
    var _agregarEventoSeleccionar = function () {
        $(".li-box").unbind("click");
        $(".li-box").click(function () {
            if ($(this).hasClass('li-box-selected')) {
                $(this).removeClass('li-box-selected');
            } else {
                $(this).addClass('li-box-selected');
            }
        });
    };
    var _armarNavegacion = function () {
        lNavegacion = [
            {
                LI: "liSeleccionCampos",
                TAB: "tabSeleccionCampos"
            },
            {
                LI: "liFiltros",
                TAB: "tabFiltro"
            },
            {
                LI: "liConsolidado",
                TAB: "tabConsolidados"
            }
        ];
    };
    var _irTab = function (value) {
        $.each(lNavegacion, function (index, item) {
            if (item.LI == value) {
                $("#" + item.LI).addClass("active");
                $("#" + item.TAB).addClass("active");
            } else {
                $("#" + item.LI).removeClass("active");
                $("#" + item.TAB).removeClass("active");
            }
        });
    };
    var LimpiarFiltros = function () {
        $('input').filter(':checkbox').removeAttr('checked');
        $('input').filter(':text').val("");
        $('select').val("");
        $("#chkVigencia").prop('checked', true);
        $("#txtVigencia").val(byaSite.getVigencia());
    };
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_RUB', type: 'string' },
                    { name: 'DES_RUB', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon + "?filtro=" + byaSite.getVigencia(),
            data: {}
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });


        $(gridCon).jqxGrid(
                   {
                       width: '100%',
                       source: dataAdapter,
                       theme: manejador.config.theme,
                       localization: byaPage.getLocalization(),
                       height: 350,
                       sortable: true,
                       altrows: true,
                       showfilterrow: true,
                       filterable: true,
                       pageable: true,
                       enabletooltips: true,
                       columns: [
                       { text: 'Código', datafield: 'COD_RUB', width: 150, filtertype: 'textbox' },
                       { text: 'Descripción', datafield: 'DES_RUB', filtertype: 'textbox' }
                       ]
                   });

        $(gridCon).bind('rowselect', function (event) {
            var selectedRowIndex = event.args.rowindex;
            var cod, nom;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'COD_RUB');
            cod = cell.value;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'DES_RUB');
            nom = cell.value;
            $("#txtRubroPresupuestal").val(cod);
            $("#txtNomRubroPresupuestal").val(nom);
            $('#modalRubros').modal('hide');
        });
    };
    var _verVentana = function () {
        //$(ventana).jqxWindow('open');
        $('#modalRubros').modal('show');
        _createGridCon();
    };
    var _AgregarSeleccionadosConsolidado = function () {
        $("#ul-campos-posibles-consolidado .li-box-selected").each(function (index) {
            $("#ul-campos-seleccionados-consolidado").append('<li class="li-box"><label>' + $(this).text() + '</label></li>');
            $(this).remove();
        });
        _agregarEventoSeleccionar();
    };
    var _QuitarSeleccionadosConsolidado = function () {
        $("#ul-campos-seleccionados-consolidado .li-box-selected").each(function (index) {
            $("#ul-campos-posibles-consolidado").append('<li class="li-box"><label>' + $(this).text() + '</label></li>');
            $(this).remove();
        });
        _agregarEventoSeleccionar();
    };
    var _armarObjetoConsulta = function () {
        var e = {};
        e.chkVigencia = $("#chkVigencia").is(':checked');
        e.chkAnulados = $("#chkAnulados").is(':checked');
        e.Vigencia = $("#txtVigencia").val();

        e.chkNumeroContrato = $("#chkNumeroContrato").is(':checked');
        e.NumeroContrato = $("#txtNumeroContrato").val();

        e.chkTipoContrato = $("#chkTipoContrato").is(':checked');
        e.TipoContrato = $("#cboTipoContrato").val();

        e.chkSubTipoContrato = $("#chkSubTipoContrato").is(':checked');
        e.SubTipoContrato = $("#cboSubTipoContrato").val();

        e.chkUltimaActa = $("#chkUltimaActa").is(':checked');
        e.UltimaActa = $("#cboUltimaActa").val();

        e.chkEstado = $("#chkEstado").is(':checked');
        e.Estado = $("#cboEstado").val();

        e.chkSectorDestino = $("#chkSectorDestino").is(':checked');
        e.SectorDestino = $("#cboSectorDestino").val();

        e.chkProyecto = $("#chkProyecto").is(':checked');
        e.Proyecto = $("#txtProyecto").val();

        e.chkDependenciaNecesidad = $("#chkDependenciaNecesidad").is(':checked');
        e.DependenciaNecesidad = $("#cboDependenciaNecesidad").val();

        e.chkDependenciaAcargo = $("#chkDependenciaAcargo").is(':checked');
        e.DependenciaAcargo = $("#cboDependenciaAcargo").val();

        e.chkFechaSuscripcion = $("#chkFechaSuscripcion").is(':checked');
        e.FechaISuscripcion = $("#txtFechaISuscripcion").val();
        e.FechaFSuscripcion = $("#txtFechaFSuscripcion").val();

        e.chkFechaRegistro = $("#chkFechaRegistro").is(':checked');
        e.FechaIRegistro = $("#txtFechaIRegistro").val();
        e.FechaFRegistro = $("#txtFechaFRegistro").val();

        e.chkContratista = $("#chkContratista").is(':checked');
        e.IdContratista = $("#txtIdContratista").val();

        e.chkInterventor = $("#chkInterventor").is(':checked');
        e.IdInterventor = $("#txtIdInterventor").val();

        e.chkTipoProceso = $("#chkTipoProceso").is(':checked');
        e.TipoProceso = $("#cboTipoProceso").val();

        e.chkPlaneacionPrecontractual = $("#chkPlaneacionPrecontractual").is(':checked');
        e.PlaneacionPrecontractual = $("#txtPlaneacionPrecontractual").val();

        e.chkRecurso = $("#chkRecurso").is(':checked');
        e.Recurso = $("#txtRecurso").val();

        e.chkDisponibilidadPresupuestal = $("#chkDisponibilidadPresupuestal").is(':checked');
        e.DisponibilidadPresupuestal = $("#txtDisponibilidadPresupuestal").val();
        e.VigenciaDisponibilidadPresupuestal = $("#txtVigenciaDisponibilidadPresupuestal").val();

        e.chkRegistroPresupuestal = $("#chkRegistroPresupuestal").is(':checked');
        e.RegistroPresupuestal = $("#txtRegistroPresupuestal").val();
        e.VigenciaRegistroPresupuestal = $("#txtVigenciaRegistroPresupuestal").val();

        e.chkValorContratoConvenio = $("#chkValorContratoConvenio").is(':checked');
        e.ValorDesdePrecontractual = $("#txtValorDesdePrecontractual").val();
        e.ValorHastaPrecontractual = $("#txtValorHastaPrecontractual").val();

        e.chkRubroPresupuestal = $("#chkRubroPresupuestal").is(':checked');
        e.RubroPresupuestal = $("#txtRubroPresupuestal").val();

        e.chkObjeto = $("#chkObjeto").is(':checked');
        e.Objeto = $("#txtObjeto").val();

        e.lCamposMostrar = [];
        e.lCamposAgrupar = [];

        $("#ul-campos-seleccionados .li-box").each(function (index) {
            var strBsq = $(this).text();
            var ban = false;
            var valueFiltro = {};
            $.each(listaCampos, function (index, item) {
                if (strBsq == item.name) {
                    ban = true;
                    valueFiltro = item;
                }
            });
            if (ban == true) e.lCamposMostrar.push(valueFiltro);
        });

        $("#ul-campos-seleccionados-consolidado .li-box").each(function (index) {
            var strBsq = $(this).text();
            var ban = false;
            var valueFiltro = {};
            $.each(listaCamposConsolidado, function (index, item) {
                if (strBsq == item.name) {
                    ban = true;
                    valueFiltro = item;
                }
            });
            if (ban == true) e.lCamposAgrupar.push(valueFiltro);
        });

        e.AgruparIndividuales = $("#chkIndividuales").is(':checked');

        return e;
    };
    var _realizarConsulta = function () {
        var jsonData = "{'Reg':" + JSON.stringify(_armarObjetoConsulta()) + "}";
        $("#dvdLoader").fadeIn();
        $.ajax({
            type: "POST",
            url: urlToRealizarConsulta,
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                $("#dvdLoader").fadeOut();
                var Res = byaPage.retObj(result.d);
                $("#llamadaTabs").html('');
                $.each(Res, function (index, item) {
                    if (index == 0) $("#llamadaTabs").append('<li class="active"><a href="#section' + index + '" data-toggle="tab">' + item.Nombre + '</a></li>');
                    else $("#llamadaTabs").append('<li><a href="#section' + index + '" data-toggle="tab">' + item.Nombre + '</a></li>');
                });

                $("#seccionesTabs").html('');
                $.each(Res, function (index, item) {
                    if (index == 0) {
                        $("#seccionesTabs").append('<div id="section' + index + '" class="tab-pane in active">' +
                                                        '<div class="container">' +
                                                            '<div class="form-group row text-right">' +
                                                                '<button type="button" class="btn btn-info" id="tbl-table' + index + '" onclick="manejador.exportarTabla(id)"><span class="glyphicon glyphicon-save"></span> Exportar</button>' +
                                                            '</div>' +
                                                            '<div style="overflow:auto; width:100%; height:450px">' + item.Html + '</div>' +
                                                        '</div>' +
                                                   '</div>');
                    }
                    else {
                        $("#seccionesTabs").append('<div id="section' + index + '" class="tab-pane in">' +
                                                   '<div class="container">' +
                                                       '<div class="form-group row text-right">' +
                                                           '<button type="button" class="btn btn-info" id="tbl-table' + index + '" onclick="manejador.exportarTabla(id)"><span class="glyphicon glyphicon-save"></span> Exportar</button>' +
                                                       '</div>' +
                                                       '<div style="overflow:auto; width:100%; height:450px">' + item.Html + '</div>' +
                                                   '</div>' +
                                              '</div>');
                    }
                });
                _mostrarSection("dvdRespuestaReporte");
            },
            error: function (jqXHR, status, error) {
                $("#dvdLoader").fadeOut();
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var _mostrarSection = function (value) {
        $.each(lSection, function (index, item) {
            if (item == value) $("#" + item).fadeIn();
            else $("#" + item).fadeOut();
        });
    };
    var exportarTabla = function(id_tabla){
        $("#" + id_tabla).battatech_excelexport({
            containerid: id_tabla
               , datatype: 'table'
               , encoding: "UTF-8"
        });
    };
    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        init: function () {
            ModTer.init();
            _addHandlers();
            _crearElements();
        },
        exportarTabla: function (id_tabla) {
            id_tabla = "" + id_tabla + "";
            var strs = id_tabla.split("-");
            exportarTabla(strs[1]);
        }
    }
}());

var admRubros = (function () {
    var oper;
    var editrow = -1;
    var gridCon = '#jqxgridConRubros';
    var urlToGridCon = "/Servicios/wsRubros.asmx/Gets";
    var urlToInsertRubro = "/Servicios/wsRubros.asmx/Insert";
    var activarValidar = true;

    var _addHandlers = function () {

        $(gridCon).bind('rowselect', function (event) {
            var selectedRowIndex = event.args.rowindex;
            var cod, nom;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'COD_RUB');
            cod = cell.value;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'DES_RUB');
            nom = cell.value;
            $("#txtCodRub").val(cod);
            $("#txtDesRub").val(nom);
            $('#modalRubros').modal('hide');
        });
        $("#btnRegistrarNuevoRubro").click(function () {
            $('#modalRubros').modal('hide');
            $("#modalNuevoRubro").modal("show");
            admRubros.Limpiar();
        });
        $("#btnGuardarNuevoRubro").click(function () {
            GuargarNuevoRubro();
        });
    }

    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_RUB', type: 'string' },
                    { name: 'DES_RUB', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon + "?filtro=" + byaSite.getVigencia(),
            data: {}
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });


        $(gridCon).jqxGrid(
                   {
                       width: '100%',
                       source: dataAdapter,
                       theme: admProy.config.theme,
                       localization: byaPage.getLocalization(),
                       height: 350,
                       sortable: true,
                       altrows: true,
                       showfilterrow: true,
                       filterable: true,
                       pageable: true,
                       enabletooltips: true,
                       columns: [
                       { text: 'Código', datafield: 'COD_RUB', width: 150, filtertype: 'textbox' },
                       { text: 'Descripción', datafield: 'DES_RUB', filtertype: 'textbox' }
                       ]
                   });
    };
    var _getDatos = function () {
        var e = {}
        e.COD_RUB = $("#txtCodigoRubroNuevo").val();
        e.DES_RUB = $("#txtDescripcionRubroNuevo").val();
        e.COD_UNIDAD = $("#txtCodigoUnidadRubroNuevo").val();
        e.COD_RECURSO = $("#txtCodigoRecursoRubroNuevo").val();
        e.CLASE = $("#txtClaseRubroNuevo").val();
        e.VIGENCIA = byaSite.getVigencia();
        return e;
    };
    var GuargarNuevoRubro = function () {
        if (_esValido()) {
            var jsonData = "{'Reg':" + JSON.stringify(_getDatos()) + "}";
            byaPage.POST_Sync(urlToInsertRubro, jsonData, function (result) {
                var res = byaPage.retObj(result.d);
                if (res.Error == false) {
                    $("#txtCodRub").val($("#txtCodigoRubroNuevo").val());
                    $("#txtDesRub").val($("#txtDescripcionRubroNuevo").val());
                }
                $("#modalNuevoRubro").modal("hide");
            });
        }
    };
    var _esValido = function () {
        var error = false;
        var _ValidarEmpty = function (Tipo, Control) {
            if ($("#" + Tipo + Control).val() == "") {
                $("#dvd" + Control).addClass("has-error");
                error = true;
            }
            else {
                $("#dvd" + Control).removeClass("has-error");
            }
        };
        var _MensajeFinalValidacion = function () {
            if (error) {
                $("#LbMsg").html("Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ");
            } else {
                $("#LbMsg").html("");
            }
        };
        if (activarValidar) {
            _ValidarEmpty("txt", "CodigoRubroNuevo");
            _ValidarEmpty("txt", "DescripcionRubroNuevo");
            _ValidarEmpty("txt", "CodigoUnidadRubroNuevo");
            _ValidarEmpty("txt", "CodigoRecursoRubroNuevo");
            _ValidarEmpty("txt", "ClaseRubroNuevo");
            _MensajeFinalValidacion();
        }
        return !error;
    };
    return {
        disabled: null,
        id_ep: null,
        editedRows: null,
        config: {
            theme: null
        },
        setDATOS: function () {
            return $(grid).jqxGrid({ source: _getdataAdapter() });
        },
        getDATOS: function () {
            return $(grid).jqxGrid('getboundrows');
        },
        init: function () {
            this.config.theme = wizard.config.theme;
            _addHandlers();
            _createGridCon();
        },
        Limpiar: function () {
            $("#txtCodigoRubroNuevo").val("");
            $("#txtDescripcionRubroNuevo").val("");
            $("#txtCodigoUnidadRubroNuevo").val("");
            $("#txtCodigoRecursoRubroNuevo").val("");
            $("#txtClaseRubroNuevo").val("");
        }
    };
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Consulta de contratos", Modulo: "Consulta", urlToPanelModulo: "Dinamico.aspx", Cod_Mod: "REPO4", Rol: "REPO4Dinamico" });
    manejador.init();
});