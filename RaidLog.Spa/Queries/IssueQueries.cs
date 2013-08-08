using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Spa.Queries
{
    public static class IssueQueries
    {
        public const string SelectIssuesForProject = @"
SELECT [Id]
      ,[Version]
      ,[ProjectId]
      ,[IssueNumber]
      ,[RaisedDate]
      ,[RaisedBy]
      ,[Owner]
      ,[Workstream]
      ,[Description]
      ,[Commentary]
      ,[ParentRiskId]
      ,[ResolvedDate]
      ,[ResolvedBy]
      ,[ResolutionDescription]
  FROM [dbo].[Issue]
 WHERE [ProjectId] = @projectId
ORDER BY [IssueNumber]
";
        public const string CreateIssue = "usp_CreateIssue";

        public const string UpdateIssue = "usp_UpdateIssue";

    }
}