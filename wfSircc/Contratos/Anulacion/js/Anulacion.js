var Anulacion = (function () {
    "use strict";
    var urlToInsert = "/Servicios/Contratos/wsAnulacion.asmx/Insert";
    var urlGetContratos = "/Servicios/Contratos/wsLegalizacion.asmx/GetDetContratos";
    var urlSourceTip = '/servicios/wsDatosBasicos.asmx/GetvTIPOSCONT';
    var Cod_Con;
    var byaRpta;
    var msgPpal = "#LbMsg";
    var _addHandlers = function () {
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#txtNumero").blur(function (event) {

            var l = $("#txtNumero").val().length;
            if (l >= 1 && l <= 4) {
                Cod_Con = parseInt($("#txtNumero").val());
                $("#txtNumero").val(byaSite.getVigencia() + $("#CboTip").val() + Cod_Con.padLeft(4, "0"));

            }
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirAnulacion();
            }

        });
        $("#BtnguardarAnulacion").click(function () {
            InsertAnulacion();
        });
        $("#BtnDwnAbrir").click(function () {
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirRadicacion();
            }
        });

    };
    var _Validaciones = function myfunction() {
        $("#txtNumero").byaSetHabilitar(false);
        $("#TextFecDoc").byaSetHabilitar(false);
        $("#CboDoc").byaSetHabilitar(false);
        $("#textObs").byaSetHabilitar(false);
        $("#BtnnuevaAnulacion").byaSetHabilitar(false);
        $("#BtnguardarAnulacion").byaSetHabilitar(false);
        $("#BtncancelarAnulacion").byaSetHabilitar(false);
        $("#CboTip").change(function () {
            $("#txtNumero").byaSetHabilitar(true);


        });
    };
    var AbrirAnulacion = function () {        
        MultiplesAjax();
      

    };
    var MultiplesAjax = function () {
        //Llamado de Items de Contratos
        $('#TextObj').val("");
        $.ajax({
            type: "GET",
            url: urlGetContratos,
            data: { 'Cod_Con': Cod_Con },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var contrato = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                if ((contrato.Cod_Act == "99") || (contrato.Cod_Act == "00")) {
                    var DataFields = [
                            { Titulo: 'Número', Campo: 'Numero', Tipo: 'S' },
                            { Titulo: 'Estado', Campo: 'Estado', Tipo: 'S' },
                            { Titulo: 'Contratista', Campo: 'Contratista', Tipo: 'S' },
                            { Titulo: 'Objeto', Campo: 'Objeto', Tipo: 'S' },
                            { Titulo: 'Tipo', Campo: 'Tipo', Tipo: 'S' },
                            { Titulo: 'Valor del Contrato', Campo: 'Valor_Contrato', Tipo: 'N' },
                            { Titulo: 'Fecha de Suscripción', Campo: 'Fecha_Suscripcion', Tipo: 'D' },
                            { Titulo: 'Dependencia Necesidad', Campo: 'DependenciaNec', Tipo: 'S' },
                            { Titulo: 'Dependencia Delegada', Campo: 'DependenciaDel', Tipo: 'S' },
                            { Titulo: 'Supervisor', Campo: 'Nom_Supervisor', Tipo: 'S' },
                            { Titulo: 'Identificación Contratista', Campo: 'Ide_Contratista', Tipo: 'S' },
                            { Titulo: 'Supervisor', Campo: 'Nom_Supervisor', Tipo: 'S' },
                            { Titulo: 'N° Proceso', Campo: 'NroProceso', Tipo: 'S' }
                    ];
                    var Titulo = "INFORMACION DETALLADA DEL CONTRATO";
                    $('#DetContrato').DetailsJSON(contrato, DataFields, Titulo)
                    $("#dvdDetContrato").fadeIn();
                    if (contrato.Cod_Act == "00") {
                        $("#TextFecDoc").byaSetHabilitar(false);
                        $("#CboDoc").byaSetHabilitar(false);
                        $("#textObs").byaSetHabilitar(false);
                        $("#BtnnuevaAnulacion").byaSetHabilitar(false);
                        $("#BtnduardarAnulacion").byaSetHabilitar(false);
                        $("#BtncancelarAnulacion").byaSetHabilitar(false);
                    } else { ControlsAnulacion(); }
                    ControlsAnulacion();
                    $(msgPpal).html("");
                } else {
                    $(msgPpal).msgBox({ titulo: "Registro de Actas", mensaje: "No se puede anular el contrato", tipo: false });
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });

    };
    var _createElements = function () {
        $('.currency').byaSetDecimal(0);
        $("#txtNumero").byaFormatInput('0123456789');
        LlenarCbo();
        ActualizarDataPicker();
        $("#txtNumero").byaSetHabilitar(true);
    };
    var ActualizarDataPicker = function () {
        //$("#TextFecDoc").datepicker({
        //    weekStart: 1,          
        //    todayHighlight: true,
        //    autoclose: true,
        //    format: 'dd/mm/yyyy',
        //});
    };
    var LlenarCbo = function () {
        var sourceMod = byaPage.getSource(urlSourceTip);
        $("#CboTip").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo ', Display: "NOMC_TIP", Value: "COD_TIP"
        });

    };
    var getDatos = function () {
        var Anu = {};
        Anu.FEC_ENT = $('#TextFecDoc').val();      
        Anu.COD_CON = Cod_Con;       
        Anu.OBS_EST = $("#textObs").val();
        Anu.USUARIO = byaSite.getUsuario();     
        return Anu;
    }
    var InsertAnulacion = function () {
       
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registro de Anulacion", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {

            }
        });
        

    }
    var ControlsAnulacion = function () {
        $("#TextFecDoc").byaSetHabilitar(true);
        $("#CboDoc").byaSetHabilitar(true);
        $("#textObs").byaSetHabilitar(true);
        $("#BtnnuevaAnulacion").byaSetHabilitar(true);
        $("#BtnguardarAnulacion").byaSetHabilitar(true);
        $("#BtncancelarAnulacion").byaSetHabilitar(true);

    };
    var limpiarAnulacion = function () {

    }

    return {
        id_ep: null,
        fnresultado: null,
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        Vigencia: function () {
            return byaSite.getVigencia();
        },
        getRecord: function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        init: function () {
            _addHandlers();
            _Validaciones();
            _createElements();

            //   _HabilitarE();
        }
    };
}());




$(function () {
    byaSite.SetModuloP({ TituloForm: "Anualcion", Modulo: "Contratos", urlToPanelModulo: "#", Cod_Mod: "CONT4", Rol: "CT_ANU" });
    Anulacion.config.theme = byaSite.tema
    Anulacion.init();


});
