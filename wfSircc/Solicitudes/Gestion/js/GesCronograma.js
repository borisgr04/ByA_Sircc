var gridCrono = (function () {
    //http/bootstrappaginator.org/
    var urlToCrono = "/Servicios/wsProcesos.asmx/GetCronogramaJ";
    var source;
    //cuando se haga clic en cualquier clase .clsEliminarFila se dispara el evento
    $(document).on('click', '.edit', function () {
        event.preventDefault();
        //var objFila = $(this).parents().get(1);
        alert(source[$(this).val()].NOM_ACT);
        /*eliminamos el tr que contiene los datos del contacto (se elimina todo el
        contenido (en este caso los td, los text y logicamente, el boton */
        
    });
    $(document).on('click', '.remove', function () {
        event.preventDefault();
        //$(this) este seria el botón
        //var objFila = $(this).parents().get(1);
        
        alert(source[$(this).val()].NOM_ACT);
        //alert(source[objFila.rowIndex].NOM_ACT);
    });
    var _crearTabla = function () {
        source = byaPage.getSource(urlToCrono, { Num_Pro: "'" + gridCrono.get + "'" });
        var fila;
        $("#tbCrono-table > tbody:last").children().remove();
        $.each(source, function (index, item) {
            var valor = index ;
            fila = "<tr>";
            fila += "<td>" + item.NOM_ACT + "</td>";
            fila += "<td>" + item.FECHAC + "</td>";
            fila += "<td>" + item.NOM_EST + "</td>";
            fila += "<td>";
            fila += "<button type='button' value='" + valor + "' class='btn btn-primary edit btn-xs'>";
            fila += "<span class='glyphicon glyphicon-pencil'></span>"
            fila += "</button> ";
            fila += "<button type='button' value='" + valor + "' id='Button3' class='btn btn-primary remove btn-xs'>";
            fila += "<span class='glyphicon glyphicon-remove'></span>"
            fila += "</button>";
            fila += "</td>";
            fila += "</tr>";
            $('#tbCrono-table > tbody:last').append(fila);
        });
        
    };
    var setup_searchable= function (selector) {
        var search_input = $("#" + selector + "-searcher");

        search_input.keyup((function () {
            var tbody = $("#" + selector + "-table").find('tbody');
            var hidden_rows = tbody.find('tr');

            var searcher = function () {
                var search_text = search_input.val().toUpperCase();

                tbody.html('');

                var shown_rows = hidden_rows.filter(function () {
                    var re = new RegExp(search_text),
                         matched = false;

                    $(this).find('td').each(function (i2) {
                        matched = matched || ($(this).text().toUpperCase().match(re) != null);
                    });

                    return matched;
                });

                tbody.append(shown_rows);
            };

            return searcher;
        })());
    };

    return {
        init: function () {
            _crearTabla();
            setup_searchable("tbCrono");
            
            $("#tbCrono-table").tablesorter()
            .tablesorterPager({

                // target the pager markup - see the HTML block below
                container: $(".ts-pager"),

                // target the pager page select dropdown - choose a page
                cssGoto: ".pagenum",

                // remove rows from the table to speed up the sort of large tables.
                // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
                removeRows: false,

                // output string - default is '{page}/{totalPages}';
                // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
                output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'
                });
            //_addHandlers();
            //_createElements();
        }
    };
}());

