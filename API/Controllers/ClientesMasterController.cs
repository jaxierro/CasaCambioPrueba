using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CasaCambio.Core.Interface;
using CasaCambio.Core.Models;
using CasaCambio.Core.Utils;
using Newtonsoft.Json;

namespace CasaCambio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesMasterController : ControllerBase
    {
        private readonly ILogger<ClientesMasterController> _logger;
        private IClientesMasters _clientesMaster;

        public ClientesMasterController(ILogger<ClientesMasterController> logger, IClientesMasters Clientes)
        {
            _logger          = logger;
            _clientesMaster = Clientes;
        }


        [HttpPost]
        [Route("Create")]
        public Response<Clientes> Create([FromBody] Clientes model)
        {
            try
            {
                //var model = JsonConvert.DeserializeObject<Clientes>(valueJson);
                var rs = _clientesMaster.Add(model);
                if (rs.IsSuccess) return new Response<Clientes> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else 
                {
                    _logger.LogError(rs.Message);
                    return new Response<Clientes> { IsSuccess = false, Message = rs.Message, Result = null };
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
        public Response<Clientes> Update([FromBody] Clientes model)
        {
            try
            {
                var rs = _clientesMaster.Alter(model);
                if (rs.IsSuccess) return new Response<Clientes> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else 
                {
                    _logger.LogError(rs.Message);
                    return new Response<Clientes> { IsSuccess = false, Message = rs.Message, Result = null };
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
        public Response<Clientes> Delete(Clientes model)
        {
            try
            {
                var rs = _clientesMaster.Remove(model);
                if (rs.IsSuccess) return new Response<Clientes> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else
                {
                    _logger.LogError(rs.Message);
                    return new Response<Clientes> { IsSuccess = false, Message = rs.Message, Result = null };
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
        public Response<Clientes> Get(int? id)
        {
            try
            {
                var rs = _clientesMaster.Get(id);
                if (rs.IsSuccess) return new Response<Clientes> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else
                {
                    _logger.LogError(rs.Message);
                    return new Response<Clientes> { IsSuccess = false, Message = rs.Message, Result = null };
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
        public Response<List<Clientes>> GetAll()
        {
            try
            {
                var rs = _clientesMaster.GetAll();
                if (rs.IsSuccess) return new Response<List<Clientes>> { IsSuccess = true, Message = "OK", Result = rs.Result };
                else
                {
                    _logger.LogError(rs.Message);
                    return new Response<List<Clientes>> { IsSuccess = false, Message = rs.Message, Result = null };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return null;
        }


    }
}
