$( document ).ready(function () {

    var path = $("#path").val();

    $("#btnNuevo").click(function ()
    {
        $.ajax({
            url: path + "Inventarios/Create",
            cache: false,
            dataType: "html",
            type: "GET",
            success: function (data) {
                $('#bodyForm').html(data)
                $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
            }
        });

    });

});

$("#btnAgregarAjuste").click(function ()
{
    var path           = $("#path").val();
    var idMsjEje       = $("#idMsjEje").val();
    var idMsjValSinUni = $("#idMsjValSinUni").val();
    var descripcion    = $("#descripcion").val();

    if (descripcion == '') {
        $.bootstrapGrowl($("#idMsjDes").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        return;
    }

    var table = $('#tbDetallesAjustes').tableToJSON({
        //ignoreColumns: [1]
    });

    var json = JSON.stringify(table);
    json =  "{ \"root\": { \"data\":" + json + "}";

    $('#detallesAjusteJson').val(json);

    $.ajax({
        url: path + "Inventarios/AddAjustesInv",
        cache: false,
        dataType: "html",
        data: $('#formagregar').serialize(),
        type: "POST",
        success: function (data) {
          
            if (data != "ERROR") {
                
                $('#tabla').html(data);
                $('#FormModal').modal('hide');
                //$('#FormModal').hide();
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
                $('.datatable').DataTable({
                    select: true,
                    responsive: true,
                    paging: false,
                    ordering: false,
                    searching: false,
                    initComplete: function () {
                        $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                    }
                });
            }
            else
            {
                $.bootstrapGrowl(idMsjValSinUni,
                    {
                        type: 'warning',
                        delay: 2000,
                 });
            }
        }
    });
});


function LoadInvByLocal()
{
    var path     = $("#path").val();
    var id_local = $("#local_id").val();

    $.ajax({
        url: path + "Inventarios/GetAjustesInvByLocal",
        cache: false,
        dataType: "html",
        type: "POST",
        data: { 'id_local': id_local },
        success: function (data) {
            $('#tabla').html(data)
        }
    });
}


function LoadDataInv()
{
    var path = $("#path").val();
    var producto_id = $("#producto_id").val();
    var id_local = $("#local_id").val();

    $.ajax({
        url: path + "Inventarios/GetUnidades",
        cache: false,
        dataType: "json",
        data: { 'producto_id': producto_id, 'id_local': id_local },
        type: "GET",
        success: function (data) {

            t = JSON.stringify(data);
            n = JSON.parse(t);

            $("#cantidad").val("0");
            $("#fraccion").val("0");
            $("#existencia").css("display", "block");

            $('#id_inventario').val(n.id_inventario);
            $("#unidad_maxima").text(n.unidad_maxima);
            $("#unidad_minima").text(n.unidad_minima);

            $("#uni_costo_unitario").text(n.unidad_maxima);

        }
    });
}

function AddProductos()
{

    var path        = $("#path").val();
    var producto_id = $('#producto_id').val();
    var unidad_id   = $('#unidad_id').val();
    var UM          = $('#uni_costo_unitario').text();
    var Cantidad    = $('#cantidad').val();
    var Fraccion    = $('#fraccion').val();
    var Costo_unit    = $('#costo_unitario').val();
    var id_inventario = $('#id_inventario').val();
    //var detallesAjusteJson = $('#detallesAjusteJson').val();

    $.ajax({
        url: path + "Inventarios/AddAjustes",
        cache: false,
        dataType: "html",
        data: {
            'producto_id': producto_id,
            'unidad_id'  : unidad_id,
            'UM'      : UM,
            'Cantidad': Cantidad,
            'Fraccion': Fraccion,
            'Costo_unit': Costo_unit,
            'id_inventario': id_inventario
        },
        type: "POST",
        success: function (data) {
            $('#columnas').append(data);
            $('#producto_id').val(0);
            $("#existencia").css("display", "none");
           
        }
    });

}

function VerDetalles(id_ajusteinventario)
{
    var path = $("#path").val();

    $.ajax({
        url: path + "Inventarios/GetAjustesDetalles",
        cache: false,
        dataType: "html",
        type: "POST",
        data: { 'id_ajusteinventario': id_ajusteinventario },
        success: function (data) {
            $('#bodyDetalles').html(data)
            $('#FormModalDetalles').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });
}


function Remove(tr)
{
   $(tr).parent().parent().remove();
}

