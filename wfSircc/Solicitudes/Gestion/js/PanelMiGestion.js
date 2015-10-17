var PanelMiGestion = (function () {
    "use strict";
    var tema;
    var urlToGetvDEPENDENCIAD = '/Servicios/wsDatosBasicos.asmx/GetvDEPENDENCIAD';
    var urlToSolxEstados = "/Servicios/wsProcesos.asmx/getSolxEstados";
    var urlToSolxEst_Avi_Est_Act = "/Servicios/wsProcesos.asmx/getEst_Avi_Act";

    var _addHandlers = function () {

        $("#CboDepDel").change(function () {
            dibujarGraficos();
            crearActividades();
            crearSolicitudes();
            crearProcesos();
        });
    };
    var _createElements = function () {
      
        tema = PanelMiGestion.config.theme;

        var sourceDep = byaPage.getSource(urlToGetvDEPENDENCIAD);
        $("#CboDepDel").byaCombo({ DataSource: sourceDep, Value: "COD_DEP", Display: "NOM_DEP", placeHolder: "Seleccione Dependencia" });
    };

    var crearSolicitudes = function () {
        var jsonParam = { DepDel: "'" + $("#CboDepDel").val() + "'", Vigencia: byaSite.getVigencia() };
        //Solicitudes
        var sourceSol = byaPage.getSource(urlToSolxEstados, jsonParam);
        var data = new Array();
        var SumS = 0;
        $('#divSol').html('');
        $.each(sourceSol, function (index, item) {
            $('#divSol').append(' <a href="GesMisSolicitudes.aspx?estado=' + item.COD_EST + '&depdel=' + $("#CboDepDel").val() + '""><div class="clearfix" id=""><span class="pull-left">' + item.NOM_EST + "[" + item.CANT + "]" + '</span> <span class="pull-right">' + (item.PORC * 100).toFixed(2) + '% </span> </div> <div class="progress progress-mini "> <div style="width:' + (item.PORC * 100).toFixed(2) + '% " class="' + item.COLOR + '"></div> </div> </a>')
            SumS = SumS + item.CANT;
        });
        $('#TitSol').html('');
        $('#TitSol').append('<h5><i class="icon-briefcase"></i> Consolidados de Solicitudes (' + SumS + ')</h5>');


    };
    var crearProcesos = function () {
        var urlToProcesosxEstados = "/Servicios/wsProcesos.asmx/getxEstados";
        var jsonParam = { DepDel: "'" + $("#CboDepDel").val() + "'", Vigencia: byaSite.getVigencia() };
        var source = byaPage.getSource(urlToProcesosxEstados, jsonParam);
        var SumP = 0;
        $('#divProcL').html('');
        //alert(JSON.stringify(source));

        var Colores = [
                        { COLOR: "progress-bar progress-bar-danger" },
                        { COLOR: "progress-bar progress-bar-pink" },
                        { COLOR: "progress-bar progress-bar-success" },
                        { COLOR: "progress-bar progress-bar-inverse" }
        ];
        var i = 0;
        $.each(source, function (index, item) {
            $('#divProcL').append(' <a href="GesMisProcesos.aspx?estado=' + item.COD_EST + '&depdel=' + $("#CboDepDel").val() + '""><div class="clearfix" id=""><span class="pull-left">' + item.NOM_EST + "[" + item.CANT + "]" + '</span> <span class="pull-right">' + (item.PORC * 100).toFixed(2) + '% </span> </div> <div class="progress progress-mini "> <div style="width:' + (item.PORC * 100).toFixed(2) + '% " class="' + Colores[i].COLOR + '"></div> </div> </a>')
            i++;
            if (i > 3) i = 0;
            SumP = SumP + item.CANT;
        });
        $('#TitProcL').html('');
        $('#TitProcL').append('<h5><i class="icon-briefcase"></i> Consolidados de Procesos (' + SumP + ')</h5>');
    };

    var crearActividades = function () {
        //Actividades
        var jsonParam = { DepDel: "'" + $("#CboDepDel").val() + "'", Vigencia: byaSite.getVigencia() };
        var sourceAvi_Act = byaPage.getSource(urlToSolxEst_Avi_Est_Act, jsonParam);
        var data = new Array();
        var SumAct = 0;
        $('#divAvi_Act').html('');
        $.each(sourceAvi_Act, function (index, item) {
            $('#divAvi_Act').append(' <a href=#"><div class="clearfix" id=""><span class="pull-left">' + item.NOM_EST + "[" + item.CANT + "]" + '</span> <span class="pull-right">' + (item.PORC * 100).toFixed(2) + '% </span> </div> <div class="progress progress-mini "> <div style="width:' + (item.PORC * 100).toFixed(2) + '% " class="' + item.COLOR + '"></div> </div> </a>')
            SumAct = SumAct + item.CANT;
        });
        $('#TitAct').html('');
        $('#TitAct').append('<h5><i class="icon-briefcase"></i> Avance de Actividades de los procesos (' + SumAct + ')</h5>');

    };
    return {
        editedRows: null,
        config: {
            theme: null
        },
        init: function () {
            _createElements();
            _addHandlers();
            dibujarGraficos();
            crearActividades();
            crearSolicitudes();
            crearProcesos();
        }
    };
} ());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Panel de Gestión de Solicitudes y Procesos", Modulo: "Procesos Precontractuales", urlToPanelModulo: "PanelMiGestion.aspx", Cod_Mod: "SOLI4", Rol: "PR_GEST" });
    PanelMiGestion.config.theme = byaSite.tema;
    PanelMiGestion.init();
});


