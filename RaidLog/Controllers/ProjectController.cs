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

        public IEnumerable<ProjectSummary> GetAllOpenProjects()
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    IList<ProjectSummary> projects;
                    ILookup<int, ProjectRiskSummary> risksByProject;

                    var result = _connection.QueryMultiple(Queries.AllActiveProjects + Queries.AllProjectsAndActiveRisk,
                                                           transaction:tx);

                    projects = result.Read<ProjectSummary>().ToList();
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

        public ProjectDetails GetProjectDetails(int id)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    


                    tx.Commit();
                }
            }
            finally
            {
                _connection.Close();
            }
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
