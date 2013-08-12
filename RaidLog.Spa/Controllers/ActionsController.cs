using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

using Dapper;

using RaidLog.Spa.Models;
using RaidLog.Spa.Queries;

namespace RaidLog.Spa.Controllers
{
    public class ActionsController : RaidLogApiController
    {
        public ActionsController(IDbConnection connection)
            : base(connection) {}


        public IEnumerable<ActionDto> GetActionsForProject(int projectId, int id = 0)
        {
            _connection.Open();

            try
            {
                using (IDbTransaction tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    IEnumerable<ActionDto> q = _connection.Query<ActionDto>(ActionQueries.GetActionsForProject,
                                                                            new
                                                                            {
                                                                                projectId
                                                                            },
                                                                            tx);

                    return id == 0
                               ? q
                               : q.Where(x => x.Id == id);
                }
            }
            finally
            {
                _connection.Close();
            }
        }


        public IEnumerable<ActionDto> GetActionsForItem(string itemType, int itemId)
        {
            _connection.Open();

            try
            {
                using (IDbTransaction tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    string sql = ActionQueries.GetActionsByType[itemType.ToLowerInvariant()];

                    return _connection.Query<ActionDto>(sql,
                                                        new
                                                        {
                                                            itemId
                                                        },
                                                        tx,
                                                        commandType: CommandType.Text);
                }
            }
            finally
            {
                _connection.Close();
            }
        }


        public ActionDto PostNewAction(NewActionDto dto)
        {
            _connection.Open();

            try
            {
                using (IDbTransaction tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var result =  _connection.Query<ActionDto>(ActionQueries.CreateAction,
                                                        new
                                                        {
                                                            parentItemId = dto.ParentItemId,
                                                            parentItemType = dto.ParentItemType,
                                                            description = dto.Description,
                                                            actor = dto.Actor,
                                                            actionStatusId = dto.ActionStatusId,
                                                            dueDate = dto.DueDate
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


        public ActionDto PutAction(int id, EditAction dto)
        {
            _connection.Open();

            try
            {
                using (IDbTransaction tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var result = _connection.Query<ActionDto>(ActionQueries.UpdateAction,
                                                           new
                                                           {
                                                               id = dto.Id,
                                                               version = Convert.FromBase64String(dto.Version),
                                                               description = dto.Description,
                                                               actor = dto.Actor,
                                                               actionStatusId = dto.ActionStatusId,
                                                               dueDate = dto.DueDate,
                                                               resolvedDate = dto.ResolvedDate,
                                                               resolution = dto.Resolution
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
