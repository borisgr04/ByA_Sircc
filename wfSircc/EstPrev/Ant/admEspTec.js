var admEspTec = (function () {
    var ventana = '#wEspTec';
    var msgPopup = "#msgEPEditar";
    var msgPpal = "#msgEPEditar";
    var grid = "#jqxgridEspTec";
    
    var urlToInsert = "wfRgEstPrev.aspx/GuardarEP";
    var urlToGrid = "wfRgEstPrev.aspx/GetEP_ESPTEC";
    var urlToUpdate = "wfRgEstPrev.aspx/GuardarModEPList";
    var urlToDelete = "wfRgEstPrev.aspx/deleteEP";


    var divBtnGrid = "#divBtnGridEP";

    //Adding event listeners
    function _addEventListeners() {

        $('#txtValUni').change( function (event) {
            calcularParcial();
        });
        $('#txtCan').change(function (event) {
            calcularParcial();
        });
        $('#txtIVA').change(function (event) {
            calcularParcial();
        });
        $("#BtnEPGuardar").click(function () {
            GuardarNuevo();
        });
        var GuardarNuevo = function () {
            var row = {};
            row.DESC_ITEM = $('#txtDesc').val();
            row.CANT_ITEM = $('#txtCan').val();
            row.UNI_ITEM= $('#txtUni').val();
            row.VAL_UNI_ITEM = $('#txtValUni').val();
            row.PORC_IVA= $('#txtIVA').val();
            row.VAL_PAR = $('#txtValPar').val();
            row.GRUPO = $('#txtGrupo').val();
            row.IsNuevo = true;
            
            
            var commit = $(grid).jqxGrid('addrow', null, row);
            if (commit) { //Si se quiere que al guardar se limpien los datos
                $('#txtDesc').val('');
                $('#txtCan').val('');
                $('#txtUni').val('');
                $('#txtValUni').val(0);
                $('#txtIVA').val(0);
                $('#txtValPar').val(0);
                $('#txtGrupo').val(0);
            }
        }
        $("#BtnEPCancelar").click(function () {

            $(ventana).jqxWindow('close');
        });
        calcularParcial = function () {
            //var value = event.args.value;
            var iva = 1 + $("#txtIVA").val() / 100;
            var parcial = $('#txtValUni').val() * $('#txtCan').val() * iva;
            $('#txtValPar').val(parcial);
        }

    };

    //Creating all page elements which are jqxWidgets
    function _createElements() {
        var tema = admEspTec.config.theme;

        $(ventana).jqxWindow({ autoOpen: false,
            showCollapseButton: true, maxHeight: 600, maxWidth: 650, minHeight: 300, minWidth: 200, height: 500, width: 550,
            theme: tema
        });
        _createGrid();
        _createToolGrid();

    };

    var actualizarGrid = function () {

        jsonData = "{'Reg':" + JSON.stringify(admEspTec.editedRows) + "}";
        alert(JSON.stringify(admEspTec.editedRows));
        byaPage.POST_Sync(urlToUpdate, jsonData, function (result) {//Enviar Datos Sincronicamente

            byaRpta = byaPage.retObj(result.d);

            //Mensaje del popup
            msg = $(msgPopup); //referencia msg
            msg.html(byaRpta.Mensaje); //mostrar msg en div 
            byaPage.msgResult(msg, byaRpta.Error); //colocar colores de acuerdo al error

            //Mensaje arriba de la grid
            msg = $(msgPpal); //referencia msg
            msg.html(byaRpta.Mensaje); //mostrar msg en div 
            byaPage.msgResult(msg, byaRpta.Error); //colocar colores de acuerdo al error

        });

        //Completar Datos para mostrar en la grid   

        admEspTec.editedRows.splice(0, admEspTec.editedRows.length);
        //alert(editedRows.length);
        $(grid).jqxGrid("updatebounddata");
        //Confirmar si no hay errror
        return !byaRpta.Error;

    };

    function _createToolGrid() {
        
        var addButton = $("#addButton");//byaPage.addButton();
        var deleteButton = $("#deleteButton");// byaPage.deleteButton();
        var updButton = $("#updButton");//byaPage.updButton();
        var reloadButton = $("#reloadButton");//byaPage.reloadButton();
        var xlsButton = $("#xlsButton");//byaPage.xlsButton();

        
        addButton.byaSetHabilitar(!admEspTec.disabled );
        updButton.byaSetHabilitar(!admEspTec.disabled );
        deleteButton.byaSetHabilitar(!admEspTec.disabled);
        
        updButton.click(function (event) {
                actualizarGrid();
        });
        addButton.click(function (event) {
                $(ventana).jqxWindow('open');
        });

            // delete selected row.
        deleteButton.click(function (event) {
            
                var selectedrowindex = $(grid).jqxGrid('getselectedrowindex');
                var rowscount = $(grid).jqxGrid('getdatainformation').rowscount;
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = $(grid).jqxGrid('getrowid', selectedrowindex);
                    $(grid).jqxGrid('deleterow', id);
                }
            });
        
        // reload grid data.
        reloadButton.click(function (event) {
            admEspTec.editedRows.splice(0, admEspTec.editedRows.length);
            $(grid).jqxGrid({ source: getAdapter() });
            alert("...");
            msg = $(msgPpal); //referencia msg
            msg.html("Se Recargaron los datos de la base de datos"); //mostrar msg en div 
            byaPage.msgResult(msg, byaRpta.Error); //colocar colores de acuerdo al error
        });
        xlsButton.click(function (event) {
            $(grid).jqxGrid('exportdata', 'xls', 'EspecificacionesTecnicas_EP');
        });
    }
    //crea Grid
    function _createGrid() {

        var getAdapter = function () {
            id = admEspTec.id_ep;

            var source = {
                datatype: "xml",
                datafields: [
	                { name: 'ID_EP' },
                    { name: 'ID' },
                    { name: 'DESC_ITEM', type: 'string' },
                    { name: 'CANT_ITEM', type: 'number' },
                    { name: 'UNI_ITEM', type: 'string' },
                    { name: 'VAL_UNI_ITEM', type: 'number' },
                    { name: 'PORC_IVA', type: 'number' },
                    { name: 'VAL_PAR', type: 'number' },
                    { name: 'GRUPO', type: 'number' },
                    { name: 'IsAnular', type: 'bool' },
                    { name: 'IsNuevo', type: 'bool' },
                    { name: 'IsModif', type: 'bool' }
                 ],
                addrow: function (rowid, rowdata, position, commit) {
                    var byaRpta = {};
                    //id = TxtID.value == "" ? 0 : TxtID.value;
                    id = admEspTec.id_ep;
                    rowdata.ID_EP = id;
                    rowdata.IsNuevo = true;
                    /*
                    jsonData = "{'Reg':" + JSON.stringify(rowdata) + "}";
                    byaPage.POST_Sync(urlToInsert, jsonData, function (result) {//Enviar Datos Sincronicamente
                        byaRpta = byaPage.retObj(result.d);
                        //Mensaje del popup
                        msg = $(msgPopup); //referencia msg
                        msg.html(byaRpta.Mensaje); //mostrar msg en div 
                        byaPage.msgResult(msg, byaRpta.Error); //colocar colores de acuerdo al error
                        //Mensaje arriba de la grid
                        msg = $(msgPpal); //referencia msg
                        msg.html(byaRpta.Mensaje); //mostrar msg en div 
                        byaPage.msgResult(msg, byaRpta.Error); //colocar colores de acuerdo al error
                    });
                    */
                    //Completar Datos para mostrar en la grid   
                    rowdata["ID"] = byaRpta.id;
                    //Confirmar si no hay errror
                    commit(!byaRpta.Error);

                },
                deleterow: function (rowid, commit) {

                    var byaRpta = {};
                    if (confirm("Desea eliminar el item")) {
                        var rowdata = $(grid).jqxGrid('getrowdatabyid', rowid);

                        jsonData = "{'ID':" + rowdata.ID + "}";


                        byaPage.POST_Sync(urlToDelete, jsonData, function (result) {//Enviar Datos Sincronicamente

                            byaRpta = byaPage.retObj(result.d);

                            //Mensaje del popup
                            msg = $(msgPopup); //referencia msg
                            msg.html(byaRpta.Mensaje); //mostrar msg en div 
                            byaPage.msgResult(msg, byaRpta.Error); //colocar colores de acuerdo al error

                            //Mensaje arriba de la grid
                            msg = $(msgPpal); //referencia msg
                            msg.html(byaRpta.Mensaje); //mostrar msg en div 
                            byaPage.msgResult(msg, byaRpta.Error); //colocar colores de acuerdo al error

                        });

                        //Completar Datos para mostrar en la grid   
                        rowdata["ID"] = byaRpta.id;
                        //Confirmar si no hay errror
                        commit(!byaRpta.Error);
                    }
                },
                updaterow: function (rowid, newdata, commit) {
                    
                    var iva = 1 + newdata.PORC_IVA / 100;
                    newdata.VAL_PAR = newdata.CANT_ITEM * newdata.VAL_UNI_ITEM * iva;
                    //alert(newdata.VAL_PAR);
                    newdata.IsModif = true;
                    commit(true);
                    /*                   
                    var rowindex = $(grid).jqxGrid('getrowboundindexbyid', rowid);
                    for (var i = 0; i < admEspTec.editedRows.length; i++) {
                        if (admEspTec.editedRows[i].index == rowid) {
                            admEspTec.editedRows[i].splice(i, 1);
                        }
                    }
                    admEspTec.editedRows.push({ index: rowindex, data: newdata });
                    alert(JSON.stringify(admEspTec.editedRows));
                    */
                    
                },
                async: false,
                record: 'Table',
                url: urlToGrid,
                data: { 'id': id }
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
            for (var i = 0; i < admEspTec.editedRows.length; i++) {
                if (admEspTec.editedRows[i].index == row) {
                    return "editedRow";
                }
            }
        }
        //autorowheight: true,
        var editar = !admEspTec.disabled;
        var cellsrendererT = function (row, column, value) {
            var rowData = $(grid).jqxGrid('getrowdata', row);
            rowData.VAL_PAR = rowData.CANT_ITEM * rowData.VAL_UNI_ITEM ;
            var column = $(grid).jqxGrid('getcolumn', column);
            if (column.cellsformat != '') {
                if ($.jqx.dataFormat) {
                    if ($.jqx.dataFormat.isNumber(rowData.VAL_PAR)) {
                        value = $.jqx.dataFormat.formatnumber(rowData.VAL_PAR, column.cellsformat);
                    }
                }
            }
            return '<span style="margin: 4px; float: ' + column.cellsalign + ';">' + value + '</span>';
        };
        $(grid).jqxGrid(
            {
                width: '100%',
                source: getAdapter(),
                theme: admEspTec.config.theme,
                sortable: true,
                altrows: true,
                enabletooltips: true,
                editable: editar,
                height: 150,
                localization: byaPage.getLocalization(),
                editmode: byaPage.editGrid,
                columns: [
                  { text: 'Grupo', datafield: 'GRUPO', width: 50, cellclassname: cellclass,hidden: true  },
                  { text: 'Descripción', datafield: 'DESC_ITEM', cellclassname: cellclass },
                  { text: 'Cantidad', datafield: 'CANT_ITEM', width: 80, cellsalign: 'right', cellsformat: 'f2', columntype: 'numberinput', cellclassname: cellclass },
                  { text: 'Unidad', datafield: 'UNI_ITEM', width: 100, columntype: 'combobox', cellclassname: cellclass },
                  { text: 'IsNuevo', datafield: 'IsNuevo', width: 100, cellclassname: cellclass },
                  { text: 'Valor Unitario', datafield: 'VAL_UNI_ITEM', width: 100, columntype: 'numberinput', cellsalign: 'right', cellsformat: 'c2', cellclassname: cellclass },
                  { text: '% IVA', datafield: 'PORC_IVA', width: 70, columntype: 'numberinput', cellsalign: 'right', cellsformat: "p2", cellclassname: cellclass },
                  { text: 'Valor Parcial',cellsrenderer: cellsrendererT, width: 150, cellsalign: 'right', cellsformat: 'c2', editable: false,cellclassname: cellclass, aggregates: ['sum']}
              
                ]
            });
       
    }

    return {
        disabled: null,
        id_ep: null,
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },

        agregar: function (Cod, Nom) {
            var datarow = {};
            datarow["COD_PRO"] = Cod;
            datarow["NOMBRE_PROYECTO"] = Nom;
            var commit = $("#jqxgridProy").jqxGrid('addrow', null, datarow);
        },
        init: function () {
            this.editedRows = new Array();
            //Creating all jqxWindgets except the window
            _createElements();
            //Attaching event listeners
            _addEventListeners();
            //Adding jqxWindow
            //_createWindow();
        }
    };
} ());

$(function () {
    admEspTec.config.theme = theme;
    admEspTec.id_ep = wizard.TxtID.val();
    admEspTec.disabled = wizard.disabled;
    
    admEspTec.init();
});
