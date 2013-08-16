define(["require", "exports", "services/dataService", "./pagedGrid", "./queryDetails"], function(require, exports, __ds__, __pg__, __QueryDetails__) {
    var ds = __ds__;

    var pg = __pg__;

    var QueryDetails = __QueryDetails__;

    var QueryList = (function () {
        function QueryList() {
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
                    return new QueryDetails(_this._projectId, options.data, newItemCallback);
                },
                key: function (x) {
                    return x.id;
                },
                'raisedDate': { update: function (options) {
                        return (options.data || "").substring(0, 10);
                    } },
                'answeredDate': { update: function (options) {
                        return (options.data || "").substring(0, 10);
                    } }
            };
        }
        QueryList.prototype.activate = function (projectIdParam) {
            var _this = this;
            this._projectId = projectIdParam;

            ds.getProject(this._projectId).done(function (data) {
                _this.projectCode(data.code);
                _this.projectName(data.name);
            });

            this.refresh();
        };

        QueryList.prototype.newQuery = function () {
            this.listViewModel.selected(ko.mapping.fromJS(ds.makeQueryDto(this._projectId), this._mappingOptions));
        };

        QueryList.prototype.refresh = function () {
            var _this = this;
            ds.getProjectQueries(this._projectId).done(function (data) {
                ko.mapping.fromJS(data, _this._mappingOptions, _this.listViewModel.allData);
            });
        };
        return QueryList;
    })();

    
    return QueryList;
});
