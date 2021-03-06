using CasaCambio.Core.Interface;
using CasaCambio.Core.Models;
using CasaCambio.Core.Utils;
using System.Collections.Generic;

namespace CasaCambio.Core.Interface
{
    public interface IEmailsMasters : ICRUD<Emails>
    {
        PagedResponse<List<Emails>> GetPagedList(PaginationRequest paginationRequest, string query);

        Response<List<Emails>> GetAll();

        Response<List<Emails>> GetAllEmailByClients(int Id);
    }
}
