var EdicionMinuta = (function () {
    "use strict";
    var tema;
    var Clausula = {};
    var urlToClausulas = '/Servicios/Procesos/wsMinutas.asmx/GetPClausulasEP';
    var urlToESTPREV = '/Servicios/Procesos/wsMinutas.asmx/GenDatosMin';
    var sourceESTPREV;
    var CboClausulas = {};
    var editor;
    
    var lstCampos = [
                    { Nom_Pla: "DEP_SOLICITANTE", Nom_Cam: "NOM_DEP_NEC_EP" },
                    { Nom_Pla: "CLASE_CONTRATO", Nom_Cam: "CLASE_CONT" },
                    { Nom_Pla: "OBJETO", Nom_Cam: "OBJE_EP" },
                    { Nom_Pla: "VAL_APORTES_PROPIOS", Nom_Cam: "VAL_ENT_EP" },
                    { Nom_Pla: "VAL_APORTES_OTROS", Nom_Cam: "VAL_OTR_EP" },
                    { Nom_Pla: "VALOR_TOTAL", Nom_Cam: "VALOR_TOTALC" },
                    { Nom_Pla: "TOTAL_LETRAS", Nom_Cam: "VAL_TOTAL_LETRAS" },
                    { Nom_Pla: "PLAZO_EJECUCIÓN", Nom_Cam: "PLAZO_EP" },
                    { Nom_Pla: "LUGAR_EJECUCION", Nom_Cam: "LUGE_EP" },
                    { Nom_Pla: "PLAZO_LIQUIDACION", Nom_Cam: "PLIQ_EP" },
                    { Nom_Pla: "DEP_SUPERVISION", Nom_Cam: "NOM_DEP_SUP_EP" },
                    { Nom_Pla: "POLIZAS", Nom_Cam: "POLIZAS" },
                    { Nom_Pla: "CDP", Nom_Cam: "CDP" },
                    { Nom_Pla: "OBLIG_CTISTA", Nom_Cam: "OBLIGACIONESC" },
                    { Nom_Pla: "OBLIG_ENTIDAD", Nom_Cam: "OBLIGACIONESE" }


    ];
    var camposDoc = [
           { text: "OBJETO", value: "{OBJETO}" },
           { text: "LUGAR_EJECUCION", value: "{LUGAR_EJECUCION}" },
           { text: "VALOR_A_CONTRATAR", value: "{VALOR_A_CONTRATAR}" },
           { text: "PLAZO_EJECUCIÓN", value: "{PLAZO_EJECUCIÓN}" },
           { text: "VAL_APORTES_PROPIOS", value: "{VAL_APORTES_PROPIOS}" },
           { text: "DEP_SOLICITANTE", value: "{DEP_SOLICITANTE}" },
           { text: "OBLIG_CTISTA", value: "{OBLIG_CTISTA}" },
           { text: "OBLIG_ENTIDAD", value: "{OBLIG_ENTIDAD}" },
           { text: "VALOR_TOTAL", value: "{VALOR_TOTAL}" },
           { text: "PLAZO_LIQUIDACION", value: "{PLAZO_LIQUIDACION}" },
           { text: "TOTAL_LETRAS", value: "{TOTAL_LETRAS}" },
           { text: "DEP_SUPERVISION", value: "{DEP_SUPERVISION}" },
           { text: "POLIZAS", value: "{POLIZAS}" },
           { text: "CDP", value: "{CDP}" },
           { text: "CLASE_CONTRATO", value: "{CLASE_CONTRATO}" },
           { text: "CDP", value: "{CDP}" }

    ];

    var _addHandlers = function () {
        $('#dvdClausulaEdit').blur(function () {
            Clausula.CLA_TEXTO = $('#dvdClausulaEdit').html();
            Clausula.IS_MODIF = true;
            $('#dvdClausulaEdit').html(ReemplazarCampos(Clausula));
            $('#dvdTitulo').html(Clausula.TITULO);
            //$('#dvdClausulaHTML').val(Clausula.CLA_TEXTO);
            //$('#dvdClausulaPreview').html(ReemplazarCampos(Clausula));
            GenerarVistaPrevia();
        });
        $('#dvdClausulaEdit').focus(function () {
            Clausula = CboClausulas.getSeleccionado();
            $('#dvdClausulaEdit').html(Clausula.CLA_TEXTO);
            $('#dvdTitulo').html(Clausula.TITULO);
            //$('#dvdClausulaHTML').val(Clausula.CLA_TEXTO);
            //$('#dvdClausulaPreview').html(ReemplazarCampos(Clausula));

        });
        $("#CboClausulas").change(function () {
            Clausula = CboClausulas.getSeleccionado();
            $('#dvdClausulaEdit').html(ReemplazarCampos(Clausula));
            $('#dvdTitulo').html(Clausula.TITULO);
            //$('#dvdClausulaHTML').val(Clausula.CLA_TEXTO);
            //$('#dvdClausulaPreview').html(ReemplazarCampos(Clausula));

        });
        $("#guardarButton").click(function () {
            alert(Clausula.IS_MODIF);
        });
        $("#cancelarButton").click(function () {
            //byaSite.printDiv("dvdPrint");
            byaSite.printDiv("tabPreview");
        });
    };

    var ReemplazarCampos = function (lClausula) {

        var Previo = lClausula.CLA_TEXTO;
        $.each(lstCampos, function (index, item) {
            Previo = Previo.str_replace('{' + item.Nom_Pla + '}', sourceESTPREV[item.Nom_Cam]);
        });
        return Previo;
    };

    var GenerarVistaPrevia = function () {
        $("#dvdClausulaPreview").html('');
        $.each(CboClausulas.getSource(), function (index, item) {
            $("#dvdClausulaPreview").append(ReemplazarCampos(item));
        });
    }
    String.prototype.str_replace = function (buscar, reemplazar) {
        return this.replace(new RegExp(buscar, 'g'), reemplazar);
    };

    var _createElements = function () {
        var sourceClausulas = byaPage.getSource(urlToClausulas, { Num_Pro: "'XXXX'" });
        sourceESTPREV = byaPage.getSource(urlToESTPREV, { id_ep: 1 });
        //alert(JSON.stringify(sourceESTPREV));
        $.each(lstCampos, function (index, item) {
            $("#idDatos").append('<div class="profile-info-row"><div class="profile-info-name"> ' + item.Nom_Pla + ' </div><div class="profile-info-value"><span class="editable" id="username">' + sourceESTPREV[item.Nom_Cam] + '</span></div></div>');
        });
        CboClausulas = new byaComboBox();
        //inicializar el objeto
        CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
        // $('#dvdEdicion *').prop("contentEditable", "true");
        $('#myTab a:first').tab('show');
        crearEditor();
        GenerarVistaPrevia();
    };

    var crearEditor = function () {
        $("#dvdClausulaEdit").kendoEditor({
            tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "fontName",
                "fontSize",
                "insertHtml",
                "viewHtml"
            ], insertHtml: camposDoc
        });


        /*
        "formatting",
        "foreColor",
                    "backColor",
                    "subscript",
                    "superscript",
        "createTable",
                    "addColumnLeft",
                    "addColumnRight",
                    "addRowAbove",
                    "addRowBelow",
                    "deleteRow",
                    "deleteColumn",
                    "foreColor",
                    "backColor",
        */
    };


    return {
        editedRows: null,
        config: {
            theme: null
        },
        init: function () {
            tema = EdicionMinuta.config.theme;
            _createElements();
            _addHandlers();
            //_createGridCon();
        }
    };
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Panel de Gestión de Solicitudes y Procesos", Modulo: "Procesos Precontractuales", urlToPanelModulo: "PanelMiGestion.aspx", Cod_Mod: "SOLI4", Rol: "PR_GEST" });
    EdicionMinuta.config.theme = byaSite.tema;
    EdicionMinuta.init();
});
