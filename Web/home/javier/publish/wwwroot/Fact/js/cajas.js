$(document).ready(function () {

    var path = $("#path").val();

    $("#btnNuevo").click(function () {

        var NumCaja    = $("#NumCaja").val('');
        var Descricion = $("#Descripcion").val('');

        if (NumCaja == '') {
            $.bootstrapGrowl($("#idMsjNom").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (Descricion == '') {
            $.bootstrapGrowl($("#idMsjDes").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        $.ajax({
            url: path + "Cajas/Nuevo",
            dataType: "html",
            type: "POST",
            success: function (data) {
                $('#bodyForm').html(data);
                $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
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

    $("#btnConfirmarDelete").click(function () {

        var idRegSel = $("#id").val();
        var idMsjEje = $("#idMsjEje").val();
        var idMsjRem = $("#idMsjRem").val()

        $.ajax({
            url: path + "Cajas/Delete",
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

        var id   = $("#idCaja").val();
        var caja = $("#NumCaja").val();

        var idMsjRegis = $("#idMsjRegis").val();
        var idMsjEje = $("#idMsjEje").val();
        var idMsjActuali = $("#idMsjActuali").val();

        if (caja == '') {
            $.bootstrapGrowl($("#idMsjNom").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (id == 0) {
            $.ajax({
                url: path + "Cajas/Create",
                cache: false,
                dataType: "html",
                data: $("#formagregar").serialize(),
                type: "POST",
                success: function (data) {
                    if (data != 'ERROR') {
                        $("#zonaTabla").html(data);
                        $(function () {
                            $('.datatable').DataTable({
                                select: true,
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
                url: path + "Cajas/Edit",
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

function editar(id) {
    var path = $("#path").val();
    $('#id').val(id);

    $.ajax({
        url: path + "Cajas/Edit",
        cache: false,
        dataType: "html",
        data: { 'id': id },
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

