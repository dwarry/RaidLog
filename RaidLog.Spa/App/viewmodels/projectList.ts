/// <reference path="pagedGrid.ts" />
/// <reference path="../services/dataService.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path='../../Scripts/typings/jquery/jquery.d.ts' />
/// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
/// <reference path='../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts' />
/// <reference path='../../Scripts/typings/knockout.validation/knockout.validation.d.ts' />
/// <reference path='../../Scripts/typings/durandal/durandal.d.ts' />

import dataService = require("services/dataService");
import ko = require("knockout")
import pg = require("viewmodels/pagedGrid");

class projectList {
    
    title = "Projects"; 
    
    projects = ko.observableArray<dataService.ProjectSummaryWithCounts>();

    
    listViewModel: pg.ListViewModel<dataService.ProjectSummaryWithCounts>;

    search(s: string) {
        this.listViewModel.searchField(s);
    }
    
    constructor() {

        var listConfig = { data: this.projects };

        this.listViewModel = new pg.ListViewModel<dataService.ProjectSummaryWithCounts>(listConfig);

        this.listViewModel.searchPredicate = (s, item) => (item.code.indexOf(s) !== -1) || (item.name.indexOf(s) !== -1); 

        this.canEditProject = this.canArchiveProject = ko.computed(function () { return this.listViewModel.selected() !== null }, this);
    }

    activate() {
        this.refresh();
    }

    refresh() {
        dataService.getProjects().done((data: dataService.ProjectSummaryWithCounts[]) => this.projects(data));
    }

    canEditProject: KnockoutComputed<boolean>;

    editProject() {
    
    }

    newProject() {
    }

    canArchiveProject: KnockoutComputed<boolean>;

    archiveProject() {
    
    }


}

export = projectList;