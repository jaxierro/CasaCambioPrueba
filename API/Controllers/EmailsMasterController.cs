using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CasaCambio.Core.Interface;
using CasaCambio.Core.Models;
using CasaCambio.Core.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CasaCambio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailsMasterController : ControllerBase
    {
        private readonly ILogger<EmailsMasterController> _logger;
        private IEmailsMasters _emailMaster;

        public EmailsMasterController(ILogger<EmailsMasterController> logger, IEmailsMasters servicesMaster)
        {
            _logger         = logger;
            _emailMaster    = servicesMaster;
        }


        [HttpPost]
        [Route("Create")]
        public Response<Emails> Create([FromBody] Emails model)
        {
            try
            {
                var rs = _emailMaster.Add(model);
                if (rs.IsSuccess) return new Response<Emails> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else
                {
                    _logger.LogError(rs.Message);
                    return new Response<Emails> { IsSuccess = false, Message = rs.Message, Result = null };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return null;
        }

        [HttpPost]
        [Route("Update")]
        public Response<Emails> Update([FromBody] Emails model)
        {
            try
            {
                var rs = _emailMaster.Alter(model);
                if (rs.IsSuccess) new Response<Emails> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else
                {
                    _logger.LogError(rs.Message);
                    return new Response<Emails> { IsSuccess = false, Message = rs.Message, Result = null };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return null;
        }

        [HttpPost]
        [Route("Delete")]
        public Response<Emails> Delete([FromBody] Emails model)
        {
            try
            {
                var rs = _emailMaster.Remove(model);
                if (rs.IsSuccess) return new Response<Emails> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else
                {
                    _logger.LogError(rs.Message);
                    return new Response<Emails> { IsSuccess = false, Message = rs.Message, Result = null };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return null;
        }


        [HttpGet]
        [Route("Get")]
        public Response<Emails> Get(int? id)
        {
            try
            {
                var rs = _emailMaster.Get(id);
                if (rs.IsSuccess) return new Response<Emails> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else
                {
                    _logger.LogError(rs.Message);
                    return new Response<Emails> { IsSuccess = false, Message = rs.Message, Result = null };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return null;
        }

        [HttpGet]
        [Route("GetAll")]
        public Response<List<Emails>> GetAll()
        {
            try
            {
                var rs = _emailMaster.GetAll();
                if (rs.IsSuccess) return new Response<List<Emails>> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else
                {
                    _logger.LogError(rs.Message);
                    return new Response<List<Emails>> { IsSuccess = false, Message = rs.Message, Result = null };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new Response<List<Emails>> { IsSuccess = false, Message = ex.Message, Result = null };
            }

        }

        [HttpGet]
        [Route("GetAllEmailByClients")]
        public Response<List<Emails>> GetAllEmailByClients(int id)
        {
            try
            {
                var rs = _emailMaster.GetAllEmailByClients(id);
                if (rs.IsSuccess) return new Response<List<Emails>> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else
                {
                    _logger.LogError(rs.Message);
                    return new Response<List<Emails>> { IsSuccess = false, Message = rs.Message, Result = null };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new Response<List<Emails>> { IsSuccess = false, Message = ex.Message, Result = null };
            }

        }


    }
}
