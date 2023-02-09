using CourseWork.DATA_ACCESS;
using CourseWork.DATA_ACCESS.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;

namespace CourseWork.DOMAIN.Seeder
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services,
          IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();

                var users = new List<User>()
                {
                };
            }
        }
    }
}
