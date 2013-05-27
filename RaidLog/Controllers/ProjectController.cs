using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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
                    IList<ProjectSummaryWithCounts> projects;
                    ILookup<int, ProjectRiskSummary> risksByProject;

                    var result = _connection.QueryMultiple(ProjectQueries.GetAllActiveProjects + ProjectQueries.GetAllProjectsAndActiveRisks,
                                                           transaction:tx);

                    projects = result.Read<ProjectSummaryWithCounts>().ToList();
                    risksByProject = result.Read<ProjectRiskSummary>().ToLookup(x => x.ProjectId);

                    foreach (var proj in projects)
                    {
                        if (risksByProject.Contains(proj.Id))
                        {
                            proj.ActiveRisks = risksByProject[proj.Id].Count();
                        }
                    }

                    tx.Commit();

                    return projects;
                }
            }
            finally
            {
                _connection.Close();
            }
        }

        public ProjectDetails GetProjectDetails(int id, bool? isActive)
        {
            string riskQuery = GetRiskQuery(isActive);

            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var sql = 
                        ProjectQueries.GetProjectDetails + 
                        riskQuery;

                    var q = _connection.QueryMultiple(sql,
                                                      new { id = id },
                                                      tx);
                               ;
                    var proj = q.Read<ProjectDetails>()
                                .FirstOrDefault();

                    if (proj != null)
                    {
                        proj.Risks = q.Read<RiskDto>().ToList();
                    }

                    tx.Commit();

                    return q;
                }
            }
            finally
            {
                _connection.Close();
            }
        }

        private string GetRiskQuery(bool? isActive)
        {
            if (!isActive.HasValue)
            {
                return RiskQueries.AllRisksForProject;
            }

            return isActive.Value
                       ? RiskQueries.ActiveRisksForProject
                       : RiskQueries.ClosedRisksForProject;
        }

        public ProjectDetails PutNewProject(NewProject newProject)
        {
            if (ModelState.IsValid)
            {
                
            }

            return null;
        }

        public ProjectDetails PostProject(EditProject editProject)
        {
            return null;
        }

        public bool DeleteProject(DeleteProject deleteProject)
        {
            return false;
        }
    }

}
