using System.Data.SqlClient;


namespace CasaCambio.Core.Data
{
    public interface IBaseDA
    {
        SqlConnection Conectar();
    }
}
