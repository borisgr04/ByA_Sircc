var detSolicitudes = (function () {
    "use strict";
    var ventana = '#modalDetalle';
    var _addHandlers = function () {
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
    }
    var _mostrarVentana = function () {
        $(ventana).modal('show');
    };
    var _ocultarVentana = function () {
        $(ventana).modal('hide');
    };
    var _verDetalle = function () {
        var dataRecord = Solicitudes.getRecord();
        if (dataRecord != null) {
            
            var DataFields = [
                    { Titulo: 'Número', Campo: 'COD_SOL', Tipo: 'S' },
                    { Titulo: 'Objeto', Campo: 'OBJ_SOL', Tipo: 'S' },
                    { Titulo: 'Dep. Necesidad', Campo: 'DEP_SOL_NOM', Tipo: 'S' },
                    { Titulo: 'Dep. Delegada', Campo: 'DEP_PSOL_NOM', Tipo: 'S' },
                    { Titulo: 'Modalidad', Campo: 'COD_TPRO_NOM', Tipo: 'S' },
                    { Titulo: 'Clase', Campo: 'CLASE', Tipo: 'S' },
                    { Titulo: 'Valor a Contratar', Campo: 'VAL_CON', Tipo: 'N' },
                    { Titulo: 'Estado', Campo: 'NOM_EST_SOL', Tipo: 'S' },
                    { Titulo: 'Fecha Recibido', Campo: 'FEC_RECIBIDO', Tipo: 'D' },
                    { Titulo: 'Encargado', Campo: 'NOM_ABOG_ENC', Tipo: 'S' },
                    { Titulo: 'Contratista(F)', Campo: 'NOM_CONTRATISTA', Tipo: 'S' }
            ];
            var Titulo= "DATOS DE LA SOLICITUD";
            $('#DetSolicitud').DetailsJSON(dataRecord, DataFields, Titulo)

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
    detSolicitudes.config.theme = byaSite.tema;
    detSolicitudes.init();
});