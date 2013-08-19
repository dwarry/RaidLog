using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RaidLog.Spa.Models
{
    public class EditQueryDto
    {
        public int Id { get; set; }

        public string Version { get; set; }

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
        public string RaisedTo { get; set; }

        [StringLength(1024)]
        public string Answer { get; set; }

        [StringLength(50)]
        public string AnsweredBy { get; set; }

        public DateTime? AnsweredDate { get; set; }

        [StringLength(256)]
        public string ConfirmedInDocuments { get; set; }
    }
}