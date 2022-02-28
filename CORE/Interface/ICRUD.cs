using System.Collections.Generic;
using CasaCambio.Core.Utils;

namespace CasaCambio.Core.Interface
{
    public interface ICRUD<T> where T : class
    {
        Response<T> Create(T model);
        Response<T> Update(T model);
        Response<T> Delete(T model);

        Response<T> Add(T model);
        Response<T> Alter(T model);
        Response<T> Remove(T model);

        Response<T> Get(int? id);
        Response<List<T>> List();
    }
}
