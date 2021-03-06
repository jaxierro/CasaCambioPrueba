$("#producto_id").change(function () {

    var path        = $("#path").val();
    var producto_id = $("#producto_id").val();
    var opt = "<option value='0'>Seleccione</option>";

    $.ajax({
        url: path + "Ingresos/LoadUnidades",
        dataType: "json",
        data: { "producto_id": producto_id },
        type: "POST",
        success: function (data) {
            data.forEach(function (clase) {
                s = JSON.stringify(clase);
                i = JSON.parse(s);

                opt = opt + '<option value=' + i.id_unidad + '>' + i.nombre_unidad + '</option>'
            });

            $('#unidad_id').html(opt);
            $('#cantidad').val(1);
        },
        error: function (Response) {
            $.bootstrapGrowl(Response,
                {
                    type: 'danger',
                    delay: 2000,
                });
        }
    });

});


$("#impuesto_id").change(function ()
{

    var path             = $("#path").val();
    var impuesto_ingreso = $("#impuesto_id").val();

    $.ajax({
        url: path + "Ingresos/GetMontoImpuesto",
        dataType: "json",
        data: { "impuesto_ingreso": impuesto_ingreso },
        type: "POST",
        success: function (data) {
            $("#por_imp").val(data);
        },
        error: function (Response) {
            $.bootstrapGrowl(Response,
                {
                    type: 'danger',
                    delay: 2000,
                });
        }
    });
});

function AddProducto()
{
    var path        = $("#path").val();
    var producto_id = $("#producto_id").val();
    var id_unidad   = $("#unidad_id").val();
    var cantidad    = $("#cantidad").val();
    var costo_unit  = $("#costo_unit").val();

    var sub_total_ingreso = $("#sub_total_ingreso").val();
    var impuesto_ingreso  = parseFloat(sub_total_ingreso) * (parseFloat($("#por_imp").val()) / 100);
    var total_ingreso     = $("#total_ingreso").val();

    $.ajax({
        url: path + "Ingresos/AddProduct",
        dataType: "html",
        data:
        {
            "producto_id": producto_id, 'id_unidad': id_unidad, 'cantidad': cantidad,
            'costo_unit': costo_unit
        },
        type: "POST",
        success: function (data) {
            $("#bodyTableProd").append(data);
            sub_total_ingreso = parseFloat(sub_total_ingreso) + (parseInt(cantidad) * parseFloat(costo_unit));
            impuesto_ingreso = parseFloat(sub_total_ingreso) * (parseFloat($("#por_imp").val()) / 100);
            total_ingreso = parseFloat(total_ingreso) + parseFloat(sub_total_ingreso) + parseFloat(impuesto_ingreso);

            $("#sub_total_ingreso").val(sub_total_ingreso);
            $("#impuesto_ingreso").val(impuesto_ingreso);
            $("#total_ingreso").val(total_ingreso);
            SetDetallesIngresos();
        },
        error: function (Response) {
            $.bootstrapGrowl(Response,
                {
                    type: 'danger',
                    delay: 2000,
                });
        }
    });
}


function SetDetallesIngresos()
{
    /*var table = $('#cartProducts').tableToJSON({
        //ignoreColumns: [1]
    });

    var json = JSON.stringify(table);
    json     = "{ \"root\": { \"data\":" + json + "}";*/

    var json = ' [{ ';
    var this_row;

    $("#cartProducts tr:gt(0)").each(function () {
        this_row = $(this);

        var producto_id = $(this_row).find('td').eq(0).html();
        json += ' "producto_id":"' + producto_id + '",';

        var id_unidad = $(this_row).find('td').eq(1).html();
        json += ' "id_unidad":"' + id_unidad + '",';

        var producto = $(this_row).find('td').eq(2).html();
        json += ' "producto":"' + producto + '",';

        var unidad = $(this_row).find('td').eq(3).html();
        json += ' "unidad":"' + unidad + '",';

        var cantidad = $(this_row).find('td').eq(4).html();
        json += ' "cantidad":"' + cantidad + '",';

        var precio = $(this_row).find('td').eq(5).html();
        json += ' "precio":"' + precio + '",';

        var importe = $(this_row).find('td').eq(6).html();
        json += ' "importe":"' + importe + '",';

        json += '},{'
    });

    json = json.substring(0, json.length - 2);
    json += ' ] ';

    json = "{ \"root\": { \"data\":" + json + "} }";

    $('#jsonDetallesIngresos').val(json);
}

function Remove(tr)
{
    $(tr).parent().parent().remove();
}
   