var gridCrono2 = (function () {
    //http/bootstrappaginator.org/
    var idTabla = "tbCrono2-table";
    var urlToCrono = "/Servicios/wsProcesos.asmx/GetCronogramaJ";
    var source;
    //cuando se haga clic en cualquier clase .clsEliminarFila se dispara el evento
    $(document).on('click', '.edit', function () {
        event.preventDefault();
        //var objFila = $(this).parents().get(1);
        alert(source[$(this).val()].NOM_ACT);
        /*eliminamos el tr que contiene los datos del contacto (se elimina todo el
        contenido (en este caso los td, los text y logicamente, el boton */

    });
    $(document).on('click', '.remove', function () {
        event.preventDefault();
        //$(this) este seria el botón
        //var objFila = $(this).parents().get(1);

        alert(source[$(this).val()].NOM_ACT);
        //alert(source[objFila.rowIndex].NOM_ACT);
    });
    var _crearTabla = function () {
        source = byaPage.getSource(urlToCrono, { Num_Pro: "'" + GesCronograma.getNumPro() + "'" });
        var fila;
        var tabla_body = "#" + idTabla + " > tbody:last";
        $(tabla_body).children().remove();
        $.each(source, function (index, item) {
            var valor = index;
            fila = "<tr>";
            fila += "<td>" + item.NOM_ACT + "</td>";
            fila += "<td><input type='date' id='fechai' class='form-control input-sm' /></td>";
            fila += '<td><select name=cboHoraI2" class="form-control input-sm hora"></select></td>';
            fila += '<td><input type="number" min="0" max="59" id="Number4" class="form-control input-sm" /></td>';
            fila += "<td><input type='date' id='fechai' class='form-control input-sm' /></td>";
            fila += '<td><select name=cboHoraI2" class="form-control input-sm hora"></select></td>';
            fila += '<td><input type="number" min="0" max="59" id="Number4" class="form-control input-sm" /></td>';
            
            fila += '<td>';

            fila += '<button type="button" value="Nuevo" id="Button8" class="btn btn-primary btn-xs">';
            fila += '<span class="glyphicon glyphicon-remove"></span>';
            fila += '</button>';

            fila += '<button type="button" value="' + valor + '" id="Button6" class="btn btn-primary btn-xs"> ';
            fila += '<span class="glyphicon glyphicon-floppy-disk"></span>';
            fila += '</button>';
            
            fila += "</tr>";
            $(tabla_body).append(fila);
        });

    };
    var setup_searchable = function (selector) {
        var search_input = $("#" + selector + "-searcher");

        search_input.keyup((function () {
            var tbody = $(idTabla).find('tbody');
            var hidden_rows = tbody.find('tr');

            var searcher = function () {
                var search_text = search_input.val().toUpperCase();

                tbody.html('');

                var shown_rows = hidden_rows.filter(function () {
                    var re = new RegExp(search_text),
                         matched = false;

                    $(this).find('td').each(function (i2) {
                        matched = matched || ($(this).text().toUpperCase().match(re) != null);
                    });

                    return matched;
                });

                tbody.append(shown_rows);
            };

            return searcher;
        })());
    };

    return {
        init: function () {
            _crearTabla();
            setup_searchable(idTabla);

            $(idTabla).tablesorter()
            .tablesorterPager({

                // target the pager markup - see the HTML block below
                container: $(".ts-pager"),

                // target the pager page select dropdown - choose a page
                cssGoto: ".pagenum",

                // remove rows from the table to speed up the sort of large tables.
                // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
                removeRows: false,

                // output string - default is '{page}/{totalPages}';
                // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
                output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'
            });
            //_addHandlers();
            //_createElements();
        }
    };
}());


