﻿/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
define(["require", "exports", "plugins/router"], function(require, exports, __r__) {
    
    var r = __r__;

    function addRoute(route, config) {
        r.map(route, config);
        return route;
    }

    var projectList = addRoute('projects/', { title: 'Projects', moduleId: 'viewmodels/projectList', nav: true });
    var projectRisks = addRoute('projects/:projectId/risks', { title: 'Project Risks', moduleId: 'viewmodels/riskList', nav: false });
    var projectAssumptions = addRoute('projects/:projectId/assumptions', { title: 'Project Assumptions', moduleId: 'viewmodels/assumptionList', nav: false });
    var projectIssues = addRoute('projects/:projectId/issues', { title: 'Project Issues', moduleId: 'viewmodels/issueList', nav: false });
    var projectDependencies = addRoute('projects/:projectId/dependencies', { title: 'Project Dependencies', moduleId: 'viewmodels/dependencyList', nav: false });
    var projectQueries = addRoute('projects/:projectId/queries', { title: 'Project Queries', moduleId: 'viewmodels/queryList', nav: false });
    var projectActions = addRoute('projects/:projectId/actions', { title: 'Project Actions', moduleId: 'viewmodels/actionsList', nav: false });

    var projectIdRegex = /:projectId/;

    var routeFactory = {
        initializeRouter: function () {
            r.buildNavigationModel();

            return r.activate();
        },
        makeProjectRiskLink: function (projectId) {
            return "#/" + projectRisks.replace(projectIdRegex, projectId.toString());
        },
        makeProjectAssumptionLink: function (projectId) {
            return "#/" + projectAssumptions.replace(projectIdRegex, projectId.toString());
        },
        makeProjectIssueLink: function (projectId) {
            return "#/" + projectIssues.replace(projectIdRegex, projectId.toString());
        },
        makeProjectDependencyLink: function (projectId) {
            return "#/" + projectDependencies.replace(projectIdRegex, projectId.toString());
        },
        makeProjectQueryLink: function (projectId) {
            return "#/" + projectQueries.replace(projectIdRegex, projectId.toString());
        },
        makeProjectActionLink: function (projectId) {
            return "#/" + projectActions.replace(projectIdRegex, projectId.toString());
        }
    };

    
    return routeFactory;
});
