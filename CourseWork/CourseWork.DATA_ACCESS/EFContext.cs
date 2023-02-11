using CourseWork.DATA_ACCESS.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CourseWork.DATA_ACCESS
{
    public class EFContext : DbContext
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Database=CourseWork;Trusted_Connection=True;");
        //}

        public DbSet<User> Users { get; set; }
        public DbSet<StudentAssessment> StudentAssessments { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Speciality> Specialities { get; set; }
        public DbSet<Student> Students { get; set; }
        //public DbSet<GroupSubjects> GroupSubjects { get; set; }
        public DbSet<SubjectTeacher> SubjectTeachers { get; set; }
        //public DbSet<SpeciallityGroup> SpeciallityGroup { get; set; }

    }
}