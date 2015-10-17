var GesMisProcesos = (function () {
    "use strict";
    var tema;
    var gridCon = '#jqxgridSol';

    var urlToGridCon = "/Servicios/ProcConsultas/wsProcesosT.asmx/GetProcesosU";
    var urlToRecibir = "/Servicios/wsMisSolicitudes.asmx/Recibir";
    var urlToRevisar = "/Servicios/wsMisSolicitudes.asmx/Revisar";
    var urlToFiltro = '/Servicios/wsMisSolicitudes.asmx/GetCategoriasFiltro';
    var urlToCrono = "Crono.html";
    var urlToGetvDEPENDENCIAD = '/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD';
    var urlToGetvFuncionariosP = '/Servicios/wsDatosBasicos.asmx/GetvFuncionariosP';


    var _addHandlers = function () {
        $("#CboDepDel").change(function () {
            
            var sourceMod = byaPage.getSource(urlToGetvFuncionariosP, { cod_dep: "'" + $("#CboDepDel").val()+ "'" });
            $("#cboFun").byaCombo({ DataSource: sourceMod, Display: "NOMBRE", Value: "IDE_TER", placeHolder: "Seleccione el Funcionario..." });

            
        });

        $("#cboFun").change(function () {
            $(gridCon).jqxGrid({ source: getDataAdapter() });
        });

        $('#BtnCronograma').click(function () {
            var dataRecord = GesMisProcesos.getRecord();
            if (dataRecord != null) {
                //byaPage.AbrirPagina(urlToCrono + "?num_pro=" + dataRecord.PRO_SEL_NRO);
                byaSite.AbrirPaginaBlank(urlToCrono + "?num_pro=" + dataRecord.PRO_SEL_NRO);
            }
            else {
                byaMsgBox.alert("No ha seleccionado ningún Proceso");
            }
        });

        $('#BtnExcel').click(function () {
            $(gridCon).jqxGrid('exportdata', 'xls', 'Procesos');
        });
        $('#BtnFullScreen').click(function () {
            byaSite.launchFullScreen(document.getElementById("jqxgridSol"));
            $(gridCon).jqxGrid({ height: 600 });
        });
        $('#BtnFullScreenP').click(function () {
            byaSite.launchFullScreen(document.documentElement);
            $(gridCon).jqxGrid({ height: 600 });
        });

        $('#BtnPrint').click(function () {
            byaSite.printDiv("jqxgridSol");
        });
        
        $("#chkAgrupar").change(function () {
            var groupable = $(this).is(':checked');
            $(gridCon).jqxGrid({ groupable: groupable });
            if (groupable) {
                $(gridCon).jqxGrid('expandallgroups');
                $(gridCon).jqxGrid({ height: 2000 });

                //launchFullScreen(document.documentElement); // la página entera


            } else {
                $(gridCon).jqxGrid({ height: 500 });
            }
        });
        $('#BtnConsulta').click(function () {
            _createGridCon();
        });
        $('#BtnDetalle').click(function () {
            var dt = GesMisProcesos.getRecord();
            GesCronograma.mostrarGrid2(dt.PRO_SEL_NRO);
            $('#modalDetalle').modal('show');
        });

        $(gridCon).on('rowdoubleclick', function (event) {
            //var args = event.args;
            //var row = args.rowindex;
            var dt = GesMisProcesos.getRecord();
            GesCronograma.mostrarGrid2(dt.PRO_SEL_NRO);
            $('#modalDetalle').modal('show');
        });


    };
    var _createElements = function () {
        tema = GesMisProcesos.config.theme;
        var sourceDep = byaPage.getSource(urlToGetvDEPENDENCIAD);
        $("#CboDepDel").byaCombo({ DataSource: sourceDep, Value: "COD_DEP", Display: "NOM_DEP", placeHolder: "Seleccione Dependencia" });


    };
    var getDataAdapter = function () {
        var Dep_Del = "'" + $("#CboDepDel").val() + "'";
        var Usuario = "'" + $("#cboFun").val() + "'";
        var source = {
                datatype: "xml",
                datafields: [
                        { name: 'NUM_SOL' },
                        { name: 'PRO_SEL_NRO' },
                        { name: 'VAL_CON', type: 'number' },
                        { name: 'FEC_REG', type: 'date' },
                        { name: 'USUENCARGADO' },
                        { name: 'COD_TPRO' },
                        { name: 'OBJ_CON', type: 'string' },
                        { name: 'DEP_CON' },
                        { name: 'DEP_PCON' },
                        { name: 'TIP_CON' },
                        { name: 'STIP_CON' },
                        { name: 'DEP_CON_NOM' },
                        { name: 'DEP_PCON_NOM' },
                        { name: 'ESTADO' },
                        { name: 'NOM_ABOG_ENC' },
                        { name: 'TIP_CON_NOM' },
                        { name: 'STIP_CON_NOM' },
                        { name: 'COD_TPRO_NOM' },

                        { name: 'ACT_HOY', type: 'number' },
                        { name: 'ACT_VENCIDAS', type: 'number' },
                        { name: 'ACT_POR_VENCER', type: 'number' },

                        { name: 'ACT_EN_ESPERA', type: 'number' },
                        { name: 'ACT_EN_CURSO', type: 'number' },
                        { name: 'ACT_APLAZADAS', type: 'number' },
                        { name: 'ACT_COMPLETADAS', type: 'number' },

                        { name: 'NOM_EST_PROC', type: 'string' }


                ],
                async: true,
                record: 'Table',
                url: urlToGridCon,
                data: { 'Vigencia': byaSite.getVigencia(), 'Usuario': Usuario }
            };
            var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });
            return dataAdapter;
        
    };

    var _createGridCon = function () {
         var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        };

        var initrowdetails = function (index, parentElement, gridElement, record) {
            var grid = $($(parentElement).children()[0]);
            GesCronograma.mostrarGrid(grid, record.PRO_SEL_NRO);
        };

        var cellclass = function (row, datafield, value, rowdata) {
            if (datafield == 'ACT_HOY') {
                if (value > 0) return "ACT_HOY";
            }
            if (datafield == 'ACT_VENCIDAS') {
                if (value > 0) return "ACT_VENCIDAS";
            }
            if (datafield == 'ACT_POR_VENCER') {
                if (value > 0) return "ACT_POR_VENCER";
            }

        };

        // initialize jqxGrid

        //groupable: true,
        //groups: ['COD_TPRO_NOM']
        //autoheight: true,
        //rowdetails: true,
        //initrowdetails: initrowdetails,
        //rowdetailstemplate: { rowdetails: "<div id='gridCrono' style='margin: 0px;'></div>", rowdetailsheight: 200, rowdetailshidden: true },
        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: getDataAdapter(),
                        theme: GesMisProcesos.config.theme,
                        localization: byaPage.getLocalization(),
                        altrows: true,
                        sortable: true,
                        enabletooltips: true,
                        columnsresize: true,
                        filterable: true,
                        height: 500,
                        ready: function () {
                            $(gridCon).jqxGrid('sortby', 'ACT_HOY', 'desc');
                        },
                        columns: [
                        { text: 'N° Solicitud ', datafield: 'NUM_SOL', width: 130 },
                        { text: 'N° Proceso ', datafield: 'PRO_SEL_NRO', width: 170 },
                        { text: 'Objeto', datafield: 'OBJ_CON', width: 150 },
                        { text: 'Estado del Proceso', datafield: 'NOM_EST_PROC', width: 100 },
                        { text: 'Vencidas', datafield: 'ACT_VENCIDAS', columngroup: 'pendientes', width: 80, cellclassname: cellclass, cellsalign: 'right', },
                        { text: 'Hoy', datafield: 'ACT_HOY', columngroup: 'pendientes', width: 80, cellclassname: cellclass, cellsalign: 'right', },
                        { text: 'Por Vencer', datafield: 'ACT_POR_VENCER', columngroup: 'pendientes', width: 80, cellclassname: cellclass, cellsalign: 'right', },
                        { text: 'En Espera', datafield: 'ACT_EN_ESPERA', columngroup: 'en_ejecucion', width: 80, cellsalign: 'right', },
                        { text: 'En Curso', datafield: 'ACT_EN_CURSO', columngroup: 'en_ejecucion', width: 80, cellsalign: 'right', },
                        { text: 'Aplazadas', datafield: 'ACT_APLAZADAS', width: 80, cellsalign: 'right', },
                        { text: 'Completadas', datafield: 'ACT_COMPLETADAS', width: 80, cellsalign: 'right', },
                        { text: 'Fecha Creación', datafield: 'FEC_REG', width: 150, columntype: 'datetimeinput', cellsalign: 'right', cellsformat: 'd' },
                        { text: 'Valor a Contratar', datafield: 'VAL_CON', width: 150, cellsformat: 'F2', cellsalign: 'right' },
                        { text: 'Tipo', datafield: 'TIP_CON_NOM', width: 150 },
                        { text: 'SubTipo', datafield: 'STIP_CON_NOM', width: 150 },
                        { text: 'Modalidad ', datafield: 'COD_TPRO_NOM', width: 150 },
                        { text: 'Solicitante', datafield: 'DEP_PCON_NOM', width: 150 },
                        { text: 'Delegada', datafield: 'DEP_CON_NOM', width: 150 },
                        { text: 'Encargado', datafield: 'NOM_ABOG_ENC', width: 150 },
                        ],
                        groups: ['COD_TPRO_NOM'],
                        columngroups:
                        [
                          { text: 'Act. Pendientes', align: 'center', name: 'pendientes' },
                          { text: 'Act. en Ejecución', align: 'center', name: 'en_ejecucion' },
                        ]
                    });

    }
    return {
        ID_HREV: null,
        editedRows: null,
        config: {
            theme: null
        },
        getRecord: function () {
            var selectedrowindex = $(gridCon).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridCon).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        init: function () {
            _createElements();
            _addHandlers();
            _createGridCon();
        }
    };
}());
var GesCronograma = (function () {
    "user strict";
    var grid;
    var urlToGrid = "/Servicios/wsProcesos.asmx/GetCronograma";
    function _createGrid() {
        var EstSeg = [
               { cod_est: "0000", nom_est: "Sin configurar", is_final: "NO" },
               { cod_est: "0001", nom_est: "Sin Iniciar", is_final: "NO" },
               { cod_est: "0002", nom_est: "En Curso", is_final: "NO" },
               { cod_est: "0003", nom_est: "Completado", is_final: "NO" },
               { cod_est: "0004", nom_est: "Aplazado", is_final: "NO" },
               { cod_est: "0005", nom_est: "En espera de", is_final: "NO" }
        ];

        var EstSegSource =
        {
            datatype: "array",
            datafields: [
                { name: 'cod_est', type: 'string' },
                { name: 'nom_est', type: 'string' }

            ],
            localdata: EstSeg
        };

        var EstSegAdapter = new $.jqx.dataAdapter(EstSegSource, {
            autoBind: true
        });
        var getAdapter = function () {
            var Num_Pro = GesCronograma.getNumPro();
            var source = {
                datatype: "xml",
                datafields: [
                    { name: 'ID', type: 'number' },
                    { name: 'NUM_PROC', type: 'string' },
                    { name: 'NOM_ACT', type: 'string' },
                    { name: 'COD_ACT', type: 'string' },
                    { name: 'FECHAI', type: 'date' },
                    { name: 'HORAI', type: 'number' },
                    { name: 'FECHAF', type: 'date' },
                    { name: 'FECHAC', type: 'string' },
                    { name: 'HORAF', type: 'number' },
                    { name: 'EST_ACT', type: 'string' },
                    { name: 'OBS_SEG', type: 'string' },
                    { name: 'ANULADO', type: 'string' },
                    { name: 'EST_PROC', type: 'string' },
                    { name: 'DIAS_AVISO', type: 'string' },
                    { name: 'FEC_AVISO', type: 'string' },
                    { name: 'MIN_I', type: 'string' },
                    { name: 'MIN_F', type: 'string' },
                    { name: 'NOTIFICAR', type: 'string' },
                    { name: 'MFECINI', type: 'string' },
                    { name: 'MHORINI', type: 'string' },
                    { name: 'MFECFIN', type: 'string' },
                    { name: 'MHORFIN', type: 'string' },
                    { name: 'ORDEN', type: 'string' },
                    { name: 'NOM_EST', type: 'string' },
                    { name: 'IS_FINAL', type: 'string' },
                    { name: 'OBLIGATORIO', type: 'string' },
                    { name: 'OBLIGATORIOL', type: 'bool' },
                    { name: 'NOTIFICARL', type: 'bool' },
                    { name: 'IS_NUEVO', type: 'bool' },
                    { name: 'IS_ANULAR', type: 'bool' },
                    { name: 'NOM_EST_SEG', value: 'EST_ACT', values: { source: EstSegAdapter.records, value: 'cod_est', name: 'nom_est' } }

                ],
                async: true,
                record: 'Table',
                url: urlToGrid,
                data: { 'Num_Pro': "'" + Num_Pro + "'" }
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
        	            {
        	                contentType: 'application/json; charset=utf-8',
        	                loadError: function (jqXHR, status, error) {
        	                    alert(error + jqXHR.responseText);
        	                }
        	            });
            return dataAdapter;
        }

        var listSource = [
                            { label: 'Obligatorio', value: 'OBLIGATORIOL', checked: false },
                            { label: 'Hito', value: 'NOTIFICARL', checked: false }
        ];
        var cellclass = function (row, datafield, value, rowdata) {
            for (var i = 0; i < GesCronograma.editedRows.length; i++) {
                if (GesCronograma.editedRows[i].index == row) {
                    return "editedRow";
                }
            }
        };
        grid.jqxGrid(
            {
                width: '100%',
                source: getAdapter(),
                theme: byaSite.tema,
                sortable: true,
                height: 400,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                columnsresize: true,
                rowsheight: 30,
                columns: [
                { text: 'Actividad ', datafield: 'NOM_ACT', width: 300, cellclassname: cellclass, editable: false },
                 { text: 'Estado', datafield: 'NOM_EST', width: 100, cellclassname: cellclass, editable: false },
                 { text: 'Fecha', datafield: 'FECHAC', width: 300, cellclassname: cellclass, editable: false },
                 { text: 'Oblig.', datafield: 'OBLIGATORIOL', width: 50, cellclassname: cellclass, columntype: 'checkbox', editable: false, hidden: false },
                { text: 'Hito', datafield: 'NOTIFICARL', width: 50, cellclassname: cellclass, columntype: 'checkbox', editable: false, hidden: false }
                ]
            });
    };

    return {
        NumPro: null,
        editedRows: new Array(),
        config: {
            theme: null
        },
        getNumPro: function () {
            return this.NumPro;
        },
        mostrarGrid: function (gridval, num_pro) {
            this.NumPro = num_pro;
            grid = gridval;
            _createGrid();
        },
        mostrarGrid2: function (num_pro) {
            this.mostrarGrid($("#gridCrono"), num_pro);
        },
        init: function () {
            this.mostrarGrid($("#gridCrono"), "CCMM-SGR-0006-2011");
        }

    };
}());


$(function () {
    byaSite.SetModuloP({ TituloForm: " Consulta de Procesos", Modulo: "MAC - Monitoreo Actividades de Contratación ", urlToPanelModulo: "PanelConsT.aspx", Cod_Mod: "SOLI4", Rol: "PR_CONS" });
    GesMisProcesos.config.theme = byaSite.tema;
    GesMisProcesos.init();
    //GesCronograma.init();
});
