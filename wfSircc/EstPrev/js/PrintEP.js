var admDoc = (function () {
    "use strict";
    var tema;
    var Clausula = {};
    //var urlToClausulas = '/Servicios/Procesos/wsMinutas.asmx/GetPClausulasEP';
    var urlToClausulas = '/Servicios/EstPrev/wsGesEstPrev.asmx/GetClausulas';
    
    var urlToESTPREV = '/Servicios/EstPrev/wsGesEstPrev.asmx/GetDatos';
    var sourceESTPREV;
    var sourceClausulas;
    var CboClausulas = {};
    var editor;

    var camposDoc= byaSite.getCamposHtml();
    var lstCampos = byaSite.getPlantillasCampos();
    
    //var lstCampos = [
    //                { Nom_Pla: "DEP_SOLICITANTE", Nom_Cam: "NOM_DEP_NEC_EP" },
    //                { Nom_Pla: "CLASE_CONTRATO", Nom_Cam: "CLASE_CONT" },
    //                { Nom_Pla: "OBJETO", Nom_Cam: "OBJE_EP" },
    //                { Nom_Pla: "VAL_APORTES_PROPIOS", Nom_Cam: "VAL_ENT_EP" },
    //                { Nom_Pla: "VAL_APORTES_OTROS", Nom_Cam: "VAL_OTR_EP" },
    //                { Nom_Pla: "VALOR_A_CONTRATAR", Nom_Cam: "VALOR_TOTALC" },
    //                { Nom_Pla: "TOTAL_LETRAS", Nom_Cam: "VAL_TOTAL_LETRAS" },
    //                { Nom_Pla: "PLAZO_EJECUCIÓN", Nom_Cam: "PLAZO_EP" },
    //                { Nom_Pla: "LUGAR_EJECUCION", Nom_Cam: "LUGE_EP" },
    //                { Nom_Pla: "PLAZO_LIQUIDACION", Nom_Cam: "PLIQ_EP" },
    //                { Nom_Pla: "DEP_SUPERVISION", Nom_Cam: "NOM_DEP_SUP_EP" },
    //                { Nom_Pla: "POLIZAS", Nom_Cam: "POLIZAS" },
    //                { Nom_Pla: "CDP", Nom_Cam: "CDP" },
    //                { Nom_Pla: "OBLIG_CTISTA", Nom_Cam: "OBLIGACIONESC" },
    //                { Nom_Pla: "OBLIG_ENTIDAD", Nom_Cam: "OBLIGACIONESE" },
    //                { Nom_Pla: "FEC_ELABORACION", Nom_Cam: "sFEC_ELA_EP" },
    //                { Nom_Pla: "DEPENDENCIA_SUPERVISOR", Nom_Cam: "NOM_DEP_SUP_EP" },
    //                { Nom_Pla: "NOM_RESPONSABLE_EP", Nom_Cam: "RESPONSABLE_EP" },
    //                { Nom_Pla: "NOM_DILIGENCIADO_POR", Nom_Cam: "DILIGENCIADO_POR" },
    //                { Nom_Pla: "FORMA_PAGO", Nom_Cam: "sFORMA_PAGO" },
    //                { Nom_Pla: "PROYECTO_PLAN_C", Nom_Cam: "sBANCO_PROY" },
    //                { Nom_Pla: "LOGO", Nom_Cam: "LOGO" },
    //                { Nom_Pla: "PROYECTOS", Nom_Cam: "sBANCO_PROY" },
                    
    //                { Nom_Pla: "NECESIDAD", Nom_Cam: "NEC_EP" },
    //                { Nom_Pla: "VARIABLES_PPTO", Nom_Cam: "VARIABLESPPTO_EP" },
                   
    //               { Nom_Pla: "OBLIG_GRAL_CTISTA", Nom_Cam: "OBLIGGRC" },
    //               { Nom_Pla: "OBLIG_GRAL_ENTIDAD", Nom_Cam: "OBLIGGRE" },
    //               { Nom_Pla: "JUSTIFICACION_VALOR", Nom_Cam: "JUST_VALOR_EP" },
    //               { Nom_Pla: "CAP_JURIDICA", Nom_Cam: "CAP_JURIDICA_EP" },
    //               { Nom_Pla: "CAP_FINANCIERA", Nom_Cam: "CAP_FINANCIERA_EP" },
    //               { Nom_Pla: "CAP_RESIDUAL", Nom_Cam: "CAP_RESIDUAL_EP" },
    //               { Nom_Pla: "PERSPECTIVA_LEGAL", Nom_Cam: "PERS_LEGAL_EP" },
    //               { Nom_Pla: "PERSPECTIVA_ORGANIZACIONAL", Nom_Cam: "PERS_ORGA_EP" },
    //               { Nom_Pla: "EXPERIENCIA", Nom_Cam: "CAP_EXPERIENCA_EP" },
    //               { Nom_Pla: "NEC_INTERVENTOR_EXTERNO", Nom_Cam: "NEC_CONT_INT_EP" },
    //               { Nom_Pla: "ACUERDO_COMERCIAL", Nom_Cam: "SOM_ACUE_COMER_EP" },
    //               { Nom_Pla: "CONSTANCIA_CUMPLIMIENTO", Nom_Cam: "CONST_CUMP_DEBERES_EP" },
    //               { Nom_Pla: "IDENTIFICACION_SUPERVISOR", Nom_Cam: "IDE_SUP_EP" },
    //               { Nom_Pla: "NOMBRE_SUPERVISOR", Nom_Cam: "NOM_SUP_EP" },
    //               { Nom_Pla: "CARGO_SUPERVISOR", Nom_Cam: "CAR_SUP_EP" },
    //               { Nom_Pla: "TIPO_PPTO", Nom_Cam: "NOM_TIPO_PPTO" },
    //               { Nom_Pla: "PAA_CODIGO", Nom_Cam: "PAAID" },
    //               { Nom_Pla: "PAA_DESCRIPCION", Nom_Cam: "PAADESC" },
    //               { Nom_Pla: "ESPECIFICACIONES_OBJETO", Nom_Cam: "ESP_OBJ_EP" },
    //               { Nom_Pla: "AUT_PER_LIC", Nom_Cam: "AUTPERLIC_EP" },
    //               { Nom_Pla: "DOCUMENTOS_TECNICOS", Nom_Cam: "DOCTECNICOS_EP" },
    //               { Nom_Pla: "IDONEIDAD", Nom_Cam: "IDONEIDAD_EP" },
    //               { Nom_Pla: "CAP_ORGANIZACIONAL", Nom_Cam: "CAP_ORGANIZACIONAL_EP" },
    //               { Nom_Pla: "FAC_EVALUACION", Nom_Cam: "FACTORES_EVALUACION_EP" },
    //               { Nom_Pla: "REGLAS_DESEMPATES", Nom_Cam: "REGLAS_DESEMPATE_EP" },
    //               { Nom_Pla: "UNSPSC", Nom_Cam: "UNSPSC" },
    //               { Nom_Pla: "PLAZO_LIQUIDACION_TEXTO", Nom_Cam: "PLIQ_LETRAS_EP" },
    //               { Nom_Pla: "ENTIDAD", Nom_Cam: "NOM_ENTIDAD" },
    //               { Nom_Pla: "MODALIDAD_SELECCION", Nom_Cam: "MOD_SEL_EP" }
                   
    //               //MODALIDAD_SELECCION
        
                   
    //];
    //var camposDoc = [
    //       { text: "OBJETO", value: "{OBJETO}" },
    //       { text: "LUGAR_EJECUCION", value: "{LUGAR_EJECUCION}" },
    //       { text: "VALOR_A_CONTRATAR", value: "{VALOR_A_CONTRATAR}" },
    //       { text: "PLAZO_EJECUCIÓN", value: "{PLAZO_EJECUCIÓN}" },
    //       { text: "VAL_APORTES_PROPIOS", value: "{VAL_APORTES_PROPIOS}" },
    //       { text: "DEP_SOLICITANTE", value: "{DEP_SOLICITANTE}" },
    //       { text: "OBLIG_CTISTA", value: "{OBLIG_CTISTA}" },
    //       { text: "OBLIG_ENTIDAD", value: "{OBLIG_ENTIDAD}" },
    //       { text: "VALOR_TOTAL", value: "{VALOR_TOTAL}" },
    //       { text: "PLAZO_LIQUIDACION", value: "{PLAZO_LIQUIDACION}" },
    //       { text: "TOTAL_LETRAS", value: "{TOTAL_LETRAS}" },
    //       { text: "DEPENDENCIA_SUPERVISOR", value: "{DEPENDENCIA_SUPERVISOR}" },
    //       { text: "POLIZAS", value: "{POLIZAS}" },
    //       { text: "CDP", value: "{CDP}" },
    //       { text: "CLASE_CONTRATO", value: "{CLASE_CONTRATO}" },
    //       { text: "FEC_ELABORACION", value: "{FEC_ELABORACION}" },
    //       { text: "CDP", value: "{CDP}" },
    //       { text: "DEP_SUPERVISION", value: "{DEP_SUPERVISION}" },
    //       { text: "NOM_RESPONSABLE_EP", value: "{NOM_RESPONSABLE_EP}" },
    //       { text: "NOM_DILIGENCIADO_POR", value: "{NOM_DILIGENCIADO_POR}" },
    //       { text: "FORMA_PAGO", value: "{FORMA_PAGO}" },
    //       { text: "PROYECTO_PC", value: "{PROYECTO_PLAN_C}" },

           
    //       { text: "PROYECTOS", value: "{PROYECTOS}" },
    //       { text: "NECESIDAD", value: "{NECESIDAD}" },
    //       { text: "VARIABLES_PPTO", value: "{VARIABLES_PPTO}" },
    //       { text: "OBLIG_GRAL_CTISTA", value: "{OBLIG_GRAL_CTISTA}" },
    //       { text: "OBLIG_GRAL_ENTIDAD", value: "{OBLIG_GRAL_ENTIDAD}" },
    //       { text: "JUSTIFICACION_VALOR", value: "{JUSTIFICACION_VALOR}" },
    //       { text: "CAP_JURIDICA", value: "{CAP_JURIDICA}" },
    //       { text: "CAP_FINANCIERA", value: "{CAP_FINANCIERA}" },
    //       { text: "CAP_RESIDUAL", value: "{CAP_RESIDUAL}" },
    //       { text: "PERS_LEGAL", value: "{PERS_LEGAL}" },
    //       { text: "PERS_ORGA_EP", value: "{PERS_ORGA_EP}" },
    //       { text: "EXPERIENCIA", value: "{EXPERIENCIA}" },
    //       { text: "NEC_INTERVENTOR_EXTERNO", value: "{NEC_INTERVENTOR_EXTERNO}" },
    //       { text: "ACUERDO_COMERCIAL", value: "{ACUERDO_COMERCIAL}" },
    //       { text: "CONSTANCIA_CUMPLIMIENTO", value: "{CONSTANCIA_CUMPLIMIENTO}" },
    //       { text: "IDENTIFICACION_SUPERVISOR", value: "{IDENTIFICACION_SUPERVISOR}" },
    //       { text: "NOMBRE_SUPERVISOR", value: "{NOMBRE_SUPERVISOR}" },
    //       { text: "TIPO_PPTO", value: "{TIPO_PPTO}" },
    //       { text: "PAA_CODIGO", value: "{PAA_CODIGO}" },
    //       { text: "PAA_DESCRIPCION", value: "{PAA_DESCRIPCION}" },
    //       { text: "ESPECIFICACIONES_OBJETO", value: "{ESPECIFICACIONES_OBJETO}" },
    //       { text: "AUT_PER_LIC", value: "{AUT_PER_LIC}" },
    //       { text: "DOCUMENTOS_TECNICOS", value: "{DOCUMENTOS_TECNICOS}" },
    //       { text: "IDONEIDAD", value: "{IDONEIDAD}" },
    //       { text: "CAP_ORGANIZACIONAL", value: "{CAP_ORGANIZACIONAL}" },
    //       { text: "FAC_EVALUACION", value: "{FAC_EVALUACION}" },
    //       { text: "REGLAS_DESEMPATES", value: "{REGLAS_DESEMPATES}" },
    //       { text: "UNSPSC", value: "{UNSPSC}" },
    //       { text: "CARGO_SUPERVISOR", value: "{CARGO_SUPERVISOR}" },
    //       { text: "PLAZO_LIQUIDACION_TEXTO", value: "{PLAZO_LIQUIDACION_TEXTO}" },
    //       { text: "ENTIDAD", value: "{ENTIDAD}" },
    //       { text: "MODALIDAD_SELECCION", value: "{MODALIDAD_SELECCION}" }

    
           
       
    //];
    



    var _addHandlers = function () {
        $('#dvdClausulaEdit').blur(function () {
            Clausula.CLA_TEXTO = $('#dvdClausulaEdit').html();
            Clausula.IS_MODIF = true;
            Clausula.CLA_CRUZADA = ReemplazarCampos(Clausula);
            $('#dvdClausulaEdit').html(Clausula.CLA_CRUZADA);
            $('#dvdTitulo').html(Clausula.TITULO);
            GenerarVistaPrevia();
        });
        $('#dvdClausulaEdit').focus(function () {
            Clausula = CboClausulas.getSeleccionado();
            $('#dvdClausulaEdit').html(Clausula.CLA_TEXTO);
            $('#dvdTitulo').html(Clausula.TITULO);
        });
        $("#CboClausulas").change(function () {
            Clausula = CboClausulas.getSeleccionado();
            Clausula.CLA_CRUZADA = ReemplazarCampos(Clausula);
            $('#dvdClausulaEdit').html(Clausula.CLA_CRUZADA);
            $('#dvdTitulo').html(Clausula.TITULO);
        });
    };

    var ReemplazarCampos = function (lClausula) {
        //alert(JSON.stringify(sourceESTPREV));
        var Previo = lClausula.CLA_TEXTO;
        $.each(lstCampos, function (index, item) {
            /*if (item.Nom_Pla == "ENTIDAD") {
                alert(sourceESTPREV[item.Nom_Cam] + "-" + item.Nom_Cam);
            }*/
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
        sourceESTPREV = byaPage.getSource(urlToESTPREV, { codigo_ep: '"' + admDoc.getCodigoEP() + '"' }); //carga datos de la base de datos
        //$("#dvdJSON").text(JSON.stringify(sourceESTPREV));
        $.each(lstCampos, function (index, item) {
            $("#idDatos").append('<div class="profile-info-row"><div class="profile-info-name"> ' + item.Nom_Pla + ' </div><div class="profile-info-value"><span class="editable" id="username">' + sourceESTPREV[item.Nom_Cam] + '</span></div></div>');
        });
        CboClausulas = new byaComboBox();
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
        getCodigoEP: function () {
            return $.getUrlVar('id_ep');
        },
        init: function () {
            tema = byaSite.tema;
            _createElements();
            _addHandlers();
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
        setDATOS: function () {
            CboClausulas = new byaComboBox();
            sourceClausulas = byaPage.getSource(urlToClausulas, { Codigo_EP:"'" + admDoc.getCodigoEP() +"'"});
            CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
            sourceESTPREV = byaPage.getSource(urlToESTPREV, { codigo_ep: "'" + admDoc.getCodigoEP() + "'" }); //carga datos de la base de datos
            GenerarVistaPrevia();
        }

    };
}());

$(function () {
    admDoc.config.theme = byaSite.tema;
    admDoc.init();
    admDoc.setDATOS();
});
