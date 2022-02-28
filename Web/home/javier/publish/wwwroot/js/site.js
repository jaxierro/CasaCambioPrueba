// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.



function OpenAddCart(id_p, id_u, name_prod)
{
    $.ajax({
        url: "/EbqtoMain/OpenAddCart",
        dataType: "html",
        data: { "prod_id": id_p, "uni_id": id_u },
        type: "GET",
        success: function (data) {

            $('#bodyAddCarrito').html(data);
            $('#titleNameProd').html(name_prod);
            $('#FormModalAddCarrito').modal({ show: true, keyboard: false, backdrop: 'static' });
            
        }
    });
    
}

function EditAddCart(id_p, id_uni, name_prod)
{

    var codeGuid = $("#codeGuid").val();

    $.ajax({
        url: "/EbqtoMain/EditAddCart",
        dataType: "html",
        data: { "prod_id": id_p, "uni_id": id_uni, "codeGuid": codeGuid  },
        type: "GET",
        success: func﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.



function OpenAddCart(id_p, id_u, name_prod)
{
    $.ajax({
        url: "/EbqtoMain/OpenAddCart",
        dataType: "html",
        data: { "prod_id": id_p, "uni_id": id_u },
        type: "GET",
        success: function (data) {

            $('#bodyAddCarrito').html(data);
            $('#titleNameProd').html(name_prod);
            $('#FormModalAddCarrito').modal({ show: true, keyboard: false, backdrop: 'static' });
            
        }
    });
    
}

function EditAddCart(id_p, id_uni, name_prod)
{

    var codeGuid = $("#codeGuid").val();

    $.ajax({
        url: "/EbqtoMain/EditAddCart",
        dataType: "html",
        data: { "prod_id": id_p, "uni_id": id_uni, "codeGuid": codeGuid  },
        type: "GET",
        success: function (data) {
            $('#bodyAddCarrito').html(data);
            $('#titleNameProd').html(name_prod);
            $('#FormModalAddCarrito').modal({ show: true, keyboard: false, backdrop: 'static' });
                   
        }
    });
}

function AddCart(id_p, modo)
{
    if (modo == 1) action = "/EbqtoMain/AddCart";
    else action           = "/EbqtoMain/EditCart";

    $.ajax({
        url: action,
        dataType: "json",
        data: $("#formagregar").serialize(),
        type: "POST",
        success: function (data) {

            t = JSON.stringify(data);
            n = JSON.parse(t);

            $('#ModeCartOff_' + id_p).removeClass("hidden");
            $('#ModeCartOpen_' + id_p).addClass("hidden");
            $('#FormModalAddCarrito').modal('hide');
            $('#Cant_' + id_p).html($('#Quality').val());
            $('#codeGuid').val(n.idUserAsp); 

            if ($("#eyesopt").css('display') == 'none')
            {
                var element = $("#iracajaa");
                if (typeof (element) != 'undefined' && element != null)
                {
                    console.log(n.idUserAsp);
                    element.attr("href", "/ShoppingRoom/" + n.idUserAsp);
                    console.log(element.href);
                    //vercarritoa.href = '/ShoppingRoom/' + n.idUserAsp;
                }

                $("#eyesopt").css('display', 'block');     
            }
        }
    });
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}

function RemoveItemCart(id_p, id_uni, companyId, codeGuid)
{
    CartObject = function (producto_id, IdUserAsp, companyId, Quality, SubTotal, Price, id_unidad)
    {
        this.producto_id = id_p;
        this.id_unidad   = id_uni;
        this.companyId   = companyId;
        this.idUserAsp   = codeGuid;
    }

    var CartStoreUsers = new CartObject(id_p, codeGuid, companyId, 0, 0, 0, id_uni);
    //var model          = JSON.stringify(CartStoreUsers);

    $.ajax({
        url: "/EbqtoMain/RemoveItemCart",
        dataType: "json",
        data: { "model": CartStoreUsers},
        type: "POST",
        success: function (data) {

            $('#ModeCartOff_' + id_p).addClass("hidden");
            $('#ModeCartOpen_' + id_p).removeClass("hidden");

              $.ajax({
                    url: "/EbqtoMain/GetCartCount",
                    dataType: "json",
                    data: { "model": CartStoreUsers},
                    type: "POST",
                    success: function (data) {
                                 
                        if (data == "0"){
                            $("#eyesopt").css('visibility', 'hidden');
                        }
                    }
             }); 
        }
    });
}

function  ValidarCodAccesoComentarios(code)
{
    var code = $("#txtCodAcceso").val();
     $.ajax({
        url: "/Details/ValidarCodAcceso",
        dataType: "json",
        data: { "code": code},
        type: "POST",
        success: function (data) {
            
            s     = JSON.stringify(data);
            items = JSON.parse(s);
            
            $.ajax({
                url: "/Details/SearchComents",
                dataType: "json",
                data: { "coment_id": items.id_ref_table },
                type: "POST",
                success: function (result) {
        
                    r      = JSON.stringify(result);
                    coment = JSON.parse(r);
                    
                    $("#txtProductoId").val(coment.producto_id);
                    $("#coment_id").val(coment.coment_id);
                    $("#unidad_id").val(coment.unidad_id);
                    $("#email_user").val(coment.email_user);
                    $("#lblUsuario").html(coment.nombre_usuario);
                    $("#lblPregunta").html(coment.texto_pregrep);
                    $("#ResComentFull").prop( "disabled", false );
                    $("#submitcoment").prop( "disabled", false );
                    $("#submitrequest").prop( "disabled", false );
                }
            });

        }
    });
}

function  EnviarRepuesta()
{
    var txtProductoId = $("#txtProductoId").val();
    var coment_id     = $("#coment_id").val();
    var request       = $("#ResComentFull").val();
    var email_user    = $("#email_user").val();
    var unidad_id     = $("#unidad_id").val();

    if (request == '')
    {
        $("#ResComentFull").focus();
        return;
    }

    $.ajax({
        url: "/Details/SendRequest",
        dataType: "json",
        data: { 
                "request": request, "coment_id": coment_id, 
                "email_user": email_user, "produ_id": txtProductoId,
                "unidad_id" : unidad_id
              },
        type: "POST",
        success: function (result) {
            location.href = "/Details/DetailsView?prod_id=" + txtProductoId + "&uni_id=" + unidad_id;
        }
    });
}

function OpenAddRequest()
{
    $('#FormModalAddRequest').modal({ show: true, keyboard: false, backdrop: 'static' });
}
