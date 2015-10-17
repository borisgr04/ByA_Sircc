var byaPage = new Object();
var byaPage = {
    IntegradoSIF: true,
    ajaxError: function (jqXHR, status, error) {
        //alert(error + "-" + jqXHR.responseText);
        alert("Ajax " + error + " - " + jqXHR.responseText);
        //alert(status);
    },
    POST_Sync: function (urlToHandler, jsonData, fnsuccess) {
        $.ajax({
            type: "POST",
            url: urlToHandler,
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: fnsuccess,
            error: byaPage.ajaxError
        });
    },
    POST_Async: function (urlToHandler, jsonData, fnsuccess) {
        $.ajax({
            type: "POST",
            url: urlToHandler,
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: fnsuccess,
            error: byaPage.ajaxError
        });
    },
    retObj: function (d) {
        return (typeof d) == 'string' ? eval('(' + d + ')') : d;
    },
    converJSONDate: function (dateTime) {
        if (dateTime != null) {
            var date = new Date(parseInt(dateTime.substr(6)));
            var formatted = date.getFullYear() + "-" +
                                        ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                                            ("0" + date.getDate()).slice(-2);
            console.log(formatted);
            return formatted;
        }
    },    
    converJSONDateTime: function (dateTime) {
        if (dateTime != null) {
            var date = new Date(parseInt(dateTime.substr(6)));
            var formatted = date.getFullYear() + "-" +
                                        ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                                            ("0" + date.getDate()+1).slice(-2) + " " + date.getHours() + ":" +
                                        date.getMinutes();
            return formatted;
        }
  },    
    FechaShortX: function (f) {
       var sf = "";
       sf = f.getFullYear() + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + ("0" + f.getDate()).slice(-2);
       //sf = ("0" + f.getDate()).slice(-2) + "/" + ("0" + (f.getMonth() + 1)).slice(-2) + "/" + f.getFullYear()
       console.log("Prueba de Asignacion de Fecha, se probo y funcionó..." + sf);
       return sf;
    },
    parseJsonDate: function (jsonDate) {
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    
    if (parts[2] == undefined) 
      parts[2] = 0;
    
    if (parts[3] == undefined) 
      parts[3] = 0;
    
    return new Date(+parts[1] + offset + parts[2]*3600000 + parts[3]*60000);
    },
    getASync: function (urlToHandler, jsonData, fnsuccess) {
        $.ajax({
            type: "GET",
            url: urlToHandler,
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: fnsuccess,
            error: byaPage.ajaxError
        });
    },
    getSource: function (Servicio, dataJSON) {
        var source = {};
        $.ajax({
            type: "GET",
            url: Servicio,
            data: dataJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                source = result.d;
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
        return source;
    },
    getSource: function (Servicio, dataJSON) {
        var source = {};
        $.ajax({
            type: "GET",
            url: Servicio,
            data: dataJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                source = result.d;
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
        return source;
    },
    postSource: function (Servicio, dataJSON) {
        var source = {};
        //this.msgJson  (dataJSON);
        $.ajax({
            type: "POST",
            url: Servicio,
            data: dataJSON,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                source = result.d;
            },
            error: function (jqXHR, status, error) {
                alert(error + "-" + jqXHR.responseText);
            }
        });
        return source;
    },
    showLoading: function (Theme, Mensaje, TxtVisible, TxtOnly) {
        var $this = $(this),
                theme = Theme || $.mobile.loader.prototype.options.theme,
                msgText = Mensaje || $.mobile.loader.prototype.options.text,
                textVisible = TxtVisible || $.mobile.loader.prototype.options.textVisible,
                textonly = !!TxtOnly;
        html = $this.jqmData("html") || "";
        $.mobile.loading("show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
        });
    },
    hideLoading: function () {
        $.mobile.loading("hide");
    },
    FormatCurrency: function (value, decimals, separators) {
        decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
        separators = separators || ['.', "'", ','];
        var number = (parseFloat(value) || 0).toFixed(decimals);
        if (number.length <= (4 + decimals))
            return number.replace('.', separators[separators.length - 1]);
        var parts = number.split(/[-.]/);
        value = parts[parts.length > 1 ? parts.length - 2 : 0];
        var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
            separators[separators.length - 1] + parts[parts.length - 1] : '');
        var start = value.length - 6;
        var idx = 0;
        while (start > -3) {
            result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
                + separators[idx] + result;
            idx = (++idx) % 2;
            start -= 3;
        }
        return (parts.length == 3 ? '-' : '') + result;
    },
    FechaToString: function (fecha) {
        var fec = "" + fecha + "";
        fec = fec.slice(0, 10);
        return fec;
    }
}