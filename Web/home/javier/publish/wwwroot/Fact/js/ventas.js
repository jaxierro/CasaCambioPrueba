//$(document).ready(function () {

   var path = $("#path").val();

   $("#btnConfirmarOpenClose").click(function () {

        var IdCajaSelected = $('#IdCajaSelected').val();
        if (IdCajaSelected <= 0) {

            $.ajax({
                url: path + "Ventas/RegMovCajas",
                dataType: "json",
                data: $("#formagregar").serialize(),
                type: "post",
                success: function (data) {

                    data.forEach(function (clase) {

                        t = JSON.stringify(clase);
                        n = JSON.parse(t);
                        nuevaCadena = n.split("@");
                        $('#TagsBoxesSelected').html(nuevaCadena[0]);
                        $('#IdCajaSelected').val(nuevaCadena[1]);
                        $('#tagsAbrirMenu').html('Cerrar Caja');
                        $('#tagsAbrirMenu1').html('Cerrar Caja');

                    });

                    $('#FormModal').modal('hide');
                },
                error: function (Response) {
                    $.bootstrapGrowl(Response,
                        {
                            type: 'warning',
                            delay: 2000,
                        });
                }

            });

        } else {

            $.ajax({
                url: path + "Ventas/CerrarCajas",
                dataType: "json",
                data: $("#formagregar").serialize(),
                type: "post",
                success: function (data) {
                    data.forEach(function (clase) {

                        t = JSON.stringify(clase);
                        n = JSON.parse(t);
                        $('#TagsBoxesSelected').html(n);
                        $('#tagsAbrirMenu').html("Abrir Caja");
                        $('#tagsAbrirMenu1').html("Abrir Caja");
                        $('#IdCajaSelected').val("0");

                    });
                    $('#FormModal').modal('hide');
                },
                error: function (Response) {
                    $.bootstrapGrowl(Response,
                        {
                            type: 'warning',
                            delay: 2000,
                        });
                }

            });
        }      
    });

   $("#btnConfirmarAddProducts").click(function () {

        var modoOpe = $("#modoOpe").val();
        if (modoOpe == 1) {
            var row_index = $("#rowIndexCartTb").val();
            var tr        = $("#tbCarrito").find("tr").eq(row_index);

            var producto_id = $(tr).find('td').eq(0).html();
            var id_precio   = $(tr).find('td').eq(2).html();
            var subtotalAct = $(tr).find('td').eq(8).html();

            Remove(tr, 0);
            $("#modoOpe").val(0);
        }
        else
        {
            var producto_id = $('#producto_id').val();
            var id_precio   = $('#precios').val();
            subtotalAct     = 0;
        }

        var stockCantidad     = $("#stockCantidad").val();
        var Cantidad          = $("#Cantidad").val();
        var idMsStockCantidad = $("#idMsStockCantidad").val();
        var idMsEmptyCantidad = $("#idMsEmptyCantidad").val();

        if (Cantidad != '') {
            if (Cantidad > parseInt(stockCantidad, 0)) {
                
                $.bootstrapGrowl(idMsStockCantidad,
                    {
                        type: 'warning',
                        delay: 2000,
                    });
                return;
            }
        }
        else
        {
            $.bootstrapGrowl(idMsEmptyCantidad,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        var id_unidad             = $("#IdUnidadSelected").val();
        var totalInvoiceBrutoAcum = $("#totalInvoice").val();
        var idMsjTotalInvoiceVal  = $("#idMsjTotalInvoiceVal").val();
        var id_impuesto           = $("#id_impuesto").val();
        var descuento             = $("#descuento").val();

        $.ajax({
            url: path + "Ventas/AddProduct",
            cache: false,
            dataType: "json",
            data: {
                'producto_id': producto_id, 'cantidad': Cantidad, 'id_precio': id_precio, 'id_unidad': id_unidad,
                'totalInvoiceBrutoAcum': totalInvoiceBrutoAcum, 'id_impuesto': id_impuesto, 'descuento': descuento,
                'subtotalAct' : subtotalAct
            },
            type: "POST",
            success: function (data) {

                t = JSON.stringify(data);
                n = JSON.parse(t);

                if (n.subTotal > 0) {

                    $("#tbCarrito").find('tbody').append(n.row);
                    $('#totalInvoiceView').html(n.totalInvoiceNetoFormat);
                    $("#totalInvoice").val(n.totalInvoiceBruto);
                    $("#totalInvoiceNeto").val(parseFloat(n.totalInvoiceNeto));
                    $("#totalImpuesto").val(n.totalImpuesto);
                    $("#totalDescuento").val(n.totalDescuento);
                    $("#lblTotalImpuesto").html(n.totalImpuestoFormat);
                    $("#lblTotalDescuento").html(n.totalDescuentoFormat);
                    $("#lblSubTotal").html(n.totalInvoiceBrutoFormat);
                    
                    $('#swValCart').val(1);
                    $('#AsqModalUnidades').modal('hide');
                }
                else
                {
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

   $("#chkCondicionPago1, #chkCondicionPago2").click(function ()
   {
       var chk = $("input[name='chkCondicionPago']:checked").val();

       $.ajax({
           url: path + "Ventas/UpdateConfigCondPago",
           cache: false,
           dataType: "json",
           data: {'valueSelected' : chk},
           type: "POST",
           success: function (data) {
               if (data != 0) {
                   $('#tipoPago').val(data);
                   //$('#tipoPago').find('option[value="' + data + '"]').attr("selected", "selected");
               }
           }
       });
   });

   $("#chkEstadoFact1, #chkEstadoFact2").click(function () {
        var chk = $("input[name='chkEstadoFact']:checked").val();

        $.ajax({
            url: path + "Ventas/UpdateConfigEstadoFact",
            cache: false,
            dataType: "html",
            data: { 'valueSelected': chk },
            type: "POST",
            success: function (data) {
                if (data != '') {
                    $('#EstFact').val(data);
                    //$('#tipoPago').find('option[value="' + data + '"]').attr("selected", "selected");
                }
            }
        });
    });

   $("#chkDocFact1, #chkDocFact2, #chkDocFact3").click(function () {
        var chk = $("input[name='chkDocFact']:checked").val();

        $.ajax({
            url: path + "Ventas/UpdateConfigDocFact",
            cache: false,
            dataType: "html",
            data: { 'valueSelected': chk },
            type: "POST",
            success: function (data) {
                if (data != '') {
                    $('#tipoDoc').val(data);
                    //$('#tipoPago').find('option[value="' + data + '"]').attr("selected", "selected");
                }
            }
        });
    });

   $("#btnConfirmarNewClients").click(function () {

        var razon_social = $("#razon_social").val();
        var grupo_id     = $("#grupo_id").val();

        if (razon_social == '') {
            $.bootstrapGrowl($("#idMsjNom").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (grupo_id == '') {
            $.bootstrapGrowl($("#idGrupoCliente").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        $.ajax({
            url: path + "Ventas/CreateClients",
            cache: false,
            dataType: "html",
            data: $("#formagregar").serialize(),
            type: "POST",
            success: function (data) {
                $('#id_cliente').html(data);
                $('#AsqModalNewUser').modal('hide');
                $('.select2').select2();
            }
        });
    });

   $("#abrirventas, #abrirventas1").click(function ()
    {

        $.ajax({
            url: path + "Ventas/AbrirVentasEspera",
            cache: false,
            dataType: "html",
            data: $("#formagregar").serialize(),
            type: "POST",
            success: function (data) {
                $('#bodyFormEspera').html(data);
                $('#FormModalAbrirVentasEspera').modal({ show: true, keyboard: false, backdrop: 'static' })
            }
        });

    });

   $("#terminarventa, #terminarventa1").click(function () {

        var path = $("#path").val();

        var IdMsjValCli  = $('#IdMsjValCli').val();
        var IdMsjValPro  = $('#IdMsjValPro').val();
        var IdMsjValCart = $('#IdMsjValCart').val();

        var IdMsjtipoPago      = $('#IdMsjtipoPago').val();
        var IdMsjtipoDoc       = $('#IdMsjtipoDoc').val();
        var IdMsjImpuesto      = $('#IdMsjImpuesto').val();
        var IdMsjValCaja       = $('#IdMsjValCaja').val();
        var IdMsjOptionNoDispo = $('#IdMsjOptionNoDispo').val();

        var id_cliente  = $('#id_cliente').val();
        var producto_id = $('#producto_id').val();
        var swValCart   = $('#swValCart').val();
        var tipoPago    = $('#tipoPago').val();
        var tipoDoc     = $('#tipoDoc').val();
        var EstFact     = $('#EstFact').val();
        var id_impuesto = $("#id_impuesto").val();
        var IdCajaSelected = $('#IdCajaSelected').val();


        if (IdCajaSelected == 0) {
            $.bootstrapGrowl(IdMsjValCaja,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }


        if (id_cliente == 0)
        {
            $.bootstrapGrowl(IdMsjValCli,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (producto_id == 0) {
            $.bootstrapGrowl(IdMsjValPro,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (swValCart == 0) {
            $.bootstrapGrowl(IdMsjValCart,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (tipoPago == 0) {
            $.bootstrapGrowl(IdMsjtipoPago,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (tipoDoc == 2) {
            $.bootstrapGrowl(IdMsjtipoDoc,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (id_impuesto == 0) {
            $.bootstrapGrowl(IdMsjImpuesto,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (tipoPago == 2) {
            $.bootstrapGrowl(IdMsjOptionNoDispo,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (EstFact == 'ES') {
            $.bootstrapGrowl(IdMsjOptionNoDispo,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        var totalNeto = $("#totalInvoiceNeto").val();
        var tipoDoc   = $("#tipoDoc").val();

        var IdTextBtnGuardar       = $("#IdTextBtnGuardar").val();
        var IdTextBtnGuardarImp    = $("#IdTextBtnGuardarImp").val();
        var IdTextBtnGuardarTic    = $("#IdTextBtnGuardarTic").val();
        var IdTextBtnGuardarTicImp = $("#IdTextBtnGuardarTicImp").val();

        $.ajax({
            url: path + "Ventas/PayFactModal",
            dataType: "html",
            data: { 'totalNeto': totalNeto, 'tipoDoc': tipoDoc },
            type: "post",
            success: function (data) {

                if (tipoDoc == 'F') {
                    $('#btnGuardarFact').html(IdTextBtnGuardar);
                    $('#btnRealizarVentaAndView').html(IdTextBtnGuardarImp);
                } else {
                    $('#btnGuardarFact').html(IdTextBtnGuardarTic);
                    $('#btnRealizarVentaAndView').html(IdTextBtnGuardarTicImp);
                }

                $('#bodyFormGenerateFact').html(data);
                $('#FormModalGenerateFactura').modal({ show: true, keyboard: false, backdrop: 'static' })
            },
            error: function (Response) {
                $.bootstrapGrowl("Error al abrir ventana de generar",
                    {
                        type: 'warning',
                        delay: 2000,
                    });
            }

        });

   });

function SetTipoPagos(obj)
{
    $("#TiPagoFactura").val(obj.value);
}

//});

function OpenClose()
{
    var path           = $("#path").val();
    var IdCajaSelected = $('#IdCajaSelected').val();

    if (IdCajaSelected == 0) {

        $.ajax({
            url: path + "Ventas/OpenClose",
            cache: false,
            dataType: "html",
            type: "POST",

            success: function (data) {
                $('#bodyForm').html(data);
                $('#btnConfirmarOpenClose').text("Abrir Caja");
                $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' })
            }
        });
    }
    else
    {
        $.ajax({
            url: path + "Ventas/CloseBox",
            cache: false,
            data: { 'idCajaOpened': IdCajaSelected },
            dataType: "html",
            type: "POST",
            success: function (data) {
                $('#bodyForm').html(data);
                $('#btnConfirmarOpenClose').text("Cerrar Caja");
                $('#IdCajaSelected').val(IdCajaSelected);
                $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' })
            }
        });
    }
}

function ShowFormsClients()
{
    var path = $("#path").val();
    
    $.ajax({
        url: path + "Clientes/Create",
        cache: false,
        dataType: "html",
        type: "GET",
        success: function (data) {
            $('#bodyNewCustomer').html(data);
            $('#AsqModalNewUser').modal({ show: true, keyboard: false, backdrop: 'static' })
        }
    });
}

function cambiarprecios()
{
    var path = $("#path").val();
    var producto_id = $('#producto_id').val();
    var id_precio = $('#precios').val();

    $.ajax({
        url: path + "Ventas/ChangePrices",
        cache: false,
        data: { 'producto_id': producto_id, 'id_precio': id_precio },
        dataType: "html",
        type: "POST",
        success: function (data) {
            $('#zona_precios').html(data);
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


function AbrirUnidades()
{
    var path = $("#path").val();
    var producto_id = $('#producto_id').val();
    var idTextButtonAddProduct = $('#idTextButtonAddProduct').val(); 

    $.ajax({
        url: path + "Ventas/AbrirUnidades",
        cache: false,
        dataType: "html",
        data: { 'producto_id': producto_id, 'modo' : 0 },
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


function RefreshListaClientes()
{
    var path = $("#path").val();

    $.ajax({
        url: path + "Ventas/LoadItemsClientes",
        cache: false,
        dataType: "html",
        type: "POST",
        success: function (data) {
            $('#bodyForm').html(data);
            $('#FormModal').hide();
        }
    });
}

function RefreshProductos()
{
    var path = $("#path").val();

    $.ajax({
        url: path + "Ventas/RefreshProducts",
        cache: false,
        dataType: "html",
        type: "POST",
        success: function (data) {
            $('#divProducto_id').html(data);
            $('#FormModal').hide();
            $('.select2').select2();
        }
    });
}

function RefreshCalculosFact()
{
    var descuento   = $("#descuento").val();
    var producto_id = $('#producto_id').val();
    var id_impuesto = $('#id_impuesto').val();
    var descuento   = $("#descuento").val();
    var t           = $("#totalInvoice").val();

    var idMsjValDescuento = $("#idMsjValDescuento").val();
    var path = $("#path").val();

    var r = isNumber(descuento);
    if (!r) {
        $("#descuento").val(0);
        $.bootstrapGrowl(idMsjValDescuento,
        {
            type: 'warning',
            delay: 2000,
        });
    }
    else
    {
        $.ajax({
            url: path + "Ventas/ReCalculateTotals",
            cache: false,
            dataType: "json",
            data: {
                    'producto_id': producto_id, 'totalInvoice': t, 'id_impuesto': id_impuesto,
                    'descuento': descuento
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

            }
        });
    }
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

function ActiveImporte()
{
    if ( $('input[name="tipoPagoCaja"]:checked').val() == 'EFECTIVO' )
    {
        $('#importe').attr('readonly', false); 
    }
    else
    {
        $('#importe').val($('#totApagar2').val());
        $('#vueltoView').val('0');
        $('#importe').attr('readonly', true); 
    }
}

function Facturar(opt)
{
    $('#TypeFactOption').val(opt);
    var tipoDoc = $('#tipoDoc').val();

    if (opt == 0 || opt == 1) {
        var json = getJSONTable();

        json = "{ \"root\": { \"data\":" + json + "} }";

        $('#jsonItemsCart').val(json);
        var totApagar2 = $('#totApagar2').val();
        var vuelto = $('#vueltoView').val();
        var IdMsjFactSavedSuccess = $('#IdMsjFactSavedSuccess').val();

        $('#pagado').val(totApagar2);
        $('#vuelto').val(vuelto);
        document.body.style.cursor = 'wait';

        $.ajax({
            url: path + "Ventas/SaveVentas",
            dataType: "json",
            data: $("#generateFactura").serialize(),
            type: "POST",
            success: function (data) {
                t = JSON.stringify(data);
                n = JSON.parse(t);
                document.body.style.cursor = 'default';
                if (n.isOk)
                {
                    if (tipoDoc == 'F')
                    {
                        if (opt == 0) {
                            $('#lblMsjFinal').html(n.infoMessage);
                            $('#FormModalGenerateFactura').modal('hide');
                            $('#FormModalMsjEndFactura').modal({ show: true, keyboard: false, backdrop: 'static' });
                            setTimeout(function () { $('#FormModalMsjEndFactura').modal('hide'); }, 15000);
                            $('#reiniciar').click();
                        }
                        else {

                            $.ajax({
                                url: path + "Ventas/ShowInvoice",
                                cache: false,
                                dataType: "html",
                                data: {
                                    'venta_id': n.infoMessage
                                },
                                type: "POST",
                                success: function (data) {
                                    $('#bodyFormEndFactura').html(data);
                                    $('#FormModalMsjEndFactura').modal({ show: true, keyboard: false, backdrop: 'static' });
                                },
                                error: function (Response) {
                                    $.bootstrapGrowl(Response,
                                        {
                                            type: 'warning',
                                            delay: 2000,
                                        });
                                }
                            });
                        }


                    }
                    else
                    {
                        if (opt == 0) {
                            $.bootstrapGrowl(IdMsjFactSavedSuccess,
                                {
                                    type: 'success',
                                    delay: 2000,
                                });
                            $('#reiniciar').click();
                        }
                        else
                        {

                            $.ajax({
                                url: path + "Ventas/ShowTickets",
                                cache: false,
                                dataType: "html",
                                data: {
                                    'venta_id': n.infoMessage
                                },
                                type: "POST",
                                success: function (data) {
                                    $('#bodyFormEndFactura').html(data);
                                    $('#FormModalMsjEndFactura').modal({ show: true, keyboard: false, backdrop: 'static' });
                                },
                                error: function (Response) {
                                    $.bootstrapGrowl(Response,
                                        {
                                            type: 'warning',
                                            delay: 2000,
                                        });
                                }
                            });

                        }
                    }
                }
            }
        });
    }
}

function Reset()
{
    $('#reiniciar').click();
}

function SetNombreUnidad(obj)
{
    var data = $(obj).find('td');
    $("#IdUnidadSelected").val(data[0].innerText);
    $("#nombreUnidadText").html(data[1].innerText);
}

function Edit(tr)
{
    var producto_id = $(tr).parent().parent().find('td').eq(0).html();
    var unidad_id   = $(tr).parent().parent().find('td').eq(1).html();
    var precio_id   = $(tr).parent().parent().find('td').eq(2).html();
    var cantidad    = $(tr).parent().parent().find('td').eq(6).html();
    var row_index = $(tr).parent().parent().index();
    var path = $("#path").val();
    var idTextButtonEditProduct = $("#idTextButtonEditProduct").val();

    $("#modoOpe").val(1);
    $("#btnConfirmarAddProducts").text(idTextButtonEditProduct);
    $("#rowIndexCartTb").val(row_index);
    
    $.ajax({
        url: path + "Ventas/AbrirUnidades",
        cache: false,
        dataType: "html",
        data: {
                 'producto_id': producto_id, 'modo': 1, 'unidad_id': unidad_id,
                 'precio_id': precio_id, 'cantidad': cantidad
        },
        type: "POST",
        success: function (data) {
           
            $('#bodyUnidades').html(data);
            pn = $('#hdProductoNombre').val();
            $('#titleNombProducts').html(pn);
            $('#AsqModalUnidades').modal({ show: true, keyboard: false, backdrop: 'static' });
            $('.datatable').DataTable({
                select: true,
                responsive: true,
                paging: false,
                ordering: false,
                searching: false
            });
        },
        error: function (Response) {
            $.bootstrapGrowl(Response,
                {
                    type: 'warning',
                    delay: 2000,
                });
        }
    });

}

function Remove(tr, isParent = 1)
{
    var id_impuesto = $('#id_impuesto').val();
    var descuento   = $("#descuento").val();

    var path = $("#path").val();

    if (isParent == 1) {
        var producto_id = $(tr).parent().parent().find('td').eq(0).html();
        var subtotal    = $(tr).parent().parent().find('td').eq(8).html();
    } else {
        var producto_id = $(tr).find('td').eq(0).html();
        var subtotal    = $(tr).find('td').eq(8).html();
    }

    var totalInvoice  = $("#totalInvoice").val();

    $.ajax({
        url: path + "Ventas/Remove",
        cache: false,
        dataType: "json",
        data: {
            'producto_id': producto_id, 'totalInvoice': totalInvoice, 'subTotal': subtotal,
               'id_impuesto': id_impuesto, 'descuento': descuento
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

function CalcularVuelto()
{
    var result = $('#importe').val() - $('#totApagar2').val();
    $('#vueltoView').val(result.toFixed(2));
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function VerDetallesOrderSalesPublic(id) 
{
    var path = $("#path").val();

    $.ajax({
        url: path + "Ventas/VerDetailsOrder",
        cache: false,
        dataType: "html",
        data: {
            'venta_id': id
        },
        type: "POST",
        success: function (data) 
        {
            $("#bodyFormViewDetails").html(data);
            $('#FormModalViewDetails').modal({ show: true, keyboard: false, backdrop: 'static' });
            $('#IdVentaSelected').val(id);
        }
    });

}


function VerConfirmarVenta() 
{
    var path = $("#path").val();
    var id = $("#tableOrder .selected").attr('title');
    $('#IdVentaSelected').val('0');
    
    $.ajax({
        url: path + "Ventas/DetailConfirmarVentas",
        cache: false,
        dataType: "html",
        data: {
            'venta_id': id
        },
        type: "POST",
        success: function (data) 
        {
            $("#bodyConfirmarVentas").html(data);
            $('#FormConfirmarVentas').modal({ show: true, keyboard: false, backdrop: 'static' });
            $('#IdVentaSelected').val(id);
        }
    });

}

function ConfirmarVenta(IsDeliveried) 
{
    var path = $("#path").val();
    var venta_id = $('#IdVentaSelected').val();
    var IdMsjConfirmSuccess = $('#IdMsjConfirmSuccess').val();
    
    $.ajax({
        url: path + "Ventas/ConfirmarVenta",
        cache: false,
        dataType: "html",
        data: {
            'venta_id'    : venta_id,
            'IsDeliveried': IsDeliveried
        },
        type: "POST",
        success: function (data) 
        {
            $("#tbDatosSalesOrders").html(data);
            $('#FormConfirmarVentas').modal('hide');
            $('.datatable').DataTable({
                select: true,
                responsive: true
            });
            $.bootstrapGrowl(IdMsjConfirmSuccess,
                {
                    type: 'success',
                    delay: 2000,
                });
        }
    });

}


function ConfirmarEntrega() 
{
    var path = $("#path").val();
    var venta_id = $('#IdVentaSelected').val();
    var IdMsjConfirmSuccess = $('#IdMsjConfirmSuccess').val();
    
    $.ajax({
        url: path + "Ventas/ConfirmarEntrega",
        cache: false,
        dataType: "html",
        data: {
            'venta_id'    : venta_id
        },
        type: "POST",
        success: function (data) 
        {
            $("#tbDatosSalesOrders").html(data);
            $('#FormModalViewDetails').modal('hide');
            $('.datatable').DataTable({
                select: true,
                responsive: true
            });
            $.bootstrapGrowl(IdMsjConfirmSuccess,
                {
                    type: 'success',
                    delay: 2000,
                });
        }
    });

}


function FiltrarSalesOrders()
{
    var path = $("#path").val();

    var params = {
        'codigo_fact'         : $('#codigo_fact').val(),
        'id_cliente'          : $('#id_cliente').val(),
        'id_vendedor'         : $('#id_vendedor').val(),
        'idCaja'              : $('#idCaja').val(),
        'fechaBetweenFrom'    : $('#fechaBetweenFrom').val(),
        'fechaBetweenTo'      : $('#fechaBetweenTo').val(),
        'fechaEqual'          : $('#fechaBetweenFrom').val(),
        'fechaMayor'          : $('#fechaBetweenFrom').val(),
        'fechaMenor'          : $('#fechaBetweenFrom').val(),
        'TotalFactBetweenFrom': $('#TotalFactBetweenFrom').val(),
        'TotalFactBetweenTo'  : $('#TotalFactBetweenTo').val(),
        'TotalFactEqual'      : $('#TotalFactBetweenFrom').val(),
        'TotalFactMayor'      : $('#TotalFactBetweenFrom').val(),
        'TotalFactMenor'      : $('#TotalFactBetweenFrom').val(),
        'opeFecha'            : $('#opeFecha').val(),
        'opeTotalFact'        : $('#opeTotalFact').val()
    }

    $.ajax({
        url: path + "Reportes/FiltrarSalesOrders",
        cache: false,
        dataType: "html",
        data: params,
        type: "POST",
        success: function (data) {
            
            $("#tbDatosSalesOrders").html(data);
            var table = $("#tbDatosSale").tableToJSON({});
            $("#hdJsonTable").val(JSON.stringify(table));
            
            $('.datatable').DataTable({
                select: true,
                responsive: true,
                initComplete: function () {
                    $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                }
            });
        },
        error: function (Response) {
            $.bootstrapGrowl(Response,
                {
                    type: 'danger',
                    delay: 2000,
                });
        }
    })
}


function AgregarProductosOrder()
{
    var path        = $("#path").val();
    var producto_id = $("#producto_id").val();

    $.ajax({
        url: path + "Ventas/AddProductOrder",
        dataType: "html",
        data: {
            'producto_id': producto_id
        },
        type: "GET",
        success: function (data)
        {
            //t = JSON.stringify(data);
            //n = JSON.parse(t);
            
            $("#tbCestaPaquete").find('tbody').append(data);
        }
    });

}

function NuevoPaquete(venta_id)
{
    var path = $("#path").val();

    $.ajax({
        url: path + "Ventas/CreatePackage",
        dataType: "html",
        data: {
            'venta_id': venta_id
        },
        type: "GET",
        success: function (data) {
            $('#bodyForm').html(data);
            $('#ModalVerListarPaquete').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });
}

function SaveNewPackage(venta_id, num_order)
{
    var path             = $("#path").val();
    var IdTrackProv      = $("#IdTrackProv").val();
    var IdMsjIdTrackProv = $("#IdMsjIdTrackProv").val();
    var IdMsjProv        = $("#IdMsjProv").val();
    var proveedor_id     = $("#proveedor_id").val();

    if (IdTrackProv == '') {
        $.bootstrapGrowl(IdMsjIdTrackProv,
            {
                type: 'error',
                delay: 2000,
            });
        return;
    }

    if (proveedor_id == 0) {
        $.bootstrapGrowl(IdMsjProv,
            {
                type: 'error',
                delay: 2000,
            });
        return;
    }

    $.ajax({
        url: path + "Ventas/AgregarNuevoPaquete",
        dataType: "html",
        data: {
            'venta_id': venta_id,
            'proveedor_id': proveedor_id,
            'num_order': num_order,
            'IdTrackProv': IdTrackProv
        },
        type: "POST",
        success: function (data) {
            $('#bodyForm').html(data);
            $('#ModalVerListarPaquete').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });

}

function RemoveTr(tr) {
    $(tr).parent().parent().remove();
    return false;
}


function SetImage(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(input.files[0]);
    }
}

function fileOnload(e) {
    var result = e.target.result;
    $('#imgPictureRef').attr("src", result);
}

function ExportarSalesOrderExcel()
{
    var path = $("#path").val();
    var json = $("#hdJsonTable").val();

    if (json == '')
    {
        var table = $('#tbDatosSalesOrders').tableToJSON({});
        $("#hdJsonTable").val(JSON.stringify(table));
        json = $("#hdJsonTable").val();
    }

    json = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarSalesOrderExcel",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}

function ExportarSalesOrderPdf()
{
    var path = $("#path").val();

    var json = $("#hdJsonTable").val();

    if (json == '')
    {
        var table = $('#tbDatosReportes').tableToJSON({});
        $("#hdJsonTable").val(JSON.stringify(table));
        json = $("#hdJsonTable").val();
    }

    json = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarSalesOrderPdf",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        async: true,
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}



//$(document).keypress(function (e) {
//    if (e.which == 13) {
//        alert('You pressed enter!');
//    } else {
//        alert(e.which);
//    }
//});
