using CourseWork.DATA_ACCESS.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourseWork.DTO
{
    public class StudentDTO
    {
        public StudentDTO()
        {
            Assessments = new List<StudentAssessmentDTO>();
        }

        public int Id { get; set; }
        
        [Required(ErrorMessage = "Поле Прізвище є обов'язковим")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Поле Ім'я є обов'язковим")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Поле По-батькові є обов'язковим")]
        public string MiddleName { get; set; }

        [Required(ErrorMessage = "Поле Кооперативна пошта є обов'язковим")]
        public string CooperativeEmail { get; set; }

        [Required(ErrorMessage = "Поле Власна пошта є обов'язковим")]
        public string OwnEmail { get; set; }

        public string GroupName { get; set; }

        public ICollection<StudentAssessmentDTO> Assessments { get; set; }

    }
}
