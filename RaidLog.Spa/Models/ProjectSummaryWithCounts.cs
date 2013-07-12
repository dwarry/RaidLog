using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RaidLog.Models
{
    public class ProjectSummary
    {
        public ProjectSummary(int id, byte[] version, string code, string name)
        {
            Id = id;
            Version = version;
            Code = code;
            Name = name;
        }

        public int Id { get; set; }

        public byte[] Version { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }
        
    }

    public class ProjectSummaryWithCounts
    {
        public ProjectSummaryWithCounts(int id, byte[] version, string code, string name)
        {
            Id = id;
            Version = version;
            Code = code;
            Name = name;
        }

        public int Id { get; set; }

        public byte[] Version { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public int ActiveRisks { get; set; }

        public int ActiveAssumptions { get; set; }

        public int ActiveIssues { get; set; }

        public int ActiveDependencies { get; set; }

        public int ActiveQueries { get; set; }

        public int ClosedRisks { get; set; }

        public int ClosedAssumptions { get; set; }

        public int ClosedIssues { get; set; }

        public int ClosedDependencies { get; set; }

        public int ClosedQueries { get; set; }

    }

    
    public class ProjectRiskSummary
    {
        public int ProjectId { get; set; }
        public int RiskId { get; set; }
        public bool IsActive { get; set; }

        public ProjectRiskSummary(int projectId, int riskId, bool isActive)
        {
            ProjectId = projectId;
            RiskId = riskId;
            IsActive = isActive;
        }
    }
}