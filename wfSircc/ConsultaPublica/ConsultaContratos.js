var manejador = (function () {
    var urlToTiposContratos = "/ConsultaPublica/wsConsultaContratosPublica.asmx/GetsTiposContratos";
    var urlToDependencias = "/ConsultaPublica/wsConsultaContratosPublica.asmx/GetsDependencias";
    var urlToRealizarConsulta = "/ConsultaPublica/wsConsultaContratosPublica.asmx/RealizarConsulta";
    var lContratos = [];
    var _addHandlers = function () {
        $("#BtnConsulta").click(function () {
            _realizarConsulta();
        });
        $("#btnExportar").click(function () {
            $("#tblConsulta").battatech_excelexport({
                containerid: "tblConsulta"
               , datatype: 'table'
               , encoding: "UTF-8"
            });
        });
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
