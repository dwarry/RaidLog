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
            'Risk' as ParentItemType,
            ra.RiskId as ParentItemId,
            r.RiskNumber as ParentItemNumber,
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
INNER JOIN  Risk r
ON          ra.RiskId = r.Id
WHERE       ra.RiskId = @itemId";

        public const string GetActionsForAssumption = @"
SELECT      a.Id, 
            a.ActionNumber, 
            'Assumption' as ParentItemType,
            aa.AssumptionId as ParentItemId,
            ass.AssumptionNumber as ParentItemNumber,
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
INNER JOIN  Assumption ass
on          aa.AssumptionId = ass.Id
WHERE       aa.AssumptionId = @itemId";

        public const string GetActionsForIssue = @"
SELECT      a.Id, 
            a.ActionNumber, 
            'Issue' as ParentItemType,
            ia.IssueId as ParentItemId,
            i.IssueNumber as ParentItemNumber,
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
INNER JOIN  Issue i
ON          ia.IssueId = i.Id
WHERE       ia.IssueId = @itemId";

        public const string GetActionsForDependency = @"
SELECT      a.Id, 
            a.ActionNumber,
            'Dependency' as ParentItemType,
            da.DependencyId  as ParentItemId, 
            d.DependencyNumber as ParentItemNumber,
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
INNER JOIN  Dependency d
ON          da.DependencyId = d.Id
WHERE       da.DependencyId = @itemId";


        public const string CreateAction = "usp_CreateAction";

        public const string UpdateAction = "usp_UpdateAction";
    }
}