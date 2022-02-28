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
    public class EmailsController : Controller
    {
        // GET: Categorias
        private readonly IConfiguration _configuration;
        [Obsolete]
        private readonly IHostingEnvironment _env;
        ILogger<EmailsController> logger;

        private string _nameFolder = "../Emails/";

        [Obsolete]
        public EmailsController(IConfiguration configuration,
                                 IHostingEnvironment env,
                                 ILogger<EmailsController> _logger)
        {
            _configuration = configuration;
            _env           = env;
            logger         = _logger;
        }

        [Obsolete]
        public async Task<ActionResult> Index()
        {
            CasaCambio.Web.ModelView.RootEmails rsEmails = new Web.ModelView.RootEmails();
            try
            {
                rsEmails = await ObtenerListaEmails();
            }
            catch (Exception ex) 
            {
                logger.LogError(ex.Message);
            }

            return View(rsEmails.result);

        }

      
        [HttpPost]
        public async Task<IActionResult> Create(string email, int idcliente)
        {
            var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
            var recurso = "api/EmailsMaster/Create";

            var _api = new ManagerApi(baseUrl, recurso);
            string result = string.Empty;

            var model = new Emails()
            {
                Email     = email,
                FechaReg  = DateTime.Now,
                FechaAct  = DateTime.Now,
                IdCliente = idcliente,
                Estatus   = 1
             };

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
                    var rsClienteNuevo    = JsonConvert.DeserializeObject<Web.ModelView.Root>(result);

                    CasaCambio.Web.ModelView.RootEmails rsEmails = new Web.ModelView.RootEmails();
                    rsEmails = await ObtenerListaEmails();
                    return PartialView("../Emails/_TablaDetallesEmails", rsEmails.result);

                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return PartialView("../Emails/_TablaDetallesEmails");
        }

      
        [HttpPost]
        public async Task<IActionResult> Edit(string stremail, int id)
        {
            var model = new Emails()
            {
                Email    = stremail,
                FechaReg = DateTime.Now,
                FechaAct = DateTime.Now,
                IdCliente = id,
                Estatus = 1
            };

            var email = ObtenerEmail(id).Result.result;

            var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
            var recurso = "api/EmailsMaster/Update";

            var _api = new ManagerApi(baseUrl, recurso);
            string result = string.Empty;


            email.fechaAct  = DateTime.Now;
            email.email     = stremail;

            var paramsJs = JsonConvert.SerializeObject(email);

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

                    CasaCambio.Web.ModelView.RootEmails rsEmails = new Web.ModelView.RootEmails();
                    rsEmails = await ObtenerListaEmails();

                    return PartialView("_TablaDetalles", rsEmails.result);

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
            var email = ObtenerEmail(id).Result.result;

            var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
            var recurso = "api/EmailsMaster/Update";

            var _api = new ManagerApi(baseUrl, recurso);
            string result = string.Empty;

            email.estatus = 0;

            var paramsJs = JsonConvert.SerializeObject(email);

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
                        return PartialView("../Emails/_TablaDetallesEmails");
                    }

                    CasaCambio.Web.ModelView.RootEmails rsEmails = new Web.ModelView.RootEmails();
                    rsEmails = await ObtenerListaEmails();

                    return PartialView("../Emails/_TablaDetallesEmails", rsEmails.result);

                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return PartialView("../Emails/_TablaDetallesEmails");
        }

        private async Task<Web.ModelView.RootEmails> ObtenerListaEmails()
        {

            CasaCambio.Web.ModelView.RootEmails rsEmails = new Web.ModelView.RootEmails();

            try
            {
                var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
                var recurso = "api/EmailsMaster/GetAll";

                var _api = new ManagerApi(baseUrl, recurso);
                string result = string.Empty;
                rsEmails = new Web.ModelView.RootEmails();

                var baseAddress = new Uri(baseUrl + recurso);
                result = await _api.ExecuteEndPointGetAsync(baseAddress);
                rsEmails = JsonConvert.DeserializeObject<CasaCambio.Web.ModelView.RootEmails>(result);

            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return rsEmails;
        }


        private async Task<Web.ModelView.RootSampleEmails> ObtenerEmail(int Id)
        {
            CasaCambio.Web.ModelView.RootSampleEmails rsEmails = new Web.ModelView.RootSampleEmails();

            try
            {
                var baseUrl = _configuration.GetValue<string>("baseUrlAPI");
                var recurso = String.Format("api/EmailsMaster/Get?id={0}", Id.ToString());

                var _api = new ManagerApi(baseUrl, recurso);
                string result = string.Empty;

                var baseAddress = new Uri(baseUrl + recurso);
                result = await _api.ExecuteEndPointGetAsync(baseAddress);
                rsEmails = JsonConvert.DeserializeObject<CasaCambio.Web.ModelView.RootSampleEmails>(result);

                if (!rsEmails.isSuccess)
                {
                    logger.LogError(rsEmails.message);

                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }

            return rsEmails;
        }

    }
}