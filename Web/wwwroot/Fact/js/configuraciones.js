// SaveSettCompany //

$("#btnUpdateCompany").click(function () {
    
    var idMsjEje   = $("#idMsjEje").val();
    var form       = $("#formagregar")[0];
    var dataForm   = new FormData(form);
    $.ajax({
        url: "/Configuraciones/UpdateCompany",
        cache: false,
        dataType: "html",
        data: dataForm,
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        success: function (data) {
            //$('#ModalVerLoading').modal('hide');
            if (data == "ok") {
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
            } else {
                $.bootstrapGrowl("ERROR",
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }

            $('#ModalVerLoading').modal('hide');
        }
    });


});


$("#btnGuardarSistemas").click(function ()
{
    var path            = $("#path").val();
    var idMsjEje        = $("#idMsjEje").val();
    var country_default = $("#country_default").val();
    var idioma_default  = $("#idioma_default").val();

    $.ajax({
        url: "/Configuraciones/SaveSettSystem",
        cache: false,
        dataType: "html",
        data: { 'country_default' : country_default, 'idioma_default' : idioma_default },
        type: "POST",
        success: function (data) {
            $('#ModalVerLoading').modal('hide');
            if (data == "ok") {
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
            } else {
                $.bootstrapGrowl("ERROR",
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }
        }
    });

    $('#ModalVerLoading').modal('hide');

});

$("#btnGuardarSetTienda").click(function ()
{
    var path        = $("#path").val();
    var idMsjEje    = $("#idMsjEje").val();
    var form        = $("#formbanner")[0];
    var dataForm    = new FormData(form);
    
    $.ajax({
        url: "/Configuraciones/SaveBannerTienda",
        cache: false,
        dataType: "html",
        data: dataForm,
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        success: function (data) {
            if (data == "ok") {
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
            } else {
                $.bootstrapGrowl("ERROR",
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }
        }
    });

});


$("#btnAddZona").click(function ()
{
    var path        = $("#path").val();
    var nombre_zona = $("#nombre_zona").val();
    var idLug       = $("#idLugZona").val();
    var idMsjEje    = $("#idMsjEje").val();
    
    if (idLug == '0') {
        $.bootstrapGrowl($("#idMsjlug").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $("#idMsjlug").focus();
        return;
    }

    if (nombre_zona == '') {
        $.bootstrapGrowl($("#idMsjNom").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $("#nombre_zona").focus();
        return;
    }

    $.ajax({
        url: path + "Configuraciones/SaveZonasDeliveryCompany",
        cache: false,
        dataType: "html",
        //data: { 'nombre_zona': nombre_zona, 'idLug' : idLug, 'IdCompany' : IdCompany },
        data: $("#formagregarzona").serialize(),
        type: "POST",
        success: function (data) {
        
            $("#tableZonas").html(data);
            $("#nombre_zona").val("");
            $.bootstrapGrowl(idMsjEje,
            {
                    type: 'success',
                    delay: 2000,
            });

            $('#tableZonas').DataTable({
                destroy: true,
                select: true,
                responsive: true,
                initComplete: function () {
                    $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                }
            });

        }
    });
}); 

$("#btnGuardarCompany").click(function ()
{
    var path        = $("#path").val();
    var idMsjEje    = $("#idMsjEje").val();
    
    var IdLugPais    = $('#IdLugPais').val();
    var IdLugState   = $('#IdLugState').val();
    var IdLugCity    = $('#IdLugCity').val();

    var IdenDni              = $("#IdenDni").val();
    var UserName             = $("#UserName").val();
    var CompanyName          = $("#CompanyName").val();
    var CompanyDescription   = $("#CompanyDescription").val();
    var CompanyFiscalAddress = $("#CompanyFiscalAddress").val();
    var CompanyEmail         = $("#CompanyEmail").val();
    var NumberPhoneLocal     = $("#NumberPhoneLocal").val();
    var NumberPhoneMovil     = $("#NumberPhoneMovil").val();
    var IdIndustry           = $("#IdIndustry").val();
    var SlugUrl              = $("#SlugUrl").val();

    if (UserName == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });

        $('#UserName').focus();
        return;
    }

    if (IdenDni == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#IdenDni').focus();
        return;
    }

    if (CompanyName == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#CompanyName').focus();
        return;
    }

    if (CompanyDescription == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#CompanyDescription').focus();
        return;
 ﻿// SaveSettCompany //

$("#btnUpdateCompany").click(function () {
    
    var idMsjEje   = $("#idMsjEje").val();
    var form       = $("#formagregar")[0];
    var dataForm   = new FormData(form);
    $.ajax({
        url: "/Configuraciones/UpdateCompany",
        cache: false,
        dataType: "html",
        data: dataForm,
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        success: function (data) {
            //$('#ModalVerLoading').modal('hide');
            if (data == "ok") {
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
            } else {
                $.bootstrapGrowl("ERROR",
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }

            $('#ModalVerLoading').modal('hide');
        }
    });


});


$("#btnGuardarSistemas").click(function ()
{
    var path            = $("#path").val();
    var idMsjEje        = $("#idMsjEje").val();
    var country_default = $("#country_default").val();
    var idioma_default  = $("#idioma_default").val();

    $.ajax({
        url: "/Configuraciones/SaveSettSystem",
        cache: false,
        dataType: "html",
        data: { 'country_default' : country_default, 'idioma_default' : idioma_default },
        type: "POST",
        success: function (data) {
            $('#ModalVerLoading').modal('hide');
            if (data == "ok") {
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
            } else {
                $.bootstrapGrowl("ERROR",
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }
        }
    });

    $('#ModalVerLoading').modal('hide');

});

$("#btnGuardarSetTienda").click(function ()
{
    var path        = $("#path").val();
    var idMsjEje    = $("#idMsjEje").val();
    var form        = $("#formbanner")[0];
    var dataForm    = new FormData(form);
    
    $.ajax({
        url: "/Configuraciones/SaveBannerTienda",
        cache: false,
        dataType: "html",
        data: dataForm,
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        success: function (data) {
            if (data == "ok") {
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
            } else {
                $.bootstrapGrowl("ERROR",
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }
        }
    });

});


$("#btnAddZona").click(function ()
{
    var path        = $("#path").val();
    var nombre_zona = $("#nombre_zona").val();
    var idLug       = $("#idLugZona").val();
    var idMsjEje    = $("#idMsjEje").val();
    
    if (idLug == '0') {
        $.bootstrapGrowl($("#idMsjlug").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $("#idMsjlug").focus();
        return;
    }

    if (nombre_zona == '') {
        $.bootstrapGrowl($("#idMsjNom").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $("#nombre_zona").focus();
        return;
    }

    $.ajax({
        url: path + "Configuraciones/SaveZonasDeliveryCompany",
        cache: false,
        dataType: "html",
        //data: { 'nombre_zona': nombre_zona, 'idLug' : idLug, 'IdCompany' : IdCompany },
        data: $("#formagregarzona").serialize(),
        type: "POST",
        success: function (data) {
        
            $("#tableZonas").html(data);
            $("#nombre_zona").val("");
            $.bootstrapGrowl(idMsjEje,
            {
                    type: 'success',
                    delay: 2000,
            });

            $('#tableZonas').DataTable({
                destroy: true,
                select: true,
                responsive: true,
                initComplete: function () {
                    $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                }
            });

        }
    });
}); 

$("#btnGuardarCompany").click(function ()
{
    var path        = $("#path").val();
    var idMsjEje    = $("#idMsjEje").val();
    
    var IdLugPais    = $('#IdLugPais').val();
    var IdLugState   = $('#IdLugState').val();
    var IdLugCity    = $('#IdLugCity').val();

    var IdenDni              = $("#IdenDni").val();
    var UserName             = $("#UserName").val();
    var CompanyName          = $("#CompanyName").val();
    var CompanyDescription   = $("#CompanyDescription").val();
    var CompanyFiscalAddress = $("#CompanyFiscalAddress").val();
    var CompanyEmail         = $("#CompanyEmail").val();
    var NumberPhoneLocal     = $("#NumberPhoneLocal").val();
    var NumberPhoneMovil     = $("#NumberPhoneMovil").val();
    var IdIndustry           = $("#IdIndustry").val();
    var SlugUrl              = $("#SlugUrl").val();

    if (UserName == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });

        $('#UserName').focus();
        return;
    }

    if (IdenDni == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#IdenDni').focus();
        return;
    }

    if (CompanyName == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#CompanyName').focus();
        return;
    }

    if (CompanyDescription == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#CompanyDescription').focus();
        return;
    }

    if (CompanyFiscalAddress == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#CompanyFiscalAddress').focus();
        return;
    }

    if (IdLugPais == '' || IdLugPais == '0')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#IdLugPais').focus();
        return;
    }

    if (IdLugState == '' || IdLugState == '0')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#IdLugState').focus();
        return;
    }

    if (IdLugCity == '' || IdLugCity == '0')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#IdLugCity').focus();
        return;
    }

    if (CompanyEmail == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#CompanyEmail').focus();
        return;
    }

    if (NumberPhoneLocal == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#NumberPhoneLocal').focus();
        return;
    }

    if (NumberPhoneMovil == '')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#NumberPhoneMovil').focus();
        return;
    }

    if (IdIndustry == '' || IdIndustry == '0')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#IdIndustry').focus();
        return;
    }

    if (SlugUrl == '' || SlugUrl == '0')
    {
        $.bootstrapGrowl($("#MsjValReq").val(),
            {
                type: 'warning',
                delay: 2000,
            });
        $('#SlugUrl').focus();
        return;
    }

    var form         = $("#formagregar")[0];
    var dataForm     = new FormData(form);

    dataForm.append('IdLugCountry', IdLugPais);
    dataForm.append('IdLugState', IdLugState);
    dataForm.append('IdLugCity', IdLugCity);
    
    $.ajax({
        url: "/Configuraciones/CreateCompany",
        cache: false,
        dataType: "html",
        data: dataForm,
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        success: function (data) {
            
            if (data == "ok") {
                $.bootstrapGrowl(idMsjEje,
                    {
                        type: 'success',
                        delay: 2000,
                    });
                setTimeout(function () {
                    window.location.href = path + "Configuraciones/CreateCompany";
                }, 2000);
            } else {
                $.bootstrapGrowl("ERROR",
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }
        },
        complete: function(data) 
        {
            $('#ModalVerLoading').modal('hide');
        }
    });

});

function SetImage(input) {
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(input.files[0]);
    }
}

function fileOnload(e) {
    var result = e.target.result;
    $('#imgLogoCompany').attr("src", result);
}


function SetImageBanner(input) 
{

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = fileOnloadBannerTienda;
        reader.readAsDataURL(input.files[0]);
    }
}

function fileOnloadBannerTienda(e) {
    var result = e.target.result;
    $('#imgBannerTienda').attr("src", result);
}

function LoadEstados(obj)
{
    
    var cod_lug = $(obj).val();
    
    $.ajax({
        url: "/Configuraciones/LoadItemsStatesYouMalbum",
        cache: false,
        dataType: "json",
        data: { 'CodLug': cod_lug, 'valueSel': 0 },
        type: "GET",
        success: function (data) {
            $('#IdLugState').html('');
            data.forEach(function (object) {

                s = JSON.stringify(object);
                opt = JSON.parse(s);

                item = "<option value='" + opt.value + "'>" + opt.text + "</option>"
                $('#IdLugState').append(item);
            });
        }
    });
}


function LoadCiudades(obj) {

    var CodLug    = $('#IdLugPais').val();
    var idLugEst  = $('#IdLugState').val();
    
    $.ajax({
        url: "/Configuraciones/LoadItemsCityYouMalbumByCodLug",
        cache: false,
        dataType: "json",
        data: { 'CodLug': CodLug, 'idLugEst': idLugEst },
        type: "GET",
        success: function (data) {
            $('#IdLugCity').html('');
            data.forEach(function (object) {

                s = JSON.stringify(object);
                opt = JSON.parse(s);

                item = "<option value='" + opt.value + "'>" + opt.text + "</option>"
                $('#IdLugCity').append(item);
            });
        }
    });
}


function LoadEstadosZonas(obj)
{
    
    var cod_lug = $(obj).val();
    var path = $("#path").val();

    $.ajax({
        url: path + "Configuraciones/LoadItemsStatesYouMalbum",
        cache: false,
        dataType: "json",
        data: { 'CodLug': cod_lug },
        type: "GET",
        success: function (data) {
            $('#idLugZonaEstado').html('');
            data.forEach(function (object) {

                s = JSON.stringify(object);
                opt = JSON.parse(s);

                item = "<option value='" + opt.value + "'>" + opt.text + "</option>"
                $('#idLugZonaEstado').append(item);
            });

            $('#idLugZona').html('');
            item = "<option value='" + "Seleccione" + "'>" + opt.text + "</option>"
            $('#idLugZona').append(item);
        }
    });
}


function LoadCiudadesZonas(obj) {

    var cod_lug = $(obj).val();
    
    $.ajax({
        url: "/Configuraciones/LoadItemsCityYouMalbumByCodLug",
        cache: false,
        dataType: "json",
        data: { 'CodLug': cod_lug },
        type: "GET",
        success: function (data) {
            $('#idLugZona').html('');
            data.forEach(function (object) {

                s = JSON.stringify(object);
                opt = JSON.parse(s);

                item = "<option value='" + opt.value + "'>" + opt.text + "</option>"
                $('#idLugZona').append(item);
            });
        }
    });
}

function SetNameCity(obj)
{
    var nombre_ciudad = $(obj).text();
    $("#nombre_ciudad").val(nombre_ciudad);
}

function eliminar(tr, zona_id)
{
    var path = $("#path").val();
    
    $.ajax({
        url: path + "Configuraciones/DeleteItemZona",
        cache: false,
        dataType: "html",
        data: { 'zona_id': zona_id },
        type: "POST",
        success: function (data) {
            if (data == "ok"){
                $(tr).parent().parent().remove();
            }else{
                $.bootstrapGrowl("ERROR",
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }
        }
    });
}

function UpdateVariables(keyname)
{
    var path      = $("#path").val();
    var valuename = $("#" + keyname).val();

    $.ajax({
        url: path + "Configuraciones/UpdateVariables",
        cache: false,
        dataType: "html",
        data: { 'keyname': keyname, 'valuename': valuename },
        type: "POST",
        success: function (data) {
            if (data == "OK") {
                $.bootstrapGrowl("Guardado Satisfactoriamente",
                    {
                        type: 'success',
                        delay: 2000,
                    });
            } else {
                $.bootstrapGrowl("ERROR",
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }
        }
    });

}
