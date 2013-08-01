using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Dapper;

using RaidLog.Queries;

namespace RaidLog.Spa.Controllers
{
    public abstract class RaidLogApiController : ApiController
    {
        private readonly IDbConnection _connection;


        protected RaidLogApiController(IDbConnection connection)
        {
            if (connection == null)
            {
                throw new ArgumentNullException("connection");
            }
            _connection = connection;
        }


        protected void CheckProjectIsActive(IDbTransaction tx, int projectId)
        {
            
            var q = tx.Connection.Query<int>(ProjectQueries.ActiveProjectCheck,
                new
                {
                    id = projectId
                },
                tx);

            if (!q.Any())
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(HttpStatusCode.Forbidden,
                        "Project does not exist or is inactive"));
            }
        }
    }
}