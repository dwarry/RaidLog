﻿using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Models
{
    public class AssumptionDto
    {
        public int Id { get; set; }

        [Required]
        [Timestamp]
        public byte[] Version { get; set; }

        public int AssumptionNumber { get; set; }

        [Required]
        [StringLength(2048)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string Workstream { get; set; }

      
        [StringLength(50)]
        public string Owner { get; set; }

      
        [StringLength(50)]
        public string ValidatedBy { get; set; }

        public int StatusId { get; set; }

        [StringLength(512)]
        public string SupportingDocumentation { get; set; }
    }
}