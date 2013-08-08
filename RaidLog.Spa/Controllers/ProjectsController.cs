using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using RaidLog.Models;
using Dapper;

using RaidLog.Queries;
using RaidLog.Spa.Controllers;

namespace RaidLog.Controllers
{
    [Authorize]
    public class ProjectsController : RaidLogApiController
    {

        public ProjectsController(IDbConnection connection):base(connection)
        {
        }

        public IEnumerable<ProjectSummaryWithCounts> GetAllOpenProjects()
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    string sql = ProjectQueries.GetAllActiveProjects + 
                                 ProjectQueries.GetAllProjectsAndRisks + 
                                 ProjectQueries.GetAllProjectsAndAssumptions + 
                                 ProjectQueries.GetAllProjectsAndIssues;

                    var result = _connection.QueryMultiple(sql,
                                                           transaction:tx);

                    var projects = result.Read<ProjectSummaryWithCounts>().ToArray();
                    var projectRiskStatuses = result.Read<ProjectAndRiskStatus>().ToArray();
                    var projectAssumptionStatuses = result.Read<ProjectAndAssumptionStatus>().ToArray();
                    var projectIssuesStatuses = result.Read<ProjectAndIssueStatus>().ToArray();
                    var projTypes = projects.ToDictionary(x => x.Id);

                    SetRiskCounts(projTypes, projectRiskStatuses, projectAssumptionStatuses, projectIssuesStatuses);                   

                    tx.Commit();

                    return projects;
                }
            }
            finally
            {
                _connection.Close();
            }
        }

        private void SetRiskCounts(IDictionary<int, ProjectSummaryWithCounts> projectSummaries, IEnumerable<ProjectAndRiskStatus> projectRiskStatuses, IEnumerable<ProjectAndAssumptionStatus> projectAssumptionStatuses, ProjectAndIssueStatus[] projectIssuesStatuses)
        {
            foreach (var riskStatus in projectRiskStatuses)
            {
                var psc = projectSummaries[riskStatus.ProjectId];
                if (riskStatus.IsActive)
                {
                    psc.ActiveRisks++;
                }
                else
                {
                    psc.ClosedRisks++;
                }
            }

            foreach (var assumptionStatus in projectAssumptionStatuses)
            {
                var psc = projectSummaries[assumptionStatus.ProjectId];
                if (assumptionStatus.IsActive)
                {
                    psc.ActiveAssumptions++;
                }
                else
                {
                    psc.ClosedAssumptions++;
                }
            }

            foreach (var issueStatus in projectIssuesStatuses)
            {
                var psc = projectSummaries[issueStatus.ProjectId];
                if (issueStatus.IsActive)
                {
                    psc.ActiveIssues++;
                }
                else
                {
                    psc.ClosedIssues++;
                }
            }
        }   

        public ProjectSummary GetProjectDetails(int id)
        {
            _connection.Open();

            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var sql = ProjectQueries.GetProjectDetails;  

                    var q = _connection.Query<ProjectSummary>(sql,new {id},tx).FirstOrDefault();
                    
                    tx.Commit();

                    if(q == null) throw new HttpResponseException(HttpStatusCode.NotFound);

                    return q;
                }
            }
            finally
            {
                _connection.Close();
            }
        }


        public HttpResponseMessage PostNewProject(NewProject newProject)
        {
            if (ModelState.IsValid)
            {
                _connection.Open();
                try
                {
                    using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                    {
                        var newId = _connection.Query<int>(ProjectQueries.InsertProject,
                                                           new {code = newProject.Code, name = newProject.Name, userName = User.Identity.Name},
                                                           tx)
                                               .First();
                        
                        var response = Request.CreateResponse(HttpStatusCode.Created,new object());

                        response.Headers.Location = new Uri("/api/projects/" + newId, UriKind.Relative);

                        

                        tx.Commit();

                        return response;
                    }
                }
                finally
                {
                    _connection.Close();
                }
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest,
                                                   ModelState);
            }

        }

        public HttpResponseMessage PutProject(int id, EditProject editProject)
        {
            if (ModelState.IsValid)
            {
                _connection.Open();

                try
                {
                    using (var tx = _connection.BeginTransaction(IsolationLevel.RepeatableRead)) 
                    {
                        var result = _connection.Execute(ProjectQueries.UpdateProject,
                                                         editProject,
                                                         tx);

                        if (result == 0)
                        {
                            return Request.CreateErrorResponse(HttpStatusCode.Conflict,
                                                               "Project has been edited or deleted by someone else.");
                        }

                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                }
                finally
                {
                    _connection.Close();
                }
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest,
                                                   ModelState);
            }
        }

        public HttpResponseMessage DeleteProject(int id)
        {
            try
            {
                _connection.Open();

                using (var tx = _connection.BeginTransaction(IsolationLevel.RepeatableRead))
                {
                    var result = _connection.Execute(ProjectQueries.DeleteProject,
                                                     new { id }, 
                                                     tx);
                    
                    tx.Commit();

                    return Request.CreateResponse(HttpStatusCode.NoContent);

                }
            }
            finally
            {
                _connection.Close();
            }

        }


    }

    internal class ProjectAndRiskStatus
    {
        public ProjectAndRiskStatus(int projectId, int riskId, bool isActive)
        {
            ProjectId = projectId;
            RiskId = riskId;
            IsActive = isActive;
        }


        public int ProjectId { get; private set; }
        public int RiskId { get; private set; }
        public bool IsActive { get; private set; }
    }

    internal class ProjectAndAssumptionStatus
    {
        public ProjectAndAssumptionStatus(int projectId, int assumptionId, bool isActive)
        {
            ProjectId = projectId;
            AssumptionId = assumptionId;
            IsActive = isActive;
        }


        public int ProjectId { get; private set; }
        public int AssumptionId { get; private set; }
        public bool IsActive { get; private set; }
    }

    internal class ProjectAndIssueStatus
    {
        public ProjectAndIssueStatus(int projectId, int issueId, bool isActive)
        {
            ProjectId = projectId;
            IssueId = issueId;
            IsActive = isActive;
        }


        public int ProjectId { get; private set; }
        public int IssueId { get; private set; }
        public bool IsActive { get; private set; }
    }

    internal class ProjectAndDependencyStatus
    {
        public ProjectAndDependencyStatus(int projectId, int dependencyId, bool isActive)
        {
            ProjectId = projectId;
            DependencyId = dependencyId;
            IsActive = isActive;
        }


        public int ProjectId { get; private set; }
        public int DependencyId { get; private set; }
        public bool IsActive { get; private set; }
    }

    internal class ProjectAndQueryStatus
    {
        public ProjectAndQueryStatus(int projectId, int queryId, bool isActive)
        {
            ProjectId = projectId;
            QueryId = queryId;
            IsActive = isActive;
        }


        public int ProjectId { get; private set; }
        public int QueryId { get; private set; }
        public bool IsActive { get; private set; }
    }
   
  
}
