using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RaidLog.Spa.Models
{
    public class ActionDto
    {
        public int Id { get; set; }

        [Required]
        [Timestamp]
        public byte[] Version { get; set; }

        public int ActionNumber { get; set; }

        public string ParentItemType { get; set; }

        public int ParentItemId { get; set; }

        public int ParentItemNumber { get; set; }

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