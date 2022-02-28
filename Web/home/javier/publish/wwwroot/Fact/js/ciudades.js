$( document ).ready(function () {

    var path = $("#path").val();

    $("#btnNuevo").click(function ()
    {
        $("#ciudad_nombre").val('');
        $("#estado_nombre_id").val('');
        $("#ciudad_id").val(0);

        $.ajax({
            url: path + "Ciudades/Create",
            cache: false,
            dataType: "html",
            type: "GET",
            success: function (data) {
                $('#bodyForm').html(data);
                $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
            }
        });

    });

    $("#btnConfirmarDelete").click(function () {

        var idRegSel = $('#id').val();
        var idMsjEje = $("#idMsjEje").val();
        var idMsjRem = $("#idMsjRem").val()

            $.ajax({
                url: path + "Ciudades/Delete",
                dataType: "html",
                data: { "id": idRegSel },
                type: "POST",
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
                    $('#AsqModalDelete').modal('hide');
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

        var id            = $("#ciudad_id").val();
        var estado_nombre = $("#ciudad_nombre").val();
        var estado_id       = $("#estado_id").val();
        

        var idMsjRegis   = $("#idMsjRegis").val();
        var idMsjEje     = $("#idMsjEje").val();
        var idMsjActuali = $("#idMsjActuali").val();

        if (estado_nombre == '')
        {
            $.bootstrapGrowl($("#idMsjNom").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (estado_id == '') {
            $.bootstrapGrowl($("#idMsjNomPais").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (id == 0) {
            $.ajax({
                url: path + "Ciudades/Create",
                cache: false,
                dataType: "html",
                data: $("#formagregar").serialize(),
                type: "POST",
                success: function (data) {
                    if (data != 'ERROR')
                    {
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
                        $("#successspan").html(idMsjRegis);
                        $("#success").css('display', 'block');
                        setTimeout(function () {
                            $("#success").css('display', 'none');
                        }, 3000);
                        $.bootstrapGrowl(idMsjEje,
                            {
                                type: 'success',
                                delay: 2000,
                            });
                        $('#FormModal').modal('hide');
                    }

                }
            });
        } else {

            $.ajax({
                url: path + "Ciudades/Edit",
                cache: false,
                dataType: "html",
                data: $("#formagregar").serialize(),
                type: "POST",
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
                    $('#FormModal').modal('hide');
                }
            });
        }

    });
});

function editar(id)
{
    var path = $("#path").val();
    $('#id').val(id);

    $.ajax({
        url: path + "Ciudades/Edit",
        cache: false,
        dataType: "html",
        data: {'id': id},
        type: "GET",
        success: function (data) {
            $('#bodyForm').html(data);
            $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });
}

function eliminar(id) {
    $('#id').val(id);
    $('#AsqModalDelete').modal({ show: true, keyboard: false, backdrop: 'static' });
}

function LoadEstados(obj)
{
    var pais_id = $(obj).va﻿$( document ).ready(function () {

    var path = $("#path").val();

    $("#btnNuevo").click(function ()
    {
        $("#ciudad_nombre").val('');
        $("#estado_nombre_id").val('');
        $("#ciudad_id").val(0);

        $.ajax({
            url: path + "Ciudades/Create",
            cache: false,
            dataType: "html",
            type: "GET",
            success: function (data) {
                $('#bodyForm').html(data);
                $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
            }
        });

    });

    $("#btnConfirmarDelete").click(function () {

        var idRegSel = $('#id').val();
        var idMsjEje = $("#idMsjEje").val();
        var idMsjRem = $("#idMsjRem").val()

            $.ajax({
                url: path + "Ciudades/Delete",
                dataType: "html",
                data: { "id": idRegSel },
                type: "POST",
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
                    $('#AsqModalDelete').modal('hide');
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

        var id            = $("#ciudad_id").val();
        var estado_nombre = $("#ciudad_nombre").val();
        var estado_id       = $("#estado_id").val();
        

        var idMsjRegis   = $("#idMsjRegis").val();
        var idMsjEje     = $("#idMsjEje").val();
        var idMsjActuali = $("#idMsjActuali").val();

        if (estado_nombre == '')
        {
            $.bootstrapGrowl($("#idMsjNom").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (estado_id == '') {
            $.bootstrapGrowl($("#idMsjNomPais").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (id == 0) {
            $.ajax({
                url: path + "Ciudades/Create",
                cache: false,
                dataType: "html",
                data: $("#formagregar").serialize(),
                type: "POST",
                success: function (data) {
                    if (data != 'ERROR')
                    {
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
                        $("#successspan").html(idMsjRegis);
                        $("#success").css('display', 'block');
                        setTimeout(function () {
                            $("#success").css('display', 'none');
                        }, 3000);
                        $.bootstrapGrowl(idMsjEje,
                            {
                                type: 'success',
                                delay: 2000,
                            });
                        $('#FormModal').modal('hide');
                    }

                }
            });
        } else {

            $.ajax({
                url: path + "Ciudades/Edit",
                cache: false,
                dataType: "html",
                data: $("#formagregar").serialize(),
                type: "POST",
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
                    $('#FormModal').modal('hide');
                }
            });
        }

    });
});

function editar(id)
{
    var path = $("#path").val();
    $('#id').val(id);

    $.ajax({
        url: path + "Ciudades/Edit",
        cache: false,
        dataType: "html",
        data: {'id': id},
        type: "GET",
        success: function (data) {
            $('#bodyForm').html(data);
            $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });
}

function eliminar(id) {
    $('#id').val(id);
    $('#AsqModalDelete').modal({ show: true, keyboard: false, backdrop: 'static' });
}

function LoadEstados(obj)
{
    var pais_id = $(obj).val();
    var path    = $("#path").val();

    $.ajax({
        url: path + "Ciudades/LoadItemsEstadosByPais",
        cache: false,
        dataType: "json",
        data: { 'pais_id': pais_id },
        type: "GET",
        success: function (data) {
            $('#estado_id').html('');
            data.forEach(function (object) {

                s = JSON.stringify(object);
                opt = JSON.parse(s);
                
                item = "<option value='" + opt.value + "'>" + opt.text + "</option>"
                $('#estado_id').append(item);
            });
        }
    });

}

