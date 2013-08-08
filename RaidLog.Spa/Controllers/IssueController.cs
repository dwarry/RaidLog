using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Web.Http;
using Dapper;
using RaidLog.Models;
using RaidLog.Spa.Queries;

namespace RaidLog.Spa.Controllers
{
    [Authorize]
    public class IssuesController: RaidLogApiController
    {

        public IssuesController(IDbConnection connection) : base(connection)
        {
        }

        public IssueDto[] GetIssuesForProject(int projectId)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {

                    var results = _connection.Query<IssueDto>(IssueQueries.SelectIssuesForProject,
                        new
                        {
                            projectId
                        },
                        tx).ToArray();

                    tx.Commit();

                    return results;
                }   
            }
            finally
            {
                _connection.Close();
            }
        }


        public IssueDto PostNewIssue(int projectId, NewIssueDto dto)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {

                    var args = new
                    {
                        projectId = dto.ProjectId,
                        raisedBy = dto.RaisedBy,
                        raisedDate = dto.RaisedDate,
                        description = dto.Description,
                        workstream = dto.Workstream,
                        commentary = dto.Commentary,
                        owner = dto.Owner
                    };

                    var result = 
                    _connection.Query<IssueDto>(IssueQueries.CreateIssue,
                        args,
                        tx,
                        commandType: CommandType.StoredProcedure).FirstOrDefault();

                    tx.Commit();

                    if (result == null)
                    {
                        throw new HttpResponseException(HttpStatusCode.InternalServerError);
                    }

                    return result;

                }
            }
            finally
            {
                _connection.Close();
            }            
        }


        public IssueDto PutUpdatedIssue(int id, EditIssueDto dto)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var args = new
                    {
                        id = id,
                        version = Convert.FromBase64String(dto.Version),
                        owner = dto.Owner,
                        workstream = dto.Workstream,
                        description = dto.Description,
                        commentary = dto.Commentary,
                        resolvedDate = dto.ResolvedDate,
                        resolvedBy = dto.ResolvedBy,
                        resolutionDescription = dto.ResolutionDescription

                    };

                    IssueDto result = _connection.Query<IssueDto>(
                            IssueQueries.UpdateIssue,
                            args,
                            tx,
                            commandType: CommandType.StoredProcedure )
                        .FirstOrDefault();

                    if (result == null)
                    {
                        throw new HttpResponseException(HttpStatusCode.Conflict);
                    }

                    tx.Commit();

                    return result;
                }
            }
            finally
            {
                _connection.Close();
            }
        }
    }
}