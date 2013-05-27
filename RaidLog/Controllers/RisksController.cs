using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dapper;
using RaidLog.Models;
using RaidLog.Queries;

namespace RaidLog.Controllers
{
    [Authorize]
    public class RisksController : ApiController
    {
        private readonly IDbConnection _connection;

        public RisksController(IDbConnection connection)
        {
            _connection = connection;
        }

        public IEnumerable<RiskDto> Get(int projectId, bool? active)
        {
         /*
           r.Id
         , r.RiskNumber
         , r.Description
         , r.RaisedDate
         , r.RaisedBy
         , r.RifCategoryId
         , r.IsProjectRisk
         , r.Workstream
         , r.ImpactCommentary
         , r.ApproachId
         , r.VersionNumber
         , re.EvaluationDate
         , re.ImpactId
         , re.LikelihoodId
         , re.Owner
          */
            _connection.Open();
            try
            {
                string q;

                if (active.HasValue)
                {
                    q = active.Value
                            ? RiskQueries.ActiveRisksForProject
                            : RiskQueries.ClosedRisksForProject;
                }
                else
                {
                    q = RiskQueries.AllRisksForProject;
                }

                return _connection.Query<RiskDto>(q);
            }
            finally
            {
                _connection.Close();
            }
        } 
    }
}
