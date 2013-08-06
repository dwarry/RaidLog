using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using Dapper;
using RaidLog.Models;
using RaidLog.Spa.Queries;

namespace RaidLog.Spa.Controllers
{
    [Authorize]
    public class IssuesController: RaidLogApiController
    {
        private readonly IDbConnection _connection;

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
                    IssueDto result;
                    
                    tx.Commit();

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
                    IssueDto result;

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