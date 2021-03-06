function AbrirUnidades()
{
    var path = $("#path").val();
    var producto_id = $('#producto_id').val();
    var idTextButtonAddProduct = $('#idTextButtonAddProduct').val();
    var IdCompany = $("#IdCompany").val();

    $.ajax({
        url: path + "Ventas/AgregarCestaPublica",
        cache: false,
        dataType: "html",
        data: {
            'producto_id': producto_id, 'modo': 0, 'unidad_id': 0,
            'precio_id': 0, 'cantidad': 0, 'IdCompany': IdCompany
        },
        type: "POST",
        success: function (data) {
            $('#bodyUnidades').html(data);
            pn = $('#hdProductoNombre').val();
            $('#titleNombProducts').html(pn);
            $("#btnConfirmarAddProducts").text(idTextButtonAddProduct);
            $('#AsqModalUnidades').modal({ show: true, keyboard: false, backdrop: 'static' });
            $('.datatable').DataTable({
                select: true,
                responsive: true,
                paging: false,
                ordering: false,
                searching: false
            });
        }
    });
}


function getJSONTable() {

    var json = ' [{ ';
    var this_row;

    $("#tbCarrito tr:gt(0)").each(function () {
        this_row = $(this);

        var producto_id = $(this_row).find('td').eq(0).html();
        json += ' "producto_id":"' + producto_id + '",';

        var id_unidad = $(this_row).find('td').eq(1).html();
        json += ' "id_unidad":"' + id_unidad + '",';

        var id_precio = $(this_row).find('td').eq(2).html();
        json += ' "id_precio":"' + id_precio + '",';

        var cantidad = $(this_row).find('td').eq(6).html();
        json += ' "cantidad":"' + cantidad + '",';

        var subtotal = $(this_row).find('td').eq(8).html();
        json += ' "subtotal":"' + subtotal + '"';

        json += '},{'
    });

    json = json.substring(0, json.length - 2);
    json += ' ] ';
    //return "{ \"root\": { \"data\":" + json + "}";
    return json;
}


$("#btnConfirmarYEnviarOrden").click(function () {

    var referencia = $('#referencia').val();
    var id_cuenta  = $('#id_cuenta').val();

    var IdMsjValRef = $('#IdMsjValRef').val();
    var IdMsjValCta = $('#IdMsjValCta').val();

    if (referencia == '')
    {
        $("#referencia").focus();
        $.bootstrapGrowl(IdMsjValRef,
            {
                type: 'warning',
                delay: 2000
            });
        return;
    }

    if (id_cuenta == 0) {
        $("#id_cuenta").focus();
        $.bootstrapGrowl(IdMsjValCta,
            {
                type: 'warning',
                delay: 2000
            });
        return;
    }

    var json = getJSONTable();

    json = "{ \"root\": { \"data\":" + json + "} }";

    $('#jsonItemsCart').val(json);

    $('#generateFactura').submit();

});


$("#identificacion").change(function () {

    var path       = $("#path").val();
    var IdCompany      = $("#IdCompany").val();
    var identificacion = $("#identificacion").val();

    $.ajax({
        url: path + "Ventas/SearchCliente",
        cache: false,
        dataType: "json",
        data: {
            'ID': identificacion,
            'IdCompany': IdCompany
        },
        type: "POST",
        success: function (data) {

            if (data != null) {

                t = JSON.stringify(data);
                n = JSON.parse(t);

                $("#razon_social").val(n.razon_social);
                if (n.email == '') {
                    $("#body_email").val('@');
                }
                else
                {
                    $("#body_email").val(n.email);
                }
            }
            else
            {
                $("#razon_social").val('');
                $("#body_email").val('@');
            }
        }
    });


});

