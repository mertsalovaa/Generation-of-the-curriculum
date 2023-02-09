using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseWork.DATA_ACCESS.Entities
{
    public class User 
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; } 

        [Required]
        public string LastName { get; set; } 

        [Required]
        public string MiddleName { get; set; }

        [Required]
        public string CooperativeEmail { get; set; }
    }
}
