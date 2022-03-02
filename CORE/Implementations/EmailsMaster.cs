using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using CasaCambio.Core.Data;
using CasaCambio.Core.Interface;
using CasaCambio.Core.Models;
using CasaCambio.Core.Utils;

namespace CasaCambio.Core.Implementations
{
    public class EmailMastersDA : BaseDA, IEmailsMasters
    {
        public EmailMastersDA(IConfiguration configuration) : base(configuration.GetConnectionString("DefaultConnection"))
        {

        }

        public Response<Emails> Add(Emails model)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    context.Emails.Add(model);
                    context.SaveChanges();
                    var LastId = context.Emails.Last().IdEmail;
                    return Get((int)LastId);
                }
            }
            catch (Exception ex)
            {
                return new Response<Emails>(false, ex.Message);
            }
        }

        public Response<Emails> Alter(Emails model)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    context.Emails.Update(model);
                    context.SaveChanges();
                    return new Response<Emails>(true, result: model);
                }
            }
            catch (Exception ex)
            {
                return new Response<Emails>(false, ex.Message);
            }
        }

        public Response<Emails> Remove(Emails model)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    context.Emails.Remove(model);
                    context.SaveChanges();
                    return new Response<Emails>(true, result: model);
                }
            }
            catch (Exception ex)
            {
                return new Response<Emails>(false, ex.Message);
            }
        }


        public Response<List<Emails>> GetAllEmailByClients(int Id)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    List<Emails> Lst = (from Emails in context.Emails
                                        join Clientes in context.Clientes on Emails.IdCliente equals Clientes.IdCliente
                                        where Clientes.Estatus == 1 && Emails.Estatus == 1 && Clientes.IdCliente == Id
                                        select new Emails()
                                        {
                                            IdEmail = Emails.IdEmail,
                                            IdCliente = Emails.IdCliente,
                                            Email = Emails.Email,
                                            FechaReg = Emails.FechaReg,
                                            FechaAct = Emails.FechaAct,
                                            NombreCliente = Clientes.Nombres + ' ' + Clientes.Apellidos
                                        }).ToList();

                    return new Response<List<Emails>>(true, result: Lst);
                }
            }
            catch (Exception ex)
            {
                return new Response<List<Emails>>(false, ex.Message);
            }
        }

        public Response<List<Emails>> GetAll()
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
        
                    List<Emails> Lst = (from Emails in context.Emails
                                        join Clientes in context.Clientes on Emails.IdCliente equals Clientes.IdCliente
                                        where Clientes.Estatus == 1 && Emails.Estatus == 1
                                        select new Emails()
                                        {
                                            IdEmail       = Emails.IdEmail,
                                            IdCliente     = Emails.IdCliente,
                                            Email         = Emails.Email,
                                            FechaReg      = Emails.FechaReg,
                                            FechaAct      = Emails.FechaAct,
                                            NombreCliente = Clientes.Nombres + ' ' + Clientes.Apellidos
                                        }).ToList();
                    return new Response<List<Emails>>(true, result: Lst);
                }
            }
            catch (Exception ex)
            {
                return new Response<List<Emails>>(false, ex.Message);
            }
        }

        public Response<Emails> Create(Emails model)
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
                        return new Response<Emails>(false, "algo salio mal");
                    }
                }
            }
            catch (Exception ex)
            {
                return new Response<Emails>(false, ex.Message);
            }
        }

        public Response<Emails> Delete(Emails model)
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    var a = conn.Delete(model);

                    if (a)
                    {
                        return new Response<Emails>(true, result: model);
                    }
                    else
                    {
                        return new Response<Emails>(false, "algo salio mal");
                    }
                }
            }
            catch (Exception ex)
            {
                return new Response<Emails>(false, ex.Message);
            }
        }

        public Response<Emails> Get(int? id)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    var Lst = context.Emails.FirstOrDefault(x => x.IdEmail == id);
                    return new Response<Emails>(true, result: Lst);
                }
            }
            catch (Exception ex)
            {
                return new Response<Emails>(false, ex.Message);
            }
        }

        public Response<List<Emails>> List()
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    var a = conn.GetAll<Emails>();

                    return new Response<List<Emails>>(true, result: a.ToList());
                }
            }
            catch (Exception ex)
            {
                return new Response<List<Emails>>(false, ex.Message);
            }
        }

        public Response<Emails> Update(Emails model)
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    var a = conn.Update(model);

                    if (a)
                    {
                        return new Response<Emails>(true, result: model);
                    }
                    else
                    {
                        return new Response<Emails>(false, "algo salio mal");
                    }
                }
            }
            catch (Exception ex)
            {
                return new Response<Emails>(false, ex.Message);
            }
        }

        public PagedResponse<List<Emails>> GetPagedList(PaginationRequest paginationRequest, string query)
        {
            try
            {
                using (SqlConnection conn = Conectar())
                {
                    PagedResponse pagedResponse = null;

                    var resultQuery = conn.Query(
                        sql: $"SELECT e.*, null as 'Splitter', {paginationRequest.PageNumber} as 'PageNumber', {paginationRequest.PageSize} as 'PageSize',  TotalRecords, CEILING(TotalRecords / CAST( {paginationRequest.PageSize} AS DECIMAL (5,2))) AS TotalPages FROM Emails e CROSS APPLY (SELECT COUNT(*) TotalRecords FROM TemplatesTicketsAsoss where IdTemp like '%{query}%')[Count] where e.IdTemp like '%{query}%' ORDER BY e.Name OFFSET ({paginationRequest.PageNumber} - 1) * {paginationRequest.PageSize} ROWS FETCH NEXT {paginationRequest.PageSize} ROWS ONLY",
                        new[]
                        {
                            typeof(Emails),
                            typeof(PagedResponse)
                        },
                        (obj) =>
                        {
                            Emails Registros = obj[0] as Emails;
                            var response = obj[1] as PagedResponse;

                            pagedResponse = response;
                            return Registros;
                        }, splitOn: "Splitter"
                        ).Distinct().ToList();

                    return new PagedResponse<List<Emails>>(true, "", resultQuery, pagedResponse);
                }
            }
            catch (Exception ex)
            {
                return new PagedResponse<List<Emails>>(false, ex.Message);
            }
        }

        private Emails LoadRecord(DataRow itemRow)
        {
            if (itemRow != null)
            {
                return new Emails()
                {
                    IdEmail    = (itemRow["IdEmail"] != DBNull.Value) ? Convert.ToInt16(itemRow["IdEmail"]) : 0,
                    IdCliente  = (itemRow["IdCliente"] != DBNull.Value) ? Convert.ToInt16(itemRow["IdCliente"]) : 0,
                    Email      = (itemRow["Email"] != DBNull.Value) ? Convert.ToString(itemRow["Email"]) : "-",
                    FechaReg   = (itemRow["FechaReg"] != DBNull.Value) ? Convert.ToDateTime(itemRow["FechaReg"]) : DateTime.MinValue,
                    FechaAct   = (itemRow["FechaAct"] != DBNull.Value) ? Convert.ToDateTime(itemRow["FechaAct"]) : DateTime.MinValue,
                    Estatus    = (itemRow["Estatus"] != DBNull.Value) ? Convert.ToInt16(itemRow["Estatus"]) : 0
                };
            }

            return new Emails();
        }

        private List<Emails> LoadEmailsMasters(DataSet dsResult)
        {
            List<Emails> ListaDatos = new List<Emails>();

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
    }
}
