using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Http;

namespace RaidLog.Controllers
{
    [Authorize]
    public class QueriesController
    {
        private readonly IDbConnection _connection;

        public QueriesController(IDbConnection connection)
        {
            if (connection == null) throw new ArgumentNullException("connection");
            _connection = connection;
        }

        public IEnumerable<dynamic> Get(int projectId, bool? active)
        {
            yield break;
        }
    }
}