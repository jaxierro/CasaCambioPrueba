
 
    $("#btnConfirmar").click(function () {

        var IdCliente   = $("#IdCliente").val();
        var DocumentoID = $("#DocumentoID").val();
        var Nombres     = $("#Nombres").val();
        var Apellidos = $("#Apellidos").val();
        
        if (IdCliente == 0) {

            $.ajax({
                url: "/Clientes/Create",
                cache: false,
                dataType: "html",
                data: $("#formagregar").serialize(),
                type: "POST",
                success: function (data) {
                    if (data != 'ERROR')
                    {
                        $("#zonatable").html(data);
                        $(function () {
                            $('.datatable').DataTable({
                                select: true,
                                responsive: true,
                                initComplete: function () {
                                    $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                                }
                            });
                        });
                        $.bootstrapGrowl("Creado.",
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
                url: "/Clientes/Edit",
                cache: false,
                dataType: "html",
                data: $("#formagregar").serialize(),
                type: "POST",
                success: function (data) {
                    $("#zonatable").html(data);
                    $(function () {
                        $('.datatable').DataTable({
                            select: true,
                            responsive: true,
                            initComplete: function () {
                                $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                            }
                        });
                    });
                  
                    $.bootstrapGrowl("Actualizado.",
                        {
                            type: 'success',
                            delay: 2000,
                        });
                    $('#FormModal').modal('hide');
                }
            });
        }

    });


$("#btnConfirmarDelete").click(function () {

    
    var idRegSel = $('#Id').val();

    $.ajax({
        url: "/Clientes/Delete",
        dataType: "html",
        data: { "id": idRegSel },
        type: "POST",
        success: function (data) {
            $("#zonatable").html(data);
            $(function () {
                $('.datatable').DataTable({
                    select: true,
                    responsive: true,
                    initComplete: function () {
                        $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                    }
                });
            });

            $.bootstrapGrowl("Eliminado.",
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

function Nuevo()
{
    $.ajax({
        url: "/Clientes/Create",
        dataType: "html",
        type: "GET",
        success: function (data) {
            $('#bodyForm').html(data);
            $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });
}

function Editar(id)
{
    $('#IdCliente').val(id);

    $.ajax({
        url: "/Clientes/Edit",
        cache: false,
        dataType: "html",
        data: {'Id': id},
        type: "GET",
        success: function (data) {
            $('#bodyForm').html(data);
            $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });
}

function Eliminar(id) {
    $('#Id').val(id);
    $('#AsqModalDelete').modal({ show: true, keyboard: false, backdrop: 'static' });
}

function EmailsClientes(id)
{
    $.ajax({
        url: "/Clientes/ListEmailsPorCliente",
        cache: false,
        dataType: "html",
        data: { 'Id': id },
        type: "GET",
        success: function (data) {
            $('#bodyForm').html(data);
            $('#FormModal').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });

}

