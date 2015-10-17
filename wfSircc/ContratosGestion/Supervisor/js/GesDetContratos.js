var Contratos = (function () {
    "use strict";
    
    var tema;
    var CodCon;
    var urlModulo = "/ContratosGestion/Supervisor/GesContratos.aspx";
    var TituloModulo = "Supervisor";
    var TituloForm = "Detalle del Contrato <small> por Supervisor</small>";
    var gridCon = '#jqxgridSol';
    var msgPpal = "#LbMsg";

    var urlToGridCon = "/Servicios/wsContratosGestionS.asmx/GetActas";
    var urlToSig = '/Servicios/wsContratosGestionS.asmx/GetActasSiguientes';

    var urlToRecibir = "/Servicios/wsMisSolicitudes.asmx/Recibir";
    var urlToRevisar = "/Servicios/wsMisSolicitudes.asmx/Revisar";
    var urlGenActa = "/ashx/generarActa.ashx?idacta=";
    var urlContrato = "DetContrato.html";
    var urlToAbrirCon = "/Servicios/wsContratosGestionS.asmx/GetDetContratos";

    var urlGetPlantillasActas = '/Servicios/wsContratosGestionS.asmx/GetPlantillasActas';
    var _createElements = function () {
        CodCon = $.getUrlVar("cod_con");
        $("#HeadRutaModulo").html("<a href='" + urlModulo + "'><i class='icon-dashboard'></i>" + TituloModulo + "</a>");
        $("#HeadRutaPagina").html("<i class='icon-file-alt'></i>" + TituloForm);

        $("#TituloForm").html(TituloForm);

        _AbrirCon();
        tema = Contratos.config.theme;

        var sourceFil = byaPage.getSource(urlToSig, { CodCon: CodCon });
        $("#CboActaSig").byaCombo({ placeHolder: "Seleccione ...", DataSource: sourceFil, Value: "codigo", Display: "nombre" });
    };
    var _addHandlers = function () {

        $('#CboActaSig').change(function (event) {
            refreshCboPlantilla();
        });
        
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $('#BtnNuevo').click(function () {
            _Nuevo();
        });
        $('#BtnImprimir').click(function () {
            _Imprimir();
        });
        
        
        $('.detalle').click(function () {
            _Detalle();
        });
        $('#BtnDetalle').click(function () {
            _Detalle();
        });
        $(gridCon).on('rowdoubleclick', function (event) {
            _Detalle();
        });
    };
    var refreshCboPlantilla = function () {
        var ClaActa = $('#CboActaSig').val();
        var source = byaPage.getSource(urlGetPlantillasActas, { ClaActa: "'" + ClaActa + "'" });
        $("#CboPlantilla").byaCombo({
            DataSource: source, placeHolder: 'Seleccione ...', Display: "NOM_PLA", Value: "URL_FORM"
        });
    };
    var _mostrarVentana = function () {
        $('#modalDetalle').modal('show');
    };
    var _ocultarVentana = function () {
        $('#modalDetalle').modal('hide');
    }
    var _mostrarRevisar = function () {
        $('#modalRevisar').modal('show');
    };
    var _ocultarRevisar = function () {
        $('#modalRevisar').modal('hide');
    }
    var _mostrarRecibir = function () {
        $('#modalRecibir').modal('show');
    };
    var _ocultarRecibir = function () {
        $('#modalRecibir').modal('hide');
    };
    var _recibirGuardar = function () {
        var hr = {};
        hr.IDE = Contratos.ID_HREV;
        hr.OBS_RECIBIDO_ABOG = $("#txtObsRc").val();
        var jsonData = "{'hr':" + JSON.stringify(hr) + "}";

        byaPage.POST_Sync(urlToRecibir, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje);

            _createGridCon();
            _ocultarRecibir();
        });
    };
    var _revisarGuardar = function () {
        var hr = {};
        hr.CONCEPTO_REVISADO = $("#cboConceptoRv").val();
        hr.OBS_REVISADO = $("#txtObsRv").val();
        hr.IDE = Contratos.ID_HREV;
        var jsonData = "{'hr':" + JSON.stringify(hr) + "}";

        byaPage.POST_Sync(urlToRevisar, jsonData, function (result) {
           var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje);

            _createGridCon();
            _ocultarRevisar();
        });
    };
    var _recibir = function () {
        var dataRecord = Contratos.getRecord();
        if (dataRecord != null) {
            var now = new Date();
            Contratos.ID_HREV = dataRecord.ID_HREV;
            $("#txtEstadoRc").val(dataRecord.NOM_EST_SOL);
            $("#txtNSolRc").val(dataRecord.COD_SOL);
            $("#txtObjConRc").val(dataRecord.OBJ_SOL);
            $("#txtObsRc").val(dataRecord.OBS_REC);
            $("#txtFecRecRc").val(byaSite.FechaShort(now));
            _mostrarRecibir();
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }

    };
    var _revisar = function () {
        var dataRecord = Contratos.getRecord();

        if (dataRecord != null) {

            Contratos.ID_HREV = dataRecord.ID_HREV;
            $("#txtEstadoRv").val(dataRecord.NOM_EST_SOL);
            $("#txtNSolRv").val(dataRecord.COD_SOL);
            $("#txtObjConRv").val(dataRecord.OBJ_SOL);
            $("#txtObsRv").val(dataRecord.OBS_REV);
            $("#txtFecRecRv").val(dataRecord.FEC_RECIBIDO);

            _mostrarRevisar();
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }


    };
    var _Detalle = function () {
        //$.get(urlDetSolicitud, function (data) {
        //    $("#secDetalle").html(data);
        //});
    };

    var _loadDetContratos = function () {
        $.get(urlContrato, function (data) {
            $("#detContrato").html(data);
        });
    };

    function IsNullOrEmpty(string) {
        return (string === "" || string === null);
    }
    var _Nuevo = function () {
        var urlTarget = $("#CboPlantilla").val();
        if (!IsNullOrEmpty(urlTarget)) {
            byaSite.AbrirPagina(urlTarget + "?cod_con=" + CodCon);
        }
        else {
            alert("No hay configurado ningún formulario destino");
        }
    };
    var CargasActas = function () {
        _createGridCon();
    };
    var _Imprimir=function(){
        var dataRecord = Contratos.getRecord();
        byaSite.AbrirPagina(urlGenActa + dataRecord.ID );
    };

    var _AbrirCon = function () {
        var sw = false;
        CodCon = $.getUrlVar("cod_con");
        
        if (CodCon == "") {
            $(msgPpal).msgBox({ titulo: "CONTRATOS", mensaje: "no se especificó ningun contrato", tipo: false });
            return false;
        }
        var e = ContratosDAO.GetPk(CodCon);

        if (e.Numero == 0) {
            $(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "CONTRATO N° " + CodCon + " no encontrada...!!!", tipo: "warning" });
        }
        else {
            var Titulo = "INFORMACION DETALLADA DEL CONTRATO";
            $('#DetContrato').DetailsJSON(e, ContratosDAO.GetDataFields(), Titulo);

            if (e.Cod_Act == "00") {
                $(msgPpal).msgBox({ titulo: "Gestión", mensaje: "El contrato no se ha Legalizado", tipo: "warning" });
                $("#BtnNuevo").byaSetHabilitar(false);
                $("#BtnEditar").byaSetHabilitar(false);
                $("#CboActaSig").byaSetHabilitar(false);
            }
            if (e.Cod_Act == "07") {
                $(msgPpal).msgBox({ titulo: "Gestión", mensaje: "El contrato esta Anulado", tipo: "warning" });
                $("#BtnNuevo").byaSetHabilitar(false);
                $("#BtnEditar").byaSetHabilitar(false);
                $("#CboActaSig").byaSetHabilitar(false);
            }

            CargasActas();
            sw = true;
            if (e.Numero != null) {
                //$(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "No se puede editar la solicitud, esta asociada a un Estudio Previo", tipo: "info" });
                //$("#editarButton").byaSetHabilitar(false);
            } else {
                $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "Presione editar para modificar la solicitud", tipo: "info" });
                $("#editarButton").byaSetHabilitar(true);
            }
        }

        return sw;
    };

    var _AbrirConX = function () {
        var sw = false;
        var CodCon = $.getUrlVar("cod_con");
        $("#txtCodCon").val(CodCon);
        if (CodCon == "") {
            $(msgPpal).msgBox({ titulo: "CONTRATOS", mensaje: "no se especificó ningun contrato", tipo: false });
            //$("#txtNumero").focus();
            return false;
        }
        var parametrosJSON = { "CodCon": CodCon };
        $.ajax({
            type: "POST",
            url: urlToAbrirCon,
            data: byaPage.JSONtoString(parametrosJSON),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                //$(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "Abriendo Contrato.... ", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e.Numero == 0) {
                    $(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "CONTRATO N° " + CodCon + " no encontrada...!!!", tipo: "warning" });
                }
                else {
                    $("#txtObjCon").val(e.Objeto);
                    $("#txtValTot").byaSetDecimal(e.Valor_Contrato);
                    $("#TxtDepSol").val(e.DependenciaNec);
                    $("#TxtEstado").val(e.Estado);
                    if (e.Cod_Act == "00") {
                        $(msgPpal).msgBox({ titulo: "Gestión", mensaje: "El contrato no se ha Legalizado", tipo: "warning" });
                        $("#BtnNuevo").byaSetHabilitar(false);
                        $("#BtnEditar").byaSetHabilitar(false);
                        $("#CboActaSig").byaSetHabilitar(false);
                    }
                    if (e.Cod_Act == "07") {
                        $(msgPpal).msgBox({ titulo: "Gestión", mensaje: "El contrato esta Anulado", tipo: "warning" });
                        $("#BtnNuevo").byaSetHabilitar(false);
                        $("#BtnEditar").byaSetHabilitar(false);
                        $("#CboActaSig").byaSetHabilitar(false);
                    }
                    
                    CargasActas();
                    sw = true;
                    if (e.Numero != null) {
                        //$(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "No se puede editar la solicitud, esta asociada a un Estudio Previo", tipo: "info" });
                        //$("#editarButton").byaSetHabilitar(false);
                    } else {
                        $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "Presione editar para modificar la solicitud", tipo: "info" });
                        $("#editarButton").byaSetHabilitar(true);
                    }
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
        return sw;
    };
   
    //crea GridTipos
    var _createGridCon = function () {
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
                    { name: 'VAL_PAGO', type: 'number' }

            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'CodCon': CodCon }
        };

        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        };

        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
        // initialize jqxGrid

        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: Contratos.config.theme,
                        localization: byaPage.getLocalization(),
                        showaggregates: true,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        enabletooltips: true,
                        columns: [
                            { text: 'ID', datafield: 'ID', width: 80, columntype: 'numberinput', cellsalign: 'right' },
                            { text: 'Documento', datafield: 'NOM_ACTA', width: 100 },
                            { text: 'N° Documento ', datafield: 'NRO_DOC', width: 100 },
                            { text: 'Fecha del Doc.', datafield: 'FEC_ACT', width: 150, columntype: 'datetimeinput', cellsformat: 'd' },
                            { text: 'Valor Autorizado a Pagar', datafield: 'VAL_PAGO', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', aggregates: ['sum'] },
                            { text: 'Observación', datafield: 'OBS_EST', columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2' },
                            { text: '% Ejecución ', datafield: 'POR_EJE_FIS', width: 100 }
                        ]
                    });

    };
    return {
        editedRows: null,
        config: {
            theme: null
        },
        getRecord : function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            if (dataRecord != null) {
            }
            return dataRecord;
        },
        init: function () {
            _createElements();
            _addHandlers();
            _createGridCon();
        }
    };
} ());

$(function () {
    Contratos.config.theme = byaSite.tema;
    Contratos.init();
});