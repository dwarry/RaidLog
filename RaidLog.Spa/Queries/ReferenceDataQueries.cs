using System.Linq;

namespace RaidLog.Queries
{
    public static class ReferenceDataQueries
    {
        public const string GetReferenceData = @"
SELECT [Id]
      ,[Description]
  FROM [dbo].[Approach];

SELECT [Id]
      ,[Description]
      ,[Score]
      ,[BudgetImpact]
      ,[TimeOverrunImpact]
      ,[ReputationalImpact]
      ,[BusinessImpact]
  FROM [dbo].[Impact]
ORDER BY [Score];

SELECT [Id]
      ,[Description]
      ,[Score]
  FROM [dbo].[Likelihood]
ORDER BY [Score];

SELECT [Id]
      ,[Description]
  FROM [dbo].[RifCategory];

SELECT [Id]
      ,[Description]
      ,[IsFinalState]
  FROM [dbo].[AssumptionStatus];

SELECT [Id]
      ,[Description]
      ,[IsFinalState]
  FROM [dbo].[ActionStatus];
";

    }
}