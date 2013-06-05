using System.Linq;

namespace RaidLog.Models
{
    public class IssueDto
    {
        public int Id { get; set; }

        public int VersionNumber { get; set; }

        public string Description { get; set; }
    }
}