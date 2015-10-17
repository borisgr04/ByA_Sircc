
var Gestion = (function () {
    "use strict";
    var urlToInsert = "/Servicios/Contratos/wsGestion.asmx/Insert";
    var urlGetContratos = "/Servicios/Contratos/wsLegalizacion.asmx/GetDetContratos";
    var urlSourceTip = '/servicios/wsDatosBasicos.asmx/GetvTIPOSCONT';   
    var urlToSig = '/Servicios/wsContratosGestionS.asmx/GetActasSiguientes';
    var Cod_Con;
    var byaRpta;
    var msgPpal = "#LbMsg";
    var objContrato = {};
    var Load = function () {
        if ($.getUrlVar('cod_con') != undefined) {
            Cod_Con = $.getUrlVar('cod_con');
            AbrirGestion();
        } 
        
        
    }
    var _addHandlers = function () {
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#BtnDwnAbrir").click(function () {
            var l = $("#txtNumero").val().length;
            if (l >= 1 && l <= 4) {
                Cod_Con = parseInt($("#txtNumero").val());
                $("#txtNumero").val(byaSite.getVigencia() + $("#CboTip").val() + Cod_Con.padLeft(4, "0"));

            }
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirGestion();
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
                AbrirGestion();
            }

        });
      
        $("#BtnguardarGestion").click(function () {
            if (_esValidoGestion()) {
                GuardarGestion();
            }            
        });
        $("#BtncancelarGestion").click(function () {
            LimpiarGestion();
        });
        $("#TextFisico").blur(function () {
            var value = parseInt($(this).val()).toFixed();
            if (value == null) {
                alert("% Ejecución Fisico, no puede estar vacio");
                $(this).val(0);
                $(this).focus();
            }
            if ((value < 0) || (value > 100)) {
                alert("% Ejecución Fisico, debe estar entra 0 y 100");
                $(this).val(0);
                $(this).focus();
            }
        });
    };
    var _esValidoGestion = function () {
        if ($('#TextValp').byaGetDecimal() > objContrato.ValorSaldo) {
            alert("El Valor de Autorización de Pago no puede ser mayor al saldo que se muestra en la parte de la derecha");
            $('#TextValp').focus();
            return false;
        } else {
            return true;
        }
    };
    var _Validaciones = function myfunction() {
      

        $("#txtNumero").byaSetHabilitar(false);
        $("#TextFecDoc").byaSetHabilitar(false);
        $("#CboEst").byaSetHabilitar(false);
        $("#textObs").byaSetHabilitar(false);
        $("#TextNvis").byaSetHabilitar(false);
        $("#TextValp").byaSetHabilitar(false);
        $("#TextFisico").byaSetHabilitar(false);
        $("#BtnguardarGestion").byaSetHabilitar(false);
        $("#BtncancelarGestion").byaSetHabilitar(false);
        $("#CboTip").change(function () {
            $("#txtNumero").byaSetHabilitar(true);
        });
    };
    var AbrirGestion = function () {
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
                if ((contrato.Cod_Act != "99") && (contrato.Cod_Act != "00")) {
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
                    ControlsGestion();
                    LimpiarGestion();

                    $("#dvdEstadoCuentaContrato").html('<div class="row">'+
                                    '<div class="col-xs-6 text-left"><strong>Total:</strong></div>'+
                                    '<div class="col-xs-6 text-right">' + byaPage.formatNumber.new(contrato.ValorPagar, "$") + '</div>' +
                                '</div>'+
                                '<div class="row">'+
                                    '<div class="col-xs-6 text-left"><strong>Pagado:</strong></div>'+
                                    '<div class="col-xs-6 text-right">' + byaPage.formatNumber.new(contrato.ValorPagado, "$") + '</div>' +
                               ' </div>' +
                                '<div class="row">'+
                                   ' <div class="col-xs-6 text-left"><strong>Saldo:</strong></div>'+
                                    '<div class="col-xs-6 text-right">' + byaPage.formatNumber.new(contrato.ValorSaldo, "$") + '</div>' +
                                '</div>');
                    objContrato = contrato;

                } else {
                    $(msgPpal).msgBox({ titulo: "Registro de Actas", mensaje: "No se puede abrir debido a que no ha sido legalizado", tipo: false });
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });

        var sourceMod = byaPage.getSource(urlToSig, { CodCon: Cod_Con }); 
        $("#CboEst").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione...', Display: "nombre", Value: "codigo"
        });


    };
    var ActualizarDataPicker = function () {
        //var f = new Date();

        //$("#TextFecDoc").datepicker({
        //    weekStart: 1,
        //    endDate: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
        //    todayHighlight: true,
        //    autoclose: true,
        //    format: 'dd/mm/yyyy',
        //});
    };
    var _createElements = function () {
        $('.currency').byaSetDecimal(0);
        $("#txtNumero").byaFormatInput('0123456789');
        $("#TextNvis").byaFormatInput('0123456789');
        $("#TextValp").byaFormatInput('0123456789');
        $("#TextFisico").byaFormatInput('0123456789');
        ActualizarDataPicker();
        LlenarCbo();
        $("#txtNumero").byaSetHabilitar(true);
    };
    var LlenarCbo = function () {
        var sourceMod = byaPage.getSource(urlSourceTip);
        $("#CboTip").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo ', Display: "NOMC_TIP", Value: "COD_TIP"
        });

    };
    var getDatos = function () {
        var Ges = {};
        Ges.COD_CON = $('#txtNumero').val();
        Ges.EST_FIN = $('#CboEst').val();
        Ges.FEC_ENT = $('#TextFecDoc').val();
        Ges.OBS_EST = $('#textObs').val();
        Ges.USUARIO = byaSite.getUsuario();
        Ges.NVISITAS = $('#TextNvis').val();
        Ges.VAL_PAGO = $('#TextValp').byaGetDecimal();
        Ges.POR_EJE_FIS = $('#TextFisico').val();
        return Ges;
    };
    var GuardarGestion = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registro de Actas", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                GestionList.refresh();
                LimpiarGestion();
                MultiplesAjax();
            }
        });
    };
    var ControlsGestion = function () {
        $("#TextFecDoc").byaSetHabilitar(true);
        $("#CboEst").byaSetHabilitar(true);
        $("#textObs").byaSetHabilitar(true);
        $("#TextNvis").byaSetHabilitar(true);
        $("#TextValp").byaSetHabilitar(true);
        $("#TextFisico").byaSetHabilitar(true);
        $("#BtnguardarGestion").byaSetHabilitar(true);
        $("#BtncancelarGestion").byaSetHabilitar(true);
    };
    var LimpiarGestion = function () {
      
        $("#TextFecDoc").val("dd/mm/yyyy");
        $("#textObs").val(" ");
        $("#CboEst").val("Seleccione...");
        $("#TextNvis").val("0");
        $("#TextValp").val("0");
        $("#TextFisico").val("0");
       

    };

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
        refresh: function () {
            $(grid).jqxGrid({ source: getDataAdapter() });
        },
        init: function () {
           
            _addHandlers();
            _Validaciones();
            _createElements();
            Load();
            //   _HabilitarE();
        }
    };
}());
var GestionList = (function () {
    "use strict";
    var grid = '#jqxgridGestion';

    var urlToAnular = "/Servicios/Contratos/wsGestion.asmx/Anular";
    var urlToGridCon = "/Servicios/wsContratosGestionS.asmx/GetActas";
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
                AbrirGestion();
            }

        });
        $("#BtnAnularGestion").click(function () {
            AnularGestion();

        });


    };
    var _Validaciones = function () {
        $("#BtnEliminarGestion").byaSetHabilitar(false);
    };
    var AbrirGestion = function () {
        _createGrid();
        ControlsGestion();
    };
    var _createElements = function () {

    };
    var getDataAdapter = function () {
        var Cod_Con = $("#txtNumero").val();
        var source = {
            datatype: "xml",
            datafields: [
                    { name: 'ID' },
	                { name: 'EST_FIN' },
                    { name: 'EST_INI' },
                    { name: 'COD_CON' },
                    { name: 'FEC_ACT', type: 'date' },
                    { name: 'NRO_DOC' },
                    { name: 'NOM_ACTA' },
                    { name: 'OBS_EST' },
                    { name: 'VAL_PAGO', type: 'number' },
                    { name: 'POR_EJE_FIS', type: 'number' }

            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'CodCon': Cod_Con }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        return dataAdapter;
    };
    var _createGrid = function () {
        $(grid).jqxGrid(
            {
                width: '100%',
                source: getDataAdapter(),
                theme: GestionList.config.theme,
                altrows: true,
                editable: false,
                autoheight: true,
                autorowheight: true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columns: [
                            { text: 'ID    ', datafield: 'ID', width: 120 },
                            { text: 'Documento     ', datafield: 'NOM_ACTA', width: 150 },
                            { text: 'Fecha del Doc    ', datafield: 'FEC_ACT', width: 150, columntype: 'datetimeinput', cellsformat: 'd' },
                            { text: 'Valor Autorizado', datafield: 'VAL_PAGO', width: 150, cellsformat: 'F2', cellsalign: 'right' },
                            { text: '% Ejecución', datafield: 'POR_EJE_FIS', cellsalign: 'right', width: 100 },
                            { text: 'Observación   ', datafield: 'OBS_EST', width: 200 }
                ]
            });

    };
    var AnularGestion = function () {
        var selectedIndex = $("#jqxgridGestion").jqxGrid('getselectedrowindex');
        var datainformations = $(grid).jqxGrid("getdatainformation");
        var rowscounts = datainformations.rowscount;
        var dataRecord = $(grid).jqxGrid('getrowdata',0);
        if (selectedIndex == 0) {
            var e = {};
            e.ID = dataRecord.ID;           
            var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
            byaPage.POST_Sync(urlToAnular, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                GestionList.refresh();
                $(msgPpal).msgBox({ titulo: "Anular Acta", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {

                }
            });
        } else {
            alert("Solo se Puede Anular el Primer Elemeno de la Tabla");
        }



    };
    var ControlsGestion = function () {

        $("#BtnEliminarGestion").byaSetHabilitar(true);

    };


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
            var selectedrowindex = $(grid).jqxGrid('getselectedrowindex');
            var dataRecord = $(grid).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        refresh: function () {
            $(grid).jqxGrid({ source: getDataAdapter() });
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
    byaSite.SetModuloP({ TituloForm: "Gestion", Modulo: "Contratos", urlToPanelModulo: "#ConsultaGestion.aspx", Cod_Mod: "CONT4", Rol: "CT_GES" });
    Gestion.config.theme = byaSite.tema
    Gestion.init();
    GestionList.config.theme = byaSite.tema
    GestionList.init();

});