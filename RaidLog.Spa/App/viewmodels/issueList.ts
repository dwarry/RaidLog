/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ds = require('services/dataService');
import pg = require('./pagedGrid');
import IssueDetails = require('./issueDetails');

class IssueList{
    private _projectId: number;

    listViewModel = new pg.ListViewModel<IssueDetails>(
        { data: ko.observableArray<IssueDetails>([]) });

    projectCode = ko.observable("");

    projectName = ko.observable("");

    private _mappingOptions: KnockoutMappingOptions;

    constructor() {

        var newItemCallback = (item) => { this.listViewModel.allData.push(item); };

        this._mappingOptions = {
            create: options => new IssueDetails(this._projectId,
                <ds.IssueDto>options.data,
                newItemCallback),
            key: (x) => x.id
        };
    }

    activate(projectIdParam: number) {
        this._projectId = projectIdParam;

        ds.getProject(this._projectId).done((data: ds.ProjectDto) => {
            this.projectCode(data.code);
            this.projectName(data.name);
        });


        return this.refresh();
    }

    refresh() {
        return ds.getProjectIssues(this._projectId)
            .done(data => ko.mapping.fromJS(data,
                this._mappingOptions, 
                this.listViewModel.allData));
    }

    newIssue() {
        this.listViewModel.selected(
            ko.mapping.fromJS(ds.makeIssueDto(this._projectId), this._mappingOptions));

    }
}

export = IssueList;