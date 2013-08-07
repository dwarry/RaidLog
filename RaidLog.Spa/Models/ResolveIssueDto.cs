using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Models
{
    public class ResolveIssueDto
    {
        public int Id { get; set; }

        public int Version { get; set; }

        public DateTime? ResolvedDate { get; set; }

        [StringLength(50)]
        public string ResolvedBy { get; set; }

        [StringLength(512)]
        public string ResolutionDescription { get; set; }


    }
}