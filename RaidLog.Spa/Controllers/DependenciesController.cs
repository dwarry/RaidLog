﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;

using Dapper;

using RaidLog.Models;
using RaidLog.Spa.Queries;

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

        public IEnumerable<DependencyDto> Get(int projectId, bool? active)
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
                            tx);

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
                            version = Convert.FromBase64String(dto.VersionNumber),
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