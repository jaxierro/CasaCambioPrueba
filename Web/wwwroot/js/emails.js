
function ActCorreo()
{
    var email     = $("#email").val();
    var idcliente = $("#IdClienteEmails").val();
    var ope = $("#ope").val();

    var id = $("#id").val();

    if (email == '') {
        $.bootstrapGrowl("Email es requerido",
            {
                type: 'warning',
                delay: 2000,
            });
        return false;
    }

    

    if (ope == "NUEVO") {

        $.ajax({
            url: "/Emails/Create",
            data: { "email": email, 'idcliente': idcliente },
            dataType: "html",
            type: "POST",
            success: function (data) {
                $('#zonaEmail').html(data);
            }
        });
    }
    else
    {

        $.ajax({
            url: "/Emails/Edit",
            cache: false,
            dataType: "html",
            data: { "stremail": email, 'id': id },
            type: "POST",
            success: function (data) {
                $('#zonaEmail').html(data);
            }
        });
    }

    
}

function EditarEmail(id, email)
{
    $("#id").val(id);
    $("#email").val(email);
    $("#ope").val('EDITAR');
}

function EliminarEmail(id)
{
    $.ajax({
        url: "/Emails/Delete",
        cache: false,
        dataType: "html",
        data: { 'id': id },
        type: "POST",
        success: function (data) {
            $('#zonaEmail').html(data);
        }
    });
    
}

