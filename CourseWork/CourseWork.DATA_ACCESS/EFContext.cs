using CourseWork.DATA_ACCESS.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CourseWork.DATA_ACCESS
{
    public class EFContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<StudentAssessment> StudentAssessments { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Speciallity> Speciallities { get; set; }
        public DbSet<Student> Students { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Database=CourseWork;Trusted_Connection=True;");
        }
    }
}
