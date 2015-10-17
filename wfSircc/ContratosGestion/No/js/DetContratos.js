var Contratos = (function () {
    "use strict";
    
    var urlToAbrirCon = "/Servicios/wsContratosGestionS.asmx/GetDetContratos";

    var _addHandlers = function () {
    };

    var _AbrirCon = function () {
        var sw = false;
        var CodCon = $.getUrlVar("cod_con");
        $("#txtCodCon").val(CodCon);
        if (CodCon == "") {
            $(msgPpal).msgBox({ titulo: "CONTRATOS", mensaje: "no se especificó ningun contrato", tipo: false });
            //$("#txtNumero").focus();
            return false;
        }
        var parametrosJSON = { "CodCon": CodCon };
        $.ajax({
            type: "POST",
            url: urlToAbrirCon,
            data: byaPage.JSONtoString(parametrosJSON),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                //$(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "Abriendo Contrato.... ", tipo: "info" });
            },
            success: function (result) {
                var e = byaPage.retObj(result.d);
                if (e.Numero == 0) {
                    $(msgPpal).msgBox({ titulo: "CONTRATO", mensaje: "CONTRATO N° " + CodCon + " no encontrada...!!!", tipo: "warning" });
                }
                else {
                    $("#txtObjCon").val(e.Objeto);
                    $("#txtValTot").byaSetDecimal(e.Valor_Contrato);
                    $("#TxtDepSol").val(e.DependenciaNec);
                    $("#TxtEstado").val(e.Estado);
                    if (e.Cod_Act == "00") {
                        $(msgPpal).msgBox({ titulo: "Gestión", mensaje: "El contrato no se ha Legalizado", tipo: "warning" });
                        $("#BtnNuevo").byaSetHabilitar(false);
                        $("#BtnEditar").byaSetHabilitar(false);
                        $("#CboActaSig").byaSetHabilitar(false);
                    }
                    if (e.Cod_Act == "07") {
                        $(msgPpal).msgBox({ titulo: "Gestión", mensaje: "El contrato esta Anulado", tipo: "warning" });
                        $("#BtnNuevo").byaSetHabilitar(false);
                        $("#BtnEditar").byaSetHabilitar(false);
                        $("#CboActaSig").byaSetHabilitar(false);
                    }
                    
                    CargasActas();
                    sw = true;
                    if (e.Numero != null) {
                        //$(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "No se puede editar la solicitud, esta asociada a un Estudio Previo", tipo: "info" });
                        //$("#editarButton").byaSetHabilitar(false);
                    } else {
                        $(msgPpal).msgBox({ titulo: "Abrir Solicitud", mensaje: "Presione editar para modificar la solicitud", tipo: "info" });
                        $("#editarButton").byaSetHabilitar(true);
                    }
                }
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
        return sw;
    };