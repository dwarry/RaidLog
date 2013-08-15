using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Models
{
    public class DependencyDto
    {
        public int Id { get; set; }

        public byte[] Version { get; set; }
        
        public int ProjectId { get; set; }

        public int DependencyNumber { get; set; }

        [Required]
        [StringLength(10)]
        public string Status { get; set; }

        [Required]
        [StringLength(50)]
        public string Workstream { get; set; }

        [Required]
        [StringLength(2048)]
        public string Description { get; set; }

        public DateTime PlannedDate { get; set; }

        public DateTime RequiredByDate { get; set; }

        [StringLength(2048)]
        public string Comments { get; set; }

        [Required]
        [RegularExpression(@"^(Red|Amber|Green)$")]
        public string RagStatus { get; set; }

        [Required]
        [StringLength(50)]
        public string DependencyLevel { get; set; }
    }
}