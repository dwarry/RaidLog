using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Models
{
    public class NewAssumptionDto
    {

        [Required]
        [StringLength(2048)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string Workstream { get; set; }

        [Required]
        [StringLength(50)]
        public string Owner { get; set; }

        [Required]
        [StringLength(50)]
        public string ValidatedBy { get; set; }

        
        public int StatusId { get; set; }

        [Required]
        [StringLength(512)]
        public string SupportingDocumentation { get; set; }
    }
}