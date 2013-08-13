using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Models
{
    public class IssueDto
    {
        public int Id { get; set; }

        public byte[] Version { get; set; }

        public int ProjectId { get; set; }

        public int IssueNumber { get; set; }

        [Required]
        [StringLength(2048)]
        public string Description { get; set; }


        public DateTime RaisedDate { get; set; }
        
        [Required]
        [StringLength(50)]
        public string RaisedBy { get; set; }

        [StringLength(50)]
        public string Owner { get; set; }

        [Required]
        [StringLength(50)]
        public string Workstream { get; set; }

        [StringLength(2048)]
        public string Commentary { get; set; }

        public DateTime? ResolvedDate { get; set; }

        [StringLength(50)]
        public string ResolvedBy { get; set; }

        [StringLength(512)]
        public string ResolutionDescription { get; set; }

        public string RagStatus { get; set; }
        
        public string PreviousRagStatus { get; set; }

        public DateTime DateLastReviewed { get; set; }

        public DateTime? ExpectedClosureDate { get; set; }

        public Boolean IsEscalatedToProgramme { get; set; }
    }
}