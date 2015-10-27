var byaSite = new Object();
//bootstrap
var byaSite = {
    IntegradoCDP: true,
    IntegradoRP: false,
    showlog: true,
    tema: 'arctic',
    usuario: 'sircc_user',
    vigencia: 'sircc_vig',
    modulo: 'modulo',
    ModuloActual: null,
    OpcionActual: null,
    ModuloP: {
        TituloForm:null,
        Modulo: null,
        UrlToPanelModulo: null,
        Cod_Mod: null,
        Rol:null
    },
    formatNumerico : function (input) {
        var num = input;
        if (!isNaN(num)) {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            return num;
        }
        else {
            return "";
        }
    },
    getIntegradoCDP: function () {
        return this.IntegradoCDP;
    },
    setIntegradoCDP: function (value) {
        this.IntegradoCDP = value;
    },
    getIntegradoRP: function () {
        return this.IntegradoRP;
    },
    setIntegradoRP: function (value) {
        this.IntegradoRP = value;
    },
    cerrarSesion: function () {
        this.setVigencia('');
        this.setUsuario('');
    },
    SetModuloP: function (value) {
        this.ModuloP = value;
    },
    setModuloActual: function (value) {
        this.ModuloActual = value;
        //alert(this.ModuloActual);
    },
    setOpcionActual: function (value) {
        this.OpcionActual = value;
    },
    getModuloActual: function () {
        return this.ModuloActual;
    },
    getOpcionActual: function () {
        return this.OpcionActual;
    },
    setUsuario: function (username) {
        $.setCookie(byaSite.usuario, username);
    },
    getUsuario: function () {
        return $.getCookie(byaSite.usuario);
    },
    
    setVigencia: function (vigencia) {
        $.setCookie(byaSite.vigencia, vigencia);
    },
    getVigencia: function () {
        return $.getCookie(byaSite.vigencia);
    },
    setModulo: function (modulo) {
        $.setCookie(byaSite.modulo, modulo);
    },
    getModulo: function () {
        return $.getCookie(byaSite.modulo);
    },
    getDepDel: function () {
        return "06";
    },
    NomApp: function () {
        return "SIRCC 4 Mobile.";
    },
    PiePagina: function () {
        return " B&A Systems S.A.S. ";
    },
    AbrirPagina: function (url) {
        self.location.href = url;
    },
    AbrirPaginaBlank: function (url) {
        var ventana = window.open(url, '_blank');  //abrimos una ventana vacía nueva
    },
    
    ShowLog: function (value) {
        if (this.showlog) {
            alert(value);
        }
    },
    FechaShort: function (f) {
        return f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear();
    },
    launchFullScreen:function(element) {
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    },
    cancelFullscreen:function() {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    },

    
     printDiv:function(element){
         var objeto = document.getElementById(element);  //obtenemos el objeto a imprimir
         var ventana = window.open('', '_blank');  //abrimos una ventana vacía nueva
         //var url = "/jqwidgets/styles/jqx.metro.css";
         ventana.document.write(objeto.innerHTML);  //imprimimos el HTML del objeto en la nueva ventana
         //ventana.document.find('head').append('<link rel="stylesheet" href="' + url + '" media="screen" />');
         ventana.document.close();  //cerramos el documento
         ventana.print();  //imprimimos la ventana
         ventana.close();  //cerramos la ventana
     },
    
     getPlantillasCampos:function(){
         return  [
                         { Nom_Pla: "DEP_SOLICITANTE", Nom_Cam: "NOM_DEP_NEC_EP" },
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
                         { Nom_Pla: "DEPENDENCIA_SUPERVISOR", Nom_Cam: "NOM_DEP_SUP_EP" },
                         { Nom_Pla: "NOM_RESPONSABLE_EP", Nom_Cam: "RESPONSABLE_EP" },
                         { Nom_Pla: "NOM_DILIGENCIADO_POR", Nom_Cam: "DILIGENCIADO_POR" },
                         { Nom_Pla: "FORMA_PAGO", Nom_Cam: "sFORMA_PAGO" },
                         { Nom_Pla: "PROYECTO_PLAN_C", Nom_Cam: "sBANCO_PROY" },
                         { Nom_Pla: "LOGO", Nom_Cam: "LOGO" },
                         { Nom_Pla: "PROYECTOS", Nom_Cam: "sBANCO_PROY" },
                    
                         { Nom_Pla: "NECESIDAD", Nom_Cam: "NEC_EP" },
                         { Nom_Pla: "VARIABLES_PPTO", Nom_Cam: "VARIABLESPPTO_EP" },
                   
                        { Nom_Pla: "OBLIG_GRAL_CTISTA", Nom_Cam: "OBLIGGRC" },
                        { Nom_Pla: "OBLIG_GRAL_ENTIDAD", Nom_Cam: "OBLIGGRE" },
                        { Nom_Pla: "JUSTIFICACION_VALOR", Nom_Cam: "JUST_VALOR_EP" },
                        { Nom_Pla: "CAP_JURIDICA", Nom_Cam: "CAP_JURIDICA_EP" },
                        { Nom_Pla: "CAP_FINANCIERA", Nom_Cam: "CAP_FINANCIERA_EP" },
                        { Nom_Pla: "CAP_RESIDUAL", Nom_Cam: "CAP_RESIDUAL_EP" },
                        { Nom_Pla: "PERSPECTIVA_LEGAL", Nom_Cam: "PERS_LEGAL_EP" },
                        { Nom_Pla: "PERSPECTIVA_ORGANIZACIONAL", Nom_Cam: "PERS_ORGA_EP" },
                        { Nom_Pla: "EXPERIENCIA", Nom_Cam: "CAP_EXPERIENCA_EP" },
                        { Nom_Pla: "NEC_INTERVENTOR_EXTERNO", Nom_Cam: "NEC_CONT_INT_EP" },
                        { Nom_Pla: "ACUERDO_COMERCIAL", Nom_Cam: "SOM_ACUE_COMER_EP" },
                        { Nom_Pla: "CONSTANCIA_CUMPLIMIENTO", Nom_Cam: "CONST_CUMP_DEBERES_EP" },
                        { Nom_Pla: "IDENTIFICACION_SUPERVISOR", Nom_Cam: "IDE_SUP_EP" },
                        { Nom_Pla: "NOMBRE_SUPERVISOR", Nom_Cam: "NOM_SUP_EP" },
                        { Nom_Pla: "CARGO_SUPERVISOR", Nom_Cam: "CAR_SUP_EP" },
                        { Nom_Pla: "TIPO_PPTO", Nom_Cam: "NOM_TIPO_PPTO" },
                        { Nom_Pla: "PAA_CODIGO", Nom_Cam: "PAAID" },
                        { Nom_Pla: "PAA_DESCRIPCION", Nom_Cam: "PAADESC" },
                        { Nom_Pla: "ESPECIFICACIONES_OBJETO", Nom_Cam: "ESP_OBJ_EP" },
                        { Nom_Pla: "AUT_PER_LIC", Nom_Cam: "AUTPERLIC_EP" },
                        { Nom_Pla: "DOCUMENTOS_TECNICOS", Nom_Cam: "DOCTECNICOS_EP" },
                        { Nom_Pla: "IDONEIDAD", Nom_Cam: "IDONEIDAD_EP" },
                        { Nom_Pla: "CAP_ORGANIZACIONAL", Nom_Cam: "CAP_ORGANIZACIONAL_EP" },
                        { Nom_Pla: "FAC_EVALUACION", Nom_Cam: "FACTORES_EVALUACION_EP" },
                        { Nom_Pla: "REGLAS_DESEMPATES", Nom_Cam: "REGLAS_DESEMPATE_EP" },
                        { Nom_Pla: "UNSPSC", Nom_Cam: "UNSPSC" },
                        { Nom_Pla: "PLAZO_LIQUIDACION_TEXTO", Nom_Cam: "PLIQ_LETRAS_EP" },
                        { Nom_Pla: "ENTIDAD", Nom_Cam: "NOM_ENTIDAD" },
                        { Nom_Pla: "MODALIDAD_SELECCION", Nom_Cam: "MOD_SEL_EP" },

                        { Nom_Pla: "JUSTIFICACION_MODALIDAD", Nom_Cam: "FUN_JUR_MOD" },
                        { Nom_Pla: "CARGO_RESPONSABLE", Nom_Cam: "CAR_RES_EP" },
                        { Nom_Pla: "NUMERO_PROCESO", Nom_Cam: "NRO_PROC" },
                        { Nom_Pla: "FECHA_PROCESO", Nom_Cam: "FEC_PROC" }
                   
                        //MODALIDAD_SELECCION
         ];
     },
     getCamposHtml:function(){
         return [
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
         { text: "DEPENDENCIA_SUPERVISOR", value: "{DEPENDENCIA_SUPERVISOR}" },
         { text: "POLIZAS", value: "{POLIZAS}" },
         { text: "CDP", value: "{CDP}" },
         { text: "CLASE_CONTRATO", value: "{CLASE_CONTRATO}" },
         { text: "FEC_ELABORACION", value: "{FEC_ELABORACION}" },
         { text: "CDP", value: "{CDP}" },
         { text: "DEP_SUPERVISION", value: "{DEP_SUPERVISION}" },
         { text: "NOM_RESPONSABLE_EP", value: "{NOM_RESPONSABLE_EP}" },
         { text: "NOM_DILIGENCIADO_POR", value: "{NOM_DILIGENCIADO_POR}" },
         { text: "FORMA_PAGO", value: "{FORMA_PAGO}" },
         { text: "PROYECTO_PC", value: "{PROYECTO_PLAN_C}" },

           
         { text: "PROYECTOS", value: "{PROYECTOS}" },
         { text: "NECESIDAD", value: "{NECESIDAD}" },
         { text: "VARIABLES_PPTO", value: "{VARIABLES_PPTO}" },
         { text: "OBLIG_GRAL_CTISTA", value: "{OBLIG_GRAL_CTISTA}" },
         { text: "OBLIG_GRAL_ENTIDAD", value: "{OBLIG_GRAL_ENTIDAD}" },
         { text: "JUSTIFICACION_VALOR", value: "{JUSTIFICACION_VALOR}" },
         { text: "CAP_JURIDICA", value: "{CAP_JURIDICA}" },
         { text: "CAP_FINANCIERA", value: "{CAP_FINANCIERA}" },
         { text: "CAP_RESIDUAL", value: "{CAP_RESIDUAL}" },
         { text: "PERS_LEGAL", value: "{PERS_LEGAL}" },
         { text: "PERS_ORGA_EP", value: "{PERS_ORGA_EP}" },
         { text: "EXPERIENCIA", value: "{EXPERIENCIA}" },
         { text: "NEC_INTERVENTOR_EXTERNO", value: "{NEC_INTERVENTOR_EXTERNO}" },
         { text: "ACUERDO_COMERCIAL", value: "{ACUERDO_COMERCIAL}" },
         { text: "CONSTANCIA_CUMPLIMIENTO", value: "{CONSTANCIA_CUMPLIMIENTO}" },
         { text: "IDENTIFICACION_SUPERVISOR", value: "{IDENTIFICACION_SUPERVISOR}" },
         { text: "NOMBRE_SUPERVISOR", value: "{NOMBRE_SUPERVISOR}" },
         { text: "TIPO_PPTO", value: "{TIPO_PPTO}" },
         { text: "PAA_CODIGO", value: "{PAA_CODIGO}" },
         { text: "PAA_DESCRIPCION", value: "{PAA_DESCRIPCION}" },
         { text: "ESPECIFICACIONES_OBJETO", value: "{ESPECIFICACIONES_OBJETO}" },
         { text: "AUT_PER_LIC", value: "{AUT_PER_LIC}" },
         { text: "DOCUMENTOS_TECNICOS", value: "{DOCUMENTOS_TECNICOS}" },
         { text: "IDONEIDAD", value: "{IDONEIDAD}" },
         { text: "CAP_ORGANIZACIONAL", value: "{CAP_ORGANIZACIONAL}" },
         { text: "FAC_EVALUACION", value: "{FAC_EVALUACION}" },
         { text: "REGLAS_DESEMPATES", value: "{REGLAS_DESEMPATES}" },
         { text: "UNSPSC", value: "{UNSPSC}" },
         { text: "CARGO_SUPERVISOR", value: "{CARGO_SUPERVISOR}" },
         { text: "PLAZO_LIQUIDACION_TEXTO", value: "{PLAZO_LIQUIDACION_TEXTO}" },
         { text: "ENTIDAD", value: "{ENTIDAD}" },
         { text: "MODALIDAD_SELECCION", value: "{MODALIDAD_SELECCION}" },
         { text: "JUSTIFICACION_MODALIDAD", value: "{JUSTIFICACION_MODALIDAD}" },
         { text: "CARGO_RESPONSABLE", value: "{CARGO_RESPONSABLE}" },
         { text: "NUMERO_PROCESO", value: "{NUMERO_PROCESO}" },
         { text: "FECHA_PROCESO", value: "{FECHA_PROCESO}" }
         ];
     }
};
