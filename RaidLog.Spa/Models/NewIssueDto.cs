﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RaidLog.Models
{
    public class NewIssueDto
    {

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

        [Required]
        [RegularExpression(@"^(Red|Amber|Green)$")]
        public string RagStatus { get; set; }

        public DateTime? ExpectedClosureDate { get; set; }
    }

    
}