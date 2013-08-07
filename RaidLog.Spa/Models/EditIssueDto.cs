using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Models
{
    public class EditIssueDto
    {
        public int Id { get; set; }

        public int Version { get; set; }

        [Required]
        [StringLength(2048)]
        public string Description { get; set; }

        [StringLength(50)]
        public string Owner { get; set; }

        [Required]
        [StringLength(50)]
        public string Workstream { get; set; }

        [StringLength(2048)]
        public string Commentary { get; set; }

    }
}