using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Models
{
    public class ProjectSummary
    {
        public ProjectSummary(int id, string code, string name)
        {
            Id = id;
            Code = code;
            Name = name;
        }

        public int Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public int ActiveRisks { get; set; }

        public int ActiveAssumptions { get; set; }

        public int ActiveIssues { get; set; }

        public int ActiveDependencies { get; set; }

        public int ActiveQueries { get; set; }
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