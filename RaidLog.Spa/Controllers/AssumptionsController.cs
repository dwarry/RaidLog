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

        public AssumptionsController(IDbConnection connection) : base(connection)
        {
        }

        public AssumptionDto[] GetAssumptionsForProject(int projectId)
        {
            _connection.Open();

            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var assumptions = _connection.Query<AssumptionDto>(AssumptionsQueries.GetAllAssumptionsForProject,
                        new
                        {
                            projectId
                        },
                        tx)
                        .ToArray();

                    return assumptions;
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

                    var args = new DynamicParameters( new {
                        projectId = projectId,
                        description = newAssumption.Description,
                        workstream = newAssumption.Workstream,
                        owner = newAssumption.Owner,
                        validatedBy = newAssumption.ValidatedBy,
                        statusId = newAssumption.StatusId,
                        supportingDocumentation = newAssumption.SupportingDocumentation
                    });


                    var result =  _connection.Query<AssumptionDto>(AssumptionsQueries.InsertAssumption,
                        args,
                        tx,
                        commandType: CommandType.StoredProcedure)
                        .FirstOrDefault();

                    tx.Commit();

                    return result;
                }
            }
            finally
            {
                _connection.Close();
            } 
        }

        public AssumptionDto PutAssumption(int id, EditAssumptionDto editAssumption)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    CheckProjectIsActive(tx, editAssumption.ProjectId);

                    var args = new
                    {
                        id = id,
                        version = Convert.FromBase64String(editAssumption.Version),
                        description = editAssumption.Description,
                        workstream = editAssumption.Workstream,
                        owner = editAssumption.Owner,
                        validatedBy = editAssumption.ValidatedBy,
                        statusId = editAssumption.StatusId,
                        supportingDocumentation = editAssumption.SupportingDocumentation

                    };

                    var result =  _connection.Query<AssumptionDto>(AssumptionsQueries.UpdateAssumption,
                        args,
                        tx,
                        commandType:CommandType.StoredProcedure).FirstOrDefault();

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