using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository
{
    public interface IRepository<T>:IDisposable
    {
        Task<T> Get(int id);
        Task<IEnumerable<T>> GetAll();
        Task<bool> Add(T newElement);
        Task<bool> Delete(int id);
        Task<T> Update(T updateElement);
    }
}
