using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dapper;
using RaidLog.Models;

namespace RaidLog.Controllers
{
    public class ReferenceDataController : ApiController
    {
        private IDbConnection _connection;

        public ReferenceDataController(IDbConnection connection)
        {
            if (connection == null) throw new ArgumentNullException("connection");
            _connection = connection;
            
        }

        public ReferenceData Get()
        {
            _connection.Open();
            try
            {
                using (var tx = _connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var multi = _connection.QueryMultiple(Queries.GetReferenceData, transaction: tx);

                    var result = new ReferenceData(multi.Read<ApproachDto>().ToArray(),
                                                   multi.Read<ImpactDto>().ToArray(),
                                                   multi.Read<LikelihoodDto>().ToArray(),
                                                   multi.Read<RifCategoryDto>().ToArray());

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
