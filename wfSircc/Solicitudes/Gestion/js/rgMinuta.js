
var admDoc = (function () {
    "use strict";
    var tema;
    var Clausula = {};
    var urlToClausulas = '/Servicios/Procesos/wsMinutas.asmx/GetPClausulas';
    var urlToDATOS = '/Servicios/Procesos/wsMinutas.asmx/GenDatosMin';
    var urlToGuardar = '/Servicios/Procesos/wsMinutas.asmx/GuardarM';
    var num_pro;
    
    var sourceESTPREV;
    var CboClausulas = {};
    var editor;

    var lstCampos = [
                    //{ Nom_Pla: "DEP_SOLICITANTE", Nom_Cam: "NOM_DEP_NEC_EP" },
                    { Nom_Pla: "CLASE_CONTRATO", Nom_Cam: "CLASE_CONT" },
                    { Nom_Pla: "OBJETO", Nom_Cam: "OBJE_EP" },
                    { Nom_Pla: "VAL_APORTES_PROPIOS", Nom_Cam: "VAL_ENT_EP" },
                    { Nom_Pla: "VAL_APORTES_OTROS", Nom_Cam: "VAL_OTR_EP" },
                    { Nom_Pla: "VALOR_A_CONTRATAR", Nom_Cam: "VALOR_TOTALC" },
                    { Nom_Pla: "TOTAL_LETRAS", Nom_Cam: "VAL_TOTAL_LETRAS" },
                    { Nom_Pla: "PLAZO_EJECUCIÓN", Nom_Cam: "PLAZO_EP" },
                    { Nom_Pla: "LUGAR_EJECUCION", Nom_Cam: "LUGE_EP" },
                    { Nom_Pla: "PLAZO_LIQUIDACION", Nom_Cam: "PLIQ_EP" },
                    { Nom_Pla: "DEP_SUPERVISION", Nom_Cam: "NOM_DEP_SUP_EP" },
                    { Nom_Pla: "POLIZAS", Nom_Cam: "POLIZAS" },
                    { Nom_Pla: "CDP", Nom_Cam: "CDP" },
                    { Nom_Pla: "OBLIG_CTISTA", Nom_Cam: "OBLIGACIONESC" },
                    { Nom_Pla: "OBLIG_ENTIDAD", Nom_Cam: "OBLIGACIONESE" },
                    { Nom_Pla: "FEC_ELABORACION", Nom_Cam: "sFEC_ELA_EP" },
                    { Nom_Pla: "DEP_SUPERVISION", Nom_Cam: "NOM_DEP_SUP_EP" },
                    { Nom_Pla: "NOM_RESPONSABLE_EP", Nom_Cam: "RESPONSABLE_EP" },
                    { Nom_Pla: "NOM_DILIGENCIADO_POR", Nom_Cam: "DILIGENCIADO_POR" },
                    { Nom_Pla: "FORMA_PAGO", Nom_Cam: "sFORMA_PAGO" },
                    { Nom_Pla: "PROYECTO_PLAN_C", Nom_Cam: "sBANCO_PROY" },
                    { Nom_Pla: "LOGO", Nom_Cam: "LOGO" },
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
           { text: "FEC_ELABORACION", value: "{FEC_ELABORACION}" },
           { text: "CDP", value: "{CDP}" },
           { text: "DEP_SUPERVISION", value: "{DEP_SUPERVISION}" },
           { text: "NOM_RESPONSABLE_EP", value: "{NOM_RESPONSABLE_EP}" },
           { text: "NOM_DILIGENCIADO_POR", value: "{NOM_DILIGENCIADO_POR}" },
           { text: "FORMA_PAGO", value: "{FORMA_PAGO}" },
           { text: "PROYECTO_PC", value: "{PROYECTO_PLAN_C}" }

    ];



    var _addHandlers = function () {
        $('#dvdClausulaEdit').blur(function () {
            Clausula.CLA_TEXTO = $('#dvdClausulaEdit').html();
            Clausula.IS_MODIF = true;
            Clausula.CLA_CRUZADA = ReemplazarCampos(Clausula);
            $('#dvdClausulaEdit').html(Clausula.CLA_CRUZADA);
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
        
        $("#btnPrint").click(function () {
            window.open('printMinuta.aspx?num_pro=' + admDoc.getNumPro(), '_blank');
        });
        $("#CboClausulas").change(function () {
            Clausula = CboClausulas.getSeleccionado();
            Clausula.CLA_CRUZADA = ReemplazarCampos(Clausula);
            $('#dvdClausulaEdit').html(Clausula.CLA_CRUZADA);
            $('#dvdTitulo').html(Clausula.TITULO);
            //$('#dvdClausulaHTML').val(Clausula.CLA_TEXTO);
            //$('#dvdClausulaPreview').html(ReemplazarCampos(Clausula));

        });
        $("#guardarButton").click(function () {
            //",'Num_Pro':'" + num_pro + "'
            var jsonData = "{'lst':" + JSON.stringify(admDoc.getDATOS()) +"}";
            byaPage.POST_Sync(urlToGuardar, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                if (!byaRpta.Error) {
                    $(msgPpal).msgBox({ titulo: "Guardando Minuta", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                } else {
                    $(msgPpal).msgBox({ titulo: "Guardando Minuta", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                }
            });
            
        });
        $("#cancelarButton").click(function () {
            //byaSite.printDiv("dvdPrint");
        });
    };

    var ReemplazarCampos = function (lClausula) {
        //alert(JSON.stringify(sourceESTPREV));
        var Previo = lClausula.CLA_TEXTO;
        $.each(lstCampos, function (index, item) {
            if (Previo != null) {
                Previo = Previo.str_replace('{' + item.Nom_Pla + '}', sourceESTPREV[item.Nom_Cam]);
            }
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
        $("#txtNumero").val(admDoc.getNumPro());
        num_pro = "'" + $("#txtNumero").val() + "'";
        //num_pro = "'CCMM-SGR-0001-2013'";
        var sourceClausulas = byaPage.getSource(urlToClausulas, { Num_Pro:  num_pro  });
        sourceESTPREV = byaPage.getSource(urlToDATOS, { num_pro: num_pro }); //carga datos de la base de datos
        $.each(lstCampos, function (index, item) {
            $("#idDatos").append('<div class="profile-info-row"><div class="profile-info-name"> ' + item.Nom_Pla + ' </div><div class="profile-info-value"><span class="editable" id="username">' + sourceESTPREV[item.Nom_Cam] + '</span></div></div>');
        });
        CboClausulas = new byaComboBox();
        //inicializar el objeto
        CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
        // $('#dvdEdicion *').prop("contentEditable", "true");
        $('#myTab a:first').tab('show');
        GenerarVistaPrevia();
        crearEditor();
        

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
            tema = byaSite.tema;
            _createElements();
            _addHandlers();
            //_createGridCon();
        },
        getDATOS: function () {
            var ClausulaDTO = new Array();
            var i = 0;
            $.each(CboClausulas.getSource(), function (index, dto) {
                var ent = new Object();
                ent.ID = dto.ID;
                ent.CLA_CAM = dto.CLA_CAM;
                ent.ORDEN = dto.ORDEN;
                ent.TIP_PAR = dto.TIP_PAR;
                ent.CLA_NUM = dto.CLA_NUM;
                ent.CLA_PAR = dto.CLA_PAR;
                ent.CLA_TEXTO = dto.CLA_TEXTO;
                ent.CLA_TIT = dto.CLA_TIT;
                ent.TIP_PLA = dto.TIP_PLA;
                ent.IS_ENTER_FINAL = dto.IS_ENTER_FINAL;
                ent.IDE_PMIN = dto.IDE_PMIN;
                ent.ID_PLA = dto.ID_PLA;
                ent.CLA_CRUZADA = ReemplazarCampos(dto);
                ClausulaDTO[i] = ent;
                i = i + 1;
            });

            return ClausulaDTO;
        },
        getNumPro: function () {
            return $.getUrlVar("num_pro");
        },
        setDATOS: function () {
            CboClausulas = new byaComboBox();
            var sourceClausulas = wizard.getDoc();//carga doc, actual
            CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
            sourceESTPREV = byaPage.getSource(urlToESTPREV, { codigo_ep: "'" + wizard.GetID() + "'" }); //carga datos de la base de datos
            GenerarVistaPrevia();
        }

    };
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Panel de Gestión de Solicitudes y Procesos", Modulo: "Procesos Precontractuales", urlToPanelModulo: "PanelMiGestion.aspx", Cod_Mod: "SOLI4", Rol: "PR_GEST" });
    admDoc.config.theme = byaSite.tema;
    admDoc.init();
});
