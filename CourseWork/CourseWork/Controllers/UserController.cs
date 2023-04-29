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
        private readonly EFContext context;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IJWTTokenServices jwtTokenService;

        public UserController(
            EFContext _context,
            UserManager<User> _userManager,
            SignInManager<User> _signInManager,
            IJWTTokenServices _jwtTokenService
            )
        {
            this.context = _context;
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

        [HttpGet("get-assessments-by-id")]
        public List<StudentAssessmentDTO> GetAssessmentsByStudentId([FromQuery] string id)
        {
            var user = context.Students.FirstOrDefault(x => x.Id == id);
            return context.StudentAssessments.Where(x => x.StudentId == user.Id)
                .Select(a => new StudentAssessmentDTO()
                {
                    Id = a.Id,
                    StudentName = user.OwnEmail,
                    SubjectName = context.Subjects.FirstOrDefault(x => x.Id == a.SubjectId).Name,
                    Value = a.Value
                }).ToList();
        }

        [HttpGet("get-classmates-by-id")]
        public List<StudentDTO> GetClassmatesByStudentId([FromQuery] string id)
        {
            var user = context.Students.FirstOrDefault(x => x.Id == id);
            return context.Students.Where(x => x.GroupId == user.GroupId)
                .Select(st => new StudentDTO()
                {
                    Id = st.Id,
                    OwnEmail = st.OwnEmail,
                    GroupName = context.Groups.FirstOrDefault(g => g.Id == st.GroupId).Name
                }).ToList();
        }


        з

        [HttpGet("get-current-user")]
        public UserDTO GetCurrentUser([FromQuery] string email)
        {
            var user = context.Users.FirstOrDefault(st => st.Email == email);
            if (email == null)
            {
                return new UserDTO();
            }
            else
            {
                return new UserDTO()
                {
                    Id = user.Id,
                    CooperativeEmail = user.CooperativeEmail,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    MiddleName = user.MiddleName
                };
            }
        }
    }
}