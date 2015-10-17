var RegistroPresupuestal = (function () {
    "use strict";
   
    var grid = '#jqxgridRegisP';
    var urlToInsert = "/Servicios/Contratos/wsLegalizacion.asmx/InsertRp";
    var urlToDelete = "/Servicios/Contratos/wsLegalizacion.asmx/DeleteRp";
    var urlToGridRp = "/Servicios/Contratos/wsLegalizacion.asmx/GetRP_Contratos";
    var urlToGridJson = "/Servicios/Contratos/wsLegalizacion.asmx/GetRP_ContratosJson";
    var urlGetContratos = "/Servicios/Contratos/wsLegalizacion.asmx/GetDetContratos";
    var urlGetCon_Adiciones = "/Servicios/Contratos/wsLegalizacion.asmx/GetCon_Adiciones"
    var urlSourceTip = '/servicios/wsDatosBasicos.asmx/GetvTIPOSCONT';
    var urlToGridConRubrosSelect = "/Servicios/wsRubros.asmx/Gets";
    var urlGetRPsExt = "/Servicios/wsFinanciero.asmx/GetRPs";
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
        $("#btnBsqRubro").click(function () {
            _verVentana();
        });
        $("#btnNuevoRubro").click(function () {
            $(this).byaSetHabilitar(false);
            $("#btnGuardarRubro").byaSetHabilitar(true);
            $("#btnBsqRubro").byaSetHabilitar(true);
            $("#txtValRub").byaSetHabilitar(true);
        });
        $("#btnGuardarRubro").click(function () {
            GuardarNuevoRubro();
        });
        $("#txtNumero").blur(function (event) {
           
            var l = $("#txtNumero").val().length;
            if (l >= 1 && l <= 4) {
                Cod_Con = parseInt($("#txtNumero").val());
                $("#txtNumero").val(byaSite.getVigencia() + $("#CboTip").val() + Cod_Con.padLeft(4, "0"));
                
            }
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirRp();
            }    
            
        });       
        $("#BtnguardarRegistro").click(function () {

            GuardarRp();
            

        });
        $("#BtncancelarRegistro").click(function () {

            cancelarButtonRp();

        });
        $("#txtNRp").blur(function () {
            if(integrado) VerificarSiExisteRPExtreno();
        });
        $("#btnNuevoRP").click(function () {
            $("#txtNRp").val("");
            $("#TxtFechaRp").val("");
            $("#TxtValorRp").val("");
            $("#CboNCont").val("");

            lRubrosContratos = new Array();
             
            crearTablaRubrosContratos();

            ControlsRp();
        });
    };
    var _Validaciones = function myfunction() {
        $("#txtNumero").byaSetHabilitar(true);
        $("#txtNRp").byaSetHabilitar(false);
        $("#TxtFechaRp").byaSetHabilitar(false);
        $("#TxtValorRp").byaSetHabilitar(false);
        $("#CboNCont").byaSetHabilitar(false);
        $("#BtnguardarRegistro").byaSetHabilitar(false);
        $("#BtncancelarRegistro").byaSetHabilitar(false);

        $("#CboTip").change(function () {
            $("#txtNumero").byaSetHabilitar(true);           
           

        });
    };
    var AbrirRp = function () {
        _createGrid();
        MultiplesAjax();
        ControlsRp();
    };
    var ActualizarDataPicker = function () {
        //var f = new Date();
        //$("#TxtFechaRp").datepicker({
        //    weekStart: 1,
        //    endDate: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
        //    todayHighlight: true,
        //    autoclose: true,
        //    format: 'dd/mm/yyyy',
        //});
    };
    var _verVentana = function(){
        _createGridConRubrosSelect();
        $("#modalRubros").modal("show");
    };
    var LLenarAdicionesRp = function () {
        $.ajax({
            type: "GET",
            url: urlGetCon_Adiciones,
            data: { 'Cod_Con': Cod_Con },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var result = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

                $("#CboNCont").byaCombo({
                    DataSource: result, placeHolder: 'Seleccione el Tipo ', Display: "NRO_ADI", Value: "NRO_ADI"
                });

            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    }
    var GuardarNuevoRubro = function () {
        var e = {}
        e.COD_RUB = $("#txtCodRub").val();
        e.COD_CON = Cod_Con;
        e.NOM_RUB = $("#txtDesRub").val();
        e.VAL_COMPROMISO = $("#txtValRub").byaGetDecimal();
        e.VIGENCIA = RegistroPresupuestal.Vigencia();

        lRubrosContratos.push(e);
        crearTablaRubrosContratos();

        $("#btnGuardarRubro").byaSetHabilitar(false);
        $("#btnNuevoRubro").byaSetHabilitar(true);
        $("#txtCodRub").val("");
        $("#txtDesRub").val("");
        $("#txtValRub").val("");
    };


    var MultiplesAjax = function () {
        //Llamado de Items de Contratos
     
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

                    //});
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    

        //Lista del Numero de Adicciones
        LLenarAdicionesRp();

    };
    var integrado;
    var _createGridConRubrosSelect = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'COD_RUB', type: 'string' },
                    { name: 'DES_RUB', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridConRubrosSelect + "?filtro=" + byaSite.getVigencia(),
            data: {}
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });


        $("#jqxgridConRubros").jqxGrid(
                   {
                       width: '100%',
                       source: dataAdapter,
                       theme: RegistroPresupuestal.config.theme,
                       localization: byaPage.getLocalization(),
                       height: 350,
                       sortable: true,
                       altrows: true,
                       showfilterrow: true,
                       filterable: true,
                       pageable: true,
                       enabletooltips: true,
                       columns: [
                       { text: 'Código', datafield: 'COD_RUB', width: 150, filtertype: 'textbox' },
                       { text: 'Descripción', datafield: 'DES_RUB', filtertype: 'textbox' }
                       ]
                   });

        $("#jqxgridConRubros").bind('rowselect', function (event) {
            var selectedRowIndex = event.args.rowindex;
            var cod, nom;
            var cell = $("#jqxgridConRubros").jqxGrid('getcell', selectedRowIndex, 'COD_RUB');
            cod = cell.value;
            var cell = $("#jqxgridConRubros").jqxGrid('getcell', selectedRowIndex, 'DES_RUB');
            nom = cell.value;
            $("#txtCodRub").val(cod);
            $("#txtDesRub").val(nom);
            $('#modalRubros').modal('hide');
        });
    };
    var VerificarSiExisteRPExtreno = function () {
        var idrp = $("#txtNRp").val();
        var parametro = {
            NRO_RP: "'" + idrp + "'",
            VIGENCIA: "'" + byaSite.getVigencia() + "'"
        }
        $.ajax({
            type: "GET",
            url: urlGetRPsExt,
            data: parametro,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                var rps = byaPage.retObj(result.d);
                if (rps[0].NRO_RP != null) {
                    var confirmacion = confirm("Existe un RP con este número ¿Desea cargarlo?");
                    if (confirmacion) {
                        $("#txtNRp").val(rps[0].NRO_RP);
                        $("#TxtFechaRp").val(byaPage.converJSONDate(rps[0].FEC_RP));
                        $("#TxtValorRp").val(rps[0].VAL_RP);
                        $("#CboNCont").val(rps[0].DOC_SOP);

                        lRubrosContratos = rps[0].RUBROS_CONTRATOS;
                        crearTablaRubrosContratos();
                    }
                } else {
                    alert("No existe ningun RP con este numero");
                    $("#txtNRp").val("");
                    $("#txtNRp").focus();
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
        $("#txtNRp").byaFormatInput('0123456789');
        $("#TxtValorRp").byaFormatInput('0123456789');
        LlenarCbo();
        ActualizarDataPicker();

        $("#btnBsqRubro").byaSetHabilitar(false);
        $("#txtValRub").byaSetHabilitar(false);
        $("#btnGuardarRubro").byaSetHabilitar(false);
        $("#btnNuevoRubro").byaSetHabilitar(false);
        $("#btnNuevoRP").byaSetHabilitar(false);
        crearTablaRubrosContratos();
        crearTablaRP();
        integrado = byaSite.getIntegradoRP();
        if (integrado) $("#RPTip").text("Integrado");
        else $("#RPTip").text("Sin Integrar");
    };
    var getDataAdapter = function () {
        var Cod_Con = $("#txtNumero").val();
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'NRO_RP' },
                    { name: 'FEC_RP', type: 'date' },
                    { name: 'VAL_RP' },
                    { name: 'DOC_SOP' },
                    { name: 'COD_CON' }

            ],
            async: true,
            record: 'Table',
            url: urlToGridRp,
            data: { 'Cod_Con': Cod_Con}
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        return dataAdapter;
    };
    var _createGrid = function () {
        crearTablaRP();
        //$(grid).jqxGrid(
        //    {
        //        width: '100%',
        //        source: getDataAdapter(),
        //        theme: RegistroPresupuestal.config.theme,
        //        altrows: true,
        //        editable: false,
        //        autoheight: true,
        //        autorowheight: true,
        //        enabletooltips: true,
        //        localization: byaPage.getLocalization(),
        //        columns: [
        //          { text: 'N° Rp', datafield: 'NRO_RP' },
        //          { text: 'Fecha Rp', datafield: 'FEC_RP', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right' },
        //          { text: 'Valor Rp', datafield: 'VAL_RP' },
        //          { text: 'Documento Soporte', datafield: 'DOC_SOP' },
        //          { text: 'Eliminar', datafield: 'Eliminar', columntype: 'button', cellsrenderer: function () {
        //              return "Eliminar";
        //              }, buttonclick: function (row) {
        //                  // open the popup window when the user clicks a button.
                          

        //                  byaMsgBox.confirm("Desea eliminar el Registro Presupuestal?", function (result) {
        //                      if (result) {
        //                          var dataRecord = $(grid).jqxGrid('getrowdata', row);
        //                          EliminarRP(dataRecord.NRO_RP, dataRecord.COD_CON);                                 
        //                      }
        //                  });
        //              }
        //          }
        //        ]
        //    });

    };
    var lRPs = new Array();
    var tblRP;
    var crearTablaRP = function () {
        lRPs = byaPage.getSource(urlToGridJson, { Cod_Con: "'" + Cod_Con + "'" });
        $.each(lRPs, function (index, item) {
            item.FEC_RP = byaPage.converJSONDate(item.FEC_RP);
        });
        var config = {
            Id: '#tblRP',
            Source: lRPs,
            fn_Editar: function (item, index) {
                byaMsgBox.confirm("Desea eliminar el Registro Presupuestal?", function (result) {
                    if (result) {
                        EliminarRP(item.NRO_RP, item.COD_CON, item.VIGENCIA);
                    }
                });
            },
            fn_Seleccionar: function (item, index) {
                $("#txtNRp").val(item.NRO_RP);
                $("#TxtFechaRp").val(item.FEC_RP);
                $("#TxtValorRp").val(item.VAL_RP);
                $("#CboNCont").val(item.DOC_SOP);

                $("#txtNRp").byaSetHabilitar(false);
                $("#CboNCont").byaSetHabilitar(false);

                $("#btnNuevoRP").byaSetHabilitar(true);
                $("#BtnguardarRegistro").byaSetHabilitar(false);
                lRubrosContratos = item.RUBROS_CONTRATOS;
                crearTablaRubrosContratos();
            },
            lEliminar: true,
            lEditar: true,
            lSeleccionar: true,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: true,
            fnFormatItem: function (item, index) {
                var Consultar = '<span class="glyphicon glyphicon-search clsstblRPSelect" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var Eliminar = '<span class="glyphicon glyphicon-remove clsstblRPEdit" id="' + index + '" aria-hidden="true"></span>';
                return "<td class='text-right'>" + item.NRO_RP + "</td><td>" + item.FEC_RP + "</td><td class='text-right'>" + byaPage.formatNumber.new(item.VAL_RP, "$") + "</td><td>" + item.DOC_SOP + "</td><td>" + Consultar + "</td><td>" + Eliminar + "</td>";
            }
        };
        tblRP = new byaTablaG();
        tblRP.init(config);
    };
    var lRubrosContratos = new Array();
    var tblRubrosContratos;
    var crearTablaRubrosContratos = function () {
        var config = {
            Id: '#tblRubrosContratos',
            Source: lRubrosContratos,
            fn_Editar: function (item, index) {
                alert(JSON.stringify(item));
            },
            fn_Seleccionar: function (item, index) {
                alert(JSON.stringify(item));
            },
            lEliminar: true,
            lEditar: true,
            lSeleccionar: true,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: true,
            fnFormatItem: function (item, index) {
                var Eliminar = '<span class="glyphicon glyphicon-remove clsstblRubrosContratosDelete" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                return '<td>' + item.COD_RUB + "</td><td>" + item.NOM_RUB + "</td><td class='text-right'>" + byaPage.formatNumber.new(item.VAL_COMPROMISO, "$") + "</td><td>" + Eliminar + "</td>";
            }
        };
        tblRubrosContratos = new byaTablaG();
        tblRubrosContratos.init(config);
    };
    var LlenarCbo = function () {
        var sourceMod = byaPage.getSource(urlSourceTip);
        $("#CboTip").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo ', Display: "NOMC_TIP", Value: "COD_TIP"
        });

    };
    var getDatos = function () {
        var rp = {};  

        rp.NRO_RP = $('#txtNRp').val();
        rp.COD_CON = $('#txtNumero').val();
        rp.FEC_RP = $('#TxtFechaRp').val();
        rp.VIGENCIA = RegistroPresupuestal.Vigencia();
        rp.VAL_RP = $('#TxtValorRp').byaGetDecimal();
        rp.DOC_SOP = $('#CboNCont').val();       
        rp.USAP = byaSite.getUsuario();
        rp.USBD = "sircc";
        rp.VAL_PAGO = 0;
        rp.RUBROS_CONTRATOS = tblRubrosContratos.getSource();
        return rp;
    }
    var GuardarRp = function () {
        if (getDatos().DOC_SOP != "") {
            var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
            byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                RegistroPresupuestal.refresh();
                LimpiarRp();
                $(msgPpal).msgBox({ titulo: "Registro Presupuestal de Contratos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            });
        } else {
            alert("Debe especificar un documento de soporte");
        }
    }
    var EliminarRP = function (NroRp, NroCon, Vig) {
        var e={};
        e.NRO_RP=NroRp;
        e.COD_CON=NroCon;      
        e.VIGENCIA = Vig;
        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToDelete, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            RegistroPresupuestal.refresh();           
            $(msgPpal).msgBox({ titulo: "Eliminar Registro Presupuestal", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
               
            }
        });


    };     
    var cancelarButtonRp = function () {      
        LimpiarRp();
    };
    var ControlsRp = function () {
        if (!integrado) {
            $("#txtNRp").byaSetHabilitar(true);
            $("#TxtFechaRp").byaSetHabilitar(true);
            $("#TxtValorRp").byaSetHabilitar(true);
            $("#CboNCont").byaSetHabilitar(true);
            $("#BtnguardarRegistro").byaSetHabilitar(true);
            $("#BtncancelarRegistro").byaSetHabilitar(true);
            $("#btnNuevoRP").byaSetHabilitar(false);
            $("#btnGuardarRubro").byaSetHabilitar(false);
            $("#btnNuevoRubro").byaSetHabilitar(true);
        } else {
            $("#txtNRp").byaSetHabilitar(true);
            $("#TxtFechaRp").byaSetHabilitar(false);
            $("#TxtValorRp").byaSetHabilitar(false);
            $("#CboNCont").byaSetHabilitar(true);
            $("#BtnguardarRegistro").byaSetHabilitar(true);
            $("#BtncancelarRegistro").byaSetHabilitar(true);
            $("#btnNuevoRP").byaSetHabilitar(false);
        }
    };
    var LimpiarRp = function () {
         $('#txtNRp').val("");        
         $('#TxtFechaRp').val("dd/mm/aaaa");       
         $('#TxtValorRp').val("");
         LLenarAdicionesRp();
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
            crearTablaRP();
            //$(grid).jqxGrid({ source: getDataAdapter() });
        },
        init: function () {
            _addHandlers();
            _Validaciones();
            _createElements();
               
            //   _HabilitarE();
        }
    };
}());
var Polizas = (function () {
    "use strict";
    var grid = '#jqxgridRegisPlz';
    var urlToInsert = "/Servicios/Contratos/wsLegalizacion.asmx/InsertPlz";
    var urlToDelete = "/Servicios/Contratos/wsLegalizacion.asmx/DeletePlz";
    var urlToGridPlz = "/Servicios/Contratos/wsLegalizacion.asmx/GetPlzContratos";
    var urlToTblPlz = "/Servicios/Contratos/wsLegalizacion.asmx/GetPlzContratosJson";
    var urlGetContratos = "/Servicios/Contratos/wsLegalizacion.asmx/GetContratos";
    var urlSourcePlz = '/servicios/wsDatosBasicos.asmx/GetPolizas';
    var urlSourceAsgdra = '/servicios/Contratos/wsLegalizacion.asmx/GetAseguradoras';
    
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
                AbrirPlz();
            }

        });
        $("#BtnguardarPoliza").click(function () {
            if (_esValidoPoliza()) {
                GuardarPlz();
            }
        });
        $("#BtncancelarPoliza").click(function () {

            cancelarButtonPlz();

        });

    };
    var _esValidoPoliza = function () {
        var error = false;
        var cadenaCampos = "";
        //
        if ($("#CboAmp").val() == "") {
            $("#dvdAmp").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Tipo de amparo";
            error = true;
        } else {
            $("#dvdAmp").removeClass("has-error");
        }
        //
        if ($("#CboAseg").val() == "") {
            $("#dvdAseg").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Aseguradora";
            error = true;
        } else {
            $("#dvdAseg").removeClass("has-error");
        }
        //
        if (error) {
            $("#dvdMsg").addClass("alert alert-danger");
            $("#lbMsg").html("Los siguientes campos no pueden estar vacios: " + cadenaCampos);
        } else {
            $("#dvdMsg").removeClass("alert alert-danger");
            $("#lbMsg").html("");
        }
        return !error;
    };
    var _Validaciones = function () {
        $("#txtNumero").byaSetHabilitar(true);
        $("#CboAmp").byaSetHabilitar(false);
        $("#CboAseg").byaSetHabilitar(false);
        $("#TxtFechaIPlz").byaSetHabilitar(false);
        $("#TxtFechaVPlz").byaSetHabilitar(false);
        $("#TextNroPlz").byaSetHabilitar(false);
        $("#TextValorPlz").byaSetHabilitar(false);
        $("#CboTipoPlz").byaSetHabilitar(false);        
        $("#BtnguardarPoliza").byaSetHabilitar(false);
        $("#BtncancelarPoliza").byaSetHabilitar(false);       
    };
    var LLenarCbos = function () {
        var sourceMod = byaPage.getSource(urlSourceAsgdra);
        $("#CboAseg").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo de Aseguradora', Display: "NOM_ASE", Value: "COD_ASE"
        });

        var sourceMod = byaPage.getSource(urlSourcePlz);
        $("#CboAmp").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo de Poliza ', Display: "NOM_POL", Value: "COD_POL"
        });
       
    }
    var AbrirPlz = function () {
        _createGrid();
        LLenarCbos();
        ControlsRp();
    };
    var ActualizarDataPicker = function () {
        //var f = new Date();
        //$("#TxtFechaIPlz").datepicker({
        //    weekStart: 1,
        //    endDate: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
        //    todayHighlight: true,
        //    autoclose: true,
        //    format: 'dd/mm/yyyy',
        //});
        //$("#TxtFechaVPlz").datepicker({
        //    weekStart: 1,
        //    endDate: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
        //    todayHighlight: true,
        //    autoclose: true,
        //    format: 'dd/mm/yyyy',
        //});
    };
    var _createElements = function () {
        $('.currency').byaSetDecimal(0);
        //$("#TextNroPlz").byaFormatInput('0123456789');
        $("#TextValorPlz").byaFormatInput('0123456789');
        ActualizarDataPicker();
        $("#txtNumero").byaSetHabilitar(true);
    };
    var getDataAdapter = function () {
        var Cod_Con = $("#txtNumero").val();
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'ID_POL' },
                    { name: 'NOM_POL'},
                    { name: 'NOM_ASE' },
                    { name: 'NRO_POL' },
                    { name: 'FEC_INI', type: 'date' },
                    { name: 'FEC_POL', type: 'date' },
                    { name: 'VAL_POL'},
                    { name: 'TIP_POL' }

            ],
            async: true,
            record: 'Table',
            url: urlToGridPlz,
            data: { 'Cod_Con': Cod_Con }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        return dataAdapter;
    };
    var _createGrid = function () {
        crearTablaPolizas();
        //$(grid).jqxGrid(
        //    {
        //        width: '100%',
        //        source: getDataAdapter(),
        //        theme: Polizas.config.theme,
        //        altrows: true,
        //        editable: false,
        //        autoheight: true,
        //        autorowheight: true,
        //        enabletooltips: true,
        //        localization: byaPage.getLocalization(),
        //        columns: [
        //          { text: 'ID     ', datafield: 'ID_POL' },
        //          { text: 'Tipo de Amparo', datafield: 'NOM_POL' },
        //          { text: 'Aseguradora', datafield: 'NOM_ASE' },
        //          { text: 'N° Poliza', datafield: 'NRO_POL' },
        //          { text: 'Fecha Inicial', datafield: 'FEC_INI', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right' },
        //          { text: 'Fecha Vencimiento', datafield: 'FEC_POL', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right' },
        //          { text: 'Valor Poliza', datafield: 'VAL_POL' },
        //          { text: 'Legalizacion', datafield: 'TIP_POL' },
        //          { text: 'Eliminar', datafield: 'Eliminar', columntype: 'button', cellsrenderer: function () {
        //                  return "Eliminar";
        //              }, buttonclick: function (row) {
        //                  // open the popup window when the user clicks a button.


        //                  byaMsgBox.confirm("Desea eliminar La Poliza de Garantia?", function (result) {
        //                      if (result) {
        //                          var dataRecord = $(grid).jqxGrid('getrowdata', row);
        //                          EliminarPlz(dataRecord.NRO_POL,Cod_Con);
        //                      }
        //                  });
        //              }
        //          }
        //        ]
        //    });

    };
    var lPolizasR = new Array();
    var tblPolizasR;
    var crearTablaPolizas = function () {

        lPolizasR = byaPage.getSource(urlToTblPlz, { Cod_Con: "'" + Cod_Con + "'" });

        var config = {
            Id: '#tblPolizasR',
            Source: lPolizasR,
            fn_Editar: function (item) {
                byaMsgBox.confirm("Desea eliminar La Poliza de Garantia?", function (result) {
                    EliminarPlz(item.NRO_POL, Cod_Con);
                });
            },
            lEliminar: false,
            lEditar: true,
            Display: 'NombreCodigo',
            Value: 'UNSPSC',
            fnFormatItem: function (item, index) {
                var Eliminar = '<span id="' + index + '" class="glyphicon glyphicon-remove codigos clsstblPolizasREdit" aria-hidden="true"></span>';
                return '<td>' + item.ID_POL + "</td><td>" + item.NOM_POL + "</td><td>" + item.NOM_ASE + "</td><td>" + item.NRO_POL + "</td><td>" + byaPage.converJSONDate(item.FEC_INI) + "</td><td>" + byaPage.converJSONDate(item.FEC_POL) + "</td><td>" + item.VAL_POL + "</td><td>" + item.TIP_POL + "</td><td>" + Eliminar + "</td>";
            },
            Enabled: true
        };
        tblPolizasR = new byaTablaG();
        tblPolizasR.init(config);
    };
    var getDatos = function () {
        var Plz = {};
        Plz.COD_CON = $('#txtNumero').val();       
        Plz.COD_POL = $('#CboAmp').val();
        Plz.COD_ASE = $('#CboAseg').val();
        Plz.VAL_POL = $('#TextValorPlz').byaGetDecimal();
        Plz.FEC_POL = $('#TxtFechaVPlz').val();
        Plz.NRO_POL = $('#TextNroPlz').val();
        Plz.TIP_POL = $('#CboTipoPlz').val();
        Plz.NRO_POL_AUX = $('#TextNroPlz').val();
        Plz.FEC_INI = $('#TxtFechaIPlz').val();

        return Plz;
    }
    var GuardarPlz = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Polizas.refresh();           
            $(msgPpal).msgBox({ titulo: "Registro de Polizas de Garantia", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                $('#CboAmp').val("");
                $('#CboAseg').val("");
                $('#TextValorPlz').byaSetDecimal("");
                $('#TxtFechaVPlz').val("");
                $('#TextNroPlz').val("");
                $('#CboTipoPlz').val("");
                $('#TextNroPlz').val("");
                $('#TxtFechaIPlz').val("");
            }
        });


    }
    var EliminarPlz = function (NroPlz, NroCon) {
        var e = {};
        e.NRO_POL = NroPlz;
        e.COD_CON = NroCon;

        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToDelete, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Polizas.refresh();
            $(msgPpal).msgBox({ titulo: "Eliminar Poliza de Garantia", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {

            }
        });


    };
    var cancelarButtonPlz = function () {
        LimpiarPlz();
    };
    var ControlsRp = function () {
        $("#CboAmp").byaSetHabilitar(true);
        $("#CboAseg").byaSetHabilitar(true);
        $("#TxtFechaIPlz").byaSetHabilitar(true);
        $("#TxtFechaVPlz").byaSetHabilitar(true);
        $("#TextNroPlz").byaSetHabilitar(true);
        $("#TextValorPlz").byaSetHabilitar(true);
        $("#CboTipoPlz").byaSetHabilitar(true);
        $("#BtnguardarPoliza").byaSetHabilitar(true);
        $("#BtncancelarPoliza").byaSetHabilitar(true);
    };
    var LimpiarPlz = function () {
        $('#TextNroPlz').val("");       
        $('#TextValorPlz').val("");       
        $('#TxtFechaIPlz').val("dd/mm/aaaa");
        $('#TxtFechaVPlz').val("dd/mm/aaaa");        
        LLenarCbos();
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
            crearTablaPolizas();
            //$(grid).jqxGrid({ source: getDataAdapter() });
        },
        init: function () {
            _addHandlers();
            _Validaciones();
            _createElements();

            //   _HabilitarE();
        }
    };
    
}());
var Impuestos = (function () {
    "use strict";
    var grid = '#jqxgridRegisImp';
    var urlToInsert = "/Servicios/Contratos/wsLegalizacion.asmx/InsertImp";
    var urlToDelete = "/Servicios/Contratos/wsLegalizacion.asmx/DeleteImp";
    var urlToGridImpu = "/Servicios/Contratos/wsLegalizacion.asmx/GetImp_Contratos";
    var urlToGridImpuJson = "/Servicios/Contratos/wsLegalizacion.asmx/GetImp_ContratosJson";
    var urlGetContratos = "/Servicios/Contratos/wsLegalizacion.asmx/GetContratos";
    var urlSourceImpu = '/servicios/Contratos/wsLegalizacion.asmx/GetImpuestos';
    var urlGetCon_Adiciones = "/Servicios/Contratos/wsLegalizacion.asmx/GetCon_Adiciones"
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
                AbrirImpu();
            }

        });
        $("#BtnguardarImpuesto").click(function () {
            if (_esValidoImpuesto()) {
                GuardarImpu();
            }
        });
        $("#BtncancelarImpuesto").click(function () {

            cancelarButtonImpu();

        });

    };
    var _esValidoImpuesto = function () {
        var error = false;
        var cadenaCampos = "";
        //
        if ($("#CboImpu").val() == "") {
            $("#dvdImpu").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Tipo de impuesto";
            error = true;
        } else {
            $("#dvdImpu").removeClass("has-error");
        }
        //
        if ($("#TextVigenciaLqd").val() == "") {
            $("#dvdVigenciaLqd").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Vigencia";
            error = true;
        } else {
            $("#dvdVigenciaLqd").removeClass("has-error");
        }
        //
        if ($("#TextNroLqd").val() == "") {
            $("#dvdNroLqd").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Nro. Liquidación";
            error = true;
        } else {
            $("#dvdNroLqd").removeClass("has-error");
        }
        //
        if ($("#TextValLqd").byaGetDecimal() <= 0) {
            $("#dvdValLqd").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Valor de la liquidación";
            error = true;
        } else {
            $("#dvdValLqd").removeClass("has-error");
        }
        //
        if ($("#CboDS").val() == "") {
            $("#dvdDS").addClass("has-error");
            cadenaCampos = cadenaCampos + "<br/> - Documento Soporte";
            error = true;
        } else {
            $("#dvdDS").removeClass("has-error");
        }
        //
        if (error) {
            $("#dvdMsg").addClass("alert alert-danger");
            $("#lbMsg").html("Los siguientes campos no pueden estar vacios: " + cadenaCampos);
        } else {
            $("#dvdMsg").removeClass("alert alert-danger");
            $("#lbMsg").html("");
        }
        return !error;
    };
    var _Validaciones = function () {
        $("#txtNumero").byaSetHabilitar(true);
        $("#CboImpu").byaSetHabilitar(false);
        $("#TextVigenciaLqd").byaSetHabilitar(false);
        $("#TextNroLqd").byaSetHabilitar(false);
        $("#TextValLqd").byaSetHabilitar(false);
        $("#CboDS").byaSetHabilitar(false);       
        $("#BtnguardarImpuesto").byaSetHabilitar(false);
        $("#BtncancelarImpuesto").byaSetHabilitar(false);
        
    };
    var LLenarCbos = function () {      

        var sourceMod = byaPage.getSource(urlSourceImpu);
        $("#CboImpu").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione el Tipo de Impuesto ', Display: "NOM_IMP", Value: "NRO_IMP"
        });

    }
    var LLenarAdicionesImpu = function () {
        $.ajax({
            type: "GET",
            url: urlGetCon_Adiciones,
            data: { 'Cod_Con': Cod_Con },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var result = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

                $("#CboDS").byaCombo({
                    DataSource: result, placeHolder: 'Seleccione el Tipo ', Display: "NRO_ADI", Value: "NRO_ADI"
                });

            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    }
    var AbrirImpu = function () {
        _createGrid();
        LLenarCbos();
        ControlsImpu();
        LLenarAdicionesImpu();
    };   
    var _createElements = function () {
        $('.currency').byaSetDecimal(0);
        $("#TextVigenciaLqd").byaFormatInput('0123456789');
        $("#TextNroLqd").byaFormatInput('0123456789');
        $("#TextValLqd").byaFormatInput('0123456789');
     
    };
    var getDataAdapter = function () {
        var Cod_Con = $("#txtNumero").val();
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'NRO_IMP' },
                    { name: 'NOM_IMP' },
                    { name: 'VIG_LIQ' },
                    { name: 'NRO_COM' },
                    { name: 'VAL_IMP'},
                    { name: 'COD_SOP' },
                   

            ],
            async: true,
            record: 'Table',
            url: urlToGridImpu,
            data: { 'Cod_Con': Cod_Con }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        return dataAdapter;
    };
    var _createGrid = function () {
        crearTablaImpuestos();
        //$(grid).jqxGrid(
        //    {
        //        width: '100%',
        //        source: getDataAdapter(),
        //        theme: Impuestos.config.theme,
        //        altrows: true,
        //        editable: false,
        //        autoheight: true,
        //        autorowheight: true,
        //        enabletooltips: true,
        //        localization: byaPage.getLocalization(),
        //        columns: [
        //          { text: 'N° Impuesto', datafield: 'NRO_IMP' },
        //          { text: 'Impuesto                           ', datafield: 'NOM_IMP' },
        //          { text: 'Vigencia Liquidación', datafield: 'VIG_LIQ' },
        //          { text: 'N° Liquidación', datafield: 'NRO_COM' },
        //          { text: 'Valor Liquidación', datafield: 'VAL_IMP' },
        //          { text: 'Documento Soporte', datafield: 'COD_SOP' },
        //          { text: 'Eliminar', datafield: 'Eliminar', columntype: 'button', cellsrenderer: function () {
        //                  return "Eliminar";
        //              }, buttonclick: function (row) {
        //                  // open the popup window when the user clicks a button.


        //                  byaMsgBox.confirm("Desea eliminar el Impuesto?", function (result) {
        //                      if (result) {
        //                          var dataRecord = $(grid).jqxGrid('getrowdata', row);
        //                          EliminarImpu(Cod_Con, dataRecord.NRO_IMP);
        //                      }
        //                  });
        //              }
        //          }
        //        ]
        //    });
    };
    var tblImpuestos;
    var lImpuestos = new Array();
    var crearTablaImpuestos = function () {

        lImpuestos = byaPage.getSource(urlToGridImpuJson, { Cod_Con: "'" + Cod_Con + "'" });

        var config = {
            Id: '#tblImpuestos',
            Source: lImpuestos,
            fn_Editar: function (item) {
                byaMsgBox.confirm("Desea eliminar el Impuesto?", function (result) {
                    if (result) {
                        EliminarImpu(Cod_Con, item.NRO_IMP);
                    }
                });
            },
            lEliminar: false,
            lEditar: true,
            Display: 'NombreCodigo',
            Value: 'UNSPSC',
            fnFormatItem: function (item, index) {
                var Eliminar = '<span id="' + index + '" class="glyphicon glyphicon-remove codigos clsstblImpuestosEdit" aria-hidden="true"></span>';
                return "<td>" + item.NRO_IMP + "</td><td>" + item.NOM_IMP + "</td><td>" + item.VIG_LIQ + "</td><td>" + item.NRO_COM + "</td><td>" + item.VAL_IMP + "</td><td>" + item.COD_SOP + "</td><td>" + Eliminar + "</td>";
            },
            Enabled: true
        };
        tblImpuestos = new byaTablaG();
        tblImpuestos.init(config);
    };
    var getDatos = function () {
        var Impu = {};
        Impu.COD_CON = $('#txtNumero').val();
        Impu.NRO_IMP = $('#CboImpu').val();
        Impu.VIG_LIQ = $('#TextVigenciaLqd').val();
        Impu.NRO_COM = $('#TextNroLqd').val();
        Impu.VAL_IMP = $('#TextValLqd').byaGetDecimal();
        Impu.COD_SOP = $('#CboDS').val();
        Impu.USER_REG = byaSite.getUsuario();
        
        return Impu;
    }
    var GuardarImpu = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Impuestos.refresh();          
            $(msgPpal).msgBox({ titulo: "Registro de Impuestos a Contratos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                $('#CboImpu').val("");
                $('#TextVigenciaLqd').val("");
                $('#TextNroLqd').val("");
                $('#TextValLqd').byaSetDecimal(0);
                $('#CboDS').val("");
            }
        });


    }
    var EliminarImpu = function (NroCon,NroImp) {
        var e = {};        
        e.COD_CON = NroCon;
        e.NRO_IMP = NroImp;       
        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToDelete, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Impuestos.refresh();
            $(msgPpal).msgBox({ titulo: "Eliminar Impuesto de Contrato", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {

            }
        });


    };
    var cancelarButtonImpu = function () {
        LimpiarImpu();
    };
    var ControlsImpu = function () {
        $("#CboImpu").byaSetHabilitar(true);
        $("#TextVigenciaLqd").byaSetHabilitar(true);
        $("#TextNroLqd").byaSetHabilitar(true);
        $("#TextValLqd").byaSetHabilitar(true);
        $("#CboDS").byaSetHabilitar(true);
        $("#BtnguardarImpuesto").byaSetHabilitar(true);
        $("#BtncancelarImpuesto").byaSetHabilitar(true);
    };
    var LimpiarImpu = function () {      
        $("#TextVigenciaLqd").val("");
        $("#TextNroLqd").val("");
        $("#TextValLqd").val("");
        LLenarCbos();
        LLenarAdicionesImpu();
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
            crearTablaImpuestos();
        },
        init: function () {
            _addHandlers();
            _Validaciones();
            _createElements();

            //   _HabilitarE();
        }
    };
    

}());
var Exoneracion = (function () {
    "use strict";
  
    var urlToUpdate = "/Servicios/Contratos/wsLegalizacion.asmx/UpdateExo";
    var Cod_Con;
    var byaRpta;
    var msgPpal = "#LbMsg";
    var _addHandlers = function () {

        $("#txtNumero").blur(function (event) {

            var l = $("#txtNumero").val().length;
            if (l >= 1 && l <= 4) {
                Cod_Con = parseInt($("#txtNumero").val());
                $("#txtNumero").val(byaSite.getVigencia() + $("#CboTip").val() + Cod_Con.padLeft(4, "0"));

            }
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirExon();
            }

        });
        $("#BtnguardarExno").click(function () {
            
            GuardarExno();


        });
        $("#BtncancelarExno").click(function () {

            cancelarButtonExno();

        });

    };
    var _Validaciones = function () {
        $("#txtNumero").byaSetHabilitar(true);        
        $("#TextObs").byaSetHabilitar(false);
        $("#CheckExon").byaSetHabilitar(false);
        $("#BtnguardarExno").byaSetHabilitar(false);
        $("#BtncancelarExno").byaSetHabilitar(false);
       
    }; 
    var AbrirExon = function () {
       
        ControlsExno();
      
    };   
    var _createElements = function () {
      
    };    
    var getDatos = function () {
        var Ex = {};
        Ex.COD_CON = $('#txtNumero').val();
        var marcado = $("#CheckExon").prop("checked");
        if (marcado == true) { Ex.EXO_IMP = "S"; } else { Ex.EXO_IMP = "N";}       
        Ex.EXO_OBS = $('#TextObs').val();
        return Ex;
    }
    var GuardarExno = function () {

        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Impuestos.refresh();          
            $(msgPpal).msgBox({ titulo: "Exoneración de impuestos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
        });


    }   
    var cancelarButtonExno = function () {
        LimpiarExno();
    };
    var ControlsExno = function () {
        $("#TextObs").byaSetHabilitar(true);
        $("#CheckExon").byaSetHabilitar(true);       
        $("#BtnguardarExno").byaSetHabilitar(true);
        $("#BtncancelarExno").byaSetHabilitar(true);
    };
    var LimpiarExno = function () {
        $("#TextObs").val("");
        $("#CheckExon").prop("checked", "");
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

            //   _HabilitarE();
        }
    };


}());
var Interventoria = (function () {
    "use strict";
    var grid = '#jqxgridRegisInter';
    var urlModalTerceros = "/DatosBasicosG/Terceros/Tercerosh.html";
    var urlToInsert = "/Servicios/Contratos/wsLegalizacion.asmx/InsertInter";
    var urlToDelete = "/Servicios/Contratos/wsLegalizacion.asmx/DeleteInter";
    var urlToUpdate = "/Servicios/Contratos/wsLegalizacion.asmx/UpdateInter";
    var urlToGridInter = "/Servicios/Contratos/wsLegalizacion.asmx/GetInterventoria";
    var urlToGridInterJson = "/Servicios/Contratos/wsLegalizacion.asmx/GetInterventoria";
    var urlSourceTer = "/Servicios/wsDatosBasicos.asmx/GetNomTercerosPk";

   
    var Cod_Con;
    var byaRpta;
    var msgPpal = "#LbMsg";
    var _addHandlers = function () {
        //$('.currency').blur(function () {
        //    $('.currency').formatCurrency();
        //});
        $("#txtNumero").blur(function (event) {

            var l = $("#txtNumero").val().length;
            if (l >= 1 && l <= 4) {
                Cod_Con = parseInt($("#txtNumero").val());
                $("#txtNumero").val(byaSite.getVigencia() + $("#CboTip").val() + Cod_Con.padLeft(4, "0"));

            }
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirInter();
            }

        });
        $('#TxtIdeInter').blur(function () {
            Interventoria.BuscarTercero($('#TxtIdeInter'), $('#TxtNomCon'));
        });
        $("#BtnBuscCon").click(function () {
            $.get(urlModalTerceros, function (data) {
                $("#secBsqTerceros").html(data);
                mTerceros.showWindow(function (item) {
                    $("#TxtIdeInter").val(item.IDE_TER);
                    $("#TxtNomCon").val(item.NOMBRE);
                });
            });
        });
        $("#BtnguardarIntervria").click(function () {
            GuardarInter();
        });
        $("#BtncancelarIntervria").click(function () {

            cancelarButtonInter();

        });

    };
    var _Validaciones = function () {
       
        $("#CboTipoInter").byaSetHabilitar(false);
        $("#TxtIdeInter").byaSetHabilitar(false);
        $("#TextObser").byaSetHabilitar(false);
        $("#BtnBuscCon").byaSetHabilitar(false);
        $("#BtnguardarIntervria").byaSetHabilitar(false);
        $("#BtncancelarIntervria").byaSetHabilitar(false);
       
    };     
    var AbrirInter = function () {
        _createGrid();       
         ControlsInter();
       
    };   
    var _createElements = function () {
        $('.currency').byaSetDecimal(0);
        $("#TxtIdeInter").byaFormatInput('0123456789');
    
    };
    var getDataAdapter = function () {
        var Cod_Con = $("#txtNumero").val();
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'IDE_INT' },
                    { name: 'NOM_INT' },
                    { name: 'TIP_INT' },
                    { name: 'COD_CON' },
                    { name: 'OBS_INT' },
                    { name: 'EST_INT' },


            ],
            async: true,
            record: 'Table',
            url: urlToGridInter,
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
                theme: Interventoria.config.theme,
                altrows: true,
                editable: true,
                autoheight: true,
                autorowheight: true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columns: [
                  { text: 'Identificación', datafield: 'IDE_INT',editable:false },
                  { text: 'Nombre                          ', datafield: 'NOM_INT', editable: false },
                  { text: 'Tipo              ', datafield: 'TIP_INT', editable: false },
                  { text: 'Contrato     ', datafield: 'COD_CON', editable: false },
                  { text: 'Observacion', datafield: 'OBS_INT' },
                  { text: 'Estado', datafield: 'EST_INT', width: 150, columntype: 'dropdownlist',
                      createeditor: function (row, column, editor) {
                          // assign a new data source to the dropdownlist.
                          var list = ['AC', 'IN'];
                          editor.jqxDropDownList({ autoDropDownHeight: true, source: list });
                      }
                  },
                  { text: 'Eliminar', datafield: 'Eliminar', columntype: 'button', cellsrenderer: function () {
                          return "Eliminar";
                      }, buttonclick: function (row) {
                          // open the popup window when the user clicks a button.


                          byaMsgBox.confirm("Desea eliminar el Interventor/Supervisor?", function (result) {
                              if (result) {
                                  var dataRecord = $(grid).jqxGrid('getrowdata', row);
                                  EliminarInter(Cod_Con, dataRecord.IDE_INT);
                              }
                          });
                      }
                  }
                ]
            });

    };  
    var getDatos = function () {
        var Inter = {};
        Inter.IDE_INT = $('#TxtIdeInter').val();
        Inter.COD_CON = $('#txtNumero').val();       
        Inter.TIP_INT = $('#CboTipoInter').val();
        Inter.USUARIO = byaSite.getUsuario();
        Inter.EST_INT = "AC";
        Inter.OBS_INT = $('#TextObser').val();
        return Inter;
    }
    var GuardarInter = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";
        byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Interventoria.refresh();          
            $(msgPpal).msgBox({ titulo: "Registro de Interventoria a Contratos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                $('#TxtIdeInter').val("");
                $('#CboTipoInter').val("");
                $("#TxtNomCon").val("");
                $('#TextObser').val("");
            }
        });


    }
    var EliminarInter = function (NroCon, IdeInter) {
        var e = {};
        e.COD_CON = NroCon;
        e.IDE_INT = IdeInter;
        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToDelete, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Interventoria.refresh();
            $(msgPpal).msgBox({ titulo: "Eliminar Interventoria de Contrato", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {

            }
        });


    };
    var UpdateInter = function (Obs_Int, Est_Int,Ide_Int) {
        var e = {};
        e.COD_CON = Cod_Con;
        e.OBS_INT = Obs_Int;
        e.EST_INT = Est_Int;
        e.IDE_INT = Ide_Int;
        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Interventoria.refresh();
            $(msgPpal).msgBox({ titulo: "Actualizar Interventoria de Contrato", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {

            }
        });


    };
    var cancelarButtonInter = function () {
        LimpiarInter();
    };
    var ControlsInter = function () {
        $("#TxtIdeInter").byaSetHabilitar(true);
        $("#BtnBuscCon").byaSetHabilitar(true);
        $("#CboTipoInter").byaSetHabilitar(true);
        $("#TextObser").byaSetHabilitar(true);
        $("#BtnguardarIntervria").byaSetHabilitar(true);
        $("#BtncancelarIntervria").byaSetHabilitar(true);
    };
    var LimpiarInter = function () {
        $("#TxtIdeInter").val("");
        $("#TextObser").val("");
        $("#TxtNomCon").val("");        
        $("#CboTipoInter").val("Selecione el Tipo");      
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
            //ModTer.init();
            //   _HabilitarE();
        }
    };


}());
var Confirmacion = (function () {
    "use strict";
    var grid = '#jqxgridRegisConf_Con';
    var grid2 = '#jqxgridRegisConf_Adi';
    var urlGetContratos = "/Servicios/Contratos/wsLegalizacion.asmx/GetConFContratos";
    var urlGetCon_Adiciones = "/Servicios/Contratos/wsLegalizacion.asmx/GetConFAdiciones"
    var urlToUpdate_C = "/Servicios/Contratos/wsLegalizacion.asmx/UpdateConf_C";
    var urlToUpdate_A = "/Servicios/Contratos/wsLegalizacion.asmx/UpdateConf_A";
    var Cod_Con;
    var byaRpta;
    var msgPpal = "#LbMsg";

    var _addHandlers = function () {      
        $("#txtNumero").blur(function (event) {

            var l = $("#txtNumero").val().length;
            if (l >= 1 && l <= 4) {
                Cod_Con = parseInt($("#txtNumero").val());
                $("#txtNumero").val(byaSite.getVigencia() + $("#CboTip").val() + Cod_Con.padLeft(4, "0"));

            }
            if ($("#txtNumero").val().length == 10) {
                Cod_Con = $("#txtNumero").val();
                AbrirConf();
            }

        });
    };
    var _Validaciones = function () {

 

    };
    var AbrirConf = function () {
        _createGrid_C();
        _createGrid_A();
    };
    var _createElements = function () {
       

    };
    var getDataAdapter_C = function () {
        var Cod_Con = $("#txtNumero").val();
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'COD_CON' },
                    { name: 'FEC_APR_POL', type: 'date' },
                    { name: 'RES_APR_POL' },
                    { name: 'LEGALIZADO' },
                    { name: 'COD_CON0' },
                    { name: 'EXENPOL' },


            ],
            async: true,
            record: 'Table',
            url: urlGetContratos,
            data: { 'Cod_Con': Cod_Con }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        return dataAdapter;
    };
    var _createGrid_C = function () {
        $(grid).jqxGrid(
            {
                width: '100%',
                source: getDataAdapter_C(),
                theme: Confirmacion.config.theme,
                altrows: true,
                editable: true,
                autoheight: true,
                autorowheight: true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columns: [
                  { text: 'Documento', datafield: 'COD_CON', editable: false },
                  { text: 'Fecha de Legalización', datafield: 'FEC_APR_POL', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right' },
                  { text: 'N° Resolución', datafield: 'RES_APR_POL' },
                  { text: 'Legalizado', datafield: 'LEGALIZADO', width: 150, columntype: 'dropdownlist',
                      createeditor: function (row, column, editor) {
                          // assign a new data source to the dropdownlist.
                          var list = ['N', 'S'];
                          editor.jqxDropDownList({ autoDropDownHeight: true, source: list });
                      }
                  },
                  { text: 'Documento Inicial', datafield: 'COD_CON0', editable: false },
                  { text: 'Exento de Poliza', datafield: 'EXENPOL', width: 150, columntype: 'dropdownlist',
                      createeditor: function (row, column, editor) {
                          // assign a new data source to the dropdownlist.
                          var list = ['N', 'S'];
                          editor.jqxDropDownList({ autoDropDownHeight: true, source: list });
                      }
                  },
                  { text: 'Actualizar', datafield: 'Actualizar', columntype: 'button', cellsrenderer: function () {
                          return "Actualizar";
                      }, buttonclick: function (row) {
                          // open the popup window when the user clicks a button.


                          byaMsgBox.confirm("Desea Actualizar la Legalización?", function (result) {
                              if (result) {
                                  var dataRecord = $(grid).jqxGrid('getrowdata', row);

                                  UpdateConf_C(dataRecord.FEC_APR_POL, dataRecord.RES_APR_POL, dataRecord.LEGALIZADO, dataRecord.EXENPOL);
                              } else {
                                  Confirmacion.refresh();
                              }
                          });
                      }
                  }
                ]
            });

    };
    var getDataAdapter_A = function () {
        var Cod_Con = $("#txtNumero").val();
        var source = {

            datatype: "xml",
            datafields: [
	                { name: 'NRO_ADI' },
                    { name: 'FEC_APR_POL', type: 'date' },
                    { name: 'RES_APR_POL' },
                    { name: 'LEGALIZADO' },
                    { name: 'COD_CON' },
                    { name: 'EXENPOL' },


            ],
            async: true,
            record: 'Table',
            url: urlGetCon_Adiciones,
            data: { 'Cod_Con': Cod_Con }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        return dataAdapter;
    };
    var _createGrid_A = function () {
        $(grid2).jqxGrid(
            {
                width: '100%',
                source: getDataAdapter_A(),
                theme: Confirmacion.config.theme,
                altrows: true,
                editable: true,
                autoheight: true,
                autorowheight: true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columns: [
                  { text: 'Documento   ', datafield: 'NRO_ADI', editable: false },
                  { text: 'Fecha de Legalización', datafield: 'FEC_APR_POL', columntype: 'datetimeinput', cellsformat: 'd', align: 'right', cellsalign: 'right' },
                  { text: 'N° Resolución', datafield: 'RES_APR_POL' },
                  { text: 'Legalizado', datafield: 'LEGALIZADO', width: 150, columntype: 'dropdownlist',
                      createeditor: function (row, column, editor) {
                          // assign a new data source to the dropdownlist.
                          var list = ['N', 'S'];
                          editor.jqxDropDownList({ autoDropDownHeight: true, source: list });
                      }
                  },
                  { text: 'Documento Inicial', datafield: 'COD_CON' , editable: false },
                  { text: 'Exento de Poliza', datafield: 'EXENPOL', width: 150, columntype: 'dropdownlist',
                      createeditor: function (row, column, editor) {
                          // assign a new data source to the dropdownlist.
                          var list = ['N', 'S'];
                          editor.jqxDropDownList({ autoDropDownHeight: true, source: list });
                      }
                  },
                  {
                      text: 'Actualizar', datafield: 'Actualizar', columntype: 'button', cellsrenderer: function () {
                          return "Actualizar";
                      }, buttonclick: function (row) {
                          // open the popup window when the user clicks a button.


                          byaMsgBox.confirm("Desea Actualizar la Legalización?", function (result) {
                              if (result) {
                                  var dataRecord = $(grid2).jqxGrid('getrowdata', row);

                                  UpdateConf_A(dataRecord.FEC_APR_POL, dataRecord.RES_APR_POL, dataRecord.LEGALIZADO, dataRecord.EXENPOL);
                              } else {
                                  Confirmacion.refresh();
                              }
                          });
                      }
                  }
                ]
            });

    };
    var UpdateConf_C = function (FecAprPol,Resol, Lega,Exenp) {
        var e = {};
        e.COD_CON = Cod_Con;
        e.FEC_APR_POL = FecAprPol;
        e.RES_APR_POL = Resol
        e.LEGALIZADO = Lega;
        e.EXENPOL = Exenp;
     
        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToUpdate_C, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Confirmacion.refreshC();
            $(msgPpal).msgBox({ titulo: "Actualizar Legalizacion de Contrato", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                     
            if (!byaRpta.Error) {

            }
        });


    };
    var UpdateConf_A = function (FecAprPol, Resol, Lega, Exenp) {
        var e = {};
        e.COD_CON=Cod_Con;
        e.FEC_APR_POL = FecAprPol;
        e.RES_APR_POL = Resol
        e.LEGALIZADO = Lega;
        e.EXENPOL = Exenp;
        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToUpdate_A, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            Confirmacion.refreshA();
            $(msgPpal).msgBox({ titulo: "Actualizar Legalizacion de Adiciones", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            if (!byaRpta.Error) {

            }
        });


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
        refreshC: function () {
            $(grid).jqxGrid({ source: getDataAdapter_C() });
        },
        refreshA: function () {
            $(grid2).jqxGrid({ source: getDataAdapter_A() });
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
    byaSite.SetModuloP({ TituloForm: "Legalización", Modulo: "Contratos", urlToPanelModulo: "#", Cod_Mod: "CONT4", Rol: "CT_LEG" });
    RegistroPresupuestal.config.theme = byaSite.tema
    RegistroPresupuestal.init();
    Polizas.config.theme = byaSite.tema
    Polizas.init();
    Impuestos.config.theme = byaSite.tema
    Impuestos.init();    
    Exoneracion.config.theme = byaSite.tema
    Exoneracion.init();
    Interventoria.config.theme = byaSite.tema
    Interventoria.init();
    Confirmacion.config.theme = byaSite.tema
    Confirmacion.init();
});
