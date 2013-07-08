define(["require", "exports", "services/dataService", "knockout"], function(require, exports, __dataService__, __ko__) {
    var dataService = __dataService__;
    var ko = __ko__;

    var projectList = (function () {
        function projectList() {
            this.projects = ko.observableArray();
        }
        projectList.prototype.activate = function () {
            var _this = this;
            dataService.getProjects().done(function (data) {
                return _this.projects(data);
            });
        };
        return projectList;
    })();

    
    return projectList;
});
