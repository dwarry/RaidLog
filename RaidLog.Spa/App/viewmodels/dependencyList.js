define(["require", "exports", "services/dataService", "./pagedGrid", "./dependencyDetail"], function(require, exports, __ds__, __pg__, __DependencyDetail__) {
    var ds = __ds__;

    var pg = __pg__;

    var DependencyDetail = __DependencyDetail__;

    var DependencyList = (function () {
        function DependencyList() {
            var _this = this;
            this._projectId = 0;
            this.projectCode = ko.observable("");
            this.projectName = ko.observable("");
            this.listViewModel = new pg.ListViewModel({ data: ko.observableArray([]) });
            var newItemCallback = function (item) {
                _this.listViewModel.allData.push(item);
            };

            this._mappingOptions = {
                create: function (options) {
                    return new DependencyDetail(_this._projectId, options.data, newItemCallback);
                },
                key: function (x) {
                    return x.id;
                },
                'plannedDate': { update: function (options) {
                        return (options.data || "").substring(0, 10);
                    } },
                'requiredByDate': { update: function (options) {
                        return (options.data || "").substring(0, 10);
                    } }
            };
        }
        DependencyList.prototype.activate = function (projectIdParam) {
            var _this = this;
            this._projectId = projectIdParam;

            ds.getProject(this._projectId).done(function (data) {
                _this.projectCode(data.code);
                _this.projectName(data.name);
            });

            this.refresh();
        };

        DependencyList.prototype.newDependency = function () {
            this.listViewModel.selected(ko.mapping.fromJS(ds.makeDependencyDto(this._projectId), this._mappingOptions));
        };

        DependencyList.prototype.refresh = function () {
            var _this = this;
            ds.getProjectDependencies(this._projectId).done(function (data) {
                ko.mapping.fromJS(data, _this._mappingOptions, _this.listViewModel.allData);
            });
        };
        return DependencyList;
    })();

    
    return DependencyList;
});
