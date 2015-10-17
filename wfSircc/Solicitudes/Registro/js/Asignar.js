var AsigSolicitudes = (function () {
    "use strict";
    var ventana = '#modalAsig';
    var urlToGetvFuncionariosP = '/Servicios/wsDatosBasicos.asmx/GetvFuncionariosP';
    var urlToInsert = "/Servicios/wsSolicitudes.asmx/AsignarFuncionario";
    var dataRecord;
    var _addHandlers = function () {
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $('#BtnGuardar').click(function () {
            _asignarGuardar();
        });
    };
    var _asignarGuardar = function () {
        var hr = {};
        hr.COD_SOL = $("#txtNSolAs").val();
        hr.NIT_ABOG_RECIBE = $("#cboFun").val();

        if (dataRecord.ID_ABOG_ENC == hr.NIT_ABOG_RECIBE) {
            //$("#dvdMsg").html("Selecciono el mismo funcionario que tiene actualmente.");
            byaMsgBox.alert("Selecciono el mismo funcionario que tiene actualmente.");
        }
        else {
            var jsonData = "{'hr':" + JSON.stringify(hr) + "}";
            byaPage.POST_Sync(urlToInsert, jsonData, function (result) {
                var byaRpta = byaPage.retObj(result.d);
                if (!byaRpta.Error) {
                    _ocultarVentana();
                    byaMsgBox.alert("Se Asignó la Solicitud a " + $("#cboFun option:selected").text());
                    Solicitudes.refresh();
                }
                else {
                    byaMsgBox.alert(byaRpta.Mensaje);
                }
            });
        }
    };
    var _mostrarVentana = function () {
        $(ventana).modal('show');
    };
    var _ocultarVentana = function () {
        $(ventana).modal('hide');
    };
    var _verDetalle = function () {
        dataRecord = Solicitudes.getRecord();//obtiene el ultimo registro activo
        //alert(JSON.stringify(dataRecord.ID_ABOG_ENC));
        $('#BtnGuardar').byaSetHabilitar(!(dataRecord.NOM_EST_SOL == "A" || dataRecord.NOM_EST_SOL == "R"));
        if (dataRecord != null) {
            //Solicitudes.ID_HREV = dataRecord.ID_HREV;
            $("#txtEstadoAs").val(dataRecord.NOM_EST_SOL);
            $("#txtNSolAs").val(dataRecord.COD_SOL);
            $("#txtObjConAs").val(dataRecord.OBJ_SOL);
            $("#txtObsAs").val(dataRecord.OBS_REV);
            $("#txtFecRecAs").val(dataRecord.FEC_RECIBIDO);

            var sourceMod = byaPage.getSource(urlToGetvFuncionariosP, { cod_dep:"'"+ dataRecord.DEP_PSOL+"'" });
            $("#cboFun").byaCombo({ DataSource: sourceMod, Display: "NOMBRE", Value: "IDE_TER", placeHolder: "Seleccione el Funcionario..." });

            $("#cboFun").val(dataRecord.ID_ABOG_ENC);
            _mostrarVentana();
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }
    }
    return {
        editedRows: null,
        config: {
            theme: null
        },
        init: function () {
            
            _addHandlers();
            _verDetalle();
        }
    };
}());
$(function () {
    AsigSolicitudes.config.theme = byaSite.tema;
    AsigSolicitudes.init();
});