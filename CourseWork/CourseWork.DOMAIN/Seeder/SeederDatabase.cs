using CourseWork.DATA_ACCESS;
using CourseWork.DATA_ACCESS.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace CourseWork.DOMAIN.Seeder
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services)
        //IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                //var manager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                //var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();

                var users = new List<User>()
                {
                    new User() {
                        LastName = "Мерцалова",
                        FirstName = "Ірина",
                        MiddleName = "Сергіївна",
                        CooperativeEmail = "mertsalova_ak21@nuwm.edu.ua" },
                    new User() {
                        LastName = "Мельник",
                        FirstName = "Яна",
                        MiddleName = "Василівна",
                        CooperativeEmail = "melnuk_ak20@nuwm.edu.ua" },
                    new User() {
                        LastName = "Білоус",
                        FirstName = "Діана",
                        MiddleName = "Вікторівна",
                        CooperativeEmail = "bilous_ak21@nuwm.edu.ua" },
                    new User() {
                        LastName = "Жуковський",
                        FirstName = "Віктор",
                        MiddleName = "Володимирович",
                        CooperativeEmail = "v.v.zhukovskyy@nuwm.edu.ua" },
                    new User() {
                        LastName = "Мічута",
                        FirstName = "Ольга",
                        MiddleName = "Романівна",
                        CooperativeEmail = "o.r.michuta@nuwm.edu.ua" }
                };
                context.Users.AddRange(users);

                var speciallities = new List<Speciality>()
                {
                    new Speciality() {
                        Name = "Інженерія програмного забезпечення",
                        Code = "121",
                        Description = "Інженерія прогамного забезпечення – це наука про принципи та методи, які застосовуються при розробці та супроводженні програмних систем. " +
                    "Вона вивчає застосування процеси розробки, експлуатації та супроводження програмного забезпечення (ПЗ), застосування принципів інженерії щодо процесу розробки ПЗ." },
                    new Speciality() {
                        Name = "Інформаційні системи і технології",
                        Code = "126",
                        Description = "Основним напрямком спеціалізації “Інформаційні системи та технології” є розробка та " +
                        "практичне використання інформаційних технологій з акцентом на системах Internet of things, Cloud сервісах, Big Data (сховищ)." },
                    new Speciality() {
                        Name = "Комп'ютерні науки",
                        Code = "122",
                        Description = "Комп'ютерні науки – загальна назва для групи дисциплін, які займаються різними аспектами розробки та застосування комп'ютерів, такими, " +
                        "як програмування, методи комп'ютерного та математичного моделювання, мови програмування, операційні системи, штучний інтелект, архітектура обчислювальних систем."
                    }
                };
                context.Specialities.AddRange(speciallities);

                context.SaveChanges();

                var groups = new List<Group>()
                {
                    new Group() { Name = "ІПЗ-21", FormOfStudying = "денна", SpecialityId = 1 },
                    new Group() { Name = "ІСТ-31", FormOfStudying = "денна", SpecialityId = 2 },
                    new Group() { Name = "КН-21", FormOfStudying = "денна", SpecialityId = 3 }
                };
                context.Groups.AddRange(groups);
                context.SaveChanges();

                var students = new List<Student>()
                {
                    new Student() { UserId = 1, OwnEmail = "irynamertsalova@gmail.com", GroupId = 1 },
                    new Student() { UserId = 2, OwnEmail = "yanamelnuk@gmail.com", GroupId = 2 },
                    new Student() { UserId = 3, OwnEmail = "dianabilous@gmail.com", GroupId = 3 }
                };
                context.Students.AddRange(students);

                var teachers = new List<Teacher>()
                {
                    new Teacher() { UserId = 3 },
                    new Teacher() { UserId = 4 }
                };
                context.Teachers.AddRange(teachers);

                context.SaveChanges();

                var subjects = new List<Subject>()
                {
                    new Subject() {
                        Name = "Об'єктно-орієнтоване програмування",
                        IsZalik = false,
                        IsExam = true, 
                        IsVybirkova = false,
                        Description = "Об'єктно - орієнтоване програмування (ООП) – це модель програмування " +
                    "яка базується на стверджені того, що програма це сукупність об’єктів які взаємодіють між собою."
                    },
                    new Subject() {
                        Name = "Комп'ютерна дискретна математика",
                        IsZalik = false,
                        IsExam = true,
                        IsVybirkova = false,
                        Description = "Дискретна математика — галузь математики, що вивчає властивості будь-яких дискретних структур."
                    },
                    new Subject() {
                        Name = "Комп’ютерна графіка",
                        IsZalik = false,
                        IsExam = true,
                        IsVybirkova = false,
                        Description = "Мета дисципліни — формування в студентів фундаментальних теоретичних знань і практичних " +
                    "навичок застосування комп'ютерних засобів при виконанні завдань, що включають створення графічних об'єктів різних типів. "
                    },
                    new Subject() {
                        Name = "Оптимізація обчислень",
                        IsZalik = false,
                        IsExam = false,
                        IsVybirkova = true,
                        Description = "Оптимізація обчислень в математиці, інформатиці та дослідженні операцій називають відбір найкращого елементу (за певним критерієм) з множини доступних альтернатив."
                    }
                };
                context.Subjects.AddRange(subjects);
                context.SaveChanges();

                var assessments = new List<StudentAssessment>() {
                    new StudentAssessment() { StudentId = 1, SubjectId = 1, AverageValue = 80 },
                    new StudentAssessment() { StudentId = 1, SubjectId = 2, AverageValue = 75 },
                    new StudentAssessment() { StudentId = 2, SubjectId = 3, AverageValue = 85 },
                    new StudentAssessment() { StudentId = 2, SubjectId = 4, AverageValue = 82 },
                    new StudentAssessment() { StudentId = 3, SubjectId = 1, AverageValue = 70 },
                    new StudentAssessment() { StudentId = 3, SubjectId = 4, AverageValue = 74 }
                };
                context.StudentAssessments.AddRange(assessments);

                context.SaveChanges();

                var subjectTeacher = new List<SubjectTeacher>()
                {
                    new SubjectTeacher(){ SubjectId = 1, TeacherId = 1 },
                    new SubjectTeacher(){ SubjectId = 2, TeacherId = 2 },
                    new SubjectTeacher(){ SubjectId = 3, TeacherId = 2 },
                    new SubjectTeacher(){ SubjectId = 4, TeacherId = 1 },
                };
                context.SubjectTeachers.AddRange(subjectTeacher);

                context.SaveChanges();
            }
        }
    }
}
