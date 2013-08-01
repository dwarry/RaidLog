using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Queries
{
    internal class AssumptionsQueries
    {
        public const string GetAssumptionsForProject = @"
    SELECT Id
         , Version
         , AssumptionNumber
         , Description
         , Workstream
         , Owner
         , ValidatedBy
         , StatusId
         , SupportingDocumentation
FROM 
         [dbo].[Assumption] a
WHERE
         ProjectId = @projectId
ORDER BY 
         AssumptionNumber
";
        public const string InsertAssumption = @"usp_CreateAssumption";

        public const string UpdateAssumption = @"usp_UpdateAssumption";

    }
}