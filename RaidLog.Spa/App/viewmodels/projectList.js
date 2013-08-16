/// <reference path="pagedGrid.ts" />
/// <reference path="../services/dataService.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path='../../Scripts/typings/jquery/jquery.d.ts' />
/// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
/// <reference path='../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts' />
/// <reference path='../../Scripts/typings/knockout.validation/knockout.validation.d.ts' />
/// <reference path='../../Scripts/typings/durandal/durandal.d.ts' />
define(["require", "exports", "services/dataService", "services/routeFactory", "plugins/router", "viewmodels/pagedGrid", "viewmodels/maintainProject"], function(require, exports, __dataService__, __routeFactory__, __router__, __pg__, __maintainProject__) {
    var dataService = __dataService__;
    var routeFactory = __routeFactory__;
    var router = __router__;

    //import ko = require("knockout")
    var pg = __pg__;
    var maintainProject = __maintainProject__;

    var projectList = (function () {
        function projectList() {
            this.title = "Projects";
            this.projects = ko.observableArray();
            var listConfig = { data: this.projects };

            this.listViewModel = new pg.ListViewModel(listConfig);

            this.listViewModel.searchPredicate = function (s, item) {
                return (item.code.indexOf(s) !== -1) || (item.name.indexOf(s) !== -1);
            };

            this.canEditProject = this.canArchiveProject = ko.computed(function () {
                return this.listViewModel.selected() !== null;
            }, this);
        }
        projectList.prototype.search = function (s) {
            this.listViewModel.searchField(s);
        };

        projectList.prototype.activate = function () {
            this.refresh();
        };

        projectList.prototype.refresh = function () {
            var _this = this;
            dataService.getProjects().done(function (data) {
                $.each(data, function (i, x) {
                    x['projectRisksLink'] = routeFactory.makeProjectRiskLink(x.id);
                    x['projectAssumptionsLink'] = routeFactory.makeProjectAssumptionLink(x.id);
                    x['projectIssuesLink'] = routeFactory.makeProjectIssueLink(x.id);
                    x['projectDependenciesLink'] = routeFactory.makeProjectDependencyLink(x.id);
                    x['projectQueriesLink'] = routeFactory.makeProjectQueryLink(x.id);
                    x['projectActionsLink'] = routeFactory.makeItemActionLink('projects', x.id);
                });
                _this.projects(data);
                _this.listViewModel.setSelected(null);
            });
        };

        projectList.prototype.editProject = function () {
            var _this = this;
            var dlg = new maintainProject(this.listViewModel.selected());

            dlg.show().done(function (successful) {
                if (successful) {
                    _this.refresh();
                }
            });
        };

        projectList.prototype.newProject = function () {
            var _this = this;
            var dlg = new maintainProject(null);

            dlg.show().done(function (successful) {
                if (successful) {
                    _this.refresh();
                }
            });
        };

        projectList.prototype.archiveProject = function () {
        };

        projectList.prototype.viewRisks = function (p) {
            router.navigate(p.projectRisksLink);
        };
        return projectList;
    })();

    
    return projectList;
});
