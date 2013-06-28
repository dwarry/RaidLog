using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Models
{
    public class EditRiskDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(12)]
        public string Version { get; set; }

        
        [Required]
        [StringLength(2048)]
        public string Description { get; set; }

        public DateTime RaisedDate { get; set; }

        [Required]
        [StringLength(50)]
        public string RaisedBy { get; set; }

        public int RifCategoryId { get; set; }

        public bool IsProjectRisk { get; set; }

        [Required]
        [StringLength(50)]
        public string Workstream { get; set; }

        [StringLength(2048)]
        public string Commentary { get; set; }

        public int ApproachId { get; set; }

        public int ImpactId { get; set; }

        public int LikelihoodId { get; set; }

        [StringLength(50)]
        public string Owner { get; set; }

        public bool IsActive { get; set; }
    }
}