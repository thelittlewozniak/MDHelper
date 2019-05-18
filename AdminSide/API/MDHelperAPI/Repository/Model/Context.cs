﻿using Microsoft.EntityFrameworkCore;

namespace Repository.Model
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public Context(DbContextOptions<Context> options)
            : base(options)
        { }
    }
}
