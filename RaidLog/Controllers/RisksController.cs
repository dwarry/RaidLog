﻿using System;
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

        // /api/risks/{id}
        public RiskDto GetRisk(int id)
        {
            _connection.Open();
            try
            {
                var result = _connection.Query<RiskDto>(RiskQueries.GetRiskById,
                                                        new { id })
                                        .FirstOrDefault();

                if (result != null)
                {
                    return result;
                }

                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            finally
            {
                _connection.Close();
            }
        }

        // /api/risks/?projectId={projectId}[&active=true]
        public IEnumerable<RiskDto> GetRisksForProject(int projectId, bool? active)
        {
         
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

                return _connection.Query<RiskDto>(q, new{id=projectId});
            }
            finally
            {
                _connection.Close();
            }
        } 

        public HttpResponseMessage PostNewRisk(int projectId, NewRiskDto newRisk)
        {
            if (ModelState.IsValid)
            {
                _connection.Open();
                try
                {
                    using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                    {
                        var args = new DynamicParameters(
                            new {
                                projectId = projectId,
                                description = newRisk.Description,
                                userName = User.Identity.Name,
                                rifCategoryId = newRisk.RifCategoryId,
                                isProjectRisk = newRisk.IsProjectRisk,
                                workstream = newRisk.Workstream,
                                impactCommentary = newRisk.Commentary,
                                approachId = newRisk.ApproachId,
                                impactId = newRisk.ImpactId,
                                likelihoodId = newRisk.LikelihoodId,
                                owner = newRisk.Owner,
                            });
                                  
                        args.Add("riskId", 0, DbType.Int32, ParameterDirection.Output);

                        _connection.Execute("usp_CreateRisk",
                                            args,
                                            tx,
                                            commandType: CommandType.StoredProcedure);


                        tx.Commit();

                        var location = "/api/risk/" + args.Get<int>("riskId");

                        var response = Request.CreateResponse(HttpStatusCode.Created);
                        response.Headers.Location = new Uri( location, UriKind.Relative);

                        return response;
                    }
                    
                }
                finally
                {
                    _connection.Close();   
                }
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest,
                                                   ModelState);
            }

        }

        public HttpResponseMessage PutExistingRisk(EditRiskDto risk)
        {
            if (ModelState.IsValid)
            {
                _connection.Open();
                try
                {
                    using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                    {
                        var args = new DynamicParameters(new
                            {
                                riskId = risk.Id,
                                version = risk.Version,
                                userName = risk.RaisedBy,
                                description = risk.Description,
                                impactCommentary = risk.Commentary,
                                rifCategoryId = risk.RifCategoryId,
                                isProjectRisk = risk.IsProjectRisk,
                                workstream = risk.Workstream,
                                approachId = risk.ApproachId,
                                impactId = risk.ImpactId,
                                likelihoodId = risk.LikelihoodId,
                                owner = risk.Owner,
                                isActive = risk.IsActive
                            });

                        args.Add("returnValue",
                                 dbType: DbType.Int32,
                                 direction: ParameterDirection.ReturnValue);

                        var result =
                            _connection.Execute(RiskQueries.UpdateRiskAndOrEvaluation,
                                                args,
                                                tx,
                                                commandType: CommandType.StoredProcedure);

                        if (result == 0)
                        {
                            return Request.CreateResponse(HttpStatusCode.OK,
                                                          GetRisk(risk.Id));
                        }
                        else
                        {
                            return Request.CreateErrorResponse(HttpStatusCode.Conflict,
                                                               "Risk has been updated by someone else.");
                        }
                    }
                }
                finally
                {
                    _connection.Close();
                }
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest,
                                                   ModelState);
            }
        }
    }
}
