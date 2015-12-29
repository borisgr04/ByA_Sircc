var manejador = (function () {
    var urlToTiposContratos = "/Servicios/wsConsultaContratosPublica.asmx/GetsTiposContratos";
    var urlToDependencias = "/Servicios/wsConsultaContratosPublica.asmx/GetsDependencias";
    var urlToRealizarConsulta = "/Servicios/wsConsultaContratosPublica.asmx/RealizarConsulta";
    var lContratos = [];
    var _addHandlers = function () {
        $("#BtnConsulta").click(function () {
            if (_esValidoConsultaContratos()) {
                _realizarConsulta();
            } else {
                alert("Atención: Debe seleccionar por lo menos dos criterios de busqueda para realizar la consulta");
            }
        });
        $("#btnExportar").click(function () {
            $("#tblConsulta").battatech_excelexport({
                containerid: "tblConsulta"
               , datatype: 'table'
               , encoding: "UTF-8"
            });
        });
        $("#btnBsqResultado").click(function () {
            VerificarConcidencias($("#txtBusquedaEnResultado").val());
        });
        $("#txtVigencia").blur(function () {
            _armarNumeroContrato();
        });
        $("#cboTipoContrato").change(function () {
            _armarNumeroContrato();
        });
    };
    var _armarNumeroContrato = function () {
        var vig = $("#txtVigencia").val();
        var tipo = $("#cboTipoContrato").val();
        var num_con = vig + tipo;
        $("#txtNumeroContrato").val(num_con);
    };
    var _crearElements = function () {
        var sourceTiposContratos = byaPage.getSource(urlToTiposContratos);
        $("#cboTipoContrato").byaCombo({
            DataSource: sourceTiposContratos, placeHolder: 'Seleccione', Display: "NOM_TIP", Value: "COD_TIP"
        });

        var sourceDependencias = byaPage.getSource(urlToDependencias);
        $("#cboDependenciaNecesidad").byaCombo({
            DataSource: sourceDependencias, placeHolder: 'Seleccione', Display: "NOM_DEP", Value: "COD_DEP"
        });
    };
    var _armarObjetoConsulta = function () {
        var e = {};

        e.chkVigencia = $("#chkVigencia").is(':checked');
        e.Vigencia = $("#txtVigencia").val();

        e.chkNumeroContrato = $("#chkNumeroContrato").is(':checked');
        e.NumeroContrato = $("#txtNumeroContrato").val();

        e.chkTipoContrato = $("#chkTipoContrato").is(':checked');
        e.TipoContrato = $("#cboTipoContrato").val();

        e.chkCedulaNitContratista = $("#chkCedulaNitContratista").is(':checked');
        e.CedulaNitContratista = $("#txtCedulaNitContratista").val();

        e.chkNombreContratista = $("#chkNombreContratista").is(':checked');
        e.NombreContratista = $("#txtNombreContratista").val();

        e.chkDependenciaNecesidad = $("#chkDependenciaNecesidad").is(':checked');
        e.DependenciaNecesidad = $("#cboDependenciaNecesidad").val();

        e.chkObjeto = $("#chkObjeto").is(':checked');
        e.Objeto = $("#txtObjeto").val();

        return e;
    };
    var _realizarConsulta = function () {
        var jsonData = "{'Reg':" + JSON.stringify(_armarObjetoConsulta()) + "}";
        $("#dvdLoader").fadeIn();
        $.ajax({
            type: "POST",
            url: urlToRealizarConsulta,
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                lContratos = byaPage.retObj(result.d);
                crearTablaConsulta();
                $("#dvdNumeroContratos").html("<strong>Resultado: " + lContratos.length + " Contratos</strong>");
                $("#dvdRespuestaConsulta").fadeIn();
            },
            error: function (jqXHR, status, error) {
                $("#dvdLoader").fadeOut();
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var tableContratos = {};
    var crearTablaConsulta = function () {
        var config = {
            Id: '#tblConsulta',
            Source: lContratos,
            fnFormatItem: function (item, index) {
                return "" +
                "<td class='text-left'>" + ifNull(item.VIG_CON) + "</td>" +
                "<td class='text-right'>" + ifNull(item.COD_CON) + "</td>" +
                "<td style='text-align:justify;'>" + ifNull(item.OBJ_CON) + "</td>" +
                "<td class='text-right'>" + ifNull(item.IDE_CON) + "</td>" +
                "<td class='text-left'>" + ifNull(item.CONTRATISTA) + "</td>" +
                "<td class='text-left'>" + ifNull(item.ESTADO) + "</td>" +
                "<td class='text-left'>" + ifNull(item.TIPOCONT) + "</td>" +
                "<td class='text-left'>" + ifNull(item.SUB_TIPO) + "</td>" +
                "<td>" + ifNull(item.VAL_CON != null ? byaPage.formatNumber.new(item.VAL_CON, "$") : null) + "</td>" +
                "<td class='text-left'>" + ifNull(item.NOM_TER_SUP) + "</td>" +                
                "<td class='text-left'>" + ifNull(item.DEPENDENCIA) + "</td>" +
                "<td class='text-left'>" + ifNullDate(item.FEC_SUS_CON) + "</td>" +
                "<td>" + ifNullDate(item.FECHA_INICIAL) + "</td>" +
                "<td>" + ifNullDate(item.FECHA_FINAL) + "</td>" +     
                "";
            },
            Enabled: false
        };
        tableContratos = new byaTablaG();
        tableContratos.init(config);
        byaPage.irFin();
    };
    var ifNull = function (value) {
        if (value != null) return value;
        else return " ";
    };
    var ifNullDate = function (value) {
        if (value != null) return byaPage.converJSONDate(value);
        else return " ";
    };
    var VerificarConcidencias = function (cadena) {
        cadena = "" + cadena + "";
        $("#tblConsulta tbody").html("");
        var con = 0;
        $.each(lContratos, function (index, item) {
            if (
                (("" + item.VIG_CON + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1) ||
                (("" + item.OBJ_CON + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1) ||
                (("" + item.COD_CON + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1) ||
                (("" + item.IDE_CON + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1) ||
                (("" + item.CONTRATISTA + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1) ||
                (("" + item.ESTADO + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1) ||
                (("" + item.TIPOCONT + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1) ||
                (("" + item.SUB_TIPO + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1) ||
                (("" + item.NOM_TER_SUP + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1) ||
                (("" + item.DEPENDENCIA + "").toUpperCase().indexOf(cadena.toUpperCase()) != -1)
                ) {
                con = con + 1;
                $("#tblConsulta tbody").append("<tr>" +
                "<td class='text-left'>" + ifNull(item.VIG_CON) + "</td>" +
                "<td class='text-right'>" + ifNull(item.COD_CON) + "</td>" +
                "<td style='text-align:justify;'>" + ifNull(item.OBJ_CON) + "</td>" +
                "<td class='text-right'>" + ifNull(item.IDE_CON) + "</td>" +
                "<td class='text-left'>" + ifNull(item.CONTRATISTA) + "</td>" +
                "<td class='text-left'>" + ifNull(item.ESTADO) + "</td>" +
                "<td class='text-left'>" + ifNull(item.TIPOCONT) + "</td>" +
                "<td class='text-left'>" + ifNull(item.SUB_TIPO) + "</td>" +
                "<td>" + ifNull(item.VAL_CON != null ? byaPage.formatNumber.new(item.VAL_CON, "$") : null) + "</td>" +
                "<td class='text-left'>" + ifNull(item.NOM_TER_SUP) + "</td>" +
                "<td class='text-left'>" + ifNull(item.DEPENDENCIA) + "</td>" +
                "<td class='text-left'>" + ifNullDate(item.FEC_SUS_CON) + "</td>" +
                "<td>" + ifNullDate(item.FECHA_INICIAL) + "</td>" +
                "<td>" + ifNullDate(item.FECHA_FINAL) + "</td>" +
                "</tr>");
            }
        });
        $("#dvdNumeroContratos").html("<strong>Resultado: " + con + " Contratos</strong>");
    };
    var _esValidoConsultaContratos = function () {
        var contadorFiltros = 0;
        if ($("#chkVigencia").is(':checked')) contadorFiltros = contadorFiltros + 1;
        if($("#chkNumeroContrato").is(':checked')) contadorFiltros = contadorFiltros +1;
        if ($("#chkTipoContrato").is(':checked')) contadorFiltros = contadorFiltros + 1;    
        if($("#chkCedulaNitContratista").is(':checked')) contadorFiltros = contadorFiltros + 1;
        if ($("#chkNombreContratista").is(':checked')) contadorFiltros = contadorFiltros + 1;
        if($("#chkDependenciaNecesidad").is(':checked')) contadorFiltros = contadorFiltros +1;
        if ($("#chkObjeto").is(':checked')) contadorFiltros = contadorFiltros + 1;

        if (contadorFiltros >= 2) return true;
        else return false;
    };
    return {
        init: function () {
            _addHandlers();
            _crearElements();
        }
    }
}());
$(function () {
    manejador.init();
});
