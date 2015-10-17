var manejador = (function () {
    var msgPpal = "#LbMsg";
    var lSecciones = ["secParametrosConsulta", "secRespuestaConsulta"];
    var urlToTiposContratos = "/Servicios/DatosBasicosG/wsTiposContratos.asmx/GetsActivos";
    var urlToSector = "/Servicios/DatosBasicosG/wsSector.asmx/GetsActivos";
    var urlToSubTiposContratos = "/Servicios/DatosBasicosG/wsSubTiposContratos.asmx/Gets2"; 
    var urlToSubDependencias = "/EstPrev/Elaborar/wfRgEstPrev.aspx/GetvDEPENDENCIA";
    var urlToTiposProcesos = "/Servicios/DatosBasicosG/wsModalidades.asmx/GetsActivo"; 
    var urlToEstados = "/Servicios/DatosBasicosG/wsEstados.asmx/Gets";
    var urlToRealizarConsulta = "/Servicios/Reportes/wsReporteParametrizado.asmx/RealizarReporteParametrizado";
    var gridCon = '#jqxgridConRubros';
    var urlToGridCon = "/Servicios/wsRubros.asmx/Gets";
    var urlToInsertRubro = "/Servicios/wsRubros.asmx/Insert";
    var lContratos = [];


    var _addHandlers = function () {
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#btnLimpiar").click(function () {
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
        $("#BtnConsulta").click(function () {
            _realizarConsulta();
        });
        $("#btnAtras").click(function () {
            manejador.MostrarSecion("secParametrosConsulta");
        });
        $("#btnExportar").click(function () {
            $("#tblConsulta").battatech_excelexport({
                containerid: "tblConsulta"
               , datatype: 'table'
               , encoding: "UTF-8"
            });
        });
    };
    var _crearElements = function () {
        $("#chkVigencia").prop('checked', true);
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
                lContratos = Res;
                $("#nroContratos").html("<strong>Resultado: <strong> " + lContratos.length + " contratos");
                console.log(JSON.stringify(lContratos));
                crearTablaConsulta();
                manejador.MostrarSecion("secRespuestaConsulta");
            },
            error: function (jqXHR, status, error) {
                $("#dvdLoader").fadeOut();
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var tableContratos = {};
    var crearTablaConsulta = function () {
        var config = {
            Id: '#tblConsulta',
            Source: lContratos,
            fnFormatItem: function (item, index) {
                return "<td class='text-left'>" + ifNull(item.TIPOCONT) + "</td>" +
                "<td class='text-right'>" + ifNull(item.COD_CON) + "</td>" +
                "<td style='text-align:justify'>" + ifNull(item.OBJ_CON) + "</td>" +
                "<td class='text-right'>" + ifNull(item.IDE_CON) + "</td>" +
                "<td class='text-left'>" + ifNull(item.CONTRATISTA) + "</td>" +
                "<td class='text-left'>" + ifNull(item.SUB_TIPO) + "</td>" +
                "<td class='text-left'>" + ifNull(item.DEPENDENCIA) + "</td>" +
                "<td class='text-left'>" + ifNull(item.DEPENDENCIAP) + "</td>" +
                "<td class='text-left'>" + ifNullDate(item.FEC_SUS_CON) + "</td>" +
                "<td class='text-left'>" + ifNull(item.ESTADO) + "</td>" +
                "<td class='text-left'>" + ifNull(item.TOTAL_PLAZO) + "</td>" +
                "<td>" + ifNull(item.VAL_CON != null ? byaPage.formatNumber.new(item.VAL_CON, "$") : null) + "</td>" +
                "<td>" + ifNull(item.APORTES) + "</td>" +                
                "<td class='text-left'>" + ifNull(item.TIPO_PROCESO) + "</td>" +
                "<td>" + ifNull(item.NRO_CON) + "</td>" +
                "<td>" + ifNull(item.CAN_ADI) + "</td>" +
                "<td>" + ifNull(item.VAL_ADI != null ? byaPage.formatNumber.new(item.VAL_ADI, "$") : null) + "</td>" +
                "<td>" + ifNull(item.TOTAL_PLAZO_ADICION) + "</td>" +
                "<td class='text-left'>" + ifNull(item.URG_MAN) + "</td>" +
                "<td class='text-left'>" + ifNull(item.EXO_IMP) + "</td>" +
                "<td>" + ifNullDate(item.FEC_APR_POL) + "</td>" +
                "<td>" + ifNull(item.IDE_TER_INTV) + "</td>" +
                "<td class='text-left'>" + ifNull(item.NOM_TER_INTV) + "</td>" +
                "<td>" + ifNull(item.IDE_TER_SUP) + "</td>" +
                "<td class='text-left'>" + ifNull(item.NOM_TER_SUP) + "</td>" +
                "<td>" + ifNull(item.IDE_REP) + "</td>" +
                "<td class='text-left'>" + ifNull(item.REP_LEG) + "</td>" +
                "<td>" + ifNullDate(item.FECHA_INICIAL) + "</td>" +
                "<td>" + ifNullDate(item.FECHA_FINAL) + "</td>" +                
                "<td>" + ifNullDate(item.FECHA_LIQ) + "</td>" +
                "";
            },
            Enabled: false
        };
        tableContratos = new byaTablaG();
        tableContratos.init(config);        
    };
    var ifNull = function (value) {        
        if (value != null) return value;
        else return " ";
    };
    var ifNullDate = function (value) {
        if (value != null) return byaPage.converJSONDate(value);
        else return " ";
    };
    var LimpiarFiltros = function () {
        $('input').filter(':checkbox').removeAttr('checked');
        $('input').filter(':text').val("");
        $('select').val("");
        $("#chkVigencia").prop('checked', true);
        $("#txtVigencia").val(byaSite.getVigencia());
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
        MostrarSecion: function(seccion)
        {
            $.each(lSecciones, function (index, item) {
                if (item == seccion) $("#" + item).fadeIn();
                else $("#" + item).fadeOut();
            });
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
    byaSite.SetModuloP({ TituloForm: "Consulta de contratos", Modulo: "Consulta", urlToPanelModulo: "Contratos.aspx", Cod_Mod: "REPO4", Rol: "REPO4Contratos" });
    manejador.init();
});
