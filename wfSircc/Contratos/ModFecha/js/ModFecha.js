var ModFecha = (function () {
    "use strict";


    var urlToUpdateModF = "/Servicios/Contratos/wsModFecha.asmx/UpdateModFecha";
    var urlGetContratos = "/Servicios/Contratos/wsLegalizacion.asmx/GetDetContratos";
    var urlSourceTip = '/servicios/wsDatosBasicos.asmx/GetvTIPOSCONT';
    var urlGetModFecha = "/Servicios/Contratos/wsModFecha.asmx/GetModFecha_Contrato";
    var Cod_Con;
    var byaRpta;
    var msgPpal = "#LbMsg";
    var Existe;
    var _addHandlers = function () {
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#BtnDwnAbrir").click(function () {
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirRadicacion();
            }
        });
        $("#txtNumero").blur(function (event) {

            var l = $("#txtNumero").val().length;
            if (l >= 1 && l <= 4) {
                Cod_Con = parseInt($("#txtNumero").val());
                $("#txtNumero").val(byaSite.getVigencia() + $("#CboTip").val() + Cod_Con.padLeft(4, "0"));

            }
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirModFecha();
            }

        });
        $("#BtnguardarModFecha").click(function () {
            UpdateModFecha();
        });
     

    };
    var _Validaciones = function myfunction() {
        $("#txtNumero").byaSetHabilitar(false);
        $("#TextNFech").byaSetHabilitar(false);
        $("#BtnguardarModFecha").byaSetHabilitar(false);
        $("#CboTip").change(function () {
            $("#txtNumero").byaSetHabilitar(true);


        });
    };
    var AbrirModFecha = function () {
        MultiplesAjax();
        ControlsModFecha();
       
    };
    var InfoContrato = function () {
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
                var DataFields = [
                        { Titulo: 'Número', Campo: 'Numero', Tipo: 'S' },
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
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
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
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });

        $.ajax({
            type: "GET",
            url: urlGetModFecha,
            data: { 'Cod_Con': Cod_Con },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var result = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                if (byaPage.converJSONDateDMY(result.FechaAnt) == undefined) {
                    limpiarModFecha();
                    $(msgPpal).msgBox({ titulo: "Registro de ModFecha", mensaje: "El Contrato Con Codigo " + Cod_Con + " no Existe", tipo: "danger" });
                    Existe = "No";
                 } else {
                    Existe = "Si";
                    limpiarModFecha();
                    $(msgPpal).html("");
                    $('#FechMinima').text(byaPage.converJSONDateDMY(result.FechaAnt));
                    $('#FechMaxima').text(byaPage.converJSONDateDMY(result.FechaSig));
                    ActualizarDataPicker();
                  
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });




    }; 
    var _createElements = function () {
        $("#txtNumero").byaSetHabilitar(true);
        $('.currency').byaSetDecimal(0);
        $("#txtNumero").byaFormatInput('0123456789');
        LlenarCbo();
        $("#txtNumero").byaSetHabilitar(true);
    };
    var ActualizarDataPicker = function () {
        //$("#TextNFech").datepicker({
        //    weekStart: 1,
        //    startDate: $('#FechMinima').text(),
        //    endDate: $('#FechMaxima').text(),
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
        var ModF = {};
        ModF.FEC_SUS_CON = $('#TextNFech').val();      
        ModF.COD_CON = Cod_Con;
        return ModF;
    }
    var UpdateModFecha = function () {
        var obj = getDatos();
        obj.FEC_SUS_CON = obj.FEC_SUS_CON.replace("/", "-").replace("/", "-");
        //obj.FEC_SUS_CON = $("#fechaP").val();
        var jsonData = "{'Reg':" + JSON.stringify(obj) + "}";
        byaPage.POST_Sync(urlToUpdateModF, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);           
            $(msgPpal).msgBox({ titulo: "Registro de ModFecha", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                InfoContrato();
            }
        });


    }
    var ControlsModFecha = function () {
        if (Existe == "Si") {
            $("#TextNFech").byaSetHabilitar(true);
            $("#BtnguardarModFecha").byaSetHabilitar(true);
        } else {
            $("#TextNFech").byaSetHabilitar(false);
            $("#BtnguardarModFecha").byaSetHabilitar(false);
        }       
       

    };
    var limpiarModFecha = function () {
        $('#FechMinima').text("");
        $('#FechMaxima').text("");
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
    byaSite.SetModuloP({ TituloForm: "ModFecha", Modulo: "Contratos", urlToPanelModulo: "#", Cod_Mod: "CONT4", Rol: "CT_MOD" });
    ModFecha.config.theme = byaSite.tema
    ModFecha.init();
    

});
