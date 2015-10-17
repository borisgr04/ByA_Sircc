var Contratos = (function () {
    "use strict";
    
    var tema;
    var CodCon;
    var IdeInf;
    var urlModulo = "/ContratosGestion/Contratista/GesContratos.aspx";
    var TituloModulo = "Contratista";
    var TituloForm = "Gestión de Informes de Contrato <small> Contratista</small>";
    var gridCon = '#jqxgridSol';
    var msgPpal = "#LbMsg";
    
    var urlToGridCon = "/Servicios/wsContratosGestionC.asmx/GetInformes";
    
    var urlToInsert = "/Servicios/wsContratosGestionC.asmx/InsertInforme";
    var urlToUpdate= "/Servicios/wsContratosGestionC.asmx/UpdateInforme";
    
    var urlToSS = "GesSSContratos.aspx?cod_con=";
    var urlToDoc = "GesDocCuenta.aspx?cod_con=";
    var urlToInfInf = "DetInforme.aspx?cod_con=";
    var urlInfoAct = "/ashx/generarInfoAct.ashx?id=";
    var urlToDetContratos = "GesDetContratos.aspx";


    var urlToAbrirCon = "/Servicios/wsContratosGestionS.asmx/GetDetContratos";
    
    var oper = "";
    var ejecutar;
    
    var _addHandlers = function () {
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $('#BtnNuevo').click(function () {
            _Nuevo();
        });
        $('#BtnSS').click(function () {
            _seguridadsocial();
        });
        $('#BtnDoc').click(function () {
            _adjuntos();
        });
        
        $('#BtnSP').click(function () {
            _serviciosproductos();
        });
        $('#BtnImprimir').click(function () {
            _Imprimir();
        });
        $('#BtnEditar').click(function () {
            _editar();
        });
        $('#BtnGuardar').click(function () {
            _guardar();
        });
        
        $('.detalle').click(function () {
            _Detalle();
        });
        $('#BtnDetalle').click(function () {
            _Detalle();
        });
        $('#hrefSS').click(function () {
            return _seguridadsocial();
        });
        $('#hrefDoc').click(function () {
            return _adjuntos();
        });
        $('#hrefInfInf').click(function () {
            return _showInfInf();
        });
        
        $(gridCon).on('rowdoubleclick', function (event) {
            _Detalle();
        });
    };

    var _createElements = function () {
        CodCon = $.getUrlVar("cod_con");
        $("#HeadRutaModulo").html("<a href='" + urlModulo + "'><i class='icon-dashboard'></i>" + TituloModulo + "</a>");
        $("#HeadRutaPagina").html("<i class='icon-file-alt'></i>" + TituloForm);
        $("#TituloForm").html(TituloForm);
        _AbrirCon();
        tema = Contratos.config.theme;
    };
    var _serviciosproductos = function () {
        alert("Servicios y Productos... implementar");
    };
    var _seguridadsocial = function () {
        var dataRecord = Contratos.getRecord();
        if (dataRecord != null) {
            byaSite.AbrirPagina(urlToSS + dataRecord.COD_CON + "&ide_inf=" + dataRecord.ID);
            
        } else {
            $('#myTab a[href="#Inf"]').tab('show')
            alert("Seleccione un contrato");
            return false;
        }
    };
    var _showInfInf = function () {
        var dataRecord = Contratos.getRecord();
        if (dataRecord != null) {
            byaSite.AbrirPagina(urlToInfInf + dataRecord.COD_CON + "&ide_inf=" + dataRecord.ID);

        } else {
            $('#myTab a[href="#Inf"]').tab('show')
            alert("Seleccione un contrato");
            return false;
        }
    };
    
    var _adjuntos = function () {
        var dataRecord = Contratos.getRecord();
        if (dataRecord != null) {
            byaSite.AbrirPagina(urlToDoc + dataRecord.COD_CON + "&ide_inf=" + dataRecord.ID);
        } else {
            $('#myTab a[href="#Inf"]').tab('show')
            alert("Seleccione un contrato");
            return false;
        }
    };

    var _mostrarVentana = function () {
        $('#modalDetalle').modal('show');
        
    };
    var _ocultarVentana = function () {
        $('#modalDetalle').modal('hide');
    }

    var _editar = function () {
        _mostrarDatos();
        var est=$("#txtEST_INF").val();
        if (!(est == "BO" || est == "AC")) {
            ejecutar = _sinPermiso;
        }
        else {
            ejecutar = _guardarModificacion;
        }
    };

    var _sinPermiso = function () {
        _ocultarVentana();
        byaMsgBox.alert("Los datos del informe no pueden ser modificados");
    }

    var _getDatosForm = function(){
        var dataRecord = {};
        //alert(CodCon);
        dataRecord.COD_CON = CodCon;  //$("#txtCodCon").val();
        dataRecord.ID = $("#txtID").val();
        dataRecord.NUM_INF=$("#txtNUM_INF").val();
        dataRecord.EST_INF=$("#txtEST_INF").val();

        dataRecord.FEC_INF = $("#txtFEC_INF").val();
        dataRecord.FEC_INI=$("#txtFEC_INI").val();
        dataRecord.FEC_FIN=$("#txtFEC_FIN").val();

        dataRecord.DES_INF=$("#txtDES_INF").val();
        dataRecord.VAL_PAG=$('#txtVAL_PAG').byaGetDecimal();
        dataRecord.CAN_HOJ = $("#txtCAN_HOJ").val();
        dataRecord.OBL_FAC=$("#txtOBL_FAC").val();

        dataRecord.NOT_INF=$("#txtNOT_INF").val();
        dataRecord.NOT2_INF = $("#txtNOT2_INF").val();

        dataRecord.TIP_INF = $("#txtTIP_INF").val();

        
        
        return dataRecord;
    };
    var _guardar = function () {
        ejecutar();
    };
    var _guardarNuevo = function () {
        var jsonData = "{'Reg':" + JSON.stringify(_getDatosForm()) + "}";
        //alert(JSON.stringify(_getDatosForm()));
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            
            byaMsgBox.alert(byaRpta.Mensaje);
            
            if (!byaRpta.Error) {
                _createGridCon();
                _ocultarVentana();
            }
        });
    };
    var _guardarModificacion = function () {
        var jsonData = "{'Reg':" + JSON.stringify(_getDatosForm()) + "}";
        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            
            byaMsgBox.alert(byaRpta.Mensaje+" - id "+byaRpta.id);
            if (!byaRpta.Error) {
                _createGridCon();
                _ocultarVentana();
            }
            
        });
    };
    
    var _mostrarDatos = function () {
        var dataRecord = Contratos.getRecord();
        if (dataRecord != null) {
            //var now = new Date();
            $("#txtID").val(dataRecord.ID);
            $("#txtNUM_INF").val(dataRecord.NUM_INF);
            
            $("#txtEST_INF").val(dataRecord.EST_INF);
            
            if (dataRecord.EST_INF == "RV") {
                $("#txtEST_INF").byaSetHabilitar(false);
                $('#BtnGuardar').byaSetHabilitar(false);
            } else {
                $("#txtEST_INF").byaSetHabilitar(true);
                $('#BtnGuardar').byaSetHabilitar(true);
            }

            $("#txtFEC_INF").val(byaPage.FechaShortX(dataRecord.FEC_INF));
            $("#txtFEC_INI").val(byaPage.FechaShortX(dataRecord.FEC_INI));
            $("#txtFEC_FIN").val(byaPage.FechaShortX(dataRecord.FEC_FIN));

            $("#txtDES_INF").val(dataRecord.DES_INF);
            $('#txtVAL_PAG').byaSetDecimal(dataRecord.VAL_PAG);
            $("#txtCAN_HOJ").val(dataRecord.CAN_HOJ);
            $("#txtOBL_FAC").val(dataRecord.OBL_FAC);

            $("#txtNOT_INF").val(dataRecord.NOT_INF);
            $("#txtNOT2_INF").val(dataRecord.NOT2_INF);
            
            $("#txtTIP_INF").val(dataRecord.TIP_INF);

            _mostrarVentana();
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
        $("#txtID").val(0);
        $("#txtNUM_INF").val(0);
        $("#txtEST_INF").val("BO");
        var now = new Date();
        var fi = new Date();
        var ff = new Date();
        ff= fi;
        $("#txtFEC_INF").val(byaPage.FechaShortX(now));
        //consultar ultimo periodo
        $("#txtFEC_INI").val(byaPage.FechaShortX(fi));
        $("#txtFEC_FIN").val(byaPage.FechaShortX(ff));

        $("#txtDES_INF").val("");
        $('#txtVAL_PAG').byaSetDecimal(0);
        $("#txtCAN_HOJ").val(0);
        $("#txtOBL_FAC").val("SI");

        $("#txtNOT_INF").val("");
        $("#txtNOT2_INF").val("");
        $("#fsDatos").byaSetHabilitar(true);
        //oper = "nuevo";
        ejecutar = _guardarNuevo;
        _mostrarVentana();

        //byaSite.AbrirPagina(urlTarget + "?cod_con=" + $("#txtCodCon").val());
    };
    var CargasActas = function () {
        _createGridCon();
    };
    var _Imprimir = function () {
        
        var dataRecord = Contratos.getRecord();
        
        SeleccionarDocDA(dataRecord);
        //byaSite.AbrirPagina(urlInfoAct + dataRecord.ID);
    };

    var SeleccionarDocDA = function (data) {
        $("#modalInfoAct").modal('show');
        $('#dvdemb').html(mostrarPDF(data.ID));
    };

    var mostrarPDF = function (i) {
        var url = "/ashx/generarInfoAct.ashx?id=" + i + '#toolbar=1';;
        var doc = "<embed src='" + url + "' width='100%' height='400'>";
        return doc;
    };

    var _AbrirCon = function () {
        var sw = false;
        var CodCon = $.getUrlVar("cod_con");
        //$("#txtCodCon").val(CodCon);
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
                        
                }
                if (e.Cod_Act == "07") {
                    $(msgPpal).msgBox({ titulo: "Gestión", mensaje: "El contrato esta Anulado", tipo: "warning" });
                    $("#BtnNuevo").byaSetHabilitar(false);
                    $("#BtnEditar").byaSetHabilitar(false);
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

    
    //crea GridTipos
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
                    { name: 'NUM_INF' },
                    { name: 'PERIODO' },
                    { name: 'FEC_INF', type: 'date' },
                    { name: 'FEC_INI', type: 'date' },
                    { name: 'FEC_FIN', type: 'date' },
                    { name: 'VAL_PAG', type: 'number'},
                    { name: 'EST_INF' },
                    { name: 'DES_INF'},
                    { name: 'ID_ACTA'},
                    { name: 'CAN_HOJ'},
                    { name: 'OBL_FAC' },
                    { name: 'NOT_INF' },
                    { name: 'NOT2_INF' },
                    { name: 'ID' },
                    { name: 'COD_CON' },
                    { name: 'USAP' },
                    { name: 'TIP_INF' },
                    { name: 'FE_REG', type: 'date' }
            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'CodCon': CodCon }
        };

        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }

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
                            { text: 'Informe N°', datafield: 'NUM_INF', width: 100, columntype: 'numberinput', cellsalign: 'right' },
                            { text: 'Acta Supervisor', datafield: 'ID_ACTA', width: 100 },
                            { text: 'Fecha Informe', datafield: 'FEC_INF', width: 150, columntype: 'datetimeinput', cellsformat: 'd' },
                            { text: 'Periodo', datafield: 'PERIODO', width: 200 },
                            { text: 'Valor a Pagar', datafield: 'VAL_PAG', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', aggregates: ['sum'] },
                            { text: 'Resumen', datafield: 'DES_INF', width: 150 },
                            { text: 'Estado', datafield: 'EST_INF', width: 100 },
                            { text: 'Nota 1', datafield: 'NOT_INF', width: 100 },
                            { text: 'Nota 2', datafield: 'NOT2_INF', width: 100 },
                            { text: 'Obligado a Facturar', datafield: 'OBL_FAC', width: 100 },
                            { text: 'Cantidad Hojas', datafield: 'CAN_HOJ', width: 100 },
                            { text: 'ID', datafield: 'ID', width: 80, columntype: 'numberinput', cellsalign: 'right' },
                            { text: 'Código Contrato', datafield: 'COD_CON', width: 100 },
                            { text: 'Usuario', datafield: 'USAP', width: 100 },
                            { text: 'Fecha Registro', datafield: 'FE_REG', width: 100, columntype: 'datetimeinput', cellsformat: 'd' }
                        ]
                    });
    };
    return {
        editedRows: null,
        config: {
            theme: null
        },
        getIde_Inf: function () {
            if ($.getUrlVar("ide_inf") != null) $.getUrlVar("ide_inf").replace("#", "");
            return "";
        },
        getCod_Con: function () {
            return $.getUrlVar("cod_con");
        },
        setRowIndex: function (rowindex) {
            localStorage.setItem("rowindex", rowindex);
        },
        getRowIndex: function (rowindex) {
            return localStorage.getItem("rowindex");
        },
        getRecord : function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            this.setRowIndex(selectedrowindex);
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        init: function () {
            
            _createElements();
            _addHandlers();
            _createGridCon();
            IdeInf = Contratos.getIde_Inf()

            //var rows = $(gridCon).jqxGrid('rows');


            // @param Number. The row's bound index.
            $(gridCon).jqxGrid('selectrow', Contratos.getRowIndex());
        }
    };
} ());

$(function () {

    byaSite.SetModuloP({ TituloForm: "Panel de Gestión de Contratistas", Modulo: "Gestión de Contratista", urlToPanelModulo: "", Cod_Mod: "", Rol: "" });

    Contratos.config.theme = byaSite.tema;
    Contratos.init();
});