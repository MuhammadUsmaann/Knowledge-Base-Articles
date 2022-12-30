using System.Collections.Generic;
using System.Threading.Tasks;

namespace KBProject.DBAccess
{
    public interface IDBService
    {
        bool StartTransection();
        bool RollBack();
        Task<List<TResult>> ExecuteSP<TResult>(string spName, dynamic param = null, bool buffered = false);
        Task<List<TResult>> ExecuteQuery<TResult>(string spName, dynamic param = null);
        void SaveChanges();
    }
}
