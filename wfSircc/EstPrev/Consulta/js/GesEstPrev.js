var admConEst = (function () {
    "use strict";
    var tema;    
    var msgPpal = "#LbMsg";
    var urlSourceDepS = '../Elaborar/wfRgEstPrev.aspx/GetvDEPENDENCIA';
    var urlSourceMod = '../Elaborar/wfRgEstPrev.aspx/GetvModalidad';
    var urlModalCodigosUNSPSC = "../CodigosUNSPSC/CodigoUNSPSC.html";
    var urlSourceTer = "/Servicios/wsDatosBasicos.asmx/GetNomTercerosPk";
    var urlEstudiosPrevios = "/Servicios/EstPrev/wsGesEstPrev.asmx/GetFiltros";
    var lEstPrev;
    var tableEstPrev;
    var sourceDepS;
    var sourceMod;

    var _addHandlers = function () {
        $("#btnBuscarCodigoUNSPSC").click(function () {
            $.get(urlModalCodigosUNSPSC, function (data) {
                $("#secBsqCodigoUNSPSC").html(data);
                //$("#modalCodigos").modal('show');
                oCodigosUNSPSC.showWindow(function (item) {
                    $("#txtProducto").val(item.codigoUNSPSC[0]);
                    oCodigosUNSPSC.HideModal();
                });
            });
        });
        $("#btnLimpiarCodigoUNSPSC").click(function () {
            $("#txtProducto").val("");
        });
        $("#btnBuscarEstudioPrevio").click(function () {
            var filt = _getFiltros();
            if ((ContarFiltros() >= 2) ||(filt.SINUMEROESTUDIOPREVIO))buscarEstudioPrevioFiltro();
            else alert("Se requiere como mínimo dos criterios de búsqueda, escoja otro filtro e intente nuevamente");
        });
        $("#btnRestablecerFiltros").click(function () {
            LimpiarFiltros();
        });
        $("#btnLimpiarProyecto").click(function () {
            $("#txtProyecto").val("");
        });
        $(".tip").tooltip({
            'trigger': 'focus'
        });

    };
    var LimpiarFiltros = function () {
        $("#txtProducto").val("");
        $("#txtNumeroEstudioPrevio").val("");
        $("#cboModalidad").val("");
        $("#cboEstado").val("");
        $("#cboDependencia").val("");
        $("#txtProyecto").val("");
        $("#txtFechaDesde").val("");
        $("#txtFechaHasta").val("");
        $("#cboCuantia").val("");
        $("#txtObjeto").val("");
    };
    var ContarFiltros = function () {
        var oFilt = _getFiltros();
        var con = 0;
        if(oFilt.SIPRODUCTO) con = con + 1;
        if(oFilt.SINUMEROESTUDIOPREVIO) con = con + 1;
        if(oFilt.SIMODALIDAD) con = con + 1;
        if(oFilt.SIESTADO) con = con + 1;
        if(oFilt.SIDEPENDENCIA) con = con + 1;
        if(oFilt.SIPROYECTO) con = con + 1;
        if(oFilt.SIFECHADESDE) con = con + 1;
        if(oFilt.SIFECHAHASTA) con = con + 1;
        if(oFilt.SICUANTIA) con = con + 1;
        if(oFilt.SIOBJETO) con = con + 1;
        return con;
    };
    var _createElements = function () {
        sourceDepS = byaPage.getSource(urlSourceDepS);
        $("#cboDependencia").byaCombo({ DataSource: sourceDepS, Value: "COD_DEP", Display: "NOM_DEP" });
        
        sourceMod = byaPage.getSource(urlSourceMod);
        
        $("#cboModalidad").byaCombo({ DataSource: sourceMod, Value: "COD_TPROC", Display: "NOM_TPROC" });
    };
    var crearTabla = function () {
        var config = {
            Id: '#lEstPrev',
            Source: lEstPrev,
            lEliminar: false,
            lEditar: false,
            lSeleccionar: true,
            fn_Seleccionar: VerDetallesEstPrev,
            Enabled: true,
            fnFormatItem: function (item, index) {
                var Detalles = '<span class="glyphicon glyphicon-search clsslEstPrevSelect" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var colomnBound = '<td>' + item.CODIGO_EP + '</td><td>' + bsqModalidad(item.MOD_SEL_EP) + '</td><td>' + bsqEstado(item.EST_EP) + '</td><td>' + bsqDependencia(item.DEP_NEC_EP) + '</td><td>' + item.OBJE_EP + '</td><td>' + BuscarNombreTercero(item.IDE_CON_EP) + '</td><td>' + byaPage.formatNumber.new(item.VAL_ENT_EP + item.VAL_OTR_EP, "$") + '</td><td>' + byaPage.converJSONDate(item.FEC_ELA_EP) + '</td><td><a href="/EstPrev/Elaborar/rgEstPrev1.aspx?ep=' + item.CODIGO_EP + '">Elaborar</a></td><td><a href="/EstPrev/Revision/revEstPrev.aspx?ep=' + item.CODIGO_EP + '">Revisar</a></td><td><a href="/EstPrev/Aprobacion/aprEstPrev.aspx?ep=' + item.CODIGO_EP + '">Aprobar</a></td>';
                return colomnBound;
            }
        };
        tableEstPrev = new byaTablaG();
        tableEstPrev.init(config);
        tableEstPrev.setEnabled(false);
    };
    var VerDetallesEstPrev = function (item, index) {
        alert(JSON.stringify(item));
    };
    var bsqModalidad = function(cod){
        var nomMod;
        $.each(sourceMod, function (index, item) {
            if (item.COD_TPROC == cod) nomMod = item.NOM_TPROC;
        });
        return nomMod;
    };
    var bsqDependencia = function (cod) {
        var nomDep;
        $.each(sourceDepS, function (index, item) {
            if (item.COD_DEP == cod) nomDep = item.NOM_DEP;
        });
        return nomDep;
    };
    var bsqEstado = function (cod) {
        if (cod == "EL") return "ELABORADO";
        if (cod == "RV") return "REVISADO";
        if (cod == "AP") return "APROVADO";
    };
    var BuscarNombreTercero = function (txtIde) {
        var ide_ter = txtIde;
        if (ide_ter != "") {
            var source = byaPage.getSource(urlSourceTer, { ide_ter: "'" + ide_ter + "'" });
            if (source != "0") {
                return source;
            } else {
                return "";
            }
        }
    };
    var _getFiltros = function () {
        var e = {}

        if ($("#txtProducto").val() == "") e.SIPRODUCTO = false;
        else {
            e.PRODUCTO = $("#txtProducto").val();
            e.SIPRODUCTO = true;
        }

        if ($("#txtNumeroEstudioPrevio").val() == "") e.SINUMEROESTUDIOPREVIO = false;
        else {
            e.NUMEROESTUDIOPREVIO = $("#txtNumeroEstudioPrevio").val();
            e.SINUMEROESTUDIOPREVIO = true;
        }

        if ($("#cboModalidad").val() == "") e.SIMODALIDAD = false;
        else {
            e.MODALIDAD = $("#cboModalidad").val();
            e.SIMODALIDAD = true;
        }

        if ($("#cboEstado").val() == "") e.SIESTADO = false;
        else {
            e.ESTADO = $("#cboEstado").val();
            e.SIESTADO = true;
        }

        if ($("#cboDependencia").val() == "") e.SIDEPENDENCIA = false;
        else {
            e.DEPENDENCIA = $("#cboDependencia").val();
            e.SIDEPENDENCIA = true;
        }

        if ($("#txtProyecto").val() == "") e.SIPROYECTO = false;
        else {
            e.PROYECTO = $("#txtProyecto").val();
            e.SIPROYECTO = true;
        }

        if ($("#txtFechaDesde").val() == "") e.SIFECHADESDE = false;
        else {
            e.FECHADESDE = $("#txtFechaDesde").val();
            e.SIFECHADESDE = true;
        }
 
        if ($("#txtFechaHasta").val() == "") e.SIFECHAHASTA = false;
        else {
            e.FECHAHASTA = $("#txtFechaHasta").val();
            e.SIFECHAHASTA = true;
        }

        if ($("#cboCuantia").val() == "") e.SICUANTIA = false;
        else {
            e.CUANTIA = $("#cboCuantia").val();
            e.SICUANTIA = true;
        }

        if ($("#txtObjeto").val() == "") e.SIOBJETO = false;
        else {
            e.OBJETO = $("#txtObjeto").val();
            e.SIOBJETO = true;
        }

        return e;
    }
    var buscarEstudioPrevioFiltro = function () {
        var parametro = {
            Reg: JSON.stringify(_getFiltros())
        }
        $.ajax({
            type: "GET",
            url: urlEstudiosPrevios,
            data: parametro,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                var lEP = byaPage.retObj(result.d);
                lEstPrev = lEP;
                if (lEstPrev.length == 0) {
                    crearTabla();
                    $("#msjResp").html("No se encuentran resultados para esta búsqueda!!!");
                }
                else {
                    $("#msjResp").html("");
                    crearTabla();
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };

    return {
        config: {
            theme: null
        },
        init: function () {
            tema = byaSite.tema;
            _addHandlers();
            _createElements();
            admProy.init();
        }
    };
}());

var admProy = (function () {
    var grid = "#jqxgridProy";
    var msgPpal = "#msgProy";
    var oper;
    var editrow = -1;
    var divBtnGrid = "#divBtnGridProy";
    var gridCon = '#jqxgridConProy';
    var urlToGridCon = "../Elaborar/wfRgEstPrev.aspx/GetProyectos";

    var _addHandlers = function () {        
        $("#addButtonProy").click(function () {
            _verVentana();
        });
        $(gridCon).bind('rowselect', function (event) {
            var selectedRowIndex = event.args.rowindex;
            var cod, nom;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'Nro_Proyecto');
            cod = cell.value;
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'Nombre_Proyecto');
            nom = cell.value;
            $("#txtProyecto").val(cod);
            $('#modalPry').modal('hide');
        });
    };
    var _verVentana = function () {
        //$(ventana).jqxWindow('open');
        $('#modalPry').modal('show');
        _createGridCon();
    }
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'Nro_Proyecto', type: 'string' },
                    { name: 'Nombre_Proyecto', type: 'string' }
            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { filtro: "''" }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        // initialize jqxGrid
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: admProy.config.theme,
                        height: 350,
                        sortable: true,
                        altrows: true,
                        localization: byaPage.getLocalization(),
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                      { text: 'Código', datafield: 'Nro_Proyecto', width: 150, filtertype: 'textbox' },
                      { text: 'Descripción', datafield: 'Nombre_Proyecto', filtertype: 'textbox' }
                        ]
                    });
    };


    return {
        disabled: null,
        id_ep: null,
        editedRows: null,
        config: {
            theme: null
        },
        init: function () {
            //this.config.theme = wizard.config.theme;
            _createGridCon();
            _addHandlers();
        }
    };
}());
$(document).ready(function () {
    byaSite.SetModuloP({ TituloForm: "Estudios Previos", Modulo: "Consulta de Estudios Previos", urlToPanelModulo: "#", Cod_Mod: "ESPR4", Rol: "EP_CONSULTAR" });
    theme = getDemoTheme();
    admConEst.config.theme = theme;
    admConEst.init();
});

