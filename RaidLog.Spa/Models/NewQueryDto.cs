using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RaidLog.Spa.Models
{
    public class NewQueryDto
    {
        public int ProjectId { get; set; }

        [Required]
        [StringLength(50)]
        public string Workstream { get; set; }

        [Required]
        [StringLength(50)]
        public string DeliverableImpacted { get; set; }

        [Required]
        [StringLength(10)]
        public string Urgency { get; set; }

        [Required]
        [StringLength(1024)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string RaisedBy { get; set; }

        [Required]
        [StringLength(50)]
        public string RaisedTo { get; set; }

        public DateTime RaisedDate { get; set; }

    }
}