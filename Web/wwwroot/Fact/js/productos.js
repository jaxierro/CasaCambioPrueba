$( document ).ready(function () {

    $("#btnColumnas").click(function () {
        columnas();
    });   

    $("#btnGuardarColumnas").click(function () {

        var json = getJSONColumnas();
        $("#hdJsonColumnas").val(json);

        var idMsjEje = $("#idMsjEje").val();

        $.ajax({
            url: "/Productos/GuardarColumnas",
            dataType: "html",
            data: { 'hdJsonColumnas': $("#hdJsonColumnas").val() },
            type: "GET",
            success: function (data) {
                $("#zonaTabla").html(data);
                $(function () {
                    $('.datatable').DataTable({
                        select: true,
                        responsive: true,
                        initComplete: function () {
                            $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                        }   
                    });
                });
                $("#successspan").html(idMsjEje);
                $("#success").css('display', 'block');
                setTimeout(function () {
                    $("#success").css('display', 'none');
                }, 3000);
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
                $('#ModalColumnas').modal('hide');
            }
        });

    });   

    $("#btnVerImagenes").click(function ()
    {
        verimagenes();
    });  

    $("#btnEliminar").click(function ()
    {
        var idMsjVal = $("#idMsjSelected").val();
        var id = $("#tbody .selected").attr('title');

        if (id != null)
        {
            $("#AsqModalDelete").modal('show');
        } 
        else
        {
            $.bootstrapGrowl(idMsjVal,
                {
                    type: 'danger',
                    delay: 2000,
                });
        }

    });  

    $("#btnEditar").click(function ()
    {
        var idMsjVal = $("#idMsjSelected").val();
        var id = $("#tbody .selected").attr('title');

        if (id != null)
        {
            editar(id);
        }
        else
        {
            $.bootstrapGrowl(idMsjVal,
                {
                    type: 'danger',
                    delay: 2000,
                });
        }
    });  

    $("#btnConfirmarDelete").click(function () {

        var idRegSel = $('#id').val();
        var idMsjEje = $("#idMsjEje").val();
        var idMsjRem = $("#idMsjRem").val();

            $.ajax({
                url: "/Productos/Delete",
                dataType: "html",
                data: { "id": idRegSel },
                type: "POST",
                success: function (data) {

                    $('#AsqModalDelete').modal('hide');
                    $("#zonaTabla").html(data);
                   
                    $('#tbDatosProductos').DataTable({
                        select: true,
                        responsive: true,
                        initComplete: function () {
                            $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                        }   
                    });
                    
                    $("#successspan").html(idMsjRem);
                    $("#success").css('display', 'block');
                    setTimeout(function () {
                        $("#success").css('display', 'none');
                    }, 3000);
                    $.bootstrapGrowl(idMsjEje,
                        {
                            type: 'success',
                            delay: 2000,
                        });
                    
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
    

    $("#btnConfirmar").click(function () {

        var path   = $("#path").val();
        var id     = $("#producto_id").val();
        
        var producto_nombre      = $("#producto_nombre").val();
        var producto_descripcion = $("#producto_descripcion").val();
        var costo_unitario       = $("#costo_unitario").val();
        var producto_cualidad    = $("#producto_cualidad").val();
        var producto_estado      = $("#producto_estado").val();
        var producto_impuesto    = $("#producto_impuesto").val();
        
        var idMsjRegis        = $("#idMsjRegis").val();
        var idMsjNom          = $("#idMsjNom").val();
        var idMsjDes          = $("#idMsjDes").val();
        var idMsjEje          = $("#idMsjEje").val();
        var idMsjActuali      = $("#idMsjActuali").val();
        var idMsjGeneral      = $("#idMsjGeneral").val();
        var idMsjProdCual     = $("#idMsjProdCual").val();
        var idMsjProdEst      = $("#idMsjProdEst").val();
        var idMsjImpuestoReq  = $("#idMsjImpuestoReq").val();

        

        if (producto_nombre == '')
        {
            $.bootstrapGrowl(idMsjNom,
                {
                    type: 'warning',
                    delay: 2000,
                });
            $("#producto_nombre").focus();
            return;
        }

        if (producto_descripcion == '')
        {
            $.bootstrapGrowl(idMsjDes,
                {
                    type: 'warning',
                    delay: 2000,
                });

            $("#producto_descripcion").focus();
            return;
        }


        if (costo_unitario == '') {
            $.bootstrapGrowl($("#idMsjGeneral").val(),
                {
                    type: 'warning',
 ﻿$( document ).ready(function () {

    $("#btnColumnas").click(function () {
        columnas();
    });   

    $("#btnGuardarColumnas").click(function () {

        var json = getJSONColumnas();
        $("#hdJsonColumnas").val(json);

        var idMsjEje = $("#idMsjEje").val();

        $.ajax({
            url: "/Productos/GuardarColumnas",
            dataType: "html",
            data: { 'hdJsonColumnas': $("#hdJsonColumnas").val() },
            type: "GET",
            success: function (data) {
                $("#zonaTabla").html(data);
                $(function () {
                    $('.datatable').DataTable({
                        select: true,
                        responsive: true,
                        initComplete: function () {
                            $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                        }   
                    });
                });
                $("#successspan").html(idMsjEje);
                $("#success").css('display', 'block');
                setTimeout(function () {
                    $("#success").css('display', 'none');
                }, 3000);
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
                $('#ModalColumnas').modal('hide');
            }
        });

    });   

    $("#btnVerImagenes").click(function ()
    {
        verimagenes();
    });  

    $("#btnEliminar").click(function ()
    {
        var idMsjVal = $("#idMsjSelected").val();
        var id = $("#tbody .selected").attr('title');

        if (id != null)
        {
            $("#AsqModalDelete").modal('show');
        } 
        else
        {
            $.bootstrapGrowl(idMsjVal,
                {
                    type: 'danger',
                    delay: 2000,
                });
        }

    });  

    $("#btnEditar").click(function ()
    {
        var idMsjVal = $("#idMsjSelected").val();
        var id = $("#tbody .selected").attr('title');

        if (id != null)
        {
            editar(id);
        }
        else
        {
            $.bootstrapGrowl(idMsjVal,
                {
                    type: 'danger',
                    delay: 2000,
                });
        }
    });  

    $("#btnConfirmarDelete").click(function () {

        var idRegSel = $('#id').val();
        var idMsjEje = $("#idMsjEje").val();
        var idMsjRem = $("#idMsjRem").val();

            $.ajax({
                url: "/Productos/Delete",
                dataType: "html",
                data: { "id": idRegSel },
                type: "POST",
                success: function (data) {

                    $('#AsqModalDelete').modal('hide');
                    $("#zonaTabla").html(data);
                   
                    $('#tbDatosProductos').DataTable({
                        select: true,
                        responsive: true,
                        initComplete: function () {
                            $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                        }   
                    });
                    
                    $("#successspan").html(idMsjRem);
                    $("#success").css('display', 'block');
                    setTimeout(function () {
                        $("#success").css('display', 'none');
                    }, 3000);
                    $.bootstrapGrowl(idMsjEje,
                        {
                            type: 'success',
                            delay: 2000,
                        });
                    
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
    

    $("#btnConfirmar").click(function () {

        var path   = $("#path").val();
        var id     = $("#producto_id").val();
        
        var producto_nombre      = $("#producto_nombre").val();
        var producto_descripcion = $("#producto_descripcion").val();
        var costo_unitario       = $("#costo_unitario").val();
        var producto_cualidad    = $("#producto_cualidad").val();
        var producto_estado      = $("#producto_estado").val();
        var producto_impuesto    = $("#producto_impuesto").val();
        
        var idMsjRegis        = $("#idMsjRegis").val();
        var idMsjNom          = $("#idMsjNom").val();
        var idMsjDes          = $("#idMsjDes").val();
        var idMsjEje          = $("#idMsjEje").val();
        var idMsjActuali      = $("#idMsjActuali").val();
        var idMsjGeneral      = $("#idMsjGeneral").val();
        var idMsjProdCual     = $("#idMsjProdCual").val();
        var idMsjProdEst      = $("#idMsjProdEst").val();
        var idMsjImpuestoReq  = $("#idMsjImpuestoReq").val();

        

        if (producto_nombre == '')
        {
            $.bootstrapGrowl(idMsjNom,
                {
                    type: 'warning',
                    delay: 2000,
                });
            $("#producto_nombre").focus();
            return;
        }

        if (producto_descripcion == '')
        {
            $.bootstrapGrowl(idMsjDes,
                {
                    type: 'warning',
                    delay: 2000,
                });

            $("#producto_descripcion").focus();
            return;
        }


        if (costo_unitario == '') {
            $.bootstrapGrowl($("#idMsjGeneral").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });

            $("#costo_unitario").focus();
            return;
        }

        if (producto_cualidad == '') {
            $.bootstrapGrowl(idMsjProdCual,
                {
                    type: 'warning',
                    delay: 2000,
                });
            $("#producto_cualidad").focus();
            return;
        }

        if (producto_impuesto == ''  || producto_impuesto == 0) {
            $.bootstrapGrowl(idMsjImpuestoReq,
                {
                    type: 'warning',
                    delay: 2000,
                });
            $("#producto_impuesto").focus();
            return;
        }

        if (producto_estado == '') {
            $.bootstrapGrowl(idMsjProdEst,
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (json == '') {
            $.bootstrapGrowl($("#idMsjUnid").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        var json = getJSONUnidades();
        $("#TbMedidas").val(json);

        if (id == 0) {
            $.ajax({
                url: "/Productos/Create",
                cache: false,
                dataType: "html",
                data: $("#formagregar").serialize(),
                type: "POST",
                success: function (data) {
                    if (data != 'ERROR')
                    {
                        // $("#zonaTabla").html(data);
                        // $(function () {
                        //     $('.datatable').DataTable({
                        //         select: true,
                        //         responsive: true,
                        //         destroy: true,
                        //         searching: false,
                        //         initComplete: function () {
                        //             $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                        //         }
                        //     });
                        // });

                        $("#successspan").html(idMsjRegis);
                        $("#success").css('display', 'block');
                        $.bootstrapGrowl(idMsjEje,
                            {
                                type: 'success',
                                delay: 2000,
                            });
                        setTimeout(function () {
                            $("#success").css('display', 'none');
                            window.location.href = path + 'Productos/List'
                        }, 3000);
                      
                        /*$('#FormModal').modal('hide');
                        $('#btnNuevo, #btnColumnas').hide();
                        $('#AreaExportar').css({ "visibility": "hidden" });*/

                    }
                    else
                    {
                        $.bootstrapGrowl(idMsjGeneral,
                            {
                                type: 'danger',
                                delay: 2000,
                        });
                    }
                }
            });
        } else {

            $.ajax({
                url: "/Productos/Edit",
                cache: false,
                dataType: "html",
                data: $("#formagregar").serialize(),
                type: "POST",
                success: function (data) {
                    if (data != "ERROR") {
                        //$("#zonaTabla").html(data);
                        // $(function () {
                        //     $('.datatable').DataTable({
                        //         select: true,
                        //         responsive: true,
                        //         destroy: true,
                        //         searching: false,
                        //         initComplete: function () {
                        //             $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                        //         }   
                        //     });
                        // });

                        $("#successspan").html(idMsjActuali);
                        $("#success").css('display', 'block');
                        $.bootstrapGrowl(idMsjEje,
                            {
                                type: 'success',
                                delay: 2000,
                            });
                        setTimeout(function () {
                            $("#success").css('display', 'none');
                            window.location.href = path + 'Productos/List'
                        }, 3000);
        
                        /*$('#FormModal').modal('hide');
                        $('#btnNuevo, #btnColumnas').hide();
                        $('#btnVerImagenes').css({ "visibility": "hidden" });
                        $('#btnEditar').css({ "visibility": "hidden" });
                        $('#AreaExportar').css({ "visibility": "hidden" });*/
                    }
                    else
                    {
                        $.bootstrapGrowl(idMsjGeneral,
                            {
                                type: 'danger',
                                delay: 2000,
                            });
                    }
                },
                error: function (Response) {
                    $.bootstrapGrowl(idMsjGeneral,
                        {
                            type: 'danger',
                            delay: 2000,
                        });
                }
            });
        }
    });


    function getJSONColumnas()
    {
        var json = ' [{ ';
        var countCol = 1;
        var m = '';
        var this_row;

        $("#tbColumnas tr:gt(0)").each(function () {
            this_row = $(this);
            countCol = 1;
            $(this_row).find('td').each(function () {
                var this_col = $(this);

                if (countCol == 1) {
                    m = $(this_col).eq(0).html();
                    json += ' "nombre_columna":"' + m + '",';
                } else {
                    if (countCol == 2) {
                        m = $(this_col).find('input');
                        if (m.is(":checked")) {
                            json += ' "activo":"' + '1' + '",';
                        } else {
                            json += ' "activo":"' + '0' + '",';
                        }
                        
                    } else {
                        if (countCol == 3) {
                            m = $(this_col).find('input');
                            if (m.is(":checked")) {
                                json += ' "mostrar":"' + '1' + '",';
                            } else {
                                json += ' "mostrar":"' + '0' + '",';
                            }
                        }
                    }
                }
                countCol++;

            });

            json = json.substring(0, json.length - 1);
            json += '},{'
        });

        json = json.substring(0, json.length - 2);
        json += ' ] ';
        //return "{ \"root\": { \"data\":" + json + "}";
        return json;
    }

    function getJSONUnidades()
    {
        var json = ' [{ ';
        var countCol = 1;
        var m = '';
        var this_row;

        $("#tbUnidades tr:gt(0)").each(function () {
            this_row = $(this);
            countCol = 1;
            $(this_row).find('td').each(function () {
                var this_col = $(this);

                if (countCol == 1) {
                    m = $(this_col).find('select').val();
                    json += ' "medidas":"' + m + '",';
                } else {
                    if (countCol == 2) {
                        m = $(this_col).find('input').val();
                        json += ' "unidades":"' + m + '",';
                    } else {
                        m = $(this_col).find('input').val();
                        if (m != null) {
                            json += '"precio_' + $(this_col).find('input').attr("id") + '":"' + m + '",';
                        }
                    }
                }
                countCol++;

            });
            json = json.substring(0, json.length - 1);
            json += '},{'
        });
        json = json.substring(0, json.length - 2);
        json += ' ]} ';
        return "{ \"root\": { \"data\":" + json + "}";
    }

});

function editar(id)
{
    $('#id').val(id);
    window.location.href = "/Productos/Edit/" + id;
}

function verimagenes()
{
    var idMsjSelected = $("#idMsjSelected").val();
    var id = $("#tbody .selected").attr('title');

    if (id == 0)
    {
        $.bootstrapGrowl(idMsjSelected,
            {
                type: 'danger',
                delay: 2000,
            });
        return;
    }

    window.location.href = "/Productos/Imagenes/" + id;

}

function columnas() {

    $.ajax({
        url: "/Productos/Columnas",
        cache: false,
        dataType: "html",
        type: "GET",
        success: function (data) {
            $('#bodyColumnas').html(data);
            $('#ModalColumnas').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });
}

function eliminar(id) {

    $('#id').val(id);

    $.ajax({
        url: "/Productos/Delete",
        cache: false,
        dataType: "html",
        data: { 'id': id },
        type: "GET",
        success: function (data) {
            $("#zonaTabla").html(data);
            $(function () {
                $('.datatable').DataTable({
                    select: true,
                    responsive: true,
                    initComplete: function () {
                        $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                    }   
                });
            });
            $("#successspan").html(idMsjActuali);
            $("#success").css('display', 'block');
            setTimeout(function () {
                $("#success").css('display', 'none');
            }, 3000);
            $.bootstrapGrowl(idMsjEje,
                {
                    type: 'success',
                    delay: 2000,
                });
            $('#AsqModalDelete').modal('hide');
        }
    });

}

function obtenerpreciosObj()
{
    var strTd = "";

    $.ajax({
        url: "/Productos/GetPrecios",
        dataType: "json",
        type: 'post',
        success: function (data)
        {
            var strTd = "";
            data.forEach(function (clase) {
                s = JSON.stringify(clase);
                items = JSON.parse(s);
                strTd += "<td><input type='number' id='" + items.id_precio + "' name='" + items.id_precio + "[]' class='form-control' /></td>"
                
            });
            $("#auxtd").val(strTd)
        },
        async: false // <- this turns it into synchronous
    });

    return $("#auxtd").val();
}

function agregarprecio()
{
    $.ajax({
        url: "/Productos/GetItemsUnidades",
        dataType: "json",
        type: 'post',
        success: function (data) {
            var selUnidades = "<select id='medida' name='medida[]' class='form-control select2'>";
            var opt = "";
            var precios = "";

            data.forEach(function (clase) {
                s = JSON.stringify(clase);
                items = JSON.parse(s);
                opt = opt + '<option value=' + items.value + '>' + items.text + '</option>'
            });

            selUnidades += opt + "</select>"
            precios = obtenerpreciosObj();

            var tr = "<tr id='trunidad'><td>" + selUnidades + "</td>";
            tr += "<td><input type='number' id='unidad' name='unidad[]' class='form-control' /></td>"
            tr += precios
            tr += "<td width='13%'><a class='btn btn-default' href='#' id='eliminar' onclick='eliminarunidad(this);'><i class='fa fa-remove'></i> </a> <a style='cursor: move' class='btn btn-default' href='#' data-toggle='tooltip'"
            tr += " title='Mover' data-original-title='Mover' ><i class='fa fa-arrows-v'></i> </a>  </td></tr>"
            $("#unidadescontainer").append(tr);
        }
    });
}

function eliminarunidad(tr) {
    $(tr).parent().parent().remove();
    return false;
}

function SetImage(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        switch (input.id) {
            case 'input-image1':
                reader.onload = fileOnload1;
                break;
            case 'input-image2':
                reader.onload = fileOnload2;
                break;
            case 'input-image3':
                reader.onload = fileOnload3;
                break;
            case 'input-image4':
                reader.onload = fileOnload4;
                break;
            case 'input-image5':
                reader.onload = fileOnload5;
                break;
            case 'input-image6':
                reader.onload = fileOnload6;
                break;
            case 'input-image7':
                reader.onload = fileOnload7;
                break;
            case 'input-image8':
                reader.onload = fileOnload8;
                break;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function fileOnload1(e) {
    var posimages = $('#posimages').val();
    var result = e.target.result;
    $('#img1').attr("src", result);
    posimages = posimages.replace(/1:0/, '1:1');
    $('#posimages').val(posimages);
}

function fileOnload2(e) {
    var posimages = $('#posimages').val();
    var result = e.target.result;
    $('#img2').attr("src", result);
    posimages = posimages.replace(/2:0/, '2:1');
    $('#posimages').val(posimages);
}

function fileOnload3(e) {
    var posimages = $('#posimages').val();
    var result = e.target.result;
    $('#img3').attr("src", result);
    posimages = posimages.replace(/3:0/, '3:1');
    $('#posimages').val(posimages);
}

function fileOnload4(e) {
    var posimages = $('#posimages').val();
    var result = e.target.result;
    $('#img4').attr("src", result);
    posimages = posimages.replace(/4:0/, '4:1');
    $('#posimages').val(posimages);
}

function fileOnload5(e) {
    var posimages = $('#posimages').val();
    var result = e.target.result;
    $('#img5').attr("src", result);
    posimages = posimages.replace(/5:0/, '5:1');
    $('#posimages').val(posimages);
}

function fileOnload6(e) {
    var posimages = $('#posimages').val();
    var result = e.target.result;
    $('#img6').attr("src", result);
    posimages = posimages.replace(/6:0/, '6:1');
    $('#posimages').val(posimages);
}

function fileOnload7(e) {
    var posimages = $('#posimages').val();
    var result = e.target.result;
    $('#img7').attr("src", result);
    posimages = posimages.replace(/7:0/, '7:1');
    $('#posimages').val(posimages);
}

function fileOnload8(e) {
    var posimages = $('#posimages').val();
    var result = e.target.result;
    $('#img8').attr("src", result);
    posimages = posimages.replace(/8:0/, '8:1');
    $('#posimages').val(posimages);
}


function EliminarFoto()
{
    var ruta = '/files/fotosproductos/SinFotos.jpg';

    var producto_id = $('#prodid').val();
    var img         = $('#imgSelForRemove').val();
    var nombre_foto = document.getElementById(img).src;
   
    $.ajax({
        url: "/Productos/RemovePhoto",
        dataType: "html",
        data: { 'producto_id': producto_id, 'nombre_foto': nombre_foto },
        type: 'POST',
        success: function (data) {

            if (data == "SI")
            {
                $('#' + img).attr('src', ruta);
            }
        }
    });
};

function CleanSrc(id)
{
    $('#imgSelForRemove').val(id);
    EliminarFoto();
}

function CloseModalRemoveProduct()
{
    $('#AsqModalRemoveProduct').modal('hide');
}

function UpdateListCountry(obj)
{
    $("#ListaPaisesCobertura").empty()
    $('#ListaPaises > option:selected').each(function() {
        $("#ListaPaisesCobertura").append("<option value='" + $(this).val() + "'>" + $(this).text() + "</option>");
    });
}

function SetConfigShipping()
{
    
    var producto_id = $("#producto_id").val();
    var country_id = $("#ListaPaisesCobertura").val();

    $.ajax({
        url: "/Productos/GetConfigShipping",
        dataType: "json",
        data: { 'producto_id': producto_id, 'country_id': country_id },
        type: 'POST',
        success: function (data) {

            if (data != null) {

                s = JSON.stringify(data);
                items = JSON.parse(s);

                $("#cost_unidad1").val(items.cost_unit1.split(":")[0]);
                $("#cost_unidad2").val(items.cost_unit1.split(":")[1]);

                $("#cost_unitme3").val(items.cost_unitme.split(":")[0]);
                $("#cost_unidad3V").val(items.cost_unitme.split(":")[1]);


                $("#cost_unitma").val(items.cost_unitma.split(":")[0]);
                $("#cost_unitmaV").val(items.cost_unitma.split(":")[1]);

            }
            else
            {
                $("#cost_unidad1").val("");
                $("#cost_unidad2").val("");

                $("#cost_unitme3").val("");
                $("#cost_unidad3V").val("");


                $("#cost_unitma").val("");
                $("#cost_unitmaV").val("");
            }
        }
    });
}


function BuscarIdCountry(CodLug)
{
    $.ajax({
        url: "/Productos/SearchIdCountry",
        dataType: "html",
        data: { 'CodLug': CodLug },
        type: 'POST',
        success: function (data) {
            $("#CountryId").val(data);
        }
    });
}

function BuildInfoCountryShipping()
{
    var producto_id = $("#producto_id").val();
    var country_id  = $("#ListaPaisesCobertura").val();
    var cost_unit1  = $("#cost_unidad1").val() + ":" + $("#cost_unidad2").val();
    var cost_unitme = $("#cost_unitme3").val() + ":" + $("#cost_unidad3V").val();
    var cost_unitma = $("#cost_unitma").val()  + ":" + $("#cost_unitmaV").val();
    var aply_table  = $('input[name="OptAply"]:checked').val();

    $.ajax({
        url: "/Productos/SaveInfoCountryShipping",
        dataType: "html",
        //data: JSON.stringify(model),
        data: {
            'producto_id': producto_id, 'country_id': country_id, 'cost_unit1': cost_unit1,
            'cost_unitme': cost_unitme, 'cost_unitma': cost_unitma, 'aply_table': aply_table
        },
        type: 'POST',
        success: function (data) {
            
            if (data != null) return;
        }
    });
}

function FiltrarProductos()
{
    var params =
    {
        'producto_codigo_barra': $('#producto_codigo_barra').val(),
        'id_linea': $('#id_linea').val(),
        'id_marca': $('#id_marca').val(),
        'id_familia': $('#id_familia').val(),
        'local_id': $('#local_id').val(),
        'producto_nombre': $('#producto_nombre').val(),
        'nombre_linea': $('#nombre_linea').val(),
        'nombre_marca': $('#nombre_marca').val(),
        'nombre_familia': $('#nombre_familia').val(),
        'fechaBetweenFrom': $('#fechaBetweenFrom').val(),
        'fechaBetweenTo': $('#fechaBetweenTo').val(),
        'fechaEqual': $('#fechaBetweenFrom').val(),
        'fechaMayor': $('#fechaBetweenFrom').val(),
        'fechaMenor': $('#fechaBetweenFrom').val(),
        'opeFecha': $('#opeFecha').val(),
    };

    $.ajax({
        url: "/Productos/FiltrarProductos",
        cache: false,
        dataType: "html",
        data: params,
        type: "POST",
        success: function (data) {
           
            $("#zonaTabla").html(data);
            var table = $('#tbDatosProductos').tableToJSON({});
            $("#hdJsonTable").val(JSON.stringify(table));
            $('.datatable').DataTable({
                select: true,
                responsive: true,
                destroy: true,
                searching: false,
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
    });
}

function ContarCaracter() {
    $('#lblCantCaracter').html('<h2>' + $('#producto_descripcion').val().length + '</h2>');
}

function ActiveProgress()
{
    n=1;
    x = setInterval(function(){
		$("#progress").css({ width: parseInt(n*2).toString() + "%" });
        $("#label").html(parseInt(n*2).toString() + "%");
		n++;

        if (n>=50){
            clearInterval(x);
        }

	},1000);
}

function VerUnidadesCostos()
{
    $('#ModalVerUnidades').modal({ show: true, keyboard: false, backdrop: 'static' });
}


function CicloJson()
{
    var arrJsonConfig = $("#TbConfigProdShipp").val();
    var paisSelected  = $("#ListaPaisesCobertura").val();

    items = JSON.parse(arrJsonConfig);

    for (var i = 0; i < items.length; i++) {
        BuscarIdCountry(paisSelected);
        var IdLug = $("#CountryId").val();
        if (IdLug == items[i].country_id) {
            //alert(items[i].country_id);
        }
    }
}

