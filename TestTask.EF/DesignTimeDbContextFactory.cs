using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace TestTask.EF
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationContext>
    {
        private string _connectionString
        {
            get
            {
                return "Host=localhost;Port=5432;Database=usersdb;Username=postgres;Password=432432";
            }
        }

        public ApplicationContext CreateDbContext(string[] args)
        {
            return new ApplicationContext(_connectionString);
        }
    }
}
