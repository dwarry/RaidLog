using System.Linq;

namespace RaidLog.Queries
{
    public static class RiskQueries
    {
        private const string GetRisks = @"with re as
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
         , r.Version
         , re.EvaluationDate
         , re.ImpactId
         , re.LikelihoodId
         , re.Owner
         , re.IsActive     
      from dbo.Risk r 
 left join re on r.Id = re.RiskId
     where rn=1 ";

        public const string GetRiskById = GetRisks + "\n  and r.Id = @id";

        private const string RisksForProject = GetRisks + "\n  and r.ProjectId = @id";

        public const string AllRisksForProject = RisksForProject + ";";

        public const string ActiveRisksForProject = RisksForProject + "\n  and re.IsActive = 1;";

        public const string ClosedRisksForProject = RisksForProject + "\n  and re.IsActive = 0;";


        //   @projectId
        //  ,@description
        //  ,@userName
        //  ,@rifCategoryId
        //  ,@isProjectRisk
        //  ,@workstream
        //  ,@impactCommentary
        //  ,@approachId
        //  ,@impactId
        //  ,@likelihoodId
        //  ,@owner
        //  ,@riskId OUTPUT
        public const string InsertRisk = "[dbo].[usp_CreateRisk]";

        //   @riskId
        //  ,@version
        //  ,@userName
        //  ,@description
        //  ,@impactCommentary
        //  ,@rifCategoryId
        //  ,@isProjectRisk
        //  ,@workstream
        //  ,@approachId
        //  ,@impactId
        //  ,@likelihoodId
        //  ,@owner
        //  ,@isActive
        public const string UpdateRiskAndOrEvaluation = @"[dbo].[usp_UpdateRisk]"; 


    }
}