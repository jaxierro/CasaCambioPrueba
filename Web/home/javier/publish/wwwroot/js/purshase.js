window.onload = function() 
{
    $('#FormModalCredential').modal({ show: true, keyboard: false, backdrop: 'static' });
};

function ValidCodePurshase()
{
    var code = $("#CodigoActivacion").val();

    $.ajax({
        url: "/Details/ValidCodePurshase",
        dataType: "json",
        data: { 
                "code": code  
              },
        type: "GET",
        success: function (result) 
        {
            $("#AddressComponent").html(result);
        }
    }); 
}

function SendCodePurshase()
{
    var email = $("#EmailBox").val();

    $.ajax({
        url: "/Details/SendCodePurshase",
        dataType: "json",
        data: { 
                "EmailUser": email  
              },
        type: "GET",
        success: function (result) {

            if (result == "OK")
            {
                $("#CodigoActivacion").prop( "disabled", false );
                $("#btnValidarPersona").prop( "disabled", false );window.onload = function() 
{
    $('#FormModalCredential').modal({ show: true, keyboard: false, backdrop: 'static' });
};

function ValidCodePurshase()
{
    var code = $("#CodigoActivacion").val();

    $.ajax({
        url: "/Details/ValidCodePurshase",
        dataType: "json",
        data: { 
                "code": code  
              },
        type: "GET",
        success: function (result) 
        {
            $("#AddressComponent").html(result);
        }
    }); 
}

function SendCodePurshase()
{
    var email = $("#EmailBox").val();

    $.ajax({
        url: "/Details/SendCodePurshase",
        dataType: "json",
        data: { 
                "EmailUser": email  
              },
        type: "GET",
        success: function (result) {

            if (result == "OK")
            {
                $("#CodigoActivacion").prop( "disabled", false );
                $("#btnValidarPersona").prop( "disabled", false );
            }
        }
    });

}