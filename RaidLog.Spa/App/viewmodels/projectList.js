define(["require", "exports", "services/dataService", "knockout", "viewmodels/pagedGrid", "viewmodels/maintainProject"], function(require, exports, __dataService__, __ko__, __pg__, __maintainProject__) {
    var dataService = __dataService__;
    var ko = __ko__;
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
        return projectList;
    })();

    
    return projectList;
});
