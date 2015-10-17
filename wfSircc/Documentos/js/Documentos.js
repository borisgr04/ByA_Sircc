var objregistro = (function () {

    var urlToAbrir = "/Servicios/wsDocumentos.asmx/Get";
    var urlToGuardarNuevo = "/Servicios/wsDocumentos.asmx/Insert";
    var urlToGuardarMod = "/Servicios/wsDocumentos.asmx/Update";
    var urlToDocumentos = "/Servicios/wsDocumentos.asmx/Gets";
    var urlToDocumentosHechos = "/Servicios/wsDocumentos.asmx/GetsHechos";
    var urlToTiposPlantilla = "/Servicios/wsTiposPlantillas.asmx/Gets";
    var urlToGridConPlantillas = "/Servicios/wsPlantillas.asmx/GetsActivas";
    var urlToGridConFiltro = "/Servicios/wsDocumentos.asmx/GetsFiltro";
    var urlDatosEpProc = "/Servicios/wsDocumentos.asmx/GetDatosEpProc";
    var urlToPlantillas = "/Servicios/wsPlantillas.asmx/GetPlatillasPorProceso";
    var urlToCompletarDocumento = "/Servicios/wsDocumentos.asmx/CompletarDocumento";
    var gridConPantillas = "#jqxgridPlantillas";
    var activarValidar = true;
    var sourcePlantillas;
    var ejecutar;
    var idObj;
    var msgPpal = "#LbMsg";
    var tblSecciones;
    var camposDoc;
    var NUM_PROC;
    var lDocumentos;
    var indexSeleccionado;
    var DatosEpProc;
    var lstCampos;
    var con = false;

    var lSecciones = new Array();

    var _addHandlers = function () {
        $("#btnVolverAtras").click(function () {
            history.back();
        });
        $('#nuevoButton').click(function () {
            if (confirm("Desea crear un documento con esta plantilla?")) {
                //alert(JSON.stringify(lstPlantillasHechas.getSeleccionado()));
                NuevoDocumento(lstPlantillasHechas.getSeleccionado());
            }
        });
        $("#btnCrearDocumento").click(function () {
            var selectedrowindex = $(gridConPantillas).jqxGrid('getselectedrowindex');
            var dataRecord = $(gridConPantillas).jqxGrid('getrowdata', selectedrowindex);
            if (confirm("Desea crear un documento con la plantilla " + dataRecord.TITULO + "?")) {
                NuevoDocumento(dataRecord.ID);
            }
        });
        $("#editarButton").click(function () {
            Editar();
        });
        $("#guardarButton").click(function () {
            ejecutar();
        });
        $("#cancelarButton").click(function () {
            _cancelar();
        });
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });
        $("#btnNuevaSeccion").click(function () {
            CrearNuevaSeccion();
        });
        $("#cboSecciones").change(function () {
            VerDetallesSeccion($(this).val());
        });
        $("#txtSeccion").blur(function () {            
            lSecciones[indexSeleccionado].HTML = $("#txtSeccion").html();
            lSecciones[indexSeleccionado].CRUZADO = ReemplazarCampos(lSecciones[indexSeleccionado]);
            //byaPage.alert(indexSeleccionado + " *** " + lSecciones[indexSeleccionado].HTML);
            $(this).html(lSecciones[indexSeleccionado].CRUZADO);
        });
        $("#txtSeccion").focus(function () {
            //byaPage.alert(lSecciones[indexSeleccionado].HTML);
            //$(this).html(lSecciones[indexSeleccionado].HTML);
        });
        $("#btnEliminarSeccion").click(function () {
            EliminarSeccion();
        });
        $("#btnFiltrarDocumentos").click(function () {
            CargarPlantillasHechos();
        });
        $("#imprimirButton").click(function () {
            if ((idObj != null) && ($("#txtFEC_REV").val() != "")) {
                _guardarParaImprimir();                
            }
        });
        $("#btnCompletarDocumento").click(function () {
            Completardocumento();
        });        
        camposDoc = byaSite.getCamposHtml();
        $(".editorHtml").kendoEditor({
            tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "insertUnorderedList",
                "insertOrderedList",
                "indent",
                "outdent",



                "formatting",
                "cleanFormatting",
                "subscript",
                "superscript",
                "createTable",
                    "addColumnLeft",
                    "addColumnRight",
                    "addRowAbove",
                    "addRowBelow",
                    "deleteRow",
                    "deleteColumn",
                "viewHtml",
                "formatting",
                "cleanFormatting",
                "fontName",
                "fontSize",
                "insertHtml"
            ], insertHtml: camposDoc
            //"insertImage",
            //"insertFile",
            //
            //"foreColor",
            //"backColor"
            //"createLink",
            //"unlink",
        });

    };
    var _esValido = function () {
        var error = false;
        var errorValoresEstimados = false;
        var _ValidarEmpty = function (Tipo, Control) {
            if ($("#" + Tipo + Control).val() == "") {
                $("#dvd" + Control).addClass("has-error");
                error = true;
            }
            else {
                $("#dvd" + Control).removeClass("has-error");
            }
        };

        var _MensajeFinalValidacion = function () {
            var mensaje;
            if (error) {
                mensaje = "Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ";
                $("#LbMsg").msgBox({ titulo: "Documentos", mensaje: mensaje, tipo: false });
            } else {
                $("#LbMsg").html("");
            }
        };

        var _traerCamposValidar = function () {
            var e = new Array();
            $(".validar").each(function (index) {
                var id = "" + $(this).attr("id") + "";
                e.push(id);
            });
            return e;
        };

        if (activarValidar) {
            var campos = _traerCamposValidar();
            $.each(campos, function (index, item) {
                var id = "" + item + "";
                _ValidarEmpty(id.substr(0, 3), id.substr(3, id.length));
            });
            _MensajeFinalValidacion();
        }
        return !error;
    };
    var _crearElements = function () {
        objregistro.DesOrhabilitar(false);

        lSecciones = new Array();
        $("#txtSeccion").html("");
        //$("#nuevoButton").byaSetHabilitar(false);
        $("#imprimirButton").byaSetHabilitar(false);
        lstCampos = byaSite.getPlantillasCampos();
        String.prototype.str_replace = function (buscar, reemplazar) {
            return this.replace(new RegExp(buscar, 'g'), reemplazar);
        };
        DatosEpProc = byaPage.getSource(urlDatosEpProc, { NUM_PROC: "'" + NUM_PROC + "'" });


        var sourceTiposPlantilla = byaPage.getSource(urlToTiposPlantilla);
        $("#cboCOD_TIP").byaCombo({
            DataSource: sourceTiposPlantilla, placeHolder: 'Seleccione', Display: "NOM_TIP", Value: "COD_TIP"
        });
        CargarPlantillasHechos();
        //CargarPlantillas();
    };
    var NuevoDocumento = function (ID_PLA) {
        byaPage.console("Estoy en nuevo: " + ID_PLA);
        var jsonData = "{'ID_PLA': '" + ID_PLA + "', 'NUM_PROC':'" + NUM_PROC + "'}";
        byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            if (byaRpta.Error == false) {
                idObj = byaRpta.id;
                TraerDocumentosProceso();
                //objregistro.EditarDocumento(idObj)
                Editar();
                var valAux = lstPlantillasHechas.getSeleccionado();
                CargarPlantillasHechos();
                lstPlantillasHechas.setSeleccionado(valAux);

                Editar();
                _Abrir();
            }
            else alert(byaRpta.Mensaje);
        });
    };
    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                objregistro.config.oper = 'cancelar';
                _reset();
            }
        });
    };
    var _reset = function () {
        //$("#nuevoButton").byaSetHabilitar(true);
        $("#guardarButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#cancelarButton").byaSetHabilitar(false);
        lSecciones = new Array();
        CargarSecciones();
        objregistro.DesOrhabilitar(false);
        objregistro.Limpiar();
        $(msgPpal).html("");
    };
    var _guardarNuevo = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("datos");
            datos.ID = 0;
            datos.lSecciones = lSecciones;
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Documentos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    //$("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(true);
                    $("#guardarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                    objregistro.DesOrhabilitar(false);

                    lSecciones = new Array();
                    $("#txtSeccion").html("");
                    CargarSecciones();
                }
            });
        }
    };
    var _guardarMod = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("datos");
            datos.lSecciones = lSecciones;
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                //if (!byaRpta.Error) {
                //    //$("#nuevoButton").byaSetHabilitar(true);
                //    $("#editarButton").byaSetHabilitar(false);
                //    $("#guardarButton").byaSetHabilitar(false);
                //    $("#cancelarButton").byaSetHabilitar(false);
                //    objregistro.DesOrhabilitar(false);
                //    $("#dvdDoc").html("");
                //    $(".limpiar").val("");
                //    lSecciones = new Array();
                //    $("#txtSeccion").html("");
                //    CargarSecciones();                    
                //}
            });
            ////$("#nuevoButton").byaSetHabilitar(true);
            $("#editarButton").byaSetHabilitar(true);
            //$("#guardarButton").byaSetHabilitar(false);
            $("#cancelarButton").byaSetHabilitar(false);
        }
    };
    var _guardarParaImprimir = function () {
        if (_esValido()) {
            var datos = byaPage._getDatosCampos("datos");
            datos.lSecciones = lSecciones;
            var jsonData = "{'Reg':" + JSON.stringify(datos) + "}";
            byaPage.POST_Sync(urlToGuardarMod, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
                var url = "/Documentos/DocAshx/ashxDoc.ashx?id_doc=" + idObj;
                window.open(url);
            });
            $("#editarButton").byaSetHabilitar(true);
            $("#cancelarButton").byaSetHabilitar(false);
        }
    };
    var Nuevo = function () {
        ////$("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        objregistro.config.oper = 'Nuevo';
        objregistro.Limpiar();
        objregistro.DesOrhabilitar(true);
        ejecutar = _guardarNuevo;
    };
    var Editar = function () {
        objregistro.config.oper = 'Editar';
        objregistro.DesOrhabilitar(true);
        objregistro.disabled = false;
        ////$("#nuevoButton").byaSetHabilitar(false);
        $("#editarButton").byaSetHabilitar(false);
        $("#guardarButton").byaSetHabilitar(true);
        $("#cancelarButton").byaSetHabilitar(true);
        $("#cboYEAR_VIG").byaSetHabilitar(false);

        $(msgPpal).msgBox({ titulo: "Documentos", mensaje: "Después de modificar los datos y presione el botón Guardar...!!!", tipo: "info" });
        ejecutar = _guardarMod;
    };
    var _Abrir = function () {
        if (idObj == "") {
            $(msgPpal).msgBox({ titulo: "Documentos", mensaje: "Debe especificar el año", tipo: false });
            return false;
        }
        var parametrosJSON = { "ID": idObj };
        $.ajax({
            type: "GET",
            url: urlToAbrir,
            data: parametrosJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                $(msgPpal).msgBox({ titulo: "Documentos", mensaje: "Procesando.. espere por favor...!!!", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                var DataFields = [
                    { Titulo: 'Número', Campo: 'NRO_DOC', Tipo: 'S' },
                    { Titulo: 'Tipo', Campo: 'NOM_COD_TIP', Tipo: 'S' }
                ];
                var Titulo = e.TITULO;
                $('#dvdDoc').DetailsJSON(e, DataFields, Titulo);



                if (e == null) {
                    $(msgPpal).msgBox({ titulo: "Documentos", mensaje: "El N° Identificación no se encuentra registrado...!!!", tipo: "warning" });
                    $("#guardarButton").byaSetHabilitar(false);
                    ////$("#nuevoButton").byaSetHabilitar(true);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(false);
                }
                else {
                    $("#guardarButton").byaSetHabilitar(true);
                    ////$("#nuevoButton").byaSetHabilitar(false);
                    $("#editarButton").byaSetHabilitar(false);
                    $("#cancelarButton").byaSetHabilitar(true);
                    byaPage._setDatosCampos("datos", e);
                    lSecciones = e.lSecciones;
                    CargarSecciones();
                    $(msgPpal).msgBox({ titulo: "Documentos", mensaje: "Se cargaron los datos de la planilla <strong>" + e.NRO_DOC + "</strong>   <strong>" + e.TITULO + "</strong>", tipo: "info" });
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var CargarSecciones = function () {
        $.each(lSecciones, function (index, item) {
            item.NOM_SEC = "Sección " + (index + 1) + "";
        });
        $("#cboSecciones").byaCombo({
            DataSource: lSecciones, placeHolder: null, Display: "NOM_SEC", Value: "ID"
        });

        $("#cboSecciones").val(lSecciones[0].ID);
        VerDetallesSeccion(lSecciones[0].ID);
    };
    var VerDetallesSeccion = function (ID) {
        //alert(JSON.stringify(lSecciones));
        $.each(lSecciones, function (index, item) {
            if (item.ID == ID) {
                $("#txtSeccion").html(item.HTML);
                indexSeleccionado = index;
                $("#txtSeccion").focus();
            }
        });
    };
    var EliminarSeccion = function () {
        if (indexSeleccionado != null) {
            if (confirm("Seguro que desea eliminar esta sección?")) {
                var indexEliminar = indexSeleccionado;
                var numeroSecciones = lSecciones.length;
                //alert(indexEliminar + " - " + numeroSecciones);
                for (indexEliminar; indexEliminar < numeroSecciones; indexEliminar++) {
                    if (indexEliminar == numeroSecciones - 1) {
                        delete lSecciones[indexEliminar];
                        lSecciones.splice(indexEliminar, 1);
                    } else {
                        lSecciones[indexEliminar] = lSecciones[indexEliminar + 1];
                        lSecciones[indexEliminar].ID = indexEliminar + 1;
                    }
                }
                $("#txtSeccion").html("");
                alert("Se ha eliminado la sección");
                indexSeleccionado = null;
                CargarSecciones();
            }
        } else alert("Debe seleccionar una sección");
    };
    var CrearNuevaSeccion = function () {
        var num = lSecciones.length;

        var e = {};
        e.ID = num + 1;
        e.ID_PLA = idObj;
        e.HTML = "";
        e.ES_NUEVO = true;

        lSecciones.push(e);
        CargarSecciones();
        $("#cboSecciones").val(e.ID);
        $("#txtSeccion").html("");
        $("#txtSeccion").focus();
        indexSeleccionado = num;
    };
    var CargarPlantillas = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'ID', type: 'string' },
                    { name: 'TITULO', type: 'string' },
                    { name: 'NOM_COD_TIP', type: 'string' },
                    { name: 'FEC_REV', type: 'date' },
                    { name: 'NRO_REV', type: 'string' },
                    { name: 'EST_PLA', type: 'string' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridConPlantillas,
            data: {
            }
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        $(gridConPantillas).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: objregistro.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                        { text: 'Id', datafield: 'ID', width: 50, filtertype: 'textbox' },
                        { text: 'Titulo', datafield: 'TITULO', width: 300, filtertype: 'textbox' },
                        { text: 'Tipo', datafield: 'NOM_COD_TIP', width: 100, filtertype: 'textbox' },
                        { text: 'Fecha de revisión', datafield: 'FEC_REV', width: 200 },
                        { text: 'Nro. Revisión', datafield: 'NRO_REV', width: 100 }
                        ]
                    });


    };
    var tblDocumentosHechos;
    var TraerDocumentosProceso = function () {
        objregistro.DesOrhabilitar(false);
        lSecciones = new Array();
        $("#txtSeccion").html("");
        $(".limpiar").val("");
        $(msgPpal).html("");
        $("#dvdDoc").html("");
        ////$("#nuevoButton").byaSetHabilitar(true);
        $("#guardarButton").byaSetHabilitar(false);
        $("#imprimirButton").byaSetHabilitar(true);
        lDocumentos = byaPage.getSource(urlToDocumentosHechos, { NUM_PROC: "'" + NUM_PROC + "'", ID_PLA: "'" + lstPlantillasHechas.getSeleccionado() + "'" });
        if (lDocumentos.length > 0) {
            $("#secDocumentosHechos").fadeIn();
            var config = {
                Id: '#tblDocumentosHechos',
                Source: lDocumentos,
                fn_Editar: function (item) {
                    idObj = item.ID;
                    Editar();
                    _Abrir();
                },
                lEliminar: false,
                lEditar: true,
                Display: 'NombreCodigo',
                Value: 'UNSPSC',
                fnFormatItem: function (item, index) {
                    var Editar = '<span class="glyphicon glyphicon-edit clsstblDocumentosHechosEdit" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';

                    var colomnBound = '<td>' + item.NRO_DOC + '</td><td>' + byaPage.converJSONDate(item.FEC_REV) + "</td><td>" + item.NRO_REV + "</td>";
                    var Botones = '<td>' + Editar + ' </td>';
                    return colomnBound + Botones;
                },
                Enabled: true
            };
            tblDocumentosHechos = new byaTablaG();
            tblDocumentosHechos.init(config);
        } else {
            $("#secDocumentosHechos").fadeOut();
        }
    };
    var TraerDocumentosProcesoFiltro = function () {
        lDocumentos = byaPage.getSource(urlToGridConFiltro, { NUM_PROC: "'" + NUM_PROC + "'", FILTRO: "'" + $("#txtBusqueda").val() + "'" });
        if (lDocumentos.length > 0) {
            $("#lstDocumentos").html("");
            $.each(lDocumentos, function (index, item) {
                var color;
                if (item.ID != idObj) color = "#d9edf7";
                else color = "#9FD4EE";
                $("#lstDocumentos").append("" +
                    "<div id='dvd" + item.ID + "' style='margin:5px; background:" + color + "' class='list-group-item list-group-item-success quitarcolor'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-10'>" +
                                "<strong>" + item.TITULO + "</strong>" +
                                "<p><strong>Fecha: </strong>" + byaPage.converJSONDate(item.FEC_DOC) + "</p>" +
                            "</div>" +
                            "<div class='col-lg-2'>" +
                                "<p><span class='glyphicon glyphicon-edit' id='" + item.ID + "' onclick='objregistro.EditarDocumento(id)'  aria-hidden='true'></span></p> " +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                    "");
            });
        } else {
            $("#lstDocumentos").html("<div style='margin:5px; background:#d9edf7' class='list-group-item list-group-item-success'><h6>No se ha encontrado ningun documento</h6></div>");
        }
    };
    var ReemplazarCampos = function (Seccion) {
        var Previo = Seccion.HTML;
        $.each(lstCampos, function (index, item) {
            Previo = Previo.str_replace('{' + item.Nom_Pla + '}', DatosEpProc[item.Nom_Cam]);
        });
        return Previo;
    };
    var CargarPlantillasHechos = function () {
        sourcePlantillas = byaPage.getSource(urlToPlantillas, { NUM_PROC: "'" + NUM_PROC + "'", Filtro: "'" + $("#txtBusqueda").val() + "'" });
        var config = {
            Id: '#lstDocumentos',
            ClassItem: 'lstestsol',
            Source: sourcePlantillas,
            fn_callback: TraerDocumentosProceso,
            Display: 'TITULO',
            Value: 'ID_PLA',
            Count: 'CANTIDAD'
        };
        lstPlantillasHechas = new byaLista();
        lstPlantillasHechas.init(config);
        _siSeleccionarDocumento();
    };
    var _siSeleccionarDocumento = function () {
        if (con == false) {
            var tipo_pla = "" + $.getUrlVar("TIP_PLA") + "";
            tipo_pla = tipo_pla.split("#")[0];
            if (tipo_pla != "undefined") {
                $.each(sourcePlantillas, function (index, item) {
                    if (item.COD_TIP_PLA == tipo_pla) {
                        lstPlantillasHechas.setSeleccionado(item.ID_PLA);
                        TraerDocumentosProceso();
                        if (item.CANTIDAD == 0) NuevoDocumento(item.ID_PLA);
                        if (item.CANTIDAD == 1) TraerDocumentosProcesoParaAbrir();
                        return false;
                    }
                });
            }
            con = true;
        }
    };
    var TraerDocumentosProcesoParaAbrir = function () {
        objregistro.DesOrhabilitar(false);
        lSecciones = new Array();
        $("#txtSeccion").html("");
        $(".limpiar").val("");
        $(msgPpal).html("");
        $("#dvdDoc").html("");
        //$("#nuevoButton").byaSetHabilitar(true);
        $("#imprimirButton").byaSetHabilitar(true);
        lDocumentos = byaPage.getSource(urlToDocumentosHechos, { NUM_PROC: "'" + NUM_PROC + "'", ID_PLA: "'" + lstPlantillasHechas.getSeleccionado() + "'" });
        if (lDocumentos.length > 0) {
            $("#secDocumentosHechos").fadeIn();
            var config = {
                Id: '#tblDocumentosHechos',
                Source: lDocumentos,
                fn_Editar: function (item) {
                    idObj = item.ID;
                    Editar();
                    _Abrir();
                },
                lEliminar: false,
                lEditar: true,
                Display: 'NombreCodigo',
                Value: 'UNSPSC',
                fnFormatItem: function (item, index) {
                    var Editar = '<span class="glyphicon glyphicon-edit clsstblDocumentosHechosEdit" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';

                    var colomnBound = '<td>' + item.NRO_DOC + '</td><td>' + byaPage.converJSONDate(item.FEC_REV) + "</td><td>" + item.NRO_REV + "</td>";
                    var Botones = '<td>' + Editar + ' </td>';
                    return colomnBound + Botones;
                },
                Enabled: true
            };
            tblDocumentosHechos = new byaTablaG();
            tblDocumentosHechos.init(config);

            idObj = lDocumentos[0].ID;
            Editar();
            _Abrir();
            
        } else {
            $("#secDocumentosHechos").fadeOut();
        }
    };
    var Completardocumento = function () {
        var e = {};
        e.ID_DOC = idObj;
        var jsonData = "{'Reg':" + JSON.stringify(e) + "}";
        byaPage.POST_Sync(urlToCompletarDocumento, jsonData, function (result) {
            var byaRpta = byaPage.retObj(result.d);
            $("#LbMsg").msgBox({ titulo: "Documentos", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });
        });
    };
    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        init: function () {
            NUM_PROC = "" + $.getUrlVar("NUM_PROC") + "";
            NUM_PROC = NUM_PROC.replace("#", "");
            _addHandlers();
            _crearElements();

            //var tipo_pla = "" + $.getUrlVar("TIP_PLA") + "";
            //tipo_pla = tipo_pla.split("#")[0];
            //if (tipo_pla == "undefined") {
            //    $("#guardarButton").byaSetHabilitar(false);
            //}
            //TraerDocumentosProceso();

            //idObj = $.getUrlVar('idObj');
            ////if (idObj != null) {
            ////    _Abrir();
            ////    Editar();
            ////} else {
            ////    Nuevo();
            ////}
        },
        DesOrhabilitar: function (value) {
            $(".habilitar").byaSetHabilitar(value);
            $("#txtSeccion").attr("contenteditable", value);
        },
        Limpiar: function () {
            $("#txtSeccion").html("");
            $(".limpiar").val("");
        },
        EditarDocumento: function (id) {
            //$("#nuevoButton").byaSetHabilitar(false);
            $("#imprimirButton").byaSetHabilitar(true);
            $(".quitarcolor").css("background", "#d9edf7");
            $("#dvd" + id).css("background", "#9FD4EE");
            idObj = id;
            _Abrir();
            Editar();

            //$("#guardarButton").byaSetHabilitar(true);
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Documentos", Modulo: "Gestión", urlToPanelModulo: "gDocumentos.aspx", Cod_Mod: "ADMIN", Rol: "ADM_TERC" });
    objregistro.init();
});
