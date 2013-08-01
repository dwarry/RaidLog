using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;

using Dapper;

using RaidLog.Models;

namespace RaidLog.Spa.Controllers
{
    [Authorize]
    public class AssumptionsController : RaidLogApiController
    {
        private readonly IDbConnection _connection;

        public AssumptionsController(IDbConnection connection) : base(connection)
        {
            if (connection == null) throw new ArgumentNullException("connection");
            _connection = connection;
        }

        public IEnumerable<dynamic> GetAssumptionsForProject(int projectId, bool? active )
        {
            yield break;
        } 

        public AssumptionDto PostNewAssumption(int projectId, NewAssumptionDto newAssumption)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    CheckProjectIsActive(tx, projectId);

                    var args = new DynamicParameters(new
                    {
                        projectId = projectId,
                        description = newAssumption.Description,
                        workstream = newAssumption.Workstream,
                        owner = newAssumption.Owner,
                        validatedBy = newAssumption.ValidatedBy,
                        statusId = newAssumption.StatusId,
                        supportingDocumentation = newAssumption.SupportingDocumentation
                    });

                    args.Add("assumptionId", 0, DbType.Int32, ParameterDirection.Output);



                    return new AssumptionDto();
                }
            }
            finally
            {
                _connection.Close();
            } 
        }

        public AssumptionDto PutAssumption(int assumptionId, EditAssumptionDto editAssumption)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    return new AssumptionDto();
                }
            }
            finally
            {
                _connection.Close();
            } 
            
        }
    }
}