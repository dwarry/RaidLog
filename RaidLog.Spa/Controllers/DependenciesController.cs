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
    public class DependenciesController : RaidLogApiController
    {

        public DependenciesController(IDbConnection connection) : base(connection)
        {
        }

        public DependencyDto[] GetDependenciesForProject(int projectId)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var results = _connection.Query<DependencyDto>(
                            DependencyQueries.SelectDependenciesForProject,
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


        public DependencyDto PostNewDependency(int projectId, NewDependencyDto dto)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.RepeatableRead))
                {
                    var result = _connection.Query<DependencyDto>(
                        DependencyQueries.CreateDependency,
                        new
                        {
                            projectId,
                            status = dto.Status,
                            workstream = dto.Workstream,
                            description = dto.Description,
                            plannedDate = dto.PlannedDate,
                            requiredByDate = dto.RequiredByDate,
                            comments = dto.Comments,
                            ragStatus = dto.RagStatus,
                            dependencyLevel = dto.DependencyLevel
                        },
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


        public DependencyDto PutExistingDependency(EditDependencyDto dto)
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.RepeatableRead))
                {
                    var result = _connection.Query<DependencyDto>(
                        DependencyQueries.UpdateDependency,
                        new
                        {
                            id = dto.Id,
                            version = Convert.FromBase64String(dto.Version),
                            status = dto.Status,
                            workstream = dto.Workstream,
                            description = dto.Description,
                            plannedDate = dto.PlannedDate,
                            requiredByDate = dto.RequiredByDate,
                            comments = dto.Comments,
                            ragStatus = dto.RagStatus,
                            dependencyLevel = dto.DependencyLevel
                        },
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
    }
}