using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Queries
{
    internal class AssumptionsQueries
    {
        public const string GetAllAssumptionsForProject = @"
    SELECT Id
         , Version
         , AssumptionNumber
         , Description
         , Workstream
         , Owner
         , ValidatedBy
         , AssumptionStatusId
         , SupportingDocumentation
FROM 
         [dbo].[Assumption] a
WHERE
         ProjectId = @projectId
ORDER BY 
         AssumptionNumber
";

        public const string GetOpenOrClosedAssumptionsForProject = @"
SELECT 
          a.Id
         ,a.Version
         ,a.AssumptionNumber
         ,a.Description
         ,a.Workstream
         ,a.Owner
         ,a.ValidatedBy
         ,a.AssumptionStatusId
         ,a.SupportingDocumentation
FROM 
         [dbo].[Assumption] a
INNER JOIN 
         [dbo].AssumptionStatus sts
ON
         sts.Id = a.AssumptionStatusId

WHERE
         ProjectId = @projectId
AND
         sts.IsFinalState = @isFinalState
ORDER BY 
         AssumptionNumber";

        public const string InsertAssumption = @"usp_CreateAssumption";

        public const string UpdateAssumption = @"usp_UpdateAssumption";

    }
}