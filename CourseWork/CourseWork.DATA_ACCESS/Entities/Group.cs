using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseWork.DATA_ACCESS.Entities
{
    public class Group
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string FormOfStudying { get; set; }

        public int? SpeciallityId { get; set; }
        [ForeignKey(nameof(SpeciallityId))]
        public virtual Speciallity Speciallity { get; set; }

        public ICollection<Subject> Subjects { get; set; }
    }
}
