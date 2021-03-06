using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using Rotativa.AspNetCore;
using Microsoft.AspNetCore.Authorization;
//using JRBQTO.CORE.Models.Base;
using Microsoft.Extensions.Logging;
//using JRBQTO.CORE.ModelViews.Base;

namespace CasaCambio.Controllers
{
    public class OficinaController : Controller
    {
        //private readonly IUserHelper userHelper;
        private readonly IConfiguration _configuration;
        [Obsolete]
        private readonly IHostingEnvironment _env;
        ILogger<OficinaController> logger;
        
        private string _nameFolder = "../Oficina/";


        [Obsolete]
        public OficinaController(
                                 IConfiguration configuration,
                                 IHostingEnvironment env,
                                 ILogger<OficinaController> _logger)
        {
            _configuration      = configuration;
             _env               = env;
            logger              = _logger;
        }

    
        public string GetPathServer()
        {
            return $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/";
        }

    
        [HttpGet]
        //[Route("fact/{company}")]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(JRBQTO.CORE.ModelViews.Base.LoginView credenciales)
        {
            return Redirect("~/Clientes/Index"); 
        }
    }
}