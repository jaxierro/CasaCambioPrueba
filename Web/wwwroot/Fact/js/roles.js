﻿function ListarOpciones()
{
    var RoleId = $("#RoleId").val();

    $.ajax({
        url: "/Oficina/ListarOpciones",
        cache: false,
        dataType: "html",
        data: { 'RoleId': RoleId },
        type: "POST",
        success: function (data) {
            $('#Id').val(RoleId);
            $('#zonaDetalles').html(data);
            
        }
    });

}

function SelectAll()
{
    $("input[name='menu[]']").each(function () {
        //$(this).iCheck('check');
        $(this).prop('checked', true);
    });
}

function NotSelectAll()
{
    $("input[name='menu[]']").each(function () {
        //$(this).iCheck('uncheck');
        $(this).prop('checked', false);
    });
}

