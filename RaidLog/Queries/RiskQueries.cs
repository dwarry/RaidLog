using System.Linq;

namespace RaidLog.Queries
{
    public static class RiskQueries
    {
        private const string RisksForProject = @"
with re as
(
    select RiskId
         , EvaluationDate
         , ImpactId
         , LikelihoodId
         , Owner
         , IsActive
         , row_number() over (partition by RiskId order by EvaluationDate desc) as rn    
      from dbo.RiskEvaluation
     where RiskId = @id
)
    select 
           r.Id
         , r.RiskNumber
         , r.Description
         , r.RaisedDate
         , r.RaisedBy
         , r.RifCategoryId
         , r.IsProjectRisk
         , r.Workstream
         , r.ImpactCommentary
         , r.ApproachId
         , r.VersionNumber
         , re.EvaluationDate
         , re.ImpactId
         , re.LikelihoodId
         , re.IsActive     
         , re.Owner
      from dbo.Risk r 
 left join re on r.Id = re.RiskId
     where r.ProjectId = @id
       and rn=1";

        public const string AllRisksForProject = RisksForProject + ";";

        public const string ActiveRisksForProject = RisksForProject + "\n and re.IsActive = 1;";

        public const string ClosedRisksForProject = RisksForProject + "\n and re.IsActive = 0;";
    }
}