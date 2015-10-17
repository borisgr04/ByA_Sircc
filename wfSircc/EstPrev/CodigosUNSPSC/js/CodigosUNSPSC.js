var oCodigosUNSPSC = (function () {
    "use strict";
    var ventana = '#modalCodigos';
    var codigoUNSPSC = "";
    var NombreProducto = "";
    var lClases;
    var lProductos;
    var CboGrupos, CboSegmentos, CboFamilias,CboClases, CboProductos;
    var item={};
    var _addHandlers = function () {
        $("#cboGrupos").change(function () {
            $("#cboSegmentos").html("");
            $("#cboFamilias").html("");
            $("#cboClases").html("");
            $("#cboProductos").html("");
            $("#txtCodigoUNSPSC").html("");
            codigoUNSPSC = "";
            if($(this).val() != "") VerSegmentos($(this).val());
        });
        $("#cboSegmentos").change(function () {
            $("#cboFamilias").html("");
            $("#cboClases").html("");
            $("#cboProductos").html("");
            $("#txtCodigoUNSPSC").html("");
            codigoUNSPSC = "";
            if ($(this).val() != "") VerFamilias($(this).val());
            var reg = CboSegmentos.getSeleccionado();
            $("#txtCodigoUNSPSC").html(" Código UNSPSC: " + reg.UNSPSC + " Segmentos: " + reg.NOMBRE);
        });
        $("#cboFamilias").change(function () {
            $("#cboClases").html("");
            $("#cboProductos").html("");
            $("#txtCodigoUNSPSC").html("");
            codigoUNSPSC = "";
            if ($(this).val() != "") VerClases($(this).val());
            var reg = CboFamilias.getSeleccionado();
            $("#txtCodigoUNSPSC").html(" Código UNSPSC: " + reg.UNSPSC + " Familia: " + reg.NOMBRE);

        });
        //$("#cboClases").change(function () {
        //    $("#cboProductos").html("");
        //    $("#txtCodigoUNSPSC").html("");
        //    if ($(this).val() != "") {
        //        VerProductos($(this).val());
        //        var value = "" + $(this).val() + "";
        //        var Nombre;
        //        $.each(lClases, function (index, item) {
        //            if (value == item.UNSPSC) Nombre = item.NOMBRE;
        //        });
        //        $("#txtCodigoUNSPSC").html(" Código UNSPSC: " + $(this).val() + " Clase: " + Nombre);
        //        codigoUNSPSC = $(this).val();
        //    }
        //});
        $("#cboClases").change(function () {
            $("#cboProductos").html("");
            $("#txtCodigoUNSPSC").html("");
            if ($(this).val() != "") VerProductos($(this).val());
            var reg = CboClases.getSeleccionado();
            NombreProducto = reg.NOMBRE;
            $("#txtCodigoUNSPSC").html(" Código UNSPSC: " + reg.UNSPSC + " Clases: " + reg.NOMBRE);
            codigoUNSPSC = $(this).val();
        });
        $("#cboProductos").change(function () {
            if ($(this).val() != "") {
                var value = "" + $(this).val() + "";
                var reg = CboProductos.getSeleccionado();
                NombreProducto = reg.NOMBRE;
                $("#txtCodigoUNSPSC").html(" Código UNSPSC: " + reg.UNSPSC + " Productos: " + reg.NOMBRE);
                codigoUNSPSC = $(this).val();
            }
        });
        $("#btnSeleccinarCodigo").click(function () {
            if (codigoUNSPSC == "") alert("Debe seleccionar algun producto...");
            else {
                item.codigoUNSPSC=codigoUNSPSC;
                item.NombreProducto = NombreProducto;
                oCodigosUNSPSC.fnresultado(item);
            }
        });
    };
    var _mostrarVentana = function () {
        $(ventana).modal('show');
    };
    var _ocultarVentana = function () {
        $(ventana).modal('hide');
    };

    var VerGrupos = function () {

        CodigosUNSPSCDAO.GetsGrupos(function (result) {

            var lGrupos = byaPage.retObj(result.d);
            CboGrupos = new byaComboBox();
            CboGrupos.init({ Id: "#cboGrupos", Source: lGrupos, Value: "UNSPSC", Display: "NOMBRE_C" });
            //$("#cboGrupos").byaCombo({ DataSource: lGrupos, Value: "UNSPSC", Display: "NOMBRE_C" });
        });
    };
    var VerSegmentos = function (codigo) {
        CodigosUNSPSCDAO.GetsSegmentos(codigo, function (result) {
            var lSegmentos = byaPage.retObj(result.d);
            CboSegmentos = new byaComboBox();
            CboSegmentos.init({ Id: "#cboSegmentos", Source: lSegmentos, Value: "UNSPSC", Display: "NOMBRE_C" });
            //$("#cboSegmentos").byaCombo({ DataSource: lSegmentos, Value: "UNSPSC", Display: "NOMBRE_C" });
        });
    };
    var VerFamilias = function (codigo) {
        CodigosUNSPSCDAO.GetsFamilias(codigo, function (result) {
            var lFamilias = byaPage.retObj(result.d);
            CboFamilias = new byaComboBox();
            CboFamilias.init({ Id: "#cboFamilias", Source: lFamilias, Value: "UNSPSC", Display: "NOMBRE_C" });
            //$("#cboFamilias").byaCombo({ DataSource: lFamilias, Value: "UNSPSC", Display: "NOMBRE_C" });
        });
    };
    var VerClases = function (codigo) {
        CodigosUNSPSCDAO.GetsClases(codigo, function (result) {
            var lClases = byaPage.retObj(result.d);
            CboClases = new byaComboBox();
            CboClases.init({ Id: "#cboClases", Source: lClases, Value: "UNSPSC", Display: "NOMBRE_C" });

            //$("#cboClases").byaCombo({ DataSource: lClases, Value: "UNSPSC", Display: "NOMBRE_C" });
        });
    };
    var VerProductos = function (codigoClase) {
        CodigosUNSPSCDAO.GetsProductos(codigoClase, function (result) {
            var lProductos = byaPage.retObj(result.d);
            CboProductos = new byaComboBox();
            CboProductos.init({ Id: "#cboProductos", Source: lProductos, Value: "UNSPSC", Display: "NOMBRE_C" });
            //$("#cboProductos").byaCombo({ DataSource: lProductos, Value: "UNSPSC", Display: "NOMBRE_C" });
        });
    };
    return {
        fnresultado: null,
        config: {
            theme: null
        },
        init: function () {
            _addHandlers();
            VerGrupos();
        },
        ShowModal: function () {
            $("#modalCodigos").modal('show');
        },
        HideModal: function () {
            $("#modalCodigos").modal('hide');
        },
        showWindow: function (fnresultado) {
            this.fnresultado = fnresultado;
            this.ShowModal();
        }
    };
}());
$(function () {
    //oCodigosUNSPSC.config.theme = byaSite.tema;
    oCodigosUNSPSC.init();
});