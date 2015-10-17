var MatrizRiesgos = (function () {

    var idEstPrev;
    var urlGetEstPrev = "/Servicios/EstPrev/wsGesEstPrev.asmx/GetEstPrev";
    var lRiesgos = new Array();

    var _traerestudioPrevio = function () {
        var parametrosJSON = {
            "codigo_ep": idEstPrev,
            "tipo": '*'
        };

        $.ajax({
            type: "POST",
            url: urlGetEstPrev,
            data: byaPage.JSONtoString(parametrosJSON),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                $("#LbMsg").html("Procesando.. espere por favor...!!!");
            },
            success: function (result) {
                var ep = byaPage.retObj(result.d);
                lRiesgos = ep.l_EP_RIESGOS;
                _dibujarMatriz();
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
    };
    var _dibujarMatriz = function () {
        $("#lRiesgos").html("");
        function CrearTD(valor) {
            var td = '<td><div class="Rotate-90">';
            var ftd = '</div></td>';
            return td + valor + ftd;
            
        }
        $.each(lRiesgos, function (index, item) {
            var cadenaHtml = '<tr>' +
                '<td>' + item.N + '</td>' +
                CrearTD(item.CLASE)+
                CrearTD(item.FUENTE) +
                CrearTD(item.ETAPA) +
                CrearTD(item.TIPO) +
                '<td>' + item.DESCRIPCION + '</td>' +
                '<td>' + item.CONSECUENCIAS + '</td>' +
                CrearTD(item.PROBABILIDAD_R) +
                CrearTD(item.IMPACTO_R) +
                CrearTD(item.VALORACION_R) +
                CrearTD(item.CATEGORIA_R) +
                
                CrearTD(item.AQUIENSEASIGNA) +
                '<td>' + item.TRATAMIENTO + '</td>' +
                CrearTD(item.PROBABILIDAD_T) +
                CrearTD(item.IMPACTO_T) +
                CrearTD(item.CATEGORIA_T) +
                CrearTD(item.AFECTAEJECUCIONCTO) +
                CrearTD(item.RESPONSABLE) +
                CrearTD(item.FORMA_MONITOREO) +
                CrearTD(item.PERIOCIDAD) +
            '</tr>';
            $("#lRiesgos").append(cadenaHtml);
        });        
    };

    return {
        init: function () {
            idEstPrev = $.getUrlVar('idEstPrev');
            _traerestudioPrevio();
        }
    }
}());

$(function () {
    MatrizRiesgos.init();
});
