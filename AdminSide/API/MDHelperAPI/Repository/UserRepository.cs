using Microsoft.EntityFrameworkCore;
using Repository.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository
{
    public class UserRepository : IRepository<User>
    {
        private readonly Context context;
        public UserRepository(Context context)
        {
            this.context = context;
        }
        public async Task<User> Get(int id)
        {
            return await context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }
        public async Task<IEnumerable<User>> GetAll()
        {
            return await context.Users.ToListAsync();
        }
        public async Task<bool> Add(User u)
        {
            var user = await context.Users.FirstOrDefaultAsync(us => us.Username == u.Username);
            if (user != null) return false;
            try
            {

                await context.Users.AddAsync(u);
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
        public async Task<bool> Delete(int id)
        {
            var user = await context.Users.FirstOrDefaultAsync(us => us.Id == id);
            if (user == null) return false;
            try
            {
                context.Users.Remove(user);
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
        public Task<User> Update(User updateElement)
        {
            throw new NotImplementedException();
        }
        // Dispose() calls Dispose(true)
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                // free managed resources
                if (context != null)
                {
                    context.Dispose();
                }
            }
        }
    }
}
