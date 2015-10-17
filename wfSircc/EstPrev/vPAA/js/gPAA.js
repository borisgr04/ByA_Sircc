var gPAA = (function () {
    "use strict";
    var TituloForm = "PLAN ANUAL DE ADQUISICIÓN (PAA)";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/wsPAA.asmx/Gets";
    var urlToGridCon2 = "/Servicios/wsPAA.asmx/GetXML";
    var urlDetSolicitud = "/Solicitudes/DetSolicitud2.html";
    var urlAsigSolicitud = "Asignar.html";
    var urlSourceDepS = '../Elaborar/wfRgEstPrev.aspx/GetvDEPENDENCIA';
    var urlToDeletePaa = "/Servicios/wsPAA.asmx/DeletePAA";
    var msgPpal = "#LbMsg";
    var urlToNuevaSol = "RegSolicitudes.aspx";
    var urlToGetvDEPENDENCIAD = '/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD';
    var urlToTraerMPAA = "/Servicios/wsMPAA.asmx/Get";
    var id;
    var idEP;
    var idMPAA;

    var _addHandlers = function () {
        $("#btnVolverAtras").click(function () {
            history.back();
        });
        $('#BtnEliminar').click(function () {
            var confirmacion = confirm("Esta seguro que desea eliminar este item?");
            if (confirmacion) {
                var objPAA = gPAA.getRecord();
                EliminarPAA(objPAA.ID);
            }
        });
        $('#BtnNuevo').click(function () {
            window.location.href = "vPAA.aspx?idmpaa=" + idMPAA;
        });
        $('#BtnEditar').click(function () {
            var objPAA = gPAA.getRecord();
            window.location.href = "vPAA.aspx?idObjPAA=" + objPAA.ID + "&op=E&idmpaa=" + idMPAA;
        });
        $('#BtnDetalles').click(function () {
            var objPAA = gPAA.getRecord();
            window.location.href = "vPAA.aspx?idObjPAA=" + objPAA.ID + "&op=D&idmpaa=" + idMPAA;
        });
        $("#BtnDwnAbrir").click(function () {
            if ($("#cboFiltroDependencia").val() != "") {
                _createGridCon2();
            } else alert("Debe seleccionar una dependencia valida...");
        });
        $("#txtNumero").change(function () {
            if ($(this).val() == "") _createGridCon();
        });
        $("#cboFiltroDependencia").change(function () {
            if ($("#cboFiltroDependencia").val() != "") {
                if ($("#txtNumero").val() == "") _createGridCon();
                else _createGridCon2();
            }
        });
    };
    var EliminarPAA = function (idpaa) {
        var parametro = {
            IDPAA: "'" + idpaa + "'"
        }

        $.ajax({
            type: "GET",
            url: urlToDeletePaa,
            data: parametro,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                var res = byaPage.retObj(result.d);
                if (res.Error == false) {
                    _createGridCon();
                }
                $(msgPpal).msgBox({ titulo: "Plan Anual de Adquisiciones", mensaje: res.Mensaje, tipo: !res.Error });
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
        //var sourceDepS = byaPage.getSource(urlSourceDepS);
        //$("#cboFiltroDependencia").byaCombo({ DataSource: sourceDepS, Value: "COD_DEP", Display: "NOM_DEP" });
        _traerMPAA();
    };
    var _traerMPAA = function () {
        var sourceP = byaPage.getSource(urlToTraerMPAA, { ID: "'" + idMPAA + "'" });
        sourceP.FEC_INI = byaPage.converJSONDate(sourceP.FEC_INI);
        sourceP.FEC_FIN = byaPage.converJSONDate(sourceP.FEC_FIN);
        var DataFields = [
                   { Titulo: 'ID', Campo: 'ID', Tipo: 'S' },
                   { Titulo: 'Vigencia', Campo: 'VIGENCIA', Tipo: 'S' },
                   { Titulo: 'Observación', Campo: 'OBSERV', Tipo: 'S' },
                   { Titulo: 'Fecha Inicial', Campo: 'FEC_INI', Tipo: 'S' },
                   { Titulo: 'Fecha Final', Campo: 'FEC_FIN', Tipo: 'S' },
                   { Titulo: 'Estado', Campo: 'ESTADO', Tipo: 'S' },
        ];
        var Titulo = "INFORMACION DETALLADA DEL PROCESO";
        $('#dvdProc').DetailsJSON(sourceP, DataFields, Titulo);

        if (sourceP.ESTADO == "CE") {
            $("#BtnDetalles").byaSetHabilitar(false);
            $("#BtnNuevo").byaSetHabilitar(false);
            $("#BtnEditar").byaSetHabilitar(false);
            $("#BtnEliminar").byaSetHabilitar(false);
        } else {
            $("#BtnDetalles").byaSetHabilitar(true);
            $("#BtnNuevo").byaSetHabilitar(true);
            $("#BtnEditar").byaSetHabilitar(true);
            $("#BtnEliminar").byaSetHabilitar(true);
        }
    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID', type: 'string' },
                    { name: 'VIGENCIA', type: 'string' },
                    { name: 'UNSPSC', type: 'string' },
                    { name: 'DESCRIPCION', type: 'string' },
                    { name: 'FEC_EST_INI' },
                    { name: 'PLA1_EJE' },
                    { name: 'TIP1_PLA' },
                    { name: 'PLA2_EJE' },
                    { name: 'TIP2_PLA' },
                    { name: 'MOD_SEL' },
                    { name: 'FUE_SEL' },
                    { name: 'VAL_TOT_EST', type: 'string' },
                    { name: 'VAL_VIG_EST', type: 'string' },
                    { name: 'VIG_FUT' },
                    { name: 'EST_SOL_VF' },
                    { name: 'DAT_RESPONSABLE' }          
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon + "?ID_EP_MPAA=" + idMPAA + "&Vigencia=" + byaSite.getVigencia(),
            data: { }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        return dataAdapter;
    };
    var getDataAdapter2 = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID', type: 'string' },
                    { name: 'VIGENCIA', type: 'string' },
                    { name: 'UNSPSC', type: 'string' },
                    { name: 'DESCRIPCION', type: 'string' },
                    { name: 'FEC_EST_INI' },
                    { name: 'PLA1_EJE' },
                    { name: 'TIP1_PLA' },
                    { name: 'PLA2_EJE' },
                    { name: 'TIP2_PLA' },
                    { name: 'MOD_SEL' },
                    { name: 'FUE_SEL' },
                    { name: 'VAL_TOT_EST', type: 'string' },
                    { name: 'VAL_VIG_EST', type: 'string' },
                    { name: 'VIG_FUT' },
                    { name: 'EST_SOL_VF' },
                    { name: 'DAT_RESPONSABLE' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon2 + "?ID=" + $("#txtNumero").val() + "&CodDep=" + $("#cboFiltroDependencia").val() + "&Vigencia=" + byaSite.getVigencia(),
            data: {} // aca van los parametros
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        return dataAdapter;
    };
    var _createGridCon = function () {
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: getDataAdapter(),
                        theme: gPAA.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Id', datafield: 'ID', width: 130, filtertype: 'textbox' },
                        { text: 'Vigencia', datafield: 'VIGENCIA', width: 80, filtertype: 'textbox' },
                        //{ text: 'UNSPSC', datafield: 'UNSPSC', width: 150, filtertype: 'textbox' },
                        //{ text: 'Fch. Estimada inicio', datafield: 'FEC_EST_INI', width: 150 },
                        //{ text: 'Modalidad de seleccion', datafield: 'MOD_SEL', width: 180 },
                        //{ text: 'Fuente Recursos', datafield: 'FUE_SEL', width: 150 },
                        { text: 'Descripcion', datafield: 'DESCRIPCION', width: 450, filtertype: 'textbox' },
                        { text: 'Valor Total Estimado', datafield: 'VAL_TOT_EST', width: 150, filtertype: 'textbox' },
                        { text: 'Valor Estimado Vigencia', datafield: 'VAL_VIG_EST', width: 170, filtertype: 'textbox' }
                        //{ text: 'Vigencias Futuras', datafield: 'VIG_FUT', width: 150 },
                        //{ text: 'Estado Solicitud Vigencias Futuras', datafield: 'EST_SOL_VF', width: 150 },
                        //{ text: 'Datos de contacto del responsable', datafield: 'DAT_RESPONSABLE', width: 150 }
                        ]
                    });

    };
    var _createGridCon2 = function () {
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: getDataAdapter2(),
                        theme: gPAA.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Id', datafield: 'ID', width: 130, filtertype: 'textbox' },
                        { text: 'Vigencia', datafield: 'VIGENCIA', width: 80, filtertype: 'textbox' },
                        { text: 'UNSPSC', datafield: 'UNSPSC', width: 150, filtertype: 'textbox' },
                        //{ text: 'Fch. Estimada inicio', datafield: 'FEC_EST_INI', width: 150 },
                        //{ text: 'Modalidad de seleccion', datafield: 'MOD_SEL', width: 180 },
                        //{ text: 'Fuente Recursos', datafield: 'FUE_SEL', width: 150 },
                        { text: 'Descripcion', datafield: 'DESCRIPCION', width: 450, filtertype: 'textbox' },
                        { text: 'Valor Total Estimado', datafield: 'VAL_TOT_EST', width: 150, filtertype: 'textbox' },
                        { text: 'Valor Estimado Vigencia', datafield: 'VAL_VIG_EST', width: 170, filtertype: 'textbox' }
                        //{ text: 'Vigencias Futuras', datafield: 'VIG_FUT', width: 150 },
                        //{ text: 'Estado Solicitud Vigencias Futuras', datafield: 'EST_SOL_VF', width: 150 },
                        //{ text: 'Datos de contacto del responsable', datafield: 'DAT_RESPONSABLE', width: 150 }
                        ]
                    });

    };
    return {
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        Vigencia: function () {
            return byaSite.getVigencia();
        },
        getRecord: function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            //alert(JSON.stringify(dataRecord));
            return dataRecord;
        },
        refresh: function () {
            $(gridCon).jqxGrid({ source: getDataAdapter() });
        },
        init: function () {
            idMPAA = $.getUrlVar('IdMPaa');
            _createElements();
            _addHandlers();
            _createGridCon();
        }
    };
}());


$(function () {
    byaSite.SetModuloP({ TituloForm: "PLAN ANUAL DE ADQUISICIÓN (PAA)", Modulo: "Gestión", urlToPanelModulo: "/EstPrev/MPAA/gMPAA.aspx", Cod_Mod: "SOLI4", Rol: "PR_RECEP" });
    gPAA.config.theme = byaSite.tema
    gPAA.init();
});