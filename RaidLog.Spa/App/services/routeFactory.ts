/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />

import router = require("plugins/router");

var allRoutes = [];

function addRoute(route) {
    allRoutes.push(route);

    return route.route;
}


var projectList= addRoute({ route: '', title: 'Projects', moduleId: 'viewmodels/projectList', nav: true });
var projectRisks= addRoute({ route: 'projects/:projectId/risks', title: 'Project Risks', moduleId: 'viewmodels/riskList', nav: false });
var projectAssumptions= addRoute({ route: 'projects/:projectId/assumptions', title: 'Project Assumptions', moduleId: 'viewmodels/assumptionList', nav: false });
var projectIssues= addRoute({ route: 'projects/:projectId/issues', title: 'Project Issues', moduleId: 'viewmodels/issueList', nav: false });
var projectDependencies= addRoute({ route: 'projects/:projectId/dependencies', title: 'Project Dependencies', moduleId: 'viewmodels/dependencyList', nav: false });
var projectQueries= addRoute({ route: 'projects/:projectId/queries', title: 'Project Queries', moduleId: 'viewmodels/queryList', nav: false });

var projectIdRegex = /:projectId/;



var routeFactory = {

    initializeRouter: function () {
        router.map(allRoutes);
        router.buildNavigationModel();
        return router.activate('');
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