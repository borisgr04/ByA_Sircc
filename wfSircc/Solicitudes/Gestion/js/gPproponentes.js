var gProponentes = (function () {
    "use strict";
    var TituloForm = "Proponentes";
    var gridCon = '#jqxgridProponentes';
    var urlToGridCon = "../../Servicios/wsProponentes.asmx/Gets";
    var urlToAdjudicar = "../../Servicios/wsProponentes.asmx/AdjudicarOrNot";
    var urlToProceso = "/Servicios/wsProcesos.asmx/GetProceso";
    var urlToDeleteProponente = "/Servicios/wsProponentes.asmx/DeleteProponente";
    var oNumeroProceso;
    var msgPpal = "#LbMsg";

    var _addHandlers = function () {
        $("#btnAtras").click(function () {
            history.back();
        });
        $("#BtnNuevo").click(function () {
            window.location.href = "Pproponentes.aspx" + "?NumProc=" + oNumeroProceso;
        });
        $("#BtnEditar").click(function () {
            var obj = gProponentes.getRecord();
            window.location.href = "Pproponentes.aspx" + "?NumProc=" + oNumeroProceso + "&IdProponente=" + obj.ID;
        });
        $("#btnAgregarMiembros").click(function () {
            var item = gProponentes.getRecord();
            if (item != null) {
                if ((item.TIPO_PROP == "UT") || (item.TIPO_PROP == "CS")) {
                    window.location.href = "gMiembrosProponente.aspx?idProp=" + item.ID + "&idTerc=" + item.IDE_PROP;
                } else {
                    $(msgPpal).msgBox({ titulo: "Gestión Proponentes", mensaje: "El proponente seleccionado no fue creado como consorcio o union temporal, por lo tanto no es posible agregarle los miembros", tipo: false });
                }
            } else {
                $(msgPpal).msgBox({ titulo: "Gestión Proponentes", mensaje: "Seleccione uno de los proponentes para poder adicionar los miembros", tipo: false });
            }
        });
        $("#btnAdjudicar").click(function () {
            var item = gProponentes.getRecord();
            $("#txtIdProponenteAdjudicar").val(item.ID);
            $("#cboAdjudicado").val(item.ADJUDICADO);
            var fec = new Date(item.FEC_ADJUDICACION);
            $("#txtFechaAdjudicado").val(byaPage.FechaShortX(fec));
            $("#txtObservacionAdjudicacion").val(item.OBS_ADJUDICACION);

            if ($("#cboAdjudicado").val() == "N") {
                $("#txtFechaAdjudicado").val("");
                $("#txtObservacionAdjudicacion").val("");
                $("#txtFechaAdjudicado").byaSetHabilitar(false);
                $("#txtObservacionAdjudicacion").byaSetHabilitar(false);
            } else {
                $("#txtFechaAdjudicado").byaSetHabilitar(true);
                $("#txtObservacionAdjudicacion").byaSetHabilitar(true);
            }

            $("#modalAdjudicar").modal("show");
        });
        $("#btnGuardarAdjudicado").click(function () {
            var record = gProponentes.getRecord();
            if(confirm("Esta seguro que desea adjudicar el proceso al proponente " + record.NOMBRE + "?")) AdjudicarOrNot();
        });
        $("#cboAdjudicado").change(function () {
            if ($(this).val() == "N") {

                $("#txtFechaAdjudicado").val("");
                $("#txtObservacionAdjudicacion").val("");
                $("#txtFechaAdjudicado").byaSetHabilitar(false);
                $("#txtObservacionAdjudicacion").byaSetHabilitar(false);
            } else{
                $("#txtFechaAdjudicado").byaSetHabilitar(true);
                $("#txtObservacionAdjudicacion").byaSetHabilitar(true);
            }
        });
        $("#btnVolverAtras").click(function () {
            history.back();
        });
        $("#BtnEliminar").click(function () {
            var record = gProponentes.getRecord();
            if (confirm("Esta seguro que desea Quitar al proponente " + record.NOMBRE + "?")) BorrarProponente(record.ID);
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
        $("#txtLaNumProc").html("<strong>Proceso:  </strong>" + oNumeroProceso);


        var sourceP = byaPage.getSource(urlToProceso, { Num_Pro: "'" + oNumeroProceso + "'" });

        var DataFields = [
                    { Titulo: 'Número', Campo: 'PRO_SEL_NRO', Tipo: 'S' },
                    { Titulo: 'Objeto', Campo: 'OBJ_CON', Tipo: 'S' },
                    { Titulo: 'Valor a Contratar', Campo: 'VAL_CON', Tipo: 'N' },
                    { Titulo: 'Estado', Campo: 'NOM_EST_PROC', Tipo: 'S' },
                    { Titulo: 'Dep. Necesidad', Campo: 'DEP_CON_NOM', Tipo: 'S' },
                    { Titulo: 'Dep. Delegada', Campo: 'DEP_PCON_NOM', Tipo: 'S' },
                    { Titulo: 'Modalidad', Campo: 'COD_TPRO_NOM', Tipo: 'S' },
                    { Titulo: 'Tipo', Campo: 'TIP_CON_NOM', Tipo: 'S' },
                    { Titulo: 'Sub Tipo', Campo: 'STIP_CON_NOM', Tipo: 'S' },
                    { Titulo: 'Encargado', Campo: 'NOM_ABOG_ENC', Tipo: 'S' }
                    //{ Titulo: 'Contratista(F)', Campo: 'NOM_CONTRATISTA', Tipo: 'S' }
        ];
        var Titulo = "INFORMACION DETALLADA DEL PROCESO";
        $('#dvdProc').DetailsJSON(sourceP, DataFields, Titulo);
        $(".Nproc").html(oNumeroProceso);


    };
    var getDataAdapter = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID', type: 'string' },
                    { name: 'NUM_PROC', type: 'string' },
                    { name: 'NOMBRE', type: 'string' },
                    { name: 'FEC_PROP', type: 'string' },
                    { name: 'ADJUDICADO', type: 'string' },
                    { name: 'VAL_PROP', type: 'number' },
                    { name: 'IDE_PROP', type: 'string' },
                    { name: 'TIPO_PROP', type: 'string' },
                    { name: 'APE1_PROP', type: 'string' },
                    { name: 'APE2_PROP', type: 'string' },
                    { name: 'NOM1_PROP', type: 'string' },
                    { name: 'NOM2_PROP', type: 'string' },
                    { name: 'TIP_PER_PROP', type: 'string' },
                    { name: 'DIR_PROP', type: 'string' },
                    { name: 'TEL_PROP', type: 'string' },
                    { name: 'EMA_PROP', type: 'string' },
                    { name: 'FEC_ADJUDICACION', type: 'string' },
                    { name: 'OBS_ADJUDICACION', type: 'string' }
            ],
            async: false,
            record: 'Table',
            url: urlToGridCon + "?NumeroProceso=" + "'" + oNumeroProceso + "'",
            data: {}
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        return dataAdapter;
    };
    var _createGridCon = function () {
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: getDataAdapter(),
                        theme: gProponentes.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Id', datafield: 'ID', width: 70, filtertype: 'textbox' },
                        { text: 'Fecha Entrega', datafield: 'FEC_PROP', width: 150, filtertype: 'textbox' },
                        { text: 'Valor', datafield: 'VAL_PROP', width: 150, filtertype: 'textbox', cellsformat: 'F2', cellsalign: 'right'  },
                        { text: 'Adjudicado', datafield: 'ADJUDICADO', width: 100, filtertype: 'textbox' },
                        { text: 'Id. Proponente', datafield: 'IDE_PROP', width: 150, filtertype: 'textbox' },
                        { text: 'Tipo', datafield: 'TIPO_PROP', width: 60, filtertype: 'textbox' },
                        //{ text: 'Primer Apellido', datafield: 'APE1_PROP', width: 150, filtertype: 'textbox' },
                        //{ text: 'Segundo Apellido', datafield: 'APE2_PROP', width: 150, filtertype: 'textbox' },
                        //{ text: 'Primer Nombre', datafield: 'NOM1_PROP', width: 150, filtertype: 'textbox' },
                        //{ text: 'Segundo Nombre', datafield: 'NOM2_PROP', width: 150, filtertype: 'textbox' },
                        { text: 'Nombre', datafield: 'NOMBRE', width: 200, filtertype: 'textbox' },
                        { text: 'Direccion', datafield: 'DIR_PROP', width: 150, filtertype: 'textbox' },
                        { text: 'Telefono', datafield: 'TEL_PROP', width: 150, filtertype: 'textbox' },
                        { text: 'Email', datafield: 'EMA_PROP', width: 150, filtertype: 'textbox' }
                        ]
                    });        
    };
    var VerificarSiProcesoEstaAdjudicado = function () {
        var records = $(gridCon).jqxGrid('getrows');
        $.each(records, function (index, item) {
            if (item.ADJUDICADO == "S") {
                $(msgPpal).msgBox({ titulo: "Gestión Proponentes", mensaje: "Este proceso ya fue adjudicado al proponente " + item.NOMBRE + ", solo podrá visualizar la información, si desea realizar alguna corrección comuníquese con el administrador", tipo: true });
                $("#BtnNuevo").byaSetHabilitar(false);
                $("#BtnEditar").byaSetHabilitar(false);
                $("#btnAgregarMiembros").byaSetHabilitar(false);
                $("#btnAdjudicar").byaSetHabilitar(false);
                $("#BtnEliminar").byaSetHabilitar(false);
            }
        });
    };
    var _getDatosAdjudicar = function () {
        var e = {}
        e.ID = $("#txtIdProponenteAdjudicar").val();
        e.ADJUDICADO = $("#cboAdjudicado").val();
        e.FEC_ADJUDICACION = $("#txtFechaAdjudicado").val();
        e.OBS_ADJUDICACION = $("#txtObservacionAdjudicacion").val();
        e.NUM_PROC = oNumeroProceso;
        return e;
    };
    var AdjudicarOrNot = function () {
        var jsonData = "{'oDto':" + JSON.stringify(_getDatosAdjudicar()) + "}";
        byaPage.POST_Sync(urlToAdjudicar, jsonData, function (result) {
            var res = byaPage.retObj(result.d);
            if (res.Error == false) {
                gProponentes.refresh();
                VerificarSiProcesoEstaAdjudicado();
            }
            $(msgPpal).msgBox({ titulo: "Proponentes", mensaje: res.Mensaje, tipo: !res.Error });            
            $("#modalAdjudicar").modal("hide");
        });
    };
    var BorrarProponente = function (IDPROPONENTE) {
        var jsonData = "{'ID' : '" + IDPROPONENTE + "' }";
        byaPage.POST_Sync(urlToDeleteProponente, jsonData, function (result) {
            var res = byaPage.retObj(result.d);
            if (res.Error == false) {
                gProponentes.refresh();
                VerificarSiProcesoEstaAdjudicado();
            }
            $(msgPpal).msgBox({ titulo: "Proponentes", mensaje: res.Mensaje, tipo: !res.Error });
        });
    };
    return {
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
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
            oNumeroProceso = $.getUrlVar('NumProc');
            if (oNumeroProceso != null) oNumeroProceso = byaPage.quitarNumeral(oNumeroProceso);
            _createElements();
            _addHandlers();
            _createGridCon();
            VerificarSiProcesoEstaAdjudicado();
        }
    };
}());
$(function () {
    byaSite.SetModuloP({ TituloForm: "Proponentes", Modulo: "Gestión", urlToPanelModulo: "GesMisProcesos.aspx", Cod_Mod: "SOLI4", Rol: "PR_RECEP" });
    gProponentes.config.theme = byaSite.tema
    gProponentes.init();
});