var GesCronograma = (function () {
    var ventana = '#wEspTec';
    var msgPopup = "#wHEspTec";
    var msgPpal = "#msgEPEditar";
    var grid = "#jqxgrid";

    var urlToInsert = "wfRgEstPrev.aspx/GuardarEP";
    var urlToGrid = "/Servicios/wsProcesos.asmx/GetCronograma";
    var urlToActC = "/Servicios/wsProcesos.asmx/GetActividadesT";
    var urlToActNC = "/Servicios/wsProcesos.asmx/GetActividadesC";
    var urlToActT = "/Servicios/wsProcesos.asmx/GetActividadesNC";
    
    var urlToUpdate = "wfRgEstPrev.aspx/GuardarModEPList";
    var urlToDelete = "wfRgEstPrev.aspx/deleteEP";
    
    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            _mostrarCrono();
        });
        $('#BtnSeg').click(function () {
            var data = GesCronograma.getRecord();
            _mostrarSeg();
        });
        
    };
    //Adding event listeners
    function _addEventListeners() {

        var GuardarNuevo = function () {
            var row = {};
            row["DESC_ITEM"] = $('#txtDesc').val();
            row["CANT_ITEM"] = $('#txtCan').val();
            row["UNI_ITEM"] = $('#txtUni').val();
            row["VAL_UNI_ITEM"] = $('#txtValUni').val();
            row["PORC_IVA"] = $('#txtIVA').val();
            row["VAL_PAR"] = $('#txtValPar').val();
            row["GRUPO"] = $('#txtGrupo').val();


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
        $("#BtnEPGuardar").click(function () {
            GuardarNuevo();

        });

        $("#BtnEPCancelar").click(function () {

            $(ventana).jqxWindow('close');
        });


    };
    var _mostrarCrono = function () {
        $('#modalCrono').modal('show');
    };
    var _mostrarSeg = function () {
        $('#modalSeg').modal('show');
    };
    
   
    //Creating all page elements which are jqxWidgets
    function _createElements() {
   
        var tema = GesCronograma.config.theme;
       _createGrid();
       
       
       var sourceAct = byaPage.getSource(urlToActT, { Num_Pro: "'" + GesCronograma.getNumPro() + "'" });
       $("#CboCodAct").byaCombo({ DataSource: sourceAct, Value: "COD_ACT", Display: "NOM_ACT" });

       var SourceHora = [
                    { "cod_hor": "08", "des_hor": "08 a.m." },
                    { "cod_hor": "09", "des_hor": "09 a.m." },
                    { "cod_hor": "10", "des_hor": "10 a.m." },
                    { "cod_hor": "11", "des_hor": "11 a.m." },
                    { "cod_hor": "12", "des_hor": "12 a.m." },
                    { "cod_hor": "13", "des_hor": "01 p.m." },
                    { "cod_hor": "14", "des_hor": "02 p.m." },
                    { "cod_hor": "15", "des_hor": "03 p.m." },
                    { "cod_hor": "16", "des_hor": "04 p.m." },
                    { "cod_hor": "17", "des_hor": "05 p.m." },
                    { "cod_hor": "18", "des_hor": "06 p.m." },


                    
       ];

       $(".hora").each(function (index) {
           $(this).byaCombo({ DataSource: SourceHora, Value: "cod_hor", Display: "des_hor" });
       });
       
       

    };

    var actualizarGrid = function () {

        jsonData = "{'Reg':" + JSON.stringify(GesCronograma.editedRows) + "}";

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

        GesCronograma.editedRows.splice(0, GesCronograma.editedRows.length);
        //alert(editedRows.length);
        $(grid).jqxGrid("updatebounddata");
        //Confirmar si no hay errror
        return !byaRpta.Error;

    };

    //crea Grid
    function _createGrid() {

        var getAdapter = function () {
            Num_Pro = GesCronograma.getNumPro();
            var source = {
                datatype: "xml",
                datafields: [
                    { name: 'ID', type: 'number' },
                    { name: 'NUM_PROC', type: 'string' },
                    { name: 'NOM_ACT', type: 'string' },
                    { name: 'COD_ACT', type: 'string' },
                    { name: 'FECHAI', type: 'date' },
                    { name: 'HORAI', type: 'string' },
                    { name: 'FECHAF', type: 'date' },
                    { name: 'FECHAC', type: 'string' },
                    { name: 'HORAF', type: 'string' },
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
                    { name: 'IS_FINAL', type: 'string' }
                ],
                addrow: function (rowid, rowdata, position, commit) {
                    var byaRpta = {};
                    //id = TxtID.value == "" ? 0 : TxtID.value;
                    id = GesCronograma.id_ep;
                    rowdata["ID_EP"] = id;
                    //alert(JSON.stringify(rowdata));
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
                    var rowindex = $(grid).jqxGrid('getrowboundindexbyid', rowid);
                    for (var i = 0; i < GesCronograma.editedRows.length; i++) {
                        if (GesCronograma.editedRows[i].index == rowid) {
                            GesCronograma.editedRows[i].splice(i, 1);
                        }
                    }
                    var iva = 1 + newdata["PORC_IVA"] / 100;
                    newdata["VAL_PAR"] = newdata["CANT_ITEM"] * newdata["VAL_UNI_ITEM"] * iva;
                    GesCronograma.editedRows.push({ index: rowindex, data: newdata });
                    commit(true);
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
            for (var i = 0; i < GesCronograma.editedRows.length; i++) {
                if (GesCronograma.editedRows[i].index == row) {
                    return "editedRow";
                }
            }
        }


        // initialize jqxGrid

        //autorowheight: true,
        //autorowheight: true,        //autoheight: true,
        $(grid).jqxGrid(
            {
                width: '100%',
                source: getAdapter(),
                theme: GesCronograma.config.theme,
                sortable: true,
                altrows: true,
                                enabletooltips: true,
                localization: byaPage.getLocalization(),
                editmode: byaPage.editGrid,
                columnsresize: true,
                columns: [
                  { text: 'Actividad', datafield: 'NOM_ACT', width: 400, cellclassname: cellclass },
                  { text: 'Estado', datafield: 'NOM_EST', width: 100, cellclassname: cellclass },
                  { text: 'Fecha', datafield: 'FECHAC', width: 200, cellclassname: cellclass },
                  { text: 'Seguimiento', datafield: 'OBS_SEG', width: 100, cellclassname: cellclass }
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
        getNumPro: function () {
            return $.getUrlVar("num_pro");
        },
        agregar: function (Cod, Nom) {
            var datarow = {};
            datarow["COD_PRO"] = Cod;
            datarow["NOMBRE_PROYECTO"] = Nom;
            var commit = $("#jqxgridProy").jqxGrid('addrow', null, datarow);
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
            //Attaching event listeners
            _addEventListeners
            editar = true;
        }
    };
}());

$(function () {
//    GesCronograma.config.theme = byaSite.tema;
//    GesCronograma.init();

    
});



    
