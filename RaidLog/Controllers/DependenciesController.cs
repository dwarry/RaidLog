using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Http;

namespace RaidLog.Controllers
{
    [Authorize]
    public class DependenciesController
    {
        private readonly IDbConnection _connection;

        public DependenciesController(IDbConnection connection)
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