using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MDHelperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Context context;
        public UserController(Context context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            using (IRepository<User> userRepository = new UserRepository(context))
            {
                return await userRepository.GetAll();
            }
        }
        [HttpPost]
        public async Task<bool> Add(User u)
        {
            using (IRepository<User> userRepository = new UserRepository(context))
            {
                return await userRepository.Add(u);
            }
        }
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            using (IRepository<User> userRepository = new UserRepository(context))
            {
                return await userRepository.Delete(id);
            }
        }
    }
}