var GesCronograma = (function () {
    "user strict";
    var msgPpal = "#msgPpal";
    var grid = "#jqxgrid";
    var CboCodAct = {};
    var urlToGrid = "/Servicios/wsProcesos.asmx/GetCronograma";
    var urlToActNC = "/Servicios/wsProcesos.asmx/GetActividadesNC";
    var urlToProceso = "/Servicios/wsProcesos.asmx/GetProceso";
    var urlToUpdate = "/Servicios/wsProcesos.asmx/UpdCronograma";
    var _addHandlers = function () {
        $('#BtnAdd').click(function () {
            _Adicionar();
        });
        $('#BtnGuardar').click(function () {
            _guardar();
        });
    };
    var _guardar = function () {
        var rows = $(grid).jqxGrid('getboundrows');
        jsonData = "{'lst':" + JSON.stringify(rows) + ",'Num_Pro':'" + GesCronograma.getNumPro() + "'}";
        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            if (!byaRpta.Error) {
                $(msgPpal).msgBox({ titulo: "Configuración de Cronograma", mensaje: byaRpta.Mensaje , tipo: !byaRpta.Error });
                GesCronograma.editedRows.splice(0, GesCronograma.editedRows.length);
                _createElements();
            } else {
                $(msgPpal).msgBox({ titulo: "Configuración de Cronograma", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
            }
        });
        
    };
    var _Adicionar = function () {
        var ds = CboCodAct.getSeleccionado();
        //GesCronograma.agregar(ds.COD_ACT, ds.NOM_ACT);
        var datarow = {};
        datarow.COD_ACT = ds.COD_ACT;
        datarow.NOM_ACT = ds.NOM_ACT;
        datarow.EST_ACT = '0000';
        datarow.NOM_EST = 'SIN CONFIGURAR';
        datarow.IS_NUEVO = true;
        datarow.MFECINI = ds.MFECINI;
        datarow.MHORINI = ds.MHORINI;
        datarow.MFECFIN = ds.MFECFIN;
        datarow.MHORFIN = ds.MHORFIN;
        datarow.OBLIGATORIOL = ds.OBLIGATORIO == "SI" ? true : false;
        datarow.NOTIFICARL = ds.NOTIFICAR == "SI" ? true : false;
        var rows = $(grid).jqxGrid('getrows');
        var encontrado = false;
        $.each(rows, function (index, item) {
            if (item.COD_ACT == datarow.COD_ACT) {
                encontrado = true;
                return;
            }
        });
        if (encontrado) {
            alert("ya esta registrado...");
        }
        else {
            var commit = $(grid).jqxGrid('addrow', null, datarow);
            CboCodAct.DesHabilitar();

        }
    };
    //Creating all page elements which are jqxWidgets
    function _createElements() {
        var tema = GesCronograma.config.theme;
        
        var numproc=GesCronograma.getNumPro();
        var jsonParam={ Num_Pro: "'" + numproc + "'" };
        var source = byaPage.getSource(urlToActNC,jsonParam );
        var sourceP = byaPage.getSource(urlToProceso, jsonParam);

        var DataFields = [
                    { Titulo: 'Número', Campo: 'PRO_SEL_NRO', Tipo: 'S' },
                    { Titulo: 'Objeto', Campo: 'OBJ_CON', Tipo: 'S' },
                    { Titulo: 'Valor a Contratar', Campo: 'VAL_CON', Tipo: 'N' },
                    { Titulo: 'Estado', Campo: 'NOM_EST_PROC', Tipo: 'S' },
                    { Titulo: 'Dep. Necesidad', Campo: 'DEP_CON_NOM', Tipo: 'S' },
                    { Titulo: 'Dep. Delegada', Campo: 'DEP_PCON_NOM', Tipo: 'S' },
                    { Titulo: 'Modalidad', Campo: 'COD_TPRO_NOM', Tipo: 'S' },
                    { Titulo: 'Tipo', Campo: 'TIP_CON_NOM', Tipo: 'S' },
                    { Titulo: 'Sub Tipo', Campo: 'STIP_CON_NOM', Tipo: 'S' },
                    { Titulo: 'Encargado', Campo: 'NOM_ABOG_ENC', Tipo: 'S' }
                    //{ Titulo: 'Contratista(F)', Campo: 'NOM_CONTRATISTA', Tipo: 'S' }
        ];
        var Titulo = "INFORMACION DETALLADA DEL PROCESO";
        $('#dvdProc').DetailsJSON(sourceP, DataFields, Titulo);


        $("#tabs").html("");
        var items = '<li class="active"><a href="Crono.html?num_pro=' + numproc + '" Title="Configuración de Actividades">Configuración </a></li>';
        items += '<li ><a href="CronoS.html?num_pro=' + numproc + '" Title="Seguimiento de Actividades">Seguimiento </a></li>';
        //alert(items);
        $(".Nproc").html(numproc);
        
        
        $("#tabs").append(items);
        
        //instanciar nuevo objeto
        CboCodAct = new byaComboBox();
        //inicializar el objeto
        CboCodAct.init({ Id: "#CboCodAct", Source: source, Value: "COD_ACT", Display: "NOM_ACT", placeHolder:"Seleccione Actividad a Agregar" });

        _createGrid();

    };
    //crea Grid
    function _createGrid() {
        var EstSeg = [
               { cod_est: "0000", nom_est: "Sin configurar", is_final:"NO" },
               { cod_est: "0001", nom_est: "Sin Iniciar", is_final: "NO" },
               { cod_est: "0002", nom_est: "En Curso", is_final: "NO" },
               { cod_est: "0003", nom_est: "Hecho", is_final: "NO" },
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
        var horas = [
               { cod_hor: "0", des_hor: "00 a.m." },
               { cod_hor: "1", des_hor: "01 a.m." },
               { cod_hor: "2", des_hor: "02 a.m." },
               { cod_hor: "3", des_hor: "03 a.m." },
               { cod_hor: "4", des_hor: "04 a.m." },
               { cod_hor: "5", des_hor: "05 a.m." },
               { cod_hor: "6", des_hor: "06 a.m." },
               { cod_hor: "7", des_hor: "07 a.m." },
               { cod_hor: "8", des_hor: "08 a.m." },
               { cod_hor: "9", des_hor: "09 a.m." },
               { cod_hor: "10", des_hor: "10 a.m." },
               { cod_hor: "11", des_hor: "11 a.m." },
               { cod_hor: "12", des_hor: "12 a.m." },
               { cod_hor: "13", des_hor: "01 p.m." },
               { cod_hor: "14", des_hor: "02 p.m." },
               { cod_hor: "15", des_hor: "03 p.m." },
               { cod_hor: "16", des_hor: "04 p.m." },
               { cod_hor: "17", des_hor: "05 p.m." },
               { cod_hor: "18", des_hor: "06 p.m." },
               { cod_hor: "19", des_hor: "07 p.m." },
               { cod_hor: "20", des_hor: "08 p.m." },
               { cod_hor: "21", des_hor: "09 p.m." },
               { cod_hor: "22", des_hor: "10 p.m." },
               { cod_hor: "23", des_hor: "11 p.m." }
        ];

        var horasSource =
        {
            datatype: "array",
            datafields: [
                { name: 'des_hor', type: 'string' },
                { name: 'cod_hor', type: 'number' }
            ],
            localdata: horas
        };

        var horasAdapter = new $.jqx.dataAdapter(horasSource, {
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
                    { name: 'DHORAI', value: 'HORAI', values: { source: horasAdapter.records, value: 'cod_hor', name: 'des_hor' } },
                    { name: 'DHORAF', value: 'HORAF', values: { source: horasAdapter.records, value: 'cod_hor', name: 'des_hor' } },
                    { name: 'NOM_EST_SEG', value: 'EST_ACT', values: { source: EstSegAdapter.records, value: 'cod_est', name: 'nom_est' } }

                ],
                addrow: function (rowid, rowdata, position, commit) {
                    var byaRpta = {};
                    jsonData = "{'Reg':" + JSON.stringify(rowdata) + "}";
                    commit(true);
                },
                updaterow: function (rowid, newdata, commit) {
                    var rowindex = $(grid).jqxGrid('getrowboundindexbyid', rowid);
                    if (newdata.IS_FINAL == "SI") {
                        alert("La actividad no puede modificarse, ya fue completada");
                        commit(false);
                    }
                    else{
                        GesCronograma.editedRows.push({ index: rowindex, data: newdata });
                        commit(true);
                    }
                },
                async: false,
                record: 'Table',
                url: urlToGrid,
                data: { 'Num_Pro': "'"+ Num_Pro+ "'" }
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

        var cellclass = function (row, datafield, value, rowdata) {
            var dataRecord = $(grid).jqxGrid('getrowdata', row);
            if (dataRecord.IS_ANULAR) {
                return "delRow";
            }
            if (dataRecord.IS_NUEVO) {
                return "newRow";
            }
            for (var i = 0; i < GesCronograma.editedRows.length; i++) {
                    if (GesCronograma.editedRows[i].index == row) {
                        return "editedRow";
                    }
            }
        };
        
        var cellbegineditHI = function (row, datafield, columntype, value) {
            var dataRecord = $(grid).jqxGrid('getrowdata', row);
            return dataRecord.MHORINI == "SI";
        };

        var cellbegineditFF = function (row, datafield, columntype, value) {
            var dataRecord = $(grid).jqxGrid('getrowdata', row);
            return dataRecord.MFECFIN == "SI";
        };

        var cellbegineditHF = function (row, datafield, columntype, value) {
            var dataRecord = $(grid).jqxGrid('getrowdata', row);
            return dataRecord.MHORFIN == "SI";
        };
        
        //{ label: 'Estado', value: 'NOM_EST', checked: false }, 
        var listSource = [
                            { label: 'Obligatorio', value: 'OBLIGATORIOL', checked: false },
                            { label: 'Hito', value: 'NOTIFICARL', checked: false }
                        ];
        
        //{ text: 'Fecha', datafield: 'FECHAI', width: 190, columngroup: 'desde', cellclassname: cellclass, columntype: 'datetimeinput', width: 110, cellsalign: 'right', cellsformat: 'd' },
        $(grid).jqxGrid(
            {
                width: '100%',
                source: getAdapter(),
                theme: GesCronograma.config.theme,
                sortable: true,
                autorowheight: true,
                autoheight: true,
                altrows: true,
                editable:true,
                enabletooltips: true,
                localization: byaPage.getLocalization(),
                editmode: 'click',
                columnsresize: true,
                columns: [
                  { text: 'Actividad ', datafield: 'NOM_ACT', cellclassname: cellclass, editable: false, pinned: true },
                  { text: 'Estado', datafield: 'NOM_EST', width: 100, cellclassname: cellclass, editable: false },
                  { text: 'Fecha', datafield: 'FECHAI', width: 200, columngroup: 'desde', cellclassname: cellclass, columntype: 'datetimeinput', width: 110, cellsalign: 'right', cellsformat: 'd' },
                  {
                      text: 'Hora', datafield: 'HORAI', width: 90, cellbeginedit: cellbegineditHI, cellclassname: cellclass, columngroup: 'desde', displayfield: 'DHORAI', columntype: 'dropdownlist',
                      createeditor: function (row, value, editor) {
                          editor.jqxDropDownList({ source: horasAdapter, placeHolder:'Hora Inicial:', displayMember: 'des_hor', valueMember: 'cod_hor' });
                      }
                  },
                  {
                      text: 'Minutos ', datafield: 'MIN_I', width: 70, cellbeginedit: cellbegineditHI, cellclassname: cellclass, columngroup: 'desde', cellclassname: cellclass, cellsalign: 'right', columntype: 'numberinput',
                      validation: function (cell, value) {
                          if (value < 0 || value > 59) {
                              return { result: false, message: "Los minitos deben estar en intervalo de 0-59 " };
                          }
                          return true;
                      },
                      initeditor: function (row, cellvalue, editor) {
                        editor.jqxNumberInput({ decimalDigits: 0, min:0,max:59 });
                    }
                  },
                  { text: 'Fecha', datafield: 'FECHAF', width: 200, cellbeginedit:cellbegineditFF,columngroup: 'hasta', cellclassname: cellclass, columntype: 'datetimeinput', width: 110, cellsalign: 'right', cellsformat: 'd' },
                  {
                      text: 'Hora', datafield: 'HORAF', width: 90, cellbeginedit: cellbegineditHF, columngroup: 'hasta', displayfield: 'DHORAF', columntype: 'dropdownlist',
                        createeditor: function (row, value, editor) {
                            editor.jqxDropDownList({ source: horasAdapter, placeHolder:'Hora Final:', displayMember: 'des_hor', valueMember: 'cod_hor' });
                        }
                  },
                  {
                      text: 'Minutos ', datafield: 'MIN_F', width: 70,cellbeginedit: cellbegineditHF, columngroup: 'hasta', cellclassname: cellclass, cellsalign: 'right', columntype: 'numberinput',
                      validation: function (cell, value) {
                          if (value < 0 || value > 59) {
                              return { result: false, message: "Los minitos deben estar en intervalo de 0-59 " };
                          }
                          return true;
                      },
                      initeditor: function (row, cellvalue, editor) {
                          editor.jqxNumberInput({ decimalDigits: 0, min: 0, max: 59 });
                      }
                  },
                { text: 'Anular', datafield: 'IS_ANULAR', width: 50, align: 'center', cellclassname: cellclass, columntype: 'checkbox', editable: true },
                { text: 'Agregar', datafield: 'IS_NUEVO', width: 50, align: 'center', cellclassname: cellclass, columntype: 'checkbox', editable: false, hidden: true },
                { text: 'Oblig.', datafield: 'OBLIGATORIOL', width: 50, cellclassname: cellclass, columntype: 'checkbox', editable: false, hidden: true },
                { text: 'Hito', datafield: 'NOTIFICARL', width: 50, cellclassname: cellclass, columntype: 'checkbox', editable: false, hidden: true }
                
                ],
                columngroups:
                [
                  { text: 'Desde', align: 'center', name: 'desde' },
                  { text: 'Hasta', align: 'center', name: 'hasta' }
                ]
            });
        
        
        //{ text: 'Fecha', datafield: 'FECHAC', width: 200, cellclassname: cellclass },
        //{
        //    text: '', columntype: 'button', width: 100, align: 'center', cellsrenderer: function () {
        //        return "Anular";
        //    }, buttonclick: function (row) {
        //        // open the popup window when the user clicks a button.
        //        editrow = row;
        //        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
        //        alert(JSON.stringify(dataRecord));
        //        alert("Desea Anular la Fila...");
        //    }
        //},
    }
    return {
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        getNumPro: function () {
            return $.getUrlVar("num_pro");
        },
        getRecord: function () {
            var selectedrowindex = $(grid).jqxGrid('getselectedrowindex');
            var dataRecord = $(grid).jqxGrid('getrowdata', selectedrowindex);
            return dataRecord;
        },
        init: function () {
            this.editedRows = new Array();
            _addHandlers();
            _createElements();
            editar = true;
            
        }
    };
}());
var id,id2;
$(function () {
    
    GesCronograma.config.theme = byaSite.tema;
    GesCronograma.init();
    
    
});


    
