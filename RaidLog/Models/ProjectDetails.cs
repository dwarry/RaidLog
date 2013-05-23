using System;
using System.Collections.Generic;

namespace RaidLog.Models
{
    public class ProjectDetails
    {
        public ProjectDetails(int id, int versionNumber, string code, string name)
        {
            Id = id;
            VersionNumber = versionNumber;
            Code = code;
            Name = name;
        }

        public int Id { get; set; }
        public int VersionNumber { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

        public List<RiskDto> Risks { get; set; }
        public List<AssumptionDto> Assumptions { get; set; }
        public List<IssueDto> Issues { get; set; }
        public List<DependencyDto> Dependencies { get; set; }
        public List<QueryDto> Query { get; set; } 
    }

    public class RiskDto
    {
        public int Id { get; set; }
        
        public int VersionNumber { get; set; }

        public int RiskNumber { get; set; }

        public string Description { get; set; }
        
        public DateTime RaisedDate { get; set; }
        
        public string RaisedBy { get; set; }
        
        public int RifCategoryId { get; set; }

        public bool IsProjectRisk { get; set; }

        public string Workstream { get; set; }

        public string Commentary { get; set; }

        public string ApproachId { get; set; }

        public int ImpactId { get; set; }

        public int LikelihoodId { get; set; }

        public string Owner { get; set; }


    }

    public class AssumptionDto
    {
        public int Id { get; set; }

        public int VersionNumber { get; set; }

        public string Description { get; set; }
    }

    public class IssueDto
    {
        public int Id { get; set; }

        public int VersionNumber { get; set; }

        public string Description { get; set; }
    }

    public class DependencyDto
    {
        public int Id { get; set; }

        public int VersionNumber { get; set; }
        
        public string Description { get; set; }
    }

    public class QueryDto
    {
        public int Id { get; set; }

        public int VersionNumber { get; set; }
        
        public string Description { get; set; }
    }
}