/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />

import ts = require("durandal/typescript");
import router = require("plugins/router");

var allRoutes = [];
var mainRouter: ts.Router;

interface NavigableRoute extends ts.RouteConfiguration {
    nav: boolean;
}

function addRoute(route:string, config: NavigableRoute) {
    allRoutes.push(route);

    return route;
}


var projectList= addRoute('',{ title: 'Projects', moduleId: 'viewmodels/projectList', nav: true });
var projectRisks = addRoute('projects/:projectId/risks', {title: 'Project Risks', moduleId: 'viewmodels/riskList', nav: false });
var projectAssumptions = addRoute('projects/:projectId/assumptions', {title: 'Project Assumptions', moduleId: 'viewmodels/assumptionList', nav: false });
var projectIssues = addRoute('projects/:projectId/issues', {title: 'Project Issues', moduleId: 'viewmodels/issueList', nav: false });
var projectDependencies = addRoute('projects/:projectId/dependencies', {title: 'Project Dependencies', moduleId: 'viewmodels/dependencyList', nav: false });
var projectQueries = addRoute('projects/:projectId/queries', {title: 'Project Queries', moduleId: 'viewmodels/queryList', nav: false });

var projectIdRegex = /:projectId/;



var routeFactory = {

    initializeRouter: function () {
        router.map(allRoutes);
        mainRouter = router.buildNavigationModel();

        return router.activate();
    },

    makeProjectRiskLink: function (projectId: number) {
        return "#/" +projectRisks.replace(projectIdRegex, projectId.toString());
    },

    makeProjectAssumptionLink: function (projectId: number) {
        return "#/" +projectAssumptions.replace(projectIdRegex, projectId.toString());
    },
    
    makeProjectIssueLink: function (projectId: number) {
        return "#/" +projectIssues.replace(projectIdRegex, projectId.toString());
    },
    
    makeProjectDependencyLink: function (projectId: number) {
        return "#/" +projectDependencies.replace(projectIdRegex, projectId.toString());
    },
    
    makeProjectQueryLink: function (projectId: number) {
        return "#/" +projectQueries.replace(projectIdRegex, projectId.toString());
    },
};

export = routeFactory;