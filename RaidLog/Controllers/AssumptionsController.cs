using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Http;

using RaidLog.Models;

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