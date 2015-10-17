$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    },
    getCookie: function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    },
    setCookie: function (c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }
});
jQuery.fn.extend({
    byaCombo: function(options) {
        
        placeHolder=options.placeHolder==null?"Seleccione":options.placeHolder;
        var IdCombo = $(this);
        IdCombo.children().remove().end();

        //PlaceHolder Automatico
        IdCombo.get(0).options[IdCombo.get(0).options.length] = new Option(placeHolder, "");

        $.each(options.DataSource, function (index, item) {
            IdCombo.get(0).options[IdCombo.get(0).options.length] = new Option(item[options.Display], item[options.Value]);
        });
    }
});
jQuery.fn.extend({
    byaSetHabilitar: function (value) {
        
    if(value){
        $(this).removeAttr('disabled');
        
    }
    else{
        $(this).attr('disabled', '-1');
        
    }
}
});
jQuery.fn.extend({
    byaSetDecimal: function(valor) {
        $(this).val(valor);
        $(this).formatCurrency();
        $(this).css("text-align", "right");
    }
});
(function (BootStrap, $, undefined) {

    var Utils = (function () {
        function Utils() {
            //ctor
        }

        Utils.prototype.createAlert = function (title, message, alertType, targetElement) {
            var html = '<div class="alert alert-' + alertType + '">' +
                                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                    '<h4>' + title + '</h4>' + message +
                                '</div>'
            $(targetElement).prepend(html);
        }

        return Utils;

    })();

    BootStrap.Utils = Utils;

})(window.BootStrap || (window.BootStrap = {}), jQuery);