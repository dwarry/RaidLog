using System;
using System.ComponentModel.DataAnnotations;

namespace RaidLog.Models
{
    public class EditProject
    {
        [Range(1, Int32.MaxValue)]
        public int Id { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 1)]
        public String Code { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public String Name { get; set; }

        public int VersionNumber { get; set; }
    }
}