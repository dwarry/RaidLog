using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Spa.Models
{
    public class EditAction
    {
        public int Id { get; set; }

        public string Version { get; set; }

        [Required]
        [StringLength(256)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string Actor { get; set; }

        public int ActionStatusId { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? ResolvedDate { get; set; }

        [StringLength(256)]
        public String Resolution { get; set; }
    }
}