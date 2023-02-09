using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseWork.DATA_ACCESS.Entities
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public bool IsZalik { get; set; }
        public bool IsExam { get; set; }
        public bool IsVybirkova { get; set; }
        public string Description { get; set; }
        public ICollection<Teacher> Teachers { get; set; }
    }
}
