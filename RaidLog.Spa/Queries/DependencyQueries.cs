using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Spa.Queries
{
    public static class DependencyQueries
    {
        public const string SelectDependenciesForProject = @"
SELECT [Id]
      ,[Version]
      ,[DependencyNumber]
      ,[Status]
      ,[Workstream]
      ,[Description]
      ,[PlannedDate]
      ,[RequiredByDate]
      ,[Comments]
      ,[RagStatus]
      ,[DependencyLevel]
  FROM [dbo].[Dependency]
 WHERE [ProjectId] = @projectId
";

        public const string CreateDependency = "dbo.usp_CreateDependency";

        public const string UpdateDependency = "dbo.usp_UpdateDependency";
    }
}