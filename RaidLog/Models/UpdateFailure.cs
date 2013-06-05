using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Models
{
    public class UpdateFailure
    {
        public UpdateFailure(string message)
        {
            Message = message;
            Errors = new Dictionary<string, string[]>();
        }

        public string Message { get; set; }

        public Dictionary<string, string[]> Errors { get; set; } 
    }
}