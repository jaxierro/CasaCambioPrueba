#pragma checksum "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "2ee793291c07b2d8fc5b7d4a56dec8d7b0dba7f4"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Clientes__TablaDetalles), @"mvc.1.0.view", @"/Views/Clientes/_TablaDetalles.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\_ViewImports.cshtml"
using CasaCambio;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\_ViewImports.cshtml"
using CasaCambio.Core;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2ee793291c07b2d8fc5b7d4a56dec8d7b0dba7f4", @"/Views/Clientes/_TablaDetalles.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ff86a9aaa3ac58fd47b01c2f3098bdd4892030bd", @"/Views/_ViewImports.cshtml")]
    public class Views_Clientes__TablaDetalles : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IEnumerable<CasaCambio.Web.ModelView.ResultClientesView>>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
  
    Layout = null;

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<table id=""tbDetallesClientes"" class="" datatable table table-bordered"" width=""100%"" cellspacing=""0"">
    <thead>
        <tr>
            <th>
                Documento ID
            </th>
            <th>
                Nombres
            </th>
            <th>
                Apellidos
            </th>
            <th>
                Fecha Reg
            </th>

            <th>
                Fecha Act
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody id=""tbody"">

");
#nullable restore
#line 31 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
         if (Model != null)
        {
            

#line default
#line hidden
#nullable disable
#nullable restore
#line 33 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
             foreach (var item in Model)
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <tr>\r\n                    <td>\r\n                        ");
#nullable restore
#line 37 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
                   Write(Html.DisplayFor(modelItem => item.documentoID));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </td>\r\n                    <td>\r\n                        ");
#nullable restore
#line 40 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
                   Write(Html.DisplayFor(modelItem => item.nombres));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </td>\r\n                    <td>\r\n                        ");
#nullable restore
#line 43 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
                   Write(Html.DisplayFor(modelItem => item.apellidos));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </td>\r\n                    <td>\r\n                        ");
#nullable restore
#line 46 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
                   Write(Html.DisplayFor(modelItem => item.fechaReg));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </td>\r\n                    <td>\r\n                        ");
#nullable restore
#line 49 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
                   Write(Html.DisplayFor(modelItem => item.fechaAct));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </td>\r\n                    <td>\r\n                        <a class=\"btn btn-default\" data-toggle=\"tooltip\" data-original-title=\"Emails\"");
            BeginWriteAttribute("onclick", " onclick=\"", 1490, "\"", 1531, 3);
            WriteAttributeValue("", 1500, "EmailsClientes(", 1500, 15, true);
#nullable restore
#line 52 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
WriteAttributeValue("", 1515, item.idCliente, 1515, 15, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 1530, ")", 1530, 1, true);
            EndWriteAttribute();
            WriteLiteral(">\r\n                            <i class=\"fa fa-address-book\"></i>\r\n                        </a>\r\n\r\n                        <a class=\"btn btn-default\" data-toggle=\"tooltip\" data-original-title=\"Editar\"");
            BeginWriteAttribute("onclick", " onclick=\"", 1732, "\"", 1765, 3);
            WriteAttributeValue("", 1742, "Editar(", 1742, 7, true);
#nullable restore
#line 56 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
WriteAttributeValue("", 1749, item.idCliente, 1749, 15, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 1764, ")", 1764, 1, true);
            EndWriteAttribute();
            WriteLiteral(">\r\n                            <i class=\"fa fa-edit\"></i>\r\n                        </a>\r\n\r\n                        <a");
            BeginWriteAttribute("id", " id=\"", 1883, "\"", 1903, 1);
#nullable restore
#line 60 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
WriteAttributeValue("", 1888, item.idCliente, 1888, 15, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            BeginWriteAttribute("onclick", " onclick=\"", 1904, "\"", 1939, 3);
            WriteAttributeValue("", 1914, "Eliminar(", 1914, 9, true);
#nullable restore
#line 60 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
WriteAttributeValue("", 1923, item.idCliente, 1923, 15, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 1938, ")", 1938, 1, true);
            EndWriteAttribute();
            WriteLiteral(">\r\n                            <i class=\"fa fa-trash\"></i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n");
#nullable restore
#line 65 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
            }

#line default
#line hidden
#nullable disable
#nullable restore
#line 65 "C:\Users\Javier\source\repos\CasaDeCambioTest\CasaCambioPrueba\Web\Views\Clientes\_TablaDetalles.cshtml"
             
        }

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n\r\n    </tbody>\r\n</table>\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<CasaCambio.Web.ModelView.ResultClientesView>> Html { get; private set; }
    }
}
#pragma warning restore 1591
