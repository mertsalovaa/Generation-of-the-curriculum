using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseWork.DATA_ACCESS.Entities
{
    public class Speciallity
    {
        public Speciallity()
        {
            Groups = new List<Group>();
        }

        [Key]
        public int Id { get; set; }

        [Required] 
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Code { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        public ICollection<Group> Groups { get; set; }
    }
}
