/// <reference path="pagedGrid.ts" />
/// <reference path="../services/logger.ts" />
/// <reference path="../services/dataService.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts" />
/// <reference path="../../../RaidLog.Spa/Scripts/typings/knockout/knockout.d.ts" />

import dataService = require("services/dataService");
import logger = require("services/logger");
import pg = require("viewmodels/pagedGrid");

class RiskList {
    title = ko.observable("");

    listViewModel = new pg.ListViewModel<dataService.RiskDto>()

    constructor() {
    }

}

export = RiskList;