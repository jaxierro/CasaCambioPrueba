using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using CasaCambio.Core.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using CasaCambio.Helper;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace CasaCambio.Controllers
{
    public class ClientesController : Controller
    {
        // GET: Categorias
        private readonly IConfiguration _configuration;
        [Obsolete]
        private readonly IHostingEnvironment _env;
        ILogger<ClientesController> logger;

        private string _nameFolder = "../Oficina/";

        [Obsolete]
        public ClientesController(IConfiguration configuration,
                                 IHostingEnvironment env,
                                 ILogger<ClientesController> _logger)
        {
            _configuration = configuration;
            _env           = env;
            logger         = _logger;
        }

        [Obsolete]
        public async Task<ActionResult> Index()
        {
            CasaCambio.Web.ModelView.Root rsCLientes = new Web.ModelView.Root();
            try
            {
                rsCLientes = await ObtenerListaClientes();
            }
            catch (Exception ex) 
            {
                logger.LogError(ex.Message);
            }

            return View(rsCLientes.result);

        }

        [Obsolete]
        public async Task<ActionResult> ListEmailsPorCliente(int id)
        {
            CasaCambio.Web.ModelView.RootEmails rsCLientes = new Web.ModelView.RootEmails();
            try
            {
                var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
                var recurso = string.Format("api/EmailsMaster/GetAllEmailByClients?Id={0}", id.ToString() );

                var _api      = new ManagerApi(baseUrl, recurso);
                string result = string.Empty;
                rsCLientes    = new Web.ModelView.RootEmails();

                var baseAddress   = new Uri(baseUrl + recurso);
                result            = await _api.ExecuteEndPointGetAsync(baseAddress);
                rsCLientes        = JsonConvert.DeserializeObject<CasaCambio.Web.ModelView.RootEmails>(result);
                ViewBag.IdCliente = id;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return PartialView("../Emails/FormEmails", rsCLientes.result);

        }

        // GET: Categorias/Create
        public ActionResult Create()
        {
            return PartialView("Create");
        }

        [HttpPost]
        public async Task<IActionResult> Create(Clientes model)
        {
            var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
            var recurso = "api/ClientesMaster/Create";

            var _api = new ManagerApi(baseUrl, recurso);
            string result = string.Empty;


            model.FechaReg = DateTime.Now;
            model.FechaAct = DateTime.Now;
            model.Estatus  = 1;

            var paramsJs = JsonConvert.SerializeObject(model);


            try
            {
                if (ModelState.IsValid)
                {
                    var Parameters = new Dictionary<string, string>
                            {
                                { "valueJson", paramsJs },
                            };

                    StringContent content = new StringContent(paramsJs, Encoding.UTF8, "application/json");
                    result                = await _api.ExecuteEndPointPostAsync(content);
                    var rsClienteNuevo    = JsonConvert.DeserializeObject<CasaCambio.Web.ModelView.Root>(result);

                    //if (rsClienteNuevo.isSuccess) 
                    //{
                    //    CasaCambio.Web.ModelView.Root rsCLientes = new Web.ModelView.Root();
                    //    rsCLientes = await ObtenerListaClientes();
                    //    return PartialView("_TablaDetalles", rsCLientes.result);
                    //}

                    CasaCambio.Web.ModelView.Root rsCLientes = new Web.ModelView.Root();
                    rsCLientes = await ObtenerListaClientes();
                    return PartialView("_TablaDetalles", rsCLientes.result);

                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return PartialView("_TablaDetalles");
        }

        // GET: Categorias/Edit/5
        public async Task<ActionResult> Edit(int Id)
        {

            CasaCambio.Web.ModelView.RootSample rsCLientes = new Web.ModelView.RootSample();

            try
            {
                rsCLientes = await ObtenerCliente(Id);

                if (!rsCLientes.isSuccess) 
                {
                    logger.LogError(rsCLientes.message);
                    return PartialView("Edit");

                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return PartialView("Edit");
            }

            return PartialView("Edit", rsCLientes.result);

        }

        [HttpPost]
        public async Task<IActionResult> Edit(Clientes model)
        {
            var cliente = ObtenerCliente(model.IdCliente).Result.result;

            var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
            var recurso = "api/ClientesMaster/Update";

            var _api = new ManagerApi(baseUrl, recurso);
            string result = string.Empty;

            cliente.nombres   = model.Nombres;
            cliente.apellidos = model.Apellidos;
            cliente.fechaAct  = DateTime.Now;

            var paramsJs = JsonConvert.SerializeObject(cliente);

            try
            {
                if (ModelState.IsValid)
                {
                    var Parameters = new Dictionary<string, string>
                            {
                                { "valueJson", paramsJs },
                            };

                    StringContent content = new StringContent(paramsJs, Encoding.UTF8, "application/json");
                    result       = await _api.ExecuteEndPointPostAsync(content);
                    var Result   = JsonConvert.DeserializeObject<CasaCambio.Web.ModelView.RootSample>(result);

                    if (!Result.isSuccess)
                    {
                        logger.LogError(Result.message);
                        return PartialView("_TablaDetalles");
                    }

                    CasaCambio.Web.ModelView.Root rsCLientes = new Web.ModelView.Root();
                    rsCLientes = await ObtenerListaClientes();

                    return PartialView("_TablaDetalles", rsCLientes.result);

                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return PartialView("_TablaDetalles");
        }



        [HttpPost]
        public async Task<ActionResult> Delete(int id)
        {
            var cliente = ObtenerCliente(id).Result.result;

            var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
            var recurso = "api/ClientesMaster/Update";

            var _api = new ManagerApi(baseUrl, recurso);
            string result = string.Empty;

            cliente.estatus = 0;

            var paramsJs = JsonConvert.SerializeObject(cliente);

            try
            {
                if (ModelState.IsValid)
                {
                    var Parameters = new Dictionary<string, string>
                            {
                                { "valueJson", paramsJs },
                            };

                    StringContent content = new StringContent(paramsJs, Encoding.UTF8, "application/json");
                    result = await _api.ExecuteEndPointPostAsync(content);
                    var Result = JsonConvert.DeserializeObject<CasaCambio.Web.ModelView.RootSample>(result);

                    if (!Result.isSuccess)
                    {
                        logger.LogError(Result.message);
                        return PartialView("_TablaDetalles");
                    }

                    CasaCambio.Web.ModelView.Root rsCLientes = new Web.ModelView.Root();
                    rsCLientes = await ObtenerListaClientes();

                    return PartialView("_TablaDetalles", rsCLientes.result);

                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return PartialView("_TablaDetalles");
        }

        private async Task<Web.ModelView.Root> ObtenerListaClientes()
        {

            CasaCambio.Web.ModelView.Root rsCLientes = new Web.ModelView.Root();

            try
            {
                var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
                var recurso = "api/ClientesMaster/GetAll";

                var _api = new ManagerApi(baseUrl, recurso);
                string result = string.Empty;
                rsCLientes = new Web.ModelView.Root();

                var baseAddress = new Uri(baseUrl + recurso);
                result = await _api.ExecuteEndPointGetAsync(baseAddress);
                rsCLientes = JsonConvert.DeserializeObject<CasaCambio.Web.ModelView.Root>(result);

            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return rsCLientes;
        }


        private async Task<Web.ModelView.RootSample> ObtenerCliente(int Id)
        {
            CasaCambio.Web.ModelView.RootSample rsCLientes = new Web.ModelView.RootSample();

            try
            {
                var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
                var recurso = String.Format("api/ClientesMaster/Get?id={0}", Id.ToString());

                var _api = new ManagerApi(baseUrl, recurso);
                string result = string.Empty;

                var baseAddress = new Uri(baseUrl + recurso);
                result = await _api.ExecuteEndPointGetAsync(baseAddress);
                rsCLientes = JsonConvert.DeserializeObject<CasaCambio.Web.ModelView.RootSample>(result);

                if (!rsCLientes.isSuccess)
                {
                    logger.LogError(rsCLientes.message);

                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return rsCLientes;
        }

    }
}