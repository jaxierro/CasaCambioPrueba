using System;
using System.Collections.Generic;
using System.Linq;
using CasaCambio.Core.Data;
using CasaCambio.Core.Models;
using CasaCambio.Core﻿using System;
using System.Collections.Generic;
using System.Linq;
using CasaCambio.Core.Data;
using CasaCambio.Core.Models;
using CasaCambio.Core.Interface;
using Microsoft.Extensions.Configuration;
using CasaCambio.Core.Utils;
using System.Data.SqlClient;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Data;

namespace CasaCambio.Core.Implementations
{
    public class ClientesMastersDA : BaseDA, IClientesMasters
    {
        public ClientesMastersDA(IConfiguration configuration) : base(configuration.GetConnectionString("DefaultConnection"))
        {

        }

        public Response<Clientes> Add(Clientes model)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    context.Clientes.Add(model);
                    context.SaveChanges();
                    var record = context.Clientes.Last();
                    return new Response<Clientes>(true, result: record); 
                }
            }
            catch (Exception ex)
            {
                return new Response<Clientes>(false, ex.InnerException.Message);
            }
        }

        public Response<Clientes> Alter(Clientes model)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    context.Clientes.Update(model);
                    context.SaveChanges();
                    return new Response<Clientes>(true, result: model);
                }
            }
            catch (Exception ex)
            {
                return new Response<Clientes>(false, ex.Message);
            }
        }

        public Response<Clientes> Remove(Clientes model)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    context.Clientes.Remove(model);
                    context.SaveChanges();
                    return new Response<Clientes>(true, result: model);
                }
            }
            catch (Exception ex)
            {
                return new Response<Clientes>(false, ex.Message);
            }
        }

        public Response<List<Clientes>> GetAll()
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    var Lst = context.Clientes.Where(x => x.Estatus == 1).ToList();
                    return new Response<List<Clientes>>(true, result: Lst);
                }
            }
            catch (Exception ex)
            {
                return new Response<List<Clientes>>(false, ex.Message);
            }
        }

        public Response<Clientes> Get(int? id)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    var Lst = context.Clientes.Where(x => x.IdCliente == id).First();
                    return new Response<Clientes>(true, result: Lst);
                }
            }
            catch (Exception ex)
            {
                return new Response<Clientes>(false, ex.Message);
            }
        }

        public Response<Clientes> Create(Clientes model)
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    var a = conn.Insert(model);

                    if (a >= 0)
                    {
                        return Get((int)a);
                    }
                    else
                    {
                        return new Response<Clientes>(false, "algo salio mal");
                    }
                }
            }
            catch (Exception ex)
            {
                return new Response<Clientes>(false, ex.Message);
            }
        }

        public Response<Clientes> Delete(Clientes model)
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    var a = conn.Delete(model);

                    if (a)
                    {
                        return new Response<Clientes>(true, result: model);
                    }
                    else
                    {
                        return new Response<Clientes>(false, "algo salio mal");
                    }
                }
            }
            catch (Exception ex)
            {
                return new Response<Clientes>(false, ex.Message);
            }
        }

        public Response<Clientes> First(int? id)
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    var a = conn.Get<Clientes>(id);

                    return new Response<Clientes>(true, result: a);
                }
            }
            catch (Exception ex)
            {
                return new Response<Clientes>(false, ex.Message);
            }
        }

        public Response<List<Clientes>> List()
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    var a = conn.GetAll<Clientes>();

                    return new Response<List<Clientes>>(true, result: a.ToList());
                }
            }
            catch (Exception ex)
            {
                return new Response<List<Clientes>>(false, ex.Message);
            }
        }

        public Response<Clientes> Update(Clientes model)
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    var a = conn.Update(model);

                    if (a)
                    {
                        return new Response<Clientes>(true, result: model);
                    }
                    else
                    {
                        return new Response<Clientes>(false, "algo salio mal");
                    }
                }
            }
            catch (Exception ex)
            {
                return new Response<Clientes>(false, ex.Message);
            }
        }

        public PagedResponse<List<Clientes>> GetPagedList(PaginationRequest paginationRequest, string query)
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    PagedResponse pagedResponse = null;

                    var resultQuery = conn.Query(
                        sql: $"SELECT e.*, null as 'Splitter', {paginationRequest.PageNumber} as 'PageNumber', {paginationRequest.PageSize} as 'PageSize',  TotalRecords, CEILING(TotalRecords / CAST( {paginationRequest.PageSize} AS DECIMAL (5,2))) AS TotalPages FROM Clientes e CROSS APPLY (SELECT COUNT(*) TotalRecords FROM TemplatesTicketsAsoss where IdTemp like '%{query}%')[Count] where e.IdTemp like '%{query}%' ORDER BY e.Name OFFSET ({paginationRequest.PageNumber} - 1) * {paginationRequest.PageSize} ROWS FETCH NEXT {paginationRequest.PageSize} ROWS ONLY",
                        new[]
                        {
                            typeof(Clientes),
                            typeof(PagedResponse)
                        },
                        (obj) =>
                        {
                            Clientes Registros = obj[0] as Clientes;
                            var response = obj[1] as PagedResponse;

                            pagedResponse = response;
                            return Registros;
                        }, splitOn: "Splitter"
                        ).Distinct().ToList();

                    return new PagedResponse<List<Clientes>>(true, "", resultQuery, pagedResponse);
                }
            }
            catch (Exception ex)
            {
                return new PagedResponse<List<Clientes>>(false, ex.Message);
            }
        }

        private Clientes LoadRecord(DataRow itemRow)
        {
            if (itemRow != null)
            {
                return new Clientes()
                {
                    IdCliente         = (itemRow["IdCliente"] != DBNull.Value) ? Convert.ToInt16(itemRow["IdCliente"]) : 0,
                    DocumentoID       = (itemRow["DocumentoID"] != DBNull.Value) ? Convert.ToString(itemRow["DocumentoID"]) : "-",
                    Nombres           = (itemRow["Nombres"] != DBNull.Value) ? Convert.ToString(itemRow["Nombres"]) : "-",
                    Apellidos         = (itemRow["Apellidos"] != DBNull.Value) ? Convert.ToString(itemRow["Apellidos"]) : "-",
                    FechaReg          = (itemRow["FechaReg"] != DBNull.Value) ? Convert.ToDateTime(itemRow["FechaReg"]) : DateTime.MinValue,
                    FechaAct          = (itemRow["FechaAct"] != DBNull.Value) ? Convert.ToDateTime(itemRow["FechaAct"]) : DateTime.MinValue,
                    Estatus           = (itemRow["Estatus"] != DBNull.Value) ? Convert.ToInt16(itemRow["Estatus"]) : 0
                };
            }

            return new Clientes();
        }

        private List<Clientes> LoadClientesMaster(DataSet dsResult)
        {
            List<Clientes> ListaDatos = new List<Clientes>();

            if (dsResult != null)
            {
                if (dsResult.Tables != null && dsResult.Tables.Count > 0)
                {
                    foreach (DataRow itemRow in dsResult.Tables[0].Rows)
                    {
                        ListaDatos.Add(LoadRecord(itemRow));
                    }
                }
            }

            return ListaDatos;
        }

        //public JsonResult GetEventCategory(string q)
        //{
        //    using (IDbConnection dbConnection = Connection)
        //    {
        //        var categories = dbConnection.Query<ResultTokenInput>("GetEventCategories", new { keyword = q },
        //commandType: CommandType.StoredProcedure).FirstOrDefault();

        //        return Json(categories);
        //    }
        //}


    }
}
