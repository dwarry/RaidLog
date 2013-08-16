import ds = require("services/dataService");

import pg = require("./pagedGrid");

import QueryDetails = require("./queryDetails");

class QueryList {

    private _projectId = 0;

    projectCode = ko.observable("");
    projectName = ko.observable("");

    listViewModel = new pg.ListViewModel<QueryDetails>({ data: ko.observableArray<QueryDetails>([]) });

    private _mappingOptions: KnockoutMappingOptions;

    constructor() {
        var newItemCallback = (item: QueryDetails) => { this.listViewModel.allData.push(item); };


        this._mappingOptions = {
            create: options => new QueryDetails(this._projectId,
                <ds.QueryDto>options.data,
                newItemCallback),
            key: (x) => x.id,
            'raisedDate': { update: options => (options.data || "").substring(0, 10) },
            'answeredDate': { update: options => (options.data || "").substring(0, 10) }
        };
    }

    activate(projectIdParam: number) {
        this._projectId = projectIdParam;


        ds.getProject(this._projectId).done((data: ds.ProjectDto) => {
            this.projectCode(data.code);
            this.projectName(data.name);
        });


        this.refresh();
    }

    newQuery() {
        this.listViewModel.selected(
            ko.mapping.fromJS(ds.makeQueryDto(this._projectId), this._mappingOptions));

    }

    refresh() {
        ds.getProjectQueries(this._projectId).done(data => {

            ko.mapping.fromJS(data, this._mappingOptions, this.listViewModel.allData);
        });
    }
}

export = QueryList;