using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using RaidLog.Models;
using Dapper;

using RaidLog.Queries;

namespace RaidLog.Controllers
{
    [Authorize]
    public class ProjectController : ApiController
    {
        private IDbConnection _connection;

        public ProjectController(IDbConnection connection)
        {
            if (connection == null) throw new ArgumentNullException("connection");
            _connection = connection;
            
        }

        public IEnumerable<ProjectSummaryWithCounts> GetAllOpenProjects()
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var result = _connection.QueryMultiple(ProjectQueries.GetAllActiveProjects + ProjectQueries.GetAllProjectsAndRisks,
                                                           transaction:tx);

                    var projects = result.Read<ProjectSummaryWithCounts>();
                    var projectRiskStatuses = result.Read<ProjectAndRiskStatus>(buffered:false);

                    var projTypes = projects.ToDictionary(x => x.Id);

                    SetRiskCounts(projTypes, projectRiskStatuses);                   

                    tx.Commit();

                    return projects;
                }
            }
            finally
            {
                _connection.Close();
            }
        }

        private void SetRiskCounts(IDictionary<int, ProjectSummaryWithCounts> projectSummaries,
                                   IEnumerable<ProjectAndRiskStatus> projectRiskStatuses)
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
                        
                        var response = Request.CreateResponse(HttpStatusCode.Created);

                        response.Headers.Location = new Uri("/api/project/" + newId, UriKind.Relative);

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
                            return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                                                               "No such Project");
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

}
