define(["require", "exports", "services/dataService", "knockout", "viewmodels/pagedGrid"], function(require, exports, __dataService__, __ko__, __pg__) {
    var dataService = __dataService__;
    var ko = __ko__;
    var pg = __pg__;

    debugger;

    var projectList = (function () {
        function projectList() {
            this.title = "Projects";
            this.projects = ko.observableArray();
            debugger;

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
                return _this.projects(data);
            });
        };

        projectList.prototype.editProject = function () {
        };

        projectList.prototype.newProject = function () {
        };

        projectList.prototype.archiveProject = function () {
        };
        return projectList;
    })();

    
    return projectList;
});
