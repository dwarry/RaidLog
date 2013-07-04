using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Queries
{
    public class AssumptionsQueries
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
INNER JOIN
         [dbo].[AssumptionStatus] sts
ON
         a.StatusId = sts.Id
WHERE
         ProjectId = @projectId
AND
         (@isActive is null or (sts.IsFinalState <> @isActive))
";
    }
}