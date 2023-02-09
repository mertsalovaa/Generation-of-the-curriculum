using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseWork.DATA_ACCESS.Entities
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [Required]
        public string OwnEmail { get; set; }

        public int? GroupId { get; set; }
        [ForeignKey(nameof(GroupId))]
        public virtual Group Group { get; set; }

        public ICollection<StudentAssessment> Assessments { get; set; }


    }
}
