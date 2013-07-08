/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../services/dataService.ts" />

/// <reference path='../../Scripts/typings/jquery/jquery.d.ts' />
/// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
/// <reference path='../../Scripts/typings/knockout/knockout.amd.d.ts' />
/// <reference path='../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts' />
/// <reference path='../../Scripts/typings/knockout.validation/knockout.validation.d.ts' />
/// <reference path='../../Scripts/typings/durandal/durandal.d.ts' />

import dataService = module("services/dataService");
import ko = module("knockout")



class projectList {
    projects = ko.observableArray<dataService.ProjectSummaryWithCounts>()

    activate() {
        dataService.getProjects().done((data:dataService.ProjectSummaryWithCounts[]) => this.projects(data))
    }
}

export = projectList;