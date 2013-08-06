/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ds = require('services/dataService');
import pg = require('./pagedGrid');
import IssueDetails = require('./assumptionDetails');

class IssueList{
    private _projectId: number;

    constructor() {
    }

    activate(projectIdParam: number) {
        this._projectId = projectIdParam;
    }
}