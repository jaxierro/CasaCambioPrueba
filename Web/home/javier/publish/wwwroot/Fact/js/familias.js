$( document ).ready(function () {

    var path = $("#path").val();

    $("#btnNuevo").click(function () {
        $("#nombre_familia").val('');
        $("#id_familia").val(0);
        $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
    });

    $("#btnConfirmarDelete").click(function () {

        var idRegSel = $('#id').val();
        var idMsjEje = $("#idMsjEje").val();
        var idMsjRem = $("#idMsjRem").val()

            $.ajax({
                url: path + "Familias/Delete",
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

        var id = $("#id_familia").val();
        var familia = $("#nombre_familia").val();

        var idMsjRegis   = $("#idMsjRegis").val();
        var idMsjEje     = $("#idMsjEje").val();
        var idMsjActuali = $("#idMsjActuali").val();

        if (familia == '')
        {
            $.bootstrapGrowl($("#idMsjNom").val(),
                {
                    type: 'warning',
                    delay: 2000,
                });
            return;
        }

        if (id == 0) {
            $.ajax({
                url: path + "Familias/Create",
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
                url: path + "Familias/Edit",
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
        url: path + "Familias/Edit",
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

