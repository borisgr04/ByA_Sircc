var admDoc = (function () {
    "use strict";
    var tema;
    var Clausula = {};
    var urlToClausulas = '/Servicios/EstPrev/wsGesEstPrev.asmx/GetClausulas';
    var urlToESTPREV = '/Servicios/EstPrev/wsGesEstPrev.asmx/GetDatos';
    var urlToAprobarEP = '/Servicios/EstPrev/wsGesEstPrev.asmx/AprobarEP';
    var urlToDAprobarEP = '/Servicios/EstPrev/wsGesEstPrev.asmx/DAprobarEP';
    
    var sourceESTPREV;
    var CboClausulas = {};
    var msgPpal = "#LbMsg";
    var editor;
    var byaRpta;
    var _addHandlers = function () {
        $("#aprobarButton").click(function () {
            $('#modalAprobar').modal('show');
        });
        $("#desaprobarButton").click(function () {
            $('#modalDAprobar').modal('show');
        });
        
        $("#btnAprobar").click(function () {
            Guardar();
        });
        $("#btnDAprobar").click(function () {
            GuardarDA();
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
        ep.FEC_EP = $("#TxtFecApr").val();
        ep.TIP_EP = 'AP';
        ep.EST_EP = 'AC';
        ep.OBS_EP='.';
        return ep;
    };
    var Guardar = function () {
        //alert(JSON.stringify(wizard.GetDatosEP()));
        byaRpta = {};
        var jsonData = "{'Reg':" + JSON.stringify(GetDatos()) + "}";
        byaPage.POST_Sync(urlToAprobarEP, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });

            
            $('#modalAprobar').modal('hide');

            _mostrarEP();
        });
    };

    var GetDatosDA = function () {
        var ep = {};
        ep.CODIGO_EP = $("#txtNumero").val();
        ep.FEC_EP = $("#TxtFecDApr").val();
        ep.TIP_EP = 'EL';
        ep.EST_EP = 'AC';
        ep.OBS_EP = '.';
        return ep;
    };
    var GuardarDA = function () {
        //alert(JSON.stringify(wizard.GetDatosEP()));
        byaRpta = {};
        var jsonData = "{'Reg':" + JSON.stringify(GetDatosDA()) + "}";
        byaPage.POST_Sync(urlToDAprobarEP, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Estudios Previos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            $('#modalDAprobar').modal('hide');
           
            _mostrarEP();
        });
    };

    var GenerarVistaPrevia = function () {
        $("#dvdClausulaPreview").html('');
        $.each(CboClausulas.getSource(), function (index, item) {
            $("#dvdClausulaPreview").append(item.CLA_CRUZADA);
        });
    }
    var _mostrarEP = function () {
        var codigo_ep = $("#txtNumero").val();
        if (codigo_ep != "") {
            var sourceClausulas = byaPage.getSource(urlToClausulas, { Codigo_EP: "'" + codigo_ep + "'" });
            sourceESTPREV = byaPage.getSource(urlToESTPREV, { codigo_ep: "'" + codigo_ep + "'" }); //carga datos de la base de datos
            //alert(JSON.stringify(sourceESTPREV));
            if (sourceESTPREV.EST_EP == "EL") {
                $("#aprobarButton").byaSetHabilitar(false);
                $("#desaprobarButton").byaSetHabilitar(false);
                $("#elaborarButton").byaSetHabilitar(true);
                $("#lbEstado").text("En Elaboración");
                $("#lbEstado").addClass("alert alert-danger");
            }
            if (sourceESTPREV.EST_EP == "RV") {

                $("#aprobarButton").byaSetHabilitar(true);
                $("#desaprobarButton").byaSetHabilitar(false);
                $("#elaborarButton").byaSetHabilitar(false);

                $("#lbEstado").text("Revisado");
                $("#lbEstado").removeClass("alert alert-danger");
                $("#lbEstado").addClass("alert alert-warning");

            }
            if (sourceESTPREV.EST_EP == "AP") {

                $("#aprobarButton").byaSetHabilitar(false);
                $("#desaprobarButton").byaSetHabilitar(true);
                $("#elaborarButton").byaSetHabilitar(false);

                $("#lbEstado").text("Aprobado");
                $("#lbEstado").removeClass("alert alert-warning");
                $("#lbEstado").addClass("alert alert-success");
            }

            CboClausulas = new byaComboBox();
            //inicializar el objeto
            CboClausulas.init({ Id: "#CboClausulas", Source: sourceClausulas, Value: "ID", Display: "TITULO" });
            GenerarVistaPrevia();
        }
    };
    return {
        config: {
            theme: null
        },
        init: function () {
            tema = byaSite.tema;
            _addHandlers();
            var EP = $.getUrlVar('ep');
            $("#txtNumero").val(EP);
            _mostrarEP();
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
    byaSite.SetModuloP({ TituloForm: "Estudios Previos", Modulo: "Aprobación de Estudios Previos", urlToPanelModulo: "#", Cod_Mod: "ESPR4", Rol: "EP_APROBAR" });
    theme = getDemoTheme();
    admDoc.config.theme = theme;
    admDoc.init();
});

