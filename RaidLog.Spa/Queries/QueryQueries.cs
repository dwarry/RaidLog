using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Spa.Queries
{
    public static class QueryQueries
    {
        public const string SelectQueriesForProject = @"
SELECT [Id]
      ,[Version]
      ,[ProjectId]
      ,[QueryNumber]
      ,[Workstream]
      ,[DeliverableImpacted]
      ,[Urgency]
      ,[Description]
      ,[RaisedBy]
      ,[RaisedTo]
      ,[RaisedDate]
      ,[Answer]
      ,[AnsweredBy]
      ,[AnsweredDate]
      ,[ConfirmedInDocuments]
      ,[UpdatedBy]
      ,[UpdatedTimestamp]
  FROM [dbo].[Query]
 WHERE [ProjectId] = @projectId
";
    }
}