function VerDetallesVentas(id)
{
    $.ajax({
        url: "/Ventas/VerDetailsOrder",
        cache: false,
        dataType: "html",
        data: {
            'venta_id': id
        },
        type: "POST",
        success: function (data) 
        {
            $("#bodyDetails").html(data);
            $('#AsqModalDetails').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });
}

function FiltrarHistorySales()
{
    var path = $("#path").val();

    var params = {
        'codigo_fact'         : $('#codigo_fact').val(),
        'id_vendedor'         : $('#id_vendedor').val(),
        'idCaja'              : $('#idCaja').val(),
        'id_cliente'          : $('#id_cliente').val(),
        'fechaBetweenFrom'    : $('#fechaBetweenFrom').val(),
        'fechaBetweenTo'      : $('#fechaBetweenTo').val(),
        'fechaEqual'          : $('#fechaBetweenFrom').val(),
        'fechaMayor'          : $('#fechaBetweenFrom').val(),
        'fechaMenor'          : $('#fechaBetweenFrom').val(),
        'TotalFactBetweenFrom': $('#TotalFactBetweenFrom').val(),
        'TotalFactBetweenTo'  : $('#TotalFactBetweenTo').val(),
        'TotalFactEqual'      : $('#TotalFactBetweenFrom').val(),
        'TotalFactMayor'      : $('#TotalFactBetweenFrom').val(),
        'TotalFactMenor'      : $('#TotalFactBetweenFrom').val(),
        'opeFecha'            : $('#opeFecha').val(),
        'opeTotalFact'        : $('#opeTotalFact').val()
    }

    $.ajax({
        url: path + "Reportes/FiltrarHistorySales",
        cache: false,
        dataType: "html",
        data: params,
        type: "POST",
        success: function (data) {
﻿function VerDetallesVentas(id)
{
    $.ajax({
        url: "/Ventas/VerDetailsOrder",
        cache: false,
        dataType: "html",
        data: {
            'venta_id': id
        },
        type: "POST",
        success: function (data) 
        {
            $("#bodyDetails").html(data);
            $('#AsqModalDetails').modal({ show: true, keyboard: false, backdrop: 'static' });
        }
    });
}

function FiltrarHistorySales()
{
    var path = $("#path").val();

    var params = {
        'codigo_fact'         : $('#codigo_fact').val(),
        'id_vendedor'         : $('#id_vendedor').val(),
        'idCaja'              : $('#idCaja').val(),
        'id_cliente'          : $('#id_cliente').val(),
        'fechaBetweenFrom'    : $('#fechaBetweenFrom').val(),
        'fechaBetweenTo'      : $('#fechaBetweenTo').val(),
        'fechaEqual'          : $('#fechaBetweenFrom').val(),
        'fechaMayor'          : $('#fechaBetweenFrom').val(),
        'fechaMenor'          : $('#fechaBetweenFrom').val(),
        'TotalFactBetweenFrom': $('#TotalFactBetweenFrom').val(),
        'TotalFactBetweenTo'  : $('#TotalFactBetweenTo').val(),
        'TotalFactEqual'      : $('#TotalFactBetweenFrom').val(),
        'TotalFactMayor'      : $('#TotalFactBetweenFrom').val(),
        'TotalFactMenor'      : $('#TotalFactBetweenFrom').val(),
        'opeFecha'            : $('#opeFecha').val(),
        'opeTotalFact'        : $('#opeTotalFact').val()
    }

    $.ajax({
        url: path + "Reportes/FiltrarHistorySales",
        cache: false,
        dataType: "html",
        data: params,
        type: "POST",
        success: function (data) {
            $("#tbDatos").html(data);
            var table = $('#tbDatosReportes').tableToJSON({});
            $("#hdJsonTable").val(JSON.stringify(table));
            $('.datatable').DataTable({
                select: true,
                responsive: true,
                initComplete: function () {
                    $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off').css('overflow', 'hidden').css('margin', 'auto');
                }
                /*scrollCollapse: true,
                scrollX: "600px",
                scrollY: "400px"*/
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

function ExportarSalesHistoryExcel()
{
    var path = $("#path").val();
    var json = $("#hdJsonTable").val();

    if (json == '')
    {
        var table = $('#tbDatosReportes').tableToJSON({});
        $("#hdJsonTable").val(JSON.stringify(table));
        json = $("#hdJsonTable").val();
    }

    json     = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarSalesHistoryExcel",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}

function ExportarResultadosExcelPU()
{
    var path = $("#path").val();
    var json = $("#hdJsonTable").val();

    json     = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarResultadosExcelPU",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}

function ExportarResultadosExcelRU()
{
    var path = $("#path").val();
    var json = $("#hdJsonTable").val();

    json = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarResultadosExcelRU",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}

function ExportarResultadosExcelPC()
{
    var path = $("#path").val();
    var json = $("#hdJsonTable").val();

    json = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarResultadosExcelPC",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}

function ExportarSalesHistoryPDF()
{
    var path = $("#path").val();

    var json = $("#hdJsonTable").val();

    if (json == '')
    {
        var table = $('#tbDatosReportes').tableToJSON({});
        $("#hdJsonTable").val(JSON.stringify(table));
        json = $("#hdJsonTable").val();
    }
    
    json = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarSalesHistoryPDF",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        async: true,
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}

function ExportarResultadosPdfRU()
{
    var path = $("#path").val();

    var json = $("#hdJsonTable").val();
    json = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarResultadosPdfRU",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        async: true,
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}

function ExportarResultadosPDFPU()
{
    var path = $("#path").val();

    var json = $("#hdJsonTable").val();
    json = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarResultadosPDFPU",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        async: true,
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}

function ExportarResultadosPDFPC()
{
    var path = $("#path").val();

    var json = $("#hdJsonTable").val();
    json = "{ \"root\": { \"data\":" + json + "} }";

    $.ajax({
        url: "/Reportes/ExportarResultadosPDFPC",
        cache: false,
        data: { "jsonDatos": json },
        dataType: "html",
        type: "POST",
        async: true,
        success: function (data) {
            var a = document.createElement("a");
            a.href = path + "/files/" + data;
            a.download = data;
            document.body.appendChild(a);
            a.click();
        }
    });
}

function FiltrarReportesUtilidades()
{
    var path = $("#path").val();
    
    var params = {
        'int_local_id'        : $('#int_local_id').val(),
        'fechaBetweenFrom'    : $('#fechaBetweenFrom').val(),
        'fechaBetweenTo'      : $('#fechaBetweenTo').val(),
        'fechaEqual'          : $('#fechaBetweenFrom').val(),
        'fechaMayor'          : $('#fechaBetweenFrom').val(),
        'fechaMenor'          : $('#fechaBetweenFrom').val(),
        'opeFecha'            : $('#opeFecha').val()
    }

    $.ajax({
        url: path + "Reportes/FiltrarReportesUtilidades",
        cache: false,
        dataType: "html",
        data: params,
        type: "POST",
        success: function (data) {
            $("#zonaTabla").html(data);
            var table = $('#tbDatosReportes').tableToJSON({});
            $("#hdJsonTable").val(JSON.stringify(table));
            $('.datatable').DataTable({
                select: true,
                responsive: true,
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
    })
}

function FiltrarReportesProductosUtilidades()
{
    var path = $("#path").val();
    
    var params = {
        'int_local_id'        : $('#int_local_id').val(),
        'fechaBetweenFrom'    : $('#fechaBetweenFrom').val(),
        'fechaBetweenTo'      : $('#fechaBetweenTo').val(),
        'fechaEqual'          : $('#fechaBetweenFrom').val(),
        'fechaMayor'          : $('#fechaBetweenFrom').val(),
        'fechaMenor'          : $('#fechaBetweenFrom').val(),
        'opeFecha'            : $('#opeFecha').val()
    }

    $.ajax({
        url: path + "Reportes/FiltrarReportesProductosUtilidades",
        cache: false,
        dataType: "html",
        data: params,
        type: "POST",
        success: function (data) {
            $("#zonaTabla").html(data);
            var table = $('#tbDatosReportes').tableToJSON({});
            $("#hdJsonTable").val(JSON.stringify(table));
            $('.datatable').DataTable({
                select: true,
                responsive: true,
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
    })
}

function FiltrarReportesClientesUtilidades()
{
    var path = $("#path").val();
    
    var params = {
        'int_local_id'        : $('#int_local_id').val(),
        'fechaBetweenFrom'    : $('#fechaBetweenFrom').val(),
        'fechaBetweenTo'      : $('#fechaBetweenTo').val(),
        'fechaEqual'          : $('#fechaBetweenFrom').val(),
        'fechaMayor'          : $('#fechaBetweenFrom').val(),
        'fechaMenor'          : $('#fechaBetweenFrom').val(),
        'opeFecha'            : $('#opeFecha').val()
    }

    $.ajax({
        url: path + "Reportes/FiltrarReportesClientesUtilidades",
        cache: false,
        dataType: "html",
        data: params,
        type: "POST",
        success: function (data) {
            $("#zonaTabla").html(data);
            var table = $('#tbDatosReportes').tableToJSON({});
            $("#hdJsonTable").val(JSON.stringify(table));
            $('.datatable').DataTable({
                select: true,
                responsive: true,
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
    })
}
