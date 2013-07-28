/// <reference path="pagedGrid.ts" />
/// <reference path="../services/dataService.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path='../../Scripts/typings/jquery/jquery.d.ts' />
/// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
/// <reference path='../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts' />
/// <reference path='../../Scripts/typings/knockout.validation/knockout.validation.d.ts' />
/// <reference path='../../Scripts/typings/durandal/durandal.d.ts' />

import dataService = require("services/dataService");
import routeFactory = require("services/routeFactory");
import router = require("plugins/router");
//import ko = require("knockout")
import pg = require("viewmodels/pagedGrid");
import maintainProject = require("viewmodels/maintainProject");


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
        dataService.getProjects().done((data: dataService.ProjectSummaryWithCounts[]) => {
            $.each(data, function (i, x) {
                x['projectRisksLink'] = routeFactory.makeProjectRiskLink(x.id);
                x['projectAssumptionsLink'] = routeFactory.makeProjectAssumptionLink(x.id);
                x['projectIssuesLink'] = routeFactory.makeProjectIssueLink(x.id);
                x['projectDependenciesLink'] = routeFactory.makeProjectDependencyLink(x.id);
                x['projectQueriesLink'] = routeFactory.makeProjectQueryLink(x.id);
            });
            this.projects(data);
            this.listViewModel.setSelected(null);
        });
    }

    canEditProject: KnockoutComputed<boolean>;

    editProject() {
        var dlg = new maintainProject(this.listViewModel.selected()); 

        dlg.show().done((successful) => {
            if (successful) { this.refresh(); }
        });
    }

    newProject() {
        var dlg = new maintainProject(null);

        dlg.show().done((successful) => {
            if (successful) { this.refresh(); }
        });
    }

    canArchiveProject: KnockoutComputed<boolean>;

    archiveProject() {
    
    }

    viewRisks(p) {
        router.navigateTo(p.projectRisksLink);
    }
}

export = projectList;