using System;
using System.ComponentModel.DataAnnotations;

namespace RaidLog.Models
{
    public class NewProject
    {
        [Required]
        [StringLength(8, MinimumLength = 1)]
        public String Code { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public String Name { get; set; }
    }
}