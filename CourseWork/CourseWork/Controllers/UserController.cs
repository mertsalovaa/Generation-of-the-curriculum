using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System;
using CourseWork.DTO;
using CourseWork.DATA_ACCESS;
using CourseWork.DATA_ACCESS.Entities;
using CourseWork.DATA_ACCESS.Constants;
using CourseWork.DTO.Result;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using CourseWork.DOMAIN.Validator;
using CourseWork.DOMAIN.JWT;
using System.IO;
using System.Text;

namespace CourseWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //private readonly EFContext context;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IJWTTokenServices jwtTokenService;

        public UserController(
            //EFContext _context,
            UserManager<User> _userManager,
            SignInManager<User> _signInManager,
            IJWTTokenServices _jwtTokenService
            )
        {
            //this.context = _context;
            this.userManager = _userManager;
            this.signInManager = _signInManager;
            this.jwtTokenService = _jwtTokenService;
        }


        [HttpPost("login")]
        public async Task<ResultDTO> Login([FromBody] LoginDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new ResultErrorDTO
                    {
                        Message = "ERROR",
                        Status = 401,
                        Errors = CustomValidator.getErrorsByModel(ModelState)
                    };
                }

                var result = signInManager.PasswordSignInAsync(model.Email, model.Password, false, false).Result;

                if (!result.Succeeded)
                {
                    return new ResultErrorDTO
                    {
                        Status = 403,
                        Message = "ERROR",
                        Errors = new List<string> { "Incorrect email or password" }
                    };
                }
                else
                {
                    var user = await userManager.FindByEmailAsync(model.Email);
                    await signInManager.SignInAsync(user, false);


                    return new ResultLoginDTO
                    {
                        Status = 200,
                        Message = "OK",
                        Token = jwtTokenService.CreateToken(user)
                    };
                }
            }
            catch (Exception e)
            {
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "ERROR",
                    Errors = new List<string> { e.Message }
                };
            }
        }

        [HttpGet("generate-abiturient")]
        public Abiturient GetAbiturient([FromQuery] string lastName, string firstName, string fatherName, string institute,  string phone)
        {
            var map = new Dictionary<char, string>
            {
                { 'а', "a" }, { 'б', "b" }, { 'в', "v" }, { 'г', "h" },
                { 'ґ', "g" }, { 'д', "d" }, { 'е', "e" }, { 'є', "ie" },
                { 'ж', "zh" }, { 'з', "z" }, { 'и', "y" }, { 'і', "i" },
                { 'ї', "yi" }, { 'й', "y" }, { 'к', "k" }, { 'л', "l" },
                { 'м', "m" }, { 'н', "n" }, { 'о', "o" }, { 'п', "p" },
                { 'р', "r" }, { 'с', "s" }, { 'т', "t" }, { 'у', "u" },
                { 'ф', "f" }, { 'х', "kh" }, { 'ц', "ts" }, { 'ч', "ch" },
                { 'ш', "sh" }, { 'щ', "shch" }, { 'ю', "yi" }, { 'я', "ya" }, { 'ь', "" }, {' ', ""}
            };
            var abiturient = new Abiturient();
            DateTime dateNow = DateTime.Now;
            string year = dateNow.ToString("yy");
            abiturient.Email = $"{string.Concat(lastName.ToLower().Select(x => map[x]))}_{institute.ToLower()}{year}@nuwm.edu.ua";
            abiturient.Password = GeneratePassword();

            string textOfFile = "";
            using (StreamReader reader = new StreamReader(@"D:\нувгп\ІПЗ-21\курсова робота\CourseWork\CourseWork\abiturients.txt"))
            {
                textOfFile = reader.ReadToEnd();
            }
            using (StreamWriter writer = new StreamWriter(@"D:\нувгп\ІПЗ-21\курсова робота\CourseWork\CourseWork\abiturients.txt"))
            {
                writer.WriteLine($"{textOfFile}\n{lastName}  {firstName}  {abiturient.Email}\t  {abiturient.Password}");
            }

            return abiturient;
        }
        [HttpGet]
        public string GeneratePassword()
        {
            var options = userManager.Options.Password;

            int length = options.RequiredLength;

            bool nonAlphanumeric = options.RequireNonAlphanumeric;
            bool digit = options.RequireDigit;
            bool lowercase = options.RequireLowercase;
            bool uppercase = options.RequireUppercase;

            StringBuilder password = new StringBuilder();
            Random random = new Random();

            while (password.Length < length)
            {
                char c = (char)random.Next(32, 126);

                password.Append(c);

                if (char.IsDigit(c))
                    digit = false;
                else if (char.IsLower(c))
                    lowercase = false;
                else if (char.IsUpper(c))
                    uppercase = false;
                else if (!char.IsLetterOrDigit(c))
                    nonAlphanumeric = false;
            }

            if (nonAlphanumeric)
                password.Append((char)random.Next(33, 48));
            if (digit)
                password.Append((char)random.Next(48, 58));
            if (lowercase)
                password.Append((char)random.Next(97, 123));
            if (uppercase)
                password.Append((char)random.Next(65, 91));

            return password.ToString();
        }

        //[HttpGet("get")]
        //public List<StudentDTO> GetStudents()
        //{
        //    return context.Students.Select(st => new StudentDTO()
        //    {
        //        Id = st.Id,
        //        User = new UserDTO()
        //        {
        //            Id = st.Id,
        //            LastName = st.User.LastName,
        //            FirstName = st.User.FirstName,
        //            MiddleName = st.User.MiddleName,
        //            CooperativeEmail = st.User.CooperativeEmail,
        //        },
        //        OwnEmail = st.OwnEmail,
        //        GroupName = st.Group.Name,
        //        Assessments = st.Assessments.Select(a => new StudentAssessmentDTO()
        //        {
        //            Id = a.Id,
        //            StudentName = a.Student.User.CooperativeEmail,
        //            SubjectName = a.Subject.Name,
        //            Value = a.Value
        //        }).ToList()
        //    }).ToList();
        //}

        //[HttpGet("teachers")]
        //public List<TeacherDTO> GetTeachers()
        //{
        //    return context.Teachers.Select(t => new TeacherDTO()
        //    {
        //        Id = t.Id,
        //        User = new UserDTO()
        //        {
        //            Id = t.Id,
        //            LastName = t.User.LastName,
        //            FirstName = t.User.FirstName,
        //            MiddleName = t.User.MiddleName,
        //            CooperativeEmail = t.User.CooperativeEmail,
        //        },
        //        Subjects = context.SubjectTeachers.Where(s => s.TeacherId == t.Id).Select(s => new SubjectDTO()
        //        {
        //            Id = s.Id,
        //            Name = s.Subject.Name,
        //            Credits = s.Subject.Credits,
        //            FormOfControl = s.Subject.FormOfControl.GetDisplayName(),
        //            Description = s.Subject.Description,
        //            Labworks = s.Subject.Labworks,
        //            Lectures = s.Subject.Lectures,
        //            Practical = s.Subject.Practical
        //        }).ToList()
        //    }).ToList();
        //}

        //private UserDTO GetUser(User user)
        //{
        //    return new UserDTO()
        //    {
        //        LastName = user.LastName,
        //        FirstName = user.FirstName,
        //        MiddleName = user.MiddleName,
        //        CooperativeEmail = user.CooperativeEmail,
        //    };
        //}


        //private List<SubjectDTO> GetSubjects(string id)
        //{
        //    return context.SubjectTeachers.Where(s => s.TeacherId == id).Select(s => new SubjectDTO()
        //    {
        //        Id = s.Id,
        //        Name = s.Subject.Name,
        //        Credits = s.Subject.Credits,
        //        FormOfControl = s.Subject.FormOfControl.GetDisplayName(),
        //        Description = s.Subject.Description,
        //        Labworks = s.Subject.Labworks,
        //        Lectures = s.Subject.Lectures,
        //        Practical = s.Subject.Practical
        //    }).ToList();
        //}

        //[HttpGet("groups")]
        //public List<GroupDTO> GetGroups()
        //{
        //    return context.Groups.Select(g => new GroupDTO()
        //    {
        //        Id = g.Id,
        //        Name = g.Name,
        //        FormOfStudying = g.FormOfStudying,
        //        Speciality = g.Speciality.Name,
        //        Students = context.Students.Where(st => st.GroupId == g.Id).Select(st => new StudentDTO()
        //        {
        //            Id = st.Id,
        //            User = new UserDTO()
        //            {
        //                Id = st.Id,
        //                LastName = st.User.LastName,
        //                FirstName = st.User.FirstName,
        //                MiddleName = st.User.MiddleName,
        //                CooperativeEmail = st.User.CooperativeEmail,
        //            },
        //            OwnEmail = st.OwnEmail,
        //            GroupName = st.Group.Name
        //        }).ToList(),
        //        Сurriculum = new СurriculumDTO()
        //        {
        //            Id = g.Сurriculum.Id,
        //            Name = g.Сurriculum.Name,
        //            Year = g.Сurriculum.Year,
        //            Subjects = g.Сurriculum.Subjects.Select(s => new SubjectDTO()
        //            {
        //                Id = s.Id,
        //                Name = s.Name,
        //                Credits = s.Credits,
        //                FormOfControl = s.FormOfControl.GetDisplayName(),
        //                Description = s.Description,
        //                Labworks = s.Labworks,
        //                Lectures = s.Lectures,
        //                Practical = s.Practical,
        //                Teachers = context.SubjectTeachers.Where(sb => sb.Id == s.Id).Select(t =>
        //                new TeacherDTO()
        //                {
        //                    Id = t.Teacher.Id,
        //                    User = new UserDTO()
        //                    {
        //                        Id = t.Teacher.Id,
        //                        LastName = t.Teacher.User.LastName,
        //                        FirstName = t.Teacher.User.FirstName,
        //                        MiddleName = t.Teacher.User.MiddleName,
        //                        CooperativeEmail = t.Teacher.User.CooperativeEmail,
        //                    }
        //                }).ToList()
        //            }).ToList()
        //        }
        //    }).ToList();
        //}
    }
}