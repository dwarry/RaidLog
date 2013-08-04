/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ds = require('services/dataService');
import pg = require('./pagedGrid');
import AssumptionDetails = require('./assumptionDetails');

var assumptionStatuses: ds.AssumptionStatusDto[];

ds.getReferenceData().done((data) => { assumptionStatuses = data.assumptionStatuses; });

class AssumptionList{
    projectId: number;

    projectCode= ko.observable("");

    projectName= ko.observable("");

    listViewModel: pg.ListViewModel<ds.AssumptionDto>;

    assumptionStatuses: ds.AssumptionStatusDto[];

    private _mappingOptions: KnockoutMappingOptions;

    constructor() {
        this.listViewModel = new pg.ListViewModel<ds.AssumptionDto>({
            data: ko.observableArray([])
        });

        this._mappingOptions = {
            create: options => new AssumptionDetails(this.projectId, options.data),
            key: (x) => x.id
        };

        this.assumptionStatuses = assumptionStatuses;
    }

    activate(projectIdParam) {
        this.projectId = projectIdParam;

        var getProject = ds.getProject(this.projectId).done((data: ds.ProjectDto) => {
            this.projectCode(data.code);
            this.projectName(data.name);
        });

        this.refresh();
    }

    refresh() {
        ds.getProjectAssumptions(this.projectId)
            .done((data) => { ko.mapping.fromJS(data, this._mappingOptions, this.listViewModel.allData);});
    }

    newAssumption() {
        this.listViewModel.selected(
            ko.mapping.fromJS(ds.makeNewAssumption(), this._mappingOptions));
    }
}

export =AssumptionList;