$("#btnConfirmarAddProducts").click(function () {

    var path = $("#path").val();
    var modoOpe = $("#modoOpe").val();
    if (modoOpe == 1) {
        var row_index = $("#rowIndexCartTb").val();
        var tr = $("#tbCarrito").find("tr").eq(row_index);

        var producto_id = $(tr).find('td').eq(0).html();
        var id_precio = $(tr).find('td').eq(2).html();
        Remove(tr, 0);
        $("#modoOpe").val(0);
    }
    else {
        var producto_id = $('#producto_id').val();
        var id_precio = $('#precios').val();
    }

    var stockCantidad = $("#stockCantidad").val();
    var Cantidad = $("#Cantidad").val();
    var idMsStockCantidad = $("#idMsStockCantidad").val();
    var idMsEmptyCantidad = $("#idMsEmptyCantidad").val();

    if (Cantidad != '') {
        if (Cantidad > stockCantidad) {
            $.bootstrapGrowl(idMsStockCantidad,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }
    }
    else {
        $.bootstrapGrowl(idMsEmptyCantidad,
            {
                type: 'warning',
                delay: 2000,
            });
        return;
    }

    
    var totalInvoiceBrutoAcum = $("#totalInvoice").val();
    var idMsjTotalInvoiceVal  = $("#idMsjTotalInvoiceVal").val();
    var descuento             = 0;
    var IdCompany             = $("#IdCompany").val();
    var IdLocal               = $("#IdLocalSel").val();

    $.ajax({
        url: path + "Ventas/AddProductPublic",
        cache: false,
        dataType: "json",
        data: {
            'producto_id': producto_id, 'cantidad': Cantidad, 'IdLocal': IdLocal,
            'totalInvoiceBrutoAcum': totalInvoiceBrutoAcum,
            'IdCompany': IdCompany, 'descuento': descuento
        },
        type: "POST",
        success: function (data) {

            t = JSON.stringify(data);
            n = JSON.parse(t);

            if (n.subTotal > 0) {

                $("#tbCarrito").find('tbody').append(n.row);
                $('#totalInvoiceView').html(n.totalInvoiceNetoFormat);
                $("#totalInvoice").val(n.totalInvoiceBruto);
                $("#totalInvoiceNeto").val(n.totalInvoiceNeto);
                $("#totalImpuesto").val(n.totalImpuesto);
                $("#totalDescuento").val(n.totalDescuento);
                $("#lblTotalImpuesto").html(n.totalImpuestoFormat);
                $("#lblTotalDescuento").html(n.totalDescuentoFormat);
                $("#lblSubTotal").html(n.totalInvoiceBrutoFormat);
                $("#IdLocal").val(n.idLocal);

                $('#swValCart').val(1);
                $('#AsqModalUnidades').modal('hide');
            }
            else {
                $.bootstrapGrowl(idMsjTotalInvoiceVal,
                    {
                        type: 'warning',
                        delay: 2000,
                    });
                return;
            }

        }
    });
});

$("#terminarventa1, #terminarventa2").click(function () {

    var path           = $("#path").val();
    var IdCompany      = $("#IdCompany").val();
    var identificacion = $("#identificacion").val();
    var razon_social   = $("#razon_social").val();
    var body_email     = $("#body_email").val();
    
    var IdMsjValID          = $("#IdMsjValID").val();
    var IdMsjValRazonSocial = $("#IdMsjValRazonSocial").val();
    var IdMsjValEmail       = $("#IdMsjValEmail").val();
    var totalFacturaNeto    = $("#totalInvoiceNeto").val();

    if (identificacion == 0) {
        $("#identificacion").focus();
        $.bootstrapGrowl(IdMsjValID,
            {
                type: 'warning',
                delay: 2000
            });
        return;
    }

    if (razon_social == 0) {
        $("#razon_social").focus();
        $.bootstrapGrowl(IdMsjValRazonSocial,
            {
                type: 'warning',
                delay: 2000
            });
        return;
    }

    if (body_email == '@' || body_email == '') {
        $("#body_email").focus();
        $.bootstrapGrowl(IdMsjValEmail,
            {
                type: 'warning',
                delay: 2000
            });
        return;
    }

    $.ajax({
        url: path + "Ventas/TerminarVentaPublica",
        cache: false,
        dataType: "html",
        data: { 'IdCompany': IdCompany, 'totalFacturaNeto': totalFacturaNeto },
        type: "POST",
        success: function (data) {
            $('#bodyPagos').html(data);
            $('#AsqModalPagosConfirmar').modal({ show: true, keyboard: false, backdrop: 'static' });     
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

function Remove(tr, isParent = 1) {

    var id_impuesto = 1;
    var descuento   = 0

    var path      = $("#path").val();
    var IdCompany = $("#IdCompany").val();

    if (isParent == 1) {
        var producto_id = $(tr).parent().parent().find('td').eq(0).html();
        var subtotal = $(tr).parent().parent().find('td').eq(8).html();
    } else {
        var producto_id = $(tr).find('td').eq(0).html();
        var subtotal = $(tr).find('td').eq(8).html();
    }

    var totalInvoice = $("#totalInvoice").val();

    $.ajax({
        url: path + "Ventas/RemoveItemsForPublic",
        cache: false,
        dataType: "json",
        data: {
            'producto_id': producto_id, 'totalInvoice': totalInvoice, 'subTotal': subtotal,
            'descuento': descuento, 'IdCompany': IdCompany
        },
        type: "POST",
        success: function (data) {

            t = JSON.stringify(data);
            n = JSON.parse(t);

            $('#totalInvoiceView').html(n.totalInvoiceNetoFormat);
            $("#totalInvoice").val(n.totalInvoiceBruto);
            $("#totalInvoiceNeto").val(n.totalInvoiceNeto);
            $("#totalImpuesto").val(n.totalImpuesto);
            $("#totalDescuento").val(n.totalDescuento);
            $("#lblTotalImpuesto").html(n.totalImpuestoFormat);
            $("#lblTotalDescuento").html(n.totalDescuentoFormat);
            $("#lblSubTotal").html(n.totalInvoiceBrutoFormat);

            if (isParent == 1) {
                $(tr).parent().parent().remove();
            } else {
                $(tr).remove();
            }

            var rowCount = $('#tbCarrito tr').length;
            if (rowCount <= 1) {
                $('#swValCart').val(0);
            }
        }
    });

    return false;
}