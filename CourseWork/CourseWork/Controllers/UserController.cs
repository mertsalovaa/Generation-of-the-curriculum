using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System;
using CourseWork.DTO;
using CourseWork.DATA_ACCESS;

namespace CourseWork.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly EFContext _context;

        public UserController(EFContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<StudentDTO> Get()
        {
            return _context.Students.Select(st => new StudentDTO()
            {
                Id = st.Id,
                LastName = st.,
                Price = st.Price,
                Date = st.Date,
                ServiceType = st.ServiceType.Name,
                EmployeeName = st.Employee.User.FullName,
                Image = st.Image
            }).ToList();
        }
    }
}
