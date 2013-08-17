using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;

using Dapper;

using RaidLog.Models;
using RaidLog.Spa.Controllers;
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
                    var results = _connection.Query<DependencyDto>(
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


        public QueryDto PostNewQuery(NewQueryDto newQuery)
        {
            
        }


        public QueryDto PutExistingQuery(EditQueryDto editQuery)
        {
            
        }
    }
}