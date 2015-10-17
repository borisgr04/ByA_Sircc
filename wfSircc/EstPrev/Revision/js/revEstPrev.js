var admDoc = (function () {
    "use strict";
    var tema;
    var Clausula = {};
    var urlToClausulas = '/Servicios/EstPrev/wsGesEstPrev.asmx/GetClausulas';
    var urlToESTPREV = '/Servicios/EstPrev/wsGesEstPrev.asmx/GetDatos';
    var urlToRevisarEP = '/Servicios/EstPrev/wsGesEstPrev.asmx/RevisarEP';
    var sourceESTPREV;
    var CboClausulas = {};
    var msgPpal = "#LbMsg";
    var editor;
    var byaRpta;
    var _addHandlers = function () {
        $("#revisarButton").click(function () {
            $('#modalRevisar').modal('show');
        });

        $("#elaborarButton").click(function () {
            var CODIGO_EP = $("#txtNumero").val();
            byaSite.AbrirPagina("../Elaborar/rgEstPrev.aspx?ep=" + CODIGO_EP);
        });

        

        $("#btnRevisar").click(function () {
            GuardarRev();
        });

        
        $("#BtnDwnAbrir").click(function () {
            _mostrarEP();
        });
        $("#txtNumero").blur(function () {
            _mostrarEP();
        });
        
        $("#cancelarButton").click(function () {
            //byaSite.printDiv("dvdPrint");
        });
        $("#imprimirButton").click(function (event) {
            //byaSite.printDiv("dvdPrint");
            //alert("Imprimir");
            //byaSite.AbrirPagina("/ashx/descEP.ashx?id_ep=" + wizard.TxtID.val());
            byaSite.AbrirPagina("../PrintEP.html?id_ep=" + $("#txtNumero").val());


        });
    };

    
    var GetDatos=function(){
        var ep = {};
        ep.CODIGO_EP = $("#txtNumero").val();
        ep.FEC_EP = $("#TxtFecRev").val();
        ep.TIP_EP = 'RV';
        ep.EST_EP = 'AC';
        ep.OBS_EP='.';
        return ep;
    };
    
    var GuardarRev = function () {
        //alert(JSON.stringify(wizard.GetDatosEP()));
        byaRpta = {};
        var jsonData = "{'Reg':" + JSON.stringify(GetDatos()) + "}";
        byaPage.POST_Sync(urlToRevisarEP, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            $('#modalRevisar').modal('hide');
            _mostrarEP();
        });

    };

    
    var GenerarVistaPrevia = function () {
        $("#dvdClausulaPreview").html('');
        $.each(CboClausulas.getSource(), function (index, item) {
            $("#dvdClausulaPreview").append(item.CLA_CRUZADA);
            //$("#dvdClausulaPreview").append(ReemplazarCampos(item));
        });
    }
    String.prototype.str_replace = function (buscar, reemplazar) {
        return this.replace(new RegExp(buscar, 'g'), reemplazar);
    };

    var _mostrarEP = function () {
        var codigo_ep = $("#txtNumero").val();
        if (codigo_ep != "") {
            var sourceClausulas = byaPage.getSource(urlToClausulas, { Codigo_EP: "'" + codigo_ep + "'" });

            sourceESTPREV = byaPage.getSource(urlToESTPREV, { codigo_ep: "'" + codigo_ep + "'" }); //carga datos de la base de datos
            
            if (sourceESTPREV.EST_EP == "EL") {
                $("#revisarButton").byaSetHabilitar(true);
                $("#elaborarButton").byaSetHabilitar(true);
                $("#lbEstado").text("En Elaboración");
                $("#lbEstado").addClass("alert alert-danger");
            }
            if (sourceESTPREV.EST_EP == "RV") {
                    //alert(sourceESTPREV.EST_EP);
                    $("#revisarButton").byaSetHabilitar(false);
                    $("#elaborarButton").byaSetHabilitar(false);
                    $("#lbEstado").text("Revisado");
                    $("#lbEstado").removeClass("alert alert-danger");
                    $("#lbEstado").addClass("alert alert-warning");

            }
            if (sourceESTPREV.EST_EP == "AP") {
                    //alert(sourceESTPREV.EST_EP);
                    $("#revisarButton").byaSetHabilitar(false);
                    $("#elaborarButton").byaSetHabilitar(false);
                    $("#lbEstado").text("Aprobado");
                    $("#lbEstado").removeClass("alert alert-warning");
                    $("#lbEstado").addClass("alert alert-success");
            }
            
            CboClausulas = new byaComboBox();
            //inicializar el objeto
            CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
            GenerarVistaPrevia();
            //$('#dvdEdicion *').prop("contentEditable", "true");
            //$('#myTab a:first').tab('show');
            //crearEditor();


            //
        }
    };

    
    return {
        editedRows: null,
        config: {
            theme: null
        },
        init: function () {
            tema = byaSite.tema;
            _addHandlers();
            var EP = $.getUrlVar('ep');
            $("#txtNumero").val(EP);
            _mostrarEP();
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
        setDATOS: function () {
            CboClausulas = new byaComboBox();
            var sourceClausulas = wizard.getDoc();//carga doc, actual
            CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
            sourceESTPREV = byaPage.getSource(urlToESTPREV, { codigo_ep: "'" + wizard.GetID() + "'" }); //carga datos de la base de datos
            GenerarVistaPrevia();
        }
    };
}());




$(document).ready(function () {
    byaSite.SetModuloP({ TituloForm: "Estudios Previos", Modulo: "Revisar de Estudios Previos", urlToPanelModulo: "#", Cod_Mod: "ESPR4", Rol: "EP_REVISAR" });
    //$.data(document.body, 'theme', 'arctic');
    theme = getDemoTheme();
    admDoc.config.theme = theme;
    admDoc.init();
});

