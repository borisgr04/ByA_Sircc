var objregistro = (function () {
    var urlToModalidades = "/Servicios/DatosBasicosG/wsModalidades.asmx/GetsActivo";
    var urlToModTipPla = "/Servicios/DatosBasicosG/wsModalidadesPorTipoPlantilla.asmx/GetsTodasModalidad";
    var urlToGuardarTodo = "/Servicios/DatosBasicosG/wsModalidadesPorTipoPlantilla.asmx/UpdateOrInsert";

    var l_Mod_Tip_Pla;
    var msgPpal = "#LbMsg";
    var sourceModalidades;

    var _addHandlers = function () {
        $("#cboModalidades").change(function () {
            $(msgPpal).html("");
            var Nombre;
            $.each(sourceModalidades, function (index, item) {
                if (item.COD_TPROC == $("#cboModalidades").val()) {
                    Nombre = item.NOM_TPROC;
                }
            });
            if ($(this).val() != "") {
                CargarModTiposPla($(this).val(),Nombre);
            }
        });
        $("#guardarButton").click(function(){
            _guardarTodo();
        });
    };
    var _crearElements = function () {
        sourceModalidades = byaPage.getSource(urlToModalidades);
        $("#cboModalidades").byaCombo({
            DataSource: sourceModalidades, placeHolder: 'Seleccione', Display: "NOM_TPROC", Value: "COD_TPROC"
        });
    };
    var tblTiposPlantillas;
    var CargarModTiposPla = function (COD_MOD, Nombre) {
        l_Mod_Tip_Pla = byaPage.getSource(urlToModTipPla, { COD_MOD: "'" + COD_MOD + "'" });
        var config = {
            Id: '#tblTiposPlantillas',
            Source: l_Mod_Tip_Pla,
            fn_Editar: function (item) {
                alert(JSON.stringify(item));
            },
            lEliminar: false,
            lEditar: false,
            Display: 'NombreCodigo',
            Value: 'UNSPSC',
            fnFormatItem: function (item, index) {
                var cadenaHtml;
                if (item.EST == "AC") cadenaHtml = "<td>" + item.NOM_COD_TIP + "</td><td><input type='checkbox' id='lmod" + index + "' onchange='objregistro.CambiarEstadoMod(id)' checked='checked'/></td>";
                else cadenaHtml = "<td>" + item.NOM_COD_TIP + "</td><td><input id='lmod" + index + "' onchange='objregistro.CambiarEstadoMod(id)' type='checkbox'/></td>"
                return cadenaHtml;
            },
            Enabled: false
        };
        tblTiposPlantillas = new byaTablaG();
        tblTiposPlantillas.init(config);

        $(msgPpal).msgBox({ titulo: "Tipos de plantilla por modalidad", mensaje: "Se cargaron los tipos de plantilla para la modalidad <strong>" + Nombre + "</strong>", tipo: true });
    };
    var CambiarEstadoMod = function (indexID) {
        index = "" + indexID + "";
        index = index.replace("lmod", "");
        tblTiposPlantillas.getSource()[index].EST = $("#" + indexID).is(':checked') == true ? "AC" : "IN";
    };
    var _guardarTodo = function () {
        var jsonData = "{'lReg':" + JSON.stringify(tblTiposPlantillas.getSource()) + "}";
        byaPage.POST_Sync(urlToGuardarTodo, jsonData, function (result) {
            byaRpta = byaPage.retObj(result.d);
            $(msgPpal).msgBox({ titulo: "Tipos de plantilla por modalidad", mensaje: byaRpta.Mensaje, tipo: !byaRpta.Error });            
        });
    };
    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        init: function () {
            _addHandlers();
            _crearElements();            
        },
        CambiarEstadoMod: function (index) {
            $(msgPpal).html("");
            CambiarEstadoMod(index);
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Tipos de plantilla por modalidad", Modulo: "Gestión", urlToPanelModulo: "ModalidadesTipoPlantilla.aspx", Cod_Mod: "DTBS4", Rol: "DTBS4ModTipPla" });
    objregistro.init();
});
