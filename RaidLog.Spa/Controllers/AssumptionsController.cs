using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Web.Http;

using Dapper;

using RaidLog.Models;
using RaidLog.Queries;

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

        public AssumptionDto[] GetAssumptionsForProject(int projectId)
        {
            _connection.Open();

            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    return _connection.Query<AssumptionDto>(AssumptionsQueries.GetAllAssumptionsForProject,
                        new
                        {
                            projectId
                        },
                        tx)
                        .ToArray();
                }
            }
            catch (Exception ex)
            {
                
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        } 

        public AssumptionDto PostNewAssumption(int projectId, NewAssumptionDto newAssumption)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    CheckProjectIsActive(tx, projectId);

                    var args = new {
                        projectId = projectId,
                        description = newAssumption.Description,
                        workstream = newAssumption.Workstream,
                        owner = newAssumption.Owner,
                        validatedBy = newAssumption.ValidatedBy,
                        statusId = newAssumption.StatusId,
                        supportingDocumentation = newAssumption.SupportingDocumentation
                    };

                    return _connection.Query<AssumptionDto>(AssumptionsQueries.InsertAssumption,
                        args,
                        tx)
                        .FirstOrDefault();


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
                    CheckProjectIsActive(tx, editAssumption.ProjectId);

                    var args = new
                    {
                        id = assumptionId,
                        version = Convert.FromBase64String(editAssumption.Version),
                        description = editAssumption.Description,
                        workstream = editAssumption.Workstream,
                        owner = editAssumption.Owner,
                        validatedBy = editAssumption.ValidatedBy,
                        statusId = editAssumption.StatusId,
                        supportingDocumentation = editAssumption.SupportingDocumentation

                    };

                    return _connection.Query<AssumptionDto>(AssumptionsQueries.UpdateAssumption,
                        args,
                        tx).FirstOrDefault();
                }
            }
            finally
            {
                _connection.Close();
            } 
            
        }
    }
}