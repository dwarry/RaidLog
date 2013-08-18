using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Spa.Models
{
    
    public class QueryDto
    {
        public int Id { get; set; }

        public int VersionNumber { get; set; }

        public int ProjectId { get; set; }

        public int QueryNumber { get; set; }

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

        [Required]
        [StringLength(1024)]
        public string Answer { get; set; }

        [Required]
        [StringLength(50)]
        public string AnsweredBy { get; set; }

        public DateTime AnsweredDate { get; set; }

        [Required]
        [StringLength(256)]
        public string ConfirmedInDocuments { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdateTimestamp { get; set; }
    }
}