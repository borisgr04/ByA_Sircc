var gMinuta = (function () {
    "use strict";
    var TituloForm = "Elaborar Minuta";
    var urlToProceso = "/Servicios/wsProcesos.asmx/GetProceso";
    var urlToElaborarMinuta = "/Servicios/wsEstPrev.asmx/ElaborarMinuta";
    var urlToGetMinuta = "/Servicios/wsEstPrev.asmx/GetMinuta";
    var oNumeroProceso;
    var msgPpal = "#LbMsg";

    var _addHandlers = function () {
        $("#BtnEnviarElaborarMinuta").click(function () {
            ElaborarMinuta();
        });
        $("#btnAtras").click(function () {
            window.close();
        });
    };
    var TraerMinuta = function () {
        var Minuta = byaPage.getSource(urlToGetMinuta, { NUM_PROC: "'" + oNumeroProceso + "'" });
        $("#txtConsiderandos").html(Minuta.CONSIDERANDOS);
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

        $(".editorHtml").kendoEditor({
            tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "insertUnorderedList",
                "insertOrderedList",
                "indent",
                "outdent",



                "formatting",
                "cleanFormatting",
                "subscript",
                "superscript",
                "createTable",
                    "addColumnLeft",
                    "addColumnRight",
                    "addRowAbove",
                    "addRowBelow",
                    "deleteRow",
                    "deleteColumn",
                "viewHtml",
                "formatting",
                "cleanFormatting",
                "fontName",
                "fontSize"


            ]
            //"insertImage",
            //"insertFile",
            //"insertHtml",
            //"foreColor",
            //"backColor"
            //"createLink",
            //"unlink",
        });
        TraerMinuta();
    };
    var _getDatos = function () {
        var e = {};
        e.NUM_PROC = oNumeroProceso;
        e.CONSIDERANDOS = $("#txtConsiderandos").html();
        return e;
    };
    var ElaborarMinuta = function () {
        var jsonData = "{'Reg':" + JSON.stringify(_getDatos()) + "}";
        byaPage.POST_Sync(urlToElaborarMinuta, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Elaborar minuta", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
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
        }
    };
}());
$(function () {
    byaSite.SetModuloP({ TituloForm: "Elaborar Minuta", Modulo: "Gestión", urlToPanelModulo: "ElaborarMinuta.aspx", Cod_Mod: "SOLI4", Rol: "PR_RECEP" });
    gMinuta.config.theme = byaSite.tema
    gMinuta.init();
});