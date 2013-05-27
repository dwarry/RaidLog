using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Queries
{
    public static class ProjectQueries
    {
        public const string GetAllActiveProjects = @"
select 
    p.Id, 
    p.VersionNumber,
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
	select RiskId, IsActive
		 , row_number() over (partition by RiskId order by EvaluationDate desc) as rn	
	  from dbo.RiskEvaluation
)
    select r.ProjectId
         , re.RiskId
         , re.IsActive as IsActive
      from dbo.Risk r 
 left join re on r.Id = re.RiskId
     where r.ProjectId in (select Id from dbo.Project p where p.IsActive = 1) 
       and rn=1 
       and (re.IsActive is null or re.IsActive  = 1);";

        public const string GetProjectDetails = @"
    Select Id
         , VersionNumber
         , Code
         , Name 
      from dbo.Project 
     where Id = @id
";
    }
}