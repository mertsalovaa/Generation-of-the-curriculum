using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseWork.DATA_ACCESS.Entities
{
    public class Teacher
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        public ICollection<Subject> Subjects { get; set; }
    }
}
