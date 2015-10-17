<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="PanelConsT.aspx.cs" Inherits="wfSircc.Solicitudes.ConsultasT.PanelConsT" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <ul class="nav nav-tabs">
        <li class="active"><a href="PanelConsT.aspx">Panel de Consolidados</a></li>
        <li><a href="GesSolicitudesT.aspx">Consultas Solicitudes</a></li>
        <li><a href="RptSolicitudesT.aspx">Reporte de Solicitudes</a></li>
        <li><a href="GesProcesosT.aspx">Consultas  de Procesos</a></li>
        <li><a href="RptProcesosT.aspx">Reporte de Procesos</a></li>
        <li><a href="RptActividades.aspx">Reporte de Actividades</a></li>
        <li><a href="GetActividadesT.aspx">Actividades</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <h4>Consulta de Consolidados </h4>

            <div class="row">
                <div class="space-6"></div>
                <div class="col-sm-5">
                    <div class="widget-box">
                        <div id="TituloSol" class="widget-header widget-header-flat widget-header-small">
                        </div>
                        <div class="widget-body">
                            <div class="widget-main" id="divSol">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vspace-sm"></div>

                <div class="col-sm-5">
                    <div class="widget-box">
                        <div id="TitProcesos" class="widget-header widget-header-flat widget-header-small">
                            <div class="widget-toolbar no-border">
                               
                            </div>
                        </div>

                        <div class="widget-body">
                            <div class="widget-main">
                                <div id="piechart-placeholder" style="width: 90%; min-height: 150px; padding: 0px; position: relative;">
                                    <canvas class="flot-base" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 384px; height: 150px;" width="384" height="150"></canvas>
                                    <canvas class="flot-overlay" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 384px; height: 150px;" width="384" height="150"></canvas>
                                    <div class="legend">
                                        <div style="position: absolute; width: 95px; height: 110px; top: 15px; right: -30px; background-color: rgb(255, 255, 255); opacity: 0.85;"></div>
                                    </div>
                                </div>



                            </div>
                            <!-- /widget-main -->
                        </div>
                        <!-- /widget-body -->
                    </div>
                    <!-- /widget-box -->
                </div>
                <!-- /span -->
            </div>
            <div class="row">

                <div class="col-sm-5">
                    <div class="widget-box">
                        <div id='TituloAct' class="widget-header widget-header-flat widget-header-small">
                            <%--<h5>
                                <i class="icon-briefcase"></i>
                                Avance de Actividades de los procesos
                            </h5>--%>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main" id="divAvi_Act">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vspace-sm"></div>
            </div>

        </div>
    </div>

    <script src="/Content/Bootstrap_Personalize/js/jquery.flot.min.js"></script>
    <script src="/Content/Bootstrap_Personalize/js/jquery.flot.pie.min.js"></script>
    <script src="/Content/Bootstrap_Personalize/js/jquery.flot.resize.min.js"></script>
    <script src="/Content/Bootstrap_Personalize/js/jquery.slimscroll.min.js"></script>

    <script type="text/javascript">
        jQuery(function ($) {

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
            var urlToProcesosxEstados = "/Servicios/ProcConsultas/wsProcesosT.asmx/getxEstados";
            var urlToSolxEstados = "/Servicios/ProcConsultas/wsProcesosT.asmx/getSolxEstados";
            var urlToSolxEst_Avi_Est_Act = "/Servicios/ProcConsultas/wsProcesosT.asmx/getEst_Avi_Act";


            var jsonParam = { DepDel: "'06'", Vigencia: byaSite.getVigencia() };
            //ejecutar consulta a C#, por medio del servicio web (url) y con los parametron especificos.
            var source = byaPage.getSource(urlToProcesosxEstados, jsonParam);



            //nuevo array
            var data = new Array();
            var SumPro = 0;
            //ADAPTA LOS DATOS DEL DOMINIO A LOS DATOS REQUIRIDOS POR EL GRAFICO
            $.each(source, function (index, item) {
                data.push({ label: item.NOM_EST + "[" + item.CANT + "]", data: item.CANT, color: "#" + item.COLOR });
                SumPro = SumPro + item.CANT;
            });

            $('#TitProcesos').append('<h5><i class="icon-briefcase"></i> Consolidado Estado de Procesos (' + SumPro + ')</h5>');


            var SumaSol = 0;
            byaPage.getASync(urlToSolxEstados, jsonParam, function (result) {
                $.each(result.d, function (index, item) {
                    $('#divSol').append(' <a href="GesSolicitudesT.aspx?estado=' + item.COD_EST + '" target="_blank"><div class="clearfix" id=""><span class="pull-left">' + item.NOM_EST + "[" + item.CANT + "]" + '</span> <span class="pull-right">' + (item.PORC * 100).toFixed(2) + '% </span> </div> <div class="progress progress-mini "> <div style="width:' + (item.PORC * 100).toFixed(2) + '% " class="' + item.COLOR + '"></div> </div> </a>')
                    //alert(JSON.stringify(item.CANT));
                    SumaSol = SumaSol + item.CANT;
                });
                $('#TituloSol').append('<h5><i class="icon-briefcase"></i> Consolidados de Solicitudes (' + SumaSol + ')</h5>');

            }
            );

            var sourceAvi_Act = byaPage.getSource(urlToSolxEst_Avi_Est_Act, jsonParam);
            var SumAct = 0;
            $.each(sourceAvi_Act, function (index, item) {
                $('#divAvi_Act').append(' <a href=#"><div class="clearfix" id=""><span class="pull-left">' + item.NOM_EST + "[" + item.CANT + "]" + '</span> <span class="pull-right">' + (item.PORC * 100).toFixed(2) + '% </span> </div> <div class="progress progress-mini "> <div style="width:' + (item.PORC * 100).toFixed(2) + '% " class="' + item.COLOR + '"></div> </div> </a>')
                SumAct = SumAct + item.CANT;
            });
            $('#TituloAct').append('<h5><i class="icon-briefcase"></i> Avance de Actividades de los procesos (' + SumAct + ')</h5>');

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


        })
    </script>


    <script src="js/PanelConsT.js"></script>
</asp:Content>
