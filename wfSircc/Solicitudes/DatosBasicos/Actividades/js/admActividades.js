var admActividades = (function () {
    var urlToGuardarNuevo = "/Servicios/ProcesosDB/wsActividades.asmx/Insert";
    var urlToGuardarUpdate = "/Servicios/ProcesosDB/wsActividades.asmx/Update";
    var _Procesos = function () {
        $("#guardarButton").click(function (event) {

            if (  admActividades.config.oper == null) {
                _guardarNuevo();
            } else {
                _guardarUpdate();
            }
        });
        $("#editarButton").click(function (event) {
            alert("Sin Programar..");
        });
        $("#cancelarButton").click(function (event) {
            _limpiar();
            _LlenarCbo();
            _btnCancelar();
        });
        $("#nuevoButton").click(function (event) {
            _limpiar();
            _LlenarCbo();
            _btnNuevo();
        });
        $("#txtCod").byaFormatInput('0123456789');
        $("#txtOrd").byaFormatInput('0123456789');
    }; 

   
    var _LlenarCbo = function () {
        var sourceMod = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvModalidad');
        $("#CboModal").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione La Modalidad:', Display: "NOM_TPROC", Value: "COD_TPROC"
        });
        var sourceMod = byaPage.getSource('/Servicios/wsDatosBasicos.asmx/GetvVigencias');
        $("#CboVig").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione La Vigencia:', Display: "YEAR_VIG", Value: "YEAR_VIG"
        });
        var sourceMod = byaPage.getSource('/Servicios/ProcesosDB/wsEstados.asmx/_GetEstados');
        $("#CboEst").byaCombo({
            DataSource: sourceMod, placeHolder: 'Seleccione El Estado:', Display: "NOM_EST", Value: "COD_EST"
        });
    };
    var _getDatos = function () {
        var e = {};
        e.COD_ACT = $("#txtCod").val();
        e.NOM_ACT = $("#txtNom").val();
        e.COD_TPRO = $("#CboModal").val();
        e.VIGENCIA = $("#CboVig").val();
        e.ORDEN = $("#txtOrd").val();
        e.OCUPADO = $("#CboOcu").val();
        e.EST_PROC = $("#CboEst").val();
        e.ESTADO = $("#CboEsta").val();
        e.OBLIGATORIO = $("#CboObl").val();
        e.DIA_NOHABIL = $("#CboDia").val();
        e.NOTIFICAR = $("#CboNot").val();
        e.MFECINI = $("#CboIni").val();
        e.MHORINI = $("#CboHini").val();
        e.MFECFIN = $("#CboFinal").val();
        e.MHORFIN = $("#CboHfinal").val();
        e.UBICACION = $("#txtUbicacion").val();
        return e;
    };
    var _guardarUpdate = function () {
        jsonData = "{'Reg':" + JSON.stringify(_getDatos()) + "}";
        byaPage.POST_Sync(urlToGuardarUpdate, jsonData, function (result) {
           
            byaRpta = byaPage.retObj(result.d);
            if (byaRpta.Filas != 0)
            {
                $("#nuevoButton").byaSetHabilitar(true);
                $("#guardarButton").byaSetHabilitar(false);

               
            }
            $(msgPpal).msgBox({ titulo: "Registro de Actualizacion de Actividad", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
            if (!byaRpta.Error) {
                _getDataRecord(byaRpta.id);
                alert(JSON.stringify(dataRecord));

            }
        });
    };
    var _guardarNuevo = function () {
                  
            jsonData = "{'Reg':" + JSON.stringify(_getDatos()) + "}";
            byaPage.POST_Sync(urlToGuardarNuevo, jsonData, function (result) {
                byaRpta = byaPage.retObj(result.d);
                $(msgPpal).msgBox({ titulo: "Registro de Nueva Actividad", mensaje: byaRpta.Mensaje + " N°: <b>" + byaRpta.id + "</b>", tipo: !byaRpta.Error });
                if (!byaRpta.Error) {
                    
                    _getDataRecord(byaRpta.id);
                    alert(JSON.stringify(dataRecord));

                }
            });
        
    };    
    var _btnCancelar = function () {
        $("#txtCod").byaSetHabilitar(false);
        $("#txtNom").byaSetHabilitar(false);
        $("#CboModal").byaSetHabilitar(false);
        $("#CboVig").byaSetHabilitar(false);
        $("#txtOrd").byaSetHabilitar(false);
        $("#CboOcu").byaSetHabilitar(false);
        $("#CboEst").byaSetHabilitar(false);
        $("#CboEsta").byaSetHabilitar(false);
        $("#CboObl").byaSetHabilitar(false);
        $("#CboDia").byaSetHabilitar(false);
        $("#CboNot").byaSetHabilitar(false);
        $("#CboIni").byaSetHabilitar(false);
        $("#CboHini").byaSetHabilitar(false);
        $("#CboFinal").byaSetHabilitar(false);
        $("#CboHfinal").byaSetHabilitar(false);
        $("#txtUbicacion").byaSetHabilitar(false);
    };
    var _btnNuevo = function () {
        admActividades.config.oper = null;
        $("#txtCod").byaSetHabilitar(true);
        $("#txtNom").byaSetHabilitar(true);
        $("#CboModal").byaSetHabilitar(true);
        $("#CboVig").byaSetHabilitar(true);
        $("#txtOrd").byaSetHabilitar(true);
        $("#CboOcu").byaSetHabilitar(true);
        $("#CboEst").byaSetHabilitar(true);
        $("#CboEsta").byaSetHabilitar(true);
        $("#CboObl").byaSetHabilitar(true);
        $("#CboDia").byaSetHabilitar(true);
        $("#CboNot").byaSetHabilitar(true);
        $("#CboIni").byaSetHabilitar(true);
        $("#CboHini").byaSetHabilitar(true);
        $("#CboFinal").byaSetHabilitar(true);
        $("#CboHfinal").byaSetHabilitar(true);
        $("#txtUbicacion").byaSetHabilitar(true);
        $("#guardarButton").byaSetHabilitar(true);
    };
    var _limpiar = function () {
      
        $("#txtCod").val(" ");
        $("#txtNom").val(" ");        
        $("#txtOrd").val(" ");
        $("#CboOcu").enabled = false;       
        $("#txtUbicacion").val(" ");
    };
    var _iniElements = function () {
        //Lee parametro de URL
        var COD_ACT = $.getUrlVar('COD_ACT');
        var COD_TPRO = $.getUrlVar('COD_TPRO');
        var VIGENCIA = $.getUrlVar('VIGENCIA');
        //codSol = codSol.replace("#", "");  
        if ((COD_ACT != undefined) && (COD_TPRO != undefined) && (VIGENCIA != undefined)) {
            $("#txtCod").val(COD_ACT);
            $("#CboModal").val(COD_TPRO);
            $("#CboVig").val(VIGENCIA);
            $("#txtCod").byaSetHabilitar(false);
            $("#CboModal").byaSetHabilitar(false);
            $("#CboVig").byaSetHabilitar(false);
            $("#nuevoButton").byaSetHabilitar(false);          
            $("#editarButton").byaSetHabilitar(false);
            admActividades.config.oper = 'editar';
        }
        
    };
    return {
        init: function () {
            _LlenarCbo();
            _Procesos();
            _iniElements();
        },
        config: {
            oper: null
        }
     
    }
}());
////modulo tercero


$(document).ready(function () {    
    admActividades.init();
});