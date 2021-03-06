using System;
using System.Collections.Generic;
using CasaCambio.Core.Models;
using CasaCambio.Core.Utils;

namespace CasaCambio.Core.Interface
{
    public interface IClientesMasters : ICRUD<Clientes>
    {
        PagedResponse<List<Clientes>> GetPagedList(PaginationRequest paginationRequest, string query);

        Response<List<Clientes>> GetAll();

        Response<Clientes> First(int? id);

    }
   
}
