using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Spa.Queries
{
    public static class ActionQueries
    {
        public const string GetActionsForProject = "SELECT * from [dbo].[ufn_GetActionsForProject](@itemId)";

        public readonly static IDictionary<string,string> GetActionsByType = new Dictionary<string, string>
        {
            {"risk", GetActionsForRisk},
            {"assumption", GetActionsForAssumption},
            {"issue", GetActionsForIssue},
            {"dependency", GetActionsForDependency},
            //{"query", GetActionsForQuery},
            {"project", GetActionsForProject},
            {"risks", GetActionsForRisk},
            {"assumptions", GetActionsForAssumption},
            {"issues", GetActionsForIssue},
            {"dependencies", GetActionsForDependency},
            //{"queries", GetActionsForQuery},
            {"projects", GetActionsForProject},
        }; 



        public const string GetActionsForRisk = @"
SELECT      a.Id, 
            a.ActionNumber, 
            'Risk',
            ra.RiskId,
            a.Description, 
            a.Actor, 
            a.ActionStatusId, 
            a.DueDate, 
            a.ResolvedDate, 
            a.Resolution, 
            a.Version,  
            a.UpdatedBy, 
            a.UpdatedTimestamp
FROM        Action AS a 
INNER JOIN  Risk_Action AS ra 
ON          a.Id = ra.ActionId
WHERE       ra.RiskId = @itemId";

        public const string GetActionsForAssumption = @"
SELECT      a.Id, 
            a.ActionNumber, 
            'Assumption',
            aa.AssumptionId,
            a.Description, 
            a.Actor, 
            a.ActionStatusId, 
            a.DueDate, 
            a.ResolvedDate, 
            a.Resolution, 
            a.Version,  
            a.UpdatedBy, 
            a.UpdatedTimestamp
FROM        Action AS a 
INNER JOIN  Assumption_Action AS aa 
ON          a.Id = aa.ActionId
WHERE       aa.AssumptionId = @itemId";

        public const string GetActionsForIssue = @"
SELECT      a.Id, 
            a.ActionNumber, 
            'Issue',
            ia.IssueId,
            a.Description, 
            a.Actor, 
            a.ActionStatusId, 
            a.DueDate, 
            a.ResolvedDate, 
            a.Resolution, 
            a.Version,  
            a.UpdatedBy, 
            a.UpdatedTimestamp
FROM        Action AS a 
INNER JOIN  Issue_Action AS ia 
ON          a.Id = ia.ActionId
WHERE       ia.IssueId = @itemId";

        public const string GetActionsForDependency = @"
SELECT      a.Id, 
            a.ActionNumber,
            'Dependency',
            da.DependencyId, 
            a.Description, 
            a.Actor, 
            a.ActionStatusId, 
            a.DueDate, 
            a.ResolvedDate, 
            a.Resolution, 
            a.Version,  
            a.UpdatedBy, 
            a.UpdatedTimestamp
FROM        Action AS a 
INNER JOIN  Dependency_Action AS da 
ON          a.Id = da.ActionId
WHERE       da.DependencyId = @itemId";


        public const string CreateAction = "usp_CreateAction";

        public const string UpdateAction = "usp_UpdateAction";
    }
}