using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

using RaidLog.Spa.Models;

namespace RaidLog.Spa.Controllers
{
    public class ActionsController: RaidLogApiController
    {
        public ActionsController(IDbConnection connection)
            : base(connection) {}


        public IEnumerable<ActionDto> GetActionsForItem(string itemType, int itemId)
        {
            
        }
    }
}