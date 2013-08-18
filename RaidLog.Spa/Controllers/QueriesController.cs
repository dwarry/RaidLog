using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Dapper;

using RaidLog.Models;
using RaidLog.Spa.Controllers;
using RaidLog.Spa.Models;
using RaidLog.Spa.Queries;

namespace RaidLog.Controllers
{
    [Authorize]
    public class QueriesController : RaidLogApiController
    {
        private readonly IDbConnection _connection;

        public QueriesController(IDbConnection connection) : base(connection)
        {
            if (connection == null) throw new ArgumentNullException("connection");
            _connection = connection;
        }

        public IEnumerable<QueryDto> GetQueriesForProject(int projectId)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var results = _connection.Query<QueryDto>(
                            QueryQueries.SelectQueriesForProject,
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


        public QueryDto PostNewQuery(int projectId, NewQueryDto newQuery)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
            }

            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var results = _connection.Query<QueryDto>(
                            QueryQueries.CreateQuery,
                            new
                            {
                                  projectId,
                                  newQuery.Workstream,
                                  newQuery.DeliverableImpacted,
                                  newQuery.Urgency,
                                  newQuery.Description,
                                  newQuery.RaisedBy,
                                  newQuery.RaisedTo,
                                  newQuery.RaisedDate,
                            },
                            tx).FirstOrDefault();

                    tx.Commit();

                    return results;
                }
            }
            finally
            {
                _connection.Close();
            }
        }


        public QueryDto PutExistingQuery(EditQueryDto editQuery)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
            }


            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var results = _connection.Query<QueryDto>(
                            QueryQueries.UpdateQuery,
                            new
                            {
                                editQuery.Id,
                                editQuery.VersionNumber,
                                editQuery.Workstream,
                                editQuery.DeliverableImpacted,
                                editQuery.Urgency,
                                editQuery.Description,
                                editQuery.RaisedTo,
                                editQuery.Answer,
                                editQuery.AnsweredBy,
                                editQuery.AnsweredDate,
                                editQuery.ConfirmedInDocuments
                            },
                            tx).FirstOrDefault();

                    tx.Commit();

                    return results;
                }
            }
            finally
            {
                _connection.Close();
            }
        }
    }
}