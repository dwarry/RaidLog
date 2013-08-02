/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ds = require('services/dataService');
import pg = require('./pagedGrid');
import AssumptionDetails = require('./assumptionDetails');

var mappingOptions: KnockoutMappingOptions = {
    create: options => new AssumptionDetails(options.parent.projectId, options.data),
    key: (x) => x.id
};

class AssumptionList{
    projectId: number;
    listViewModel: pg.ListViewModel<ds.AssumptionDto>;
    constructor() {
        this.listViewModel = new pg.ListViewModel<ds.AssumptionDto>({
            data: ko.observableArray([])
        });
    }

    activate(projectIdParam) {
        this.projectId = projectIdParam;
        this.refresh();
    }

    refresh() {
        ds.getProjectAssumptions(this.projectId)
            .done((data) => { ko.mapping.fromJS(data, mappingOptions, this.listViewModel.allData) });
    }
}

export =AssumptionList;
