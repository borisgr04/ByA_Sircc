var Cesiones = (function () {
    "use strict";
    var urlToInsert = "/Servicios/Contratos/wsCesiones.asmx/Insert";   
    var urlGetContratos = "/Servicios/Contratos/wsLegalizacion.asmx/GetDetContratos";
    var urlSourceTip = '/servicios/wsDatosBasicos.asmx/GetvTIPOSCONT';
    var urlSourceTer = "/Servicios/wsDatosBasicos.asmx/GetNomTercerosPk";
    var urlModalTerceros = "/DatosBasicosG/Terceros/Tercerosh.html";
    var Cod_Con;
    var byaRpta;
    var msgPpal = "#LbMsg";
    var _addHandlers = function () {
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#BtnDwnAbrir").click(function () {
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                //AbrirRadicacion();
            }
        });
        $('#TxtIdeInter').blur(function () {
            Cesiones.BuscarTercero($('#TxtIdeInter'), $('#TxtNomCon'));
        });
        $("#txtNumero").blur(function (event) {

            var l = $("#txtNumero").val().length;
            if (l >= 1 && l <= 4) {
                Cod_Con = parseInt($("#txtNumero").val());
                $("#txtNumero").val(byaSite.getVigencia() + $("#CboTip").val() + Cod_Con.padLeft(4, "0"));

            }
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirCesiones();
            }

        });
        //$("#BtnBuscCon").click(function () {
        //    ModTer.showWindow(function (ter) {
        //        $("#TxtNomCon").val(ter.NOMBRE);
        //        $("#TxtIdeInter").val(ter.IDE_TER);
        //    });
        //});
        $("#BtnguardarCesiones").click(function () {
            GuardarCesion();
        });
        $("#BtncancelarCesiones").click(function () {
            LimpiarCesiones();
        });  
        $("#BtnBuscCon").click(function () {
            $.get(urlModalTerceros, function (data) {
                $("#secBsqTerceros").html(data);
                mTerceros.showWindow(function (item) {
                    $("#TxtNomCon").val(item.NOMBRE);
                    $("#TxtIdeInter").val(item.IDE_TER);

                    //_AbrirTercero(item.IDE_TER);
                });
            });
        });
    };
    var _Validaciones = function myfunction() {
        $("#txtNumero").byaSetHabilitar(false);
        $("#TextFecCesion").byaSetHabilitar(false);
        $("#TextPlazE").byaSetHabilitar(false);
        $("#TextValor").byaSetHabilitar(false);
        $("#TextRes").byaSetHabilitar(false);
        $("#TextFecRes").byaSetHabilitar(false);
        $("#TxtIdeInter").byaSetHabilitar(false);       
        $("#BtncancelarCesiones").byaSetHabilitar(false);
        $("#BtnguardarCesiones").byaSetHabilitar(false);
        $("#BtnBuscCon").byaSetHabilitar(false);
        $("#CboTip").change(function () {
            $("#txtNumero").byaSetHabilitar(true);
        });
    };
    var AbrirCesiones = function () {
        MultiplesAjax();
        ControlsCesiones();
      
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




    };
    var ActualizarDataPicker = function () {
        var f = new Date();
        //$("#TextFecRes").datepicker({
        //    weekStart: 1,
        //    endDate: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
        //    todayHighlight: true,
        //    autoclose: true,
        //    format: 'dd/mm/yyyy',
        //});
        //$("#TextFecCesion").datepicker({
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
        $("#TextValor").byaFormatInput('0123456789');
        $("#TextRes").byaFormatInput('0123456789');
        $("#TextPlazE").byaFormatInput('0123456789');
       
        LlenarCbo();
        ActualizarDataPicker();
    };
    var LlenarCbo = function () {
        var sourceMod = byaPage.getSource(urlSourceTip);
        $("#CboTip").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo ', Display: "NOMC_TIP", Value: "COD_TIP"
        });

    };
    var getDatos = function () {
        var Ces = {};
        Ces.COD_CON = $('#txtNumero').val();
        Ces.NIT_NUE = $('#TxtIdeInter').val();
        Ces.PLA_CES = $('#TextPlazE').val();
        Ces.VAL_CES = $('#TextValor').byaGetDecimal();
        Ces.FEC_CES = $('#TextFecCesion').val();
        Ces.RES_AUT = $('#TextRes').val();
        Ces.FEC_RES = $('#TextFecRes').val();    
        return Ces;
    };
    var GuardarCesion = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registro de Cesiones", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                CesionList.refresh();
                MultiplesAjax();
            }
        });


    };
    var ControlsCesiones = function () {       
        $("#TextFecCesion").byaSetHabilitar(true);
        $("#TextPlazE").byaSetHabilitar(true);
        $("#TextValor").byaSetHabilitar(true);
        $("#TextRes").byaSetHabilitar(true);
        $("#TextFecRes").byaSetHabilitar(true);
        $("#TxtIdeInter").byaSetHabilitar(true);
        $("#BtnBuscCon").byaSetHabilitar(true);
        $("#BtncancelarCesiones").byaSetHabilitar(true);
        $("#BtnguardarCesiones").byaSetHabilitar(true);
    };
    var LimpiarCesiones = function () {
        $("#TextFecCesion").val("dd/mm/yyy");
        $("#TextPlazE").val(" ");
        $("#TextValor").val(" ");
        $("#TextRes").val(" ");
        $("#TextFecRes").val("dd/mm/yyy");
        $("#TxtIdeInter").val(" ");
        $("#TxtNomCon").val(" ");
        
    };
    
    return {
        id_ep: null,
        fnresultado: null,
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        BuscarTercero: function (txtIde, txtNom) {
            var ide_ter = txtIde.val();
            if (ide_ter != "") {
                var source = byaPage.getSource(urlSourceTer, { ide_ter: "'" + ide_ter + "'" });
                if (source == "0") {
                    txtNom.val("");
                }
                else {
                    txtNom.val(source);
                }
            }
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
            ModTer.init();
            //   _HabilitarE();
        }
    };
}());
var CesionList = (function () {
    "use strict";
    var grid = '#jqxgridHisto';

    var urlToDelete = "/Servicios/Contratos/wsCesiones.asmx/Delete";
    var urlToGridAdi = "/Servicios/Contratos/wsCesiones.asmx/GetCesiones";
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
                AbrirCesion();
            }

        });
        $("#BtnEliminarCesiones").click(function () {
            EliminarCesion();         
            
        });


    };
    var _Validaciones = function () {
        $("#BtnEliminarCesiones").byaSetHabilitar(false);
    };
    var AbrirCesion = function () {
        _createGrid();
        ControlsCesion();
    };
    var _createElements = function () {
        $("#txtNumero").byaSetHabilitar(true);
    };
    var getDataAdapter = function () {
        var Cod_Con = $("#txtNumero").val();
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'NIT_ANT' },
                    { name: 'NIT_NUE' },
                    { name: 'PLA_CES'},
                    { name: 'VAL_CES' },
                    { name: 'FEC_CES', type: 'date' },
                    { name: 'RES_AUT' },
                    { name: 'COD_CON' },
                    { name: 'FEC_RES', type: 'date' },
                    

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
                theme: CesionList.config.theme,
                altrows: true,
                editable: false,
                autoheight: true,
                autorowheight: true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columns: [
                  { text: 'Nit Anterior     ', datafield: 'NIT_ANT' },
                  { text: 'Nit Actual ', datafield: 'NIT_NUE' },
                  { text: 'Plazo Cesion', datafield: 'PLA_CES' },
                  { text: 'Valor Cesion', datafield: 'VAL_CES' },
                  { text: 'Fecha Cesion', datafield: 'FEC_CES', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right' },
                  { text: 'Resolucion', datafield: 'RES_AUT' },
                  { text: 'Nº Contrato', datafield: 'COD_CON' },
                  { text: 'Fecha Reslucion', datafield: 'FEC_RES', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right' },


                ]
            });

    };
    var EliminarCesion = function () {
        var selectedIndex = $("#jqxgridHisto").jqxGrid('getselectedrowindex');
        var datainformations = $(grid).jqxGrid("getdatainformation");
        var rowscounts = datainformations.rowscount;
        var dataRecord = $(grid).jqxGrid('getrowdata', rowscounts - 1);       
        if (selectedIndex == rowscounts - 1) {
            var e = {};
            e.NIT_ANT = dataRecord.NIT_ANT;
            e.NIT_NUE = dataRecord.NIT_NUE
            e.COD_CON = Cod_Con;
            var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
            byaPage.POST_Sync(urlToDelete, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                CesionList.refresh();
                $(msgPpal).msgBox({ titulo: "Eliminar Cesion", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {

                }
            });
        } else {
            alert("Solo se Puede Eliminar el Ultimo Elemeno de la Tabla");
        }
       


    };
    var ControlsCesion = function () {

        $("#BtnEliminarCesiones").byaSetHabilitar(true);

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
    byaSite.SetModuloP({ TituloForm: "Cesion", Modulo: "Contratos", urlToPanelModulo: "#", Cod_Mod: "CONT4", Rol: "CT_CES" });
    Cesiones.config.theme = byaSite.tema
    Cesiones.init();
    CesionList.config.theme = byaSite.tema
    CesionList.init();

});