function dibujarGraficos() {

    $('.easy-pie-chart.percentage').each(function () {
        var $box = $(this).closest('.infobox');
        var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
        var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
        var size = parseInt($(this).data('size')) || 50;
        $(this).easyPieChart({
            barColor: barColor,
            trackColor: trackColor,
            scaleColor: false,
            lineCap: 'butt',
            lineWidth: parseInt(size / 10),
            animate: /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase()) ? false : 1000,
            size: size
        });
    })

    $('.sparkline').each(function () {
        var $box = $(this).closest('.infobox');
        var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
        $(this).sparkline('html', { tagValuesAttribute: 'data-values', type: 'bar', barColor: barColor, chartRangeMin: $(this).data('min') || 0 });
    });

    /*Aqui se envian los Datos de la Grafica pie(Torta)  -->*/
    var placeholder = $('#piechart-placeholder').css({ 'width': '90%', 'min-height': '150px' });
    function drawPieChart(placeholder, data, position) {
        $.plot(placeholder, data, {
            series: {
                pie: {
                    show: true,
                    tilt: 0.8,
                    highlight: {
                        opacity: 0.25
                    },
                    stroke: {
                        color: '#fff',
                        width: 2
                    },
                    startAngle: 2
                }
            },
            legend: {
                show: true,
                position: position || "ne",
                labelBoxBorderColor: null,
                margin: [-30, 15]
            }
          ,
            grid: {
                hoverable: true,
                clickable: true
            }
        })
    }
    /**
    we saved the drawing function and the data to redraw with different position later when switching to RTL mode dynamically
    so that's not needed actually.
    */
    placeholder.data('chart', data);
    placeholder.data('draw', drawPieChart);

    var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
    var previousPoint = null;

    placeholder.on('plothover', function (event, pos, item) {
        if (item) {
            if (previousPoint != item.seriesIndex) {
                previousPoint = item.seriesIndex;
                var tip = item.series['label'] + " : " + item.series['percent'].toFixed(2) + '%';
                $tooltip.show().children(0).text(tip);
            }
            $tooltip.css({ top: pos.pageY + 10, left: pos.pageX + 10 });
        } else {
            $tooltip.hide();
            previousPoint = null;
        }

    });


    //Solicitar Datos.
    var urlToProcesosxEstados = "/Servicios/wsProcesos.asmx/getxEstados";
    var jsonParam = { DepDel: "'" + $("#CboDepDel").val() + "'", Vigencia: byaSite.getVigencia() };

    var source = byaPage.getSource(urlToProcesosxEstados, jsonParam);
    //nuevo array
    var data = new Array();
    //ADAPTA LOS DATOS DEL DOMINIO A LOS DATOS REQUIRIDOS POR EL GRAFICO
    var SumP = 0;
    $.each(source, function (index, item) {
        data.push({ label:  item.NOM_EST + "[" + item.CANT + "]" , data: item.CANT, color: "#" + item.COLOR });
        SumP = SumP + item.CANT;
    });
    $('#TitProc').html('');
    $('#TitProc').append('<h5><i class="icon-briefcase"></i> Consolidado Estado de Procesos (' + SumP + ')</h5>');


    //MUESTRA CONTENIDO DE OBJETO JSON
    drawPieChart(placeholder, data);

    $('#recent-box [data-rel="tooltip"]').tooltip({ placement: tooltip_placement });
    function tooltip_placement(context, source) {
        var $source = $(source);
        var $parent = $source.closest('.tab-content')
        var off1 = $parent.offset();
        var w1 = $parent.width();

        var off2 = $source.offset();
        var w2 = $source.width();

        if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) return 'right';
        return 'left';
    }


    $('.dialogs,.comments').slimScroll({
        height: '300px'
    });


    //Android's default browser somehow is confused when tapping on label which will lead to dragging the task
    //so disable dragging when clicking on label
    var agent = navigator.userAgent.toLowerCase();
    if ("ontouchstart" in document && /applewebkit/.test(agent) && /android/.test(agent))
        $('#tasks').on('touchstart', function (e) {
            var li = $(e.target).closest('#tasks li');
            if (li.length == 0) return;
            var label = li.find('label.inline').get(0);
            if (label == e.target || $.contains(label, e.target)) e.stopImmediatePropagation();
        });

    $('#tasks').sortable({
        opacity: 0.8,
        revert: true,
        forceHelperSize: true,
        placeholder: 'draggable-placeholder',
        forcePlaceholderSize: true,
        tolerance: 'pointer',
        stop: function (event, ui) {//just for Chrome!!!! so that dropdowns on items don't appear below other items after being moved
            $(ui.item).css('z-index', 'auto');
        }
    }
    );
    $('#tasks').disableSelection();
    $('#tasks input:checkbox').removeAttr('checked').on('click', function () {
        if (this.checked) $(this).closest('li').addClass('selected');
        else $(this).closest('li').removeClass('selected');
    });


}