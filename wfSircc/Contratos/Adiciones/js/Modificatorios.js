var Radicacion = (function () {
    "use strict";

  
    var urlToInsert = "/Servicios/Contratos/wsModificatorios.asmx/InsertAdi";
    var urlGetContratos = "/Servicios/Contratos/wsLegalizacion.asmx/GetDetContratos";
    var urlSourceTip = '/servicios/wsDatosBasicos.asmx/GetvTIPOSCONT';
    var urlSourceTip_Adiciones = "/Servicios/Contratos/wsModificatorios.asmx/GetTip_Adiciones";
    var urlSourcePla = '/EstPrev/Elaborar/wfRgEstPrev.aspx/GetvTIPO_PLAZOS';
    var urlSourcePlazos2 = '/EstPrev/Elaborar/wfRgEstPrev.aspx/GetvTIPO_PLAZOS2';
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
                AbrirRadicacion();
            }

        });
        $("#BtnDwnAbrir").click(function () {
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirRadicacion();
            }
        });
        
        $("#BtnguardarRadicacion").click(function () {

            Antes();


        });
        $("#CboPlazo1").change(function (event) {
            var args = event.args;
            var item = $('#CboPlazo1').val();
            if (item != null) {
                Radicacion.RefreshCboTPlazo2($('#CboPlazo1').val());
            }
        });

    };
    var _Validaciones = function myfunction() {
        $("#txtNumero").byaSetHabilitar(false);
        $("#CboTipoDocu").byaSetHabilitar(false);
        $("#TextPlazo1").byaSetHabilitar(false);
        $("#TextPlazo2").byaSetHabilitar(false);
        $("#CboPlazo1").byaSetHabilitar(false);
        $("#CboPlazo2").byaSetHabilitar(false);
        $("#TextValorAdi").byaSetHabilitar(false);
        $("#TextFecSus").byaSetHabilitar(false);
        $("#TextObs").byaSetHabilitar(false);   
        $("#BtnguardarRadicacion").byaSetHabilitar(false);
        $("#CboTip").change(function () {
            $("#txtNumero").byaSetHabilitar(true);


        });
    };
    var AbrirRadicacion = function () {      
        MultiplesAjax();
        ControlsRp();
        LlenarCboRadi();
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
                $('#DetContrato').DetailsJSON(contrato, DataFields, Titulo);
                $("#dvdDetContrato").fadeIn();
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });

      
       

    };
    var LlenarCboRadi = function () {
        var sourceMod = byaPage.getSource(urlSourceTip_Adiciones);
        $("#CboTipoDocu").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo ', Display: "NOM_TIP", Value: "COD_TIP"
        });
        var sourcePla = byaPage.getSource(urlSourcePla);
        $("#CboPlazo1").byaCombo({ DataSource: sourcePla, Value: "COD_TPLA", Display: "NOM_PLA" });

    }
    var ActualizarDataPicker = function () {
        //var f = new Date();

        //$("#TextFecSus").datepicker({
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
        $("#TextValorAdi").byaFormatInput('0123456789');
        $("#TextPlazo1").byaFormatInput('0123456789');
        $("#TextPlazo2").byaFormatInput('0123456789');
        $("#TextValorAdi").val(0);
        $("#TextPlazo1").val(0);
        $("#TextPlazo2").val(0);
        LlenarCbo();
        ActualizarDataPicker();
        $("#txtNumero").byaSetHabilitar(true);
    };  
    var LlenarCbo = function () {
        var sourceMod = byaPage.getSource(urlSourceTip);
        $("#CboTip").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo ', Display: "NOMC_TIP", Value: "COD_TIP"
        });

    };
    var getDatos = function () {
        var Adi = {};
               
        Adi.COD_CON = $('#txtNumero').val();
        Adi.TIP_ADI = $('#CboTipoDocu').val();
        Adi.PLA_EJE_ADI = $('#TextPlazo1').val();       
        Adi.TIPO_PLAZO1_ADI = $('#CboPlazo1').val();
        Adi.PLAZO2_ADI = $('#TextPlazo2').val();
        Adi.TIPO_PLAZO2_ADI = $('#CboPlazo2').val();
        Adi.VAL_ADI = $('#TextValorAdi').byaGetDecimal();
        Adi.FEC_SUS_ADI = $('#TextFecSus').val();
        Adi.OBSER = $('#TextObs').val();

        return Adi;
    }
    var GuardarAdi = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);   
            $(msgPpal).msgBox({ titulo: "Registro de Adiciones", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                Modificatorios.refresh();
            }
        });


    }     
    var ControlsRp = function () {
        $("#CboTipoDocu").byaSetHabilitar(true);
        $("#TextPlazo1").byaSetHabilitar(true);
        $("#TextPlazo2").byaSetHabilitar(true);
        $("#CboPlazo1").byaSetHabilitar(true);
        $("#CboPlazo2").byaSetHabilitar(true);
        $("#TextValorAdi").byaSetHabilitar(true);
        $("#TextFecSus").byaSetHabilitar(true);
        $("#TextObs").byaSetHabilitar(true);
        $("#BtnguardarRadicacion").byaSetHabilitar(true);
    };
    var LimpiarRp = function () {
    
    };   
    var Antes = function () {
        if ($("#CboTipoDocu").val() == "") {
            alert("Debe seleccionar un tipo de documento");
        }
        if ($("#CboTipoDocu").val() == 1)
        {
            if ($("#TextPlazo1").val() > 0 || $("#TextPlazo2").val() > 0 && ($("#TextValorAdi").val() > 0)) {
                GuardarAdi();
            } else { alert("El plazo y el valor deben ser mayor a 0"); }
        }
        if ($("#CboTipoDocu").val() == 2)
        {
            if ($("#TextValorAdi").byaGetDecimal() > 0)
            {
                GuardarAdi();
            } else { alert("El valor debe ser mayor a 0"); }
        }

        if ($("#CboTipoDocu").val() == 3)
        {
            if ($("#TextPlazo1").val() > 0 || $("#TextPlazo2").val() > 0)
            {
              GuardarAdi();
            } else { alert("El plazo debe ser mayor a 0"); }
         }

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
        RefreshCboTPlazo2: function (cod) {
            var sourcePlazos2 = byaPage.getSource(urlSourcePlazos2, { cod_tpla: "'" + cod + "'" });
            $("#CboPlazo2").byaCombo({ DataSource: sourcePlazos2, Value: "COD_TPLA", Display: "NOM_PLA" });
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
var Modificatorios = (function () {
    "use strict";
    var grid = '#jqxgridHisto';
 
    var urlToDelete = "/Servicios/Contratos/wsModificatorios.asmx/DeleteAdi";
    var urlToGridAdi = "/Servicios/Contratos/wsModificatorios.asmx/GetModificatorios";
    var Cod_Con;
    var byaRpta;
    var msgPpal = "dvdUlt";
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
                AbrirModi();
            }

        });
        $("#BtnEliminarAdi").click(function () {          
            EliminarAdi();          
        });
       

    };
    var _Validaciones = function () {
        $("#BtnEliminarAdi").byaSetHabilitar(false);
 
    };  
    var AbrirModi = function () {
        _createGrid();
        ControlsRp();
    };
    var _createElements = function () {
      
    };
    var getDataAdapter = function () {
        var Cod_Con = $("#txtNumero").val();
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'NRO_ADI' },
                    { name: 'NOM_ADI' },
                    { name: 'FEC_SUS_ADI', type: 'date' },
                    { name: 'PLA_EJE_ADI' },
                    { name: 'VAL_ADI' },
                    { name: 'OBSER' },              

            ],
            async: true,
            record: 'Table',
            url: urlToGridAdi,
            data: { 'Cod_Con': Cod_Con }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        return dataAdapter;
    };
    var _createGrid = function () {
        $(grid).jqxGrid(
            {
                width: '100%',
                source: getDataAdapter(),
                theme: Modificatorios.config.theme,
                altrows: true,
                editable: false,
                autoheight: true,
                autorowheight: true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columns: [
                  { text: 'N° Documento     ', datafield: 'NRO_ADI' },
                  { text: 'Tipo de Documento ', datafield: 'NOM_ADI' },
                  { text: 'Fecha de Suscripcion', datafield: 'FEC_SUS_ADI', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right' },
                  { text: 'Plazo de Ejecucion', datafield: 'PLA_EJE_ADI' },
                  { text: 'Valor Adicion', datafield: 'VAL_ADI', },
                  { text: 'Observacion', datafield: 'OBSER' },
               
                ]
            });

    };
    var EliminarAdi = function () {
        var datainformations = $(grid).jqxGrid("getdatainformation");
        var rowscounts = datainformations.rowscount;
        var dataRecord = $(grid).jqxGrid('getrowdata', rowscounts - 1);
        var e = {};        
        e.NRO_ADI = dataRecord.NRO_ADI;
        e.COD_CON = Cod_Con;

        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToDelete, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Modificatorios.refresh();
            $(msgPpal).msgBox({ titulo: "Eliminar Adicion", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {

            }
        });


    };  
    var ControlsRp = function () {
  
        $("#BtnEliminarAdi").byaSetHabilitar(true);
      
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
    byaSite.SetModuloP({ TituloForm: "Modificatorios/Adiciones", Modulo: "Contratos", urlToPanelModulo: "#", Cod_Mod: "CONT4", Rol: "CT_ADI" });
    Radicacion.config.theme = byaSite.tema
    Radicacion.init();
    Modificatorios.config.theme = byaSite.tema
    Modificatorios.init();
 
});
