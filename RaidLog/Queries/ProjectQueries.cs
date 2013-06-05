namespace RaidLog.Queries
{
    public static class ProjectQueries
    {
        public const string GetAllActiveProjects = @"
select 
    p.Id, 
    p.Version,
    p.Code, 
    p.Name 
from 
    dbo.Project p 
where 
    IsActive = 1 
order by 
    p.Code;
";

        public const string GetAllProjectsAndActiveRisks = @"
with re as
(
	select [RiskId]
         , [IsActive]
		 , row_number() over (partition by [RiskId] order by [EvaluationDate] desc) as rn	
	  from [dbo].[RiskEvaluation]
)
    select r.[ProjectId]
         , re.[RiskId]
         , re.[IsActive] as IsActive
      from [dbo].[Risk] r 
 left join re on r.[Id] = re.[RiskId]
     where r.[ProjectId] in (select [Id] from [dbo].[Project] p where p.[IsActive] = 1) 
       and rn=1 
       and (re.[IsActive] is null or re.[IsActive]  = 1);";

        public const string GetProjectDetails = @"
    Select [Id]
         , [Version]
         , [Code]
         , [Name] 
      from [dbo].[Project] 
     where [Id] = @id
";

        public const string InsertProject = @"
INSERT INTO [dbo].[Project] (
            [Code]
           ,[Name]
           ,[UpdatedTimestamp]
           ,[UpdatedBy]
           )
     OUTPUT
            INSERTED.Id
     VALUES (
            @code
           ,@name
           ,SYSDATETIME()
           ,@userName
           );
";

        public const string UpdateProject = @"
UPDATE [dbo].[Project]
   SET [Code] = @code
     , [Name] = @name
 WHERE [Id]   = @id 
   AND [Version] = @version;
";

        public const string DeleteProject = @"
UPDATE [dbo].[Project]
   SET [IsActive] = 0
 WHERE [Id] = @id;
";
    }
}
