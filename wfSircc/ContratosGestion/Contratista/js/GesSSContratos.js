var Contratos = (function () {
    "use strict";
    



    var RiesgosLaborales = [
    { Desc: 'I - Financieras, Trabajos de Oficina, Administrativos; centros Educativos, Restaurantes', Tipo: 'I', porc: 0.5220 },
    { Desc: 'II - Algunos procesos manufactureros como la fabricación de tapetes, tejidos, confecciones y flores artificiales Almacenes por Departamentos Algunas labores Agrícolas', Tipo: 'II', porc: 1.0440 },
    { Desc: 'III -Algunos procesos manufactureros como la fabricación de agujas, alcoholes Artículos de cuero', Tipo: 'III', porc: 2.4360 },
    { Desc: 'IV - Procesos manufactureros como fabricación de aceites, cervezas, vidrios, procesos de galvanización; transporte, servicios de vigilancia privada', Tipo: 'IV', porc: 4.3500 },
    { Desc: 'V -  Areneras, manejo de asbesto, Bomberos, manejo de explosivos, construcción, Explotación petrolera', Tipo: 'V', porc: 6.9600 }];
    

    var tema;
    var CodCon;
    var IdeInf;
    var Id;
    var Estado;
    var urlModulo = "/ContratosGestion/Contratista/GesContratos.aspx";
    var TituloModulo = "Contratista";
    var TituloForm = "Aportes a Seguridad Social <small> Contratista</small>";
    var gridCon = '#jqxgridSol';
    var msgPpal = "#LbMsg";
    var activarValidar=false;

    var urlToGridCon = "/Servicios/wsContratosGestionC.asmx/GetSS";
    
    var urlToInsert = "/Servicios/wsContratosGestionC.asmx/InsertSS";
    var urlToUpdate = "/Servicios/wsContratosGestionC.asmx/UpdateSS";
    var urlToAnular = "/Servicios/wsContratosGestionC.asmx/AnularSS";
    
    var urlGetTipoSS = "/Servicios/wsContratosGestionC.asmx/GetTipoSS";
    
    var urlGenActa = "../ashx/generarActa.ashx?idacta=";
    var urlContrato = "DetContrato.html";

    var urlToAbrirCon = "/Servicios/wsContratosGestionS.asmx/GetDetContratos";

    var urlToInf = "GesDetContratos.aspx?cod_con=";
    var urlToDoc = "GesDocCuenta.aspx?cod_con=";

    var oper = "";
    var ejecutar;
    
    var _addHandlers = function () {
        
        $('.aportes').blur(function () {
            _Totalizar();
        });

        $("#modalDetalle").on('shown.bs.modal', function () {
            $(this).find("[autofocus]:first").focus();
        });

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
        $('#BtnSP').click(function () {
            _serviciosproductos();
        });
        $('#BtnImprimir').click(function () {
            _Imprimir();
        });
        $('#BtnEditar').click(function () {
            _editar();
        });
        $('#BtnGuardarN').click(function () {
            ejecutar = _guardarNuevo;
            _guardar();
        });
        $('#BtnGuardar').click(function () {
            ejecutar = _guardarModificacion;
            _guardar();
        });

        $('#BtnAnular').click(function () {
            _guardarAnular();
        });
        
        $('.detalle').click(function () {
            _Detalle();
        });
        $('#BtnDetalle').click(function () {
            _Detalle();
        });
        $('#hrefInf').click(function (e) {
            return _ShowInformes();
            
        });
        $('#hrefDoc').click(function (e) {
            return  _ShowAdjuntos();
        });
        
        $(gridCon).on('rowdoubleclick', function (event) {
            _Detalle();
        });
    };

    var _ShowInformes = function () {
        byaSite.AbrirPagina(urlToInf + CodCon + "&ide_inf=" + IdeInf);
    };
    var _ShowAdjuntos = function () {
        byaSite.AbrirPagina(urlToDoc + CodCon + "&ide_inf=" + IdeInf);
    };
    var _Totalizar = function () {
        var salud = $('#txtVAL_SALUD').byaGetDecimal();
        var pension = $('#txtVAL_PENSION').byaGetDecimal();
        var riesgos = $('#txtVAL_RIESGOS').byaGetDecimal();
        var paraf = $('#txtVAL_PARAF').byaGetDecimal();
        var aportes = salud + pension + riesgos + paraf;

        $('#txtVAL_APO').byaSetDecimal(aportes);
    };
    
    var _mostrarVentana = function () {
        $('#modalDetalle').modal('show');
        
    };
    var _ocultarVentana = function () {
        $('#modalDetalle').modal('hide');
    }
    var _editar = function () {
        _mostrarDatos();
        ejecutar = _guardarModificacion;
        
        $('#BtnGuardarN').byaSetHabilitar(true);
        $('#BtnGuardar').byaSetHabilitar(true);

        //oper = "editar";
    };
    var _sinPermiso = function () {
        _ocultarVentana();
        byaMsgBox.alert("El estado del Informe es " + $("#txtEST_INF").text()+" No se puede editar");
    }
    var _mostrarDatos = function () {
        var dataRecord = Contratos.getRecord();
         if (dataRecord != null) {
             Id = dataRecord.ID;
             Estado = dataRecord.ESTADO;
            $("#txtPLANILLAN").val(dataRecord.PLANILLAN);
            //$('#txtVAL_APO').byaSetDecimal(dataRecord.VAL_APO);
            $('#txtVAL_SALUD').byaSetDecimal(dataRecord.VAL_SALUD);
            $('#txtVAL_PENSION').byaSetDecimal(dataRecord.VAL_PENSION);
            $('#txtVAL_RIESGOS').byaSetDecimal(dataRecord.VAL_RIESGOS);
            $('#txtVAL_PARAF').byaSetDecimal(dataRecord.VAL_PARAF);
            _Totalizar();
            $("#txtMES_PAGO").val(dataRecord.MES_PAGO);
            $("#txtYEAR_PAGO").val(dataRecord.YEAR_PAGO);
            $('#txtTIPO_PLA').val(dataRecord.TIPO_PLA);
            $("#txtOBS").val(dataRecord.OBS);
            $("#txtIDE_INF").val(dataRecord.IDE_INF);
            _mostrarVentana();
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }
    };
    var _getDatosForm = function(){
        var dataRecord = {};
        dataRecord.ID=Id;
        dataRecord.PLANILLAN=$("#txtPLANILLAN").val();
        dataRecord.VAL_SALUD = $('#txtVAL_SALUD').byaGetDecimal();
        dataRecord.VAL_PENSION = $('#txtVAL_PENSION').byaGetDecimal();
        dataRecord.VAL_RIESGOS = $('#txtVAL_RIESGOS').byaGetDecimal();
        dataRecord.VAL_PARAF = $('#txtVAL_PARAF').byaGetDecimal();
        dataRecord.MES_PAGO=$("#txtMES_PAGO").val();
        dataRecord.YEAR_PAGO=$("#txtYEAR_PAGO").val();
        dataRecord.TIPO_PLA=$('#txtTIPO_PLA').val();
        dataRecord.OBS=$("#txtOBS").val();
        return dataRecord;
    };
    var _getDatosFormNuevo = function () {
        var dataRecord = {};
        dataRecord.ID = Id;
        dataRecord.PLANILLAN = $("#txtPLANILLAN").val();
        dataRecord.VAL_SALUD = $('#txtVAL_SALUD').byaGetDecimal();
        dataRecord.VAL_PENSION = $('#txtVAL_PENSION').byaGetDecimal();
        dataRecord.VAL_RIESGOS = $('#txtVAL_RIESGOS').byaGetDecimal();
        dataRecord.VAL_PARAF = $('#txtVAL_PARAF').byaGetDecimal();
        dataRecord.MES_PAGO = $("#txtMES_PAGO").val();
        dataRecord.YEAR_PAGO = $("#txtYEAR_PAGO").val();
        dataRecord.TIPO_PLA = $('#txtTIPO_PLA').val();
        dataRecord.OBS = $("#txtOBS").val();
        dataRecord.ESTADO = "BO";
        dataRecord.IDE_INF = IdeInf;
        dataRecord.COD_CON = CodCon;
        return dataRecord;
    };
    $(".validar").change(function () {
        _esValido();
    });
    $(".validar").blur(function () {
        _esValido();
    });
    var _esValido = function () {
        if (activarValidar) {
            var error = false;

            if ($("#txtPLANILLAN").val() == "") {
                $("#dvdPLANILLAN").addClass("has-error");
                error = true;
            }
            else {
                $("#dvdPLANILLAN").removeClass("has-error");
            }

            if ($("#txtYEAR_PAGO").val() == "") {
                $("#dvdYEAR_PAGO").addClass("has-error");
                error = true;
            } else {
                $("#dvdYEAR_PAGO").removeClass("has-error");
            }

            if ($("#txtVAL_SALUD").byaGetDecimal() <= 0) {
                $("#dvdVAL_SALUD").addClass("has-error");
                error = true;
            } else {
                $("#dvdVAL_SALUD").removeClass("has-error");
            }

            if ($("#txtVAL_PENSION").byaGetDecimal() <= 0) {
                $("#dvdVAL_PENSION").addClass("has-error");
                error = true;
            } else {
                $("#dvdVAL_PENSION").removeClass("has-error");
            }

            if ($("#txtVAL_RIESGOS").byaGetDecimal() < 0) {
                $("#dvdVAL_RIESGOS").addClass("has-error");
                error = true;
            } else {
                $("#dvdVAL_RIESGOS").removeClass("has-error");
            }

            if ($("#txtVAL_PARAF").byaGetDecimal() < 0) {
                $("#dvdVAL_PARAF").addClass("has-error");
                error = true;
            } else {
                $("#dvdVAL_PARAF").removeClass("has-error");
            }

            if ($("#txtVAL_APO").byaGetDecimal() == 0) {
                $("#dvdVAL_APO").addClass("has-error");
                error = true;
            } else {
                $("#dvdVAL_APO").removeClass("has-error");
            }

            if (error) {
                $("#dvdMsg").addClass("alert alert-danger");
                $("#lbMsg").html("Por favor diligencie los datos resaltos en Rojo. Son Obligatorios");
            } else {
                $("#dvdMsg").removeClass("alert alert-danger");
                $("#lbMsg").html("");
            }
        }
        return !error;
    };
    var _guardar = function () {
        activarValidar = true;
        if (_esValido()) {
            ejecutar();
        } 
    };
    var _guardarNuevo = function () {

        var jsonData = "{'Reg':" + JSON.stringify(_getDatosFormNuevo()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje);

            _createGridCon();
            _ocultarVentana();
        });
    };
    var _guardarModificacion = function () {
        var jsonData = "{'Reg':" + JSON.stringify(_getDatosForm()) + "}";
        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);

            byaMsgBox.alert(byaRpta.Mensaje+" - id "+byaRpta.id);

            _createGridCon();
            _ocultarVentana();
        });
    };
    
    var _guardarAnular = function () {
        var jsonData = "{'Reg':" + JSON.stringify(_getDatosForm()) + "}";
            byaPage.POST_Sync(urlToAnular, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);

                byaMsgBox.alert(byaRpta.Mensaje + " - id " + byaRpta.id);

                _createGridCon();
                _ocultarVentana();
            });
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
        ejecutar = _guardarNuevo;
        _mostrarVentana();
        
        Id = 0;
        Estado = "AC";
        $("#txtNUM_INF").val(0);
        $("#txtEST_INF").val("BO");
        var now = new Date();
        var f = byaPage.FechaShortX(now);
        $("#txtPLANILLAN").focus();
        $("#txtFEC_INF").val(f);
        //consultar ultimo periodo
        $("#txtFEC_INI").val(f);
        $("#txtFEC_FIN").val(f);

        $("#txtDES_INF").val("");
        $('#txtVAL_PAG').byaSetDecimal(0);
        $("#txtCAN_HOJ").val(0);
        $("#txtOBL_FAC").val("SI");

        $("#txtNOT_INF").val("");
        $("#txtNOT2_INF").val("");
        $("#fsDatos").byaSetHabilitar(true);
        
        $("#BtnGuardar").byaSetHabilitar(false);
        $("#BtnAnular").byaSetHabilitar(false);

        $("#txtPLANILLAN").focus();
        //byaSite.AbrirPagina(urlTarget + "?cod_con=" + $("#txtCodCon").val());
    };
    var CargasActas = function () {
        _createGridCon();
    };
    var _Imprimir=function(){
        //var dataRecord = Contratos.getRecord();
        //byaSite.AbrirPagina(urlGenActa + dataRecord.ID );
        alert("Falta Implementar");
    };

    var _AbrirCon = function () {
        var sw = false;
        CodCon = $.getUrlVar("cod_con");
        IdeInf = $.getUrlVar("ide_inf");

        //$("#txtCodCon").val(CodCon);
        if (CodCon == "") {
            $(msgPpal).msgBox({ titulo: "CONTRATOS", mensaje: "no se especificó ningun contrato", tipo: false });
            return false;
        }
        var e = ContratosDAO.GetPk(CodCon);
        
        //var e = byaPage.retObj(e);
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

    var _createElements = function () {
        tema = Contratos.config.theme;
        _AbrirCon();
        //var CboRiesgo = new byaComboBox();
        //CboRiesgo.init({ Id: "#cboRiesgos", Source: RiesgosLaborales, Value: "Tipo", Display: "Desc" });
        //CboRiesgo.getID().change(function () {
        //    alert("Cambio Reisgo");
        //});
        
    };

        
    //crea GridTipos
    var _createGridCon = function () {

        var source = {
            datatype: "xml",
            datafields: [
                    { name: 'ID' },
                    { name: 'PLANILLAN' },
                    { name: 'VAL_SALUD', type: 'number' },
                    { name: 'VAL_PENSION', type: 'number' },
                    { name: 'VAL_RIESGOS', type: 'number' },
                    { name: 'VAL_PARAF', type: 'number' },
                    { name: 'MES_PAGO'},
                    { name: 'YEAR_PAGO'},
                    { name: 'TIPO_PLA'},
                    { name: 'OBS'},
                    { name: 'ESTADO'},
                    { name: 'IDE_INF'},
                    { name: 'NRO_DOC'},
                    { name: 'FEC_REG', type: 'date' },
                    { name: 'USAP'},
                    { name: 'FEC_MOD', type: 'date' },
                    { name: 'USBDM'},
                    { name: 'USAPM'},
                    { name: 'COD_CON' },
                    { name: 'PERIODO_PAGO' }
            ],
            async: false,
            record: 'Table',
            url: urlToGridCon,
            data: { 'CodCon': CodCon, 'IdeInf': IdeInf }
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
                            { text: 'Planilla N°', datafield: 'PLANILLAN', width: 80, columntype: 'numberinput', cellsalign: 'right' },
                            { text: 'Periodo Aporte', datafield: 'PERIODO_PAGO', width: 200 },
                            { text: 'Salud', datafield: 'VAL_SALUD', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', aggregates: ['sum'] },
                            { text: 'Pensión', datafield: 'VAL_PENSION', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', aggregates: ['sum'] },
                            { text: 'Riesgos', datafield: 'VAL_RIESGOS', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', aggregates: ['sum'] },
                            { text: 'Parafiscales', datafield: 'VAL_PARAF', width: 150, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', aggregates: ['sum'] },
                            { text: 'Observación', datafield: 'OBS', width: 100 },
                            { text: 'Estado', datafield: 'ESTADO', width: 100 },
                            { text: 'Informe N°', datafield: 'IDE_INF', width: 80, columntype: 'numberinput', cellsalign: 'right' },
                            { text: 'ID', datafield: 'ID', width: 80, columntype: 'numberinput', cellsalign: 'right' }
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
            return dataRecord;
        },
        init: function () {
            //_loadDetContratos();
            _createElements();
            _addHandlers();
            _createGridCon();
        }
    };
} ());

$(function () {

    byaSite.SetModuloP({ TituloForm: "Seguridad Social", Modulo: "Gestión de Contratista", urlToPanelModulo: "GesContratos.aspx", Cod_Mod: "SPRV", Rol: "SP_CTIST" });

    Contratos.config.theme = byaSite.tema;
    Contratos.init();
});