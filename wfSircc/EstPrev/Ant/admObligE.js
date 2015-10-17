var admObligE = (function () {
    var ventana = '#wadmObligE';
    var grid = "#jqxgridObligE";
    var msgPopup = "#msgObligE";
    var msgPpal = "#msgObligEEditar";

    var oper;
    var editrow = -1;
    var docExportXLS = 'ObligacionesEntidad_EP';

    var urlToInsert = "wfRgEstPrev.aspx/InsertObligacionesE";
    var urlToUpdate = "wfRgEstPrev.aspx/UpdateObligacionesE";
    var urlToDelete = "wfRgEstPrev.aspx/deleteObligacionesE";
    var urlToGrid = "wfRgEstPrev.aspx/GetEP_OBLIGACIONESE";
    
    var divBtnGrid = "#divBtnGridObligE";

    //Adding event listeners
    function _addEventListeners() {
        $("#BtnOEGuardar").click(function () {

            if (oper == "add") {
                GuardarNuevo();
            }
            if (oper == "edit") {
                GuardarMod();
            }
        });

        $("#BtnOECancelar").click(function () {
            editrow = -1;
            $(ventana).jqxWindow('close');
        });

        var GuardarNuevo = function () {
            var dataRecord = {};
            dataRecord.GRUPO = $("#txtGrupoOE").val();
            dataRecord.DES_OBLIG = $("#txtObligE").val();

            var commit = $(grid).jqxGrid('addrow', null, dataRecord);
        }

        var GuardarMod = function () {
            if (editrow >= 0) {

                var rowID = $(grid).jqxGrid('getrowid', editrow);
                var dataRecord = $(grid).jqxGrid('getrowdata', editrow);
                dataRecord.GRUPO = $("#txtGrupoOE").val();
                dataRecord.DES_OBLIG = $("#txtObligE").val();
                var commit = $(grid).jqxGrid('updaterow', rowID, dataRecord);
            }
        }
      
    };

    //Creating all page elements which are jqxWidgets
    function _createElements() {

        var tema = admObligE.config.theme;

        $(ventana).jqxWindow({ autoOpen: false,
            showCollapseButton: true, maxHeight: 600, maxWidth: 650, minHeight: 300, minWidth: 200, height: 400, width: 550,
            theme: tema
        });
        _createGrid();
        _createToolGrid();
    };

    function _createToolGrid() {
        var addButton = $("#addButton");//byaPage.addButton();
        var deleteButton = $("#deleteButton");// byaPage.deleteButton();
        var reloadButton = $("#reloadButton");//byaPage.reloadButton();
        var xlsButton = $("#xlsButton");//byaPage.xlsButton();

        addButton.byaSetHabilitar(!admObligE.disabled);
        deleteButton.byaSetHabilitar(!admObligE.disabled);
        
        addButton.click(function (event) {
            oper = "add";
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
            admObligE.editedRows.splice(0, admObligE.editedRows.length);
            $(grid).jqxGrid({ source: getAdapter() });
        });
        xlsButton.click(function (event) {
            $(grid).jqxGrid('exportdata', 'xls', docExportXLS);
        });
    }
    //crea Grid
    function _createGrid() {

        var getAdapter = function () {
            id = admObligE.id_ep;

            var source = {
                datatype: "xml",
                datafields: [
	                { name: 'ID_EP' },
                    { name: 'ID' },
                    { name: 'DES_OBLIG' },
                    { name: 'GRUPO' }
                 ],
                addrow: function (rowid, rowdata, position, commit) {
                    var byaRpta = {};
                    id = admObligE.id_ep;
                    rowdata["ID_EP"] = id;
                    jsonData = "{'Reg':" + JSON.stringify(rowdata) + "}";
                    byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
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
                    $(grid).jqxGrid("updatebounddata");

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

                    var rowindex = $(grid).jqxGrid('getrowboundindexbyid', rowid);
                    var byaRpta = {};
                    id = admObligE.id_ep;
                    newdata["ID_EP"] = id;
                    jsonData = "{'Reg':" + JSON.stringify(newdata) + "}";

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
                    //Confirmar si no hay errror
                    commit(!byaRpta.Error);
                    $(grid).jqxGrid("updatebounddata");

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
        	                    alert("Error en Grid:" + error + jqXHR.responseText);
        	                }
        	            });
            return dataAdapter;
        }

        var cellclass = function (row, datafield, value, rowdata) {
            for (var i = 0; i < admObligE.editedRows.length; i++) {
                if (admObligE.editedRows[i].index == row) {
                    return "editedRow";
                }
            }
        }

        // initialize jqxGrid
        //autorowheight: true,
        var editar = !admObligE.disabled;
        $(grid).jqxGrid(
            {
                width: '100%',
                source: getAdapter(),
                theme: admObligE.config.theme,
                sortable: true,
                altrows: true,
                showfilterrow: true,
                filterable: true,
                pageable: true,
                enabletooltips: true,
                autoheight: true,
                editable: editar,
                localization: byaPage.getLocalization(),
                groupable: true,
                editmode: byaPage.editGrid,
                renderstatusbar: function (statusbar) {
                },
                columns: [
                  { text: 'Obligación', datafield: 'DES_OBLIG',  cellclassname: cellclass },
                  { text: 'Grupo', datafield: 'GRUPO', width: 80, cellclassname: cellclass },
                  { text: 'Edit', datafield: 'Edit', columntype: 'button', width: 80, cellsrenderer: function () {
                      return "Editar";
                  }, buttonclick: function (row) {
                      oper = "edit";
                      // open the popup window when the user clicks a button.
                      editrow = row;
                      // get the clicked row's data and initialize the input fields.
                      var dataRecord = $(grid).jqxGrid('getrowdata', editrow);
                      $("#txtGrupoOE").val(dataRecord.GRUPO);
                      $("#txtObligE").val(dataRecord.DES_OBLIG);
                      // show the popup window.
                      $(ventana).jqxWindow('open');
                  }
                  }
                ]
            });
    }

    return {
        disabled: null,
        id_ep: null,
        Grupo:null,
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        init: function () {
            this.editedRows = new Array();
            _createElements();
            _addEventListeners();
        }
    };
} ());
$(function () {
    admObligE.config.theme = theme;
    admObligE.id_ep = wizard.TxtID.val();
    admObligE.Grupo = wizard.GetGrupos();
    admObligE.disabled = wizard.disabled;
    admObligE.init();

});