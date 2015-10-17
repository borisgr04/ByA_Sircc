var Acta = (function () {
    "use strict";
    var tema;
    var CodCon;
    var Ide_Inf;
    var Estado = "02";
    var msgPpal = "#LbMsg";
    var dtInfoCon = {};
    var CboInfoCon = {};
    var lstDoc = {};
    var lstSS = {};
    var Info = {};
    var byaRpta;
    var jsonData;

    //Adding event listeners
    var _addHandlers = function () {
        $('#BtnNuevo').click(function () {
            _Nuevo();
        });
    };
    //METODOS PRIVADOS
    var _imprimir = function () {
       // byaSite.AbrirPagina(urlPrintActa + IdActa);
    };
    var _cancelar = function () {
        byaMsgBox.confirm("Desea cancelar el proceso?", function (result) {
            if (result) {
                Acta.config.oper = 'cancelar';
                _reset();
            }
        });
    };


    var _iniElements = function () {
        var user = Acta.getUser();
        CodCon = Acta.getCodCon();
        Ide_Inf = Acta.getIde_Inf();
        if (CodCon != null && Ide_Inf != null) {
            
            var dtInfoCon = ContratosGestionS.GetInfo(CodCon);
            
            CboInfoCon = new byaComboBox();
            CboInfoCon.init({ Id: "#cboInfoCon", Source: dtInfoCon, Value: "ID", Display: "ID_PERIODO" });
            CboInfoCon.getID().change(function () {
                MostrarInfoSeleccionado();
            });
            //Mostrar el Informe  en el combo
            CboInfoCon.getID().val(Ide_Inf);
            //Mostrar el detalle Informe  
            MostrarInfoSeleccionado();
        }

    };

    var SeleccionarDocDA = function (data) {
        $("#modalDetDoc").modal('show');
        $("#InfoFile").html("Tipo Doc: <b> " + data.NOMBRE + "</b> Archivo: <b> " + data.ARCHIVO + "</b> [ Tamaño:" + (data.LONGITUD / 1000) + " Kb ] -  Tipo de Contenido: [" + data.TYPE + "] ");
        $('#dvdemb').html(mostrarPDF(data.ID));
    };
    var mostrarPDF = function (i) {
        var url = '/ashx/ashxDoc.ashx?id=' + i + '#toolbar=1';
        var doc = "<embed src='" + url + "' width='100%' height='400'>";
        return doc;
    };
    var MostrarInfoSeleccionado = function () {
        Info = CboInfoCon.getSeleccionado();
        var Titulo = "DATOS DEL INFORME";
        if (Info != null) {
            //alert(JSON.stringify(Info));
            refreshCboPlantilla(Info.TIP_INF);
            $('#DetInforme').DetailsJSON(Info, ContratosGestionS.GetDataFieldsInfo(), Titulo);
            ContratosGestionS.GetSS(CodCon, Ide_Inf, function (result) {

                var lst = byaPage.retObj(result.d);
                
                var config = {
                    Id: '#dvdSS',
                    Source: lst,
                    fn_callback: function (item) {
                        alert(JSON.stringify(item));
                    },
                    Display: 'NOMBRE',
                    Value: 'ID',
                    fnFormatItem: function (item) {
                        var Total = (item.VAL_SALUD + item.VAL_PENSION + item.VAL_RIESGOS + item.VAL_PARAF);
                        return '<b>' + item.PERIODO_PAGO + '</b> PlanillaN°: ' + item.PLANILLAN + ' Total: $' + byaFormatos.aplicarFormato(Total, 'N') + ' <br/>' +
                                ' Salud: $'+byaFormatos.aplicarFormato(item.VAL_SALUD,'N')+
                                ' Pensión: $'+byaFormatos.aplicarFormato(item.VAL_PENSION,'N')+
                                ' Riesgos: $'+byaFormatos.aplicarFormato(item.VAL_RIESGOS,'N')+
                                ' Parafiscales: $' + byaFormatos.aplicarFormato(item.VAL_PARAF,'N')
                        ;
                    }
                };

                lstDoc = new byaListaG();

                lstDoc.init(config);
            });
            ContratosGestionS.GetDocumentos(CodCon, Ide_Inf, function (result) {
                var lst = byaPage.retObj(result.d);

                var config = {
                    Id: '#dvdDA',
                    Source: lst,
                    fn_callback: SeleccionarDocDA,
                    Display: 'NOMBRE',
                    Value: 'ID',
                    fnFormatItem: function (item) {
                        var dato = item.NOMBRE;
                        if (item.NOMBRE.length >= 35) {
                            var dato = item.NOMBRE.substring(0, 32) + "...";
                        }
                        return '<b>' + dato + ' </b><span class="badge">Ver más</span>';
                    }
                };

                lstDoc = new byaListaG();

                lstDoc.init(config);

            });
        } else {

            $('#DetInforme').html('<div class="panel panel-default"><div class="panel-heading"><b>DATOS DEL INFORME</b></div><div class="panel-body"><div id="DetInforme"></div></div></div>');
            $('#dvdDA').html('');
            $('#dvdSS').html('');
            
        }
    };
    var refreshCboPlantilla = function (ClaActa) {
        var source = ContratosGestionS.GetPlantillasActas(ClaActa);;
        $("#CboPlantilla").byaCombo({
            DataSource: source, placeHolder: 'Seleccione Plantilla', Display: "NOM_PLA", Value: "URL_FORM"
        });
    };

    var _Nuevo = function () {
        Info = CboInfoCon.getSeleccionado();
        var urlTarget = Info.URL_TIP_INF;
        if (!IsNullOrEmpty(urlTarget)) {
            $.get(urlTarget, function (data) {
                $("#dvdGestion").html(data);
            });
        }
        else {
            alert("No hay configurado ningún formulario destino");
        }
    };
    var _AbrirCon = function () {
        var sw = false;
        if (CodCon == "") {
            $(msgPpal).msgBox({ titulo: "CONTRATOS", mensaje: "no se especificó ningun contrato", tipo: false });
            return false;
        }
        var ct = ContratosDAO.GetPk(CodCon);
        if (ct.Numero == 0) {
            $(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "CONTRATO N° " + CodCon + " no encontrada...!!!", tipo: "warning" });
        }
        else {
            var Titulo = "INFORMACION DETALLADA DEL CONTRATO";
            $('#DetContrato').DetailsJSON(ct, ContratosDAO.GetDataFields(), Titulo);
        }
        return sw;
    };

 
    var _createElements = function () {
        CodCon = Acta.getCodCon();
        tema = Acta.config.theme;
        _AbrirCon();
    };

    return {
        formulario: '#form1',
        config: {
            theme: null,
            oper: null
        },
        getCodCon: function () {
            return $.getUrlVar('cod_con');
        },
        getIde_Inf: function () {
            return $.getUrlVar('ide_inf').replace('#','');
        },
        getUser: function () {
            return byaSite.getUsuario();
        },
        getRecord: function () {
            return CboInfoCon.getSeleccionado();
        },
        init: function () {
            _createElements();
            _addHandlers();
            //_reset();
            _iniElements();
        }

    }
}());


$(document).ready(function () {
    Acta.config.theme = byaSite.tema;
    Acta.init();
});

