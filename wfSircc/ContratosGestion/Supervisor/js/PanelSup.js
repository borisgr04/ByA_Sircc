var Contratos = (function () {
    "use strict";
    var tema;

    var urlToInfContratos = "GesDetContratos.aspx";

    var _addHandlers = function () {

    };


    var _createElements = function () {
        ContratosGestionS.Gets(function (result) {
            var lstC = byaPage.retObj(result.d);
            $("#dvdCtos").html("");
            $.each(lstC, function (i, item) {
                // <p>'+ item.Objeto +'</p>
                //var cto = '<a href="#" class="list-group-item"><b>' + item.Numero + ' </b> - ' + item.Contratista + ' <span class="badge">' + item.Estado + '</span> <span class="list-group-item-text">' + item.DependenciaNec + ' Valor Contrato: $' + byaSite.formatNumerico(item.Valor_Contrato) + ' </span></a>';
                var cto = '<a href="/ContratosGestion/Supervisor/GesDetContratos.aspx?cod_con=' + item.Numero + '" class="list-group-item"><b>' + item.Numero + ' <span class="badge">' + item.Estado + '</span>   </b> <br>' + item.Contratista + '</a>';
                $("#dvdCtos").append(cto);
            });
        });

        
        ContratosGestionS.GetActas(function (result) {
            var lstC = byaPage.retObj(result.d);
            //alert(JSON.stringify(lstC));
            $("#dvdActPR").html("");
            $("#dvdActCT").html("");
            $("#dvdActTS").html("");
            $("#dvdActAR").html("");
            $.each(lstC, function (i, item) {
                var cto;
                if (item.INT_CONTROL_DOC1 != null) {
                    cto = '<a href="#" class="list-group-item"><b> <p class="list-group-item-text">' + item.COD_CON + '</b>  -  ESTADO : ' + item.INT_CONTROL_DOC1.EST_DOC + ' ' + item.INT_CONTROL_DOC1.ETA_DOC + ' N° ' + item.ID + ' <br/> Fecha ' + moment(item.FEC_ACT).format("DD-MM-YYYY") + '  Valor : ' + item.VAL_PAGO + ' </p></a>';
                    //alert(item.INT_CONTROL_DOC1.ETA_DOC);
                    if (item.INT_CONTROL_DOC1.ETA_DOC == "CT") $("#dvdActCT").append(cto);
                    if (item.INT_CONTROL_DOC1.ETA_DOC == "TS") $("#dvdActTS").append(cto);
                    if (item.INT_CONTROL_DOC1.ETA_DOC == "AR") $("#dvdActAR").append(cto);
                } else {
                    cto = '<a href="#" class="list-group-item"><b> <p class="list-group-item-text">' + item.COD_CON + '</b>  -  ' + item.NOM_ACTA + ' N° ' + item.ID + ' <br/> Fecha ' + moment(item.FEC_ACT).format("DD-MM-YYYY") + '  Valor : ' + item.VAL_PAGO + ' </p></a>';
                    $("#dvdActPR").append(cto);
                }

            });
        });
       
        ContratosGestionS.GetInfoVig(function (result) {

            var lstC = byaPage.retObj(result.d);

//          alert("AA:"+JSON.stringify(lstC));

//            $("#dvdActBO").html("");
            $("#dvdActAC").html("");
            $("#dvdActRV").html("");
            $("#dvdActRC").html("");
            $.each(lstC, function (i, item) {
                //alert(JSON.stringify(item));
                //<span class="badge">just now</span><i class="glyphicon glyphicon-remove"></i>
                var cto = '<a href="/ContratosGestion/Supervisor/DetInformeA.aspx?cod_con=' + item.COD_CON + '&ide_inf=' + item.ID + '"  class="list-group-item"><b>' + item.COD_CON + ' <p class="list-group-item-text">' + item.ID_PERIODO + '</b> <br/> Valor : ' + item.VAL_PAG + ' </p></a>';
   //             if (item.EST_INF == "BO") $("#dvdActBO").append(cto);
                if (item.EST_INF == "AC") $("#dvdActAC").append(cto);
                if (item.EST_INF == "RV") $("#dvdActRV").append(cto);
                if (item.EST_INF == "RC") $("#dvdActRC").append(cto);
            });

        });
       



    };
    //crea GridTipos


    return {
        editedRows: null,
        config: {
            theme: null
        },
        Vigencia: function () {
            return byaSite.getVigencia();
        },
        init: function () {
            _createElements();
            _addHandlers();
            //_createGridCon();
        }
    };
}());

$(function () {

    byaSite.SetModuloP({ TituloForm: "Panel de Gestión de Contratistas", Modulo: "Gestión de Contratista", urlToPanelModulo: "", Cod_Mod: "", Rol: "" });

    Contratos.config.theme = byaSite.tema;
    Contratos.init();
});