using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Http;

namespace RaidLog.Controllers
{
    [Authorize]
    public class AssumptionsController
    {
        private readonly IDbConnection _connection;

        public AssumptionsController(IDbConnection connection)
        {
            if (connection == null) throw new ArgumentNullException("connection");
            _connection = connection;
        }

        public IEnumerable<dynamic> Get(int projectId )
        {
            yield break;
        } 
    }
}