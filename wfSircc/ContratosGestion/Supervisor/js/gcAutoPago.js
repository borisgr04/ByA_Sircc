var GestionActas = (function () {
    "use strict";
    var ventana = '#modalGesAct';
    var Estado = "02";
    var msgPpal = "#LbMsg";
    //var urlToGetvFuncionariosP = '/Servicios/wsDatosBasicos.asmx/GetvFuncionariosP';
    //var urlToInsert = "/Servicios/wsSolicitudes.asmx/AsignarFuncionario";
    var item;
    var _addHandlers = function () {
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $('#BtnGuardar').click(function () {
            _guardarNuevo();
        });
    };
    var _mostrarVentana = function () {
        $(ventana).modal('show');
    };
    var _ocultarVentana = function () {
        $(ventana).modal('hide');
    };
    var _verDetalle = function () {
        item = Acta.getRecord();//obtiene el ultimo registro activo
        if (item != null) {
            _mostrarVentana();
            if (item != null) {
                $("#txtFecIni").val(byaPage.converJSONDate(item.FEC_INI));
                $("#txtFecFin").val(byaPage.converJSONDate(item.FEC_FIN, 'D'));
                $("#txtTipo").val(item.NOM_TIP_INF);

                $("#txtValPago").byaSetDecimal(item.VAL_PAG);
                $("#txtDES_INF").val(item.DES_INF);
                var ap = item.VAL_PAG > 0 ? "SI" : "NO";
                $("#CboAutPag").val(ap);
            }
            else {
                $("#txtFecIni").val('');
                $("#txtFecFin").val('');
                $("#txtValPago").byaSetDecimal(0);
                $("#CboAutPag").val("NO");
                $("#txtDES_INF").val('');
            }
        }
        else {
            byaMsgBox.alert("No ha seleccionado ninguna Solicitud");
        }
    };

    var _guardarNuevo = function () {
        var jsonData = "{'Reg':" + JSON.stringify(getDatos()) + "}";

        ContratosGestionS.PostActaParcial(jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Registro de Acta de Autorización de Pago", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    IdActa = byaRpta.id;
                    $("#txtIdActa").val(byaRpta.id);
                }
            });

            /*
        byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Registro de Acta de Autorización de Pago", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                IdActa = byaRpta.id;
                $("#txtIdActa").val(byaRpta.id);
                //Acta.Deshabilitar();
            }
        });
        */
    };

    var getDatos = function () {
        var e = {};
        e.COD_CON = Acta.getCodCon();
        e.EST_FIN = Estado;
        e.FEC_ACT = $("#txtFecAct").val();
        e.FEC_PINI = $("#txtFecIni").val();
        e.FEC_PFIN = $("#txtFecFin").val();
        e.OBS_EST = $("#txtObjAct").val();
        e.AUT_PAG = $("#CboAutPag").val();
        e.VAL_PAGO = $("#txtValPago").byaGetDecimal();
        alert($("#txtValPago").byaGetDecimal());
        e.IDE_INF = $("#cboInfoCon").val();
        return e;
    };

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
    GestionActas.config.theme = byaSite.tema;
    GestionActas.init();
});