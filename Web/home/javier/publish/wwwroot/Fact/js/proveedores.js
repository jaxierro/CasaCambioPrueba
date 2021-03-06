
   
    $("#btnConfirmarDelete").click(function () {

        var path = $("#path").val();
        var id_proveedor = $('#id').val();
        var idMsjEje     = $('#idMsjEje').val();

            $.ajax({
                url: path + "Proveedores/Delete",
                dataType: "html",
                data: { "id": id_proveedor },
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
    



function eliminar(id) {
    $('#id').val(id);
    $('#AsqModalDelete').modal({ show: true, keyboard: false, backdrop: 'static' });
}

