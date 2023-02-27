using System.Collections.Generic;

namespace CourseWork.DTO
{
    public class TeacherDTO
    {
        public TeacherDTO()
        {
            Subjects= new List<SubjectDTO>();
        }
        public string Id { get; set; }

        public UserDTO User { get; set; }

        public ICollection<SubjectDTO> Subjects { get; set; }
    }
}
